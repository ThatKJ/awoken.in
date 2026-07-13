import { StatsCard } from "@/components/admin/stats-card"
import { ActivityFeed } from "@/components/admin/activity-feed"
import { TrendingUp, AlertTriangle, Target, Shield } from "lucide-react"

const sections = [
  { area: "Operations", score: 85, strengths: ["Appointment scheduling streamlined", "Patient intake digitized"], gaps: ["Inventory management manual", "No vendor portal"] },
  { area: "Technology", score: 70, strengths: ["Cloud POS deployed", "Basic website present"], gaps: ["No CRM system", "Legacy accounting software", "No mobile app"] },
  { area: "Marketing", score: 78, strengths: ["Active social media presence", "Google Business optimized"], gaps: ["No lead scoring", "Manual campaign management", "No analytics tracking"] },
  { area: "Customer Experience", score: 88, strengths: ["High satisfaction scores", "Quick response times"], gaps: ["No loyalty program", "Limited self-service options"] },
  { area: "Finance", score: 65, strengths: ["Clean bookkeeping"], gaps: ["Manual invoicing", "No cash flow forecasting", "Expense tracking fragmented"] },
]

export default function AuditDetailPage({ params: _params }: { params: Promise<{ id: string }> }) {
  const overall = Math.round(sections.reduce((acc, s) => acc + s.score, 0) / sections.length)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Business Audit</h1>
        <p className="text-sm text-muted-foreground mt-1">Sunrise Dental &middot; Completed June 2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Overall Score" value={overall.toString()} change="+5 since last audit" positive icon={Shield} />
        <StatsCard label="Strengths" value={sections.reduce((acc, s) => acc + s.strengths.length, 0).toString()} change="areas performing well" positive icon={TrendingUp} />
        <StatsCard label="Gaps Identified" value={sections.reduce((acc, s) => acc + s.gaps.length, 0).toString()} change="areas to address" positive={false} icon={AlertTriangle} />
        <StatsCard label="Recommendations" value={(sections.reduce((acc, s) => acc + s.gaps.length, 0) + 3).toString()} change="ready for review" positive icon={Target} />
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const maxGaps = Math.max(...sections.map((s) => s.gaps.length))
          return (
            <div key={section.area} className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">{section.area}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${section.score}%` }} />
                  </div>
                  <span className="text-sm font-bold">{section.score}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-green-600 mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {section.strengths.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-accent mb-2">Gaps</p>
                  <ul className="space-y-1">
                    {section.gaps.map((g) => (
                      <li key={g} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
