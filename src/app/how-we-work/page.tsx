"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Card, CardBody } from "@/components/shared/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  ArrowDown,
  Search,
  ClipboardCheck,
  PenTool,
  Rocket,
  BarChart3,
  CheckCircle,
  X,
  Clock,
  Shield,
  Lock,
  MessageCircle,
  RefreshCw,
  Heart,
  Target,
  Lightbulb,
  BookOpen,
  FileText,
  Layers,
  Users,
  Star,
} from "lucide-react"

const methodSteps = [
  {
    step: "01",
    title: "Discover",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    items: [
      "Learn your business",
      "Understand goals",
      "Review current workflows",
      "Meet key stakeholders",
    ],
  },
  {
    step: "02",
    title: "Diagnose",
    icon: ClipboardCheck,
    color: "from-violet-500 to-purple-500",
    items: [
      "Business Intelligence Audit",
      "Identify bottlenecks",
      "Map inefficiencies",
      "Find revenue leaks",
    ],
  },
  {
    step: "03",
    title: "Design",
    icon: PenTool,
    color: "from-accent to-orange-500",
    items: [
      "AI Strategy",
      "Prioritized roadmap",
      "Technical architecture",
      "Success metrics",
    ],
  },
  {
    step: "04",
    title: "Build",
    icon: Rocket,
    color: "from-emerald-500 to-green-500",
    items: [
      "AI implementation",
      "Integrations",
      "Testing",
      "Documentation",
      "Team training",
    ],
  },
  {
    step: "05",
    title: "Optimize",
    icon: BarChart3,
    color: "from-rose-500 to-pink-500",
    items: [
      "Monitor performance",
      "Continuous improvements",
      "Reporting",
      "Scaling opportunities",
    ],
  },
]

const deliverables = [
  { icon: FileText, title: "Business Intelligence Report" },
  { icon: Lightbulb, title: "AI Opportunity Assessment" },
  { icon: Layers, title: "Implementation Roadmap" },
  { icon: Star, title: "Priority Recommendations" },
  { icon: BarChart3, title: "ROI Expectations" },
  { icon: Rocket, title: "Deployment Plan" },
  { icon: BookOpen, title: "Documentation" },
  { icon: RefreshCw, title: "Ongoing Support" },
]

const comparisonData = {
  traditional: [
    "Sell software first",
    "Generic templates",
    "One-size-fits-all",
    "Limited strategy",
    "Deliver and disappear",
  ],
  awoken: [
    "Business-first",
    "Strategy-driven",
    "Custom implementation",
    "Long-term partnership",
    "Continuous optimization",
  ],
}

const timelineSteps = [
  {
    num: "01",
    title: "Discovery",
    period: "Week 1",
    icon: Search,
    items: [
      "Initial strategy call",
      "Business goals",
      "Current systems review",
      "Stakeholder interviews",
    ],
  },
  {
    num: "02",
    title: "Business Intelligence Audit",
    period: "Week 1–2",
    icon: ClipboardCheck,
    items: [
      "Process mapping",
      "Revenue leak analysis",
      "Bottleneck identification",
      "Opportunity assessment",
    ],
  },
  {
    num: "03",
    title: "Strategy & Solution Design",
    period: "Week 2",
    icon: PenTool,
    items: [
      "AI roadmap",
      "Technical architecture",
      "Prioritized implementation plan",
      "Success metrics",
    ],
  },
  {
    num: "04",
    title: "Implementation",
    period: "Weeks 3–6",
    icon: Rocket,
    items: [
      "AI systems",
      "Integrations",
      "Testing",
      "Documentation",
      "Team training",
    ],
  },
  {
    num: "05",
    title: "Deployment & Adoption",
    period: "Go Live",
    icon: CheckCircle,
    items: [
      "Production deployment",
      "Monitoring",
      "Team onboarding",
      "Performance validation",
    ],
  },
  {
    num: "06",
    title: "Continuous Optimization",
    period: "Ongoing Partnership",
    icon: RefreshCw,
    items: [
      "Monthly improvements",
      "Reporting",
      "AI optimization",
      "Expansion opportunities",
    ],
  },
]

