# PROJECT OVERRIDES — read before the Aurelian Precision system below

The supplied system is **Aurelian Precision** (Google Stitch export, provided by the site owner
27 Aug 2026). It replaces the previous Vercel-derived system, which is kept at
`DESIGN.vercel.md.bak` for reference only.

We follow it. **Four things had to change, and they are listed here rather than applied quietly.**

## 1. ⚠️ Its primary button specification fails WCAG

The system states: *"Primary buttons use a solid Gold (#D4AF37) fill with white text."*
Measured:

```
FAIL  white on #D4AF37   2.10:1   (4.5:1 required for normal text)
PASS  white on #735C00   6.44:1
PASS  #1A1C1C on #D4AF37 8.14:1
```

Its hover state — *"transition to Rose Gold (#E1B382)"* — fails the same way with white text.

**Our rule.** Two gold tokens, with the split enforced by their contrast:

| Token | Value (light) | Use |
|---|---|---|
| `--accent` | `#735C00` | button fills with white text, links, small accent text, borders |
| `--accent-bright` | `#D4AF37` | slider thumbs, marks, decorative fills, fills carrying **dark** text only |

`--accent-bright` must never carry white text at any size. `--on-accent-bright` (`#241A00`) is the
only text colour permitted on it.

## 2. `outline` is too light for text

`#7F7663` measures **4.27:1** on `#F9F9F9`. Our `--text-faint` is `#6E6656` (**5.39:1**). It stays
available as a border colour, where 3:1 applies.

## 3. The system has no dark mode. We derived one.

Aurelian ships light tokens only. Dark mode is a verified differentiator here — **none of the four
audited competitors has it** — so it is not optional. Derived from the system's own dark-adjacent
values (`inverse-primary`, `on-primary-fixed`) and measured:

```
PASS  text   #F2EFE9 on #141311   16.18:1
PASS  muted  #B3ADA0 on #141311    8.31:1
PASS  faint  #8A8375 on #1C1A17    4.62:1
PASS  accent #E9C349 on #141311   10.93:1
PASS  #241A00 on #E9C349 fill     10.11:1
```

In dark, `--accent` and `--accent-bright` converge on `#E9C349` — the light-mode split exists to
solve a contrast problem that does not arise on a dark ground.

## 4. Implementation differences from the supplied `code.html`

The export is a Stitch prototype, not production code:

| Their export | Ours | Why |
|---|---|---|
| `cdn.tailwindcss.com` | Tailwind 4, compiled | The CDN build is explicitly not for production |
| Google Fonts via `<link>` | Self-hosted variable subsets | No third-party request; Playfair 38KB + Inter 47KB, latin only, preloaded |
| Material Symbols icon font | Inline SVG | The icon font is ~100KB+ for a handful of glyphs |
| Stock photo hero | ⚠️ **not implemented — see below** | We have no licence for it |

**On the hero photograph.** The mockup shows a stock photo of hands wearing rings. It is a large
part of why the design reads as luxury. We have not implemented it because **we do not hold a
licence for that image**, and a hero image is the LCP element on the page. If the owner wants one,
it needs to be properly licensed, and served as AVIF/WebP at correct dimensions with explicit
`width`/`height` and `fetchpriority="high"`.

## 5. Standing rules that survive the change

- Dark mode on every page, no flash on load.
- All measurements use `font-variant-numeric: tabular-nums` — figures must not shift the layout
  while a slider moves.
- `body` carries an explicit `background: var(--bg)`. Never transparent.
- Live tokens live in `src/styles/global.css`. **Never hardcode a hex in markup.**
- One accent family. No second accent, no gradients.
- Nothing animates on scroll. No entrance animations.

## What we took gladly

The result-figure boxes (small uppercase label above a large serif number in a bordered card) are
better than the table row they replace. The three-panel method cards — icon panel left, materials
and numbered steps right — are clearer than prose. Both are worth adopting.

**On Playfair Display:** I previously argued against it as a wedding-site cliché. Rendered in this
system at 600 weight with tight tracking, it reads as editorial rather than bridal. That objection
was overcautious; the owner's choice is the better one.

---

