"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import { ActivityFeed } from "@/components/visuals/activity-feed"
import { Button } from "@/components/ui/button"
import { Mail, Clock, CalendarCheck, Shield, ArrowRight, MessageSquare, HeadphonesIcon, Zap } from "lucide-react"
import { CONTACT_EMAIL } from "@/lib/constants"

const supportCards = [
  {
    icon: MessageSquare,
    title: "Email",
    value: CONTACT_EMAIL,
    description: "We respond within 2 hours during business hours.",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "< 2 hours",
    description: "Mon–Sat, 9 AM – 7 PM IST",
  },
  {
    icon: HeadphonesIcon,
    title: "Free Audit",
    value: "30–45 min",
    description: "Book a complimentary Business Intelligence Audit.",
  },
]

export default function ContactPage() {
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "https://app.cal.com/embed/embed.js"
    script.async = true
    document.head.appendChild(script)
  }, [])

  return (
    <>
      <style>{`
        .cal-inline-container::-webkit-scrollbar { display: none; }
        .cal-inline-container { scrollbar-width: none; }
        .cal-inline-container cal-inline iframe { border-radius: 0 !important; }
      `}</style>
      <Section size="hero" className="bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4"
          >
            Contact
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              Let&apos;s understand your business.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              Book a free Business Intelligence Audit and discover where operational improvements can create the biggest impact in your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 space-y-3"
            >
              {supportCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background-alt">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{card.title}</p>
                      <p className="text-sm text-muted-foreground">{card.value}</p>
                      <p className="text-xs text-muted-foreground/60">{card.description}</p>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6"
            >
              <div className="rounded-xl border border-border bg-background-alt p-4 flex items-start gap-3">
                <Shield className="h-4 w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every consultation is confidential. We respect your privacy and never share your information.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6"
            >
              <Link href="/book">
                <Button variant="primary" size="xl">
                  Book Free Audit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full"
          >
            <div className="rounded-2xl border border-border shadow-premium overflow-hidden" style={{ maxWidth: "min(100%,1300px)" }}>
              <div
                className="cal-inline-container w-full"
                style={{ minHeight: "500px" }}
                dangerouslySetInnerHTML={{
                  __html: `<cal-inline data-cal-link="awoken-in/strategy-call" data-layout="month_view" data-config='{"theme":"dark"}' style="display:flex;width:100%;height:100%;min-height:inherit;position:relative;flex-wrap:wrap"></cal-inline>`
                }}
              />
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  )
}
