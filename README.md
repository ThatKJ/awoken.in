# Awoken — Revenue Systems for Modern Businesses

A premium landing page for Awoken, built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion. Designed and engineered to convert — every section, animation, and interaction is intentional.

## Tech Stack

- **Framework** — Next.js 16 (Turbopack, App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **Animation** — Framer Motion
- **UI** — Radix UI primitives, shadcn/ui
- **Scheduling** — Cal.com (embedded via `@calcom/embed-react`)
- **Icons** — Lucide React
- **Deployment** — Static export, ready for Vercel

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, services, industries, timeline, CTA |
| `/book` | Booking — embedded Cal.com scheduler with FAQ |
| `/thank-you` | Post-booking confirmation |
| `/services` | Service blueprints |
| `/industries` | Industry-specific solutions |
| `/solutions` | Outcome-focused solutions |
| `/engagement` | Engagement models & pricing |
| `/integrations` | Tech stack & integrations |
| `/resources` | Playbooks, guides, templates |
| `/how-we-work` | Process & methodology |
| `/about` | Company & philosophy |
| `/demo` | Interactive demo showcase |
| `/contact` | Contact details + embedded booking |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
NEXT_PUBLIC_CAL_LINK=awoken-in/strategy-call
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── home/         # Homepage section components
│   ├── layout/       # Navigation, Footer
│   ├── shared/       # Container, Section, Card primitives
│   └── ui/           # Button, Badge, Accordion primitives
├── data/             # Static content & configuration
└── lib/              # Constants, utilities, config
```

## Build

```bash
npm run build
```

Produces a fully static export — 17 prerendered routes, zero runtime dependencies.
