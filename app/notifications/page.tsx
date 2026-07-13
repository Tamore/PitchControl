'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BellOff, CheckCheck, Bell } from 'lucide-react'
import { FanShell } from '@/components/pitchcontrol/fan-shell'
import { EmptyState } from '@/components/pitchcontrol/states'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NOTIFICATIONS, NOTIFICATION_META, type Notification } from '@/lib/fan-data'

const FILTERS = ['All', 'Unread', 'Ticketing', 'Transport', 'Safety', 'Broadcast'] as const
type Filter = (typeof FILTERS)[number]

const filterMatch: Record<Exclude<Filter, 'All' | 'Unread'>, Notification['kind'][]> = {
  Ticketing: ['ticket'],
  Transport: ['transport'],
  Safety: ['safety'],
  Broadcast: ['broadcast', 'alert'],
}

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(NOTIFICATIONS)
  const [filter, setFilter] = useState<Filter>('All')

  const unread = items.filter((n) => !n.read).length

  const visible = useMemo(() => {
    if (filter === 'All') return items
    if (filter === 'Unread') return items.filter((n) => !n.read)
    return items.filter((n) => filterMatch[filter].includes(n.kind))
  }, [items, filter])

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }
  function toggleRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))
  }

  return (
    <FanShell
      title="Notification Center"
      subtitle={`Live match-day updates from your AI workforce.${unread ? ` You have ${unread} unread.` : ' You are all caught up.'}`}
      actions={
        <button
          onClick={markAllRead}
          disabled={unread === 0}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'gap-2 border-border bg-secondary/40 hover:bg-secondary disabled:opacity-50',
          )}
        >
          <CheckCheck className="h-4 w-4" /> Mark all read
        </button>
      }
    >
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f === 'Unread' ? unread : null
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
              {count ? (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">
                  {count}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title="Nothing here"
          description="There are no notifications matching this filter right now."
        />
      ) : (
        <div className="space-y-2.5">
          <AnimatePresence initial={false}>
            {visible.map((n) => {
              const meta = NOTIFICATION_META[n.kind]
              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-4 rounded-2xl border p-4 shadow-sm transition-colors ${
                    n.read ? 'border-border/70 bg-card' : 'border-primary/30 bg-primary/[0.04]'
                  }`}
                >
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/60 ${meta.tone}`}>
                    <meta.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{n.title}</span>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread" />}
                      <span className="ml-auto text-xs text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                        {meta.label} · {n.agent}
                      </span>
                      <button
                        onClick={() => toggleRead(n.id)}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Mark as {n.read ? 'unread' : 'read'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </FanShell>
  )
}
