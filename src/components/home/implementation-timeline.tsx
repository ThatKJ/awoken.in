"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

import { Section } from "@/components/shared/section"
import { implementationTimeline } from "@/data/implementation-timeline"

export function ImplementationTimeline() {
  return (
    <Section className="py-20 md:py-24 lg:py-32">
      <div className="mx-auto mb-14 md:mb-16 lg:mb-20 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Your First 30 Days
          </h2>

          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            From discovery to deployment in four weeks. Every implementation
            follows a proven process designed to deliver measurable business
            outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {implementationTimeline.map((step, i) => (
            <motion.div
              key={step.week}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
              }}
              className="relative flex"
            >
              <div
                className="
                  flex
                  w-full
                  flex-col
                  rounded-xl
                  border
                  border-border
                  bg-background
                  p-6 lg:p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                {/* Week */}
                <div className="mb-6 flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 shrink-0">
                    <span className="text-sm font-bold text-accent">
                      {step.week}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold leading-tight tracking-tight mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-6">
                  {step.description}
                </p>

                {/* Deliverables */}
                <div className="mt-auto border-t border-border/60 pt-6">
                  <ul className="space-y-3">
                    {step.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-sm text-muted-foreground">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connector Between Cards */}
              {i < implementationTimeline.length - 1 && (
<div
  className="
    hidden xl:flex
    absolute
    left-[calc(100%-12px)]
    top-1/2
    -translate-y-1/2
    items-center
    z-20
    pointer-events-none
  "
>
                  {/* 16px line */}
                  <div className="w-4 h-px bg-border" />

                  {/* Dot */}
                  <div className="w-3 h-3 rounded-full bg-accent mx-2" />

                  {/* 16px line */}
                  <div className="w-4 h-px bg-border" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
    </Section>
  )
} 