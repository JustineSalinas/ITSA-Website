# A3 — Interactive Components Specification

**Owner:** Alexander Tolosa · **Status:** Draft for review · **Unblocks:** Z2, Z3, Z4, Z5 (and the Z6 accessibility pass)

This document says how each public-site interactive component must look and
behave, so the build tasks (Z2–Z6) can start without guessing. Visual choices
follow `DESIGN.md` (colours, fonts, radii, the flat-at-rest rule). Where this
spec and `DESIGN.md` disagree on visuals, `DESIGN.md` wins.

Each section starts from what exists today, then lists what changes.

---

## 0. Rules that apply to every component

These are the Z6 accessibility baseline. A component is not done until it meets all of them.

1. **Keyboard.** Everything a mouse can do, the keyboard can do. Tab order follows reading order. No keyboard traps except inside an open dialog (see 3).
2. **Focus.** A visible focus ring on every control (the existing 3px blue `ring-ring/50`). Never remove the outline without replacing it.
3. **Reduced motion.** Respect `prefers-reduced-motion`. CSS animation is handled globally. Anything driven by JavaScript (timers, framer-motion) must use the `useReducedMotion` hook in `src/hooks/use-reduced-motion.ts` and fall back to an instant change.
4. **Touch.** Tap targets are at least 44×44 px, and nothing is reachable only by hover.
5. **Screen readers.** Controls have a text label that names the action. Do not pair `aria-pressed` with a label that changes (this caused a real bug in PR #15). State changes that matter (results count, dialog open) are announced with a polite live region or correct dialog semantics.
6. **Colour.** Text meets 4.5:1 contrast in light and dark mode. Orange is never used for text or a text button.
7. **Empty, loading and error states** are defined for every component.
8. **Small screens.** Designed at 360 px wide first. No horizontal page scroll.
9. **Components.** Use the existing shadcn/Base UI pieces (`Dialog`, `Button`, `Badge`, `Card`) instead of building new ones.

---

## 1. Events filter (Z2)

**Today:** `src/components/events/events-client.tsx` has three tabs (All / Upcoming / Past) with counts, plus a static "Filtered by date & relevance" label that does nothing.

**Goal:** let a visitor find an event quickly as the list grows.

**Data available:** `title`, `description`, `eventDate`, `location`. There is no category field, so a category filter is out of scope until the data model gets one.

### Controls
| Control | Behaviour |
|---|---|
| Time tabs | All / Upcoming / Past, with counts (keep). Default: **Upcoming** if any exist, otherwise All. |
| Search box | Free text, matches title, description and location, case-insensitive. Filters as the visitor types (no submit button). |
| Clear | A "Clear filters" button appears only when a search is active or a non-default tab is chosen. |

The decorative "Filtered by date & relevance" label is removed. It claims something that is not true.

### Behaviour
- Order: Upcoming soonest first; Past most recent first.
- The chosen tab and search text are kept in the URL (`?when=past&q=workshop`) so a filtered view can be shared and the back button works.
- A result count sits beside the controls ("3 events") and is in an `aria-live="polite"` region so screen readers hear it change.

### States
- **Empty (no events at all):** existing dashed card, "We are currently scheduling new activities."
- **No matches:** dashed card that names the search ("No events match 'xyz'") with a Clear filters button.
- **Loading:** not needed; events are server-rendered.

### Accessibility
- Tabs are a `role="tablist"` group or a group of toggle buttons with `aria-pressed` and a **fixed** label (fixed labels are safe with `aria-pressed`).
- Search box has a visible or screen-reader label ("Search events").
- Card enter/exit animation uses the reduced-motion hook; with reduced motion, cards swap instantly.

---

## 2. News timeline (Z3)

**Today:** `src/app/(public)/news/page.tsx` renders every article as a large full-text card in one long stack.

**Goal:** a scannable timeline so a visitor can see what happened when, and jump to an article.

**Data available:** `title`, `excerpt`, `date`, `category`, `author`, `tags`, `images`.

### Layout
- A vertical timeline, newest first, grouped under **year and month headings** ("September 2026").
- Each entry: date, category badge, title, excerpt, and one thumbnail (first image, if any). Full text is **not** shown in the timeline.
- Desktop: line down the left, entries on the right. Mobile: the same, with the line thinner and the thumbnail above the text.
- The timeline line and date dots use brand blue/cyan; the current-month dot may use the orange spark (decorative only).
- Do not use coloured left-border stripes as the accent (`DESIGN.md` bans them). The line is a separate element.

### Behaviour
- Selecting an entry expands it in place to show the full article and photo gallery (the existing `NewsMediaGallery`). One open at a time is not required.
- The expand button is a real `<button>` with `aria-expanded` and `aria-controls`; label is the article title.
- Each article keeps its `#slug` anchor, so existing links and the home page "latest news" links still land on it and open it.
- Optional category filter chips above the timeline (same pattern as the events tabs). Only shown when more than one category exists.

### States
- **Empty:** dashed card, "No news yet. Check back soon."
- **Long lists:** show the first 10 entries, then a "Show more" button (not infinite scroll, which harms keyboard use).

### Accessibility
- The timeline is an ordered list (`<ol>`); each month heading is a real heading.
- Expanding an entry does not move focus away from the button. Reduced motion: expand instantly.

---

## 3. Photo lightbox (Z4)

**Today:** photos appear in `NewsMediaGallery` (slideshow with pause, arrows, dots) and on event cards. Clicking a photo does nothing.

**Goal:** click or tap any news photo to view it large.

### Opening
- The slideshow image becomes a button ("View photo 2 of 5, larger"). The existing pause, arrow and dot controls are **not** triggers.
- Opening pauses the slideshow.

### The viewer
- Built on the existing shadcn `Dialog` (Base UI), which already provides focus trapping, Escape to close, and scroll lock.
- Dark backdrop, image fitted to the screen (never cropped), photo count ("2 / 5") and the article title as the caption.
- Controls: Close (top right), Previous / Next arrows. Arrows are hidden when there is only one photo.

### Input
| Action | Result |
|---|---|
| Escape, Close button, click backdrop | Close |
| Left / Right arrow keys | Previous / next |
| Swipe left / right (touch) | Next / previous |
| Tab | Cycles within the viewer only |

- Wrapping: after the last photo, Next goes to the first.
- On close, focus returns to the photo that opened it, and the slideshow does **not** resume by itself if it was already paused.

### States
- **Loading:** grey skeleton the size of the image until it loads.
- **Failed image:** a message "This photo could not be loaded" with the Close button still working.
- **Preload:** the next photo is preloaded so arrows feel instant.

### Accessibility
- `role="dialog"`, `aria-modal="true"`, labelled by the caption.
- Each image keeps its alt text ("Title – Photo 2 of 5"); a polite live region announces the new photo on change.
- Reduced motion: no zoom or slide transitions, a plain fade or instant swap.

---

## 4. Org chart (Z5)

**Today:** `src/components/officers/org-chart.tsx` shows a fixed layout: adviser and chairman, three Internal/External/Secretariat cards, then four department cards. It finds people by matching text in position titles, and it uses amber for the adviser card, which is outside the brand palette.

**Goal:** an org chart that is easy to read on a phone and does not silently drop people.

### Structure (keep)
Tier 1 Adviser and Chairman → Tier 2 Directorate office → Tier 3 four departments with their committee leads.

### Changes
- **Phone layout:** each department is a collapsible section (`<button aria-expanded>`), all closed except the first. On desktop all four are open and there is no toggle.
- **Officer detail:** selecting a person opens a small panel (the same Dialog) with name, position, and department. Photos and contact links are shown only if the data has them (today it does not, so this is a name/position card).
- **Connecting lines:** drawn with plain elements as they are now. They are decorative and hidden from screen readers.
- **Colour:** replace the adviser's amber with the brand palette (neutral card with a blue label) so it matches `DESIGN.md`. Orange stays decorative only.
- **Missing roles:** if a role is not found in the data, show a labelled "Vacant" card instead of removing it, and log nothing to the visitor.

### Accessibility
- The chart is exposed as nested lists (department → committee leads → sub-leads), so a screen reader hears the hierarchy in order.
- Officer cards that open a panel are buttons; those that do not are plain text (no fake buttons).
- Reduced motion: the entrance fade is skipped.

### Technical note for builders
Matching on text such as `position.includes("Technology")` breaks if a title is reworded. Prefer adding a stable `department` field to the officer data and grouping on that. Confirm with the data owner before changing the model, and remember `officers` in Firestore has field validation rules (`firestore.rules`, covered by `npm run test:rules`).

---

## 5. Out of scope

- Any AI or free-text chatbot (Ask ITSA stays a guided FAQ).
- Event categories and event registration.
- Admin-side changes.
- New animation that has no reduced-motion fallback.

## 6. Acceptance checklist (use for every component PR)

- [ ] Works with keyboard only, focus ring always visible
- [ ] Works at 360 px wide and with touch only
- [ ] Reduced motion removes JS-driven motion
- [ ] Light and dark mode both pass contrast
- [ ] Empty, no-match and error states exist
- [ ] Screen reader announces results, dialogs and expanded/collapsed state correctly
- [ ] Matches `DESIGN.md` (no cream, no orange text, flat at rest)

## 7. Open questions for the team

1. **Events:** should the default tab be Upcoming or All?
2. **News:** is the excerpt-only timeline acceptable, or must full text stay visible on the page?
3. **Org chart:** who owns the officer data model, and is a `department` field acceptable?
4. **Photos:** do event cards also get the lightbox, or news only?
