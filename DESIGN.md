---
name: ITSA — Information Technology Student Association
description: The connected-network identity for USA's IT student org — vivid blue, warm orange spark, credible but never corporate.
colors:
  brand-blue: "oklch(0.49 0.19 254)"
  brand-blue-deep: "oklch(0.40 0.17 258)"
  brand-cyan: "oklch(0.70 0.13 232)"
  brand-orange: "oklch(0.70 0.18 52)"
  brand-red: "oklch(0.60 0.21 30)"
  gold: "oklch(0.72 0.17 58)"
  ink: "oklch(0.22 0.035 258)"
  muted-ink: "oklch(0.44 0.035 256)"
  background: "oklch(0.99 0.006 240)"
  surface: "oklch(1 0 0)"
  border: "oklch(0.90 0.014 250)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Geist, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bricolage Grotesque, Geist, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
rounded:
  md: "0.6rem"
  lg: "0.75rem"
  xl: "1.05rem"
  2xl: "1.35rem"
  3xl: "1.65rem"
  full: "9999px"
spacing:
  section: "clamp(4rem, 10vw, 7rem)"
  gutter: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.background}"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
    height: "2.25rem"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  chip-focus:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
---

# Design System: ITSA

## 1. Overview

**Creative North Star: "The Connected Network"**

ITSA's identity descends from one object: the organization's molecular logo — vivid blue and cyan nodes wired to warm orange ones by short links. Read it literally and it becomes the whole system: **nodes are students and skills; links are the community that connects them.** Every surface should feel like part of that graph — structured, alive, and quietly energetic. The blue carries the promise ("this org is legit and organized"); the orange is the spark of the people inside it ("and it's warm, human, run by students like you").

This is a **brand** register — the public site *is* the recruitment pitch. So it commits. Color is not a tint on a neutral page; a saturated blue carries hero and CTA surfaces, and orange is the deliberate counter-voice that keeps it from reading cold. The system is confident and credible without ever tipping into the thing it must not be: a **stiff corporate intranet**. Credibility here comes from craft, hierarchy, and restraint — not from grey enterprise chrome.

It equally rejects the **generic SaaS/AI template** (cream background, a tiny uppercase eyebrow over every section, four identical icon-cards, gradient-clipped headings) and the **amateur club page** (clip art, clashing colors, mismatched fonts). The site is the first proof that IT students here build good things; sloppiness or genericism undercuts the entire argument.

**Key Characteristics:**
- Committed blue identity, orange as the intentional spark — straight from the logo.
- Light by default (a phone glance in daylight), with a real dark mode — not dark-only.
- Expressive grotesque headings over a neutral, highly-readable body.
- The network motif (nodes + links + a soft dot field) recurs as the signature texture.
- Warm, direct, peer-to-peer voice. Confident, never bureaucratic.

## 2. Colors

A committed blue-and-orange complementary palette lifted from the ITSA logo, grounded on a near-white cool background (never cream).

### Primary
- **Brand Blue** (`oklch(0.49 0.19 254)`): The identity color and the only text-bearing action color. Primary buttons, links, active nav, hero/CTA fills, icon accents. In dark mode it lifts to `oklch(0.72 0.15 254)` for legibility. It is dark enough (AA) to carry near-white text on solid fills.
- **Brand Blue Deep** (`oklch(0.40 0.17 258)`): The center-node blue; gradient anchors and pressed states.
- **Brand Cyan** (`oklch(0.70 0.13 232)`): The lighter connective blue. Network links, gradient highlights, secondary nodes.

### Secondary (the spark)
- **Brand Orange** (`oklch(0.70 0.18 52)`): The counter-voice. Decorative nodes, glows, a warm link in the network, hover energy. Used as **fill and graphic**, not for text-bearing buttons (orange + white text fails contrast).
- **Brand Red** (`oklch(0.60 0.21 30)`): The hottest node; gradient terminus on orange nodes only. Sparingly.
- **Gold** (`oklch(0.72 0.17 58)`): Legacy accent, folded into the orange family for small fills and dots.

### Neutral
- **Ink** (`oklch(0.22 0.035 258)`): Deep blue-slate. All primary text. Never pure black.
- **Muted Ink** (`oklch(0.44 0.035 256)`): Secondary text — tuned to clear 4.5:1 on both background and white surfaces. This is deliberately darker than the old palette's washed-out grey.
- **Background** (`oklch(0.99 0.006 240)`): Near-white with a whisper of cool blue. **Not** cream, not warm.
- **Surface** (`oklch(1 0 0)`): Pure white cards lifting off the tinted background.
- **Border** (`oklch(0.90 0.014 250)`): Blue-tinted hairlines.

### Named Rules
**The Orange-Is-A-Spark Rule.** Orange never carries body text or a text button. It appears as nodes, glows, gradient tips, and hover energy — a minority voice (≤15% of any screen) whose job is warmth, not information.

**The No-Cream Rule.** The background is cool-white or a saturated brand fill. A warm/cream/sand body background is forbidden — it reads as the 2026 AI default and fights the logo's cool blues.

## 3. Typography

**Display Font:** Bricolage Grotesque (with Geist, sans-serif fallback)
**Body Font:** Geist (with system-ui fallback)
**Label/Mono Font:** Geist Mono

**Character:** An expressive, slightly quirky grotesque for headlines paired with a clean, neutral workhorse for text — contrast by role, not two near-identical sans-serifs. Bricolage brings human character (it keeps the org from reading corporate); Geist keeps long copy calm and legible. Mono is earned, not costume: this is literally an IT association, so mono labels read as native.

