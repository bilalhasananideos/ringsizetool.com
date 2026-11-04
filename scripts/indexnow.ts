/**
 * Tell IndexNow (Bing, Copilot, DuckDuckGo, Yandex...) which URLs changed in
 * this deploy. Google does not use IndexNow; this is for the engines where the
 * site already ranks.
 *
 * "Changed" = compare the NEW (settled) dist/sitemap-0.xml with a snapshot of the LIVE
 * sitemap taken just before the deploy (settle-lastmod.ts --fetch saves it). A URL is sent when it
 * is new, or its <lastmod> differs from the live one. Comparing against what
 * was actually live (not against the previous commit) means a cancelled or
 * failed run cannot silently drop a change: the next deploy still sees it.
 * The very first run sends every dated URL once, because the live sitemap had
 * no <lastmod> at all.
 *
 *   node ... scripts/indexnow.ts --live live-sitemap.xml            # dry run
 *   node ... scripts/indexnow.ts --live live-sitemap.xml --submit   # POSTs
 *
 * Dry run is the default so nothing reaches the API by accident.
 * Runs only after deploy: the key file must already be live for the POST to
 * be accepted, so it is fetched and checked first.
 */
import { existsSync, readFileSync } from 'node:fs';
import { INDEXNOW_KEY } from './indexnow-key.mjs';
import { SITE_URL, NOINDEX_SITE } from '../src/config.ts';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const args = process.argv.slice(2);
const livePath = args[args.indexOf('--live') + 1];
const submit = args.includes('--submit');

const parse = (xml: string) =>
  new Map(
    [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => [
      m[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '',
      m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
    ]),
  );
const same = (a?: string, b?: string) =>
  a === b || (!!a && !!b && Date.parse(a) === Date.parse(b));

if (NOINDEX_SITE) { console.log('NOINDEX_SITE is true - not announcing anything.'); process.exit(0); }
if (!args.includes('--live') || !livePath) { console.error('usage: --live <snapshot of live sitemap-0.xml> [--submit]'); process.exit(2); }

const next = parse(readFileSync('dist/sitemap-0.xml', 'utf8'));
const liveXml = existsSync(livePath) ? readFileSync(livePath, 'utf8') : '';
if (!liveXml.includes('<urlset')) {
  // Could not read what was live: we cannot tell what changed. Send nothing
  // rather than everything; the next deploy compares against the new live copy.
  console.warn(`::warning::No usable live sitemap snapshot at ${livePath}; skipping IndexNow.`);
  process.exit(0);
}
const live = parse(liveXml);

const changed = [...next].filter(([loc, lm]) => loc.startsWith(SITE_URL) && (!live.has(loc) || !same(live.get(loc), lm)))
  .map(([loc]) => loc);

console.log(`${changed.length} of ${next.size} sitemap URLs changed vs live:`);
for (const u of changed) console.log(`  ${u}  (live ${live.has(u) ? (live.get(u) ?? 'no lastmod') : 'absent'} -> ${next.get(u) ?? 'none'})`);
if (changed.length === 0) process.exit(0);

const host = new URL(SITE_URL).host;
const keyLocation = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const body = { host, key: INDEXNOW_KEY, keyLocation, urlList: changed };

if (!submit) {
  console.log('\nDry run (no --submit). Would POST to', ENDPOINT, '\n' + JSON.stringify(body, null, 2));
  process.exit(0);
}

// The deploy has just finished; give the edge a moment to serve the key file.
let keyOk = false;
for (let i = 0; i < 6 && !keyOk; i++) {
  if (i) await new Promise((r) => setTimeout(r, 10_000));
  try {
    const r = await fetch(keyLocation, { cache: 'no-store' });
    keyOk = r.ok && (await r.text()).trim() === INDEXNOW_KEY;
  } catch { /* retry */ }
}
if (!keyOk) { console.error(`::error::Key file not live at ${keyLocation}; not submitting.`); process.exit(1); }

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
// 200 OK and 202 Accepted are both success (202 = key validation pending).
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
