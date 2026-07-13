"use client"

import { Bell } from "lucide-react"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
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
