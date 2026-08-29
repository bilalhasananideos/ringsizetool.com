# ringsizetool.com — status

Last updated: 29 Aug 2026 · **Stage: tool + homepage + chart page + printable page built.
Size logic audited against the published standards and 187 assertions.
The tool has been driven end-to-end in a real browser twice (28 and 29 Aug). The 29 Aug pass
came from the owner's own manual test of all six modes against every chart row, and found four
more defects — all in the layer BETWEEN the slider and the maths module, none in the maths.
Awaiting the owner's read before anything ships.**

---

## ⚠️ Read this first — multi-session history

This project has been worked on from **two different chat sessions** (same person, different
conversations) without coordination, editing the same files. One session did a large visual
rewrite of the tool (commit `c700f0f`) to match a reference design more closely; the other found
and fixed 4 real regressions that rewrite silently introduced (commit `df09ce0`).

**`npm run verify` passing is NOT the same as the tool working.** This has now been true twice.
On 28 Aug both bugs lived in `RingSizer.astro`, which `verify` cannot reach. On 29 Aug all 155
assertions passed while centimetre mode returned the wrong size for 17 of the 21 chart rows —
because every assertion fed the maths module exact floats, and a visitor cannot. They read a
printed, rounded number and type it back.

`verify` now walks every chart row through every mode the way a person would, which is what
closed that gap. It still cannot click anything: **if you change the component script, open the
page and drive it.** Note when you do that a backgrounded tab freezes CSS transitions, so
`getComputedStyle` on anything with `transition-all` returns the OLD value — two "bugs" on
29 Aug were that artifact, not defects. Disable transitions before measuring.

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
  ✅ **Centimetres added 29 Aug** (`Ø cm`, 3 dp) — `ring size chart in cm` / `ring size chart cm`
  are >1,000 each. Three decimals, not two: at 2 dp a centimetre column carries 0.1 mm of
  resolution and a UK half size is 0.199 mm of diameter, so 2 dp cannot name the sizes in the
  row beside it
- `web-design-guidelines` skill audit passed
- **4 regressions from the visual rewrite fixed** (see Gotchas) — calibrate-card visibility, numeric
  entry, live region, ARIA on the unit toggle
- **Two keyword pages built** (28 Aug 2026), from the keyword pass in RESEARCH.md:
  - **`/how-to-measure-ring-size-at-home`** — >10,000/mo at KD 2, plus `how to measure ring size`
    at >10,000. The homepage's methods section is now a summary linking to it, and `howToSchema()`
    moved with the steps — a page must not declare a procedure it no longer contains. Carries one
    generated table of paper-strip lengths that absorbs the whole "what ring size is 7 cm
    circumference" family; deliberately one table, not a page each.
  - **`/average-ring-size`** — three >1,000 keywords, `for women` at KD 0. The sourcing blocker
    was resolved by **admitting there is no source**: searched 28 Aug 2026, every citation traces
    back to a jeweller's own retail data or to another blog. `AVERAGE_US_SIZE` carries that
    finding as a comment and the page says it out loud. Every competitor states 6 and 9 as fact;
    saying otherwise is the differentiator, the same move as `UK_NOTE` and `INDIA_NOTE`.
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
   Two checks nobody but the owner can do:
   - **On a real phone**, hold a bank card against the calibration gauge. The whole narrow-screen
     redesign (29 Aug) rests on this; it has only been verified by measuring the DOM at 375 px.
   - **Print `/printable-ring-sizer` and measure the square with a ruler.** It must be 50 mm.

2. **Decide: three unit URLs, or one page with query parameters.** The competitor runs
   `Ring Sizer in MM` / `in CM` / `in Inches` as three separate pages; we serve all six modes
   from one behind `?measure=&unit=`, which Google does not index as distinct pages. This is a
   real ranking difference and nothing addresses it. `RingSizer` already takes `measure`/`unit`
   props so a page can mount pre-set, so the routes are cheap — but it is new scope and an SEO
   judgement, not a bug fix. **Owner's call.**

