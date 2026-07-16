"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/shared/section"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { faqItems } from "@/data/faq"

export function FAQSection() {
  return (
    <Section className="bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Common Questions
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-[3px] rounded-full bg-accent mx-auto mt-4 shadow-[0_0_8px_rgba(249,115,22,0.3)]"
          />
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Answers to the questions we hear most often.
          </p>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
    </Section>
  )
}
