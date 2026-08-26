import { fromDiameter, diameterFromUs, jpFromDiameter, ukFromCircumference, formatUs } from '../src/data/ringSizes.ts';

let pass = 0, fail = 0;
const eq = (label: string, got: any, want: any, tol = 0) => {
  const ok = typeof want === 'number' ? Math.abs(got - want) <= tol : got === want;
  ok ? pass++ : fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(46)} got=${typeof got === 'number' ? got.toFixed(3) : got}  want=${want}`);
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

console.log('\n— UK BS EN 28653:1993, A = 37.5 mm, +1.25/letter —');
eq('UK at 37.5 mm circ  -> A', ukFromCircumference(37.5), 'A');
eq('UK at 40.0 mm circ  -> C  (Wikipedia check)', ukFromCircumference(40.0), 'C');
eq('UK at 50.0 mm circ  -> K', ukFromCircumference(50.0), 'K');

console.log('\n— Internal consistency: circumference must equal PI x diameter —');
const r6 = fromDiameter(diameterFromUs(6));
eq('US 6 circumference mm', r6.circumferenceMm, Math.PI * 16.5100, 0.01);
eq('US 6 round-trips back to US 6', r6.us, '6');
console.log(`      US 6 -> UK ${r6.uk} | EU ${r6.eu} (exact ${r6.euExact.toFixed(2)}) | JP ${r6.jp} | IN ${r6.in} | FR ${r6.fr}`);

console.log('\n— No mode may disagree with another (the #1 competitor fails this) —');
for (const d of [14.0, 16.5100, 17.32, 19.76]) {
  const a = fromDiameter(d);
  const b = fromDiameter(a.circumferenceMm / Math.PI);
  eq(`round-trip at ${d} mm`, b.eu, a.eu);
}

console.log('\n— Quarter-size formatting —');
eq('6.25 formats', formatUs(6.25), '6¼');
eq('6.5  formats', formatUs(6.5),  '6½');
eq('7    formats', formatUs(7),    '7');

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
