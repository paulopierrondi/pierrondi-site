import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('semantic font tokens resolve through distinct next/font loader variables', async () => {
  const [layout, globals] = await Promise.all([read('app/layout.tsx'), read('app/globals.css')])

  assert.match(layout, /variable: '--font-space-grotesk'/)
  assert.match(layout, /variable: '--font-inter'/)
  assert.match(layout, /variable: '--font-jetbrains-mono'/)
  assert.doesNotMatch(layout, /variable: '--font-(?:display|body|mono)'/)
  assert.match(layout, /<html[\s\S]*?className=\{`\$\{display\.variable\} \$\{body\.variable\} \$\{mono\.variable\}`\}/)
  assert.doesNotMatch(layout, /<body className=\{`[^`]*display\.variable/)
  assert.match(globals, /--font-display:\s*var\(--font-space-grotesk\)/)
  assert.match(globals, /--font-body:\s*var\(--font-inter\)/)
  assert.match(globals, /--font-mono:\s*var\(--font-jetbrains-mono\)/)
  assert.doesNotMatch(globals, /--font-display:\s*var\(--font-display\)/)
  assert.doesNotMatch(globals, /--font-body:\s*var\(--font-body\)/)
  assert.doesNotMatch(globals, /--font-mono:\s*var\(--font-mono\)/)
})

test('public nav and language control share the same collision-safe breakpoint', async () => {
  const [nav, language, navigation] = await Promise.all([
    read('components/SiteNav.module.css'),
    read('components/LanguageSwitcher.module.css'),
    read('components/PublicNavigation.tsx'),
  ])

  assert.match(nav, /@media \(max-width: 1080px\)/)
  assert.match(language, /@media \(max-width: 1080px\)/)
  assert.match(language, /right:\s*76px/)
  assert.match(navigation, /matchMedia\('\(min-width: 1081px\)'\)/)
})

test('mobile overlays remain below their close controls and honor reduced motion', async () => {
  const [globalNav, siteNav] = await Promise.all([
    read('components/ui/GlobalNav.module.css'),
    read('components/SiteNav.module.css'),
  ])

  assert.match(globalNav, /\.root\s*\{[\s\S]*?z-index:\s*60/)
  assert.match(globalNav, /\.overlay\s*\{[\s\S]*?inset:\s*44px 0 0;[\s\S]*?z-index:\s*59/)
  assert.match(siteNav, /\.navLinks\.open,[\s\S]*?\.navLinks\.open a \{ animation: none !important; \}/)
})

test('shared reveals keep critical content visible before hydration', async () => {
  const [reveal, aboutMotion, studio, studioStyles, globals, qa] = await Promise.all([
    read('components/Reveal.tsx'),
    read('app/about/AboutMotion.tsx'),
    read('components/studio/StudioExperience.tsx'),
    read('components/studio/StudioExperience.module.css'),
    read('app/globals.css'),
    read('scripts/site-wide-ui-qa.mjs'),
  ])

  assert.doesNotMatch(reveal, /initial=\{reduced \? false : \{ opacity: 0/)
  assert.doesNotMatch(reveal, /initial="hidden"/)
  assert.doesNotMatch(aboutMotion, /initial=\{reduceMotion \? false :/)
  assert.match(studio, /initial:\s*reduceMotion \? false/)
  assert.match(studioStyles, /\.page \[style\*='opacity:0'\]/)
  assert.match(globals, /a:focus-visible,[\s\S]*?\[tabindex\]:focus-visible/)
  assert.match(qa, /javaScriptEnabled:\s*false/)
  assert.match(qa, /metrics\.h1Visible/)
})

test('first-visit geo routing cannot intercept legacy aliases before their canonical redirect', async () => {
  const config = await read('next.config.ts')
  const expected = {
    bio: '/about',
    precos: '/atuacao',
    ideias: '/blog',
    quiz: '/atuacao',
    'produto-digital': '/atuacao',
    calculadora: '/atuacao',
    'marketing-os': '/atuacao',
    'marketing-os/demo': '/atuacao',
    'marketing-os/numeros': '/atuacao',
    faq: '/contato',
    'tech-partner': '/atuacao',
  }

  for (const [source, destination] of Object.entries(expected)) {
    assert.match(config, new RegExp(`source: '/${source.replace('/', '\\/')}', destination: '${destination}'`))
  }
})
