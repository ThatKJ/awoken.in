import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Marks the field as invalid — red border + aria-invalid, no color-only signal (paired with FormField's error text). */
  invalid?: boolean
}

const baseInputStyles =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-[15px] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50"

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        baseInputStyles,
        invalid && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input, baseInputStyles }
