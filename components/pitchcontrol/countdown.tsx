'use client'

import { useEffect, useState } from 'react'

function useCountdown(targetOffsetSeconds: number) {
  const [remaining, setRemaining] = useState(targetOffsetSeconds)
  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [])
  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  return { h, m, s }
}

export function Countdown({
  seconds = 6138,
  className = '',
  tone = 'accent',
}: {
  seconds?: number
  className?: string
  tone?: 'accent' | 'primary'
}) {
  const { h, m, s } = useCountdown(seconds)
  const pad = (n: number) => n.toString().padStart(2, '0')
  const cells = [
    { v: pad(h), l: 'HRS' },
    { v: pad(m), l: 'MIN' },
    { v: pad(s), l: 'SEC' },
  ]
  const toneClass = tone === 'accent' ? 'text-accent' : 'text-primary'
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {cells.map((c, i) => (
        <div key={c.l} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`font-display text-3xl font-bold tabular-nums ${toneClass} sm:text-4xl`}
            >
              {c.v}
            </span>
            <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {c.l}
            </span>
          </div>
          {i < cells.length - 1 && (
            <span className={`-mt-4 font-display text-3xl font-bold ${toneClass} sm:text-4xl`}>:</span>
          )}
        </div>
      ))}
    </div>
  )
}
