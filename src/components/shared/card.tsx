import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  gradient?: boolean
}

export function Card({ children, className, hover = true, glass, gradient }: CardProps) {
  const Comp = hover ? motion.div : "div"
  const motionProps = hover
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
      }
    : {}

  return (
    <Comp
      {...motionProps}
      className={cn(
        "rounded-xl border border-border bg-background p-6 sm:p-8 lg:p-10 flex flex-col",
        hover && "hover:-translate-y-1.5 hover:shadow-premium hover:border-accent/20 transition-all duration-300 ease-out group/card",
        glass && "glass shadow-glass",
        gradient && "bg-gradient-to-br from-background via-background to-accent/[0.02]",
        className
      )}
    >
      {children}
    </Comp>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-5 sm:mb-6", className)}>{children}</div>
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-1", className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mt-auto pt-5 sm:pt-6", className)}>{children}</div>
}
