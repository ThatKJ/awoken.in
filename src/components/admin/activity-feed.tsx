const activities = [
  { type: "audit", title: "Business Audit completed", client: "Sunrise Dental", time: "2 hours ago" },
  { type: "meeting", title: "Discovery Call held", client: "Oakridge Realty", time: "4 hours ago" },
  { type: "project", title: "Phase 1 deployed", client: "FitZone Gym", time: "1 day ago" },
  { type: "note", title: "Audit notes added", client: "Maple Healthcare", time: "1 day ago" },
  { type: "task", title: "Proposal sent for review", client: "Bright Future Academy", time: "2 days ago" },
]

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-background">
      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-semibold">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-3 p-4">
            <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activity.client} &middot; {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
