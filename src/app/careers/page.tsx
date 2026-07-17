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
  Sparkles,
  Lightbulb,
  Target,
  HeartHandshake,
  Search,
  Zap,
  Layers,
  MessageCircle,
  Code,
  Bot,
  Palette,
  TrendingUp,
  Briefcase,
  ClipboardList,
  Check,
  Globe,
  BookOpen,
  Monitor,
  Star,
  Unlock,
  Users,
  ChevronDown,
} from "lucide-react"

const whyCards = [
  {
    icon: Star,
    title: "Ownership",
    description: "You'll work on real products, solve meaningful problems, and make decisions that matter.",
  },
  {
    icon: Lightbulb,
    title: "Learning",
    description: "Move fast, experiment often, and continuously grow your technical and business skills.",
  },
  {
    icon: Target,
    title: "Impact",
    description: "Everything you build directly helps businesses become smarter and more efficient.",
  },
  {
    icon: HeartHandshake,
    title: "Culture",
    description: "We value curiosity, honesty, execution, and long-term thinking over titles.",
  },
]

const values = [
  { title: "Curiosity", description: "Question everything.", icon: Search },
  { title: "Ownership", description: "Take responsibility.", icon: Star },
  { title: "Craft", description: "Build products people love.", icon: Sparkles },
  { title: "Transparency", description: "Communicate openly.", icon: MessageCircle },
  { title: "Execution", description: "Ideas matter only when shipped.", icon: Zap },
  { title: "Long-Term Thinking", description: "Build for years, not weeks.", icon: Layers },
]

const roles = [
  {
    icon: Code,
    title: "Software Engineers",
    description: "Build the systems that power business intelligence and AI automation at scale.",
    mindset: "You care about clean architecture, user impact, and shipping fast.",
    skills: "TypeScript, Python, Next.js, Postgres, cloud infrastructure, API design.",
  },
  {
    icon: Bot,
    title: "AI Engineers",
    description: "Design and deploy AI systems that solve real business problems.",
    mindset: "You think in systems, not models. You measure success by outcomes, not benchmarks.",
    skills: "LLMs, RAG, prompt engineering, vector databases, Python, ML pipeline experience.",
  },
  {
    icon: Palette,
    title: "Product Designers",
    description: "Create intuitive, premium experiences that make complex data feel simple.",
    mindset: "You obsess over craft, detail, and how the user feels at every step.",
    skills: "Figma, design systems, prototyping, motion design, user research.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Marketing",
    description: "Tell Awoken's story and bring our mission to businesses that need it.",
    mindset: "You're data-driven, creative, and understand how to build branded content that converts.",
    skills: "Content strategy, SEO, paid acquisition, analytics, CRM tools.",
  },
  {
    icon: Briefcase,
    title: "Business Strategy",
    description: "Work directly with founders to shape product direction and operational strategy.",
    mindset: "You connect technology to business outcomes and thrive in ambiguity.",
    skills: "Consulting, financial modeling, operational analysis, stakeholder communication.",
  },
  {
    icon: ClipboardList,
    title: "Operations",
    description: "Keep the company running smoothly so the team can focus on building.",
    mindset: "You bring structure to chaos and take pride in making things work.",
    skills: "Process design, project management, tooling, communication, attention to detail.",
  },
]

const hiringProcess = [
  {
    step: "01",
    title: "Application",
    description: "Send us your portfolio, GitHub, or anything that shows how you think and build.",
  },
  {
    step: "02",
    title: "Introduction Call",
    description: "A 20-minute chat to learn about your work, interests, and what excites you.",
  },
  {
    step: "03",
    title: "Technical / Skill Discussion",
    description: "A deeper conversation about your craft, approach, and past work.",
  },
  {
    step: "04",
    title: "Build Together",
    description: "Work on a small real-world problem. No whiteboarding. No leetcode.",
  },
  {
    step: "05",
    title: "Offer",
    description: "If there's a mutual fit, we move fast. No drawn-out processes.",
  },
]

const perks = [
  { icon: Globe, title: "Flexible Work" },
  { icon: Star, title: "Ownership" },
  { icon: BookOpen, title: "Learning Budget" },
  { icon: Monitor, title: "Modern Tools" },
  { icon: Users, title: "Direct Founder Mentorship" },
  { icon: Zap, title: "Fast Growth" },
  { icon: Target, title: "Meaningful Work" },
  { icon: MessageCircle, title: "Open Communication" },
  { icon: Unlock, title: "Early-Stage Equity" },
]

