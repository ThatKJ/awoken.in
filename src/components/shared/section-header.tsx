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

/**
 * Server component — no framer-motion here. Wrap with <Reveal> at the call
 * site when scroll-in motion is wanted; not every header needs it, and
 * sections that don't animate get to stay server-rendered.
 */
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
    <div
      className={cn(
        align === "center" ? "text-center mx-auto" : "text-left",
        "max-w-3xl mb-10 sm:mb-12 md:mb-14 lg:mb-16",
        align === "center" && "mx-auto",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "flex items-center gap-2 text-eyebrow font-semibold uppercase text-accent mb-3 sm:mb-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-h2 text-foreground", titleClassName)}>{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]",
            align === "center" && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
