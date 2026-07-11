import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { serviceBlueprints } from "@/data/service-blueprints"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Solutions — Revenue Systems for Modern Businesses",
  description: "Never Miss Another Call. Every Lead Gets Qualified Instantly. Your CRM Updates Itself. Outcome-focused AI solutions for your business.",
}

export default function SolutionsPage() {
  return (
    <>
      <section className="pt-[140px] pb-24">
        <Container>
          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              Solutions
            </h1>
            <p className="mt-4 text-[20px] text-muted-foreground leading-relaxed max-w-[650px]">
              Every solution is designed around a specific outcome. Technology supports the outcome, not the other way around.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          <div className="grid sm:grid-cols-2 gap-8">
            {serviceBlueprints.map((blueprint) => (
              <div
                key={blueprint.title}
                className="rounded-xl border border-border p-8 flex flex-col h-full hover:shadow-lg transition-all duration-200"
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
        </Container>
      </section>
    </>
  )
}
