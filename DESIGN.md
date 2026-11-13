# Design System Specification: Editorial High-Taste (Anti-Slop)

> **Governing Skill Reference:** Follows [`design-taste-frontend`](file:///Users/adityadebnath/.gemini/config/skills/design-taste-frontend/SKILL.md) (tasteskill 2.5.0 anti-slop frontend standard). Every screen must adhere to the bar set by `figma.com` and `x.ai`: plain copy, one system, one section per screen, equal edges, real product UI, and zero generic AI slop.

## 1. Core Philosophy
- **Anti-Slop Standard:** Clean, confident editorial software aesthetic (Figma, Linear, Vigil standard).
- **One Section Per Screen:** Each viewport (1440x900) contains exactly one idea, one headline, and one visual representation. No crowded multi-card clutter.
- **The Landing Page is a Story:** Human-centric narrative (Vision -> Problem -> Transformation -> Pillars -> Outcomes & Gateway to `/app`). No cluttered interactive sandboxes on the landing page.

## 2. Color System
- **Ground / Canvas:** High-contrast editorial tone (Ink Black `#111111` or Bold Signature Tone `#F48B94`).
- **Cards & Surfaces:** Clean stark white `#FFFFFF` or translucent slate `#0A0E17` with solid 1.5px borders (`#000000` or `#1E293B`).
- **Accents:** Single high-contrast accent. No rainbow alerts.
- **Text:** Pitch black `#111111` on light ground, or pure white `#FFFFFF` on dark ground. Muted metadata `#64748B`.

## 3. Typography & Copywriting
- **Headings:** Bold Swiss / Geometric Sans (Inter / Geist / SF Pro Display), 48px to 64px, tight letter-spacing (-0.03em).
- **Manifesto Voice:** Short, provocative statements ("The AI Is A Witness, Not The Judge", "An Opinion Isn't Evidence").
- **No Walls of Text:** Replace 3-sentence descriptions with data pills, comparison tags, and live meters.
- **Labels & Tags:** Monospace uppercase (`font-mono text-xs uppercase tracking-wider`) with bracket framing (`[report.json]`, `[01/03]`).

## 4. Visual Elements & Layout
- **Equal Margins:** Strict left and right grid alignment with generous whitespace.
- **Hero Metric:** Giant before/after metric display (e.g., "85.5% -> 9.7%").
- **Dithered / Retro Accents:** 1-bit pixelated halftones and wave patterns for technical schematics.
- **Interactive Sandboxes:** Single clean input/slider with immediate visual response.
- **Progressive Disclosure:** Headline verdict visible upfront; deep technical logs collapsed behind an expandable drawer.

## 5. Landing Page Psychology & UX Standards (Growth.Design Principles)
- **Clear Purpose First:** One benefit-oriented headline per section answering *"What do I get out of this and why should I care?"*. Avoid elevated cognitive load or mixed signals.
- **One CTA Per Screen:** Exactly one clear, high-contrast action button per viewport fold.
- **Strict 2-Font Limit:** Swiss/Geometric Sans for headlines and copy (`Inter`/`Geist`); Monospace (`JetBrains Mono`) for bracket tags and metrics.
- **The Squint Test:** Visual hierarchy must ensure the single focal element and CTA dominate the viewport even when blurred.
- **The Spark Effect (Zero Wrongful Delegation):** The first action must require lowest possible commitment (1-click navigation into workspace; zero forced logins). Making decisions easier for people is our job.
- **Architecture of Separation:** The landing page (`/`) is 100% storytelling, proof, and navigation. The actual product tool lives on its dedicated route (`/app` or `/workspace`). Never embed cluttered interactive sandboxes into the landing page flow.

## 6. Conversion Architecture (UX Planet "Landing Pages That Sell" Standard)
- **Micro-AIDA in Every Viewport:** Every individual screen must carry its own Attention (pattern interrupt), Interest (benefit), Desire (visual proof), and Action (low-friction forward momentum). Never defer action only to the bottom footer.
- **Pattern Interrupts:** Open each section with an unconventional, honest assertion that breaks standard corporate cliché.
- **Organic Objection Handling:** Dissolve doubts in context. Answer privacy, accuracy, and latency concerns immediately alongside the feature, not hidden in a distant FAQ.
- **Psychological Ownership:** Display the real product UI populated with lifelike, high-stakes data so the user mentally adopts the product immediately.
- **Narrative Momentum:** Maintain continuous visual and intellectual curiosity pulling the reader through the 5-screen narrative.
