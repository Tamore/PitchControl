'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import { FanShell } from '@/components/pitchcontrol/fan-shell'
import { ToggleSwitch } from '@/components/ui/toggle-switch'
import { ACCESS_OPTIONS, type AccessOption } from '@/lib/fan-data'

export default function AccessibilityPage() {
  const [options, setOptions] = useState<AccessOption[]>(ACCESS_OPTIONS)

  const grouped = useMemo(() => {
    const map: Record<string, AccessOption[]> = {}
    for (const o of options) {
      map[o.category] ||= []
      map[o.category].push(o)
    }
    return map
  }, [options])

  const activeCount = options.filter((o) => o.enabled).length

  function toggle(id: string) {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o)))
  }

  return (
    <FanShell
      title="Accessibility"
      subtitle="Guardian AI uses these preferences to guarantee step-free routing, care plans and an inclusive match-day experience."
      actions={
        <span className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-sm font-semibold text-primary">
          <ShieldCheck className="h-4 w-4" /> {activeCount} active
        </span>
      }
    >
      {/* Care plan banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.05] p-5 shadow-sm"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-base font-semibold">Care plan active for Argentina vs Brazil</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                A step-free route to Section 112 is verified. Assistance staff are on standby at Gate C.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              <MapPin className="h-4 w-4 text-primary" /> View route
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Phone className="h-4 w-4" /> Request assistance
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preference groups */}
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(grouped).map(([category, opts]) => {
          const CategoryIcon = opts[0].icon
          return (
          <section key={category} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold">
              <CategoryIcon className="h-4 w-4 text-primary" />
              {category}
            </h3>
            <div className="space-y-4">
              {opts.map((o) => (
                <div key={o.id} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{o.title}</div>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{o.description}</p>
                  </div>
                  <ToggleSwitch label={o.title} checked={o.enabled} onChange={() => toggle(o.id)} />
                </div>
              ))}
            </div>
          </section>
          )
        })}
      </div>

      {/* Commitment note */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          PitchControl follows WCAG 2.2 AA guidance across every fan surface. Your accessibility
          preferences are private, portable across all World Cup 2026 venues, and never used for
          advertising.
        </p>
      </div>
    </FanShell>
  )
}
