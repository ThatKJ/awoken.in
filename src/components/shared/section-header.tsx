"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  align?: "center" | "left"
  underline?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  align = "center",
  underline = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        align === "center" ? "text-center" : "text-left",
        "mb-10 sm:mb-12 md:mb-14",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-accent mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "group/title inline-block cursor-default transition-transform duration-300 ease-out hover:-translate-y-0.5",
          "text-[clamp(1.5rem,4.5vw,2.5rem)] sm:text-[clamp(1.75rem,4vw,2.75rem)] md:text-[clamp(2rem,3.5vw,3rem)] lg:text-5xl font-bold tracking-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {underline && (
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: align === "center" ? 100 : 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className={cn(
            "h-[3px] rounded-full bg-accent mt-4",
            "shadow-[0_0_8px_rgba(249,115,22,0.3)]",
            "group-hover/title:shadow-[0_0_12px_rgba(249,115,22,0.5)] group-hover/title:w-[120px] transition-all duration-300",
            align === "center" ? "mx-auto" : ""
          )}
        />
      )}
      {description && (
        <p
          className={cn(
            "mt-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mx-auto max-w-2xl lg:max-w-3xl",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
