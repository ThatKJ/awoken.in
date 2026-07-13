const meetings = [
  { title: "Quarterly Strategy Review", date: "Jul 18, 2026", time: "10:00 AM", type: "Quarterly", notes: "Review Q2 performance and plan Q3 initiatives" },
  { title: "Implementation Check-in", date: "Jul 05, 2026", time: "2:00 PM", type: "Check-in", notes: "AI receptionist deployment progress update" },
  { title: "Kickoff Meeting", date: "Jan 10, 2026", time: "11:00 AM", type: "Kickoff", notes: "Initial engagement kickoff and scope finalization" },
]

export default function ClientMeetingsPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Meetings</h1>

      <div className="space-y-3">
        {meetings.map((m) => (
          <div key={m.title} className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold">{m.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{m.date} at {m.time}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary font-medium">{m.type}</span>
            </div>
            <p className="text-sm text-muted-foreground">{m.notes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
