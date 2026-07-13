const meetings = [
  { title: "Strategy Review", client: "Sunrise Dental", date: "Jul 18, 2026", time: "10:00 AM", type: "Quarterly" },
  { title: "Discovery Call", client: "Green Valley Clinic", date: "Jul 19, 2026", time: "2:00 PM", type: "Discovery" },
  { title: "Proposal Review", client: "Bright Future Academy", date: "Jul 22, 2026", time: "11:00 AM", type: "Proposal" },
  { title: "Optimization Check-in", client: "FitZone Gym", date: "Jul 24, 2026", time: "3:00 PM", type: "Review" },
  { title: "Audit Presentation", client: "Oakridge Realty", date: "Jul 28, 2026", time: "10:30 AM", type: "Audit" },
]

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meetings</h1>
        <p className="text-sm text-muted-foreground mt-1">{meetings.length} upcoming meetings</p>
      </div>

      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Meeting</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Client</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Time</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {meetings.map((m) => (
                <tr key={m.title} className="hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium">{m.title}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{m.client}</td>
                  <td className="px-5 py-4 text-sm">{m.date}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{m.time}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary font-medium">{m.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
