import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const audits = [
  { client: "Sunrise Dental", industry: "Healthcare", status: "Completed", date: "Jun 2026", score: 82, findings: 12 },
  { client: "Oakridge Realty", industry: "Real Estate", status: "Completed", date: "May 2026", score: 74, findings: 9 },
  { client: "FitZone Gym", industry: "Fitness", status: "Completed", date: "Jun 2026", score: 91, findings: 7 },
  { client: "Maple Healthcare", industry: "Healthcare", status: "In Progress", date: "Jul 2026", score: null, findings: null },
  { client: "Bright Future Academy", industry: "Education", status: "Scheduled", date: "Aug 2026", score: null, findings: null },
]

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Business Audits</h1>
          <p className="text-sm text-muted-foreground mt-1">Systematic evaluation of client operations</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Client</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Industry</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Score</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {audits.map((a) => (
                <tr key={a.client} className="hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium">{a.client}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{a.industry}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      a.status === "Completed" ? "bg-green-50 text-green-700" :
                      a.status === "In Progress" ? "bg-yellow-50 text-yellow-700" :
                      "bg-gray-50 text-gray-700"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm">{a.date}</td>
                  <td className="px-5 py-4 text-sm font-semibold">
                    {a.score !== null ? a.score : "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={a.status === "Completed" ? "#" : "#"} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      {a.status === "Completed" ? "View" : "Upcoming"} <ArrowUpRight className="h-3 w-3" />
                    </Link>
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
