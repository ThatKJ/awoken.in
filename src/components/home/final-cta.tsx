import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <Section>
      <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Let's understand your business before recommending technology.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Start with a free Business Intelligence Audit. We'll identify your biggest bottlenecks and highest-impact opportunities.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/book" className="w-full sm:w-auto">
              <Button variant="primary" size="xl" className="w-full sm:w-auto">
                Book Your Free Business Audit
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </Link>
            <Link href="/how-we-work" className="w-full sm:w-auto">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
    </Section>
  )
}
