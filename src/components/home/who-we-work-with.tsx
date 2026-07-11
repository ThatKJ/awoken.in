"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { fitCriteria } from "@/data/who-we-work-with"
import { CheckCircle, XCircle } from "lucide-react"

export function WhoWeWorkWith() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight">
            Who We Work Best With
          </h2>
          <p className="mt-4 text-[20px] text-muted-foreground max-w-[650px] mx-auto">
            Not every business is a good fit. Being selective helps us deliver better results.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {fitCriteria.map((criteria) => (
            <motion.div
              key={criteria.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
className={`rounded-xl border-2 flex flex-col h-full p-8 ${
                 criteria.isFit ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"
               }`}
            >
              <div className="flex items-center gap-3 mb-6">
                {criteria.isFit ? (
                  <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500 shrink-0" />
                )}
                <h3 className="text-lg font-semibold">{criteria.category}</h3>
              </div>
              <ul className="flex-1 space-y-3">
                {criteria.items.map((item) => (
                  <li
                    key={item}
                    className={`text-base flex items-start gap-3 ${
                      criteria.isFit ? "text-green-800" : "text-red-700"
                    }`}
                  >
                    <span className="mt-1 shrink-0">
                      {criteria.isFit ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : (
                        <XCircle className="h-3 w-3 text-red-500" />
                      )}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
