"use client"

import { useState, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { ActivityFeed } from "@/components/visuals/activity-feed"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion"
import {
  ArrowRight, Search, SearchX, FileText, ClipboardCheck, Bot, CreditCard, Rocket, Shield, HeadphonesIcon,
} from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

type Category = "All" | "Getting Started" | "Business Intelligence Audit" | "AI Solutions" | "Pricing" | "Implementation" | "Security & Privacy" | "Support"

interface CategoryGroup {
  id: Category
  label: string
  icon: React.ElementType
  items: FAQItem[]
}

const categoryGroups: CategoryGroup[] = [
  {
    id: "Getting Started", label: "Getting Started", icon: FileText,
    items: [
      { question: "What does Awoken do?", answer: "Awoken helps businesses identify operational bottlenecks, recover lost revenue, and implement AI-powered systems that improve operations, lead management, and business performance. We are a Business Intelligence and AI consulting firm. We do not sell generic automation — we first understand your business, identify where technology can create the most value, and only then design a custom solution." },
      { question: "Who is Awoken for?", answer: "Awoken is for business owners, operators, and leadership teams who know their business could run more efficiently but are not sure where to start. If you are losing leads through the cracks, drowning in manual processes, or feel like your team spends too much time on repetitive work — we can help." },
      { question: "How do I get started?", answer: "Getting started is simple. Book a free Business Intelligence Audit through our website. We schedule a 30-45 minute strategy session to understand your business, identify opportunities, and outline a clear next step." },
    ],
  },
  {
    id: "Business Intelligence Audit", label: "BIA", icon: ClipboardCheck,
    items: [
      { question: "What is a Business Intelligence Audit?", answer: "A Business Intelligence Audit is a complimentary strategy session where we analyze your business operations to identify bottlenecks, uncover revenue opportunities, and assess your readiness for AI-powered improvements." },
      { question: "Is the audit really free?", answer: "Yes. The Business Intelligence Audit is completely free with no obligation. If we identify a clear opportunity to create value, we present a proposal. If not, we share actionable insights you can use independently." },
      { question: "What happens during the audit?", answer: "The audit is a structured 30-45 minute conversation. We review your current systems, workflows, team structure, and growth goals. We identify where time and revenue are being lost and pinpoint the highest-impact opportunities." },
    ],
  },
  {
    id: "AI Solutions", label: "AI Solutions", icon: Bot,
    items: [
      { question: "What kinds of AI systems do you build?", answer: "We build AI-powered solutions tailored to your specific business needs — workflow automations, lead qualification systems, Business Intelligence dashboards, AI assistants, CRM integrations, and internal process automations." },
      { question: "Can you integrate with our current software?", answer: "Yes. Integration with your existing tech stack is a core part of what we do. We design solutions that work with your current systems — Salesforce, HubSpot, Zoho, or custom CRMs." },
      { question: "Do we need technical knowledge?", answer: "Not at all. You are the expert on your business. We handle the technical implementation. Our process is collaborative without requiring technical expertise on your end." },
    ],
  },
  {
    id: "Pricing", label: "Pricing", icon: CreditCard,
    items: [
      { question: "Why don't you list fixed prices?", answer: "Because every business is different. Your systems, workflows, team size, and growth stage are unique. We build solutions that fit your needs rather than forcing your business into a pre-packaged plan." },
      { question: "How is pricing determined?", answer: "Pricing is based on the scope and complexity identified during your Business Intelligence Audit — number of workflows, integrations required, data complexity, and support needs. We provide a transparent proposal before any work begins." },
    ],
  },
  {
    id: "Implementation", label: "Implementation", icon: Rocket,
    items: [
      { question: "What happens after I approve the proposal?", answer: "We begin with deeper discovery, then build, test, and deploy the solution in your environment. You receive regular updates, and we validate every stage with real data." },
      { question: "Will my team receive training?", answer: "Yes. Training is standard in every implementation. We provide documentation, hands-on sessions, and ongoing support during the transition." },
      { question: "How long before we see results?", answer: "Many clients see measurable improvements within the first few weeks. Simple workflow automations show results immediately. Complex systems demonstrate clear ROI within the first month." },
    ],
  },
  {
    id: "Security & Privacy", label: "Security", icon: Shield,
    items: [
      { question: "How do you protect business data?", answer: "We follow industry-standard security practices including data encryption in transit and at rest, access controls, and secure infrastructure. We never store or access your data beyond what is necessary." },
      { question: "Who owns the automation?", answer: "You do. Everything we build is deployed within your systems. You retain full ownership of all automations, workflows, and data. No vendor lock-in." },
      { question: "Do you sign NDAs?", answer: "Yes. We routinely sign NDAs and confidentiality agreements. We are happy to sign your NDA or provide our own." },
    ],
  },
  {
    id: "Support", label: "Support", icon: HeadphonesIcon,
    items: [
      { question: "Do you provide ongoing support?", answer: "Yes. Every implementation includes support and optimization. We monitor performance, make adjustments, and ensure your systems continue delivering results." },
      { question: "What happens if something stops working?", answer: "Our team investigates and resolves issues promptly. Every implementation includes a warranty period. For ongoing clients, we provide defined SLAs." },
      { question: "How can we contact your team?", answer: "Email us at contact@awoken.in or use the contact form. We typically respond within 2 hours during business hours." },
    ],
  },
]

const allCategories: Category[] = ["All", "Getting Started", "Business Intelligence Audit", "AI Solutions", "Pricing", "Implementation", "Security & Privacy", "Support"]

const categoryIcons: Record<Category, React.ElementType> = {
  All: Search, "Getting Started": FileText, "Business Intelligence Audit": ClipboardCheck, "AI Solutions": Bot,
  Pricing: CreditCard, Implementation: Rocket, "Security & Privacy": Shield, Support: HeadphonesIcon,
}

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

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const searchRef = useRef<HTMLInputElement>(null)

  const allItems = useMemo(
    () => categoryGroups.flatMap((group) => group.items.map((item) => ({ ...item, category: group.id as Category }))),
    []
  )

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory
      const q = searchQuery.toLowerCase()
      return matchesCategory && (!q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q))
    })
  }, [allItems, activeCategory, searchQuery])

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
            FAQ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Everything you need to know about working with Awoken.{" "}
            <Link href="/contact" className="text-accent hover:underline font-medium">Still have questions?</Link>
          </motion.p>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-10 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); searchRef.current?.focus() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <SearchX className="h-4 w-4" />
                </button>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-8">
              {allCategories.map((cat) => {
                const Icon = categoryIcons[cat]
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "bg-background text-muted-foreground border border-border hover:border-accent/30"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {cat === "Business Intelligence Audit" ? "BIA" : cat}
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <SearchX className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No answers found</h3>
              <p className="text-sm text-muted-foreground">
                Try a different search or{" "}
                <Link href="/contact" className="text-accent hover:underline">reach out to our team</Link>.
              </p>
            </div>
          ) : (
            <AnimatedSection delay={0.1}>
              <p className="text-xs text-muted-foreground mb-4">
                {searchQuery || activeCategory !== "All"
                  ? `${filteredItems.length} result${filteredItems.length !== 1 ? "s" : ""}`
                  : `${allItems.length} questions`}
              </p>
              <Accordion type="single" collapsible className="w-full">
                {filteredItems.map((item, i) => (
                  <AccordionItem key={`${item.category}-${i}`} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-sm">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          )}
        </div>
      </Section>

      <Section className="bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Still Have Questions?"
            title="Did not find what you needed?"
            description="Every business is different. We are happy to answer your questions during a free audit."
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
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
