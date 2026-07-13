import { ActivityFeed } from "@/components/admin/activity-feed"
import { StatsCard } from "@/components/admin/stats-card"
import { TrendingUp, AlertTriangle, Target, Calendar, ListChecks } from "lucide-react"

export default async function ClientOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-lg font-bold text-primary">
              SD
            </div>
            <div>
              <h1 className="text-xl font-bold">Sunrise Dental</h1>
              <p className="text-sm text-muted-foreground">Healthcare &middot; Implemented since Jan 2026</p>
            </div>
          </div>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full bg-green-50 text-green-700 font-medium">
          Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Health Score" value="82" change="+4 this quarter" positive icon={TrendingUp} />
        <StatsCard label="Open Risks" value="3" change="2 high priority" positive={false} icon={AlertTriangle} />
        <StatsCard label="Opportunities" value="7" change="3 ready to implement" positive icon={Target} />
        <StatsCard label="Next Meeting" value="Jul 18" change="Strategy Review" positive icon={Calendar} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-background p-5">
            <h3 className="text-sm font-semibold mb-4">Business Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sunrise Dental is a multi-location dental practice serving 500+ patients monthly.
              They struggle with appointment no-shows, manual patient intake, and fragmented
              communication between locations. Awoken deployed an AI receptionist and automated
              reminder system that reduced no-shows by 40% in the first quarter.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-5">
            <h3 className="text-sm font-semibold mb-4">Open Tasks</h3>
            <div className="space-y-3">
              {[
                { task: "Review audit findings for Q3", due: "Jul 15", priority: "High" },
                { task: "Prepare optimization proposal", due: "Jul 20", priority: "Medium" },
                { task: "Schedule quarterly review meeting", due: "Jul 25", priority: "Low" },
              ].map((t) => (
                <div key={t.task} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <ListChecks className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t.task}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{t.due}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      t.priority === "High" ? "bg-red-50 text-red-700" :
                      t.priority === "Medium" ? "bg-yellow-50 text-yellow-700" :
                      "bg-gray-50 text-gray-700"
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ActivityFeed />
      </div>
    </div>
  )
}
