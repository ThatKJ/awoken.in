"use client"

import { useState } from "react"
import { Search, FileText, Users, FolderKanban, Calendar } from "lucide-react"
import Link from "next/link"

const allData = [
  { type: "Client", label: "Sunrise Dental", href: "/admin/clients/1", icon: Users },
  { type: "Client", label: "Oakridge Realty", href: "/admin/clients/2", icon: Users },
  { type: "Client", label: "FitZone Gym", href: "/admin/clients/3", icon: Users },
  { type: "Client", label: "Maple Healthcare", href: "/admin/clients/4", icon: Users },
  { type: "Client", label: "Bright Future Academy", href: "/admin/clients/5", icon: Users },
  { type: "Client", label: "Pinnacle Services", href: "/admin/clients/6", icon: Users },
  { type: "Project", label: "AI Receptionist Deployment", href: "/admin/projects", icon: FolderKanban },
  { type: "Project", label: "Lead Qualification System", href: "/admin/projects", icon: FolderKanban },
  { type: "Project", label: "Member Retention Platform", href: "/admin/projects", icon: FolderKanban },
  { type: "Meeting", label: "Strategy Review with Sunrise Dental", href: "/admin/meetings", icon: Calendar },
  { type: "Meeting", label: "Discovery Call with Green Valley Clinic", href: "/admin/meetings", icon: Calendar },
  { type: "Audit", label: "Sunrise Dental Audit Report", href: "/admin/audit", icon: FileText },
  { type: "Audit", label: "Oakridge Realty Audit Report", href: "/admin/audit", icon: FileText },
]

export default function SearchPage() {
  const [query, setQuery] = useState("")

  const results = query
    ? allData.filter((d) => d.label.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search</h1>
        <p className="text-sm text-muted-foreground mt-1">Search across clients, projects, meetings, and audits</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          autoFocus
        />
      </div>

      {query && (
        <div className="space-y-2">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No results found</p>
          ) : (
            results.map((r) => {
              const Icon = r.icon
              return (
                <Link
                  key={r.label}
                  href={r.href}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.type}</p>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
