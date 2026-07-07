'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'
import { AegisLogo } from '@/components/aegis/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log('[v0] Command Center error boundary:', error.message)
  }, [error])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-5 text-center text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-tactical opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-destructive/10 blur-[120px]" />

      <div className="relative mb-8">
        <AegisLogo className="scale-110" />
      </div>

      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-destructive/40 bg-destructive/10 text-destructive">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="relative mt-6 font-display text-3xl font-bold tracking-tight">
        A subsystem went offline
      </h1>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        An unexpected fault interrupted this view. The shared event bus is still running — you can
        retry the operation or return to home while the agents recover.
      </p>
      {error.digest && (
        <p className="relative mt-3 font-mono text-[0.7rem] text-muted-foreground">
          Trace ID · {error.digest}
        </p>
      )}

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-11 gap-2 bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90',
          )}
        >
          <RotateCcw className="h-4 w-4" /> Retry
        </button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'h-11 gap-2 border-border bg-secondary/40 px-5 hover:bg-secondary',
          )}
        >
          <Home className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </div>
  )
}
