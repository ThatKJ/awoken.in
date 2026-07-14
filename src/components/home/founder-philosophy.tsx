"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import { philosophyPoints } from "@/data/philosophy"

export function FounderPhilosophy() {
  return (
    <Section className="bg-surface">
      <div className="max-w-3xl mx-auto">
          {philosophyPoints.map((point, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="border-l-2 border-accent pl-6 mb-12 last:mb-0"
            >
              <p className="text-xl sm:text-2xl font-semibold leading-snug mb-4">
                &ldquo;{point.quote}&rdquo;
              </p>
              {point.context && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.context}
                </p>
              )}
            </motion.blockquote>
          ))}
        </div>
    </Section>
  )
}
