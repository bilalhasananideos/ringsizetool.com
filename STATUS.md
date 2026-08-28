# ringsizetool.com — status

Last updated: 28 Aug 2026 · **Stage: tool + homepage + chart page + printable page built.
Size logic audited against the published standards and 106 assertions.
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
- **Logo + favicon — DONE** (this line previously sat under "Next" and was wrong). `Logo.astro`,
  `favicon.png`, `favicon.ico`, `favicon.svg`, and Header/Footer already render the mark
- **Upper-range guards on every size system** — the file's own "nothing invents a number" policy
  was enforced at the low end only, so the slider's top (25 mm) reported EU 79 / JP 37 / UK Z+7½,
  none of which exist. Bounds confirmed against ISO 8653:2016 (41–76), JIS S 4700:2022 (1–35) and
  BS EN 28653:1993 (A–Z+6). India gets its own ceiling of 37, not ISO's 36 — it is not ISO
- **6 tool bugs fixed** — boot never called `setMode()` so the number field rendered empty;
  switching units mutated the measurement (mm→cm→in→circ→mm drifted 16.51 to 16.49, flipping JP
  12→11); out-of-range typed input desynced field/slider/readout; inches readout was 2 dp against
  a 0.001 in step; circumference mode had a dead zone below `DIA_MIN`; SSR defaults were hand-typed
  literals against CLAUDE.md's explicit rule
- **`UK_NOTE` / `INDIA_NOTE` now actually render** — they were exported and imported by nothing.
  A `<details>` in the tool carries them, next to the two numbers the site is least sure about
- **`verify` 58 → 106 assertions** — upper bounds, UK rounding ties, UK letter indexing,
  `fromCircumference` end-to-end, `formatUs` at zero, `sizeContext` band boundaries
- **`/printable-ring-sizer`** — 50 mm scale-check square, ring-hole gauge (whole US sizes only),
  finger strip marked in circumference from zero, full table. Every printed dimension in `mm`
- **`/og.png` generated** (1200×630). `Layout.astro` had defaulted to it since the beginning while
  the file did not exist, so every page emitted a broken social card
- **Logo weight** — `Logo.astro` now uses a 128 px derivative (13 KB) instead of the 581×574
  original (145 KB) that was loading on every page for a 48–56 px mark

## Next, in order ⬜

1. **Owner reads the homepage, the chart page and `/printable-ring-sizer`** —
   `npm run build && npm run preview`. Nothing ships until this happens.
   For the printable page: print it and measure the square with a ruler. It must be 50 mm.
2. **Decisions waiting on the owner** (see Open questions below) — touch-target sizes, whether
   US should have a ceiling, what happens at the very bottom of the slider, and whether
   `logo.png` / `logo.svg` / `favicon.svg` should be deleted.
3. **Lighthouse pass.** Not run yet. `og.png` is 105 KB and `hero-ring-hand.webp` 135 KB — both
   are candidates if the score needs it.
4. `/how-to-measure-ring-size-without-a-ring-sizer` — **decided against for now** (28 Aug 2026).
   The homepage's ~3,000 words already cover the methods; a separate page would cannibalise it.
   Revisit only if Search Console shows the query landing on nothing.
5. **Deploy to Cloudflare Pages** — `wrangler` is not in `package.json`, so `npm run deploy`
   depends on a global/npx binary. Decide that before the first deploy.
   Site stays `noindex`, submit nothing, until the domain is bought.

---

## Open questions for the owner ❓

These are real decisions, not oversights. Each one was left alone deliberately rather than
changed unilaterally.

| Question | Detail |
|---|---|
| **Touch targets** | The switcher pills are now 44 px tall (`src/components/pillClasses.ts`) — raised while the switcher was being rebuilt, since the row was being rewritten anyway. **The rest is unchanged and still under the minimum**: step buttons 32×32, the "Calibrate" link 16 px. Owner should confirm the taller pills look right against the Aurelian Precision look, and say whether the remaining controls follow. |
| **Should US have a ceiling?** | At 25 mm the tool reports US 16½. US has no governing standard, so there is no published ceiling to cite — but `CHART_ROWS` stops at US 14 ("the range actually sold"), so 16½ is past our own chart. Capping it would be a judgement, not a standard. |
| **The bottom of the slider answers nothing** | `DIA_MIN` is 11 mm and US 0 is 11.6332 mm, so between 11 and 11.63 mm every system correctly shows "—". Six em dashes at the slider's own minimum reads like a broken tool even though it is the honest answer. Raising `DIA_MIN` to 11.64 would fix the optics. |
| **Dead asset files** | `public/images/logo.png` (353 KB) and `logo.svg` are referenced by nothing, and `favicon.svg` lost its `<link>` when the raster favicon went in. They deploy but are never requested. Left in place rather than deleted without asking. |
| **The logo is now a raster** | It was a 107-line inline SVG; it is now a WebP. That trades theme-awareness and resolution independence for whatever the new mark looks like. Worth a conscious yes. |

