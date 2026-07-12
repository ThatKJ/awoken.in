import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { industries } from "@/data/industries"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Industries — Business Intelligence & Implementation Consultancy",
  description: "We help businesses across industries identify operational bottlenecks and implement solutions that solve real problems.",
}

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-24 sm:pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-xl">
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Industries
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-[650px]">
              Every industry has unique workflows. We design systems around how your business operates, not the other way around.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="rounded-xl border border-border p-6 lg:p-8 flex flex-col h-full hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-lg font-semibold min-h-[48px] flex items-start mb-5">{industry.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed min-h-[72px]">
                  {industry.description}
                </p>
                <div className="flex-1" />
                <div className="space-y-4 mt-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Pain Points</p>
                    <div className="flex flex-wrap gap-2">
                      {industry.painPoints.map((p) => (
                        <span key={p} className="text-sm px-2.5 py-1 rounded-full bg-red-50 text-red-600">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Solutions</p>
                    <div className="flex flex-wrap gap-2">
                      {industry.solutions.map((s) => (
                        <span key={s} className="text-sm px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={industry.href}
                    className="text-sm font-medium text-accent inline-flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
