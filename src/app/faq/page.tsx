"use client"

import { useState, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
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
  Search,
  SearchX,
  FileText,
  ClipboardCheck,
  Bot,
  CreditCard,
  Rocket,
  Shield,
  HeadphonesIcon,
} from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

type Category =
  | "All"
  | "Getting Started"
  | "Business Intelligence Audit"
  | "AI Solutions"
  | "Pricing"
  | "Implementation"
  | "Security & Privacy"
  | "Support"

interface CategoryGroup {
  id: Category
  label: string
  icon: React.ElementType
  items: FAQItem[]
}

const categoryGroups: CategoryGroup[] = [
  {
    id: "Getting Started",
    label: "Getting Started",
    icon: FileText,
    items: [
      {
        question: "What does Awoken do?",
        answer:
          "Awoken helps businesses identify operational bottlenecks, recover lost revenue, and implement AI-powered systems that improve operations, lead management, and business performance. We are a Business Intelligence and AI consulting firm. We do not sell generic automation — we first understand your business, identify where technology can create the most value, and only then design a custom solution.",
      },
      {
        question: "Who is Awoken for?",
        answer:
          "Awoken is for business owners, operators, and leadership teams who know their business could run more efficiently but are not sure where to start. If you are losing leads through the cracks, drowning in manual processes, or feel like your team spends too much time on repetitive work — we can help. We work best with businesses that have existing systems, recurring workflows, and a genuine interest in improving operations.",
      },
      {
        question: "How do I know if my business is a good fit?",
        answer:
          "The best way to find out is to book a free Business Intelligence Audit. During this session, we analyze your current operations, identify bottlenecks, and assess where AI and automation can create measurable impact. If there is a clear path forward, we will tell you. If there is not, we will tell you that too — no obligation, no pressure.",
      },
      {
        question: "Which industries do you work with?",
        answer:
          "We work across service-based industries including home services, healthcare, professional services, real estate, retail, and hospitality. Our methodology is industry-agnostic — we adapt to your specific operational context. If you have systems, workflows, and customers, we can help optimize them.",
      },
      {
        question: "How do I get started?",
        answer:
          "Getting started is simple. Book a free Business Intelligence Audit through our website. We will schedule a 30-45 minute strategy session to understand your business, identify opportunities, and outline a clear next step — whether that is a full proposal or simply actionable advice you can implement on your own.",
      },
    ],
  },
  {
    id: "Business Intelligence Audit",
    label: "Business Intelligence Audit",
    icon: ClipboardCheck,
    items: [
      {
        question: "What is a Business Intelligence Audit?",
        answer:
          "A Business Intelligence Audit is a complimentary strategy session where we analyze your business operations to identify bottlenecks, uncover revenue opportunities, and assess your readiness for AI-powered improvements. It is the starting point for every engagement because we believe you cannot recommend a solution until you fully understand the problem.",
      },
      {
        question: "What happens during the audit?",
        answer:
          "The audit is a structured 30-45 minute conversation. We review your current systems, workflows, team structure, and growth goals. We identify where time and revenue are being lost, evaluate your tech stack, and pinpoint the highest-impact opportunities for AI and automation. Think of it as a diagnostic for your business operations.",
      },
      {
        question: "How long does the audit take?",
        answer:
          "The strategy session itself takes 30-45 minutes. After the session, we compile our findings and deliver a detailed report within a few business days. The entire process — from booking to receiving your report — typically completes within one week.",
      },
      {
        question: "Is the audit really free?",
        answer:
          "Yes. The Business Intelligence Audit is completely free with no obligation. We offer it because we believe in understanding first and recommending second. If we identify a clear opportunity to create value, we will present a proposal. If not, we will share actionable insights you can use independently.",
      },
      {
        question: "What will I receive after the audit?",
        answer:
          "You will receive a detailed report outlining the bottlenecks we identified, revenue opportunities we uncovered, and recommended next steps. If there is a clear path forward, we will include a transparent proposal with scope, timeline, and investment. There is never any pressure to move forward.",
      },
    ],
  },
  {
    id: "AI Solutions",
    label: "AI Solutions",
    icon: Bot,
    items: [
      {
        question: "What kinds of AI systems do you build?",
        answer:
          "We build AI-powered solutions tailored to your specific business needs — workflow automations, lead qualification systems, Business Intelligence dashboards, AI assistants, CRM integrations, and internal process automations. Every solution is designed after we fully understand your operations, ensuring the technology fits your business rather than the other way around.",
      },
      {
        question: "Can you integrate with our current software?",
        answer:
          "Yes. Integration with your existing tech stack is a core part of what we do. Whether you use Salesforce, HubSpot, Zoho, or a custom CRM — we design solutions that work with your current systems. During the audit, we evaluate your existing tools and ensure any solution we propose integrates seamlessly.",
      },
      {
        question: "Do we need technical knowledge to work with Awoken?",
        answer:
          "Not at all. You are the expert on your business. We handle the technical implementation. Our process is designed to be collaborative without requiring technical expertise on your end. We explain everything in plain language, provide training for your team, and document every system we build.",
      },
      {
        question: "Can AI work with our existing CRM?",
        answer:
          "In most cases, yes. Modern AI systems integrate with virtually every major CRM platform. During your free audit, we assess your current CRM setup and determine how AI can enhance it — whether that means automating lead scoring, enriching contact data, or surfacing actionable insights directly within your existing workflow.",
      },
      {
        question: "How long does implementation usually take?",
        answer:
          "Timelines depend on scope. A single workflow automation can be deployed in 2-3 weeks. More complex multi-system integrations typically take 4-8 weeks. During your audit, we provide a clear timeline based on your specific needs, priorities, and the complexity of the systems involved.",
      },
    ],
  },
  {
    id: "Pricing",
    label: "Pricing",
    icon: CreditCard,
    items: [
      {
        question: "Why don't you list fixed prices?",
        answer:
          "Because every business is different. Your systems, workflows, team size, and growth stage are unique. We believe in building solutions that fit your specific needs rather than forcing your business into a pre-packaged plan. Every engagement starts with a Business Intelligence Audit so we can understand exactly what you need before we quote.",
      },
      {
        question: "How is pricing determined?",
        answer:
          "Pricing is based on the scope and complexity of work identified during your Business Intelligence Audit — the number of workflows, integrations required, data complexity, and ongoing support needs. We provide a transparent proposal with no hidden fees before any work begins.",
      },
      {
        question: "Do you offer custom proposals?",
        answer:
          "Every proposal we deliver is custom. After the audit, you receive a detailed proposal tailored to your business. It includes the specific scope of work, timeline, investment, and expected outcomes. There is no obligation to proceed.",
      },
      {
        question: "Are there any hidden costs?",
        answer:
          "None. We believe in full transparency. Our proposals itemize every component of the engagement. What we quote is what you pay. If your needs change later, we discuss and agree on any adjustments before additional work begins.",
      },
      {
        question: "Can small businesses work with Awoken?",
        answer:
          "Absolutely. We work with businesses of all sizes — from small teams to multi-location enterprises. Our Business Intelligence Audit is designed to be accessible for any business serious about improving operations. We recommend solutions proportional to your size and budget.",
      },
    ],
  },
  {
    id: "Implementation",
    label: "Implementation",
    icon: Rocket,
    items: [
      {
        question: "What happens after I approve the proposal?",
        answer:
          "Once you approve the proposal, we begin with a deeper discovery phase to map out every detail of your systems and workflows. We then build, test, and deploy the solution in your environment. Throughout the process, you receive regular updates, and we validate every stage with real data before moving to the next.",
      },
      {
        question: "Will my team receive training?",
        answer:
          "Yes. Training is a standard part of every implementation. We ensure your team understands how to use the new systems effectively. We provide documentation, hands-on sessions, and ongoing support during the transition period so your team feels confident from day one.",
      },
      {
        question: "Do you provide documentation?",
        answer:
          "Every implementation includes comprehensive documentation covering system architecture, workflow logic, integration points, and standard operating procedures. You have full visibility into how everything works — nothing is a black box.",
      },
      {
        question: "How long before we see results?",
        answer:
          "Many clients see measurable improvements within the first few weeks of deployment. Simple workflow automations can show results immediately. More complex systems typically demonstrate clear ROI within the first month. We establish baseline metrics during the audit and track progress against them throughout the engagement.",
      },
      {
        question: "Can systems be expanded later?",
        answer:
          "Yes. Every solution we build is designed to scale. As your business grows, new workflows, integrations, and capabilities can be added. We architecture systems with future expansion in mind so you are never locked into a limited setup.",
      },
    ],
  },
  {
    id: "Security & Privacy",
    label: "Security & Privacy",
    icon: Shield,
    items: [
      {
        question: "How do you protect business data?",
        answer:
          "We follow industry-standard security practices including data encryption in transit and at rest, access controls, and secure infrastructure. We never store or access your data beyond what is necessary for implementation and support. Specific security measures are documented in our engagement agreements.",
      },
      {
        question: "Who owns the automation after deployment?",
        answer:
          "You do. Everything we build is deployed within your systems and infrastructure. You retain full ownership of all automations, workflows, and data. There is no vendor lock-in or proprietary platform dependency.",
      },
      {
        question: "Do you sign NDAs?",
        answer:
          "Yes. We routinely sign NDAs and confidentiality agreements. Your business information, internal operations, and any data shared during the audit or implementation are treated with strict confidentiality. We are happy to sign your NDA or provide our own.",
      },
      {
        question: "How do you handle confidential information?",
        answer:
          "All confidential information shared during the audit, strategy sessions, and implementation is protected under our confidentiality agreements. We limit access to only the team members directly involved in your engagement and never use your information for any purpose beyond delivering your agreed-upon services.",
      },
    ],
  },
  {
    id: "Support",
    label: "Support",
    icon: HeadphonesIcon,
    items: [
      {
        question: "Do you provide ongoing support?",
        answer:
          "Yes. Every implementation includes a support and optimization period. We monitor performance, make adjustments, and ensure your systems continue delivering results. For larger engagements, we offer ongoing support agreements with guaranteed response times.",
      },
      {
        question: "Can we request changes later?",
        answer:
          "Absolutely. As your business evolves, your systems should evolve with it. We offer change request processes for existing clients. Minor adjustments are handled quickly, while larger enhancements are scoped and quoted transparently.",
      },
      {
        question: "What happens if something stops working?",
        answer:
          "If an issue arises, our team investigates and resolves it promptly. Every implementation includes a warranty period where issues are addressed at no additional cost. For ongoing support clients, we provide defined SLAs with priority response times.",
      },
      {
        question: "How can we contact your team?",
        answer:
          "You can reach us via email at contact@awoken.in or through the contact form on our website. We typically respond within 2 hours during business hours. For existing clients, we provide direct access to your implementation team.",
      },
    ],
  },
]

