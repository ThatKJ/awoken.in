"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { X, Check } from "lucide-react"

const comparisons = [
  {
    traditional: "Starts with software",
    awoken: "Starts with understanding",
  },
  {
    traditional: "Sells predefined packages",
    awoken: "Diagnoses your specific situation",
  },
  {
    traditional: "One-size-fits-all solution",
    awoken: "Recommends only necessary technology",
  },
  {
    traditional: "Measures deliverables",
    awoken: "Measures business outcomes",
  },
  {
    traditional: "Sells before understanding",
    awoken: "Understands before recommending",
  },
  {
    traditional: "Adds technology to broken processes",
    awoken: "Fixes processes, then applies technology",
  },
]

export function WhyCompare() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Why Awoken"
          title="A fundamentally different approach."
          description="We don't sell technology. We solve business problems. The difference is in how we start."
        />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-xl border border-border overflow-hidden">
            <div className="bg-surface/50 p-4 sm:p-6">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 sm:mb-4 text-center">Traditional Agency</p>
              <div className="space-y-2.5 sm:space-y-3">
                {comparisons.map((item) => (
                  <div key={item.traditional} className="flex items-start gap-2 sm:gap-3">
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-muted-foreground">{item.traditional}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-accent/5 p-4 sm:p-6">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-accent mb-3 sm:mb-4 text-center">Awoken</p>
              <div className="space-y-2.5 sm:space-y-3">
                {comparisons.map((item) => (
                  <motion.div
                    key={item.awoken}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium">{item.awoken}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
