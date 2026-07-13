'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Gauge,
  ChevronDown,
  Database,
  Lightbulb,
  Target,
  Lock,
  Cpu,
  ShieldCheck,
  FileText,
} from 'lucide-react'
import Link from 'next/link'
import { FanShell } from '@/components/pitchcontrol/fan-shell'
import { AI_DECISIONS, DATA_USAGE } from '@/lib/fan-data'

function confidenceTone(c: number) {
  if (c >= 95) return 'text-primary bg-primary/10'
  if (c >= 85) return 'text-accent bg-accent/15'
  return 'text-muted-foreground bg-secondary'
}

export default function TransparencyPage() {
  const [openId, setOpenId] = useState<string | null>(AI_DECISIONS[0]?.id ?? null)

  return (
    <FanShell
      title="AI Transparency Center"
      subtitle="Every recommendation in FanHub is explainable. Review the reasoning, confidence and data behind each decision the AI workforce made for you."
    >
      {/* Principles */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Lightbulb, title: 'Explainable', body: 'Each decision shows its reasoning trace and confidence score.' },
          { icon: Lock, title: 'Private by default', body: 'Your data is never sold or used for advertising.' },
          { icon: ShieldCheck, title: 'Human in command', body: 'Operators can review and override any AI recommendation.' },
        ].map((p) => (
          <div key={p.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/60 text-primary">
              <p.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 font-display text-sm font-semibold">{p.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Decisions list */}
        <div className="space-y-3 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Decisions made for you</h2>
          {AI_DECISIONS.map((d) => {
            const open = openId === d.id
            return (
              <div key={d.id} className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                <button
                  onClick={() => setOpenId(open ? null : d.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/60 text-primary">
                    <Cpu className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{d.decision}</span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${confidenceTone(d.confidence)}`}>
                        <Gauge className="h-3 w-3" /> {d.confidence}%
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {d.agent} · {d.time}
                    </p>
                  </div>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="space-y-4 border-t border-border/60 p-4">
                        <div>
                          <div className="mb-1.5 flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
                            <Lightbulb className="h-3.5 w-3.5" /> Reasoning
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/90">{d.reasoning}</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <div className="mb-1.5 flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
                              <Database className="h-3.5 w-3.5" /> Data sources
                            </div>
                            <ul className="space-y-1">
                              {d.dataSources.map((s) => (
                                <li key={s} className="flex items-center gap-2 text-sm text-foreground/90">
                                  <span className="h-1 w-1 rounded-full bg-primary" /> {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="mb-1.5 flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
                              <Target className="h-3.5 w-3.5" /> Outcome
                            </div>
                            <p className="text-sm leading-relaxed text-foreground/90">{d.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Data usage sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <h2 className="mb-4 font-display text-base font-semibold">What data is used</h2>
            <ul className="space-y-3.5">
              {DATA_USAGE.map((u) => (
                <li key={u.id}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{u.label}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.6rem] font-semibold text-primary">
                      <Lock className="h-3 w-3" /> {u.shared ? 'Shared' : 'Private'}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{u.purpose}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border/70 bg-secondary/30 p-5">
            <h3 className="font-display text-sm font-semibold">Your controls</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              You can adjust personalization and data sharing at any time.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/settings" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                <ShieldCheck className="h-4 w-4" /> Privacy settings
              </Link>
              <Link href="/legal/privacy" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                <FileText className="h-4 w-4" /> Read privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FanShell>
  )
}
