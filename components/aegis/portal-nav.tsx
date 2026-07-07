import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AegisLogo } from '@/components/aegis/logo'
import { AccountMenu } from '@/components/aegis/account-menu'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PortalNav({
  label,
  cta,
  showAccount = true,
}: {
  label: string
  cta: { href: string; text: string }
  showAccount?: boolean
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
          <AegisLogo />
          <span className="hidden rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={cta.href}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'hidden border-border bg-secondary/40 hover:bg-secondary sm:inline-flex',
            )}
          >
            {cta.text}
          </Link>
          {showAccount && <AccountMenu />}
        </div>
      </div>
    </header>
  )
}
