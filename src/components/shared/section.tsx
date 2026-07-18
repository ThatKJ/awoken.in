import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  size?: "default" | "small" | "large" | "hero" | "xs"
  id?: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ children, className, containerClassName, size = "default", id }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          size === "hero" && "pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-14 md:pb-18 lg:pb-20",
          size === "large" && "py-16 sm:py-20 md:py-24 lg:py-28",
          size === "default" && "py-14 sm:py-18 md:py-22 lg:py-26",
          size === "small" && "py-10 sm:py-12 md:py-14 lg:py-16",
          size === "xs" && "py-6 sm:py-8 md:py-10",
          className
        )}
      >
        <Container className={containerClassName}>{children}</Container>
      </section>
    )
  }
)
