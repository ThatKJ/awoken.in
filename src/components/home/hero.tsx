"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { ArrowRight, BarChart3, Search, Lightbulb, CheckCircle } from "lucide-react"

const trustIcons = [
  { icon: Search, label: "Understand" },
  { icon: BarChart3, label: "Diagnose" },
  { icon: Lightbulb, label: "Prioritize" },
  { icon: CheckCircle, label: "Implement" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-20 overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-6"
          >
            Business Intelligence &amp; Implementation Consultancy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.97]"
          >
            Find the bottlenecks holding your business back.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-[700px]"
          >
            We help businesses uncover operational inefficiencies, prioritize the highest-impact improvements, and implement AI systems that solve real business problems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book a Free Business Intelligence Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-we-work">
              <Button variant="outline" size="xl">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-20 md:mt-24 pt-12 md:pt-16 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-6 text-center uppercase tracking-wider font-medium">
              Businesses don't need more software. They need clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {trustIcons.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
