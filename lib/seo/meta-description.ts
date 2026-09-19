/** Site SEO convention, matching treinamentos/engajamento tests and Ahrefs SERP budget. */
export const META_DESCRIPTION_MIN = 120
export const META_DESCRIPTION_MAX = 160

const WEAK_TAIL = new Set([
  'a',
  'an',
  'and',
  'at',
  'for',
  'in',
  'no',
  'of',
  'or',
  'the',
  'to',
  'with',
  'your',
  'da',
  'de',
  'do',
  'e',
  'em',
  'na',
  'os',
  'um',
  'uma',
])

function finish(cut: string): string {
  let text = cut.replace(/[\s.,;:!?—–-]+$/u, '').trim()
  const words = text.split(' ')
  while (words.length > 4 && WEAK_TAIL.has(words[words.length - 1].toLowerCase())) {
    words.pop()
  }
  return words.join(' ').replace(/[\s.,;:!?—–-]+$/u, '').trim()
}

function lastBreak(slice: string, marks: string[], minKeep: number): number {
  let best = -1
  for (const mark of marks) {
    const at = slice.lastIndexOf(mark)
    if (at >= minKeep) best = Math.max(best, at)
  }
  return best
}

/**
 * Fit a meta description to the project SERP max without emptying it.
 * Prefers a finished sentence or clause so generated pages (apps, feitos)
 * keep meaning when the source copy is also used as on-page body text.
 */
export function clampMetaDescription(value: string, max = META_DESCRIPTION_MAX): string {
  const text = value.replace(/\s+/g, ' ').trim()
  if (!text || text.length <= max) return text

  const slice = text.slice(0, max)
  const next = text[max] ?? ''
  const minKeep = 80

  if (/[\s.!?]/.test(next)) {
    return finish(slice) || text.slice(0, max).trim()
  }

  const periodAt = slice.lastIndexOf('.')
  if (periodAt >= minKeep) return slice.slice(0, periodAt + 1).trim()

  const clauseAt = lastBreak(slice, [':', '—', '–', ';'], 90)
  if (clauseAt >= 90) return finish(slice.slice(0, clauseAt)) || text.slice(0, max).trim()

  const spaceAt = slice.lastIndexOf(' ')
  const cut = spaceAt >= minKeep ? slice.slice(0, spaceAt) : slice
  return finish(cut) || text.slice(0, max).trim()
}
