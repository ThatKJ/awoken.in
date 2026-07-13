import type { ReactNode } from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/admin/header"
import { ClientNav } from "@/components/admin/client-nav"

export default async function ClientProfileLayout({ children, params }: { children: ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-dvh bg-background">
      <Sidebar />
      <div className="pl-16 lg:pl-64 transition-all duration-300">
        <Header />
        <div className="flex">
          <ClientNav clientId={id} />
          <main className="flex-1 p-6 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
