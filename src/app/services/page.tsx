import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { serviceBlueprints } from "@/data/service-blueprints"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  description: "We help businesses identify operational bottlenecks, prioritize improvements, and implement AI solutions that solve real problems.",
}

const icons = [PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles]

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 sm:pt-28 md:pt-36 lg:pt-[140px] pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="max-w-xl">
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Services
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-[650px]">
              Every solution starts with understanding your business. We diagnose operational bottlenecks, then build systems that solve specific problems. Technology follows diagnosis, never the other way around.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {serviceBlueprints.map((blueprint, i) => {
              const Icon = icons[i]
              return (
                <div
                  key={blueprint.title}
                  className="rounded-xl border border-border bg-background p-5 sm:p-6 lg:p-8 flex flex-col h-full hover:shadow-lg transition-all duration-200"
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
        </Container>
      </section>
    </>
  )
}
