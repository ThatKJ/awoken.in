import * as React from "react"
import { cn } from "@/lib/utils"
import { baseInputStyles } from "./input"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        baseInputStyles,
        "min-h-28 resize-y py-3 leading-relaxed",
        invalid && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"

export { Textarea }
