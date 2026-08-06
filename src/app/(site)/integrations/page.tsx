"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody } from "@/components/shared/card"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { MetricsBar } from "@/components/visuals/metrics-bar"
import { Button } from "@/components/ui/button"
import { integrationCategories } from "@/data/integrations"
import { ArrowRight, CheckCircle, Plug, Database, Globe, Phone, Calendar, Mail } from "lucide-react"

const categoryIcons = [Plug, Database, Globe, Phone]

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

export default function IntegrationsPage() {
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
            Integrations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Works with your existing tools.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Every system we build connects with what you already use. No rip-and-replace.
          </motion.p>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <MetricsBar
          variant="bordered"
          columns={4}
          metrics={[
            { value: "CRM", label: "HubSpot, Salesforce, Zoho" },
            { value: "Calendar", label: "Google, Outlook, Cal" },
            { value: "Phone", label: "Twilio, RingCentral" },
            { value: "Email", label: "Gmail, Outlook, SMTP" },
          ]}
        />
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="Categories"
          title="Connect everything."
          description="We integrate with your entire tech stack."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {integrationCategories.map((category, i) => {
            const Icon = categoryIcons[i]
            return (
              <AnimatedSection key={category.name} delay={i * 0.06}>
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                      {Icon && <Icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground transition-all" />}
                    </div>
                    <h3 className="text-lg font-bold">{category.name}</h3>
                  </div>
                  <CardBody>
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <div key={item.name} className="rounded-lg border border-border p-3 transition-all hover:border-accent/20">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        </div>
                      ))}
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
            title="Integration Hub"
            subtitle="Connected systems overview"
            chart="bar"
            metrics={[
              { label: "Active Connections", value: "12+", change: "Per client" },
              { label: "Data Synced", value: "Real-time", change: "Continuous" },
              { label: "Uptime", value: "99.9%", change: "Reliable", positive: true },
              { label: "Setup Time", value: "2-5 days", change: "Fast integration" },
            ]}
            rows={[
              { label: "CRM sync active", value: "Live", status: "success" },
              { label: "Calendar connected", value: "Synced", status: "success" },
              { label: "Phone system linked", value: "Active", status: "success" },
              { label: "Email integration", value: "Connected", status: "success" },
            ]}
          />
          <div>
            <SectionHeader
              align="left"
              eyebrow="Compatibility"
              title="We work with what you have."
              description="No need to change your existing tools. We build bridges between them."
            />
            <ul className="space-y-3 mt-6">
              {[
                "Works with your existing CRM and tools",
                "Real-time data sync across all systems",
                "Custom API integrations when needed",
                "Your team keeps using familiar interfaces",
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
