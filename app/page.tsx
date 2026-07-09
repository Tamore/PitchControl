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

// Ticker removed in favor of global BroadcastStrip

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
             <Globe className="lg:scale-125" />
          </div>
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
