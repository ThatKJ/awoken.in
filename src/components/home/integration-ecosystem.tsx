"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { integrationCategories } from "@/data/integrations"

export function IntegrationEcosystem() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Integration Ecosystem
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl lg:max-w-[650px] mx-auto">
            We work with your existing tools. Every system is designed to connect with what you already use.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrationCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-lg border border-border p-3 hover:border-accent/30 transition-colors"
                  >
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
