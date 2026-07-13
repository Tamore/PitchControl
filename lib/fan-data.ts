import type { LucideIcon } from 'lucide-react'
import {
  Ticket,
  Radio,
  Users,
  ShieldCheck,
  Train,
  UtensilsCrossed,
  CreditCard,
  Bus,
  Accessibility,
  Eye,
  Ear,
  Brain,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Fan identity                                                               */
/* -------------------------------------------------------------------------- */

export type FanProfile = {
  name: string
  handle: string
  avatar: string
  memberSince: string
  tier: string
  favoriteTeam: string
  location: string
  email: string
  phone: string
  language: string
  matchesAttended: number
  countriesVisited: number
  loyaltyPoints: number
}

export const FAN: FanProfile = {
  name: 'Priya Sharma',
  handle: '@priya.wc26',
  avatar: '/placeholder-user.jpg',
  memberSince: 'March 2025',
  tier: 'PitchControl Gold',
  favoriteTeam: 'Argentina',
  location: 'Newark, NJ',
  email: 'priya.sharma@example.com',
  phone: '+1 (201) 555-0147',
  language: 'English (US)',
  matchesAttended: 7,
  countriesVisited: 3,
  loyaltyPoints: 4820,
}

export const STAFF: FanProfile = {
  name: 'Sarah Chen',
  handle: '@schen.ops',
  avatar: '', // Use fallback user icon
  memberSince: 'January 2023',
  tier: 'Command Level 4',
  favoriteTeam: 'Operations',
  location: 'MetLife Stadium',
  email: 'sarah.chen@pitchcontrol.app',
  phone: '+1 (555) 019-8233',
  language: 'English (US)',
  matchesAttended: 142,
  countriesVisited: 1,
  loyaltyPoints: 0,
}

export type MatchHistory = {
  id: string
  fixture: string
  stage: string
  venue: string
  date: string
  result: string
  attended: boolean
}

export const MATCH_HISTORY: MatchHistory[] = [
  { id: 'm1', fixture: 'Argentina vs Brazil', stage: 'Round of 16', venue: 'MetLife Stadium', date: 'Jul 7, 2026', result: 'Upcoming', attended: false },
  { id: 'm2', fixture: 'Argentina vs Nigeria', stage: 'Group C', venue: 'MetLife Stadium', date: 'Jun 28, 2026', result: '2 - 1', attended: true },
  { id: 'm3', fixture: 'Mexico vs Argentina', stage: 'Group C', venue: 'SoFi Stadium', date: 'Jun 24, 2026', result: '0 - 3', attended: true },
  { id: 'm4', fixture: 'Argentina vs Croatia', stage: 'Group C', venue: 'Lumen Field', date: 'Jun 20, 2026', result: '1 - 1', attended: true },
]

/* -------------------------------------------------------------------------- */
/*  Notification center                                                        */
/* -------------------------------------------------------------------------- */

export type NotificationKind = 'alert' | 'broadcast' | 'ticket' | 'transport' | 'safety'

export type Notification = {
  id: string
  kind: NotificationKind
  title: string
  body: string
  time: string
  agent: string
  read: boolean
}

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', kind: 'alert', title: 'Weather advisory', body: 'Light rain expected ~20 minutes before kickoff. Your seat is covered — no action needed.', time: '2 min ago', agent: 'Broadcast AI', read: false },
  { id: 'n2', kind: 'ticket', title: 'Gate C now open', body: 'Staggered entry is active for Section 112. Your recommended arrival window is 6:10–6:25 PM.', time: '12 min ago', agent: 'TicketPilot AI', read: false },
  { id: 'n3', kind: 'transport', title: 'Rideshare surge detected', body: 'Rideshare pricing is high. NJ Transit rail is on time and recommended for your return.', time: '18 min ago', agent: 'OpsPilot AI', read: false },
  { id: 'n4', kind: 'broadcast', title: 'Starting lineups released', body: 'The starting XI for both sides has been confirmed. Tap to view the full team sheet.', time: '34 min ago', agent: 'Broadcast AI', read: true },
  { id: 'n5', kind: 'safety', title: 'Step-free route verified', body: 'Guardian AI has cleared and verified your step-free route to Section 112.', time: '1 hr ago', agent: 'Guardian AI', read: true },
  { id: 'n6', kind: 'ticket', title: 'Digital ticket ready', body: 'Your ticket for Argentina vs Brazil is active in your Wallet and verified by TicketPilot AI.', time: '3 hr ago', agent: 'TicketPilot AI', read: true },
]

