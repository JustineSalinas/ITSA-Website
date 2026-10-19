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

Next.js 16 App Router + Firebase. Public marketing site for IT students,
with an in-house admin CMS at `/admin` for officers (News, Events,
Projects). Path alias `@/*` → `src/*`.

### Route structure (`src/app/`)
- `(public)/` — the whole site (home, about, events, news, officers, projects, join). Wraps children in navbar/footer via `(public)/layout.tsx`.
- `admin/login/` — sign-in page, deliberately **outside** the auth-gated layout (see below for why).
- `admin/(protected)/` — the CMS itself (dashboard, News/Events/Projects list+create+edit). Route group, doesn't affect the URL (`/admin`, `/admin/news`, etc.) — its `layout.tsx` is what actually gates on a session.
- `api/` — route handlers: `health` (uptime-monitor endpoint), `admin/session` (exchanges a Firebase ID token for the admin session cookie).

### Firebase, two SDKs
- `src/lib/firebase/client.ts` — browser SDK, gated by `isFirebaseConfigured`. Used by `/admin/login` (sign-in) and nothing else — the CMS's actual reads/writes never touch Firestore from the client.
- `src/lib/firebase/admin.ts` — server Admin SDK (`server-only`), gated by `isAdminConfigured`. Backs `api/health`'s Firestore check, and — since the CMS — `getAdminAuth()` (session cookie verification) and `getAdminStorage()` (image uploads), on top of `getAdminDb()`.

### Content model — CMS-first, local files as seed/fallback
News, Events, and Projects are edited through `/admin`, stored in
Firestore (`cms_news`/`cms_events`/`cms_projects`, doc ID = slug), written
only via Server Actions through the Admin SDK — never from the client.
`src/lib/data.ts`'s `getNews`/`getEvents` and `src/data/projects.ts`'s
`getProjects` read Firestore first and fall back to the local arrays only
if Firestore is unreachable, unconfigured, or genuinely empty.
- **Events**: `src/data/events.ts` is the fallback/seed, empty until there's a real event — never placeholder events.
- **News**: `src/data/news.ts` is the fallback/seed (real posts transcribed from ITSA's official Facebook, images in `public/images/news/`). "Announcements" are a News category, not a separate content type.
- **Projects**: `src/data/projects.ts` is the fallback/seed (sourced from each project's own live site/README), cover images in `public/images/projects/`.
- **Officers**: unaffected by the CMS — `src/data/officers.ts`'s `orgChart`/`realOfficers` are still the only source, edited directly in code. The org-chart tree has no CMS equivalent; `src/app/(public)/officers/page.tsx` imports `orgChart` directly for the tree view, and `getOfficers()` in `data.ts` returns the flattened `realOfficers` for the flat `/officers` card grid.
- Only real, verifiable content belongs in any of these — never invented members, links, dates, or metrics. `src/data/projects.ts` once held a fully fabricated array (`Gagambattle`, `Pharmatrack`, etc. — invented team members, `#` placeholder links, shown to real visitors with no dev-only gate); that was deleted outright, and the bar it violated still applies everywhere, CMS-entered content included.

### `/admin` auth
- Firebase Auth (email/password) + a hardcoded allowlist in `src/lib/admin/allowlist.ts` (`ADMIN_EMAIL_ALLOWLIST`) is the actual authorization boundary — a Firebase account on the project isn't sufficient on its own. One-time setup per new officer: create their account in the Firebase console (Email/Password provider must be enabled there first) and add their email to the allowlist.
- Session: client signs in, exchanges the ID token for an HttpOnly session cookie via `POST /api/admin/session` (`createSessionCookie`). `src/lib/admin/session.ts`'s `getAdminSession()`/`requireAdminSession()` is the DAL — every admin page and Server Action calls it; there is no other check to keep in sync.
- Images: `src/lib/admin/upload-image.ts`, capped at 4MB (Vercel's function body limit), normalized with `sharp` (auto-rotated, resized to 1600px, WebP) before landing in Firebase Storage. Always via a Server Action, never a direct client upload.

### Firestore security rules
- `firestore.rules` denies every read and write from a client, signed in or not — there is no client read/write path at all, including for the CMS: the public site reads via the Admin SDK server-side, and the CMS writes via Server Actions using the Admin SDK. The rules being "deny everything" is still literally true. (The officer admin dashboard being described as a deliberate removal in this file's history predates the CMS above — it's back, but rebuilt server-first rather than reopening the old client-Firestore surface.)
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
