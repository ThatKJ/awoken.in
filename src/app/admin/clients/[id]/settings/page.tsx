export default function ClientSettingsPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Client Settings</h1>

      <div className="rounded-xl border border-border bg-background p-5 space-y-4">
        <div>
          <label className="text-sm font-semibold">Client Name</label>
          <p className="text-sm text-muted-foreground mt-1">Sunrise Dental</p>
        </div>
        <div>
          <label className="text-sm font-semibold">Industry</label>
          <p className="text-sm text-muted-foreground mt-1">Healthcare</p>
        </div>
        <div>
          <label className="text-sm font-semibold">Email</label>
          <p className="text-sm text-muted-foreground mt-1">info@sunrisedental.com</p>
        </div>
        <div>
          <label className="text-sm font-semibold">Status</label>
          <p className="text-sm text-muted-foreground mt-1">Active</p>
        </div>
      </div>
    </div>
  )
}
