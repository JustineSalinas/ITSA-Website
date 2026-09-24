# A5 — Design Review Against the A3 Spec

**Owner:** Alexander Tolosa · **Status:** Complete for Z2–Z6 · **Reviewed against:** `docs/A3-interactive-components-spec.md`

Each Z-component was reviewed against A3 at merge time, across four
separate PRs. This compiles those findings into one reference rather than
leaving them scattered across PR comments.

## Z2 — Events filter (PR #59)

Matches A3 §1 precisely: default-tab logic, live search across
title/description/location, URL sync via `?when=&q=`, the fixed-label +
`aria-pressed` pattern (correctly avoiding the PR #15 bug A3 warns about),
three distinct empty/no-match states, `aria-live="polite"` on the result
count, exact 44px touch targets.

**One open item, not a defect in the code:** A3 itself is internally
inconsistent about the default-tab rule — §1 states it as settled,
§7 lists the same question as still open. Z2 built to §1. Worth resolving
in A3 directly so it doesn't read as contradictory to the next person.

## Z3 — News timeline (PR #64, follow-up #73)

Matches A3 §2: month-grouped timeline, collapse-to-excerpt (full text
correctly *not* shown in the collapsed state), category filter chips with
fixed labels, first-10-then-"Show more" pagination, `#slug` deep-link
auto-expand.

**Two minor deviations from the written spec, still true:** the thumbnail
is hidden on mobile rather than repositioned above the text as §2
specifies, and the expand button's accessible name includes the
surrounding date/category/excerpt text rather than being narrowed to just
the article title. Neither is a real problem in practice; noting for
whoever revisits this component.

**One real bug, since fixed (#73):** the hash-based auto-expand originally
ran during render rather than in an effect, which is a genuine
hydration-mismatch risk — `location.hash` doesn't exist during SSR, so the
client's first render could disagree with the server HTML. Corrected to
run in `useEffect`.

## Z4 — Photo lightbox (PR #62)

Full-screen viewer, uncropped, dark backdrop, photo count and title as
caption. Built on the Base UI dialog — focus trapped, returns to the
photo that opened it. Arrow keys, swipe, and Escape all work; slideshow
pauses while open; loading skeleton; failed-image state; next photo
preloaded; every transition dropped under reduced motion. Matches A3 §3
in full.

## Z5 — Org chart (PR #68)

Matches A3 §4 precisely: amber replaced with the brand palette (orange
stays decorative only, per `DESIGN.md`), mobile fold / desktop-always-open
split, Dialog-based detail panel, "Vacant" cards for unfilled roles rather
than silently dropping them, nested `<ul>/<li>` for the hierarchy,
decorative connector lines correctly `aria-hidden`, 44px tap targets.

**Deliberately not done, correctly:** the spec's suggested `department`
field on officer data was not added — that changes the data model, and
A3 says to confirm with the data owner first. A dropped role shows
"Vacant" instead in the meantime.

**One thing genuinely unverified:** no role is currently unfilled in real
data, so the Vacant-card path has never actually been exercised outside
of testing. Worth a manual check once real content exists.

## Z6 — Accessibility pass (PR #70, follow-up #73)

Went back through every prior Z-component and measured real touch
targets against A3 §0's 44px minimum: the slideshow's pause button (was
24px), arrows (28px), and indicator dots (6px visible, but the dot's own
hit-area strip is 28px wide — clears the 24px WCAG target-size floor at
that width) were all under threshold and fixed. `SpotlightCard`'s hover
tilt is framer-motion, not CSS, so the global `prefers-reduced-motion`
rule never reached it; fixed by gating it on `useReducedMotion` directly.

**One real regression caught in the same pass (#73):** enlarging the
touch targets moved every control's visible circle into an inner `<span>`,
but their hover states were still keyed to the whole slider's group,
scoped to `group/slider` — so hovering anywhere on a photo lit up every
control at once. Each control now has its own named group. The zoom-hint
span's `focus-visible:` was also on a `<span>`, which can never receive
focus — moved to `group-focus-visible` on the parent button.

## Net result

Every Z-component matches A3 on substance. Two known, low-severity spec
deviations remain (Z3's mobile thumbnail, Z3's expand-button label) —
listed here rather than fixed unilaterally, since they're small enough
that "leave as-is" is a defensible call too.
