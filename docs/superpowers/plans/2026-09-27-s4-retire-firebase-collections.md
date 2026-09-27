# S4 — Retire Firebase Content Collections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all Firestore read/write paths for content collections (events, officers, news) and their admin UI, leaving Sanity as the sole content source.

**Architecture:** Two-PR approach. PR 1 adds `getSanityEvents()` and wires it as the priority read path in `data.ts`, keeping the Firestore fallback alive. After PR 1 is verified in production, PR 2 deletes all Firestore read paths, admin content pages, `db-client.ts` write functions, and cleans `firestore.rules`. The Firestore collection data is left in place as a passive backup; only the code and rules that read/write it are removed.

**Tech Stack:** Next.js 16 App Router, Firebase Admin SDK, Sanity (`next-sanity`, `@sanity/image-url`), TypeScript, `node:test` for rules tests.

## Global Constraints

- Never touch `applications`, `mail`, `rate_limits`, or `ask_log` collections — they are not content collections.
- `storage.rules` is unrelated to this work — do not touch it.
- `import "server-only"` stays at the top of `src/lib/data.ts` — Sanity fetches are server-side.
- Path alias `@/*` maps to `src/*`.
- Run `npm run build` and `npm run lint` after every PR's changes before committing.
- Run `npm run test:rules` after editing `firestore.rules` or `tests/firestore.rules.test.mjs`.

---

## ── PHASE 1: PR 1 — Add Sanity events read path ──

---

### Task 1: Create `src/sanity/lib/events.ts`

**Files:**
- Create: `src/sanity/lib/events.ts`

**Interfaces:**
- Consumes: `getSanityClient()` from `./client`, `urlForImage()` from `./news`, `EventItem` from `@/lib/types`
- Produces: `getSanityEvents(): Promise<EventItem[] | null>` — returns `null` when Sanity is unconfigured or unreachable (not `[]`), so callers can distinguish "no CMS" from "empty CMS"

- [ ] **Step 1: Create the file**

```typescript
// src/sanity/lib/events.ts
import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import type { EventItem } from "@/lib/types";
import { getSanityClient } from "./client";
import { urlForImage } from "./news";

const eventsQuery = defineQuery(`
  *[_type == "event" && defined(slug.current)] | order(eventDate desc) {
    "id": _id,
    title,
    "slug": slug.current,
    eventDate,
    location,
    description,
    coverImage
  }
`);

type SanityEvent = {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  location: string;
  description: string;
  coverImage?: SanityImageSource;
};

/**
 * Published events, newest first. Returns null — not [] — when Sanity is
 * unconfigured or unreachable, so the caller can tell "CMS said no events"
 * apart from "there is no CMS" and fall back accordingly.
 */
export async function getSanityEvents(): Promise<EventItem[] | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const docs = await client.fetch<SanityEvent[]>(eventsQuery);
    return docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      eventDate: doc.eventDate,
      location: doc.location,
      description: doc.description,
      imageUrl: doc.coverImage ? (urlForImage(doc.coverImage) ?? "") : "",
    }));
  } catch (error) {
    console.error("[sanity] events fetch failed:", error);
    return null;
  }
}
```

- [ ] **Step 2: Verify the build accepts the new file**

```bash
npm run build
```

Expected: build completes with no type errors. If TypeScript complains about `SanityImageSource` or `defineQuery`, check that the imports match the exact paths used in `src/sanity/lib/news.ts` (they should — this file mirrors that pattern exactly).

- [ ] **Step 3: Commit**

```bash
git add src/sanity/lib/events.ts
git commit -m "feat(S4): add getSanityEvents() — Sanity read path for events"
```

---

### Task 2: Wire `getSanityEvents()` into `data.ts`

**Files:**
- Modify: `src/lib/data.ts`

**Interfaces:**
- Consumes: `getSanityEvents(): Promise<EventItem[] | null>` from Task 1
- Produces: `getEvents()` now tries Sanity first; Firestore fallback kept intact

