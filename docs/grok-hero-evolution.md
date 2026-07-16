# AGE-2615 — Grok hero evolution

**Date:** 2026-07-15
**Surface:** Grok
**Worktree:** `pierrondi-site-grok-hero-evolution`
**Branch:** `grok/AGE-2615-hero-evolution`
**Baseline:** `e965c72` (Frontier/event-horizon hero, PR #17)
**Linear:** AGE-2615
**Status:** Release candidate validated locally; production release explicitly authorized by Paulo

## Prompt cache telemetry

| Field | Value |
| --- | --- |
| `strategy` | `cli-prefix-layout` |
| `prefix_version` | `2026-07-15-grok-hero-v1` |
| `cache_key` | `pierrondi-site-grok-hero-v1` |
| `cached_tokens` | `null` (CLI does not expose provider cache tokens) |

## Diagnosis

### What was already strong

- WebGL2 event horizon is technically mature: seeded particles (no `Math.random`), DPR cap `[1, 1.35]`, offscreen/`visibilitychange` pause (`frameloop: never`), static CSS reduced-motion fallback, WebGL2-only probe + context-lost fallback, SSR CSS disk/void.
- Composition already encodes the reference energy: void core, accretion disk, warm rim, terrain grid, small observer silhouette.
- Home-v2 section architecture (hero → projects → about → skills → contact) is a solid long-form spine.
- Public routes already separate **portfolio** (products/apps) from **feitos** (frameworks/operating models).

### Core narrative failure

The hero **looked** frontier-grade and **read** like a title stack:

1. Tagline `$ whoami` + function-call line `$ design_operate_scale_ai()` signalled “developer aesthetic” more than thesis.
2. Description listed TAE + AI architect + full-stack builder without a single unifying promise.
3. Badges restated job titles instead of value pillars.
4. Metadata/OpenGraph repeated the same title bundle — SEO and first impression reinforced the split-persona problem.
5. No explicit dual route for enterprise collaborators vs product/builders on the first viewport (only generic project/contact CTAs).
6. Mock terminal in projects used `instance="bradesco-prod"` — client-adjacent leakage risk on a public surface.

### Site-wide narrative tension

Paulo is one operator across two markets:

| Lane | Proof surface | Risk if mishandled |
| --- | --- | --- |
| Enterprise / FSI / ServiceNow | `/feitos`, SADA, AgentOps, Control Tower | Private account detail, unprovable outcomes |
| Builder / products | `/portfolio`, CantuStudio, validators, pierrondi.dev | Generic “maker” cliché without operating-model spine |

The site had the evidence routes; the hero did not **route** them under one thesis.

## Chosen thesis

> **IA vira operação com evidência.**
> EN: **Where AI becomes governed operations.**

Unifying claim (public, defensible):

- Paulo designs the **operating system for AI** — context, governance, AgentOps, human gates, evidence.
- That discipline runs in **enterprise FSI / ServiceNow** work **and** in **systems he builds and ships**.
- The event horizon is metaphor, not wallpaper: gravitational focus (intent → evidence), vast system, small human signal (observer / human gate).

Not implemented (and not claimed publicly): private client metrics, anonymized deal tables from Vault, revenue figures, unproven adoption numbers.

## Ranked site-wide recommendations

| Rank | Improvement | Impact | Effort | Status |
| --- | --- | --- | --- | --- |
| 1 | Thesis-first hero (headline + description + badges) | Very high | Low | **Done** |
| 2 | Dual entry lanes: Enterprise → `/feitos`, Builder → `/portfolio` | High | Low | **Done** |
| 3 | Align home + about metadata to thesis | High | Low | **Done** |
| 4 | Warm editorial chrome (less green terminal, more accretion palette) | Medium-high | Medium | **Done** (global + home + portfolio + Studio) |
| 5 | Strengthen CSS fallback with horizon + observer | Medium | Low | **Done** |
| 6 | Proof-safety: strip client-adjacent mock instance names | High (risk) | Low | **Done** (`fsi-demo`) |
| 7 | Projects section intro that restates dual lanes | Medium | Low | Deferred (projects items already dual-lane) |
| 8 | Contact intro: enterprise vs product conversation starters | Medium | Low | Deferred |
| 9 | OG image redesign to match new thesis | Medium | Medium | Proposed — needs creative asset + Paulo gate for publish |
| 10 | Deeper WebGL art direction (asymmetric disk, stronger ground) | Medium | High | Hold — safeguards already production-grade; avoid effect pile-on |
| 11 | `/paulo` as deep architecture path linked from hero tertiary | Medium | Low | Proposed for next pass |
| 12 | Proof-gated case studies with public metrics only | High | High | Human-gated content work |

## Implemented changes

### Narrative / copy

- **PT hero:** tagline `frontier · operating model`; thesis line `Onde IA vira operação com evidência`; description unifies ServiceNow FSI + shipped systems; badges as pillars (Operating Model, AgentOps, Evidence trails, Full-stack systems).
- **EN hero:** parity thesis `Where AI becomes governed operations`.
- **CTAs:** primary → `#projects` (systems in production); secondary → `#contact` (collaborate).
- **Lanes:** Enterprise → `/feitos` (EN `/en/feitos`); Builder → `/portfolio` (EN `/en/portfolio`).
- **About** opening paragraphs lightly aligned to the same operating-model spine.
- **Proof-safety:** CSDM mock `bradesco-prod` → `fsi-demo` (PT + EN).

### Composition / UI

- Removed terminal cursor / typewriter-on-CLI aesthetic for line 2; thesis uses display type with warm reveal.
- Warm accretion palette on tagline, badges, CTAs; gravity-well veil; dual-lane cards.
- Telemetry reframed: operating model / evidence lock / intent→evidence / observer-human (no fake NYC coords).
- CSS fallback: ground horizon ridge + observer silhouette for no-WebGL/reduced-motion parity with the metaphor.

### Color and transition pass — 2026-07-15

- Rebuilt the shared palette around warm near-black, copper `#f0a66b`, champagne `#f5cf9f` and signal green `#58e39b`.
- Green is now semantic on the immersive home: availability, online/live state and operational health; copper owns navigation, CTA and editorial emphasis.
- Applied the palette to shared global tokens plus the home, public portfolio, Pierrondi Studio, shared brand signature, product logo and page progress treatment.
- Added section-specific atmospheric halos, active seams and a continuous vertical “frontier thread” across Projects, About, Skills and Contact.
- Replaced elastic hover motion in skills/dots with controlled expo easing; desktop section snap now uses a slower `power2.inOut` envelope.
- Fixed two mobile defects found in browser QA: document-level horizontal overflow and menu links closing without scrolling while the body was locked.
- Section navigation now synchronizes the URL hash, keeping PT/EN language links on the current section.
- Shared navigation now switches at one collision-safe 1080px breakpoint, keeps the language selector clear of the burger and closes on route/desktop changes.
- Next/font loader variables now live on `<html>` and resolve through stable semantic aliases, preventing browser-default font fallback across route families.
- Shared reveals, About and Studio keep their H1/content readable in SSR/no-JS; motion is progressive enhancement rather than a visibility dependency.
- Cookie consent no longer invades private app shells, `/design/library` clears the fixed header, `/kommo` uses a safe top offset and `/paulo` reserves footer space for its floating nav.
- Eleven legacy aliases now redirect before locale proxying, removing fresh-English visitor 404s.
- Keyboard focus is visibly copper across links, controls and navigation.

### Metadata

- `app/page.tsx`, `app/en/page.tsx`, `app/layout.tsx` titles/descriptions/OG/Twitter.
- `content/authority/paulo-authority-ops.json` about metadata + positioning short/statement aligned.

### Scene safeguards preserved

- WebGL2-only, lose-context probe, `webglcontextlost`, IntersectionObserver + `visibilitychange`, `dpr={[1, 1.35]}`, reduced-motion demand, additive disk/particles, seeded attributes, no `preserveDrawingBuffer`.
- Minor exposure bump only (`1.16` → `1.22`).

## Files changed

| Path | Role |
| --- | --- |
| `components/home-v2/copy.ts` | Thesis, CTAs, lanes, about, proof-safe mock |
| `components/home-v2/types.ts` | `HeroLane` + hero contract |
| `components/home-v2/sections/HeroSection.tsx` | Layout, motion contract, lanes |
| `components/home-v2/sections/HeroTelemetry.tsx` | Bilingual operating-model telemetry extracted from the hero |
| `components/home-v2/sections/HeroSection.module.css` | Editorial system, responsive, a11y motion |
| `components/home-v2/three/FrontierEventHorizon.tsx` | Exposure, pause contract and static reduced-motion fallback |
| `components/home-v2/three/FrontierEventHorizon.module.css` | Fallback horizon/observer |
| `app/page.tsx` / `app/en/page.tsx` / `app/layout.tsx` | Metadata |
| `content/authority/paulo-authority-ops.json` | About positioning/metadata |
| `test/frontier-hero.test.mjs` | Thesis + dual-route + fallback assertions |
| `scripts/frontier-hero-visual-qa.mjs` | New thesis, CTA/lane contract and deterministic browser assertions |
| `docs/grok-hero-evolution.md` | This artifact |
| `app/globals.css` / `app/animations.css` | Shared copper/champagne design tokens and progress treatment |
| `components/home-v2/HomeV2.tsx` / `.module.css` / `home-v2.css` | Active-section state, hash sync, atmospheres and motion tokens |
| `components/home-v2/sections/{Projects,About,Skills,Contact}*` | Section palette, cards, status colors and hover motion |
| `components/PublicNavigation.tsx` / `components/SiteNav.module.css` | Mobile unlock-before-scroll and warm navigation chrome |
| `components/portfolio/*` / `components/studio/*` | Public portfolio and Studio hardcoded-neon cleanup |
| `components/{SiteNav,LanguageSwitcher,PublicNavigation,Reveal,CookieBanner}*` | Responsive chrome, focus, SSR/no-JS resilience and shell suppression |
| `scripts/site-wide-ui-qa.mjs` / `test/site-chrome-quality.test.mjs` | 184-route responsive, font, menu, focus, no-JS and redirect release contract |

## Commands / tests

Executed in worktree after `npm ci`:

| Command | Result |
| --- | --- |
| `node --test test/frontier-hero.test.mjs` | **9/9 pass** |
| `npm run lint` | **pass** |
| `npx tsc --noEmit` | **pass** |
| `npm test` | **71/71 pass** |
| `npm run build` | **pass** (Next.js 16.2.6; known NFT warning in `lib/crm/store.ts` baseline, not introduced by this work) |
| `npm run authority:validate` | **pass** |
| `/Users/paulopierrondi/agents-hub/scripts/complexity-guard.py scan --changed` | **pass** — `HARD=0` across 62 changed files |
| `git diff --check` | **pass** |
| `TARGET_URL=http://localhost:3187 QA_DIR=qa/frontier-hero/pre-production-final-v4 npm run qa:frontier-hero` | **pass** — 320, 390, 768, 1024 and 1440; PT/EN; static reduced motion; WebGL fallback; no-JS |
| `TARGET_URL=http://localhost:3187 QA_DIR=qa/site-wide/pre-production-final-v2 npm run qa:site-wide` | **pass** — 184 routes, 627 checks, 390/768/1440, collision breakpoints, keyboard focus, 26 no-JS families and legacy redirects |

Browser QA additionally exercised real desktop/mobile navigation at `#projects`, `#about`, `#skills` and `#contact`, verified no horizontal overflow at 390/1440, checked hash + language-link synchronization, and audited `/portfolio` and `/studio` after the shared-token change. Console errors: none on the validated public routes.

Visual evidence:

- `/Users/paulopierrondi/.codex/visualizations/2026/07/15/019f67cb-9f8b-7a63-a8fc-beb8d8c57117/frontier-site-color-motion/desktop-projects-1440.png`
- `/Users/paulopierrondi/.codex/visualizations/2026/07/15/019f67cb-9f8b-7a63-a8fc-beb8d8c57117/frontier-site-color-motion/mobile-contact-390.png`
- `/Users/paulopierrondi/.codex/visualizations/2026/07/15/019f67cb-9f8b-7a63-a8fc-beb8d8c57117/frontier-site-color-motion/desktop-portfolio-global-1280.png`
- `/Users/paulopierrondi/.codex/visualizations/2026/07/15/019f67cb-9f8b-7a63-a8fc-beb8d8c57117/frontier-site-color-motion/desktop-studio-global-1280.png`

Grok authored the implementation and QA contract in its isolated workspace. Its own sandbox blocked `browserType.launch`; Codex then ran that same deterministic QA outside the Grok sandbox and obtained `report.pass=true`. Agent Hub host-verified bootstrap and journal were completed by the coordinator. No push, merge or deploy was performed.

## Accessibility / performance notes

- Semantic single `h1` retained; full thesis text always in DOM (no JS typewriter truncation).
- Lane nav has explicit `aria-label`; decorative telemetry remains `aria-hidden`.
- Focusable links for CTAs and lanes; keyboard order: tagline block → CTAs → lanes.
- `prefers-reduced-motion`: thesis reveal animation is disabled and the WebGL canvas is replaced by the static CSS event-horizon fallback (`frameloop: never`, zero active fallback animations).
- Mobile: bottom-weighted copy, single-column lanes, compact CTAs; scene telemetry hidden below 768px to protect readability.
- Performance: no new heavy deps; particle counts unchanged; fallback CSS is static.

## Proof-safety notes

| Allowed in public UI | Not used |
| --- | --- |
| ServiceNow TAE role (public) | Client names (Bradesco etc.) |
| FSI focus (generic) | Private deal outcomes / Vault Super Especialista tables |
| Public product URLs (CantuStudio, csdm-validator Railway) | Invented revenue / headcount claims |
| Agent Hub / Control Tower as owned systems | Confidential metrics |
| SADA as framework positioning | Unproven “60+ agents” expansion beyond existing public site claims |

Existing project stats already on the site were left unless they created leakage (`bradesco-prod` fixed). No new numeric claims introduced.

## Residual risks

1. **Visual density on very short mobile viewports** — the second lane can sit below the initial 320×720 fold, while remaining visible and accessible in the hero.
2. **Headless GPU performance is not a field benchmark** — deterministic Chromium used SwiftShader; production WebGL performance still deserves real-device monitoring after approval.
3. **Authority JSON / about page** — deeper about body still has older multi-title phrasing in some sections; only hero metadata + positioning short updated.
4. **OG image** still reflects previous branding until a separate asset pass.
5. **Grok sandbox gate limitation** — the Grok process could not write some host cache/Vault receipts directly; the Codex coordinator completed the host-verified bootstrap, journal and evidence updates outside that sandbox.

## Exact next action

1. Commit and push the isolated branch.
2. Open PR, wait for required GitHub checks, merge to `main` under Paulo's explicit production authorization.
3. Monitor the Railway auto-deploy and repeat the site-wide + Frontier suites against `https://www.pierrondi.dev`.

## Local council handoff

| Field | Value |
| --- | --- |
| Local agents considered | Frontend quality, product narrative, proof-safety |
| Decision | Thesis-first hero + dual lanes under one operator identity |
| Evidence | Files above; reference image event-horizon metaphor; baseline PR #17 |
| Risk / human gate | Production gate explicitly approved by Paulo in this task; rollback remains a reviewed revert through CI |
| Next action | PR → required checks → merge → Railway monitor → production QA |
