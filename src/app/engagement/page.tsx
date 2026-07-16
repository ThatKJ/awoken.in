import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { engagementTiers } from "@/data/engagement-models"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Engagement Models",
  description:
    "Flexible engagement models for every business: Starter, Growth, and Enterprise. Custom pricing tailored to your unique needs. No long-term contracts.",
  openGraph: {
    title: "Engagement Models | Awoken",
    description:
      "Flexible engagement models for every business: Starter, Growth, and Enterprise. Custom pricing tailored to your unique needs.",
    url: "https://awoken.in/engagement",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Engagement Models" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engagement Models | Awoken",
    description:
      "Flexible engagement models for every business: Starter, Growth, and Enterprise. Custom pricing tailored to your unique needs.",
    images: ["/og-image.png"],
  },
}

export default function EngagementPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
          <div className="max-w-2xl xl:max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Engagement Models
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Custom engagement tailored to your business. Every engagement starts with understanding your unique needs.
            </p>
          </div>
      </Section>
      <Section className="bg-background-alt">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {engagementTiers.map((tier) => (
              <div
                key={tier.id}
className={`rounded-xl border-2 p-6 lg:p-8 relative flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out ${
                   tier.badge ? "border-accent hover:border-accent/20" : "border-border hover:border-accent/20"
                 }`}
              >
                {tier.badge && (
                  <Badge variant="accent" className="absolute -top-2.5 left-4">
                    {tier.badge}
                  </Badge>
                )}
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">{tier.name}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">{tier.description}</p>
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2 sm:mb-3">Ideal for</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tier.idealFor.map((item) => (
                      <span key={item} className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-2 sm:space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm">
                      <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <Link href={tier.cta.href}>
                    <Button variant={tier.cta.variant as any} size="lg" className="w-full text-sm sm:text-base">
                      {tier.cta.label}
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
      </Section>
      <Section className="bg-background">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Every business is different.</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We don't believe in one-size-fits-all pricing. Every engagement starts with understanding your business, identifying operational bottlenecks, and building systems that create measurable impact.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
              {["No long-term contracts", "Personalized onboarding", "Ongoing optimization", "Transparent reporting"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent shrink-0" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
      </Section>
    </>
  )
}
