# ringsizetool.com — status

Last updated: 27 Aug 2026 · **Stage: homepage + /ring-size-chart done — awaiting the owner's read**

---

## Decisions already made — do not re-litigate

| | |
|---|---|
| Keyword | `ring sizer` + `ring size tool` — **KD 4**. `ring sizer` is **26,000/mo** (the free tool's ">10,000" is a bucket) |
| Biggest target | **`ring size chart` — KD Easy, >100,000/mo.** ~4x `ring sizer`. See RESEARCH.md |
| Do NOT target | `ring size` (KD 24) · `o ring size chart` (**a rubber machinery seal — wrong product**) |
| ~~Do NOT target~~ | ~~`online ring sizer` (Hard)~~ — **that call was wrong.** measureringsize.com, a 6.8K site, ranks #1 for it. KD counts backlinks for the top ten; it does not say whether a better page can win |
| Domain | `ringsizetool.com` — **not bought yet, user has no funds** |
| Backups if taken | virtualringsizer · accurateringsizer · realringsizer · ringsizerhub · realringsize (all `.com`) |
| Brand | **Ring Size Tool** · brand goes AFTER the pipe in titles, never before the keyword |
| Design | Vercel DESIGN.md + PROJECT OVERRIDES: brass accent, Instrument Serif, no Vercel blue/gradients/Geist |
| Hosting | Cloudflare Pages, static, free |
| Language | English only at launch; i18n routing already configured, locales added later one at a time |
| User is in | **Pakistan** — currency USD/PKR. UPI, BigRock, PAN are India-only and do not apply |

**The strategy, from the competitor audit:** the site ranking #1 has the *worst* tool. It wins on
content depth. So a better tool alone will not win — we need the best tool **and** the deepest page.
Nobody currently has both.

## Done ✅

- Astro 7 static + Tailwind 4, dark mode with no flash, self-hosted Instrument Serif (15KB)
- Policy pages, `_headers` (pages.dev noindex), robots.txt, sitemap
- `src/config.ts` — single source for name, URL, email, nav, and `NOINDEX_SITE`
- **`src/data/ringSizes.ts`** — every value computed from a published standard, not copied
- **`scripts/verify-sizes.ts`** — 22 assertions against the published tables. `npm run verify`
- **`src/components/RingSizer.astro`** — calibration + 3 measuring modes + full result
- Verified in-browser: 16.51mm → US 6 / L½ / EU 52 / JP 12 / IN 12
- **Homepage content drafted** — 5 sections after the tool, every one traced to a named query:
  size context · 3 methods + what not to do · the chart (half sizes, generated from `CHART_ROWS`)
  · why charts disagree + the formulas + the India admission · 5 edge cases.
  Checked at 375px: no page overflow, wide tables scroll inside `.table-scroll`.
- **Tool rebuilt for correctness (27 Aug):** calibration outline is now PORTRAIT — the landscape
  card was 324px wide and got clipped on a 375px phone, so the core feature was broken on mobile.
  Also: no system can emit a negative size any more, a stale/corrupt saved calibration is rejected
  and the live one is always visible, out-of-range input shows an error instead of leaving the old
  numbers up, both sliders have paired number inputs, and the ARIA tablist became a real radio
  group. Verified in-browser at 375px.
- **`src/data/faq.ts`** — all 21 verbatim PAA questions, answers computed from the engine
- **JSON-LD: WebApplication + HowTo + FAQPage** via a `jsonLd` prop on `Layout.astro`.
  We had zero; all four competitors have schema. The #1 has no FAQPage despite 18 FAQs.
- **`/ring-size-chart` shipped** — 45 quarter-size rows × 11 columns, all seven systems, mm and
  inches, plus women's/men's cuts and a standards-source table. Generated from `CHART_ROWS`;
  no number is typed. `BreadcrumbList` added to both pages now that a second page exists.
- **`--accent-text` token added.** `--accent` (#8A6D3B) is only 4.09:1 on `--accent-sunk` and
  4.34:1 on `--surface-sunk` — both under AA for 14px text. Small accent text now uses
  `#7A6034`; the brand accent stays for marks, borders, fills and large display type (3:1).
- **`--text-faint` was failing WCAG AA** (3.29:1 on `--surface-sunk`). Fixed in both themes;
  all 27 uses now pass. Do not lighten it back.
  **⬜ The owner has not read it yet. Nothing ships until that happens.**

## ⚠️ Build order revised 27 Aug 2026 — read RESEARCH.md "What this data changes"

Ahrefs traffic data shows the #1 competitor earns **95% of its traffic on the homepage alone**
(8,800 of 9,200 US visits). Its best sub-page manages 196. So depth on the homepage is worth
roughly 20x any single sub-page.

Also: `ring sizer` is **26,000/month**, not ">10,000" — and the leading tool site sits at position
**16** for it. And `online ring sizer` / `ring sizer online` are **not** out of reach: a 6.8K-traffic
site holds #1 for both, so the earlier "skip these, KD says Hard" call was wrong.

## Next, in order ⬜

1. **Owner reads both pages** — `npm run build && npm run preview`. Homepage (~3,100 words,
   21 FAQs) and `/ring-size-chart`. Nothing ships until this happens.
2. **Decide the "without a ring sizer" cannibalisation.** The homepage `<h1>` and an `<h2>`
   both target that phrase (5 occurrences). A separate
   `/how-to-measure-ring-size-without-a-ring-sizer` page would compete with our own homepage.
   Either change the homepage h1 or drop that page — not both.
3. **Actual-size-on-screen chart** — the one requirement from the `ring size chart` keyword data
   that is still unbuilt. `actual ring size chart on screen` (Easy, >1,000) and
   `actual size ring size chart` (>1,000) both ask for circles drawn at **true physical size** so a
   ring can be laid on the screen. We already store px/mm from the tool's calibration, so this is a
   render, not new maths. **No competitor can match it** — theirs is a fixed-width PNG shown at
   whatever size the browser picks, which is the wrong size on every device.
4. **`/printable-ring-sizer`** — print CSS with real `mm` units + a print-scale check square.
   Not a PDF library. Easy at >1,000 volume. brite.co already has one *with* a check line —
   match that, then beat it on the chart.
5. SVG diagrams of the three methods · logo + favicon (SVG, hand-drawn) · Lighthouse
6. Deploy to Cloudflare Pages — **site stays `noindex`, submit nothing** until the domain is bought

Add each new page to `NAV` in `config.ts` only once it exists.

## Gotchas found the hard way

- ~~`CLAUDE.md` is a broken symlink~~ — **fixed** in commit `38c9448`; it is a real file now.
- ~~"FAQ blocked, RESEARCH.md names only four questions"~~ — **wrong.** All 21 verbatim PAA
  questions are in `RESEARCH.md` (commit `313eb4a`). The FAQ shipped from them.
- **The homepage now carries the chart.** When `/ring-size-chart` ships it must not repeat it —
  give that page quarter steps, men's/women's splits and brand charts, and keep the homepage at
  half sizes. Two near-identical tables on one site is self-inflicted duplicate content.
- **Astro eats a newline inside `{}` interpolation.** `roughly\n{value}` renders as `roughly1.7`.
  Use a template literal or `{' '}` when an expression starts or ends a line.

- **`build.format: 'file'`** makes `Astro.url.pathname` `/index.html`. The canonical is normalised in
  `Layout.astro` — do not "simplify" that back.
- `npm run dev` does not generate the sitemap. Use `npm run build && npm run preview`.
- UK sizes come out as long runs of half-sizes (L½, N½, P½). **This is correct** — US steps are
  2.55mm of circumference, UK steps are 1.25mm, so they never align. Three ranking competitors give
  three different UK answers for the same diameter. Ours matches the standard.
- **India, France, Italy, Spain and Brazil are the same scale**: circumference in mm minus 40.
  Four Indian jewellers (Jewelove, RishiRich, GMJ, Sukkhi) all fit that rule on every published row;
  Brazil's NBR 16058 is aligned to ISO 8653 and gives the same number. The old India lookup table
  was copied from a competitor and had two 0.6mm transcription errors — it is gone. Do not
  reintroduce a lookup table for any of these.
- **India still has no standard**, and Tanishq runs ~1 size smaller than the common convention.
  The UI says so. Do not "fix" it by presenting one number as certain.
- **tanishq.co.in blocks Pakistani IPs**, so their full table could not be verified from here.
- **The old Brazil formula `(mm-13.05)/0.325` was invented**, not NBR 16058, and drifted by one
  size at 19mm. Replaced with circumference − 40.
- **⚠️ Open: the low end of the Brazil scale.** Our formula is anchored on NBR 16058's own worked
  example (aro 19 → 59mm perimeter → 18.78mm), which it reproduces exactly. But one source says
  Brazilian sizes *start at 8*, and ringssizechart's PDF gives BR 7 for US 3 where we give 4.
  Below about aro 8 our value may be an extrapolation rather than a size anyone sells. Affects
  US 3–4¾ only. Verify against a Brazilian jeweller's published table before launch.
- **The header only just fits at 375px** with two nav items. Everything in it is `whitespace-nowrap`
  and `shrink-0` on purpose. A third nav label will break it — collapse to a menu at that point.

## Commands

```bash
npm run verify    # 58 conversion assertions
npm run build     # sitemap and robots exist only after this
npm run preview   # test against this, not dev
npm run deploy    # Cloudflare Pages
```
