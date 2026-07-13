'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, Radio, Users, Crown, Settings2, ShieldCheck } from 'lucide-react'
import { TIMELINE, type TimelineEvent } from '@/lib/pitchcontrol'

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
    <div className="w-full h-full bg-white rounded-[2rem] p-6 border border-slate-200 flex flex-col gap-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-bold text-blue-700 uppercase tracking-widest">Mission Timeline</h3>
        <span className="text-xs text-slate-500">Real-time History</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 pr-2">
        <AnimatePresence initial={false}>
          {missionTimeline.map((e, i) => {
            const kind = agentToKind(e.agent);
            const isLatest = i === 0;
            return (
              <motion.div
                key={`${e.timestamp}-${e.message}-${i}`}
                layout
                initial={{ opacity: 0, x: -12, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex gap-4 items-start border-l-2 pl-4 relative ${isLatest ? 'border-blue-600' : 'border-slate-200'}`}
              >
                <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${isLatest ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">{e.agent} Action</span>
                  <span className="text-xs text-slate-500 mt-0.5">{e.message}</span>
                  <span className="text-[10px] text-slate-400 mt-1.5">{e.timestamp}</span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
