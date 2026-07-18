"use client"

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
  ClipboardList,
  FileText,
  Rocket,
  BarChart3,
  Building2,
  Stethoscope,
  Scale,
  Factory,
  GraduationCap,
  Hotel,
  Briefcase,
  Dumbbell,
  ShoppingCart,
  Landmark,
  HardHat,
  Wrench,
  Clock,
  CalendarCheck,
  Users,
  TrendingUp,
  Zap,
  Target,
  HeartPulse,
  Sparkles,
  CheckCircle,
  Lightbulb,
} from "lucide-react"

const studyStructure = [
  {
    icon: Building2,
    title: "Business Overview",
    description: "Understand the company and its goals.",
  },
  {
    icon: Search,
    title: "Problems Identified",
    description: "Operational bottlenecks and revenue leaks.",
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "AI systems, automations, integrations.",
  },
  {
    icon: BarChart3,
    title: "Measured Results",
    description: "KPIs, improvements, lessons learned.",
  },
]

const comingSoonCards = [
  {
    number: "01",
    title: "Case Study #1",
    status: "Pilot",
    statusVariant: "accent" as const,
    description: "Currently accepting pilot clients.",
    expected: "Industry. Challenges. Solution. Results.",
  },
  {
    number: "02",
    title: "Case Study #2",
    status: "Coming Soon",
    statusVariant: "secondary" as const,
    description: "Every business teaches us something new. This could be yours.",
    expected: null,
  },
  {
    number: "03",
    title: "Case Study #3",
    status: "Coming Soon",
    statusVariant: "secondary" as const,
    description: "We're documenting real transformations as they happen.",
    expected: null,
  },
]

const industries = [
  { icon: Stethoscope, name: "Healthcare" },
  { icon: Building2, name: "Real Estate" },
  { icon: HeartPulse, name: "Dental Clinics" },
  { icon: Scale, name: "Law Firms" },
  { icon: Factory, name: "Manufacturing" },
  { icon: GraduationCap, name: "Education" },
  { icon: Hotel, name: "Hospitality" },
  { icon: Briefcase, name: "Professional Services" },
  { icon: Dumbbell, name: "Fitness" },
  { icon: ShoppingCart, name: "Retail" },
  { icon: Landmark, name: "Financial Services" },
  { icon: HardHat, name: "Construction" },
  { icon: Wrench, name: "Home Services" },
]

const metrics = [
  {
    icon: Clock,
    title: "Lead Response Time",
    description: "How quickly your team follows up with new leads.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking Rate",
    description: "The percentage of leads that convert to booked appointments.",
  },
  {
    icon: Users,
    title: "Customer Retention",
    description: "How effectively you keep customers over time.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Recovery",
    description: "Lost revenue identified and reclaimed through better processes.",
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description: "Time and cost reductions from streamlined workflows.",
  },
  {
    icon: Target,
    title: "Time Saved",
    description: "Hours returned to your team by automating repetitive work.",
  },
  {
    icon: Sparkles,
    title: "Automation Coverage",
    description: "The percentage of manual tasks automated across your operations.",
  },
  {
    icon: HeartPulse,
    title: "Employee Productivity",
    description: "How AI tools empower your team to focus on high-value work.",
  },
]

const processSteps = [
  {
    icon: Lightbulb,
    title: "Discovery",
    description: "We learn your business inside and out.",
  },
  {
    icon: Search,
    title: "Business Intelligence Audit",
    description: "Identify bottlenecks and opportunities.",
  },
  {
    icon: ClipboardList,
    title: "Strategy",
    description: "Define the roadmap and expected outcomes.",
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "Build, test, and deploy the solution.",
  },
  {
    icon: BarChart3,
    title: "Optimization",
    description: "Monitor, measure, and refine.",
  },
  {
    icon: FileText,
    title: "Case Study Publication",
    description: "With your permission, document the transformation.",
  },
]

