import type { Metadata } from 'next'
import { LegalLayout, type LegalSection } from '@/components/legal/legal-layout'

export const metadata: Metadata = {
  title: 'Security — Aegis StadiumOS',
  description: 'How Aegis StadiumOS protects fan data, operations and its AI workforce.',
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'Encryption everywhere',
    body: [
      'All data is encrypted in transit with TLS 1.3 and at rest with AES-256. Digital tickets are cryptographically signed and verified at entry by TicketPilot AI to prevent duplication and fraud.',
    ],
  },
  {
    heading: 'Access control',
    body: [
      'Operator access to the Command Center is protected with role-based access control and multi-factor authentication. Fan and operator surfaces are strictly separated, and each agent operates under least-privilege permissions on the shared event bus.',
    ],
  },
  {
    heading: 'AI safety and oversight',
    body: [
      'Agent recommendations carry confidence scores and reasoning traces, and are subject to human review for any safety-critical action. Guardrails constrain agents to their operational domain, and anomalous behavior is flagged to operators in real time.',
    ],
  },
  {
    heading: 'Resilience',
    body: [
      'The platform is designed for high availability with redundant event-bus infrastructure and graceful degradation. If a subsystem fails, core ticketing and safety functions remain operational.',
    ],
  },
  {
    heading: 'Monitoring and response',
    body: [
      'We continuously monitor for threats and maintain an incident response process. Confirmed incidents affecting personal data are communicated to impacted users and relevant authorities without undue delay.',
    ],
  },
  {
    heading: 'Responsible disclosure',
    body: [
      'We welcome reports from security researchers. If you believe you have found a vulnerability, contact our security team so we can investigate and remediate promptly. We do not pursue action against good-faith research.',
    ],
  },
]

export default function SecurityPage() {
  return (
    <LegalLayout
      active="/legal/security"
      title="Security"
      updated="July 1, 2026"
      intro="Security is engineered into every layer of Aegis StadiumOS — from encrypted tickets to the guardrails around our autonomous AI workforce."
      sections={SECTIONS}
    />
  )
}
