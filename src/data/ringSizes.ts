/**
 * Ring size conversion.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS AND WHY IT IS WRITTEN THIS WAY
 *
 * Published ring size charts contradict each other. We verified this directly,
 * in a browser, in August 2026:
 *
 *   For US size 6, four ranking sites give three different UK answers:
 *     ringsize.app    -> L
 *     brite.co        -> M
 *     ringssizechart  -> L   (its own downloadable PDF says M)
 *   The standard gives L½, which sits exactly between L and M.
 *
 *   The site ranking #1 for "ring size calculator" contradicts *itself* four
 *   ways: its mm slider reports 16.50 mm as EU 52 while its cm slider reports
 *   the same 1.65 cm as EU 51.8; its two on-page charts disagree about US 5
 *   (16.2 mm vs 15.7 mm); its first chart skips sizes 6 and 8; and its PDF
 *   disagrees with its own web page on both UK and Japanese sizes.
 *
 * So we do not copy a chart. We COMPUTE every value from the published
 * standard, from a single canonical axis (inner diameter in mm), so that every
 * number we show is internally consistent and can be checked by hand.
 *
 * That consistency is the product.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * SOURCES
 *   ISO 8653:2016      EU sizes = inner circumference in mm
 *   BS EN 28653:1993   UK: C = 40 mm circumference, +1.25 mm per letter
 *   JIS S 4700:2022    Japan: size 1 = 13 mm diameter, +1/3 mm per size
 *   ABNT NBR 16058     Brazil: aligned to ISO 8653; size = circumference - 40
 *   France / Italy / Spain / Switzerland: circumference - 40
 *   US                 no governing standard; de facto 0.458" + 0.032" per size
 *   India              NO STANDARD EXISTS - see the India section below
 */

export const MM_PER_INCH = 25.4;

/* ── US / Canada ──────────────────────────────────────────────────────────
 * Size 0 = 0.458 in inner diameter, each whole size adds 0.032 in.
 * In mm: 11.6332 + 0.8128 n.  Wikipedia gives 0.8128 n + 11.63 - same figure.
 * There is no official standard body for US sizes; this is the de facto scale
 * every US manufacturer uses.
 */
export const US_BASE_MM = 0.458 * MM_PER_INCH;   // 11.6332
export const US_STEP_MM = 0.032 * MM_PER_INCH;   // 0.8128

export const usFromDiameter = (mm: number) => (mm - US_BASE_MM) / US_STEP_MM;
export const diameterFromUs = (size: number) => US_BASE_MM + US_STEP_MM * size;

/* ── UK / Australia / Ireland ─────────────────────────────────────────────
 * BS EN 28653:1993. Wikipedia: "ring size C has a circumference of 40 mm" and
 * "one alphabetical size division equals 1.25 mm of circumferential length".
 * C is the third letter, so A = 40 - 2 x 1.25 = 37.5 mm.
 * Half sizes sit halfway, at +0.625 mm.
 */
export const UK_BASE_CIRC_MM = 37.5;
export const UK_STEP_MM = 1.25;

const UK_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function ukFromCircumference(circMm: number): string | null {
  // Position on the letter scale, rounded to the nearest half size.
  const raw = (circMm - UK_BASE_CIRC_MM) / UK_STEP_MM;
  const step = Math.round(raw * 2) / 2;
  if (step < 0) return null;               // smaller than size A - no honest answer

  const whole = Math.floor(step);
  const half = step - whole >= 0.5;

  const letter = whole < UK_LETTERS.length
    ? UK_LETTERS[whole]
    : `Z+${whole - UK_LETTERS.length + 1}`;

  return half ? `${letter}½` : letter;
}

/* ── EU / ISO 8653:2016 ───────────────────────────────────────────────────
 * The size IS the inner circumference in mm. Nothing to convert.
 * ISO 8653:2016 tabulates 41 to 76; below 41 we report nothing rather than
 * inventing a size that the standard does not define.
 */