const faqItems = [
  {
    question: "How are case studies created?",
    answer:
      "Each case study is a collaborative effort. After we complete an engagement, we draft a detailed case study documenting the initial challenges, audit findings, strategy, implementation, and outcomes. You review and approve every word before publication. Nothing is published without your explicit consent.",
  },
  {
    question: "Will my business information remain confidential?",
    answer:
      "Absolutely. We take confidentiality seriously. You choose what information is shared. Many businesses choose to be featured by name. Others prefer anonymity. Either way, we respect your preference. All engagements start with a signed NDA and confidentiality agreement.",
  },
  {
    question: "Do you publish every project?",
    answer:
      "No. We only publish case studies when the client agrees it adds value. Some projects remain confidential by nature. Others may not have the scope or distinctiveness that makes for a useful case study. Quality matters more than quantity.",
  },
  {
    question: "Can we choose to stay anonymous?",
    answer:
      "Yes. If you prefer to remain anonymous, we can publish a case study that focuses on the challenges, solutions, and outcomes without revealing your company name, industry specifics, or identifiable details. The educational value remains while your privacy is protected.",
  },
  {
    question: "How do I become a case study?",
    answer:
      "Every client engagement has the potential to become a case study. After we complete a Business Intelligence Audit and subsequent implementation, we discuss whether a case study would be valuable. If you are interested in being one of Awoken's first documented success stories, mention it during your free audit and we can structure the engagement with documentation in mind.",
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

export default function CaseStudiesPage() {
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
            Case Studies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Real Business Transformations.
            <br />
            <span className="text-accent">Documented Transparently.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Every business we work with teaches us something new. As we help companies identify bottlenecks and
            implement AI systems, we will document the journey here.
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
                Become Our First Case Study
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ─── WHY WE PUBLISH CASE STUDIES ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-12">
              <Badge variant="accent" className="mb-5 sm:mb-6">
                Why We Publish
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-5 sm:mb-6 leading-tight">
                We believe businesses deserve transparency.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                Instead of making promises, we would rather demonstrate results. Every published case study
                will document the complete journey from initial challenge to measurable outcome.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    icon: Search,
                    title: "Initial Challenges",
                    desc: "The real problems the business faced before we started.",
                  },
                  {
                    icon: ClipboardList,
                    title: "Business Audit",
                    desc: "What we discovered during the Business Intelligence Audit.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Strategy",
                    desc: "The approach we designed based on the audit findings.",
                  },
                  {
                    icon: Rocket,
                    title: "AI Implementation",
                    desc: "What we built, how we built it, and why.",
                  },
                  {
                    icon: BarChart3,
                    title: "Outcomes",
                    desc: "Measurable improvements and business impact.",
                  },
                  {
                    icon: FileText,
                    title: "Lessons Learned",
                    desc: "Honest takeaways — including what did not go as planned.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background-alt border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── WHAT EVERY CASE STUDY INCLUDES ─── */}
      <Section className="bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-14">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
                Structure
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                What Every Case Study Includes
              </h2>
              <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
            </div>
          </AnimatedSection>
          <div className="relative">
            {studyStructure.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.15}>
                <div className="relative flex flex-col items-center">
                  <div className="rounded-2xl border border-border bg-background-alt p-6 sm:p-8 lg:p-10 w-full max-w-2xl mx-auto text-center">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {i < studyStructure.length - 1 && (
                    <div className="py-3 sm:py-4">
                      <ArrowDown className="h-5 w-5 text-accent/50" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── COMING SOON ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-14">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
                Case Studies
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Coming Soon
              </h2>
              <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We are an early-stage company building our reputation through real work, not marketing claims.
                Our first case studies are being created now.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {comingSoonCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.1}>
                <Card hover={i === 0}>
                  <div className="mb-4 sm:mb-5">
                    <span className="text-4xl sm:text-5xl font-black text-muted-foreground/10 select-none">
                      {card.number}
                    </span>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <Badge variant={card.statusVariant}>{card.status}</Badge>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{card.title}</h3>
                  <CardBody>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                      {card.description}
                    </p>
                    {card.expected && (
                      <p className="text-xs sm:text-sm font-medium text-accent/80">
                        Expected format: {card.expected}
                      </p>
                    )}
                  </CardBody>
                  {i === 0 && (
                    <div className="mt-auto pt-4">
                      <Link href="/book">
                        <Button variant="primary" size="md" className="w-full">
                          Apply for Pilot
                          <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── INDUSTRIES ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Industries
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Industries We Plan To Work With
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our methodology adapts to any industry with systems, workflows, and customers.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {industries.map((industry, i) => (
            <AnimatedSection key={industry.name} delay={i * 0.03}>
              <div className="rounded-xl border border-border bg-background-alt p-4 sm:p-5 flex flex-col items-center text-center gap-2 sm:gap-3 transition-all duration-200 hover:border-accent/20 hover:-translate-y-1 hover:shadow-md">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <industry.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm sm:text-base font-medium">{industry.name}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ─── WHAT SUCCESS LOOKS LIKE ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-14">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
                Success Metrics
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                What Success Looks Like
              </h2>
              <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                These are the metrics we track and improve for every client. Specific numbers depend on
                your business and will be documented in each case study.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((metric, i) => (
              <AnimatedSection key={metric.title} delay={i * 0.05}>
                <Card hover={false} className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{metric.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PILOT PROGRAM ─── */}
      <Section className="bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border-2 border-accent/30 bg-background p-8 sm:p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-bl-full -z-0" />
              <div className="relative z-10">
                <Badge variant="accent" className="mb-4 sm:mb-5">
                  Pilot Program
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-5 leading-tight">
                  Become One of Our First Success Stories
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6 sm:mb-8">
                  We are partnering with a limited number of businesses to build intelligent AI systems while
                  documenting the transformation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                  {[
                    "Business Intelligence Audit",
                    "Strategy Roadmap",
                    "AI Implementation",
                    "Dedicated Support",
                    "Opportunity to be featured as an Awoken Case Study",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link href="/book">
                    <Button variant="primary" size="xl">
                      Apply for Pilot Program
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="xl">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── OUR PROCESS ─── */}
      <Section className="bg-background-alt">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              From Discovery to Publication
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </AnimatedSection>
        <div className="max-w-3xl mx-auto">
          {processSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1}>
              <div className="relative pl-14 sm:pl-16 pb-8 sm:pb-12 last:pb-0">
                {i < processSteps.length - 1 && (
                  <div className="absolute left-[23px] sm:left-[27px] top-[48px] bottom-0 w-px bg-border" />
                )}
                <div className="absolute left-0 top-0 sm:top-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
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

      {/* ─── FAQ ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Questions About Case Studies
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

      {/* ─── FINAL CTA ─── */}
      <Section className="bg-background-alt">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-14">
              <Badge variant="accent" className="mb-4 sm:mb-5">
                Get Started
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-5 leading-tight">
                Let&apos;s Build the Next Success Story Together.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
                The best case study is the one we are about to create with your business.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/book">
                  <Button variant="primary" size="xl" className="w-full sm:w-auto">
                    Book Free Audit
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
