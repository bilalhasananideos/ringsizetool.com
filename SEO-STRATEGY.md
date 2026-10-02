# ringsizetool.com — SEO strategy, 30 Sep 2026

Written against a pasted "master prompt" asking for a complete SEO strategy in 30 sections. That
prompt is followed section by section below, but read this first:

**Most of what the prompt asks for was already done.** `SEO-AUDIT.md` (6 Sep) covered the keyword
map, cannibalisation, competitors, architecture and a 90-day plan; `RESEARCH.md` holds the keyword
history with its dated corrections (26 and 29 Sep); `STATUS.md` records every decided-against
page. This file **consolidates** those, **re-checks them against live data taken today**, and adds
only what is new. Where the honest answer is "no change", it says so in one line and points to the
record, rather than inventing work. The prompt's own critical rule — *more pages ≠ more traffic* —
is the conclusion the evidence keeps reaching.

**What is new today (30 Sep), all measured, not assumed:**

0. 🔴 **The privacy page is false again.** It says *"there is no Cloudflare Web Analytics and no
   other tracker"*, but every live page loads Cloudflare's analytics beacon. The beacon is injected
   at the edge by the Pages dashboard, not by the repo. This is the same failure the 21 Sep audit
   fixed for GA4. → R0, P0
1. **Tool usage cannot be measured at all.** GA4 has zero custom events; its only key event is the
   default `purchase`. The prompt's second goal has no data behind it yet. → R2
2. **GA4 is recording localhost and `pages.dev` traffic** as if it were the real site. → R1
3. **On phones the sticky header hides anchor targets.** "Start Measuring ↓" lands with the tool's
   H2 underneath a 122 px header. → R3
4. **Homepage lab performance has regressed on mobile:** Lighthouse 72–78 today, LCP 5.2–6.0 s,
   against 88 / 3.2 s on 7 Sep. The chart page scores 99. → R8
5. **FAQ rich results no longer exist in Google Search** (retired 7 May 2026, docs removed June
   2026). HowTo went in 2023. The site's FAQ markup is harmless but earns nothing. → §18
6. **The UK/Australian letter scale is the one international opportunity that passes every test**
   in the prompt's Phase 11: big demand in its own markets, a genuinely different system, a weak
   SERP (checked today), and original verified research nobody else publishes. → R6
7. **The chart page still has no per-system sections.** `SEO-AUDIT.md` §4/§13 recommended anchors
   for US/UK/EU/JP/India on 6 Sep; they were never built. → R5
8. **A separate QA audit written today (`QA-AUDIT-2026-09-30.md`, untracked in this repo) found 14
   tool and copy bugs.** One matters directly for a global audience, and I re-verified it live:
   typing a comma decimal (`17,35`, the way most of continental Europe, Brazil and Latin America
   write 17.35) turns into `1735`. The tool then clamps it and shows **US 15¾ / UK Z+6** with no warning, when the
   true answer is about US 7. That audit also covers the Japan standard citation, which R5 depends
   on. → R16, P0 for tool usage

**Evidence tags used throughout:** **[G]** Google official, quoted verbatim in §28 · **[M]**
measured here on 30 Sep (method stated) · **[BP]** industry best practice, not a Google statement ·
**[EXP]** a test, not a fact · **[UNV]** unverified. Keyword volumes are always a third-party
estimate and are tagged with source and date; they are never presented as fact.

**Data used today:** GSC and GA4 via OpenSEO (free reads) · DataForSEO keyword volumes and live
SERPs via OpenSEO (**96 credits spent, 70 left**) · Lighthouse 13.5.0 run locally against the live
URL · a live crawl of all 9 pages with curl · the in-app browser at 375 × 812 · Google's own pages
fetched live.

---

# 1. Executive summary

**Current SEO model.** One topic (ring sizing), one tool, four supporting pages, four trust pages.
The tool is the homepage (`/`); the chart (`/ring-size-chart`), method guide
(`/how-to-measure-ring-size-at-home`), printable (`/printable-ring-sizer`) and averages
(`/average-ring-size`) each own one intent cluster. Every number is computed from the standards in
`src/data/ringSizes.ts` and checked by `npm run verify`. This is the right shape. The 29 Sep
competitor pull found that **every keyword cluster the two leading competitors win maps to a page
this site already has** (`RESEARCH.md` → "Every cluster maps to a page we already have").

**Where it stands (GSC, 1–29 Sep 2026) [M]:** 481 impressions, 2 clicks. One click was the owner's
own (Pakistan). Weekly impressions: 145 (8–14 Sep), 132 (15–21), 136 (22–28). That is **flat at
about 19–20 a day, roughly 590 a month**, only just above the kill line of 500 a month by month 4.

| Page | Impressions | Avg. position | What it ranks for |
|---|---|---|---|
| `/` | 222 | 43.3 | head terms at pos 60–95 until 16 Sep; since then pos 5–9, but only for hidden queries |
| `/ring-size-chart` | 208 | 7.3 | exact-mm lookups (`16.31 mm ring size` pos 1, `22.61 mm ring size` pos 1); ~90 % of its queries are hidden |
| `/printable-ring-sizer` | 25 | 47.4 | print / paper sizer variants, pos 52–72 |
| `/average-ring-size` | 19 | 37.4 | average / typical size variants |
| `/how-to-measure-ring-size-at-home` | 7 | 4.7 | almost nothing: the SERP is dominated by big jewellery brands |

**The diagnosis has not changed since 21 Sep, and today's data supports it.** The limit is domain
age and authority, not on-page SEO. A DR-0 domain one month old ranks on the long tail (exact-mm
lookups at pos 1–11) and nowhere on head terms. That is the normal pattern for a new site. No
title, word count or schema change moves a head term from position 60 to 8.

**What this strategy therefore does:**

0. It makes the privacy page true again (R0). This is not SEO. It comes first because a false
   privacy page is the one defect on this site that is a trust problem today and an AdSense-review
   problem later.
1. It makes the tool's use **measurable**, which it currently is not (R1, R2).
2. It fixes the two small UX and performance defects measured today (R3, R8).
3. It adds content only where a real, different user need exists: per-system sections on the
   chart page (R5), and possibly one letter-scale page (R6).
4. It builds authority only through non-email, policy-safe channels (R10).
5. It defers AdSense until there is traffic worth monetising and the consent and identity questions
   are settled (R7, R9, R11).

---

# 2. Target audience

The audience groups the prompt lists all exist and are already served. What the data adds is **where
they are and how they search** [M, GSC 1–29 Sep]:

| Market | Impressions | Avg. pos | Sizing system they use | Note |
|---|---|---|---|---|
| US | 124 | 27.6 | US numbers | largest market, highest CPC ($1.21 for `ring size chart`, DataForSEO) |
| India | 75 | 15.8 | Indian 1–37 (no national standard) | 2nd, and growing fastest (29 on 21 Sep); CPC $0.06–0.08 |
| UK | 65 | 48.3 | UK letters | 3rd; the site's British spelling fits; CPC $0.62 |
| Philippines | 16 | 11.8 | US numbers | |
| Canada | 15 | 49.7 | US numbers | |
| Pakistan | 14 | 11.4 | — | **mostly the owner's own searches**; discount it |
| Malaysia | 14 | 6.8 | — | |
| Australia | 11 | 64.8 | UK letters | small today; its letter-scale queries are big (§9) |
| Brazil | 11 | 7.5 | Brazilian (circumference − 40) | |

Search behaviour by group, and which page serves it:

| Audience | Typical query shape | Served by |
|---|---|---|
| Shopper who doesn't know their size | `what is my ring size`, `ring sizer`, `ring size calculator` | `/` (tool) |
| Owns a ring that fits | `measure ring diameter`, `ring size mm` | `/` ring route · `/ring-size-chart` |
| Has a number already | `16.31 mm ring size`, `2.3 inches ring size` | `/ring-size-chart` rows · tool's typed mode |
| No card / prefers paper | `printable ring sizer`, `ring size paper` | `/printable-ring-sizer` |
| Wants the method | `how to measure ring size at home`, `with string` | `/how-to-measure-ring-size-at-home` |
| Gift / secret buyer | `find out someone's ring size secretly` (20/mo, US) | FAQ answer on `/` — no page, by decision |
| International buyer | `us ring size to uk`, `australian ring size chart` | `/ring-size-chart` today; R5/R6 |
| Norms / curiosity | `average ring size for women` | `/average-ring-size` |

Mobile and desktop are roughly half each (desktop 243, mobile 217). Mobile ranks far better
(pos 13 vs 41), so **the tool must work on a phone first**; §20 covers that.

# 3. Primary SEO goal — organic traffic

Grow qualified impressions and clicks on the five existing content pages. The success measure is
the weekly impression rate, not the running total, which always goes up (lesson of 29 Sep). The
other measures are the share of visible queries and head-term positions. Targets are stated as
decision points, never as promised rankings (§26).

# 4. Primary conversion goal — tool usage

A visitor who lands on any page should reach a size. Today this **cannot be measured**. GA4 records
page views only, and it has no custom events and no custom definitions [M, GA4 Admin API via
OpenSEO: `keyEventCount 1` (`purchase`), `customDimensionCount 0`]. R2 fixes this before anything
else is optimised. Tuning a funnel you cannot see is guesswork.

# 5. Secondary monetisation goal — AdSense

The site is pre-application. It has no ad code at all: no `ads.txt`, no snippet, no `<ins>`. This
was verified 21 Sep and re-confirmed by the §8 crawl, where `ads.txt` is 404 and the only
third-party origins are googletagmanager.com and cloudflareinsights.com. At about 20 impressions a day and one real organic
click in a month, the revenue AdSense could earn now is effectively **$0**. Ads are therefore a
later decision with preconditions (R11). The things that would block or complicate an application
are named now, so they are not discovered later: the unnamed `/about` (R7) and UK/EEA consent (R9).

---

# 6. Current website architecture

