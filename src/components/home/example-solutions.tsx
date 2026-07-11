"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { exampleSolutions } from "@/data/example-solutions"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ExampleSolutions() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-surface">
      <Container>
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <Badge variant="secondary" className="mb-4">Reference Architecture</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Example Solutions
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl lg:max-w-[650px] mx-auto">
            These are conceptual implementations showing how we approach common business challenges. Each one is adaptable to your specific needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {exampleSolutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-background flex flex-col h-full p-6 lg:p-8 hover:shadow-lg transition-all duration-200"
            >
              <Badge variant="secondary" className="mb-5 shrink-0">
                {solution.industry}
              </Badge>
              <h3 className="text-lg md:text-xl font-semibold min-h-[48px] flex items-start mb-5">{solution.title}</h3>
              <div className="flex-1 space-y-4 text-base text-muted-foreground">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Challenge</p>
                  <p className="leading-relaxed">{solution.challenge}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Solution</p>
                  <p className="leading-relaxed">{solution.solution}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Outcome</p>
                  <p className="leading-relaxed text-accent">{solution.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            These are conceptual solutions. <Link href="/book" className="text-accent hover:underline">Talk to us</Link> about your specific business needs.
          </p>
        </div>
      </Container>
    </section>
  )
}
