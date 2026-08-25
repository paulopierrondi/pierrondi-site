import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const content = await readFile(new URL('app/feitos/FeitosCommercialProof.tsx', root), 'utf8')
const data = await readFile(new URL('app/feitos/feitos-proof-data.ts', root), 'utf8')
const index = await readFile(new URL('app/feitos/FeitosIndexContent.tsx', root), 'utf8')
const styles = await readFile(new URL('app/feitos/FeitosCommercialProof.module.css', root), 'utf8')
const page = await readFile(new URL('app/feitos/page.tsx', root), 'utf8')
const schema = await readFile(new URL('app/feitos/feitos-schema.ts', root), 'utf8')

test('/feitos leads with a client-facing proof dossier before the shared project rail', () => {
  assert.match(index, /<FeitosCommercialProof lang=\{lang\} \/>/)
  assert.match(index, /<ProjectsSection lang=\{lang\} \/>/)
  assert.ok(index.indexOf('<FeitosCommercialProof') < index.indexOf('<ProjectsSection'))
  assert.match(content, /PAULO PIERRONDI · DADOS · TRABALHOS · PROVA/)
  assert.match(content, /Eu transformo trabalho manual em/)
  assert.match(content, /window\.print\(\)/)
  assert.match(content, /EVIDENCE LEDGER \/ 2026/)
})

test('claims are contextualized and cases remain anonymized', () => {
  assert.match(data, /50\.000\+/)
  assert.match(data, /500\+/)
  assert.match(data, /US\$ 10M\+/)
  assert.match(data, /Resultado agregado de automações e sistemas entregues/)
  assert.match(data, /case anonimizado/g)
  assert.match(content, /Resultados agregados de cases anonimizados/)
  assert.doesNotMatch(data, /GlobalTel|WorkForce Plus|FastDelivery Network/)
})

test('the paid AI reference flow proves payment-to-delivery fit', () => {
  for (const signal of [
    'input.validated',
    'payment.pending',
    'webhook.verified',
    'analysis.running',
    'result.delivered',
  ]) {
    assert.match(data, new RegExp(signal.replace('.', '\\.')))
  }
  assert.match(data, /Webhook assinado confirma o pagamento uma única vez/)
  assert.match(data, /Fila idempotente chama o modelo com retry e limite de custo/)
})

test('public proof uses only versioned first-party portfolio assets', async () => {
  const assets = [
    'public/portfolio/cantustudio/feature-graphic.png',
    'public/portfolio/faithschool/app-planner.png',
    'public/portfolio/agenticoscore/home-desktop.png',
  ]

  for (const asset of assets) await access(new URL(asset, root))
  assert.match(data, /https:\/\/cantustudio\.app/)
  assert.match(data, /https:\/\/faithschool\.app/)
  assert.match(data, /https:\/\/agenticoscore\.ai/)
})

test('/feitos metadata and schema describe the public proof surface', () => {
  assert.match(page, /Paulo Pierrondi — dados, trabalhos e provas de execução/)
  assert.match(page, /summary_large_image/)
  assert.match(page, /buildFeitosSchema\('pt'\)/)
  assert.match(schema, /'@type': 'CollectionPage'/)
  assert.match(schema, /'@type': 'ItemList'/)
  assert.match(schema, /'@id': `\$\{SITE_URL\}\/\#person`/)
})

test('the proof surface recomposes on mobile, reduced motion, and print', () => {
  assert.match(styles, /@media \(max-width: 700px\)/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(styles, /@media print/)
  assert.match(styles, /\.flowRail \{[\s\S]*grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/)
  assert.match(styles, /@media \(max-width: 700px\)[\s\S]*\.flowRail \{ grid-template-columns: 1fr; \}/)
})
