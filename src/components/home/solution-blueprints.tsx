"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { serviceBlueprints } from "@/data/service-blueprints"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles } from "lucide-react"
import Link from "next/link"

const icons = [PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles]

export function SolutionBlueprints() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight">
            Solution Blueprints
          </h2>
          <p className="mt-4 text-[20px] text-muted-foreground max-w-[650px] mx-auto">
            Each solution is designed around a specific business outcome. Technology supports the outcome, not the other way around.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceBlueprints.map((blueprint, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={blueprint.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-border bg-background flex flex-col h-full p-8 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold min-h-[72px] flex items-start mb-5">{blueprint.title}</h3>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed min-h-[72px]">
                  {blueprint.outcome}
                </p>
                <div className="flex-1" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {blueprint.description}
                </p>
                <div className="mt-auto">
                  <Badge variant="secondary" className="text-sm">
                    {blueprint.technology}
                  </Badge>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
