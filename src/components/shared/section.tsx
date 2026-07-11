import { cn } from "@/lib/utils"
import { Container } from "./container"

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  size?: "default" | "small" | "hero"
}

export function Section({ children, className, containerClassName, size = "default" }: SectionProps) {
  return (
    <section
      className={cn(
        size === "hero" && "pt-[140px] pb-24",
        size === "default" && "py-24",
        size === "small" && "py-[72px]",
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
