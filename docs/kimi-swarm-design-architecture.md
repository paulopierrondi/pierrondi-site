# Kimi Swarm Design Architecture

Reference artifacts:

- `OKComputer_Untitled_Chat.zip`, inspected on 2026-05-24.
- Live Kimi page `https://zq73khp4eb4he.kimi.page?sharetype=link`, inspected on 2026-05-24.

## Design Thesis

The site should feel like an executive AI operating system, not a generic portfolio. The visual language is dark, minimal, technical and alive: a black/near-black canvas, restrained lime/cyan energy, neural connections, glass panels and evidence-oriented copy.

The page sells a precise point of view:

`enterprise AI -> governed agents -> operational context -> workflow execution -> auditable value`

## Core Visual System

- **Canvas:** near-black base with subtle grid, diagonal traces and soft green/cyan illumination.
- **Accent:** lime/green is reserved for attention, active signals, CTAs and neural energy.
- **Typography:** oversized executive headings, compact uppercase section labels, dense body copy.
- **Cards:** glass surfaces, thin borders, mild glow on hover, no heavy decorative containers.
- **Motion:** short reveals, progressive scroll feedback, pointer-reactive depth, particle trail and neural pulses.
- **Proof style:** abstract architecture diagrams and workflows, not generic videos or stock imagery.

## Interaction Architecture

The Kimi reference used React, Tailwind, GSAP, Lenis, Framer Motion and a Three.js neural canvas. The production Next app now ports the same interaction model directly while preserving the existing Next App Router structure:

- `components/KimiNeuralNetwork.tsx`
  - client-side `@react-three/fiber` canvas
  - deterministic Three.js node graph with large white/lime neurons
  - live lime synapse connections
  - simplex-noise drift
  - pointer-based camera movement and node repulsion
  - static fallback behavior under `prefers-reduced-motion`
- `components/KimiSwarmEffects.tsx`
  - GSAP/ScrollTrigger global scroll progress bar
  - Lenis smooth-scroll loop connected to ScrollTrigger
  - pointer particle trail
  - GSAP reveals for `[data-swarm-reveal]`
  - pointer tilt for `[data-swarm-tilt]`
  - magnetic CTA behavior for `[data-swarm-magnetic]`
  - pointer variables for parallax neural fields
- `app/animations.css`
  - global swarm classes, neural canvas sizing and reduced-motion fallback
- `app/page.tsx`
  - home sections marked with swarm data attributes
  - hero replaced by Kimi-style black WebGL neural field plus compact Agent Operating Model panel
- `app/page.module.css`
  - black/lime nav, oversized Kimi-style hero typography, glass operating-model panel, numbered cards and section-level synapse motion

## Faithful Porting Rules

1. Preserve the executive black/lime neural OS mood.
2. Keep copy dense and market-facing; avoid playful language.
3. Prefer architecture and operating-model visuals over passive videos.
4. Use motion as evidence of system behavior: signal, flow, reveal, connection.
5. Never expose client names; use industry-level proof only.
6. Respect `prefers-reduced-motion`; all swarm effects must degrade to static content.
7. Keep the heavy animation layer as progressive enhancement, not content dependency.

## Validation Standard

- `npm run lint`
- `npm run build`
- `npx tsc --noEmit --pretty false` must show no new errors beyond the known `privacyMode` debt until that debt is closed.
- Browser QA must confirm:
  - at least one `.kimi-neural-network canvas`
  - `.swarm-progress-bar`
  - no horizontal overflow
  - no console errors or failed requests
  - desktop and mobile screenshots stored under `qa/kimi-swarm-real/`

## Open Improvements

- Align production canonical domain decision: `pierrondi.dev` versus `www.pierrondi.dev`.
- Build a dedicated OG image that uses this visual system instead of a generic generated endpoint.
- Fix the pre-existing `privacyMode` TypeScript debt in `app/apps/[slug]/[doc]/page.tsx`.
