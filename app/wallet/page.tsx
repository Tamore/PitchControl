'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  QrCode,
  Plus,
  CreditCard,
  CheckCircle2,
  Download,
  Ticket as TicketIcon,
  Star,
} from 'lucide-react'
import { FanShell } from '@/components/pitchcontrol/fan-shell'
import { Modal } from '@/components/ui/modal'
import { EmptyState } from '@/components/pitchcontrol/states'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  WALLET_PASSES,
  PAYMENT_METHODS,
  TRANSACTIONS,
  FAN,
} from '@/lib/fan-data'
import { useStadium } from '@/components/providers/StadiumProvider'

const TABS = ['Tickets', 'Passes', 'Payment', 'Activity'] as const
type Tab = (typeof TABS)[number]

const statusStyles: Record<string, string> = {
  active: 'bg-primary/10 text-primary',
  upcoming: 'bg-accent/15 text-accent',
  used: 'bg-secondary text-muted-foreground',
}

export default function WalletPage() {
  const [tab, setTab] = useState<Tab>('Tickets')
  const [addCardOpen, setAddCardOpen] = useState(false)
  const { walletTickets } = useStadium()

  return (
    <FanShell
      title="Wallet"
      subtitle="Your tickets, transport passes, payment methods and match-day activity — secured and verified by TicketPilot AI."
      actions={
        <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2">
          <Star className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold text-accent">{FAN.loyaltyPoints.toLocaleString()} pts</span>
        </div>
      }
    >
      {/* Tabs */}
      <div className="mb-6 inline-flex rounded-xl border border-border bg-secondary/40 p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Tickets' && (
        <div className="grid gap-4 md:grid-cols-2">
          {walletTickets.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-dashed border-border p-5">
                <div>
                  <div className="font-display text-lg font-bold">{t.fixture}</div>
                  <div className="text-xs text-muted-foreground">{t.stage} · {t.venue}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold capitalize ${statusStyles[t.status]}`}>
                  {t.status}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { l: 'Gate', v: t.gate },
                    { l: 'Sec', v: t.section },
                    { l: 'Row', v: t.row },
                    { l: 'Seat', v: t.seat },
                  ].map((x) => (
                    <div key={x.l}>
                      <div className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">{x.l}</div>
                      <div className="font-display text-lg font-bold text-primary">{x.v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-secondary/40 p-2.5">
                  <QrCode className="h-14 w-14 text-foreground" strokeWidth={1} />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border p-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {t.code}
                </span>
                <span className="text-xs font-medium text-foreground">{t.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'Passes' && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WALLET_PASSES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/60 text-primary">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {p.status}
                </span>
              </div>
              <div className="mt-4 font-display text-base font-semibold">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.detail}</div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'Payment' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            {PAYMENT_METHODS.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground">
                    <CreditCard className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-sm font-semibold">
                      {c.brand} ···· {c.last4}
                    </div>
                    <div className="text-xs text-muted-foreground">Expires {c.expiry}</div>
                  </div>
                </div>
                {c.primary && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.65rem] font-semibold text-primary">
                    Primary
                  </span>
                )}
              </div>
            ))}
            <button
              onClick={() => setAddCardOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border/70 bg-card/40 p-5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Plus className="h-4 w-4" /> Add payment method
            </button>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <h3 className="font-display text-base font-semibold">Billing summary</h3>
            <p className="mt-1 text-sm text-muted-foreground">Tournament to date</p>
            <div className="mt-4 space-y-3">
              {[
                { l: 'Tickets', v: '$480.00' },
                { l: 'Transport', v: '$32.00' },
                { l: 'Concessions & merch', v: '$113.50' },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{r.l}</span>
                  <span className="font-medium text-foreground">{r.v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-display font-semibold">Total</span>
                <span className="font-display text-lg font-bold text-primary">$625.50</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'Activity' && (
        <div className="rounded-2xl border border-border/70 bg-card shadow-sm">
          {TRANSACTIONS.length === 0 ? (
            <div className="p-5">
              <EmptyState icon={TicketIcon} title="No activity yet" description="Your purchases and receipts will appear here on match day." />
            </div>
          ) : (
            <ul className="divide-y divide-border/60">
              {TRANSACTIONS.map((x) => (
                <li key={x.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-muted-foreground">
                      <x.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{x.label}</div>
                      <div className="text-xs text-muted-foreground">{x.detail}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-sm font-bold">{x.amount}</div>
                    <div className="text-xs text-muted-foreground">{x.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-border p-4">
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              <Download className="h-4 w-4" /> Download all receipts
            </button>
          </div>
        </div>
      )}

      <Modal
        open={addCardOpen}
        onClose={() => setAddCardOpen(false)}
        title="Add payment method"
        description="This is a demonstration interface — no real card is processed."
        footer={
          <>
            <button
              onClick={() => setAddCardOpen(false)}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-border bg-secondary/40 hover:bg-secondary')}
            >
              Cancel
            </button>
            <button
              onClick={() => setAddCardOpen(false)}
              className={cn(buttonVariants({ size: 'lg' }), 'bg-primary font-semibold text-primary-foreground hover:bg-primary/90')}
            >
              Save card
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Cardholder name" placeholder="Priya Sharma" />
          <Field label="Card number" placeholder="4242 4242 4242 4242" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry" placeholder="MM / YY" />
            <Field label="CVC" placeholder="123" />
          </div>
        </div>
      </Modal>
    </FanShell>
  )
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
      />
    </label>
  )
}
