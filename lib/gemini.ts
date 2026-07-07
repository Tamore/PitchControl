import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// The single unified Prompt for the Director AI Orchestrator
const SYSTEM_PROMPT = `
You are Director AI, the central orchestrator for Aegis StadiumOS (a FIFA World Cup stadium management system).
You manage an ecosystem of AI agents: TicketPilot, Broadcast, CrowdSense, Guardian, OpsPilot, and EcoPulse.

When an event occurs, you must return a strict JSON object detailing the actions and data updates for EACH agent.
Your response MUST be valid JSON matching this exact structure, with no markdown formatting or backticks outside of the JSON block:

{
  "Director": { "log": "Brief summary of the incident and orchestration." },
  "TicketPilot": { "status": "string", "seat": "string (e.g., Section 118)" },
  "Broadcast": { "notification": "String message for the fan", "target": "string" },
  "CrowdSense": { "gate": "string", "congestion": number (0-100) },
  "Guardian": { "alert": "string or null" },
  "OpsPilot": { "action": "string or null", "volunteersDeployed": number },
  "EcoPulse": { "energySpike": number, "recommendation": "string or null" }
}
`;

// Robust Fallback for demo reliability (Quota limits or missing API key)
const getFallbackResponse = (event: string) => {
  console.warn("⚠️ Aegis Orchestrator: Using local fallback response. (API Key missing or rate limited)");
  
  if (event.includes("TICKET_PURCHASE")) {
    return {
      Director: { log: "Detected proxy ticket purchase. Orchestrating arrival telemetry." },
      TicketPilot: { status: "Secured", seat: "Section 118, Row G" },
      Broadcast: { notification: "Ticket secured. Proceed to Gate C. Metro Line 2 is arriving in 11 minutes.", target: "Nirmiti" },
      CrowdSense: { gate: "Gate C", congestion: 85 },
      Guardian: { alert: "High contrast mode active for Fan." },
      OpsPilot: { action: "Redirecting 3 volunteers to Gate C for crowd control.", volunteersDeployed: 3 },
      EcoPulse: { energySpike: 0, recommendation: null }
    };
  }

  // Default fallback for any other director prompt
  return {
    Director: { log: "Simulated generic operational shift based on prompt." },
    TicketPilot: { status: "Active", seat: "N/A" },
    Broadcast: { notification: "Stadium operations update in effect.", target: "All Fans" },
    CrowdSense: { gate: "Gate B", congestion: 92 },
    Guardian: { alert: null },
    OpsPilot: { action: "Deploying rapid response team.", volunteersDeployed: 15 },
    EcoPulse: { energySpike: 12, recommendation: "Power down Sector 7 lighting to offset." }
  };
};

export async function orchestrateWorkflow(eventText: string) {
  if (!genAI) {
    return getFallbackResponse(eventText);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const fullPrompt = `${SYSTEM_PROMPT}\n\nEVENT TRIGGERED:\n${eventText}\n\nRespond strictly in JSON.`;
    
    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting from Gemini
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini API Orchestration Failed:", error);
    // Automatic fallback on failure
    return getFallbackResponse(eventText);
  }
}
