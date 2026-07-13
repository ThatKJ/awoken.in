"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/admin/api/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="h-9 px-3 rounded-lg flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
            AK
          </div>
          <div className="text-sm leading-tight hidden sm:block">
            <p className="font-medium">Admin</p>
            <p className="text-muted-foreground text-xs">Awoken OS</p>
          </div>
        </div>
      </div>
    </header>
  )
}
