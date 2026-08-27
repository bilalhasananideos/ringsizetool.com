# ringsizetool.com — status

Last updated: 27 Aug 2026 · **Stage: tool works, content not written**

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

## Next, in order ⬜

1. **Homepage content** — the main ranking factor. Use the `tool-site-content` skill.
   Every section must trace to a real query. User reads it before it ships.
2. **FAQ + JSON-LD** — 21 PAA questions are listed in `RESEARCH.md`
3. **`/ring-size-chart`** — the complete chart, on the page, never gated behind a download
   (`CHART_ROWS` in `ringSizes.ts` already generates it)
4. **`/printable-ring-sizer`** — print CSS with real `mm` units + a print-scale check square.
   Not a PDF library. `printable ring sizer` is Easy at >1,000 volume and this is a real gap.
5. **`/how-to-measure-ring-size-without-a-ring-sizer`** — the 9-variant cluster, highest intent
6. SVG diagrams · logo + favicon (SVG, hand-drawn) · Lighthouse · `web-design-guidelines` audit
7. Deploy to Cloudflare Pages — **site stays `noindex`, submit nothing** until the domain is bought

Add each new page to `NAV` in `config.ts` only once it exists.

## Gotchas found the hard way

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
