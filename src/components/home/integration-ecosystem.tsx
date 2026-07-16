"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { integrationCategories } from "@/data/integrations"

export function IntegrationEcosystem() {
  return (
    <Section className="bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Integration Ecosystem
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-[3px] rounded-full bg-accent mx-auto mt-4 shadow-[0_0_8px_rgba(249,115,22,0.3)]"
          />
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            We work with your existing tools. Every system is designed to connect with what you already use.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrationCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-lg border border-border p-3 hover:-translate-y-1 hover:shadow-md hover:border-accent/20 transition-all duration-300 ease-out"
                  >
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
    </Section>
  )
}
