'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type ZoneId = 'tier1' | 'tier2' | 'supporter' | 'family' | 'access'

export interface BlockInfo {
  id: string;
  zoneId: ZoneId;
  zoneLabel: string;
  cx: number;
  cy: number;
  blockIndex: number;
  sectionName: string;
  price: string;
}

interface InteractiveSeatMapProps {
  selectedBlock?: BlockInfo | null
  onSelect?: (block: BlockInfo) => void
  basePrice?: string
  readOnly?: boolean
  activeSection?: string
}

const ZONES = [
  { 
    id: 'tier1' as ZoneId, 
    label: 'Tier 1 (Lower)',
    multiplier: 1.0,
    rect: { x: 116, y: 116, w: 368, h: 168, rx: 44, spacing: 32 },
    thickness: 20
  },
  { 
    id: 'tier2' as ZoneId, 
    label: 'Tier 2 (Club)',
    multiplier: 1.4,
    rect: { x: 88, y: 88, w: 424, h: 224, rx: 72, spacing: 34 },
    thickness: 20
  },
  { 
    id: 'family' as ZoneId, 
    label: 'Family Section',
    multiplier: 0.8,
    rect: { x: 56, y: 56, w: 488, h: 288, rx: 104, spacing: 36 },
    thickness: 20
  },
  { 
    id: 'supporter' as ZoneId, 
    label: 'Supporter Section',
    multiplier: 0.7,
    rect: { x: 20, y: 20, w: 560, h: 360, rx: 140, spacing: 38 },
    thickness: 24
  },
  { 
    id: 'access' as ZoneId, 
    label: 'Accessible',
    multiplier: 1.0,
    // Just a slightly larger ring to represent accessible platforms on the concourse
    rect: { x: -8, y: -8, w: 616, h: 416, rx: 168, spacing: 44 },
    thickness: 16
  },
]

// Mathematical engine to calculate points along a rounded rectangle
function getPointOnRoundedRect(x: number, y: number, w: number, h: number, rx: number, d: number) {
  const topL = w - 2*rx;
  const rightL = h - 2*rx;
  const arcL = Math.PI * rx / 2;
  
  let current = d;
  
  // 1. Top segment (going right)
  if (current <= topL) return { x: x + rx + current, y: y };
  current -= topL;
  
  // 2. Top-Right arc
  if (current <= arcL) {
    const angle = -Math.PI/2 + (current / arcL) * (Math.PI/2);
    return { x: (x + w - rx) + rx * Math.cos(angle), y: (y + rx) + rx * Math.sin(angle) };
  }
  current -= arcL;
  
  // 3. Right segment (going down)
  if (current <= rightL) return { x: x + w, y: y + rx + current };
  current -= rightL;
  
  // 4. Bottom-Right arc
  if (current <= arcL) {
    const angle = 0 + (current / arcL) * (Math.PI/2);
    return { x: (x + w - rx) + rx * Math.cos(angle), y: (y + h - rx) + rx * Math.sin(angle) };
  }
  current -= arcL;
  
  // 5. Bottom segment (going left)
  if (current <= topL) return { x: x + w - rx - current, y: y + h };
  current -= topL;
  
  // 6. Bottom-Left arc
  if (current <= arcL) {
    const angle = Math.PI/2 + (current / arcL) * (Math.PI/2);
    return { x: (x + rx) + rx * Math.cos(angle), y: (y + h - rx) + rx * Math.sin(angle) };
  }
  current -= arcL;
  
  // 7. Left segment (going up)
  if (current <= rightL) return { x: x, y: y + h - rx - current };
  current -= rightL;
  
  // 8. Top-Left arc
  if (current <= arcL) {
    const angle = Math.PI + (current / arcL) * (Math.PI/2);
    return { x: (x + rx) + rx * Math.cos(angle), y: (y + rx) + rx * Math.sin(angle) };
  }
  
  return { x: x + rx, y: y }; // Fallback
}

