'use client'

import { motion } from 'framer-motion'
import { AGENTS, type Agent } from '@/lib/aegis'
import { useStadium } from '@/components/providers/StadiumProvider'

function StatusBadge({ status }: { status: Agent['status'] }) {
  const map = {
    active: { dot: 'bg-primary', text: 'text-primary', label: 'ACTIVE' },
    alert: { dot: 'bg-destructive', text: 'text-destructive', label: 'ALERT' },
    standby: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', label: 'STANDBY' },
  }[status]
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-widest ${map.text}`}>
      <span className={`relative flex h-2 w-2`}>
        {status !== 'standby' && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${map.dot} opacity-60`} />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${map.dot}`} />
      </span>
      {map.label}
    </span>
  )
}

export function WorkforcePanel() {
  const { isOrchestrating } = useStadium()
  
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
      {AGENTS.map((a, i) => {
        const liveStatus = isOrchestrating ? 'active' : a.status;
        return (
        <motion.article
          key={a.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.35 }}
          className="group relative overflow-hidden rounded-xl border border-border/70 bg-card/80 p-3.5 transition-colors hover:border-primary/40"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/60">
                <a.icon className={`h-5 w-5 ${a.colorVar}`} />
              </span>
              <div>
                <div className="font-display text-sm font-semibold leading-tight">{a.name}</div>
                <div className="text-[0.7rem] text-muted-foreground">{a.role}</div>
              </div>
            </div>
            <StatusBadge status={liveStatus} />
          </div>

          <p className="mt-3 text-xs leading-relaxed text-foreground/90">{a.task}</p>

          <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
            <span className="text-[0.65rem] text-muted-foreground">
              Last: <span className="text-foreground/80">{a.lastAction}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[0.7rem] font-semibold text-foreground">{a.confidence}%</span>
              <span className="h-1.5 w-10 overflow-hidden rounded-full bg-secondary">
                <span
                  className={`block h-full rounded-full ${liveStatus === 'alert' ? 'bg-destructive' : 'bg-primary'}`}
                  style={{ width: `${a.confidence}%` }}
                />
              </span>
            </span>
          </div>
        </motion.article>
        )
      })}
    </div>
  )
}
