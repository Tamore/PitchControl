'use client'

import { useState } from 'react'
import Image from 'next/image'
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
  QrCode,
  ChevronRight,
  CheckCircle2,
  Footprints,
  ArrowUpRight,
  Crown,
  Wine,
  Sofa,
  Languages,
} from 'lucide-react'
import { PortalNav } from '@/components/aegis/portal-nav'
import { Countdown } from '@/components/aegis/countdown'
import { Modal } from '@/components/ui/modal'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useStadium } from '@/components/providers/StadiumProvider'

const ROUTE_STEPS = [
  { label: 'Exit the concourse toward the East plaza', detail: 'Head past the fan store, keeping the video wall on your right.', dist: '90 m' },
  { label: 'Follow the covered walkway to Gate C', detail: 'CrowdSense is diverting foot traffic away from the busier North concourse.', dist: '160 m' },
  { label: 'Enter at Gate C · Lane 3', detail: 'Staggered entry is active for Section 112 — scan your ticket at the accessible lane.', dist: '40 m' },
  { label: 'Take Elevator B to the Lower Tier', detail: 'Step-free route verified by Guardian AI. Assistance staff are on standby.', dist: '30 m' },
  { label: 'Arrive at Section 112 · Row F', detail: 'Your seat is a short, level walk from the elevator lobby.', dist: '55 m' },
]

