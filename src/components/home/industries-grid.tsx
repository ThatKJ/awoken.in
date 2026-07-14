"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { industries } from "@/data/industries"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function IndustriesGrid() {
  return (
    <Section className="bg-surface">
      <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Industries We Serve
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Every industry has unique workflows. We design systems around how your business operates.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-background flex flex-col h-full p-6 lg:p-8 hover:shadow-lg transition-all duration-200 group"
              >
                <h3 className="text-lg md:text-xl font-semibold min-h-[48px] flex items-start mb-5 group-hover:text-accent transition-colors">
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
                    className="text-sm font-medium text-accent inline-flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
            </motion.div>
          ))}
        </div>
    </Section>
  )
}
