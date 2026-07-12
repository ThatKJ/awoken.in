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
    <section className="relative min-h-dvh flex items-center pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-x-hidden">
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-6"
          >
            Business Intelligence &amp; Implementation Consultancy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(2rem,8vw,5rem)] sm:text-[clamp(2.5rem,7vw,5.5rem)] md:text-[clamp(3rem,6vw,6rem)] xl:text-[clamp(3.5rem,5.5vw,6.5rem)] font-bold tracking-tight leading-[0.97]"
          >
            Find the bottlenecks holding your business back.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-[700px]"
          >
            We help businesses uncover operational inefficiencies, prioritize the highest-impact improvements, and implement AI systems that solve real business problems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link href="/book">
              <Button variant="primary" size="xl" className="w-full sm:w-auto text-sm sm:text-base">
                Book a Free Business Intelligence Audit
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </Link>
            <Link href="/how-we-work">
              <Button variant="outline" size="xl" className="w-full sm:w-auto text-sm sm:text-base">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 md:pt-16 border-t border-border"
          >
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 text-center uppercase tracking-wider font-medium">
              Businesses don't need more software. They need clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {trustIcons.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{item.label}</span>
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
