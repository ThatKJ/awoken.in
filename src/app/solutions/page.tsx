"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody } from "@/components/shared/card"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { ProcessFlow } from "@/components/visuals/process-flow"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { serviceBlueprints } from "@/data/service-blueprints"
import {
  ArrowRight, PhoneCall, Target, Calendar, Database, Send, Bot, Sparkles,
  Search, ClipboardCheck, Rocket, BarChart3, CheckCircle,
} from "lucide-react"

const icons = [PhoneCall, Target, Calendar, Database, Send, Bot, Sparkles]

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

export default function SolutionsPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/10 bg-accent/5 text-accent text-xs font-semibold tracking-wide mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
            Solutions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Every solution starts with a diagnosis.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            We identify bottlenecks before recommending any technology. These are examples of what we build.
          </motion.p>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <SectionHeader
          eyebrow="What We Build"
          title="Capabilities, not packages."
          description="Each solution is custom-built after understanding your specific operations."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {serviceBlueprints.map((blueprint, i) => {
            const Icon = icons[i]
            return (
              <AnimatedSection key={blueprint.title} delay={i * 0.04}>
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                      {Icon ? <Icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground transition-all" /> : <Bot className="h-5 w-5 text-accent" />}
                    </div>
                    <Badge variant="soft" className="text-xs">{blueprint.technology}</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{blueprint.title}</h3>
                  <CardBody>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{blueprint.outcome}</p>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed">{blueprint.description}</p>
                  </CardBody>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </Section>

      <Section className="bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <DashboardMockup
            title="Solution Preview"
            subtitle="How our systems work together"
            chart="bar"
            metrics={[
              { label: "Systems Deployed", value: "8+", change: "Per client" },
              { label: "Avg Time to Deploy", value: "3-6 wks", change: "Fast rollout" },
              { label: "Integration Rate", value: "95%", change: "With existing tools", positive: true },
              { label: "Team Training", value: "2-3 days", change: "Full onboarding" },
            ]}
            rows={[
              { label: "Lead qualification automated", value: "3-5x ROI", status: "success" },
              { label: "Data entry eliminated", value: "95%", status: "success" },
              { label: "System integration complete", value: "All tools", status: "success" },
            ]}
          />
          <div>
            <SectionHeader
              align="left"
              eyebrow="Process"
              title="Built to work with what you have."
              description="Every system integrates with your existing tools and workflows."
            />
            <ul className="space-y-3 mt-6">
              {[
                "Integrates with your current CRM and tools",
                "No rip-and-replace of existing systems",
                "Your team trained and productive in days",
                "Continuous optimization based on real data",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/book">
                <Button variant="primary">
                  Book a Free Audit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
