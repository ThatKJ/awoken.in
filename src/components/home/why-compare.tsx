"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { BeforeAfter } from "@/components/shared/before-after"
import { CheckCircle } from "lucide-react"

const comparisonItems = [
  { label: "Starts with understanding", before: false, after: true },
  { label: "Diagnoses your situation first", before: false, after: true },
  { label: "Recommends only what you need", before: false, after: true },
  { label: "Measures business outcomes", before: false, after: true },
  { label: "Fixes processes before tech", before: false, after: true },
  { label: "Custom-built for your business", before: false, after: true },
]

const differentiators = [
  { title: "No predefined packages.", text: "Every engagement is custom-designed for your specific situation." },
  { title: "No technology bias.", text: "We recommend only what solves your problem — not what we want to sell." },
  { title: "No handoffs.", text: "You work directly with experienced consultants who understand your business." },
]

export function WhyCompare() {
  return (
    <Section className="bg-background-alt">
      <SectionHeader
        eyebrow="Why Awoken"
        title="A fundamentally different approach."
        description="We don't sell technology. We solve business problems. The difference is in how we start."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 max-w-5xl mx-auto">
        <BeforeAfter
          beforeLabel="Traditional Agency"
          afterLabel="Awoken"
          beforeTitle="Before"
          afterTitle="After"
          items={comparisonItems}
        />
        <div className="space-y-5 sm:space-y-6">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-3 sm:gap-4"
            >
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm sm:text-base font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
