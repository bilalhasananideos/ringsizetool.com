/**
 * Proves the BUILT sitemap carries accurate <lastmod> values. Run after
 * `npm run build`:  npm run check:sitemap
 *
 *   npm run check:sitemap                        # dist as built (git dates)
 *   npm run check:sitemap -- --live-dir <dir>    # after settle:lastmod in CI
 *
 * 1. Fixture tests of the settle rule: a shared-module edit that leaves a
 *    page's visible text alone must NOT move that page's lastmod.
 * 2. For every <url> in dist/sitemap-0.xml: if the URL maps to a page file,
 *    <lastmod> must be present, a valid W3C date-time, not in the future, and
 *    equal to what the rule gives (scripts/settle-lastmod.ts plan(), against
 *    the same live snapshot; with no snapshot that is the git date). If it
 *    maps to nothing it must carry NO <lastmod> (no guessed dates).
 * 3. The IndexNow key file shipped with the right content.
 */
import { existsSync, readFileSync } from 'node:fs';
import { decideLastmod, textHash, visibleText } from './lastmod-settle-lib.mjs';
import { plan } from './settle-lastmod.ts';
import { INDEXNOW_KEY } from './indexnow-key.mjs';
import { SITE_URL } from '../src/config.ts';

const SITEMAP = 'dist/sitemap-0.xml';
let fail = 0;
const bad = (msg: string) => { fail++; console.error(`✗ ${msg}`); };

// ---- 1. the rule, on fixtures -------------------------------------------
const eq = (label: string, got: unknown, want: unknown) => {
  if (got === want) console.log(`✓ ${label}`);
  else bad(`${label}: got ${String(got)}, want ${String(want)}`);
};
const page = (body: string, asset = 'index.AbC123') =>
  `<html><head><title>Ring size chart | Ring Size Tool</title>` +
  `<meta name="description" content="Every size, computed."><link rel="stylesheet" href="/_astro/${asset}.css">` +
  `<script type="application/ld+json">{"x":1}</script></head><body>${body}</body></html>`;
const BUILT = page('<h1>Ring size chart</h1>\n<p>US 7 is 17.35&nbsp;mm.</p>', 'index.Zz9999');
const LIVE = page('<h1>Ring size chart</h1> <p>US 7 is 17.35 mm.</p>') +
  `<!-- Cloudflare Pages Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js'></script>`;
const EDITED = page('<h1>Ring size chart</h1><p>US 7 is 17.4 mm.</p>');
const LIVE_LM = '2026-10-05T19:06:39Z', GIT = '2026-11-04T10:00:00Z', HEAD = '2026-11-04T12:00:00Z';

eq('asset hash, beacon, comment, whitespace, entities do not count as a change',
  visibleText(BUILT) === visibleText(LIVE), true);
eq('a changed sentence counts as a change', visibleText(EDITED) === visibleText(LIVE), false);
eq('shared-module edit (git date moved), same visible text -> lastmod stays the live one',
  decideLastmod({ gitDate: GIT, headDate: HEAD, builtText: visibleText(BUILT),
    live: { text: visibleText(LIVE), lastmod: LIVE_LM } }).lastmod, LIVE_LM);
eq('visible text changed -> git date',
  decideLastmod({ gitDate: GIT, headDate: HEAD, builtText: visibleText(EDITED),
    live: { text: visibleText(LIVE), lastmod: LIVE_LM } }).lastmod, GIT);
eq('text changed but git date not newer than live (layout-only change) -> deploy commit date',
  decideLastmod({ gitDate: LIVE_LM, headDate: HEAD, builtText: visibleText(EDITED),
    live: { text: visibleText(LIVE), lastmod: LIVE_LM } }).lastmod, HEAD);
eq('live has no lastmod yet (first deploy) -> git date',
  decideLastmod({ gitDate: GIT, headDate: HEAD, builtText: visibleText(BUILT),
    live: { text: visibleText(LIVE), lastmod: undefined } }).lastmod, GIT);
eq('first deploy, seed matches this text -> seed date (when the text first hit main)',
  decideLastmod({ gitDate: GIT, headDate: HEAD, builtText: visibleText(BUILT),
    live: { text: visibleText(LIVE), lastmod: undefined },
    seed: { lastmod: LIVE_LM, text: textHash(visibleText(BUILT)) } }).lastmod, LIVE_LM);
