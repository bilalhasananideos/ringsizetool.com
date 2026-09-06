/**
 * Every number this site can display must be asserted against a published
 * source here. If you add a size system, add its assertions in the same commit.
 *
 * Run: npm run verify
 */
import {
  fromDiameter, fromCircumference, diameterFromUs, jpFromDiameter,
  ukFromCircumference, euFromCircumference, circMinus40, formatUs,
  inFromCircumference, sizeContext, CHART_ROWS,
  ISO_MIN, ISO_MAX, JP_MAX, UK_MAX_STEP, INDIA_MAX, CIRC_MINUS_40_MAX,
  AVERAGE_US_SIZE,
} from '../src/data/ringSizes.ts';
import {
  toMode, toDia, modeSpec, modeFromParams, ceilTo, floorTo,
  SOURCES, sourceSpec, sourceFromMeasure,
  DIA_MIN_MM, DIA_MAX_MM,
  type Source,
} from '../src/data/ringModes.ts';
import {
  PPM_MIN, PPM_MAX, DEFAULT_PX_PER_MM, STAGE_MAX_CIRCLE_PX,
} from '../src/data/calibration.ts';

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
/* Before these guards existed the slider's own top end (25 mm diameter at the
 * time) produced EU 79, JP 37 and UK Z+7½ - three sizes that do not exist. The
 * slider now stops at DIA_MAX_MM (24.35 mm), so 25 mm is beyond it entirely;
 * these stay as guards on the data module itself, which any page may call with
 * any number. Bounds confirmed against the standards on 28 Aug 2026:
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
 * end-to-end. The figures below (34.56 / 78.54 mm) were the slider's own
 * bounds before the range was pinned to ISO 8653's band; they now sit outside
 * it, and are kept because they assert the refusals that made pinning it
 * necessary. The reachable range is swept separately further down. */
const c52 = fromCircumference(52);
eq('circ 52 mm -> EU 52', c52.eu, 52);
eq('circ 52 mm -> diameter 16.552 mm', c52.diameterMm, 16.552, 0.001);
eq('circ 52 mm -> FR 12', c52.fr, 12);
/* Below the slider EVERY system refuses, US included: US 0 is 11.6332 mm, so
 * 11 mm is under the US scale too. Four em dashes is the honest answer for a
 * ring that small, and this pins it so nobody "fixes" the blank cells by
 * inventing a size 0. */
eq('below the slider (34.56 mm) -> EU refused (below ISO 41)', fromCircumference(34.56).eu, null);
eq('below the slider (34.56 mm) -> US refused (below US 0)', fromCircumference(34.56).us, null);
eq('US 0 arrives at 11.6332 mm', formatUs((11.6332 - 11.6332) / 0.8128), '0');
eq('above the slider (78.54 mm) -> EU refused (above ISO 76)', fromCircumference(78.54).eu, null);
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

console.log('\n— sizer modes: what the tool PRINTS must round-trip —');
/* The bug this catches, and how it hid for so long:
 *
 * Every assertion above feeds the maths module exact floating-point diameters.
 * A visitor cannot do that. They read a number off the screen — or off the
 * chart — and type it back in, and what they type has already been rounded to
 * the mode's own decimal places. So the real question is not "is fromDiameter
 * correct" (it is) but "is what we PRINT precise enough to name the size it
 * came from".
 *
 * It was not. Centimetres printed 2 dp = 0.1 mm of resolution, while a UK half
 * size is 0.199 mm of diameter and a Japanese size is 0.333 mm. 17 of the 21
 * half-size chart rows came back as a DIFFERENT size when typed into the cm
 * box. Diameter-in-inches stepped 0.005 in and could not land on US 11 at all.
 *
 * This walks every chart row through every mode the way a person would. */
{
  const key = (r: ReturnType<typeof fromDiameter>) => [r.us, r.uk, r.eu, r.jp, r.in].join('/');
  /* US 6¼ is a genuine knife-edge, not a defect, and is pinned separately
   * below. Excluded here so it cannot mask a real regression. */
  const KNIFE_EDGE = 6.25;
  for (const m of ['dia', 'circ'] as const) {
    for (const u of ['mm', 'cm', 'in'] as const) {
      const s3 = modeSpec(m, u);
      let wrong = 0;
      for (const row of CHART_ROWS) {
        if (row.usNumeric === null || row.usNumeric > 13 || row.usNumeric === KNIFE_EDGE) continue;
        const printed = toMode(row.diameterMm, m, u).toFixed(s3.dp);
        if (key(fromDiameter(toDia(parseFloat(printed), m, u))) !== key(row)) wrong++;
      }
      eq(`${m}/${u}: every printed chart value names its own size`, wrong, 0);
    }
  }
}

