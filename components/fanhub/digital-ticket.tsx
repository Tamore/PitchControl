'use client'

import { motion } from 'framer-motion'
import { QrCode, Trophy } from 'lucide-react'
import { PitchControlLogo } from '@/components/pitchcontrol/logo'
import { useStadium } from '@/components/providers/StadiumProvider'

export function DigitalTicket() {
  const { walletTickets } = useStadium()
  const activeTicket = walletTickets[0] // Get the most recently booked/active ticket

  if (!activeTicket) return null;

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="relative flex w-full max-w-2xl overflow-hidden shadow-xl drop-shadow-xl scale-95 sm:scale-100"
      style={{
        maskImage: 'radial-gradient(circle at right 0%, transparent 12px, black 13px), radial-gradient(circle at right 100%, transparent 12px, black 13px)',
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskImage: 'radial-gradient(circle at 100% 0%, transparent 12px, black 13px), radial-gradient(circle at 100% 100%, transparent 12px, black 13px)',
        WebkitMaskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat'
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white border-2 border-gray-100 rounded-2xl" />

      {/* Main Ticket Section */}
      <div className="relative flex-[3] flex flex-col justify-between p-4 sm:p-6 md:p-8 border-r-2 border-dashed border-gray-200">
        
        {/* Top Header */}
        <div className="flex justify-between items-center w-full mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-[#F4C542]" />
            <span className="font-display font-black tracking-widest text-slate-900 text-sm sm:text-base">FIFA WORLD CUP 26™</span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
            Match 42
          </span>
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mb-2 border-2 border-gray-200 flex items-center justify-center bg-slate-50 shadow-sm">
              <span className="font-display font-bold text-slate-800 text-sm">
                {activeTicket.fixture.split(' vs ')[0]?.substring(0, 3).toUpperCase() || 'HOM'}
              </span>
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-slate-900">
              {activeTicket.fixture.split(' vs ')[0]?.toUpperCase() || 'HOME TEAM'}
            </span>
          </div>
          
          <div className="flex flex-col items-center px-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 mb-1">{activeTicket.stage.toUpperCase()}</span>
            <span className="font-display font-black text-xl sm:text-2xl text-[#3B82F6] italic">VS</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mb-2 border-2 border-gray-200 flex items-center justify-center bg-slate-50 shadow-sm">
              <span className="font-display font-bold text-slate-800 text-sm">
                {activeTicket.fixture.split(' vs ')[1]?.substring(0, 3).toUpperCase() || 'AWY'}
              </span>
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-slate-900">
              {activeTicket.fixture.split(' vs ')[1]?.toUpperCase() || 'OPPONENT'}
            </span>
          </div>
        </div>

        {/* Match Details */}
        <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-4 text-xs sm:text-sm">
          <div>
            <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Date</p>
            <p className="font-medium text-slate-700">{activeTicket.date.split(' · ')[0]}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Kickoff</p>
            <p className="font-medium text-slate-700">{activeTicket.date.split(' · ')[1] || 'TBD'}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Stadium</p>
            <p className="font-medium text-slate-700">{activeTicket.venue}</p>
          </div>
        </div>
      </div>

      {/* Stub Section (Right) */}
      <div className="relative flex-[1] min-w-[120px] sm:min-w-[140px] flex flex-col justify-between items-center p-4 sm:p-6 bg-slate-50/80 rounded-r-2xl border-l border-gray-50">
        
        {/* Seat Info Grid */}
        <div className="grid grid-cols-1 gap-2 sm:gap-3 w-full text-center">
          <div className="border-b border-gray-200 pb-1 sm:pb-2">
            <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-widest">Gate</p>
            <p className="font-display font-bold text-slate-800 text-sm sm:text-base">{activeTicket.gate}</p>
          </div>
          <div className="border-b border-gray-200 pb-1 sm:pb-2">
            <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-widest">Section</p>
            <p className="font-display font-bold text-slate-800 text-sm sm:text-base">{activeTicket.section}</p>
          </div>
          <div className="border-b border-gray-200 pb-1 sm:pb-2">
            <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-widest">Row</p>
            <p className="font-display font-bold text-slate-800 text-sm sm:text-base">{activeTicket.row}</p>
          </div>
          <div>
            <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-widest">Seat</p>
            <p className="font-display font-bold text-[#3B82F6] text-lg sm:text-xl">{activeTicket.seat}</p>
          </div>
        </div>

        {/* QR Code Graphic */}
        <div className="mt-6 sm:mt-8 p-3 bg-white rounded-xl shadow-md border border-gray-100">
          <QrCode className="w-16 h-16 sm:w-20 sm:h-20 text-slate-900" strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  )
}
