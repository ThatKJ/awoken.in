import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { resources } from "@/data/resources"
import { BookOpen, FileText, Download, ClipboardCheck, Calculator, Map } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free operational assessment guides, workflow templates, checklists, and resources to help you identify bottlenecks and revenue leaks in your business.",
  openGraph: {
    title: "Resources | Awoken",
    description:
      "Free operational assessment guides, workflow templates, checklists, and resources to help you identify bottlenecks and revenue leaks in your business.",
    url: "https://awoken.in/resources",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Awoken Resources" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Awoken",
    description:
      "Free operational assessment guides, workflow templates, and resources to identify business bottlenecks.",
    images: ["/og-image.png"],
  },
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
      <Section size="hero">
          <div className="max-w-xl">
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Resources
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Guides, templates, and resources to help you identify operational bottlenecks and understand where technology can create value in your business.
            </p>
          </div>
      </Section>
      <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="rounded-xl border border-border p-6 lg:p-8 flex flex-col h-full hover:shadow-lg transition-all duration-200"
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
      </Section>
    </>
  )
}
