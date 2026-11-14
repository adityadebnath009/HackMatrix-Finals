# Hackathon Development Rules (Round 2 & Beyond)

## Rule 1: Backend Architecture & Endpoints First (CSR Layered)
Before touching any code, map out the backend plan phase by phase. For every phase, define end-to-end:
- **Exact API Endpoints (`METHOD` and `PATH`):** All endpoints MUST be prefixed with `/api` (e.g., `APIRouter(prefix="/api/v1/...", tags=[...])`).
- **Exact Request Body:** All input parameters and types validated via Pydantic schemas (`schemas/`).
- **Exact Response Structure:** All data fields, types, and status codes wrapped in `BaseResponse` (`schemas/`).

### Strict CSR Three-Tier Architecture Invariant:
1. **Controller Layer (`controllers/`):** Exclusively handles HTTP routing, request parsing, and delegation. ZERO direct DB queries or heavy business logic permitted here.
2. **Service Layer (`services/`):** Encapsulates core business rules, external AI agent pipelines, and validation. Interacts with the database strictly through repositories.
3. **Repository Layer (`repositories/`):** Manages all Neon PostgreSQL queries, ORM operations (`models/`), and transactions via async SQLAlchemy.
4. **Flow Layer (`flow/`):** Coordinates multi-step asynchronous workflows and AI evaluation chains across services.
5. **Custom Exceptions Only (`exceptions/`):** No generic untyped exceptions. All errors must inherit from domain exceptions (`ResourceNotFoundException`, `ValidationException`, `DatabaseOperationException`) and be handled via global exception handlers.

### Mandatory Technology Invariants:
- **Pydantic Schemas (`schemas/`):** 100% of request payloads, response data, and service DTOs must use strict Pydantic v2 schemas. No loose dictionaries or untyped payloads across controller/service boundaries.
- **SQLAlchemy ORM (`models/` & `repositories/`):** All database operations, tables, and transactions must use async SQLAlchemy (`AsyncSession` + `select/update/delete`) connected to Neon PostgreSQL. Zero raw driver queries or unmanaged DB connections.

## Rule 2: Complete Frontend Generation via Defined Contracts
Once the contract is defined, generate and build the entire frontend from A to Z, even if the backend is not yet started:
- The UI connects to structured mock data matching the exact response contract.
- Every interaction, transition, and view is fully functional immediately out-of-the-box.

## Rule 3: Zero-Friction Plug-and-Play Integration
When the backend is completed:
- **Relative Path Invocations:** Frontend code calls relative `/api/...` endpoints (e.g., `fetch('/api/v1/analyze')`). Next.js internally reverse-proxies these to `http://localhost:8000/api/...`, guaranteeing zero CORS errors.
- Simply plug in the backend URL in one central place (`.env` or `NEXT_PUBLIC_API_URL`).
- Never rewrite UI components, hunt down mock data, or refactor layouts to switch from mock to live. The frontend auto-detects the backend, with seamless fallback if offline.

## Rule 4: The Landing Page is a Story, Not a Technical Blueprint or Cluttered Sandbox
- The landing page must take the user on an intuitive, compelling journey from problem to solution to proof.
- It is not a place to dump technical blueprints or raw engineering notes—it communicates the human value and impact.
- **Dedicated Workspace Separation:** The landing page (`/`) is 100% storytelling, proof, and navigation. The interactive working tool lives on a dedicated route (`/app` or `/workspace`). Never embed heavy interactive sandboxes in the middle of the marketing landing page.
- **One CTA Per Viewport (The Spark Effect):** Focus the user on exactly one clear, low-friction action. Lowest commitment possible; zero forced logins or wrongful delegation.

## Rule 5: Clean UI Means Clarity, Never Data Overload
- Text is important to represent the idea, but it must be purposeful, readable, and structured.
- No volatile, cluttered screens; never merge too much data onto one view.
- No heavy cards packed with raw technical steps. Normal users and judges need clear, digestible conclusions.
- **Micro-AIDA & In-Context Reassurance:** Every screen must capture attention, build desire, and address potential objections in place—without relying on lazy FAQ dump blocks.

## Rule 6: Flawless, Intuitive Interaction
- The way data is presented and how the user interacts with it must be smooth, natural, and effortless.
- The user should never wonder "what do I click next?" or feel overwhelmed by moving parts.

## Rule 7: The Closed-Loop AI Safety Triad (Adversary ➔ Synthesizer ➔ Verifier)
Never build an open-loop reporter that merely dumps vulnerability logs. Every security and agentic pipeline must execute the closed triad:
1. **Adversarial Red-Teaming (Groq <500ms):** Autonomous attack swarm generating real-time semantic exploits (jailbreaks, prompt injection, PII exfiltration).
2. **Deterministic Auto-Synthesis (Gemini):** Automatically compiles executable Pydantic validation schemas and regex boundary filters—zero manual Colang or YAML.
3. **Verified Cryptographic Ledger (Neon PostgreSQL):** Re-tests the attack against the shield, proving 100% deflection and recording an immutable SHA-256 audit transaction.

## Rule 8: Demo-First Engineering & The 6:15 PM Hard Code Freeze
- **Every line of code serves the 3-minute demo:** Features that do not visibly alter the red-to-green state transition or provide instant judge participation are out of scope.
- **Strict 6:15 PM Hard Freeze:** Development halts permanently at 6:15 PM. The final 45 minutes are strictly reserved for:
  1. Recording the 45-second backup QuickTime demo tape (`Cmd + Shift + 5`).
  2. Early submission on the MLH portal (avoiding last-minute portal crashes).
  3. Two complete rehearsals of the 3-minute pitch choreography.
