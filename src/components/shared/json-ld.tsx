const baseUrl = "https://www.awoken.in"

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#organization`,
    name: "Awoken",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}/og-image.svg`,
    description:
      "Business Intelligence & AI Implementation Consultancy. We find the hidden bottlenecks costing you revenue.",
    foundingDate: "2025",
    email: "contact@awoken.in",
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
      "Business Intelligence & AI Implementation Consultancy.",
    publisher: { "@id": `${baseUrl}/#organization` },
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
    </>
  )
}