export const NOTIFICATION_META: Record<
  NotificationKind,
  { icon: LucideIcon; label: string; tone: string }
> = {
  alert: { icon: Radio, label: 'Advisory', tone: 'text-accent' },
  broadcast: { icon: Radio, label: 'Broadcast', tone: 'text-accent' },
  ticket: { icon: Ticket, label: 'Ticketing', tone: 'text-primary' },
  transport: { icon: Train, label: 'Transport', tone: 'text-primary' },
  safety: { icon: ShieldCheck, label: 'Safety', tone: 'text-[color:var(--pitch-green)]' },
}

/* -------------------------------------------------------------------------- */
/*  Wallet                                                                     */
/* -------------------------------------------------------------------------- */

export type WalletTicket = {
  id: string
  fixture: string
  stage: string
  venue: string
  date: string
  gate: string
  section: string
  row: string
  seat: string
  code: string
  status: 'active' | 'upcoming' | 'used'
}

export const WALLET_TICKETS: WalletTicket[] = [
  { id: 't1', fixture: 'Argentina vs Brazil', stage: 'Round of 16', venue: 'MetLife Stadium', date: 'Jul 7, 2026 · 7:00 PM', gate: 'C', section: '112', row: 'F', seat: '14', code: 'WC26-51-112F14', status: 'active' },
  { id: 't2', fixture: 'Quarter-Final · TBD', stage: 'Quarter-Final', venue: 'MetLife Stadium', date: 'Jul 11, 2026 · 4:00 PM', gate: 'C', section: '112', row: 'F', seat: '14', code: 'WC26-QF-112F14', status: 'upcoming' },
]

export type WalletPass = {
  id: string
  name: string
  detail: string
  icon: LucideIcon
  status: string
}

export const WALLET_PASSES: WalletPass[] = [
  { id: 'p1', name: 'NJ Transit Rail Pass', detail: 'Round trip · Match day', icon: Train, status: 'Active' },
  { id: 'p2', name: 'Stadium Shuttle Bay 4', detail: 'Unlimited · Jul 7', icon: Bus, status: 'Active' },
  { id: 'p3', name: 'Fan Zone Access', detail: 'North plaza · Pre-match', icon: Users, status: 'Active' },
]

export type PaymentMethod = {
  id: string
  brand: string
  last4: string
  expiry: string
  primary: boolean
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'c1', brand: 'Visa', last4: '4291', expiry: '08/28', primary: true },
  { id: 'c2', brand: 'Mastercard', last4: '7734', expiry: '11/27', primary: false },
]

export type Transaction = {
  id: string
  label: string
  detail: string
  amount: string
  date: string
  icon: LucideIcon
}

export const TRANSACTIONS: Transaction[] = [
  { id: 'x1', label: 'Empanada Bar', detail: 'Level 1 · Mobile order', amount: '$18.50', date: 'Today', icon: UtensilsCrossed },
  { id: 'x2', label: 'Match ticket · R16', detail: 'Argentina vs Brazil', amount: '$240.00', date: 'Jun 30', icon: Ticket },
  { id: 'x3', label: 'NJ Transit rail pass', detail: 'Round trip', amount: '$16.00', date: 'Jun 30', icon: Train },
  { id: 'x4', label: 'Merch · Home kit', detail: 'Fan store · Level 2', amount: '$95.00', date: 'Jun 28', icon: CreditCard },
]

/* -------------------------------------------------------------------------- */
/*  Accessibility                                                              */
/* -------------------------------------------------------------------------- */

export type AccessOption = {
  id: string
  icon: LucideIcon
  category: string
  title: string
  description: string
  enabled: boolean
}

