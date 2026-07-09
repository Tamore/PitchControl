'use client'

import { Activity, Clock, Volume2, Users } from 'lucide-react'

export function BroadcastStrip() {
  return (
    <div className="sticky top-0 z-50 flex h-10 w-full items-center justify-between border-b border-border/80 bg-carbon/95 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur md:px-6">
      {/* Left: Match State */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
          </span>
          <span className="text-foreground">LIVE</span>
        </div>

        <div className="hidden h-4 w-px bg-border/80 md:block" />

        <div className="flex items-center gap-3 text-foreground">
          <span className="text-lg">🇦🇷</span>
          <span className="font-display font-bold">ARG</span>
          <span className="flex items-center justify-center rounded bg-secondary px-2 py-0.5 font-mono text-sm">2</span>
          <span className="text-border">-</span>
          <span className="flex items-center justify-center rounded bg-secondary px-2 py-0.5 font-mono text-sm">1</span>
          <span className="font-display font-bold">BRA</span>
          <span className="text-lg">🇧🇷</span>
        </div>
      </div>

      {/* Right: Telemetry */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden items-center gap-2 md:flex">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-foreground">78:12</span>
        </div>

        <div className="hidden h-4 w-px bg-border/80 md:block" />

        <div className="hidden items-center gap-2 md:flex">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-foreground">82,517</span>
        </div>

        <div className="hidden h-4 w-px bg-border/80 md:block" />

        <div className="flex items-center gap-2">
          <Volume2 className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-foreground">114 dB</span>
        </div>
      </div>
    </div>
  )
}
