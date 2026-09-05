import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxOptionProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

/**
 * A plain native checkbox rather than a Radix primitive — this codebase
 * doesn't already depend on @radix-ui/react-checkbox, and a native input
 * is fully accessible and touch-friendly on its own for a simple
 * multi-select list like lead sources.
 */
const CheckboxOption = React.forwardRef<HTMLInputElement, CheckboxOptionProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:border-accent/30 has-[:checked]:border-accent has-[:checked]:bg-accent-light has-[:checked]:text-accent",
          className
        )}
      >
        <input ref={ref} id={inputId} type="checkbox" className="peer sr-only" {...props} />
        <span
          aria-hidden="true"
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border peer-checked:border-accent peer-checked:bg-accent"
        >
          <Check className="h-3 w-3 text-accent-foreground opacity-0 peer-checked:opacity-100" strokeWidth={3} />
        </span>
        {label}
      </label>
    )
  }
)
CheckboxOption.displayName = "CheckboxOption"

export { CheckboxOption }
