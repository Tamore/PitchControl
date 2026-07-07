'use client'

import Link from 'next/link'
import { AegisLogo } from '@/components/aegis/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'AI Workforce', href: '#workforce' },
  { label: 'Portals', href: '#portals' },
  { label: 'Trust', href: '#trust' },
]

export function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-8">
          <AegisLogo />
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 hidden items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Live · FIFA WC 2026
          </span>
          <Link
            href="/fanhub"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'hidden text-foreground hover:bg-secondary sm:inline-flex',
            )}
          >
            FanHub
          </Link>
          <Link
            href="/command"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-primary font-semibold text-primary-foreground hover:bg-primary/90',
            )}
          >
            Command Center
          </Link>
        </div>
      </div>
    </header>
  )
}