export const ISO_MIN = 41;

export function euFromCircumference(circMm: number): number | null {
  const n = Math.round(circMm);
  return n >= ISO_MIN ? n : null;
}

/* ── The "circumference minus 40" family ──────────────────────────────────
 * France, Italy, Spain, Switzerland, Brazil and - in practice - India all
 * number rings by inner circumference in millimetres minus 40. They are the
 * same physical scale wearing four different labels.
 *
 * France / Italy / Spain / Switzerland: Wikipedia, "ring sizes are specified
 *   as the circumference minus 40 mm: for example, size 10 in this system is
 *   equivalent to ISO 8653:2016 size 50."
 *
 * Brazil (ABNT NBR 16058:2012): aligned to ISO 8653. The Brazilian trade rule
 *   is stated as "add 40 to the size to get the perimeter, then divide by pi
 *   for the diameter" - e.g. aro 19 -> 59 mm perimeter -> 18.78 mm diameter.
 *   Our function reproduces that worked example exactly (see verify-sizes.ts).
 *
 * India: see the India note below. Same arithmetic, no standard behind it.
 */
export function circMinus40(circMm: number): number | null {
  const n = Math.round(circMm - 40);
  return n >= 1 ? n : null;
}

export const frFromCircumference = circMinus40;
export const brFromCircumference = circMinus40;

/* ── Japan - JIS S 4700:2022 ──────────────────────────────────────────────
 * Size 1 = 13 mm inner diameter; each size adds exactly 1/3 mm.
 * Verified: size 7 -> 15.00, size 10 -> 16.00, size 19 -> 19.00,
 *           size 35 -> 24.33. All match the published table exactly.
 *
 * Note: Wikipedia describes the Japanese scale as non-linear. That is wrong -
 * it is linear in diameter. Japan's *relationship to US sizes* is non-linear,
 * which is probably what was meant.
 */
export const JP_BASE_MM = 13;
export const JP_STEP_MM = 1 / 3;

export function jpFromDiameter(mm: number): number | null {
  const n = Math.round((mm - JP_BASE_MM) / JP_STEP_MM) + 1;
  return n >= 1 ? n : null;                // below 13 mm JIS defines nothing
}

/* ── India ────────────────────────────────────────────────────────────────
 * ⚠️ INDIA HAS NO OFFICIAL SIZING STANDARD. There is no BIS standard for ring
 * sizes, and Wikipedia notes only that India uses "a numerical scale with
 * whole sizes".
 *
 * What we did instead of copying somebody's chart: we compared the published
 * charts of four Indian jewellers (Jewelove, RishiRich Jewels, Gems Mart
 * Jewellers, Sukkhi). All four agree, across the entire range they publish,
 * that the Indian size number is the inner circumference in millimetres minus
 * 40 - the same scale France, Italy, Spain and Brazil use:
 *
 *      size  1 -> 41 mm circumference      size 20 -> 60 mm
 *      size 10 -> 50 mm                    size 30 -> ~69.7 mm
 *
 * Sukkhi publishes the fullest table (1-37) and it fits circumference - 40 on
 * every single row.
 *
 * BUT Tanishq - the largest jeweller in India - publishes a chart that runs
 * roughly one size SMALLER (its size 10 is ~16.30 mm, where the common
 * convention puts 16.30 mm at about size 11). We could not fetch Tanishq's
 * full table to confirm the offset across the range: tanishq.co.in blocks
 * requests from Pakistan, where this site is built.
 *
 * So we report the common convention AND say plainly that Tanishq differs.
 * Presenting a single Indian number as certain - which every competitor does -
 * is the actual error.
 */
export const INDIA_UNSTANDARDISED = true;

export const INDIA_NOTE =
  'India has no official ring size standard. Four Indian jewellers we checked ' +
  'number rings by inner circumference in millimetres minus 40, and that is ' +
  'what we show. Tanishq publishes a chart that runs about one size smaller. ' +
  'Give your jeweller the diameter in millimetres - that number is unambiguous.';

