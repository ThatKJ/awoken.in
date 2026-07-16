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
    <section className="relative min-h-dvh flex items-start lg:items-center pt-24 sm:pt-28 md:pt-[120px] lg:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-x-hidden bg-background">
      <Container className="relative z-10">
        <div className="mx-auto text-center max-w-7xl">
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
            className="text-[clamp(1.75rem,8vw,5rem)] sm:text-[clamp(2.25rem,7vw,5.5rem)] md:text-[clamp(2.75rem,6vw,6rem)] xl:text-[clamp(3.25rem,5.5vw,6.5rem)] font-bold tracking-tight leading-[1.05]"
          >
            Find the bottlenecks holding<br />your business back.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mx-auto max-w-3xl"
          >
            We help businesses uncover operational inefficiencies, prioritize the highest-impact improvements, and implement AI systems that solve real business problems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 sm:mt-16 md:mt-20 pt-10 sm:pt-14 md:pt-20 border-t border-border"
        >
          <div className="mx-auto max-w-full xl:max-w-[70%] text-center">
            <p className="text-base sm:text-base md:text-lg font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-6 sm:mb-8 lg:mb-10">
              Businesses don't need more software. They need clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
              {trustIcons.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex flex-col items-center text-center gap-3 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold whitespace-nowrap">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
