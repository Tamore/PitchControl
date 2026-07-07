import type { Metadata } from 'next'
import { LegalLayout, type LegalSection } from '@/components/legal/legal-layout'

export const metadata: Metadata = {
  title: 'Privacy Policy — PitchControl',
  description: 'How PitchControl collects, uses and protects fan data across FIFA World Cup 2026 operations.',
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'Information we collect',
    body: [
      'We collect the information needed to deliver your match-day experience: your account details (name, email, phone), your tickets and seat assignments, and your saved preferences such as dietary needs, favorite team and accessibility requirements.',
      'On match day, and only with your permission, we process your approximate in-venue location to power navigation and congestion avoidance. Location processing stops automatically when you leave the venue.',
    ],
  },
  {
    heading: 'How our AI workforce uses your data',
    body: [
      'Our specialized agents — TicketPilot, CrowdSense, Broadcast, Guardian, OpsPilot and EcoPulse — reason over a shared, live world-model of the stadium to personalize routing, recommendations and safety plans for you.',
      'Every recommendation is explainable. You can review the reasoning, confidence score and data sources behind each decision in the AI Transparency Center at any time.',
    ],
  },
  {
    heading: 'What we never do',
    body: [
      'We never sell your personal data. We never use your data for third-party advertising. Your accessibility preferences are treated as sensitive data and are used exclusively to deliver inclusive services.',
    ],
  },
  {
    heading: 'Data retention',
    body: [
      'Ticket and match history is retained for the duration of the tournament and up to 24 months afterward for support and dispute resolution. Location data is discarded within hours of each match. You may request deletion of your account and associated data at any time from Settings.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'You can access, correct, export or delete your personal data. You can withdraw consent for personalization, location or analytics from your privacy settings without losing access to core ticketing features.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'For any privacy request or question, contact our data protection team. We respond to verified requests within 30 days.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalLayout
      active="/legal/privacy"
      title="Privacy Policy"
      updated="July 1, 2026"
      intro="Your trust is the foundation of PitchControl. This policy explains what data we collect, how our AI workforce uses it, and the controls you have over it."
      sections={SECTIONS}
    />
  )
}
