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
npm run test:rules   # firestore.rules unit tests against the Firestore emulator
```

There is no unit-test runner for app code; `test:rules` is the only test suite.
It runs `node --test tests/*.test.mjs` inside `firebase emulators:exec` (Firestore
emulator on port **8571**, project `itsa-rules-test`).

## Architecture

Next.js 16 App Router + Firebase + Sanity. Public marketing site for IT
students. There is no admin login/dashboard — content is edited through
Sanity Studio (`/studio`). Path alias `@/*` → `src/*`.

### Route structure (`src/app/`)
- `(public)/` — the whole site (home, about, events, news, officers, projects, join). Wraps children in navbar/footer and the "Ask ITSA" panel via `(public)/layout.tsx`.
- `studio/` — Sanity Studio, the content-editing surface for officers/events/news/projects/partners/faq.
- `api/` — route handlers: `ask-log` (FAQ analytics tally).

### Firebase, two SDKs
- `src/lib/firebase/client.ts` — browser SDK, gated by `isFirebaseConfigured`.
- `src/lib/firebase/admin.ts` — server Admin SDK (`server-only`), gated by `isAdminConfigured`. Only used for Firestore now (`getAdminDb`) — there is no Admin Auth or Storage usage left in the app.
- **Graceful degradation is a core pattern**: when credentials are absent, the site still runs. `src/lib/data.ts` serves bundled content from `src/data/*` (`officers.ts`, `news.ts`, `placeholder.ts`) as a dev fallback, but **rethrows in production** so an outage surfaces instead of silently serving stale content. Preserve this dev-vs-prod split when touching the data layer.

### Firestore data model & rules
- Public collections `officers`, `events`: world-readable, admin-writable with field validation, **never hard-deleted** (`allow delete: if false`) — records are retired with a `deletedAt` stamp and filtered by `isLive()` in `data.ts`. (In practice these are now edited via Sanity, not Firestore, but the collections and rules remain.)
- Server-only collections (`mail`, `rate_limits`, `ask_log`): `allow read/write: if false` — only the Admin SDK, which bypasses rules, touches them.
- `firestore.rules` is covered by `tests/firestore.rules.test.mjs`; run `npm run test:rules` after editing rules.

### Notable subsystems
- **Rate limiting** (`src/lib/rate-limit.ts`): transactional fixed-window counters in Firestore (per-instance memory would be bypassable on serverless). Stores salted IP hashes, never raw IPs. **Fails closed** — treat a limiter error as "deny".
- **"Ask ITSA"** (`src/components/chat/`): a *guided FAQ panel, not an LLM chatbot* — a deliberate cost/risk decision. `api/ask-log` tallies which shipped question IDs get tapped (one counter per known ID, no free text, no visitor data). Don't assume a free-text AI backend exists.
- **`/join`** is a purely informational Community & Careers page (Discord invite, career advice, growth resources) — there is no membership form or application flow anywhere on the site. `siteConfig.discordInvite` in `src/data/site.ts` is empty until the officers have a real invite link; the page hides the CTA button when it's empty rather than linking to a broken/placeholder server.

## Design system

`DESIGN.md` is the authoritative brand/design spec ("The Connected Network" —
committed brand blue, orange as an accent-only spark, no cream backgrounds,
Bricolage Grotesque headings over Geist body). Consult it before UI work.

- **shadcn** with the `base-nova` style, built on **Base UI** (`@base-ui/react`) — *not* Radix. Components in `src/components/ui/`, config in `components.json`.
- **Tailwind CSS v4** (PostCSS plugin, no `tailwind.config.js`); design tokens as CSS variables in `src/app/globals.css`.
- `framer-motion` for animation, `lenis` for smooth scroll, `next-themes` for light/dark, `lucide-react` icons, `sonner` toasts, `react-hook-form` + `zod` for forms.
