'use client'

import { motion } from 'framer-motion'

export function Spotlight({ className, fill = "var(--electric)" }: { className?: string; fill?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className || ''}`}
    >
      <div 
        className="absolute left-1/2 top-0 -translate-x-1/2 opacity-20"
        style={{
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${fill}, transparent)`,
        }}
      />
    </motion.div>
  )
}
