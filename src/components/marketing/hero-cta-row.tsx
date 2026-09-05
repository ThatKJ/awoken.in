"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { track } from "@/components/analytics/events"
import { ctaButtons } from "@/data/navigation"

/**
 * Client-only for the click event — everything else in Hero stays server
 * rendered. Kept as its own tiny component rather than pulling framer or
 * an onClick handler into the whole Hero.
 */
export function HeroCtaRow() {
  return (
    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
      <Link href={ctaButtons.primary.href} onClick={() => track("hero_pilot_click")}>
        <Button variant="primary" size="xl" className="w-full sm:w-auto">
          {ctaButtons.primary.label}
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Button>
      </Link>
      <Link href="/#how-it-works">
        <Button variant="outline" size="xl" className="w-full sm:w-auto">
          See How It Works
        </Button>
      </Link>
    </div>
  )
}
