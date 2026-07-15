import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const hero = await readFile(
  new URL('components/home-v2/sections/HeroSection.tsx', root),
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

test('frontier scene is deterministic, bounded, and stops rendering when inactive', () => {
  assert.match(scene, /function seeded/)
  assert.doesNotMatch(scene, /Math\.random/)
  assert.match(scene, /dpr=\{\[1, 1\.35\]\}/)
  assert.match(scene, /IntersectionObserver/)
  assert.match(scene, /visibilitychange/)
  assert.match(scene, /reducedMotion\s*\?\s*'demand'/)
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

test('visual QA fails if reduced-motion frames keep changing', () => {
  assert.match(visualQa, /const reducedFrameStable = reducedBefore\.equals\(reducedAfter\)/)
  assert.match(visualQa, /reducedMetrics\.motion === 'reduced' &&\s*reducedFrameStable/s)
})

test('CSS event-horizon fallback is server-rendered and responsive', () => {
  assert.match(hero, /sceneStyles\.fallback/)
  assert.match(hero, /data-frontier-fallback/)
  assert.match(hero, /sceneStyles\.fallbackDisk/)
  assert.match(hero, /sceneStyles\.fallbackVoid/)
  assert.match(sceneStyles, /\.fallbackDisk/)
  assert.match(sceneStyles, /\.fallbackVoid/)
  assert.match(sceneStyles, /@media \(max-width: 767px\)/)
  assert.match(sceneStyles, /prefers-reduced-motion: reduce/)
})

test('projects rail cannot pull the document past the entry hero on mount', () => {
  assert.doesNotMatch(projects, /activeTab\?\.scrollIntoView/)
  assert.match(projects, /rail\.scrollTo/)
  assert.match(projects, /activeTab\.offsetLeft/)
})
