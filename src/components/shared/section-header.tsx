import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  align?: "center" | "left"
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        "mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs sm:text-sm md:text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3 md:mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-[clamp(1.5rem,4.5vw,2.5rem)] sm:text-[clamp(1.75rem,4vw,2.75rem)] md:text-[clamp(2rem,3.5vw,3rem)] lg:text-5xl font-bold tracking-tight", titleClassName)}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mx-auto max-w-2xl lg:max-w-[700px]",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
