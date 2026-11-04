/**
 * Proves the BUILT sitemap carries accurate <lastmod> values. Run after
 * `npm run build`:  npm run check:sitemap
 *
 * For every <url> in dist/sitemap-0.xml:
 *   - if the URL maps to a page file, <lastmod> must be present, a valid
 *     W3C date-time, not in the future, and equal to the last git commit of
 *     that page's sources (scripts/page-lastmod.mjs) - i.e. not the build date;
 *   - if it maps to nothing, it must carry NO <lastmod> (no guessed dates).
 * Also checks the IndexNow key file shipped with the right content.
 */
import { existsSync, readFileSync } from 'node:fs';
import { lastmodFor, pageFileFor } from './page-lastmod.mjs';
import { INDEXNOW_KEY } from './indexnow-key.mjs';
import { SITE_URL } from '../src/config.ts';

const SITEMAP = 'dist/sitemap-0.xml';
let fail = 0;
const bad = (msg: string) => { fail++; console.error(`✗ ${msg}`); };

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
const SITE_START = Date.parse('2026-08-01T00:00:00Z');
const now = Date.now();
let dated = 0;

for (const { loc, lastmod } of entries) {
  if (!loc.startsWith(SITE_URL)) { bad(`${loc}: not on ${SITE_URL}`); continue; }
  const path = new URL(loc).pathname;
  const expected = pageFileFor(path) ? lastmodFor(path) : undefined;

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
  if (t !== Date.parse(expected)) bad(`${loc}: <lastmod> ${lastmod} != last source commit ${expected}`);
  else { dated++; console.log(`✓ ${loc}  ${lastmod}`); }
}

// A build-date stamp would make every value identical. Real history cannot.
const distinct = new Set(entries.map((e) => e.lastmod).filter(Boolean));
if (dated > 2 && distinct.size === 1) bad(`all ${dated} <lastmod> values are identical - looks like a build date`);

const keyFile = `dist/${INDEXNOW_KEY}.txt`;
if (!existsSync(keyFile)) bad(`${keyFile} missing - IndexNow key file did not ship`);
else if (readFileSync(keyFile, 'utf8').trim() !== INDEXNOW_KEY) bad(`${keyFile} content does not equal the key`);

console.log(`\n${dated}/${entries.length} URLs dated from git, ${distinct.size} distinct dates, ${fail} failure(s)`);
process.exit(fail ? 1 : 0);
