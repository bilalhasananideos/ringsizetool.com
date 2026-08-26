/**
 * Ring size conversion.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS AND WHY IT IS WRITTEN THIS WAY
 *
 * Published ring size charts contradict each other. We verified this directly:
 *
 *   For a 16.51 mm inner diameter (US size 6), three ranking sites disagree on
 *   the UK equivalent — one says L, one says L½, one says M.
 *
 *   The site currently ranking #1 for "ring size calculator" contradicts
 *   *itself*: its mm slider reports 16.50 mm as EU 52 while its cm slider
 *   reports the same 1.65 cm as EU 51.8. Its two on-page charts also disagree
 *   (US 5 = 16.2 mm in one, 15.7 mm in the other).
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
 *   BS EN 28653:1993   UK: A = 37.5 mm circumference, +1.25 mm per letter
 *   JIS S 4700:2022    Japan: size 1 = 13 mm diameter, +1/3 mm per size
 *   NBR 16058          Brazil: size 1 = 13.05 mm diameter
 *   US                 no governing standard; de facto 0.458" + 0.032" per size
 *   India              NO STANDARD EXISTS — see INDIA_TABLE note below
 *
 * Cross-checked against Wikipedia "Ring size" and ringsize.online, which agree
 * on the US and UK formulas.
 */

export const MM_PER_INCH = 25.4;

/* ── US / Canada ──────────────────────────────────────────────────────────
 * Size 0 = 0.458 in inner diameter, each whole size adds 0.032 in.
 * In mm: 11.6332 + 0.8128 n.  Wikipedia gives 0.8128 n + 11.63 — same figure.
 * There is no official standard body for US sizes; this is the de facto scale
 * every US manufacturer uses.
 */
export const US_BASE_MM = 0.458 * MM_PER_INCH;   // 11.6332
export const US_STEP_MM = 0.032 * MM_PER_INCH;   // 0.8128

export const usFromDiameter = (mm: number) => (mm - US_BASE_MM) / US_STEP_MM;
export const diameterFromUs = (size: number) => US_BASE_MM + US_STEP_MM * size;

/* ── UK / Australia / Ireland ─────────────────────────────────────────────
 * BS EN 28653:1993. A = 37.5 mm circumference, each letter +1.25 mm.
 * Half sizes sit halfway, at +0.625 mm.
 * (Wikipedia states C = 40 mm. 37.5 + 2 x 1.25 = 40. The two agree.)
 */
export const UK_BASE_CIRC_MM = 37.5;
export const UK_STEP_MM = 1.25;

const UK_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function ukFromCircumference(circMm: number): string {
  // Position on the letter scale, rounded to the nearest half size.
  const raw = (circMm - UK_BASE_CIRC_MM) / UK_STEP_MM;
  const step = Math.round(raw * 2) / 2;
  if (step < 0) return '—';

  const whole = Math.floor(step);
  const half = step - whole >= 0.5;

  const letter = whole < UK_LETTERS.length
    ? UK_LETTERS[whole]
    : `Z+${whole - UK_LETTERS.length + 1}`;

  return half ? `${letter}½` : letter;
}

/* ── EU / ISO 8653:2016 ───────────────────────────────────────────────────
 * The size IS the inner circumference in mm. Nothing to convert.
 * Jewellers usually quote whole millimetres; we show both the exact value and
 * the nominal size so nothing is hidden.
 */
export const euFromCircumference = (circMm: number) => Math.round(circMm);

/* ── France / Switzerland / Italy / Spain ─────────────────────────────────
 * Circumference minus 40. Same physical scale as ISO, different numbering.
 */
export const frFromCircumference = (circMm: number) => Math.round(circMm - 40);

/* ── Japan — JIS S 4700:2022 ──────────────────────────────────────────────
 * Size 1 = 13 mm inner diameter; each size adds exactly 1/3 mm.
 * Verified: size 7 -> 15.00, size 10 -> 16.00, size 19 -> 19.00,
 *           size 35 -> 24.33. All match the published table exactly.
 *
 * Note: Wikipedia describes the Japanese scale as non-linear. That is wrong —
 * it is linear in diameter. Japan's *relationship to US sizes* is non-linear,
 * which is probably what was meant.
 */
export const JP_BASE_MM = 13;
export const JP_STEP_MM = 1 / 3;

export const jpFromDiameter = (mm: number) =>
  Math.round((mm - JP_BASE_MM) / JP_STEP_MM) + 1;

/* ── Brazil — NBR 16058 ───────────────────────────────────────────────────
 * Size 1 = 13.05 mm diameter, roughly 0.325 mm per size.
 */
export const brFromDiameter = (mm: number) =>
  Math.round((mm - 13.05) / 0.325) + 1;