const faqItems = [
  {
    question: "Do I need previous startup experience?",
    answer: "No. We care about curiosity, execution, and how you think. Past experience at a startup is a bonus, not a requirement. Some of our best hires came from larger organizations.",
  },
  {
    question: "Do you hire students?",
    answer: "Yes. We're open to interns and early-career candidates who show exceptional curiosity and drive. Send us what you've built — side projects, open source contributions, or experiments.",
  },
  {
    question: "Can I work remotely?",
    answer: "Yes. We're a remote-friendly team with flexible working hours. We communicate async-first and meet in person periodically for strategy and collaboration.",
  },
  {
    question: "How long does hiring take?",
    answer: "We aim to complete the entire process within 1-2 weeks from application to offer. We move fast for the right people.",
  },
  {
    question: "Can I apply even if there isn't an opening?",
    answer: "Absolutely. If you're excited about what we're building, we want to hear from you. Send your portfolio or a note about what you'd like to work on.",
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

export default function CareersPage() {
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
            Careers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Build the Future of AI-Powered Businesses.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            We&apos;re looking for curious builders, designers, engineers, and problem solvers who want to create products that genuinely help businesses grow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link href="#open-roles">
              <Button variant="primary" size="xl" className="w-full sm:w-auto">
                View Open Roles
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </Link>
            <a href="mailto:careers@awoken.in">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Tell Us About Yourself
              </Button>
            </a>
          </motion.div>
        </div>
      </Section>

      {/* ─── WHY AWOKEN ─── */}
      <Section className="bg-background-alt">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Why Awoken
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Why Build With Us?
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {whyCards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.1}>
              <Card>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 shrink-0 group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                  <card.icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground" />
                </div>
                <CardBody>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">{card.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{card.description}</p>
                </CardBody>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ─── VALUES ─── */}
      <Section className="bg-background">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Our Values
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              What We Believe In
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-background-alt p-6 sm:p-8 h-full hover:-translate-y-2 hover:shadow-xl hover:border-accent/20 transition-all duration-300 ease-out group/card">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                  <value.icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ─── LIFE AT AWOKEN ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-12">
              <Badge variant="accent" className="mb-5 sm:mb-6">Life at Awoken</Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6 sm:mb-8">
                Small team. Fast decisions. High ownership.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {[
                  {
                    title: "Small Team",
                    text: "We move fast because there's no bureaucracy. Every person has a direct impact on the product, the customers, and the company.",
                  },
                  {
                    title: "High Ownership",
                    text: "You won't be a cog in a machine. You'll own entire features, projects, and systems from idea to production.",
                  },
                  {
                    title: "Continuous Experimentation",
                    text: "We ship, learn, and iterate. Ideas are cheap — execution is everything. We encourage bold experiments.",
                  },
                  {
                    title: "Build in Public",
                    text: "We share what we learn. Writing, open source, and transparency are part of our DNA.",
                  },
                  {
                    title: "Founder Proximity",
                    text: "You'll work directly with the founding team. No layers of management between you and the people shaping the vision.",
                  },
                  {
                    title: "Customer-First",
                    text: "Every decision starts with the customer. We build solutions to real problems, not features for the sake of shipping.",
                  },
                ].map((item, i) => (
                  <div key={item.title} className="border-l-2 border-accent/30 pl-4 sm:pl-5">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
          </div>
        </FadeIn>
        </div>
      </Section>

      {/* ─── WHO WE'RE LOOKING FOR ─── */}
      <Section className="bg-background">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Who We Need
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Who We&apos;re Looking For
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {roles.map((role, i) => (
            <FadeIn key={role.title} delay={i * 0.08}>
              <Card>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 shrink-0 group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                  <role.icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{role.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">{role.description}</p>
                <CardBody>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Mindset</p>
                      <p className="text-sm text-muted-foreground">{role.mindset}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Skills</p>
                      <p className="text-sm text-muted-foreground">{role.skills}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ─── CURRENT OPENINGS ─── */}
      <Section className="bg-background-alt">
        <FadeIn>
          <div id="open-roles" className="scroll-mt-24 max-w-2xl mx-auto text-center">
            <Badge variant="accent" className="mb-4 sm:mb-5">Openings</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-5">
              Current Openings
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10">
              No open positions at the moment. However, we&apos;re always excited to meet exceptional people.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href="mailto:careers@awoken.in">
                <Button variant="primary" size="xl">
                  Send Your Portfolio
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ─── HIRING PROCESS ─── */}
      <Section className="bg-background">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Hiring Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              How We Hire
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </FadeIn>
        <div className="max-w-3xl mx-auto">
          {hiringProcess.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.1}>
              <div className="relative pl-14 sm:pl-16 pb-8 sm:pb-12 last:pb-0">
                {i < hiringProcess.length - 1 && (
                  <div className="absolute left-[19px] sm:left-[21px] top-[40px] bottom-0 w-px bg-border" />
                )}
                <div className="absolute left-0 top-0">
                  <div className="w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-full bg-accent/10 flex items-center justify-center text-sm sm:text-base font-bold text-accent">
                    {step.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ─── PERKS ─── */}
      <Section className="bg-background-alt">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              Perks
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              What You&apos;ll Get
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {perks.map((perk, i) => (
            <FadeIn key={perk.title} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-background p-4 sm:p-5 flex flex-col items-center text-center gap-3 h-full hover:-translate-y-1 hover:shadow-md hover:border-accent/20 transition-all duration-300 ease-out group/card">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                  <perk.icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent group-hover/card:text-accent-foreground" />
                </div>
                <span className="text-xs sm:text-sm font-medium">{perk.title}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section className="bg-background">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Common Questions
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </FadeIn>
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
      <Section className="bg-background-alt">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-5">
                Great companies are built by great people.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
                If you&apos;re excited about AI, product design, startups, and solving real business problems, we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <a href="mailto:careers@awoken.in">
                  <Button variant="primary" size="xl" className="w-full sm:w-auto">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </a>
                <a href="mailto:careers@awoken.in">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Email Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  )
}
