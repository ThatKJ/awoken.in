import { Hero } from "@/components/home/hero"
import { Framework } from "@/components/home/framework"
import { WhatWeSolve } from "@/components/home/what-we-solve"
import { Industries } from "@/components/home/industries"
import { WhyAwoken } from "@/components/home/why-awoken"
import { IntelligenceReport } from "@/components/home/intelligence-report"
import { Examples } from "@/components/home/examples"
import { WhyCompare } from "@/components/home/why-compare"
import { Process } from "@/components/home/process"
import { FinalCTA } from "@/components/home/final-cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Framework />
      <WhatWeSolve />
      <WhyAwoken />
      <Industries />
      <IntelligenceReport />
      <Examples />
      <WhyCompare />
      <Process />
      <FinalCTA />
    </>
  )
}