export const ACCESS_OPTIONS: AccessOption[] = [
  { id: 'a1', icon: Accessibility, category: 'Mobility', title: 'Step-free routing', description: 'Always route me via elevators and ramps, avoiding stairs and escalators.', enabled: true },
  { id: 'a2', icon: Accessibility, category: 'Mobility', title: 'Wheelchair space', description: 'My seat is a wheelchair-accessible position with a companion seat.', enabled: true },
  { id: 'a3', icon: Eye, category: 'Visual', title: 'High-contrast interface', description: 'Increase contrast and text size across FanHub for easier reading.', enabled: false },
  { id: 'a4', icon: Eye, category: 'Visual', title: 'Audio descriptive commentary', description: 'Stream descriptive audio commentary to my device during the match.', enabled: false },
  { id: 'a5', icon: Ear, category: 'Hearing', title: 'Captioned announcements', description: 'Show live captions for all stadium PA announcements on my device.', enabled: true },
  { id: 'a6', icon: Ear, category: 'Hearing', title: 'Hearing loop assistance', description: 'Notify me of hearing-loop enabled zones near my seat.', enabled: false },
  { id: 'a7', icon: Brain, category: 'Sensory', title: 'Quiet room access', description: 'Show the nearest sensory-friendly quiet room and reserve on request.', enabled: false },
  { id: 'a8', icon: Brain, category: 'Sensory', title: 'Reduced-motion interface', description: 'Minimize animations and motion effects throughout FanHub.', enabled: false },
]

/* -------------------------------------------------------------------------- */
/*  AI transparency center                                                     */
/* -------------------------------------------------------------------------- */

export type AIDecision = {
  id: string
  agent: string
  decision: string
  summary: string
  confidence: number
  time: string
  reasoning: string
  dataSources: string[]
  outcome: string
}

export const AI_DECISIONS: AIDecision[] = [
  {
    id: 'd1',
    agent: 'CrowdSense AI',
    decision: 'Entrance routing → Gate C',
    summary: 'Routed you to Gate C instead of the nearer North gate.',
    confidence: 96,
    time: '12 min ago',
    reasoning:
      'North concourse density is trending toward 92% capacity while Gate C sits at 58%. Rerouting reduces your predicted entry time from 11 minutes to under 4 minutes.',
    dataSources: ['LiDAR crowd sensors', 'Turnstile telemetry', 'Your seat location', 'Historical entry patterns'],
    outcome: 'Predicted entry time reduced by 63%.',
  },
  {
    id: 'd2',
    agent: 'Broadcast AI',
    decision: 'Food recommendations',
    summary: 'Suggested the Empanada Bar, Cold Brew Stand and Vegan Grill.',
    confidence: 88,
    time: '20 min ago',
    reasoning:
      'Recommendations are ranked from your saved dietary preferences, previous mobile orders, and current live queue times within a 2-minute walk of your seat.',
    dataSources: ['Saved dietary profile', 'Purchase history', 'Live concession queue times', 'Proximity to Section 112'],
    outcome: 'Average wait avoided: 9 minutes.',
  },
  {
    id: 'd3',
    agent: 'OpsPilot AI',
    decision: 'Transport advice → NJ Transit rail',
    summary: 'Recommended rail over rideshare for your return trip.',
    confidence: 92,
    time: '18 min ago',
    reasoning:
      'Rideshare pricing is in a high surge band post-match while NJ Transit rail is on schedule with additional post-event capacity added for this fixture.',
    dataSources: ['Live rideshare pricing', 'Transit schedule feed', 'Historical post-match demand'],
    outcome: 'Estimated savings: $34 and 15 minutes.',
  },
  {
    id: 'd4',
    agent: 'Guardian AI',
    decision: 'Step-free route verification',
    summary: 'Verified and cleared a step-free path to Section 112.',
    confidence: 99,
    time: '1 hr ago',
    reasoning:
      'Your mobility preferences require step-free access. All elevators on the route are operational and assistance staff are positioned at Gate C.',
    dataSources: ['Accessibility profile', 'Elevator status telemetry', 'Staff positioning'],
    outcome: 'Step-free route confirmed and monitored live.',
  },
]

export type DataUsageItem = {
  id: string
  label: string
  purpose: string
  shared: boolean
}

export const DATA_USAGE: DataUsageItem[] = [
  { id: 'u1', label: 'Seat & ticket details', purpose: 'Personalize routing, seat info and entry timing', shared: false },
  { id: 'u2', label: 'Location (match day only)', purpose: 'In-venue navigation and congestion avoidance', shared: false },
  { id: 'u3', label: 'Dietary preferences', purpose: 'Rank food and concession recommendations', shared: false },
  { id: 'u4', label: 'Accessibility needs', purpose: 'Guarantee step-free routing and care plans', shared: false },
  { id: 'u5', label: 'Purchase history', purpose: 'Improve recommendations and wallet receipts', shared: false },
]
