"use client"

import Cal from "@calcom/embed-react"
import { Container } from "@/components/shared/container"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardHeader, CardBody } from "@/components/shared/card"
import { Button } from "@/components/ui/button"
import { config } from "@/lib/config"
import {
  Search,
  ClipboardList,
  Target,
  Map,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Mail,
  HelpCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const steps = [
  {
    icon: Search,
    title: "Understand Your Operations",
    description: "We learn about your industry, team size, current tools, and revenue goals.",
  },
  {
    icon: ClipboardList,
    title: "Review Current Workflows",
    description: "We map your existing processes to identify inefficiencies and bottlenecks.",
  },
  {
    icon: Target,
    title: "Identify Improvement Opportunities",
    description: "We pinpoint specific areas where AI can create the biggest impact.",
  },
  {
    icon: Map,
    title: "Build an Implementation Roadmap",
    description: "We outline a clear plan for deploying solutions that deliver measurable results.",
  },
]

const criteria = [
  {
    title: "10\u2013100 Employees",
    description: "Growing teams that need scalable systems",
  },
  {
    title: "100+ Leads/Month",
    description: "High volume businesses losing opportunities",
  },
  {
    title: "Already Using a CRM",
    description: "Ready to automate existing workflows",
  },
  {
    title: "Repetitive Work",
    description: "Teams spending too much time on manual tasks",
  },
]

const preparations = [
  {
    icon: HelpCircle,
    title: "Current Workflow",
    description: "A brief overview of how your business operates",
  },
  {
    icon: HelpCircle,
    title: "CRM Information",
    description: "Details about your customer management system",
  },
  {
    icon: HelpCircle,
    title: "Lead Sources",
    description: "Where your leads come from",
  },
  {
    icon: HelpCircle,
    title: "Biggest Challenge",
    description: "The #1 problem you want to solve",
  },
]

const faqs = [
  {
    question: "How long is the meeting?",
    answer:
      "30 minutes. Enough to understand your business and identify key opportunities.",
  },
  {
    question: "Do I need technical knowledge?",
    answer: "No technical knowledge is required.",
  },
  {
    question: "Will I receive a proposal?",
    answer: "Yes, a customized proposal after the call.",
  },
  {
    question: "Can you integrate with my existing tools?",
    answer: "We work with your existing stack.",
  },
  {
    question: "Is there any obligation?",
    answer: "None at all. The call is completely free.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BookPage() {
  return (
    <>
      <Section size="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Book a Free Business Intelligence Audit
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-[700px]">
            In 30 minutes we&apos;ll understand your business, identify
            operational bottlenecks, and show where improvements can create the
            biggest impact.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="xl" asChild>
              <a href="#book">
                Book a Free Business Intelligence Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          title="What Happens During the Call"
          description="Here&apos;s exactly how we&apos;ll spend our 30 minutes together."
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div key={step.title} variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <h3 className="text-2xl font-semibold mb-5">
                      {step.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      <Section>
        <SectionHeader title="Who This Is For" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {criteria.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                </CardHeader>
                <CardBody>
                  <h3 className="text-2xl font-semibold mb-5">
                    {item.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader title="What to Prepare" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
        >
          {preparations.map((item) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title} variants={itemVariants}>
                <Card hover={false}>
                  <CardHeader>
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <h3 className="text-2xl font-semibold mb-5">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      <section id="book" className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <SectionHeader
            title="Schedule Your Audit"
            description="Pick a time that works for you."
          />
          <div className="rounded-2xl border border-border shadow-sm overflow-hidden mx-auto max-w-5xl min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
            <Cal
              calLink={config.calLink}
              style={{ width: "100%", height: "100%", minHeight: "500px" }}
              config={{ layout: "month_view" }}
            />
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <SectionHeader title="Frequently Asked Questions" />
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <details className="group rounded-xl border border-border [&:not(:last-child)]:mb-4">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-lg font-semibold list-none">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <div className="p-6 pt-0 text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Need help before booking?
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Contact us at{" "}
              <a
                href="mailto:team.awoken.in@gmail.com"
                className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors"
              >
                team.awoken.in@gmail.com
              </a>
            </p>
            <div className="mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
