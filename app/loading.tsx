import { PitchControlLogo } from '@/components/pitchcontrol/logo'
import { Spinner } from '@/components/pitchcontrol/states'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-tactical opacity-30" />
      <PitchControlLogo className="scale-125" />
      <div className="flex items-center gap-2.5">
        <Spinner className="h-4 w-4" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Syncing shared memory
        </span>
      </div>
    </div>
  )
}
