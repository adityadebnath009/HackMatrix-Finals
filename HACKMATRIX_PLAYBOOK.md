# 🏆 HACKMATRIX ROUND 2: THE MASTER PLAYBOOK & AI DIRECTIVE
> **Confidential Team Briefing & Zero-Friction Execution Blueprint**  
> **Target:** 1st Place Championship | **Build Window:** 8:00 AM – 7:00 PM | **Hard Freeze:** 6:15 PM

---

## 🎯 1. Mission & Context
We fought through **115 teams** into the **Top 30 Finals**. In an 11-hour sprint against elite teams, minutes decide the championship. 

Most teams will waste their first 2 to 3 hours battling `npm install`, broken Tailwind configs, CORS errors, database SSL handshakes, and Python import paths. 

**Our weapon is already 100% pre-built, tested, and running live.** When the clock starts at 8:00 AM, we write zero boilerplate. We go straight into building the product.

---

## 🏗️ 2. Core Technical Architecture & Invariants

### A. The Backend: Strict CSR 3-Tier Layering (FastAPI + UV)
1. **Controller Layer (`backend/controllers/`):**
   - Ingests HTTP requests, validates payloads using strict Pydantic v2 schemas, and delegates to services.
   - **Zero direct database queries or heavy business logic permitted here.**
   - **Mandatory Prefix:** All router endpoints **MUST** be prefixed with `/api` (e.g. `APIRouter(prefix="/api/v1/...", tags=[...])`).
2. **Service Layer (`backend/services/`):**
   - Encapsulates core business rules, external AI agent pipelines (Groq / Gemini), and domain validations.
   - Interacts with the database strictly through repositories.
3. **Repository Layer (`backend/repositories/`):**
   - Manages all Neon PostgreSQL queries, ORM models (`models/base.py`), and transactions via async SQLAlchemy (`AsyncSession`).
4. **Flow Layer (`backend/flow/`):**
   - Coordinates multi-step asynchronous workflows and AI evaluation chains across services.
5. **Zero Generic Exceptions (`backend/exceptions/`):**
   - Untyped generic exceptions are prohibited. All errors inherit from domain exceptions (`ResourceNotFoundException`, `ValidationException`, `DatabaseOperationException`, `ExternalServiceException`).
   - Mapped globally in `handlers.py` to return consistent JSON: `{ success: false, error: { code, message, details } }`.
6. **Package Management (UV):**
   - Run commands via `uv run` inside `backend/`. Never use slow manual pip. Virtualenv is pre-configured at `backend/.venv`.

### B. The Frontend: Contract-First & Anti-Slop (Next.js 15)
1. **Contract-First Development:**
   - Define TypeScript interfaces in `frontend/src/contracts/api-contracts.ts` and mock data in `frontend/src/mocks/mock-data.ts`.
   - The UI runs 100% functional out-of-the-box against mock adapters before the backend is even compiled.
2. **Zero-CORS Reverse Proxy (`next.config.ts`):**
   - Next.js rewrites `/api/:path*` to `http://localhost:8000/api/:path*` internally.
   - Frontend components make clean relative calls: `fetch('/api/v1/analyze')`. Zero CORS errors, zero hardcoded ports.
3. **Dedicated Workspace Separation:**
   - **Landing Page (`/`):** 100% storytelling, human transformation, proof, and navigation. **Never embed a heavy interactive sandbox in the middle of the marketing landing page.**
   - **Application Workspace (`/app`):** The focused, dedicated tool route where the user interacts, inputs data, and reviews results.

---

## 🎨 3. Design Standards & Psychology (Growth.Design + UX Planet)
Governed by `DESIGN.md` referencing `design-taste-frontend` (`tasteskill 2.5` anti-slop standard):

1. **One Section Per Screen:** At standard `1440×900`, each viewport contains exactly one idea, one headline, and one visual element. No crowded multi-card clutter; no second section heading peeking in.
2. **Micro-AIDA in Every Screen:** Every individual viewport carries its own:
   - **A**ttention: Provocative pattern-interrupt headline (*"The AI Is A Witness, Not The Judge"*).
   - **I**nterest: Clear tangible user benefit (not technical features).
   - **D**esire: Visual proof / psychological ownership (real product UI).
   - **A**ction: 1-click low-friction forward pull (The Spark Effect).
3. **One CTA Per Viewport:** Focus the user on exactly one high-contrast action button.
4. **The Squint Test:** Blurring the viewport must leave the primary headline and primary CTA dominating the screen.
5. **Strict 2-Font Limit:**
   - Headings & Copy: Swiss / Geometric Sans (`Inter` / `Geist`).
   - Metadata & Tags: Monospace uppercase (`JetBrains Mono`) with bracket framing (`[01/05]`, `[VERIFIED]`).
6. **Organic In-Context Objection Handling:** Dissolve doubts (accuracy, security, hallucination) right beside the relevant feature, eliminating lazy FAQ blocks.
7. **The 6 Battle-Tested UI Micro-Interactions:**
   - `SpotlightCard`: Mouse-tracking radial border glow.
   - `BorderBeam`: Glowing laser light traveling around active/verifying cards.
   - `NumberTicker`: Numbers rolling up smoothly from `0%` to `98.6%`.
   - `DitherCanvas`: Vintage 1-bit retro-pixelated radar/waveform animation.
   - `SlidingTabs`: Magnetic pill that glides between options with spring physics.
   - `TypewriterTerminal`: Streaming real-time monospace console logs.

---

## 🌐 4. Networking, Live Demo & Cloud Deployment

