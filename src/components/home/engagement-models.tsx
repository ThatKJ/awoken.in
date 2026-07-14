"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { engagementTiers } from "@/data/engagement-models"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export function EngagementModels() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Engagement Models
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Custom pricing tailored to your business. Every engagement starts with understanding your unique needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {engagementTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
className={`rounded-xl border-2 flex flex-col h-full p-6 lg:p-8 relative ${
                 tier.badge
                  ? "border-accent bg-background"
                  : "border-border bg-background"
              }`}
            >
              {tier.badge && (
                <Badge variant="accent" className="absolute -top-2.5 left-4">
                  {tier.badge}
                </Badge>
              )}
              <h3 className="text-xl md:text-2xl font-semibold min-h-[64px] flex items-start mb-5">{tier.name}</h3>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed min-h-[72px]">
                {tier.description}
              </p>
              <div className="mb-6 min-h-[96px]">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Ideal for
                </p>
                <div className="flex flex-wrap gap-2">
                  {tier.idealFor.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-full bg-surface text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link href={tier.cta.href}>
                  <Button
                    variant={tier.cta.variant as any}
                    size="lg"
                    className="w-full"
                  >
                    {tier.cta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Every business is different.</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We don't believe in one-size-fits-all pricing. Every engagement starts with understanding your business, identifying revenue leaks, and designing AI systems that create measurable impact. You'll receive a tailored proposal based on your goals, workflows, and operational requirements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {["No long-term contracts", "Personalized onboarding", "Ongoing optimization", "Transparent reporting"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