- [ ] **Step 1: Add the import to `data.ts`**

At the top of `src/lib/data.ts`, alongside the existing Sanity imports, add:

```typescript
import { getSanityEvents } from "@/sanity/lib/events";
```

The import block should now read:

```typescript
import { getSanityNews } from "@/sanity/lib/news";
import { getSanityOfficers } from "@/sanity/lib/officers";
import { getSanityEvents } from "@/sanity/lib/events";
```

- [ ] **Step 2: Update `getEvents()` to try Sanity first**

Replace the existing `getEvents()` function body:

```typescript
export async function getEvents(): Promise<EventItem[]> {
  const sanityEvents = await getSanityEvents();
  if (sanityEvents && sanityEvents.length) return sanityEvents;

  if (!isAdminConfigured) return placeholderEvents;
  try {
    const snap = await getAdminDb()
      .collection("events")
      .orderBy("eventDate", "desc")
      .get();
    const events = snap.docs
      .filter((d) => isLive(d.data()))
      .map((d) => toEvent(d.id, d.data()));
    return events.length ? events : placeholderEvents;
  } catch (err) {
    onReadFailure("getEvents", err);
    return placeholderEvents;
  }
}
```

The Firestore block (lines 3–12 above) is intentionally kept — it will be removed in PR 2 after production verification.

- [ ] **Step 3: Build and lint**

```bash
npm run build && npm run lint
```

Expected: clean — no errors or warnings introduced.

- [ ] **Step 4: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat(S4): wire getSanityEvents() into data.ts — Sanity-first with Firestore fallback"
```

---

### ⚠️ VERIFICATION GATE — Do not proceed to PR 2 until this passes

Deploy PR 1 to production and verify manually:

1. `/events` renders real events served from Sanity (not placeholder cards)
2. `/events/[slug]` pages resolve and display correct content
3. Locally: unset `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`, run `npm run dev`, confirm `/events` still loads (falling through to Firestore or placeholder — either is correct)

Restore `NEXT_PUBLIC_SANITY_PROJECT_ID` before continuing.

---

## ── PHASE 2: PR 2 — Teardown ──

> **Ordering note:** Tasks 3 → 6 → 4 → 5 → 7 must be done in sequence within PR 2. Task 6 (removing admin page imports of `fetchOfficers`/`fetchEvents`) must precede Task 4 (deleting those functions from `db-client.ts`) so the build passes cleanly at every step.

---

### Task 3: Strip Firestore paths from `src/lib/data.ts`

**Files:**
- Modify: `src/lib/data.ts`

**Interfaces:**
- Produces: `getOfficers()`, `getEvents()`, `getEventBySlug()`, `splitEvents()`, `getNews()` — same signatures, now Sanity-first with bundled fallback only

- [ ] **Step 1: Replace the entire file**

The new `src/lib/data.ts` removes all Firestore imports, the `onReadFailure` / `isProduction` / `isLive` / `toNewsItem` / `toEvent` / `toOfficer` helpers, and all three Firestore fallback blocks:

```typescript
import "server-only";
import { placeholderEvents } from "@/data/placeholder";
import { realOfficers } from "@/data/officers";
import { newsData } from "@/data/news";
import { getSanityNews } from "@/sanity/lib/news";
import { getSanityOfficers } from "@/sanity/lib/officers";
import { getSanityEvents } from "@/sanity/lib/events";
import type { EventItem, Officer, NewsItem } from "@/lib/types";

export async function getOfficers(): Promise<Officer[]> {
  const sanityOfficers = await getSanityOfficers();
  if (sanityOfficers && sanityOfficers.length) return sanityOfficers;
  return realOfficers;
}

export async function getEvents(): Promise<EventItem[]> {
  const sanityEvents = await getSanityEvents();
  if (sanityEvents && sanityEvents.length) return sanityEvents;
  return placeholderEvents;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) ?? null;
}

