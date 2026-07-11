"use client"

import { Container } from "@/components/shared/container"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { faqItems } from "@/data/faq"

export function FAQSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Common Questions
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl lg:max-w-[650px] mx-auto">
            Answers to the questions we hear most often.
          </p>
        </div>
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
      </Container>
    </section>
  )
}
