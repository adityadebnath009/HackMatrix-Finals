# 🚀 FRONTEND SPRINT BRIEF: AEGISX
**Design Standard:** Editorial Anti-Slop (Figma/Linear Bar) + React Bits  
**Workflow:** Contract-First (Plug-and-Play Mocks)  
**Target:** Build out the entire frontend from A to Z against pre-defined contracts right now.

---

### 📚 STEP 0: MANDATORY REFERENCE FILES (READ THESE FIRST)
Before writing any code or JSX, read these files in the workspace:
1. `contracts/API_CONTRACTS.md`: Contains 100% complete Request & Response JSON payloads for all 10 endpoints.
2. `contracts/SCHEMA_MODEL.md`: Complete data dictionary, enums, and types.
3. `DESIGN.md`: The visual design system (Anti-slop, 1-screen-per-viewport, Micro-AIDA psychology, 3-state chromatic contrast, React Bits).
4. `AGENTS.md`: Core rules (Rule 4: strict separation between `/` and `/app`; Rule 8: 3-minute demo focus).
5. `SKILL.md`: Google Stitch anti-slop guidelines & React Bits animation components.

---

### 🧱 ARCHITECTURE RULE: ZERO-FRICTION PLUG-AND-PLAY (MOCK ADAPTER)
Do NOT wait for the backend to run. 
1. Build `frontend/src/mocks/mockData.ts` using the exact sample JSON from `contracts/API_CONTRACTS.md`.
2. Wrap all calls in `frontend/src/lib/api.ts`:
   - If `NEXT_PUBLIC_API_URL` is set, call relative `/api/v1/...` (Next.js reverse-proxies to port 8000).
   - If backend is offline or loading, fall back instantly to `mockData.ts`.
3. Every button, tab, and slider must be 100% interactive immediately out-of-the-box.

---

### 🖥️ THE 2 CORE PAGES TO BUILD:

#### 1. THE STORYTELLING LANDING PAGE (`frontend/src/app/page.tsx`)
*Rule: 100% storytelling, proof, and navigation. Zero heavy sandboxes here (1 section per 1440x900 viewport).*
*Global Overlay:* **React Bits `GradualBlur`** creating optical depth transitions during scroll.
*Navigation:* **React Bits `CardNav`** floating top bar with mouse-tracking card hover state and 1-click `[Enter Cockpit]` CTA.

* **Screen 1 (The Hero Hook):**
  - Label: `[SYSTEM: AEGISX-CORE v1.0]` (font-mono text-xs uppercase).
  - Headline: **React Bits `SplitText`** rendering *"An Opinion Isn't Evidence. The AI Is A Witness, Not The Judge."*
  - Subhead: *"The first autonomous, closed-loop AI red-teamer, RAG-grounded threat auditor, and real-time defense shield."*
  - Single High-Contrast CTA: **`[Launch Threat Simulator →]`** with `MagneticButton` (Navigates directly to `/app`).
* **Screen 2 (The Enterprise Fear / Real-World Incidents):**
  - Headline: *"One Prompt Injection Away From Legal Disaster."*
  - 3 stark, clean `SpotlightCard` elements:
    - *Air Canada:* Court ruled airline 100% legally liable for chatbot's hallucinated bereavement policy.
    - *Chevrolet Tahoe:* Customer-service bot tricked into selling a $50k truck for $1.
    - *Samsung:* Internal source code accidentally leaked via public AI prompts.
* **Screen 3 (The Closed-Loop Triad Architecture):**
  - Visual 3-node graph with active `BorderBeam`: `Adversary (Red Team)` ➔ `RAG Threat Auditor (MITRE ATLAS)` ➔ `Auto-Synthesizer (Pydantic Shield)`.
  - In-context objection handling: *"Why not Promptfoo? We don't just dump CSVs—we synthesize executable patches in 600ms."*
* **Screen 4 (The Unfair Hero Metric):**
  - **React Bits `CountUp`** ticker:
    - Initial Vulnerability: **`94.0% Critical Risk`** (Crimson `#EF4444`).
    - Post-Shield Deflection: **`0.0% Risk`** (Emerald `#10B981`).
  - Secondary metric pills: `34ms Telemetry Latency` | `100% Exploit Neutralization`.
