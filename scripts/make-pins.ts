/**
 * Pinterest pin images, 1000 × 1500 (2:3, Pinterest's recommended ratio).
 *
 * Every size on a pin comes from src/data/ringSizes.ts, the same functions the
 * site uses, so a pin can never disagree with the page it links to. Writes one
 * HTML file per pin to marketing/pins/; render them to PNG with:
 *
 *   node --experimental-strip-types scripts/make-pins.ts
 *   (then the Chrome headless command it prints)
 *
 * These are NOT served by the site. They are uploaded to Pinterest by hand.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fromDiameter, diameterFromUs, ukWholeLetterUp, US_STEP_MM } from '../src/data/ringSizes.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'marketing', 'pins');
mkdirSync(out, { recursive: true });
const fonts = join(root, 'public', 'fonts');

/* Light theme tokens from src/styles/global.css. */
const c = {
  bg: '#FBFBFA', surface: '#FFFFFF', sunk: '#F5F3ED', text: '#1A1C1C', muted: '#524C3E',
  faint: '#726C5D', border: '#E8E4D9', accent: '#D4AF37', accentText: '#8B680A', accentSunk: '#FDF8EC',
};

const page = (title: string, body: string) => `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
@font-face{font-family:'Playfair Display';src:url('file://${fonts}/playfair-var-latin.woff2') format('woff2');font-weight:400 900}
@font-face{font-family:'Inter';src:url('file://${fonts}/inter-var-latin.woff2') format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0}
html,body{width:1000px;height:1500px;background:${c.bg};color:${c.text};font-family:Inter,sans-serif}
.pin{width:1000px;height:1500px;padding:80px 72px 64px;display:flex;flex-direction:column}
.kicker{font-size:26px;letter-spacing:.14em;text-transform:uppercase;color:${c.accentText};font-weight:600}
h1{font-family:'Playfair Display',serif;font-size:92px;line-height:1.02;margin-top:20px;font-weight:700}
h1 em{font-style:normal;color:${c.accentText}}
.lede{font-size:32px;line-height:1.4;color:${c.muted};margin-top:28px}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;border-top:2px solid ${c.border};padding-top:32px;font-size:30px}
.foot b{font-weight:700}
.foot span{color:${c.faint}}
table{width:100%;border-collapse:collapse;margin-top:44px;font-size:34px;font-variant-numeric:tabular-nums}
th{background:${c.sunk};text-align:left;font-weight:600;font-size:26px;color:${c.muted};padding:16px 18px;text-transform:uppercase;letter-spacing:.06em}
td{padding:17px 18px;border-top:2px solid ${c.border}}
td:first-child{font-weight:700}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:44px}
.tile{background:${c.surface};border:2px solid ${c.border};border-radius:20px;padding:22px 28px}
.tile .us{font-size:28px;color:${c.faint}}
.tile .uk{font-family:'Playfair Display',serif;font-size:64px;font-weight:700;line-height:1.1}
.tile .buy{font-size:26px;color:${c.muted}}
.steps{margin-top:48px;display:flex;flex-direction:column;gap:26px}
.step{display:flex;gap:26px;align-items:flex-start;background:${c.surface};border:2px solid ${c.border};border-radius:20px;padding:28px}
.n{flex:none;width:64px;height:64px;border-radius:50%;background:${c.accent};color:#1A1608;font-size:34px;font-weight:700;display:flex;align-items:center;justify-content:center}
.step p{font-size:32px;line-height:1.35}
.step p b{display:block;font-size:36px;margin-bottom:6px}
.note{margin-top:34px;font-size:28px;line-height:1.4;color:${c.muted};background:${c.accentSunk};border-left:6px solid ${c.accent};padding:22px 26px;border-radius:0 14px 14px 0}
</style></head><body><div class="pin">${body}</div></body></html>`;

const foot = (path: string) =>
  `<div class="foot"><b>ringsizetool.com</b><span>${path}</span></div>`;

/* ── Pin 1: ring size chart, whole US sizes 4–12 ───────────────────────── */
const chartRows = Array.from({ length: 9 }, (_, i) => fromDiameter(diameterFromUs(4 + i)));
writeFileSync(join(out, 'pin-ring-size-chart.html'), page('Ring size chart', `
  <div class="kicker">Free ring size chart</div>
  <h1>Ring size chart<br><em>in mm</em></h1>
  <p class="lede">Inside diameter of a ring you already own, with the US, UK and EU size it matches.</p>
  <table>
    <thead><tr><th>US</th><th>UK / AU</th><th>EU</th><th>Diameter</th></tr></thead>
    <tbody>${chartRows.map((r) => `<tr><td>${r.us}</td><td>${r.uk}</td><td>${r.eu}</td><td>${r.diameterMm.toFixed(1)} mm</td></tr>`).join('')}</tbody>
  </table>
  <p class="note">Every quarter size from US 3 to 15½, in seven systems, is on the full chart.</p>
  ${foot('/ring-size-chart')}`));

/* ── Pin 2: US sizes in letters, US 4–11 ───────────────────────────────── */
const letterRows = Array.from({ length: 8 }, (_, i) => fromDiameter(diameterFromUs(4 + i)));
const us7 = letterRows[3];
writeFileSync(join(out, 'pin-us-sizes-in-letters.html'), page('US ring sizes in letters', `
  <div class="kicker">UK &amp; Australian sizes</div>
  <h1>US ring sizes<br><em>in letters</em></h1>
  <p class="lede">A US ${us7.us} is ${us7.uk}. If the shop sells whole letters only, go one up: ${ukWholeLetterUp(us7.circumferenceMm)}.</p>
  <div class="grid">${letterRows.map((r) => `<div class="tile"><div class="us">US ${r.us}</div><div class="uk">${r.uk}</div><div class="buy">Whole letter ${ukWholeLetterUp(r.circumferenceMm)}</div></div>`).join('')}</div>
  ${foot('/uk-ring-size-chart')}`));

/* ── Pin 3: printable ring sizer, how to use it ────────────────────────── */
const SCALE_ERR_PCT = 4; // same figure as /printable-ring-sizer
const errAt7 = ((SCALE_ERR_PCT / 100) * diameterFromUs(7)) / US_STEP_MM;
writeFileSync(join(out, 'pin-printable-ring-sizer.html'), page('Printable ring sizer', `
  <div class="kicker">Free, no download</div>
  <h1>Printable<br><em>ring sizer</em></h1>
  <p class="lede">Find your ring size at home with a printer and a ruler.</p>
  <div class="steps">
    <div class="step"><div class="n">1</div><p><b>Print at 100%</b>Turn off “fit to page”. Most browsers shrink the page unless you do.</p></div>
    <div class="step"><div class="n">2</div><p><b>Check the square</b>Measure the check square with a ruler before you trust the sheet.</p></div>
    <div class="step"><div class="n">3</div><p><b>Measure</b>Lay a ring you own on the circles, or wrap the strip round your finger.</p></div>
  </div>
  <p class="note">Printed ${SCALE_ERR_PCT}% small, a sizer reads about ${errAt7.toFixed(1)} of a size too tight at US 7. That is why step 2 matters.</p>
  ${foot('/printable-ring-sizer')}`));

console.log(`Wrote 3 pins to ${out}`);
