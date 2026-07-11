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
