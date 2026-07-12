"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { Building2, Stethoscope, GraduationCap, Dumbbell, Briefcase, Store } from "lucide-react"
import { ArrowRight } from "lucide-react"

const industries = [
  { icon: Building2, title: "Real Estate", description: "Lead response, tour booking, and follow-up automation for agencies." },
  { icon: Stethoscope, title: "Healthcare", description: "Patient intake, scheduling, and administrative workflow optimization." },
  { icon: GraduationCap, title: "Education", description: "Student inquiries, enrollment, and communication automation." },
  { icon: Dumbbell, title: "Fitness", description: "Membership management, class scheduling, and retention systems." },
  { icon: Briefcase, title: "Professional Services", description: "Client intake, billing, and project management automation." },
  { icon: Store, title: "Small Businesses", description: "End-to-end operational systems tailored to your workflow." },
]

export function Industries() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-surface">
      <Container>
        <SectionHeader
          eyebrow="Industries"
          title="We work across industries, but always start with your specific problem."
          description="Every business is different. We don't apply generic solutions. We study your operations first."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {industries.map((industry, i) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-background p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3 sm:mb-5">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 group-hover:text-accent transition-colors">{industry.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{industry.description}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
