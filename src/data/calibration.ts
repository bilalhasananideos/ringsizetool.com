/**
 * Screen calibration: turning CSS pixels into millimetres.
 *
 * A CSS pixel is not a physical length on a screen. The CSS spec pins
 * 1in = 96px and says so explicitly — "too much existing content relies on the
 * assumption of 96dpi" — so `width: 10mm` on a phone is 10 × 96/25.4 CSS px,
 * which is whatever size the device decides that is. On a modern phone the real
 * figure is closer to 6.1 px/mm than the 3.78 the spec implies.
 *
 * That is the whole reason this tool asks the visitor to hold a bank card
 * against the glass: it is the one object of known size almost everyone owns.
 * Everything the sizer draws at physical scale reads its pixels-per-millimetre
 * from here.
 *
 * Note that `/printable-ring-sizer` deliberately does NOT use any of this. In
 * print media the anchor unit IS the physical inch, so CSS `mm` is honoured as
 * a real millimetre and calibration would only corrupt it.
 */

import { MM_PER_INCH, US_STEP_MM } from './ringSizes.ts';

/**
 * ISO/IEC 7810 ID-1 — the format of every payment card, driving licence and
 * ID card in the world. 85.60 × 53.98 mm, corners radiused 2.88–3.48 mm.
 * The card is held upright, so its SHORT edge is what the outline matches.
 */
export const CARD_SHORT_MM = 53.98;
export const CARD_LONG_MM = 85.6;
/** Midpoint of the standard's 2.88–3.48 mm corner radius. */
export const CARD_CORNER_MM = 3.18;

/**
 * The CSS spec's own figure: 1in = 96px, so 96/25.4 = 3.7795… px/mm. This is
 * the right *starting* guess and the wrong *final* answer on almost every
 * phone, which is why the calibration drawer opens on first visit.
 */
export const DEFAULT_PX_PER_MM = 96 / MM_PER_INCH;

/**
 * Calibration bounds.
 *
 * The ceiling is not arbitrary. The ring stage is a fixed 256 CSS px box with
 * `overflow-hidden`, so a ring wider than the stage is clipped. STAGE_INSET_PX
 * below reserves 12 px a side, which caps the drawable ring at 232 px; at
 * DIA_MAX_MM (24.35 mm) that puts the true ceiling at 232/24.35 = 9.5 px/mm.
 * 8 leaves honest headroom and covers every phone on the market
 * (iPhone 14 ≈ 6.1, S23 Ultra ≈ 6.2). `verify-sizes.ts` asserts the
 * relationship, so raising one without checking the other cannot silently clip.
 *
 * ⚠️ The 12 px inset was originally the dashed guide circle's, and **that circle
 * was removed on 31 Aug** — the ring could never fill it, so it read as the tool
 * drawing rings too small. See STATUS.md. The inset is kept anyway: it is now
 * breathing room rather than a guide, the arithmetic above still holds, and
 * shrinking it to gain 24 px of ceiling would buy nothing (8 already clears the
 * densest phone by 1.8 px/mm) while making the stage feel cramped.
 */
export const PPM_MIN = 2.5;
export const PPM_MAX = 8;

/**
 * Where the slider STARTS when nobody has calibrated yet.
 *
 * `DEFAULT_PX_PER_MM` is 96 DPI, i.e. 3.78 px/mm — a 1990s desktop monitor. On a
 * phone it is not merely imprecise, it is the wrong ballpark: a modern handset is
 * around 6.1 px/mm, so the tool opened with its card outline rendering at
 *
 *     53.98 mm x 3.78 = 204 CSS px, which on a 6.1 px/mm screen is 33 mm
 *
 * against a card whose short edge is 53.98 mm. **62% of the object it is asking
 * you to match.** The owner tried it on a real phone (31 Aug) and reported the
 * box simply looked wrong, which it did — the first impression of the site's one
 * differentiator was an outline two-thirds the size of the card in your hand.
 *
 * Starting narrow screens at 6 renders the same outline at 53 mm on that phone,
 * 98% of the card, so calibrating becomes a nudge instead of a 60% drag.
 *
 * This is a STARTING POINT, not a claim. The scale marker still reads "Not
 * calibrated yet" until a value is saved, because a better guess is still a
 * guess — see `setCalibrated` in RingSizer.astro.
 *
 * 6 rather than 6.1: phones run roughly 5.5-6.5, and a default that is a touch
 * low is kinder than one a touch high, since the drawer opens with the outline
 * slightly SMALLER than the card and growing it to fit reads as the obvious move.
 */
