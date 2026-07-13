const stats = [
  { label: "Industries Served", value: "6" },
  { label: "Avg Health Score", value: "76" },
  { label: "Projects Completed", value: "28" },
  { label: "Success Rate", value: "94%" },
  { label: "Total Revenue", value: "₹12.8L" },
  { label: "Hours Saved (est.)", value: "2,400+" },
]

const bottlenecks = [
  { name: "Manual Data Entry", count: 14 },
  { name: "Slow Lead Response", count: 11 },
  { name: "Missed Follow-ups", count: 9 },
  { name: "Disconnected Systems", count: 8 },
  { name: "Admin Overhead", count: 7 },
]

const solutions = [
  { name: "AI Receptionist", count: 12 },
  { name: "CRM Automation", count: 10 },
  { name: "Lead Qualification", count: 8 },
  { name: "ERP Dashboard", count: 6 },
  { name: "Customer Support", count: 5 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Practice-wide insights and metrics</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background p-4 text-center">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Most Common Bottlenecks</h3>
          <div className="space-y-3">
            {bottlenecks.map((b) => (
              <div key={b.name} className="flex items-center justify-between">
                <span className="text-sm">{b.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${(b.count / 14) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold w-6 text-right">{b.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Most Recommended Solutions</h3>
          <div className="space-y-3">
            {solutions.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="text-sm">{s.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(s.count / 12) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold w-6 text-right">{s.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
