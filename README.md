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

- **Strict Content Security Policy** (`index.html`): no inline or `eval`'d scripts, no framing, no arbitrary form targets, HTTPS upgraded.
- **Validated `localStorage` reads** (`src/utils/safeStorage.ts`): all persisted data is schema-checked before it reaches React state, so a corrupted or manually-edited value degrades to a safe default instead of crashing the app.
- **Input sanitization** on the editable habit name (length-capped, control characters stripped).
- **No secrets in the client bundle**: the project has no server component, so nothing is proxied through `vite.config.ts`'s `define` — if a backend is ever added, secrets must stay server-side.
- **Minimal dependency surface**: unused packages (a Gemini SDK, an Express server, `dotenv`) that shipped in the original scaffold but were never used have been removed, since every dependency is attack surface and audit burden even unused.
- **Dependabot** (`.github/dependabot.yml`) keeps npm and GitHub Actions dependencies patched automatically.
- **CI build/typecheck** (`.github/workflows/deploy.yml`) runs on every push, so a broken or unsafe change can't silently reach production.

### What was intentionally *removed*

An earlier version of this app disabled the right-click menu, blocked F12/devtools shortcuts, ran a `debugger`-timing trap that wiped the page if DevTools looked open, and cleared the DOM for any `navigator.webdriver`-flagged browser. These are removed because they:

1. Don't stop a determined reader — client-side JS is never secret; anyone can read the shipped bundle directly regardless of these blocks.
2. Actively harm real users — they break accessibility tools, browser translation/reader modes, legitimate QA automation, and can freeze the tab on slower devices.

Real client-side security means shipping a tight CSP, validating anything read from storage, and keeping no secrets in the bundle — not obstructing the user's own browser.

## Deployment

This repo auto-deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`. To enable it on your fork/repo:

1. In the GitHub repo, go to **Settings → Pages** and set **Source** to "GitHub Actions".
2. Push to `main` — the workflow builds the app and publishes `dist/` automatically.

## License

All rights reserved.