/* US 6¼ has an inner circumference of 52.5061 mm — six THOUSANDTHS of a
 * millimetre above the EU 52/53 rounding boundary. Printing its diameter at
 * 2 dp (16.71 mm) loses 0.0032 mm and drops it to EU 52. Nothing short of 4 dp
 * fixes that, and "16.7132 mm" claims a precision no one holding a ring
 * against glass possesses. The tool itself is unaffected — chart and
 * calculator both derive from diameterFromUs() and never round-trip through
 * the printed string. This pins the limit so it is a known quantity rather
 * than a surprise. */
eq('US 6¼ sits 0.0061 mm above the EU 52/53 boundary',
   Math.PI * diameterFromUs(6.25) - 52.5, 0.0061, 0.0001);
eq('US 6¼ is EU 53 when computed', fromDiameter(diameterFromUs(6.25)).eu, 53);
eq('US 6¼ is EU 52 when read back off a 2 dp print', fromDiameter(16.71).eu, 52);

console.log('\n— sizer modes: unit conversion must be exact on size boundaries —');
/* toDia used to DIVIDE by a per-unit fraction: { cm: 0.1 }, and 1.65 / 0.1 is
 * 16.499999999999996, not 16.5. That matters because 16.5 mm is exactly the
 * JP 11/12 boundary, so the same ring reported one Japanese size smaller when
 * entered in centimetres than in millimetres. Multiplying by 10 is exact. */
eq('1.65 cm is exactly 16.5 mm', toDia(1.65, 'dia', 'cm'), 16.5, 0);
eq('1.45 cm is exactly 14.5 mm', toDia(1.45, 'dia', 'cm'), 14.5, 0);
eq('1.65 cm and 16.5 mm agree on the Japanese size',
   fromDiameter(toDia(1.65, 'dia', 'cm')).jp, fromDiameter(16.5).jp);
eq('…and that size is 12, not 11', fromDiameter(toDia(1.65, 'dia', 'cm')).jp, 12);

console.log('\n— sizer modes: every reachable slider position names a real size —');
/* The old range (11.64-25 mm) put "US 16½" beside three em dashes at the top
 * and blanked EU/JP/India below 12.89 mm. DIA_MIN/MAX are now derived from
 * ISO 8653's rounding band, and this walks the ACTUAL step grid of all six
 * modes to prove ISO really is the binding constraint at both ends. */
{
  let blanks = 0;
  let positions = 0;
  for (const m of ['dia', 'circ'] as const) {
    for (const u of ['mm', 'cm', 'in'] as const) {
      const s4 = modeSpec(m, u);
      const step = parseFloat(s4.step);
      for (let v = Math.ceil(s4.min / step) * step; v <= s4.max + 1e-12; v += step) {
        const shown = parseFloat(v.toFixed(s4.dp));
        if (shown < s4.min || shown > s4.max) continue;
        positions++;
        const r = fromDiameter(toDia(shown, m, u));
        if ([r.us, r.uk, r.eu, r.jp, r.in, r.fr, r.br].some((x) => x === null)) blanks++;
      }
    }
  }
  eq(`all seven systems answer at every one of ${positions} slider positions`, blanks, 0);
}

/* And the slider must be able to REACH every size it prints in the chart:
 * one step is at most half a US quarter size away from any real diameter. */
for (const m of ['dia', 'circ'] as const) {
  for (const u of ['mm', 'cm', 'in'] as const) {
    const s5 = modeSpec(m, u);
    const step = parseFloat(s5.step);
    let worstMm = 0;
    for (const row of CHART_ROWS) {
      if (row.usNumeric === null || row.usNumeric > 13) continue;
      const exact = toMode(row.diameterMm, m, u);
      const snapped = s5.min + Math.round((exact - s5.min) / step) * step;
      worstMm = Math.max(worstMm, Math.abs(toDia(snapped, m, u) - row.diameterMm));
    }
    /* A US quarter size is 0.2032 mm. Landing within a tenth of one means the
     * snapped value always rounds to the size the visitor was aiming at. */
    eq(`${m}/${u} snaps within 0.02 mm of every real size`, worstMm < 0.02, true);
  }
}

console.log('\n— calibration: the drawn ring must fit the stage it is drawn in —');
/* The ring stage is a fixed 256 px box with a dashed guide circle inset 12 px
 * a side, and it clips. The largest circle the tool can ever draw is
 * DIA_MAX_MM x PPM_MAX, so raising either constant without checking the other
 * silently crops the ring — which would be an accuracy bug, not a visual one,
 * because a clipped circle cannot be matched against a real ring. */
