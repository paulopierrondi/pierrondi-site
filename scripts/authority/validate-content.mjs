import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
const contentPath = path.join(root, 'content/authority/paulo-authority-ops.json')

const denyTerms = [
  'Bradesco',
  'Banco Bradesco',
  'Rodrigo Rezende',
  'Joao Saes',
  'João Saes',
  'Impact',
  'CEG',
  'Accenture',
  'NTT',
  'IBM',
  '4MATT',
  'COI',
  'Sayumi',
]

const raw = await readFile(contentPath, 'utf8')
const data = JSON.parse(raw)
const searchable = JSON.stringify(data)
const hits = denyTerms.filter((term) => searchable.toLowerCase().includes(term.toLowerCase()))

if (hits.length) {
  console.error(`Authority content contains denied sensitive terms: ${hits.join(', ')}`)
  process.exit(1)
}

if (data.budgetUsd > 40) {
  console.error(`Authority budget exceeds USD 40: ${data.budgetUsd}`)
  process.exit(1)
}

if (data.guardrails?.runtimeWrites !== false || data.guardrails?.autopublish !== false) {
  console.error('Authority guardrails must keep runtimeWrites=false and autopublish=false')
  process.exit(1)
}

const queue = Array.isArray(data.contentQueue) ? data.contentQueue : []
const invalidQueue = queue.filter((item) => item.channel !== 'linkedin' || item.status !== 'draft_only')
if (invalidQueue.length) {
  console.error('Authority contentQueue must remain linkedin + draft_only')
  process.exit(1)
}

const ptSections = data.pages?.pt?.sections?.length ?? -1
const enSections = data.pages?.en?.sections?.length ?? -2
if (ptSections !== enSections) {
  console.error(`PT/EN section parity failed: pt=${ptSections} en=${enSections}`)
  process.exit(1)
}

for (const path of ['qualities.items', 'capabilities', 'evidence.items', 'operatingSystem']) {
  const readPath = (page) => path.split('.').reduce((value, key) => value?.[key], page)
  const ptCount = readPath(data.pages?.pt)?.length ?? -1
  const enCount = readPath(data.pages?.en)?.length ?? -2

  if (ptCount !== enCount) {
    console.error(`PT/EN ${path} parity failed: pt=${ptCount} en=${enCount}`)
    process.exit(1)
  }
}

console.log(`Authority content ok: ${queue.length} draft LinkedIn items, budget USD ${data.budgetUsd}`)
