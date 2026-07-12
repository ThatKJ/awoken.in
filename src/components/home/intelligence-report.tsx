"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { FileText, Search, Zap, Target, Route, TrendingUp } from "lucide-react"

const reportSections = [
  { icon: Search, title: "Current Workflow", description: "Complete mapping of how your operations run today." },
  { icon: FileText, title: "Operational Bottlenecks", description: "Every inefficiency identified and quantified." },
  { icon: Zap, title: "Quick Wins", description: "Immediate improvements with minimal effort." },
  { icon: Target, title: "Automation Opportunities", description: "Where AI and automation create real value." },
  { icon: Route, title: "Implementation Roadmap", description: "Phased plan with timelines and milestones." },
  { icon: TrendingUp, title: "Expected Business Impact", description: "Projected ROI for each recommendation." },
]

export function IntelligenceReport() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="The Awoken Intelligence Report"
              title="Every engagement starts with a structured operational assessment."
              description="Before we recommend any technology, we deliver a comprehensive report that gives you complete clarity about your business."
            />
            <div className="space-y-4">
              {reportSections.map((section, i) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{section.title}</p>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl border border-border bg-background p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Awoken Intelligence Report</p>
                  <p className="text-xs text-muted-foreground">Prepared for [Your Business]</p>
                </div>
              </div>
              <div className="space-y-4">
                {reportSections.slice(0, 4).map((section) => (
                  <div key={section.title} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-sm text-muted-foreground">{section.title}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total identified opportunities</span>
                  <span className="font-semibold text-accent">12</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Estimated annual impact</span>
                  <span className="font-semibold">₹18-42 lakhs</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-border -z-10 bg-surface" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