export const PHONE_PX_PER_MM = 6;

/** Below this viewport width the phone starting point is used instead of 96 DPI.
 *  500 px is comfortably above every phone and below every tablet in portrait. */
export const PHONE_VIEWPORT_MAX_PX = 500;

/** Ring stage geometry, in CSS px. Mirrors `h-64 w-64` and `inset-3`. */
export const STAGE_PX = 256;
export const STAGE_INSET_PX = 12;
export const STAGE_MAX_CIRCLE_PX = STAGE_PX - 2 * STAGE_INSET_PX;

/** localStorage key. Namespaced so it cannot collide with anything else. */
export const PPM_STORE_KEY = 'rst.pxPerMm';

/* Stored ALONGSIDE the calibration, in its own key rather than by changing the
 * shape of the one above — an existing visitor's saved px/mm must keep loading.
 *
 * Why it exists: a calibration is only valid at the zoom level it was taken at.
 * `visualViewport.scale` catches pinch-zoom, but desktop browser zoom (Ctrl +/-)
 * does not touch it — that moves `devicePixelRatio` instead. So the DPR at the
 * moment of calibration is recorded, and a later mismatch means the screen no
 * longer puts `pxPerMm` pixels in a millimetre.
 *
 * Absent for anyone who calibrated before this shipped. Treat missing as "cannot
 * tell" and stay quiet: a false zoom warning would train people to ignore it. */
export const DPR_STORE_KEY = 'rst.dprAtCalibration';

/** Clamp any candidate value into the usable range. */
export const clampPpm = (v: number) => Math.min(PPM_MAX, Math.max(PPM_MIN, v));


/* ══════════════════════════════════════════════════════════════════════════
 * Reference objects
 * ═════════════════════════════════════════════════════════════════════════
 *
 * The card is the best reference almost everyone owns, and it stays the
 * default. These exist for the visitor who has no card at all — for whom the
 * alternative is not "a slightly worse calibration", it is the uncalibrated
 * 96 DPI / phone guess, which can be 40% out. A 2%-error calibration beats
 * that by a wide margin, and that is the whole case for this list.
 *
 * It is NOT the case that more objects make the tool more accurate. They make
 * it LESS accurate, and by a computable amount — see `imprecisionVsCard`
 * below and the assertions in `verify-sizes.ts`. Every object here is smaller
 * than the card, so the same slip of the eye costs proportionally more.
 * `SEO-AUDIT.md` proposed this feature on competitive-parity grounds
 * (ringsize.app offers eight objects); the accuracy argument runs the other
 * way, so the UI ranks the card first and says which options cost precision.
 *
 * ⚠️ EVERY `mm` HERE MUST TRACE TO A GOVERNING SOURCE, and the source ships in
 * the UI beside the object. Where a standard states the figure in inches, the
 * millimetre value is COMPUTED from it rather than copied from a chart — the
 * same rule `ringSizes.ts` follows for the size systems.
 *
 * ⚠️ WHY THERE IS NO ₹5 RUPEE COIN HERE. It was the third object asked for,
 * and it is deliberately absent. Searched 6 Sep 2026: the RBI and SPMCIL both
 * block automated access, and the best secondary source available
 * (Wikipedia's "Indian 5-rupee coin") CONTRADICTS ITSELF — 23 mm in the
 * infobox, 31.1 mm in the body of the same article. India has also issued the
 * denomination in several alloys since 1992. A calibration reference whose
 * true size cannot be established is worse than no reference: it converts a
 * visitor who knows they are uncalibrated into one who believes they are.
 * Do NOT add it on the strength of a chart. What would settle it: a physical
 * measurement of a current coin with a caliper, or a first-party RBI/SPMCIL
 * specification obtained by hand.
 */

