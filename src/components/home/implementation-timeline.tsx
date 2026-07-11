"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

import { Container } from "@/components/shared/container"
import { implementationTimeline } from "@/data/implementation-timeline"

export function ImplementationTimeline() {
  return (
    <section className="py-20 md:py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-14 md:mb-16 lg:mb-20 max-w-3xl text-center">
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
                  rounded-2xl
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
                <div className="mb-8 flex h-12 items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <span className="text-base font-bold text-accent">
                      {step.week}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div className="h-28">
                  <h3 className="text-2xl md:text-[30px] font-semibold leading-tight tracking-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="mt-2 h-36">
                  <p className="text-base md:text-lg leading-8 text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="mt-auto border-t border-border/60 pt-8">
                  <ul className="space-y-4">
                    {step.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-4"
                      >
                        <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-base leading-7 text-muted-foreground">
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
      </Container>
    </section>
  )
} 