"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Lightbulb,
  FolderKanban,
  Calendar,
  File,
  Receipt,
  Timeline,
  Notebook,
  ListChecks,
  Settings,
} from "lucide-react"

interface ClientNavProps {
  clientId: string
}

const items = [
  { label: "Overview", href: "", icon: LayoutDashboard },
  { label: "Business Audit", href: "/audit", icon: ClipboardList },
  { label: "Intelligence Report", href: "/report", icon: FileText },
  { label: "Recommendations", href: "/recommendations", icon: Lightbulb },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Meetings", href: "/meetings", icon: Calendar },
  { label: "Documents", href: "/documents", icon: File },
  { label: "Invoices", href: "/invoices", icon: Receipt },
  { label: "Timeline", href: "/timeline", icon: Timeline },
  { label: "Notes", href: "/notes", icon: Notebook },
  { label: "Tasks", href: "/tasks", icon: ListChecks },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function ClientNav({ clientId }: ClientNavProps) {
  const pathname = usePathname()
  const base = `/admin/clients/${clientId}`

  return (
    <aside className="w-56 shrink-0 border-r border-border hidden lg:block">
      <nav className="py-4 space-y-1 sticky top-0">
        {items.map((item) => {
          const href = item.href ? `${base}${item.href}` : base
          const active = pathname === href
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                "flex items-center gap-3 mx-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
