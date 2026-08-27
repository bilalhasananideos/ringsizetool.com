# ringsizetool.com — status

Last updated: 27 Aug 2026 · **Stage: homepage drafted — awaiting the owner's read**

---

## Decisions already made — do not re-litigate

| | |
|---|---|
| Keyword | `ring sizer` + `ring size tool` — **KD 4**, >10,000 US volume |
| Do NOT target | `ring size` (KD 24), `online ring sizer` (Hard) |
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
  **⬜ The owner has not read it yet. Nothing ships until that happens.**

## ⚠️ Build order revised 27 Aug 2026 — read RESEARCH.md "What this data changes"

Ahrefs traffic data shows the #1 competitor earns **95% of its traffic on the homepage alone**
(8,800 of 9,200 US visits). Its best sub-page manages 196. So depth on the homepage is worth
roughly 20x any single sub-page.

Also: `ring sizer` is **26,000/month**, not ">10,000" — and the leading tool site sits at position
**16** for it. And `online ring sizer` / `ring sizer online` are **not** out of reach: a 6.8K-traffic
site holds #1 for both, so the earlier "skip these, KD says Hard" call was wrong.

## Next, in order ⬜

1. **Owner reads the homepage** — `npm run build && npm run preview`, then edit or approve.
2. **FAQ + JSON-LD** — ⚠️ **blocked.** `RESEARCH.md` says 21 PAA questions were collected but
   only names four; `prompts/faq-jsonld.md` still has its `<paste one question per line>`
   placeholder. The list has to be re-collected from Google PAA / Ahrefs and pasted into
   `RESEARCH.md` before the FAQ can be written — inventing questions breaks the skill's one rule.
3. **`/ring-size-chart`** — the complete chart, on the page, never gated behind a download
   (`CHART_ROWS` in `ringSizes.ts` already generates it)
4. **`/printable-ring-sizer`** — print CSS with real `mm` units + a print-scale check square.
   Not a PDF library. `printable ring sizer` is Easy at >1,000 volume and this is a real gap.
5. **`/how-to-measure-ring-size-without-a-ring-sizer`** — the 9-variant cluster, highest intent
6. SVG diagrams · logo + favicon (SVG, hand-drawn) · Lighthouse · `web-design-guidelines` audit
7. Deploy to Cloudflare Pages — **site stays `noindex`, submit nothing** until the domain is bought

Add each new page to `NAV` in `config.ts` only once it exists.

## Gotchas found the hard way

- **`CLAUDE.md` is a broken symlink** — it points at `AGENTS.md`, which does not exist. The site's
  house rules are unwritten. Either write `AGENTS.md` or delete the symlink.
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
- **India has no sizing standard.** Published charts differ by up to 0.2mm. The UI says so. Do not
  "fix" this by picking one chart and presenting it as certain.

## Commands

```bash
npm run verify    # 22 conversion assertions
npm run build     # sitemap and robots exist only after this
npm run preview   # test against this, not dev
npm run deploy    # Cloudflare Pages
```