### Hierarchy
- **Display** (800, `clamp(2.5rem, 7vw, 4.25rem)`, 1.02, -0.025em): Hero headline only. Balanced wrap.
- **Headline** (700, `clamp(1.875rem, 4vw, 2.25rem)`, 1.1): Section titles (`h2`).
- **Title** (700, 1.125rem): Card and feature titles (`h3`).
- **Body** (400, 1rem, 1.6): Paragraphs. Measure capped ~65–75ch (`max-w-prose`).
- **Label** (500 mono, 0.75rem, uppercase where used): Kickers, metadata, the `01/02` list markers, focus tags.

### Named Rules
**The One-Kicker Rule.** A mono kicker is allowed **once**, in the hero (the school name). It is voice. Repeating a tiny uppercase eyebrow above every section is forbidden AI scaffolding — sections lead with the headline itself.

**The Heading-Font Rule.** `h1–h4` always render in Bricolage Grotesque via the base layer. Body and UI never do.

## 4. Elevation

Predominantly flat, with soft brand-tinted glow rather than hard drop shadows. Depth comes from tonal layering (tinted background vs. white surface vs. hairline border) and from atmospheric blur (`blur-3xl` brand glows behind hero and CTA). Shadows appear only as a **response to state** — cards lift on hover (`hover:shadow-md`), the network visual casts one soft blue shadow to feel physical.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: var(--shadow-md)` via `hover:shadow-md`): Cards on hover only.
- **Brand glow** (`drop-shadow(0 20px 40px rgba(47,86,214,0.18))`): Under the hero network only — atmosphere, not a UI shadow.

### Named Rules
**The Flat-At-Rest Rule.** Surfaces are flat by default. If a card has a resting drop shadow, it's too heavy — depth is tonal until the user interacts.

## 5. Components

### Buttons
- **Shape:** Gently rounded (`rounded-lg`, 0.75rem).
- **Primary:** Solid Brand Blue with near-white text; `hover:bg-primary/80`. The only text-bearing brand-colored button. Active state nudges down 1px.
- **Outline:** White surface, ink text, hairline border; `hover:bg-muted`. Used for secondary navigation ("All events", "Full team", "Explore events").
- **Ghost / Link:** Transparent; link variant uses Brand Blue with underline-on-hover. On the blue CTA panel, the ghost button flips to near-white text over `hover:bg-white/10`.
- **Focus:** 3px `ring-ring/50` (blue) with a border shift — always visible.

### Chips / Tags
- **Focus-area tags (hero):** Pill (`rounded-full`), `secondary/50` fill, hairline border, small medium text. A quiet inventory of what ITSA covers.
- **Event badge:** Small pill, solid brand for "Upcoming", secondary for "Past".

### Cards / Containers
- **Corner Style:** `rounded-xl` (cards), `rounded-3xl` (CTA panel).
- **Background:** White surface on the tinted page; dashed-border variant for empty states.
- **Shadow Strategy:** Flat at rest, `hover:shadow-md` lift. See Elevation.
- **Border:** Blue-tinted hairline.
- **Internal Padding:** Generous (`p-6`+); event card image bleeds to the top edge.

### Inputs / Fields
- **Style:** Hairline border on white/`input` surface, `rounded-lg`.
- **Focus:** Blue ring (`ring-ring/50`) + border shift.
- **Error:** `aria-invalid` drives a destructive border + ring.

### Navigation
- **Style:** Sticky, `backdrop-blur` translucent background, hairline bottom border.
- **States:** Muted-ink links; active link goes ink + a short Brand Blue underline bar. Theme toggle + solid "Join ITSA" button on the right. Mobile collapses to a right-side sheet.

### Signature Component — The Network Visual
An inline SVG constellation of gradient nodes (blue, deep-blue, orange) wired by thin links, wrapped in a `animate-float` group with per-node `animate-node` pulses (staggered delays). It is the literal expression of the North Star and doubles as the hero's required imagery. A faint radial **dot field** (masked, brand-colored) backs the hero and CTA to extend the same texture. All motion is CSS-driven so `prefers-reduced-motion` disables it globally.

## 6. Do's and Don'ts

### Do:
- **Do** treat the logo as the source of truth: blue nodes, orange spark, links between them. Recurring network/dot motifs are on-brand.
- **Do** keep Brand Blue as the single action color and orange as decoration/energy only.
- **Do** lead sections with the headline. Use the mono kicker exactly once (hero).
- **Do** keep body text at Muted Ink or darker — verify 4.5:1. The old washed-out grey is banned.
- **Do** ship the network SVG (or real student photography) as hero imagery; it is not optional decoration.
- **Do** render `h1–h4` in Bricolage Grotesque; keep body/UI in Geist.
- **Do** provide a non-motion fallback for every animation (handled globally via reduced-motion).

### Don't:
- **Don't** build a **stiff corporate intranet** — no grey enterprise chrome, dense bureaucratic tables as hero content, or lifeless institutional layouts. Credibility comes from craft.
- **Don't** ship the **generic SaaS/AI template**: no cream background, no tiny uppercase eyebrow over every section, no four identical icon-cards in a row, no `background-clip:text` gradient headings.
- **Don't** drift toward an **amateur club page** — no clip art, clashing colors, or mismatched fonts.
- **Don't** put white text on orange, or use orange for a primary button (contrast fails).
- **Don't** use `border-left`/`border-right` colored stripes as accents, or arbitrary `z-index` values — use the semantic z-scale.
- **Don't** reintroduce dark-only. Light is the default; dark is a real, maintained mode.
- **Don't** exceed a `clamp()` max of ~4.25rem on the hero or letter-spacing tighter than -0.04em.
