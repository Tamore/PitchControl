'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, ShieldCheck, ThermometerSnowflake, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const INCIDENTS = [
  {
    id: 1,
    title: 'Congestion at Gate C',
    body: 'Crowd density exceeded 82% threshold. CrowdSense AI diverting 30% of traffic to Gate 2.',
    icon: Users,
    agent: 'CrowdSense AI',
    time: 5000,
  },
  {
    id: 2,
    title: 'Light Rain Inbound',
    body: 'Precipitation detected 5km west. Roof closure initiated. ETA 4 minutes.',
    icon: ThermometerSnowflake,
    agent: 'EcoPulse AI',
    time: 25000,
  },
  {
    id: 3,
    title: 'Unattended Bag · East Concourse',
    body: 'Security cameras flagged static object. Guardian AI dispatched nearest steward.',
    icon: AlertTriangle,
    agent: 'Guardian AI',
    time: 45000,
  }
]

export function IncidentFeed() {
  const [activeIncident, setActiveIncident] = useState<typeof INCIDENTS[0] | null>(null)

  useEffect(() => {
    const timers = INCIDENTS.map((inc) => 
      setTimeout(() => {
        setActiveIncident(inc)
        // Auto dismiss after 8s
        setTimeout(() => setActiveIncident(null), 8000)
      }, inc.time)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="absolute right-6 top-24 z-50 w-80">
      <AnimatePresence>
        {activeIncident && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="rounded-xl border border-destructive/50 bg-card/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-destructive">
                <activeIncident.icon className="h-4 w-4" /> 
                {activeIncident.title}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{activeIncident.body}</p>
            <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 text-xs">
              <span className="text-primary font-semibold">{activeIncident.agent}</span>
              <span className="text-muted-foreground flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-pitch-green"/> Handled</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