eq('stale seed (text since changed) is ignored -> git date',
  decideLastmod({ gitDate: GIT, headDate: HEAD, builtText: visibleText(BUILT),
    live: { text: visibleText(LIVE), lastmod: undefined },
    seed: { lastmod: LIVE_LM, text: textHash(visibleText(EDITED)) } }).lastmod, GIT);
eq('header/nav/footer change alone is not a page change',
  visibleText('<body><nav>A</nav><main><p>x</p></main><footer>1</footer></body>') ===
  visibleText('<body><nav>A B</nav><main><p>x</p></main><footer>2</footer></body>'), true);
eq('live site unreachable -> git date (old rule), never a failure',
  decideLastmod({ gitDate: GIT, headDate: HEAD, builtText: visibleText(BUILT), live: null }).lastmod, GIT);
eq('page not live yet -> git date',
  decideLastmod({ gitDate: GIT, headDate: HEAD, builtText: visibleText(BUILT),
    live: { text: undefined, lastmod: undefined } }).lastmod, GIT);
eq('no page source -> no lastmod',
  decideLastmod({ gitDate: undefined, headDate: HEAD, builtText: '', live: null }).lastmod, undefined);

// ---- 2. the built sitemap ---------------------------------------------------
if (!existsSync(SITEMAP)) {
  console.error(`✗ ${SITEMAP} not found - run npm run build first`);
  process.exit(1);
}

const xml = readFileSync(SITEMAP, 'utf8');
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '',
  lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
}));

if (entries.length === 0) bad('sitemap has no <url> entries');

// W3C Datetime as the sitemap protocol allows it: date, or date-time with zone.
const W3C = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?$/;
const args = process.argv.slice(2);
const liveDir = args.includes('--live-dir') ? args[args.indexOf('--live-dir') + 1] : undefined;
const expectedBy = new Map(plan(liveDir).map((r) => [r.loc, r]));
const SITE_START = Date.parse('2026-08-01T00:00:00Z');
const now = Date.now();
let dated = 0;

for (const { loc, lastmod } of entries) {
  if (!loc.startsWith(SITE_URL)) { bad(`${loc}: not on ${SITE_URL}`); continue; }
  const exp = expectedBy.get(loc);
  const expected = exp?.lastmod;

  if (!expected) {
    if (lastmod) bad(`${loc}: has <lastmod>${lastmod}</lastmod> but no page source to date it from`);
    else console.log(`· ${loc}  (no page source, no lastmod - correct)`);
    continue;
  }
  if (!lastmod) { bad(`${loc}: missing <lastmod> (expected ${expected})`); continue; }
  if (!W3C.test(lastmod)) { bad(`${loc}: <lastmod> "${lastmod}" is not a W3C date-time`); continue; }
  const t = Date.parse(lastmod);
  if (Number.isNaN(t)) { bad(`${loc}: <lastmod> "${lastmod}" does not parse`); continue; }
  if (t > now) bad(`${loc}: <lastmod> ${lastmod} is in the future`);
  if (t < SITE_START) bad(`${loc}: <lastmod> ${lastmod} is before the site existed`);
  if (t !== Date.parse(expected)) bad(`${loc}: <lastmod> ${lastmod} != rule's ${expected} (${exp?.reason})`);
  else { dated++; console.log(`✓ ${loc}  ${lastmod}  (${exp?.reason})`); }
}

// A build-date stamp would make every value identical. Real history cannot.
const distinct = new Set(entries.map((e) => e.lastmod).filter(Boolean));
if (dated > 2 && distinct.size === 1) bad(`all ${dated} <lastmod> values are identical - looks like a build date`);

const keyFile = `dist/${INDEXNOW_KEY}.txt`;
if (!existsSync(keyFile)) bad(`${keyFile} missing - IndexNow key file did not ship`);
else if (readFileSync(keyFile, 'utf8').trim() !== INDEXNOW_KEY) bad(`${keyFile} content does not equal the key`);

console.log(`\n${dated}/${entries.length} URLs dated by the rule, ${distinct.size} distinct dates, ${fail} failure(s)`);
process.exit(fail ? 1 : 0);