const allCategories: Category[] = [
  "All",
  "Getting Started",
  "Business Intelligence Audit",
  "AI Solutions",
  "Pricing",
  "Implementation",
  "Security & Privacy",
  "Support",
]

const categoryIcons: Record<Category, React.ElementType> = {
  All: Search,
  "Getting Started": FileText,
  "Business Intelligence Audit": ClipboardCheck,
  "AI Solutions": Bot,
  Pricing: CreditCard,
  Implementation: Rocket,
  "Security & Privacy": Shield,
  Support: HeadphonesIcon,
}

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

function FadeInStagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
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
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [allItems, activeCategory, searchQuery])

  const activeCount = filteredItems.length

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
            FAQ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Everything you need to know about working with Awoken.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground"
          >
            Still have questions?{" "}
            <Link href="/contact" className="text-accent hover:underline font-medium">
              Our team is happy to help
            </Link>
            .
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
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
                Contact Our Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ─── SEARCH + CATEGORIES + ACCORDION ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-3xl mx-auto">
          {/* Search */}
          <AnimatedSection>
            <div className="relative mb-8 sm:mb-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-10 rounded-xl border border-border bg-background text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    searchRef.current?.focus()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <SearchX className="h-4 w-4" />
                </button>
              )}
            </div>
          </AnimatedSection>

          {/* Category Tabs */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
              {allCategories.map((cat) => {
                const Icon = categoryIcons[cat]
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "bg-background text-muted-foreground border border-border hover:border-accent/30 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {cat}
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          {/* Results count */}
          <AnimatedSection delay={0.15}>
            <p className="text-sm text-muted-foreground mb-6">
              {searchQuery || activeCategory !== "All"
                ? `${activeCount} result${activeCount !== 1 ? "s" : ""}`
                : `${allItems.length} questions`}
            </p>
          </AnimatedSection>

          {/* No results */}
          {filteredItems.length === 0 && (
            <FadeInStagger>
              <div className="text-center py-16 sm:py-20">
                <SearchX className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No answers found</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Try a different search term or{" "}
                  <Link href="/contact" className="text-accent hover:underline">
                    reach out to our team
                  </Link>
                  .
                </p>
              </div>
            </FadeInStagger>
          )}

          {/* Accordion */}
          {filteredItems.length > 0 && (
            <AnimatedSection delay={0.2}>
              <Accordion type="single" collapsible className="w-full">
                {filteredItems.map((item, i) => (
                  <AccordionItem key={`${item.category}-${i}`} value={`item-${i}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          )}
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-background-alt p-8 sm:p-10 lg:p-14">
              <Badge variant="accent" className="mb-4 sm:mb-5">
                Still Have Questions?
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-5">
                Did not find what you were looking for?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
                Every business is different. We are happy to answer your questions during a free Business Intelligence Audit.
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
                    Contact Us
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
