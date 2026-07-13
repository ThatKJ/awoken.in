const projects = [
  { name: "AI Receptionist Deployment", status: "In Progress", progress: 75, deadline: "Jul 30" },
  { name: "Patient Intake Digitization", status: "Completed", progress: 100, deadline: "Jun 15" },
  { name: "Automated Reminder System", status: "Completed", progress: 100, deadline: "May 20" },
  { name: "CRM Implementation", status: "Pending", progress: 0, deadline: "Sep 01" },
]

export default function ClientProjectsPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          New Project
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.name} className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">{p.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                p.status === "Completed" ? "bg-green-50 text-green-700" :
                p.status === "In Progress" ? "bg-yellow-50 text-yellow-700" :
                "bg-gray-50 text-gray-700"
              }`}>{p.status}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{p.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Deadline: {p.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
