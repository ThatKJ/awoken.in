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
          size === "hero" && "pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-10 md:pb-14 lg:pb-18",
          size === "default" && "py-12 sm:py-16 md:py-20 lg:py-24",
          size === "small" && "py-10 sm:py-12 md:py-14 lg:py-16",
          className
        )}
      >
        <Container className={containerClassName}>{children}</Container>
      </section>
    )
  }
)
