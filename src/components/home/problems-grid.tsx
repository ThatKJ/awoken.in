"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { problems } from "@/data/problems"
import { Phone, Timer, Settings, Link, Users, Database, UserRound, Frown } from "lucide-react"

const icons = [Phone, Timer, Settings, Link, Users, Database, UserRound, Frown]

export function ProblemsGrid() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight">
            Every Growing Business Leaks Revenue
          </h2>
          <p className="mt-4 text-[20px] text-muted-foreground max-w-[650px] mx-auto">
            These are the problems we solve. Each one costs you money every day it goes unfixed.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((problem, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-border flex flex-col h-full p-6 hover:border-accent/20 transition-colors group cursor-default"
              >
                <div className="w-11 h-11 rounded-lg bg-surface flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors shrink-0">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-lg font-semibold min-h-[48px] flex items-start mb-5">{problem.title}</h3>
                <p className="flex-1 text-base text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
                <p className="text-base text-accent mt-auto pt-4 font-medium">{problem.impact}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
