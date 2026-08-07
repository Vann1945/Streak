# Voltra Tracker

A premium, minimalist daily consistency tracker designed with uncompromising aesthetics and functional elegance.

## Features

- **Minimalist Interface** — warm linen background with a deep-ink and ember accent palette.
- **The Ember Ring** — the monthly progress ring fills with a warm gradient as consistency builds, the app's signature visual.
- **Milestone Celebrations** — a lazy-loaded confetti burst on completion, kept out of the initial bundle.
- **Client-Side Persistence** — all data lives in `localStorage`; nothing is sent to any server.
- **Adaptive Design** — responsive from mobile to ultra-wide, with visible keyboard focus and `prefers-reduced-motion` support throughout.

## Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 with a custom design-token theme (`src/index.css`)
- **Typography**: Fraunces (display serif) + Inter (body/UI)
- **Animation**: Motion (Framer Motion) for page and micro-interactions
- **Milestones**: Canvas Confetti, code-split and loaded on demand

## Installation & Setup

```bash
npm install
npm run dev      # local dev server on :3000
npm run build     # type-checks, then builds a production bundle to dist/
npm run preview   # preview the production build locally
```

## Security

This is a fully client-side, static app — there is no backend, no auth, and no user data leaves the browser, which keeps the real attack surface small. What's actually in place:

- **Strict Content Security Policy, sent as a real HTTP header** (`vercel.json` / `public/_headers`, depending on host): `default-src 'none'`, no inline or `eval`'d scripts, no framing (`frame-ancestors 'none'`), no arbitrary form targets, HTTPS upgraded. This is deliberately **not** declared via a `<meta http-equiv="Content-Security-Policy">` tag in `index.html` — browsers silently ignore the `frame-ancestors` directive (and some others) when CSP is delivered that way, which would mean the clickjacking protection looked present but didn't actually apply.
- **Additional hardening headers**: `X-Frame-Options: DENY`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `Cross-Origin-Embedder-Policy`, a fully-enumerated `Permissions-Policy` (camera, mic, geolocation, USB, autoplay, etc. all denied), and HSTS with `preload`.
- **Validated `localStorage` reads** (`src/utils/safeStorage.ts`): all persisted data is schema-checked before it reaches React state, so a corrupted or manually-edited value degrades to a safe default instead of crashing the app.
- **Input sanitization** on the editable habit name (length-capped, control characters stripped).
- **No secrets in the client bundle**: the project has no server component, so nothing is proxied through `vite.config.ts`'s `define` — if a backend is ever added, secrets must stay server-side. There is no `.env` file in this repo for that reason; one was previously present with an unused API key placeholder and has been removed to avoid implying otherwise.
- **Minimal dependency surface**: unused packages (a Gemini SDK, an Express server, `dotenv`) that shipped in the original scaffold but were never used have been removed, since every dependency is attack surface and audit burden even unused.
- **Dependabot** (`.github/dependabot.yml`) keeps npm and GitHub Actions dependencies patched automatically.
- **CI build/typecheck/audit** (`.github/workflows/deploy.yml`) runs on every push and fails the build on high/critical dependency vulnerabilities, so a broken or unsafe change can't silently reach production.

### What was intentionally *removed*

An earlier version of this app disabled the right-click menu, blocked F12/devtools shortcuts, ran a `debugger`-timing trap that wiped the page if DevTools looked open, and cleared the DOM for any `navigator.webdriver`-flagged browser. These are removed because they:

1. Don't stop a determined reader — client-side JS is never secret; anyone can read the shipped bundle directly regardless of these blocks.
2. Actively harm real users — they break accessibility tools, browser translation/reader modes, legitimate QA automation, and can freeze the tab on slower devices.

Real client-side security means shipping a tight CSP, validating anything read from storage, and keeping no secrets in the bundle — not obstructing the user's own browser.

## Deployment

Three deploy targets are supported out of the box, all serving the exact same static build:

- **Vercel** (currently in use, `streak-opal-one.vercel.app`): import the repo as a Vercel project as-is. Headers come from `vercel.json` at the repo root — Vercel does **not** read `public/_headers`, so without this file the CSP and other hardening headers would silently never reach the browser.
- **GitHub Pages**: auto-deploys on every push to `main` via `.github/workflows/deploy.yml`. Enable it once via **Settings → Pages → Source: GitHub Actions**. GitHub Pages' CDN has no header configuration mechanism at all, so on this host the CSP can only be enforced by the browser via the `frame-ancestors`-limited fallback; prefer Vercel or Cloudflare Pages when the strict header set matters.
- **Cloudflare Pages** (optional): `.github/workflows/deploy-cloudflare.yml` runs only if `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets are set on the repo. Cloudflare Pages honors `public/_headers` natively.

## License

All rights reserved.