const UPGRADE_OPTIONS = [
  { icon: Crown, name: 'Halfway Line Hospitality', detail: 'Padded seats · Premium sightline · In-seat service', price: '+$180', tag: 'Best value' },
  { icon: Wine, name: 'Founders Club Lounge', detail: 'All-inclusive food & drink · Private entrance', price: '+$340', tag: 'Premium' },
  { icon: Sofa, name: 'Field-Level Box', detail: 'Shared suite · 6 seats · Dedicated host', price: '+$520', tag: 'Limited' },
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
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(null)
  
  const { notifications, isOrchestrating, dispatchEvent } = useStadium()

  return (
    <div className="light min-h-screen bg-background text-foreground">
      <PortalNav label="FanHub" cta={{ href: '/command', text: 'Command Center' }} />

      <main className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8">
        {/* HERO */}
        <section className="relative mb-6 overflow-hidden rounded-3xl border border-border/70">
          <Image
            src="/fanhub-hero.png"
            alt="World Cup stadium atmosphere at dusk"
            width={1600}
            height={700}
            className="h-[340px] w-full object-cover sm:h-[420px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-xl text-ice">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> Your Match-Day Plan · Curated by AI
                </span>
                <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl text-balance">
                  Argentina vs Brazil
                </h1>
                <p className="mt-2 text-sm text-white/80">
                  Round of 16 · MetLife Stadium · Gate C · Seat 112-F-14
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-black/40 p-4 backdrop-blur-md">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                  Kickoff in
                </p>
                <Countdown seconds={6138} tone="accent" />
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Digital ticket - large */}
          <Card i={0} className="lg:col-span-2 lg:row-span-1">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <SectionLabel icon={Ticket}>Digital Ticket</SectionLabel>
                <h2 className="font-display text-2xl font-bold">Priya Sharma</h2>
                <div className="mt-4 grid grid-cols-3 gap-6">
                  {[
                    { l: 'Section', v: '112' },
                    { l: 'Row', v: 'F' },
                    { l: 'Seat', v: '14' },
                  ].map((x) => (
                    <div key={x.l}>
                      <div className="text-xs text-muted-foreground">{x.l}</div>
                      <div className="font-display text-2xl font-bold text-primary">{x.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified by TicketPilot AI
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-secondary/50 p-4">
                <QrCode className="h-24 w-24 text-foreground" strokeWidth={1} />
                <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground">
                  WC26-51-112F14
                </span>
              </div>
            </div>
          </Card>

          {/* Best entrance */}
          <Card i={1}>
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

          {/* Seat info */}
          <Card i={2}>
            <SectionLabel icon={MapPin}>Seat Information</SectionLabel>
            <p className="text-sm text-muted-foreground">
              Lower tier · Halfway line · Shade until 78&apos;. Covered from light rain.
            </p>
            <div className="mt-4 flex gap-2">
              {['Shade', 'Covered', 'Aisle +2'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>

          {/* Transport */}
          <Card i={3}>
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

          {/* Food recs */}
          <Card i={4}>
            <SectionLabel icon={UtensilsCrossed}>AI Food Recommendations</SectionLabel>
            <div className="space-y-3">
              {[
                { n: 'Empanada Bar', d: 'Level 1 · 3 min queue', tag: 'Your taste' },
                { n: 'Cold Brew Stand', d: 'Section 110 · No queue', tag: 'Nearby' },
                { n: 'Vegan Grill', d: 'Level 2 · 5 min queue', tag: 'Dietary' },
              ].map((f) => (
                <div
                  key={f.n}
                  className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-3"
                >
                  <div>
                    <div className="text-sm font-semibold">{f.n}</div>
                    <div className="text-xs text-muted-foreground">{f.d}</div>
                  </div>
                  <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[0.65rem] font-medium text-accent">
                    {f.tag}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Broadcast notifications */}
          <Card i={5}>
            <SectionLabel icon={Bell}>Live Broadcast Notifications</SectionLabel>
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No new alerts. Standing by.</p>
              ) : (
                notifications.map((n, idx) => (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={idx} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Broadcast: {n.target}</span>
                        <span className="text-[0.65rem] text-muted-foreground">just now</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{n.notification}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </Card>

          {/* Broadcast Translation */}
          <Card i={5.5}>
            <SectionLabel icon={Languages}>Broadcast AI · Live Translation</SectionLabel>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time stadium announcements translated to your device.
            </p>
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-2">
                <span className="text-[0.65rem] font-bold tracking-widest text-muted-foreground uppercase">Now speaking: English</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--agent-broadcast)]/15 px-2 py-0.5 text-[0.6rem] font-medium text-[color:var(--agent-broadcast)]">
                  <CheckCircle2 className="h-3 w-3" /> AI Generated
                </span>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-semibold text-foreground">
                  "Please proceed to the nearest exit in an orderly fashion."
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-muted-foreground"><span className="font-semibold text-foreground">ES:</span> Por favor, diríjase a la salida...</div>
                  <div className="text-muted-foreground"><span className="font-semibold text-foreground">PT:</span> Por favor, dirija-se à saída...</div>
                  <div className="text-muted-foreground"><span className="font-semibold text-foreground">FR:</span> Veuillez vous diriger vers la sortie...</div>
                  <div className="text-muted-foreground"><span className="font-semibold text-foreground">AR:</span> يرجى التوجه إلى أقرب مخرج...</div>
                  <div className="text-muted-foreground"><span className="font-semibold text-foreground">HI:</span> कृपया निकटतम निकास की ओर बढ़ें...</div>
                </div>
              </div>
            </div>
          </Card>


          {/* Guardian accessibility */}
          <Card i={6} className="border-primary/30 bg-primary/[0.04]">
            <SectionLabel icon={Accessibility}>Guardian AI · Accessibility</SectionLabel>
            <p className="text-sm text-muted-foreground">
              A step-free route to Section 112 is verified and clear. Assistance staff are on standby
              at Gate C.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" /> Care plan active
            </div>
          </Card>

          {/* TicketPilot card */}
          <Card i={7}>
            <SectionLabel icon={Ticket}>TicketPilot AI</SectionLabel>
            <p className="text-sm text-muted-foreground">
              Want to upgrade? 6 hospitality seats just opened near the halfway line.
            </p>
            <button
              onClick={() => setUpgradeOpen(true)}
              className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore upgrades
            </button>
          </Card>

          {/* Transparency center */}
          <Card i={8} className="lg:col-span-1">
            <SectionLabel icon={Sparkles}>AI Transparency Center</SectionLabel>
            <p className="text-sm text-muted-foreground">
              Every recommendation you see is explainable. Review the data and reasoning behind your
              match-day plan.
            </p>
            <div className="mt-4 space-y-2">
              {[
                { l: 'Entrance routing', c: 96 },
                { l: 'Food picks', c: 88 },
                { l: 'Transport advice', c: 92 },
              ].map((x) => (
                <div key={x.l}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{x.l}</span>
                    <span className="font-medium text-foreground">{x.c}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${x.c}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
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

      {/* Upgrade modal */}
      <Modal
        open={upgradeOpen}
        onClose={() => {
          setUpgradeOpen(false)
          setSelectedUpgrade(null)
        }}
        title="Explore seat upgrades"
        description="6 hospitality seats just opened near the halfway line. This is a demonstration interface — no payment is processed."
        footer={
          <>
            <button
              onClick={() => {
                setUpgradeOpen(false)
                setSelectedUpgrade(null)
              }}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-border bg-secondary/40 hover:bg-secondary')}
            >
              Cancel
            </button>
            <button
              disabled={!selectedUpgrade || isOrchestrating}
              onClick={() => {
                dispatchEvent(`TICKET_PURCHASE: Fan requested proxy ticket purchase for upgrade: ${selectedUpgrade}`)
                setUpgradeOpen(false)
                setSelectedUpgrade(null)
              }}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-primary font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              {isOrchestrating ? "Orchestrating..." : "Confirm upgrade"}
            </button>
          </>
        }
      >
        <div className="space-y-3">
          {UPGRADE_OPTIONS.map((opt) => {
            const active = selectedUpgrade === opt.name
            return (
              <button
                key={opt.name}
                type="button"
                onClick={() => setSelectedUpgrade(opt.name)}
                aria-pressed={active}
                className={cn(
                  'flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors',
                  active ? 'border-primary bg-primary/[0.06]' : 'border-border bg-secondary/30 hover:bg-secondary/50',
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <opt.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{opt.name}</span>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[0.65rem] font-medium text-accent">
                      {opt.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{opt.detail}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-primary">
                  {opt.price}
                  {active ? <CheckCircle2 className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4 opacity-40" />}
                </div>
              </button>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}
