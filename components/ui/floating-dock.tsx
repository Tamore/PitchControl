'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Smartphone, MonitorPlay } from 'lucide-react'

const DOCK_ITEMS = [
  { id: 'fanhub', label: 'Fan Hub', icon: Smartphone, href: '/fanhub' },
  { id: 'command', label: 'Command Center', icon: MonitorPlay, href: '/command' },
]

export function FloatingDock() {
  const pathname = usePathname()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Only show dock if we are on one of the main pages
  if (pathname === '/') return null

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-end justify-center">
      <motion.div 
        className="flex items-end gap-3 rounded-2xl border border-border/50 bg-background/80 px-4 py-3 backdrop-blur-md shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {DOCK_ITEMS.map((item, idx) => {
          const isActive = pathname === item.href
          
          return (
            <Link key={item.id} href={item.href}>
              <div 
                className="relative flex flex-col items-center justify-end"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute -top-10 whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs font-medium text-foreground shadow-sm border border-border"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className={`flex items-center justify-center rounded-xl border ${
                    isActive 
                      ? 'border-primary/50 bg-primary/10 text-primary' 
                      : 'border-transparent bg-transparent text-muted-foreground hover:bg-secondary'
                  }`}
                  initial={false}
                  animate={{
                    width: hoveredIndex === idx ? 56 : 48,
                    height: hoveredIndex === idx ? 56 : 48,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <item.icon className={`transition-all duration-300 ${hoveredIndex === idx ? 'h-6 w-6' : 'h-5 w-5'}`} />
                </motion.div>
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="dock-indicator"
                    className="absolute -bottom-2 h-1 w-1 rounded-full bg-primary" 
                  />
                )}
              </div>
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
}
