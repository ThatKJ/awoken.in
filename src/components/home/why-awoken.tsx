"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { whyAwokenPoints } from "@/data/why-awoken"
import { Shield, Cpu, BarChart, RefreshCw } from "lucide-react"

const icons = [Cpu, Shield, BarChart, RefreshCw]

export function WhyAwoken() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Why Awoken
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't sell technology. We build systems that create measurable business outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {whyAwokenPoints.map((point, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border flex flex-col h-full p-6 lg:p-8"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-6 shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold min-h-[48px] flex items-start mb-5">{point.title}</h3>
                <p className="flex-1 text-base text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
