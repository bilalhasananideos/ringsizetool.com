# ringsizetool.com — status

Last updated: 28 Aug 2026 · **Stage: tool + homepage + chart page built, correctness verified.
Awaiting the owner's read before anything ships.**

---

## ⚠️ Read this first — multi-session history

This project has been worked on from **two different chat sessions** (same person, different
conversations) without coordination, editing the same files. One session did a large visual
rewrite of the tool (commit `c700f0f`) to match a reference design more closely; the other found
and fixed 4 real regressions that rewrite silently introduced (commit `df09ce0`).

**Before starting any work: `git log --oneline -10` and read the last few commit messages in
full.** They are written to be self-contained — each one explains what changed and why, so you
don't need this conversation's history to understand the current state. If you make major
structural changes, **write a real commit message**, not `"refactor: simplify"` — the next session
(possibly you, possibly not) has to reconstruct your reasoning from that message alone.

**If you are Claude Code and were just launched in `ResearchToolWebsite`: that folder has a
`CLAUDE.md` pointing here. You're now in the right place.**

---

## Decisions already made — do not re-litigate

| | |
|---|---|
| Keyword | `ring sizer` + `ring size tool` (KD 4, ~26,000/mo — the free tool's ">10,000" was a bucket) |
| Biggest target | `ring size chart` — KD Easy, **>100,000/mo**, ~4x `ring sizer`. See RESEARCH.md |
| Do NOT target | `ring size` (KD 24) · `o ring size chart` (wrong product — rubber machinery seal) |
| ~~Do NOT target~~ | ~~`online ring sizer`~~ — struck through, was wrong. A 6.8K-traffic site ranks #1 for it |
| Domain | `ringsizetool.com` — **not bought yet, owner has no funds currently** |
| Backups if taken | virtualringsizer · accurateringsizer · realringsizer · ringsizerhub · realringsize (.com) |
| Brand | **Ring Size Tool** — brand goes AFTER the pipe in titles, never before the keyword |
| Design | **Aurelian Precision** (owner-supplied Stitch export) + documented corrections. See `DESIGN.md` |
| Hosting | Cloudflare Pages, static, free |
| Language | English only at launch; i18n routing configured, locales added later one at a time |
| Owner is in | **Pakistan** — currency USD/PKR. UPI, BigRock, PAN (India-only) do not apply |

**The strategy, from the competitor audit:** the site ranking #1 has the *worst* tool — no screen
calibration at all — and wins on content depth. A better tool alone will not win; we need the best
tool **and** the deepest page. Nobody currently has both.

---

## What the tool actually is right now

One unified instrument card (not a multi-step wizard):

- **Calibrate drawer** — visible by default for a first-time visitor (this was broken and is now
  fixed — see Gotchas). Bank card held **portrait** against the screen, slider + a paired number
  input for the exact px/mm value. Collapses once saved; reachable again via a "Calibrate" link.
- **Unit toggle** — a pill-shaped `radiogroup` (MM / CM / Inches / Circumference) switching what
  the slider and the big readout represent. Proper `role="radio"` + `aria-checked`.
- **Ring diagram** — a dashed guide circle with a live-scaled gold ring, driven by the calibrated
  px/mm.
- **Slider + number input**, both wired to the same `handleValueChange()` — drag or type an exact
  measured value.
- **2×2 result grid** — US/CA, UK/AU, EU/ISO, Japan as bordered cards; India and FR/IT/ES in a
  smaller row below; full mm/in diameter and circumference in an `sr-only` block for AT and SEO.
- **Live region** — announces "US size N, X.XX millimetres" on change, throttled to 400ms.

All conversion maths lives in `src/data/ringSizes.ts`, untouched by any of the above rewrites.
**58 assertions, `npm run verify`, all passing.**

---

## Done ✅

- Astro 7 static + Tailwind 4, dark mode with no flash
- **Aurelian Precision design** — Playfair Display + Inter (self-hosted, 38KB+47KB), gold accent
  split into `--accent` (text-safe, 6.44:1) / `--accent-bright` (fills/marks only, never white text)
- `--radius-xl` registered at 1.5rem (Tailwind's stock value was silently half that)
- `.card-elevated` — soft warm-tinted shadows, per DESIGN.md's own Elevation spec
- Two-column hero: headline, pill CTA, and a theme-swapped illustration —
  **light mode**: the owner's Stitch-generated hand+ring line art, background removed, self-hosted
  at `public/images/hero-ring-hand.webp` (provenance: Google Stitch, usable per Google's
  generative-AI terms, self-hosted rather than hotlinked to Google's CDN);
  **dark mode**: an original geometric diagram (the hand art left a grainy halo on dark backgrounds)
- Homepage content (~3,000 words): size-context section, three measuring-method cards, the full
  ring size chart, "why charts disagree" (the site's actual differentiator), edge cases, 21-question
  FAQ with `FAQPage`/`HowTo`/`WebApplication`/`BreadcrumbList` JSON-LD
- **`/ring-size-chart`** — full chart with a unit toggle and men's/women's cuts (the keyword is Easy
  at >100,000/mo; the #1 competitor's version is an unreadable PNG image)
- `web-design-guidelines` skill audit passed
- **4 regressions from the visual rewrite fixed** (see Gotchas) — calibrate-card visibility, numeric
  entry, live region, ARIA on the unit toggle

## Next, in order ⬜

1. **Owner reads the current homepage and chart page** — `npm run build && npm run preview`.
   Nothing ships until this happens.
2. **`/printable-ring-sizer`** — print CSS with real `mm` units + a print-scale check square
   (brite.co already has one *with* a check line — match that, then beat it on the chart)
3. **`/how-to-measure-ring-size-without-a-ring-sizer`** — check whether this still makes sense as a
   separate page now that the homepage's own copy covers similar ground; avoid cannibalisation
4. Logo + favicon (SVG, hand-drawn) · Lighthouse pass
5. Deploy to Cloudflare Pages — **site stays `noindex`, submit nothing** until the domain is bought

Add each new page to `NAV` in `config.ts` only once it exists.

## Gotchas found the hard way

- **Two sessions editing the same files caused a real, serious bug once already.** A visual
  rewrite (c700f0f) left the calibrate card `hidden` in static markup with no code path to un-hide
  it for a first-time visitor — every new visitor got an uncalibrated 96 DPI guess with no way to
  discover the calibration step. Fixed in `df09ce0`. **If you're rewriting RingSizer.astro again,
  re-check this specific thing**: clear `localStorage`, reload, and confirm the calibrate card is
  visible before you do anything else.
- **No numeric text input existed after that same rewrite** — only sliders. Restored: a paired
  `<input type=number>` next to both the calibration slider and the ring slider.
- `build.format: 'file'` makes `Astro.url.pathname` `/index.html`. The canonical is normalised in
  `Layout.astro` — do not "simplify" that back.
- India has no official ring-size standard; UK letter charts vary by up to half a size depending on
  which sequence a jeweller uses. Both are handled by showing the computed value **and saying so**
  rather than picking one chart and presenting it as certain. Do not "fix" this by matching a
  competitor's number — see RESEARCH.md's "UK half-letter offset" section for why ours is right.
- Astro eats a newline inside `{}` interpolation — `roughly\n{value}` renders as `roughly1.7`. Use a
  template literal or `{' '}` when an expression starts or ends a line.

## Commands

```bash
npm run verify    # 58 conversion + regression assertions
npm run build     # sitemap and robots only exist after this
npm run preview   # test against this, not dev
npm run deploy    # Cloudflare Pages
```
