'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Ticket, 
  Armchair, 
  Accessibility, 
  Sparkles,
  ChevronLeft,
  User,
  CreditCard,
  Mail,
  Phone
} from 'lucide-react'
import { useStadium } from '@/components/providers/StadiumProvider'
import { MATCH_HISTORY, WalletTicket } from '@/lib/fan-data'
import { InteractiveSeatMap, BlockInfo } from '@/components/booking/interactive-seat-map'

type Step = 'MATCH' | 'SEAT' | 'PROFILE' | 'PAYMENT' | 'PROCESSING' | 'SUCCESS'

const UPCOMING_MATCHES = [
  {
    id: 'm-semi1',
    fixture: 'Semi-Final · TBD',
    stage: 'Semi-Final',
    venue: 'MetLife Stadium',
    date: 'Jul 14, 2026 · 8:00 PM',
    price: '$450',
  },
  {
    id: 'm-final',
    fixture: 'World Cup Final',
    stage: 'Final',
    venue: 'MetLife Stadium',
    date: 'Jul 19, 2026 · 3:00 PM',
    price: '$1200',
  }
]

const SEAT_PREFS = [
  { id: 'tier1', label: 'Tier 1 (Lower Bowl)', desc: 'Closest to the action. High energy.', icon: Armchair },
  { id: 'tier2', label: 'Tier 2 (Club Level)', desc: 'Premium view, access to Club lounges.', icon: Sparkles },
  { id: 'supporter', label: 'Supporter Section', desc: 'Behind the goals. Maximum atmosphere.', icon: Ticket },
  { id: 'family', label: 'Family Section', desc: 'Quieter zone with easy concourse access.', icon: Armchair },
  { id: 'access', label: 'Accessible Seating', desc: 'Step-free routes, companion seating.', icon: Accessibility },
]

