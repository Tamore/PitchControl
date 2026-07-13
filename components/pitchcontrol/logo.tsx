import { cn } from '@/lib/utils'

export function PitchControlLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
          <path
            d="M16 2 L28 7 V16 C28 23 22.5 28.5 16 30.5 C9.5 28.5 4 23 4 16 V7 Z"
            className="fill-primary/10 stroke-primary"
            strokeWidth="1.5"
          />
          <path
            d="M16 9 L16 22 M11 13 L21 13 M11 18 L21 18"
            className="stroke-primary"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm font-bold tracking-tight text-foreground">
          PITCH
        </span>
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          CONTROL
        </span>
      </span>
    </div>
  )
}
