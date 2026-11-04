/**
 * `<lastmod>` for each sitemap URL = the last git commit that touched that
 * page's source or anything its content is built from.
 *
 * Why git and not the build date: Google uses lastmod only when it is
 * "consistently and verifiably accurate". Stamping every URL with the build
 * date on each deploy is exactly the inaccurate kind, and gets ignored.
 *
 * "Built from" = the page file plus every relative import it reaches inside
 * src/, followed transitively (data modules, components, images). It stops at:
 *   - src/layouts/  - the shared chrome (header, footer, consent banner). A nav
 *                     link change is not a change to the page's content.
 *   - src/config.ts - site name, nav, flags. Same reason.
 *   - src/styles/   - CSS is presentation, not content.
 * It over-includes in one known way: a page that imports one symbol from a
 * shared module (e.g. breadcrumbSchema from data/faq.ts) is dated by any
 * commit to that module. Over-dating by a few weeks is the safe direction;
 * under-dating would hide a real change from crawlers.
 *
 * A URL with no matching src/pages/<name>.astro gets NO lastmod rather than a
 * guessed one.
 *
 * Plain JS (not TS) so astro.config.mjs can import it directly. Used by:
 * astro.config.mjs (sitemap serialize) and scripts/check-sitemap.ts.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');

const STOP = [join(SRC, 'layouts') + '/', join(SRC, 'styles') + '/', join(SRC, 'config.ts')];
const EXTENSIONS = ['', '.ts', '.astro', '.mjs', '.js', '/index.ts'];
const IMPORT_RE = /(?:from\s+|import\s+)['"](\.{1,2}\/[^'"]+)['"]/g;

const git = (...args) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();

let checked = false;
/** Fail the build rather than ship wrong dates. A shallow clone (CI's default
 * fetch-depth 1) would date every page to the one commit it has. */
function assertFullHistory() {
  if (checked) return;
  checked = true;
  if (git('rev-parse', '--is-shallow-repository') === 'true') {
    throw new Error(
      'page-lastmod: shallow git clone. Every <lastmod> would be the newest commit. ' +
      'In CI set `fetch-depth: 0` on actions/checkout.',
    );
  }
}

const resolveImport = (fromFile, spec) => {
  const base = resolve(dirname(fromFile), spec);
  for (const ext of EXTENSIONS) {
    const p = base + ext;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
};

/** Absolute path of the page file for a URL path ('/' or '/ring-size-chart'). */
export function pageFileFor(pathname) {
  const clean = pathname.replace(/\/+$/, '');
  const name = clean === '' ? 'index' : clean.slice(1);
  if (!/^[a-z0-9-]+$/.test(name)) return null;
  const file = join(SRC, 'pages', `${name}.astro`);
  return existsSync(file) ? file : null;
}

/** Repo-relative paths of every file the page's content is built from. */
export function sourcesFor(pageFile) {
  const seen = new Set();
  const walk = (file) => {
    if (seen.has(file)) return;
    if (!file.startsWith(SRC + '/')) return;
    if (STOP.some((s) => (s.endsWith('/') ? file.startsWith(s) : file === s))) return;
    seen.add(file);
    if (!/\.(astro|ts|mjs|js)$/.test(file)) return; // images etc.: no imports inside
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(IMPORT_RE)) {
      const dep = resolveImport(file, m[1]);
      if (dep) walk(dep);
    }
  };
  walk(pageFile);
  return [...seen].map((f) => relative(ROOT, f)).sort();
}

const cache = new Map();

/** ISO date-time (UTC, no ms) of the last commit to the page's sources, or
 * undefined when the URL has no page file or the files have no commits. */
export function lastmodFor(pathname) {
  if (cache.has(pathname)) return cache.get(pathname);
  assertFullHistory();
  const page = pageFileFor(pathname);
  let out;
  if (page) {
    const iso = git('log', '-1', '--format=%cI', '--', ...sourcesFor(page));
    if (iso) out = new Date(iso).toISOString().replace(/\.\d{3}Z$/, 'Z');
  }
  cache.set(pathname, out);
  return out;
}
