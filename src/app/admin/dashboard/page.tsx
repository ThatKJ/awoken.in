import { ActivityFeed } from "@/components/admin/activity-feed"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome to Awoken OS</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your business intelligence and AI consulting operating system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-background p-8 text-center">
            <div className="max-w-sm mx-auto space-y-4">
              <h2 className="text-lg font-semibold">Get Started</h2>
              <p className="text-sm text-muted-foreground">
                Add your first client to begin running business audits, tracking
                projects, and managing AI consulting engagements.
              </p>
              <a
                href="/admin/clients"
                className="inline-flex h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors items-center gap-2"
              >
                View Clients
              </a>
            </div>
          </div>
        </div>
        <ActivityFeed />
      </div>
    </div>
  )
}
