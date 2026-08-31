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
- **Ring diagram** — a live-scaled gold ring on true-scale graph paper (1 mm minor, 5 mm major)
  with a 10 mm legend bar, all driven by the calibrated px/mm, plus centre crosshair ticks. The
  dashed guide circle was **removed 31 Aug** and must not return — see Next item 3.
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

## ⚠️ Astro gotcha that has now bitten three times

**Astro deletes the newline between text and a following `{expression}` or tag.** Write this:

```
    A full US size is
    {fullSizeMm.toFixed(2)}&nbsp;mm of diameter
```

and the page renders "A full US size is0.81 mm of diameter". Same for a `<strong>` on the next
line: "measuring the" + newline + `<strong>inside</strong>` renders as "theinside".

It is invisible in the source, invisible in the diff, and only shows up in the rendered text — so
`npm run build` passing means nothing here. **Keep the word and the expression on the same source
line**, even where that makes the line long.

**The sweep that used to live here was half-blind, and it is now a pipeline gate.**

```bash
npm run sweep     # scripts/sweep-astro-newline.py, runs in CI after every build
```

The old one-liner replaced every tag with a *space* — `re.sub(r'<[^>]+>', ' ', s)` — which
erased the exact evidence it was hunting for. It could only ever see the `{expression}` variant,
never the tag variant. That hole let **19 occurrences ship across five pages**: the homepage read
"the other asks*which unit*", "letters come from**BS EN 28653**", "see the*ring size chart*",
"adding exactly**1.25 mm**"; `/printable-ring-sizer` read "set Scale to**100%**".

Found 31 Aug 2026 **by eye, in a screenshot** — not by the script that was supposed to catch it.
All 19 are fixed and all nine pages now measure a zero-width join count of 0 in a real browser.

The new sweep checks both variants and runs as a `Deploy` step, so this cannot ship again. It
reports *candidates*, not certainties: an intentional join like `co<em>operate</em>` is legitimate
and would need whitelisting. Confirm a candidate the way it was confirmed here — in a browser, with
a `Range` over the preceding text node, comparing its `right` to the element's `left`. A zero gap on
the same line is the bug; a wrap to the next line is not.

---

## 🚀 Going live — the order matters more than the checklist

Written 29 Aug 2026 because the owner is ready to launch and wants to keep adding pages
afterwards. **Launching early and adding gradually is the right call** — the pages that exist are
worth indexing now, and Google needs months on a new domain regardless. What follows is not
"wait", it is "do these in this order".

### 🔴 Three things are wired to a domain that does not exist yet

`SITE_URL` is `https://ringsizetool.com` and three things already emit it:

| What | Where | If you deploy to `*.pages.dev` today |
|---|---|---|
| Canonical tags | `Layout.astro`, every page | Every page declares itself canonical at a domain that does not resolve |
| Sitemap `<loc>` entries | `dist/sitemap-0.xml`, auto-generated | Lists 11 URLs that 404 |
| `robots.txt` | `public/robots.txt` | Says `Allow: /` and points at a sitemap on that domain |

While `NOINDEX_SITE` is `true` this is harmless — the robots meta wins and nothing gets indexed.
It stops being harmless the moment noindex comes off. **Never flip `NOINDEX_SITE` on a
`*.pages.dev` URL.** A canonical pointing at a dead domain is the one SEO mistake here that is
genuinely hard to undo: Google will index the pages.dev host, find canonicals it cannot fetch,
and you spend months teaching it the real URL.

### ⬜ Open: www or apex only? — owner deferred, 29 Aug

`SITE_URL` is `https://ringsizetool.com` (apex, no www) and every canonical already emits that,
so **apex-only is the zero-work option and the one everything is currently consistent with.**

The only argument for adding `www.ringsizetool.com` is that someone typing it by hand should not
hit a dead page. If it is added it must be a **redirect to the apex**, never a second host serving
the same pages — two hosts serving identical content is duplicate content the site inflicts on
itself, and the canonicals would be fighting the DNS.

