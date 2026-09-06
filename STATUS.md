# ringsizetool.com — status

Last updated: 6 Sep 2026 · **Stage: LAUNCHED AND REGISTERED. `NOINDEX_SITE` is false, the site is
indexable and verified in Google Search Console, Bing and Ahrefs.**

**📊 `SEO-AUDIT.md` — new 6 Sep 2026.** Full GSC + competitor audit against the first 16 Search
Console impressions. It **corrects three conclusions in `RESEARCH.md` and one open question in this
file** (marked 🔴 there): the competitor does *not* run per-unit URLs, screen calibration is no
longer a differentiator, and `actual ring size chart on screen` has an incumbent. Read it before
starting any SEO work.

**⚠️ This file was two commits stale between 1 and 6 Sep**, and both stale lines told the next
session to do work that was already done — a Lighthouse run and the `favicon.ico` rebuild. Both are
corrected in place below. If you commit code, update this file in the same commit.

Tool + homepage + chart page + printable page + how-to page built. Size logic audited against the
published standards and 187 assertions. The tool has been driven end-to-end in a real browser three
times (28, 29 Aug and 1 Sep). The 29 Aug pass came from the owner's own manual test of all six modes
against every chart row and found four defects — all in the layer BETWEEN the slider and the maths
module, none in the maths.

**Both launch gates closed on 1 Sep 2026:**

1. **A real bank card against the calibration gauge — done, on the owner's laptop.** Matched at
   **4.12 px/mm**, saved, and the `✓ Actual size on your screen` marker then appeared in all six
   modes, i.e. the stored value loads. See "What 4.12 settled" below.
2. **The owner's read of the pages — done.** Approved as-is; future changes to be raised as they
   come up.

Remaining, and neither gates anything: the printed `/printable-ring-sizer` ruler check (needs a
printer the owner does not have), and the desktop calibration gauge polish item below.

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
| Domain | `ringsizetool.com` — **bought, live, apex is canonical, `www` 301s to it.** This line said "not bought yet, owner has no funds" until 1 Sep 2026, three days after the domain went live and the deploy pipeline started using it. It was the stalest line in the file and would have told the next session the launch was still blocked on money |
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
**187 assertions, `npm run verify`, all passing** (re-run 6 Sep). The "155" figures further down
this file are historical — they were correct on the date beside them.

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

### ✅ Where the site is registered — done 1 Sep 2026

All three webmaster accounts are live, on **one Google account** — the same one that already holds
`taxcalcpk.com`. Keep it that way: moving a GSC property between accounts later means adding a new
owner and re-verifying, and Bing/Ahrefs both hang off the GSC verification.

| Service | State | Notes |
|---|---|---|
| **Google Search Console** | ✅ **Verified 1 Sep**, sitemap submitted | **Domain property** `ringsizetool.com` (covers www, http, subdomains). Verified via Google's automated Cloudflare flow — the new GSC UI detects the DNS host and writes the TXT record itself after an OAuth grant, no manual copy-paste. That grant is revocable at Cloudflare → My Profile → Authorized Apps without breaking the verification. `README.md`'s kill criterion — under 500 impressions/month by month 4 — is measured here. |
| **Bing Webmaster Tools** | ✅ **Imported 1 Sep** | "Import from Google Search Console" carried verification and sitemap across. Signed in *with Google*, not a Microsoft account. Bing also feeds DuckDuckGo, Ecosia and ChatGPT's web search. Its URL submission quota is ~10/day, far more generous than GSC's. |
| **Ahrefs Webmaster Tools** | ✅ **Verified 1 Sep** | Verified via the GSC method (one click, no DNS). All metrics read 0 — correct for a 3-day-old domain, not a fault. Site Audit is the piece worth using; Rank Tracker is paid-only. Do **not** turn on Ahrefs Web Analytics — Cloudflare Web Analytics is the chosen tool and two scripts is waste. |
| **IndexNow** | ⬜ **Not confirmed** | Cloudflare zone → **Caching → Configuration → Crawler Hints** toggle. Cloudflare's UI calls it Crawler Hints; it is IndexNow underneath. Pings Bing and Yandex on change instead of waiting for a crawl. |
| **Analytics** | ⚠️ see below | Not yet installed, and the privacy policy says so out loud. |
| **Google AdSense** | Much later | Needs real traffic and a review. Applying to a site with no indexed pages wastes the application. `ring size adjuster` (>1,000/mo) is the one affiliate path in the keyword data and is the likelier first revenue, not ads. |

