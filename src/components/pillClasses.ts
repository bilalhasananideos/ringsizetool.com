/**
 * The switcher pill's two states, in one place.
 *
 * These strings exist twice over otherwise: once in the component frontmatter
 * that renders the initial state on the server, and once in the client script
 * that repaints on every toggle. When they were written out separately the two
 * could drift, and the selected pill would change appearance the first time it
 * was clicked.
 *
 * min-h-11 is the 44px touch target CLAUDE.md requires; the pills were 32px.
 */
const BASE =
  'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-4 sm:px-5 text-xs sm:text-sm transition-all duration-150';

export const PILL_ON = `${BASE} font-semibold bg-surface text-text shadow-xs`;
export const PILL_OFF = `${BASE} font-medium text-text-muted hover:text-text`;
