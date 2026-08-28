# ringsizetool.com — Research

**Verdict: BUILD.** Scored 10/12 on the rubric in `playbook/01-keyword-research.md`.
Research date: August 2026.

---

## Keyword

| Keyword | KD | Volume (US) | Target? |
|---|---|---|---|
| `ring sizer` | **4 — Easy** (~5 RDs) | **>10,000** | ✅ primary |
| `ring size tool` | **4 — Easy** (~5 RDs) | >1,000 | ✅ primary |
| `printable ring sizer` / `ring sizer printable` | Easy | >1,000 each | ✅ own page |
| `ring sizer chart` | Easy | >1,000 | ✅ own page |
| `virtual ring sizer` | Medium | >1,000 | ✅ own page |
| `free ring sizer` | Easy | >1,000 | ⚠️ mixed intent — many want a *physical* sizer mailed |
| `ring size` | 24 — Medium (~27 RDs) | high | ❌ Brilliant Earth, Tiffany, Quince, Wikipedia |
| `online ring sizer` / `ring sizer online` | **Hard** | >1,000 | ❌ |

Ahrefs returns **1,629 keyword ideas** and **173 questions** for `ring sizer`.

## The 7 checks

| Check | Result |
|---|---|
| 1. `.com` with keyword | ✅ `ringsizetool.com` available. Contains the KD-4 phrase `ring size tool` and the string `ring size`. Shortest of the available options, and doesn't narrow the site the way `printableringsizer.com` would |
| 2. Static, client-side | ✅ screen calibration + arithmetic. No API, no server, no inference |
| 3. Not owned by a giant | ✅ Amazon and Macy's rank, but **small sites hold #1 for the money keywords** |
| 4. SERP weakness | **2/3** — Play Store, Amazon and PDFs present, but four competent tools also rank |
| 5. Competitor flaws | **2/3** — two competitors are genuinely good; the #1 has real defects |
| 6. **Geography / RPM** | **3/3** — US 54%, UK 6%, CA 3%. Jewellery vertical. Ahrefs values the leader's traffic at **$4,700/month** |
| 7. Feature depth | **3/3** — 1,629 keywords; brand charts, Oura, nose ring, converter, printable |

## Why this SERP is winnable

Page-level authority is **near zero**:

- `ring size tool` **#4** — tokenjewelry.com — DR 34, **1 referring domain**
- `ring sizer` **#5** — brilliantearth.com — **0 backlinks** on that page
- **UR across the entire top 10: 0–8**

Nobody has earned links to their ring sizer page. KD 4 means roughly 5 referring domains, which a
genuinely good tool attracts on its own.

**Proof a small site wins here:** `ringssizechart.com` — unremarkable domain, no brand — does
**17,100 organic visits/month** and ranks **#1** for `ring size calculator` (5K volume).

## Competitor audit

Loaded in the browser. `ringssizechart.com` and `brite.co` block fetch tools (403 / empty body).

| Site | Calibration | Size systems | Printable | Content | FAQs | Position |
|---|---|---|---|---|---|---|
| **ringssizechart.com** | ❌ **none** — 3 sliders; you type a diameter measured elsewhere | US/UK/EU/JP | gated PDF | ⭐⭐⭐ | **18** | **#1** `ring size calculator` |
| brite.co | ✅ card, 2-step wizard | US/UK/EU | ✅ **with print check line** | ⭐⭐ | 6 | top 10 |
| measureringsize.com | ✅ card/ruler | ISO/US/UK/IT-ES-CH/RU | ❌ | ⭐⭐ | 8 | #1 `free ring measurement` |
| ringsize.app | ✅ card/coin, **saved to device** | US/UK/EU/JP + ¼ sizes | ❌ | ⭐⭐ | 11 | ranks |
| tokenjewelry.com | ❌ | ❌ | PDF only | ⭐ | 0 | **#4, 1 backlink** |

Also present: ringsizecalc.com, ringsize.online, myringsizecalculator.com, findmyringsize.com,
ringsizecalculators.com, plus every jewellery brand. **15+ competitors — this is not an empty
field.**

### The decisive finding

**The #1 ranker has the worst tool.** It wins on content breadth — 18 FAQs, both "calculator" and
"chart" intent on one page, six embedded jeweller videos with `VideoObject` schema.

