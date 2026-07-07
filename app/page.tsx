'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  Network,
  ShieldCheck,
  Sparkles,
  Cpu,
  Radio,
} from 'lucide-react'
import { LandingNav } from '@/components/landing/landing-nav'
import { AegisLogo } from '@/components/aegis/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AGENTS } from '@/lib/aegis'
import { Globe } from '@/components/ui/globe'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

function Ticker() {
  const items = [
    'ROUND OF 16 · MATCH 51',
    'KICKOFF T-01:42:18',
    'ATTENDANCE 61,204',
    'AVG ENTRY 3.4 MIN',
    '7 AI AGENTS ONLINE',
    'FAN SENTIMENT 94',
    'INCIDENTS · 1 CONTAINED',
    'WEATHER · LIGHT RAIN INBOUND',
  ]
  return (
    <div className="relative flex overflow-hidden border-y border-border/60 bg-carbon/60 py-2.5">
      <div className="flex shrink-0 animate-ticker gap-8 pr-8">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.7rem] tracking-widest text-muted-foreground"
          >
            <span className="h-1 w-1 rounded-full bg-primary" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 grid-tactical opacity-40" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pt-24 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            className="max-w-3xl flex-1 z-10"
          >
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Agentic AI Workforce
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
                FIFA World Cup 2026 · Google Cloud
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              The operating system that
              <span className="text-primary text-glow-electric"> runs the stadium.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
            >
              PitchControl is not a chatbot. It is an enterprise AI operating system where seven
              specialized agents collaborate in real time through a shared event bus and shared memory
              to run World Cup match-day operations — from the turnstile to the tactical room.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/command"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'group h-12 gap-2 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90',
                )}
              >
                Enter Command Center
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/fanhub"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-12 gap-2 border-border bg-secondary/40 px-6 text-base text-foreground hover:bg-secondary',
                )}
              >
                Open FanHub
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4"
            >
              {[
                { k: '7', l: 'Autonomous agents' },
                { k: '<50ms', l: 'Event bus latency' },
                { k: '61k', l: 'Fans orchestrated' },
                { k: '24/7', l: 'Shared memory' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-foreground">{s.k}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <div className="flex-1 w-full flex items-center justify-center relative z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none lg:block hidden" />
             <Globe className="lg:scale-125" />
          </div>
        </div>

        <Ticker />
      </section>

      {/* PLATFORM */}
      <section id="platform" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            The Platform
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            One shared brain. Many autonomous specialists.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Network,
              title: 'Shared Event Bus',
              body: 'Every agent publishes and subscribes to a common stream. A single fan action ripples across ticketing, crowd, broadcast and safety in milliseconds.',
            },
            {
              icon: Cpu,
              title: 'Persistent Shared Memory',
              body: 'Agents reason over the same live world-model of the stadium — no siloed context, no repeated questions, no lost state between decisions.',
            },
            {
              icon: ShieldCheck,
              title: 'Explainable by Design',
              body: 'Every recommendation carries a confidence score, reasoning trace and the data sources behind it. Operators stay in command.',
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORKFORCE STRIP */}
      <section id="workforce" className="border-y border-border/60 bg-carbon/40">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                The AI Workforce
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                Seven agents. Displayed as enterprise services — not chat windows.
              </h2>
            </div>
            <Link
              href="/command#workforce"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-border bg-secondary/40 hover:bg-secondary',
              )}
            >
              View live workforce <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AGENTS.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="rounded-xl border border-border/70 bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      a.status === 'alert'
                        ? 'bg-destructive'
                        : a.status === 'standby'
                          ? 'bg-muted-foreground'
                          : 'bg-primary'
                    }`}
                  />
                </div>
                <div className="mt-3 font-display text-sm font-semibold">{a.name}</div>
                <div className="text-xs text-muted-foreground">{a.role}</div>
              </motion.div>
            ))}
            <div className="flex items-center justify-center rounded-xl border border-dashed border-border/70 bg-card/40 p-4 text-center">
              <div>
                <div className="font-display text-2xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">Autonomous coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTALS */}
      <section id="portals" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Two Portals
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Built for the fan in the stands and the director in the room.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Link
            href="/fanhub"
            className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-accent/15 via-card to-card p-8 transition-all hover:border-accent/50"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Radio className="h-3.5 w-3.5" /> FanHub
              </span>
              <h3 className="mt-5 font-display text-3xl font-bold">Your match-day companion</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Digital ticket, best entrance, transport status, AI food picks, accessibility care
                and live broadcast alerts — all personalized for your seat.
              </p>
            </div>
            <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-accent">
              Open FanHub
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/command"
            className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/15 via-card to-card p-8 transition-all hover:border-primary/50"
          >
            <div className="pointer-events-none absolute inset-0 grid-tactical opacity-30" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Activity className="h-3.5 w-3.5" /> Command Center
              </span>
              <h3 className="mt-5 font-display text-3xl font-bold">Mission control for the pitch</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                A holographic stadium, live crowd heatmap, incident feed, executive KPIs and the
                Director prompt console that choreographs the entire AI workforce.
              </p>
            </div>
            <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Enter Command Center
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* TRUST / FOOTER */}
      <footer id="trust" className="border-t border-border/60 bg-carbon/40">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-md">
              <AegisLogo />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                PitchControl · Agentic AI for live venue operations. A concept product built for
                the Google Hack2Skill PromptWars hackathon.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground">
              <Link href="/fanhub" className="hover:text-foreground">FanHub</Link>
              <Link href="/command" className="hover:text-foreground">Command Center</Link>
              <a href="#platform" className="hover:text-foreground">Platform</a>
              <a href="#workforce" className="hover:text-foreground">AI Workforce</a>
            </div>
          </div>
          <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
            © 2026 PitchControl. Not affiliated with FIFA. Demonstration interface.
          </div>
        </div>
      </footer>
    </div>
  )
}
