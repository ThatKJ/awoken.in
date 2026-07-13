const documents = [
  { name: "Business Audit Report Q2 2026", type: "PDF", date: "Jun 30, 2026", size: "2.4 MB" },
  { name: "Client Onboarding Deck", type: "PDF", date: "Jan 10, 2026", size: "5.1 MB" },
  { name: "Proposal - AI Receptionist", type: "PDF", date: "Feb 15, 2026", size: "1.8 MB" },
  { name: "Monthly Performance Report", type: "PDF", date: "Jul 05, 2026", size: "3.2 MB" },
  { name: "Contract - Services Agreement", type: "PDF", date: "Jan 05, 2026", size: "0.5 MB" },
]

export default function ClientDocumentsPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          Upload
        </button>
      </div>

      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {documents.map((d) => (
                <tr key={d.name} className="hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium">{d.name}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{d.type}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{d.date}</td>
                  <td className="px-5 py-4 text-sm text-right text-muted-foreground">{d.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