---
name: Aurelian Precision
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4d4635'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7f7663'
  outline-variant: '#d0c5af'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#e9c349'
  secondary: '#7b572e'
  on-secondary: '#ffffff'
  secondary-container: '#ffce9b'
  on-secondary-container: '#7a562d'
  tertiary: '#5f5e5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#b4b2b2'
  on-tertiary-container: '#454544'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffddbb'
  secondary-fixed-dim: '#edbe8c'
  on-secondary-fixed: '#2b1700'
  on-secondary-fixed-variant: '#604019'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style

The design system is centered on a **Premium Minimalist** aesthetic, tailored for a luxury retail environment. It balances the precision required for a technical tool with the emotional elegance of high-end jewelry. The interface emphasizes high-quality white space to evoke a sense of calm and exclusivity.

- **Minimalism:** Use generous margins and padding to ensure the UI feels unhurried and focused.
- **Modern Elegance:** A sophisticated blend of editorial typography and soft, tactile UI elements.
- **Emotional Response:** The user should feel a sense of trust, precision, and "digital craftsmanship" while interacting with the calculator.

## Colors

The palette is a sophisticated mix of precious metal tones and deep neutrals.

- **Primary (Gold):** Used for primary actions, success states, and key interactive highlights.
- **Secondary (Rose Gold):** Used for subtle accents, secondary interactive states, and decorative elements.
- **Neutral (Off-White):** The foundational background color, providing a soft, non-reflective surface that feels more premium than pure white.
- **Primary Text (Charcoal):** Provides high legibility and a grounded, authoritative feel against the soft background.
- **Borders/Shadows:** Light gray (#E5E5E5) is used for structural definition without introducing visual clutter.

## Typography

This design system uses a classic pairing of a high-contrast serif and a systematic sans-serif.

- **Headlines:** Use Playfair Display for all headings to establish a luxury editorial feel. Keep tracking tight on larger display sizes.
- **Body:** Inter is used for its exceptional legibility and neutral character, ensuring the technical aspects of ring sizing are easy to digest.
- **Labels:** Small labels and captions use Inter with increased letter spacing and uppercase styling to denote hierarchy and "technical" precision.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain an editorial "lookbook" feel, transitioning to a fluid layout for mobile devices.

- **Grid:** Use a 12-column grid for desktop with wide 24px gutters.
- **Rhythm:** Spacing follows an 8px base unit. Section gaps should be aggressive (80px+) to allow the design to breathe.
- **Safe Areas:** Maintain a minimum side margin of 20px on mobile to prevent content from feeling cramped against the screen edges.

## Elevation & Depth

Hierarchy is achieved through **Ambient Shadows** and tonal layering.

- **Surface Strategy:** The primary background is `#F9F9F9`. Interactive cards use a pure white (`#FFFFFF`) surface to "lift" off the page.
- **Shadows:** Use extremely soft, diffused shadows with a slight warm tint (e.g., `rgba(212, 175, 55, 0.05)`) for elevated cards. Avoid harsh, high-opacity blacks.
- **Depth Levels:**
  - **Level 0:** Background surface.
  - **Level 1:** Content cards and input containers (1px subtle border or 4px blur shadow).
  - **Level 2:** Active modals or dropdowns (12px blur shadow).

## Shapes

The shape language is **Soft and Organic**.

- **Corners:** Use a default 0.5rem (8px) radius for standard components, but favor the `rounded-xl` (1.5rem / 24px) setting for main calculator containers and large buttons to emphasize the premium, friendly nature of the tool.
- **Interactive Elements:** Buttons and toggles should feel "pill-like" where possible to encourage touch interaction.

## Components

- **Cards:** Elevated white containers with `rounded-xl` corners and a 1px border of `#E5E5E5`. Used to house the main calculator logic.
- **Buttons:** Primary buttons use a solid Gold (#D4AF37) fill with white text. Hover states should transition to Rose Gold (#E1B382). Apply `rounded-xl` for a soft, tactile feel.
- **Inputs & Sliders:** Use thin, 1px charcoal lines for slider tracks. The "thumb" or handle of the slider should be a polished Gold circle.
- **Toggles:** Use a "pill" shape with a soft background. The active state should move a white circular handle across a Rose Gold track.
- **Measurement Tool:** A specialized visual component representing a physical ruler or ring circle. Use Charcoal for measurement marks and Gold for the active "selected" size indicator.
- **Feedback States:** Use subtle transitions. Success messages should use the Gold color palette rather than a standard "utility green" to maintain brand harmony.