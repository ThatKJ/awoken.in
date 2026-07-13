const invoices = [
  { number: "INV-2026-0042", description: "Q3 Retainer - AI Implementation", amount: "₹1,85,000", status: "Paid", date: "Jul 01, 2026" },
  { number: "INV-2026-0031", description: "Q2 Retainer - Audit Phase", amount: "₹1,50,000", status: "Paid", date: "Apr 01, 2026" },
  { number: "INV-2026-0019", description: "Q1 Retainer - Discovery", amount: "₹75,000", status: "Paid", date: "Jan 05, 2026" },
  { number: "INV-2026-0050", description: "Add-on - CRM Setup", amount: "₹45,000", status: "Pending", date: "Jul 10, 2026" },
]

export default function ClientInvoicesPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>

      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Invoice</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Description</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.number} className="hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium">{inv.number}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{inv.description}</td>
                  <td className="px-5 py-4 text-sm">{inv.amount}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{inv.date}</td>
                  <td className="px-5 py-4 text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      inv.status === "Paid" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }`}>{inv.status}</span>
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
