"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FolderKanban,
  Calendar,
  ClipboardList,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Audit", href: "/admin/audit", icon: ClipboardList },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Meetings", href: "/admin/meetings", icon: Calendar },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-background border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn("flex items-center h-16 border-b border-border shrink-0", collapsed ? "justify-center px-0" : "px-6")}>
        {collapsed ? (
          <Image
            src="/icon.svg"
            alt="Awoken"
            width={28}
            height={28}
            className="shrink-0"
          />
        ) : (
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Image
              src="/icon.svg"
              alt="Awoken"
              width={28}
              height={28}
              className="shrink-0"
            />
            <span className="font-bold text-base tracking-tight">Awoken OS</span>
          </Link>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 mx-2 py-2.5 rounded-lg text-sm font-medium transition-colors",
                collapsed ? "justify-center px-0" : "px-3",
                active
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border py-3 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center gap-3 mx-2 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface transition-colors w-full",
            collapsed ? "justify-center px-0" : "px-3"
          )}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <svg className={cn("h-5 w-5 shrink-0 transition-transform", !collapsed && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
