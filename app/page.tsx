'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ShieldCheck,
  User,
  Fingerprint,
  Trophy,
} from 'lucide-react'
import Image from 'next/image'
import { PitchControlLogo } from '@/components/pitchcontrol/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AuthGateway } from '@/components/landing/auth-gateway'
import { Globe } from '@/components/ui/globe'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function LandingPage() {
  return (
    <div className="h-[calc(100vh-40px)] bg-background text-foreground overflow-hidden flex flex-col relative">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image 
          src="/stadium_bg.png" 
          alt="Stadium Background" 
          fill 
          className="object-cover opacity-50 dark:opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 grid-tactical opacity-20" />
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/10 blur-[120px] z-0" />

      <main className="flex-1 min-h-0 w-full max-w-[1600px] mx-auto grid lg:grid-cols-2 relative z-10">
        {/* Left Side: Login Card */}
        <div className="flex items-center justify-center p-4 relative z-10 w-full overflow-y-auto h-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="w-full max-w-[400px] xl:max-w-md"
          >
          {/* Login Card */}
          <motion.div variants={fadeUp} className="border border-border/80 bg-card/60 backdrop-blur-2xl shadow-2xl p-4 rounded-3xl">
            <div className="flex flex-col items-center text-center mb-3">
              <PitchControlLogo />
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-primary">
                <Trophy className="h-3.5 w-3.5" />
                FIFA WORLD CUP 26™
              </div>
              <h1 className="mt-1.5 font-display text-xl sm:text-2xl font-bold tracking-tight">
                Welcome to PitchControl
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-tight">
                Authenticate your identity to securely access the FIFA World Cup 2026 operating system.
              </p>
            </div>

            <div className="space-y-3">
              <AuthGateway />
            </div>
            
            <div className="mt-3 pt-3 border-t border-border/50 text-center">
              <p className="text-[0.6rem] text-muted-foreground uppercase tracking-widest mb-2">
                Protected by Google Cloud Security
              </p>
              <Link
                href="/book"
                className="inline-flex w-full items-center justify-center rounded-xl bg-secondary py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                Need a ticket? Book now
              </Link>
            </div>
          </motion.div>
        </motion.div>
        </div>

        {/* Right Side: 3D Globe */}
        <div className="relative hidden lg:block min-h-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vh] w-[120vh] opacity-90">
            <Globe autoFocus={false} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-50 w-full py-3 text-center text-xs text-muted-foreground shrink-0 bg-background border-t border-border/40">
        © 2026 PitchControl. Not affiliated with FIFA. Demonstration interface.
      </footer>
    </div>
  )
}