Decide before the noindex comes off, not after. Changing canonical host once Google has indexed
one is the expensive kind of change.

### ✅ DONE 29–30 Aug — the domain, the pipeline, and the host rules

- **`https://ringsizetool.com` is live** on Cloudflare Pages, SSL active. The apex is the
  canonical host, which is what `SITE_URL`, every canonical tag, the sitemap and `robots.txt`
  already assumed — so nothing had to change to match it.
- **Auto-deploy works.** Push to `main` → verify → build → noindex check → deploy. First run
  carried 31 commits up in one go.
- **`www` → apex, 301.** Redirect Rule with a wildcard, `https://www.ringsizetool.com/*` →
  `https://ringsizetool.com/${1}`, query string preserved. The `${1}` matters: without it every
  page collapses onto the homepage.
- **`Always Use HTTPS` is on**, and it fixed a real bug rather than being a nicety. The redirect
  rule's pattern begins with `https://`, so `http://www…` never matched it — Cloudflare then
  looked for a `www` origin, found none (www is not a Pages custom domain) and returned **522**.
  The apex was fine because Pages handles its own HTTP upgrade. Found by testing, not by reading.
- **Minimum TLS raised to 1.2** from the 1.0 default.

Verified end to end: `http://www…/ring-size-chart`, `http://apex/…`, `https://www…?query` all
land on the apex page, 200, path and query intact, every hop a 301.

⚠️ **Do not add `www` as a second Pages custom domain.** It would serve the same content on both
hosts — duplicate content the site inflicts on itself, with the canonicals fighting DNS. The
redirect rule is the correct mechanism.

### ✅ Auto-deploy is LIVE — verified 30 Aug

