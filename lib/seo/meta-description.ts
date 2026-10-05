/** Site SEO convention, matching treinamentos/engajamento tests and Ahrefs SERP budget. */
export const META_DESCRIPTION_MIN = 120
export const META_DESCRIPTION_MAX = 160

const SENTENCE_MARKS = ['.', '!', '?']
const CLAUSE_MARKS = [';', ':', '—', '–', ',']

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

function tidy(text: string): string {
  return text.replace(/[\s.,;:!?—–-]+$/u, '').trim()
}

function dropWeakTail(text: string): string {
  const words = tidy(text).split(' ')
  while (words.length > 4 && WEAK_TAIL.has(words[words.length - 1].toLowerCase())) {
    words.pop()
  }
  return tidy(words.join(' '))
}

function lastMarkAt(slice: string, marks: string[], min: number): number {
  let best = -1
  for (const mark of marks) {
    const at = slice.lastIndexOf(mark)
    if (at >= min) best = Math.max(best, at)
  }
  return best
}

/**
 * Fit a meta description to the project SERP max without emptying it.
 * Cuts are biased toward the top of the 120–160 window so trimming an
 * "description too long" issue cannot create a "too short" one, and prefer a
 * whole sentence or clause because apps/feitos reuse this copy as body text.
 */
export function clampMetaDescription(value: string, max = META_DESCRIPTION_MAX): string {
  const text = value.replace(/\s+/g, ' ').trim()
  if (!text || text.length <= max) return text

  const slice = text.slice(0, max)
  const min = Math.min(META_DESCRIPTION_MIN, Math.floor(max * 0.75))

  // A sentence that ends exactly on the budget is already the ideal snippet.
  if (SENTENCE_MARKS.includes(text[max])) return tidy(slice) || slice.trim()

  const sentenceAt = lastMarkAt(slice, SENTENCE_MARKS, min)
  if (sentenceAt >= min) return slice.slice(0, sentenceAt + 1).trim()

  const clauseAt = lastMarkAt(slice, CLAUSE_MARKS, min)
  if (clauseAt >= min) return tidy(slice.slice(0, clauseAt))

  const wordAt = slice.lastIndexOf(' ')
  const cut = wordAt > 0 ? slice.slice(0, wordAt) : slice
  return dropWeakTail(cut) || slice.trim()
}