/* ── India ────────────────────────────────────────────────────────────────
 * ⚠️ INDIA HAS NO OFFICIAL STANDARD, and the published charts genuinely differ.
 *
 * Tanishq (a major Indian jeweller) publishes size 10 = 15.90 mm and
 * size 30 = 22.30 mm. ringsize.online publishes 15.8 mm and 22.1 mm for the
 * same sizes — a drift of 0.1 to 0.2 mm.
 *
 * Neither is "wrong". There is no standard to be wrong about.
 *
 * We use the values below, and the UI must SAY that Indian sizes vary by
 * jeweller and show the diameter in mm alongside, so the reader can confirm
 * against whichever chart their jeweller uses. Presenting a single Indian
 * number as certain — which every competitor does — is the actual error.
 */
export const INDIA_UNSTANDARDISED = true;

const INDIA_TABLE: ReadonlyArray<readonly [size: number, diameterMm: number]> = [
  [1, 13.1], [2, 13.4], [3, 13.7], [4, 14.0], [5, 14.3], [6, 14.6],
  [7, 14.9], [8, 15.2], [9, 15.5], [10, 15.8], [11, 16.1], [12, 16.4],
  [13, 16.7], [14, 17.0], [15, 17.3], [16, 17.6], [17, 17.9], [18, 18.5],
  [19, 18.8], [20, 19.1], [21, 19.4], [22, 19.7], [23, 20.0], [24, 20.3],
  [25, 20.6], [26, 20.9], [27, 21.2], [28, 21.5], [29, 21.8], [30, 22.1],
  [31, 22.4], [32, 23.0], [33, 23.3], [34, 23.6], [35, 23.9], [36, 24.2],
];

export function inFromDiameter(mm: number): number | null {
  let best: number | null = null;
  let bestGap = Infinity;
  for (const [size, d] of INDIA_TABLE) {
    const gap = Math.abs(d - mm);
    if (gap < bestGap) { bestGap = gap; best = size; }
  }
  // Beyond the published range, no honest answer exists.
  return bestGap <= 0.35 ? best : null;
}

/* ── Rounding ─────────────────────────────────────────────────────────────
 * US sizes are sold in quarters. Never report more precision than exists.
 */
export const toQuarter = (n: number) => Math.round(n * 4) / 4;

export function formatUs(size: number): string {
  const q = toQuarter(size);
  const whole = Math.floor(q);
  const frac = q - whole;
  const marks: Record<string, string> = { '0.25': '¼', '0.5': '½', '0.75': '¾' };
  return frac === 0 ? String(whole) : `${whole}${marks[String(frac)]}`;
}

/* ── The one function the UI calls ────────────────────────────────────────
 * Everything derives from inner diameter, which is what the tool measures.
 * Circumference is pi x diameter — exact, not a lookup, so the two can never
 * disagree the way they do on the site currently ranking #1.
 */
export interface RingSize {
  diameterMm: number;
  diameterIn: number;
  circumferenceMm: number;
  circumferenceIn: number;
  us: string;
  usNumeric: number;
  uk: string;
  eu: number;
  euExact: number;
  fr: number;
  jp: number;
  br: number;
  in: number | null;
}

export function fromDiameter(diameterMm: number): RingSize {
  const circumferenceMm = Math.PI * diameterMm;
  const usNumeric = toQuarter(usFromDiameter(diameterMm));

  return {
    diameterMm,
    diameterIn: diameterMm / MM_PER_INCH,
    circumferenceMm,
    circumferenceIn: circumferenceMm / MM_PER_INCH,
    us: formatUs(usNumeric),
    usNumeric,
    uk: ukFromCircumference(circumferenceMm),
    eu: euFromCircumference(circumferenceMm),
    euExact: circumferenceMm,
    fr: frFromCircumference(circumferenceMm),
    jp: jpFromDiameter(diameterMm),
    br: brFromDiameter(diameterMm),
    in: inFromDiameter(diameterMm),
  };
}

export const fromCircumference = (circMm: number) => fromDiameter(circMm / Math.PI);

/** US 3 to 14 in quarter steps — the range actually sold. */
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

export function sizeContext(usSize: number, who: 'women' | 'men'): string {
  const avg = AVERAGE_US_SIZE[who];
  const diff = usSize - avg;
  const label = who === 'women' ? 'women' : 'men';
  if (Math.abs(diff) < 0.5) return `US ${formatUs(usSize)} is the most common size for ${label}.`;
  if (Math.abs(diff) <= 1.5) {
    return `US ${formatUs(usSize)} is slightly ${diff > 0 ? 'above' : 'below'} the ${label}'s average of ${avg}, and well within the common range.`;
  }
  return `US ${formatUs(usSize)} is ${diff > 0 ? 'above' : 'below'} the ${label}'s average of ${avg}. Sizes across adults commonly run from about 4 to 13.`;
}