export function InteractiveSeatMap({ selectedBlock, onSelect, basePrice = '$0', readOnly = false, activeSection }: InteractiveSeatMapProps) {
  const [hoveredBlock, setHoveredBlock] = useState<BlockInfo | null>(null)

  // Quick helper to calculate price based on multiplier
  const getPrice = (multiplier: number) => {
    const numericBase = parseInt(basePrice.replace(/[^0-9]/g, ''))
    if (isNaN(numericBase)) return basePrice
    return `$${Math.round(numericBase * multiplier)}`
  }

  // Generate all segmented blocks and their coordinate geometry
  const generatedBlocks: BlockInfo[] = []
  
  // We compute the exact SVG dash properties for each zone so we can overlay highlights
  const zoneDashProps: Record<string, { L: number, G: number, period: number }> = {}

  ZONES.forEach(zone => {
    const { x, y, w, h, rx, spacing } = zone.rect
    const perimeter = 2 * (w - 2*rx) + 2 * (h - 2*rx) + 2 * Math.PI * rx
    const gap = 6 // 6px gap between blocks
    const targetBlockLength = spacing - gap
    const period = targetBlockLength + gap
    const numBlocks = Math.floor(perimeter / period)
    const actualPeriod = perimeter / numBlocks
    const L = actualPeriod * (targetBlockLength / period)
    const G = actualPeriod * (gap / period)
    
    zoneDashProps[zone.id] = { L, G, period: actualPeriod }

    // We start section numbering around the stadium ring
    const prefix = zone.id === 'tier1' ? '1' : zone.id === 'tier2' ? '2' : zone.id === 'family' ? '3' : zone.id === 'supporter' ? '4' : '5'

    for (let i = 0; i < numBlocks; i++) {
      // Calculate the geometric center of this block for tooltip and hitbox positioning
      const dCenter = i * actualPeriod + (L / 2)
      const pt = getPointOnRoundedRect(x, y, w, h, rx, dCenter)
      
      generatedBlocks.push({
        id: `${zone.id}-${i}`,
        zoneId: zone.id,
        zoneLabel: zone.label,
        cx: pt.x,
        cy: pt.y,
        blockIndex: i,
        sectionName: `${prefix}${String(i + 1).padStart(2, '0')}`,
        price: getPrice(zone.multiplier)
      })
    }
  })

  // Determine which block is active for tooltip rendering
  const activeBlockData = hoveredBlock || selectedBlock || (activeSection ? generatedBlocks.find(b => b.sectionName === activeSection) : null)

  return (
    <div className="absolute inset-0 p-2 sm:p-4 flex items-center justify-center">
      <div className={`w-full h-full bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex items-center justify-center p-2 sm:p-6 ${readOnly ? 'pointer-events-none' : ''}`}>
        {/* 2D Vector Stadium SVG */}
        <svg viewBox="-24 -24 648 448" className={`w-full h-full overflow-visible z-0 ${!readOnly && 'cursor-crosshair'}`}>
          <defs>
            <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* The Pitch Background */}
          <rect x="140" y="136" width="320" height="128" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          
          {/* Pitch Markings */}
          <line x1="300" y1="136" x2="300" y2="264" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="300" cy="200" r="30" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="300" cy="200" r="3" fill="#CBD5E1" />
          <rect x="140" y="160" width="50" height="80" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="410" y="160" width="50" height="80" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="140" y="176" width="16" height="48" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="444" y="176" width="16" height="48" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* 1. Base Tracks (Inactive segmented blocks) */}
        {ZONES.map(zone => {
          const props = zoneDashProps[zone.id]
          const inactiveColors = {
            tier1: '#6EE7B7', // emerald-300
            tier2: '#C4B5FD', // violet-300
            family: '#93C5FD', // blue-300
            supporter: '#FDBA74', // orange-300
            access: '#E2E8F0' // slate-200
          }
          return (
            <rect 
              key={`track-${zone.id}`}
              x={zone.rect.x} y={zone.rect.y} width={zone.rect.w} height={zone.rect.h} rx={zone.rect.rx}
              fill="none" 
              stroke={inactiveColors[zone.id as keyof typeof inactiveColors]} 
              strokeWidth={zone.thickness}
              strokeDasharray={`${props.L} ${props.G}`}
              strokeLinecap="butt"
              className="opacity-90"
            />
          )
        })}

        {/* 2. Highlighted Block Overlay */}
        {/* We dynamically draw a single solid block perfectly over the track based on dashoffset */}
        <AnimatePresence>
          {activeBlockData && (() => {
            const activeZone = ZONES.find(z => z.id === activeBlockData.zoneId)!
            const props = zoneDashProps[activeZone.id]
            return (
              <motion.rect
                key="highlight-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                x={activeZone.rect.x} y={activeZone.rect.y} width={activeZone.rect.w} height={activeZone.rect.h} rx={activeZone.rect.rx}
                fill="none" 
                stroke="#0F172A" 
                strokeWidth={activeZone.thickness}
                strokeDasharray={`${props.L} 99999`}
                strokeDashoffset={-(activeBlockData.blockIndex * props.period)}
                strokeLinecap="butt"
                filter="url(#glow-selected)"
                className="pointer-events-none"
              />
            )
          })()}
        </AnimatePresence>

        {/* 3. Invisible Hitboxes for Mouse Interaction */}
        {!readOnly && generatedBlocks.map(block => (
          <circle
            key={block.id}
            cx={block.cx}
            cy={block.cy}
            r={14} // Large enough hitbox for easy clicking
            fill="transparent"
            className="cursor-pointer"
            onClick={() => onSelect?.(block)}
            onMouseEnter={() => setHoveredBlock(block)}
            onMouseLeave={() => setHoveredBlock(null)}
          />
        ))}

        {/* 4. Embedded SVG Tooltip */}
        <AnimatePresence>
          {!readOnly && activeBlockData && (
            <foreignObject
              x={activeBlockData.cx - 100}
              y={activeBlockData.cy - 72}
              width={200}
              height={72}
              className="overflow-visible pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.15 }}
                className="w-full h-full flex flex-col items-center justify-end pb-1"
              >
                <div className="bg-[#0F172A] text-white px-3 py-1.5 rounded-lg shadow-lg border border-slate-700 pointer-events-auto">
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest opacity-80 mb-0.5 leading-none text-center">
                    Section {activeBlockData.sectionName}
                  </div>
                  <div className="font-display font-bold text-lg leading-none text-center text-[#FCD34D]">
                    {activeBlockData.price}
                  </div>
                </div>
                {/* Tooltip Arrow */}
                <div className="w-3 h-3 bg-[#0F172A] rotate-45 -mt-1.5 border-r border-b border-slate-700 shadow-sm" />
              </motion.div>
            </foreignObject>
          )}
        </AnimatePresence>
      </svg>
      </div>
    </div>
  )
}
