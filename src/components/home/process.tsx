"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import {
  Phone,
  ClipboardList,
  FileText,
  FileCheck,
  Rocket,
  RefreshCw,
  Check,
  ArrowRight,
} from "lucide-react"

const steps = [
  {
    icon: Phone,
    title: "Discovery Call",
    description: "We learn how your business actually operates before recommending technology.",
    outcomes: [
      "Understand business goals",
      "Interview stakeholders",
      "Identify pain points",
    ],
    value: "Complete operational understanding.",
  },
  {
    icon: ClipboardList,
    title: "Business Audit",
    description: "Deep dive into your operations, workflows, and systems.",
    outcomes: [
      "Map existing workflows",
      "Analyze revenue gaps",
      "Document tech stack",
    ],
    value: "Comprehensive health assessment.",
  },
  {
    icon: FileText,
    title: "Intelligence Report",
    description: "Comprehensive findings with prioritized recommendations.",
    outcomes: [
      "Quantified opportunity sizing",
      "Prioritized action plan",
      "ROI projections",
    ],
    value: "Data-backed decision framework.",
  },
  {
    icon: FileCheck,
    title: "Implementation Proposal",
    description: "Detailed plan with timelines, costs, and expected ROI.",
    outcomes: [
      "Scope & milestones defined",
      "Budget & timeline locked",
      "Risk assessment complete",
    ],
    value: "Clear execution roadmap.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Build, test, and launch your custom solution.",
    outcomes: [
      "Custom system built",
      "Team training completed",
      "Go-live support",
    ],
    value: "Production-ready solution.",
  },
  {
    icon: RefreshCw,
    title: "Optimization",
    description: "Monitor results, iterate, and continuously improve.",
    outcomes: [
      "Track key metrics",
      "Iterate based on data",
      "Scale what works",
    ],
    value: "Continuous improvement loop.",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="py-24 md:py-28 lg:py-36 bg-surface overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Our Process"
          title="From discovery to deployment, in six steps."
          description="Every engagement follows a proven methodology that ensures we solve the right problems."
        />

        <div className="mt-16 md:mt-20 lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-16 xl:gap-20">
          {/* Left: Sticky Timeline */}
          <div className="lg:sticky lg:top-32 lg:self-start mb-12 lg:mb-0">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[17px] top-3 bottom-3 w-px bg-border hidden lg:block">
                <motion.div
                  className="w-full bg-accent origin-top"
                  style={{ scaleY: lineScale }}
                />
              </div>

              <div className="relative space-y-0 lg:space-y-0">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-4 py-5 lg:py-6"
                  >
                    <div className="relative z-10 shrink-0">
                      <div className="w-[36px] h-[36px] rounded-full border-2 border-accent bg-background flex items-center justify-center text-sm font-bold text-accent">
                        {i + 1}
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                        Step {i + 1}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {step.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="space-y-8 md:space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={cardVariants}
                >
                  {/* Mobile: inline number + title */}
                  <div className="lg:hidden flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center text-xs font-bold text-accent shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                      Step {i + 1}
                    </p>
                  </div>

                  <div className="group rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="w-10 h-1 rounded-full bg-accent/60 mb-5" />

                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 group-hover:scale-105 transition-all duration-300">
                        <Icon className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">
                          Step {i + 1}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold mt-0.5">{step.title}</h3>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[60ch] mb-5">
                      {step.description}
                    </p>

                    {/* Key outcomes */}
                    <div className="space-y-2 mb-5">
                      {step.outcomes.map((outcome) => (
                        <div key={outcome} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                    </div>

                    {/* Business value */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Business Outcome
                      </p>
                      <p className="text-sm font-medium text-foreground">{step.value}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-20 md:mt-28"
        >
          <p className="text-lg md:text-xl font-bold text-foreground">
            Ready to understand your business?
          </p>
          <p className="text-sm md:text-base text-muted-foreground mt-2 mb-6 max-w-lg mx-auto">
            Every engagement starts with a Business Intelligence Audit.
          </p>
          <Link
            href="/book"
            className="inline-flex h-12 px-7 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors items-center gap-2"
          >
            Book Free Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
