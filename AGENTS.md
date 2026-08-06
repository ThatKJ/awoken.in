<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---
## Session: Layout System Refactor — Premium Alignment

### Goal
Introduce a consistent layout system so every section feels engineered instead of manually assembled. 8px spacing grid, equal-height cards, shared primitives, standardized padding and radius.

### What Changed
- **Shared primitives**: `Container` (max-w-7xl, px-6/10/16), `Section` (py-24/72/140), `SectionHeader` (eyebrow+heading+description), `Card`+`CardHeader`+`CardBody`+`CardFooter` (flex-col h-full, p-8)
- **Container padding**: px-4→px-6, sm:px-6→sm:px-10, lg:px-8→lg:px-16 (24/40/64px)
- **Section padding**: all home components `py-[120px]`→`py-24` (96px); hero `pt-[140px] pb-24`; small sections `py-[72px]`
- **Card equal heights**: all card containers now `flex flex-col h-full`; description/body areas use `flex-1` to push footers to same baseline
- **Card grid gaps**: standardized to 8px multiples (gap-4, gap-6, gap-8)
- **Border radius**: `--radius-2xl: 1.25rem` (20px) added for large panels; cards use rounded-xl (16px), buttons use rounded-lg (12px)
- **Small labels**: all `text-xs` bumped to `text-sm` (14px) across badges, tags, category labels, metadata
- **Button base weight**: changed `font-medium`→`font-semibold` (600)
- **Nav links**: 16px weight 500 `whitespace-nowrap`, gap-4, CTAs at `md` size

### Shared Components Created
- `src/components/shared/section.tsx` — `Section` with `size` prop (default/small/hero)
- `src/components/shared/section-header.tsx` — `SectionHeader` with eyebrow, title, description, alignment
- `src/components/shared/card.tsx` — `Card`, `CardHeader`, `CardBody`, `CardFooter`

### Files Modified
- **Foundation**: `globals.css`, `button.tsx`, `container.tsx`, `badge.tsx`
- **Layout**: `navigation.tsx`, `footer.tsx`
- **Home components**: all 19 section files under `src/components/home/` — section padding, card height, flex-grow, text sizes
- **Inner pages**: all 10 page files under `src/app/*/` — section padding, card height, text sizes, gap fixes

### Notes
- All spacing now follows 8px multiples (exceptions: mockup UI in hero/live-demo)
- Build verified: `npm run build` succeeds with no TS or compilation errors (15 static routes)
- Search for `gap-3`, `gap-5`, `gap-1` or `text-xs` if you need to catch any remaining non-standard values

---
## Session: Premium Navigation Bar Redesign

### Goal
Stripe/Linear-grade responsive navbar: logo left, nav centered, CTA right, zero wrap/overflow from 320px→2560px, auto-collapse into a "More" dropdown, full-screen mobile drawer <1024px.

### What Changed
- **`src/components/layout/navigation.tsx`**: fully rewritten.
  - Header: `fixed`, `max-w-[1440px]` inner bar, `h-16` (64px); glass on scroll (`bg-background/75 backdrop-blur-xl border-b shadow-glass`, 200ms transition)
  - Padding scaling: `px-4` (16) / `lg:px-5` (20) / `xl:px-6` (24) / `2xl:px-8` (32) / `min-[1920px]:px-12` (48)
  - Breakpoints: hamburger + full-screen drawer below `lg` (1024px); nav CTA always visible ≥1024px
  - CTA: full label `xl+`, short label `Free Assessment` (from `ctaButtons.shortLabel` in `src/data/navigation.ts`) at 1024–1279; ArrowRight slides on hover
  - Nav links: 14px/500, animated underline (`after:scale-x-100`), active page = persistent accent underline + `aria-current="page"`
  - **"More" dropdown**: deterministic JS measurement — a hidden `invisible w-max` measuring row (inside a `h-0 w-0 overflow-clip` wrapper) contains all links + a More clone; `measure()` computes how many links fit arithmetically vs `cta.left - logo.right`; overflows move into the dropdown. NEVER remove/slice items based on re-measuring the rendered nav (causes feedback oscillation); the measuring row is static so it cannot loop. Triggered by ResizeObserver + window resize + matchMedia change
  - Dropdown: framer-motion 200ms fade/rise, `role="menu"`/`menuitem`, first item autofocused, Escape closes + refocuses More, click-outside closes
  - Drawer: full-screen (not slide-in), fade 200ms, staggered links, active indicator dot, Escape + scroll-lock
  - Logo scaled to `h-8/9/10` (was oversized h-20/24/32)
- **`src/data/navigation.ts`**: added `ctaButtons.primary.shortLabel`

### Verified
- Playwright (chromium) sweep at 320/375/480/640/768/1024/1280/1440/1600/1920/2560: `documentElement.scrollWidth == viewport`, links never cross header bounds, hamburger only <1024, CTA visible ≥1024
- Real browser zoom (CDP `setPageScaleFactor` 1.25–2.0): no overflow
- Drawer, More dropdown (open/focus/Escape), glass-on-scroll states all pass
- `npm run lint`: only pre-existing `<img>` warning (matches old code); `npm run build`: clean, 29 routes