eq('largest drawable ring fits inside the stage guide',
   DIA_MAX_MM * PPM_MAX <= STAGE_MAX_CIRCLE_PX, true);
eq('the default is the CSS spec figure, 96 dpi', DEFAULT_PX_PER_MM, 96 / 25.4, 1e-12);
eq('calibration floor is below every real screen', PPM_MIN < 3, true);
eq('calibration ceiling clears a modern phone (~6.2 px/mm)', PPM_MAX > 6.5, true);

/* Calibration and measurement are two independent lanes: pxPerMm decides how
 * LARGE things are drawn, the diameter in mm decides WHICH SIZE they are, and
 * the only place they meet is the circle's pixel width. Changing calibration
 * must never change the answer. */
for (const ppm of [PPM_MIN, DEFAULT_PX_PER_MM, 6.1, PPM_MAX]) {
  const r = fromDiameter(16.51);
  eq(`size at ${ppm.toFixed(2)} px/mm is unchanged by calibration`, r.us, '6');
  eq(`…and the circle is drawn at ${(16.51 * ppm).toFixed(1)} px`,
     16.51 * ppm <= STAGE_MAX_CIRCLE_PX, true);
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

console.log('\n— the source picker: "what do you have?" —');
/* The picker sits in FRONT of the six modes, so its table and the mode table
 * have to agree or the two controls fight each other on screen. Everything
 * below is an invariant the UI relies on, not a restatement of the data. */

eq('three sources, no more', SOURCES.length, 3);
eq('sourceSpec falls back on junk, does not throw',
   sourceSpec('caliper' as Source).key, 'ring');

for (const src of SOURCES) {
  eq(`${src.key} has a label`, src.label.length > 0, true);
  eq(`${src.key} has an instruction`, src.hint.length > 0, true);
  eq(`${src.key} round-trips through sourceSpec`, sourceSpec(src.key).key, src.key);
}

/* THE invariant. Picking a source pre-sets its measure, and setMode() then
 * derives the source back from that measure to keep the picker honest. If the
 * two disagree for any source, the button the visitor just pressed flips back
 * under their finger — setSource -> setMode -> syncSourceToMeasure -> setSource.
 * Asserting the round trip is what makes that loop provably a no-op. */
for (const src of SOURCES) {
  if (src.measure === null) continue;
  eq(`${src.key} -> ${src.measure} -> ${src.key}`, sourceFromMeasure(src.measure), src.key);
}

/* 'number' is chosen, never derived: nothing in a URL can tell you a person is
 * holding a caliper reading, so no measure may map to it. */
eq('no measure derives to "number"',
   (['dia', 'circ'] as const).some((m) => sourceFromMeasure(m) === 'number'), false);
eq('every measure derives to a source that exists',
   (['dia', 'circ'] as const).every((m) => SOURCES.some((x) => x.key === sourceFromMeasure(m))), true);

/* The stage is the input for exactly one route. A caption left showing while
 * the visitor is typing a number is an instruction that has stopped applying. */
eq('only the ring route captions the stage',
   SOURCES.filter((x) => x.stageCaption !== null).map((x) => x.key).join(','), 'ring');

/* The factor of pi, made testable. A ring laid on the circle is matched at its
 * INNER EDGE — a diameter. A paper strip round a finger is a circumference.
 * Wiring a source to the wrong measure is not a preference, it is a 3.14x
 * error in the answer, so the two specs are asserted against the arithmetic
 * rather than against each other. */
const dia6src = diameterFromUs(6);
const ringMeasure = sourceSpec('ring').measure!;
const fingerMeasure = sourceSpec('finger').measure!;
eq('ring route reads a diameter', toMode(dia6src, ringMeasure, 'mm'), dia6src, 1e-12);
eq('finger route reads a circumference',
   toMode(dia6src, fingerMeasure, 'mm'), dia6src * Math.PI, 1e-12);
eq('…and the two differ by exactly pi',
   toMode(dia6src, fingerMeasure, 'mm') / toMode(dia6src, ringMeasure, 'mm'), Math.PI, 1e-12);

/* A source only ever changes WHICH measure is read, never the size that comes
 * back from a given ring. Both routes describing the same physical ring must
 * land on the same US size. */
for (const src of SOURCES) {
  if (src.measure === null) continue;
  const back = toDia(toMode(dia6src, src.measure, 'mm'), src.measure, 'mm');
  eq(`${src.key} route returns US 6 for a US 6 ring`, fromDiameter(back).us, '6');
}

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
