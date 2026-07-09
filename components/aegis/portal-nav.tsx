import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AegisLogo } from '@/components/aegis/logo'
import { AccountMenu } from '@/components/aegis/account-menu'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Global Tournament', href: '/' },
  { label: 'Match Experience', href: '/fanhub' },
  { label: 'Stadium Operations', href: '/command' },
]

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
          
          <nav className="hidden items-center gap-7 md:flex ml-4">
            {NAV.map((item) => {
              const isActive = (label === 'FanHub' && item.href === '/fanhub') || 
                               (label === 'Command Center' && item.href === '/command') ||
                               (label !== 'FanHub' && label !== 'Command Center' && item.href === '/')
                               
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CTA removed since main NAV links handle routing now */}
          {showAccount && <AccountMenu />}
        </div>
      </div>
    </header>
  )
}
