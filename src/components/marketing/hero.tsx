import { Container } from "@/components/shared/container"
import { HeroCtaRow } from "./hero-cta-row"
import { LeadRecoveryPipeline } from "./lead-recovery-pipeline"

const microcopy = ["No CRM replacement", "Start with old leads", "Built for real-estate sales teams"]

/**
 * Server component — only the CTA row (click tracking) and the pipeline
 * visual (scroll-triggered reveal) are client islands. Headline copy
 * renders with zero JS required, which is what LCP wants from a hero.
 */
export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 md:pb-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-eyebrow font-semibold uppercase text-accent mb-5">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            AI follow-up for real-estate sales teams
          </p>

          <h1 className="text-display text-foreground">
            Your sales team moved on.
            <br />
            <span className="text-accent">Awoken</span> didn&apos;t.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Awoken re-engages unresponsive real-estate leads over WhatsApp, qualifies buyer intent, and
            surfaces interested prospects back to your sales team.
          </p>

          <HeroCtaRow />

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {microcopy.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 sm:mt-16 md:mt-20">
          <LeadRecoveryPipeline />
        </div>
      </Container>
    </section>
  )
}
