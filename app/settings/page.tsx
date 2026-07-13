'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  User,
  Bell,
  Globe,
  ShieldCheck,
  Trash2,
  Ticket,
  Radio,
  Train,
  Megaphone,
  Mail,
  Smartphone,
} from 'lucide-react'
import { FanShell } from '@/components/pitchcontrol/fan-shell'
import { ToggleSwitch } from '@/components/ui/toggle-switch'
import { Modal } from '@/components/ui/modal'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FAN } from '@/lib/fan-data'

function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: any
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/60 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function Row({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon?: any
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border/60 py-3.5 first:border-0 first:pt-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <div>
          <div className="text-sm font-medium text-foreground">{title}</div>
          {description && <div className="text-xs text-muted-foreground">{description}</div>}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [notif, setNotif] = useState({
    tickets: true,
    broadcast: true,
    transport: true,
    safety: true,
  })
  const [channels, setChannels] = useState({ push: true, email: true, sms: false })
  const [privacy, setPrivacy] = useState({ personalization: true, location: true, analytics: false })
  const [lang, setLang] = useState(FAN.language)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <FanShell
      title="Settings"
      subtitle="Control your account, notifications, language and how the AI workforce uses your data."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <SettingsCard icon={User} title="Account" description="Your personal identity details">
          <div className="space-y-0">
            <Row title="Full name" description={FAN.name}>
              <button className="text-sm font-medium text-primary hover:underline">Edit</button>
            </Row>
            <Row title="Email" description={FAN.email}>
              <button className="text-sm font-medium text-primary hover:underline">Change</button>
            </Row>
            <Row title="Phone" description={FAN.phone}>
              <button className="text-sm font-medium text-primary hover:underline">Change</button>
            </Row>
            <Row title="Password" description="Last changed 2 months ago">
              <button className="text-sm font-medium text-primary hover:underline">Update</button>
            </Row>
          </div>
        </SettingsCard>

        <SettingsCard icon={Bell} title="Notification types" description="Choose what the AI agents alert you about">
          <div className="space-y-0">
            <Row icon={Ticket} title="Ticketing & entry">
              <ToggleSwitch label="Ticketing notifications" checked={notif.tickets} onChange={(v) => setNotif((s) => ({ ...s, tickets: v }))} />
            </Row>
            <Row icon={Radio} title="Broadcast & advisories">
              <ToggleSwitch label="Broadcast notifications" checked={notif.broadcast} onChange={(v) => setNotif((s) => ({ ...s, broadcast: v }))} />
            </Row>
            <Row icon={Train} title="Transport updates">
              <ToggleSwitch label="Transport notifications" checked={notif.transport} onChange={(v) => setNotif((s) => ({ ...s, transport: v }))} />
            </Row>
            <Row icon={ShieldCheck} title="Safety & accessibility">
              <ToggleSwitch label="Safety notifications" checked={notif.safety} onChange={(v) => setNotif((s) => ({ ...s, safety: v }))} />
            </Row>
          </div>
        </SettingsCard>

        <SettingsCard icon={Megaphone} title="Delivery channels" description="Where you receive notifications">
          <div className="space-y-0">
            <Row icon={Smartphone} title="Push notifications">
              <ToggleSwitch label="Push" checked={channels.push} onChange={(v) => setChannels((s) => ({ ...s, push: v }))} />
            </Row>
            <Row icon={Mail} title="Email">
              <ToggleSwitch label="Email" checked={channels.email} onChange={(v) => setChannels((s) => ({ ...s, email: v }))} />
            </Row>
            <Row icon={Smartphone} title="SMS">
              <ToggleSwitch label="SMS" checked={channels.sms} onChange={(v) => setChannels((s) => ({ ...s, sms: v }))} />
            </Row>
          </div>
        </SettingsCard>

        <SettingsCard icon={Globe} title="Language & region" description="Personalize your FanHub experience">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Preferred language</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/60"
            >
              {['English (US)', 'Español', 'Français', 'Português', 'हिन्दी', 'العربية'].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <p className="mt-3 text-xs text-muted-foreground">
            Time zone is set automatically from your device: Eastern Time (ET).
          </p>
        </SettingsCard>

        <SettingsCard icon={ShieldCheck} title="Privacy & data" description="How the AI workforce uses your information">
          <div className="space-y-0">
            <Row title="Personalization" description="Let agents tailor recommendations to you">
              <ToggleSwitch label="Personalization" checked={privacy.personalization} onChange={(v) => setPrivacy((s) => ({ ...s, personalization: v }))} />
            </Row>
            <Row title="Location (match day)" description="Enable in-venue navigation">
              <ToggleSwitch label="Location" checked={privacy.location} onChange={(v) => setPrivacy((s) => ({ ...s, location: v }))} />
            </Row>
            <Row title="Product analytics" description="Share anonymous usage to improve FanHub">
              <ToggleSwitch label="Analytics" checked={privacy.analytics} onChange={(v) => setPrivacy((s) => ({ ...s, analytics: v }))} />
            </Row>
          </div>
          <Link href="/transparency" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
            View AI Transparency Center
          </Link>
        </SettingsCard>

        <section className="rounded-2xl border border-destructive/30 bg-destructive/[0.04] p-5 shadow-sm sm:p-6 lg:col-span-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10 text-destructive">
                <Trash2 className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-base font-semibold">Delete account</h2>
                <p className="text-sm text-muted-foreground">
                  Permanently remove your account, tickets and match history. This cannot be undone.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDeleteOpen(true)}
              className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'shrink-0')}
            >
              Delete account
            </button>
          </div>
        </section>
      </div>

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete your account?"
        description="This is a demonstration interface — no data will actually be removed."
        footer={
          <>
            <button
              onClick={() => setDeleteOpen(false)}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-border bg-secondary/40 hover:bg-secondary')}
            >
              Keep account
            </button>
            <button
              onClick={() => setDeleteOpen(false)}
              className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }))}
            >
              Yes, delete everything
            </button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          Deleting your account will permanently remove your digital tickets, wallet passes, loyalty
          points ({FAN.loyaltyPoints.toLocaleString()}) and full match history. Your AI care plans and
          accessibility preferences will also be erased.
        </p>
      </Modal>
    </FanShell>
  )
}
