import { StatsCard } from "@/components/admin/stats-card"
import { ActivityFeed } from "@/components/admin/activity-feed"
import { Users, Building2, FileCheck, TrendingUp, Calendar, ClipboardList } from "lucide-react"

const stats = [
  { label: "Total Clients", value: "18", change: "+3 this month", positive: true, icon: Building2 },
  { label: "Active Projects", value: "12", change: "4 in progress", positive: true, icon: ClipboardList },
  { label: "Audits Completed", value: "42", change: "+8 this quarter", positive: true, icon: FileCheck },
  { label: "Monthly Revenue", value: "₹4.2L", change: "+18% vs last month", positive: true, icon: TrendingUp },
  { label: "Pending Tasks", value: "23", change: "7 overdue", positive: false, icon: ClipboardList },
  { label: "Upcoming Meetings", value: "8", change: "Next: Tomorrow 10 AM", positive: true, icon: Calendar },
]

const recentClients = [
  { name: "Sunrise Dental", industry: "Healthcare", status: "Implementation", score: "82" },
  { name: "Oakridge Realty", industry: "Real Estate", status: "Audit Completed", score: "74" },
  { name: "FitZone Gym", industry: "Fitness", status: "Optimization", score: "91" },
  { name: "Maple Healthcare", industry: "Healthcare", status: "Discovery", score: "65" },
  { name: "Bright Future Academy", industry: "Education", status: "Proposal", score: "78" },
  { name: "Pinnacle Services", industry: "Professional Services", status: "Implementation", score: "88" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back. Here&apos;s your practice overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-background">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold">Recent Clients</h3>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {recentClients.map((client) => (
                <div key={client.name} className="flex items-center justify-between p-4 hover:bg-surface/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.industry}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary font-medium">
                      {client.status}
                    </span>
                    <span className="text-sm font-semibold">{client.score}</span>
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