const faqItems = [
  {
    question: "How long does a project take?",
    answer:
      "Timelines depend on scope. A single workflow automation can be deployed in 2-3 weeks. Complex multi-system integrations typically take 4-8 weeks. During your free Business Intelligence Audit, we provide a clear timeline based on your specific needs and priorities.",
  },
  {
    question: "Do we need technical knowledge to work with Awoken?",
    answer:
      "Not at all. You are the expert on your business. We handle the technical implementation. Our process is designed to be collaborative without requiring technical expertise on your end. We explain everything in plain language and provide training for your team.",
  },
  {
    question: "Can you work with our existing systems?",
    answer:
      "Yes. Integration with your existing tech stack is a core part of what we do. Whether you use Salesforce, HubSpot, Zoho, or a custom CRM — we design solutions that work with your current systems. During the audit, we evaluate your existing tools and ensure compatibility.",
  },
  {
    question: "Will our team receive training?",
    answer:
      "Yes. Training is a standard part of every implementation. We ensure your team understands how to use the new systems effectively. We provide documentation, hands-on sessions, and ongoing support during the transition period.",
  },
  {
    question: "How is success measured?",
    answer:
      "Success is measured against the specific metrics identified during the audit. We establish baseline KPIs before implementation begins and track progress throughout the engagement. Common metrics include lead response time, booking rates, time saved, and revenue recovered.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. Every implementation includes a support and optimization period. We monitor performance, make adjustments, and ensure your systems continue delivering results. For larger engagements, we offer ongoing support agreements with guaranteed response times.",
  },
]

const clientExpectations = [
  "Open communication",
  "Collaboration",
  "Timely feedback",
  "Shared ownership",
  "Long-term thinking",
]

