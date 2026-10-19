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

Next.js 16 App Router + Firebase. Public marketing site for IT students.
There is no admin login/dashboard and no CMS — all content lives in local
TypeScript data files under `src/data/`, edited directly in code. Path
alias `@/*` → `src/*`.

### Route structure (`src/app/`)
- `(public)/` — the whole site (home, about, events, news, officers, projects, join). Wraps children in navbar/footer via `(public)/layout.tsx`.
- `api/` — route handlers: `health` (uptime-monitor endpoint).

### Firebase, two SDKs
- `src/lib/firebase/client.ts` — browser SDK, gated by `isFirebaseConfigured`.
- `src/lib/firebase/admin.ts` — server Admin SDK (`server-only`), gated by `isAdminConfigured`. Only used by `api/health`'s Firestore reachability check (`getAdminDb`) — there is no Admin Auth or Storage usage left in the app, and Firestore is not a content store at all (see below).

### Content model — all local, no CMS
Sanity was removed (it never had real content for events or officers, and
its only real news posts have been folded into the local files below).
Adding or editing content now means editing these files directly and
opening a PR/commit — there is no non-technical editing surface.
- **Events**: `src/data/events.ts`. Empty until there's a real event — the events page renders an honest empty state, never placeholder events.
- **News**: `src/data/news.ts` (real posts transcribed from ITSA's official Facebook, images in `public/images/news/`). Add new posts at the top of the array.
- **Projects**: `src/data/projects.ts` (sourced from each project's live site/README), cover images in `public/images/projects/`. Add new projects at the top of the array.
- **Officers**: `src/data/officers.ts`'s `orgChart`/`realOfficers` are the actual reconciled roster. `src/app/(public)/officers/page.tsx` imports `orgChart` directly for the tree view; `getOfficers()` in `data.ts` returns the flattened `realOfficers` for the flat `/officers` card grid.
- Only real, verifiable content belongs in any of these — never invented members, links, dates, or metrics. `src/data/projects.ts` once held a fully fabricated array (`Gagambattle`, `Pharmatrack`, etc. — invented team members, `#` placeholder links, shown to real visitors with no dev-only gate); that was deleted outright, and the bar it violated still applies to everything in `src/data/`.

### Firestore security rules
- `firestore.rules` denies every read and write from a client, signed in or not — there is no client read/write path left at all (the officer admin dashboard, the contact form, the Ask ITSA tally, and the Sanity CMS integration were all removed). Only the Admin SDK, which bypasses rules, touches Firestore (`api/health`'s check).
- `firestore.rules` is covered by `tests/firestore.rules.test.mjs`; run `npm run test:rules` after editing rules.

### Notable subsystems
- **`/join`** is a purely informational Community & Careers page (Discord invite, career advice, growth resources) — there is no membership form or application flow anywhere on the site. `siteConfig.discordInvite` in `src/data/site.ts` is empty until the officers have a real invite link; the page hides the CTA button when it's empty rather than linking to a broken/placeholder server.

## Design system

`DESIGN.md` is the authoritative brand/design spec ("The Connected Network" —
committed brand blue, orange as an accent-only spark, no cream backgrounds,
Geist headings and body, Geist Mono for labels). Consult it before UI work.

- **shadcn** with the `base-nova` style, built on **Base UI** (`@base-ui/react`) — *not* Radix. Components in `src/components/ui/`, config in `components.json`.
- **Tailwind CSS v4** (PostCSS plugin, no `tailwind.config.js`); design tokens as CSS variables in `src/app/globals.css`.
- `framer-motion` for animation, `lenis` for smooth scroll, `next-themes` for light/dark, `lucide-react` icons, `sonner` toasts, `react-hook-form` + `zod` for forms.
