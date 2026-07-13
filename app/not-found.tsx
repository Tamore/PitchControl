import Link from 'next/link'
import { Compass, Home, Activity, Radio } from 'lucide-react'
import { PitchControlLogo } from '@/components/pitchcontrol/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-5 text-center text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-tactical opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mb-8">
        <PitchControlLogo className="scale-110" />
      </div>

      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
        <Compass className="h-7 w-7" />
      </span>
      <p className="relative mt-6 font-display text-6xl font-bold tracking-tight text-glow-electric">
        404
      </p>
      <h1 className="relative mt-2 font-display text-2xl font-bold tracking-tight">
        This sector is off the map
      </h1>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        The page you are looking for is not part of the stadium grid. Head back to a known portal.
      </p>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-11 gap-2 bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90',
          )}
        >
          <Home className="h-4 w-4" /> Home
        </Link>
        <Link
          href="/command"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'h-11 gap-2 border-border bg-secondary/40 px-5 hover:bg-secondary',
          )}
        >
          <Activity className="h-4 w-4" /> Command Center
        </Link>
        <Link
          href="/fanhub"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'h-11 gap-2 border-border bg-secondary/40 px-5 hover:bg-secondary',
          )}
        >
          <Radio className="h-4 w-4" /> FanHub
        </Link>
      </div>
    </div>
  )
}
