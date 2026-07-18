"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody } from "@/components/shared/card"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { MetricsBar } from "@/components/visuals/metrics-bar"
import { ProcessFlow } from "@/components/visuals/process-flow"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { philosophyPoints } from "@/data/philosophy"
import {
  ArrowRight, Lightbulb, Target, Heart, Shield, Zap, Sparkles, Users, Star, BarChart3,
  CheckCircle,
} from "lucide-react"

const values = [
  { icon: Heart, title: "Understand First", description: "We never recommend technology before understanding the problem." },
  { icon: Target, title: "Measurable Impact", description: "Every engagement is measured by business outcomes, not deliverables." },
  { icon: Shield, title: "Transparency", description: "No hidden fees, no locked-in contracts, no proprietary platforms." },
  { icon: Zap, title: "Engineering Quality", description: "Production-ready systems built to evolve with your business." },
  { icon: Users, title: "Partnership", description: "We work with you, not for you. Your success is our success." },
  { icon: Star, title: "Continuous Improvement", description: "Good is never the final destination. We optimize relentlessly." },
]

const milestones = [
  { year: "2024", title: "Founded", description: "Awoken was created to help businesses recover revenue lost to operational inefficiency." },
  { year: "2025", title: "First Clients", description: "Launched with pilot clients in real estate, healthcare, and professional services." },
  { year: "2026", title: "Scaling Impact", description: "Expanding across industries with a proven methodology and growing team." },
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

export default function AboutPage() {
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
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            We help businesses find what&apos;s broken and&nbsp;fix&nbsp;it.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Businesses don&apos;t need more software. They need clarity. Every bottleneck discovered is an opportunity. Every inefficiency fixed is revenue recovered.
          </motion.p>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <MetricsBar
          variant="bordered"
          columns={3}
          metrics={[
            { value: "Diagnosis", label: "Before recommendation", icon: Lightbulb },
            { value: "Custom", label: "Every engagement", icon: Target },
            { value: "Measured", label: "Business outcomes", icon: BarChart3 },
          ]}
        />
      </Section>

      <Section className="bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our Philosophy"
              title="Understand first. Recommend second. Build&nbsp;third."
              description="We never start with technology. We start with your business."
            />
            <div className="space-y-4 mt-6">
              {philosophyPoints.map((point, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="rounded-xl border border-border bg-background-alt p-5">
                    <p className="text-base font-semibold italic leading-relaxed">
                      &ldquo;{point.quote}&rdquo;
                    </p>
                    {point.context && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{point.context}</p>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
          <DashboardMockup
            title="Company Dashboard"
            subtitle="Awoken — Operational overview"
            chart="line"
            metrics={[
              { label: "Engagements", value: "8+", change: "Active", positive: true },
              { label: "Industries", value: "6", change: "Served" },
              { label: "Avg Impact", value: "₹31L", change: "Annual", positive: true },
              { label: "NPS", value: "92", change: "Client satisfaction", positive: true },
            ]}
            rows={[
              { label: "Bottlenecks resolved per client", value: "12 avg", status: "success" },
              { label: "Workflows automated", value: "95%", status: "success" },
              { label: "Team efficiency improved", value: "73%", status: "success" },
            ]}
          />
        </div>
      </Section>

      <Section className="bg-background-alt">
        <SectionHeader
          eyebrow="Values"
          title="What we stand for."
          description="Principles that guide every engagement."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <AnimatedSection key={value.title} delay={i * 0.05}>
                <Card>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                    <Icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground transition-all" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <CardBody>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardBody>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="Timeline"
          title="Our journey so far."
          description="Building a company that puts understanding before action."
        />
        <div className="max-w-3xl mx-auto">
          {milestones.map((m, i) => (
            <AnimatedSection key={m.year} delay={i * 0.1}>
              <div className="relative pl-14 sm:pl-16 pb-8 sm:pb-10 last:pb-0">
                {i < milestones.length - 1 && (
                  <div className="absolute left-[19px] sm:left-[23px] top-[44px] bottom-0 w-px bg-gradient-to-b from-accent/30 to-accent/5" />
                )}
                <div className="absolute left-0 top-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">{m.year.slice(-2)}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{m.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-background-alt">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Let's Talk"
            title="Ready to find your bottlenecks?"
            description="A 30-minute diagnostic conversation to map your operations and identify where AI creates value."
          />
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book Free Business Intelligence Audit
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
