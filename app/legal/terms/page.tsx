import type { Metadata } from 'next'
import { LegalLayout, type LegalSection } from '@/components/legal/legal-layout'

export const metadata: Metadata = {
  title: 'Terms of Service — PitchControl',
  description: 'The terms governing your use of the PitchControl FanHub and Command Center.',
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'Acceptance of terms',
    body: [
      'By accessing FanHub or the Command Center you agree to these terms. If you are using PitchControl on behalf of an organization, you represent that you have authority to bind that organization.',
    ],
  },
  {
    heading: 'Your account',
    body: [
      'You are responsible for keeping your credentials secure and for all activity under your account. Digital tickets are tied to your verified identity and may not be transferred except through the official transfer flow.',
    ],
  },
  {
    heading: 'Acceptable use',
    body: [
      'You agree not to disrupt, reverse engineer, or attempt to gain unauthorized access to the platform or its AI systems. Automated scraping of the event bus, agent outputs or fan data is prohibited.',
      'Recommendations produced by the AI workforce are decision-support aids. Stadium operators and safety officials retain final authority over all operational decisions.',
    ],
  },
  {
    heading: 'Tickets and entry',
    body: [
      'Entry is subject to venue rules, staggered entry windows and safety directives issued in real time. PitchControl may adjust recommended gates, routes and timings to protect crowd safety.',
    ],
  },
  {
    heading: 'Service availability',
    body: [
      'We aim for continuous availability but do not guarantee uninterrupted service. Features may change as the platform evolves throughout the tournament.',
    ],
  },
  {
    heading: 'Disclaimers and liability',
    body: [
      'This is a concept product provided for demonstration. It is offered "as is" without warranties. To the extent permitted by law, PitchControl is not liable for indirect or consequential damages arising from use of the platform.',
    ],
  },
  {
    heading: 'Changes to these terms',
    body: [
      'We may update these terms as the platform changes. Material changes will be communicated through FanHub notifications ahead of taking effect.',
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalLayout
      active="/legal/terms"
      title="Terms of Service"
      updated="July 1, 2026"
      intro="These terms govern your use of PitchControl, including the fan-facing FanHub and the operator-facing Command Center."
      sections={SECTIONS}
    />
  )
}
