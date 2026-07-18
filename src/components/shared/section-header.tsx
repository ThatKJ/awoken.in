import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        align === "center" ? "text-center mx-auto" : "text-left",
        "max-w-3xl mb-10 sm:mb-12 md:mb-14 lg:mb-16",
        align === "center" && "mx-auto",
        className
      )}
    >
      {eyebrow && (
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/10 bg-accent/5 text-accent text-xs font-semibold tracking-wide mb-4 sm:mb-5"
        )}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
          {eyebrow}
        </div>
      )}
      <h2 className={cn(
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]",
        titleClassName
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]",
          align === "center" && "mx-auto",
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
