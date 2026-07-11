import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { resources } from "@/data/resources"
import { BookOpen, FileText, Download, ClipboardCheck, Calculator, Map } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources — AI Playbooks, Guides & Templates",
  description: "AI Playbooks, Automation Guides, Workflow Templates, Revenue Calculators and more to help your business grow.",
}

const typeIcons: Record<string, React.ReactNode> = {
  playbook: <BookOpen className="h-5 w-5" />,
  guide: <FileText className="h-5 w-5" />,
  template: <Download className="h-5 w-5" />,
  checklist: <ClipboardCheck className="h-5 w-5" />,
  calculator: <Calculator className="h-5 w-5" />,
}

export default function ResourcesPage() {
  return (
    <>
      <section className="pt-[140px] pb-24">
        <Container>
          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              Resources
            </h1>
            <p className="mt-4 text-[20px] text-muted-foreground leading-relaxed max-w-[650px]">
              AI playbooks, automation guides, workflow templates, and revenue calculators to help you understand what's possible.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="rounded-xl border border-border p-8 flex flex-col h-full hover:shadow-lg transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-6 shrink-0">
                  {typeIcons[resource.type]}
                </div>
                <div className="mb-5 min-h-[80px]">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    {resource.type}
                  </p>
                  <h3 className="text-lg font-semibold">{resource.title}</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed flex-1">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
