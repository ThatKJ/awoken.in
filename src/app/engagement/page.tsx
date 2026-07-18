"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody, CardFooter } from "@/components/shared/card"
import { MetricsBar } from "@/components/visuals/metrics-bar"
import { ProcessFlow } from "@/components/visuals/process-flow"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { engagementTiers } from "@/data/engagement-models"
import {
  ArrowRight, CheckCircle, Search, ClipboardCheck, Rocket, BarChart3,
} from "lucide-react"

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function EngagementPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4"
          >
            Engagement
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Flexible engagement models.
            <br />
            <span className="text-accent">Custom to your needs.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Custom engagement tailored to your business. Every engagement starts with understanding your unique needs.
          </motion.p>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <MetricsBar
          variant="bordered"
          columns={3}
          metrics={[
            { value: "Free", label: "Business Intelligence Audit" },
            { value: "Custom", label: "Implementation scope" },
            { value: "Flexible", label: "No long-term contracts" },
          ]}
        />
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="Models"
          title="Choose the right engagement."
          description="Every model starts with a free diagnostic audit."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {engagementTiers.map((tier, i) => (
            <AnimatedSection key={tier.id} delay={i * 0.08}>
              <Card gradient={!!tier.badge}>
                {tier.badge && (
                  <Badge variant="accent" className="absolute -top-2.5 left-4">{tier.badge}</Badge>
                )}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tier.description}</p>
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Ideal for</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tier.idealFor.map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded-full bg-surface text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <CardBody>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter>
                  <Link href={tier.cta.href}>
                    <Button variant={tier.cta.variant as "primary" | "outline"} size="md" className="w-full">
                      {tier.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-background-alt">
        <SectionHeader
          eyebrow="Process"
          title="How engagements work."
          description="From discovery to deployment."
        />
        <div className="max-w-5xl mx-auto">
          <ProcessFlow
            variant="cards"
            steps={[
              { icon: Search, label: "Audit", description: "Free diagnostic session" },
              { icon: ClipboardCheck, label: "Proposal", description: "Custom scope and quote" },
              { icon: Rocket, label: "Build", description: "Implement AI systems" },
              { icon: BarChart3, label: "Optimize", description: "Measure and refine" },
            ]}
          />
        </div>
      </Section>

      <Section className="bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Get Started"
            title="Every business is different."
            description="We don't believe in one-size-fits-all. Every engagement starts with a conversation."
          />
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book Free Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl">
                Talk to Our Team
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
