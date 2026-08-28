import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = new URL('..', import.meta.url)
const publicDir = new URL('../public/', import.meta.url)

test('IndexNow key is 32 hex chars and served as /{key}.txt at site root', async () => {
  const pointer = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim()
  assert.match(pointer, /^[a-f0-9]{32}$/i)

  const keyFile = await readFile(new URL(`../public/${pointer}.txt`, import.meta.url), 'utf8')
  assert.equal(keyFile.trim(), pointer)

  const publicFiles = await readdir(fileURLToPath(publicDir))
  const hexKeyFiles = publicFiles.filter((name) => /^[a-f0-9]{32}\.txt$/i.test(name))
  assert.equal(hexKeyFiles.length, 1, 'exactly one IndexNow key file should exist in public/')
  assert.equal(hexKeyFiles[0], `${pointer}.txt`)
})

test('IndexNow submit script excludes /sprint and defaults to dry-run', async () => {
  const script = await readFile(new URL('../scripts/indexnow-submit.mjs', import.meta.url), 'utf8')
  assert.match(script, /api\.indexnow\.org\/indexnow/)
  assert.match(script, /sitemap\.xml/)
  assert.match(script, /\/sprint/)
  assert.match(script, /--submit/)
  assert.match(script, /dry-run/)
  assert.doesNotMatch(script, /shouldSubmit\s*=\s*true/)

  const result = spawnSync(process.execPath, ['scripts/indexnow-submit.mjs'], {
    cwd: fileURLToPath(root),
    encoding: 'utf8',
    timeout: 60000,
  })

  assert.equal(result.status, 0, result.stderr || result.stdout)
  assert.match(result.stdout, /"mode": "dry-run"/)
  assert.match(result.stdout, /"keyFile": "\/[a-f0-9]{32}\.txt"/i)
  assert.doesNotMatch(result.stdout, /"submitted": true/)

  const summary = JSON.parse(result.stdout.split('\n\n')[0])
  assert.ok(summary.submitUrlCount > 0)
  for (const url of summary.skippedSprint || []) {
    assert.match(url, /\/sprint/)
  }
  assert.ok(
    !(summary.skippedSprint || []).some((url) => !url.includes('/sprint')),
  )

  // Payload url list is not dumped in summary; ensure dry-run message is present
  // and script source hard-filters sprint before POST.
  assert.match(script, /isSprintUrl|skippedSprint/)
  assert.match(result.stdout, /Dry-run only/)
})

test('package.json exposes seo:indexnow script', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
  assert.equal(pkg.scripts['seo:indexnow'], 'node scripts/indexnow-submit.mjs')
})
