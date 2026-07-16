"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Section } from "@/components/shared/section"
import { workflowNodes } from "@/data/workflow"
import { ArrowDown } from "lucide-react"

export function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  return (
    <Section ref={ref} className="bg-surface relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            How It Works
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-[3px] rounded-full bg-accent mx-auto mt-4 shadow-[0_0_8px_rgba(249,115,22,0.3)]"
          />
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            From lead capture to revenue dashboard. Every step is automated end-to-end.
          </p>
        </motion.div>
        <div className="relative max-w-3xl mx-auto">
          <div className="hidden lg:block absolute left-7 top-0 bottom-0 w-px bg-border" />
          <motion.div
            className="hidden lg:block absolute left-7 top-0 w-px bg-accent"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
          />
          <div className="space-y-0">
            {workflowNodes.map((node, i) => {
              const nodeProgress = useTransform(
                scrollYProgress,
                [i / workflowNodes.length, (i + 0.5) / workflowNodes.length],
                [0, 1]
              )
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start gap-6 pb-12 last:pb-0"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className="w-14 h-14 rounded-xl border-2 border-border bg-background flex items-center justify-center shrink-0"
                      whileHover={{ borderColor: "#F97316" }}
                    >
                      <motion.span
                        className="text-base font-bold text-muted-foreground"
                        style={{ color: nodeProgress }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </motion.div>
                    {i < workflowNodes.length - 1 && (
                      <div className="hidden lg:flex justify-center mt-2">
                        <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 pt-3">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{node.label}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
    </Section>
  )
}
