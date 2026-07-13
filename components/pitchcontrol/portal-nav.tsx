import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PitchControlLogo } from '@/components/pitchcontrol/logo'
import { AccountMenu } from '@/components/pitchcontrol/account-menu'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'


export function PortalNav({
  label,
  cta,
  showAccount = true,
  persona = 'fan',
}: {
  label: string
  cta?: { href: string; text: string }
  showAccount?: boolean
  persona?: 'fan' | 'staff'
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <PitchControlLogo />
          
          {/* Lateral navigation removed to enforce PitchControl Gateway authentication */}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CTA removed since main NAV links handle routing now */}
          {showAccount && <AccountMenu persona={persona} />}
        </div>
      </div>
    </header>
  )
}
