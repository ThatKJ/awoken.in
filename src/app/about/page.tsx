import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { philosophyPoints } from "@/data/philosophy"

export const metadata: Metadata = {
  description: "We help businesses identify operational bottlenecks, prioritize improvements, and implement AI systems that solve real problems.",
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 sm:pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-xl">
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              About Awoken
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-[650px]">
              We help businesses identify operational bottlenecks, prioritize the highest-impact improvements, and implement AI systems that solve real business problems. Business Intelligence &amp; Implementation Consultancy.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Our Mission</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                Businesses don't need more software. They need clarity. Every operational bottleneck discovered is an opportunity. Every inefficiency fixed is revenue recovered. We help businesses understand where they're losing time and money, then build systems that solve those specific problems.
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Our Approach</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                Understand first. Recommend second. Build third. We never start with technology. We start with your business. Every engagement begins with a structured operational assessment that identifies bottlenecks, prioritizes improvements, and only then determines where AI creates measurable value.
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Engineering Quality</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Every system we build is production-ready, measurable, and built to evolve with your business. We follow software engineering best practices and use industry-leading infrastructure. But technology is never the focus. Business outcomes are.
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
