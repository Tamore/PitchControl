'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Minus,
  CloudRain,
  Wind,
  Thermometer,
  AlertTriangle,
  Leaf,
  Droplets,
  Zap,
  Gauge,
  Info,
} from 'lucide-react'
import { PortalNav } from '@/components/aegis/portal-nav'
import { HoloStadium } from '@/components/command/holo-stadium'
import { WorkforcePanel } from '@/components/command/workforce-panel'
import { DirectorConsole } from '@/components/command/director-console'
import { MissionTimeline } from '@/components/command/mission-timeline'
import { KPIS } from '@/lib/aegis'
import { FloatingDock } from '@/components/ui/floating-dock'
import { Spotlight } from '@/components/ui/spotlight'
import { Orbit } from '@/components/ui/orbit'
import { IncidentFeed } from '@/components/command/incident-card'

function Panel({
  title,
  children,
  className = '',
  action,
}: {
  title: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}) {
  return (
    <section className={`rounded-2xl border border-border/70 bg-card/80 p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

const INCIDENTS = [
  { level: 'high', zone: 'Gate 4 · North', msg: 'Density spike detected — 92% capacity', time: 'T-18m' },
  { level: 'med', zone: 'Concourse B', msg: 'Concession queue exceeding target', time: 'T-12m' },
  { level: 'low', zone: 'Parking P3', msg: 'Shuttle turnaround slightly delayed', time: 'T-6m' },
]

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Spotlight className="opacity-30" />
      <PortalNav label="Command Center" cta={{ href: '/fanhub', text: 'Open FanHub' }} />

      {/* Local broadcast ticker removed in favor of global BroadcastStrip */}

      <main className="relative z-10 mx-auto max-w-[1600px] space-y-4 px-5 py-6 lg:px-8 pb-32">
        <IncidentFeed />
        
        {/* header row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Mission Control</h1>
            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-foreground">🇦🇷 Argentina vs 🇧🇷 Brazil</span>
              <span>· Round of 16 · MetLife Stadium · Live operations</span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs tracking-widest text-foreground font-semibold">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {KPIS.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border/70 bg-card/80 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{k.label}</span>
                <span
                  className={`inline-flex items-center gap-1 text-[0.7rem] font-medium ${
                    k.trend === 'flat' ? 'text-muted-foreground' : 'text-primary'
                  }`}
                >
                  {k.trend === 'flat' ? <Minus className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                  {k.delta}
                </span>
              </div>
              <div className="mt-2 font-display text-3xl font-bold tabular-nums">{k.value}</div>
            </motion.div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-4 xl:grid-cols-12">
          {/* Left: stadium + weather + incidents */}
          <div className="space-y-4 xl:col-span-8">
            <Panel
              title="Holographic Stadium · Live Crowd Heatmap"
              action={
                <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground">
                  UPDATED 0.8s AGO
                </span>
              }
            >
              <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background/40">
                <div className="pointer-events-none absolute inset-0 grid-tactical opacity-40" />
                <div className="relative aspect-[16/10] w-full">
                  <HoloStadium />
                </div>
              </div>
            </Panel>

            <div className="grid gap-4 md:grid-cols-2">
              <Panel title="Match-Day Weather">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CloudRain className="h-10 w-10 text-primary" strokeWidth={1.5} />
                    <div>
                      <div className="font-display text-2xl font-bold">24°C</div>
                      <div className="text-xs text-muted-foreground">Clear · Humidity 61%</div>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-right text-xs text-muted-foreground">
                    <div className="flex items-center justify-end gap-1.5">
                      <Wind className="h-3.5 w-3.5" /> 11 km/h SW
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      <Thermometer className="h-3.5 w-3.5" /> Feels 25°C
                    </div>
                  </div>
                </div>
              </Panel>

              <Panel
                title="Incident Feed"
                action={
                  <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-destructive">
                    <AlertTriangle className="h-3.5 w-3.5" /> 1 active
                  </span>
                }
              >
                <div className="space-y-2.5">
                  {INCIDENTS.map((inc) => {
                    const color =
                      inc.level === 'high'
                        ? 'bg-destructive'
                        : inc.level === 'med'
                          ? 'bg-accent'
                          : 'bg-muted-foreground'
                    return (
                      <div key={inc.zone} className="flex gap-3">
                        <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${color}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-xs font-semibold">{inc.zone}</span>
                            <span className="font-mono text-[0.65rem] text-muted-foreground">{inc.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{inc.msg}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Panel>
            </div>
          </div>

          {/* Right: workforce panel */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            <Panel title="AI Workforce Dynamics">
              <Orbit />
            </Panel>
            <Panel title="Agent Status" className="flex-1">
              <WorkforcePanel />
            </Panel>
          </div>
        </div>

        {/* Director console + Timeline */}
        <div className="grid gap-4 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <DirectorConsole />
          </div>
          <div className="xl:col-span-5">
            <MissionTimeline />
          </div>
        </div>

        {/* Explainability + Sustainability */}
        <div className="grid gap-4 xl:grid-cols-12">
          <Panel
            title="AI Explainability"
            className="xl:col-span-7"
            action={<Info className="h-4 w-4 text-muted-foreground" />}
          >
            <div className="rounded-xl border border-border/60 bg-background/40 p-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold">
                  Recommendation · Gate rebalance
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <Gauge className="h-3.5 w-3.5" /> 97% confidence
                </span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <div className="mb-1 text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
                    Reasoning
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/90">
                    North density trending to 92% while covered West gates sit at 62%. Rain arrival
                    accelerates inflow.
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
                    Data Sources
                  </div>
                  <ul className="space-y-1 text-xs text-foreground/90">
                    <li>· LiDAR crowd sensors</li>
                    <li>· Turnstile telemetry</li>
                    <li>· Weather radar feed</li>
                  </ul>
                </div>
                <div>
                  <div className="mb-1 text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
                    Recommended Action
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/90">
                    Open 3 covered West entrances, deploy 12 stewards to Gate 4, advise sheltered
                    routing to 48k fans.
                  </p>
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Sustainability · EcoPulse AI" className="xl:col-span-5">
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Zap, v: '−8%', l: 'Energy load', tone: 'text-primary' },
                { icon: Droplets, v: '94%', l: 'Water reuse', tone: 'text-primary' },
                { icon: Leaf, v: '72%', l: 'Waste diverted', tone: 'text-[color:var(--pitch-green)]' },
              ].map((m) => (
                <div key={m.l} className="rounded-xl border border-border/60 bg-background/40 p-3 text-center">
                  <m.icon className={`mx-auto h-5 w-5 ${m.tone}`} />
                  <div className="mt-2 font-display text-xl font-bold">{m.v}</div>
                  <div className="text-[0.65rem] text-muted-foreground">{m.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-border/60 bg-background/40 p-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Carbon budget vs. target</span>
                <span className="font-medium text-[color:var(--agent-eco)]">On track</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-[color:var(--agent-eco)]" style={{ width: '84%' }} />
              </div>
            </div>
          </Panel>
        </div>
      </main>

      <FloatingDock />
    </div>
  )
}
