"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody } from "@/components/shared/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { resources } from "@/data/resources"
import { ArrowRight, BookOpen, FileText, Download, ClipboardCheck, Calculator, Search } from "lucide-react"

const typeIcons: Record<string, React.ElementType> = {
  playbook: BookOpen,
  guide: FileText,
  template: Download,
  checklist: ClipboardCheck,
  calculator: Calculator,
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

export default function ResourcesPage() {
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
            Resources
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Guides and tools to help you find&nbsp;inefficiencies.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Free operational assessment guides, workflow templates, and checklists to help you identify bottlenecks in your business.
          </motion.p>
        </div>
      </Section>

      <Section className="bg-background-alt">
        <SectionHeader
          eyebrow="Library"
          title="Explore resources."
          description="Free tools to start identifying opportunities in your business."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {resources.map((resource, i) => {
            const Icon = typeIcons[resource.type] || FileText
            return (
              <AnimatedSection key={resource.title} delay={i * 0.04}>
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover/card:bg-accent group-hover/card:text-accent-foreground transition-all duration-300">
                      <Icon className="h-5 w-5 text-accent group-hover/card:text-accent-foreground transition-all" />
                    </div>
                    <Badge variant="soft" className="text-[10px]">{resource.type}</Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                  <CardBody>
                    <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
                  </CardBody>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </Section>

      <Section className="bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Need More?"
            title="Not sure where to start?"
            description="A 30-minute diagnostic conversation to map your operations and identify where improvement creates the biggest impact."
          />
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
            <Link href="/book">
              <Button variant="primary" size="xl">
                Book Free Business Intelligence Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
