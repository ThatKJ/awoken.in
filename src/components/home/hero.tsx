"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { ArrowRight, Search, BarChart3, Lightbulb, CheckCircle, TrendingUp, Clock, Users as UsersIcon } from "lucide-react"

const trustIcons = [
  { icon: Search, label: "Understand" },
  { icon: BarChart3, label: "Diagnose" },
  { icon: Lightbulb, label: "Prioritize" },
  { icon: CheckCircle, label: "Implement" },
]

function HeroDashboard() {
  return (
    <DashboardMockup
      title="Business Intelligence"
      subtitle="Operational health overview"
      metrics={[
        { label: "Revenue Impact", value: "₹18-42L", change: "+28%", positive: true },
        { label: "Bottlenecks", value: "12", change: "Identified" },
        { label: "Quick Wins", value: "5", change: "This week", positive: true },
        { label: "Team Efficiency", value: "73%", change: "+18%", positive: true },
      ]}
      rows={[
        { label: "Lead response time improved", value: "< 1 min", status: "success" },
        { label: "Manual data entry eliminated", value: "95%", status: "success" },
        { label: "Inventory accuracy gap", value: "3.2%", status: "warning" },
        { label: "Admin overhead reduced", value: "52%", status: "success" },
      ]}
    />
  )
}

export function Hero() {
  return (
    <section className="relative flex items-start lg:items-center pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 overflow-x-hidden bg-background">
      <Container className="relative z-10 !max-w-none">
        <div className="mx-auto text-center w-full" style={{ maxWidth: "min(92vw,1400px)" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4 sm:mb-6 text-center mx-auto max-w-max"
          >
            Business Intelligence &amp; Implementation Consultancy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(1.75rem,8vw,5rem)] sm:text-[clamp(2.25rem,7vw,5.5rem)] md:text-[clamp(2.75rem,5.5vw,6rem)] xl:text-[clamp(3.25rem,5vw,6.5rem)] font-bold tracking-tight leading-[1.1] mx-auto"
            style={{ maxWidth: "min(1300px,90vw)" }}
          >
            Find the bottlenecks holding your business back.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mx-auto"
            style={{ maxWidth: "70ch" }}
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

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 sm:mt-14 md:mt-16 max-w-4xl mx-auto"
        >
          <HeroDashboard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 sm:mt-14 md:mt-16 pt-8 sm:pt-12 md:pt-16 border-t border-border"
        >
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-base sm:text-base md:text-lg font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-6 sm:mb-8 lg:mb-10">
              Businesses don&apos;t need more software. They need clarity.
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
