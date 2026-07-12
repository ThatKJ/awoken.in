"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { Search, Stethoscope, Target, Building2, LineChart } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover",
    items: [
      "Understand the business",
      "Interview stakeholders",
      "Observe workflows",
    ],
  },
  {
    icon: Stethoscope,
    title: "Diagnose",
    items: [
      "Identify bottlenecks",
      "Map repetitive work",
      "Find hidden inefficiencies",
    ],
  },
  {
    icon: Target,
    title: "Prioritize",
    items: [
      "Estimate impact",
      "Recommend highest-value improvements",
      "Ignore unnecessary automation",
    ],
  },
  {
    icon: Building2,
    title: "Implement",
    items: [
      "Build custom AI systems",
      "Dashboards & automations",
      "Internal tools & ERP modules",
    ],
  },
  {
    icon: LineChart,
    title: "Measure",
    items: [
      "Track improvements",
      "Iterate",
      "Continuously optimize",
    ],
  },
]

export function Framework() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-surface">
      <Container>
        <SectionHeader
          eyebrow="The Awoken Intelligence Framework"
          title="A structured approach to operational clarity."
          description="We don't jump to solutions. We start by understanding your business, then diagnose, prioritize, implement, and measure."
        />
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-8 lg:space-y-0 relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`lg:flex items-center ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`lg:w-1/2 ${isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                    <div className={`inline-flex items-center gap-3 mb-4 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    <ul className={`space-y-2 ${isLeft ? "lg:flex lg:flex-col lg:items-end" : ""}`}>
                      {step.items.map((item) => (
                        <li key={item} className="text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden lg:flex lg:w-12 shrink-0 justify-center">
                    <div className="w-9 h-9 rounded-full border-2 border-accent bg-background flex items-center justify-center text-sm font-bold text-accent z-10">
                      {i + 1}
                    </div>
                  </div>
                  <div className="lg:w-1/2" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
