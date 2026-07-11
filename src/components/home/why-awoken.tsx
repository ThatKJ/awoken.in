"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { whyAwokenPoints } from "@/data/why-awoken"
import { Shield, Cpu, BarChart, RefreshCw } from "lucide-react"

const icons = [Cpu, Shield, BarChart, RefreshCw]

export function WhyAwoken() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight">
            Why Awoken
          </h2>
          <p className="mt-4 text-[20px] text-muted-foreground max-w-[650px] mx-auto">
            We don't sell technology. We build systems that create measurable business outcomes.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {whyAwokenPoints.map((point, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border flex flex-col h-full p-8"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-6 shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold min-h-[48px] flex items-start mb-5">{point.title}</h3>
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
