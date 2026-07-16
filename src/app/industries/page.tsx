import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { industries } from "@/data/industries"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI automation solutions for real estate, healthcare, education, fitness, professional services, and small businesses. Every solution is tailored to your industry workflows.",
  openGraph: {
    title: "Industries | Awoken",
    description:
      "AI automation solutions for real estate, healthcare, education, fitness, professional services, and small businesses.",
    url: "https://awoken.in/industries",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Industries We Serve" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | Awoken",
    description:
      "AI automation solutions for real estate, healthcare, education, fitness, professional services, and small businesses.",
    images: ["/og-image.png"],
  },
}

export default function IndustriesPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
          <div className="max-w-2xl xl:max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Industries
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Every industry has unique workflows. We design systems around how your business operates, not the other way around.
            </p>
          </div>
      </Section>
      <Section className="bg-background-alt">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="rounded-xl border border-border bg-background p-6 lg:p-8 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl hover:border-accent/20 transition-all duration-300 ease-out group/card"
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
      </Section>
    </>
  )
}
