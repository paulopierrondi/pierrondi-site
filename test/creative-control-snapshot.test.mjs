import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

test('creative collector marks closet item fallback when no saved looks exist', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'creative-control-'))
  const dbPath = path.join(dir, 'db.json')
  writeFileSync(
    dbPath,
    JSON.stringify({
      closet_items: [
        {
          id: 'closet-1',
          created_at: '2026-06-02T10:00:00.000Z',
          category: 'Dress',
          dominant_color: 'Black',
          formality: 'formal',
        },
      ],
      saved_looks: [],
      look_reviews: [],
    }),
  )

  const result = spawnSync(
    'python3',
    [
      'scripts/creative-control-snapshot.py',
      '--dry-run',
      '--devotional-url',
      'about:blank',
      '--db-path',
      dbPath,
    ],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: {
        ...process.env,
        FAITHSCHOOL_MAGIC_LINK_SECRET: '',
      },
    },
  )

  assert.equal(result.status, 0, result.stderr)
  const snapshot = JSON.parse(result.stdout)

  assert.equal(snapshot.looks.stats.total, 1)
  assert.equal(snapshot.looks.stats.sourceMode, 'closet_items_fallback')
  assert.deepEqual(snapshot.looks.stats.sourceCounts, {
    closetItems: 1,
    savedLooks: 0,
    lookReviews: 0,
  })
})