3. **Surface the calibration.** It is the site's entire accuracy argument and the only thing the
   competitor cannot match — and once the drawer is closed, nothing on the page says it happened.
   A "✓ 1:1 on your screen" marker beside the readout. Also feeds
   `actual ring size chart on screen` (>1,000/mo), still unwritten.

4. **Lighthouse pass.** Still not run. `og.png` is 105 KB and `hero-ring-hand.webp` 135 KB — both
   are candidates if the score needs it.

5. `/how-to-measure-ring-size-without-a-ring-sizer` — **still decided against** (28 Aug 2026).
   Confirmed by volume the same day: that exact keyword is only >100 and all ten of its variants
   are <100. The homepage covers the methods and a page here would cannibalise it for nothing.
   **Do not confuse this with the built pages below.**

6. **Remaining from the keyword plan, not started:** the `oura` and `pandora` brand pages.
   (The `/ring-size-chart` cm column and the `/printable-ring-sizer` title were on this list and
   are now done — 29 Aug.)

7. **Deploy to Cloudflare Pages** — `wrangler` is not in `package.json`, so `npm run deploy`
   depends on a global/npx binary. Decide that before the first deploy.
   ⚠️ Running `npm run verify` has twice caused npm to add `wrangler` as a devDependency and
   rewrite `package-lock.json` on its own. That churn has been reverted each time, not committed.
   Settle the dependency deliberately rather than letting npm settle it.
   Site stays `noindex`, submit nothing, until the domain is bought.

---

## Open questions — resolved 28 Aug 2026

Five of seven answered by the owner directly; one required research first.

| Question | Resolution |
|---|---|
| **Should US have a ceiling?** | **No cap. Researched, not guessed** — specialty "big & tall" jewellers (e.g. justmensrings.com) genuinely sell US 16–20; only `CHART_ROWS` (the buyable-range display chart) stops at 14, which is a display choice, not a standard. Unlike EU/JP/UK — which **do** have a governing standard and genuinely produce a fictional number past their range — US has none, so 16½ at the slider's max is a real, purchasable size, not an invented one. Capping it would have been the wrong fix. |
| **Slider bottom showing all "—"** | ✅ Fixed twice. First raised to 11.64 (28 Aug), which fixed the bottom but left the TOP showing "US 16½" beside three em dashes. Superseded 29 Aug: `DIA_MIN_MM`/`DIA_MAX_MM` are now **derived** from ISO 8653's rounding band (12.8916–24.3475 mm) rather than chosen, so all seven systems answer at every one of the 4,889 reachable slider positions. Note the band is closed at the bottom and OPEN at the top, because `Math.round` breaks ties upward and 76.5 mm of circumference is EU 77. |
| **Dead asset files** | ✅ Fixed. `public/images/logo.png` (353 KB) and `logo.svg` deleted — confirmed unreferenced by any file in `src/`. `favicon.svg` was already gone; that note was stale. |
| **Logo as WebP vs SVG** | ✅ Confirmed — WebP is fine. Owner accepted the trade (theme-awareness/resolution-independence for a raster mark) at 48–56px display size. |
| **Touch targets** | ⚠️ **This entry was wrong, and the "44px rule" it assumed is not WCAG.** Checked against the spec 29 Aug: SC 2.5.8 Target Size (Minimum) is **24×24 CSS px at Level AA**; 44×44 is SC 2.5.5, Level **AAA**. The 32×32 step buttons therefore always passed AA, and the "Calibrate" link sits in a sentence, which is SC 2.5.8's explicit *Inline* exception. Done anyway as polish: ± buttons are 44px on touch and 36px from `sm` up, and the Calibrate link's target is padded without moving the layout. Do not record this as an AA failure. |
| **Pills have no arrow-key nav** | ✅ Fixed 29 Aug. Roving tabindex plus arrow keys that move focus and selection together, per the ARIA authoring practices — one tab stop per group, wrapping at both ends. Worth noting the markup had claimed `role="radiogroup"` for some time while behaving as six unrelated buttons, which is worse than not claiming it: a screen-reader user is told to expect arrows that are not there. (Roving tabindex is not itself mandatory — `aria-activedescendant` is an equally valid mechanism — but the *behaviour* is.) |
| **cm mode 10× coarser than its own comment claims** | ✅ Fixed 29 Aug, and it was not cosmetic — this note was filed as a comment bug and turned out to be the largest defect on the site. cm is now 3 dp. See below. |

