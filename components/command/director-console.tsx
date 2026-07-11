'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crown, CornerDownLeft, ArrowDown, CheckCircle2, Loader2 } from 'lucide-react'
import { DIRECTOR_CHAIN } from '@/lib/aegis'
import { useStadium } from '@/components/providers/StadiumProvider'

const SUGGESTIONS = [
  'Simulate heavy rain 20 minutes before kickoff.',
  'Rebalance crowd flow away from the North concourse.',
  'Prepare a medical response for Section 112.',
]

export function DirectorConsole() {
  const { isOrchestrating, dispatchEvent } = useStadium()
  const [value, setValue] = useState('')
  const [activeStep, setActiveStep] = useState(-1)
  const [done, setDone] = useState(false)

  async function run(prompt: string) {
    if (!prompt.trim() || isOrchestrating) return
    setValue(prompt)
    setDone(false)
    setActiveStep(-1)
    
    // Start visual chain simulation alongside the real API call
    DIRECTOR_CHAIN.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), (i + 1) * 700)
    })
    
    await dispatchEvent(prompt)
    
    setDone(true)
    setValue('')
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border/70 bg-card/80 p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
          <Crown className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-base font-semibold">Director AI · Prompt Console</h3>
          <p className="text-xs text-muted-foreground">Orchestrate the workforce with a single directive</p>
        </div>
      </div>

      {/* input */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
              e.preventDefault()
              run(value)
            }
          }}
          rows={2}
          placeholder="Issue a directive to the AI workforce…"
          className="w-full resize-none rounded-xl border border-input bg-background/60 p-3 pr-12 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
        />
        <button
          onClick={() => run(value)}
          disabled={isOrchestrating || !value.trim()}
          aria-label="Run directive"
          className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
        >
          {isOrchestrating ? <Loader2 className="h-4 w-4 animate-spin" /> : <CornerDownLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => run(s)}
            disabled={isOrchestrating}
            className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[0.7rem] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      {/* execution chain */}
      <div className="mt-5 flex-1 overflow-hidden rounded-xl border border-border/60 bg-background/40 p-4">
        <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
          Agent Execution Chain
        </p>
        <div className="space-y-1">
          {DIRECTOR_CHAIN.map((step, i) => {
            const state = activeStep >= i ? 'active' : 'idle'
            return (
              <div key={step.agent}>
                <motion.div
                  initial={false}
                  animate={{
                    opacity: state === 'active' ? 1 : 0.4,
                    borderColor:
                      state === 'active' ? 'var(--primary)' : 'var(--border)',
                  }}
                  className="flex items-center gap-3 rounded-lg border bg-card/60 px-3 py-2"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md text-[0.65rem] font-bold ${
                      state === 'active'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {state === 'active' && activeStep === i && isOrchestrating ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : state === 'active' ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold">{step.agent}</div>
                    <div className="truncate text-[0.7rem] text-muted-foreground">{step.action}</div>
                  </div>
                </motion.div>
                {i < DIRECTOR_CHAIN.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown
                      className={`h-3 w-3 ${activeStep > i ? 'text-primary' : 'text-border'}`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 rounded-lg border border-primary/40 bg-primary/10 p-3"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <CheckCircle2 className="h-4 w-4" /> Operations Recommendation Ready
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">
                Move 3 covered entrances to priority, dispatch 12 stewards to Gate 4, and push a
                sheltered-routing advisory to 48,000 fans. Projected congestion reduction: 34%.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
