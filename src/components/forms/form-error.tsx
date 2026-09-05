import { AlertTriangle } from "lucide-react"

/** Submit-level failure banner — field-level errors render inline via FormField instead. */
export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3.5"
    >
      <AlertTriangle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
      <p className="text-sm text-destructive">{message}</p>
    </div>
  )
}