---

## 29 Aug 2026 — the owner's manual pass

The owner drove all six modes by hand against every row of the chart. Four defects, **none of
them in `ringSizes.ts`** — its maths was verified against ISO 8653, BS EN 28653, JIS S 4700 and
the CSS spec and was correct throughout. Everything broken sat in the layer between the slider
and the maths.

| Defect | Root cause |
|---|---|
| cm mode named the wrong size for 17 of 21 chart rows | 2 dp of centimetres is 0.1 mm of resolution. A UK half size is 0.199 mm of diameter and a Japanese size is 0.333 mm — cm could not *express* the sizes the tool prints. Now 3 dp. |
| 1.65 cm reported JP 11, 16.5 mm reported JP 12 | `toDia` divided by a per-unit fraction and `1.65 / 0.1 === 16.499999999999996`. 16.5 mm is exactly the JP 11/12 boundary. Multiplying by 10 is exact. |
| Inches could not reach US 11 | 0.005 in steps from an irrational lower bound: the slider stopped at 0.808 and reported 20.53 mm for a size whose diameter is 20.574 mm. Now 0.001 in. |
| Calibration unusable on a phone | The card outline was sized by JS with no max-width, no overflow and **not one media query in the component**. At a real phone's ~6.1 px/mm the ID-1 card is 329 × 522 px. Narrow screens now get the same 53.98 mm turned 90°, which is the axis a phone has room on. |

### Two things the owner reported that were NOT defects

Both are worth keeping written down, because they will look like bugs again.

- **"Calculator says 64.62, chart says 64.64."** Different physical values. The chart's US 11 row
  is 20.574 mm; the slider was set to 20.57. Rounding, not error.
- **US 6¼ reads back as EU 52 instead of 53.** Its circumference is 52.5061 mm — six thousandths
  above the EU 52/53 boundary. Printing the diameter at 2 dp loses 0.0032 mm. Nothing short of
  4 dp fixes it, and "16.7132 mm" claims a precision nobody holding a ring against glass has.
  The tool is unaffected (chart and calculator both derive from `diameterFromUs`); only manually
  retyping the printed figure hits it. Pinned in `verify` as a known limit.

### And one proposed fix that made things worse

The obvious remedy for the float bug — quantising millimetres to a small epsilon — was measured
before being applied and **increased** failures in circumference/cm from 4 to 6, because blanket
quantisation pushes values off ties in the wrong direction. Targeted exact arithmetic is the fix.
Measure this class of change; do not reason about it.

---

## Competitive note — three URLs vs one

Reviewed a competitor's sizer on 29 Aug. Their numbers are worse than ours (their slider reports
US 4 at "11.00 mm diameter", where the US scale is *negative*; their EU column shows 46.8 and
67.2, and EU/ISO sizes are integers; their "¼ size ≈ 0.4 mm / 1.26 mm circumference" is exactly
2× the real figures of 0.2032 / 0.638, i.e. they published half-size numbers as quarter-size).
**Nothing from that chart, or any competitor chart, has been copied.**

But they run `Ring Sizer in MM` / `in CM` / `in Inches` as **three separate URLs**, and we serve
all six modes from one page behind `?measure=&unit=` query parameters, which Google does not
index as distinct pages. That is a real ranking difference and it is not addressed. Worth a
decision before launch — the `RingSizer` component already takes `measure`/`unit` props precisely
so a page can mount pre-set, so the routes would be cheap.

One more thing that is invisible today: **we calibrate and they do not**, which is the whole
accuracy argument, and the tool says so nowhere once the drawer is closed. A "✓ 1:1 on your
screen" marker next to the readout would surface it.