#### Submit the index, never the child sitemap

GSC has **`sitemap-index.xml`** and only that. Astro also emits `sitemap-0.xml`; the index points at
it and Google follows the pointer. Submitting both duplicates every URL across two rows in the
report and, worse, hardcodes a filename that stops covering the site the moment it grows past one
child sitemap. The index file keeps working as `sitemap-1.xml`, `-2.xml` appear.

#### "Couldn't fetch" on the sitemap is not a failure

GSC showed `Couldn't fetch` with an **empty "Last read"** column immediately after submission. That
combination means Google has queued the sitemap and not yet attempted it — the status is a
placeholder, not a result. Everything on our side was checked and is correct:

- `sitemap-index.xml` returns **200** to a Googlebot user-agent, valid XML
- `sitemap-0.xml` lists all **9 URLs** (home, chart, printable, how-to, average-ring-size, about,
  contact, privacy, terms)
- `robots.txt` serves `Allow: /` to Googlebot and points at the index
- no Cloudflare bot filtering on either path

**Do not delete and resubmit.** It does not trigger a fetch and it litters the history. Give it
24–48h. If `Couldn't fetch` persists *with* a populated "Last read", that is a real failure and
worth investigating.

Also normal, and not a bug: opening the sitemap in a browser shows *"This XML file does not appear
to have any style information"*. That is the browser noting the absence of an XSL stylesheet.
Google parses the XML and never renders it.

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

#### Order — all but two steps done

1. ✅ Owner's two physical checks, and the owner's read of the pages.
2. ✅ `NOINDEX_SITE = false` → pushed (`fcba344`, `81e9f17`), deployed itself.
3. ✅ Live HTML confirmed: `<meta name="robots" content="index, follow, max-snippet:-1,
   max-image-preview:large, max-video-preview:-1">`, no `X-Robots-Tag`, `robots.txt` clean.
4. ✅ GSC: `sitemap-index.xml` submitted. ⬜ Request indexing on the **homepage only** — the other
   8 pages come free via the sitemap, and per-URL requests burn a small daily quota.
5. ✅ Bing: imported from GSC.
6. ⬜ IndexNow / Crawler Hints toggle.
7. Analytics, with the privacy edit, whenever it is wanted — it is not a launch blocker.

#### What to expect, and when — do not check daily

| When | What |
|---|---|
| 24–48h | GSC sitemap status flips to `Success` |
| 3–7 days | homepage in the index. Check with `site:ringsizetool.com` |
| 2–4 weeks | first impressions in GSC Performance |
| Month 4 | the kill-criterion call: under 500 impressions/month → domain is not renewed |

Weekly is often enough. There is nothing a daily check surfaces that a weekly one misses on a
domain this young, and the zeros are not a signal.

**6 Sep, day 5 of indexing — the origin side re-checked, nothing changed:** `/` returns 200,
`sitemap-index.xml` returns 200, and the live homepage still serves `index, follow, max-snippet:-1,
max-image-preview:large, max-video-preview:-1`. That is everything checkable from here. **The two
open items above (Request indexing on the homepage, Crawler Hints/IndexNow) both live in a
dashboard and are still unticked**, along with reading the GSC sitemap status — which by this date
should have left `Couldn't fetch` and reached `Success`. If it has not, and "Last read" is now
populated, that is the real failure the 1 Sep note said to watch for.

### 📋 OWNER CHECKLIST — live, 31 Aug 2026. Tick these as they happen.

