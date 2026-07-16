import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { implementationTimeline } from "@/data/implementation-timeline"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "From discovery to deployment in six steps. Every engagement follows a proven methodology: understand, diagnose, prioritize, implement, measure, and optimize.",
  openGraph: {
    title: "How We Work | Awoken",
    description:
      "From discovery to deployment in six steps. Every engagement follows a proven methodology: understand, diagnose, prioritize, implement, measure, and optimize.",
    url: "https://awoken.in/how-we-work",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "How Awoken Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Work | Awoken",
    description:
      "From discovery to deployment in six steps. Every engagement follows a proven methodology.",
    images: ["/og-image.png"],
  },
}

export default function HowWeWorkPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
          <div className="max-w-2xl xl:max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              How We Work
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Every engagement follows a proven process. We discover your operational bottlenecks, diagnose root causes, prioritize improvements, implement solutions, and measure results. Technology is applied only where it creates measurable value.
            </p>
          </div>
      </Section>
      <Section className="bg-background-alt pb-20 md:pb-24 lg:pb-[120px]">
          <div className="max-w-3xl mx-auto">
            {implementationTimeline.map((step, i) => (
              <div key={step.week} className="relative pl-10 sm:pl-12 pb-8 sm:pb-12 last:pb-0">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border last:hidden" />
                <div className="absolute left-[-4px] top-1 w-[9px] h-[9px] rounded-full bg-accent border-2 border-background" />
                <div className="rounded-xl border border-border p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm font-bold text-accent uppercase">{step.week}</span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent mt-0.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
      </Section>
      <Section className="bg-background">
          <div className="max-w-3xl mx-auto rounded-xl border border-border bg-surface p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Our Philosophy</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Most AI projects fail because companies start with technology. We start with understanding. We study how your business operates, identify what's broken, and design the ideal workflow before choosing any technology. Every system we build must create measurable business value—faster operations, recovered revenue, or better customer experience. If it doesn't, we don't build it.
            </p>
          </div>
      </Section>
    </>
  )
}
