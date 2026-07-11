"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { metrics } from "@/data/metrics"
import { TrendingUp, Clock, Headphones, Target } from "lucide-react"

const icons = [TrendingUp, Clock, Headphones, Target]

export function BusinessOutcomes() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight">
            Business Outcomes
          </h2>
          <p className="mt-4 text-[20px] text-muted-foreground max-w-[650px] mx-auto">
            Every metric represents real business value. Faster response. More appointments. Zero missed opportunities.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border flex flex-col h-full p-8 hover:border-accent/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-6 shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="mb-6 min-h-[88px]">
                  <p className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{metric.value}</p>
                  <p className="text-lg font-semibold">{metric.label}</p>
                </div>
                <p className="flex-1 text-base text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
