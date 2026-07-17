"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Container } from "@/components/shared/container"
import { Card, CardBody, CardFooter } from "@/components/shared/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  Search,
  ClipboardList,
  FileText,
  Rocket,
  RefreshCw,
  Check,
  BarChart3,
  Building2,
  HeadphonesIcon,
  Users,
  Zap,
  Layers,
  Bot,
  Globe,
  Shield,
  GraduationCap,
  Infinity,
} from "lucide-react"

const processSteps = [
  {
    icon: Search,
    title: "Business Intelligence Audit",
    description: "We understand your business, identify bottlenecks, and uncover opportunities.",
  },
  {
    icon: ClipboardList,
    title: "Strategy & Roadmap",
    description: "You receive a clear implementation roadmap with recommendations.",
  },
  {
    icon: FileText,
    title: "Custom Proposal",
    description: "A transparent proposal tailored to your business.",
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "We build, test, deploy, and monitor your AI systems.",
  },
  {
    icon: RefreshCw,
    title: "Optimization",
    description: "Continuous improvements based on data and performance.",
  },
]

const auditFeatures = [
  "30–45 minute strategy session",
  "Business bottleneck analysis",
  "Revenue opportunity assessment",
  "AI readiness evaluation",
  "Workflow recommendations",
  "Next-step roadmap",
]

const implementationFeatures = [
  "AI Workflow Automation",
  "Business Intelligence Dashboard",
  "CRM Integrations",
  "Lead Qualification Systems",
  "AI Assistants",
  "Internal Automations",
  "Reporting",
]

const enterpriseFeatures = [
  "Multi-location deployment",
  "Dedicated implementation",
  "Custom AI solutions",
  "API integrations",
  "Priority support",
  "Team training",
]

