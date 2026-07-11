import { Hero } from "@/components/home/hero"
import { PoweredBy } from "@/components/home/powered-by"
import { BusinessOutcomes } from "@/components/home/business-outcomes"
import { RevenueCalculator } from "@/components/home/revenue-calculator"
import { ProblemsGrid } from "@/components/home/problems-grid"
import { SolutionBlueprints } from "@/components/home/solution-blueprints"
import { WhyAwoken } from "@/components/home/why-awoken"
import { WorkflowDiagram } from "@/components/home/workflow-diagram"
import { ImplementationTimeline } from "@/components/home/implementation-timeline"
import { IndustriesGrid } from "@/components/home/industries-grid"
import { IntegrationEcosystem } from "@/components/home/integration-ecosystem"
import { LiveDemo } from "@/components/home/live-demo"
import { EngagementModels } from "@/components/home/engagement-models"
import { ExampleSolutions } from "@/components/home/example-solutions"
import { WhyProjectsFail } from "@/components/home/why-projects-fail"
import { WhoWeWorkWith } from "@/components/home/who-we-work-with"
import { FAQSection } from "@/components/home/faq-section"
import { FounderPhilosophy } from "@/components/home/founder-philosophy"
import { FinalCTA } from "@/components/home/final-cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <PoweredBy />
      <BusinessOutcomes />
      <RevenueCalculator />
      <ProblemsGrid />
      <SolutionBlueprints />
      <WhyAwoken />
      <WorkflowDiagram />
      <ImplementationTimeline />
      <IndustriesGrid />
      <IntegrationEcosystem />
      <LiveDemo />
      <EngagementModels />
      <ExampleSolutions />
      <WhyProjectsFail />
      <WhoWeWorkWith />
      <FAQSection />
      <FounderPhilosophy />
      <FinalCTA />
    </>
  )
}
