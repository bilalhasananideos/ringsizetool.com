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

**The #1 ranker has the worst tool.** It wins on content depth — ~3× the written content, 18 FAQs,
both "calculator" and "chart" intent on one page.

**A better tool alone will not win this SERP. We need the best tool *and* the deepest content.
Nobody currently has both.**

### Assumptions the audit disproved

- ~~"Saving calibration to localStorage is unique"~~ → **ringsize.app already does it.**
- ~~"Nobody has an accurate printable"~~ → **brite.co has one with a print-scale check line.**

### Verified gaps

1. **Calibrated tool + deep content together** — nobody has both
2. **India sizes absent from all five competitors**
3. **The #1 ships contradictory numbers** — its mm slider says 16.50 mm → EU 52, its cm slider says
   1.65 cm → EU 51.8; its two on-page charts disagree (US 5 = 16.2 mm vs 15.7 mm); its first chart
   skips sizes 6 and 8
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
| **Japan / India / China** | ⚠️ **non-linear — hand-verified lookup table, not a formula** |

Japan ≈ 13 mm at size 1, ~0.33 mm steps. India ~0.3–0.4 mm steps.
**Both must be cross-checked against 2–3 independent sources during build.** The #1 competitor
already ships contradictory numbers — correctness is our main quality claim.

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
