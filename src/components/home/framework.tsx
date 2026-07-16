"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Search, Stethoscope, Target, Building2, LineChart, ArrowRight, Check } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Understand how the business operates before making recommendations.",
    items: [
      "Interview stakeholders",
      "Observe workflows",
      "Understand goals",
    ],
  },
  {
    icon: Stethoscope,
    title: "Diagnose",
    description: "Identify where the business is losing time, money, and efficiency.",
    items: [
      "Identify bottlenecks",
      "Map repetitive work",
      "Find hidden inefficiencies",
    ],
  },
  {
    icon: Target,
    title: "Prioritize",
    description: "Focus on what creates the most value with the least disruption.",
    items: [
      "Estimate impact vs effort",
      "Recommend highest-value improvements",
      "Ignore unnecessary automation",
    ],
  },
  {
    icon: Building2,
    title: "Implement",
    description: "Build and deploy custom systems tailored to your business.",
    items: [
      "Build custom AI systems",
      "Dashboards & automations",
      "Internal tools & ERP modules",
    ],
  },
  {
    icon: LineChart,
    title: "Measure",
    description: "Track improvements and continuously optimize for better results.",
    items: [
      "Track key improvements",
      "Iterate based on data",
      "Continuously optimize",
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.18, ease: "easeOut" as const },
  }),
}

export function Framework() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <Section ref={sectionRef} className="py-24 md:py-28 lg:py-36 bg-surface overflow-hidden">
        <SectionHeader
          eyebrow="The Awoken Intelligence Framework"
          title="A structured approach to operational clarity."
          description="We don't jump to solutions. We start by understanding your business, then diagnose, prioritize, implement, and measure."
        />

        <div className="relative max-w-5xl mx-auto mt-16 md:mt-20">
          {/* MOBILE LAYOUT */}
          <div className="md:hidden relative">
            <div className="absolute left-[16px] top-0 bottom-0 w-px bg-border">
              <motion.div
                className="w-full bg-accent origin-top"
                style={{ height: lineHeight }}
              />
            </div>
            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={cardVariants}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center w-8 shrink-0 relative z-10">
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-accent bg-background mt-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.15 }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="group rounded-xl border border-border bg-background p-6 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-semibold text-accent px-2 py-0.5 rounded-md bg-accent/5">
                            Step {i + 1}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                            <Icon className="h-4 w-4 text-accent" />
                          </div>
                          <h3 className="text-base font-bold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {step.description}
                        </p>
                        <ul className="space-y-2">
                          {step.items.map((item) => (
                            <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* DESKTOP LAYOUT — unchanged */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
              <motion.div
                className="w-full bg-accent origin-top"
                style={{ height: lineHeight }}
              />
            </div>
            <div className="space-y-0 relative">
              {steps.map((step, i) => {
                const Icon = step.icon
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={step.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={cardVariants}
                    className="flex items-start relative even:flex-row-reverse"
                  >
                    <div className={`w-1/2 ${isLeft ? "pr-10 text-right" : "pl-10"}`}>
                      <div className="group rounded-xl border border-border bg-background p-8 shadow-sm hover:shadow-lg hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300">
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? "flex-row-reverse" : ""}`}>
                          <div className="w-9 h-9 rounded-lg bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 group-hover:scale-105 transition-all duration-300">
                            <Icon className="h-[18px] w-[18px] text-accent" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-accent px-2 py-0.5 rounded-md bg-accent/5">
                              Step {i + 1}
                            </span>
                            <h3 className="text-lg font-bold mt-0.5">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {step.description}
                        </p>
                        <ul className="space-y-1.5">
                          {step.items.map((item) => (
                            <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="absolute left-1/2 top-7 -translate-x-1/2 z-10">
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-accent bg-background"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.15 }}
                      />
                    </div>

                    <div className="w-1/2" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-sm font-semibold text-foreground mb-4">
            Ready to understand your business?
          </p>
          <Link
            href="/book"
            className="inline-flex h-11 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors items-center gap-2"
          >
            Book a Free Business Intelligence Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
    </Section>
  )
}
