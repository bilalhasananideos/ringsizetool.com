# ringsizetool.com — SEO & competitor audit

**Date:** 6 September 2026 · **GSC window analysed:** 30 Aug – 4 Sep 2026 (6 days)
**Site age as an indexable property:** 5 days (`NOINDEX_SITE` flipped 1 Sep 2026)
**Method:** GSC data supplied by owner · full read of `src/` and `dist/` · live inspection of three
competitors on 6 Sep 2026 (browser, not memory).

> This file is the canonical copy of this audit. `RESEARCH.md` holds the *pre-launch* keyword and
> competitor work; three of its conclusions are corrected here and marked 🔴.

---

## 1. Executive summary

The instrument is better than every competitor's. The site is not, and one reason is uncomfortable:
**the differentiator the homepage stakes its H1 on — screen calibration — is no longer a
differentiator.** Two of the three sites that actually rank for the queries this site is getting
impressions for already calibrate against a bank card, and one of them calibrates against eight
different reference objects and hands the visitor an on-screen ruler as well.

What is genuinely defensible is narrower and less marketable: **the arithmetic is right and
theirs demonstrably is not.** The #1 site in the market publishes EU 51.8 (not an ISO size),
renders the same ring at three different physical sizes on three sliders, and states the
quarter-size increment at exactly double the true figure. That is a real moat, but nobody searches
for correctness.

The GSC data cannot support most of the analysis this brief asks for — 16 impressions, 0 clicks,
three named queries — and I have said so per section rather than manufacturing findings. What the
data *does* say is precise and useful: every impression is on one intent cluster (*ring sizer
online*), and four of the site's six content pages have earned **zero** impressions, which points
at an indexing question, not a ranking one.

The single highest-leverage change is not a new page. It is that the tool asks the wrong first
question. Every competitor opens with *"place your ring on the circle."* This tool opens with
*"Diameter or Circumference? MM, CM or Inches?"* — a question that presupposes the visitor already
has a measurement. The instruction to lay a ring on the circle exists on the homepage, in prose,
**below the tool.** For a query that means *"a thing that will size my ring,"* that is an intent
mismatch inside the product itself.

**Do not build more pages.** The site has ten URLs, no thin content, no programmatic bloat, and no
cannibalisation severe enough to merit a merge. Its problem is the opposite of bloat.

---

## 2. Biggest problems found

Ranked by cost, most expensive first.

### P1 — The calibration moat is gone, and the H1 is spending everything on it

| Site | Calibrates? | With what |
|---|---|---|
| ringsizetool.com | Yes | Bank card, short edge, portrait |
| measureringsize.com | **Yes** | Bank card (landscape) **or a physical ruler** |
| ringsize.app | **Yes** | **8 objects:** card, US quarter, 1 yuan, 1 euro, CAD 25¢, ₹5 rupee, $1 AUD, $1 SGD |
| ringssizechart.com | No | — (and it is the 17.2K/mo traffic leader) |

`measureringsize.com`'s meta description reads *"Accurate online ring sizer with calibration."*
This site's H1 reads *"Free online ring sizer, calibrated to your screen."* These are the same
claim, and they rank #1 and ~#32 respectively for the same query.

**Consequence:** the H1, the three hero badges, and the whole "About the tool" section are
differentiating against a competitor set that no longer exists. Meanwhile the thing that *is*
unique — computed-from-standard numbers with 187 assertions behind them, seven size systems
including India, quarter sizes — is a proof-card link in the hero and nothing else.

### P2 — The tool asks for a unit before it asks for a ring

The instrument card, in order: two pill groups (*Diameter | Circumference* × *MM | CM | Inches*),
a graph-paper stage with crosshairs and no instruction on it, a slider, six results.

`src/pages/index.astro:262-275` does say *"A ring that already fits. Lay it on the circle and match
the circle to the ring's inside edge."* — but that is body copy roughly 150 lines below the tool.
Nothing inside `RingSizer.astro` tells anyone to put a ring on the screen.

Compare the three competitors, all of which lead with the object, not the unit:

- measureringsize: `Start Measuring` → `Card | Ruler` → `Next: Measure Ring` → *"Place your ring on the adjustable circle"*
- ringsize.app: H1 is literally *"Measure your ring size. Right on your screen."*
- ringssizechart: *"Match your ring with the on-screen guide"*

This is the highest-ROI fix on the list and it costs a heading, a sentence and a mode default.

### P3 — ~~An unreviewed draft page is in the sitemap and indexable~~ — 🔴 WRONG, corrected 6 Sep

> **This finding does not hold for production, and it is not a P0.** Verified 6 Sep 2026 by
> fetching `https://ringsizetool.com/sitemap-0.xml`: the live sitemap carries **nine** URLs and
> `/actual-ring-size-chart-on-screen` is not among them. The page has never existed on `main` — it
> lives only on the unmerged branch `draft/actual-size-chart-on-screen` (`c384f35`), so it is
> neither built, nor deployed, nor submitted to anything. This audit's stated method was a read of
> `src/` + `dist/`, which must have been done with that branch's file in the working tree; the
> finding is an artefact of which branch was checked out, not a live defect.
>
> **Google is not being fed this page.** There is nothing to decide today. The real, un-urgent
> choice is: finish the draft and merge it, or delete the branch. Everything below is still an
> accurate description of the draft's *content* — only the indexing claim is wrong. The URL count
> of "ten" used elsewhere in this audit is **nine** in production.

`/actual-ring-size-chart-on-screen` has **zero internal inbound links** — not in `NAV`, not in
`FOOTER_LINKS`, not linked from any of the other nine pages. ~~It is in `sitemap-0.xml`.~~

This is not an oversight. `src/pages/actual-ring-size-chart-on-screen.astro:53` says:

> ⚠️ DRAFT — not yet reviewed by the owner, and not linked from the nav.

That is the worst of both states: Google is being *instructed to crawl* (sitemap) a page the site
has decided is *not ready to be linked*. It also deliberately emits no `FAQPage` schema because
`SCREEN_FAQS` are hand-written rather than pulled from PAA — a correct call in isolation, but it
means the page ships without the one schema type its competitors do have.

And the keyword it exists for is more contested than `RESEARCH.md` assumed 🔴 — see §7-9.

### P4 — Four of six content pages have earned zero impressions

`/ring-size-chart`, `/printable-ring-sizer`, `/how-to-measure-ring-size-at-home` and
`/average-ring-size` appear in **no** GSC query. At five days old the likeliest cause is that they
are not yet indexed, not that they rank badly. **This is an inspection task, not an optimisation
task,** and it is P0 because everything else is guesswork until it is answered.

### P5 — India is computed, and marketed nowhere

This is the only one of the four sites that outputs an Indian size. India is **10% of the traffic
leader's 17.2K/month** and neither it, nor measureringsize, nor ringsize.app returns an Indian
size at all. GSC already shows India (2) and Pakistan (1) in a 16-impression sample.

Today the Indian result is rendered in a small text row *below* the 2×2 grid, beside "FR/IT/ES",
next to a "Calibrate" link. It has no page, no heading, and no title tag anywhere on the site.

### P6 — The homepage title omits the words in the queries it is receiving

Current: `Ring Sizer — Find Your Ring Size Online | Ring Size Tool`

The three named GSC queries are *ring sizer online for free*, *ring sizer online*, *ring size
finder online*. The title puts "Online" last, omits "Free" entirely, and spends eleven characters
on "Find Your Ring Size", which is filler.

### P7 — `/printable-ring-sizer` is the one uncontested page and the least invested one

None of the three competitors has a printable ring sizer as an HTML page. ringssizechart offers a
PDF download; the other two offer nothing. This site has a real HTML printable with a 50 mm check
square — a genuinely better artefact — at **1,027 words and 3 FAQ questions**, the thinnest content
page on the site.

### P8 — The footer links every page to every other page

`FOOTER_LINKS` plus `NAV` means all ten URLs link to all ten URLs on every page. That is not a link
graph, it is a mesh, and it tells Google nothing about which pages matter. `/about`, `/contact`,
`/privacy` and `/terms` currently receive exactly as many site-wide internal links as
`/ring-size-chart`.

---

## 3. GSC insights

### What the data actually is

| Metric | Value |
|---|---|
| Window | 30 Aug – 4 Sep 2026 (6 days) |
| Total clicks | **0** |
| Total impressions | **16** |
| Average CTR | 0% |
| Average position | **32.6** |
| Named queries | 3 |
| Impressions attributable to named queries | 7 of 16 (44%) |

**Queries**

| Query | Clicks | Impressions | Intent | Has a matching URL? |
|---|---|---|---|---|
| ring sizer online for free | 0 | 3 | Tool | Yes — `/` |
| ring sizer online | 0 | 3 | Tool | Yes — `/` |
| ring size finder online | 0 | 1 | Tool | Yes — `/` |
| *(withheld — below GSC threshold)* | 0 | **9** | — | — |

**Countries**

| Country | Impressions | Share |
|---|---|---|
| United States | 5 | 31% |
| United Kingdom | 3 | 19% |
| India | 2 | 13% |
| Ireland | 2 | 13% |
| South Africa, Netherlands, Italy, Pakistan | 1 each | 25% |

### What can and cannot be concluded

**A. High impressions + low CTR opportunities** — Not assessable. Nothing here has enough
impressions for a CTR figure to mean anything. 0/16 at average position 32.6 is the expected
result, not a CTR problem. Position 32 is page 4.

**B. Impressions with position 8–30** — None. Average position is 32.6 and no query is broken out
by position at this volume.

**C. Page-2 queries convertible to page 1** — None yet.

**D. Rising impressions** — The trend line is real and it is up: 0 on 30 Aug rising to ~5 on 3 Sep,
falling to ~2 on 4 Sep. On a 5-day-old property this is Google's initial discovery crawl finding the
homepage, not a ranking trend. Do not read the 4 Sep dip as a decline.

**E. Declining clicks/impressions** — Not assessable. No history.

**F. Queries with impressions but no dedicated landing page** — **None.** All three named queries
are homepage-intent and the homepage targets them. This is a good sign about keyword-to-URL mapping
and it means *creating pages is not the answer to anything visible in this data.*

**G. Queries multiple URLs compete for** — Not observable at 16 impressions. Assessed structurally
instead in §5.

**H. Declining pages** — Not assessable.

**I. Pages receiving irrelevant queries** — None. All three queries are on-topic.

**J. Quick wins** — The only genuine GSC-derived quick win is the homepage title (P6). Everything
else in Phase 1 is derived from competitor and architecture evidence, not from GSC.

**K. Long-tail patterns** — One pattern, and it is worth noticing: **all three named queries end in
"online."** Not "ring sizer", not "ring size calculator" — *ring sizer **online***, *ring size
finder **online***. That is the exact keyword pair `measureringsize.com` holds #1 for on both
(1,500/mo each). Google is already classifying this site into the right SERP; it is queued behind
the incumbent.

