import { Hero } from "@/components/marketing/hero"
import { LeadLeak } from "@/components/marketing/lead-leak"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { WhatsAppDemo } from "@/components/marketing/whatsapp-demo"
import { CrmCompatibility } from "@/components/marketing/crm-compatibility"
import { PilotTeaser } from "@/components/marketing/pilot-teaser"
import { PageViewTracker } from "@/components/analytics/page-view-tracker"

export default function HomePage() {
  return (
    <>
      <PageViewTracker event="homepage_view" />
      <Hero />
      <LeadLeak />
      <HowItWorks />
      <WhatsAppDemo />
      <CrmCompatibility />
      <PilotTeaser />
    </>
  )
}
