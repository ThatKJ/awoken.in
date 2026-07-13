export default function ClientReportPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Intelligence Report</h1>

      <div className="rounded-xl border border-border bg-background p-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          This report synthesizes findings from the business audit into an actionable intelligence brief.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-background p-5 space-y-4">
        <h2 className="text-sm font-semibold">Executive Summary</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The client operates in a competitive landscape with moderate digital maturity. 
          Key opportunities exist in operational automation, customer experience enhancement, 
          and data-driven decision making. Priority recommendations focus on high-impact, 
          low-effort improvements to build momentum.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Digital Maturity", value: "Intermediate" },
          { label: "Competitive Position", value: "Strong" },
          { label: "Growth Potential", value: "High" },
          { label: "AI Readiness", value: "Moderate" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-sm font-semibold mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
