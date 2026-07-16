"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { problems } from "@/data/problems"
import { Phone, Timer, Settings, Link, Users, Database, UserRound, Frown } from "lucide-react"

const icons = [Phone, Timer, Settings, Link, Users, Database, UserRound, Frown]

export function ProblemsGrid() {
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
            Every Growing Business Leaks Revenue
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-[3px] rounded-full bg-accent mx-auto mt-4 shadow-[0_0_8px_rgba(249,115,22,0.3)]"
          />
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            These are the problems we solve. Each one costs you money every day it goes unfixed.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-border flex flex-col h-full p-6 lg:p-8 hover:-translate-y-2 hover:shadow-xl hover:border-accent/20 transition-all duration-300 ease-out group/card cursor-default"
              >
                <div className="w-11 h-11 rounded-lg bg-surface flex items-center justify-center mb-6 group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300 shrink-0">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover/card:scale-110 group-hover/card:text-accent-foreground transition-all duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold min-h-[48px] flex items-start mb-5">{problem.title}</h3>
                <p className="flex-1 text-base text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
                <p className="text-base text-accent mt-auto pt-4 font-medium">{problem.impact}</p>
              </motion.div>
            )
          })}
        </div>
    </Section>
  )
}
