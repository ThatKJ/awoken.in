# Session Memory: ses_0b41e6312ffe1vaSyipyujUsSy

**Date:** 7/10/2026 – 7/14/2026
**Project:** Awoken landing page — `awoken.in-landing-page`
**Repo:** `github.com/ThatKJ/awoken.in.git`

---

## Overview

This session covered 5 major workstreams on the Awoken marketing website:
1. Admin dashboard (built, then removed)
2. Framework section redesign (done)
3. Process/"How We Work" section redesign (3 iterations)
4. Vercel Analytics + Speed Insights integration
5. Vercel CLI setup (login, project link, env pull)

---

## 1. Admin Dashboard (Built & Removed)

**Initial work:** Built a full Awoken OS admin dashboard with 6 modules (Clients, Audit, Projects, Meetings, Analytics, Search) and 30 routes.

**User then requested:**
- Use brand logos (`/public/icon.svg`) in sidebar
- Remove "taskbar" (bottom actions in sidebar: Search, Collapse, Logout)
- Use brand colors (primary `#111111`, accent `#F97316`, background `#FFFFFF`)
- Remove all fake/mock data
- Connect Meetings tab

**Changes made to sidebar (`src/components/admin/sidebar.tsx`):**
- Replaced generic "A" placeholder with actual `next/image` using `/icon.svg` (28x28)
- Removed bottom taskbar section (Search, Logout, Collapse buttons)
- Active nav items highlighted with accent orange

**Header (`src/components/admin/header.tsx`):**
- Removed notification bell
- Moved Logout button into header (subtle text button)
- Changed avatar to use accent color

**Dashboard (`src/app/admin/dashboard/page.tsx`):**
- Complete rewrite: clean welcome screen with "Get Started" CTA → Clients page
- Removed all StatsCards, fake client list, mock data

**ActivityFeed (`src/components/admin/activity-feed.tsx`):**
- Replaced hardcoded activities with empty state: "No recent activity"

**User then requested removal of entire admin system:**
- Deleted `src/app/admin/`, `src/components/admin/`, `src/lib/admin/`, `src/middleware.ts`
- Removed `ADMIN_PASSWORD` from `.env`
- 39 files deleted, 1555 lines removed
- Routes went from 30 → 19

---

## 2. Awoken Intelligence Framework Redesign

**File:** `src/components/home/framework.tsx`

**First design — alternating timeline cards:**
- Center timeline with 5 premium cards alternating left/right
- Cards: step number (orange badge), icon, title, description, 3 key points with `Check` icons
- Rounded corners (`rounded-2xl`), border, soft shadow
- Hover: elevation, border accent, shadow increase, icon scale
- Timeline: thin 1px line with `bg-accent` fill animated via `useScroll`/`useTransform`
- Circle nodes with border-only → filled on reveal (scale animation)
- Cards fade+slide-up staggered with `easeOut` (0.18s delay per card)
- CTA moved below framework, centered
- Mobile: single-column stacked cards with timeline rail on left
- Framer Motion for all animations

**Build fix:** First `ease` array `[0.25, 0.1, 0.25, 1]` caused TS error — changed to `ease: "easeOut" as const`.

---

## 3. Process/"Our Process" Section Redesign (3 Iterations)

**File:** `src/components/home/process.tsx`

### Iteration 1 — Premium two-column consulting layout
- **Left (40%):** Sticky timeline with large 36px numbered circles (orange when active via border), animated connecting line (`useScroll`/`scaleY`), step labels
- **Right (60%):** 6 premium cards stacked vertically — each with top orange accent bar, large 48px icon in tinted block, step number + title, description (~60ch), 3 key outcomes with `Check` icons, "Business Outcome" footer
- Cards: `rounded-2xl`, border, soft shadow. Hover: `-translate-y-0.5`, `shadow-lg`, `border-accent/30`, icon `scale-105`
- CTA below section, centered

### Iteration 2 — Interactive two-column (replaced stacked cards)
- **Left (30%):** Sticky step navigation — active step gets filled orange circle + bold text, inactive steps muted
- **Right (70%):** ONE premium card at a time — `AnimatePresence` slides cards in/out with direction-aware horizontal animation
- Click any step to switch; scrolling also updates active step via `IntersectionObserver` with `-40%` root margin
- Card: accent bar, 48px icon, step number, title, description (~55ch), duration, 3 deliverables, business outcome
- **Mobile:** Accordion — single expanded step, smooth height animation with framer-motion, chevron rotates on open
- Hidden sentinel divs for scroll step detection
- **Build fix:** Same `ease` issue — cast `ease: "easeOut" as const`

### Iteration 3 — Vertical alignment fix
- Added `lg:pt-8 xl:pt-10` to left nav to align first step with top of card (matching `p-8` / `xl:p-10`)
- User said "A BIT MORE DOWN" but then pivoted to Vercel integration before this was reapplied

---

## 4. Vercel Analytics + Speed Insights

**Installed:**
- `npm i @vercel/analytics` → added `import { Analytics } from "@vercel/analytics/next"` and `<Analytics />` in root layout (`src/app/layout.tsx`)
- `npm i @vercel/speed-insights` → added `import { SpeedInsights } from "@vercel/speed-insights/next"` and `<SpeedInsights />` in root layout

Both placed before `</body>` tag.

---

## 5. Vercel CLI Setup

- Installed Vercel CLI globally: `npm i -g vercel`
- Logged in via device OAuth: `npx vercel login` (user opened browser)
- Linked to existing project: `npx vercel link --project awoken.in --yes`
  - Project found under `kirtans-projects-96cf6d97`
- Pulled env vars: `npx vercel env pull`
  - Created `.env.local` with `VERCEL_OIDC_TOKEN`
- `.vercel/` and `.env.local` are gitignored by default

---

## Key Technical Details

- **Framework:** Next.js 16.2.10 (Turbopack)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Deployment:** Vercel (project: `awoken.in`)
- **Routes:** 19 static routes (after admin removal)
- **Build command:** `npm run build` (always passes, 0 TS errors)
- **Framer Motion note:** `ease` in transitions requires `as const` or string literal (not `number[]`)

## Current Section Order (Homepage)
`Hero > Framework > WhatWeSolve > Industries > IntelligenceReport > Examples > WhyCompare > Process > FinalCTA`
