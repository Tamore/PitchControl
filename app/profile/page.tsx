'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin,
  Star,
  Trophy,
  Globe,
  Ticket,
  Heart,
  Settings,
  CheckCircle2,
  CalendarClock,
  Pencil,
} from 'lucide-react'
import { FanShell } from '@/components/pitchcontrol/fan-shell'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FAN, MATCH_HISTORY } from '@/lib/fan-data'

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
}

function Card({ children, className = '', i = 0 }: { children: React.ReactNode; className?: string; i?: number }) {
  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fade}
      className={`rounded-2xl border border-border/70 bg-card p-5 shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  )
}

const STATS = [
  { icon: Trophy, label: 'Matches attended', value: FAN.matchesAttended },
  { icon: Globe, label: 'Host cities visited', value: FAN.countriesVisited },
  { icon: Star, label: 'Loyalty points', value: FAN.loyaltyPoints.toLocaleString() },
]

export default function ProfilePage() {
  return (
    <FanShell
      title="Your Profile"
      subtitle="Manage your fan identity, preferences and match history across the FIFA World Cup 2026."
      actions={
        <>
          <Link
            href="/settings"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2 border-border bg-secondary/40 hover:bg-secondary')}
          >
            <Settings className="h-4 w-4" /> Settings
          </Link>
          <button
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/90')}
          >
            <Pencil className="h-4 w-4" /> Edit profile
          </button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Identity card */}
        <Card i={0} className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-border">
              <Image src={FAN.avatar} alt={FAN.name} fill className="object-cover" sizes="96px" />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold">{FAN.name}</h2>
            <p className="text-sm text-muted-foreground">{FAN.handle}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
              <Star className="h-3.5 w-3.5" /> {FAN.tier}
            </span>
            <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {FAN.location}
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" /> Member since {FAN.memberSince}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/[0.05] p-3">
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Favorite team</span>
            </div>
            <span className="font-display text-sm font-bold text-foreground">{FAN.favoriteTeam}</span>
          </div>
        </Card>

        {/* Stats + details */}
        <div className="space-y-4 lg:col-span-2">
          <Card i={1}>
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-secondary/40 p-4 text-center">
                  <s.icon className="mx-auto h-5 w-5 text-primary" />
                  <div className="mt-2 font-display text-2xl font-bold">{s.value}</div>
                  <div className="text-[0.7rem] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card i={2}>
            <h3 className="mb-4 font-display text-base font-semibold">Account details</h3>
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                { l: 'Email address', v: FAN.email },
                { l: 'Phone number', v: FAN.phone },
                { l: 'Preferred language', v: FAN.language },
                { l: 'Home location', v: FAN.location },
              ].map((d) => (
                <div key={d.l}>
                  <dt className="text-xs text-muted-foreground">{d.l}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">{d.v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>

        {/* Match history */}
        <Card i={3} className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-semibold">Match history</h3>
            <Link href="/wallet" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
              <Ticket className="h-4 w-4" /> View tickets
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2.5 font-medium">Fixture</th>
                  <th className="pb-2.5 font-medium">Stage</th>
                  <th className="pb-2.5 font-medium">Venue</th>
                  <th className="pb-2.5 font-medium">Date</th>
                  <th className="pb-2.5 text-right font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {MATCH_HISTORY.map((m) => (
                  <tr key={m.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-medium text-foreground">{m.fixture}</td>
                    <td className="py-3 text-muted-foreground">{m.stage}</td>
                    <td className="py-3 text-muted-foreground">{m.venue}</td>
                    <td className="py-3 text-muted-foreground">{m.date}</td>
                    <td className="py-3 text-right">
                      {m.attended ? (
                        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {m.result}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
                          {m.result}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </FanShell>
  )
}
