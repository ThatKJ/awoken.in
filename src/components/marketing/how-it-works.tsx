import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Reveal } from "@/components/shared/reveal"
import { TrackView } from "@/components/analytics/track-view"
import { howItWorksSteps } from "@/data/how-it-works"

/**
 * An editorial numbered list rather than five identical cards — the
 * content is short enough that typography can carry it without a grid of
 * boxes competing for attention.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-background scroll-mt-16 lg:scroll-mt-20">
      <TrackView event="how_it_works_view">
        <SectionHeader
          eyebrow="How Awoken works"
          title="What actually happens, in five steps."
          align="left"
          className="mx-auto"
        />

        <ol className="mx-auto max-w-3xl divide-y divide-border border-t border-border">
          {howItWorksSteps.map((step, i) => (
            <Reveal key={step.n} index={i} y={10} as="li">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6 sm:py-7">
                <span className="text-h4 text-border shrink-0 sm:w-14 font-bold" aria-hidden="true">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </TrackView>
    </Section>
  )
}
