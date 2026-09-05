"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { track } from "@/components/analytics/events"
import { ctaButtons } from "@/data/navigation"

/** Client-only for the click event, matching the hero's pattern. */
export function PilotTeaserCta() {
  return (
    <Link href={ctaButtons.primary.href} onClick={() => track("pilot_cta_click")}>
      <Button variant="primary" size="xl">
        Run a Pilot
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Button>
    </Link>
  )
}
