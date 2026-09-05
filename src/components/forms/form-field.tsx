import { Label } from "@/components/ui/label"

interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}

/**
 * Structural wrapper only — it does NOT clone props onto `children`. The
 * caller wires `id={id}` and `aria-describedby={error ? \`${id}-error\` : undefined}`
 * directly on their own Input/Select/Textarea. More typing per field, but
 * no risk of a prop-injection trick silently failing to connect the label,
 * control and error message for a screen reader.
 */
export function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
        {!required && <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}
