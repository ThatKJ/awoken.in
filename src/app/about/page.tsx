import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { philosophyPoints } from "@/data/philosophy"

export const metadata: Metadata = {
  title: "About — Revenue Systems for Modern Businesses",
  description: "We don't believe businesses need more software. They need systems that remove repetitive work.",
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              About Awoken
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-[650px]">
              We design and implement AI systems that answer calls, qualify leads, automate follow-ups and eliminate repetitive work. Revenue Systems for Modern Businesses.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Every business has repetitive work. Every repetitive workflow can be automated. Every missed opportunity is recoverable. We build intelligent systems that answer calls, qualify leads, follow up automatically, book appointments, manage workflows and increase revenue.
              </p>
              <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                We don't install software. We redesign workflows. We don't sell subscriptions. We build measurable revenue systems. Every implementation begins with understanding the client's business. Technology is never the hero. Business outcomes are.
              </p>
              <h2 className="text-2xl font-semibold mb-4">Engineering Quality</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Every system we build is production-ready, measurable, and built to evolve with your business. We use industry-leading infrastructure and follow software engineering best practices.
              </p>
            </div>
            <div className="space-y-8">
              {philosophyPoints.map((point, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 border-accent pl-6"
                >
                  <p className="text-2xl font-semibold leading-snug mb-3">
                    &ldquo;{point.quote}&rdquo;
                  </p>
                  {point.context && (
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {point.context}
                    </p>
                  )}
                </blockquote>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
