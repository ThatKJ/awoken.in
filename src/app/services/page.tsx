"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody, CardFooter } from "@/components/shared/card"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { ProcessFlow } from "@/components/visuals/process-flow"
import { MetricsBar } from "@/components/visuals/metrics-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { serviceBlueprints } from "@/data/service-blueprints"
import {
  ArrowRight,
  PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles,
  Search, ClipboardCheck, Rocket, BarChart3, CheckCircle,
} from "lucide-react"

const icons = [PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles]

const serviceMetrics = [
  { value: "40-60%", label: "Faster operations", icon: BarChart3 },
  { value: "15-25h", label: "Saved per week", icon: Star },
  { value: "< 1 min", label: "Lead response time", icon: Send },
  { value: "100%", label: "Custom solutions", icon: Target },
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

export default function ServicesPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-accent text-base font-bold tracking-wide uppercase mb-4 sm:mb-6"
          >
            Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Solutions built around your business,&nbsp;not&nbsp;packages.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Every solution starts with diagnosis. We find the bottlenecks, then build exactly what you need.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10"
          >
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book a Free Business Intelligence Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <MetricsBar metrics={serviceMetrics} variant="bordered" />
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="Our Process"
          title="Diagnose before you build."
          description="Four steps from discovery to deployment."
        />
        <div className="max-w-5xl mx-auto">
          <ProcessFlow
            variant="cards"
            steps={[
              { icon: Search, label: "Discovery", description: "Map your workflows and goals" },
              { icon: ClipboardCheck, label: "Audit", description: "Identify bottlenecks and opportunities" },
              { icon: Rocket, label: "Build", description: "Deploy custom AI systems" },
              { icon: BarChart3, label: "Optimize", description: "Measure and refine continuously" },
            ]}
          />
        </div>
      </Section>

      <Section className="bg-background-alt">
        <SectionHeader
          eyebrow="Services"
          title="What we build."
          description="Each solution is tailored after diagnosis. These are capabilities, not packages."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {serviceBlueprints.map((blueprint, i) => {
            const Icon = icons[i]
            return (
              <AnimatedSection key={blueprint.title} delay={i * 0.04}>
                <Card>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                    <Icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground transition-all" />
                  </div>
                  <CardBody>
                    <h3 className="text-lg font-bold mb-2">{blueprint.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{blueprint.outcome}</p>
                  </CardBody>
                  <CardFooter>
                    <Badge variant="soft" className="text-xs">{blueprint.technology}</Badge>
                  </CardFooter>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </Section>

      <Section className="bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Business Intelligence"
              title="See your operations in real time."
              description="Dashboards that show exactly where your business stands. No more spreadsheets."
            />
            <ul className="space-y-3 mt-6">
              {[
                "Real-time KPI tracking",
                "Bottleneck identification",
                "Revenue opportunity scoring",
                "Team performance metrics",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <DashboardMockup
            title="Operations Dashboard"
            subtitle="Live business intelligence"
            chart="line"
            metrics={[
              { label: "Revenue Impact", value: "₹18-42L", change: "+28%", positive: true },
              { label: "Bottlenecks", value: "12", change: "Identified" },
              { label: "Quick Wins", value: "5", change: "Ready", positive: true },
              { label: "Efficiency", value: "73%", change: "+18%", positive: true },
            ]}
            rows={[
              { label: "Lead response < 1 min", value: "Active", status: "success" },
              { label: "Manual entry eliminated", value: "95%", status: "success" },
              { label: "Admin overhead reduced", value: "52%", status: "success" },
            ]}
          />
        </div>
      </Section>

      <Section className="bg-background-alt">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Get Started"
            title="The only way to know is to start."
            description="A 30-minute diagnostic call to map your operations and identify where AI creates value."
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
