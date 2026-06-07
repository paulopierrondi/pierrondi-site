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

test('creative collector surfaces approved published devotionals separately from pending queue', () => {
  const result = spawnSync(
    'python3',
    [
      '-c',
      `
import importlib.util
import json

spec = importlib.util.spec_from_file_location(
    "creative_control_snapshot",
    "scripts/creative-control-snapshot.py",
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

section = mod.build_devotionals_section(
    {"items": []},
    max_pending=24,
    published_payload={
        "items": [
            {
                "id": "2026-06-07_pt-BR_ARA",
                "date": "2026-06-07",
                "locale": "pt-BR",
                "bibleTranslation": "ARA",
                "scriptureRef": "Joao 3:16",
                "title": "O amor de Deus",
                "body": "Porque Deus amou o mundo.",
                "reviewStatus": "approved",
                "generatedAt": "2026-06-07T06:00:00.000Z",
            }
        ]
    },
)
print(json.dumps(section))
      `,
    ],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
    },
  )

  assert.equal(result.status, 0, result.stderr)
  const section = JSON.parse(result.stdout)

  assert.equal(section.stats.totalPending, 0)
  assert.equal(section.pending.length, 0)
  assert.equal(section.stats.totalPublished, 1)
  assert.deepEqual(section.stats.byPublishedLanguage, { 'pt-BR': 1 })
  assert.equal(section.published[0].docId, '2026-06-07_pt-BR_ARA')
  assert.equal(section.published[0].bibleTranslation, 'ARA')
  assert.equal(section.published[0].reviewStatus, 'approved')
})
