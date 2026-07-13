"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { orchestrateWorkflow } from '../../lib/gemini';
import { WALLET_TICKETS, WalletTicket } from '../../lib/fan-data';
import { TIMELINE } from '../../lib/pitchcontrol';

// Define the shape of our Shared Memory
interface MissionLog {
  id: string;
  agent: string;
  message: string;
  timestamp: string;
}

interface CrowdData {
  gate: string;
  congestion: number;
}

interface Notification {
  target: string;
  notification: string;
}

interface StadiumContextType {
  ticketStatus: string;
  notifications: Notification[];
  crowdData: CrowdData;
  missionTimeline: MissionLog[];
  isOrchestrating: boolean;
  dispatchEvent: (eventText: string) => Promise<void>;
  walletTickets: WalletTicket[];
  bookTicket: (ticket: WalletTicket) => void;
}

const StadiumContext = createContext<StadiumContextType | undefined>(undefined);

export const useStadium = () => {
  const context = useContext(StadiumContext);
  if (context === undefined) {
    throw new Error('useStadium must be used within a StadiumProvider');
  }
  return context;
};

export const StadiumProvider = ({ children }: { children: ReactNode }) => {
  // Global State representing the Shared Memory
  const [ticketStatus, setTicketStatus] = useState('pending');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [crowdData, setCrowdData] = useState<CrowdData>({ gate: 'Gate C', congestion: 40 });
  const [missionTimeline, setMissionTimeline] = useState<MissionLog[]>(
    TIMELINE.map((t, i) => ({
      id: `init-${i}`,
      agent: t.agent,
      message: t.title,
      timestamp: t.time
    })).reverse()
  );
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [walletTickets, setWalletTickets] = useState<WalletTicket[]>(WALLET_TICKETS);

  const bookTicket = (ticket: WalletTicket) => {
    setWalletTickets(prev => [ticket, ...prev]);
  };

  const addLog = (agent: string, message: string) => {
    const now = new Date();
    // Format timestamp exactly as requested: HH:MM:SS
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setMissionTimeline(prev => [{ 
      id: Date.now().toString() + Math.random().toString(), 
      agent, 
      message, 
      timestamp 
    }, ...prev]);
  };

  // The primary dispatch function that triggers the Single-Call Ripple Effect
  const dispatchEvent = async (eventText: string) => {
    setIsOrchestrating(true);
    
    // Log the initial trigger
    addLog('System', `Workflow Initiated: ${eventText}`);
    addLog('Director AI', `Requesting orchestration for ecosystem...`);

    // SINGLE CALL to Director AI (Orchestrator)
    const orchestrationJSON = await orchestrateWorkflow(eventText);
    
    // Log Director Response Received
    addLog('Director AI', `Received structured JSON from Gemini. Distributing to agents...`);

    // Distribute shards to Agent Memory & Update UI
    if (orchestrationJSON.TicketPilot) {
      setTicketStatus(orchestrationJSON.TicketPilot.status.toLowerCase());
      addLog('TicketPilot AI', `Action: ${orchestrationJSON.TicketPilot.status} | Seat: ${orchestrationJSON.TicketPilot.seat}`);
    }

    if (orchestrationJSON.Broadcast) {
      setNotifications(prev => [orchestrationJSON.Broadcast, ...prev]);
      addLog('Broadcast AI', `Targeted Push generated for ${orchestrationJSON.Broadcast.target}.`);
    }

    if (orchestrationJSON.CrowdSense) {
      setCrowdData({ gate: orchestrationJSON.CrowdSense.gate, congestion: orchestrationJSON.CrowdSense.congestion });
      addLog('CrowdSense AI', `Updated heatmap for ${orchestrationJSON.CrowdSense.gate} (Congestion: ${orchestrationJSON.CrowdSense.congestion}%)`);
    }

    if (orchestrationJSON.OpsPilot) {
      addLog('OpsPilot AI', `Deployed ${orchestrationJSON.OpsPilot.volunteersDeployed} volunteers.`);
    }

    if (orchestrationJSON.Director) {
      addLog('Director AI', `Workflow Complete. Summary: ${orchestrationJSON.Director.log}`);
    }

    setIsOrchestrating(false);
  };

  return (
    <StadiumContext.Provider value={{
      ticketStatus,
      notifications,
      crowdData,
      missionTimeline,
      isOrchestrating,
      dispatchEvent,
      walletTickets,
      bookTicket
    }}>
      {children}
    </StadiumContext.Provider>
  );
};
