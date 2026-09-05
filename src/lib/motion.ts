/**
 * Shared motion constants for framer-motion usage across the site.
 *
 * Mirrors the CSS tokens in globals.css (--ease-premium, --duration-*) so
 * JS-driven animation (framer-motion) and CSS transitions (Tailwind's
 * duration and ease utilities) stay visually consistent instead of every
 * component restating its own easing curve and duration.
 *
 * Keep motion quick and deliberate: reveals, not spectacle. No parallax,
 * no scroll hijacking, no infinite decorative motion on new components.
 */

/** Premium ease-out — matches Apple/Linear/Vercel-style reveals. */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.15,
  base: 0.22,
  slow: 0.32,
} as const

/** Standard "fade + rise into view" transition. */
export const TRANSITION_REVEAL = {
  duration: DURATION.slow,
  ease: EASE_PREMIUM,
} as const

/** Standard viewport gate for whileInView reveals — fires once, slightly before full entry. */
export const VIEWPORT_ONCE = { once: true, margin: "-60px" } as const

/**
 * Stagger helper: returns a transition with an index-based delay, capped so
 * long lists don't produce a multi-second cascade.
 */
export function staggerTransition(index: number, step = 0.06, max = 0.42) {
  return {
    duration: DURATION.slow,
    ease: EASE_PREMIUM,
    delay: Math.min(index * step, max),
  }
}