export function splitEvents(events: EventItem[]) {
  const now = Date.now();
  const upcoming = events
    .filter((e) => new Date(e.eventDate).getTime() >= now)
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  const past = events
    .filter((e) => new Date(e.eventDate).getTime() < now)
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
  return { upcoming, past };
}

export async function getNews(): Promise<NewsItem[]> {
  const sanityNews = await getSanityNews();
  if (sanityNews && sanityNews.length) return sanityNews;
  return [...newsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
```

- [ ] **Step 2: Build and lint**

```bash
npm run build && npm run lint
```

Expected: clean. If `getAdminDb` or `isAdminConfigured` are flagged as unused elsewhere, they were already import-only in `data.ts` — the build error will point you to any remaining caller.

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "refactor(S4): remove Firestore read paths from data.ts — Sanity-first with bundled fallback"
```

---

### Task 6: Remove admin events/officers pages, update shell and dashboard

> **Do this before Task 4** — the dashboard page imports `fetchOfficers` and `fetchEvents` from `db-client.ts`. Removing the imports here first means the build is clean when Task 4 deletes those functions.

**Files:**
- Delete: `src/app/admin/(protected)/events/page.tsx`
- Delete: `src/app/admin/(protected)/officers/page.tsx`
- Modify: `src/components/admin/admin-shell.tsx`
- Modify: `src/app/admin/(protected)/page.tsx`

**Interfaces:**
- No public API changes

- [ ] **Step 1: Delete the two admin content pages**

```bash
git rm src/app/admin/(protected)/events/page.tsx
git rm src/app/admin/(protected)/officers/page.tsx
```

- [ ] **Step 2: Update `adminNav` in `admin-shell.tsx`**

In `src/components/admin/admin-shell.tsx`, replace the lucide import block:

```typescript
import {
  LayoutDashboard,
  LogOut,
  Mail,
  Loader2,
  ExternalLink,
} from "lucide-react";
```

Replace the `adminNav` array:

```typescript
const adminNav = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/applications", label: "Enquiries", Icon: Mail },
];
```

- [ ] **Step 3: Simplify `src/app/admin/(protected)/page.tsx`**

Replace the entire file. The old version fetched `fetchEvents()` and `fetchOfficers()` to show stat cards — those are gone now:

```typescript
"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the content that appears on the ITSA website.
        </p>
        <div className="mt-6">
          <Link href="/admin/applications">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Membership Enquiries</p>
                  <p className="mt-1 text-sm font-medium">
                    View and manage all membership applications
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
```

- [ ] **Step 4: Build and lint**

```bash
npm run build && npm run lint
```

Expected: clean — no remaining imports of `fetchOfficers` or `fetchEvents`.

- [ ] **Step 5: Commit**

```bash
git add src/components/admin/admin-shell.tsx src/app/admin/(protected)/page.tsx
git commit -m "refactor(S4): remove admin events/officers pages; simplify dashboard to enquiries only"
```

---

### Task 4: Prune `src/lib/firebase/db-client.ts`

**Files:**
- Modify: `src/lib/firebase/db-client.ts`

**Interfaces:**
- Produces: `fetchApplications(): Promise<Application[]>` and `updateApplicationStatus(id, status): Promise<void>` — unchanged signatures, everything else removed

- [ ] **Step 1: Replace the entire file**

Remove all officer and event functions (`fetchOfficers`, `createOfficer`, `updateOfficer`, `deleteOfficer`, `fetchEvents`, `createEvent`, `updateEvent`, `deleteEvent`) and their helpers (`actor`, `createdStamp`, `updatedStamp`, `isLive`, `officerPayload`, `socialsFromInput`, `eventPayload`). Keep only the two application functions:

```typescript
"use client";

import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import type { Application } from "@/lib/types";

export async function fetchApplications(): Promise<Application[]> {
  const snap = await getDocs(
    query(collection(getDb(), "applications"), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => {
    const data = d.data();
    const createdAt = data.createdAt;
    return {
      id: d.id,
      name: data.name,
      email: data.email,
      studentId: data.studentId ?? null,
      yearLevel: data.yearLevel ?? null,
      interest: data.interest,
      message: data.message,
      status: data.status ?? "new",
      createdAt:
        createdAt instanceof Timestamp
          ? createdAt.toDate().toISOString()
          : new Date().toISOString(),
    };
  });
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"],
): Promise<void> {
  const res = await fetch(`/api/admin/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to update status.");
  }
}
```

- [ ] **Step 2: Build and lint**

```bash
npm run build && npm run lint
```

Expected: clean. TypeScript will catch any remaining import of the removed functions (e.g. `fetchOfficers` in the dashboard page — that's handled in Task 6).

- [ ] **Step 3: Commit**

```bash
git add src/lib/firebase/db-client.ts
git commit -m "refactor(S4): remove officer and event functions from db-client.ts"
```

---

### Task 5: Clean `firestore.rules` and update the rules test

**Files:**
- Modify: `firestore.rules`
- Modify: `tests/firestore.rules.test.mjs`

**Interfaces:**
- No public API changes — this is rules and tests only

- [ ] **Step 1: Replace `firestore.rules`**

Remove the `hasValidOfficer()` and `hasValidEvent()` helpers and their `match /officers/` and `match /events/` blocks. The Firestore data itself is left in place as a passive backup:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // ── Admin identity ────────────────────────────────────────────────────
    // Two independent gates, both of which must pass:
    //   1. A custom claim (`admin: true`) minted by the Admin SDK. Claims live
    //      in the ID token, so they cannot be forged by the client.
    //   2. An /admins/{uid} document. This gives officers a revocation switch
    //      that takes effect immediately, without waiting for a token refresh.
    // Being merely signed in is NOT sufficient anywhere in this database.
    function isAdmin() {
      return request.auth != null
        && request.auth.token.admin == true
        && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // Officers may not edit their own admin grants; only the Admin SDK
    // (which bypasses these rules) may write this collection.
    match /admins/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }

    // ── Server-only collections ───────────────────────────────────────────
    // Written exclusively by the Admin SDK, which bypasses these rules.

    // Outgoing mail queue for the Trigger Email extension.
    match /mail/{docId} {
      allow read, write: if false;
    }

    // Join/contact submissions, so recruitment survives the inbox.
    match /applications/{docId} {
      allow read: if isAdmin();
      allow write: if false;
    }

    // Per-IP counters backing the contact-form rate limit.
    match /rate_limits/{docId} {
      allow read, write: if false;
    }

    // Tally of which "Ask ITSA" questions get tapped.
    match /ask_log/{questionId} {
      allow read: if isAdmin();
      allow write: if false;
    }

    // Deny everything else by default.
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

- [ ] **Step 2: Replace `tests/firestore.rules.test.mjs`**

Remove all describe blocks that tested `officers` and `events`. Keep only `"server-only collections are sealed"`. Also trim unused imports (`deleteDoc`, `updateDoc`, `collection`, `addDoc`) and the `asRevoked` helper:

```javascript
// Security rules tests for firestore.rules.
//
//   npm run test:rules
//
// These assert the property the whole admin model depends on: being signed in
// is NOT enough to write anything. Before the security pass, every one of the
// "ordinary signed-in user" cases below succeeded.
import { test, before, after, beforeEach, describe } from "node:test";
import { readFileSync } from "node:fs";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

