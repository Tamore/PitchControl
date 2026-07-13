import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'

export function Spinner({ className = '' }: { className?: string }) {
  return <Loader2 className={`animate-spin text-primary ${className}`} />
}

export function LoadingBlock({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-border/70 bg-card/60 p-10 text-center">
      <Spinner className="h-6 w-6" />
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  )
}

/** Skeleton shimmer bar for loading placeholders. */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-secondary ${className}`} />
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-card/40 p-10 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-secondary/60 text-muted-foreground">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
