const tasks = [
  { task: "Review audit findings for Q3", assignee: "AK", due: "Jul 15", priority: "High", status: "In Progress" },
  { task: "Prepare optimization proposal", assignee: "AK", due: "Jul 20", priority: "Medium", status: "Pending" },
  { task: "Schedule quarterly review meeting", assignee: "AK", due: "Jul 25", priority: "Low", status: "Pending" },
  { task: "Send implementation report", assignee: "AK", due: "Jul 08", priority: "High", status: "Completed" },
  { task: "Update health score tracking", assignee: "AK", due: "Jul 05", priority: "Medium", status: "Completed" },
]

export default function ClientTasksPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          Add Task
        </button>
      </div>

      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Task</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Assignee</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Due</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Priority</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tasks.map((t) => (
                <tr key={t.task} className="hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium">{t.task}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{t.assignee}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{t.due}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      t.priority === "High" ? "bg-red-50 text-red-700" :
                      t.priority === "Medium" ? "bg-yellow-50 text-yellow-700" :
                      "bg-gray-50 text-gray-700"
                    }`}>{t.priority}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      t.status === "Completed" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }`}>{t.status}</span>
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
