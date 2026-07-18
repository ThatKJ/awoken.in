"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { Search, Zap, Target, Route, TrendingUp, FileText } from "lucide-react"

const reportSections = [
  { icon: Search, title: "Current Workflow", description: "Complete mapping of how your operations run today." },
  { icon: FileText, title: "Operational Bottlenecks", description: "Every inefficiency identified and quantified." },
  { icon: Zap, title: "Quick Wins", description: "Immediate improvements with minimal effort." },
  { icon: Target, title: "Automation Opportunities", description: "Where AI and automation create real value." },
  { icon: Route, title: "Implementation Roadmap", description: "Phased plan with timelines and milestones." },
  { icon: TrendingUp, title: "Expected Business Impact", description: "Projected ROI for each recommendation." },
]

function ReportDashboard() {
  return (
    <DashboardMockup
      title="Assessment Summary"
      subtitle="Awoken Intelligence Report"
      chart="line"
      metrics={[
        { label: "Opportunities Found", value: "12", change: "+3 this quarter", positive: true },
        { label: "Annual Impact", value: "₹18-42L", change: "Projected ROI" },
        { label: "Quick Wins", value: "5", change: "< 2 weeks each", positive: true },
        { label: "Implementation", value: "8-12 wks", change: "Phased rollout" },
      ]}
      rows={[
        { label: "Workflow bottlenecks identified", value: "7", status: "success" },
        { label: "Manual processes automated", value: "95%", status: "success" },
        { label: "Systems integration points", value: "4", status: "warning" },
        { label: "Team training required", value: "Minimal", status: "success" },
      ]}
    />
  )
}

export function IntelligenceReport() {
  return (
    <Section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
        <div>
          <SectionHeader
            align="left"
            eyebrow="The Awoken Intelligence Report"
            title="Every engagement starts with a structured operational assessment."
            description="Before we recommend any technology, we deliver a comprehensive report that gives you complete clarity about your business."
            titleClassName="lg:text-4xl xl:text-5xl"
          />
          <div className="space-y-3 sm:space-y-4">
            {reportSections.map((section, i) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold">{section.title}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        <ReportDashboard />
      </div>
    </Section>
  )
}
