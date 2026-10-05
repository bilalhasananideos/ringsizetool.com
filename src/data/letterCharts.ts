/**
 * Letter sizes as jewellers publish them — dated READINGS, not standards.
 *
 * ⚠️ Nothing in this file is computed from a rule, and nothing here may be
 * used to size a ring. Every figure was read off a jeweller's own size guide
 * on the date given. They are the evidence for one claim on
 * /uk-ring-size-chart: a British letter is reliable to about half a size, and
 * an Australian one is not.
 *
 * The page names no shop. Charts change without notice, and a named claim
 * about a shop's chart is one more thing on this site that can quietly become
 * false — the same policy as UK_NOTE in ringSizes.ts. The URLs live here, not
 * on the page, so every reading can be checked again.
 *
 * Where a chart publishes only a diameter, the circumference is π × that
 * diameter, computed here, never worked out by hand.
 */

export interface LetterReading {
  /** Inner circumference of size L, mm — as published, or π × the published diameter. */
  l: number;
  /** Inner circumference of size M, mm. */
  m: number;
  published: 'circumference' | 'diameter';
  source: string;
  checked: string;
}

const aroundFromAcross = (diameterMm: number) => Math.PI * diameterMm;

/* ── UK high street, read 26 Sep 2026 (RESEARCH.md, "UK letters — checked
 * against UK jewellers") ─────────────────────────────────────────────────
 * Six chains: Goldsmiths, Mappin & Webb, Beaverbrooks and Warren James
 * publish L = 51.2 mm and M = 52.5 mm. H.Samuel and Ernest Jones, which belong
 * to one group (Signet), run half a letter higher from H to R only. */
export const UK_CHAINS_CHECKED = 6;
export const UK_CHAINS_AGREEING = 4;
export const UK_HIGH_STREET = { l: 51.2, m: 52.5, checked: '2026-09-26' } as const;
/** The higher group's M. Its L is 50.58 mm (ringSizes.ts UK note). */
export const UK_HIGHER_GROUP = { m: 51.87, fromLetter: 'H', toLetter: 'R', checked: '2026-09-26' } as const;

/* ── Ireland, read 2 Oct 2026 — only to support "Ireland uses the same
 * letters", and that its charts sit on the British high-street figures.
 * bannonjewellers.ie/blogs/news/how-to-find-your-ring-size: L 51.2, M 52.5.
 * fields.ie/buyers-guide/ring-size-guide.html: L 51.2, M 52.5.
 * Both from search-result extracts of the pages, not fetched in full. */

/* ── Australia, read 2 Oct 2026, each page fetched in full ──────────────── */
export const AU_CHARTS: LetterReading[] = [
  /* musson.com.au/pages/sizing-guide — publishes diameter AND circumference;
   * the circumference column is used. L 16.10 / 50.58, M 16.51 / 51.87. The
   * same figures as the UK group that runs half a letter high. */
  {
    l: 50.58, m: 51.87, published: 'circumference',
    source: 'https://musson.com.au/pages/sizing-guide', checked: '2026-10-02',
  },
  /* adc.com.au/how-to-measure-ring-size/ — diameter only: L 16.41, M 16.81.
   * The same page states the 1987 rule of 1.25 mm per letter, and its own
   * chart sits about 0.3 mm above that rule. */
  {
    l: aroundFromAcross(16.41), m: aroundFromAcross(16.81), published: 'diameter',
    source: 'https://www.adc.com.au/how-to-measure-ring-size/', checked: '2026-10-02',
  },
  /* nathanaubrey.com.au/ring-size-guide/ — publishes both; circumference
   * column used. L 16.5 / 51.9, M 16.9 / 53.2. Rows are US half sizes, so
   * its letters are whatever its own rounding gives. */
  {
    l: 51.9, m: 53.2, published: 'circumference',
    source: 'https://www.nathanaubrey.com.au/ring-size-guide/', checked: '2026-10-02',
  },
];

/** The quoted-the-rule chart, for the one sentence that mentions it. */
export const AU_RULE_QUOTER = AU_CHARTS[1];