const comparisonData = [
  {
    title: "Free Audit",
    features: [
      "30–45 minute strategy session",
      "Business bottleneck analysis",
      "Revenue opportunity assessment",
      "AI readiness evaluation",
      "Workflow recommendations",
      "Next-step roadmap",
    ],
    cta: "Book Free Audit",
    href: "/book",
  },
  {
    title: "Implementation",
    features: [
      "AI Workflow Automation",
      "Business Intelligence Dashboard",
      "CRM Integrations",
      "Lead Qualification Systems",
      "AI Assistants",
      "Internal Automations",
      "Reporting & Analytics",
    ],
    cta: "Request Proposal",
    href: "/book",
  },
  {
    title: "Enterprise",
    features: [
      "Multi-location deployment",
      "Dedicated implementation team",
      "Custom AI solutions",
      "API integrations",
      "Priority support",
      "Team training",
      "Custom SLAs",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
]

const faqItems = [
  {
    question: "Why isn't pricing fixed?",
    answer:
      "Every business operates differently. Your systems, team size, workflows, and growth stage are unique to you. We believe in building solutions that fit your specific needs — not forcing your business into a pre-packaged plan. That's why every engagement starts with a Business Intelligence Audit to understand exactly what you need before we quote.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Timelines depend on scope. A single workflow automation can be deployed in 2-3 weeks. Complex multi-system integrations typically take 4-8 weeks. During your audit, we'll give you a clear timeline based on your specific needs and priorities.",
  },
  {
    question: "Who is this for?",
    answer:
      "We work with business owners, operators, and leadership teams who know their business could be running more efficiently but aren't sure where to start. If you're losing leads, stuck in manual processes, or feel like your team is spending too much time on repetitive work — we can help.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes. We work with businesses of all sizes, from small teams to multi-location operations. Our Business Intelligence Audit is designed to be accessible for any business serious about improving operations. We'll recommend solutions proportional to your size and budget.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across service-based industries including home services, healthcare, professional services, real estate, retail, and hospitality. Our methodology adapts to your specific operational context. If you have systems, workflows, and customers — we can help optimize them.",
  },
  {
    question: "What happens after the audit?",
    answer:
      "After the audit, you'll receive a detailed report identifying bottlenecks, revenue opportunities, and recommended improvements. If there's a clear path forward, we'll provide a transparent proposal with scope, timeline, and investment. There is no obligation to move forward.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. Every implementation includes a support and optimization phase. We monitor performance, make adjustments, and ensure your systems continue delivering results. For larger engagements, we offer dedicated support agreements with guaranteed response times.",
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

export default function PricingPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-6"
          >
            Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Pricing built around your business&mdash;not generic packages.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Every business has different systems, bottlenecks, and growth opportunities. We start by understanding your business before recommending the right AI solution.
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
            <Link href="/contact">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Talk to Our Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ─── WHY NO FIXED PRICING ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-12">
              <Badge variant="accent" className="mb-5 sm:mb-6">
                Our Philosophy
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-5 sm:mb-6">
                Why We Don&apos;t Have Fixed Pricing
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                Unlike software subscriptions, every implementation is different.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                {[
                  "Business size",
                  "Current systems",
                  "AI complexity",
                  "Number of workflows",
                  "Integrations",
                  "Team size",
                  "Implementation scope",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-6 sm:pt-8">
                <p className="text-base sm:text-lg font-medium text-foreground italic leading-relaxed">
                  &ldquo;We believe businesses should only pay for what actually creates value.&rdquo;
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── ENGAGEMENT PROCESS ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Our Engagement Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              From audit to optimization.
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </AnimatedSection>
        <div className="max-w-3xl mx-auto">
          {processSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1}>
              <div className="relative pl-12 sm:pl-16 pb-8 sm:pb-12 last:pb-0">
                {i < processSteps.length - 1 && (
                  <div className="absolute left-[19px] sm:left-[23px] top-[44px] bottom-0 w-px bg-border" />
                )}
                <div className="absolute left-0 top-0 sm:left-1 sm:top-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                    <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ─── FREE BUSINESS INTELLIGENCE AUDIT ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border-2 border-accent/30 bg-background p-8 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-bl-full -z-0" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <Badge variant="accent" className="text-xs sm:text-sm">
                    Free
                  </Badge>
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    No obligation. No credit card.
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-5 sm:mb-6">
                  Free Business Intelligence Audit
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                  {auditFeatures.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <div>
                    <p className="text-3xl sm:text-4xl font-black text-accent">FREE</p>
                    <p className="text-sm text-muted-foreground mt-1">No commitment required</p>
                  </div>
                  <div className="sm:ml-auto">
                    <Link href="/book">
                      <Button variant="primary" size="xl">
                        Book Free Audit
                        <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── IMPLEMENTATION ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Implementation
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Built for your business.
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every solution is custom-built for your specific needs. No two implementations are the same.
            </p>
          </div>
        </AnimatedSection>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {implementationFeatures.map((feature) => (
              <AnimatedSection key={feature}>
                <div className="rounded-xl border border-border bg-background-alt p-5 sm:p-6 flex items-start gap-3 h-full">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium">{feature}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.2}>
            <div className="mt-8 sm:mt-10 text-center">
              <div className="rounded-xl border border-border bg-background-alt p-6 sm:p-8 max-w-lg mx-auto">
                <p className="text-lg sm:text-xl font-semibold mb-2">Custom Quote</p>
                <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
                  Every implementation is scoped based on your specific requirements.
                </p>
                <Link href="/book">
                  <Button variant="primary" size="lg">
                    Request Proposal
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── ENTERPRISE ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-accent" />
                    </div>
                    <Badge variant="accent">Enterprise</Badge>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-5">
                    For larger organizations
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                    Enterprise-grade AI implementation for organizations with complex operations, multiple locations, or custom integration requirements.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                    {enterpriseFeatures.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <Link href="/contact">
                    <Button variant="primary" size="xl">
                      Contact Sales
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── COMPARISON ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Compare
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Choose the right engagement.
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {comparisonData.map((col, i) => (
            <AnimatedSection key={col.title} delay={i * 0.1}>
              <Card hover={true}>
                <div className="mb-4 sm:mb-5">
                  <h3 className="text-xl sm:text-2xl font-bold">{col.title}</h3>
                </div>
                <CardBody>
                  <ul className="space-y-3 sm:space-y-4">
                    {col.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter>
                  <Link href={col.href}>
                    <Button
                      variant={i === 0 ? "primary" : "outline"}
                      size="md"
                      className="w-full"
                    >
                      {col.cta}
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section className="bg-background-alt">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Common Questions
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </AnimatedSection>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-background-alt p-8 sm:p-10 lg:p-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-5">
                Let&apos;s discover what&apos;s holding your business back.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
                Every successful implementation starts with understanding your business.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/book">
                  <Button variant="primary" size="xl" className="w-full sm:w-auto">
                    Book Your Free Business Intelligence Audit
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Schedule a Discovery Call
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
