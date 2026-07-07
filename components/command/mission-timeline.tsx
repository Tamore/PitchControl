'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, Radio, Users, Crown, Settings2, ShieldCheck } from 'lucide-react'
import { TIMELINE, type TimelineEvent } from '@/lib/aegis'

import { useStadium } from '@/components/providers/StadiumProvider'

const iconMap: Record<string, any> = {
  ticket: Ticket,
  broadcast: Radio,
  crowd: Users,
  director: Crown,
  ops: Settings2,
  safety: ShieldCheck,
}

const colorMap: Record<string, string> = {
  ticket: 'text-primary',
  broadcast: 'text-accent',
  crowd: 'text-destructive',
  director: 'text-accent',
  ops: 'text-primary',
  safety: 'text-[color:var(--pitch-green)]',
}

// Map the dynamic agent name to the hardcoded styling map keys
const agentToKind = (agent: string) => {
  const name = agent.toLowerCase();
  if (name.includes('ticket')) return 'ticket';
  if (name.includes('broadcast')) return 'broadcast';
  if (name.includes('crowd')) return 'crowd';
  if (name.includes('director') || name.includes('system')) return 'director';
  if (name.includes('ops')) return 'ops';
  if (name.includes('guardian')) return 'safety';
  return 'director';
};

export function MissionTimeline() {
  const { missionTimeline } = useStadium()


  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-card/80 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Mission Timeline</h3>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-widest text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          LIVE STREAM
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute bottom-0 left-[13px] top-1 w-px bg-border" />
        <AnimatePresence initial={false}>
          {missionTimeline.map((e, i) => {
            const kind = agentToKind(e.agent);
            const Icon = iconMap[kind] || Crown;
            return (
              <motion.div
                key={`${e.time}-${e.message}-${i}`}
                layout
                initial={{ opacity: 0, x: -12, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative flex gap-3 pb-4"
              >
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                  <Icon className={`h-3.5 w-3.5 ${colorMap[kind]}`} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.65rem] text-muted-foreground">{e.timestamp}</span>
                    <span className="text-[0.65rem] font-medium text-foreground/70">{e.agent}</span>
                  </div>
                  <p className="text-xs text-foreground">{e.message}</p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
