import { Section } from "@/components/shared/section"
import { SectionHeader } from "@/components/shared/section-header"
import { Database, Sparkles, Users2, Check, Clock } from "lucide-react"

const availableNow = ["Import an old lead list from a CSV export", "WhatsApp follow-up and qualification conversations", "Qualified prospects handed back to your sales team"]

const onTheRoadmap = ["Direct CRM integrations", "Portal and ad-platform lead sync"]

export function CrmCompatibility() {
  return (
    <Section id="crm" className="bg-background scroll-mt-16 lg:scroll-mt-20">
      <SectionHeader
        eyebrow="Do I need to replace my CRM?"
        title="Keep your CRM."
        description="Awoken isn't another dashboard your sales team has to maintain. It works as a follow-up layer alongside your existing workflow."
      />

      <div className="mx-auto max-w-4xl">
        {/* Diagram */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <DiagramNode icon={Database} label="Your CRM" />
          <span className="text-xl text-border font-light" aria-hidden="true">
            +
          </span>
          <DiagramNode icon={Sparkles} label="Awoken follow-up" accent />
          <span className="text-xl text-border font-light rotate-90 sm:rotate-0" aria-hidden="true">
            →
          </span>
          <DiagramNode icon={Users2} label="Your sales team" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-xl border border-border bg-background-alt p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
              Available now
            </p>
            <ul className="space-y-2.5">
              {availableNow.map((item) => (
                <li key={item} className="text-sm text-muted-foreground leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-background-alt p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <Clock className="h-4 w-4 text-muted-foreground" />
              On the roadmap
            </p>
            <ul className="space-y-2.5">
              {onTheRoadmap.map((item) => (
                <li key={item} className="text-sm text-muted-foreground leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

function DiagramNode({ icon: Icon, label, accent }: { icon: React.ElementType; label: string; accent?: boolean }) {
  return (
    <div
      className={
        "flex items-center gap-2.5 rounded-full border px-4 py-2.5 " +
        (accent ? "border-accent/30 bg-accent-light text-accent" : "border-border bg-background text-foreground")
      }
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.25} />
      <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
    </div>
  )
}
