import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const experience = await readFile(new URL('components/portfolio/PortfolioExperience.tsx', root), 'utf8')
const spotlight = await readFile(new URL('components/portfolio/PortfolioStudioSpotlight.tsx', root), 'utf8')
const styles = await readFile(new URL('components/portfolio/PortfolioExperience.module.css', root), 'utf8')
const qa = await readFile(new URL('scripts/portfolio-studio-visual-qa.mjs', root), 'utf8')

const studioAssets = [
  'public/portfolio/studio/pierrondi-studio-production-dossier-v1.webp',
  'public/portfolio/studio/pierrondi-studio-storyboard-atlas-v1.webp',
  'public/portfolio/studio/pierrondi-studio-review-console-v1.webp',
]

test('portfolio introduces the Studio through classified authorial visuals', async () => {
  assert.match(experience, /<PortfolioStudioSpotlight lang=\{lang\} reduceMotion=\{reduceMotion\} \/>/)
  assert.match(experience, /href="#studio-visual"/)
  assert.match(spotlight, /id="studio-visual"/)
  assert.match(spotlight, /Visuais autorais do Pierrondi Studio/)
  assert.match(spotlight, /not client work, published campaigns, or media results/)
  assert.match(spotlight, /\/studio#sistema-criativo/)
  assert.match(spotlight, /\/en\/studio#sistema-criativo/)
  assert.doesNotMatch(spotlight, /campaign ROI|paid-media outcome|guaranteed result/i)

  for (const asset of studioAssets) {
    await access(new URL(asset, root))
    assert.match(spotlight, new RegExp(asset.replace('public', '').replaceAll('/', '\\/')))
  }
})

test('Studio portfolio spotlight preserves an editorial responsive composition', () => {
  assert.match(styles, /\.studioSpotlight\s*\{/)
  assert.match(styles, /\.studioFrames\s*\{/)
  assert.match(styles, /grid-template-areas:/)
  assert.match(styles, /\.studioFrameDossier\s*\{\s*grid-area:\s*dossier/)
  assert.match(styles, /@media \(max-width: 820px\)/)
  assert.match(qa, /spotlightFrames === 3/)
  assert.match(qa, /heroStudioPhoto === 1/)
  assert.match(qa, /heroStudioVisibility/)
  assert.match(qa, /anchorHash === '#studio-visual'/)
  assert.match(qa, /reduced-motion-mobile-390/)
})