**⚠️ Correction (27 Aug 2026, measured in-browser).** This file previously said the #1 has "~3× the
written content". That was wrong. Actual word counts:

| Site | Words | JSON-LD |
|---|---|---|
| ringssizechart.com (#1) | **1,585** | Article, WebPage, WebSite, Person, Org, ImageObject, VideoObject ×6 — **no FAQPage despite 18 FAQs**, and one block is a parse error |
| **ours (after the FAQ pass)** | **~3,100** | WebApplication, HowTo, FAQPage (21 Q) |
| ringsize.app | 903 | WebSite, WebApplication, FAQPage, HowTo, BreadcrumbList, Organization, Service |
| brite.co | 878 | BreadcrumbList, FAQPage |
| measureringsize.com | 762 | WebApplication, FAQPage |

Word count was never the gap — **structured data was.** We shipped with zero JSON-LD while all four
competitors had some. That is fixed.

**A better tool alone will not win this SERP. We need the best tool *and* the deepest content.
Nobody currently has both.**

### Assumptions the audit disproved

- ~~"Saving calibration to localStorage is unique"~~ → **ringsize.app already does it.**
- ~~"Nobody has an accurate printable"~~ → **brite.co has one with a print-scale check line.**

### Verified gaps

1. **Calibrated tool + deep content together** — nobody has both
2. **India sizes absent from all five competitors**
3. **The #1 ships contradictory numbers** — re-verified in-browser 27 Aug 2026:
   - mm slider says 16.50 mm → EU 52; cm slider says 1.65 cm → EU 51.8; inch slider → EU 51.8
   - its two on-page charts disagree: US 5 = 16.2 mm in one, 15.7 mm in the other (0.5 mm apart)
   - its first chart **skips sizes 6 and 8** entirely
   - **its downloadable PDF contradicts its own web page**: the page says US 6 → UK L / JP 11, the
     PDF says UK M / JP 12
   - circumference ≠ π × diameter on several rows (19.3 mm → it prints 60.8; π×19.3 = 60.63)
   - its footnoted "Conversion Fact" — "a ¼ US size = 0.4 mm diameter and 1.26 mm circumference" —
     is **the half-size figures mislabelled**. A quarter size is 0.2032 mm and 0.6383 mm.
     Both are asserted in `scripts/verify-sizes.ts` so we can never drift into the same error.
4. **It gates the full chart behind a PDF download**
5. **No competitor has dark mode**
6. **Wide-band adjustment** — everyone writes about it, nobody calculates it
7. **Knuckle larger than base** — universally mentioned, never solved
8. **Brand-specific sizing** never built into a tool
9. **Secret-sizing intent** owned by brite.co alone

## Conversion maths — sourced

| System | Rule |
|---|---|
| US/Canada | circumference = `2.55 × size + 36.5` mm · diameter = `0.8128 × size + 11.63` mm |
| UK/Australia | one letter division = 1.25 mm circumference; size C = 40 mm |
| EU / ISO 8653:2016 | size = inner circumference in mm (49–72) |
| Italy/Spain/Switzerland | circumference − 40 |
| Germany/Netherlands | diameter in mm |
| Brazil (ABNT NBR 16058) | circumference − 40 — the standard is aligned to ISO 8653 |
| **India** | circumference − 40 — **no standard exists**, but four jewellers agree on this rule |
| Japan (JIS S 4700:2022) | size 1 = 13 mm diameter, +1/3 mm per size — **linear in diameter** |

**Resolved during the 27 Aug build pass:**

- **Japan is linear**, not the non-linear scale Wikipedia implies. Verified against the published
  table at sizes 7, 10, 13, 19 and 35.
- **Brazil is not a separate scale.** The old `(mm − 13.05)/0.325` formula in `ringSizes.ts` was
  invented, not NBR 16058, and drifted a full size at 19 mm. NBR 16058 is aligned to ISO 8653; the
  Brazilian trade rule is "size + 40 = perimeter", and the published worked example (aro 19 →
  59 mm → 18.78 mm) reproduces exactly.
- **India uses the same rule.** Compared the published tables of four Indian jewellers — Jewelove,
  RishiRich Jewels, Gems Mart Jewellers and Sukkhi. All four fit circumference − 40 on every row
  they publish; Sukkhi's runs 1–37 and fits exactly. The old lookup table was taken from
  ringsize.online (a competitor) and carried two 0.6 mm transcription errors at sizes 18 and 32.
- **So India, France, Italy, Spain, Switzerland and Brazil are one physical scale under five
  names.** No competitor page states this. It is now on the homepage.
- **The remaining Indian uncertainty is Tanishq**, whose chart runs ~1 size smaller. Their full
  table could not be verified — `tanishq.co.in` blocks Pakistani IPs.

## Question data

**Largest cluster: "without a ring sizer" — 9 variants.** This is literally the product's pitch,
and **no competitor leads with it.** It gets its own page *and* the homepage hero line.

**Second cluster: "how to use / read a ring sizer"** (Easy, >100), including `ring sizer mandrel` —
jewellers and hobbyists, a distinct audience.

**Skip:** `where to buy a ring sizer` — product intent, not ours.

**21 PAA questions** collected. Four became features:

| Question | Feature |
|---|---|
| `is size 7 a large ring` · `is a size 7 ring big for a girl` · `what is the most common ring size` | **Size context after the result** — "US 7 is slightly above the female average of 6". Three separate questions ask for it; nobody provides it |
| `what is 7 inches in ring size` | **Inches input** — people measure with tape |
| `does ring size vary by finger` | **Per-finger results** |
| `which rings cannot be resized` | Own page |

## Revenue estimate

At `ringssizechart.com` parity (17.1K visits/month, US 54%):

| RPM | USD/month | PKR (≈280/USD) |
|---|---|---|
| $3 | $59 | ~16,500 |
| $5 | $98 | ~28,000 |
| $8 | $157 | ~44,000 |

**Timeline: 12–18 months to reach that.** 4–8 months to meaningful traffic; 6–10 months to the
first $100 payout.

**Consider affiliate over ads.** ringsize.app runs Amazon affiliate rather than AdSense — someone
measuring their ring size is about to buy a ring.

## Risks

- **15+ competitors.** We win on quality, not novelty
- **AI Overview + Shopping + Image pack + PAA take ~4 of 10 SERP slots** on `ring sizer` — real CTR
  will be below what raw volume suggests
- **`free ring sizer` intent is contaminated** by people wanting a physical sizer mailed
- **Domain not yet bought** (no funds). Backups if taken: `virtualringsizer.com`,
  `accurateringsizer.com`, `realringsizer.com`, `ringsizerhub.com`, `realringsize.com`

## Kill criteria

> **Under 500 Search Console impressions/month by month 4 from launch** → stop, do not renew, write
> the lesson in `tracking/sites.md`, move on.

---

## Brand

**Name: Ring Size Tool** · **Domain: ringsizetool.com**

Descriptive, not brandable — a deliberate choice backed by the SERP. Every small site winning here
uses a descriptive name (`ringssizechart.com`, `measureringsize.com`, `findmyringsize.com`). The
brandable names in this SERP (Moon Magic, Chupi, Token Jewelry, Blue Nile) are jewellery companies
whose tool pages rank on brand authority we do not have.

Three concrete benefits: domain, brand and keyword align; natural backlinks carry keyword-relevant
anchor text; later brand searches overlap with the money keyword.

The generic risk is handled in the **wordmark, not the words** — a fine circle mark with restrained
typography reads premium. A name is not cheap; a cheap treatment of it is.

| Where | Value |
|---|---|
| Wordmark | `○ Ring Size Tool` |
| Header | `○ Ring Size Tool` · Chart · Printable · Guide |
| Footer | `© 2026 Ring Size Tool` |
| OG `site_name` | `Ring Size Tool` |
| Home `<title>` | `Ring Sizer — Measure Your Ring Size on Screen \| Ring Size Tool` |

Per-page titles are keyword-led and set during the SEO pass (`playbook/03-seo.md`); the brand goes
after the pipe, never in front of the keyword.

---

## Collected questions — verbatim, for the FAQ and JSON-LD

These were collected from Google "People also ask" and the Ahrefs Free Keyword Generator
"Questions" tab for `ring sizer` (which returns 173 in total). **Use this wording exactly.**
Never invent an FAQ question — the whole point is that a real person searched for it.

### Google "People also ask" — 21, verbatim

```
How can I measure my ring size at home?
Can I measure my ring size on my phone?
Is there a virtual ring sizer?
Is size 7 a large ring?
How can I find out my ring size?
Can I size my ring at home?
Does ring size vary by finger?
How can I tell my ring size without measuring?
Can I measure my ring online?
Is there an app to check your ring size?
What is the most common ring size?
What is the best ring sizer to use?
Can I size my ring on my phone?
How do I know my correct ring size?
Is a ring sizer universal?
Is a size 7 ring big for a girl?
How do I convert my finger diameter to ring size?
How to size a ring with a sizer?
Can I size a ring at home?
Which rings cannot be resized?
What is 7 inches in ring size?
```

**Four of these became tool features rather than FAQ answers** — see the feature table above:
`is size 7 a large ring` + `is a size 7 ring big for a girl` + `what is the most common ring size`
(size context after the result), `what is 7 inches in ring size` (inches input),
`does ring size vary by finger` (per-finger results).

They still get FAQ entries. A feature answers it for the person using the tool; the FAQ answers it
for the person scanning the SERP.

### Ahrefs "Questions" — with volume and difficulty

| Question | KD | Volume (US) |
|---|---|---|
| how to use a ring sizer | Easy | >100 |
| how to read a ring sizer | Easy | >100 |
| how to use ring sizer | Easy | >100 |
| **how to measure ring size without a ring sizer** | N/A | **>100** |
| where can i buy a ring sizer | Easy | >100 |
| where to buy a ring sizer | Easy | >100 |
| where to buy a ring sizer in store | Easy | >100 |
| how to size a ring without a sizer | N/A | <100 |
| how to read ring sizer | Easy | <100 |
| how to find ring size without sizer | — | <100 |
| how to measure your ring size without a ring sizer | — | <100 |
| how to size a ring without a ring sizer | — | <100 |
| how to know your ring size without a ring sizer | — | <100 |
| how to find your ring size without a ring sizer | — | <100 |
| how to tell your ring size without a ring sizer | — | <100 |
| how to determine ring size without a sizer | — | <100 |
| how to use ring sizer mandrel | — | <100 |
| how to read a ring sizer mandrel | — | <100 |
| where to buy ring sizer | — | <100 |
| does target have oura ring sizer | — | <100 |

**The "without a ring sizer" cluster is 9 of those 20 rows.** That is the largest single cluster in
the whole keyword set, it is exactly what this tool does, and no competitor leads with it. It gets
its own page and the homepage hero line.

**Skip the "where to buy" rows** (4 of them, Easy, >100) — that is product intent, not tool intent.
A possible Amazon-affiliate page much later; it would dilute the tool pages now.

**The mandrel questions are a different audience** — jewellers and hobbyists, not shoppers. They
belong on `/how-to-use-a-ring-sizer`, not the homepage.

---

## Competitor traffic data — Ahrefs, 27 Aug 2026

Store this. It changed the plan.

### ringssizechart.com — the site ranking #1

| | |
|---|---|
| Organic traffic | **17.2K/month** |
| Traffic value | **$4.7K/month** |
| Countries | US 53% · **India 10%** · Indonesia 6% · UK 6% · Canada 3% |

| Keyword | Position | Volume |
|---|---|---|
| ring size calculator | **1** | 5,000 |
| ring size chart online | **1** | 2,100 |
| ring size finder | **1** | 450 |
| ring size online | **1** | 400 |
| calculate ring size | 2 | 300 |

| Page | US traffic | Share |
|---|---|---|
| `/` | **8,800** | **95%** |
| `/nose-ring-size/` | 196 | 2% |
| `/oura-ring-size-chart/` | 178 | 2% |
| `/oura-ring-size-chart` *(no slash — duplicate)* | 22 | 0% |
| `/are-men-and-women-ring-sizes-the-same/` | 13 | 0% |

### measureringsize.com

| | |
|---|---|
| Organic traffic | **6.8K/month** |
| Traffic value | **$2K/month** |
| Countries | US 60% · Brazil 6% · Ukraine 5% · UK 3% · Saudi 3% |

| Keyword | Position | Volume |
|---|---|---|
| ring sizer online | **1** | 1,500 |
| online ring sizer | **1** | 1,500 |
| ring sizer tool online | 2 | 700 |
| **ring sizer** | **16** | **26,000** |
| measure ring size | 9 | 4,300 |

| Page | US traffic |
|---|---|
| `/` | **4,200 (100%)** |
| `/es` | 6 |
| `/ar` | 5 |
| `/pt` | 4 |

---

## What this data changes — five corrections

### 1. `ring sizer` is 26,000/month, not ">10,000"

The Ahrefs free tool only reports buckets. The real figure is **26K**, and the #1 competitor for the
tool-intent queries sits at **position 16** for it. This is a far bigger prize than the earlier
estimate, and it is barely defended.

### 2. ⚠️ My advice to skip `online ring sizer` / `ring sizer online` was wrong

I marked both **Hard** from the free KD tool and said do not target them. But
`measureringsize.com` — a 6.8K-traffic site with no brand — ranks **#1 for both**, at 1,500 volume
each. If a site that small holds #1, the keyword is not out of reach.

**Corrected position:** target them. KD estimates backlinks needed for the top ten; it says nothing
about whether a small, genuinely better page can win. The SERP is the evidence, not the score.

### 3. 🔴 The homepage is 95% of the traffic. The long-tail pages barely work.

`ringssizechart.com` gets **8,800 of its 9,200 US visits on the homepage alone.** Its best sub-page
manages 196. Its whole long-tail strategy is worth roughly 400 visits — under 5%.

**This inverts the build order.** The plan had eight pages queued. The data says depth on the
homepage is worth roughly 20× any single sub-page. Build the homepage until it is unarguably the
best page on the internet for this query, *then* add sub-pages.

### 4. Multilingual is close to worthless here — the "English only" call was right

`measureringsize.com` runs `/es`, `/ar` and `/pt`. Combined: **15 visits/month.** Against 4,200 on
the English homepage.

That is the whole return on maintaining three translated versions. Keep i18n routing configured and
add nothing until Search Console shows real demand.

### 5. India is 10% of the #1's traffic — and it does not show Indian sizes

Ten percent of 17.2K is roughly **1,700 visits a month from India** landing on a page that offers
US, UK, EU and Japan and no India at all. We compute Indian sizes and state honestly that no
standard exists.

Note the RPM caveat: Indian traffic monetises far below US traffic. This is a **quality and
differentiation** win, not a revenue one. Worth doing; not worth reordering priorities for.

### Also: they have a trailing-slash duplicate

`/oura-ring-size-chart/` and `/oura-ring-size-chart` are both indexed — the same page competing with
itself. Our `trailingSlash: 'never'` plus canonical handling already prevents this.

---

## ⚠️ UK letters: our answer is half a letter below every published chart

Found 27 Aug 2026 while checking the chart the owner extracted from `ringssizechart.com`.

| | US 5 | US 5¾ | US 6 |
|---|---|---|---|
| Their published chart | K | L½ | **M** |
| Our standards-derived answer | J½ | L | **L½** |

**A consistent half-letter offset.** Not a rounding artifact — it holds across the whole scale.

### Why

Our formula follows BS EN 28653:1993 — A = 37.5 mm inner circumference, +1.25 mm per letter,
half sizes at +0.625 mm. Cross-checked two ways: ringsize.online states the A = 37.5 mm anchor
directly, and Wikipedia states C = 40 mm, which 37.5 + 2 × 1.25 satisfies exactly.

Their chart is *also* internally consistent — each US quarter-size advances one UK half-letter,
which matches the physics (US ¼ = 0.638 mm circumference, UK ½ = 0.625 mm). The scales track.

**The offset comes from the letter sequence, not the arithmetic. Their chart omits I½** — it runs
… H, H½, I, **J**, J½ … With one half-step missing, everything above J shifts by half a letter.

Some published British scales include every half size; others omit particular ones. There is no
single sequence everyone uses.

### What to do — and what not to do

**Do not "fix" this by shifting our formula to match their chart.** That would replace a
standards-derived value with a competitor's value, which is the exact thing the project rules
forbid, and their sequence is not more authoritative than the standard.

**Treat UK exactly as we treat India:** give the letter our formula produces, and say plainly that
published UK charts vary by up to half a size, with the circumference in mm alongside so a jeweller
can confirm. The millimetre figure is the unambiguous one.

This is defensible, it is true, and it is more useful than any competitor — all four of which print
a single letter as though it were certain. Recall the measured disagreement for US 6 alone:
**L (ringsize.app) · L½ (measureringsize, and ours) · M (brite.co and ringssizechart).**
Four sites, three answers.


---

## Correction: the #1's comprehensive chart is an image, not HTML

I previously recorded that `ringssizechart.com` gates its full chart behind a PDF download. **That
was wrong** — I inferred it from a text extraction that showed the heading followed by a download
button, with no table rows between them. The rows were missing for a different reason.

Verified in the browser, 27 Aug 2026:

```
HTML tables on the page — only three, all small:
  7 rows x 4 cols   Circumference | Diameter | US Size | UK Size
  7 rows x 4 cols   Circumference | mm | cm | inches
  9 rows x 3 cols   US Size | Diameter | Circumference

Also present, three times: ring-size-chart.png   alt="ring size chart"
```

The comprehensive chart — 9 columns (US, British, European, German, Brazilian, Japanese, Swiss,
inside diameter, circumference) by roughly 55 rows — is none of those three tables. **It is the
PNG.**

### Why this is a larger opening than gating would have been

| Consequence | Effect |
|---|---|
| **Google cannot read a single value in it** | Their entire 9-system conversion table is invisible to search as text, yet they rank **#1** for `ring size chart online`. The chart is doing none of that work. |
| Nobody can copy a value | A visitor cannot select their size to send to a jeweller. |
| Screen readers get nothing | `alt="ring size chart"` in place of 55 rows of data. |
| No dark mode | A white PNG glares in a dark theme. They have no dark mode; we do. |
| **Unreadable at 375px** | A wide table as a fixed image cannot reflow. Mobile is the majority of this traffic. |
| Page weight | Adds to a page already carrying 10 iframes and 20 images. |

### What we do

Real HTML, generated from `CHART_ROWS` — selectable, indexable, theme-aware, inside
`.table-scroll` so it scrolls itself on a phone, with every quarter size rather than a subset.

They reached #1 while making their best asset unreadable to both Google and assistive technology.
That is the gap.

### Note on my own error

The text-extraction tool returned the heading and the download button with nothing between them,
and I read that as "gated". The correct inference was "the content is not text" — which a single
check of the DOM would have shown. When an extraction comes back empty, the question to ask is
whether the content is really absent or merely not text.

---

## Keyword data: `ring size chart` — 27 Aug 2026

**2,869 keyword ideas.** This is the largest opportunity found so far.

| Keyword | KD | Volume (US) |
|---|---|---|
| **`ring size chart`** | **Easy** | **>100,000** |
| `mens ring size chart` | Easy | >1,000 |
| `printable ring size chart` | Easy | >1,000 |
| `ring size chart printable` | Easy | >1,000 |
| `us ring size chart` | **Hard** | >1,000 |
| `ring size chart in cm` | Easy | >1,000 |
| `ring size chart cm` | — | >1,000 |
| `ring size chart inches` | Easy | >1,000 |
| `ring size chart in inches` | — | >1,000 |
| **`actual ring size chart on screen`** | **Easy** | **>1,000** |
| `actual size ring size chart` | — | >1,000 |
| `ring size chart online` | **Hard** | >1,000 |
| `oura ring size chart` | Easy | >1,000 |
| `pandora ring size chart` | — | >1,000 |
| `men ring size chart` · `ring size chart men` · `men's ring size chart` | — | >100–1,000 |
| `nose ring size chart` | — | >100 |
| `ring size chart in mm` | — | >100 |
| ~~`o ring size chart`~~ | — | >100 |

The 45 "Questions" results are all under 100 volume and mostly restate
`how to measure ring size chart`. Low priority; they fold into the FAQ.

---

## What this changes — five things

### 1. 🔴 `/ring-size-chart` is now the highest-value page on the site after the homepage

**`ring size chart` is Easy at >100,000** — roughly four times `ring sizer` at 26,000. And recall
what `ringssizechart.com` does with it: **they rank #1 for `ring size chart online` while their
comprehensive chart is a PNG image Google cannot read.**

A large, correct, indexable HTML chart is the single biggest opening in this whole project.

*Caveat: ">100K" is a bucket, so the true figure could be anywhere from 100K to several hundred
thousand. Even at the floor it dwarfs everything else here.*

### 2. The chart needs a unit toggle — five keyword variants demand it

`ring size chart in cm` · `ring size chart cm` · `ring size chart inches` ·
`ring size chart in inches` · `ring size chart in mm`

One chart with mm / cm / inches switchable. `ringSizes.ts` already returns all of them; this is a
render decision, not new maths. `ringssizechart.com` has a separate 7-row table for this — ours
should be one complete table that switches.

### 3. **`actual ring size chart on screen` — Easy, >1,000, and our calibration already solves it**

People want a chart rendered at **true physical size** so they can lay a ring directly on the
screen. This is exactly what the bank-card calibration enables.

No competitor can do this properly. `ringssizechart.com`'s chart is a fixed-width PNG — displayed
at whatever size the browser happens to pick, which is the wrong size on every device.

**Build it: circles drawn at real diameter using the stored px/mm, with a warning when the device is
not yet calibrated.** It is a genuine capability, traced to a real query, that the leader
structurally cannot match.

### 4. A men's section is worth building — four variants ask for it

`mens ring size chart` · `men ring size chart` · `ring size chart men` · `men's ring size chart`

`AVERAGE_US_SIZE.men = 9` is already defined in `ringSizes.ts` and never used. Plan item **A8**
(the men's/women's context toggle) was scored as a nice-to-have; this data promotes it.

### 5. ⚠️ Skip `o ring size chart` — it is a different product entirely

An **O-ring** is a rubber sealing washer for machinery, sized by cross-section and internal
diameter in an unrelated system. Nothing to do with jewellery.

The phrase looks like a near-match to our target and is not. Chasing it would attract traffic that
bounces instantly and dilute the topic. This is the same intent trap as `ring sizer` returning
Amazon listings — the words match, the need does not.

### Brand and niche pages — confirmed as a real, if small, tier

`oura ring size chart` (Easy, >1,000) and `nose ring size chart` (>100) both have volume, and the
traffic data shows `ringssizechart.com` actually earns from them: `/nose-ring-size/` 196 visits,
`/oura-ring-size-chart/` 178. `pandora ring size chart` (>1,000) is untested by them.

Worth doing **after** the main chart page, hand-checked, a few at a time. Not twenty generated pages.

---

## Keyword data: full Ahrefs pass — 28 Aug 2026

Roughly 25 keywords through the **Keyword Difficulty Checker** (KD + SERP overview) and the
**Free Keyword Generator** (volume bands). Both tools are needed and neither is sufficient: the
Generator says whether a keyword is worth having, the Checker says whether it can be won. The
free tier reports volume as `>100K` / `>10,000` / `>1000` / `>100` / `<100` only.

🔴 **All of it is the United States market.** That is the right default for this site, but it
understates the UK and India keywords, whose searchers largely are not in the US. Re-pull
`uk ring size chart` for GB and `indian ring size chart` for IN before judging either on volume.

Not yet pulled, and nothing here depends on them: `eu ring size chart`,
`how to measure someone's ring size secretly`, `ring size half sizes`.

### The head of the market

| Keyword | Volume | Checker KD | Page today |
|---|---|---|---|
| `ring size chart` | **>100K** | Easy | `/ring-size-chart` |
| `how to measure ring size` | **>10,000** | 18 | homepage section only |
| `how to measure ring size at home` | **>10,000** | **2** | **none** |
| `ring sizer` | **>10,000** | 4 (recorded earlier) | homepage |
| `ring size` | >10,000 | 24 | not targeted, by decision |

### `>1000` — the second tier

`ring size guide` (KD 23) · `what is my ring size` (KD 9) · `ring size calculator` ·
`ring size measurements` · `average ring size for women` (KD 0) · `average ring size for men` ·
`average ring size` · `printable ring sizer` · `ring sizer printable` ·
`printable ring size chart` · `ring size chart printable` · `mens ring size chart` (KD 3) ·
`men ring size chart` · `ring size chart men` · `us ring size chart` · `ring size chart online` ·
`ring size chart in cm` · `ring size chart cm` · `ring size chart inches` ·
`ring size chart in inches` · **`actual ring size chart on screen`** · `actual size ring size chart` ·
`oura ring size chart` · `pandora ring size chart` · `uk ring size to us` ·
`how to measure ring size in cm` · `how to know ring size without measuring` ·
`ring size in cm` · `ring size in inches` · `ring size in mm` · `ring sizer tool` ·
`free ring sizer` · `ring sizer chart` · `virtual ring sizer` · `online ring sizer` ·
`ring sizer online` · `how to find ring size` and ~8 further `how to …` phrasings ·
`ring size adjuster`

### 🔴 Standing methodology rule: read the weakest page in the top 5, not the KD number

Four keywords contradicted their own difficulty score, and the contradiction ran both ways:

| Keyword | KD says | The SERP says |
|---|---|---|
| `ring sizer online` | 50 Hard, ~84 domains | **DR 5** measureringsize.com at #2, 4.0K traffic |
| `uk ring size chart` | 44 Hard, ~66 domains | **DR 3** antoanetta at #5, 1.1K traffic — above DR 60 H. Samuel on 223 |
| `us to uk ring size` | 20 Medium | **DR 25** Walkers Celtic at #5 with **zero backlinks** |
| `finger size chart` | **11 Medium** | Kay DR 73, Tiffany DR 80, Macy's DR 85 — **no weak page at all** |

Where a DR 0–25 page holds a top-5 slot the keyword is live whatever KD says; where the top 5 is
uniformly strong, a friendly KD is a trap. `finger size chart` is the trap, and is not a target.

### 🔴 Two conclusions reached during this pass and then reversed by later data

Recorded as reversals so a later session does not resurrect them.

1. **Converter pages — proposed, then dropped.** `/mm-to-ring-size`, `/inches-to-ring-size` and
   `/ring-circumference-to-size` were recommended on KD 0–19 against DR 0–8 competitors. That read
   difficulty and ignored demand. `ring size in mm` is `>1000` but **18 of its 19 variants are
   `<100`**; `mm to ring size` and `ring circumference to size` are `>100` with every variant
   below that. The cluster cannot support three pages. **Item 2 of the earlier chart research —
   unit variants belong on one chart with a toggle — is confirmed by this, not contradicted:**
   the unit demand sits on *chart* queries (`ring size chart in cm` and
   `ring size chart inches`, `>1000` each), not on converter queries.

2. **`average ring size` — dismissed as covered, then upgraded to its own page.** First judged a
   homepage section already served by "Is your size normal?". The full cluster is three `>1000`
   keywords plus ~10 at `>100`, with `average ring size for women` at **KD 0** and a DR 18 page
   taking 3.2K traffic in the top 5. One paragraph cannot rank for thirteen keywords.

### What the SERPs expose about the competition

- **`solvar.com/pages/ring-size-guide` is the page to beat.** DR 26, **24K monthly traffic across
  1.4K keywords**, ranking above Tiffany (DR 80) and Brilliant Earth (DR 75) on both
  `ring size guide` and `what is my ring size`. One page absorbing a head-term cluster from a
  domain a new site can reach. This is the shape the homepage should take.
- **The India SERP is the chart-as-image problem again.** `indian ring size chart` is KD 0 and the
  two results above the fold are not pages: `staticimg.tanishq.co.in/sizing-…` (DR 66) and
  `caratlane.us/media/size-…` (DR 35), both static assets. Same opening as the main chart SERP,
  on an easier keyword — and `INDIA_NOTE` (no Indian standard exists) is content no image carries.
- **`ringsizes.co`** holds a top-5 slot on `ring size conversion chart` at DR 68 with **348
  visits** total. Authority coasting on a thin page; beatable later, not in month one.
- **AI Overviews** sit on most of the easy keywords, and on the method queries they are stuffed
  with YouTube and Instagram. Ranking is achievable; the clicks may not follow. This is the
  largest unhedged risk in the whole dataset.

### The long tail is a table, not a page each

`what ring size is 2.5 inches circumference` · `what is 6 cm in mm ring size` ·
`if my finger is 2.5 inches what is my ring size` · `63.5 mm to ring size` ·
`7.5 ring size in mm` — dozens of these, each `>100` or `<100`, all one behaviour: someone has a
number and wants a size. The tool already answers every one. Serve the common values in a single
compact table; a page per value is hundreds of thin pages, which is what the kill criteria exist
to prevent.

### Wrong-product traps found

`o ring size chart` (>100) is rubber seals — already recorded above. `cigar ring size in inches`
(<100) is cigar ring gauge. Both look like near-matches and are not.

### 💰 One monetisation signal

`ring size adjuster` (`>1000`) is product intent — a cheap, high-volume physical item, and the
only keyword in the set with a natural affiliate path. It is also downstream of what this tool
does: the searcher already knows their ring does not fit. Worth checking against the revenue
estimate above before anything is built for it.
