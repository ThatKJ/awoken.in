import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { implementationTimeline } from "@/data/implementation-timeline"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "How We Work — 30-Day AI Implementation",
  description: "From discovery to deployment in four weeks. Every implementation follows a proven process designed for measurable results.",
}

export default function HowWeWorkPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              How We Work
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-[650px]">
              Every engagement follows a proven four-week process. We study your business, design the right system, build it, and deploy it with your team.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-20 md:pb-24 lg:pb-[120px]">
        <Container>
          <div className="max-w-3xl mx-auto">
            {implementationTimeline.map((step, i) => (
              <div key={step.week} className="relative pl-12 pb-12 last:pb-0">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border last:hidden" />
                <div className="absolute left-[-4px] top-1 w-[9px] h-[9px] rounded-full bg-accent border-2 border-background" />
                <div className="rounded-xl border border-border p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm font-bold text-accent uppercase">{step.week}</span>
                    <h3 className="text-[24px] font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-3xl mx-auto rounded-xl border border-border bg-surface p-6 lg:p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Most AI projects fail because companies start with tools. We start with workflows. We study how your business operates, identify what's broken, and design the ideal workflow before choosing any technology. Every system we build must save time, recover revenue, or improve customer experience. If it doesn't create measurable value, we don't build it.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