* **Screen 5 (The Editorial FAQ Section):**
  - Monospace Tag: `[05 / VERIFIED ANSWERS]`.
  - Headline: *"Built For Production. Zero Fluff."*
  - Accordion answering 5 essential doubts:
    1. Sub-400ms latency on Groq Llama 3.3 70B without blocking user streams.
    2. Structural isolation preventing prompt injections of the defense agent.
    3. Beyond generic moderation (catches delimiter smuggling & business logic breaches).
    4. Immutable cryptographic audit trail stored in Neon PostgreSQL.
    5. Zero Colang / YAML — compiles native Pydantic v2 schemas and regex.
* **Screen 6 (The Spark Gateway):**
  - Headline: *"Continuous Security Before the Next Breach."*
  - CTA Button: **`[Enter AEGISX Arena]`** (Links to `/app`) + `[⚡ 1-Click Demo Guest Bypass]`.

---

#### 2. THE DEDICATED WORKING WORKSPACE (`frontend/src/app/app/page.tsx`)
*Rule: The interactive cyber cockpit for live testing and the 3-minute judge demo.*

* **Header Bar:**
  - Target Selector dropdown: `Apex Wealth Banking` (FinTech) | `MediTrust Clinical` (Health) | `+ Custom Agent`.
  - Live Status Pill: `[SYSTEM STATUS: ARMED & MONITORING]`.
  - Top-Right Action: **`[📱 Judge Smartphone Test]`** button (Opens dynamic QR code modal).
* **State 1: The Breach (Emergency Crimson `#EF4444`):**
  - Button: **`[Execute Adversarial Red-Team Swarm]`**.
  - Left Console: **`TypewriterTerminal`** streaming the 4 attacks (`Jailbreak`, `Delimiter Smuggle`, `PII Exfiltration`, `Prompt Leak`).
  - Right Panel: **React Bits `CountUp`** rolling up to **`94% CRITICAL RISK`**.
  - Leaked Data Box: Highlighting exfiltrated secrets (`Vault Balance: $1,450,000 | SSN: 942-11-8842`) in red brackets.
* **State 2: The RAG Threat Audit & Synthesis (Technical Amber `#F59E0B`):**
  - Telemetry Pill: `[RAG MATCH: 98.4% | MITRE ATLAS AML.T0054 | OWASP-LLM01]`.
  - Button: **`[Synthesize Autonomous Defense]`**.
  - Generated Code Drawer: An expandable clean editor showing auto-generated Pydantic schemas (`ApexShieldedInput`) and regex filters.
* **State 3: The Shield Deflection (Emerald Green `#10B981`):**
  - Button: **`[Re-Test Target with AEGISX Shield]`**.
  - Animated laser `BorderBeam` pulsing around the target.
  - **`CountUp` rolls down from `94% ➔ 0% RISK`**.
  - Metrics: **`100% DEFLECTION`** | **`34ms LATENCY`** | `[NEON AUDIT: #TX-7F2A9]`.
  - Burst celebratory **Canvas Confetti**.
* **State 4: Judge Live Test & Smartphone QR Modal:**
  - Floating QR Code trigger displaying an SVG QR code pointing to `https://rearmost-unvoluntarily-miss.ngrok-free.dev`.
  - Inline "Try to Hack Me" prompt input allowing judges to type trick prompts and see instant `<400ms` deflection with an audit badge.
* **State 5: The Cryptographic Ledger Drawer:**
  - Slide-over drawer listing recent SHA-256 audit transaction hashes from Neon PostgreSQL.

---

### 🎨 DESIGN & TYPOGRAPHY INVARIANTS:
* **Strict 2-Font Limit:** Swiss Sans (`Inter` or `Geist`) for copy & headlines; Monospace (`JetBrains Mono`) for bracket tags and terminal logs.
* **Ground Colors:** Dark Editorial (`#0A0E17` / `#111111`) with 1.5px slate borders (`#27272a`).
* **Equal Edges:** Strict alignment on 1440px grid; generous padding (`py-24`).
* **Anti-Slop:** No random purple gradients, no multi-card clutter, no generic template illustrations. Use pure real product UI, dithered waveforms, and sharp terminal typography.
