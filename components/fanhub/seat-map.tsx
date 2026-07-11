'use client'

import { motion } from 'framer-motion'

export function SeatMap({ section = '112', row = 'F', seat = '14' }) {
  return (
    <div className="relative flex w-full h-full flex-col items-center justify-center rounded-3xl border border-gray-200 overflow-hidden shadow-sm bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] p-8">
      
      {/* 2D Vector Stadium SVG */}
      <svg viewBox="0 0 600 400" className="w-full h-full max-w-[800px] overflow-visible">
        {/* Outer Ring 1 */}
        <rect x="20" y="20" width="560" height="360" rx="160" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="35" strokeDasharray="30 8" />
        
        {/* Outer Ring 2 */}
        <rect x="65" y="65" width="470" height="270" rx="120" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="30" strokeDasharray="25 6" />
        
        {/* Inner Ring (VIP/Premium) */}
        <rect x="110" y="110" width="380" height="180" rx="80" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="25" strokeDasharray="20 5" />

        {/* Highlighted Block (Section 112) - Bottom Left Curve */}
        {/* We use an exact clone of the rect with a specific dash offset to perfectly highlight ONE distinct block */}
        <motion.rect 
          x="110" y="110" width="380" height="180" rx="80" 
          fill="none" 
          stroke="#3B82F6" 
          strokeWidth="25" 
          strokeDasharray="20 1000"
          strokeDashoffset="-725"
          className="drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* The Pitch Background */}
        <rect x="150" y="140" width="300" height="120" rx="12" fill="#E2E8F0" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
        
        {/* Pitch Markings */}
        {/* Center Line & Circle */}
        <line x1="300" y1="140" x2="300" y2="260" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        <circle cx="300" cy="200" r="25" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        
        {/* Penalty Boxes */}
        <rect x="150" y="165" width="45" height="70" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        <rect x="405" y="165" width="45" height="70" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        
        {/* Goal Areas */}
        <rect x="150" y="182" width="15" height="36" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        <rect x="435" y="182" width="15" height="36" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
      </svg>
    </div>
  )
}
