import { Section } from "@/components/shared/section"
import { TrackView } from "@/components/analytics/track-view"
import { PilotTeaserCta } from "./pilot-teaser-cta"

const points = ["No CRM migration", "No fresh leads required", "Start with an old lead segment and see what Awoken can recover"]

/**
 * The landing target for every "Run a Pilot" CTA on the site (nav, hero).
 * Its own button forwards to the real /pilot form — never to /assessment,
 * which stays outside the acquisition funnel.
 */
export function PilotTeaser() {
  return (
    <Section id="pilot" className="bg-accent-light/40 scroll-mt-16 lg:scroll-mt-20">
      <TrackView event="pilot_section_view" className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-2 text-eyebrow font-semibold uppercase text-accent mb-4">
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          Run a pilot
        </p>
        <h2 className="text-h2 text-foreground">
          Start with leads your team has already written off.
        </h2>
        <ul className="mt-6 flex flex-col items-center gap-2 text-sm sm:text-base text-muted-foreground">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="mt-8">
          <PilotTeaserCta />
        </div>
      </TrackView>
    </Section>
  )
}