/** How the outline is drawn: a straight-edge width gauge, or a full circle. */
export type CalShape = 'edge' | 'disc';

export type CalObjectKey = 'card' | 'quarter' | 'euro';

export interface CalObject {
  key: CalObjectKey;
  /** Picker label. Short — three of these sit in a row at 375px. */
  label: string;
  /** The dimension the visitor matches, in mm. */
  mm: number;
  shape: CalShape;
  /** The one instruction shown once this object is selected. */
  hint: string;
  /** The governing source for `mm`. Rendered in the UI, not just here. */
  source: string;
}

export const CAL_OBJECTS: readonly CalObject[] = [
  {
    key: 'card',
    label: 'Bank or ID card',
    mm: CARD_SHORT_MM,
    shape: 'edge',
    /* "Bank card" was the old wording everywhere. ID-1 is the format of
     * payment cards, driving licences, national ID cards and most membership
     * and transit cards, so naming only one of them sent people away who had
     * a conforming card in the same wallet. Broadening the words costs
     * nothing and keeps the most precise reference in play. */
    hint: 'Hold the card against the screen and match its short edge to the outline. Bank, ID, driving licence and most membership cards are all this exact size.',
    source: 'ISO/IEC 7810 ID-1 — 85.60 × 53.98 mm',
  },
  {
    key: 'quarter',
    label: 'US quarter',
    /* 31 U.S.C. § 5112(a)(4) states the diameter in INCHES — "a quarter
     * dollar coin that is 0.955 inch in diameter" — so the millimetre figure
     * is derived, not transcribed. 0.955 × 25.4 = 24.257 mm. Charts quoting
     * "24.26 mm" are rounding this, and rounding at 2 dp throws away 3 µm
     * that costs nothing to keep. */
    mm: 0.955 * MM_PER_INCH,
    shape: 'disc',
    hint: 'Lay a quarter flat on the screen and match the circle to the coin\u2019s edge.',
    source: '31 U.S.C. § 5112(a) — 0.955 inch',
  },
  {
    key: 'euro',
    label: '1 euro coin',
    /* Council Regulation (EU) No 729/2014, Annex I, states 23,25 mm for the
     * 1 euro coin. This regulation replaced 975/98, which is repealed —
     * anything citing 975/98 is citing a dead instrument, even though the
     * figure itself did not change. */
    mm: 23.25,
    shape: 'disc',
    hint: 'Lay a 1 euro coin flat on the screen and match the circle to its edge.',
    source: 'Regulation (EU) No 729/2014, Annex I — 23.25 mm',
  },
] as const;

export const DEFAULT_CAL_OBJECT: CalObjectKey = 'card';

/** Look up an object, falling back to the card for any unknown key — a stored
 *  key from a future build must never leave the drawer with no reference. */
export const calObject = (key: string): CalObject =>
  CAL_OBJECTS.find((o) => o.key === key) ??
  CAL_OBJECTS.find((o) => o.key === DEFAULT_CAL_OBJECT)!;

/** Which object was last used. Its own key, so an existing visitor's saved
 *  px/mm keeps loading untouched — same reasoning as DPR_STORE_KEY. */
export const CAL_OBJECT_STORE_KEY = 'rst.calObject';

/**
 * How much worse this object is than the card, as a multiplier of matching
 * error — and it is exactly the ratio of the two lengths.
 *
 * Calibration sets pxPerMm = matchedPx / objectMm. A misjudgement of the
 * outline edge by d pixels is therefore a RELATIVE error of
 * d / (pxPerMm × objectMm): inversely proportional to the object's size and
 * nothing else. So a reference half the card's width doubles the error for
 * the same steadiness of hand. No screen density term survives the ratio,
 * which is why this function takes no pxPerMm.
 *
 *   card    53.980 mm -> 1.00x
 *   quarter 24.257 mm -> 2.23x
 *   1 euro  23.250 mm -> 2.32x
 */
