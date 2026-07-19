"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface LegalSection {
  id: string
  title: string
  content: React.ReactNode
}

interface LegalPageProps {
  title: string
  lastUpdated: string
  sections: LegalSection[]
  tocLabel?: string
}

function SectionBlock({ section, index }: { section: LegalSection; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      id={section.id}
      className="scroll-mt-28"
    >
      <div className="mb-10 sm:mb-12 last:mb-0">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-4 sm:mb-5">
          {section.title}
        </h2>
        <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4">
          {section.content}
        </div>
      </div>
    </motion.div>
  )
}

export function LegalPage({ title, lastUpdated, sections, tocLabel }: LegalPageProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px" }
    )

    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections])

  return (
    <>
      {/* ─── HERO ─── */}
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4 sm:mb-6"
          >
            {tocLabel ?? "Legal"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-sm text-muted-foreground"
          >
            Last updated: {lastUpdated}
          </motion.p>
        </div>
      </Section>

      {/* ─── CONTENT ─── */}
      <Section className="bg-background-alt pt-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Sidebar TOC */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <Badge variant="secondary" className="mb-4 text-xs">
                On this page
              </Badge>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById(section.id)
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" })
                        setActiveId(section.id)
                      }
                    }}
                    className={cn(
                      "block text-sm py-1.5 transition-colors duration-200 border-l-2 pl-3",
                      activeId === section.id
                        ? "text-accent border-accent font-medium"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                    )}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {sections.map((section, i) => (
              <SectionBlock key={section.id} section={section} index={i} />
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
