/**
 * Every number this site can display must be asserted against a published
 * source here. If you add a size system, add its assertions in the same commit.
 *
 * Run: npm run verify
 */
import {
  fromDiameter, fromCircumference, diameterFromUs, jpFromDiameter,
  ukFromCircumference, euFromCircumference, circMinus40, formatUs,
} from '../src/data/ringSizes.ts';

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

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