const commitments = [
  {
    icon: Shield,
    title: "Transparency",
    desc: "No hidden agendas. No surprises. We communicate openly at every stage.",
  },
  {
    icon: Lock,
    title: "Security",
    desc: "Your data and systems are protected with industry-standard practices.",
  },
  {
    icon: Star,
    title: "Quality",
    desc: "Every solution is built to the highest standards. We do not cut corners.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    desc: "You always know where things stand. Regular updates are standard.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    desc: "We monitor, measure, and refine. Good is never the final destination.",
  },
  {
    icon: Target,
    title: "Business Outcomes",
    desc: "Every engagement is measured by real business impact, not technical output.",
  },
]

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function FadeInUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function HowWeWorkPage() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-step-index"))
            if (!isNaN(index)) setActiveStep(index)
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    )

    const els = document.querySelectorAll("[data-step-index]")
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ─── PROGRESS INDICATOR ─── */}
      <div className="fixed left-0 top-0 h-1 bg-accent z-50 transition-all duration-300"
        style={{ width: `${((activeStep + 1) / methodSteps.length) * 100}%` }}
      />

      {/* ─── HERO ─── */}
      <Section size="hero" className="bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-6"
          >
            How We Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
          >
            Every successful AI implementation
            <br />
            <span className="text-accent">starts with understanding your business.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            We do not sell generic automations. We uncover opportunities, design intelligent systems, and build
            solutions that create measurable business outcomes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link href="/book">
              <Button variant="primary" size="xl" className="w-full sm:w-auto">
                Book a Free Business Intelligence Audit
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </Link>
            <a href="#method">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                See Our Process
              </Button>
            </a>
          </motion.div>
        </div>
      </Section>

      {/* ─── OUR PHILOSOPHY ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <Badge variant="accent" className="mb-4 sm:mb-5">
                  Our Philosophy
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5 sm:mb-6">
                  Technology is easy.
                  <br />
                  <span className="text-accent">Understanding your business isn&apos;t.</span>
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>
                    Most agencies start with software. They walk in with a pre-packaged solution and spend the
                    engagement retrofitting it to fit your reality.
                  </p>
                  <p>
                    We start with questions. We study how your business operates, identify what is broken, and
                    design the ideal workflow before choosing any technology.
                  </p>
                  <p>
                    Because the right AI solution depends entirely on your people, workflows, customers, and
                    goals. Not on our product catalog.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    <Lightbulb className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug italic">
                    &ldquo;We do not automate tasks.
                    <br />
                    We redesign how businesses operate.&rdquo;
                  </p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm font-semibold">— Understand First. Recommend Second. Build Third.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── THE AWOKEN METHOD ─── */}
      <div id="method">
        <Section className="bg-background">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-14">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
                Process
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                The Awoken Method
              </h2>
              <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A proven five-step process that ensures every solution is grounded in real business understanding.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {methodSteps.map((step, i) => (
              <FadeInUp key={step.step} delay={i * 0.1}>
                <div
                  data-step-index={i}
                  className="group relative rounded-2xl border border-border bg-background-alt p-6 sm:p-8 h-full flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/20"
                >
                  <span className="text-5xl sm:text-6xl font-black text-muted-foreground/[0.06] select-none leading-none mb-2">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">{step.title}</h3>
                  <ul className="space-y-2">
                    {step.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {i < methodSteps.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="h-5 w-5 text-accent/40" />
                    </div>
                  )}
                </div>
              </FadeInUp>
            ))}
          </div>
          <FadeInUp delay={0.3}>
            <div className="flex justify-center mt-8 sm:mt-10">
              <a href="#what-you-receive">
                <Button variant="outline" size="lg">
                  See What You Receive
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </FadeInUp>
        </div>
      </Section>
      </div>

      {/* ─── WHAT YOU RECEIVE ─── */}
      <div id="what-you-receive">
        <Section className="bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-14">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
                Deliverables
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                What You Receive
              </h2>
              <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {deliverables.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.05}>
                <Card hover className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold">{item.title}</h3>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Section>
      </div>

      {/* ─── WHAT MAKES OUR PROCESS DIFFERENT ─── */}
      <Section className="bg-background">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-14">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
                Comparison
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                What Makes Our Process Different
              </h2>
              <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl border border-red-200 bg-red-50/50 p-8 sm:p-10">
                <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-3">
                  <X className="h-5 w-5 text-red-500" />
                  Traditional Agencies
                </h3>
                <ul className="space-y-4">
                  {comparisonData.traditional.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                      <X className="h-4 w-4 text-red-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 sm:p-10">
                <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  Awoken
                </h3>
                <ul className="space-y-4">
                  {comparisonData.awoken.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-foreground font-medium">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Section>

      {/* ─── TIMELINE ─── */}
      <Section className="bg-background-alt">
        <AnimatedSection>
          <div className="text-center mb-14 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Our Client Journey
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              From Discovery to Measurable Results
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every engagement follows a structured framework designed to understand your business first, build the right solution second, and continuously optimize for long-term growth.
            </p>
          </div>
        </AnimatedSection>

        {/* ─── DESKTOP: HORIZONTAL ─── */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute top-[13px] left-0 right-0 h-[2px] bg-gradient-to-r from-accent/5 via-accent/25 to-accent/5 rounded-full" />
            <div className="grid grid-cols-6 gap-4">
              {timelineSteps.map((step, i) => {
                const Icon = step.icon as React.ElementType
                return (
                  <FadeInUp key={step.num} delay={i * 0.1}>
                    <div className="group flex flex-col items-center">
                      <div className="relative z-10 w-[26px] h-[26px] rounded-full bg-background-alt border-2 border-accent/30 flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_10px_rgba(249,115,22,0.25)]">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <div className="rounded-xl border border-border bg-background p-5 w-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-accent/20">
                        <span className="text-[11px] font-bold text-accent/50 mb-1 block">{step.num}</span>
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                          <Icon className="h-4 w-4 text-accent" />
                        </div>
                        <h3 className="text-sm font-bold leading-snug mb-1">{step.title}</h3>
                        <span className="text-[11px] font-medium text-accent block mb-2.5">{step.period}</span>
                        <ul className="space-y-1">
                          {step.items.map((item) => (
                            <li key={item} className="text-[11px] text-muted-foreground leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FadeInUp>
                )
              })}
            </div>
          </div>
        </div>

        {/* ─── TABLET: 3x2 GRID ─── */}
        <div className="hidden md:block lg:hidden max-w-3xl mx-auto">
          <div className="relative">
            <div className="grid grid-cols-3 gap-5">
              {timelineSteps.map((step, i) => {
                const Icon = step.icon as React.ElementType
                return (
                  <FadeInUp key={step.num} delay={i * 0.08}>
                    <div className="group rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-accent/20">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold text-accent/50">{step.num}</span>
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon className="h-3.5 w-3.5 text-accent" />
                        </div>
                      </div>
                      <h3 className="text-sm font-bold mb-0.5">{step.title}</h3>
                      <span className="text-[10px] font-medium text-accent block mb-2.5">{step.period}</span>
                      <ul className="space-y-1">
                        {step.items.map((item) => (
                          <li key={item} className="text-xs text-muted-foreground leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </FadeInUp>
                )
              })}
            </div>
          </div>
        </div>

        {/* ─── MOBILE: VERTICAL ─── */}
        <div className="md:hidden max-w-lg mx-auto">
          <div className="relative">
            {timelineSteps.map((step, i) => {
              const Icon = step.icon as React.ElementType
              return (
                <FadeInUp key={step.num} delay={i * 0.1}>
                  <div className="relative pl-14 pb-8 last:pb-0">
                    {i < timelineSteps.length - 1 && (
                      <div className="absolute left-[22px] top-10 bottom-0 w-px bg-gradient-to-b from-accent/30 to-accent/5" />
                    )}
                    <div className="absolute left-0 top-0">
                      <div className="relative z-10 w-[44px] h-[44px] rounded-full bg-background-alt border-2 border-accent/30 flex items-center justify-center transition-all duration-300">
                        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-background p-4 transition-all duration-300 hover:shadow-md hover:border-accent/20">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="text-[10px] font-bold text-accent/50">{step.num}</span>
                        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <Icon className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <h3 className="text-sm font-bold">{step.title}</h3>
                      </div>
                      <span className="text-[10px] font-medium text-accent block mb-2">{step.period}</span>
                      <ul className="space-y-1">
                        {step.items.map((item) => (
                          <li key={item} className="text-xs text-muted-foreground leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeInUp>
              )
            })}
          </div>
        </div>

        {/* ─── NOTE ─── */}
        <FadeInUp delay={0.3}>
          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 text-center">
            <div className="rounded-xl border border-border bg-background p-6 sm:p-8">
              <p className="text-base sm:text-lg font-semibold mb-2">Every business is unique.</p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Some projects take only a few weeks, while enterprise implementations may span several months.
                Our roadmap is always tailored to your business goals and technical complexity.
              </p>
            </div>
          </div>
        </FadeInUp>
      </Section>

      {/* ─── FAQ ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </AnimatedSection>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ─── CLIENT COMMITMENT ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-12">
              <Badge variant="accent" className="mb-4 sm:mb-5">
                Partnership
              </Badge>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-5 sm:mb-6">
                    What We Expect from Our Clients
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                    Great results require great partnerships. Here is what we ask of every client.
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    {clientExpectations.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-sm sm:text-base font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-background-alt border border-border p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">Our Commitment to You</h3>
                  <div className="space-y-4">
                    {commitments.map((item) => {
                      const IconComponent = item.icon as React.ElementType
                      return (
                        <div key={item.title} className="flex items-start gap-3 sm:gap-4">
                          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                            <IconComponent className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── OUR COMMITMENT CARDS ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Values
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Built on Trust
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {commitments.map((item, i) => {
            const IconComponent = item.icon as React.ElementType
            return (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <Card hover>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <IconComponent className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2">{item.title}</h3>
                  <CardBody>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardBody>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <Section className="bg-background-alt">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-14">
              <Badge variant="accent" className="mb-4 sm:mb-5">
                Get Started
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-5 leading-tight">
                Let&apos;s discover what&apos;s holding your business back.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
                Every successful project starts with a conversation — not a sales pitch.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/book">
                  <Button variant="primary" size="xl" className="w-full sm:w-auto">
                    Book Free Business Intelligence Audit
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Talk to Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </>
  )
}
