# Design System Specification: Editorial Security (Anti-Slop)

> **Governing Skill Reference:** Follows [`design-taste-frontend`](file:///Users/adityadebnath/.gemini/config/skills/design-taste-frontend/SKILL.md) (tasteskill 2.5.0 anti-slop frontend standard). Every screen adheres to a calm, precise, evidence-led aesthetic: plain copy, one system, equal edges, real product UI, and zero generic AI slop.

---

## 1. Design Direction

**Editorial security, not cyberpunk.**  
The page uses left-aligned messaging, thin structural rules, muted status colours, and a static proof-flow visual. The feeling should be calm, precise, and evidence-led.

* **Hero:** Asymmetrical two-column layout:
  * **Left:** Core product statement, humanized value proposition, and primary action.
  * **Right:** "Proof Path" visual demonstration.
* **Navbar:** Full-width flat bar with clear section anchors and a single strong action.
* **Cards & Panels:** Flat surfaces with 1px outlines (`outline`); zero glassmorphism, zero blur overlays, and zero neon glow.
* **Motion:** Restrained and purposeful. Exactly one proof-flow animation slot inside the Proof Path panel, respecting reduced-motion preferences.
* **Workspace Separation:** The landing page (`/`) is 100% storytelling, proof, and navigation. The interactive working tool lives on a dedicated route (`/app`). Never embed cluttered interactive sandboxes into the marketing flow.

---

## 2. Colour System

| Role | Token | Hex | Use |
|:---|:---|---:|:---|
| **Main canvas** | `background` | `#111916` | Page background |
| **Deep surface** | `surface-lowest` | `#0C1210` | Nested panels, code blocks |
| **Standard surface** | `surface-low` | `#17211D` | Cards, Proof Path container |
| **Raised surface** | `surface-high` | `#304139` | Hover or selected states |
| **Structural line** | `outline` | `#6F8176` | Borders, dividers, 1px rules |
| **Main text** | `on-surface` | `#EDF0E9` | Headings, primary content |
| **Secondary text** | `on-variant` | `#B6C0B9` | Supporting body copy, metadata labels |
| **Primary / success** | `primary` | `#86A593` | CTAs, confirmed states, success badges |
| **Primary highlight** | `primary-glow` | `#B8D1C0` | Hover states, italic motto word accent |
| **Review / synthesis** | `secondary` | `#B69A72` | Middle Proof Path state, in-progress tags |
| **Risk** | `error` | `#B55D4C` | Threat signatures, failure states, exploits |

### Strict Chromatic Rules
* **Rust (`#B55D4C`)**: Exclusively reserved for risk, exploits, and breach conditions.
* **Muted Gold (`#B69A72`)**: Exclusively reserved for review, compilation, or in-progress states.
* **Sage (`#86A593` / `#B8D1C0`)**: Reserved for successful deflection, primary actions, and confirmed verification.
* **Forbidden:** No cyan, electric emerald, purple, neon borders, or multi-colored gradients.

---

## 3. Typography

* **Main Product Voice:** System sans-serif (`-apple-system`, `BlinkMacSystemFont`, `Inter`, `Segoe UI`), bold and tightly tracked (`tracking-[-0.055em]`).
* **Emphasis:** Serif italic, strictly reserved for exactly one meaningful phrase per screen—currently *“Build the boundary.”*
* **Technical Metadata:** System monospace (`JetBrains Mono`, `ui-monospace`, `Menlo`), uppercase, small (`text-[10px]` or `text-xs`), with generous letter spacing (`tracking-[0.18em]` to `tracking-[0.2em]`).
* **Discipline:** Strictly limit the hero to these three typography roles. Do not introduce additional display fonts or novelty typefaces.

---

## 4. Component Rules

* **Primary Buttons:** Sage fill (`bg-primary`), dark ink text (`text-[#102019]`), soft pill radius (`rounded-full` or `rounded-lg`) strictly for the single primary action.
* **Secondary Actions:** Text link with a thin underline or bottom border (`border-b border-outline pb-1 hover:border-primary hover:text-primary-glow`); never a second competing filled button.
* **Panels & Bento Units:** `bg-surface-low`, `border border-outline`, square-to-subtle radius. The Proof Path uses a quiet offset shadow (`shadow-[12px_12px_0_0_rgba(134,165,147,0.14)]`) instead of diffuse neon glow.
* **Hover States:** Subtle vertical shift (-1px to -2px) or a slightly strengthened border. No 3D card tilts, no neon pulsing, and no chromatic cycling.
* **Animations:** Keep the future “Proof Path” animation contained within its panel. It should communicate the deterministic sequence (*Attack ➔ Constraint ➔ Proof*) with zero layout shift and full `prefers-reduced-motion` compliance.

---

## 5. Implementation Status & Consistency Guide

* **Token Configuration:** Centrally defined in [frontend/tailwind.config.ts](file:///Users/adityadebnath/Projects/HackMatrix/frontend/tailwind.config.ts) and [frontend/src/app/globals.css](file:///Users/adityadebnath/Projects/HackMatrix/frontend/src/app/globals.css).
* **Harmonization Checklist:**
  - [x] **Hero (`Hero.tsx`):** Fully aligned with editorial two-column layout and the 3-step Proof Path.
  - [x] **Navbar (`Navbar.tsx`):** Flat border bar with human anchors (`Why now`, `Method`, `Evidence`, `Questions`).
  - [x] **Compliance (`Compliance.tsx`):** Clean 4-card statutory matrix (EU AI Act, NIST AI RMF, ISO 42001, MITRE ATLAS) using sage and muted gold tokens.
  - [x] **FAQ (`Faq.tsx`):** Flat accordion styling without neon glow.
  - [x] **CTA & Footer (`Cta.tsx`, `Footer.tsx`):** Unified under the muted obsidian and sage palette.
  - [x] **Problems & Safety Triad:** Replace legacy utilities (`text-emerald-400`, `text-cyan-400`) with semantic palette tokens (`error`, `secondary`, `primary`, `on-variant`).
