"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"

const technologies = [
  "OpenAI", "Anthropic", "Gemini", "Twilio", "ElevenLabs",
  "Supabase", "HubSpot", "GoHighLevel", "Stripe", "Cal.com",
  "Google", "n8n", "Make",
]

export function PoweredBy() {
  return (
    <section className="py-20 border-y border-border">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-8">
          Built on technologies trusted by millions
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="text-sm font-medium text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </Container>
    </section>
  )
}
