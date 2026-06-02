import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = await readFile(new URL('../app/itau/ItauExperience.tsx', import.meta.url), 'utf8')

test('Itaú page anchors AI governance guidance in ServiceNow-supported terms', () => {
  const requiredTerms = [
    'alm_ai_system_digital_asset',
    'cmdb_ai_system_product_model',
    'cmdb_ci_function_ai',
    'cmdb_ci_appl_ai_application',
    'cmdb_rel_asset_ci',
    'Service Graph Connectors',
    'IRE',
    'shadow AI',
    'sandbox',
    'piloto',
    'carga em escala',
  ]

  for (const term of requiredTerms) {
    assert.match(source, new RegExp(term, 'i'), `Expected Itaú page to mention ${term}`)
  }
})

test('Itaú page ships the 3D CSDM architecture blueprint pitch', () => {
  const requiredTerms = [
    '@react-three/fiber',
    'CSDMArchitectureScene',
    'ServiceNow CSDM Architecture Blueprint',
    'data-itau-architecture-canvas',
    'Architecture Sprint',
    'Reference Pack',
  ]

  for (const term of requiredTerms) {
    assert.match(source, new RegExp(term, 'i'), `Expected Itaú architecture page to mention ${term}`)
  }
})
