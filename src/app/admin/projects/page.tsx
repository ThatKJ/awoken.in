const projects = [
  { name: "AI Receptionist Deployment", client: "Sunrise Dental", status: "In Progress", progress: 75, deadline: "Jul 30" },
  { name: "Lead Qualification System", client: "Oakridge Realty", status: "Audit", progress: 30, deadline: "Aug 15" },
  { name: "Member Retention Platform", client: "FitZone Gym", status: "Optimization", progress: 95, deadline: "Jul 10" },
  { name: "Patient Intake Automation", client: "Maple Healthcare", status: "Discovery", progress: 15, deadline: "Aug 01" },
  { name: "Enrollment System", client: "Bright Future Academy", status: "Review", progress: 60, deadline: "Jul 25" },
  { name: "ERP Dashboard", client: "Pinnacle Services", status: "In Progress", progress: 45, deadline: "Aug 20" },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">{projects.length} active projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.name} className="rounded-xl border border-border bg-background p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{project.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{project.client}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary font-medium shrink-0">
                {project.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Deadline: {project.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
