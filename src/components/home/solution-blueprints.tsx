"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { serviceBlueprints } from "@/data/service-blueprints"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles } from "lucide-react"
import Link from "next/link"

const icons = [PhoneCall, Target, Calendar, Database, Send, Star, Bot, Sparkles]

export function SolutionBlueprints() {
  return (
    <Section className="bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Solution Blueprints
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-[3px] rounded-full bg-accent mx-auto mt-4 shadow-[0_0_8px_rgba(249,115,22,0.3)]"
          />
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Each solution is designed around a specific business outcome. Technology supports the outcome, not the other way around.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {serviceBlueprints.map((blueprint, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={blueprint.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-border bg-background flex flex-col h-full p-6 lg:p-8 hover:-translate-y-2 hover:shadow-xl hover:border-accent/20 transition-all duration-300 ease-out group/card"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300 shrink-0">
                    <Icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground group-hover/card:scale-110 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold min-h-[72px] flex items-start mb-5">{blueprint.title}</h3>
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
    </Section>
  )
}
