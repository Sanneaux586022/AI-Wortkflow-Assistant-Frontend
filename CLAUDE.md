# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the frontend for an "AI Workflow Assistant" (Italian-language UI copy) — a Next.js 16 App Router app that lets a logged-in user browse and manage "requests" (e.g. mail, foto) coming from a separate backend API. The project is very early-stage (bootstrapped from `create-next-app`), so architecture is still minimal.

## Commands

- `npm run dev` — start the dev server (Turbopack, via `next dev`) at http://localhost:3000
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals`)

There is no test suite configured in this repo yet.

## Architecture

- **App Router**, all routes live under `src/app/`. Pages are plain `page.js` files (no TypeScript, no `src/app/api` routes yet).
  - `src/app/page.js` — placeholder home page.
  - `src/app/login/page.js` — client component (`"use client"`) with a manual username/password form.
  - `src/app/dashboard/page.js` — client component that lists "requests", filterable by `activeTab` (`mail` / `foto`).
  - `src/app/layout.js` — root layout, loads Geist fonts and sets page metadata.
- **Path alias**: `@/*` maps to `./src/*` (see `jsconfig.json`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (see `postcss.config.mjs`, `src/app/globals.css`). Utility classes are used directly in JSX; there is no component library.
- **Backend integration**: There is no API layer/client abstraction — pages call `fetch` directly against a hardcoded backend at `http://localhost:5000` (e.g. `POST /users/login`, `POST /users/logout`, `GET /requests`). When adding new backend calls, follow this same direct-fetch pattern unless asked to introduce a shared API client.
- **Auth**: JWT-based. `access_token` and `refresh_token` are stored in `localStorage` after login and sent as `Authorization: Bearer <token>` headers. There is no route middleware — auth checks (redirect to `/login` if no token) happen client-side inside `useEffect` on protected pages like the dashboard. There is currently no refresh-token flow implemented.
- **next.config.mjs**: sets `turbopack.root` explicitly to the project directory.
