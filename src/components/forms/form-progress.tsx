const STEP_LABELS = ["Your company", "Your lead pipeline", "Contact"]

export function FormProgress({ step, total }: { step: number; total: number }) {
  const percent = (step / total) * 100
  return (
    <div className="mb-8" aria-hidden="false">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span>
          Step {step} of {total} — {STEP_LABELS[step - 1]}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Step ${step} of ${total}`}
        />
      </div>
    </div>
  )
}
