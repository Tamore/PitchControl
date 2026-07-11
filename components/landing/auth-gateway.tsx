'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  KeyRound, 
  Loader2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

type Tab = 'fan' | 'staff'
type AuthState = 'idle' | 'otp' | 'authenticating' | 'success'

export function AuthGateway() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('fan')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [authState, setAuthState] = useState<AuthState>('idle')
  const [error, setError] = useState('')

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('Please enter your email or ID')
      return
    }

    if (activeTab === 'fan') {
      // Fan flow requires OTP
      setAuthState('otp')
    } else {
      // Staff flow checks for specific emails
      if (email === 'ops@fifa.org' || email === 'vol@fifa.org') {
        simulateAuth('/command')
      } else {
        setError('Unrecognized staff credentials. Try ops@fifa.org')
      }
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent pasting multiple chars in one input easily without proper logic, keep it simple
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    // Submit if full
    if (index === 3 && value) {
      if (newOtp.every(char => char !== '')) {
        simulateAuth('/fanhub')
      }
    }
  }

  const simulateAuth = (route: string) => {
    setAuthState('authenticating')
    
    // Simulate network delay
    setTimeout(() => {
      setAuthState('success')
      
      // Simulate success animation before routing
      setTimeout(() => {
        router.push(route)
      }, 800)
    }, 1500)
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      {authState === 'idle' && (
        <div className="mb-4 flex rounded-xl border border-border/60 bg-background/50 p-1">
          <button
            onClick={() => { setActiveTab('fan'); setEmail(''); setError(''); }}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              activeTab === 'fan' ? 'bg-secondary text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Match Attendee
          </button>
          <button
            onClick={() => { setActiveTab('staff'); setEmail(''); setError(''); }}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              activeTab === 'staff' ? 'bg-primary/20 text-primary shadow-sm border border-primary/30' : 'text-muted-foreground hover:text-primary/70'
            }`}
          >
            Stadium Staff
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {authState === 'idle' && (
          <motion.form 
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleContinue}
            className="space-y-3"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {activeTab === 'fan' ? <Mail className="h-5 w-5 text-muted-foreground" /> : <ShieldCheck className="h-5 w-5 text-muted-foreground" />}
              </div>
              <input
                type={activeTab === 'fan' ? 'email' : 'text'}
                placeholder={activeTab === 'fan' ? 'Enter ticket email (e.g. fan@demo.com)' : 'Enter Staff ID or Email'}
                className="w-full rounded-xl border border-border/80 bg-background/50 py-3 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs font-medium text-destructive">
                <AlertCircle className="h-3.5 w-3.5" /> {error}
              </div>
            )}

            <button
              type="submit"
              className={`w-full group flex items-center justify-between rounded-xl py-3 px-4 text-sm font-bold transition-all ${
                activeTab === 'fan' 
                  ? 'bg-foreground text-background hover:bg-foreground/90' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              <span>Continue securely</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            {/* Judge Mode Hints */}
            <div className="pt-2 text-center">
              <span className="text-[0.65rem] text-muted-foreground">
                JUDGE MODE: Use <strong className="text-foreground">fan@demo.com</strong> for FanHub, <strong className="text-foreground">ops@fifa.org</strong> for Command Center.
              </span>
            </div>
          </motion.form>
        )}

        {authState === 'otp' && (
          <motion.div 
            key="otp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground">
                <KeyRound className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Enter Security Code</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                We sent a 4-digit code to <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>

            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  className="h-14 w-12 rounded-xl border border-border/80 bg-background/50 text-center text-xl font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                />
              ))}
            </div>
            
            <p className="text-[0.65rem] text-muted-foreground">
              JUDGE MODE: Enter any 4 digits to bypass.
            </p>
          </motion.div>
        )}

        {(authState === 'authenticating' || authState === 'success') && (
          <motion.div 
            key="authenticating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center space-y-4 py-8"
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              {authState === 'authenticating' ? (
                <>
                  <Loader2 className="absolute h-10 w-10 animate-spin text-primary" />
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </motion.div>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-semibold">
                {authState === 'authenticating' ? 'Verifying Identity...' : 'Access Granted'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {authState === 'authenticating' 
                  ? 'Aegis Security Framework' 
                  : 'Routing to secure environment...'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
