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

import { MM_PER_INCH } from './ringSizes.ts';

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
 * a dashed guide circle inset 12 px on each side, so the largest ring the tool
 * can draw without clipping is 232 px across. At DIA_MAX_MM (24.35 mm) that
 * caps calibration at 232/24.35 = 9.5 px/mm; 8 leaves honest headroom and
 * still covers every phone on the market (iPhone 14 ≈ 6.1, S23 Ultra ≈ 6.2).
 * `verify-sizes.ts` asserts the relationship so raising one without checking
 * the other cannot silently clip the circle.
 */
export const PPM_MIN = 2.5;
export const PPM_MAX = 8;

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
