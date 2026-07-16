import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  size?: "default" | "small" | "hero"
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ children, className, containerClassName, size = "default" }, ref) {
    return (
      <section
        ref={ref}
        className={cn(
          size === "hero" && "pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 lg:pb-20",
          size === "default" && "py-16 sm:py-20 md:py-24 lg:py-28",
          size === "small" && "py-12 sm:py-14 md:py-16 lg:py-20",
          className
        )}
      >
        <Container className={containerClassName}>{children}</Container>
      </section>
    )
  }
)