```
/                                   Tool — "Online Ring Sizer" (clusters: ring sizer, calculator, finder)
├── /ring-size-chart                Reference — full chart, women's, men's, units, sources, FAQ
├── /how-to-measure-ring-size-at-home   Method — HowTo + FAQ, embeds the tool
├── /printable-ring-sizer           Offline artefact — print sheet with 50 mm check square
├── /average-ring-size              Context — norms by sex/finger          (footer link)
└── /about · /contact · /privacy · /terms                                  (footer links)

NAV    = Ring Sizer · Chart · How to Measure · Printable
FOOTER = Average Ring Size · About · Contact · Privacy · Terms
```

Nine indexable URLs; sitemap equals routes (§8). One topical cluster, nothing off-theme, no blog.
**It is focused enough.** Being too narrow is not a risk here; the only "problem" is that a DR-0
site cannot yet rank for the head terms of its own cluster.

Answers to the prompt's Phase 2 questions:

| Question | Answer |
|---|---|
| Main topic | Finding and converting ring sizes, computed from published standards |
| Problem solved | Get a size without a jeweller or a plastic sizer, and read it in any country's system |
| Primary SEO asset | `/ring-size-chart` by impressions today (208 at pos 7.3); `/` by opportunity |
| Primary conversion asset | `/` — the tool (also embedded on the how-to page) |
| Supporting pages | how-to, printable, average |
| One cluster or many? | One |
| Architecture logical? | Yes — tool / reference / method / artefact / context, one intent each |
| Focused? | Yes |

# 7. Recommended SEO architecture

Two changes at most, both conditional. Nothing else moves.

```
/                                   Tool                                   (unchanged)
├── /ring-size-chart                Reference                              (unchanged URL)
│     ├── #full #womens #mens #units #sources #faq      (exist today)
│     └── #us #uk #eu #japan #india #it-es-ch           ← R5: per-system sections, new anchors
├── /uk-ring-size-chart             ← R6: UK & Australian letter scale, ONLY if approved and the
│                                         §12 conditions hold (31–60 days)
├── /how-to-measure-ring-size-at-home                                      (unchanged)
├── /printable-ring-sizer                                                  (unchanged)
├── /average-ring-size                                                     (unchanged)
└── /about · /contact · /privacy · /terms                                  (unchanged; R7 edits /about)
```

The rule that keeps it clean, from `SEO-AUDIT.md` §13, still applies: **tier 1 is the tool, tier 2
is what you do when the tool is not the right shape (print it, look it up), tier 3 is why.** A page
that fits none of those three is not built.

---

# 8. Technical SEO audit

**Method [M]:** a curl crawl of all 9 pages on 30 Sep, parsed with Python. It covered status,
headers, head tags, JSON-LD and links. Every internal href and `#fragment` was checked. Redirects
were tested on 20 URL variants, and five crawler user agents were compared. Raw output is in the
session scratchpad (`techcrawl/`).

**Verdict: technically clean for crawling and indexing.** The one real problem is not a crawl
problem: the privacy page is wrong again.

