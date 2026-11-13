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

## Rule 4: The Landing Page is a Story, Not a Technical Architecture Diagram
- The landing page must take the user on an intuitive, compelling journey from problem to solution to proof.
- It is not a place to dump technical blueprints or raw engineering notes—it communicates the human value and impact.

## Rule 5: Clean UI Means Clarity, Never Data Overload
- Text is important to represent the idea, but it must be purposeful, readable, and structured.
- No volatile, cluttered screens; never merge too much data onto one view.
- No heavy cards packed with raw technical steps. Normal users and judges need clear, digestible conclusions.

## Rule 6: Flawless, Intuitive Interaction
- The way data is presented and how the user interacts with it must be smooth, natural, and effortless.
- The user should never wonder "what do I click next?" or feel overwhelmed by moving parts.
