# S4 — Retire the Firebase Content Collections

**Issue:** #54  
**Date:** 2026-09-27  
**Author:** Twice Navarro  
**Approach:** Two-PR migration (B)

---

## Scope

Remove the Firestore read/write paths for content collections once Sanity is verified as the live content source. The two PRs keep the site serving real data at all times — the Firestore fallback stays in place until Sanity is confirmed working in production.

### Collections being retired

| Collection | Status |
|---|---|
| `events` | Firestore-backed; has rules; has admin write UI — fully retired |
| `officers` | Firestore-backed; has rules; has admin write UI — fully retired |
| `news` | Admin SDK read path only (no rules); Firestore fallback removed |
| `projects` | Never Firestore-backed; no change needed |

### Untouched throughout

`applications`, `mail`, `rate_limits`, `ask_log` — none of these are content collections and none are touched by either PR.

### D4 superseded

Issue #34 (migrate officer records to Firestore) is superseded by this work. Sanity is the officer store going forward. Close #34 when PR 2 merges.

---

## PR 1 — Add Sanity events read path

**Goal:** Wire `getEvents()` into Sanity so the Firestore fallback becomes genuinely unnecessary. No deletions yet.

### New file: `src/sanity/lib/events.ts`

`getSanityEvents()` — follows the exact pattern of `getSanityNews()` and `getSanityOfficers()`:
- Calls `getSanityClient()`; returns `null` if unconfigured
- Queries `*[_type == "event"] | order(eventDate desc)` for `id`, `title`, `slug`, `eventDate`, `location`, `description`, `coverImage`
- Shapes results into the existing `EventItem` type using `urlForImage()` for the cover
- Catches fetch errors, logs them, returns `null` so the caller falls back gracefully

### Updated: `src/lib/data.ts` — `getEvents()`

New priority stack matching news and officers:
1. `getSanityEvents()` — if configured and returns data, use it
2. Firestore (`getAdminDb().collection("events")`) — kept as fallback for now
3. `placeholderEvents` — dev fallback when nothing is configured

No other files change in PR 1.

### Verification before PR 2

- `/events` and `/events/[slug]` serve real data from Sanity in production
- Temporarily unset `NEXT_PUBLIC_SANITY_PROJECT_ID` locally and confirm the Firestore fallback still works

---

## PR 2 — Teardown

**Prerequisite:** PR 1 deployed and verified in production.

### `src/lib/data.ts`

- Remove Firestore fallback blocks from `getNews()`, `getOfficers()`, and `getEvents()`
- Delete now-unused helpers: `toNewsItem`, `toEvent`, `toOfficer`, `isLive`, `onReadFailure`, `isProduction`
- Remove `getAdminDb` and `isAdminConfigured` imports from `@/lib/firebase/admin`
- Each of the three public functions becomes: try Sanity → bundled/placeholder fallback

### `src/lib/firebase/db-client.ts`

Remove all officer and event functions and their payload helpers:
- `fetchOfficers`, `createOfficer`, `updateOfficer`, `deleteOfficer`, `officerPayload`, `socialsFromInput`
- `fetchEvents`, `createEvent`, `updateEvent`, `deleteEvent`, `eventPayload`

Keep: `fetchApplications`, `updateApplicationStatus`, `actor`, `createdStamp`, `updatedStamp`, `isLive`.

### `firestore.rules`

- Remove `hasValidOfficer()` and `hasValidEvent()` helper functions
- Remove `match /officers/{officerId}` block
- Remove `match /events/{eventId}` block
- Deploy: `firebase deploy --only firestore`

The Firestore collection data is left in place as a passive backup. Rules removal closes off client access without destroying records.

### Admin pages and shell

- Delete `src/app/admin/(protected)/events/page.tsx`
- Delete `src/app/admin/(protected)/officers/page.tsx`
- `src/components/admin/admin-shell.tsx` — remove the `events` and `officers` entries from the `adminNav` array; remove the `CalendarDays` and `Users` lucide imports
- `src/app/admin/(protected)/page.tsx` — the dashboard currently fetches `fetchEvents()` and `fetchOfficers()` to show stat cards. Remove those calls, the `counts` state, and the two `StatCard` renders. Replace with a simpler dashboard pointing only to the Enquiries page (or a plain heading if nothing else is needed)

### `tests/firestore.rules.test.mjs`

Remove test cases for the `officers` and `events` collections — they will fail against a rules file that no longer has those match blocks. Run `npm run test:rules` to confirm the suite passes after removal.

### Close D4

Comment on issue #34 that S4 supersedes it and close the issue.

---

## Testing

### PR 1

| Check | Method |
|---|---|
| Events page serves Sanity data in production | Manual — `/events` |
| Event detail pages resolve | Manual — `/events/[slug]` |
| Firestore fallback still works | Local: unset `NEXT_PUBLIC_SANITY_PROJECT_ID`, confirm page loads |

### PR 2

| Check | Method |
|---|---|
| Build passes with no type errors | `npm run build` |
| Lint passes | `npm run lint` |
| Rules tests pass | `npm run test:rules` |
| Events, news, officers, projects pages load | Manual smoke test in production |
| Admin dashboard has no dead nav links | Manual — admin pages |
