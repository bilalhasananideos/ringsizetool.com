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
 * The stroke on each ring-hole gauge circle.
 *
 * Load-bearing in the copy, not just the CSS: the sheet explains that it
 * carries whole US sizes only, and the reason is that this line is THICKER
 * than a quarter size (0.2032 mm of diameter). If anyone thins the stroke,
 * that argument has to be re-checked rather than left standing.
 */
export const HOLE_STROKE_MM = 0.3;
