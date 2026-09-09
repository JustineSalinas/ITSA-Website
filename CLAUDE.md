# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The `@AGENTS.md` import above is load-bearing: `next dev` regenerates that file's
> Next.js-16 breaking-changes block. **This is Next.js 16** — App Router APIs,
> conventions, and file names differ from older versions. Consult
> `node_modules/next/dist/docs/` before writing framework code.

## Commands

```bash
npm run dev          # Next.js dev server (http://localhost:3000)
npm run build        # production build
npm run lint         # eslint (flat config, eslint-config-next)
npm run seed         # seed Firestore with sample officers/events (needs FIREBASE_* admin vars)
npm run grant-admin  # grant/revoke/list officer access — see below
npm run test:rules   # firestore.rules unit tests against the emulator
```

There is no unit-test runner for app code; `test:rules` is the only test suite.
It runs `node --test tests/*.test.mjs` inside `firebase emulators:exec` (Firestore
emulator on port **8571**, project `itsa-rules-test`). To run a single rules test:
`firebase emulators:exec --only firestore --project itsa-rules-test "node --test tests/firestore.rules.test.mjs"`.

Managing officer access (requires admin credentials in `.env.local`):
```bash
node scripts/grant-admin.mjs grant  officer@usa.edu.ph "Full Name"
node scripts/grant-admin.mjs revoke officer@usa.edu.ph
node scripts/grant-admin.mjs list
```

## Architecture

Next.js 16 App Router + Firebase. Public marketing/recruitment site with a
password-protected officer admin surface. Path alias `@/*` → `src/*`.

### Route structure (`src/app/`)
- `(public)/` — the marketing site (home, about, events, news, officers, projects, join). Wraps children in navbar/footer and the "Ask ITSA" panel via `(public)/layout.tsx`.
- `admin/login/` — officer sign-in.
- `admin/(protected)/` — the admin dashboard. `(protected)/layout.tsx` is `force-dynamic` and is the **authoritative** auth gate.
- `api/` — route handlers: `admin/session` (cookie exchange), `contact` (join form), `ask-log` (FAQ analytics).
- `proxy.ts` — **this is the middleware** (Next.js 16 renamed `middleware.ts` → `proxy.ts`). It's an *optimistic* gate that only checks a cookie exists; it is explicitly NOT the authorization layer.

### Firebase, two SDKs
- `src/lib/firebase/client.ts` — browser SDK, gated by `isFirebaseConfigured`.
- `src/lib/firebase/admin.ts` — server Admin SDK (`server-only`), gated by `isAdminConfigured`.
- **Graceful degradation is a core pattern**: when credentials are absent, the site still runs. `src/lib/data.ts` serves bundled content from `src/data/*` (`officers.ts`, `news.ts`, `placeholder.ts`) as a dev fallback, but **rethrows in production** so an outage surfaces instead of silently serving stale content. Preserve this dev-vs-prod split when touching the data layer.

### Auth — two independent gates (do not break the mirror)
An officer is an admin only if **both** hold:
1. an `admin: true` custom claim on the Firebase token, and
2. an `/admins/{uid}` Firestore document (the instant-revocation switch).

This definition is duplicated on purpose across `firestore.rules` (`isAdmin()`),
`src/lib/auth/session.ts` (`getAdminSession`), `src/app/api/admin/session/route.ts`,
and `scripts/grant-admin.mjs`. **If you change the admin rule in one place, change
it in all of them** — server and database must agree. Session flow: client gets a
Firebase ID token → `POST /api/admin/session` verifies it and mints an httpOnly
session cookie (`itsa_session`, 8h). Auth constants live in `src/lib/auth/constants.ts`
(kept free of `server-only`/Node imports so `proxy.ts` can share them).

### Firestore data model & rules
- Public collections `officers`, `events`: world-readable, admin-writable with field validation, **never hard-deleted** (`allow delete: if false`) — records are retired with a `deletedAt` stamp and filtered by `isLive()` in `data.ts`.
- Server-only collections (`mail`, `applications`, `rate_limits`, `ask_log`): `allow read/write: if false` — only the Admin SDK, which bypasses rules, touches them.
- `firestore.rules` is covered by `tests/firestore.rules.test.mjs`; run `npm run test:rules` after editing rules.

### Notable subsystems
- **Rate limiting** (`src/lib/rate-limit.ts`): transactional fixed-window counters in Firestore (per-instance memory would be bypassable on serverless). Stores salted IP hashes, never raw IPs. **Fails closed** — treat a limiter error as "deny".
- **Contact/join form** (`api/contact`): Zod-validated, honeypot field, dual burst+daily rate limits, then writes to the `mail` collection which the **Trigger Email Firebase extension** delivers. There is no direct SMTP in the app.
- **"Ask ITSA"** (`src/components/chat/`): a *guided FAQ panel, not an LLM chatbot* — a deliberate cost/risk decision. `api/ask-log` tallies which shipped question IDs get tapped (one counter per known ID, no free text, no visitor data). Don't assume a free-text AI backend exists.

## Design system

`DESIGN.md` is the authoritative brand/design spec ("The Connected Network" —
committed brand blue, orange as an accent-only spark, no cream backgrounds,
Bricolage Grotesque headings over Geist body). Consult it before UI work.

- **shadcn** with the `base-nova` style, built on **Base UI** (`@base-ui/react`) — *not* Radix. Components in `src/components/ui/`, config in `components.json`.
- **Tailwind CSS v4** (PostCSS plugin, no `tailwind.config.js`); design tokens as CSS variables in `src/app/globals.css`.
- `framer-motion` for animation, `lenis` for smooth scroll, `next-themes` for light/dark, `lucide-react` icons, `sonner` toasts, `react-hook-form` + `zod` for forms.