**L. Country/device** — Devices are not in the supplied export. Countries: the English-speaking
core (US/UK/IE/ZA) is 63%, and **India + Pakistan is 19% of a 16-impression sample.** Too small to
act on alone, but it agrees with the leader's 10% India share, and it points at the one output
column no competitor has.

### The number that actually matters

Kill criteria (`MicroToolFactory/CLAUDE.md`, rule 5): **under 500 impressions/month by month 4 →
stop.** Month 4 from the 1 Sep indexing flip is **1 January 2027.**

Current run rate: 16 impressions / 6 days = **~80/month.** The site needs **6.25× growth in four
months** to clear its own kill line. That is achievable for a 5-day-old site, but it is not
automatic, and it is the correct frame for every prioritisation below.

### Tables the brief asked for that have no rows

Stating these explicitly rather than padding them:

- **High Impression / Low CTR Queries** — empty. Max impressions on any query is 3.
- **Page 2 Opportunities** — empty. Average position 32.6.
- **Declining URLs** — empty. No history.
- **Cannibalisation Cases (from GSC)** — empty. Structural analysis in §5 instead.

### Top growth opportunities (evidence-weighted, not GSC-only)

| # | Opportunity | Evidence | Target URL |
|---|---|---|---|
| 1 | `ring sizer online` / `online ring sizer` (1,500 each) | GSC impressions already landing here | `/` |
| 2 | `ring sizer` (26,000) — leader sits at #16, barely defended | RESEARCH.md Ahrefs, 27 Aug | `/` |
| 3 | `ring size calculator` (5,000) — held by a site with provably wrong maths | Verified live, §7 | `/` |
| 4 | `measure ring size` (4,300) — measureringsize only #9 | RESEARCH.md | `/how-to-measure-ring-size-at-home` |
| 5 | `ring size chart online` (2,100) | RESEARCH.md | `/ring-size-chart` |
| 6 | `printable ring sizer` — no HTML competitor at all | Live SERP check, §11 | `/printable-ring-sizer` |
| 7 | Indian sizing — 10% of leader's traffic, zero competitor coverage | RESEARCH.md + live checks | new, P1 |
| 8 | `actual ring size chart on screen` (>1,000) | RESEARCH.md — **contested, see §9** 🔴 | `/actual-ring-size-chart-on-screen` |

### Missing content opportunities

| Intent | Volume signal | Competitor coverage | Verdict |
|---|---|---|---|
| Indian ring sizes | 10% of leader traffic; IN+PK in GSC | **None of the three** | **CREATE (P1)** |
| Smart ring / Oura sizing | 178/mo on leader's page; ringsize.app has `/smart-rings` | 2 of 3 | Create later (P2) |
| International conversion hub | Chart queries | All 3 serve from chart/home | **Do not create** — serve from `/ring-size-chart` |
| Secret/gift sizing | PAA-level | All 3 answer in FAQ only | **Do not create** — FAQ + homepage section |
| Wide-band adjustment | PAA-level | ringsize.app: one sentence | **Do not create** — in-tool toggle |
| Per-unit URLs (mm/cm/in) | — | **Zero competitors do this** 🔴 | **Do not create** — see §16 |
| Per-country converter pages | — | None | **Do not create** — programmatic trap |

---

## 4. Keyword opportunities and intent clusters

Ten clusters. **Six of them already have exactly one correct URL** — which is why this section
recommends almost no new pages.

| # | Cluster | Representative queries | Primary URL | Supporting | Status |
|---|---|---|---|---|---|
| 1 | **Ring sizer (tool)** | ring sizer · online ring sizer · ring sizer online · ring sizer online for free · ring size finder online · virtual ring sizer | `/` | `/actual-ring-size-chart-on-screen` | Correct, under-optimised |
| 2 | **Ring size calculator** | ring size calculator · calculate ring size · ring size online | `/` | — | Correct, same page as 1 (same intent) |
| 3 | **Ring size chart** | ring size chart · ring size chart online · ring size chart mm/cm/inches | `/ring-size-chart` | `/` §chart | Correct, mild overlap |
| 4 | **Actual size on screen** | actual ring size chart on screen · on screen ring sizer · life size ring chart | `/actual-ring-size-chart-on-screen` | `/` | Correct URL, **orphaned** |
| 5 | **Printable** | printable ring sizer · ring sizer printable · printable ring size chart | `/printable-ring-sizer` | `/how-to-measure…` | Correct, thin |
| 6 | **How to measure** | how to measure ring size · measure ring size at home · ring size with string/paper | `/how-to-measure-ring-size-at-home` | `/printable-ring-sizer` | Correct |
| 7 | **Norms / averages** | average ring size · average ring size for women/men | `/average-ring-size` | — | Correct |
| 8 | **International conversion** | us to uk ring size · eu ring size to us · ring size conversion | `/ring-size-chart` (anchored sections) | `/` | **Serve here — do not split** |
| 9 | **Indian sizing** | indian ring size chart · ring size in india · india to us ring size | **none** | — | **CREATE (P1)** |
| 10 | **Smart rings** | oura ring size · smart ring size chart | **none** | — | Create later (P2) |

Clusters 1 and 2 are one intent. Google returns the same SERP for *ring sizer* and *ring size
calculator*, and all three competitors serve both from their homepage. Splitting them would be the
single most obvious cannibalisation this site could inflict on itself. **Keep them merged on `/`.**

Cluster 8 deserves a note because it is the classic trap in this niche: *us to uk ring size*,
*eu to us*, *jp to us* and so on are dozens of queries that all resolve to **one row of a table the
site already renders 106 times.** A page per pair would be thin programmatic content with no unique
value. Serve them with `id` anchors and a system-by-system explainer on `/ring-size-chart`.

---

## 5. Cannibalisation analysis

Assessed structurally, since GSC volume cannot show it. Four real overlaps. **None warrant a merge,
redirect, delete or noindex.**

| # | URL 1 | URL 2 | Overlapping keywords | Severity | Verdict |
|---|---|---|---|---|---|
| 1 | `/` §"Ring size conversion chart" (22 rows) | `/ring-size-chart` (106 rows) | ring size chart, conversion chart | **Medium** | **KEEP BOTH · REPOSITION** |
| 2 | `/` (calibrated screen tool) | `/actual-ring-size-chart-on-screen` (calibrated screen chart) | on screen ring sizer, actual size | **Medium** | **KEEP BOTH · REPOSITION** |
| 3 | `/actual-ring-size-chart-on-screen` | `/ring-size-chart` | ring size chart | Low–Medium | **KEEP BOTH** — titles already separate them |
| 4 | `/` §"Two ways to measure" / §"Three ways to give it a measurement" | `/how-to-measure-ring-size-at-home` | how to measure ring size | Low | **KEEP BOTH · TRIM `/`** |

