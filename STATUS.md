# ringsizetool.com — status

Last updated: 28 Aug 2026 · **Stage: tool + homepage + chart page + printable page built.
Size logic audited against the published standards and 155 assertions.
The tool has now been driven end-to-end in a real browser (28 Aug) — two bugs found there
and fixed. Awaiting the owner's read before anything ships.**

---

## ⚠️ Read this first — multi-session history

This project has been worked on from **two different chat sessions** (same person, different
conversations) without coordination, editing the same files. One session did a large visual
rewrite of the tool (commit `c700f0f`) to match a reference design more closely; the other found
and fixed 4 real regressions that rewrite silently introduced (commit `df09ce0`).

**`npm run verify` passing is NOT the same as the tool working.** The maths module has 155
assertions; the component script in `RingSizer.astro` has none, and both bugs found on 28 Aug
lived there — the ± buttons and the calibration field, neither reachable from `verify`. If you
change anything in that script, open the page and click it.

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
- **Two switchers** — *what you measured* (Diameter / Circumference) and *unit* (MM / CM /
  Inches), as two pill `radiogroup`s with `role="radio"` + `aria-checked`. This replaced a single
  four-pill row that put a measurement among units and left circumference stuck in millimetres;
  it is now six modes, all in `src/data/ringModes.ts`. The view is readable and writable via
  `?measure=&unit=`, and `RingSizer.astro` takes `measure` / `unit` props so a page can open in
  the mode it is about.
- **Ring diagram** — a dashed guide circle with a live-scaled gold ring, driven by the calibrated
  px/mm.
- **Slider + number input**, both wired to the same `handleValueChange()` — drag or type an exact
  measured value.
- **2×2 result grid** — US/CA, UK/AU, EU/ISO, Japan as bordered cards; India and FR/IT/ES in a
  smaller row below; full mm/in diameter and circumference in an `sr-only` block for AT and SEO.
- **Live region** — announces "US size N, X.XX millimetres" on change, throttled to 400ms.

All conversion maths lives in `src/data/ringSizes.ts`, untouched by any of the above rewrites.
**155 assertions, `npm run verify`, all passing.**

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
  **dark mode**: the SAME hand art — `HeroIllustration.astro` renders one image in both themes.
  (This line used to claim a separate geometric diagram for dark mode; there isn't one. The grainy
  halo it was meant to solve is still visible on the dark background — open decision, see below)
