"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody, CardFooter } from "@/components/shared/card"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { MetricsBar } from "@/components/visuals/metrics-bar"
import { ActivityFeed } from "@/components/visuals/activity-feed"
import { ProcessFlow } from "@/components/visuals/process-flow"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion"
import {
  ArrowRight, Search, ClipboardCheck, Rocket, BarChart3, Check, Zap, Shield, Building2,
} from "lucide-react"

const plans = [
  {
    title: "Free Audit",
    description: "Understand your business and identify opportunities.",
    price: "Free",
    features: [
      "30-45 min strategy session",
      "Bottleneck analysis",
      "Revenue opportunity assessment",
      "AI readiness evaluation",
      "Next-step roadmap",
    ],
    cta: "Book Free Audit",
    href: "/book",
    highlighted: false,
  },
  {
    title: "Implementation",
    description: "Custom AI systems built for your business.",
    price: "Custom",
    badge: "Most Popular",
    features: [
      "AI workflow automation",
      "Business intelligence dashboard",
      "CRM integrations",
      "Lead qualification systems",
      "AI assistants",
      "Internal automations",
      "Reporting & analytics",
    ],
    cta: "Request Proposal",
    href: "/book",
    highlighted: true,
  },
  {
    title: "Enterprise",
    description: "Multi-location deployment with dedicated support.",
    price: "Custom",
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
    highlighted: false,
  },
]

const faqItems = [
  {
    question: "Why isn't pricing fixed?",
    answer: "Every business operates differently — your systems, team size, and workflows are unique. We build solutions that fit your specific needs rather than forcing your business into a pre-packaged plan. Every engagement starts with a Business Intelligence Audit to understand exactly what you need before we quote.",
  },
  {
    question: "How long does implementation take?",
    answer: "A single workflow can be deployed in 2-3 weeks. Complex multi-system integrations take 4-8 weeks. During your audit, we provide a clear timeline based on your specific needs.",
  },
  {
    question: "Who is this for?",
    answer: "Business owners and operators who know their business could run more efficiently but aren't sure where to start. If you're losing leads, stuck in manual processes, or spending too much time on repetitive work — we can help.",
  },
  {
    question: "What happens after the audit?",
    answer: "You receive a detailed report identifying bottlenecks, revenue opportunities, and recommended improvements. If there's a clear path forward, we provide a transparent proposal with scope, timeline, and investment. No obligation to proceed.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. Every implementation includes a support and optimization phase. We monitor performance, make adjustments, and ensure your systems continue delivering results.",
  },
]

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function PricingPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4 sm:mb-6"
          >
            Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Pricing built around your business — not&nbsp;generic&nbsp;packages.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            We start by understanding your business before recommending the right solution. Every engagement begins with a free diagnostic audit.
          </motion.p>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <MetricsBar
          variant="bordered"
          columns={3}
          metrics={[
            { value: "Free", label: "Business Intelligence Audit" },
            { value: "Custom", label: "Implementation pricing" },
            { value: "Transparent", label: "No hidden fees" },
          ]}
        />
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="Plans"
          title="Simple, transparent engagement models."
          description="Choose the path that fits your business."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.title} delay={i * 0.08}>
              <div className={cn(
                "rounded-2xl border p-6 sm:p-8 lg:p-10 flex flex-col h-full transition-all duration-300",
                plan.highlighted
                  ? "border-accent/30 bg-background shadow-premium relative"
                  : "border-border bg-background-alt"
              )}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent" className="text-xs px-3 py-1">{plan.badge}</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-black">{plan.price}</span>
                  {plan.price === "Free" && <span className="text-sm text-muted-foreground ml-2">No card needed</span>}
                </div>
                <CardBody>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter>
                  <Link href={plan.href} className="w-full block">
                    <Button variant={plan.highlighted ? "primary" : "outline"} size="md" className="w-full">
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-background-alt">
        <SectionHeader
          eyebrow="How It Works"
          title="From audit to optimization."
          description="A structured process that starts with understanding."
        />
        <div className="max-w-5xl mx-auto">
          <ProcessFlow
            variant="cards"
            steps={[
              { icon: Search, label: "Audit", description: "Free 30-min diagnostic" },
              { icon: ClipboardCheck, label: "Strategy", description: "Custom roadmap" },
              { icon: Rocket, label: "Build", description: "Deploy AI systems" },
              { icon: BarChart3, label: "Optimize", description: "Continuous improvement" },
            ]}
          />
        </div>
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions."
          description="Everything you need to know about pricing and engagement."
        />
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

      <Section className="bg-background-alt">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Get Started"
            title="Let's discover what's holding your business back."
            description="Every successful implementation starts with understanding your business."
          />
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book Free Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl">
                Talk to Our Team
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}
