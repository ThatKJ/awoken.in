"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { whyFailPoints } from "@/data/why-projects-fail"
import { AlertTriangle, Lightbulb } from "lucide-react"

export function WhyProjectsFail() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Why Most AI Projects Fail
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We've seen it happen repeatedly. Companies invest in AI without understanding their own workflows first.
            </p>
          </div>
          <div className="space-y-6">
            {whyFailPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  {i % 2 === 0 ? (
                    <AlertTriangle className="h-5 w-5 text-accent" />
                  ) : (
                    <Lightbulb className="h-5 w-5 text-accent" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1">{point.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
