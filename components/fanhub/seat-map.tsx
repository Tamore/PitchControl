'use client'

import { motion } from 'framer-motion'

export function SeatMap({ section = '112', row = 'F', seat = '14' }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center rounded-3xl border border-border/80 bg-carbon p-8 overflow-hidden h-full min-h-[500px]">
      {/* Background grid */}
      <div className="absolute inset-0 grid-tactical opacity-20 pointer-events-none" />
      
      <div className="relative w-full max-w-[600px] aspect-[4/3]">
        {/* Isometric Stadium SVG */}
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <defs>
            <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="standGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>

          {/* Isometric Transform Group */}
          <g transform="translate(400, 200) scale(1, 0.5) rotate(45)">
            {/* Outer Stand Base */}
            <rect x="-300" y="-300" width="600" height="600" rx="40" fill="url(#standGrad)" stroke="#374151" strokeWidth="4" />
            
            {/* Field */}
            <rect x="-180" y="-220" width="360" height="440" rx="10" fill="url(#pitchGrad)" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
            <circle cx="0" cy="0" r="40" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
            <line x1="-180" y1="0" x2="180" y2="0" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
            
            {/* Highlighted Section (112 - South East Stand) */}
            <motion.path 
              d="M 180 50 L 280 50 L 280 220 L 180 220 Z" 
              fill="#F4C542" 
              fillOpacity="0.3"
              stroke="#F4C542"
              strokeWidth="4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Seat Pin Point */}
            <motion.circle 
              cx="230" 
              cy="135" 
              r="6" 
              fill="#3B82F6" 
              stroke="#FFFFFF" 
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            />
          </g>
          
          {/* Labeling overlaid on 2D space */}
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <line x1="580" y1="360" x2="650" y2="280" stroke="#F4C542" strokeWidth="2" strokeDasharray="4 4" />
            <rect x="630" y="230" width="140" height="50" rx="8" fill="#121212" stroke="#F4C542" />
            <text x="700" y="250" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">SECTION {section}</text>
            <text x="700" y="268" textAnchor="middle" fill="#9CA3AF" fontSize="10">Row {row} • Seat {seat}</text>
          </motion.g>
        </svg>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-6 py-4 backdrop-blur">
        <div>
          <h3 className="font-display font-bold text-primary">Your Seat</h3>
          <p className="text-xs text-primary/80">Best entry: Gate C (West Concourse)</p>
        </div>
        <div className="flex h-10 items-center justify-center rounded-lg bg-primary px-4 font-mono font-bold text-primary-foreground">
          {section}-{row}-{seat}
        </div>
      </div>
    </div>
  )
}
