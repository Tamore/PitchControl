'use client'

import { motion } from 'framer-motion'
import { Crown, Ticket, Users, Radio, ShieldCheck, Settings2, Leaf } from 'lucide-react'

const ORBIT_AGENTS = [
  { id: 'ticket', icon: Ticket, radius: 65, speed: 12, offset: 0, color: 'text-[color:var(--agent-ticket)]' },
  { id: 'crowd', icon: Users, radius: 65, speed: 12, offset: 120, color: 'text-[color:var(--agent-crowd)]' },
  { id: 'broadcast', icon: Radio, radius: 65, speed: 12, offset: 240, color: 'text-[color:var(--agent-broadcast)]' },
  { id: 'guardian', icon: ShieldCheck, radius: 110, speed: 18, offset: 60, color: 'text-[color:var(--agent-guardian)]' },
  { id: 'ops', icon: Settings2, radius: 110, speed: 18, offset: 180, color: 'text-[color:var(--agent-ops)]' },
  { id: 'eco', icon: Leaf, radius: 110, speed: 18, offset: 300, color: 'text-[color:var(--agent-eco)]' },
]

export function Orbit() {
  return (
    <div className="relative flex h-[260px] w-full items-center justify-center overflow-hidden">
      {/* Background Rings */}
      <div className="absolute h-[130px] w-[130px] rounded-full border border-border/40" />
      <div className="absolute h-[220px] w-[220px] rounded-full border border-border/20 border-dashed" />

      {/* SVG Data Pulses */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 260 260">
        <defs>
          <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--electric)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--electric)" stopOpacity="1" />
          </linearGradient>
        </defs>
        {ORBIT_AGENTS.map((agent) => {
          // Calculate initial position based on offset (which is in degrees)
          // 0 offset = top (x: 130, y: 130 - radius)
          const rad = (agent.offset - 90) * (Math.PI / 180)
          
          return (
            <motion.g
              key={`pulse-${agent.id}`}
              style={{ transformOrigin: '130px 130px' }}
              animate={{ rotate: 360 }}
              transition={{
                duration: agent.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.line
                x1="130"
                y1="130"
                x2="130"
                y2={130 - agent.radius}
                stroke="url(#pulse-grad)"
                strokeWidth="2"
                strokeDasharray="4 12"
                initial={{ strokeDashoffset: 16 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                style={{ rotate: `${agent.offset}deg`, transformOrigin: '130px 130px' }}
              />
            </motion.g>
          )
        })}
      </svg>

      {/* Center: Director AI */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card shadow-lg shadow-black/50 glow-electric">
        <Crown className="h-7 w-7 text-[color:var(--agent-director)]" />
      </div>

      {/* Orbiting Agents */}
      {ORBIT_AGENTS.map((agent) => (
        <motion.div
          key={agent.id}
          className="absolute left-1/2 top-1/2"
          style={{ width: agent.radius * 2, height: agent.radius * 2, x: '-50%', y: '-50%' }}
          animate={{ rotate: 360 }}
          transition={{
            duration: agent.speed,
            repeat: Infinity,
            ease: "linear",
            delay: - (agent.speed / 360) * agent.offset // Start at correct offset
          }}
        >
          <div 
            className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm"
          >
            {/* Counter-rotate the icon so it stays upright */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: agent.speed,
                repeat: Infinity,
                ease: "linear",
                delay: - (agent.speed / 360) * agent.offset
              }}
            >
              <agent.icon className={`h-4 w-4 ${agent.color}`} />
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      {/* Subtle background glow */}
      <div className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
    </div>
  )
}
