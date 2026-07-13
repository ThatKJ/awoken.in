const recommendations = [
  { area: "AI Receptionist", impact: "High", effort: "Medium", description: "Deploy AI voice agent to handle appointment booking and FAQs 24/7", roi: "40% reduction in missed calls" },
  { area: "CRM Integration", impact: "High", effort: "Medium", description: "Unify customer data across platforms into a single CRM", roi: "30% improvement in lead conversion" },
  { area: "Automated Follow-ups", impact: "Medium", effort: "Low", description: "Automate post-appointment follow-ups and review requests", roi: "25% increase in repeat visits" },
  { area: "Analytics Dashboard", impact: "Medium", effort: "High", description: "Build real-time dashboard for key business metrics", roi: "Better data-driven decisions" },
  { area: "Mobile App", impact: "Low", effort: "High", description: "Customer-facing mobile app for self-service", roi: "Long-term retention tool" },
]

export default function RecommendationsPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Recommendations</h1>

      <div className="space-y-3">
        {recommendations.map((r) => (
          <div key={r.area} className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold">{r.area}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  r.impact === "High" ? "bg-green-50 text-green-700" :
                  r.impact === "Medium" ? "bg-yellow-50 text-yellow-700" :
                  "bg-gray-50 text-gray-700"
                }`}>{r.impact} Impact</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  r.effort === "Low" ? "bg-green-50 text-green-700" :
                  r.effort === "Medium" ? "bg-yellow-50 text-yellow-700" :
                  "bg-red-50 text-red-700"
                }`}>{r.effort} Effort</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{r.description}</p>
            <p className="text-xs text-primary mt-2 font-medium">Expected ROI: {r.roi}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
