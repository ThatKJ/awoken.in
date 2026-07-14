import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { serviceBlueprints } from "@/data/service-blueprints"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Outcome-focused AI solutions for local businesses. Lead qualification systems, CRM automation, AI receptionists, inventory tracking, and custom dashboards. Every solution is diagnosis-first.",
  openGraph: {
    title: "Solutions | Awoken",
    description:
      "Outcome-focused AI solutions for local businesses. Lead qualification systems, CRM automation, AI receptionists, inventory tracking, and custom dashboards.",
    url: "https://awoken.in/solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | Awoken",
    description:
      "Outcome-focused AI solutions for local businesses. Lead qualification systems, CRM automation, AI receptionists, inventory tracking, and custom dashboards.",
    images: ["/og-image.png"],
  },
}

export default function SolutionsPage() {
  return (
    <>
      <Section size="hero">
          <div className="max-w-xl">
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Solutions
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Every solution starts with a diagnosis. We identify the bottlenecks in your operations before recommending any technology. These are examples of what we build.
            </p>
          </div>
      </Section>
      <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {serviceBlueprints.map((blueprint) => (
              <div
                key={blueprint.title}
                className="rounded-xl border border-border p-6 lg:p-8 flex flex-col h-full hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-2xl font-semibold min-h-[72px] flex items-start mb-5">{blueprint.title}</h3>
                <p className="text-base text-muted-foreground mb-4 leading-relaxed min-h-[72px]">
                  {blueprint.outcome}
                </p>
                <div className="flex-1" />
                <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                  {blueprint.description}
                </p>
                <div className="mt-auto">
                  <Badge variant="secondary">{blueprint.technology}</Badge>
                </div>
              </div>
            ))}
          </div>
      </Section>
    </>
  )
}
