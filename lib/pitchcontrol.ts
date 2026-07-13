import type { LucideIcon } from 'lucide-react'
import {
  Crown,
  Ticket,
  Users,
  Radio,
  ShieldCheck,
  Settings2,
  Leaf,
} from 'lucide-react'

export type AgentStatus = 'active' | 'standby' | 'alert'

export type Agent = {
  id: string
  name: string
  role: string
  icon: LucideIcon
  status: AgentStatus
  task: string
  confidence: number
  lastAction: string
  colorVar: string
}

export const AGENTS: Agent[] = [
  {
    id: 'director',
    name: 'Director AI',
    role: 'Orchestration & Command',
    icon: Crown,
    status: 'active',
    task: 'Coordinating ARG vs BRA 78th-minute operations',
    confidence: 99,
    lastAction: 'Issued mass egress protocol to OpsPilot',
    colorVar: 'text-[color:var(--agent-director)]',
  },
  {
    id: 'ticketpilot',
    name: 'TicketPilot AI',
    role: 'Access & Entitlements',
    icon: Ticket,
    status: 'active',
    task: 'Validating 81,932 digital tickets · monitoring secondary market',
    confidence: 99,
    lastAction: 'Authorized late VIP entry for Suite 112',
    colorVar: 'text-[color:var(--agent-ticket)]',
  },
  {
    id: 'crowdsense',
    name: 'CrowdSense AI',
    role: 'Crowd Intelligence',
    icon: Users,
    status: 'alert',
    task: 'Predicting post-match congestion at Gate C (T-12m)',
    confidence: 94,
    lastAction: 'Flagged 114dB noise spike in North End',
    colorVar: 'text-[color:var(--agent-crowd)]',
  },
  {
    id: 'broadcast',
    name: 'Broadcast AI',
    role: 'Fan Communications',
    icon: Radio,
    status: 'active',
    task: 'Translating 6-language PA announcements in real-time',
    confidence: 97,
    lastAction: 'Pushed transit advisory to 48k local devices',
    colorVar: 'text-[color:var(--agent-broadcast)]',
  },
  {
    id: 'guardian',
    name: 'Guardian AI',
    role: 'Safety & Accessibility',
    icon: ShieldCheck,
    status: 'active',
    task: 'Tracking 2 active medical incidents on Level 2',
    confidence: 98,
    lastAction: 'Cleared step-free path for EMT unit',
    colorVar: 'text-[color:var(--agent-guardian)]',
  },
  {
    id: 'opspilot',
    name: 'OpsPilot AI',
    role: 'Operations & Logistics',
    icon: Settings2,
    status: 'active',
    task: 'Managing 1,482 active staff and 683 volunteers',
    confidence: 95,
    lastAction: 'Deployed 12 additional stewards to Gate C',
    colorVar: 'text-[color:var(--agent-ops)]',
  },
  {
    id: 'ecopulse',
    name: 'EcoPulse AI',
    role: 'Sustainability',
    icon: Leaf,
    status: 'standby',
    task: 'Monitoring 24°C / 61% humidity stadium microclimate',
    confidence: 92,
    lastAction: 'Dimmed non-essential concourse lighting',
    colorVar: 'text-[color:var(--agent-eco)]',
  },
]

export type TimelineEvent = {
  time: string
  agent: string
  title: string
  kind: 'ticket' | 'broadcast' | 'crowd' | 'director' | 'ops' | 'safety'
}

export const TIMELINE: TimelineEvent[] = [
  { time: '78:02', agent: 'TicketPilot AI', title: 'Late arrival cleared · Suite 112', kind: 'ticket' },
  { time: '78:12', agent: 'Broadcast AI', title: 'Translating stadium announcement (EN/ES/PT)', kind: 'broadcast' },
  { time: '78:15', agent: 'CrowdSense AI', title: 'Noise level threshold exceeded · 114dB', kind: 'crowd' },
  { time: '78:29', agent: 'Guardian AI', title: 'Medical unit dispatched · Section 121', kind: 'safety' },
  { time: '78:30', agent: 'Director AI', title: 'Initiating post-match egress strategy', kind: 'director' },
  { time: '78:35', agent: 'OpsPilot AI', title: 'Staff reallocated to transit hubs', kind: 'ops' },
]

export type ChainStep = {
  agent: string
  action: string
}

export const DIRECTOR_CHAIN: ChainStep[] = [
  { agent: 'Director AI', action: 'Parses directive · computes stadium-wide load' },
  { agent: 'CrowdSense AI', action: 'Projects density models for targeted zones' },
  { agent: 'OpsPilot AI', action: 'Drafts human-volunteer reassignment grid' },
  { agent: 'Guardian AI', action: 'Verifies safety and ADA compliance pathways' },
  { agent: 'Broadcast AI', action: 'Generates multi-lingual fan communication' },
]

export const KPIS = [
  { label: 'Live Attendance', value: '82,517', delta: '100%', trend: 'up' as const },
  { label: 'Match Clock', value: '78:12', delta: 'Live', trend: 'up' as const },
  { label: 'Crowd Noise', value: '114 dB', delta: 'Peak', trend: 'flat' as const },
  { label: 'Pitch Temp', value: '24°C', delta: '61% Hum.', trend: 'up' as const },
]
