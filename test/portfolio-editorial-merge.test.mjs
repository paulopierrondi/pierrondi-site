import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const experience = await readFile(new URL('components/portfolio/PortfolioExperience.tsx', root), 'utf8')
const mosaic = await readFile(new URL('components/portfolio/PortfolioEvidenceMosaic.tsx', root), 'utf8')
const styles = await readFile(new URL('components/portfolio/PortfolioExperience.module.css', root), 'utf8')

const evidenceAssets = [
  'public/portfolio/cantustudio/feature-graphic.png',
  'public/portfolio/cantustudio/melodia-satb.png',
  'public/portfolio/faithschool/app-home.png',
  'public/portfolio/agenticoscore/home-desktop.png',
]

test('portfolio hero uses owned product evidence instead of an icon-only mosaic', async () => {
  assert.match(experience, /<PortfolioEvidenceMosaic lang=\{lang\} reduceMotion=\{reduceMotion\} \/>/)
  assert.doesNotMatch(experience, /APP_STORE_CATALOG\.apps\.slice\(0, 12\)/)

  for (const asset of evidenceAssets) {
    await access(new URL(asset, root))
    assert.match(mosaic, new RegExp(asset.replace('public', '').replaceAll('/', '\\/')))
  }

  assert.equal(mosaic.match(/priority:\s*true/g)?.length, 1)
  assert.match(mosaic, /aria-hidden="true"/)
  assert.match(mosaic, /reduceMotion/)
})

test('editorial merge keeps the reference selective and responsive', () => {
  assert.match(styles, /\.case:first-child\s*\{/)
  assert.match(styles, /\.evidenceFrameMain\s*\{/)
  assert.match(styles, /@media \(max-width: 560px\)/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
  assert.doesNotMatch(`${experience}\n${mosaic}\n${styles}`, /studio\.design|kimi_agent_copiar/i)
})
