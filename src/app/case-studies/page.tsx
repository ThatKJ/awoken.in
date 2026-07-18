"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody, CardFooter } from "@/components/shared/card"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { ProcessFlow } from "@/components/visuals/process-flow"
import { MetricsBar } from "@/components/visuals/metrics-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion"
import {
  ArrowRight, Search, ClipboardList, Rocket, BarChart3, CheckCircle, Lightbulb, FileText,
  Building2, Stethoscope, Briefcase, Dumbbell, ShoppingCart, Landmark, HeartPulse,
} from "lucide-react"

const comingSoonCards = [
  {
    number: "01", title: "Case Study #1", status: "Pilot", variant: "accent" as const,
    description: "Currently accepting pilot clients. Real transformation, documented transparently.",
    expected: "Industry → Challenges → Solution → Results",
  },
  {
    number: "02", title: "Case Study #2", status: "Coming Soon", variant: "secondary" as const,
    description: "Every business teaches us something new. This could be yours.",
  },
  {
    number: "03", title: "Case Study #3", status: "Coming Soon", variant: "secondary" as const,
    description: "We are documenting real transformations as they happen.",
  },
]

const industries = [
  { icon: Building2, name: "Real Estate" },
  { icon: Stethoscope, name: "Healthcare" },
  { icon: HeartPulse, name: "Dental" },
  { icon: Briefcase, name: "Professional Services" },
  { icon: Dumbbell, name: "Fitness" },
  { icon: ShoppingCart, name: "Retail" },
  { icon: Landmark, name: "Financial Services" },
]

const faqItems = [
  {
    question: "How are case studies created?",
    answer: "After we complete an engagement, we draft a case study documenting initial challenges, audit findings, strategy, implementation, and outcomes. You review and approve every word before publication.",
  },
  {
    question: "Will my business information remain confidential?",
    answer: "Absolutely. You choose what information is shared. Many businesses choose to be featured by name. Others prefer anonymity.",
  },
  {
    question: "How do I become a case study?",
    answer: "Every client engagement has potential. Mention it during your free audit and we can structure the engagement with documentation in mind.",
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

export default function CaseStudiesPage() {
  return (
    <>
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-accent text-base font-bold tracking-wide uppercase mb-4 sm:mb-6"
          >
            Case Studies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Real Business Transformations.
            <br />
            <span className="text-accent">Documented Transparently.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Every business we work with teaches us something new. As we help companies identify bottlenecks and implement AI systems, we document the journey here.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book Free Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl">
                Become a Case Study
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <MetricsBar
          variant="bordered"
          columns={3}
          metrics={[
            { value: "100%", label: "Client-approved before publish", icon: CheckCircle },
            { value: "Real", label: "Data, not marketing claims", icon: BarChart3 },
            { value: "Transparent", label: "Challenges included", icon: Lightbulb },
          ]}
        />
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="Structure"
          title="What every case study includes."
          description="Full transparency from challenge to outcome."
        />
        <div className="max-w-4xl mx-auto">
          <ProcessFlow
            variant="cards"
            steps={[
              { icon: Building2, label: "Business Overview", description: "Company and goals" },
              { icon: Search, label: "Problems", description: "Bottlenecks and leaks" },
              { icon: Rocket, label: "Implementation", description: "AI systems built" },
              { icon: BarChart3, label: "Results", description: "Measured outcomes" },
            ]}
          />
        </div>
      </Section>

      <Section className="bg-background-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <DashboardMockup
            title="Impact Tracker"
            subtitle="Case study metrics dashboard"
            chart="line"
            metrics={[
              { label: "Bottlenecks Found", value: "12", change: "Per client" },
              { label: "Revenue Impact", value: "₹18-42L", change: "Annual", positive: true },
              { label: "Time Saved/Week", value: "22 hrs", change: "+35%", positive: true },
              { label: "Implementation", value: "4-8 wks", change: "Typical" },
            ]}
            rows={[
              { label: "Discovery completed", value: "Week 1", status: "success" },
              { label: "Audit delivered", value: "Week 2", status: "success" },
              { label: "AI systems deployed", value: "Week 4-8", status: "success" },
              { label: "Results validated", value: "Month 3", status: "success" },
            ]}
          />
          <div>
            <SectionHeader
              align="left"
              eyebrow="Coming Soon"
              title="We are building our first case studies now."
              description="Instead of making promises, we document results. Our first published transformations are coming."
            />
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              We are an early-stage company building our reputation through real work. Want to be one of our first documented success stories?
            </p>
            <div className="mt-6">
              <Link href="/book">
                <Button variant="primary">
                  Apply for Pilot Program
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="Upcoming"
          title="Case studies being created now."
          description="Real transformations documented as they happen."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {comingSoonCards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.08}>
              <Card hover={i === 0}>
                <div className="mb-3">
                  <span className="text-4xl font-black text-muted-foreground/10 select-none">{card.number}</span>
                </div>
                <Badge variant={card.variant} className="mb-3">{card.status}</Badge>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <CardBody>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                  {card.expected && (
                    <p className="text-xs text-accent/80 mt-2 font-medium">{card.expected}</p>
                  )}
                </CardBody>
                {i === 0 && (
                  <CardFooter>
                    <Link href="/book">
                      <Button variant="primary" size="md" className="w-full">
                        Apply for Pilot
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-background-alt">
        <SectionHeader
          eyebrow="Industries"
          title="Industries we work with."
          description="Our methodology adapts to any industry."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {industries.map((ind, i) => (
            <AnimatedSection key={ind.name} delay={i * 0.03}>
              <div className="rounded-xl border border-border bg-background p-4 flex flex-col items-center text-center gap-2 transition-all hover:border-accent/20 hover:-translate-y-1 hover:shadow-md">
                <ind.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{ind.name}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-background">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions about case studies."
        />
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm">{item.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Get Started"
            title="Let's build the next success story together."
            description="The best case study is the one we are about to create with your business."
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
