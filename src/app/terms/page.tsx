"use client"

import Link from "next/link"
import { LegalPage } from "@/components/shared/legal-page"
import type { LegalSection } from "@/components/shared/legal-page"

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <div className="space-y-4">
        <p>
          By accessing or using the Awoken website (<strong>awoken.in</strong>) or engaging our services, you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you should not use our website or services.
        </p>
        <p>
          These terms apply to all visitors, users, clients, and any other person or entity accessing our website or engaging our services. We reserve the right to update these terms at any time. Continued use of our website or services after changes constitutes acceptance of the updated terms.
        </p>
      </div>
    ),
  },
  {
    id: "use-of-website",
    title: "Use of Website",
    content: (
      <div className="space-y-4">
        <p>
          Our website is provided for informational purposes and to facilitate engagement with our services. You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the site.
        </p>
        <p>
          You may not:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use our website in any way that violates applicable laws or regulations</li>
          <li>Attempt to gain unauthorized access to any part of our website or systems</li>
          <li>Introduce malicious code, viruses, or any harmful technology</li>
          <li>Scrape, reproduce, or redistribute our content without written permission</li>
          <li>Impersonate any person or entity or misrepresent your affiliation</li>
        </ul>
      </div>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Website Content</h3>
        <p>
          All content on our website — including text, graphics, logos, icons, images, audio clips, software, and the overall design — is the property of Awoken or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or publicly display any content from our website without our prior written consent.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-4">Service Deliverables</h3>
        <p>
          Upon full payment for services rendered, you own the specific deliverables created for your business during the engagement. Awoken retains the right to use generalized methodologies, frameworks, and processes developed during the engagement, provided such use does not disclose your confidential information.
        </p>
      </div>
    ),
  },
  {
    id: "service-information",
    title: "Service Information",
    content: (
      <div className="space-y-4">
        <p>
          Awoken provides Business Intelligence consulting, AI implementation, workflow automation, and related services. The specific scope, deliverables, timeline, and investment for each engagement are defined in a separate proposal or service agreement signed by both parties. In the event of any conflict between these Terms &amp; Conditions and a signed service agreement, the signed agreement shall prevail.
        </p>
        <p>
          Our services include, but are not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Business Intelligence Audits</li>
          <li>AI Consulting and Strategy</li>
          <li>Workflow Automation</li>
          <li>CRM Integrations</li>
          <li>Lead Qualification Systems</li>
          <li>AI Assistants and Chatbots</li>
          <li>Business Dashboards and Reporting</li>
          <li>Custom Software Development</li>
        </ul>
      </div>
    ),
  },
  {
    id: "no-guarantees",
    title: "No Guarantees",
    content: (
      <div className="space-y-4">
        <p>
          Our services and advice are provided on a professional basis using reasonable skill and care. While we strive to deliver measurable improvements, we make no guarantees regarding specific business outcomes, revenue increases, cost savings, or performance improvements.
        </p>
        <p>
          Business outcomes depend on numerous factors beyond our control, including market conditions, team execution, competitive landscape, and the client&apos;s ability to implement recommended changes. Our proposals are based on our professional assessment at the time of engagement and should not be construed as binding predictions or guarantees.
        </p>
      </div>
    ),
  },
  {
    id: "business-consultation-disclaimer",
    title: "Business Consultation Disclaimer",
    content: (
      <div className="space-y-4">
        <p>
          The information provided during our consultations, on our website, and in our content is for general informational and educational purposes only. It does not constitute legal, financial, accounting, or tax advice.
        </p>
        <p>
          You should consult with qualified professionals regarding your specific legal, financial, and regulatory circumstances. Awoken does not provide legal or financial advisory services unless explicitly stated in a signed service agreement.
        </p>
      </div>
    ),
  },
  {
    id: "pricing-disclaimer",
    title: "Pricing Disclaimer",
    content: (
      <div className="space-y-4">
        <p>
          Pricing for our services is determined based on the specific scope and complexity of each engagement, as identified during the Business Intelligence Audit. Prices quoted in proposals are valid for the period stated in the proposal and are subject to change if the scope of work changes.
        </p>
        <p>
          We make every effort to ensure pricing information on our website is accurate, but we reserve the right to correct any errors and to change pricing at any time without prior notice.
        </p>
      </div>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <div className="space-y-4">
        <p>
          To the fullest extent permitted by applicable law:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Our services and website are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis</li>
          <li>We make no warranties, express or implied, regarding the performance of our services or website</li>
          <li>Our total liability for any claim arising from our services or website is limited to the fees paid by you for the specific engagement giving rise to the claim</li>
          <li>We shall not be liable for any indirect, incidental, consequential, or punitive damages, including lost profits, lost revenue, or business interruption</li>
          <li>This limitation applies regardless of the legal theory on which the claim is based, even if we have been advised of the possibility of such damages</li>
        </ul>
        <p>
          Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities, so some of the above limitations may not apply to you.
        </p>
      </div>
    ),
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    content: (
      <div className="space-y-4">
        <p>
          As a user of our website or client of our services, you agree to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide accurate and complete information when booking consultations or engaging our services</li>
          <li>Maintain the confidentiality of any access credentials or system access provided during engagements</li>
          <li>Cooperate reasonably in the delivery of services, including providing timely access to information and decision-making</li>
          <li>Use our services and website in compliance with all applicable laws and regulations</li>
        </ul>

        <h3 className="text-base sm:text-lg font-semibold text-foreground">Acceptable Use</h3>
        <p>
          You agree not to use our website or services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our systems. You agree not to attempt to gain unauthorized access to any part of our website, services, or related systems.
        </p>
      </div>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    content: (
      <div className="space-y-4">
        <p>
          Our website may contain links to third-party websites or services that are not owned or controlled by Awoken. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any third-party sites you visit.
        </p>
      </div>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <div className="space-y-4">
        <p>
          We treat all business information shared with us during consultations and engagements as confidential. We will not disclose your proprietary information to third parties without your consent, except as required by law.
        </p>
        <p>
          For detailed information about our confidentiality practices, please refer to the specific confidentiality provisions in your signed service agreement or NDA.
        </p>
      </div>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <div className="space-y-4">
        <p>
          We reserve the right to refuse service, terminate engagements, or suspend access to our website at our sole discretion, without prior notice, for conduct that we believe violates these terms or is harmful to our business, other clients, or third parties.
        </p>
        <p>
          In the event of termination of a paid engagement, the terms of the signed service agreement regarding cancellation, refunds, and post-termination obligations shall apply.
        </p>
      </div>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <div className="space-y-4">
        <p>
          These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of our website or services shall be subject to the exclusive jurisdiction of the courts in India.
        </p>
        <p>
          We make no representation that our website or services are appropriate or available for use in locations outside India. Those who access our website from other locations do so on their own initiative and are responsible for compliance with local laws.
        </p>
      </div>
    ),
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms",
    content: (
      <div className="space-y-4">
        <p>
          We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our website or services after changes are posted constitutes your acceptance of the modified terms.
        </p>
        <p>
          We encourage you to review these terms periodically. Material changes will be communicated through our website or via email where appropriate.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <div className="space-y-4">
        <p>
          If you have questions about these Terms &amp; Conditions, please contact us:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:contact@awoken.in" className="text-accent hover:underline">contact@awoken.in</a>
        </p>
      </div>
    ),
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated="July 2026"
      sections={sections}
      tocLabel="Terms"
    />
  )
}
