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
          size === "hero" && "pt-24 sm:pt-28 md:pt-36 lg:pt-40 xl:pt-[140px] pb-16 md:pb-20 lg:pb-24",
          size === "default" && "py-16 md:py-20 lg:py-24",
          size === "small" && "py-12 md:py-16 lg:py-20 xl:py-[72px]",
          className
        )}
      >
        <Container className={containerClassName}>{children}</Container>
      </section>
    )
  }
)
