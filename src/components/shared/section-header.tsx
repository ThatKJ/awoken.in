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
        "mb-16",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-5xl lg:text-6xl font-bold tracking-tight", titleClassName)}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[20px] text-muted-foreground leading-relaxed mx-auto",
            align === "center" ? "max-w-[700px]" : "max-w-[700px]",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
