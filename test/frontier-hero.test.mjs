import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const hero = await readFile(
  new URL('components/home-v2/sections/HeroSection.tsx', root),
  'utf8',
)
const heroTelemetry = await readFile(
  new URL('components/home-v2/sections/HeroTelemetry.tsx', root),
  'utf8',
)
const heroStyles = await readFile(
  new URL('components/home-v2/sections/HeroSection.module.css', root),
  'utf8',
)
const scene = await readFile(
  new URL('components/home-v2/three/FrontierEventHorizon.tsx', root),
  'utf8',
)
const sceneStyles = await readFile(
  new URL('components/home-v2/three/FrontierEventHorizon.module.css', root),
  'utf8',
)
const projects = await readFile(
  new URL('components/home-v2/sections/ProjectsSection.tsx', root),
  'utf8',
)
const visualQa = await readFile(
  new URL('scripts/frontier-hero-visual-qa.mjs', root),
  'utf8',
)
const home = await readFile(
  new URL('components/home-v2/HomeV2.tsx', root),
  'utf8',
)
const publicNavigation = await readFile(
  new URL('components/PublicNavigation.tsx', root),
  'utf8',
)
const homeTokens = await readFile(
  new URL('components/home-v2/home-v2.css', root),
  'utf8',
)

test('hero keeps semantic copy in SSR while the frontier scene stays client-only', () => {
  assert.match(hero, /dynamic\(.*FrontierEventHorizon/s)
  assert.match(hero, /ssr: false/)
  assert.match(hero, /<motion\.h1/)
  assert.match(hero, /\{fullLine2\}/)
  assert.doesNotMatch(hero, /setInterval|typedCount|slice\(0/)
  assert.match(hero, /initial=\{false\}/)
  assert.match(hero, /ctaPrimary/)
  assert.match(hero, /ctaSecondary/)
})

test('hero uses one ordered editorial prelude and compacts short desktops', () => {
  assert.match(hero, /data-hero-prelude/)
  assert.match(hero, /styles\.preludeIndex/)
  assert.match(hero, /styles\.sceneStatus/)
  assert.doesNotMatch(heroTelemetry, /sceneMeta|MODELO OPERACIONAL|OPERATING MODEL \/ 001/)
  assert.match(heroStyles, /max-width: 1520px/)
  assert.match(
    heroStyles,
    /@media \(min-width: 768px\) and \(max-height: 900px\)/,
  )
  assert.match(heroStyles, /transform: translate3d\(clamp\(36px, 4vw, 82px\)/)
  assert.match(visualQa, /laptop-1366/)
  assert.match(visualQa, /desktop-1536/)
  assert.match(visualQa, /desktop-wide-2048/)
  assert.match(visualQa, /layoutOrdered/)
  assert.match(visualQa, /lanesFitPass/)
})

test('frontier scene is deterministic, bounded, and stops rendering when inactive', () => {
  assert.match(scene, /function seeded/)
  assert.doesNotMatch(scene, /Math\.random/)
  assert.match(scene, /dpr=\{\[1, 1\.35\]\}/)
  assert.match(scene, /IntersectionObserver/)
  assert.match(scene, /visibilitychange/)
  assert.match(scene, /reducedMotion\s*\?\s*'never'/)
  assert.match(scene, /'never'/)
  assert.match(scene, /getContext\('webgl2'\)/)
  assert.doesNotMatch(scene, /getContext\('webgl'\)/)
  assert.match(scene, /WEBGL_lose_context/)
  assert.match(scene, /webglcontextlost/)
  assert.match(scene, /attribute vec3 aColor/)
  assert.match(scene, /setAttribute\('aColor'/)
  assert.doesNotMatch(scene, /vColor = color/)
  assert.doesNotMatch(scene, /preserveDrawingBuffer/)
})

test('visual QA requires a static CSS fallback for reduced motion', () => {
  assert.match(visualQa, /const reducedFrameStable = reducedBefore\.equals\(reducedAfter\)/)
  assert.match(visualQa, /reducedMetrics\.sceneState === 'fallback'/)
  assert.match(visualQa, /reducedMetrics\.loop === 'never'/)
  assert.match(visualQa, /reducedMetrics\.canvases === 0/)
  assert.match(visualQa, /getAnimations\(\{ subtree: true \}\)/)
  assert.match(visualQa, /reducedMetrics\.activeFallbackAnimations === 0/)
})

test('visual QA counts CTAs inside data-hero-ctas and lanes separately', () => {
  assert.match(visualQa, /\[data-hero-ctas\] a/)
  assert.match(visualQa, /\[data-hero-lanes\] a/)
  assert.match(visualQa, /PT_LANE_HREFS/)
  assert.match(visualQa, /EN_LANE_HREFS/)
  assert.match(visualQa, /function lanesPass/)
  assert.match(visualQa, /lanesPass\(metrics\.lanes, PT_LANE_HREFS\)/)
  assert.match(visualQa, /lanesPass\(englishMetrics\.lanes, EN_LANE_HREFS\)/)
  assert.doesNotMatch(
    visualQa,
    /querySelectorAll\('#hero a'\)|hero\?\.querySelectorAll\('a'\)/,
  )
  assert.match(hero, /data-hero-ctas/)
  assert.match(hero, /data-hero-lanes/)
  assert.match(hero, /data-hero-lane=\{lane\.kicker\.toLowerCase\(\)\}/)
})

test('CSS event-horizon fallback is server-rendered and responsive', () => {
  assert.match(hero, /sceneStyles\.fallback/)
  assert.match(hero, /data-frontier-fallback/)
  assert.match(hero, /sceneStyles\.fallbackDisk/)
  assert.match(hero, /sceneStyles\.fallbackVoid/)
  assert.match(hero, /sceneStyles\.fallbackHorizon/)
  assert.match(hero, /sceneStyles\.fallbackObserver/)
  assert.match(sceneStyles, /\.fallbackDisk/)
  assert.match(sceneStyles, /\.fallbackVoid/)
  assert.match(sceneStyles, /\.fallbackHorizon/)
  assert.match(sceneStyles, /\.fallbackObserver/)
  assert.match(sceneStyles, /@media \(max-width: 767px\)/)
  assert.match(sceneStyles, /prefers-reduced-motion: reduce/)
})

test('static fallback retires once the WebGL scene is live', () => {
  // Both compositions stacking is the "two globes + stray ring" defect:
  // the fallback must fade out once the sibling scene root reports ready.
  // Adjacent-sibling selector (not :has) so every browser honors it.
  assert.match(
    sceneStyles,
    /\.root\[data-frontier-state='ready'\] \+ \.fallback\s*\{\s*opacity: 0;/,
  )
  // Retire-direction-only transition: context loss restores the fallback
  // instantly instead of leaving a black gap.
  assert.match(
    sceneStyles,
    /\.root\[data-frontier-state='ready'\] \+ \.fallback\s*\{[^}]*transition: opacity/s,
  )
  // Ready must wait for the first painted frame, not context creation.
  assert.match(scene, /function ReadySignal/)
  assert.match(scene, /<ReadySignal onReady=/)
  assert.match(visualQa, /verifyFallbackRetired/)
  assert.match(visualQa, /fallbackRetired,/)
  // The gravity well must never end on a visible rectangle edge.
  assert.match(heroStyles, /\.gravityWell \{[^}]*inset: 0;/s)
  assert.doesNotMatch(heroStyles, /\.gravityWell \{[^}]*width: min\(/s)
})

test('hero thesis copy exposes dual enterprise/builder routes', async () => {
  const copy = await readFile(
    new URL('components/home-v2/copy.ts', root),
    'utf8',
  )
  assert.match(copy, /Onde IA vira operação com evidência/)
  assert.match(copy, /Where AI becomes governed operations/)
  assert.match(copy, /lanes:\s*\[/)
  assert.match(copy, /kicker: 'Enterprise'/)
  assert.match(copy, /kicker: 'Builder'/)
  assert.match(copy, /href: '\/feitos'/)
  assert.match(copy, /href: '\/portfolio'/)
  assert.doesNotMatch(copy, /bradesco-prod/)
  assert.doesNotMatch(copy, /design_operate_scale_ai/)
  assert.match(hero, /hero\.lanes\.map/)
  assert.match(hero, /data-hero-lanes/)
  assert.match(hero, /aria-label=\{lang === 'pt' \? 'Rotas de entrada' : 'Entry routes'\}/)
})

test('projects rail cannot pull the document past the entry hero on mount', () => {
  assert.doesNotMatch(projects, /activeTab\?\.scrollIntoView/)
  assert.match(projects, /rail\.scrollTo/)
  assert.match(projects, /activeTab\.offsetLeft/)
})

test('frontier palette separates copper emphasis from live status', () => {
  assert.match(homeTokens, /--hv2-accent-copper: #f0a66b/)
  assert.match(homeTokens, /--hv2-accent-champagne: #f5cf9f/)
  assert.match(homeTokens, /--hv2-accent-signal: #58e39b/)
  assert.match(homeTokens, /--hv2-accent-green: var\(--hv2-accent-copper\)/)
})

test('mobile section navigation unlocks before scroll and keeps the hash synchronized', () => {
  assert.match(publicNavigation, /menuOpen && link\.onSelect/)
  assert.match(
    publicNavigation,
    /requestAnimationFrame\(\(\) => \{\s*window\.requestAnimationFrame\(\(\) => link\.onSelect/s,
  )
  assert.match(home, /window\.history\.replaceState/)
  assert.match(home, /new HashChangeEvent\('hashchange'\)/)
  assert.match(home, /el\?\.scrollIntoView/)
})
