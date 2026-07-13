export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-background">
      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-semibold">Recent Activity</h3>
      </div>
      <div className="p-8 text-center">
        <p className="text-sm text-muted-foreground">No recent activity</p>
        <p className="text-xs text-muted-foreground mt-1">
          Activity will appear as you work with clients.
        </p>
      </div>
    </div>
  )
}
