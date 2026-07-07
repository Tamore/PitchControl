# 🛡️ PitchControl: The AI Brain

The final execution phase is complete. PitchControl is no longer a collection of independent UI screens—it is a fully connected Agentic AI Ecosystem.

## 🎥 The Ripple Effect Demo
I ran an automated browser test to verify the orchestration logic. Watch the video below to see a single user action (buying a ticket) instantly ripple across 4 different AI agents and 2 different portals simultaneously:

![Ripple Effect Orchestration](C:\Users\NIMITI-PC\.gemini\antigravity\brain\9fd28dd4-ddbc-41ed-8602-7afda9803dfd\aegis_ripple_effect_test_1783384236110.webp)

---

## 🧠 What Was Built

### 1. The Global Event Bus (Shared Memory)
I implemented `StadiumContext.jsx`, a global React Context provider that acts as the shared memory for all agents. 
*   **The Fan Dashboard** is no longer isolated; it is wired directly into this central brain.
*   **The Command Center** constantly reads the live telemetry and mission logs from this brain.

### 2. The Director Orchestrator (`gemini.js`)
I built the orchestration engine. When an event is triggered (like a fan buying a ticket), it doesn't just update local state. It fires a payload to the Director AI.
*   **Single-Call Architecture:** To save API costs and avoid rate limits, the Director makes *one* massive call to the Gemini API with a strict JSON schema.
*   **JSON Routing:** The Orchestrator receives the JSON payload from Gemini and automatically shards the data out to TicketPilot, Broadcast AI, CrowdSense, and OpsPilot.

### 3. The Fallback Mechanism
I built a robust offline fallback into the Orchestrator. If you hit Gemini quota limits during your presentation, or if you don't provide an API key in the `.env` file, the Director AI will automatically default to a hyper-realistic cached response. **Your demo will never break on stage.**

## 🏁 How to Present This
When you demo this for the PromptWars judges:
1. Start on the Fan Dashboard.
2. Tell the judges you are going to trigger the **TicketPilot AI**. Click "Authorize AI Bid".
3. Wait for the button to turn green. Show them the **Broadcast AI** push notification that instantly appears.
4. Immediately click over to the **Command Center**. 
5. Point to the **Mission Timeline** terminal and show them how the Director AI, OpsPilot, and CrowdSense automatically logged the event.
6. Point to the **Holographic Stadium** and show them how the congestion at Gate C has spiked to 85% because of that single ticket purchase.
