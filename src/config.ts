/**
 * Site-wide constants. Every page reads from here — never hardcode these.
 */

export const SITE_NAME = 'Ring Size Tool';
export const SITE_URL = 'https://ringsizetool.com';
export const EMAIL = 'hello@ringsizetool.com';

/**
 * ⚠️ SITE-WIDE NOINDEX
 *
 * True while the site lives on *.pages.dev with no real domain connected.
 * Google must never index the temporary URL — if it does, we inherit a
 * duplicate-content problem the day the real domain goes live.
 *
 * Set to false as the FIRST step after connecting ringsizetool.com,
 * then redeploy and verify:
 *   curl -I https://ringsizetool.com | grep -i x-robots-tag   -> nothing
 *
 * Do not submit anything to Search Console or Bing while this is true.
 */
export const NOINDEX_SITE = true;

/** Only list routes that exist — a nav link to a 404 is worse than no link.
 *  Add each entry as its page ships: chart, printable, virtual, converter. */
export const NAV = [
  { href: '/', label: 'Ring Sizer' },
  { href: '/ring-size-chart', label: 'Chart' },
] as const;

export const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const;
