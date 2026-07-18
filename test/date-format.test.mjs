import assert from 'node:assert/strict'
import test from 'node:test'

import { formatDate } from '../lib/utils/date.ts'

test('editorial date-only values do not shift to the previous day', () => {
  assert.equal(
    formatDate('2026-07-18', { preset: 'blogLong', locale: 'pt-BR' }),
    '18 de julho de 2026',
  )
  assert.match(
    formatDate('2026-07-18', { preset: 'blogShort', locale: 'en-US' }),
    /Jul 18, 2026/,
  )
})
