'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  User,
  Wallet,
  Settings,
  Accessibility,
  Sparkles,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { FAN, STAFF, NOTIFICATIONS } from '@/lib/fan-data'

const MENU = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/accessibility', label: 'Accessibility', icon: Accessibility },
  { href: '/transparency', label: 'AI Transparency', icon: Sparkles },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function AccountMenu({ persona = 'fan' }: { persona?: 'fan' | 'staff' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const unread = NOTIFICATIONS.filter((n) => !n.read).length
  const activeProfile = persona === 'staff' ? STAFF : FAN

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href="/notifications"
        aria-label={`Notifications, ${unread} unread`}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:text-foreground"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">
            {unread}
          </span>
        )}
      </Link>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Account menu"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 py-1 pl-1 pr-2.5 transition-colors hover:border-primary/40"
        >
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
            {activeProfile.avatar ? (
              <Image src={activeProfile.avatar} alt={activeProfile.name} fill className="object-cover" sizes="28px" />
            ) : (
              <User className="h-4 w-4 text-muted-foreground" />
            )}
          </span>
          <span className="hidden text-xs font-medium text-foreground sm:inline">
            {activeProfile.name.split(' ')[0]}
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.16 }}
              role="menu"
              className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-border/70 bg-popover p-1.5 shadow-2xl"
            >
              {persona === 'fan' ? (
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary"
                >
                  <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                    {activeProfile.avatar ? (
                      <Image src={activeProfile.avatar} alt={activeProfile.name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <User className="h-5 w-5 text-muted-foreground" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-popover-foreground">
                      {activeProfile.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{activeProfile.tier}</span>
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Link>
              ) : (
                <div className="flex items-center gap-3 rounded-xl p-2.5 cursor-default">
                  <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                    {activeProfile.avatar ? (
                      <Image src={activeProfile.avatar} alt={activeProfile.name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <User className="h-5 w-5 text-muted-foreground" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-popover-foreground">
                      {activeProfile.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{activeProfile.tier}</span>
                  </span>
                </div>
              )}

              <div className="my-1.5 h-px bg-border/60" />

              {persona === 'fan' && MENU.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary"
                >
                  <m.icon className="h-4 w-4 text-muted-foreground" />
                  {m.label}
                  {m.href === '/notifications' && unread > 0 && (
                    <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.65rem] font-bold text-primary-foreground">
                      {unread}
                    </span>
                  )}
                </Link>
              ))}

              {persona === 'fan' && <div className="my-1.5 h-px bg-border/60" />}

              <Link
                href="/"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
