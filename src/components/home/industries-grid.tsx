"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { industries } from "@/data/industries"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function IndustriesGrid() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight">
            Industries We Serve
          </h2>
          <p className="mt-4 text-[20px] text-muted-foreground max-w-[650px] mx-auto">
            Every industry has unique workflows. We design systems around how your business operates.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-background flex flex-col h-full p-8 hover:shadow-lg transition-all duration-200 group"
              >
                <h3 className="text-lg font-semibold min-h-[48px] flex items-start mb-5 group-hover:text-accent transition-colors">
                  {industry.title}
                </h3>
                <p className="flex-1 text-base text-muted-foreground leading-relaxed min-h-[72px]">
                  {industry.description}
                </p>
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {industry.solutions.map((s) => (
                      <span
                        key={s}
                        className="text-sm px-3 py-1.5 rounded-full bg-surface text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={industry.href}
                    className="text-sm font-medium text-accent inline-flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
