"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, ClipboardList, FileText, FileCheck, Rocket, RefreshCw } from "lucide-react"

const steps = [
  { icon: Phone, title: "Discovery Call", description: "We learn about your business, challenges, and goals." },
  { icon: ClipboardList, title: "Business Audit", description: "Deep dive into your operations, workflows, and systems." },
  { icon: FileText, title: "Intelligence Report", description: "Comprehensive findings with prioritized recommendations." },
  { icon: FileCheck, title: "Implementation Proposal", description: "Detailed plan with timelines, costs, and expected ROI." },
  { icon: Rocket, title: "Deployment", description: "Build, test, and launch your custom solution." },
  { icon: RefreshCw, title: "Optimization", description: "Monitor results, iterate, and continuously improve." },
]

export function Process() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-surface">
      <Container>
        <SectionHeader
          eyebrow="Our Process"
          title="From discovery to deployment, in six steps."
          description="Every engagement follows a proven methodology that ensures we solve the right problems."
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 sm:gap-5"
                >
                  <div className="relative z-10 shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-accent bg-background flex items-center justify-center">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1 sm:pt-2 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                      <span className="text-[10px] sm:text-xs font-semibold text-accent">Step {i + 1}</span>
                      <h3 className="text-sm sm:text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
