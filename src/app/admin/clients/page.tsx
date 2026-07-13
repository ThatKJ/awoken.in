"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, ArrowUpDown } from "lucide-react"

const clients = [
  { id: "1", name: "Sunrise Dental", industry: "Healthcare", status: "Implementation", health: 82, consultant: "AK", email: "info@sunrisedental.com" },
  { id: "2", name: "Oakridge Realty", industry: "Real Estate", status: "Audit Completed", health: 74, consultant: "AK", email: "hello@oakridge.com" },
  { id: "3", name: "FitZone Gym", industry: "Fitness", status: "Optimization", health: 91, consultant: "AK", email: "info@fitzone.in" },
  { id: "4", name: "Maple Healthcare", industry: "Healthcare", status: "Discovery", health: 65, consultant: "AK", email: "contact@maplehealth.com" },
  { id: "5", name: "Bright Future Academy", industry: "Education", status: "Proposal", health: 78, consultant: "AK", email: "info@bfacademy.com" },
  { id: "6", name: "Pinnacle Services", industry: "Professional Services", status: "Implementation", health: 88, consultant: "AK", email: "hello@pinnacle.in" },
  { id: "7", name: "Green Valley Clinic", industry: "Healthcare", status: "Discovery", health: 58, consultant: "AK", email: "info@greenvalley.com" },
  { id: "8", name: "Elite Fitness Studio", industry: "Fitness", status: "Audit Completed", health: 71, consultant: "AK", email: "contact@elitefitness.in" },
]

export default function ClientsPage() {
  const [search, setSearch] = useState("")

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">{clients.length} total clients</p>
        </div>
        <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        />
      </div>

      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">
                  <div className="flex items-center gap-1">
                    Company <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Industry</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Health</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Consultant</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <Link href={`/admin/clients/${client.id}`} className="text-sm font-medium hover:text-primary transition-colors">
                        {client.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{client.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{client.industry}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary font-medium">
                      {client.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-surface overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${client.health}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold">{client.health}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground hidden md:table-cell">{client.consultant}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View
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
