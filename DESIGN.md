# Design System Specification: Editorial High-Taste (Anti-Slop)

> **Governing Skill Reference:** Follows [`design-taste-frontend`](file:///Users/adityadebnath/.gemini/config/skills/design-taste-frontend/SKILL.md) (tasteskill 2.5.0 anti-slop frontend standard). Every screen must adhere to the bar set by `figma.com` and `x.ai`: plain copy, one system, one section per screen, equal edges, real product UI, and zero generic AI slop.

## 1. Core Philosophy
- **Anti-Slop Standard:** Clean, confident editorial software aesthetic (Figma, Linear, Vigil standard).
- **One Section Per Screen:** Each viewport (1440x900) contains exactly one idea, one headline, and one visual representation. No crowded multi-card clutter.
- **The Landing Page is a Story:** Human-centric narrative (Problem -> Proof -> Architecture -> Interactive Sandbox -> Tamper-Evident Verification).

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
