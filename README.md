# 🛡️ PitchControl
**Google Hack2Skill PromptWars Submission**

## 1. Chosen Vertical
**AI Operations / Stadium Management (FIFA World Cup 2026)**
PitchControl is designed to manage the chaos and operational complexity of a mega-event like the FIFA World Cup. It provides a cohesive, multi-agent AI ecosystem that replaces traditional static dashboards with proactive intelligence.

## 2. Approach and Logic
Our core approach was to build a **Multi-Agent Orchestration System** rather than a single chatbot. We employed a "Shared Memory Context" and "Event-Driven" architecture.

Instead of siloed functions, the application utilizes a central Event Bus (`StadiumProvider.tsx`). When a fan initiates an action (e.g., requesting a step-free route), or an event occurs (e.g., rain starts), a global event is dispatched. Seven highly specialized AI agents (TicketPilot, CrowdSense, Guardian, Broadcast, OpsPilot, EcoPulse, and Director AI) subscribe to this stream, allowing them to collaborate instantly.

The logic separates the application into two distinct portals:
1. **Fan Hub (`/fanhub`)**: The public-facing, highly accessible interface where fans receive personalized recommendations, tickets, routes, and translations.
2. **Command Center (`/command`)**: The enterprise-grade, dark-mode dashboard for operational staff to monitor live telemetry and issue natural language directives to the Director AI.

## 3. How the Solution Works
* **Real-time Synchronization**: The UI relies on a global React context (`useStadium`) to act as the live event bus. 
* **Director AI Console**: Found in the Command Center, operators can type natural language commands. The Director AI parses the intent and delegates tasks (visualized via the Agent Chain) to the other 6 specialized agents.
* **Proactive Interventions**: CrowdSense AI monitors crowd density and automatically updates the Fan Hub routes to prevent bottlenecks. Broadcast AI pushes multi-lingual (English, Spanish, Portuguese, French, Arabic, Hindi) safety alerts directly to the Fan Hub UI.
* **Premium UX/UI**: The application is built with Next.js, Tailwind CSS, and Framer Motion. It leverages Aceternity-inspired micro-interactions (e.g., interactive globe, orbital dynamics, physics-based docks) to provide a deeply engaging, professional sports broadcast aesthetic.

## 4. Any Assumptions Made
* **Simulated AI Endpoints**: Since this is a frontend-focused hackathon demonstration, the LLM backend generation and agent-to-agent negotiation logic are simulated via React state and timeout functions. The architecture to support live AI (e.g., WebSocket event streams) is fully mocked and ready for backend hookup.
* **Mock Data**: Match data (Argentina vs Brazil), telemetry (114 dB noise, 82k attendance), and ticketing information are hardcoded to represent a live, high-stakes moment during the 78th minute of a Round of 16 match.
* **Authentication Mocked**: It is assumed that the application sits behind an enterprise OAuth2/JWT gateway. Role-Based Access Control (RBAC) separates the Fan Hub from the Command Center, though login screens were bypassed for the sake of the demonstration.
* **Accessibility**: The app assumes modern browser support for smooth framer-motion animations and CSS variables. High-contrast themes and step-free routing logic are built in to reflect Guardian AI's accessibility priorities.
