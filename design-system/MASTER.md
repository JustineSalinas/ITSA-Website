# ITSA Design System (Extracted)

## Core Palette
The ITSA brand relies on a deep navy primary with warm orange/gold accents. It is not a standard gray/slate theme.

- **Background**: `oklch(0.992 0.003 250)` (near-white cool)
- **Foreground**: `oklch(0.14 0.04 255)` (deep ink)
- **Primary / Brand**: `oklch(0.26 0.11 255)` (Brand Blue)
- **Brand Cyan**: `oklch(0.48 0.12 230)`
- **Brand Orange**: `oklch(0.62 0.15 70)`
- **Brand Red**: `oklch(0.55 0.18 28)`
- **Gold**: `oklch(0.62 0.15 70)`

## Gradients
- **Hero Heading Gradient**: The signature navy→mauve→rust gradient is achieved via `bg-gradient-to-r from-primary via-blue-900 to-amber-700 bg-clip-text text-transparent`. 

## Typography
- **Heading (`font-heading`)**: Bricolage Grotesque
- **Body (`font-sans`)**: Geist
- **Mono (`font-mono`)**: Geist Mono

## Structural Styles
- **Border Radius**: Base `--radius` is `0.75rem`. Cards use this scaling (e.g., `rounded-xl`).
- **Shadows & Hover States**: Cards are flat by default with a subtle border. On hover, they lift on the Y-axis (`-6px`) and use a primary-tinted shadow (`hover:shadow-xl hover:shadow-primary/5`).
- **Card Containers**: Overflows hidden, `bg-card/70` with `backdrop-blur-md`.

*This system was extracted directly from the existing `globals.css` and homepage codebase. Do not replace with generic AI templates.*
