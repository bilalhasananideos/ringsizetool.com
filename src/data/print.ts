/**
 * Constants for the printed sheet.
 *
 * These live in their own module because they are quoted in two places that
 * cannot import from each other: `/printable-ring-sizer` (both its prose and
 * its stylesheet, via define:vars) and `PRINTABLE_FAQS` in `faq.ts`. Typed
 * separately they would drift, and the drift would be invisible — the FAQ
 * would answer a question about a square the sheet no longer prints.
 */

/** The scale-check square, in mm, outside edge to outside edge of its outline. */
export const CHECK_MM = 50;

/**
 * The check square's own outline, in mm.
 *
 * ⚠️ NOT the same number as HOLE_STROKE_MM below, and confusing the two has
 * already produced a wrong sentence on this page once. `box-sizing` is
 * border-box on the square, so this stroke sits INSIDE the 50 mm: measuring
 * inside-to-inside instead of outside-to-outside reads 2 x this figure small,
 * and the copy quotes that. Two different strokes, two constants, both used
 * by prose.
 */
export const CHECK_STROKE_MM = 0.4;

/**
 * The stroke on each ring-hole gauge circle.
 *
 * Load-bearing in the copy, not just the CSS: the sheet explains that it
 * carries whole US sizes only, and the reason is that this line is THICKER
 * than a quarter size (0.2032 mm of diameter). If anyone thins the stroke,
 * that argument has to be re-checked rather than left standing.
 */
export const HOLE_STROKE_MM = 0.3;
