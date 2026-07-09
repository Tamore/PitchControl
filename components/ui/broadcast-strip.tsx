'use client'

import { Activity, Clock, Volume2, Users } from 'lucide-react'

export function BroadcastStrip() {
  return (
    <div className="sticky top-0 z-50 flex h-10 w-full items-center justify-between border-b border-border/80 bg-carbon/95 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur md:px-6">
      {/* Left: Tournament & Match State */}
      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        <div className="flex items-center gap-2 pr-4 border-r border-border/80">
          <span className="font-display font-black text-primary tracking-widest">FIFA26</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
          </span>
          <span className="text-foreground font-bold">LIVE</span>
        </div>

        <div className="hidden h-4 w-px bg-border/80 md:block" />

        <div className="flex items-center gap-3 text-foreground bg-secondary/30 px-3 py-1 rounded-md border border-border/50">
          <span className="text-lg leading-none">🇦🇷</span>
          <span className="font-display font-bold">ARG</span>
          <span className="flex items-center justify-center rounded bg-secondary px-2 py-0.5 font-mono text-sm text-primary">2</span>
          <span className="text-border">-</span>
          <span className="flex items-center justify-center rounded bg-secondary px-2 py-0.5 font-mono text-sm">1</span>
          <span className="font-display font-bold">BRA</span>
          <span className="text-lg leading-none">🇧🇷</span>
        </div>
      </div>

      {/* Center: ESPN-Style Scrolling Ticker */}
      <div className="hidden flex-1 overflow-hidden px-6 lg:block relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-carbon/95 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-carbon/95 to-transparent z-10" />
        <div className="whitespace-nowrap animate-ticker flex gap-12 items-center h-full">
          <span className="text-primary font-bold">LATEST UPDATES </span>
          <span><span className="text-muted-foreground mr-2">75'</span> Neymar substituted due to minor injury </span>
          <span className="text-border">•</span>
          <span><span className="text-muted-foreground mr-2">INFO</span> Gates 4-7 experiencing heavy congestion (84% capacity) </span>
          <span className="text-border">•</span>
          <span><span className="text-muted-foreground mr-2">WEATHER</span> 24°C, Clear skies, 65% Humidity </span>
          <span className="text-border">•</span>
          <span><span className="text-muted-foreground mr-2">OFFICIALS</span> Referee: Szymon Marciniak (POL) </span>
        </div>
      </div>

      {/* Right: Telemetry */}
      <div className="flex items-center gap-4 md:gap-6 shrink-0">
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
