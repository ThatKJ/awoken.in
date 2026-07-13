const notes = [
  { title: "Call Notes - Jul 12", content: "Client expressed interest in expanding AI receptionist to handle insurance verification. Follow up with technical team.", date: "Jul 12, 2026", author: "AK" },
  { title: "Strategy Session Notes", content: "Discussed Q3 priorities: CRM integration, website revamp, and automated review collection.", date: "Jul 05, 2026", author: "AK" },
  { title: "Initial Discovery Notes", content: "Key pain points: missed calls during lunch hours, double booking issues, manual patient intake taking 15+ mins per patient.", date: "Jan 15, 2026", author: "AK" },
]

export default function ClientNotesPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
        <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          Add Note
        </button>
      </div>

      <div className="space-y-3">
        {notes.map((n) => (
          <div key={n.title} className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold">{n.title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{n.date}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{n.author}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
