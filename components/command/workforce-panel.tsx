'use client'

import { motion } from 'framer-motion'
import { AGENTS, type Agent } from '@/lib/pitchcontrol'
import { useStadium } from '@/components/providers/StadiumProvider'

export function WorkforcePanel({ 
  startIndex = 0, 
  endIndex, 
  className = "flex flex-col gap-4 pb-12" 
}: { 
  startIndex?: number, 
  endIndex?: number, 
  className?: string 
} = {}) {
  const { isOrchestrating } = useStadium()
  const agentsToRender = AGENTS.slice(startIndex, endIndex)
  
  return (
    <div className={className}>
      {agentsToRender.map((a, i) => {
        const liveStatus = isOrchestrating ? 'active' : a.status;
        const isDirector = a.id === 'director';
        
        return (
          <motion.article
            key={a.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            className={`p-4 rounded-[1.5rem] border shadow-sm ${
              isDirector ? 'bg-[#eef2ff] border-[#d8e2ff]' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  isDirector ? 'bg-blue-600 text-white' : 
                  a.id === 'ticketpilot' ? 'bg-amber-50 text-amber-600' :
                  a.id === 'crowdsense' ? 'bg-purple-50 text-purple-600' :
                  a.id === 'broadcast' ? 'bg-blue-50 text-blue-600' :
                  a.id === 'guardian' ? 'bg-red-50 text-red-600' :
                  a.id === 'opspilot' ? 'bg-slate-100 text-slate-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  <a.icon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{a.name}</h4>
                  <span className="text-[11px] text-slate-500">{a.role}</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold ${isDirector ? 'text-blue-700' : 'text-slate-400 uppercase tracking-wider'}`}>
                {liveStatus === 'standby' ? 'IDLE' : `${a.confidence}%`}
              </span>
            </div>
            
            {a.id === 'crwd' ? (
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-purple-600 h-full transition-all duration-500" style={{ width: `${a.confidence}%` }}></div>
              </div>
            ) : (
              <div className={`${isDirector ? 'bg-white' : 'bg-slate-50'} p-2.5 rounded-xl border border-slate-100`}>
                <p className="text-[11px] text-slate-600 font-medium">{a.task}</p>
              </div>
            )}
          </motion.article>
        )
      })}
    </div>
  )
}
