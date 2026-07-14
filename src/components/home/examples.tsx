"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardBody } from "@/components/shared/card"
import { PhoneCall, LayoutDashboard, TrendingUp, Headphones, Database, Package, Library, MessageCircle } from "lucide-react"

const examples = [
  { icon: PhoneCall, title: "Lead Qualification System", description: "Intelligent call handling that qualifies, routes, and books appointments automatically." },
  { icon: LayoutDashboard, title: "Internal ERP Dashboard", description: "Custom operational dashboard connecting your CRM, finance, and inventory data." },
  { icon: TrendingUp, title: "Sales Analytics", description: "Real-time pipeline tracking, forecasting, and performance reporting." },
  { icon: Headphones, title: "AI Receptionist", description: "24/7 call answering that handles inquiries, scheduling, and triage." },
  { icon: Database, title: "CRM Automation", description: "Automated data entry, enrichment, and workflow triggers across your CRM." },
  { icon: Package, title: "Inventory Tracking", description: "Real-time stock monitoring, automated reordering, and supplier management." },
  { icon: Library, title: "Knowledge Base", description: "Centralized documentation and self-service portal for your team and customers." },
  { icon: MessageCircle, title: "Customer Support Automation", description: "Multi-channel support with automated responses, routing, and escalation." },
]

export function Examples() {
  return (
    <Section className="bg-surface">
        <SectionHeader
          eyebrow="Implementation Examples"
          title="Solutions we build after diagnosis, not before."
          description="These are examples of what we've built. Every recommendation comes from understanding your specific situation first."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {examples.map((example, i) => {
            const Icon = example.icon
            return (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <CardBody>
                    <h3 className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">{example.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{example.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </div>
    </Section>
  )
}
