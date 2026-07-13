const timeline = [
  { event: "Q3 Optimization Begins", date: "Jul 01, 2026", type: "milestone", description: "Starting AI receptionist enhancement phase" },
  { event: "AI Receptionist Deployed", date: "May 15, 2026", type: "milestone", description: "Successfully deployed AI voice agent for appointment booking" },
  { event: "Implementation Phase Starts", date: "Mar 01, 2026", type: "phase", description: "Beginning implementation of recommended solutions" },
  { event: "Audit Completed", date: "Feb 28, 2026", type: "milestone", description: "Business audit delivered with 12 findings and 8 recommendations" },
  { event: "Discovery Phase", date: "Jan 10, 2026", type: "phase", description: "Initial discovery calls and data gathering" },
  { event: "Engagement Started", date: "Jan 05, 2026", type: "start", description: "Service agreement signed" },
]

export default function ClientTimelinePage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Timeline</h1>

      <div className="relative pl-6 border-l-2 border-border space-y-6">
        {timeline.map((t) => (
          <div key={t.event} className="relative">
            <div className={`absolute -left-[25px] w-3 h-3 rounded-full border-2 border-background ${
              t.type === "milestone" ? "bg-primary" :
              t.type === "phase" ? "bg-accent" :
              t.type === "start" ? "bg-green-500" :
              "bg-muted-foreground"
            }`} />
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold">{t.event}</h3>
                <span className="text-xs text-muted-foreground">{t.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
