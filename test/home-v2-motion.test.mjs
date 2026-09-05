import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const [
  home,
  hero,
  heroStyles,
  scene,
  about,
  skills,
  projects,
  contact,
  sitemap,
  nextConfig,
] = await Promise.all([
  readFile(new URL('components/home-v2/HomeV2.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/HeroSection.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/HeroSection.module.css', root), 'utf8'),
  readFile(new URL('components/home-v2/three/FrontierEventHorizon.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/AboutSection.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/SkillsSection.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/ProjectsSection.tsx', root), 'utf8'),
  readFile(new URL('components/home-v2/sections/ContactSection.tsx', root), 'utf8'),
  readFile(new URL('app/sitemap.ts', root), 'utf8'),
  readFile(new URL('next.config.ts', root), 'utf8'),
])

test('home keeps framer-motion and does not hijack native scroll with GSAP snap', () => {
  assert.match(hero, /from 'framer-motion'/)
  assert.match(hero, /<motion\.h1/)
  assert.match(hero, /useScroll/)
  assert.match(hero, /useSpring/)
  assert.match(hero, /useTransform/)
  assert.match(hero, /style=\{\{ y: sceneY \}\}/)
  assert.match(home, /IntersectionObserver/)
  assert.doesNotMatch(home, /from 'gsap'/)
  assert.doesNotMatch(home, /ScrollTrigger/)
  assert.doesNotMatch(home, /snapTo/)
  assert.doesNotMatch(home, /snap:/)
})

test('hero parallax travel stays small and honors reduced motion', () => {
  assert.match(hero, /reducedMotion \? 0 : -24/)
  assert.match(hero, /stiffness: 88/)
  assert.match(hero, /damping: 28/)
  assert.match(hero, /y: 14/)
  assert.doesNotMatch(heroStyles, /filter:\s*blur/)
  assert.match(heroStyles, /@keyframes heroThesisReveal/)
  assert.match(
    heroStyles,
    /@media \(prefers-reduced-motion: no-preference\)[\s\S]*will-change: transform/,
  )
})

test('event horizon damps pointer during scroll and keeps a live disk', () => {
  assert.match(scene, /pointer\.current\.scrolling/)
  assert.match(scene, /addEventListener\('scroll', markScrolling/)
  assert.match(scene, /pointerX \* 0\.02/)
  assert.match(scene, /compact \? 2_600 : 5_200/)
  assert.match(scene, /reducedMotion\s*\?\s*'never'/)
  assert.match(scene, /useHydratedReducedMotion/)
  assert.doesNotMatch(scene, /8_000/)
  assert.doesNotMatch(scene, /pointer\.current\.x \* 0\.045/)
})

test('section reveals play once with short transform travel', () => {
  assert.match(about, /once: true/)
  assert.match(skills, /once: true/)
  assert.match(projects, /once: true/)
  assert.match(contact, /once: true/)
  assert.match(about, /y: reducedMotion \? 0 : 16/)
  assert.match(skills, /cardY: 16/)
  assert.match(projects, /y: 14/)
  assert.match(contact, /y: prefersReducedMotion \? 0 : 14/)
  assert.doesNotMatch(about, /once: false/)
  assert.doesNotMatch(skills, /once: false/)
  assert.doesNotMatch(projects, /once: false/)
  assert.doesNotMatch(contact, /once: false/)
  assert.doesNotMatch(about, /y: reducedMotion \? 0 : 40/)
  assert.doesNotMatch(skills, /cardY: 40/)
})

test('motion retune does not publish /sprint or drop home proof/engagement contracts', () => {
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
  assert.doesNotMatch(nextConfig, /source:\s*'\/sprint'/)
  assert.match(home, /meta\.id === 'hero' \? <ProofSection lang=\{lang\} \/>/)
  assert.match(hero, /href=\{lang === 'pt' \? '\/engajamento' : '\/en\/engajamento'\}/)
  assert.match(hero, /href="#proof"/)
})
