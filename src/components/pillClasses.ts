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

/**
 * The source picker's two states — "what do you have?", the tool's new first
 * question. Same drift argument as above: server frontmatter renders one state,
 * the client script repaints the other, and they must be one string.
 *
 * Deliberately a heavier treatment than PILL_*: this is the primary question
 * and the measure/unit pills below it are the secondary one, so the visual
 * weight has to say so. Card-shaped rather than segmented, because three
 * sentence-length labels do not fit in a pill row at 375px — the container
 * stacks them to one column there and only goes three-across from `sm`.
 *
 * No focus ring here: global.css carries a `:focus-visible` rule for every
 * focusable element, and repeating it per component is how the two drift.
 */
/* border-2 on BOTH states, never on one. The selected card's tell is a gold
 * border, and gold on an off-white page measures about 2:1 — under the 3:1
 * WCAG 1.4.11 asks of a UI component's boundary. Two pixels of it is
 * perceptibly stronger, and the state does not rest on the border alone:
 * semibold against medium, and #1A1C1C against #524C3E, are both carried
 * independently of colour. Putting the extra pixel on the ON state only would
 * shift every neighbour by 2px on selection. */
const SOURCE_BASE =
  'flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-2.5 text-center text-xs sm:text-sm transition-all duration-150';

export const SOURCE_ON = `${SOURCE_BASE} border-accent bg-accent-sunk font-semibold text-text shadow-xs`;
export const SOURCE_OFF = `${SOURCE_BASE} border-border bg-surface-sunk/40 font-medium text-text-muted hover:border-border-strong hover:text-text`;