export default function BookTicketPage() {
  const router = useRouter()
  const { bookTicket } = useStadium()
  
  const [step, setStep] = useState<Step>('MATCH')
  const [selectedMatch, setSelectedMatch] = useState<typeof UPCOMING_MATCHES[0] | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<BlockInfo | null>(null)

  const handleNext = () => {
    if (step === 'MATCH' && selectedMatch) setStep('SEAT')
    else if (step === 'SEAT' && selectedBlock) setStep('PROFILE')
    else if (step === 'PROFILE') setStep('PAYMENT')
    else if (step === 'PAYMENT') {
      setStep('PROCESSING')
      // Simulate TicketPilot AI Processing
      setTimeout(() => {
        // Mint the ticket
        const newTicket: WalletTicket = {
          id: `t-${Date.now()}`,
          fixture: selectedMatch!.fixture,
          stage: selectedMatch!.stage,
          venue: selectedMatch!.venue,
          date: selectedMatch!.date,
          gate: selectedBlock.zoneId === 'access' ? 'C' : (Math.random() > 0.5 ? 'North' : 'South'),
          section: selectedBlock.sectionName,
          row: 'F',
          seat: Math.floor(Math.random() * 30 + 1).toString(),
          code: `WC26-${selectedMatch!.stage.substring(0,2).toUpperCase()}-${Date.now().toString().substring(8)}`,
          status: 'upcoming'
        }
        
        bookTicket(newTicket)
        setStep('SUCCESS')
      }, 3500)
    }
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden font-sans selection:bg-primary/20 relative">
      {/* Background ambient gradient */}
      <div className="pointer-events-none absolute inset-0 grid-tactical opacity-20 z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px] z-0" />

      {/* Header */}
      <header className="relative z-10 w-full p-6 flex items-center justify-between border-b border-border/40">
        <button 
          onClick={() => {
            if (step === 'SEAT') setStep('MATCH')
            else if (step === 'PROFILE') setStep('SEAT')
            else if (step === 'PAYMENT') setStep('PROFILE')
            else router.push('/')
          }}
          disabled={step === 'PROCESSING' || step === 'SUCCESS'}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" /> 
          {step === 'MATCH' ? 'Cancel' : 'Back'}
        </button>
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Aegis Ticketing
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-2 sm:p-6 w-full h-full min-h-0">
        <div className={`w-full h-full transition-all duration-500 flex flex-col min-h-0 ${step === 'SEAT' ? 'max-w-6xl' : 'max-w-lg justify-center'}`}>
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CHOOSE MATCH */}
            {step === 'MATCH' && (
              <motion.div
                key="match"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="font-display text-3xl font-bold">Select a Match</h1>
                  <p className="text-sm text-muted-foreground mt-1">Choose an upcoming fixture to book.</p>
                </div>
                
                <div className="space-y-3">
                  {UPCOMING_MATCHES.map(match => (
                    <button
                      key={match.id}
                      onClick={() => setSelectedMatch(match)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedMatch?.id === match.id 
                        ? 'border-primary bg-primary/10 shadow-md' 
                        : 'border-border/60 bg-card/40 hover:border-border hover:bg-card/80'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-display font-bold text-lg">{match.fixture}</span>
                        <span className="font-mono text-sm font-semibold text-primary">{match.price}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {match.date}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {match.venue}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!selectedMatch}
                  className="w-full mt-6 group flex items-center justify-center gap-2 rounded-xl bg-foreground text-background py-3.5 text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/90"
                >
                  Continue to Preferences <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: SEAT PREFERENCES */}
            {step === 'SEAT' && (
              <motion.div
                key="seat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col h-full min-h-0"
              >
                <div className="flex-shrink-0">
                  <h1 className="font-display text-3xl font-bold">Seat Preferences</h1>
                  <p className="text-sm text-muted-foreground mt-1">Tap a stadium zone to see pricing.</p>
                </div>
                
                <div className="w-full flex-1 relative py-4 min-h-0">
                  <InteractiveSeatMap 
                    selectedBlock={selectedBlock} 
                    onSelect={setSelectedBlock} 
                    basePrice={selectedMatch?.price || '$450'} 
                  />
                </div>

                <div className="mt-auto pt-2 flex-shrink-0">
                  <button
                    onClick={handleNext}
                    disabled={!selectedBlock}
                    className="w-full sm:w-auto sm:ml-auto group flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-8 py-3.5 text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/90"
                  >
                    Continue to Profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PROFILE */}
            {step === 'PROFILE' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="font-display text-3xl font-bold">Your Details</h1>
                  <p className="text-sm text-muted-foreground mt-1">Create your Aegis Profile to secure the ticket.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input type="text" placeholder="e.g. Priya Sharma" className="w-full bg-background border border-border/80 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input type="email" placeholder="e.g. fan@demo.com" className="w-full bg-background border border-border/80 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-background border border-border/80 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-secondary/80 text-foreground py-3.5 text-sm font-bold transition-all hover:bg-secondary border border-border/50"
                  >
                    Continue to Payment
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-full group flex items-center justify-center gap-2 rounded-xl bg-primary/10 text-primary py-3.5 text-xs font-bold uppercase tracking-widest transition-all hover:bg-primary/20 border border-primary/20"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Judge Mode: Auto-fill Priya
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: PAYMENT */}
            {step === 'PAYMENT' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="font-display text-3xl font-bold">Checkout</h1>
                  <p className="text-sm text-muted-foreground mt-1">Complete your secure transaction.</p>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/40 p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm">{selectedMatch?.fixture}</div>
                    <div className="text-xs text-muted-foreground">{selectedBlock?.zoneLabel} · Section {selectedBlock?.sectionName}</div>
                  </div>
                  <div className="font-display font-bold text-xl text-primary">{selectedBlock?.price}</div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-background border border-border/80 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-background border border-border/80 rounded-xl py-3 px-4 text-sm focus:border-primary focus:outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">CVC</label>
                      <input type="text" placeholder="123" className="w-full bg-background border border-border/80 rounded-xl py-3 px-4 text-sm focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground text-background py-3.5 text-sm font-bold transition-all hover:bg-foreground/90 shadow-lg"
                  >
                    Pay {selectedMatch?.price} & Authorize AI <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-full group flex items-center justify-center gap-2 rounded-xl bg-primary/10 text-primary py-3.5 text-xs font-bold uppercase tracking-widest transition-all hover:bg-primary/20 border border-primary/20"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Judge Mode: Bypass Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: PROCESSING */}
            {step === 'PROCESSING' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center space-y-6 py-12 text-center"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <Loader2 className="absolute h-12 w-12 animate-spin text-primary" />
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">TicketPilot AI is negotiating...</h3>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      Scanning {selectedMatch?.fixture} inventory
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                      Optimizing for {selectedBlock?.zoneLabel}
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                      Generating cryptographic ticket signature...
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 'SUCCESS' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center space-y-6 py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20"
                >
                  <CheckCircle2 className="h-10 w-10" />
                </motion.div>
                
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">Ticket Confirmed!</h3>
                  <p className="text-sm text-muted-foreground">
                    TicketPilot AI has successfully secured and minted your ticket for {selectedMatch?.fixture}.
                  </p>
                </div>

                <div className="w-full mt-4 p-4 rounded-xl border border-border/60 bg-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <Ticket className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Digital Ticket Minted</div>
                      <div className="text-xs text-muted-foreground">Added to FanHub Wallet</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/fanhub')}
                  className="w-full mt-6 group flex items-center justify-center gap-2 rounded-xl bg-foreground text-background py-3.5 text-sm font-bold transition-all hover:bg-foreground/90 shadow-lg"
                >
                  Open FanHub <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
