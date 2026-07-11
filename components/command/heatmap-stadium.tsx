'use client'

import { motion } from 'framer-motion'

export function HeatmapStadium() {
  return (
    <div className="relative flex w-full h-full flex-col items-center justify-center p-4">
      
      {/* 2D Vector Stadium SVG (Advanced Node Grid - Light Theme) */}
      <svg viewBox="0 0 600 400" className="w-full h-full max-w-[800px] overflow-visible">
        <defs>
          {/* Subtle glow for normal dots */}
          <filter id="glow-normal" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Intense glow for red alerts */}
          <filter id="glow-alert" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Intense glow for amber alerts */}
          <filter id="glow-warn" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- BASE GRID GEOMETRY (Segmented Blocks) --- */}
        {/* Outer Ring 1 (Segmented) */}
        <rect x="20" y="20" width="560" height="360" rx="140" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="32" strokeDasharray="18 4" />
        
        {/* Outer Ring 2 (Segmented) */}
        <rect x="56" y="56" width="488" height="288" rx="104" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="28" strokeDasharray="16 4" />
        
        {/* Outer Ring 3 (Segmented) */}
        <rect x="88" y="88" width="424" height="224" rx="72" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="24" strokeDasharray="14 4" />

        {/* Inner Ring (VIP/Premium) */}
        <rect x="116" y="116" width="368" height="168" rx="44" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="20" strokeDasharray="12 4" />

        {/* --- NODE DOTS LAYER (Normal Status) --- */}
        {/* Using stroke-linecap round and 0 dash to create perfectly spaced dots inside the grid cells */}
        <rect x="20" y="20" width="560" height="360" rx="140" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0 22" />
        <rect x="56" y="56" width="488" height="288" rx="104" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0 20" />
        <rect x="88" y="88" width="424" height="224" rx="72" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0 18" />
        <rect x="116" y="116" width="368" height="168" rx="44" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0 16" />


        {/* --- LIVE HEATMAP OVERLAYS (Colored/Animated Nodes) --- */}
        
        {/* High Congestion: North Gate (Top Middle - Outermost rings) */}
        <motion.rect 
          x="20" y="20" width="560" height="360" rx="140" 
          fill="none" 
          stroke="#EF4444" 
          strokeWidth="6" 
          strokeLinecap="round"
          strokeDasharray="0 22 0 1000" // Only dots for a specific segment
          strokeDashoffset="-280" // Positioned at top middle
          filter="url(#glow-alert)"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect 
          x="56" y="56" width="488" height="288" rx="104" 
          fill="none" 
          stroke="#EF4444" 
          strokeWidth="6" 
          strokeLinecap="round"
          strokeDasharray="0 20 0 1000" 
          strokeDashoffset="-240" 
          filter="url(#glow-alert)"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />

        {/* Medium Congestion: West Concourse (Left Middle) */}
        <motion.rect 
          x="56" y="56" width="488" height="288" rx="104" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="5" 
          strokeLinecap="round"
          strokeDasharray="0 20 0 1000" 
          strokeDashoffset="-750" 
          filter="url(#glow-warn)"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect 
          x="88" y="88" width="424" height="224" rx="72" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="5" 
          strokeLinecap="round"
          strokeDasharray="0 18 0 1000" 
          strokeDashoffset="-630" 
          filter="url(#glow-warn)"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        {/* --- PITCH AREA --- */}
        {/* The Pitch Background */}
        <rect x="140" y="136" width="320" height="128" rx="8" fill="#E2E8F0" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
        
        {/* Pitch Markings */}
        {/* Center Line & Circle */}
        <line x1="300" y1="136" x2="300" y2="264" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <circle cx="300" cy="200" r="30" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <circle cx="300" cy="200" r="3" fill="rgba(0,0,0,0.2)" />
        
        {/* Penalty Boxes */}
        <rect x="140" y="160" width="50" height="80" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <rect x="410" y="160" width="50" height="80" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        
        {/* Goal Areas */}
        <rect x="140" y="176" width="16" height="48" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <rect x="444" y="176" width="16" height="48" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        
        {/* Corner Arcs */}
        <path d="M 148 136 A 8 8 0 0 0 140 144" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <path d="M 140 256 A 8 8 0 0 0 148 264" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <path d="M 452 136 A 8 8 0 0 1 460 144" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <path d="M 460 256 A 8 8 0 0 1 452 264" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      </svg>

      {/* Heatmap Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4 bg-card/80 backdrop-blur-md border border-border/70 rounded-lg px-4 py-2 text-xs font-medium text-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span>Congested (92%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          <span>Busy (85%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          <span>Nominal</span>
        </div>
      </div>
    </div>
  )
}
