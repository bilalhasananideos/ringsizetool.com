/**
 * One-off: find, for each sitemap URL, the date its CURRENT visible text
 * first appeared on main, by building main's history. Writes
 * scripts/lastmod-seed.json, which settle-lastmod uses only when the live
 * sitemap has no <lastmod> for a URL (i.e. the first deploy with lastmod).
 *
 * Without it, that first deploy could only fall back to the git rule, which
 * dates 7 pages to 4 Nov although their text did not change that day - the
 * exact over-dating this work removes. After that first deploy the live
 * sitemap carries lastmod and the seed is never consulted again.
 *
 * Each entry stores a hash of the text it dates; settle uses it only if the
 * page's built text still has that hash, so a stale seed can never apply.
 *
 *   node --experimental-strip-types scripts/seed-lastmod.ts [ref=origin/main]
 * Needs node_modules installed. Takes ~1 build per main commit it walks.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { htmlFileFor, normDate, parseSitemap, textHash, visibleText } from './lastmod-settle-lib.mjs';

const ref = process.argv[2] ?? 'origin/main';
const ROOT = resolve('.');
const git = (...a: string[]) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8' }).trim();

const commits = git('log', '--first-parent', '--format=%H %cI', ref, '--', 'src')
  .split('\n').map((l) => { const [sha, date] = l.split(' '); return { sha, date: normDate(date)! }; });

const tmp = mkdtempSync(join(tmpdir(), 'seed-lastmod-'));
const buildAt = (sha: string): Map<string, string> | null => {
  const wt = join(tmp, sha.slice(0, 8));
  git('worktree', 'add', '--detach', '-q', wt, sha);
  try {
    symlinkSync(join(ROOT, 'node_modules'), join(wt, 'node_modules'));
    execFileSync('npx', ['astro', 'build'], { cwd: wt, stdio: 'ignore' });
    const out = new Map<string, string>();
    for (const { loc } of parseSitemap(readFileSync(join(wt, 'dist/sitemap-0.xml'), 'utf8'))) {
      const f = join(wt, 'dist', htmlFileFor(new URL(loc).pathname));
      if (existsSync(f)) out.set(loc, visibleText(readFileSync(f, 'utf8')));
    }
    return out;
  } catch (e) {
    console.warn(`build failed at ${sha.slice(0, 8)}: ${(e as Error).message.split('\n')[0]}`);
    return null;
  } finally {
    git('worktree', 'remove', '--force', wt);
  }
};

const head = buildAt(commits[0].sha);
if (!head) throw new Error('cannot build the ref itself');
const seed: Record<string, { lastmod: string; text: string; commit: string }> = {};
let open = new Set(head.keys());
let newer = commits[0];

for (const c of commits.slice(1)) {
  if (open.size === 0) break;
  const texts = buildAt(c.sha);
  if (!texts) break; // cannot see further back: date the rest by the last commit we could build
  for (const loc of [...open]) {
    if (texts.get(loc) !== head.get(loc)) {
      seed[loc] = { lastmod: newer.date, text: textHash(head.get(loc)!), commit: newer.sha.slice(0, 7) };
      open.delete(loc);
    }
  }
  console.log(`${c.sha.slice(0, 7)} ${c.date}  still unchanged: ${open.size}`);
  newer = c;
}
for (const loc of open) {
  seed[loc] = { lastmod: newer.date, text: textHash(head.get(loc)!), commit: newer.sha.slice(0, 7) };
}
rmSync(tmp, { recursive: true, force: true });

const sorted = Object.fromEntries(Object.entries(seed).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync('scripts/lastmod-seed.json', JSON.stringify({ ref: git('rev-parse', '--short', ref), urls: sorted }, null, 2) + '\n');
console.table(Object.fromEntries(Object.entries(sorted).map(([k, v]) => [k, `${v.lastmod} ${v.commit}`])));
