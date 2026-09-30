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
- `(public)/` — the whole site (home, about, events, news, officers, projects, join). Wraps children in navbar/footer via `(public)/layout.tsx`.
- `studio/` — Sanity Studio, the content-editing surface for officers/events/news/projects/partners/faq.
- `api/` — route handlers: `health` (uptime-monitor endpoint).

### Firebase, two SDKs
- `src/lib/firebase/client.ts` — browser SDK, gated by `isFirebaseConfigured`.
- `src/lib/firebase/admin.ts` — server Admin SDK (`server-only`), gated by `isAdminConfigured`. Only used by `api/health`'s Firestore reachability check (`getAdminDb`) — there is no Admin Auth or Storage usage left in the app, and Firestore is no longer a content store at all (see below).

### Content model — Sanity is the only source for events, news, and projects
- `src/lib/data.ts` (`getEvents`, `getNews`) and `src/data/projects.ts` (`getProjects`) read from Sanity **only**. An empty Sanity result returns an empty array — there is no bundled/hardcoded fallback for any of these three, and there must not be one added back. The pages already render an honest empty state (`ProjectsClient`'s "No projects found", the events/news pages' own empty copy).
- This replaced two different problems: `src/data/placeholder.ts` (events) was already dev-only-gated invented content; `src/data/projects.ts`'s old hardcoded array (`Gagambattle`, `Pharmatrack`, etc.) was **fully fabricated** — invented team members, `#` placeholder links — with **no dev-only gate**, so it was shown to real visitors whenever Sanity had no projects published. Both were deleted outright, not just gated further.
- **Officers are the one exception**: `src/data/officers.ts`'s `orgChart`/`realOfficers` are real content (the actual reconciled roster), not placeholder data, and the org-chart *tree structure* (`orgChart`, with its reporting-line nesting) has no Sanity equivalent at all — `src/app/(public)/officers/page.tsx` imports `orgChart` directly from this file, never through Sanity. `getOfficers()` in `data.ts` still checks Sanity first and falls back to `realOfficers` (the same tree, flattened) only for the flat `/officers` card grid.
- If you need to re-seed real content into Sanity from code (a one-time migration, not a fallback), write a throwaway script using `scripts/sanity-client.mjs`'s `requireWriteClient()` (needs `SANITY_API_TOKEN` in `.env.local`, Editor permission) and delete it once the migration is verified — see git history for the news-migration script this pattern came from.

### Firestore security rules
- `firestore.rules` denies every read and write from a client, signed in or not — there is no client read/write path left at all (the officer admin dashboard, the contact form, and the Ask ITSA tally were all removed, and content lives in Sanity now). Only the Admin SDK, which bypasses rules, touches Firestore (`api/health`'s check).
- `firestore.rules` is covered by `tests/firestore.rules.test.mjs`; run `npm run test:rules` after editing rules.

### Notable subsystems
- **`/join`** is a purely informational Community & Careers page (Discord invite, career advice, growth resources) — there is no membership form or application flow anywhere on the site. `siteConfig.discordInvite` in `src/data/site.ts` is empty until the officers have a real invite link; the page hides the CTA button when it's empty rather than linking to a broken/placeholder server.

## Design system

`DESIGN.md` is the authoritative brand/design spec ("The Connected Network" —
committed brand blue, orange as an accent-only spark, no cream backgrounds,
Bricolage Grotesque headings over Geist body). Consult it before UI work.

- **shadcn** with the `base-nova` style, built on **Base UI** (`@base-ui/react`) — *not* Radix. Components in `src/components/ui/`, config in `components.json`.
- **Tailwind CSS v4** (PostCSS plugin, no `tailwind.config.js`); design tokens as CSS variables in `src/app/globals.css`.
- `framer-motion` for animation, `lenis` for smooth scroll, `next-themes` for light/dark, `lucide-react` icons, `sonner` toasts, `react-hook-form` + `zod` for forms.
