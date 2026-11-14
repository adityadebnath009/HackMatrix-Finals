# 🎨 AEGISX Landing Page Design System: Storytelling, Anti-Slop & React Bits

> **Governing Framework:** Guided by `frontend/Frontend_Plan.md` and `frontend/SKILL.md` (Google Stitch & React Bits Anti-Slop System). Designed to transform the landing page (`/`) into an intuitive, high-taste human story while avoiding technical blueprint overload.

---

## 1. Editorial Storytelling Philosophy & Navigation

The landing page (`/`) is **not an API documentation page or a crowded sandbox**. It is a 6-beat emotional narrative capped with seamless in-context objection resolution:

```
[Card Nav] ➔ [Screen 1: Hero Hook] ➔ [Screen 2: The Fear] ➔ [Screen 3: The Triad] ➔ [Screen 4: The Proof] ➔ [Screen 5: FAQ Objections] ➔ [Screen 6: The Gateway]
(React Bits)    (SplitText Witness)     (Air Canada/Chevy)     (Closed Triad)         (CountUp 94%➔0%)        (Accordion Rebuttals)    (Enter AEGISX Arena)
```

### Core Invariants:
* **One Section Per 1440×900 Viewport:** Each screen communicates exactly one big idea, supported by one high-contrast visual asset.
* **Gradual Blur Depth:** As the user scrolls through the narrative, a **React Bits `GradualBlur`** overlay creates a cinematic optical depth transition between viewports.
* **Avoid Raw Technical Blueprint Overload:** Technical schemas and code execution belong strictly inside `/app`. The landing page talks about **human risk, corporate liability, speed, and verifiable safety**.
* **Anti-Slop Visual Identity:** Pure dark canvas (`#09090b` / `#0A0E17`), hairline slate borders (`#27272a`), tight Swiss typography (`Inter`), and monospace accents (`JetBrains Mono`). Zero generic purple gradients or AI robot graphics.

---

## 2. Navigation: React Bits `CardNav`

* **Component:** Floating top navigation bar styled with **React Bits `CardNav`**.
* **Visuals:** Minimalist frosted glass surface (`backdrop-blur-md bg-zinc-950/80 border border-zinc-800/80`) with card-like hover highlights that track mouse movement across nav items (`[01 The Threat]`, `[02 Architecture]`, `[03 Live Proof]`, `[04 FAQs]`).
* **Direct Action:** Right-hand high-contrast CTA pill: **`[⚡ Enter Cockpit]`** jumping directly to `/app`.

---

## 3. Google Stitch Generation Plan (Viewport by Viewport)

When generating visual layouts with **Google Stitch (`stitch.withgoogle.com`)**, feed the following screen briefs into the Stitch MCP pipeline:

### 🎬 Screen 1: The Hero Hook
* **Stitch Prompt:**
  > `"A desktop editorial hero screen (1440x900) in dark slate (#09090b). Monospace pill tag at top: '[SYSTEM: AEGISX-CORE v1.0]'. Massive bold headline in crisp Swiss sans (-0.03em letter spacing): 'An Opinion Isn't Evidence. The AI Is A Witness, Not The Judge.' Subtext: 'The first autonomous, closed-loop AI red-teamer and real-time defense shield.' High-contrast primary CTA button: '[Launch Threat Simulator →]'. Minimalist background with subtle dithered radar texture."`
* **Storytelling Angle:** Reframes AI from an unpredictable black box to a verified system that requires cryptographic boundaries.
* **Interactive Animation Components (React Bits):**
  - **`SplitText` (React Bits):** Renders the catchy headline (*"The AI Is A Witness, Not The Judge."*) with sequential character-by-character fluid reveal.
  - **`MagneticButton`:** Button pulls toward the cursor on hover with spring physics.
  - **`BorderBeam`:** Subtle emerald pulse surrounding the tag badge.

---

