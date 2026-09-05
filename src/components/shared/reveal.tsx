"use client"

import { motion, useReducedMotion } from "framer-motion"
import { EASE_PREMIUM, DURATION, VIEWPORT_ONCE, staggerTransition } from "@/lib/motion"

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Index in a list — adds a small staggered delay. Omit for a single element. */
  index?: number
  /** Pixels to translate from on enter. Set 0 for opacity-only. */
  y?: number
  as?: "div" | "li"
}

/**
 * Standard "fade + rise into view" wrapper — the one motion primitive new
 * marketing sections should reach for instead of hand-rolling their own
 * initial/whileInView/transition props. Automatically collapses to a plain
 * opacity fade (no translate) when the visitor has prefers-reduced-motion
 * set, and to instant/no motion is never required to understand content.
 */
export function Reveal({ children, className, index, y = 16, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const Comp = as === "li" ? motion.li : motion.div

  const transition = index !== undefined ? staggerTransition(index) : { duration: DURATION.slow, ease: EASE_PREMIUM }

  return (
    <Comp
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={transition}
      className={className}
    >
      {children}
    </Comp>
  )
}
