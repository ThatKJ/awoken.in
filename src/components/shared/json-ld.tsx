"use client"

import { usePathname } from "next/navigation"

const baseUrl = "https://awoken.in"

export function JsonLd() {
  const pathname = usePathname()
  const url = `${baseUrl}${pathname}`

  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#organization`,
    name: "Awoken",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}/og-image.png`,
    description:
      "Business Intelligence & Implementation Consultancy. We help businesses identify operational bottlenecks, prioritize improvements, and implement AI systems that solve real problems.",
    foundingDate: "2025",
    email: "contact@awoken.in",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "",
      contactType: "customer service",
      email: "contact@awoken.in",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.linkedin.com/company/awoken-in/about/",
    ],
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Awoken",
    description:
      "Business Intelligence & Implementation Consultancy. AI-powered lead recovery and operational automation.",
    publisher: { "@id": `${baseUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: pathname === "/" ? "Awoken | AI Revenue Recovery for Local Businesses" : undefined,
    description:
      "Awoken helps businesses recover lost revenue through AI-powered lead qualification, instant follow-up, appointment booking, CRM automation, and business intelligence.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        ...(pathname !== "/"
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: pathname
                  .replace(/^\//, "")
                  .replace(/\//g, " › ")
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c: string) => c.toUpperCase()),
                item: url,
              } as const,
            ]
          : []),
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
    </>
  )
}