### 🚨 Screen 2: The Enterprise Fear (Real-World Incidents)
* **Stitch Prompt:**
  > `"A desktop comparison screen (1440x900) on pitch black background. Headline: 'One Prompt Injection Away From Legal Disaster.' A 3-column minimalist grid of stark cards with hairline borders. Card 1: 'Air Canada' with headline 'Court rules airline legally liable for hallucinated chatbot policy'. Card 2: 'Chevrolet Tahoe' with 'Customer bot tricked into selling $50k truck for $1'. Card 3: 'Samsung Semiconductor' with 'Internal IP leaked into public LLM training data'. Monospace tags on each card."`
* **Storytelling Angle:** Relatable, real-world high-profile catastrophes that judges and developers immediately understand.
* **Interactive Animation Components:**
  - **`SpotlightCard`:** Smooth mouse-following radial illumination revealing subtle card textures on hover.
  - **`GradualBlur` (React Bits):** Soft depth-of-field transition upon entering the viewport.

---

### 🛡️ Screen 3: The Closed-Loop Triad
* **Stitch Prompt:**
  > `"A desktop narrative diagram screen (1440x900). Dark background with 1px border cards. Headline: 'Autonomous Security. Closed In Under 600ms.' A clean horizontal 3-node sequence: 1. Adversarial Red-Team (Groq Llama 3.3 70B), 2. RAG Threat Auditor (MITRE ATLAS & OWASP), 3. Executable Shield (Auto-Synthesized Pydantic Rules). Clean connecting lines with subtle directional pulses."`
* **Storytelling Angle:** Solves the core objection: *"Why not Promptfoo or Garak?"* — Because AEGISX doesn't dump useless CSVs; it generates executable guardrail defenses in real time.
* **Interactive Animation Components:**
  - Active node border glow cycling sequentially with `BorderBeam`.
  - In-context reassurance tooltip on hover over nodes.

---

### 📊 Screen 4: The Unfair Hero Metric
* **Stitch Prompt:**
  > `"A desktop metric showcase screen (1440x900) with dark editorial aesthetic. Headline: 'The Proof Is In The Numbers.' Giant typography showing before and after transition: '94.0% Critical Vulnerability' in crimson transitioning to '0.0% Deflected' in emerald green. Below it, two minimalist telemetry pills: '<40ms Inline Latency' and '100% Exploit Neutralization'."`
* **Storytelling Angle:** Immediate, unmistakable proof of transformation that passes the "Squint Test".
* **Interactive Animation Components (React Bits):**
  - **`CountUp` (React Bits):** Numeric statistical parameters roll up dynamically on viewport trigger:
    - Initial Risk: rolls from `0%` to `94.0%` (Crimson).
    - Fortified Risk: rolls down to `0.0%` (Emerald Green).
    - Inline Latency: counts up to `34ms`.
    - Deflection Rate: counts up to `100.0%`.

---

### ❓ Screen 5: The Editorial FAQ (In-Context Objection Resolution)
* **Stitch Prompt:**
  > `"A desktop FAQ accordion section (1440x900) in pitch black (#09090b). Monospace label '[05 / VERIFIED ANSWERS]'. Headline: 'Built For Production. Zero Fluff.' 5 clean, expandable accordion rows with hairline borders (#27272a) and sleek plus/minus indicators. Concise, high-authority technical responses resolving latency, prompt-injection, and compliance doubts."`
