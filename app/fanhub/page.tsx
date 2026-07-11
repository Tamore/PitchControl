'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Ticket,
  MapPin,
  DoorOpen,
  Train,
  UtensilsCrossed,
  Bell,
  Accessibility,
  ShieldCheck,
  Sparkles,
  CloudSun,
  ThermometerSun,
  QrCode,
  ChevronRight,
  CheckCircle2,
  Footprints,
  Languages,
} from 'lucide-react'
import { PortalNav } from '@/components/aegis/portal-nav'
import { Modal } from '@/components/ui/modal'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useStadium } from '@/components/providers/StadiumProvider'
import { SeatMap } from '@/components/fanhub/seat-map'
import { DigitalTicket } from '@/components/fanhub/digital-ticket'
import { Globe } from '@/components/ui/globe'

const ROUTE_STEPS = [
  { label: 'Exit the concourse toward the East plaza', detail: 'Head past the fan store, keeping the video wall on your right.', dist: '90 m' },
  { label: 'Follow the covered walkway to Gate C', detail: 'CrowdSense is diverting foot traffic away from the busier North concourse.', dist: '160 m' },
  { label: 'Enter at Gate C · Lane 3', detail: 'Staggered entry is active for Section 112 — scan your ticket at the accessible lane.', dist: '40 m' },
  { label: 'Take Elevator B to the Lower Tier', detail: 'Step-free route verified by Guardian AI. Assistance staff are on standby.', dist: '30 m' },
  { label: 'Arrive at Section 112 · Row F', detail: 'Your seat is a short, level walk from the elevator lobby.', dist: '55 m' },
]

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
}

function Card({
  children,
  className = '',
  i = 0,
}: {
  children: React.ReactNode
  className?: string
  i?: number
}) {
  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fade}
      className={`rounded-2xl border border-border/70 bg-card p-5 shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {children}
    </div>
  )
}

export default function FanHubPage() {
  const [routeOpen, setRouteOpen] = useState(false)
  const { notifications } = useStadium()

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <PortalNav label="FanHub" cta={{ href: '/command', text: 'Command Center' }} />

      <main className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8 mt-4">
        <div className="mb-8 max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Curated Match Experience
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Welcome to MetLife Stadium, Priya.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            TicketPilot AI has localized your match-day plan for Argentina vs Brazil.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Hero: Side-by-side Ticket & Map */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
            
            {/* Left side: Digital Ticket */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-start pt-4 lg:pt-0">
              <DigitalTicket />
            </div>

            {/* Right side: 3D Seat Map with Pin */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.6 }}
                className="w-full h-[50vh] lg:h-[60vh] min-h-[450px]"
              >
                <SeatMap section="112" row="F" seat="14" />
              </motion.div>
            </div>
          </div>

          {/* Column 2: Navigation & Safety */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Card i={2}>
              <SectionLabel icon={DoorOpen}>Best Entrance</SectionLabel>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold">Gate C</span>
                <span className="text-sm text-primary">· 4 min walk</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                CrowdSense AI is routing you around a density spike at the North concourse.
              </p>
              <button
                onClick={() => setRouteOpen(true)}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
              >
                View walking route <ChevronRight className="h-4 w-4" />
              </button>
            </Card>

            <Card i={3} className="border-primary/30 bg-primary/[0.04] flex-1">
              <SectionLabel icon={Accessibility}>Guardian AI</SectionLabel>
              <p className="text-sm text-muted-foreground">
                A step-free route to Section 112 is verified and clear. Assistance staff are on standby at Gate C.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" /> Care plan active
              </div>
            </Card>
          </div>

          {/* Column 3: Live Environment & Intel */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Card i={4}>
              <SectionLabel icon={Train}>Transport Status</SectionLabel>
              <div className="space-y-3">
                {[
                  { line: 'NJ Transit · Rail', status: 'On time', ok: true },
                  { line: 'Shuttle Bay 4', status: 'Every 6 min', ok: true },
                  { line: 'Rideshare Zone', status: 'Surge · high', ok: false },
                ].map((t) => (
                  <div key={t.line} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{t.line}</span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        t.ok ? 'text-primary' : 'text-destructive'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${t.ok ? 'bg-primary' : 'bg-destructive'}`}
                      />
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card i={5} className="bg-secondary/10 flex-1">
              <SectionLabel icon={CloudSun}>Match Environment</SectionLabel>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ThermometerSun className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">24°C</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Clear Skies, 65% Hum.</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Match Officials</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Ref: S. Marciniak (POL)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Walking route modal */}
      <Modal
        open={routeOpen}
        onClose={() => setRouteOpen(false)}
        title="Walking route to your seat"
        description="Gate C · Section 112 · Row F · ~4 min · step-free"
        footer={
          <button
            onClick={() => setRouteOpen(false)}
            className={cn(buttonVariants({ size: 'lg' }), 'bg-primary font-semibold text-primary-foreground hover:bg-primary/90')}
          >
            Got it
          </button>
        }
      >
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/[0.04] p-3 text-sm">
          <Footprints className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-muted-foreground">
            CrowdSense AI generated this route live to avoid a density spike at the North concourse.
          </p>
        </div>
        <ol className="space-y-4">
          {ROUTE_STEPS.map((step, idx) => (
            <li key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {idx + 1}
                </span>
                {idx < ROUTE_STEPS.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{step.label}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                    {step.dist}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Modal>
    </div>
  )
}