Both GitHub secrets exist (`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, set 29 Aug) and
`.github/workflows/deploy.yml` has run green on every push since. Push to `main` runs
`npm ci` → `npm run verify` → `npm run build` → a noindex check → `wrangler pages deploy`.
Nothing is unpushed; `origin/main` and local `main` match.

Account ID, for reference: `b9c4a5166afe57f87b65c8bb1d795f1c`.

**This section previously said "PENDING — cannot run until two secrets exist" and "24 local
commits are unpushed." Both were already untrue when written down. Checked, not assumed.**

**Correction to a belief worth killing:** taxcalcpk.com does **not** auto-deploy. All ten of its
Worker deployments report `Source: Unknown (deployment)`, i.e. a hand-run `wrangler deploy`, and
its repo (`bilalfre679-cyber/studio`, branch `AddSkill`) has no workflow file. If push-to-deploy is
wanted there too, this same workflow is the pattern — with `wrangler deploy` instead of
`pages deploy`.

### The safe launch order

1. **Buy the domain.** Everything below is blocked on this, and nothing above it matters.
2. Deploy to Cloudflare Pages (`npm run deploy` — `wrangler` is now in `node_modules` and the
   script exists). Site is still `noindex`; this is a private dress rehearsal.
3. Attach the custom domain in the Cloudflare dashboard. Confirm `https://ringsizetool.com`
   serves the site and the `*.pages.dev` URL redirects to it, not the other way round.
4. **Do the two physical checks** (below). They gate the site's only real claim.
5. **Only now** set `NOINDEX_SITE = false` in `src/config.ts`, rebuild, redeploy. Confirm in the
   built HTML that `noindex` is gone and the positive robots directive is there.
6. Search Console: verify the domain property, submit `sitemap-index.xml`. Not before step 5 —
   submitting a noindexed site teaches Google nothing and wastes the first crawl.
7. Then add pages one at a time. Each new page is picked up by the sitemap automatically.

### ✅ `contact@ringsizetool.com` receives mail — 30 Aug

Cloudflare Email Routing, free, no mail server. MX, SPF and DKIM are live and verified in DNS;
`contact@` routes to `bilal.fre.679@gmail.com`, and a `hello@` rule covers the address that was
briefly published before the rename.

**Catch-all is deliberately left on Drop.** A catch-all turns the whole domain into a spam target —
`admin@`, `sales@`, and every random string a spammer tries would land in the inbox. Two explicit
rules cover both addresses that were ever published, and nothing else is open.

`EMAIL` in `src/config.ts` is the single source for the address; `/contact`, `/privacy` and
`/terms` all read from it. Cloudflare obfuscates it in the served HTML (`__cf_email__`), so the
plain string is absent from the page source by design — that is anti-scraping, not a bug.

### ⬜ Where to register the site — and what waits for the noindex flip

Split into two groups, because the gate matters. **Verification** proves you own the domain and
can be done today. **Submission** tells a search engine to crawl, and is wasted — or worse,
teaches it the site is noindexed — until `NOINDEX_SITE = false` has shipped.

| Service | Do it | Why it matters here |
|---|---|---|
| **Google Search Console** | Verify **now**, submit sitemap **after** | The single most important one. `README.md`'s kill criterion is measured in GSC impressions — under 500/month by month 4 and the domain is not renewed. Without it there is no data to make that call on. Use the **Domain property** (`ringsizetool.com`, covers www and http too), verified by DNS TXT — the domain is on Cloudflare, so it is a two-minute copy-paste into the same DNS screen used for Email Routing. |
| **Bing Webmaster Tools** | Verify **now**, submit **after** | Free, and it has an **"Import from Google Search Console"** button that carries the verification and sitemap across in one click. Bing is small directly, but it also feeds DuckDuckGo and ChatGPT's search — cheap reach for one click. |
| **IndexNow** | Turn on **after** noindex is off | Cloudflare has a one-toggle IndexNow integration (zone → Caching or the Cloudflare IndexNow app). It pings Bing and Yandex the moment a page changes instead of waiting for a crawl. Free, and it suits this site because pages will keep being added after launch. |
| **Ahrefs Webmaster Tools** | Verify **now** | Free for a domain you own, and it unlocks Site Audit and full backlink data for that domain — the paid-tier view of your own site. The keyword research in RESEARCH.md was done on the free Keyword Generator and Difficulty Checker; AWT is the piece that watches the site itself. |
| **Analytics** | ⚠️ see below | Not yet installed, and the privacy policy says so out loud. |
| **Google AdSense** | Much later | Needs real traffic and a review. Applying to a site with no indexed pages wastes the application. `ring size adjuster` (>1,000/mo) is the one affiliate path in the keyword data and is the likelier first revenue, not ads. |

#### Analytics: pick Cloudflare Web Analytics, not GA4

Both are free. The difference that matters for this site:

- **Cloudflare Web Analytics is cookieless.** No cookies means **no consent banner** — nothing to
  build, nothing to maintain, and no EEA/UK exposure. It is already in the stack, one toggle on the
  zone, and it does not slow the page down.
- **GA4 sets cookies.** In the EEA and UK that legally requires a consent banner *before* the
  script runs. This site has no consent mechanism, and building one is real work for data a
  cookieless tool already gives.

GSC covers what actually drives decisions here anyway — impressions, queries, positions. GA4 would
add on-site behaviour that a five-page tool site does not need to make its month-4 call.

🔴 **Whichever is chosen, `src/pages/privacy.astro` changes in the SAME commit.** It currently
states there is no analytics *and promises* the page will name any before it is added. Adding a
script without that edit puts the site back in the position it was found in — a privacy policy
describing a site that does not exist.

#### Order

1. Owner's two physical checks, and the owner's read of the pages.
2. `NOINDEX_SITE = false` → push (deploys itself).
3. Confirm the live HTML has no `noindex` and the positive robots directive is present.
4. GSC: submit `https://ringsizetool.com/sitemap-index.xml`. Request indexing on the homepage.
5. Bing: import from GSC.
6. IndexNow toggle.
7. Analytics, with the privacy edit, whenever it is wanted — it is not a launch blocker.

Verification (GSC, Bing, Ahrefs) can all be done before step 2 and is the sensible thing to do
while the physical checks are outstanding.

### 📋 OWNER CHECKLIST — live, 31 Aug 2026. Tick these as they happen.

This replaces the scattered "two physical checks" notes. Everything a machine could verify has
been verified; what is left needs a person, a printer, a ruler or a phone.

**Print sheet — `/printable-ring-sizer`**

- [x] Prints as **3 pages**, no site header, no footer, no screen-only prose (owner confirmed 31 Aug,
      after the `.no-print` fix; it was 4 pages with the nav bar on page 1)
- [x] Print dialog: **Scaling 100%**, **Scale to Fit Paper Size OFF**, A4 portrait — owner's own
      settings, seen in their screenshots. This was the one thing no measurement here could check.
- [ ] **Square = 50 mm, measured OUTSIDE edge to OUTSIDE edge.** Needs a 30 cm ruler. No ruler:
      a bank card's short edge is `CARD_SHORT_MM` (53.98 mm) and the square must fall
      `CARD_GAP_MM` (3.98 mm) short of it — the page says this itself.
- [x] **Finger strip: the `0` tick sits on the strip's left cut line.** ✅ Verified 31 Aug out of
      print-to-PDF, so the owner does not need to do this one. All **78** ticks that 0–77 mm
      requires are present, the first sits at **0.0000 mm** from the cut edge, worst error of any
      tick is **0.165 mm** and the mean is **0.070 mm**. A US half-size is 0.638 mm of
      circumference, so the worst tick is 26% of a half-size out — well inside tolerance. All 16
      major ticks land on their multiple of 5. See the note below on how they had to be found.
- [ ] **Ring-hole gauge (page 2): lay a real ring over the circles.** The *geometry* is already
      verified — content diameter = round(d x 96/25.4) px, worst case US 7 at -0.124 mm, and whole
      US sizes are 0.4064 mm apart so no hole can be mistaken for its neighbour. What a real ring
      adds is whether the *instruction* works in the hand: "the circle whose outline just
      disappears inside the ring's inner edge". That is a usability question, not a measurement
      one, and only a person with a ring can answer it.

**On-screen tool — homepage**

- [ ] **A real bank card against the calibration gauge, on a real phone.** Still outstanding, and
      still the check nothing here can substitute for: the narrow-screen layout has only ever been
      verified by measuring the DOM at 375 px. Physical pixel density is the whole point.
- [ ] **The new scale marker, both states.** Before calibrating it must read "Not calibrated yet —
      sizes assume a standard screen"; after Save, "✓ Actual size on your screen".
- [ ] **The dashed guide circle is gone** — is the ring alone on the graph paper better or worse
      than before? Owner's aesthetic call, and reversible.

⚠️ **Do NOT check the square by putting a screen-ruler app over the print preview.** The owner
tried this on 31 Aug and it cannot work, for three reasons worth writing down because the idea is
a natural one: the preview is a whole A4 page scaled down to fit a pane, so 50 mm renders at
whatever the pane's zoom happens to be; a screen-ruler app converts pixels to millimetres using an
assumed DPI, which is the exact unreliability this site's calibration exists to remove; and above
all the check's purpose is to catch the *printer*, which is not involved on screen. The square has
to be measured on paper, with a physical ruler or a bank card.

⚠️ **Finding the strip ticks in the PDF took three passes, two of which gave wrong answers.**
Recorded so nobody repeats them. (1) A height filter of `8 < h < 28` looked generous but excluded
the 6 mm major ticks at 23 px on the first attempt, and a narrower one excluded them entirely.
(2) The out-of-range ticks carry `opacity: 0.45`, so Chrome emits each one in its own transparency-
group Form XObject — they are absent from the page's own content stream, and a scan of that stream
alone finds only the 30 in-range ticks and silently reports the strip as starting at 44 mm.
(3) A first "the 0 tick is at 0.0000 mm" result was read off a rect at x=32 that turned out to be
the strip's own left border, not a tick — right answer, wrong evidence. The real check needs the
main stream **plus** every XObject, filtered to the two genuine tick heights (11 px minor, 23 px
major); four spurious 27 px items otherwise inflate the worst error from 0.165 mm to 0.383 mm.

**Reading, before `NOINDEX_SITE = false`**

- [ ] **Homepage `#disagree`, new final subsection**: "A unit is not a size — and some screen sizers
      confuse the two". Four paragraphs about a competitor's error. Check the tone — it is more
      pointed than anything else on the site.
- [ ] **Homepage prose generally.** 19 missing spaces were repaired on 31 Aug across five pages;
      the fix was verified geometrically, but read it once for sense.
- [ ] `/ring-size-chart` and `/printable-ring-sizer` read through.

Once every box above is ticked: `NOINDEX_SITE = false` → push (deploys itself) → confirm the live
HTML has no `noindex` → GSC sitemap → Bing import → IndexNow. GSC/Bing/Ahrefs **verification** can
be done at any time before that and is the sensible thing to do while these boxes are open.

---

### Two checks only the owner can do, and they gate the whole pitch

Neither has been done. Both test the claim the entire site is built on — that the numbers are
right — and neither can be verified from code:

- **A real bank card against the calibration gauge, on a real phone.** The narrow-screen layout
  has only ever been checked by measuring the DOM at 375 px.
- **Print `/printable-ring-sizer` and measure the square with a ruler. It must be 50 mm.**

If either is wrong, the site is confidently wrong, which is worse than being late.

### Not blockers — ship without them, add after

- **Lighthouse** — never run. `og.png` 105 KB, `hero-ring-hand.webp` 135 KB are the candidates.
- **Ads / AdSense** — needs traffic and approval anyway; applying to an unindexed site is wasted.
- **`ring size adjuster`** affiliate section — real (>1,000/mo, the only affiliate path in the
  keyword data) but a monetisation decision, not a launch item.
- **The remaining keyword work** — `actual ring size chart on screen` (>1,000, and the one keyword
  our calibration answers better than anyone), the `oura` / `pandora` brand pages, and the
  three-unit-URLs question in item 2 below.
- **`eu ring size chart` volume**, and re-pulling `uk ring size chart` for GB and
  `indian ring size chart` for IN — the 28 Aug pass was US-only and understates both.

### ⚠️ Process, not code: stop running two sessions on this repo

Two Claude sessions have been editing these files at the same time, and on 29 Aug it cost real
work: one session's `/average-ring-size` commit swallowed another's staged changes, `package.json`
rewrote itself twice mid-task, and `ringModes.ts` changed underneath an in-flight edit. **Run one
session at a time.**

---

## Notes worth keeping — decisions and traps, 30 Aug 2026

**Who wrote the privacy policy's analytics promise.** Not the owner — it came from commit
`f37270f`, added while removing three false claims from that page (it described GA4, Cloudflare
Web Analytics and AdSense, none installed, plus an EEA/UK consent choice that did not exist). The
sentence *"if that changes, this page will say so before it does"* was a judgement call to stop
the file drifting back.

**Owner's decision, 30 Aug: the sentence stays for now, and comes out on the day analytics is
added.** So when that day comes, in ONE commit:

1. Delete the promise sentence from the Analytics section of `src/pages/privacy.astro`.
2. Name what was actually installed, in its place — and do the same in the Advertising section
   if ads arrive.
3. Bump `LAST_UPDATED` in that file.

Three steps, one commit, so the promise is never removed without the replacement landing with it.

The duty and the sentence are separate: a privacy policy has to describe the site as it is
because the law requires it, not because of anything written here. Deleting the sentence removes
a promise, not the obligation.

**Cloudflare obfuscates the contact address.** `contact@ringsizetool.com` is absent from the
served HTML as a plain string — it appears as `__cf_email__` with a `data-cfemail` hex blob and is
decoded by a Cloudflare script in the browser. Anti-scraping, on by default, working as intended.
Do not "fix" it, and do not conclude a deploy failed because grep finds nothing.

**Astro eats the newline before `{expression}` and before a tag.** Nine occurrences were found and
fixed on 29–30 Aug (`"A full US size is\n{fullSizeMm}"` rendered as `is0.81`). Invisible in the
source and in the diff; the build passes either way. Keep the word and the expression on one
source line, and re-run the sweep in the gotcha section above after any prose edit.

**Two `.gitignore` layers.** The factory root ignores `sites/`, because each site is its own
repository. A `git commit` run from the factory root silently commits nothing from the site — it
happened once this session and the work looked committed when it was not. Always commit from
inside `sites/<domain>/`.

**Destination email addresses are account-wide in Cloudflare.** `bilal.fre.679@gmail.com` is now
verified on the account, so every future site in the factory can route to it without verifying
again. Prefer one inbox with Gmail filters over a new mailbox per site — `taxcalcpkofficial@` is
the counter-example of how that ages.

**The 60-day transfer lock.** `ringsizetool.com` was registered 28 Aug 2026, so it cannot move
registrar or Cloudflare account until roughly 27 Oct. If these sites are ever to sit under a
business identity rather than a personal Gmail, that is the earliest it can be done.

---

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

3. ✅ **Surface the calibration — DONE 31 Aug.** A two-state marker under the readout: `✓ Actual
   size on your screen` once a calibration is stored, and `— Not calibrated yet — sizes assume a
   standard screen` until then. Two states, not one, because before calibration the tool is running
   on a nominal 96 DPI guess and a flat "1:1" badge would be confidently wrong — the thing this
   site exists not to be. It is driven from the same condition that collapses the calibrate drawer,
   so the two can never contradict each other.

   **The dashed guide circle was removed in the same change, and must not come back.** It was a
   fixed 232 px ring — 61 mm at default scale — drawn around a ring that is physically 13–24 mm.
   Measured: the real ring filled **21%** of it at the slider's bottom and **40%** at the top, so it
   could never fill the guide it appeared to be a guide for. The owner spotted this by eye while
   comparing screenshots against a competitor. It reads as "the tool draws my ring too small" when
   the truth is the reverse — the ring is life-size and the guide was not. Enlarging the ring would
   forfeit the site's only real claim; the grid and the 10 mm legend already prove the scale, and the
   marker now says it in words.

   `actual ring size chart on screen` (>1,000/mo) is still unwritten, and this marker is the hook
   for it.

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

## Competitor bug, measured 31 Aug 2026 — a unit is not a size

The owner supplied screenshots of a competitor's three sizer pages (MM / CM / Inches) showing the
same ring — 16.51 mm = 1.651 cm = 0.650 in — drawn at **three different sizes**. The centimetre
page's circle is roughly **ten times smaller**, which is the ratio of the two *numbers*, not of any
two sizes: they scale the drawing by the figure on the slider instead of by the measurement it
stands for. The same screenshots show **EU 51.8** on two of the three pages; EU/ISO sizes are whole
millimetres of circumference, so 51.8 is not a size. (This matches the earlier note below about
their EU column showing 46.8 and 67.2.)

**Our tool was tested for the same fault before anything was written.** All six modes measured a
circle of **exactly 62.406 px, spread 0**, and reported `6 | L½ | 52 | 12` in every one — because
`px = diameter_mm × pxPerMm` and the unit never enters it. Written up on the homepage in the
`#disagree` section as "A unit is not a size", with a five-second test the reader can run on any
sizer including ours.

⚠️ One trap from doing that test: driving the tool through all six modes leaves it in the LAST
mode. A sweep of millimetre diameters typed into a circumference-in-inches field all clamp to the
maximum and return an identical circle width, which looks exactly like "the circle never changes".
Set the mode explicitly before measuring.

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
