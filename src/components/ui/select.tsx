import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { baseInputStyles } from "./input"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean
}

/**
 * Native <select> — deliberately not a custom-styled dropdown. Native
 * selects give the correct OS picker on iOS/Android for free, which a
 * hand-rolled listbox usually gets wrong on mobile.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(baseInputStyles, "appearance-none pr-10", invalid && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
)
Select.displayName = "Select"

export { Select }