This replaces the scattered "two physical checks" notes. Everything a machine could verify has
been verified; what is left needs a person, a printer, a ruler or a phone.

**Print sheet — `/printable-ring-sizer`**

- [x] Prints as **3 pages**, no site header, no footer, no screen-only prose (owner confirmed 31 Aug,
      after the `.no-print` fix; it was 4 pages with the nav bar on page 1)
- [x] Print dialog: **Scaling 100%**, **Scale to Fit Paper Size OFF**, A4 portrait — owner's own
      settings, seen in their screenshots. This was the one thing no measurement here could check.
- [~] **Square = 50 mm on paper, OUTSIDE edge to OUTSIDE edge.** ⚠️ **No longer a launch gate —
      decision 31 Aug, and it reverses what this file said for three days.** The owner has no
      printer. Rather than block on hardware they do not have, the position is:

      This page does not claim "it will print correctly". It says *print it, measure the square, and
      if it is wrong fix the scale and reprint.* **The check square IS the safeguard**, so the page's
      honesty depends on telling the reader to verify, not on any printer behaving. That instruction
      now also says which edge, which is the part that was actually broken.

      Everything about the page's own correctness has been measured: square 50.0062 mm on both
      axes, 78/78 strip ticks with the zero on the cut line, hole diameters worst-case -0.124 mm,
      3 pages with no site chrome. What remains unverified is a third-party printer, which is
      exactly what the square catches by design.

      Do it as **confirmation** whenever a printer is to hand — a print shop is a few rupees. Tell
      them **100%, no fit-to-page**, or the sheet arrives pre-scaled and the square will say so.
      A 30 cm ruler, or the bank card: card short edge `CARD_SHORT_MM` (53.98 mm), and the square
      must fall `CARD_GAP_MM` (3.98 mm) short of it.
- [x] **Finger strip: the `0` tick sits on the strip's left cut line.** ✅ Verified 31 Aug out of
      print-to-PDF, so the owner does not need to do this one. All **78** ticks that 0–77 mm
      requires are present, the first sits at **0.0000 mm** from the cut edge, worst error of any
      tick is **0.165 mm** and the mean is **0.070 mm**. A US half-size is 0.638 mm of
      circumference, so the worst tick is 26% of a half-size out — well inside tolerance. All 16
      major ticks land on their multiple of 5. See the note below on how they had to be found.
- [~] **Ring-hole gauge (page 2): lay a real ring over the circles.** Also not a gate, same
      reasoning and same blocker — needs paper.
       The *geometry* is already
      verified — content diameter = round(d x 96/25.4) px, worst case US 7 at -0.124 mm, and whole
      US sizes are 0.4064 mm apart so no hole can be mistaken for its neighbour. What a real ring
      adds is whether the *instruction* works in the hand: "the circle whose outline just
      disappears inside the ring's inner edge". That is a usability question, not a measurement
      one, and only a person with a ring can answer it.

**On-screen tool — homepage**

