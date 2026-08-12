import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const atlas = await readFile(new URL('components/portfolio/PortfolioAtlas.tsx', root), 'utf8')
const styles = await readFile(new URL('components/portfolio/PortfolioExperience.module.css', root), 'utf8')
const qa = await readFile(new URL('scripts/portfolio-creative-media-visual-qa.mjs', root), 'utf8')

const shelfAssets = [
  'public/portfolio/cantustudio/feature-graphic.png',
  'public/portfolio/studio/pierrondi-studio-review-console-v1.webp',
  'public/portfolio/studio/pierrondi-studio-storyboard-atlas-v1.webp',
  'public/portfolio/luar-do-campo/storefront-desktop.png',
]

test('Creative & Media adds a classified visual Studio shelf without replacing the catalog', async () => {
  const shelfComponent = atlas.slice(atlas.indexOf('function CreativeMediaShelf'), atlas.indexOf('const CATALOG_CATEGORIES_ORDER'))

  assert.match(atlas, /const CREATIVE_MEDIA_SHELF = \[/)
  assert.match(atlas, /activeCategory === 'creative-media' && !query/)
  assert.match(atlas, /data-creative-media-shelf/)
  assert.match(atlas, /Os nove itens técnicos permanecem catalogados logo abaixo\./)
  assert.match(atlas, /Cenas autorais, artefatos de produto e demos conceituais/)
  assert.match(atlas, /not client records or media results/)
  assert.match(atlas, /href: \{ pt: '\/studio#creative-forge', en: '\/en\/studio#creative-forge' \}/)
  assert.match(atlas, /href: \{ pt: '\/studio#creative-video-factory', en: '\/en\/studio#creative-video-factory' \}/)
  assert.match(atlas, /href: \{ pt: '\/studio#content-engine', en: '\/en\/studio#content-engine' \}/)
  assert.match(atlas, /href: \{ pt: '\/studio#brand-os', en: '\/en\/studio#brand-os' \}/)
  assert.match(shelfComponent, /initial=\{false\}/)
  assert.doesNotMatch(shelfComponent, /initial=\{[^}]*opacity:\s*0/)

  for (const asset of shelfAssets) {
    await access(new URL(asset, root))
    assert.match(atlas, new RegExp(asset.replace('public', '').replaceAll('/', '\\/')))
  }
})

test('Creative & Media shelf has a responsive and keyboard-visible composition', () => {
  assert.match(styles, /\.creativeMediaShelf\s*\{/)
  assert.match(styles, /\.creativeMediaShelfGrid\s*\{[\s\S]*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/)
  assert.match(styles, /\.creativeMediaShelfCard:focus-visible\s*\{[\s\S]*box-shadow: 0 0 0 2px #fb7185/)
  assert.match(styles, /@media \(max-width: 560px\)[\s\S]*\.creativeMediaShelfGrid\s*\{[\s\S]*repeat\(2, minmax\(0, 1fr\)\)/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.creativeMediaShelfCard/)
})

test('Creative & Media visual QA exercises the selected filter in both languages', () => {
  assert.match(qa, /data-creative-media-shelf/)
  assert.match(qa, /creativeMediaCards === 4/)
  assert.match(qa, /catalogCards === 9/)
  assert.match(qa, /creative-forge/)
  assert.match(qa, /creative-video-factory/)
  assert.match(qa, /content-engine/)
  assert.match(qa, /brand-os/)
  assert.match(qa, /mobile-390/)
  assert.match(qa, /english-mobile-390/)
})
