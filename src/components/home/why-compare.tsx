"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { CircleX, CircleCheck } from "lucide-react"

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
    <Section className="bg-background-alt">
      <SectionHeader
        eyebrow="Why Awoken"
        title="A fundamentally different approach."
        description="We don't sell technology. We solve business problems. The difference is in how we start."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="flex flex-col h-full rounded-3xl border border-gray-200 bg-white p-10 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 className="text-3xl font-bold text-muted-foreground mb-8">Traditional Agency</h3>
          <div className="flex-1 space-y-5">
            {comparisons.map((item) => (
              <div key={item.traditional} className="flex items-start gap-3">
                <CircleX className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-lg text-muted-foreground">{item.traditional}</span>
              </div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col h-full rounded-3xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white p-10 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <h3 className="text-3xl font-bold text-accent mb-8">Awoken</h3>
          <div className="flex-1 space-y-5">
            {comparisons.map((item) => (
              <div key={item.awoken} className="flex items-start gap-3">
                <CircleCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-lg font-medium">{item.awoken}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