- [~] **A real bank card against the calibration gauge, on a real phone.** **Mostly closed 31 Aug
      without a phone**, by attacking the density directly instead of emulating a device.

      The gap was never the viewport width — it was that a laptop renders at ~3.78 CSS px/mm and a
      phone at ~6.1, and the 29 Aug bug was a layout that broke at the higher figure. DevTools
      device emulation cannot reproduce that: it changes the CSS viewport and leaves the host
      screen's density alone. But the tool has a px/mm number input, so the condition can just be
      *typed in*. At a 375 px viewport, feeding it 3.78 / 5.0 / 6.1 / 7.0 / 8.0 (`PPM_MAX`):

        .cal-gauge height at 6.1 px/mm = 329.27 px = 53.98 mm exactly — the ID-1 short edge
        .cal-gauge width  at 6.1 px/mm = 109.8 px, in a 375 px viewport
        no horizontal scroll and no overflowing element at ANY of the five values

      329 px is the exact figure from the 29 Aug bug report ("at a real phone's ~6.1 px/mm the ID-1
      card is 329 x 522 px"). The rotate-90-degrees fix works: the 53.98 mm runs DOWN the screen,
      which is the axis a phone has room on, and costs only 110 px of width.

      `PPM_MAX` of 8 is a safe ceiling, because CSS px are normalised by device pixel ratio and
      phones land at 5.5-6.5 px/mm regardless of panel density.

      **What a real phone would still add is ergonomics, not correctness:** whether a card can be
      held flat while dragging a slider one-handed, and touch behaviour on a native range input.
      Worth doing on any phone that comes to hand. No longer a launch gate.

- [x] ✅ **Pinch-zoom no longer invalidates the calibration silently — done 31 Aug, option (b).**
      The marker now has THREE states, and the third is the whole point:

      | condition | marker |
      |---|---|
      | no stored calibration | `— Not calibrated yet — sizes assume a standard screen` |
      | calibrated, zoom unchanged | `✓ Actual size on your screen` |
      | calibrated, zoom moved | `⚠ Zoom has changed — reset it to 100% or calibrate again` |

      **Two mechanisms, because neither covers both cases.** Pinch-zoom moves
      `visualViewport.scale` and leaves `devicePixelRatio` alone; desktop browser zoom (Ctrl +/-)
      does the reverse. Reading only `visualViewport.scale` — which is what option (b) literally
      said — would have left Ctrl +/- silently wrong, i.e. the likelier case on the machine this
      site is built on. So the DPR at calibration is stored in its own key, `DPR_STORE_KEY`,
      alongside the untouched `PPM_STORE_KEY`.

      Verified by shimming both properties and firing `resize`: fresh → `none`; save → `ok` with a
      baseline written; `visualViewport.scale = 1.5` → `zoomed`; back to 1 → `ok`; `devicePixelRatio
      x 1.25` → `zoomed`; reset → `ok`. Both mechanisms detected, both recover.

      **Legacy visitors keep working.** A stored `5.2` with no DPR baseline boots calibrated, and
      browser zoom then stays MUTE rather than crying wolf — a warning that fires when nothing is
      wrong trains people to ignore the one that matters. Pinch-zoom needs no baseline, so it still
      fires. Recalibrating adopts a baseline.

      375 px, both themes: fits, two lines, no horizontal scroll. The warning is deliberately in
      `text-muted`, not a loud colour: this is a claim being WITHDRAWN, not an alarm, and the user
      zoomed on purpose. What carries the meaning is that the ✓ and the accent colour disappear.

### 📱 First real-device run — owner's Android, 31 Aug 2026

The tool was finally opened on a real phone. Recorded here because everything before this was
either a 375 px viewport or a typed-in density.

**What worked, confirmed on the device itself:**

- The rotated narrow-screen gauge renders correctly at every value the owner tried — 3.78, 7.42
  and 8.00 px/mm — with the 53.98 mm running DOWN the screen, labelled, and the slider and the
  gauge both on screen at once even at 8.00 (where the gauge is 432 px tall). That is the 29 Aug
  bug's exact scenario and it holds on hardware.
- The scale marker reads "Not calibrated yet — sizes assume a standard screen" on a first visit.
  The two-state logic works on the device, not just in an emulated viewport.
- The ring stage, true-scale grid and 10 mm legend all render.

**One real bug, found only because it was a real phone:**

The marker was `inline-flex items-center gap-1.5` inside a `text-center` parent. On desktop the
message fits one line and it looked fine. On a phone the longer messages wrap to two lines, the
flex text span takes the full width and centres its own text, and the icon is left **stranded
about 100 px to the left of its own first word**. Fixed by dropping the flex: the icon is now
simply the first inline thing in a centred paragraph, so both lines centre together. Gap measured
at 3.2 px — one space — in all three states, icon on the first line's baseline in each. **The
space between the two spans is load-bearing; keep them on one source line or Astro eats it.**

This is the third defect this project has found only by looking at a real rendering rather than at
code or a passing build, after the calibration overflow (29 Aug) and "set Scale to100%" (31 Aug).

**✅ Why the gauge looked wrong on the phone — and it was NOT the layout.** The owner said the box
was obviously too small next to the card. It was, and the first diagnosis here (gauge 18 mm wide vs
a card 85.6 mm wide, so the card hides the alignment bars) reached for the expensive answer and
missed the cheap one: **the starting value.**

`DEFAULT_PX_PER_MM` is 96 DPI, 3.78 px/mm — a 1990s desktop monitor. On a ~6.1 px/mm phone the tool
opened with the card outline rendering at `53.98 x 3.78 = 204 px`, which is **33 mm of real screen
against a card whose short edge is 54 mm: 62% of the object it asks you to match.** The first
impression of this site's one differentiator was an outline two-thirds the size of the card in
your hand.

Narrow screens now start at `PHONE_PX_PER_MM = 6`. Measured at 375 px: gauge 324 px, which on a
6.1 px/mm phone is 53.1 mm — **98% of the card.** Calibrating is a nudge, not a 60% drag. The
marker still reads "Not calibrated yet" until a value is saved, because a better guess is still a
guess.

Two changes went with it:

- **The gauge is `order-first` below `md`.** A card is wider than a phone screen, so with the gauge
  under the slider the card lay across the control it was being matched with. Gauge on top,
  controls beneath, thumb free. Measured: gauge and slider are both on one screen at 6, 7 and 8
  px/mm (686 px of 735 px usable at the ceiling). The Save button needs a small scroll at 8, which
  is fine — the card is off the glass by then. Desktop's two-column layout is untouched, verified
  at 1280 px: full card outline 53.97 x 85.59 mm, stage still on the right, start value still 3.78.
- **"Reset Default (96 DPI)" is now just "Reset".** It resets to whatever a fresh visitor gets, so
  on a phone it no longer hands back the 62% outline — and the old label named a figure the button
  had stopped applying. The label is server-rendered where the viewport is unknown, so it cannot
  name the number at all.

⚠️ **Trap this change created and then closed:** `window.innerWidth` is **0** in a hidden or
not-yet-laid-out context, and `0 <= 500` is true — so the phone starting point was handed to a
DESKTOP during this change's own testing. `startingPpm` now requires `w > 0`. Unknown width must
fall back to desktop, never to phone: guessing "phone" on a desktop doubles the scale, while
guessing "desktop" on a phone only restores the old behaviour.

⚠️ **Accepted jump:** an uncalibrated phone visitor sees the gauge grow once on boot, 204 px to
324 px, because static HTML cannot know the viewport and the server paints 96 DPI. The alternative
— a media query on `--calDefaultPpm` — removes the jump but sizes the gauge for a phone while the
"3.78" printed beside it still comes from the server, i.e. a page that contradicts itself until JS
runs. One honest correction beats a quiet disagreement.

**⬜ STILL OPEN — is the 18 mm gauge width worth fixing?** The original diagnosis stands as a fact:
the card covers both alignment bars. At 62% that made the task impossible; at 98% it is a
fine-tuning job where the bars sit at the card's own edges and read as boundaries. **Re-test on the
phone before spending anything here.** If it is still awkward, the fix is to measure the card's
LONG edge (85.6 mm) vertically with full-width bars — the card laid portrait covers only 54 mm of a
~65 mm screen, so the bars' ends stay visible beside it, and 85.6 mm still fits at the 8 px/mm
ceiling (685 px).

**✅ CLOSED 1 Sep — `PPM_MAX = 8` is high enough, with room to spare.** The owner held a real card
against the gauge on their laptop and it matched at **4.12 px/mm** — roughly half the ceiling. The
earlier "slider pinned at 8.00" was exploration, not a card that needed more than 8. `PPM_MAX` in
`src/data/calibration.ts` stands.

**What 4.12 settled, and the one thing it exposed.** 4.12 lands exactly where a laptop should
(1080p 24" ≈ 3.6, 27" 1440p ≈ 4.3, MacBook 13" ≈ 5.0), so the mechanism and the bounds are both
sound. But getting there, the owner reported the outline growing "far too big", and measured in the
browser at 1440x900 that reading is correct:

| px/mm | Card outline | Area vs 4.3 | Drawer height |
|---|---|---|---|
| 3.78 (CSS default) | 204 x 324 | 0.77x | — |
| 4.3 (laptop's real zone) | 232 x 368 | 1x | 448 px |
| 6.0 | 324 x 514 | 1.95x | — |
| 8.0 (slider's end) | 432 x 685 | **3.46x** | **780 px** |

The cause is not a bug — `--calCardMm` is 53.98 and the corner radius 3.18, both correct, and both
shapes derive from the one `--cal-mm`. It is that **the desktop outline draws the whole card**, so
the 85.6 mm height scales alongside the 53.98 mm width even though only the width is ever matched.
1.86x of width becomes 3.46x of area, and the eye reads area. At 8.00 the drawer is 780 px tall on
a 900 px viewport, so the outline fills the screen and overshooting *feels* like the tool is broken.

The page does NOT scroll horizontally at any calibration — `.cal-stage` scrolls inside itself — so
the 375 px rule is intact.

**⬜ POLISH, not a blocker — give desktop the same gauge the phone has.** The narrow layout already
made this decision the other way: it dropped the 85.6 mm height and shows only the 53.98 mm
dimension gauge. Desktop kept the old full-card outline. Making desktop match would confine
overshoot to one dimension instead of three-times-the-area. The trade-off to weigh first: a
card-shaped outline is more self-explanatory than an abstract gauge — "put your card here" reads
instantly — and desktop has the room the phone did not. Worth doing, but decide it deliberately
rather than for consistency's sake.

- [ ] ⬜ **The one remaining reason to test on a real phone.** On some mobile browsers
      `visualViewport.scale` may drift off 1.0 transiently — momentum scroll, the address bar
      collapsing, the keyboard opening. The tolerance is 0.01, so a transient could flash the
      warning and flash back. `renderMarker` writes nothing unless the state actually changes, so
      it cannot loop, but it could blink. Nothing here can reproduce it. If it blinks on a real
      phone, the fix is a short debounce, not a wider tolerance — widening it would start missing
      real zoom.

**✅ Both launch gates closed 1 Sep 2026:**

1. **A real bank card against the gauge — done on the owner's laptop, matched at 4.12 px/mm.**
   Calibration is screen-agnostic by design: you hold a card against whatever screen you are on and
   drag until they match, so doing it once on the laptop tests the actual mechanism with the actual
   object. The phone-specific risk (density) was measured separately, above.
2. **The owner's read of the pages — done.** Approved as-is.

`NOINDEX_SITE = false` shipped in the same commit as this note (`fcba344`), CI green, and the live
site was then checked rather than assumed:

- All **9 real pages** serve `index, follow, max-snippet:-1, max-image-preview:large,
  max-video-preview:-1`. `/404` still serves `noindex, nofollow`.
- `robots.txt` allows all and points at `sitemap-index.xml`; the sitemap lists those same 9 URLs and
  no error pages.
- Canonicals resolve to the bare apex with no `/index.html`, and
  `https://www…/ring-size-chart` still 301s to the apex with its path intact.

**Not yet done, and now the only thing standing between the site and data:** Search Console. Nothing
is submitted anywhere yet — see the registration table below.

**⚠️ The flip exposed a bug in the gate that was supposed to protect the flip.** `deploy.yml`'s
noindex check asked for **zero** noindexed pages once `NOINDEX_SITE` was false. But `404.astro` and
`500.astro` hardcode `noindex={true}` and deliberately do not follow the flag — an error page in
Google's index is a bad result for a real query. So the build produced 2 noindexed pages of 11, and
the gate would have **failed the deploy on the launch commit itself**.

It had never fired because the false-branch had never executed: the flag was true from the day the
gate was written until 1 Sep. **A gate whose other half has never run is not a gate yet** — worth
remembering for site 3, whose template inherits this workflow.

Fixed by excluding the two error pages from the live-site count and asserting separately that they
*always* carry noindex — which makes the check stricter than before, since nothing previously
noticed if an error page lost it. Both failure paths were tested against a modified copy of `dist/`
before committing: a real page leaking noindex fails, and a 404 losing its noindex fails.

---

### The one owner check still outstanding — and why it does not gate anything

- **Print `/printable-ring-sizer` and measure the square with a ruler. It must be 50 mm.** Not
  done: no printer. It does not gate the launch, because until somebody actually prints that page
  it cannot hand anyone a wrong number — and the page's own copy tells the reader to verify the
  check square before trusting it. Do it the first time a printer is available.

- **A real card against the gauge on a real *phone*** is also still unmeasured; the narrow layout
  has only been checked by measuring the DOM at 375 px. The laptop pass proves the mechanism, and
  `PHONE_PX_PER_MM = 6` puts the phone default within ~2% of a real handset, so this is now a
  polish check rather than a correctness one.

### Not blockers — ship without them, add after

- **Lighthouse — accessibility run and fixed 2 Sep (`58363e8`); performance still unrun.** See the
  Next list for what the a11y pass found. `og.png` 105 KB and `hero-ring-hand.webp` 135 KB are
  unchanged and are still the performance candidates.
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

**✅ `public/favicon.ico` — FIXED 1 Sep, commit `9dc918c`.** It is now a 16/32/48 multi-size ICO
(10.6 kb) rebuilt from `logo.webp`, and `Layout.astro` declares it alongside the PNG:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.png" type="image/png">
```

**Keep the reasoning, because the trap is inherited by every future site in the factory.** The
starter's 655-byte black "A" survived to launch because HTML pages looked right everywhere anyone
checked — including GSC's own sidebar — since `Layout.astro` declared only the PNG and every HTML
page therefore got the correct icon. **A non-HTML response has no `<head>`**, so the browser falls
back to requesting `/favicon.ico` from the origin, which is why the tab on `/sitemap-index.xml`
was the one place the wrong icon showed. Check XML, not just HTML.

It was cosmetic — it never touched indexing, and Google's search-result favicon comes from the
`<link rel="icon">` tag, which was always right.

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

4. ✅ **Lighthouse accessibility — DONE 2 Sep, commit `58363e8`.** Three findings, all real, and
   worth reading because two of them had passed every earlier audit on this site:

   - **Neither range slider had a label at all.** `#cal-range` and `#ring-range` each sit beside a
     paired number input, and it was the *number input* that carried the `<label>`. A sighted
     person reads the label as belonging to both; a screen reader announces the slider as an
     unnamed control. Two controls sharing one visual label is not two labels.
   - **The size-grid's `<dt>`/`<dd>` pairs had no `<dl>` ancestor** — they sat in plain `<div>`s,
     which makes the term/definition relationship invisible to assistive tech. The grid container
     itself is now the `<dl>`.
   - **`--accent-text` (`#B8860B`) measured 3.25:1 on white**, under the 4.5:1 that normal text
     needs, and it is the link and small-print colour on nearly every page. Now `#8F6B0A` at
     4.89:1, still gold. Dark mode's `#E9C349` was already 10:1+ and is untouched.

   `npm run verify` still 187/187 — none of it touches the maths.

   ⚠️ **The `web-design-guidelines` audit had already "passed" before this.** A skill audit reads
   the code; Lighthouse measures the rendered page. They are not substitutes, and this is the same
   lesson as `verify` vs driving the tool.

   ⬜ **Performance, SEO and best-practices categories are still unrun.** `og.png` is 105 KB and
   `hero-ring-hand.webp` 135 KB — both are candidates if the score needs it.

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