export const inFromCircumference = circMinus40;

/* ── Rounding ─────────────────────────────────────────────────────────────
 * US sizes are sold in quarters. Never report more precision than exists.
 */
export const toQuarter = (n: number) => Math.round(n * 4) / 4;

const QUARTER_MARKS: Record<string, string> = { '0.25': '¼', '0.5': '½', '0.75': '¾' };

/** Formats a non-negative quarter size. Returns null below US 0, where the
 *  scale stops - the old version returned strings like "-2¾" for -1.25. */
export function formatUs(size: number): string | null {
  if (size < 0) return null;
  const q = toQuarter(size);
  const whole = Math.floor(q);
  const frac = q - whole;
  return frac === 0 ? String(whole) : `${whole}${QUARTER_MARKS[String(frac)]}`;
}

/* ── The one function the UI calls ────────────────────────────────────────
 * Everything derives from inner diameter, which is what the tool measures.
 * Circumference is pi x diameter - exact, not a lookup, so the two can never
 * disagree the way they do on the site currently ranking #1.
 *
 * Every national field is `null` when that system does not define a size for
 * the given diameter. The UI renders null as an em dash. Nothing invents a
 * number to fill a cell.
 */
export interface RingSize {
  diameterMm: number;
  diameterIn: number;
  circumferenceMm: number;
  circumferenceIn: number;
  us: string | null;
  usNumeric: number | null;
  uk: string | null;
  eu: number | null;
  euExact: number;
  fr: number | null;
  jp: number | null;
  br: number | null;
  in: number | null;
}

export function fromDiameter(diameterMm: number): RingSize {
  const circumferenceMm = Math.PI * diameterMm;
  const rawUs = toQuarter(usFromDiameter(diameterMm));
  const us = formatUs(rawUs);

  return {
    diameterMm,
    diameterIn: diameterMm / MM_PER_INCH,
    circumferenceMm,
    circumferenceIn: circumferenceMm / MM_PER_INCH,
    us,
    usNumeric: us === null ? null : rawUs,
    uk: ukFromCircumference(circumferenceMm),
    eu: euFromCircumference(circumferenceMm),
    euExact: circumferenceMm,
    fr: frFromCircumference(circumferenceMm),
    jp: jpFromDiameter(diameterMm),
    br: brFromCircumference(circumferenceMm),
    in: inFromCircumference(circumferenceMm),
  };
}

export const fromCircumference = (circMm: number) => fromDiameter(circMm / Math.PI);

/** US 3 to 14 in quarter steps - the range actually sold. */
export const CHART_ROWS: RingSize[] = Array.from(
  { length: (14 - 3) * 4 + 1 },
  (_, i) => fromDiameter(diameterFromUs(3 + i * 0.25)),
);

/* ── Context for the result ───────────────────────────────────────────────
 * Google's People Also Ask carries three separate versions of this question:
 * "is size 7 a large ring", "is a size 7 ring big for a girl",
 * "what is the most common ring size". People want to know whether their
 * number is normal. No competitor answers it.
 */
export const AVERAGE_US_SIZE = { women: 6, men: 9 } as const;

export function sizeContext(usSize: number | null, who: 'women' | 'men'): string {
  if (usSize === null) return '';
  const avg = AVERAGE_US_SIZE[who];
  const diff = usSize - avg;
  if (Math.abs(diff) < 0.5) return `US ${formatUs(usSize)} is the most common size for ${who}.`;
  if (Math.abs(diff) <= 1.5) {
    return `US ${formatUs(usSize)} is slightly ${diff > 0 ? 'above' : 'below'} the ${who}'s average of ${avg}, and well within the common range.`;
  }
  return `US ${formatUs(usSize)} is ${diff > 0 ? 'above' : 'below'} the ${who}'s average of ${avg}. Sizes across adults commonly run from about 4 to 13.`;
}
