"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody } from "@/components/shared/card"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { MetricsBar } from "@/components/visuals/metrics-bar"
import { ActivityFeed } from "@/components/visuals/activity-feed"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { industries } from "@/data/industries"
import {
  ArrowRight,
  Building2, Stethoscope, GraduationCap, Dumbbell, Briefcase, Store,
  CheckCircle,
} from "lucide-react"

const industryIcons: Record<string, React.ElementType> = {
  "Real Estate": Building2,
  "Healthcare": Stethoscope,
  "Education": GraduationCap,
  "Fitness": Dumbbell,
  "Professional Services": Briefcase,
  "Small Businesses": Store,
}

const industryMetrics = [
  { value: "40-60%", label: "Faster workflows", positive: true },
  { value: "3-5x", label: "Lead conversion", positive: true },
  { value: "24/7", label: "AI monitoring" },
  { value: "100%", label: "Custom-fit" },
]

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

export default function IndustriesPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4 sm:mb-6"
          >
            Industries
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Every industry has unique workflows.
            <br />
            <span className="text-accent">We adapt to yours.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Our methodology is industry-agnostic. We study how your business operates and build systems around your workflows.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10"
          >
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book a Free Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <MetricsBar metrics={industryMetrics} variant="bordered" />
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="Industries"
          title="We work across industries."
          description="Each engagement is a blank slate — designed around your specific operations."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {industries.map((industry, i) => {
            const Icon = industryIcons[industry.title] || Building2
            return (
              <AnimatedSection key={industry.id} delay={i * 0.04}>
                <Card>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                    <Icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground transition-all" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{industry.title}</h3>
                  <CardBody>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{industry.description}</p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {industry.painPoints.slice(0, 3).map((p) => (
                          <Badge key={p} variant="soft" className="text-[10px] px-2 py-0.5">{p}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </Section>

      <Section className="bg-background-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <DashboardMockup
            title="Industry Insights"
            subtitle="Cross-industry benchmarks"
            chart="bar"
            metrics={[
              { label: "Avg Bottlenecks", value: "8", change: "Per company" },
              { label: "Recoverable Revenue", value: "₹18-42L", change: "Annual" },
              { label: "Quick Wins", value: "5", change: "< 2 weeks", positive: true },
              { label: "Implementation", value: "4-8 wks", change: "Typical" },
            ]}
            rows={[
              { label: "Lead response automation", value: "3-5x ROI", status: "success" },
              { label: "Workflow automation", value: "40-60% faster", status: "success" },
              { label: "System integration", value: "95% coverage", status: "success" },
            ]}
          />
          <div>
            <SectionHeader
              align="left"
              eyebrow="Cross-Industry"
              title="Common patterns, custom solutions."
              description="While every business is unique, we consistently find similar bottlenecks across industries."
            />
            <div className="mt-6 space-y-3">
              {[
                "Manual data entry drains 15-25h per week per team",
                "Slow lead response costs 3-5x potential conversions",
                "Disconnected systems create data silos and errors",
                "Admin overhead eats 50%+ of operational budgets",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Next Step"
            title="Not sure where you fit?"
            description="That is exactly why we start with a diagnostic conversation. Thirty minutes to map your operations and identify where improvement creates the biggest impact."
          />
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book Free Business Intelligence Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