1. **Live Local Tunnel (ngrok):**
   - Static URL assigned: `https://rearmost-unvoluntarily-miss.ngrok-free.dev`
   - Single command runs both frontend and backend through the Next.js proxy:
     ```bash
     ./tunnel.sh frontend
     ```
   - Extremely fast `36ms` latency edge in India.
2. **1-Click Cloud Deployment (Render):**
   - Pre-configured `render.yaml` at repo root deploys both Next.js and FastAPI in 60 seconds via Render Blueprints.
   - **UptimeRobot Strategy:** Add 2 free monitors pinging `/api/health` and `/` every 5 minutes to prevent free-tier spin-down (0ms cold start).
3. **Authentication Strategy (Clerk):**
   - Pre-configured with Google Sign-In and Email.
   - **Mandatory Hackathon Rule:** Always include a `[ ⚡ 1-Click Demo Guest ]` button beside Google Sign-In so judges are never forced to authenticate.

---

## ⏱️ 5. The Hour-by-Hour Timeline (Target Finish: 6:15 PM)

| Time | Phase | Focus |
| :--- | :--- | :--- |
| **08:00 – 08:30 AM** | **Phase 1** | Problem Statement Selection & API Contracts locked. |
| **08:30 – 10:30 AM** | **Phase 2** | Parallel Build: 5-Screen Story Landing Page + Core CSR Backend. |
| **10:30 – 10:45 AM** | *Break* | Breakfast (15 min). |
| **10:45 – 01:30 PM** | **Phase 3** | Groq/Gemini AI Pipeline + Dedicated Workspace (`/app`). |
| **01:30 – 02:15 PM** | *Break* | Lunch (1 teammate stays at desk). |
| **02:15 – 04:30 PM** | **Phase 4** | Live Integration (Flip from mock to live backend). |
| **04:30 – 05:30 PM** | **Phase 5** | Anti-Slop verification, micro-interactions, copy polish. |
| **05:30 – 06:15 PM** | **Phase 6** | End-to-end verification over live ngrok tunnel on smartphones. |
| **06:15 PM** | 🛑 **FREEZE** | **HARD CODE FREEZE. Project 100% Complete.** |
| **06:15 – 06:30 PM** | *Break* | Evening Snacks (Relax while other teams panic). |
| **06:30 – 06:45 PM** | **Phase 7** | Record 45s QuickTime demo video & submit on MLH portal. |
| **06:45 – 07:00 PM** | **Phase 8** | Rehearse 3-minute pitch twice. |
| **07:00 – 07:45 PM** | 🏆 **JUDGING** | Live Evaluation & Presentation. |
| **07:45 – 08:00 PM** | 🥇 **RESULTS** | Championship Announcement. |

---

## 🤖 6. THE COPY-PASTE MASTER PROMPT FOR YOUR AI

> **INSTRUCTION FOR YOUR TEAMMATE:**  
> When the hackathon starts tomorrow at 8:00 AM, copy and paste the block below into your AI assistant (Antigravity / Cursor / Claude) along with the problem statement:

```markdown
You are the Lead Full-Stack Architect for Team HackMatrix competing in the Round 2 Finals (Top 30 teams). We are playing for Rank 1. 

Our entire technical infrastructure is already pre-configured in this repository. Follow these strict architectural rules without exception:

1. ARCHITECTURAL INVARIANTS:
   - Backend: Python FastAPI managed with UV. Follow the strict CSR 3-tier layering:
     * controllers/ (HTTP routing, Pydantic v2 validation, MUST use prefix="/api/...")
     * services/ (Business logic, AI pipelines, Groq/Gemini chains)
     * repositories/ (Neon PostgreSQL async SQLAlchemy queries and transactions)
     * exceptions/ (Typed domain custom exceptions only; no generic exceptions)
     * schemas/ (100% Pydantic v2 DTOs for all requests and responses)
   - Frontend: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide icons.
     * All API calls use relative paths (fetch('/api/...')), reverse-proxied internally to port 8000.
     * Contract-First: Define TypeScript interfaces in contracts/api-contracts.ts and mock data in mocks/mock-data.ts before wiring live endpoints.

2. LANDING PAGE & UX INVARIANTS (DESIGN.md):
   - SEPARATION OF CONCERNS: The landing page (/) is 100% storytelling, human transformation, proof, and navigation. DO NOT embed interactive sandboxes on the landing page. The real working tool lives on the dedicated route /app.
   - ONE SECTION PER SCREEN: At 1440x900 viewport, exactly one idea, one headline, and one visual representation per screen.
   - MICRO-AIDA PER VIEWPORT: Every screen captures Attention, builds Interest, sparks Desire, and prompts Action.
   - ONE CTA PER FOLD: Lowest commitment possible (The Spark Effect). Never force user login before experiencing value (always provide 1-click Demo Guest bypass).
   - THE SQUINT TEST: Visual hierarchy must ensure the primary focal element and CTA dominate when blurred.
   - STRICT 2-FONT LIMIT: Inter/Geist for headings and copy; JetBrains Mono for monospace bracket tags ([VERIFIED], [01/05]).
   - ANTI-SLOP STANDARD: High-contrast ink dark surfaces, no generic purple gradients or AI slop, quiet physical micro-interactions (SpotlightCard, BorderBeam, NumberTicker).

3. HERE IS OUR PROBLEM STATEMENT:
   [PASTE PROBLEM STATEMENT HERE]

YOUR IMMEDIATE TASKS (PHASE 1):
1. Analyze the problem statement and formulate the winning Product Angle with a clear Before vs. After metric.
2. Define the exact API contracts (METHOD, PATH starting with /api, request Pydantic schema, response BaseResponse schema).
3. Outline the 5-screen storytelling narrative for (/) and the dedicated workflow for (/app).
Do not write implementation code until contracts are locked. Let's build to win!
```
