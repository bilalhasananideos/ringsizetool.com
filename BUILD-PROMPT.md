# Build prompts — ringsizetool.com

Two versions. **Read the warning before using version A.**

---

## ⚠️ Version A — only if starting completely from scratch

This is the video's format, adapted to this site. **Running it in the existing project will rebuild
everything** — the working tool, the verified conversion engine, 1,500 words of content, the
design. Use it only in an empty folder.

```
I have initialized a new AstroJS project. Use the astro-docs MCP, the tailwind-4-docs skill and
the web-design-guidelines skill. Also read DESIGN.md and follow it — including its PROJECT
OVERRIDES section, which takes priority over the Vercel analysis below it.

Name: Ring Size Tool
Domain: ringsizetool.com

Create a ring sizer website. The core tool must work entirely in the browser with no server, no
API and no uploads. It needs screen calibration and three ways to measure:

  Method 1: Place a ring you own on the screen and match its inner edge
  Method 2: Measure your finger with a paper strip and enter the length
  Method 3: Enter a diameter you already know

Calibrate against a bank card — every card is 85.60 x 53.98 mm (ISO/IEC 7810 ID-1). Save the
calibration to localStorage so repeat visits skip that step. Warn the user that browser zoom must
be at 100%.

Output the size simultaneously in US/Canada, UK/Australia, EU/ISO, Japan, India, France/Italy/Spain
and Brazil, in quarter sizes, plus diameter and circumference in mm, cm and inches.

CRITICAL — the numbers are the product:
Do not copy any conversion value from a competitor's chart. Published ring size charts contradict
each other and even themselves. Compute every value from the published standard, from a single
canonical axis (inner diameter in mm), with circumference as pi x diameter so that no two outputs
can disagree. Standards: ISO 8653:2016 (EU), BS EN 28653:1993 (UK, A = 37.5 mm circumference,
+1.25 mm per letter), JIS S 4700:2022 (Japan, size 1 = 13 mm diameter, +1/3 mm per size),
NBR 16058 (Brazil). US has no governing standard — the de facto scale is 0.458 in + 0.032 in per
size. India has NO standard at all and published charts differ by up to 0.2 mm: say so in the UI
rather than presenting one number as certain. Write a test that asserts your values against the
published tables.

Use MPA architecture, static output only, and Tailwind 4. Dark mode on every page with no flash on
load — none of the competitors has dark mode.

My competitors are:
  https://ringssizechart.com/   (currently ranks #1 — study why)
  https://measureringsize.com/
  https://brite.co/tools/ring-sizer/
  https://www.ringsize.app/

Visit each one and audit it properly. Note that the #1 ranking site has the WORST tool — it has no
screen calibration at all — and wins on content depth instead. So a better tool alone will not
win: I need the best tool AND the deepest page.

Tell me every concrete flaw you find and what you propose to do better before you write any code.
Then give me ideas I have not asked for.

Do not copy the design or UI from any of those websites.

Note: if a competitor blocks your fetch tool with a 403, open it in the browser pane instead.
```

---

## ✅ Version B — use this one now

The project exists. This is what to actually paste in a new session.

```
Read CLAUDE.md and sites/ringsizetool.com/STATUS.md, then continue from
"Next, in order". Explain in Roman Urdu.
```

That is all. Everything else — the keyword research, the competitor audit, the design decisions,
the standards, the gotchas — is already written down in those files and in RESEARCH.md.

---

## Why version A is much longer than the video's

The video's prompt is three short paragraphs. Four things were learned building this site that the
short version does not cover, and each one cost real time to discover:

1. **The #1 competitor has the worst tool.** It wins on content depth. A prompt that says "build a
   better tool" aims at the wrong target.
2. **Conversion data cannot be copied.** Charts contradict each other — three ranking sites give
   three different UK sizes for the same diameter, and the #1 contradicts itself. Without the
   "compute from the standard" instruction, an agent will copy a chart and inherit the errors.
3. **A downloaded DESIGN.md carries the source brand's identity.** Without pointing at the
   PROJECT OVERRIDES section, the agent produces a Vercel clone — blue, gradients, Geist.
4. **Competitors block fetch tools.** `ringssizechart.com` and `brite.co` both return 403. Without
   the note, the agent reports "cannot access" and audits nothing.