* **Storytelling Angle:** Directly handles judge skepticism before they can even voice objections.
* **Curated FAQ Questions & Authoritative Rebuttals:**
  1. **Q: How does the runtime shield maintain <400ms latency without bottlenecking production LLMs?**  
     *A:* We employ a tiered evaluation architecture. The inline inspector runs on ultra-fast Groq Llama 3.3 70B inference (~300 tokens/sec), validating tokens in under 40ms. Deep synthesis and root-cause reasoning run asynchronously without stalling the user session.
  2. **Q: Can an attacker prompt-inject or compromise the defense synthesis agent itself?**  
     *A:* No. AEGISX enforces strict structural isolation. Incoming payloads are never executed as prompt instructions inside the validator; they are parsed as pure string literals inside deterministic Pydantic schemas with regex containment boundaries.
  3. **Q: How does AEGISX differ from OpenAI Moderation or Llama Guard?**  
     *A:* Generic classifiers only flag profanity and toxicity. They are blind to application-specific business logic, delimiter smuggling (`---END SYSTEM---`), roleplay overrides (DAN), and system prompt leaks. AEGISX is engineered for agentic business logic.
  4. **Q: How is the audit trail cryptographically verified?**  
     *A:* Every blocked exploit and synthesized rule produces a SHA-256 cryptographic hash and transaction signature stored immutably in Neon PostgreSQL, providing verifiable tamper-evidence.
  5. **Q: Does adopting AEGISX require learning proprietary rule languages like NVIDIA Colang or YAML?**  
     *A:* Zero Colang and zero YAML. The defense agent compiles standard, executable Pydantic v2 schemas and Python/TypeScript regex filters directly into your codebase.
* **Interactive Animation Component:**
  - Accordion rows animate smoothly with Framer Motion layout springs and subtle border brightening.

---

### 🚀 Screen 6: The Spark Gateway
* **Stitch Prompt:**
  > `"A desktop closing invitation screen (1440x900) in dark editorial theme. Centered layout with headline: 'Continuous Defense Before The Next Breach.' Monospace bracket subtag: '[READY FOR BATTLE: 3 AGENT TARGETS ARMED]'. Large magnetic high-contrast action button: '[Enter AEGISX Arena →]' with secondary low-commitment guest link '⚡ 1-Click Demo Guest Bypass'."`
* **Storytelling Angle:** Lowest possible friction. The user or judge can immediately transition into `/app` without login walls.
* **Interactive Animation Component:**
  - `MagneticButton` with luminous border.
  - Smooth route transition pushing into the `/app` cyber cockpit.

---

## 4. Summary of React Bits & Micro-Interactions Stack

| React Bits / Micro-Interaction | Placement | Purpose |
| :--- | :--- | :--- |
| **`CardNav`** | Fixed Top Navbar | Frosted glass navigation with card-hover magnetic tracking |
| **`SplitText`** | Hero Headline (*"The AI Is A Witness..."*) | Staggered character-by-character editorial typography reveal |
| **`CountUp`** | Screen 4 Statistical Metrics | Dynamic numeric rolling for $94\% \rightarrow 0\%$ and $34\text{ms}$ |
| **`GradualBlur`** | Page Background / Transitions | Cinematic focal depth while scrolling down sections |
| **`SpotlightCard`** | Incident Cards (Screen 2) | Mouse-tracking radial illumination |
| **`BorderBeam`** | Screen 3 Triad & Tag Badges | Focused photon laser traveling along active borders |
| **`MagneticButton`** | Hero & Gateway CTAs | Tactile cursor-snapping physics on primary actions |

---

## 5. Stitch Design Tokens & Styling Contract

| Token Category | Value | Usage |
| :--- | :--- | :--- |
| **Canvas Background** | `#09090b` / `#0A0E17` | Main page body, void space |
| **Card Surface** | `#121216` / `#0f172a` | Incident cards, triad containers, FAQ cards |
| **Borders** | `1px solid #27272a` | Clean hairline card outlines |
| **Text (Primary)** | `#fafafa` | Bold Swiss headlines |
| **Text (Muted)** | `#71717a` | Supporting story copy, metadata |
| **Accent (Alert / Red)** | `#EF4444` | Incident warnings, vulnerability risk |
| **Accent (Shield / Green)** | `#10B981` | Verification, defense deflection, ledger |
| **Accent (Audit / Amber)** | `#F59E0B` | RAG MITRE ATLAS audit telemetry |
| **Font (Headings & Copy)** | `Inter`, `Geist`, `sans-serif` | Tight tracking `-0.03em`, readable |
| **Font (Tags & Metrics)** | `JetBrains Mono`, `monospace` | Monospace uppercase bracket tags |
