import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { serviceBlueprints } from "@/data/service-blueprints"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI consulting services for local businesses. Lead qualification, CRM automation, AI receptionist, inventory tracking, and custom operational systems. Every solution starts with diagnosis.",
  openGraph: {
    title: "Services | Awoken",
    description:
      "AI consulting services for local businesses. Lead qualification, CRM automation, AI receptionist, inventory tracking, and custom operational systems.",
    url: "https://awoken.in/services",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Awoken",
    description:
      "AI consulting services for local businesses. Lead qualification, CRM automation, AI receptionist, inventory tracking, and custom operational systems.",
    images: ["/og-image.png"],
  },
}

const icons = [PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles]

export default function ServicesPage() {
  return (
    <>
      <Section size="hero">
          <div className="max-w-2xl xl:max-w-3xl">
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Services
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Every solution starts with understanding your business. We diagnose operational bottlenecks, then build systems that solve specific problems. Technology follows diagnosis, never the other way around.
            </p>
          </div>
      </Section>
      <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {serviceBlueprints.map((blueprint, i) => {
              const Icon = icons[i]
              return (
                <div
                  key={blueprint.title}
                  className="rounded-xl border border-border bg-background p-6 lg:p-8 flex flex-col h-full hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">{blueprint.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                    {blueprint.outcome}
                  </p>
                  <div className="flex-1" />
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    {blueprint.description}
                  </p>
                  <div className="mt-auto">
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      {blueprint.technology}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
      </Section>
    </>
  )
}
