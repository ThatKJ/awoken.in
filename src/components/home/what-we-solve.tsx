"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { ChevronDown, Clock, FileText, Users, Puzzle, BarChart3, MessageSquare, Package, Settings } from "lucide-react"
import { cn } from "@/lib/utils"


const problems = [
  {
    icon: Clock,
    title: "Slow Operations",
    investigation: "We map every step of your core workflows and measure cycle times.",
    solution: "Automate handoffs, eliminate approval bottlenecks, and streamline processes.",
    outcome: "Operations run 40-60% faster with fewer errors.",
  },
  {
    icon: FileText,
    title: "Manual Processes",
    investigation: "We identify every repetitive task consuming staff hours each week.",
    solution: "Build automated workflows that handle data entry, reporting, and admin work.",
    outcome: "Teams reclaim 15-25 hours per week for high-value work.",
  },
  {
    icon: Users,
    title: "Poor Lead Follow-up",
    investigation: "We audit response times, follow-up sequences, and conversion paths.",
    solution: "Implement automated lead qualification, routing, and nurture sequences.",
    outcome: "Lead response under 1 minute. Conversion rates increase 3-5x.",
  },
  {
    icon: Puzzle,
    title: "Disconnected Systems",
    investigation: "We map data flow between your CRM, phone, calendar, and tools.",
    solution: "Build integrations that sync data across every platform you use.",
    outcome: "Single source of truth. Zero manual data entry.",
  },
  {
    icon: BarChart3,
    title: "Reporting Delays",
    investigation: "We review how data is collected, compiled, and reported.",
    solution: "Create real-time dashboards that update automatically.",
    outcome: "Leadership sees business health instantly, not days later.",
  },
  {
    icon: MessageSquare,
    title: "Customer Response Bottlenecks",
    investigation: "We measure response times across phone, email, chat, and social.",
    solution: "Deploy AI-powered triage that routes and responds intelligently.",
    outcome: "Every inquiry answered within minutes, 24/7.",
  },
  {
    icon: Package,
    title: "Inventory Inefficiencies",
    investigation: "We analyze stock tracking, reorder patterns, and supplier workflows.",
    solution: "Build automated inventory tracking and reorder systems.",
    outcome: "Stockouts reduced by 80%. Carrying costs optimized.",
  },
  {
    icon: Settings,
    title: "Administrative Overhead",
    investigation: "We quantify time spent on scheduling, billing, compliance, and reporting.",
    solution: "Automate scheduling, invoicing, and compliance documentation.",
    outcome: "Admin costs cut by 50%+ with zero accuracy loss.",
  },
]

export function WhatWeSolve() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section>
        <SectionHeader
          eyebrow="What We Solve"
          title="We fix operational problems that cost you money."
          description="Every engagement starts with identifying the specific bottlenecks in your business. These are the most common."
        />
        <div className="max-w-3xl mx-auto divide-y divide-border">
          {problems.map((problem, i) => {
            const Icon = problem.icon
            const isOpen = openIndex === i
            return (
              <div key={problem.title}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 sm:gap-4 py-4 sm:py-5 text-left group min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm sm:text-base font-semibold">{problem.title}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 sm:pb-6 pl-12 sm:pl-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div>
                          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 sm:mb-2">How We Investigate</p>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{problem.investigation}</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 sm:mb-2">How We Solve</p>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{problem.solution}</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent mb-1.5 sm:mb-2">Expected Outcome</p>
                          <p className="text-xs sm:text-sm font-medium">{problem.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
    </Section>
  )
}
