/**
 * Post-build, pre-deploy: settle each <lastmod> in dist/sitemap-0.xml against
 * what is LIVE, so it moves only when the page's visible text moved.
 * Rule and reasons: scripts/lastmod-settle-lib.mjs.
 *
 *   npm run settle:lastmod -- --fetch <dir>      # CI: download live, save to <dir>, settle
 *   npm run settle:lastmod -- --live-dir <dir>   # settle against a saved snapshot
 *
 * The snapshot dir holds sitemap-0.xml + one .html per URL. It is reused by
 * check:sitemap (to recompute the same answer) and by indexnow (to tell which
 * lastmods changed).
 *
 * Never fails the build for the network: if the live sitemap cannot be read,
 * every URL keeps its git date (the old rule) and a warning is printed. A
 * single page that cannot be fetched keeps its git date the same way.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lastmodFor } from './page-lastmod.mjs';
import { decideLastmod, htmlFileFor, normDate, parseSitemap, visibleText } from './lastmod-settle-lib.mjs';
import { SITE_URL } from '../src/config.ts';

const DIST_SITEMAP = 'dist/sitemap-0.xml';
const SEED_FILE = new URL('./lastmod-seed.json', import.meta.url);
const SEED: Record<string, { lastmod: string; text: string }> =
  existsSync(SEED_FILE) ? JSON.parse(readFileSync(SEED_FILE, 'utf8')).urls : {};

export const headDate = () =>
  normDate(execFileSync('git', ['log', '-1', '--format=%cI', 'HEAD'], { encoding: 'utf8' }).trim())!;

export type Row = { loc: string; git?: string; live?: string; lastmod?: string; reason: string };

/** Decide every URL against a snapshot dir. Pure apart from reading files. */
export function plan(liveDir: string | undefined): Row[] {
  const head = headDate();
  const urls = parseSitemap(readFileSync(DIST_SITEMAP, 'utf8')).map((u) => u.loc);
  const liveSitemapPath = liveDir && join(liveDir, 'sitemap-0.xml');
  const liveSitemap = liveSitemapPath && existsSync(liveSitemapPath)
    ? readFileSync(liveSitemapPath, 'utf8') : '';
  const liveOk = liveSitemap.includes('<urlset');
  const liveDates = new Map(parseSitemap(liveSitemap).map((u) => [u.loc, u.lastmod]));

  return urls.map((loc) => {
    const path = new URL(loc).pathname;
    const git = lastmodFor(path);
    const file = join(liveDir ?? '', htmlFileFor(path));
    const built = join('dist', htmlFileFor(path));
    const live = !liveOk ? null : {
      text: existsSync(file) ? visibleText(readFileSync(file, 'utf8')) : undefined,
      lastmod: liveDates.get(loc),
    };
    const builtText = existsSync(built) ? visibleText(readFileSync(built, 'utf8')) : '';
    const { lastmod, reason } = decideLastmod({ gitDate: git, headDate: head, builtText, live, seed: SEED[loc] });
    return { loc, git, live: normDate(live?.lastmod), lastmod, reason };
  });
}

async function fetchSnapshot(dir: string) {
  mkdirSync(dir, { recursive: true });
  const get = async (url: string) => {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20_000), redirect: 'manual' });
      return r.status === 200 ? await r.text() : undefined;
    } catch { return undefined; }
  };
  const sm = await get(`${SITE_URL}/sitemap-0.xml`);
  if (!sm?.includes('<urlset')) {
    console.warn(`::warning::Live sitemap unreachable - every <lastmod> keeps its git date this deploy.`);
    return;
  }
  writeFileSync(join(dir, 'sitemap-0.xml'), sm);
  for (const { loc } of parseSitemap(readFileSync(DIST_SITEMAP, 'utf8'))) {
    const html = await get(loc);
    if (html) writeFileSync(join(dir, htmlFileFor(new URL(loc).pathname)), html);
    else console.warn(`::warning::${loc} not fetched (new page or network) - keeps its git date.`);
  }
}

function rewrite(rows: Row[]) {
  const by = new Map(rows.map((r) => [r.loc, r.lastmod]));
  const xml = readFileSync(DIST_SITEMAP, 'utf8').replace(/<url>([\s\S]*?)<\/url>/g, (_, inner: string) => {
    const loc = inner.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
    const rest = inner.replace(/<lastmod>[^<]*<\/lastmod>/, '');
    const lm = by.get(loc);
    return `<url>${lm ? rest.replace(/(<\/loc>)/, `$1<lastmod>${lm}</lastmod>`) : rest}</url>`;
  });
  writeFileSync(DIST_SITEMAP, xml);
}

export function printTable(rows: Row[]) {
  for (const r of rows) {
    const path = new URL(r.loc).pathname || '/';
    console.log(`${path.padEnd(36)} ${String(r.lastmod).padEnd(21)} ${r.reason}  [git ${r.git ?? '-'}, live ${r.live ?? '-'}]`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const at = (f: string) => (args.includes(f) ? args[args.indexOf(f) + 1] : undefined);
  let dir = at('--live-dir');
  const fetchDir = at('--fetch');
  if (fetchDir) { await fetchSnapshot(fetchDir); dir = fetchDir; }
  if (!dir) { console.error('usage: --fetch <dir> | --live-dir <dir>'); process.exit(2); }
  const rows = plan(dir);
  rewrite(rows);
  printTable(rows);
}
