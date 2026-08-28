/**
 * Every number this site can display must be asserted against a published
 * source here. If you add a size system, add its assertions in the same commit.
 *
 * Run: npm run verify
 */
import {
  fromDiameter, fromCircumference, diameterFromUs, jpFromDiameter,
  ukFromCircumference, euFromCircumference, circMinus40, formatUs,
  inFromCircumference, sizeContext,
  ISO_MIN, ISO_MAX, JP_MAX, UK_MAX_STEP, INDIA_MAX, CIRC_MINUS_40_MAX,
  AVERAGE_US_SIZE,
} from '../src/data/ringSizes.ts';
import {
  toMode, toDia, modeSpec, modeFromParams, ceilTo, floorTo,
  DIA_MIN_MM, DIA_MAX_MM,
} from '../src/data/ringModes.ts';

let pass = 0, fail = 0;

const show = (v: unknown) =>
  v === null ? 'null' : typeof v === 'number' ? v.toFixed(3) : String(v);

const eq = (label: string, got: unknown, want: unknown, tol = 0) => {
  const ok = typeof want === 'number' && typeof got === 'number'
    ? Math.abs(got - want) <= tol
    : got === want;
  ok ? pass++ : fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(52)} got=${show(got)}  want=${show(want)}`);
};

console.log('\n— US diameter, vs Wikipedia formula 0.8128n + 11.63 —');
eq('US 3  diameter mm', diameterFromUs(3),  14.07, 0.02);
eq('US 6  diameter mm', diameterFromUs(6),  16.51, 0.02);
eq('US 7  diameter mm', diameterFromUs(7),  17.32, 0.02);
eq('US 10 diameter mm', diameterFromUs(10), 19.76, 0.02);
eq('US 13 diameter mm', diameterFromUs(13), 22.20, 0.02);

console.log('\n— Japan JIS S 4700:2022, vs published table —');
eq('JP from 15.00 mm  (table says 7)',  jpFromDiameter(15.00), 7);
eq('JP from 16.00 mm  (table says 10)', jpFromDiameter(16.00), 10);
eq('JP from 17.00 mm  (table says 13)', jpFromDiameter(17.00), 13);
eq('JP from 19.00 mm  (table says 19)', jpFromDiameter(19.00), 19);
eq('JP from 24.33 mm  (table says 35)', jpFromDiameter(24.33), 35);

console.log('\n— UK BS EN 28653:1993, C = 40 mm, +1.25/letter —');
eq('UK at 37.5 mm circ  -> A', ukFromCircumference(37.5), 'A');
eq('UK at 40.0 mm circ  -> C  (Wikipedia check)', ukFromCircumference(40.0), 'C');
eq('UK at 50.0 mm circ  -> K', ukFromCircumference(50.0), 'K');

console.log('\n— EU / ISO 8653:2016: the size IS the circumference in mm —');
eq('ISO at 50.00 mm circ -> 50', euFromCircumference(50), 50);
eq('ISO at 51.87 mm circ -> 52', euFromCircumference(51.8677), 52);
eq('ISO at 62.20 mm circ -> 62', euFromCircumference(62.2), 62);
eq('ISO below its 41 floor -> null', euFromCircumference(38), null);

console.log('\n— France / Italy / Spain: circumference - 40 —');
// Wikipedia: "size 10 in this system is equivalent to ISO 8653:2016 size 50"
eq('FR at ISO 50 -> 10  (Wikipedia worked example)', circMinus40(50), 10);
eq('FR at ISO 60 -> 20', circMinus40(60), 20);

console.log('\n— Brazil ABNT NBR 16058, aligned to ISO 8653 —');
// Brazilian trade rule: size + 40 = perimeter; perimeter / pi = diameter.
// Worked example published for aro 19: 59 mm perimeter -> 18.78 mm diameter.
eq('aro 19 -> perimeter 59 mm -> diameter', 59 / Math.PI, 18.78, 0.005);
eq('BR from that 18.78 mm diameter -> 19', fromDiameter(18.78).br, 19);
eq('BR from 47 mm circ -> 7', circMinus40(47), 7);

console.log('\n— India: no standard. Four jewellers agree on circumference - 40 —');
// Jewelove, RishiRich Jewels, Gems Mart Jewellers and Sukkhi all publish
// tables that fit circumference - 40 on every row.
eq('IN at 41.0 mm circ -> 1   (all four sources)', fromCircumference(41.0).in, 1);
eq('IN at 50.0 mm circ -> 10  (all four sources)', fromCircumference(50.0).in, 10);
eq('IN at 60.2 mm circ -> 20  (Sukkhi, GMJ)',      fromCircumference(60.2).in, 20);
eq('IN at 69.7 mm circ -> 30  (Sukkhi, GMJ)',      fromCircumference(69.7).in, 30);
eq('IN at 77.4 mm circ -> 37  (Sukkhi, fullest)',  fromCircumference(77.4).in, 37);
// Sukkhi lists size 12 at 16.51 mm - the same diameter as US 6.
eq('IN at 16.51 mm diameter -> 12 (Sukkhi)', fromDiameter(16.51).in, 12);

console.log('\n— India, Brazil and FR/IT/ES are one scale under three names —');
for (const d of [14.0, 16.51, 19.0, 22.0]) {
  const r = fromDiameter(d);
  eq(`at ${d} mm: IN === FR`, r.in, r.fr);
  eq(`at ${d} mm: BR === FR`, r.br, r.fr);
}

console.log('\n— Low-end guards: no system may invent a size it does not define —');
const tiny = fromDiameter(11);   // the ring slider can actually reach this
eq('11 mm -> US null (was "-1¼")', tiny.us, null);
eq('11 mm -> UK null',             tiny.uk, null);
eq('11 mm -> EU null',             tiny.eu, null);
eq('11 mm -> JP null (was -5)',    tiny.jp, null);
eq('11 mm -> FR null (was -5)',    tiny.fr, null);
eq('11 mm -> BR null (was -5)',    tiny.br, null);
eq('11 mm -> IN null',             tiny.in, null);
eq('formatUs(-1.25) -> null (was "-2¾")', formatUs(-1.25), null);
eq('formatUs(-0.75) -> null (was "-1¼")', formatUs(-0.75), null);

console.log('\n— Internal consistency: circumference must equal PI x diameter —');
const r6 = fromDiameter(diameterFromUs(6));
eq('US 6 circumference mm', r6.circumferenceMm, Math.PI * 16.5100, 0.01);
eq('US 6 round-trips back to US 6', r6.us, '6');
console.log(`      US 6 -> UK ${r6.uk} | EU ${r6.eu} (exact ${r6.euExact.toFixed(2)}) | JP ${r6.jp} | IN ${r6.in} | FR ${r6.fr} | BR ${r6.br}`);

console.log('\n— No mode may disagree with another (the #1 competitor fails this) —');
for (const d of [14.0, 16.5100, 17.32, 19.76]) {
  const a = fromDiameter(d);
  const b = fromDiameter(a.circumferenceMm / Math.PI);
  eq(`round-trip at ${d} mm`, b.eu, a.eu);
}

console.log('\n— Regression: competitors disagree here, we must not drift —');
// Audited in-browser Aug 2026. For US 6 (16.5100 mm):
//   ringsize.app -> L, brite.co -> M, ringssizechart -> L (its PDF says M).
// 16.5100 mm -> 51.8677 mm circ -> (51.8677-37.5)/1.25 = 11.494 -> L½.
eq('US 6 -> UK L½, between their L and their M', r6.uk, 'L½');
// ringssizechart's page says JP 11 for 16.50 mm; its own PDF says 12.
eq('US 6 -> JP 12 (their PDF agrees, their page does not)', r6.jp, 12);
// Its "Conversion Fact": "a 1/4 US size = 0.4 mm diameter / 1.26 mm circumference".
// Those are the HALF-size figures. A quarter size is half of each.
eq('quarter US size = 0.2032 mm diameter, not 0.4',
   diameterFromUs(6.25) - diameterFromUs(6), 0.2032, 0.0001);
eq('quarter US size = 0.6383 mm circumference, not 1.26',
   Math.PI * (diameterFromUs(6.25) - diameterFromUs(6)), 0.6383, 0.0001);

console.log('\n— Quarter-size formatting —');
eq('6.25 formats', formatUs(6.25), '6¼');
eq('6.5  formats', formatUs(6.5),  '6½');
eq('7    formats', formatUs(7),    '7');


console.log('\n— Upper bounds: no system may invent a size above its published range —');
/* Before these guards existed the slider's own top end (25 mm diameter, the
 * DIA_MAX in RingSizer.astro) produced EU 79, JP 37 and UK Z+7½ - three sizes
 * that do not exist. Bounds confirmed against the standards on 28 Aug 2026:
 *   ISO 8653:2016    41 to 76
 *   JIS S 4700:2022  1 to 35   (13.00 mm to 24.33 mm inner diameter)
 *   BS EN 28653:1993 A to Z+6
 */
const top = fromDiameter(25);
eq('slider top (25 mm) -> EU refused, not 79', top.eu, null);
eq('slider top (25 mm) -> JP refused, not 37', top.jp, null);
eq('slider top (25 mm) -> UK refused, not Z+7½', top.uk, null);
eq('slider top (25 mm) -> FR refused', top.fr, null);
eq('slider top (25 mm) -> BR refused', top.br, null);

// The last valid value on each scale must still come through.
eq(`EU ${ISO_MAX} is the last ISO size`, euFromCircumference(ISO_MAX), ISO_MAX);
eq(`EU ${ISO_MAX + 1} is past the standard`, euFromCircumference(ISO_MAX + 1), null);
eq(`EU ${ISO_MIN} is the first ISO size`, euFromCircumference(ISO_MIN), ISO_MIN);
eq(`JP ${JP_MAX} at 24.33 mm (JIS table's last row)`, jpFromDiameter(24.33), JP_MAX);
eq('JP refuses 24.7 mm, past the table', jpFromDiameter(24.7), null);
// Z+6 is half-step 31: circumference = 37.5 + 31 x 1.25 = 76.25 mm.
eq('UK Z+6 is the last British size', ukFromCircumference(37.5 + UK_MAX_STEP * 1.25), 'Z+6');
eq('UK refuses one full letter past Z+6', ukFromCircumference(37.5 + (UK_MAX_STEP + 1) * 1.25), null);
eq(`FR/BR cap at ${CIRC_MINUS_40_MAX} (= ISO ${ISO_MAX})`, circMinus40(ISO_MAX), CIRC_MINUS_40_MAX);
eq('FR/BR refuse ISO 77', circMinus40(77), null);
/* India is NOT ISO, so it does not inherit ISO's ceiling. Sukkhi - the fullest
 * published Indian table we found - runs 1 to 37, so India stops at 37 while
 * FR/BR stop at 36. The two scales are deliberately not aliased at the top. */
eq(`India reaches ${INDIA_MAX}, past FR/BR's ${CIRC_MINUS_40_MAX}`,
   inFromCircumference(40 + INDIA_MAX), INDIA_MAX);
eq('India refuses 38', inFromCircumference(40 + INDIA_MAX + 1), null);

console.log('\n— UK half-size rounding ties —');
/* Math.round(raw * 2) / 2 decides letter vs half-letter, and JS rounds .5 up
 * (away from zero for positives). Pin the behaviour so a future "cleanup" that
 * swaps in a different rounding cannot silently shift every UK letter. */
// raw = 11.25 -> step 11.5 -> L½ ; raw = 11.75 -> step 12 -> M
eq('raw 11.25 ties up to L½', ukFromCircumference(37.5 + 11.25 * 1.25), 'L½');
eq('raw 11.75 ties up to M',  ukFromCircumference(37.5 + 11.75 * 1.25), 'M');
eq('raw 0.25 ties up to A½',  ukFromCircumference(37.5 + 0.25 * 1.25),  'A½');
eq('exactly A at base circumference', ukFromCircumference(37.5), 'A');
eq('a hair below A is refused', ukFromCircumference(37.5 - 0.7), null);

console.log('\n— UK letter indexing across the whole scale —');
/* Only one of these is a true external anchor: BS EN 28653 states C = 40 mm,
 * and that is the single published figure the whole letter scale hangs off.
 * The rest are position checks: circ = 37.5 + 1.25n for the nth letter,
 * 0-indexed from A. They are NOT independent evidence, and they are not
 * pretending to be - their job is to catch an off-by-one in the letter
 * sequence, which is precisely where published British charts drift from each
 * other (see UK_NOTE). An off-by-one here would shift every UK answer the
 * site gives, and the C anchor alone would not catch it at the far end. */
eq('C  = 40.00 mm  (BS EN 28653, external)', ukFromCircumference(40.0),  'C');
eq('H  = 46.25 mm  (n=7)',                   ukFromCircumference(46.25), 'H');
eq('L  = 51.25 mm  (n=11)',                  ukFromCircumference(51.25), 'L');
eq('P  = 56.25 mm  (n=15)',                  ukFromCircumference(56.25), 'P');
eq('T  = 61.25 mm  (n=19)',                  ukFromCircumference(61.25), 'T');
eq('Z  = 68.75 mm  (n=25, last letter)',     ukFromCircumference(68.75), 'Z');

console.log('\n— fromCircumference(): the circumference slider path —');
/* The circumference mode feeds this function, and nothing asserted it
 * end-to-end. Note the slider's own bounds are DIA_MIN/MAX x PI = 34.56 to
 * 78.54 mm, so both ends must land on real sizes or on an honest refusal. */
const c52 = fromCircumference(52);
eq('circ 52 mm -> EU 52', c52.eu, 52);
eq('circ 52 mm -> diameter 16.552 mm', c52.diameterMm, 16.552, 0.001);
eq('circ 52 mm -> FR 12', c52.fr, 12);
/* At the very bottom of the slider's travel EVERY system refuses, including
 * US: DIA_MIN is 11 mm and US 0 is 11.6332 mm, so 11 mm is below the US scale
 * too. Four em dashes is the honest answer for a ring that small, and this
 * pins it so nobody "fixes" the blank cells by inventing a size 0. */
eq('circ slider bottom (34.56 mm) -> EU refused (below ISO 41)', fromCircumference(34.56).eu, null);
eq('circ slider bottom (34.56 mm) -> US refused (below US 0)', fromCircumference(34.56).us, null);
eq('US 0 arrives at 11.6332 mm', formatUs((11.6332 - 11.6332) / 0.8128), '0');
eq('circ slider top (78.54 mm) -> EU refused (above ISO 76)', fromCircumference(78.54).eu, null);
// mm mode and circumference mode must never disagree about the same ring.
eq('mm 16.51 and circ 51.8677 agree on EU',
   fromDiameter(16.51).eu, fromCircumference(Math.PI * 16.51).eu);
eq('mm 16.51 and circ 51.8677 agree on UK',
   fromDiameter(16.51).uk, fromCircumference(Math.PI * 16.51).uk);

console.log('\n— formatUs() boundary at zero —');
/* The guard used to test the raw value before quantising, so -0.1 was refused
 * even though it quarters to 0, which is a real US size. */
eq('-0.1 quarters to US 0, not null', formatUs(-0.1), '0');
eq('-0.2 is below the scale', formatUs(-0.2), null);
eq('0 formats as 0', formatUs(0), '0');

console.log('\n— sizeContext() band boundaries —');
/* The bands are |diff| < 0.5 (most common), <= 1.5 (slightly above/below),
 * then out of band. Nothing asserted them, so the boundaries were free to
 * drift and the copy would silently start calling a size "most common" when
 * it is not. */
const wAvg = AVERAGE_US_SIZE.women;              // 6
eq('women avg is the most common size', sizeContext(wAvg, 'women').includes('most common'), true);
eq('+0.25 from avg still most common', sizeContext(wAvg + 0.25, 'women').includes('most common'), true);
eq('+0.5 from avg is no longer most common', sizeContext(wAvg + 0.5, 'women').includes('most common'), false);
eq('+0.5 from avg reads as slightly above', sizeContext(wAvg + 0.5, 'women').includes('slightly above'), true);
eq('+1.5 from avg is the last slightly-above', sizeContext(wAvg + 1.5, 'women').includes('slightly'), true);
eq('+1.75 from avg drops out of band', sizeContext(wAvg + 1.75, 'women').includes('slightly'), false);
eq('-2 from avg reads as below', sizeContext(wAvg - 2, 'women').includes('below'), true);
eq("men's average is 9", AVERAGE_US_SIZE.men, 9);
eq('null size yields no sentence', sizeContext(null, 'women'), '');

console.log('\n— sizer modes: measure x unit —');
/* The tool can present the same measurement six ways. Each one is a number a
 * visitor may write down and hand to a jeweller, so each is asserted against
 * the definition rather than against the other five. US 6 = 16.51 mm. */
const dia6 = diameterFromUs(6);
eq('diameter, mm', toMode(dia6, 'dia', 'mm'), 16.51, 0.02);
eq('diameter, cm', toMode(dia6, 'dia', 'cm'), 1.651, 0.002);
eq('diameter, in', toMode(dia6, 'dia', 'in'), 0.65, 0.001);
eq('circumference, mm  (pi x 16.51)', toMode(dia6, 'circ', 'mm'), 51.87, 0.06);
eq('circumference, cm', toMode(dia6, 'circ', 'cm'), 5.187, 0.006);
eq('circumference, in', toMode(dia6, 'circ', 'in'), 2.042, 0.003);

/* Switching units must never mutate the measurement. The old four-button
 * switcher lost 0.02 mm on a mm -> cm -> in -> circ -> mm round trip, enough
 * to flip the Japanese size from 12 to 11 without the visitor touching
 * anything. Round-tripping through every mode has to be exact. */
for (const m of ['dia', 'circ'] as const) {
  for (const u of ['mm', 'cm', 'in'] as const) {
    eq(`${m}/${u} round-trips to the same diameter`, toDia(toMode(dia6, m, u), m, u), dia6, 1e-12);
  }
}

/* Every mode's slider must span the same physical range, and its displayed
 * end labels must sit INSIDE it - a label that advertises a value the slider
 * cannot reach is a number this site printed and cannot honour. */
for (const m of ['dia', 'circ'] as const) {
  for (const u of ['mm', 'cm', 'in'] as const) {
    const s = modeSpec(m, u);
    eq(`${m}/${u} min label is reachable`, toDia(parseFloat(ceilTo(s.min, s.dp)), m, u) >= DIA_MIN_MM - 1e-9, true);
    eq(`${m}/${u} max label is reachable`, toDia(parseFloat(floorTo(s.max, s.dp)), m, u) <= DIA_MAX_MM + 1e-9, true);
    /* One slider step must be finer than a US quarter size (0.2032 mm of
     * diameter), or the tool cannot express a size it prints. */
    const stepMm = parseFloat(s.step) / (toMode(1, m, u));
    eq(`${m}/${u} step is finer than a quarter size`, stepMm < 0.2032, true);
  }
}

console.log('\n— sizer modes: the ± nudge must not mutate the measurement —');
/* The ± buttons used to read the SLIDER's value, which the browser has already
 * snapped to the step grid, so one + followed by one - quantised the
 * measurement: in inches 16.51 mm became 16.48 and the Japanese size fell from
 * 12 to 11. The fixed handler derives the current value from the diameter it
 * is holding. This asserts the arithmetic that handler performs: + then - must
 * land back on the same diameter, in every mode, to the mode's own precision. */
for (const m of ['dia', 'circ'] as const) {
  for (const u of ['mm', 'cm', 'in'] as const) {
    const s2 = modeSpec(m, u);
    const round = (v: number) => parseFloat(v.toFixed(s2.dp));
    /* Start on the mode's own display grid. cm renders 2 dp, so 0.01 cm =
     * 0.1 mm is the finest figure that mode can show at all; asserting a
     * return to 16.51 mm there would be testing the display precision, not
     * the nudge. */
    const shown = round(toMode(16.51, m, u));
    const start = toDia(shown, m, u);
    const up = round(shown + s2.nudge);
    const back = round(toMode(toDia(up, m, u), m, u) - s2.nudge);
    eq(`${m}/${u} + then − returns the same diameter`, toDia(back, m, u), start, 5e-3);
    /* And one click must actually move the size by its stated nudge, not by
     * whatever the grid rounds it to. */
    eq(`${m}/${u} one + moves exactly one nudge`, up - shown, s2.nudge, 5e-3);
  }
}

console.log('\n— sizer modes: URL parsing —');
const FB = { measure: 'dia', unit: 'mm' } as const;
const parse = (q: string) => modeFromParams(new URLSearchParams(q), FB);
eq('?unit=inches', parse('unit=inches').unit, 'in');
eq('?unit=in', parse('unit=in').unit, 'in');
eq('?measure=circumference', parse('measure=circumference').measure, 'circ');
eq('?measure=CIRCUMFERENCE is case-insensitive', parse('measure=CIRCUMFERENCE').measure, 'circ');
eq('junk unit falls back, does not throw', parse('unit=furlong').unit, 'mm');
eq('junk measure falls back', parse('measure=weight').measure, 'dia');
eq('empty query falls back', parse('').unit, 'mm');

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
