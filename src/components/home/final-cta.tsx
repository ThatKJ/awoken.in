import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <Section className="pb-24 md:pb-32 lg:pb-40">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
          Before we recommend anything,<br />
          <span className="text-accent">we understand everything.</span>
        </h2>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
          In a thirty-minute diagnostic conversation, we map your operations, identify where revenue is leaking, and prioritize the improvements that create measurable impact. You leave with clarity—not a pitch.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/book" className="w-full sm:w-auto">
            <Button variant="primary" size="xl" className="w-full sm:w-auto text-sm sm:text-base">
              Request a Diagnostic Conversation
              <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
            </Button>
          </Link>
          <Link href="/how-we-work" className="w-full sm:w-auto">
            <Button variant="outline" size="xl" className="w-full sm:w-auto text-sm sm:text-base">
              See How We Work
            </Button>
          </Link>
        </div>
        <p className="mt-6 sm:mt-8 text-sm text-muted-foreground/60">
          No obligation — No generic pitch — Actionable insights
        </p>
      </div>
    </Section>
  )
}
