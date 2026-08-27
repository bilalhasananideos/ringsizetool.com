# House rules

Read `DESIGN.md` before writing any UI — its **PROJECT OVERRIDES** block wins over everything
below it in that file. These rules override defaults and habits.

## Architecture

- **Static only.** `output: 'static'`. No SSR, no API routes, no server code, no runtime env vars.
  If a feature seems to need a server, it does not belong in this site.
- **MPA, not SPA.** Real page loads per route. No client-side router.
- **Zero JavaScript by default.** Astro ships none — keep it that way. JS is allowed only inside the
  tool component that genuinely needs it, and it is vanilla, not a framework.
- **No React, Vue, Svelte** or any UI framework. Astro components only.
- Tailwind 4 syntax only. Never v3 (`@tailwind` directives, `tailwind.config.js` colour extension).
  Use the `tailwind-4-docs` skill; use the Astro Docs MCP for anything version-specific.

## Data and numbers

- **Never type a number into markup that the data module can generate.** Every size, range and
  conversion comes from `src/data/`. Prose that disagrees with the tool destroys the one claim this
  site has.
- **Never copy a value from a competitor's chart.** Compute it from the published standard and add
  an assertion to `scripts/verify-sizes.ts`.
- Where no standard exists, **say so** rather than presenting a number as certain.

## Every page must have

- One `<h1>`
- Unique `<title>` and meta description — **brand goes after the pipe, never before the keyword**
- Canonical URL
- Open Graph + Twitter tags
- Dark mode that works, with no flash on load
- Correct behaviour at 375px — no horizontal scroll, ever

## Accessibility — not optional

- Semantic HTML. `<button>` for actions, `<a>` for navigation. Never a `<div>` with a click handler.
- Every interactive element reachable and operable by keyboard, with a visible focus ring.
- Real `<label>` for every input.
- Touch targets at least 44x44px.
- Alt text on every image and meaningful SVG. Decorative SVG gets `aria-hidden="true"`.
- Respect `prefers-reduced-motion`.
- Wide tables live inside `.table-scroll` so they scroll themselves, never the page.

Run the `web-design-guidelines` skill before launch.

## Never do

- Gradients as decoration, glassmorphism, glow effects, animated blobs
- Emoji as UI icons
- `!important`
- Inline styles, except the dark-mode no-flash script
- Arbitrary Tailwind values (`text-[13.5px]`) — use the scale in `DESIGN.md`
- Hardcoded hex colours in markup — use the CSS variables
- Fake testimonials, fake user counts, fake urgency
- Padding content to reach a word count
- Adding a nav link to a page that does not exist yet

## Content

Follow the `tool-site-content` skill. Its one rule: **every section exists because a real person
searched for it.** If you cannot name the query, delete the section.

**Nothing publishes until the site owner has read it.**

## Before finishing any task

1. `npm run verify` — data assertions must pass
2. `npm run build` — must pass
3. Check at 375px
4. Check both light and dark
5. Tab through the page — focus visible everywhere