| # | Issue | URL | Evidence | Impact | Fix | Priority |
|---|---|---|---|---|---|---|
| 1 | **Privacy page denies an analytics script that is live** | `/privacy` (script on all 9 pages) | Served HTML carries `<!-- Cloudflare Pages Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' …>`. `/privacy` says *"It is the only measurement script here — there is no Cloudflare Web Analytics and no other tracker."* Its meta description names only GA. The beacon is not in `src/`, `public/` or `dist/`, so it is injected at the edge by the Cloudflare Pages project's Web Analytics setting | Trust. The same class of error as the 21 Sep GA4 miss, on the page readers check precisely because they don't trust the rest | **R0:** the owner turns Cloudflare Web Analytics **off** in the Pages dashboard (GA4 already covers analytics, and it removes a beacon: §19). Or, if it is wanted, disclose it on `/privacy` in the same change | **P0** |
| 2 | GA4 records non-production hosts | all | GA4 page report 21–29 Sep: hostName `localhost` (23 page views) and `ringsizetool.pages.dev` (4) beside `ringsizetool.com` | Tool/traffic metrics polluted | **R1** | P1 |
| 3 | Sticky header hides anchor targets on mobile | `/` and every in-page anchor | 122 px header; `#tool-heading` H2 at y = 93 after the CTA jump (§20) | Primary CTA lands on a hidden heading | **R3** | P1 |
| 4 | Homepage mobile lab LCP 5.2–6.0 s | `/` | Lighthouse ×3 (§19) | Page experience, a tie-breaker [G] | **R8** | P2 |
| 5 | Near-duplicate homepage FAQ questions | `/` | "Can I size my ring at home?" / "Can I size a ring at home?" / "How can I measure my ring size at home?"; "Can I measure my ring size on my phone?" / "Can I size my ring on my phone?" | All are verbatim PAA strings (per `faq.ts`), and the "at home" answers differ (measure vs resize). The phone pair repeats itself to a reader. FAQ rich results no longer exist, so the FAQ only serves readers | Owner call: merge the phone pair, keep the rest | P3 |
| 6 | No HSTS header | all | `strict-transport-security` absent on apex, www and `/ring-size-chart` | Security hygiene, not ranking. http→https 301 already works | Cloudflare → SSL/TLS → Edge Certificates → HSTS, starting with a short max-age | P3 |
| 7 | Homepage HTML carries ~41 KB of repetition | `/` (and how-to) | 167 identical inline `style="--calCardMm: 53.98;…"` attributes (23.9 KB, the pattern Astro's `define:vars` produces) + 70 developer comments (17.6 KB). 160 KB decoded, **30 KB over the wire** (br) | Minor; comments are public (harmless content) | Leave; revisit only if R8 shows HTML parse cost matters | P3 |
| 8 | Hero image has no `srcset` | `/` | 84,404 B webp, 681×583, same file on phones | Bandwidth on mobile | Part of R8 | P2 |
| 9 | Two-hop redirects | `http://www.…/`, `https://www.…/ring-size-chart/` | 301→301, 301→308 | Negligible. Accepted 13 Sep as deliberate | None | — |
| 10 | `/404` itself returns 200 | `/404` | 200 + `noindex, nofollow`; unlinked; missing URLs return a true 404 | Cosmetic | None | — |
| 11 | `/privacy` meta description 173 chars | `/privacy` | only one over ~160 | Truncation only; Google says there is no length limit [G] | Fix alongside R0 | P3 |

**Checked and fine [M]:**

- **robots.txt:** `Allow: /` plus the sitemap.
- **Sitemap:** `sitemap-index.xml` → `sitemap-0.xml`, 9 URLs, exactly the routes.
- **Canonicals:** one self-referencing canonical per page, which stays clean with `?utm_…` and
  `?measure=&unit=`.
- **Indexability:** `index, follow` on all 9 pages. `.html`, `index.html` and trailing-slash
  variants 308 to the clean URL. http→https and www→apex both 301. URLs are case-sensitive
  (`/RING-SIZE-CHART` → 404), so there is no duplicate.
- **404s:** missing pages get a real 404 with `noindex`.
- **Links:** 0 broken internal links, 0 dead fragments, 0 internal links through a redirect.
- **Page structure:** one `<h1>` and one `<main>` per page. All titles and descriptions are unique.
  Every image has alt text.
- **Structured data:** all 56 FAQ JSON-LD questions and answers appear word for word in the
  visible HTML, and all JSON-LD parses.
- **Social tags:** OG/Twitter are complete, and `og.png` really is 1200×630.
- **Rendering:** all content is in the raw HTML (106 chart rows, all FAQs). The tool result is
  **server-rendered with defaults** (US 6 · L½ · 52 · 12), so it is not JS-dependent for crawlers.
  Googlebot-smartphone, bingbot, GPTBot, ClaudeBot and PerplexityBot get byte-identical HTML.
- **The `pages.dev` host:** sends `x-robots-tag: noindex, nofollow`, and its canonical points at
  the apex, so it poses no indexing risk (only the GA pollution in #2).
- **Speed basics:** br compression; hashed assets cached for a year as immutable; fonts preloaded.
- **hreflang:** none, which is correct (§12).

---

# 9. Keyword strategy

## Data and its limits

Source: **DataForSEO via OpenSEO, pulled 30 Sep 2026**, US (2840), UK (2826), Australia (2036),
India (2356), English. DataForSEO gives a synonym cluster one shared number. Rows showing the same
figure are **one cluster**, so never add them together. Earlier sources disagree with it, sometimes
badly, so every volume is **[UNV] as an absolute number** and useful only for ranking one keyword
against another:

| Keyword | DataForSEO (30 Sep) | Other source | Gap |
|---|---|---|---|
| `how to measure ring size at home` (US) | 14,800 | Semrush 90,500 (26 Sep) | 6× |
| `indian ring size chart` cluster (IN) | 6,600 | Semrush ~920 (26 Sep) | 7× |
| `ring size chart` (US) | 165,000 | Semrush 110,000 (26 Sep) | 1.5× |
| `ring size chart uk` cluster (UK) | 27,100 | Semrush ~32K cluster (26 Sep) | agrees |

Google Trends (29 Sep, `RESEARCH.md`) adds the direction that 12-month averages hide. `ring size
calculator` is down 63 % year on year and `printable ring sizer` is down 60 %. `ring size chart` is
sliding slowly (−26 %). `ring sizer` is flat. `how to measure ring size` is up about 105 %, but its
spikes may be partly automated traffic.

## Clusters, intent, target page

| Cluster | Key terms (vol. / KD, DataForSEO 30 Sep) | Intent | Page type | Target page | Status |
|---|---|---|---|---|---|
| Ring sizer / calculator | US: ring size · ring sizer · ring sizing 110K (one cluster), ring size tool 18.1K, ring size calculator 6.6K (KD 11), what is my ring size 2.4K, what ring size am i 1.9K, ring size finder 480 · UK: ring sizer 33.1K · AU 14.8K · IN 14.8K | Tool | Calculator | `/` | Correct. Authority-limited |
| Ring size chart | US 165K (KD 20) · UK 40.5K · AU 18.1K · IN 40.5K · conversion chart US 8.1K / UK 1.6K · ring size guide US 5.4K / UK 2.9K | Reference | Chart | `/ring-size-chart` | Correct. Pos 7 on the long tail |
| Units | ring size mm · in mm · mm to ring size 6.6K (one cluster) · in inches 3.6K · cm 2.9K · diameter 1.3K · circumference 1.3K · diameter→size 390 · circumference→size 320 | Lookup | Chart rows + typed tool | `/ring-size-chart` `#units` + tool | Correct. Already ranks pos 1–11 for exact-mm lookups |
| How to measure | how to measure ring size 74K (KD 16) · at home 14.8K (KD 7) · with string 720 · with paper 260 · measure finger size 1.3K (KD 35) | Method | Guide + embedded tool | `/how-to-measure-ring-size-at-home` | Correct. Brand SERP |
| Printable | printable ring sizer 33.1K (KD 7), −60 % YoY · UK 720 · AU 1.0K | Artefact | Printable tool | `/printable-ring-sizer` | Correct. Pos 52–72 |
| Averages / gender | womens ring size 6.6K · mens ring size 8.1K (KD 9) · average ring size 1.6K (KD 0) · UK 320 | Informational | Guide + chart sections | `/average-ring-size`, chart `#womens` `#mens` | Correct |
| **Letter scale (UK/IE/AU/NZ)** | **UK:** ring size chart uk · uk ring size chart · ring sizer uk 27.1K (one cluster), us ring size to uk 6.6K, uk ring size to us 3.6K, us to uk ring size 2.4K, ring size letters 880 · **AU:** australian ring size chart 4.4K, australian ring size 3.6K, australian ring size to us 1.3K, ring size letters 320 · **US:** uk ring size to us 1.6K, uk ring size 1.0K | Reference + conversion | Chart / system guide | chart `#uk` now (R5); `/uk-ring-size-chart` if R6 goes ahead | **Gap** |
| EU / ISO / FR | eu ring size US 390 / UK 320 · european ring size chart 140 · eu to us 70 · french 20 | Conversion | Section | chart `#eu` (R5) | Gap, small |
| Japan | japanese ring size 140 · japan to us 50 · japanese chart 50 (US) | Conversion | Section | chart `#japan` (R5) | Gap, small |
| India | IN: indian ring size chart · ring size chart india · ring size in india 6.6K (one cluster) [UNV, see above] · US: indian ring size chart 260 | Conversion | Section | chart `#india` (R5) | Gap. Conflicting volumes, lowest CPC |
| IT / ES / CH / BR | italian 30 · brazil 40 · swiss: no data · spanish: no data (US) | Conversion | Table column | chart columns | Enough as is |
| Secret / gift | find out someone's ring size secretly 20 (US) | Informational | FAQ | `/` FAQ | Decided: FAQ only |
| Edge cases | in between ring sizes 40 · does ring size change 40 · wide band: no data | Informational | Sections | `/` "Cases the number alone won't cover" | Covered |
| Wrong product | o ring size chart · nose ring gauges · cigar ring gauge · ring size adjuster (commercial) | — | — | none | Excluded on purpose |

**Do not target `ring size` alone as a primary.** It is one cluster with `ring sizer` and returns
the same SERP. The homepage title already carries `ring sizer`.

# 10. Competitor reverse engineering

## Who actually competes (not only famous jewellers)

| Topic | SERP today | Who ranks | What satisfies the intent |
|---|---|---|---|
| `ring size chart` (US, 30 Sep [M]) | AI Overview → PAA → 9 organic | Tiffany, Brilliant Earth, Macy's PDF, Wikipedia, Jared, Kay, Jewlr, a Facebook post | Big-brand chart pages. Brand SERP: no weak page in the top 10 |
| `ring sizer` / `online ring sizer` / `ring size calculator` (US, 29 Sep) | Tools on homepages | ringssizechart.com (#1 calculator), measureringsize.com (#1 online ring sizer, DR 5, 8–9 real links, all nofollow) | One interactive tool, answered on the homepage |
| `how to measure ring size at home` (26 Sep) | Brand guides + YouTube | Blue Nile, Brilliant Earth, Tiffany, Rare Carat, Gabriel NY | Brand guides; video |
| `ring size chart uk` (UK, 30 Sep [M]) | AI Overview → organic | theopal.co.uk, a wedding-rings.co.uk PDF, ifshe.co.uk blog, jewellerymonthly.co.uk (**2013**), astardiamonds.co.uk, ringsizecalculator.co.uk, ringchart.co.uk, a spam-looking fizzco.co.uk | **Weak.** No H.Samuel, Beaverbrooks or Goldsmiths among the first 8 organic results; small jewellers and exact-match niche sites win |
| `us ring size to uk` (UK, 30 Sep [M]) | AI Overview → PAA → organic | a secret-sizing blog, a size-guide page, 2 product pages, a poster shop, an iOS app, Temu | **Poor intent match.** Most results do not answer the question |
| `australian ring size chart` (AU, 30 Sep [M]) | Images → PAA → organic | hollowaydiamonds.com.au, **Pinterest**, onlineringsizecalculator.com `/countries/australia/` (a templated country page), Etsy, eBay | **Weak.** Marketplaces and pins |
| `indian ring size chart` (IN, 30 Sep [M]) | Images → organic | Malabar Gold, Tanishq PDF, Palmonas, **Pinterest**, PNG Jewellers, CaratLane, Joyalukkas | Indian jewellers' own charts, **which disagree with each other**: size 1 is 13.10 mm at Tanishq and 13.0 mm at PNG, going by their SERP snippets |

## Competitor by topic

| Topic | RingSizeTool | Main competitor | Their strength | Our gap | Opportunity |
|---|---|---|---|---|---|
| Tool | calibrated to card, quarter or euro; ring, finger or typed; 7 systems | measureringsize (#1 online ring sizer) | an older domain (its links date back to 2022), exact homepage match | authority, age | None on-page. Time + R10 |
| Calculator | same | ringssizechart (#1 calculator) | 1-year head start + a spam link profile we will not copy | authority | None on-page |
| Chart | 106 rows, computed, mm/cm/in | brand pages | DR 70–85 brands | authority | Long-tail lookups already won |
| Conversion | one big table, no per-system text | jewellers' tables | brand trust | **no per-system explanation** | **R5** |
| UK letters | column in the table + UK note + go-up rule | small UK jewellers | UK trust signals | **no dedicated letter-scale page** | **R6** |
| Printable | HTML, 50 mm check square, 2,359 words | PDFs (Macy's, wedding-rings) | brand, PDF convenience | authority | Keep |
| India | India column; `INDIA_NOTE` says no standard exists | Indian jewellers' charts | brand, local trust | no explanation page | R5 section; R12 later |

The full teardown of ringssizechart.com, measureringsize.com and ringsize.app is `SEO-AUDIT.md`
§7–9 and Appendix A. Their backlink profiles are in `RESEARCH.md` → "Backlinks". The #1 is mostly
comment, profile and bookmark spam. The DR-5 #1 has essentially no real links, which proves the
honest route can win; it takes time.

# 11. Content gap

| Gap | Worth filling? | Why |
|---|---|---|
| How each sizing system works (US, UK letters, EU/ISO, JIS, India, IT/ES/CH) | **Yes → R5** | Conversion queries exist in every market. Today the chart page answers them with a bare table |
| UK/AU letter scale in depth | **Yes, conditionally → R6** | Large, a different system, a weak SERP, and original verified data (§12) |
| Why Indian charts disagree (no national standard) | **Yes, as a section → R5** | Visible in today's SERP. Nobody explains it; `INDIA_NOTE` already does |
| Tool-usage data | **Yes → R2** | Not content, but the biggest blind spot |
| Named person or entity on `/about` | **Owner decision → R7** | Google asks for accurate authorship "where readers might expect it" [G]. The AdSense checklist asks for a real named person or entity |
| Secret sizing page | No | 20/mo (US). Already an FAQ answer |
| Smart ring (Oura/Colmi) page | No | Oura publishes no mm figures and tells buyers not to size from other rings (`RESEARCH.md`, 29 Sep) |
| Per-unit, per-pair, per-value pages | No | §17 |
| Actual-size-on-screen page | No | The SERP is homepage tools; the draft was deleted 29 Sep |
| `how to measure ring size without a ring sizer` | No | Homepage lede; every variant under 100/mo (28 Aug) |
| Wide-band calculator | No | No standard, and jewellers disagree even on the direction (7 Sep) |
| Men's / women's separate pages | No | Chart `#womens` / `#mens` plus `/average-ring-size` already serve them |
| Nose ring, cigar, O-ring, ring adjuster | No | Different products, or affiliate content without hands-on testing |

**Missing internal links:** see §15. The linking is largely done (`69520b1`, `c6b9931`). The only
new links needed are to and from the R5 anchors and the R6 page.

# 12. Country / international strategy

**Principle: build around sizing *systems*, not countries.** A country page earns its place only
when the system it uses differs and people search for that system. Otherwise it is the same table
with a new country name at the top. Google names that pattern as doorway abuse: *"Having multiple
domain names or pages targeted at specific regions or cities that funnel users to one page"* [G].

| Proposed page | 1. Intent differs? | 2. System differs? | 3. Terms differ? | 4. Local info needed? | 5. Unique value? | 6. Duplicates? | **Verdict** |
|---|---|---|---|---|---|---|---|
| `/us-ring-size` | No — it is the default | No (it IS the default) | No | No | No | the whole chart page | **No page** |
| `/canada-ring-size` | No | No (US scale) | No | No | No | chart | **No page** |
| **`/uk-ring-size-chart` (UK + IE + AU + NZ)** | **Yes** — letter look-ups and US↔UK in both directions | **Yes** — letters, half letters, Z+1… | **Yes** — "ring size letters", "L½" | **Yes** — UK jewellers use two scales, and there is a rounding rule | **Yes** — the 26 Sep UK jeweller check (L = 51.2 mm, M = 52.5 mm at Goldsmiths, Mappin & Webb, Beaverbrooks, Warren James; Signet brands run half a letter higher; "go up on a half letter") is published nowhere else | Partly — the chart's UK column | **One page, conditional → R6** |
| `/australia-ring-size` | Yes (AU queries) | **No** — same letters as the UK | Same | Same | No beyond the UK page | would be the UK page with the country swapped | **No separate page.** Cover AU inside the letter-scale page, in its H1/title |
| `/eu-ring-size` | Weak (390/mo) | Yes, but trivially: size = circumference in mm | "taille" (FR) | Little | Small | chart | **Section `#eu`** |
| `/japan-ring-size` | Weak in English (140/mo) | Yes (JIS) | No | Little | Small | chart | **Section `#japan`**. Japanese searchers search in Japanese, which is out of scope |
| `/india-ring-size` | Maybe (6.6K vs ~920, [UNV]) | Yes (1–37, no national standard) | No | **Yes** — the jewellers' charts disagree | Yes — the "no standard" explanation | chart column | **Section `#india` now; a page only if R12's trigger is met** |
| `/italy` `/spain` `/switzerland` `/brazil` | No (≤40/mo) | circumference − 40 | No | No | No | chart column | **No page, no section beyond one paragraph** |
| `/germany` `/korea` `/china` | No (≤50 or no data) | — | — | — | — | — | **Nothing** |

**R6's conditions, set on 26 Sep, checked again today:**

1. **It must be a complete destination, not a funnel to the tool.** That is a design constraint:
   the page must fully answer letter-scale questions on its own.
2. **The UK SERP must still show weak pages in the top 5** — **met on 30 Sep [M]** (§10).
3. **Authority should have grown** — **not met** (DR 0, one month old).

A new page on a weak SERP is where a low-authority site competes best, which argues against
waiting for condition 3. A new page also takes crawl attention and owner review time. The
recommendation is to **build it in the 31–60-day window if the owner agrees**. The 10 Oct GSC check
comes first, so the chart↔homepage swap is not confounded.

**2 Oct 2026: the owner said yes.** Drafted on branch `draft/uk-ring-size-chart` (`820c31f`), held
until the owner has read it and the 10 Oct check is done. See STATUS.md.

**2 Oct 2026, Ahrefs free Keyword Generator (owner's screenshots), exact term `ring size chart uk`:**
UK database **>1000** (Ahrefs' free buckets run <100 / >100 / >1000 / >10K, so this is 1K–10K);
US database <100. UK phrase match: 99 keywords, of which >100 each: `actual size ring size chart
uk`, `ring size chart uk to us`, `mens ring size chart uk`, `pandora ring size chart uk`. Questions
tab: 2 terms, both <100. **Read:** the 27.1K (DataForSEO) and ~32K (Semrush) above are CLUSTER
figures, i.e. Google Ads close variants pooled. The exact head term is in the low thousands. The page
is still justified (real UK demand on a weak SERP), but expectations should be based on a few
thousand searches a month, not 27K. And the US-locale QuestionFinder "0" was the wrong market,
not missing demand.

**hreflang: no.** Google uses hreflang for *"multiple versions of a page for different languages or
regions"* [G]. This site has one English version of each page, so there is nothing to annotate. The
Search Console International Targeting report is deprecated [G]. Google also *"ignores locational
meta tags"* [G]. Multilingual versions stay rejected (27 Aug; measureringsize.com's ten language
folders earn about 15 visits a month).

# 13. Topical authority

```
MAIN TOPIC: ring sizing, computed from the standards
│
├── TOOL (tier 1)            /  — measure a ring, a finger strip, or type a number
│
├── REFERENCE (tier 2)       /ring-size-chart — every size, every system
│     ├── by sex            #womens · #mens
│     ├── by unit           #units (mm / cm / in, diameter vs circumference)
│     ├── by system  (R5)   #us · #uk · #eu · #japan · #india · #it-es-ch
│     └── letter scale (R6) /uk-ring-size-chart  ← only conditional child page
│
├── ARTEFACT (tier 2)        /printable-ring-sizer
│
├── METHOD (tier 3)          /how-to-measure-ring-size-at-home (embeds the tool)
│
└── CONTEXT (tier 3)         /average-ring-size · homepage "Why two charts disagree" · "Cases…"
```

Authority here comes from being right, not from volume. The site's differentiator is verifiable
correctness: the homepage shows a competitor printing "EU 51.8" (not a size), and "four ring size
sites give three different UK answers". That is also the natural reason anyone would link to it
(R10).

# 14. On-page SEO

Live values from the §8 crawl [M]. "Words" is visible text in `<main>`.

| Page | Title (chars) | Description | H1 | H2s | Words | Decision |
|---|---|---|---|---|---|---|
| `/` | `Online Ring Sizer — Free Ring Size Finder \| Ring Size Tool` (58) | 160 | "Free online ring sizer, calibrated to your screen" | 9 | 5,351 | **Keep.** Title live since 6 Sep; the 17 Sep head-term drop was not caused by it (§23). Only R3 + R2 touch this page now |
| `/ring-size-chart` | `Ring Size Chart Online — MM, CM & Inches \| Ring Size Tool` (57) | 157 | "Ring size chart" | 6 | 2,467 | **Keep title; add R5 sections** after 10 Oct. The 7-column table already carries US/UK/EU/JP/India/IT-ES-CH/Brazil; what is missing is the text explaining each system |
| `/how-to-measure-ring-size-at-home` | `How to Measure Ring Size at Home \| Ring Size Tool` (49) | 157 | "How to measure your ring size at home" | 11 | 2,162 | **Keep.** Exact match, embeds the tool, correct canonical. The limit is a brand SERP, not the page (26 Sep) |
| `/printable-ring-sizer` | `Free Printable Ring Sizer and Size Chart \| Ring Size Tool` (57) | 155 | "Printable ring sizer" | 10 | 2,291 | **Keep.** Deepened 7 Sep; main keyword shrinking (−60 % YoY, Trends) |
| `/average-ring-size` | `Average Ring Size for Women and Men \| Ring Size Tool` (52) | 153 | "Average ring size" | 6 | 1,128 | **Keep.** "Do not expand" (6 Sep) still holds |
| `/about` | `About — Ring Size Tool` (22) | 144 | "About" | 4 | 503 | **R7** (identity). Title fine for a utility page |
| `/contact` | `Contact — Ring Size Tool` (24) | 149 | "Contact" | 1 | 40 | Keep (utility, thin by design) |
| `/privacy` | `Privacy Policy — Ring Size Tool` (31) | **173** | "Privacy Policy" | 7 | 653 | **R0** (make it true); trim the description in the same change |
| `/terms` | `Terms of Service — Ring Size Tool` (33) | 146 | "Terms of Service" | 6 | 173 | Keep |

Semantic coverage is not the gap. The homepage alone covers calibration, three sources, seven
systems, averages, both methods, why charts disagree, and edge cases. **The prompt's "maximum
useful information with minimum unnecessary content" test** points at only two places:

- the homepage is ~20,000 px tall at 375 px (about 25 screens). This is fine *below* the tool, but
  it is why the tool's first-screen position matters (§16).
- the near-duplicate FAQ pair (§8 #5).

Calculator placement: the tool is on `/` and embedded on the how-to page. Every other content page
links to it in prose (chart ×3, average, printable). CTAs: "Start Measuring ↓" and "View Size
Chart" on `/`, and "Get Started" in the header on every page (→ `/#tool-heading`). All resolve (§8).
The only CTA defect is R3.

External references: the chart page's `#sources` table names each standard (ISO 8653, JIS S 4700,
the attributed UK rule, ABNT NBR 16058) without outbound links. Most of those texts are paywalled,
so a link would not help a reader verify anything. No change.

# 15. Internal linking

The link graph was rebuilt on 13 and 27 Sep (`69520b1` cross-linking, `c6b9931` dead anchors → 0),
and the §8 crawl found no broken internal links. Only these additions are needed, all tied to R5
and R6:

| From | To | Anchor theme | When |
|---|---|---|---|
| `/` result grid, "Why UK and India can differ" `<details>` | `/ring-size-chart#uk` (then `/uk-ring-size-chart` once built) | "how UK letter sizes work" | with R5 |
| `/` result grid, same `<details>` | `/ring-size-chart#india` | "why Indian charts disagree" | with R5 |
| `/ring-size-chart` `#uk` section | `/uk-ring-size-chart` | "full UK & Australian letter chart" | with R6 |
| `/uk-ring-size-chart` | `/` | "measure your size in letters on screen" | with R6 |
| `/uk-ring-size-chart` | `/printable-ring-sizer` | "print a sizer (UK letters on the sheet)" | with R6, if the sheet carries letters |
| `/uk-ring-size-chart` | `/ring-size-chart` | "every other system" | with R6 |

Rules, unchanged from `SEO-AUDIT.md` §17: contextual links inside prose, no link blocks, utility
pages in the footer only, and never the same anchor twice on one page for one target. Google:
*"Good anchor text is descriptive, reasonably concise, and relevant"* [G]. It also warns against
cramming keywords into anchors [G].

# 16. Tool usage optimisation

## The journey, as measured on a 375 × 812 viewport [M, in-app browser, 30 Sep]

| Step | Where on the page (y, px) | Screens from top | State |
|---|---|---|---|
| Hero + "Start Measuring ↓" | 0–~900 | 0–1.1 | clear promise, one primary CTA |
| Tool heading `#tool-heading` | 1,489 | 1.8 | **its H2 lands under the 122 px sticky header after the CTA jump** (R3) |
| Calibrate (card / quarter / euro) | ~1,600–2,850 | 2–3.5 | open by default for first-time visitors |
| "What do you have?" source picker | 2,898 | 3.6 | ring / finger / measurement |
| Ring canvas + slider | ~3,300–3,908 | 4–4.8 | life-size ring on a 1 mm grid |
| Result grid | 3,964 | 4.9 | US, UK/AU, EU/ISO/FR, JP; then India, IT/ES/CH |
| Next action | below result | — | "Show Size Chart ↓", Calibrate, `<details>` notes |

The tool is complete and correct. It was driven end to end on a real Android phone on 31 Aug and
audited on 21 Sep. What is **unknown** is where people drop out. It could be at calibration (no card
to hand?), at the source picker, or before they scroll at all. Redesigning the flow without that
data would be the "confident moves" the owner asked to stop making. So:

1. **R2 first:** instrument the journey (events below).
2. **R3:** the anchor offset, a zero-risk defect fix.
3. **After four weeks of event data** [EXP], decide between two changes. One: surface the tool
   higher on mobile (for example, drop the second CTA row or shorten the hero on small screens).
   Two: add a "skip calibration — I'll type a number" path for visitors who already have a number.
   Test the one the data points to.

## Fix the input layer before measuring it (R16)

`QA-AUDIT-2026-09-30.md` (a separate session, same day) reproduced four input-layer bugs, each a
path to a confidently wrong size. **#2 re-verified here [M]**, in Chromium en-US on the live site:
`#ring-num` receives `17,35`, holds `1735`, and on blur shows `24.35` → US 15¾ / UK Z+6. The
others are taken from that audit and not re-verified here:

| QA # | Bug | Why it matters to this strategy |
|---|---|---|
| 2 | Comma decimal silently becomes a large number | Comma-decimal markets (continental Europe, Brazil, Latin America, Indonesia) are a small share of impressions today, but they are exactly the international audience this strategy targets |
| 3 | Out-of-range values clamp silently and display as a real size | Same failure: a wrong size with no warning |
| 4 | Wrong-measure hint goes stale; following it can yield US 15¾ | Undermines the "wrong unit" safety net |
| 5 | "Reset" marks the screen as calibrated | The ✓ badge is the site's accuracy claim; here it would be false |
| 6 | Japan sizes attributed to JIS S 4700 as "1–35", while the audit says that standard defines circumference sizes 41–76 | **Blocks R5's `#japan` section**; fix the citation first |

R16 comes **before** R2's events are read. Otherwise the first month of tool-usage data measures
a tool that sometimes gives confidently wrong answers. The two can ship in the same week.

## Events for R2 — minimal, no measurements sent

| Event | Fires when | Parameters | Why |
|---|---|---|---|
| `sizer_calibration_saved` | "Save Scale" pressed | `object`: card / quarter / euro | calibration completion rate |
| `sizer_source_selected` | a "What do you have?" card is chosen (not on boot, not on a re-click) | `source`: ring / finger / number | which route people take |
| `sizer_measure_started` | first slider, ± or number-input change per page view | `calibrated`: yes / no | tool starts; share measuring uncalibrated |
| `sizer_mode_changed` | measure or unit radio changes by the visitor (pill or hint button) | `measure`: dia / circ, `unit`: mm / cm / in | whether the unit switches are used |
| `printable_print` | the print dialog opens on `/printable-ring-sizer` (`beforeprint`) | `via`: button / browser | printable conversions |

**Implemented 1 Oct 2026 (committed, not yet deployed)**, with R1 and R3, and driven in a browser
with a stubbed `window.gtag`. Re-clicks, boot and the source↔measure sync fire nothing. Two ±
clicks give one `sizer_measure_started`. Nothing fires, and nothing errors, when gtag is absent.
The owner then marks `sizer_measure_started` and `sizer_calibration_saved` as key events in GA4
Admin. **No measured values are sent** (no diameter, no size). A size is not personal data, but the
site has no reason to collect it. If it ever wants to publish "the median size our visitors
measure", that becomes a deliberate, disclosed decision later (R10, P3). The privacy page changes
in the **same commit**, per the standing rule from 21 Sep.

# 17. Programmatic SEO

Every template the prompt lists was evaluated. None passes.

| Template | User intent | Unique data per page | Unique value | Duplication risk | Google risk | **Decision** |
|---|---|---|---|---|---|---|
| diameter → size (`/16-5-mm-ring-size`…) | real (exact-mm lookups rank) | one table row | none beyond the row | very high | scaled content: *"many pages are generated for the primary purpose of manipulating search rankings and not helping users"* [G] | **No.** The chart rows already rank pos 1–11 for these exact strings [M, GSC] |
| circumference → size | real | one row | none | very high | same | **No** |
| size → diameter / circumference (`/size-7-ring-in-mm`) | real | one row | none | very high | same | **No** |
| per-country pages | weak except UK/AU | the country name | none | very high | doorway: *"pages targeted at specific regions or cities that funnel users to one page"* [G] | **No** (letter-scale page R6 is a system page, hand-written, one only) |
| conversion pairs (`/us-to-uk-ring-size`, `/eu-to-us`…) | real, small | one column pair | none | very high | doorway + scaled | **No.** R5 anchors instead |
| per-unit tool pages (`/ring-sizer-in-mm`) | chart-flavoured | a multiplier | none | high | thin variation | **No.** No competitor has them either (6 Sep) |

The evidence that one page is enough: GSC already shows `/ring-size-chart` at pos 1 for `16.31 mm
ring size` and `22.61 mm ring size`, and at pos 3–11 for other exact values, from a single table.
A page per value would compete with that table. It would not add to it.

# 18. Schema

What the site emits today (§8 crawl): **WebApplication, FAQPage, HowTo, BreadcrumbList,
Organization, WebSite**. The Google status of each, verified live on 30 Sep:

| Type | Google rich result today | Recommendation |
|---|---|---|
| FAQPage | **Retired.** *"This feature will no longer appear in Google Search starting May 7, 2026"*; docs removed June 2026 [G] | Keep the visible FAQs: they are real People-Also-Ask questions and good content. Keep the markup: *"Structured data that's not being used does not cause problems for Search"* [G]. **Spend no more effort on FAQ schema.** Whether to remove it: [UNV], and not worth a change |
| HowTo | **Retired** in Sept 2023 [G] | Same: harmless, no work |
| WebApplication | Software App rich result **requires `aggregateRating` or `review`** [G] | Keep it as a truthful description. **Never add ratings** without real, visible user reviews. Google: *"Don't include fake or undisclosed incentivized reviews"* [G] |
| BreadcrumbList | Shown **on desktop only**; needs ≥ 2 items [G] | Keep on inner pages. The homepage's 1-item list was removed 26 Sep, which was correct |
| Organization | No required properties; home page is enough [G] | Keep |
| WebSite | Must be on the home page; generic names are *"unlikely to be selected"* as a site name [G] | **R13 (P3):** add `alternateName: "ringsizetool.com"`. "Ring Size Tool" is a descriptive name of the kind Google says is unlikely to be picked |

**Do not add:** Review, AggregateRating, Product, Service, SearchAction, or any type describing
something the page does not visibly show. Google: *"Your structured data must be a true
representation of the page content"* [G].

# 19. Performance

**Measured [M]:** Lighthouse 13.5.0, run locally on 30 Sep against the live URLs. Mobile form factor
with simulated throttling (Moto G class, 150 ms RTT, ~1.6 Mbps, 4× CPU). These are lab numbers from
one machine, not field data.

| Page | Runs | Performance | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| `/` | 3 | **72 / 77 / 78** | 2.7 / 1.8 / 1.6 s | **6.0 / 5.2 / 5.2 s** | 60–120 ms | 0 |
| `/ring-size-chart` | 1 | **99** | 1.0 s | 2.0 s | 30 ms | 0 |
| `/` on 7 Sep (Lighthouse 13.4.1, `SEO-AUDIT.md` §19) | 1 | 88 | — | 3.2 s | 0 ms | 0 |

What Lighthouse attributes it to on `/`:

- `googletagmanager.com/gtag/js`: 177 KB, of which **73 KiB is unused**. GA4 was added on 21 Sep,
  after the 7 Sep baseline.
- Render-blocking `Layout.*.css`, 10 KB (estimated saving 590 ms in simulation).
- `hero-ring-hand.webp`, 84 KB, with an estimated 69 KB saving from recompression.
- `static.cloudflareinsights.com/beacon.min.js`: a second analytics beacon (Cloudflare Web
  Analytics), 10 KB transfer, injected at the edge. The privacy page denies it exists. R0 removes it.
- **The mobile LCP element is text** (the hero lede paragraph), with a 2.1 s element render delay.
  Bandwidth contention and render-blocking CSS matter more for it than the image does.

**Field data (CrUX): [UNV].** The site is too new and too small to have any. The GSC Core Web
Vitals report most likely says "not enough data"; the owner should confirm. Google: CWV *"are used
by our ranking systems"*, but good scores *"doesn't guarantee"* top rankings, and relevance wins
even when page experience is sub-par [G]. So this is a real input, but a tie-breaker.

**R8 [EXP]:** try loading gtag after `load` (or on idle) and recompressing the hero image. Keep each
change only if Lighthouse LCP improves across 3 runs **and** GA4 Realtime still records page views.
Run the baseline after R0, so the removed beacon is not credited to R8.

# 20. Mobile UX

Checked on 375 × 812 in the in-app browser [M]. This is **not a real phone**. The last real-device
run was the owner's Android on 31 Aug.

| # | Finding | Severity | Fix |
|---|---|---|---|
| 1 | Sticky header is **122 px** tall on mobile (logo row + nav row). In-page anchors (`#tool-heading`, `#chart`, the header's "Get Started" → `/#tool-heading`) scroll the target to y = 0. The tool's H2 "What is my ring size?" ends up at y = 93, **hidden under the header** | Low, but on the primary CTA | **R3:** `scroll-margin-top` on anchor targets (e.g. a global `[id] { scroll-margin-top: … }` sized to the header). Zero risk |
| 2 | The tool starts about 1.8 screens down and the result appears about 4.9 screens down | Unknown — not measured | R2 first, then [EXP] (§16) |
| 3 | Calibration card is portrait on narrow screens; drawer open by default | OK | Verified on a real phone 31 Aug |
| 4 | Touch targets ≥ 44 px on the ± buttons; no horizontal scroll at 375 px | OK | Verified 21 Sep audit |
| 5 | Result grid readable: 4 main cards + a secondary row + precision note | OK | — |
| 6 | Mobile nav is a second header row (4 links). At 375 px the 4th label read "Printabl…", clipped at the edge (QA audit #14 found the same at 320–390 px; its #10 finds the desktop header overflowing at 768–~800 px). The row is `overflow-x-auto` with a **hidden scrollbar**, so it scrolls, but nothing signals that it does. The code comment assumes all four fit | Low | Check on the owner's phone. If it clips there too, tighten `gap`/padding so all four fit; don't add a menu |

# 21. Off-page strategy

**Standing rule (owner, 29 Sep): no email outreach, no pitching, no HARO-style platforms.**
Everything here is non-email and passes Google's link-spam policy [G, §28].

| Channel | Why it fits this site | Evidence | Priority |
|---|---|---|---|
| **Pinterest** — pins of the printable sheet and chart images, each linking to its page | Pinterest pins are the **2nd organic result for `australian ring size chart` (AU)** and the **4th for `indian ring size chart` (IN)** today | [M] SERPs 30 Sep | P2 |
| Genuine Reddit / Quora answers where someone asks how to size a ring or convert US↔UK — answer in full, link only when it helps, disclose it is your site | Real questions exist; referral + brand, not PageRank (links are usually nofollow) | [BP] | P2 |
| One-off launch listings — Product Hunt, AlternativeTo (as an alternative to plastic sizers / ring-size apps), Show HN with the "a unit is not a size" test | A tool with a technical story | [BP] | P3 |
| A short demo video (calibrate → measure → size) on YouTube / Shorts | Method SERPs carry video blocks (IN SERP 30 Sep; RESEARCH 28 Aug on method queries) | [M]/[BP] | P3 |
| Later: an original-data piece (e.g. "how far apart published charts are", which the homepage already demonstrates) | This is what people cite; it needs traffic before it can be promoted without email | [BP] | P3 |

**Never:** comment, profile, forum or bookmark links. That is exactly what the #1 competitor does,
and Google lists *"Forum comments with optimized links"* and *"Low-quality directory or bookmark site
links"* as link spam [G]. Also never paid links, link exchanges, or link-carrying widgets.

# 22. AdSense-safe SEO

Google documentation, SEO best practice and this document's recommendations are kept separate here.

| Risk | Present today? | Evidence | Google documentation | Recommendation |
|---|---|---|---|---|
| Thin / low-value pages | **No** | 9 pages; content pages 1,128–5,351 words in `<main>`, utility pages 40–653; sitemap = routes (§8) | ads not allowed on screens *"with low-value content"* [G] | Keep every new page hand-written and complete |
| Doorway / scaled pages | **No** | no templates, no per-country pages | doorway + scaled-content definitions [G] | §12 / §17 decisions keep it that way |
| Copied content | **No** | every number computed; competitor charts never copied (house rule) | *"without additional commentary, curation, or otherwise adding value"* [G] | Keep |
| Misleading claims | **Yes — one** | `/privacy` denies the live Cloudflare beacon (§8 #1). Hero badge softened 13 Sep | *"should not claim that they provide content or services that they do not have"* [G] (the nearest verified line; the privacy error is the reverse — concealing something it does) | **R0.** Then re-check the privacy page with every tracking change (R2), **including dashboard toggles that never touch the repo** |
| Fake structured data | **No** | no ratings; FAQ text matches visible text (§8) | *"true representation of the page content"* [G] | Never add ratings |
| Ads near the calculator | N/A (no ads) | — | *"Be careful when placing … navigation buttons…, drop-down menus, or applications near ads"* [G] | When ads come: **no unit inside the RingSizer card, none between the ring canvas and the result grid, none in the sticky header**; the first unit goes below the tool's result and next-action block |
| Ads mistaken for navigation | N/A | — | *"mistaken for other site content, such as a menu, navigation, or download links"* [G] | Label as "Advertisements"; no ads beside the print button |
| **UK/EEA consent** | **Relevant now for GA4; mandatory for ads** | UK is the #3 market; GA4 sets `_ga` cookies today with no consent banner | Personalised ads in the EEA/UK need a Google-certified TCF CMP (since 16 Jan 2024) [G]; the EU user consent policy requires consent for cookies *"where legally required"* [G] | **R9:** owner decision. Whether GA4 without consent is lawful for UK visitors is a legal question, [UNV] here. Google's own Privacy & messaging CMP is certified [G] |
| Unnamed site owner | **Yes** | `/about` names no person or entity | *"We strongly encourage adding accurate authorship information"* [G] | **R7:** owner decision; never invent a person or credentials |

# 23. Quick wins

| # | Quick win | URL / file | Change | Effort | Purpose | Priority |
|---|---|---|---|---|---|---|
| R0 | Make `/privacy` true | Cloudflare dashboard → Pages → ringsizetool → Web Analytics (owner) **or** `src/pages/privacy.astro` | turn the edge-injected beacon off (recommended: GA4 already covers analytics), or disclose it; trim the 173-char description | XS | the page currently says a live script does not exist [M] | **P0** |
| R16 | Fix the tool's input layer | `src/components/RingSizer.astro` | QA audit #2–#5: accept comma decimals, say when a value is clamped, clear/convert the stale hint, make Reset return to "not calibrated" (+ `verify`/browser tests) | S | stops confidently wrong sizes, above all for comma-decimal countries [M for #2] | **P0 (tool)** |
| R1 | Stop non-production hits in GA4 | `src/layouts/Layout.astro` (gtag block) | load/config gtag only when `location.hostname === 'ringsizetool.com'` | XS | clean analytics; GA4 shows `localhost` (23 page views) and `ringsizetool.pages.dev` (4) for 21–29 Sep [M] | **P1** |
| R2 | Measure the tool | `RingSizer.astro`, `printable-ring-sizer.astro`, `privacy.astro` | the 5 events in §16 + privacy text, one commit | S | makes goal 2 measurable | **P1** |
| R3 | Anchor offset under the sticky header | `src/styles/global.css` | `scroll-margin-top` on anchor targets | XS | the primary CTA stops hiding the tool heading | **P1** |
| R4 | Decision checkpoints | GSC via OpenSEO | 10 Oct: chart↔homepage swap. 21 Oct: chart CTR / title question | XS | no blind title changes | **P0 (process)** |
| R15 | Bing check | bing.com `site:` | re-check ~4 Oct (still 0 indexed on 30 Sep [M]); then re-run the 3 Perplexity prompts from 27 Sep | XS | AI visibility | P2 |
| R8 | Performance test | `Layout.astro`, hero image | defer gtag; recompress hero; measure 3 runs each | S | recover mobile LCP | P2 [EXP] |
| R13 | Site-name hint | `Layout.astro` WebSite | `alternateName: "ringsizetool.com"` | XS | generic-name risk [G] | P3 |

**Not a quick win, and deliberately absent: title or meta rewrites.** The homepage title has been
live since 6 Sep. The head-term drop on 17 Sep was Google's own re-evaluation (nothing was deployed
13–21 Sep, and Manual actions and Security issues are clean). The chart page's 0 clicks at pos 7.3
are at the edge of statistical noise, and 90 % of its queries are hidden, so any new title would be
written blind. Decide after 21 Oct (R4).

# 24. 30-day plan (1–31 Oct 2026)

| When | Action | Who |
|---|---|---|
| Day 1 | **R0:** turn Cloudflare Web Analytics off in the Pages dashboard (or tell Claude to disclose it instead); verify the live HTML no longer carries `cloudflareinsights` | Owner (dashboard), Claude verifies |
| Week 1 | **R16** — QA audit #2–#5 (input layer), then #6 (JIS citation) — driven in a real browser after each fix, since `verify` cannot click | Claude, owner approves |
| Week 1 | **R1 + R2 + R3** in one small, reviewed change set; verify, build, check at 375 px light and dark; push (substantial: it changes what is measured) | Claude, owner approves |
| Week 1 | GA4 Admin: mark `sizer_measure_started` and `sizer_calibration_saved` as key events; add an internal-traffic filter for the owner's IP | Owner |
| ~4 Oct | Bing `site:` check (R15) | Claude |
| ~10 Oct | GSC: is the chart→homepage swap real? (19–23 Sep chart 90 / home 11; 24–29 Sep chart 37 / home 54 [M]) | Claude |
| after 10 Oct | **R5** draft: per-system sections on `/ring-size-chart`, every number from `ringSizes.ts`, new `verify` assertions for any new figure; the owner reads before ship | Claude drafts, owner reads |
| Week 2–3 | **R8** performance experiments, measured | Claude |
| ~21 Oct | GSC: chart CTR/title decision (only if ~350+ impressions and still 0 clicks → propose options) | Claude proposes |
| Week 4 | Owner decisions: **R7** (/about identity), **R6** (letter-scale page go / no-go), **R9** (consent approach) | Owner |

# 25. 60-day plan (Nov 2026)

| Action | Condition |
|---|---|
| **R6** `/uk-ring-size-chart` — UK & Australian letter scale: full A–Z+ letter chart with half letters (computed), mm circumference and diameter, US↔UK both ways, the two UK jeweller scales, the go-up rule, AU/NZ/IE note; links per §15 | Owner said yes in October; §12 conditions 1–2 hold; hand-written, owner reads before ship |
| Read the first 4 weeks of R2 event data; pick the one tool-flow change the data points to (§16) and test it | ≥ 4 weeks of events |
| **R10** start: Pinterest pins for the printable and the chart; genuine answers where a real question exists | Owner has the time; no email |
| Monthly GSC pull (early Nov): weekly impression rate, visible-query share, UK/AU queries | — |

# 26. 90-day plan (Dec 2026 → 1 Jan 2027)

| Action | Condition |
|---|---|
| Measure R5/R6: do `#uk`/`#india` or the letter page earn UK/AU/IN impressions? | — |
| **R12** India page decision: build only if GSC shows Indian-size queries reaching the chart (e.g. `indian ring size`, `ring size in india`) **and** the owner accepts the lowest-RPM market | evidence, not volume estimates |
| **R11** AdSense readiness review — see §27 | R7 and R9 decided |
| **Kill-criteria review, 1 Jan 2027:** is the site above 500 impressions a month in December (month 4)? | Factory rule 5 |
| One-off launch listings (Product Hunt / AlternativeTo / Show HN) | Owner's choice |

## Measurement framework (the prompt's Phase 26)

| Objective | Metric | Source | Cadence | Decision it feeds |
|---|---|---|---|---|
| Organic traffic | weekly impressions (not cumulative), clicks, CTR by page, avg. position, visible-query share | GSC via OpenSEO (free) | monthly; checkpoints 10 Oct, 21 Oct | titles (R4), kill review |
| | impressions by country (discount Pakistan), by device | GSC | monthly | R6, R12 |
| Tool usage | `sizer_measure_started` / page views of `/` and `/how-to…` = tool-start rate | GA4 (after R2) | monthly | §16 experiment |
| | `sizer_calibration_saved` / `sizer_measure_started` = calibration rate | GA4 | monthly | "skip calibration" test |
| | `sizer_source_selected` split; mobile vs desktop | GA4 | monthly | entry design |
| | landing page → tool start | GA4 (event × landing page) | monthly | internal links |
| Monetisation | (after approval) RPM, impressions, viewability, and **tool-start rate before vs after ads** | AdSense + GA4 | monthly | ad density; remove any unit that lowers tool starts |

GA4 is the analytics tool of record: it carries the events and feeds the OpenSEO integration.
Cloudflare Web Analytics duplicates it, and it is the beacon the privacy page denies. R0 turns it
off.

# 27. Priority matrix

| ID | What | Where | Priority | Effort | Evidence | Owner decision? |
|---|---|---|---|---|---|---|
| R0 | Privacy page vs live Cloudflare beacon | Pages dashboard / `privacy.astro` | **P0** | XS | [M] served HTML vs `/privacy` text | **yes** (off, or disclose) |
| R16 | Tool input-layer bugs (QA audit #2–#5, then #6) | `RingSizer.astro`, citation copy | **P0 (tool)** | S | [M] #2 re-verified; rest per QA audit | approve |
| R4 | GSC checkpoints before any title change | GSC | P0 | XS | [M] small samples; lesson of 21/26 Sep | no |
| R1 | GA4 hostname gate | `Layout.astro` | P1 | XS | [M] GA4 hostnames | no |
| R2 | Tool-usage events + privacy text | `RingSizer.astro`, printable, `privacy.astro` | P1 | S | [M] 0 custom events; [BP] | approve |
| R3 | Anchor scroll offset | `global.css` | P1 | XS | [M] 122 px header / H2 at 93 px | no |
| R5 | Per-system sections + anchors | `/ring-size-chart` | P1 | M | [M] SERPs; [UNV] volumes; [G] "substantial value when compared to other pages" | reads before ship |
| R7 | Name a real person or entity on `/about` | `/about` | P1 (decision) | XS | [G] authorship line; AdSense checklist | **yes** |
| R6 | UK & Australian letter-scale page | new `/uk-ring-size-chart` | P1 (decision) → build P2 | M | [M] weak SERP; [G] doorway wording; [UNV] volumes | **yes** |
| R8 | Performance experiments | `Layout.astro`, hero | P2 | S | [M] lab; [G] CWV used; [EXP] | no |
| R9 | Consent approach for UK/EEA | site-wide | P2 now, P0 before ads | S–M | [G] CMP rule; legal [UNV] | **yes** |
| R10 | Non-email authority | off-site | P2 | ongoing | [M] Pinterest in SERPs; [BP] | owner's time |
| R15 | Bing re-check + Perplexity re-run | — | P2 | XS | [M] Bing 0 indexed | no |
| R11 | AdSense application gate | — | P3 | — | [G] policies; thresholds are mine | **yes** |
| R12 | India page | new | P3 | M | [UNV] 6.6K vs ~920 | **yes** |
| R13 | WebSite `alternateName` | `Layout.astro` | P3 | XS | [G] site-names doc | no |

## Recommendation cards (the prompt's decision framework)

**R0 — make the privacy page true**
- WHAT: the site either stops loading Cloudflare Web Analytics, or says that it does.
- WHERE: Cloudflare dashboard → Workers & Pages → ringsizetool → Metrics / Web Analytics (owner
  only); otherwise `src/pages/privacy.astro` → "Analytics" and its meta description.
- WHY: every page serves `static.cloudflareinsights.com/beacon.min.js` (with the comment `<!--
  Cloudflare Pages Analytics -->`), while `/privacy` says *"there is no Cloudflare Web Analytics and
  no other tracker"* [M]. The beacon is not in the repo, so no code review could have caught it.
- HOW: **recommended — switch it off.** GA4 already provides the data, and GA4 is what R2 builds on.
  That also removes a request from every page (§19). Afterwards, curl a page and confirm
  `cloudflareinsights` is gone. If the owner prefers to keep it: it is cookieless, so the cookie
  list stays true, but the "only measurement script" sentence must change in the same deploy.
- SEO PURPOSE: none directly. TOOL-USAGE PURPOSE: none.
- ADSENSE IMPACT: removes a publisher-accuracy weakness before any review.
- PRIORITY: P0. EVIDENCE: [M].

**R1 — GA4 hostname gate**
- WHAT: fire GA4 only on the production host.
- WHERE: `src/layouts/Layout.astro`, the gtag `<script>` block (lines ~197–205).
- WHY: GA4 page-performance for 21–29 Sep shows `localhost` (16 + 3 + 2 + 1 + 1 page views) and
  `ringsizetool.pages.dev` (4) beside the real host [M]. `NOINDEX_SITE` no longer separates builds,
  because it is `false` everywhere.
- HOW: wrap the loader and `gtag('config')` in `if (location.hostname === 'ringsizetool.com')`, or
  inject the `<script src>` from the inline script under the same condition.
- SEO PURPOSE: none directly — it keeps the data honest.
- TOOL-USAGE PURPOSE: R2's rates would otherwise include every local test run.
- ADSENSE IMPACT: none.
- PRIORITY: P1. EVIDENCE: [M].

**R2 — tool-usage events**
- WHAT: the 5 events in §16, no measured values.
- WHERE: `src/components/RingSizer.astro` (calibration save, source radiogroup, first value change,
  mode radios), `src/pages/printable-ring-sizer.astro` (print button), `src/pages/privacy.astro`.
- WHY: goal 2 has no data. GA4 has only the default `purchase` key event and no custom definitions
  [M].
- HOW: `window.gtag?.('event', name, params)`. It must be a no-op when gtag is absent (R1 hosts,
  blocked scripts). Fire `sizer_measure_started` once per page view. Update the privacy page in the
  same commit. Then drive the tool in the browser, per STATUS.md: `verify` cannot click.
- SEO PURPOSE: lets content decisions follow tool behaviour, not guesses.
- TOOL-USAGE PURPOSE: this is the measurement.
- ADSENSE IMPACT: later, "did ads lower tool starts?" becomes answerable.
- PRIORITY: P1. EVIDENCE: [M] + [BP].

**R3 — anchor offset**
- WHAT: in-page targets clear the sticky header.
- WHERE: `src/styles/global.css`.
- WHY: at 375 px the header is 122 px and the tool's H2 lands at y = 93, underneath it [M].
- HOW: `scroll-margin-top` on elements with an `id` (or on section headings), sized to the header,
  with a smaller value from `md` up. Check `#tool-heading`, `#chart`, `/#tool-heading` from
  another page, and the chart page's anchors.
- SEO PURPOSE: none directly. TOOL-USAGE PURPOSE: the main CTA lands on a readable tool.
- ADSENSE IMPACT: none. PRIORITY: P1. EVIDENCE: [M].

**R5 — per-system sections on the chart page**
- WHAT: one short section per sizing system — US/Canada, UK/IE/AU/NZ letters, EU/ISO/France, Japan,
  India, Italy/Spain/Switzerland/Brazil. Each covers how the system is defined, a worked conversion
  both ways, the known disagreements, and a link to measure.
- WHERE: `/ring-size-chart`, after `#full`, with anchors `#us #uk #eu #japan #india #it-es-ch`.
- WHY: conversion queries exist in every market (§9). The page answers them with a bare table.
  `SEO-AUDIT.md` recommended the anchors on 6 Sep and they were never built (the §8 crawl found
  none). The prompt's own Phase 11 question 7 answers "section on a main chart" for every system
  except letters.
- HOW: prose written from `ringSizes.ts`'s existing notes (`UK_NOTE`, `INDIA_NOTE`, the ISO/JIS
  comments). Every figure is rendered from the data module. New assertions go in `verify-sizes.ts`
  for any figure not already asserted. There is no new FAQ schema (it is retired). The owner reads
  it before it ships. Do it after the 10 Oct check.
- SEO PURPOSE: captures `us ring size to uk`, `eu ring size`, `japanese ring size` and
  `indian ring size` on a page that already holds pos 7.
- TOOL-USAGE PURPOSE: each section ends with "measure yours" → `/`.
- ADSENSE IMPACT: positive. It deepens an existing page and adds no URLs.
- PRIORITY: P1. EVIDENCE: [M] SERPs + [UNV] volumes + [G] comparative-value line.

**R6 — `/uk-ring-size-chart` (UK & Australian letter sizes)**
- WHAT: one hand-written reference page for the letter scale.
- WHERE: new route. Nav: no (the chart stays in nav). Linked from the chart's `#uk` and the tool's
  UK note.
- WHY: large demand in its own markets (UK 27.1K cluster + US→UK 6.6K + UK→US 3.6K; AU 4.4K +
  3.6K + 1.3K — DataForSEO 30 Sep, [UNV] absolute). A genuinely different system. Weak and poorly
  matched SERPs today [M]. Original data: the 26 Sep UK jeweller verification.
- HOW: a complete destination. The full letter chart (A to Z+, half letters) is computed from
  `ringSizes.ts`. It explains the two UK jeweller scales and the go-up rule, covers US↔UK both ways,
  and notes that AU/NZ/IE use the same letters. Working title: `UK & Australian Ring Size Chart (Letters) | Ring Size Tool` (58 chars). It is **not** a funnel: the
  page must fully answer its query without the tool.
- SEO PURPOSE: a weak SERP where a DR-0 site can compete.
- TOOL-USAGE PURPOSE: "measure your letter size on screen" → `/`.
- ADSENSE IMPACT: fine if complete. A funnel page would be a doorway risk [G].
- PRIORITY: owner decision in October; build in November. EVIDENCE: [M] + [G] + [UNV].

**R7 — owner identity on `/about`**
- WHAT: name the real person or legal entity behind the site. Truthful, with no invented
  credentials.
- WHERE: `/about`. Optionally the Organization schema's `founder`, if a person is named.
- WHY: Google: *"We strongly encourage adding accurate authorship information … where readers might
  expect it"*, and *"trust is most important"* [G]. The AdSense new-site checklist asks for a real
  named person or entity.
- HOW: the owner decides what is true and comfortable to publish (name, city/country, why they
  built it). Claude drafts only from what the owner provides.
- SEO PURPOSE: trust. TOOL-USAGE PURPOSE: marginal. ADSENSE IMPACT: removes a likely review
  weakness. PRIORITY: P1 decision. EVIDENCE: [G].

**R8 — performance** — see §19. P2, [EXP].

**R9 — consent** — see §22. The owner chooses between: (a) Google Privacy & messaging CMP now,
with GA4 Consent Mode; (b) keep GA4 as is until AdSense, then add the CMP; (c) drop GA4 cookies
for EEA/UK users. Claude cannot settle the legal question. P2, [G] + [UNV].

**R10 — authority** — see §21. P2, [M]/[BP].

**R11 — AdSense gate (this document's thresholds, not Google's).** Apply when all of these hold:
(1) R7 and R9 are done; (2) all content pages are indexed and the trust pages are reachable;
(3) organic traffic is worth monetising — suggested **≥ 1,000 organic sessions/month** so that ads
can be measured against tool usage. That figure is a judgement, not a Google rule, and none of the
Google pages checked for this document state a traffic minimum. Placement follows §22. P3.

**R12 — India page** — see §26. P3, [UNV].

**R13 — WebSite `alternateName`** — see §18. P3, [G].

# 28. Official Google evidence

All fetched live on **30 Sep 2026** (raw page text, not summaries). Full quotes with URLs are in the
session scratchpad's `google-evidence.md`. The lines this document relies on:

| Topic | Verbatim | Source (page's own "last updated") |
|---|---|---|
| FAQ retired | *"This feature will no longer appear in Google Search starting May 7, 2026."* and *"The FAQ rich result feature is no longer shown in Google Search results"* | developers.google.com/search/updates (2026-09-24); the FAQPage doc URL now 301s there |
| HowTo retired | *"Removed the How-to structured data documentation, as this rich result is no longer shown in search results"* | search/updates, 14 Sep 2023 |
| Unused markup | *"Structured data that's not being used does not cause problems for Search, but also has no visible effects in Google Search."* | search/blog/2023/08/howto-faq-changes |
| Software App | *"A rating or review of the app. You must include one of the following properties"* (aggregateRating / review) | …/structured-data/software-app (2026-09-08) |
| No fake reviews | *"Don't include fake or undisclosed incentivized reviews on your page or in your structured data markup."* | …/structured-data/review-snippet (2026-09-08) |
| Breadcrumbs | *"This feature is available on desktop in all regions and languages…"* | …/structured-data/breadcrumb (2026-09-08) |
| Site names | *"The WebSite structured data must be on the home page of the site."* · *"Avoid using a generic name."* | …/site-names (2025-12-10) |
| Truthful markup | *"Your structured data must be a true representation of the page content."* | …/structured-data/sd-policies (2026-07-10) |
| Doorway | *"Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page"* | …/essentials/spam-policies (2026-08-28) |
| Scaled content | *"many pages are generated for the primary purpose of manipulating search rankings and not helping users"* | spam-policies |
| Link spam | *"Forum comments with optimized links in the post or signature"* · *"Low-quality directory or bookmark site links"* | spam-policies |
| Word count | *"Are you writing to a particular word count because you've heard or read that Google has a preferred word count? (No, we don't.)"* | …/fundamentals/creating-helpful-content (2025-12-10) |
| Comparative value | *"Does the content provide substantial value when compared to other pages in search results?"* | creating-helpful-content |
| Authorship | *"We strongly encourage adding accurate authorship information, such as bylines to content where readers might expect it."* | creating-helpful-content |
| Length | *"The length of the content alone doesn't matter for ranking purposes"* | …/fundamentals/seo-starter-guide (2025-12-10) |
| Anchor text | *"Good anchor text is descriptive, reasonably concise, and relevant to the page that it's on and to the page it links to."* | …/crawling-indexing/links-crawlable (2025-12-10) |
| Titles | *"Google uses a number of different sources to automatically determine the title link"* | …/appearance/title-link (2025-12-10) |
| hreflang | *"If you have multiple versions of a page for different languages or regions, tell Google about these different variations."* | …/international/localized-versions (2026-09-21) |
| Geo meta | *"Google ignores locational meta tags (like geo.position or distribution)…"* | …/managing-multi-regional-sites (2025-12-10) |
| Country targeting | *"…no longer supported."* (International Targeting report deprecated) | support.google.com/webmasters/answer/12474899 |
| CWV thresholds | LCP *"within 2.5 seconds"*, INP *"200 milliseconds or less"*, CLS *"0.1. or less"* (Google's typo), *"75th percentile"* | web.dev/articles/vitals (2024-10-31) |
| CWV weight | *"Core Web Vitals are used by our ranking systems."* · *"Google Search always seeks to show the most relevant content, even if the page experience is sub-par."* | …/appearance/page-experience (2026-09-22) |
| Ad placement | *"Be careful when placing links, play buttons, download buttons, navigation buttons…, drop-down menus, or applications near ads"* | support.google.com/adsense/answer/1346295 |
| Low-value screens | *"We do not allow Google-served ads on screens: without publisher-content or with low-value content…"* | support.google.com/adsense/answer/10502938 |
| CMP | *"As of 16 January 2024, a certified CMP integrated with the TCF is required when serving personalized ads to users in the EEA and UK."* | support.google.com/adsense/answer/13554116 |
| EU consent | *"You must obtain end users' legally valid consent to: the use of cookies or other local storage where legally required…"* | google.com/about/company/user-consent-policy/ |

⚠️ **One correction to a local reference:** the `adsense-ground-truth` skill's `policy-verbatim.md`
quotes Publisher Policies `answer/11035931` as *"'Doorway' pages — pages designed solely for search
engines…"*. The live page does not contain "designed solely". Its wording is *"Don't create
"doorway" pages created just for search engines…"*. The skill file should be corrected (it lives
outside this repo, so it has not been edited).

# 29. Unverified claims and data

| Claim / figure | Why it is unverified | How to verify |
|---|---|---|
| Every keyword volume and KD in §9 | third-party estimates; clustered; sources disagree up to 7× | GSC impressions once a page ranks |
| India cluster 6.6K (DataForSEO) vs ~920 (Semrush) | direct conflict | GSC Indian-size queries (R12 trigger) |
| `how to measure ring size at home` 14.8K vs 90.5K | direct conflict | — |
| Chart→homepage impression swap since 24 Sep | 6 days of data; last 3 days incomplete | 10 Oct check |
| Why head terms left the homepage on 17 Sep | Google-side; no deploy that week; no manual action | not knowable directly |
| The `how to measure ring size` Trends spikes being partly bots | Wyoming-shaped sub-region map only | none reliable |
| CWV field data | no CrUX data for a site this new | GSC CWV report; PSI with an API key |
| Lab LCP regression cause | Lighthouse attribution, one machine, versions 13.4.1 → 13.5.0 | R8 A/B runs |
| Whether GA4 without consent is lawful for UK/EEA visitors | legal interpretation | the owner / a legal source |
| Whether the letter-scale page would rank | future | R6 + GSC |
| Whether FAQ markup should be removed now | Google's 2026 notes don't say | not worth a change |
| Competitors' AdSense approval | not observable from outside (13 Sep) | — |
| Mobile findings on a real phone | checked in an emulated 375 × 812 viewport | owner's phone |
| QA audit bugs #3–#14 | reported by a separate session's audit; only #2 (and the Cloudflare/privacy finding, which both audits made) re-verified here | re-drive each before fixing |
| Comma-decimal behaviour in other browsers/locales | tested in Chromium with en-US only; Safari/Firefox, or a comma-locale OS, may parse differently | test on the owner's devices |

# 30. Final implementation checklist

**Now (October)**
- [ ] R0 Cloudflare Web Analytics off (owner, dashboard) — or disclosed — and verified live
- [ ] R16 QA audit #2–#5 (input layer) + #6 (JIS citation, before R5's `#japan`); drive the tool after each
- [ ] R1 GA4 hostname gate
- [ ] R2 five events, no values; privacy page in the same commit; drive the tool in a browser
- [ ] R3 `scroll-margin-top`; check `#tool-heading`, `#chart`, cross-page `/#tool-heading`
- [ ] `npm run verify` · `npm run check` · `npm run build` · 375 px light + dark · tab through
- [ ] Owner: GA4 key events + internal-traffic filter
- [ ] ~4 Oct Bing `site:` (R15) · ~10 Oct swap check · ~21 Oct chart CTR check (R4)
- [ ] R5 draft after 10 Oct → owner reads → ship
- [ ] R8 experiments, measured; keep only what helps
- [ ] Owner decisions: R7 identity, R6 go/no-go, R9 consent

**November**
- [ ] R6 page (if yes): computed chart, both-way conversion, two-scale explanation, go-up rule,
      AU/NZ/IE note; sitemap check; links per §15; owner reads
- [ ] First R2 data read → one tool-flow experiment
- [ ] R10 Pinterest pins; genuine answers where asked

**December → 1 Jan 2027**
- [ ] Measure R5/R6 in GSC by country
- [ ] R12 India trigger check
- [ ] R11 AdSense gate review
- [ ] Kill-criteria review against the December impression rate

**Standing "do not" list, all decided with evidence and not to be re-litigated:** per-country
pages beyond R6 · per-pair converter pages · per-unit or per-value pages · any page generator ·
hreflang or translations · a smart-ring page · an actual-size page separate from the tool · a
secret-size estimator · a wide-band calculator · fake ratings or any schema not shown on the page ·
title/meta sweeps · comment, profile, bookmark, paid or exchanged links · email outreach.