export const imprecisionVsCard = (mm: number) => CARD_SHORT_MM / mm;

/**
 * The error, expressed in the unit the visitor actually cares about: how much
 * of a US ring size one pixel of mis-matching costs.
 *
 *   error in reported diameter = refDiaMm × d / (pxPerMm × objectMm)
 *   in US sizes                = that / US_STEP_MM
 *
 * Computed at the owner's own measured laptop scale (4.12 px/mm) with a US 6
 * reference finger, this is the figure that decided the design:
 *
 *   card    0.091 US size per px  ->  2.7 px of slack before a quarter size
 *   quarter 0.203 US size per px  ->  1.2 px
 *   1 euro  0.212 US size per px  ->  1.2 px
 *
 * 1.2 px is below the width of the 2 px outline being matched, i.e. a coin
 * cannot deliver quarter-size precision on a typical laptop however careful
 * the visitor is. That is a real limit of the reference, not of the tool, and
 * the UI says so rather than implying every option is equivalent.
 */
export const usSizeErrorPerPx = (objectMm: number, ppm: number, refDiaMm: number) =>
  refDiaMm / (ppm * objectMm * US_STEP_MM);

/* ══════════════════════════════════════════════════════════════════════════
 * The on-screen ruler
 * ═════════════════════════════════════════════════════════════════════════
 *
 * For the paper-strip route, and it is the only feature on the list that
 * removes a PREREQUISITE rather than adding a capability: "wrap a strip round
 * your finger, then measure it flat against a ruler" quietly assumes a ruler,
 * and most people reaching for an online ring sizer do not have one to hand.
 * `SEO-AUDIT.md` §19 Day 11-14.
 *
 * ⚠️ IT IS A SCALE TO READ, NOT A CONTROL TO DRAG, and that is a UX decision
 * rather than a shortcut. A draggable marker sounds better and is worse here:
 * the visitor is holding a paper strip flat against the glass with one hand,
 * so the dragging hand has to arrive from the side and their own fingertip
 * covers the mark it is being aligned with. Reading a number off a scale and
 * typing it into the field directly below is steadier, needs no second hand,
 * and inherits the number input's existing keyboard and screen-reader
 * behaviour instead of inventing a new draggable widget to make accessible.
 *
 * The strip is laid with its END at 0, so the scale MUST start at 0 — it
 * cannot be trimmed to the plausible finger range the way the value slider is.
 */

/** How far the scale runs. The largest circumference the tool can express is
 *  DIA_MAX_MM x pi = 76.49 mm, so 80 clears it and ends on a labelled major. */
export const RULER_MAX_MM = 80;

/** Majors carry a printed number; 5 mm gets a mid-length tick; 1 mm a short
 *  one. Same three-tier convention as the ring stage's graph paper. */
export const RULER_LABEL_EVERY_MM = 10;

/** The printed numbers, derived rather than typed out. */
export const RULER_LABELS = Array.from(
  { length: RULER_MAX_MM / RULER_LABEL_EVERY_MM + 1 },
  (_, i) => i * RULER_LABEL_EVERY_MM,
);

/**
 * Why the scale turns 90 degrees on a narrow screen — the same argument as the
 * calibration card gauge, and the same breakpoint.
 *
 *   80 mm at 4.12 px/mm (a laptop)  = 330 px  -> fits across a column
 *   80 mm at 6.00 px/mm (a phone)   = 480 px  -> wider than a 375 px viewport
 *   80 mm at 8.00 px/mm (the ceiling) = 640 px -> far wider
 *
 * A phone has the height and not the width, and a paper strip does not care
 * which way it is held. Laid across, the scale would either overflow the page
 * sideways — which CLAUDE.md forbids outright — or scroll inside its own box,
 * and a ruler you have to scroll is not a ruler: you cannot lay a 60 mm strip
 * against a 62 mm window and still see the zero.
 */
export const rulerLengthPx = (ppm: number) => RULER_MAX_MM * ppm;

