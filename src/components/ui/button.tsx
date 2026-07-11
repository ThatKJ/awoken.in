import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]",
        secondary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]",
        outline: "border border-border bg-background hover:bg-surface active:scale-[0.98]",
        ghost: "hover:bg-surface active:scale-[0.98]",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-11 px-5 text-[15px]",
        lg: "h-14 px-8 text-[17px]",
        xl: "h-14 px-8 text-[17px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
