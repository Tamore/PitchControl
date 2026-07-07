'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStadium } from '@/components/providers/StadiumProvider'

type Zone = {
  id: string
  d: string
  base: number // baseline density 0..1
  label: string
  cx: number
  cy: number
}

// Concentric bowl zones around the pitch (viewBox 0 0 800 480)
const ZONES: Zone[] = [
  { id: 'N', d: 'M180 70 H620 L560 140 H240 Z', base: 0.9, label: 'North', cx: 400, cy: 100 },
  { id: 'S', d: 'M240 340 H560 L620 410 H180 Z', base: 0.55, label: 'South', cx: 400, cy: 378 },
  { id: 'W', d: 'M180 70 L240 140 V340 L180 410 Z', base: 0.7, label: 'West', cx: 205, cy: 240 },
  { id: 'E', d: 'M620 70 L560 140 V340 L620 410 Z', base: 0.62, label: 'East', cx: 595, cy: 240 },
]

const GATES = [
  { id: 'G1', x: 400, y: 58, label: 'Gate 1' },
  { id: 'G4', x: 168, y: 240, label: 'Gate C' },
  { id: 'G2', x: 632, y: 240, label: 'Gate 2' },
  { id: 'G3', x: 400, y: 422, label: 'Gate 3' },
]

function densityColor(v: number) {
  // green (low) -> gold -> red (high)
  if (v > 0.82) return 'var(--signal)'
  if (v > 0.6) return 'var(--gold)'
  return 'var(--pitch-green)'
}

export function HoloStadium() {
  const { crowdData } = useStadium()
  const [pulse, setPulse] = useState(0)
  
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 800 480" className="h-full w-full" role="img" aria-label="Live stadium crowd heatmap">
        <defs>
          <radialGradient id="pitchGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--pitch-green)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--pitch-green)" stopOpacity="0.08" />
          </radialGradient>
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--electric)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--electric)" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* zone heatmap */}
        {ZONES.map((z) => {
          const jitter = Math.sin((pulse + z.cx) * 0.7) * 0.08
          // If the zone corresponds to the reported congested gate (e.g., Gate C is in West zone), boost its base density!
          const isCongestedZone = (crowdData.gate === 'Gate C' && z.label === 'West') || (crowdData.gate === 'Gate 1' && z.label === 'North');
          const dynamicBase = isCongestedZone ? (crowdData.congestion / 100) : z.base;
          const v = Math.min(1, Math.max(0.2, dynamicBase + jitter))
          return (
            <g key={z.id}>
              <motion.path
                d={z.d}
                fill={densityColor(v)}
                initial={{ opacity: 0.25 }}
                animate={{ opacity: 0.28 + v * 0.5 }}
                transition={{ duration: 1.4 }}
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={z.cx}
                y={z.cy}
                textAnchor="middle"
                className="fill-ice font-mono"
                fontSize="13"
                opacity="0.85"
              >
                {Math.round(v * 100)}%
              </text>
              <text
                x={z.cx}
                y={z.cy + 16}
                textAnchor="middle"
                className="fill-ice/60 font-mono"
                fontSize="9"
                letterSpacing="1.5"
              >
                {z.label.toUpperCase()}
              </text>
            </g>
          )
        })}

        {/* pitch */}
        <rect x="240" y="140" width="320" height="200" rx="6" fill="url(#pitchGlow)" stroke="var(--electric)" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="400" y1="140" x2="400" y2="340" stroke="var(--ice)" strokeWidth="1" strokeOpacity="0.35" />
        <circle cx="400" cy="240" r="34" fill="none" stroke="var(--ice)" strokeWidth="1" strokeOpacity="0.35" />
        <circle cx="400" cy="240" r="3" fill="var(--electric)" />

        {/* radar sweep */}
        <g style={{ transformOrigin: '400px 240px' }} className="animate-sweep">
          <polygon points="400,240 400,140 480,150" fill="url(#sweepGrad)" />
        </g>

        {/* gates */}
        {GATES.map((g) => {
          const isHot = g.label === crowdData.gate && crowdData.congestion > 70;
          return (
            <g key={g.id}>
              {isHot && (
                <circle cx={g.x} cy={g.y} r="10" fill="var(--signal)" opacity="0.5" className="animate-pulse-ring" style={{ transformOrigin: `${g.x}px ${g.y}px` }} />
              )}
              <circle cx={g.x} cy={g.y} r="7" fill={isHot ? 'var(--signal)' : 'var(--electric)'} />
              <circle cx={g.x} cy={g.y} r="3" fill="var(--pitch)" />
              <text x={g.x} y={g.y - 14} textAnchor="middle" className="fill-ice/80 font-mono" fontSize="9" letterSpacing="1">
                {g.label.toUpperCase()}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg border border-border/60 bg-card/70 px-3 py-2 backdrop-blur">
        {[
          { c: 'var(--pitch-green)', l: 'Clear' },
          { c: 'var(--gold)', l: 'Busy' },
          { c: 'var(--signal)', l: 'Congested' },
        ].map((x) => (
          <span key={x.l} className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: x.c }} />
            {x.l}
          </span>
        ))}
      </div>
    </div>
  )
}
