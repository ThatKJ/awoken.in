"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import {
  Phone,
  ClipboardList,
  FileText,
  FileCheck,
  Rocket,
  RefreshCw,
  Check,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: Phone,
    title: "Discovery Call",
    duration: "45–60 Minutes",
    description: "We learn how your business actually operates before recommending technology.",
    deliverables: [
      "Business Goals",
      "Operational Challenges",
      "Stakeholder Interviews",
    ],
    outcome: "Complete understanding of how the business operates before making recommendations.",
  },
  {
    icon: ClipboardList,
    title: "Business Audit",
    duration: "2–3 Days",
    description: "Deep dive into your operations, workflows, and systems.",
    deliverables: [
      "Revenue Analysis",
      "Workflow Mapping",
      "Tech Stack Review",
    ],
    outcome: "Comprehensive health assessment with quantified inefficiencies.",
  },
  {
    icon: FileText,
    title: "Intelligence Report",
    duration: "3–5 Days",
    description: "Comprehensive findings with prioritized recommendations.",
    deliverables: [
      "Opportunity Sizing",
      "Prioritized Action Plan",
      "ROI Projections",
    ],
    outcome: "Data-backed decision framework for leadership alignment.",
  },
  {
    icon: FileCheck,
    title: "Implementation Proposal",
    duration: "5–7 Days",
    description: "Detailed plan with timelines, costs, and expected ROI.",
    deliverables: [
      "Scope & Milestones",
      "Budget & Timeline",
      "Risk Assessment",
    ],
    outcome: "Clear execution roadmap with stakeholder buy-in.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    duration: "2–6 Weeks",
    description: "Build, test, and launch your custom solution.",
    deliverables: [
      "Custom System Build",
      "Team Training",
      "Go-Live Support",
    ],
    outcome: "Production-ready solution with zero operational disruption.",
  },
  {
    icon: RefreshCw,
    title: "Optimization",
    duration: "Ongoing",
    description: "Monitor results, iterate, and continuously improve.",
    deliverables: [
      "KPI Tracking",
      "Data-Driven Iteration",
      "Performance Reviews",
    ],
    outcome: "Continuous improvement loop that scales with your business.",
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  }),
}

export function Process() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const [expanded, setExpanded] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (i: number) => {
      if (i === active) return
      setDirection(i > active ? 1 : -1)
      setActive(i)
    },
    [active]
  )

  // Scroll-based active step detection
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handles = steps.map((_, i) => {
      const el = document.getElementById(`step-${i}`)
      return el
    })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.id.replace("step-", ""))
            if (!isNaN(idx) && idx !== active) {
              setDirection(idx > active ? 1 : -1)
              setActive(idx)
            }
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    )

    for (const el of handles) {
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [active])

  const current = steps[active]

  return (
    <Section ref={sectionRef} className="py-24 md:py-28 lg:py-36 bg-surface overflow-hidden">
        <SectionHeader
          eyebrow="Our Process"
          title="From discovery to deployment, in six steps."
          description="Every engagement follows a proven methodology that ensures we solve the right problems."
        />

        {/* Desktop: two-column interactive */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:gap-12 xl:gap-16 mt-16 md:mt-20">
          {/* Left: Sticky Navigation */}
          <div className="lg:sticky lg:top-32 lg:self-start lg:pt-8 xl:pt-10">
            <nav className="space-y-0.5">
              {steps.map((step, i) => {
                const isActive = i === active
                const Icon = step.icon
                return (
                  <button
                    key={step.title}
                    onClick={() => goTo(i)}
                    className={cn(
                      "flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-accent/5"
                        : "hover:bg-surface"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                        isActive
                          ? "bg-accent text-white"
                          : "bg-border/50 text-muted-foreground"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={cn(
                          "block text-xs font-semibold transition-all duration-300",
                          isActive ? "text-accent" : "text-muted-foreground"
                        )}
                      >
                        Step {i + 1}
                      </span>
                      <span
                        className={cn(
                          "block transition-all duration-300",
                          isActive
                            ? "text-sm font-bold text-foreground"
                            : "text-sm font-medium text-muted-foreground"
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right: Single Animated Card */}
          <div ref={cardRef} className="relative min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="group rounded-xl border border-border bg-background p-8 xl:p-10 shadow-sm"
              >
                <div className="w-10 h-1 rounded-full bg-accent/60 mb-6" />

                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center shrink-0">
                    <current.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      Step {active + 1}
                    </span>
                    <h3 className="text-xl xl:text-2xl font-bold mt-0.5">{current.title}</h3>
                  </div>
                </div>

                <p className="text-sm xl:text-base text-muted-foreground leading-relaxed max-w-[55ch] mb-6">
                  {current.description}
                </p>

                <div className="mb-6">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Duration
                  </span>
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {current.duration}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Deliverables
                  </span>
                  <ul className="mt-3 space-y-2">
                    {current.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm xl:text-base text-muted-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-border">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Business Outcome
                  </span>
                  <p className="text-sm font-medium text-foreground mt-1">
                    {current.outcome}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Accordion */}
        <div className="lg:hidden mt-12 space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isOpen = expanded === i
            return (
              <div key={step.title} className="rounded-xl border border-border bg-background overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-accent">Step {i + 1}</span>
                      <h3 className="text-sm font-bold mt-0.5">{step.title}</h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300",
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
                      <div className="px-5 pb-5 pt-0 space-y-4 border-t border-border">
                        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                          {step.description}
                        </p>
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Duration
                          </span>
                          <p className="text-sm font-medium mt-0.5">{step.duration}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Deliverables
                          </span>
                          <ul className="mt-2 space-y-1.5">
                            {step.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-2">
                                <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-3 border-t border-border">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Business Outcome
                          </span>
                          <p className="text-sm font-medium text-foreground mt-1">{step.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Hidden sentinel elements for scroll detection */}
        <div className="hidden lg:block">
          {steps.map((_, i) => (
            <div key={i} id={`step-${i}`} className="h-0" />
          ))}
        </div>

        {/* CTA */}
    </Section>
  )
}