let testEnv;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "itsa-rules-test",
    firestore: {
      rules: readFileSync("firestore.rules", "utf8"),
      host: "127.0.0.1",
      port: 8571,
    },
  });
});

after(async () => {
  await testEnv?.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, "admins/officer-uid"), { email: "officer@usa.edu.ph" });
  });
});

const asAdmin = () =>
  testEnv.authenticatedContext("officer-uid", { admin: true }).firestore();
const asSignedIn = () => testEnv.authenticatedContext("random-uid").firestore();
const asAnon = () => testEnv.unauthenticatedContext().firestore();

describe("server-only collections are sealed", () => {
  test("nobody may read or write the mail queue", async () => {
    for (const ctx of [asAdmin, asSignedIn, asAnon]) {
      await assertFails(getDoc(doc(ctx(), "mail/anything")));
      await assertFails(setDoc(doc(ctx(), "mail/anything"), { to: "x@y.z" }));
    }
  });

  test("nobody may read or write rate limit counters", async () => {
    for (const ctx of [asAdmin, asSignedIn, asAnon]) {
      await assertFails(getDoc(doc(ctx(), "rate_limits/anything")));
      await assertFails(setDoc(doc(ctx(), "rate_limits/anything"), { count: 0 }));
    }
  });

  test("admin grants cannot be self-issued", async () => {
    await assertFails(setDoc(doc(asSignedIn(), "admins/random-uid"), { email: "me" }));
    await assertFails(setDoc(doc(asAdmin(), "admins/officer-uid"), { email: "me" }));
  });

  test("nobody may write the Ask ITSA tally, and only admins may read it", async () => {
    for (const ctx of [asAdmin, asSignedIn, asAnon]) {
      await assertFails(setDoc(doc(ctx(), "ask_log/who-can-join"), { count: 999 }));
    }
    await assertSucceeds(getDoc(doc(asAdmin(), "ask_log/who-can-join")));
    await assertFails(getDoc(doc(asSignedIn(), "ask_log/who-can-join")));
    await assertFails(getDoc(doc(asAnon(), "ask_log/who-can-join")));
  });

  test("only verified admins may read applications", async () => {
    await assertSucceeds(getDoc(doc(asAdmin(), "applications/anything")));
    await assertFails(getDoc(doc(asSignedIn(), "applications/anything")));
    await assertFails(getDoc(doc(asAnon(), "applications/anything")));
  });
});
```

- [ ] **Step 3: Run the rules test suite**

```bash
npm run test:rules
```

Expected: all 5 remaining tests pass. If the emulator is not running, the command starts it automatically via `firebase emulators:exec`.

- [ ] **Step 4: Deploy the updated rules to Firebase**

```bash
firebase deploy --only firestore
```

Expected: `Deploy complete!` — no errors. This closes off client-SDK access to the now-retired `events` and `officers` collections in production.

- [ ] **Step 5: Commit**

```bash
git add firestore.rules tests/firestore.rules.test.mjs
git commit -m "refactor(S4): retire events and officers Firestore rules; trim rules test suite"
```

---

### Task 7: Close D4 and smoke-test

**Files:**
- None

- [ ] **Step 1: Comment and close issue #34**

```bash
gh issue comment 34 --repo JustineSalinas/ITSA-Website --body "Superseded by S4. Officer records are now managed in Sanity Studio rather than migrated to Firestore. The Firestore officers collection has been retired — its rules removed and its read/write paths deleted from the codebase."

gh issue close 34 --repo JustineSalinas/ITSA-Website --reason "not planned"
```

- [ ] **Step 2: Smoke-test in production after deploy**

| Page | Expected |
|---|---|
| `/events` | Events from Sanity render correctly |
| `/events/[slug]` | Detail pages load |
| `/news` | News from Sanity renders |
| `/officers` | Officers from Sanity render |
| `/projects` | Projects from Sanity render |
| `/admin` | Dashboard shows Enquiries card only, no broken links |
| `/admin/applications` | Applications table loads |
| `/admin/events` | 404 — page no longer exists |
| `/admin/officers` | 404 — page no longer exists |

- [ ] **Step 3: Close issue #54**

```bash
gh issue close 54 --repo JustineSalinas/ITSA-Website --comment "All Firestore content collection read/write paths removed. Sanity is now the sole content source for events, officers, news, and projects. Firebase rules updated and deployed."
```