**Case 1 — why reposition rather than merge.** The homepage H2 is literally *"Ring size conversion
chart"*, which is the chart page's exact target phrase, on the site's strongest page. The fix is not
to remove the table (a visitor who just got a size wants to see it in context) — it is to stop the
heading competing. Retitle the homepage H2 to something result-shaped (*"Your size in every
system"*), keep the 22 abridged rows, and make the link to `/ring-size-chart` a prominent one rather
than an inline mention. The chart page keeps the phrase to itself.

**Case 2 — why this is the subtler one.** Both pages are calibrated on-screen tools. The distinction
is real but is currently only in the developer's head: `/` is *one adjustable circle you tune*;
`/actual-…` is *many fixed circles you compare against at once*. Neither page says that. Both must
say it, in a sentence, near the top, and link to each other on that basis. Positioning them as
"instrument vs. reference" is the whole difference between two complementary pages and two pages
fighting.

**Case 4 — the trim.** The homepage carries both a "Two ways to measure" block and a "Three ways to
give it a measurement" block, which are near-neighbours of each other *and* of the how-to page.
Note the site did the important thing right already: `HowTo` schema lives only on
`/how-to-measure-ring-size-at-home`, not on `/`. Keep it that way; shorten the homepage prose to a
summary plus a link.

**What is not here, and should be said plainly:** no duplicate-intent pages, no thin programmatic
pages, no unnecessary location pages, no index bloat, no blog competing with a tool, no
calculator competing with a chart in a way that needs surgery. The brief asked me to hunt for these.
On this site they do not exist. Ten URLs, six of them substantive content, four of them required
utility pages.

---

## 6. Existing page decisions

| URL | Words | FAQ (schema) | Schema types | Decision | Why |
|---|---|---|---|---|---|
| `/` | 4,729 | 21 | WebApplication, FAQPage, BreadcrumbList, Offer | **IMPROVE (P0)** | Strong asset. Wrong first question in the tool; title omits the query words; chart H2 competes with the chart page. |
| `/ring-size-chart` | 2,411 | 10 | FAQPage, BreadcrumbList | **IMPROVE (P1)** | Strong asset — 106 rows, 4 tables, computed. Needs `online` in the title and per-system anchors to absorb cluster 8. |
| `/how-to-measure-ring-size-at-home` | 1,965 | 7 | HowTo, FAQPage, BreadcrumbList | **KEEP** | Correctly scoped, correct schema, uniquely holds `HowTo`. Only competitor equivalent is thinner. |
| `/printable-ring-sizer` | 1,027 | 3 | FAQPage, BreadcrumbList | **IMPROVE (P1)** | **High SEO opportunity, underinvested.** No competitor has an HTML equivalent. Thinnest content page on the site. |
| `/actual-ring-size-chart-on-screen` | 1,313 | 0 | BreadcrumbList only | **IMPROVE + LINK, or NOINDEX (P0 decision)** | Orphaned draft, in sitemap. Must be finished and linked, or removed from the index until it is. Not both. |
| `/average-ring-size` | 1,207 | 8 | FAQPage, BreadcrumbList | **KEEP** | Distinct informational intent, correct depth for it. Do not expand. |
| `/about` | 751 | — | none | **KEEP** | E-E-A-T page. Real methodology disclosure — better than the leader's gmail address. Add `Organization` schema. |
| `/contact` | ~150 | — | none | **KEEP** | Required utility. Thin by design; that is correct. |
| `/privacy`, `/terms` | — | — | none | **KEEP** | Required utility. |
| `/404`, `/500` | — | — | none | **KEEP** | Correctly excluded from sitemap. |

**Nothing is marked MERGE, REDIRECT or DELETE.** On a ten-URL site five days into indexing,
consolidation recommendations would be theatre.

### Content quality classification

- **STRONG ASSET:** `/`, `/ring-size-chart`, `/how-to-measure-ring-size-at-home`
- **HIGH SEO OPPORTUNITY:** `/printable-ring-sizer` (uncontested), `/actual-ring-size-chart-on-screen` (contested but owned URL)
- **UNDEROPTIMISED:** `/`, `/ring-size-chart` (titles), `/printable-ring-sizer` (depth)
- **THIN:** none, unless `/printable-ring-sizer` is judged against its own opportunity rather than against the SERP
- **DUPLICATE INTENT:** none
- **OUTDATED:** none
- **LOW BUSINESS VALUE:** `/average-ring-size` — keep it, but it is the page least worth another hour

---

## 7. Competitor 1 — ringssizechart.com (the traffic leader)

**Why selected:** 17.2K organic/month, $4.7K/month traffic value, **#1 for `ring size calculator`
(5,000/mo)**, #1 for `ring size chart online` (2,100), #1 for `ring size finder`, #1 for
`ring size online`. Chosen on SERP overlap, not on name similarity.

| | |
|---|---|
| Title | `Ring Size Calculator \| Online Ring Sizer For You` |
| H1 | Ring Size Calculator & Ring Sizer Tool |
| Platform | WordPress |
| Indexable content URLs | ~8 |
| Traffic concentration | **Homepage = 95%** (8,800 of 9,200 US visits) |
| Schema | `Person/Organization`, `FAQPage` — **that is all** |
| Countries | US 53% · **India 10%** · Indonesia 6% · UK 6% · Canada 3% |

### URL architecture (complete)

`/` · `/about-us/` · `/blogs/` · `/category/blogs/` · `/contact-us/` · `/disclaimer/` ·
`/gucci-ring-size-chart/` · `/how-to-measure-ring-size/` · `/indonesia/` · `/oura-ring-size-chart/` ·
`/privacy-policy/` · plus `/wp-content/uploads/2025/12/printable-rings-size-chart.pdf`

There is **no `/ring-size-chart` page.** The homepage *is* the chart page, the calculator page and
the guide hub. Trailing slashes throughout, with a known trailing-slash duplicate on
`/oura-ring-size-chart` (both versions indexed, per RESEARCH.md Ahrefs data).

### Tool architecture

**Three sliders stacked on one page** — "Ring Sizer in MM", "Ring Sizer in CM", "Ring Sizer in
Inches". All three take *diameter only*. Ranges: 11–23 mm / 1.1–2.3 cm / 0.45–0.90 in.
Each has its own "Show Size Chart" button. Outputs US/CA, UK, EU, JP.

🔴 **Correction to STATUS.md and RESEARCH.md:** these are **not three separate URLs.** They are three
widgets on the homepage. The open question in `STATUS.md` §"Next, in order" item 2 — *"the competitor
runs Ring Sizer in MM / in CM / in Inches as three separate pages"* — is factually wrong, and the
decision that hangs on it should be resolved accordingly (§16).

### Measurement methodology

**No screen calibration of any kind.** The slider circle is decorative with respect to physical
scale. Their actual measurement instructions are entirely offline:

1. **String/paper strip** → measure flat against a physical ruler → look up the circumference column
2. **Existing ring** → measure inside diameter with a physical ruler → look up the diameter column
3. **Printable PDF** → print at 100% → wrap or compare circles

```
INPUT: a number the user obtained with their own ruler
  ↓ MEASUREMENT LOGIC: none — the tool is a lookup
  ↓ CALCULATION: table lookup, not computation
  ↓ ROUNDING: to whole/half US sizes; "round up if between"
  ↓ OUTPUT: US/CA, UK, EU, JP
```

### Verified defects (checked live, 6 Sep 2026)

These matter because they are the moat:

1. **EU 51.8.** The CM and Inches sliders report `EU: 51.8` for the same ring the MM slider reports
   as `EU: 52`. ISO 8653 sizes are whole millimetres of circumference. **51.8 is not a size**, and
   one tool returning two different EU answers for one ring is disqualifying.
2. **The circle scales by the number, not the measurement.** 16.50 mm, 1.65 cm and 0.650 in are the
   same ring; their CM circle renders roughly ten times smaller — the ratio of the *numerals*.
3. **Quarter-size figures are exactly 2× wrong.** They publish *"A ¼ US size change equals
   approximately 0.4 mm in diameter and 1.26 mm in circumference"*. The true quarter-size figures
   are **0.2032 mm and 0.638 mm**; 0.4/1.26 are the *half*-size figures.
4. **Men's average stated as US 10 (19.8 mm).** The widely-cited figure — and this site's own — is
   US 9.
5. **The chart skips sizes.** The lead table runs 3, 4, 5, 7, 9, 10 — no 6, no 8.
6. **The comprehensive international chart is an image, not HTML** (RESEARCH.md, confirmed by the
   "Download Printable Ring Size Chart" PDF being the only full-range artefact).
7. **FAQ schema contains escaped markup** — question names render as
   `&lt;strong&gt;1. What is a ring size chart?&lt;/strong&gt;`.

### Content and trust strategy

18 homepage FAQs. Three embedded YouTube jeweller videos (*"Watch Professional Jewelers Explain Ring
Sizing"*) — a genuine E-E-A-T proxy this site has no equivalent of. "Top 3 Advice From Jewelers"
block. Measurement tips covering room temperature, repeat on multiple days, dental floss, ring width
≥6 mm → up to ½ size larger, knuckle vs. base.

**Weak point:** the contact address is `emmatmartinez99@gmail.com`. There is no named author, no
credential, no methodology disclosure.

### What they intentionally do NOT do

| Absence | Classification |
|---|---|
| Screen calibration | **Missed opportunity** — they are the only leader without it |
| A separate `/ring-size-chart` URL | **SEO consolidation** — deliberate, and it works |
| Per-unit URLs | **SEO consolidation** — three widgets, one URL |
| Indian sizes (10% of their traffic) | **Missed opportunity** |
| Per-country pages beyond Indonesia | **Intentional simplicity** |

### Opportunity for ringsizetool.com

Their maths is provably wrong in five places and they rank #1. That means **the market does not
reward correctness directly** — but it does mean a correct tool with equal or better UX has no
functional reason to lose. Beat them on the *thing they lack* (calibration + India + quarter sizes),
not on the thing they lack that nobody checks (accuracy), and match them on the thing they have that
this site does not (jeweller-video / expert-quote trust signals).

---

## 8. Competitor 2 — measureringsize.com (the direct blocker)

**Why selected:** this is the site standing between ringsizetool.com and the queries it is *already
getting impressions for*. **#1 for `ring sizer online` (1,500) and `online ring sizer` (1,500)**,
#2 for `ring sizer tool online` (700), #9 for `measure ring size` (4,300), and **#16 for `ring
sizer` (26,000)**. 6.8K organic/month, $2K/month value.

| | |
|---|---|
| Title | `Free Online Ring Sizer – Measure Ring Size with Your Device` |
| H1 | Find Your Perfect Ring Size |
| Meta | "…Accurate online ring sizer **with calibration**, supports US, UK, EU, and FR/DE sizes. No app needed." |
| Schema | `WebApplication`, `FAQPage` |
| Countries | US 60% · Brazil 6% · Ukraine 5% · UK 3% · Saudi 3% |

### URL architecture (complete)

English: `/` · `/about` · `/how-to-measure-ring-size` · `/ring-size-chart` · `/privacy` · `/terms`
Localised: `/ar` `/de` `/es` `/fr` `/hi` `/ja` `/kk` `/pt` `/ru` `/zh`

**Six English URLs.** The ten language folders are worth roughly **15 visits/month combined**
(RESEARCH.md) against 4,200 on the English homepage — confirming the English-only decision on this
site was right.

### Tool architecture and exact user journey

```
Landing
  ↓  "What You'll Need"  →  Card or Ruler [REQUIRED] · A Ring That Fits [OPTIONAL]
  ↓  [ START MEASURING ]
  ↓  Step 1: Calibrate Your Screen   — tabs: [Card] [Ruler]
  ↓     card rendered LANDSCAPE, drag slider until edges align
  ↓     inline rationale: "Every screen has a different pixel density…"
  ↓  [ NEXT: MEASURE RING ]
  ↓  Step 2: place ring on the adjustable circle, drag to inner edge
  ↓  Step 3: read US / EU / UK
```

**Five taps to a result.** The "What You'll Need" gate before the tool is doing real work: it tells
the visitor to go and fetch a card *before* they hit a control they cannot use without one.

### Calculation and conversion

Chart runs **ISO 44 → 72** (US 3 → 14). Columns: ISO/DE · Inner Diameter mm · US/CA · UK/AU ·
IT/ES/CH · **RU**.

```
INPUT: calibrated pixel diameter of the on-screen circle
  ↓ pixels ÷ (px per mm from ISO 7810 card) = diameter mm
  ↓ table lookup against ISO circumference rows
  ↓ ROUNDING: to nearest HALF US size only
  ↓ OUTPUT: US/CA, UK/AU, ISO/DE, IT/ES/CH, RU
```

**Half sizes only — no quarter sizes**, and the rounding is coarse enough to produce visible
duplicates in their own published chart: ISO 45 and 46 both return US 3½; 50 and 51 both 5½;
55 and 56 both 7½; 59 and 60 both US 9; 64 and 65 both 11; 68 and 69 both 12½. Six duplicate pairs
in 29 rows.

**No Japan. No India. No circumference column. No France as its own label.**

### Trust and accuracy strategy

The strongest single trust line in the market: **"When properly calibrated with a bank card, our
tool provides measurements accurate to within 0.5 mm."** It is specific, quantified, memorable and
completely unverifiable — and it is the first FAQ on the page.

Also: ISO/IEC 7810 cited by name and dimension; "place your card flat against the screen, not
tilted"; measure at room temperature; measure in the evening; go 0.5 up if between sizes; a
**"Found a mistake? Notify us about it"** button.

Eight FAQs, including *"How do I secretly measure someone's ring size for a surprise gift?"* —
answered in the FAQ with borrow/trace/soap-impression. **They did not build a page for it.**

### What they intentionally do NOT do

| Absence | Classification |
|---|---|
| Quarter sizes | **Intentional simplicity** — half sizes are what jewellers stock |
| Japan / India sizes | **Missed opportunity** (India), reasonable scoping (Japan) |
| A printable page | **Missed opportunity** |
| Per-unit or per-country pages | **SEO consolidation** |
| A dedicated secret-sizing page | **SEO consolidation** — FAQ absorbs it |
| More than 6 English URLs | **Intentional simplicity** — and it ranks #1 with them |

### Opportunity for ringsizetool.com

They are beatable on *outputs* (5 systems vs 7; half sizes vs quarter), on *precision* (their own
chart contradicts itself six times), and on *coverage* (no printable, no Japan, no India). They are
**not** beatable on the calibration story, which they tell as well as this site does and land higher
in the SERP with. Stop competing there; compete on what the tool returns.

---

## 9. Competitor 3 — ringsize.app (the functional twin, and the real threat)

**Why selected:** this is the closest functional analogue to ringsizetool.com on the internet —
screen-calibrated, ring-on-screen, US/UK/EU/JP, quarter sizes — and **it is already ranking for
`actual ring size chart on screen`**, the >1,000/mo keyword `RESEARCH.md` identified as an easy,
uncontested opening. It was not in the pre-launch competitor set.

🔴 **This is the most important correction in this audit.** `RESEARCH.md` §"actual ring size chart on
screen — Easy, >1,000, and our calibration already solves it" assumed no incumbent. There is one,
and its Google-rendered title is literally
`Ring Size App — Free Virtual Ring Sizer · Actual Ring Size Chart on Screen`.

| | |
|---|---|
| Title | `Ring Size App: Free Virtual Ring Sizer \| RingSize.app` |
| H1 | Measure your ring size. Right on your screen. |
| Meta | "Measure ring size online with a free, screen-calibrated virtual ring sizer…" |
| Schema | **`WebSite`, `WebApplication`, `FAQPage`, `HowTo`, `BreadcrumbList`, `Organization`, `Service` — 7 types, the richest in the market** |

### URL architecture (complete)

`/` · `/ring-size-chart` · `/ring-sizes` · `/resources` · `/smart-rings` ·
`/how-to-measure-ring-size` · `/privacy` · `/terms`

Note `/ring-sizes` (a conversions hub *distinct* from the chart), `/resources`, and `/smart-rings`
— a smart-ring **hub** rather than ringssizechart's brand-page approach. This is the architecture
ringsizetool.com should be aiming at.

### Two measurement methods, and the second one is the standout

**Method A — ring on screen.** Place ring on glass, drag slider until the gold circle meets the
ring's inner edge, **fine-tune with arrow keys.**

**Method B — paper strip on an on-screen digital ruler.** Wrap paper round the finger, mark the
overlap, **lay the strip on a calibrated ruler drawn on the screen and drag a marker to the pen
mark.** The circumference is read off the screen.

Method B is the single feature gap that matters. This site tells the visitor to *"measure it flat"*
against a physical ruler they may not own — and then type the number in. ringsize.app removes the
ruler from the requirements list entirely. **Same calibration data, one fewer object needed.**

### Calibration — eight reference objects

| Object | mm |
|---|---|
| Credit/debit card (ID-1) | 85.60 × 53.98 |
| 1 Yuan | 25.00 |
| $1 AUD / $1 SGD | 24.66–25.00 |
| US Quarter | 24.26 |
| Canadian 25¢ | 23.88 |
| 1 Euro | 23.25 |
| **₹5 Rupee** | **23.00** |

Note the ₹5 and the yuan. They cannot output an Indian ring size, but they made sure an Indian
visitor can calibrate. This site does the reverse — it computes the Indian size and offers only a
bank card.

### Outputs and logic

```
INPUT: ring inner edge on a calibrated circle, OR strip length on a calibrated on-screen ruler
  ↓ px ÷ px-per-mm  →  diameter mm or circumference mm
  ↓ conversion to four systems
  ↓ ROUNDING: US in QUARTER increments; UK letters; EU whole; JP whole
  ↓ OUTPUT: US 3–13 · UK F–Z · EU 44–72 · JP 4–27 · + diameter and circumference in mm
  ↓ GUIDANCE: wide band / eternity setting → "consider adding ½ size"
```

**No India. No France/Italy/Spain. No Brazil.** Four systems to this site's seven.

### Trust strategy — the best in the market

- *"Calibration makes the on-screen outline reflect real-world millimetres on your device"*
- Browser zoom must be 100%
- Remove phone case/sleeve; place object directly on glass
- Good lighting; look straight on, not at an angle
- **Recalibrate when switching devices**
- Measure late afternoon/evening at room temperature
- **"For a valuable or non-resizable purchase, confirm with a jeweller"**
- An explicit section: *"Why calibrating the screen matters"* and *"Why an on-screen ring sizer needs calibration"*

Eleven FAQs, several written as direct query capture: *"Can I measure ring size on phone for free?"*,
*"Does it work in the UK?"*, *"Can I use this as a ring size chart on my phone?"*, *"How does this
differ from a virtual ring sizer image?"*

**They have the strongest trust-and-accuracy strategy of the three** — not because their maths is
better (this site's is), but because they narrate every failure mode of the method and then tell you
when *not* to trust them. Naming the limits is what makes the claim credible.

### What they intentionally do NOT do

| Absence | Classification |
|---|---|
| A printable ring sizer | **Missed opportunity** — and the clearest gap this site can own |
| Indian sizes (despite ₹5 calibration) | **Missed opportunity** |
| A dedicated `actual-size-on-screen` URL | **SEO consolidation** — they capture it from the homepage title |
| Per-unit / per-country pages | **SEO consolidation** |
| FR/IT/ES, Brazil | **Intentional simplicity** |

### Opportunity for ringsizetool.com

Three specific ones: **the printable** (they have none), **India + FR/IT/ES + Brazil** (they have
none), and **a dedicated URL for actual-size-on-screen** — they are ranking for it from a homepage
title, which is beatable by a page that is actually about it. That last one is only true if
`/actual-ring-size-chart-on-screen` gets finished and linked; today it is orphaned, and losing to a
title tag.

---

## 10. What competitors are doing better

| # | Thing | Who | Why it beats this site |
|---|---|---|---|
| 1 | **Lead with the object, not the unit** | All three | *"Place your ring on the circle"* is the first instruction. Here the first question is *Diameter or Circumference?* |
| 2 | **Tell the visitor what to fetch, before the tool** | measureringsize | "What You'll Need: Card or Ruler [Required]" gates the flow. Here the prerequisite is small grey text under the hero. |
| 3 | **An on-screen digital ruler** | ringsize.app | Removes the physical ruler from the requirements entirely. |
| 4 | **Calibrate with what the visitor actually has** | ringsize.app | 8 objects including ₹5 and 1 yuan. Here: a bank card, or nothing. |
| 5 | **A quantified accuracy claim** | measureringsize | "accurate to within 0.5 mm." Here the equivalent line is "Not calibrated yet — sizes assume a standard screen", which is honest and unpersuasive. |
| 6 | **Name the failure modes** | ringsize.app | Zoom, phone case, viewing angle, per-device recalibration, "confirm with a jeweller". |
| 7 | **Richer schema** | ringsize.app | 7 types incl. `Organization` and `Service`. Here: 5, and `/actual-…` has 1. |
| 8 | **Human expertise signals** | ringssizechart | Three embedded jeweller videos, "Top 3 Advice From Jewelers". Here: none. |
| 9 | **Answer the SERP question in the title** | ringsize.app | Their homepage title captures `actual ring size chart on screen`. This site's dedicated page for it is unlinked. |
| 10 | **A smart-ring hub** | ringsize.app, ringssizechart | `/smart-rings`, `/oura-ring-size-chart`. Here: nothing. |

## 11. What competitors are intentionally NOT doing

Read this as a list of traps they avoided, not gaps to fill:

| They avoid | Classification | Should this site copy the avoidance? |
|---|---|---|
| Per-unit URLs (mm/cm/inches) | SEO consolidation | **Yes** — nobody does it; it is not a real page type |
| Per-country converter pages | SEO consolidation | **Yes** — one table row is not a page |
| A separate "diameter calculator" and "circumference calculator" | Intentional simplicity | **Yes** — one mode toggle, one URL |
| A dedicated "secret ring size" page | SEO consolidation | **Yes** — all three answer it in FAQ |
| A "wide band calculator" | Intentional simplicity | **Yes** — the answer is one sentence, not a tool |
| Photo/image-based measurement | Technical limitation + honesty | **Yes** — and it would break "nothing leaves your browser" |
| More than 8 indexable URLs | Intentional simplicity | **Yes** — the leader ranks #1 on 8 |
| Multilingual (measureringsize does; it earns ~15 visits/mo) | Missed opportunity for *them* — proven worthless | **Yes, avoid** |
| **A printable ring sizer page** | **Missed opportunity** | **No — take it** |
| **Indian ring sizes** | **Missed opportunity** | **No — take it** |
| **Quarter sizes** (measureringsize) | Intentional simplicity | Partly — keep quarters, but present halves first |

## 12. ringsizetool.com's competitive advantage opportunities

Ordered by defensibility.

1. **Seven size systems vs four or five.** US (quarter), UK (half), EU/ISO, Japan, **India**,
   France/Italy/Spain, Brazil. No competitor exceeds five, and none has India.
2. **Computed, not copied, with 187 assertions.** `verify-sizes.ts` proves every system answers at
   all 4,889 reachable slider positions. The leader publishes EU 51.8. This is unmarketable but it
   is the reason the site can make claims the others cannot.
3. **The unit-independence proof.** All six modes render an identical 62.406 px circle for the same
   ring, spread 0. The leader's CM circle is ~10× off. *"A unit is not a size"* on the homepage is a
   test a reader can run on any sizer — including this one. **This is the best content asset on the
   site and it is buried in a `#disagree` anchor.**
4. **An HTML printable with a 50 mm check square.** Nobody else has one. ringssizechart offers a PDF;
   the other two offer nothing.
5. **Honest uncertainty.** `UK_NOTE` and `INDIA_NOTE` state where the answer can differ and why.
   ringsize.app narrates method limits; nobody narrates *data* limits.
6. **Zero JavaScript outside the tool, static, no upload.** A genuine speed and privacy position,
   currently claimed only in a hero badge.

## 13. Recommended site architecture

No new top-level sections. One new page in the next 90 days, one optional.

```
/                                          ← the instrument (clusters 1, 2)
│
├── /actual-ring-size-chart-on-screen      ← the reference-at-real-scale (cluster 4)
├── /printable-ring-sizer                  ← the offline artefact (cluster 5)
├── /ring-size-chart                       ← the reference table (clusters 3, 8)
│     └── #us #uk #eu #jp #india #fr #br   ← anchors absorb the conversion long tail
│     └── /indian-ring-size-chart          ← P1, the one new page
├── /how-to-measure-ring-size-at-home      ← the method (cluster 6)
├── /average-ring-size                     ← the context (cluster 7)
└── /about · /contact · /privacy · /terms  ← utility, footer only
        └── (/oura-ring-size — P2, only if P1 works)
```

Three tiers, and the rule that keeps it clean: **tier 1 is the tool, tier 2 is what you do when the
tool is not the right shape (print it, compare many at once, look it up), tier 3 is why.** Anything
that does not fit one of those three sentences is not a page.

## 14. Recommended keyword-to-URL map

| Primary keyword | Intent | Current URL | Competing URL | Competitor holding it | Action |
|---|---|---|---|---|---|
| ring sizer (26,000) | Tool | `/` | — | measureringsize #16 | **IMPROVE** — title, in-tool framing |
| online ring sizer / ring sizer online (1,500 ea) | Tool | `/` | — | measureringsize **#1** | **IMPROVE** — add "Free"+"Online" to title |
| ring sizer online for free | Tool | `/` | — | measureringsize | **IMPROVE** — same |
| ring size finder online | Tool | `/` | — | ringssizechart #1 (`ring size finder`) | **IMPROVE** — same |
| ring size calculator (5,000) | Tool | `/` | — | ringssizechart **#1** | **KEEP** — do not split from cluster 1 |
| virtual ring sizer | Tool | `/` | — | ringsize.app | **IMPROVE** — use the phrase in an H2 |
| ring size chart | Reference | `/ring-size-chart` | `/` §chart H2 | ringssizechart (homepage) | **IMPROVE + REPOSITION `/` H2** |
| ring size chart online (2,100) | Reference | `/ring-size-chart` | — | ringssizechart **#1** | **IMPROVE** — add "Online" to title |
| ring size chart mm / cm / inches | Reference | `/ring-size-chart` | — | ringssizechart | **KEEP** — already in title |
| actual ring size chart on screen (>1,000) | Hybrid | `/actual-ring-size-chart-on-screen` | `/` | **ringsize.app (homepage title)** | **IMPROVE + LINK** |
| printable ring sizer | Artefact | `/printable-ring-sizer` | — | **nobody (HTML)** | **IMPROVE** — deepen |
| measure ring size (4,300) | Instructional | `/how-to-measure-ring-size-at-home` | `/` §methods | measureringsize #9 | **KEEP + trim `/`** |
| how to measure ring size at home | Instructional | `/how-to-measure-ring-size-at-home` | — | ringssizechart | **KEEP** |
| average ring size | Informational | `/average-ring-size` | — | ringssizechart (homepage fact) | **KEEP** |
| us to uk / eu to us ring size | Conversion | `/ring-size-chart#uk` etc. | — | all, from tables | **KEEP** — anchors, not pages |
| indian ring size chart | Conversion | **none** | — | **nobody** | **CREATE NEW PAGE (P1)** |
| oura / smart ring size | Product | **none** | — | ringssizechart, ringsize.app | **CREATE LATER (P2)** |
| how to measure ring size without a ring sizer | Instructional | `/` (lede) | — | — | **KEEP as lede** — confirmed <100/mo, do not build |
| secret / surprise ring size | Gift | `/` FAQ | — | all three, FAQ only | **KEEP as FAQ** — do not build |
| wide band ring size | Fit | `/how-to-measure…` | — | ringsize.app, one line | **KEEP as section** — do not build |

## 15. New tools worth building

Scored 1–10. Most of this table says no, on purpose.

| Tool | Search demand | Competitor coverage | SEO opp | User value | Competitor gap | Cannib. risk | Effort | Decision |
|---|---|---|---|---|---|---|---|---|
| **"Place your ring here" as the tool's default entry** | Inherits 26,000 | All 3 have it | **8** | **9** | 7 | Low | **Low** | **BUILD NOW — into `/`** |
| **On-screen digital ruler for the paper strip** | Inherits | ringsize.app only | 4 | **9** | **8** | Low | Medium | **BUILD NOW — into `/`** |
| **Multi-object calibration (coins incl. ₹5)** | Inherits; IN+PK 19% of GSC | ringsize.app only | 3 | 7 | 6 | Low | **Low** | **BUILD NOW — into `/`** |
| **Wide-band toggle (+¼ / +½)** | PAA | ringsize.app, one line | 3 | 7 | 6 | Low | **Low** | **MERGE INTO EXISTING TOOL** |
| **Indian ring size page + converter section** | 10% of leader traffic | **None** | **7** | 8 | **9** | Low–Med | Medium | **BUILD LATER (P1)** |
| Oura / smart ring size | 178/mo on leader's page | 2 of 3 | 6 | 6 | 5 | Low | Medium | **BUILD LATER (P2)** |
| Ring diameter → size calculator (own URL) | Sub-query of cluster 1 | None have own URL | 5 | 4 | 2 | **HIGH** | Low | **DO NOT BUILD** — `?measure=dia` already |
| Circumference → size calculator (own URL) | Sub-query of cluster 1 | None | 5 | 4 | 2 | **HIGH** | Low | **DO NOT BUILD** — `?measure=circ` already |
| International converter (own URL) | Cluster 8 | All serve from chart | 5 | 5 | 2 | **HIGH** | Medium | **DO NOT BUILD** — anchors on `/ring-size-chart` |
| Per-unit URLs (mm / cm / inches) | Chart-flavoured | **Zero competitors** 🔴 | 3 | 2 | 1 | **HIGH** | Low | **DO NOT BUILD** — see §16 |
| Per-country converter pages | Long tail | None | 2 | 2 | 1 | **HIGH** | Medium | **DO NOT BUILD** |
| Secret ring size estimator | PAA | All 3, FAQ only | 4 | 3 | 2 | Medium | Medium | **DO NOT BUILD** — see §16 |
| Photo / image-based measurement | Novelty | None | 3 | 2 | 4 | Low | **High** | **DO NOT BUILD** — see §16 |
| Printable ring sizer *generator* | — | None | 2 | 3 | 3 | **HIGH** | High | **DO NOT BUILD** — the static printable is the product |

## 16. Content that should NOT be created — and why

**Per-unit URLs (`/ring-sizer-in-mm`, `-cm`, `-inches`).** This has been an open decision in
`STATUS.md` since before launch, on the stated premise that the competitor runs three separate
pages. 🔴 **The premise is wrong** — verified live on 6 Sep 2026, ringssizechart.com runs all three
sliders as widgets on its homepage, at one URL. **No competitor in this market has per-unit URLs.**
Three pages differing only by a multiplier is exactly the thin-variation content the factory rules
forbid, and the unit-flavoured queries (`ring size chart in mm`) are chart intent, already served by
`/ring-size-chart`'s columns and title. **Resolve the open question as: one URL, `?measure=&unit=`,
no new routes.**

**Per-country converter pages.** `us to uk ring size`, `eu ring size to us`, and their forty
siblings all resolve to one row of a table the site renders 106 times. Anchors on
`/ring-size-chart`, not pages.

**Separate diameter and circumference calculators.** Already two states of one toggle, already
addressable via `?measure=`. Splitting them would put two URLs into cluster 1 against a homepage
that needs every link it has.

**A secret ring size estimator.** All three competitors answer this in FAQ, and their answer is the
honest one: borrow the ring, trace it, or press it into soap. A tool that *estimates* a stranger's
ring size from height, build or shoe size would be inventing precision — which is the one thing this
site has built its entire codebase around not doing. Keep it as an FAQ and a homepage paragraph.

**A wide-band calculator.** The real answer is "wider than ~6 mm, go up ¼ to ½ a size, and it depends
on the knuckle." That is a sentence and an in-tool toggle, not a calculator.

**Photo-based measurement.** No competitor does it, accuracy from an uncontrolled photo is poor, and
it requires an upload — which contradicts the "100% Private (No Upload)" badge in the hero.

**Multilingual.** measureringsize.com maintains ten language folders for ~15 visits/month against
4,200 English. Proven worthless in this niche.

**`/how-to-measure-ring-size-without-a-ring-sizer`.** Already decided against 28 Aug on volume
(<100 across every variant). Confirmed: it stays as the homepage lede sentence.

**Brand pages beyond Oura.** ringssizechart's Gucci page exists; their Oura page earns 178/mo and
Gucci is not in their top-5 pages at all. One smart-ring page, at P2, or none.

## 17. Internal linking blueprint

**The problem to fix first:** every page currently links to all ten URLs via nav + footer, so
`/privacy` receives the same site-wide internal link count as `/ring-size-chart`, and
`/actual-ring-size-chart-on-screen` receives zero.

### Navigation (change)

```
NAV      = /  ·  /ring-size-chart  ·  /actual-ring-size-chart-on-screen  ·  /how-to-measure-ring-size-at-home  ·  /printable-ring-sizer
FOOTER   = /average-ring-size  ·  /about  ·  /contact  ·  /privacy  ·  /terms      (unchanged)
```

Adding the actual-size page to `NAV` is the fix for P3, and it belongs there on merit: `NAV` is
tool-first, and it is a tool. Do this **only after** the draft is reviewed (see §19 day 1).

### Per-URL link plan

| URL | Parent | Must link out to | Anchor-text themes |
|---|---|---|---|
| `/` | — | `/ring-size-chart`, `/actual-ring-size-chart-on-screen` (new), `/how-to-measure…`, `/printable-ring-sizer`, `/average-ring-size` | "ring size chart", "see every size at actual size", "how to measure ring size at home", "printable ring sizer" |
| `/actual-ring-size-chart-on-screen` | `/` | `/` , `/ring-size-chart`, `/printable-ring-sizer` | "online ring sizer", "full conversion chart", "print it instead" |
| `/ring-size-chart` | `/` | `/`, `/actual-ring-size-chart-on-screen` (new), `/indian-ring-size-chart` (when built) | "measure it with the ring sizer", "compare a real ring at actual size", "Indian ring sizes" |
| `/printable-ring-sizer` | `/` | `/`, `/how-to-measure…` | "measure on screen instead", "how to measure at home" |
| `/how-to-measure-ring-size-at-home` | `/` | `/`, `/printable-ring-sizer`, `/ring-size-chart` | "ring sizer", "printable ring sizer", "look it up on the chart" |
| `/average-ring-size` | `/` | `/`, `/ring-size-chart` | "measure yours", "ring size chart" |
| `/indian-ring-size-chart` (P1) | `/ring-size-chart` | `/ring-size-chart`, `/` | "full ring size chart", "measure your ring size" |

### Rules

- **Two new links only** for P3: `/` → `/actual-…` (from the tool's action row, beside "Show Size
  Chart") and `/ring-size-chart` → `/actual-…` (above the first table).
- Contextual links inside prose, not link blocks at the foot of pages.
- Never the same anchor text twice on one page for one target.
- Utility pages stay in the footer and nowhere else.

## 18. CTR optimisation opportunities

⚠️ **Evidence basis:** these are derived from query-to-title matching and competitor SERP copy, not
from GSC CTR — 16 impressions and 0 clicks cannot produce a CTR finding. Treat as informed
hypotheses to be re-measured at ~500 impressions/month.

| URL | Current problem | Recommended title | Recommended meta description | Target cluster |
|---|---|---|---|---|
| `/` | "Online" is last; **"Free" is absent** and it is in the top impression query; "Find Your Ring Size" is filler | `Online Ring Sizer — Free Ring Size Finder \| Ring Size Tool` (58) | `Free online ring sizer. Calibrate your screen with a bank card, lay a ring on the circle, and read your size in US, UK, EU, Japan and India. No app, no printer.` (157) | 1, 2 |
| `/ring-size-chart` | Misses `ring size chart online` (2,100), which the leader holds #1 | `Ring Size Chart Online — MM, CM & Inches \| Ring Size Tool` (56) | `Ring size chart for US, UK, EU/ISO, Japan, India, France and Brazil in quarter sizes, with diameter and circumference in mm, cm and inches. Computed, not copied.` (159) | 3, 8 |
| `/actual-ring-size-chart-on-screen` | Title is already right; the page is orphaned and has no FAQ schema | *keep* `Actual Size Ring Size Chart on Screen \| Ring Size Tool` | `Ring sizes drawn at their true diameter on your screen. Match a bank card once to calibrate, then lay a ring you own straight onto the circles. No printing.` (155) | 4 |
| `/printable-ring-sizer` | Good title; description does not say "free PDF-free" clearly enough vs. competitors' PDFs | *keep* `Free Printable Ring Sizer and Size Chart \| Ring Size Tool` | `Print a paper ring sizer that measures correctly — no PDF download. A 50 mm check square proves your printer did not shrink the page. US, UK, EU and Japan.` (156) | 5 |
| `/how-to-measure-ring-size-at-home` | Good | *keep* | *keep* | 6 |
| `/average-ring-size` | Good | *keep* | *keep* | 7 |

**FAQ opportunities.** Three of the four sites use FAQs as direct query capture. ringsize.app's
*"Can I measure ring size on phone for free?"* is a question written to match a search, not a
person. This site's 21 homepage FAQs are collected from real PAA (per `faq.ts`), which is the more
honest approach and should not change — but two additions are justified by the GSC evidence:
*"Is this ring sizer free?"* and *"Can I find my ring size online without a ring sizer?"*

**What must not be done:** `/actual-ring-size-chart-on-screen` must not get `FAQPage` schema until
its questions come from a real PAA pull. The current abstention is correct and documented in
`faq.ts`; overriding it to chase a rich result would make a false claim about what people ask.

## 19. 30-day action plan

Everything here is either a decision, a copy change or an in-tool change. **No new pages in 30 days.**

| Day | Action | Priority | Impact | Effort |
|---|---|---|---|---|
| 1 | **URL-inspect all six content pages in GSC.** Confirm indexed/not. Request indexing for any that are not. This unblocks every other judgement. | **P0** | High | Low |
| 1 | 🔴 **Premise wrong — downgraded to P2, see §P3.** The page is not in the live sitemap and never was; it sits on the unmerged branch `draft/actual-size-chart-on-screen`. Nothing is being fed to Google. Un-urgent choice: finish + merge the draft, or delete the branch. | ~~P0~~ **P2** | Low | Low |
| 2 | Homepage title + meta description (§18) — ✅ **SHIPPED 6 Sep, live-verified** | **P0** | High | Low |
| 2 | `/ring-size-chart` title + meta description (§18) — ✅ **SHIPPED 6 Sep, live-verified** | P1 | Medium | Low |
| 3–5 | **Reframe the tool's entry (§20 STEP 1–2).** — ✅ **SHIPPED 6 Sep.** Live as a *"What do you have?"* radiogroup: *A ring that fits* / *Just my finger* / *A measurement already*, ring-first by default, one instruction per source inside the card. Verified in the live HTML (ring hint server-rendered, roving tabindex correct). | **P0** | **High** | Medium |
| 5 | Add the two internal links to `/actual-…` (§17) — **moot until the draft branch is merged.** ~~P0~~ P2 | ~~P0~~ **P2** | Low | Low |
| 6 | Retitle the homepage chart H2 away from "Ring size conversion chart" → "Your size in every system"; strengthen the link to `/ring-size-chart` | P1 | Medium | Low |
| 7 | 🔴 **Premise wrong — `#methods` was already a summary + link** (its own source comment says so). The real duplication is `#about-tool`'s "Three ways to give it a measurement", which after the 6 Sep reframe restates the tool's own source picker in prose. Cut that instead. **Done 6 Sep.** | P1 | Low | Low |
| 8–10 | **Multi-object calibration** — ✅ **SHIPPED 6 Sep**, with two coins, not three. US quarter and 1 euro are computed from 31 U.S.C. § 5112(a) and Reg. (EU) 729/2014; **₹5 is deliberately omitted** — published figures conflict (23 vs 31.1 mm) and neither issuing body is reachable. Coins are 2.2–2.3× LESS precise than the card (the error scales inversely with the object's size), so the picker ranks rather than lists, and the card stays default. 24 new assertions. | P1 | Medium | Medium |
| 11–14 | **On-screen digital ruler** — ✅ **SHIPPED 6 Sep.** A read-off scale, not a drag marker: the strip is held against the glass with one hand, so a marker would need a second hand with the fingertip over the mark. 0–80 mm, vertical under `md` (480 px at a phone's 6 px/mm will not fit 375 px across), ticks as gradients at exactly 10/5/1 mm. 19 new assertions. | P1 | Medium | **High** |
| 15 | 🔴 **REJECTED 7 Sep — do not build.** The homepage already says "there is no formula for it… anyone giving you an exact figure has invented it", and a toggle emitting +¼ *is* that figure; a caveat line does not fix it, because people read the number. Checked: ISO 8653:2016 covers measurement and designation, not band width, and jewellers disagree on the **direction** — a comfort-fit band is domed inside and is commonly sized DOWN. The toggle would have been actively wrong for most wide bands. The edge-case copy now says that instead. | ~~P2~~ **closed** | — | — |
| 16–20 | **Deepen `/printable-ring-sizer`** — ✅ **SHIPPED 7 Sep. 1,032 → 2,359 words, 3 → 8 FAQs.** Why-not-a-PDF (Acrobat's *Fit* / *Shrink oversized* both scale; only *Actual size* is 100%), per-browser scale troubleshooting, why paper carries whole sizes (a quarter size is 0.20 mm; the gauge stroke is 0.30 mm), and expected accuracy. Print output verified unchanged via headless-Chrome PDF, before and after. | P1 | Medium | Medium |
| 21 | `Organization` + `WebSite` — ✅ **SHIPPED 7 Sep**, sitewide, as one `@id`-linked graph; `/about`, `/contact`, `/privacy`, `/terms` had none before. **`Service` deliberately omitted**: the tool is already a `WebApplication`, and matching a competitor's type *count* is not a reason to publish a type. No `sameAs` (no accounts exist), no `SearchAction` (no site search). Validated across all 11 pages. | P2 | Low | Low |
| 22 | The two §18 FAQs — ✅ **SHIPPED 7 Sep**, and **not** labelled PAA. `faq.ts` says every question is verbatim People-also-ask; these are written from GSC queries, so the file now documents two sources and marks these at the point of use. One answer initially claimed the site is ad-funded — it is not, `/privacy` says so, and that was corrected before commit. | P2 | Low | Low |
| 25 | Lighthouse — ✅ **RUN 7 Sep** (13.4.1, mobile, live URL): **Performance 88 · Best Practices 100 · SEO 100**, CLS 0, TBT 0 ms, LCP 3.2 s. Images were the only real lever: the hero shipped **twice** (public/ *and* imported = 138 KB dead), its weight was the **alpha channel** not colour, and `logo.webp` (148 KB) was referenced by nothing. **~340 KB removed from every deploy.** `og.png` left alone — it is not fetched on page load. | P2 | Low | Low |
| 28 | 🔴 **NOT A DEFECT — closed 7 Sep.** RFC 3986 §6.2.3: an empty path "should be considered equivalent to a path of '/'". Same URL. It also cannot be fixed cheaply — `serialize` runs *before* the integration applies `trailingSlash` (verified by logging), so the alternatives are slashing all nine URLs (eight real mismatches to remove one imaginary) or a permanent post-build rewrite. Recorded in `astro.config.mjs`. | ~~P2~~ **closed** | — | — |
| 30 | **Re-read GSC.** Impressions should be 300+/month on trajectory. If they are under 150, the problem is indexing or authority, not copy — and the plan changes. | **P0** | — | Low |

## 20. 90-day growth strategy

**Month 1 — make the existing ten URLs work.** Everything in §19. The thesis: the site is not
losing on content depth (4,729 words on the homepage beats all three competitors), it is losing on
intent framing, one orphaned page, and five days of age.

**Month 2 — take the two things nobody has.**

1. **`/indian-ring-size-chart`** — the one new page. India is 10% of the leader's traffic and none of
   the three returns an Indian size. The angle is not "here is a conversion table"; it is the honest
   one this site is uniquely positioned to write: *India has no governing standard, here is what the
   1–37 scale actually measures, here is why your jeweller's chart differs, and here is your size in
   it.* `INDIA_NOTE` already exists in `ringSizes.ts`. Link from `/ring-size-chart` and the tool.
2. **Own the printable outright.** Finish the deepening from month 1 and make
   `/printable-ring-sizer` the best printable resource on the web — because the competition is a
   WordPress PDF upload.

Also month 2: surface *"A unit is not a size"* from the `#disagree` anchor into a proper H2 with the
five-second test as the first thing under it. It is the strongest differentiating content on the
site and it is currently a fragment link.

**Month 3 — measure, then decide.**

- If impressions are tracking above ~400/month: build `/oura-ring-size` (or a `/smart-rings` hub),
  and begin a small, genuine link-acquisition effort — the correctness story (five verifiable errors
  in the #1 result) is the pitch, and it is a real one.
- If impressions are under ~200/month at day 90: **stop adding.** The problem is not content; it is
  authority or indexing, and the kill criteria review is 1 January 2027. Spend month 4 on links and
  technical indexing, not pages.

**What is explicitly not in the 90 days:** per-unit URLs, per-country pages, translations, brand
pages beyond one smart-ring page, a secret-size estimator, photo measurement.

## 21. Final priority table

| Priority | Action | Target URL | Cluster | Impact | Effort | Reason | Deadline |
|---|---|---|---|---|---|---|---|
| **P0** | URL-inspect all 6 content pages; request indexing | all | all | High | Low | 4 of 6 pages have zero impressions; ranking work is guesswork until this is known | **Day 1** |
| ~~P0~~ **P2** | 🔴 **Corrected — not a live issue (§P3).** The page is on an unmerged branch, absent from the live nine-URL sitemap. Finish + merge, or delete the branch. | `/actual-ring-size-chart-on-screen` | 4 | Low | Low | Nothing is being fed to Google; the P0 framing was a checked-out-branch artefact | — |
| **P0** ✅ | Reframe tool entry: object first, unit toggles second — **SHIPPED 6 Sep, live-verified** | `/` | 1, 2 | **High** | Medium | All 3 competitors lead with the object; this tool led with a unit question | **Day 5** |
| **P0** ✅ | Rewrite homepage title + description — **SHIPPED 6 Sep, live-verified** | `/` | 1, 2 | High | Low | Title omitted "Free" and buried "Online"; both are in the queries earning impressions | **Day 2** |
| **P0** | Re-read GSC and re-plan against the kill line | — | — | — | Low | ~80 imp/mo vs a 500/mo kill line on 1 Jan 2027 | **Day 30** |
| **P1** | Rewrite `/ring-size-chart` title to capture `ring size chart online` | `/ring-size-chart` | 3 | Medium | Low | 2,100/mo held #1 by ringssizechart | Day 2 |
| **P1** | Add the two internal links to the actual-size page | `/`, `/ring-size-chart` | 4 | High | Low | Zero inbound internal links today | Day 5 |
| **P1** ✅ | Retitle homepage chart H2; strengthen link to chart page — **SHIPPED 7 Sep** | `/` | 3 | Medium | Low | Homepage H2 used the chart page's exact target phrase | Day 6 |
| **P1** ✅ | Multi-object calibration — **SHIPPED 6 Sep** (quarter + euro; ₹5 withheld, unverifiable) | `/` | 1 | Medium | Medium | ringsize.app offers 8 — but each extra object costs precision, so this ranks them rather than matching the count | Day 10 |
| **P1** ✅ | On-screen digital ruler for the paper strip — **SHIPPED 6 Sep** | `/` | 1, 6 | Medium | High | Only ringsize.app has it; removes the physical-ruler prerequisite | Day 14 |
| **P1** ✅ | Deepen to ~2,000 words + 8 FAQs — **SHIPPED 7 Sep (2,359 words, 8 FAQs)** | `/printable-ring-sizer` | 5 | Medium | Medium | The only uncontested page in the market, and was the thinnest here | Day 20 |
| **P1** | Build the India page | `/indian-ring-size-chart` | 9 | Medium | Medium | 10% of leader traffic; zero competitor coverage; the data already exists | Day 60 |
| **P1** | Promote "A unit is not a size" to a full H2 section | `/` | 1 | Medium | Low | Strongest differentiating asset; currently a fragment anchor | Day 45 |
| ~~P2~~ | 🔴 Wide-band toggle — **REJECTED**, would contradict the site's own copy and be wrong for comfort-fit bands | `/` | 1 | — | — | Real user need; the answer is prose, not a calculated figure nobody can source | closed |
| **P2** ✅ | Add `Organization` + `WebSite` (**not** `Service`) — **SHIPPED 7 Sep** | all | all | Low | Low | Type count is not a reason to publish a type | Day 21 |
| **P2** ✅ | Lighthouse — **RUN 7 Sep: 88 / 100 / 100**, and ~340 KB cut from the deploy | all | — | Low | Low | Had never been run | Day 25 |
| ~~P2~~ | 🔴 Sitemap/canonical trailing slash — **NOT A DEFECT** (RFC 3986 §6.2.3) | `/` | — | — | — | The two forms are the same URL | closed |
| **P2** | `/oura-ring-size` or `/smart-rings` | new | 10 | Low | Medium | Only if month-2 metrics justify it | Day 90 |
| **P3** | Link acquisition using the correctness story | — | — | Medium | High | Five verifiable errors in the #1 result is a real pitch | Month 3+ |

---
---

# Appendix A — Measurement & calculation strategy deep dive

Everything below was verified by driving the competitors' tools on 6 September 2026, not from
their marketing copy.

## A1. What each site asks the user to measure

### ringsizetool.com

| User input | Measurement method | Calculation | Output |
|---|---|---|---|
| Bank card against glass (portrait, short edge) | Slider sets `pxPerMm` | `CARD_SHORT_MM = 53.98` | calibration stored to `localStorage`, DPR recorded |
| A ring laid on the on-screen circle | Slider until circle matches inner edge | `dia_mm = px ÷ pxPerMm` | 7 systems |
| A paper strip round the finger, measured on the user's **own physical ruler** | Typed in | `toDia(value, 'circ', unit)` | 7 systems |
| A number from a jeweller, caliper or an old band | Typed in | direct | 7 systems |

**Methods used:** A (manual), B (ring diameter), C (ring circumference), E (screen-based),
F (screen calibration — bank card), G (virtual/digital), and via `/printable-ring-sizer`, D
(printable). **Not used:** H (image), I (finger-based estimation), J (secret estimation — answered in
FAQ, correctly).

### ringssizechart.com

| User input | Measurement method | Calculation | Output |
|---|---|---|---|
| A number the user obtained with their own ruler | String/paper, or a ring measured with a ruler, or the printed PDF | Table lookup | US, UK, EU, JP |

**Methods used:** A, B, C, D. **Not used:** E, F, G, H, I, J. Their three on-screen sliders are
*input widgets for a number*, not measuring instruments — with no calibration, the circle has no
physical meaning, and their own CM slider proves it by drawing the same ring ten times smaller.

### measureringsize.com

| User input | Measurement method | Calculation | Output |
|---|---|---|---|
| Bank card (landscape) **or a physical ruler** | Slider sets scale | ISO 7810, cited by name | calibration stored |
| A ring on the adjustable circle | Slider to inner edge | `dia_mm = px ÷ pxPerMm` | 5 systems |
| Finger circumference from a paper strip | Typed | lookup | 5 systems |

**Methods used:** A, B, C, E, F, G. **Not used:** D (no printable), H, I. J in FAQ only.

### ringsize.app

| User input | Measurement method | Calculation | Output |
|---|---|---|---|
| One of **8 reference objects** | Slider to dashed outline | per-object mm constant | calibration stored per device |
| A ring on the screen | Slider + **arrow-key fine-tune** | `dia_mm = px ÷ pxPerMm` | 4 systems |
| **A paper strip laid on an on-screen calibrated ruler**, marker dragged to the pen mark | Read off the screen | `circ_mm` direct | 4 systems |

**Methods used:** A, B, C, E, F, G. **Not used:** D (no printable), H, I. J not surfaced.

## A2. Calculation flow, side by side

```
ringsizetool.com          ringssizechart.com      measureringsize.com      ringsize.app
─────────────────         ───────────────────     ────────────────────     ─────────────
card → pxPerMm            (none)                  card|ruler → pxPerMm     8 objects → pxPerMm
      ↓                          ↓                       ↓                        ↓
measure × unit            pick one of 3           ring on circle           ring on circle
(6 modes)                 unit sliders                   ↓                  OR strip on ruler
      ↓                          ↓                       ↓                        ↓
toDia() → dia_mm          slider value            px ÷ pxPerMm             px ÷ pxPerMm
      ↓                          ↓                       ↓                        ↓
COMPUTED from             TABLE LOOKUP            TABLE LOOKUP             computed
7 standards               (image chart)           (ISO rows)
      ↓                          ↓                       ↓                        ↓
US ¼ · UK ½ · EU ·        US · UK · EU · JP       US ½ · UK · ISO ·        US ¼ · UK ·
JP · IN · FR · BR         (EU sometimes 51.8)     IT/ES/CH · RU            EU · JP
```

**Rounding, precisely:**

| | US | UK | EU/ISO | JP | India |
|---|---|---|---|---|---|
| ringsizetool | **quarter** (`toQuarter`) | **half** letters | whole (`Math.round`, ties up) | whole | whole (stated unstandardised) |
| ringssizechart | whole/half, ¼ claimed with 2× wrong figures | half | **broken — emits 51.8** | whole | — |
| measureringsize | **half only** (6 duplicate pairs in 29 rows) | half | whole | — | — |
| ringsize.app | **quarter** | half | whole | whole | — |

## A3. Feature matrix

| Feature | ringsizetool.com | ringssizechart | measureringsize | ringsize.app | Best implementation |
|---|---|---|---|---|---|
| Existing-ring measurement | ✅ (undocumented in-tool) | ⚠️ offline ruler | ✅ | ✅ | **ringsize.app** (arrow-key fine-tune) |
| Finger measurement | ✅ typed | ✅ offline | ✅ typed | ✅ **on-screen ruler** | **ringsize.app** |
| Diameter input | ✅ | ✅ | ✅ | ✅ | tie |
| Circumference input | ✅ | ⚠️ chart column only | ✅ | ✅ | **ringsizetool** (6 modes) |
| Automatic calculation | ✅ live | ⚠️ lookup | ✅ | ✅ | **ringsizetool** (computed, verified) |
| Screen calibration | ✅ | ❌ | ✅ | ✅ | **ringsize.app** (8 objects) |
| Credit-card calibration | ✅ portrait | ❌ | ✅ landscape | ✅ | tie |
| Printable sizer | ✅ **HTML + 50 mm check square** | ⚠️ PDF | ❌ | ❌ | **ringsizetool** |
| Virtual ring sizer | ✅ | ⚠️ uncalibrated | ✅ | ✅ | **ringsize.app** |
| Mobile measurement | ✅ (phone default 6 px/mm) | ⚠️ | ✅ | ✅ | tie |
| Desktop measurement | ✅ | ⚠️ | ✅ | ✅ | tie |
| International conversion | ✅ **7 systems** | 4 | 5 | 4 | **ringsizetool** |
| Half sizes | ✅ | ✅ | ✅ | ✅ | tie |
| **Quarter sizes** | ✅ correct | ⚠️ **2× wrong** | ❌ | ✅ | **ringsizetool / ringsize.app** |
| Accuracy guidance | ✅ honest, understated | ✅ tips | ✅ **"within 0.5 mm"** | ✅ **failure modes named** | **ringsize.app** |
| Secret ring sizing | FAQ | tips | **FAQ, best answer** | — | **measureringsize** |
| Wide-band adjustment | ⚠️ prose only | ✅ ≥6 mm → ½ | ❌ | ✅ "+½" | **ringssizechart** |
| Zoom-change detection | ✅ **`DPR_STORE_KEY`** | ❌ | ❌ | ⚠️ warns in prose | **ringsizetool** — unique |
| States when it is *not* calibrated | ✅ **two-state marker** | ❌ | ❌ | ❌ | **ringsizetool** — unique |

**Two things this site does that nobody else does:** it detects that browser zoom changed since
calibration (`DPR_STORE_KEY`), and it refuses to claim 1:1 until the visitor has actually
calibrated. Both are invisible in the SERP and both are the right engineering. They are worth
saying out loud on the page — *"this is the only ring sizer that tells you when it is guessing"* is
a differentiator that survives a competitor copying the calibration slider.

## A4. Trust and accuracy — who wins, and why

**ringsize.app, clearly.** Not because their numbers are better (this site's are demonstrably
better), but because they enumerate every way the method fails — zoom, phone case, viewing angle,
device switching, time of day — and then tell you when to stop trusting them: *"for a valuable or
non-resizable purchase, confirm with a jeweller."*

Naming the limits is what makes the claim credible. measureringsize's *"within 0.5 mm"* is more
quotable but is an unverifiable number. ringssizechart's jeweller videos are a borrowed-authority
play, effective and cheap.

This site has the strongest *substance* and the weakest *narration*. `UK_NOTE` and `INDIA_NOTE` are
behind a `<details>` toggle labelled "Why UK and India can differ from your jeweller's chart", which
is exactly the right content in exactly the wrong place — collapsed, below the fold, phrased as an
apology rather than as proof of care.

## A5. Where the friction actually is

**Step counts to a result, cold visitor with a ring in hand:**

| Site | Steps | Friction |
|---|---|---|
| measureringsize | 5 | Requirements gate is helpful; landscape card wastes width on a phone |
| ringsize.app | 4–5 | Object picker adds a step but removes a prerequisite |
| **ringsizetool** | **4** | **Fewest steps — but step 2 asks an unanswerable question** |
| ringssizechart | 2 | Fastest and meaningless — no calibration, so the number is whatever you already knew |

The count is not the problem here. **The problem is what step 2 asks.** A visitor who arrives with a
ring and no measurement is shown *Diameter | Circumference* and *MM | CM | Inches* — six modes, and
their honest answer is "I don't know, I have a ring." The instruction they need is 150 lines below
the tool. Competitors put it in the tool.

Secondary friction points, in order:

1. No instruction on the ring stage. Graph paper and crosshairs read as decoration without a caption.
2. The bank card must be held **portrait** (short edge) — a real choice, correctly documented in
   `calibration.ts`, but unusual, and the two competitors that calibrate both show it landscape.
3. The paper-strip route requires a physical ruler the visitor may not own.
4. India and FR/IT/ES results sit in a small text row beside a "Calibrate" link, visually ranked
   below the 2×2 grid — the site's best differentiator rendered as small print.

---

# Appendix B — Final competitor tool conclusions

| Question | Answer | Why |
|---|---|---|
| **1. Best measurement methodology?** | **ringsize.app** | Two calibrated paths, eight reference objects, arrow-key precision, and an on-screen ruler that removes a physical prerequisite. |
| **2. Easiest user experience?** | **measureringsize.com** | The requirements gate before the tool, then three unmistakable steps. Nothing to decide. |
| **3. Most accurate-*looking* process?** | **measureringsize.com** | *"Accurate to within 0.5 mm"* as the first FAQ. Quotable, specific, unverifiable. |
| **4. Most accurate *actual* process?** | **ringsizetool.com** | 187 assertions, seven systems computed from standards, unit-independence proven, zoom-drift detected. Not the same question as 3, and that gap is the site's problem. |
| **5. Best SEO architecture?** | **ringsize.app** | 8 URLs, 7 schema types, a conversions hub distinct from the chart, a smart-ring hub, and homepage titles that capture secondary head terms. |
| **6. Best mobile experience?** | **ringsize.app** | Object picker suits a phone-first visitor with no card to hand; portrait-friendly. |
| **7. Strongest trust signals?** | **ringsize.app** | Names every failure mode, then names when not to trust it. |
| **8. Which strategy should ringsizetool.com adopt?** | **Keep the maths; adopt ringsize.app's *entry model* and measureringsize's *requirements gate*.** | Lead with the object, not the unit; state the prerequisite before the control; keep computing from standards. |
| **9. Which features should be copied conceptually?** | On-screen ruler · multi-object calibration · requirements gate · failure-mode narration · `Organization`/`Service` schema | All four sites' best ideas, none of which conflict with this site's engineering rules |
| **10. Which should NOT be copied?** | ringssizechart's per-unit widgets and image chart · measureringsize's ten language folders · any unverifiable accuracy figure · ringsize.app's habit of writing FAQs as search strings | Three are proven low-value; the fourth would contradict the site's own standard for honest claims |

**The unique thing none of them handles properly:** *nobody tells the visitor when the tool is
wrong.* All three competitors present a number with equal confidence whether or not the screen is
calibrated, whether or not the browser is zoomed, and whether or not the size system in question
actually has a governing standard. This site already has all three mechanisms built — the two-state
scale marker, `DPR_STORE_KEY` zoom detection, and `UK_NOTE`/`INDIA_NOTE`. **They are the product,
and they are currently the least visible thing on the page.**

---

# Appendix C — The ideal ringsizetool.com measurement & calculation system

## The user journey

```
STEP 0  ── Prerequisite, stated before any control
           "You'll need: a bank card or a coin (required) · a ring that fits (optional)"

STEP 1  ── Calibrate
           Pick your object:  [Bank card] [US quarter] [1 euro] [₹5]
           Drag until the outline matches. Save.
           → stores pxPerMm + DPR

STEP 2  ── WHAT DO YOU HAVE?          ← the entry point, and it is an object, not a unit
           ┌─────────────────────────┬─────────────────────────┬────────────────────┐
           │ A ring that fits        │ Just my finger          │ A number already   │
           │ (default)               │                         │                    │
           └─────────────────────────┴─────────────────────────┴────────────────────┘

STEP 3  ── Measure
     3a │ ring   → "Lay the ring on the circle. Drag until the circle sits inside it."
        │          ± buttons and arrow keys for the last 0.1 mm
     3b │ finger → "Wrap a paper strip, mark the overlap, lay it on this ruler."
        │          on-screen calibrated ruler, draggable marker
     3c │ number → the existing Diameter|Circumference × MM|CM|Inches toggles, unchanged

STEP 4  ── Result
           US 6¼   UK L½   EU 52   JP 12          ← primary, half sizes prominent
           India 12 · FR/IT/ES 12 · Brazil 12     ← promoted out of small print
           16.51 mm diameter · 51.87 mm circumference
           ✓ Actual size on your screen           ← or "— Not calibrated yet"

STEP 5  ── Honest caveats, inline and open (not in a <details>)
           "Wide band (6 mm+)? Add ¼–½ a size."   [+¼] [+½] toggle
           "UK and India can differ from your jeweller's chart — here's why."   ← expanded by default
           "Buying something non-resizable? Confirm with a jeweller."

STEP 6  ── Next
           Primary:   "See every size at actual size on screen →"  /actual-ring-size-chart-on-screen
           Secondary: "Full conversion chart →"  ·  "Print it instead →"
```

**Steps 3c and the six modes are retained unchanged.** They are the best implementation of that
input in the market and a visitor arriving from a jeweller with "17.3 mm" written on a card needs
them. They stop being the *front door* and become the third option, which is what they are.

## Calculation, conversion and rounding — keep as-is

`ringSizes.ts` needs no change. Specifically, keep:

- US from diameter, quarter-rounded via `toQuarter`
- UK from circumference, half-letter, with `UK_NOTE` on the half-letter offset
- EU/ISO from circumference, `Math.round`, ties up, bounded 41–76 → the derived
  `DIA_MIN_MM`/`DIA_MAX_MM` band that keeps all seven systems answering everywhere
- Japan from diameter, `JP_BASE_MM = 13`, step `1/3`
- India from circumference with `INDIA_UNSTANDARDISED = true` and `INDIA_NOTE` shown, not hidden
- France/Italy/Spain and Brazil as `circ − 40`
- **Never round the internal value.** Round only at print, per `PRECISION`, so a printed number
  round-trips.

**One presentation change, no maths change:** show the half size as the headline and the quarter as
a secondary refinement. Jewellers stock halves; a quarter size is a precision claim about a finger
that changes size during the day. `toQuarter` stays; the visual hierarchy inverts.

## Accuracy validation to add

| Check | Already built? | Action |
|---|---|---|
| Zoom changed since calibration | ✅ `DPR_STORE_KEY` | **Say so louder** — this is unique |
| Not-yet-calibrated state | ✅ two-state marker | **Say so louder** |
| Remove phone case before calibrating | ❌ | Add one line to the drawer |
| Recalibrate when switching device | ❌ | Add one line |
| Look straight on, not at an angle | ❌ | Add one line |
| Measure late afternoon at room temperature | ✅ prose | Move into the tool |
| Wide band ≥6 mm | ⚠️ prose only | **In-tool toggle** |
| Confirm with a jeweller for non-resizable | ❌ | Add to the result block |

## Mobile and desktop

Mobile is already handled better than the competition (`PHONE_PX_PER_MM = 6` starting point,
`PHONE_VIEWPORT_MAX_PX = 500`, portrait card so the 53.98 mm edge fits a narrow viewport). Two
additions: the coin option matters most on mobile, and the on-screen ruler must scroll horizontally
inside its own container at 375 px, never the page.

Desktop needs nothing beyond the entry reframe.

## SEO architecture and internal linking

Exactly as §13 and §17. **One tool URL, one chart URL, one actual-size URL, one printable URL, one
how-to URL, one context URL, one India URL.** No unit routes, no country routes, no per-measure
routes.

## Tools to avoid — restated

Per-unit URLs · per-country converters · separate diameter/circumference calculators · a secret-size
estimator · photo measurement · a printable *generator* · translations · brand pages beyond one
smart-ring page.

---

# The 10 highest-impact actions for ringsizetool.com

| # | Action | Why it is at this rank |
|---|---|---|
| **1** | **Put "Lay a ring on the circle" inside the instrument, and make it the default entry.** Unit toggles become the third option. | The tool asks for a unit before it asks for a ring. All three competitors do the reverse. Fixes intent match for a 26,000/mo head term *and* the conversion rate, for the cost of a heading and a default. |
| **2** | **URL-inspect all six content pages in GSC and request indexing.** | Four of six pages have earned zero impressions in six days. Until this is known, every ranking judgement — including the rest of this list — is guesswork. One hour. |
| **3** | 🔴 **Corrected 6 Sep — drop from this list (see §P3).** The sitemap is *not* feeding it to Google: the page is on an unmerged branch and the live sitemap has nine URLs without it. | The urgency was an artefact of which branch was checked out when this audit read `src/`. It still targets a >1,000/mo keyword that ringsize.app wins from a homepage title tag, so finishing and merging the draft remains worth doing — just not this week, and not as a P0. |
| **4** | **Rewrite the homepage title to `Online Ring Sizer — Free Ring Size Finder \| Ring Size Tool`.** | The three queries actually earning impressions are *ring sizer online for free*, *ring sizer online*, *ring size finder online*. The current title buries "Online" and omits "Free". Ten minutes. |
| **5** | **Stop selling calibration; start selling the two things nobody else has** — that it tells you when it is *not* calibrated, and when your browser zoom has drifted. | Two of three competitors calibrate with a bank card and one calibrates with eight objects. The H1's differentiator is now table stakes. `DPR_STORE_KEY` and the two-state marker are genuinely unique and currently invisible. |
| **6** | **Build the on-screen digital ruler for the paper-strip method.** | The only feature gap that removes a *prerequisite* rather than adding a feature. ringsize.app has it; the other two do not. Uses `pxPerMm` that is already stored. |
| **7** | **Deepen `/printable-ring-sizer` to ~2,000 words and 8 FAQs.** | The single uncontested position in this market — no competitor has an HTML printable — held by the thinnest content page on the site (1,027 words, 3 FAQs). |
| **8** | **Promote India, FR/IT/ES and Brazil out of the small-print row, and build `/indian-ring-size-chart`.** | Seven systems vs. four or five is the clearest output advantage; India is 10% of the leader's traffic and *no competitor returns an Indian size*. It is currently rendered next to a "Calibrate" link in 12px text. |
| **9** | **Add multi-object calibration (US quarter, 1 euro, ₹5) and a "what you'll need" gate before the tool.** | Copies the two cheapest good ideas in the market. The coin matters for the 19% of GSC impressions from India and Pakistan; the gate is why measureringsize's flow feels effortless. |
| **10** | **Fix the internal link graph: five tool-first nav items, contextual in-body links, utility pages in the footer only.** | Today all ten URLs link to all ten URLs, so `/privacy` carries the same internal weight as `/ring-size-chart`, and one page carries none at all. |

**The frame for all ten:** ~80 impressions/month against a 500/month kill line on 1 January 2027.
Six of these ten are copy, defaults and links — days of work, not weeks. Do those first, re-read
Search Console on day 30, and let the data pick between "keep optimising" and "the problem is
authority, not content."
