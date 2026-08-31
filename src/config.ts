/**
 * Site-wide constants. Every page reads from here — never hardcode these.
 */

export const SITE_NAME = 'Ring Size Tool';
export const SITE_URL = 'https://ringsizetool.com';
export const EMAIL = 'contact@ringsizetool.com';

/**
 * ⚠️ SITE-WIDE NOINDEX
 *
 * Flipped to false on 1 Sep 2026 — the site is now indexable.
 *
 * It was true for as long as the site had no real domain, because Google must
 * never index a *.pages.dev URL: the day the real domain went live we would
 * have inherited a duplicate-content problem against ourselves.
 * `ringsizetool.com` is the canonical host, it resolves, `www` 301s to the
 * apex, and the two owner checks that gate the site's accuracy claim were both
 * done before this flip — see the launch section of STATUS.md.
 *
 * ⚠️ Setting this back to true does NOT retract anything. It stops *new*
 * indexing; pages Google has already crawled stay in the index until it
 * recrawls them. Treat the flip as one-way.
 *
 * The deploy workflow fails the build if the rendered pages disagree with this
 * flag in either direction, so it cannot drift silently.
 */
export const NOINDEX_SITE = false;

/** Only list routes that exist — a nav link to a 404 is worse than no link.
 *  Add each entry as its page ships: chart, printable, virtual, converter. */
export const NAV = [
  { href: '/', label: 'Ring Sizer' },
  { href: '/ring-size-chart', label: 'Chart' },
  { href: '/how-to-measure-ring-size-at-home', label: 'How to Measure' },
  { href: '/printable-ring-sizer', label: 'Printable' },
] as const;

export const FOOTER_LINKS = [
  { href: '/average-ring-size', label: 'Average Ring Size' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const;