- Homepage content (~3,000 words): size-context section, **two** measuring-method cards (this
  line said three; there are two — `index.astro:253-300`), the full
  ring size chart, "why charts disagree" (the site's actual differentiator), edge cases, 21-question
  FAQ with `FAQPage`/`HowTo`/`WebApplication`/`BreadcrumbList` JSON-LD
- **`/ring-size-chart`** — full quarter-size chart, all seven systems, men's/women's cuts (the
  keyword is Easy at >100,000/mo; the #1 competitor's version is an unreadable PNG image).
  ⚠️ This line used to claim **"a unit toggle"**. There is none: the table has eleven fixed
  columns (`ring-size-chart.astro:108-126`) and `#units` is a prose section, not a control.
  **Centimetres appear nowhere on the page** while `ring size chart in cm` / `ring size chart cm`
  are >1,000 each — see the plan in RESEARCH.md's 28 Aug keyword pass
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

- **Browser test pass, 28 Aug 2026** — the tool was driven end-to-end in a real browser for the
  first time (calibration, all 6 modes, slider, typed entry, ± buttons, clamps, live region,
  dark mode, mobile, chart + printable pages). No console errors; every page 200. Three bugs found
  and fixed in `RingSizer.astro`:
  - **± buttons mutated the measurement.** They read `ringRange.value`, which the browser has
    already snapped to the step grid, so one + followed by one − moved 16.51 mm to 16.48 and
    flipped **Japan 12 → 11**. The same quantisation `setMode()` was written to avoid. They now
    derive the current value from `currentDia`. `verify` gained 12 assertions for this (155 total)
  - **The calibration number field overwrote itself mid-keystroke** — reaching for 2.9, your "2"
    became "2.50" under the cursor. It now syncs on commit (blur/Enter), like the ring field
  - dead `set('[data-out-br]', …)` — no Brazil element exists in the markup

## Next, in order ⬜

1. **Owner reads the homepage, the chart page and `/printable-ring-sizer`** —
   `npm run build && npm run preview`. Nothing ships until this happens.
   For the printable page: print it and measure the square with a ruler. It must be 50 mm.
2. **Decisions waiting on the owner** (see Open questions below) — touch-target sizes, whether
   US should have a ceiling, what happens at the very bottom of the slider, and whether
   `logo.png` / `logo.svg` / `favicon.svg` should be deleted.
3. **Lighthouse pass.** Not run yet. `og.png` is 105 KB and `hero-ring-hand.webp` 135 KB — both
   are candidates if the score needs it.
4. `/how-to-measure-ring-size-without-a-ring-sizer` — **still decided against** (28 Aug 2026).
   Confirmed by volume the same day: that exact keyword is only >100 and all ten of its variants
   are <100. The homepage covers the methods and a page here would cannibalise it for nothing.
   **Do not confuse this with item 5.**
5. `/how-to-measure-ring-size-at-home` — **approved, not built** (28 Aug 2026). A *different*
   keyword: **>10,000/mo, KD 2**, plus `how to measure ring size` at >10,000. The largest
   untargeted opportunity in the keyword data. The homepage's methods section shrinks to a
   summary that links to it, and `howToSchema()` moves with the content — the homepage must not
   keep declaring a HowTo whose steps have left. See RESEARCH.md, 28 Aug keyword pass.
6. `/average-ring-size` — **approved, not built** (28 Aug 2026). Three >1,000 keywords
   (`average ring size for women` / `for men` / bare) plus ~10 at >100; `for women` is KD 0.
   ⚠️ **Blocker:** `AVERAGE_US_SIZE = { women: 6, men: 9 }` (`ringSizes.ts:301`) has **no source**
   — the comment above it explains why the section exists, not where 6 and 9 came from. Source it
   or the page says plainly that it is not certain. No standard governs "average ring size".
7. **Deploy to Cloudflare Pages** — `wrangler` is not in `package.json`, so `npm run deploy`
   depends on a global/npx binary. Decide that before the first deploy.
   Site stays `noindex`, submit nothing, until the domain is bought.

---

## Open questions — resolved 28 Aug 2026

Five of seven answered by the owner directly; one required research first.

| Question | Resolution |
|---|---|
| **Should US have a ceiling?** | **No cap. Researched, not guessed** — specialty "big & tall" jewellers (e.g. justmensrings.com) genuinely sell US 16–20; only `CHART_ROWS` (the buyable-range display chart) stops at 14, which is a display choice, not a standard. Unlike EU/JP/UK — which **do** have a governing standard and genuinely produce a fictional number past their range — US has none, so 16½ at the slider's max is a real, purchasable size, not an invented one. Capping it would have been the wrong fix. |
| **Slider bottom showing all "—"** | ✅ Fixed. `DIA_MIN_MM` raised from 11 to **11.64** in `ringModes.ts` — the control's own minimum now always shows a real size on every system, instead of six correct-but-broken-looking em dashes. |
| **Dead asset files** | ✅ Fixed. `public/images/logo.png` (353 KB) and `logo.svg` deleted — confirmed unreferenced by any file in `src/`. `favicon.svg` was already gone; that note was stale. |
| **Logo as WebP vs SVG** | ✅ Confirmed — WebP is fine. Owner accepted the trade (theme-awareness/resolution-independence for a raster mark) at 48–56px display size. |
| **Touch targets** | Not yet revisited — switcher pills are 44px, step buttons (32×32) and the "Calibrate" link (16px) are not. Still open if anyone picks this up. |
| **Pills have no arrow-key nav** | Not yet revisited — `role=radiogroup`/`radio` present but no roving tabindex. Operable via Tab+Enter, not blocking. ~15 lines in `RingSizer.astro` if addressed. |
| **cm mode 10× coarser than its own comment claims** | Not yet revisited — `ringModes.ts`'s `PRECISION` comment overstates cm's actual display precision (0.1mm, not 0.01mm). Either raise cm to 3dp or fix the comment. |

