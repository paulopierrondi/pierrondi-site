import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { chmodSync, mkdtempSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

function writeExecutable(filePath, body) {
  writeFileSync(filePath, body)
  chmodSync(filePath, 0o755)
}

async function listen(server) {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  return server.address().port
}

function runNode(args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, options)
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (chunk) => {
      stdout += chunk
    })
    child.stderr.on('data', (chunk) => {
      stderr += chunk
    })
    child.on('error', reject)
    child.on('close', (status) => {
      resolve({ status, stdout, stderr })
    })
  })
}

function writeProviderStubs(binDir) {
  writeExecutable(
    path.join(binDir, 'railway'),
    `#!/usr/bin/env node
const service = process.argv[process.argv.indexOf('--service') + 1]
const rowsByService = {
  'pierrondi-site': [
    { timestamp: '2026-06-30T18:00:00.000Z', host: 'www.pierrondi.dev', method: 'GET', path: '/marketing-os', httpStatus: 200, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.10', totalDuration: 42 },
    { timestamp: '2026-06-30T18:00:01.000Z', host: 'www.pierrondi.dev', method: 'GET', path: '/missing-offer', httpStatus: 404, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.11', totalDuration: 12 }
  ],
  'cantustudio-frontend': [
    { timestamp: '2026-06-30T18:00:02.000Z', host: 'cantustudio.app', method: 'GET', path: '/answers/melodia-para-satb', httpStatus: 200, clientUa: 'GPTBot/1.0', srcIp: '198.51.100.12', totalDuration: 35 },
    { timestamp: '2026-06-30T18:00:02.500Z', host: 'cantustudio.app', method: 'GET', path: '/api/.env', httpStatus: 404, clientUa: 'curl/8.0', srcIp: '198.51.100.14', totalDuration: 8 }
  ],
  'agentcore-revenue-ops': [
    { timestamp: '2026-06-30T18:00:03.000Z', host: 'agenticoscore.ai', method: 'GET', path: '/diagnostico', httpStatus: 200, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.13', totalDuration: 22 },
    { timestamp: '2026-06-30T18:00:03.500Z', host: 'agenticoscore.ai', method: 'GET', path: '/curl/c664b4f6c7b940d89f0a0dd6022a88de', httpStatus: 404, clientUa: 'curl/8.0', srcIp: '198.51.100.15', totalDuration: 9 }
  ]
}
for (const row of rowsByService[service] || []) console.log(JSON.stringify(row))
`,
  )
  writeExecutable(
    path.join(binDir, 'vercel'),
    `#!/usr/bin/env node
console.log(JSON.stringify({
  timestamp: 1782823200000,
  domain: 'faithschool.app',
  requestMethod: 'GET',
  requestPath: '/pricing',
  responseStatusCode: 200,
  source: 'iad1',
  cache: 'MISS'
}))
`,
  )
}

test('access snapshot emits and optionally delivers the n8n operations pulse', async () => {
  const binDir = mkdtempSync(path.join(tmpdir(), 'access-snapshot-bin-'))
  writeExecutable(
    path.join(binDir, 'railway'),
    `#!/usr/bin/env node
const service = process.argv[process.argv.indexOf('--service') + 1]
const rowsByService = {
  'pierrondi-site': [
    { timestamp: '2026-06-30T18:00:00.000Z', host: 'www.pierrondi.dev', method: 'GET', path: '/marketing-os', httpStatus: 200, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.10', totalDuration: 42 },
    { timestamp: '2026-06-30T18:00:01.000Z', host: 'www.pierrondi.dev', method: 'GET', path: '/missing-offer', httpStatus: 404, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.11', totalDuration: 12 }
  ],
  'cantustudio-frontend': [
    { timestamp: '2026-06-30T18:00:02.000Z', host: 'cantustudio.app', method: 'GET', path: '/answers/melodia-para-satb', httpStatus: 200, clientUa: 'GPTBot/1.0', srcIp: '198.51.100.12', totalDuration: 35 },
    { timestamp: '2026-06-30T18:00:02.500Z', host: 'cantustudio.app', method: 'GET', path: '/api/.env', httpStatus: 404, clientUa: 'curl/8.0', srcIp: '198.51.100.14', totalDuration: 8 }
  ],
  'agentcore-revenue-ops': [
    { timestamp: '2026-06-30T18:00:03.000Z', host: 'agenticoscore.ai', method: 'GET', path: '/diagnostico', httpStatus: 200, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.13', totalDuration: 22 },
    { timestamp: '2026-06-30T18:00:03.500Z', host: 'agenticoscore.ai', method: 'GET', path: '/curl/c664b4f6c7b940d89f0a0dd6022a88de', httpStatus: 404, clientUa: 'curl/8.0', srcIp: '198.51.100.15', totalDuration: 9 }
  ]
}
for (const row of rowsByService[service] || []) console.log(JSON.stringify(row))
`,
  )
  writeExecutable(
    path.join(binDir, 'vercel'),
    `#!/usr/bin/env node
console.log(JSON.stringify({
  timestamp: 1782823200000,
  domain: 'faithschool.app',
  requestMethod: 'GET',
  requestPath: '/pricing',
  responseStatusCode: 200,
  source: 'iad1',
  cache: 'MISS'
}))
`,
  )

  const received = []
  const server = createServer((request, response) => {
    let body = ''
    request.setEncoding('utf8')
    request.on('data', (chunk) => {
      body += chunk
    })
    request.on('end', () => {
      received.push(JSON.parse(body))
      response.writeHead(200, { 'Content-Type': 'application/json', Connection: 'close' })
      response.end(JSON.stringify({ ok: true }))
    })
  })
  const port = await listen(server)

  try {
    const result = await runNode(
      ['scripts/access-snapshot.mjs', '--since', '1h', '--limit', '10', '--analytics=0'],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          PATH: `${binDir}:${process.env.PATH}`,
          ACCESS_SNAPSHOT_N8N_DISPATCH: '1',
          ACCESS_SNAPSHOT_N8N_WEBHOOK_URL: `http://127.0.0.1:${port}/portfolio-access`,
          ACCESS_SNAPSHOT_LOCAL_LLM_TRIAGE: '0',
          PORTFOLIO_ACCESS_LOCAL_LLM_TRIAGE: '0',
          // CI runners don't have the per-service worktree paths from SOURCES;
          // point every source at the repo root so the mocked CLIs run hermetically.
          ACCESS_SNAPSHOT_SOURCES_CWD: process.cwd(),
        },
      },
    )

    assert.equal(result.status, 0, result.stderr)
    const report = JSON.parse(result.stdout)

    assert.equal(report.operationsPulse.automationId, 'hourly-portfolio-access-geo-monitor')
    assert.equal(report.operationsPulse.severity, 'warning')
    assert.equal(report.operationsPulse.urgency, 'same_day')
    assert.equal(report.operationsPulse.n8n.delivery.status, 'sent')
    assert.equal(report.operationsPulse.n8n.webhookConfigured, true)
    assert.equal(report.operationsPulse.n8n.webhookEnv, 'ACCESS_SNAPSHOT_N8N_WEBHOOK_URL')
    assert.equal(report.operationsPulse.localLlm.enabled, false)
    assert.equal(report.operationsPulse.localLlm.delivery.status, 'disabled')
    assert.equal(report.operationsPulse.metrics.requests, 7)
    assert.equal(report.sources.find((source) => source.id === 'faithschool').sample.truncated, false)
    assert.equal(report.operationsPulse.metrics.aiCrawlerRequests, 1)
    assert.equal(report.operationsPulse.metrics.actionableErrors, 1)
    assert.equal(report.operationsPulse.metrics.knownNoiseErrors, 2)
    assert.equal(report.operationsPulse.metrics.sampledSources, 0)
    assert.equal(report.sources.find((source) => source.id === 'cantustudio').intent.topKnownNoiseErrorPaths[0].key, '404 /api/.env')
    assert.equal(
      report.sources.find((source) => source.id === 'agenticoscore').intent.topKnownNoiseErrorPaths[0].key,
      '404 /curl/c664b4f6c7b940d89f0a0dd6022a88de',
    )
    assert.equal(report.operationsPulse.decisionState.hasOpenTechnicalWork, true)
    assert.equal(report.operationsPulse.decisionState.repeatedGateCandidate, false)
    assert.match(report.operationsPulse.decisionState.signature, /^[a-f0-9]{16}$/)
    assert.match(report.operationsPulse.n8n.dedupeKey, /^hourly-portfolio-access-geo-monitor:warning:[a-f0-9]{16}$/)
    assert.equal(report.operationsPulse.n8n.dedupeKey.includes(report.generatedAt.slice(0, 13)), false)
    assert.equal(report.operationsPulse.queue.some((item) => item.route === 'incident_or_fix_queue'), true)

    assert.equal(received.length, 1)
    assert.equal(received[0].event, 'portfolio.access_geo_monitor')
    assert.equal(received[0].automationId, report.operationsPulse.automationId)
    assert.equal(received[0].dedupeKey, report.operationsPulse.n8n.dedupeKey)
    assert.equal(received[0].decisionState.signature, report.operationsPulse.decisionState.signature)
    assert.equal(received[0].metrics.requests, 7)
    assert.equal(received[0].queue.some((item) => item.owner === 'technical_ops'), true)
    assert.equal(JSON.stringify(received[0]).includes(`127.0.0.1:${port}`), false)

    const repeatResult = await runNode(
      ['scripts/access-snapshot.mjs', '--since', '1h', '--limit', '10', '--analytics=0'],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          PATH: `${binDir}:${process.env.PATH}`,
          ACCESS_SNAPSHOT_N8N_DISPATCH: '1',
          ACCESS_SNAPSHOT_N8N_WEBHOOK_URL: `http://127.0.0.1:${port}/portfolio-access`,
          ACCESS_SNAPSHOT_LOCAL_LLM_TRIAGE: '0',
          PORTFOLIO_ACCESS_LOCAL_LLM_TRIAGE: '0',
          ACCESS_SNAPSHOT_SOURCES_CWD: process.cwd(),
        },
      },
    )
    assert.equal(repeatResult.status, 0, repeatResult.stderr)
    const repeatReport = JSON.parse(repeatResult.stdout)
    assert.equal(repeatReport.operationsPulse.n8n.dedupeKey, report.operationsPulse.n8n.dedupeKey)
  } finally {
    server.closeAllConnections?.()
    await new Promise((resolve) => server.close(resolve))
  }
})

test('access snapshot treats protected AgenticosCore conversion exports as expected auth', async () => {
  const binDir = mkdtempSync(path.join(tmpdir(), 'access-snapshot-bin-'))
  writeExecutable(
    path.join(binDir, 'railway'),
    `#!/usr/bin/env node
const service = process.argv[process.argv.indexOf('--service') + 1]
const rowsByService = {
  'agentcore-revenue-ops': [
    { timestamp: '2026-06-30T18:00:03.000Z', host: 'agenticoscore.ai', method: 'GET', path: '/conversions.csv', httpStatus: 401, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.13', totalDuration: 22 },
    { timestamp: '2026-06-30T18:00:03.500Z', host: 'agenticoscore.ai', method: 'GET', path: '/conversions.json', httpStatus: 401, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.13', totalDuration: 18 }
  ]
}
for (const row of rowsByService[service] || []) console.log(JSON.stringify(row))
`,
  )
  writeExecutable(path.join(binDir, 'vercel'), '#!/usr/bin/env node\n')

  const result = await runNode(['scripts/access-snapshot.mjs', '--since', '1h', '--limit', '10', '--analytics=0'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PATH: `${binDir}:${process.env.PATH}`,
      ACCESS_SNAPSHOT_LOCAL_LLM_TRIAGE: '0',
      PORTFOLIO_ACCESS_LOCAL_LLM_TRIAGE: '0',
      ACCESS_SNAPSHOT_SOURCES_CWD: process.cwd(),
    },
  })

  assert.equal(result.status, 0, result.stderr)
  const report = JSON.parse(result.stdout)
  const agenticoscore = report.sources.find((source) => source.id === 'agenticoscore')

  assert.equal(agenticoscore.intent.actionableErrorCount, 0)
  assert.equal(agenticoscore.intent.knownNoiseErrorCount, 2)
  assert.deepEqual(agenticoscore.intent.issueBuckets, { expected_auth: 2 })
  assert.deepEqual(agenticoscore.intent.topKnownNoiseErrorPaths, [
    { key: '401 /conversions.csv', value: 1 },
    { key: '401 /conversions.json', value: 1 },
  ])
  assert.equal(report.operationsPulse.metrics.actionableErrors, 0)
  assert.equal(report.operationsPulse.metrics.knownNoiseErrors, 2)
})

test('access snapshot filters benign monitor probes without hiding real public growth 404s', async () => {
  const binDir = mkdtempSync(path.join(tmpdir(), 'access-snapshot-bin-'))
  writeExecutable(
    path.join(binDir, 'railway'),
    `#!/usr/bin/env node
const service = process.argv[process.argv.indexOf('--service') + 1]
const rowsByService = {
  'pierrondi-site': [
    { timestamp: '2026-06-30T18:00:00.000Z', host: 'www.pierrondi.dev', method: 'GET', path: '/apps/definitely-not-a-real-app-zzz', httpStatus: 404, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.10', totalDuration: 12 },
    { timestamp: '2026-06-30T18:00:00.500Z', host: 'www.pierrondi.dev', method: 'GET', path: '/ads.txt', httpStatus: 404, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.13', totalDuration: 10 }
  ],
  'cantustudio-frontend': [
    { timestamp: '2026-06-30T18:00:01.000Z', host: 'cantustudio.app', method: 'GET', path: '/app-ads.txt', httpStatus: 404, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.11', totalDuration: 8 },
    { timestamp: '2026-06-30T18:00:01.500Z', host: 'cantustudio.app', method: 'GET', path: '/.well-known/traffic-advice', httpStatus: 404, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.14', totalDuration: 9 },
    { timestamp: '2026-06-30T18:00:02.000Z', host: 'cantustudio.app', method: 'GET', path: '/satb/how-great-thou-art', httpStatus: 404, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.12', totalDuration: 18 }
  ]
}
for (const row of rowsByService[service] || []) console.log(JSON.stringify(row))
`,
  )
  writeExecutable(path.join(binDir, 'vercel'), '#!/usr/bin/env node\n')

  const result = await runNode(['scripts/access-snapshot.mjs', '--since', '1h', '--limit', '10', '--analytics=0'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PATH: `${binDir}:${process.env.PATH}`,
      ACCESS_SNAPSHOT_LOCAL_LLM_TRIAGE: '0',
      PORTFOLIO_ACCESS_LOCAL_LLM_TRIAGE: '0',
      ACCESS_SNAPSHOT_SOURCES_CWD: process.cwd(),
    },
  })

  assert.equal(result.status, 0, result.stderr)
  const report = JSON.parse(result.stdout)
  const pierrondi = report.sources.find((source) => source.id === 'pierrondi')
  const cantustudio = report.sources.find((source) => source.id === 'cantustudio')

  assert.equal(pierrondi.intent.actionableErrorCount, 0)
  assert.equal(pierrondi.intent.knownNoiseErrorCount, 2)
  assert.deepEqual(pierrondi.intent.issueBuckets, { known_noise: 2 })
  assert.equal(cantustudio.intent.actionableErrorCount, 1)
  assert.equal(cantustudio.intent.knownNoiseErrorCount, 2)
  assert.deepEqual(cantustudio.intent.topActionableErrorPaths, [{ key: '404 /satb/how-great-thou-art', value: 1 }])
  assert.deepEqual(cantustudio.intent.topKnownNoiseErrorPaths, [
    { key: '404 /.well-known/traffic-advice', value: 1 },
    { key: '404 /app-ads.txt', value: 1 },
  ])
  assert.equal(report.operationsPulse.metrics.actionableErrors, 1)
  assert.equal(report.operationsPulse.metrics.knownNoiseErrors, 4)
})

test('access snapshot can triage operations pulse with a local Ollama-compatible LLM', async () => {
  const binDir = mkdtempSync(path.join(tmpdir(), 'access-snapshot-bin-'))
  writeProviderStubs(binDir)

  const received = []
  const n8nReceived = []
  const server = createServer((request, response) => {
    let body = ''
    request.setEncoding('utf8')
    request.on('data', (chunk) => {
      body += chunk
    })
    request.on('end', () => {
      const parsed = JSON.parse(body)
      if (request.url === '/portfolio-access') {
        n8nReceived.push(parsed)
        response.writeHead(200, { 'Content-Type': 'application/json', Connection: 'close' })
        response.end(JSON.stringify({ ok: true }))
        return
      }
      received.push(parsed)
      response.writeHead(200, { 'Content-Type': 'application/json', Connection: 'close' })
      response.end(JSON.stringify({
        response: JSON.stringify({
          summary: 'AI crawler and commercial demand require provider setup, not production action.',
          recommendedAction: 'Batch the analytics access decisions before changing campaigns or deployments.',
          priority: 'decision_batch',
          rationale: 'The current queue is dominated by human-gated analytics access.',
          actionItems: [
            {
              owner: 'infra_analytics',
              action: 'Prepare GA4 and Search Console property access decisions.',
              humanGate: true,
            },
          ],
        }),
      }))
    })
  })
  const port = await listen(server)

  try {
    const result = await runNode(
      ['scripts/access-snapshot.mjs', '--since', '1h', '--limit', '10', '--analytics=0'],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          PATH: `${binDir}:${process.env.PATH}`,
          ACCESS_SNAPSHOT_N8N_DISPATCH: '1',
          ACCESS_SNAPSHOT_N8N_WEBHOOK_URL: `http://127.0.0.1:${port}/portfolio-access`,
          ACCESS_SNAPSHOT_LOCAL_LLM_TRIAGE: '1',
          ACCESS_SNAPSHOT_LOCAL_LLM_ENDPOINT: `http://127.0.0.1:${port}/api/generate`,
          ACCESS_SNAPSHOT_LOCAL_LLM_MODEL: 'qwen3:14b',
        },
      },
    )

    assert.equal(result.status, 0, result.stderr)
    const report = JSON.parse(result.stdout)

    assert.equal(received.length, 1)
    assert.equal(received[0].model, 'qwen3:14b')
    assert.equal(received[0].stream, false)
    assert.equal(received[0].format, 'json')
    assert.equal(received[0].prompt.includes('Return only compact JSON'), true)
    assert.equal(report.operationsPulse.localLlm.enabled, true)
    assert.equal(report.operationsPulse.localLlm.delivery.status, 'completed')
    assert.equal(report.operationsPulse.localLlm.delivery.model, 'qwen3:14b')
    assert.equal(report.operationsPulse.localLlm.delivery.result.priority, 'decision_batch')
    assert.equal(report.operationsPulse.localLlm.delivery.result.actionItems[0].humanGate, true)
    assert.equal(report.operationsPulse.localLlm.delivery.actionReport.decision, report.operationsPulse.urgency)
    assert.equal(report.operationsPulse.localLlm.delivery.actionReport.recommendedAction, 'Batch the analytics access decisions before changing campaigns or deployments.')
    assert.equal(Array.isArray(report.operationsPulse.localLlm.delivery.actionReport.actionPlan.blockedByHumanGate), true)
    assert.equal(report.operationsPulse.n8n.delivery.status, 'sent')
    assert.equal(n8nReceived.length, 1)
    assert.equal(n8nReceived[0].llmActionReport.recommendedAction, 'Batch the analytics access decisions before changing campaigns or deployments.')
    assert.equal(n8nReceived[0].llmActionReport.n8n.workflow, 'portfolio-access-geo-monitor-triage')
    assert.equal(JSON.stringify(n8nReceived[0]).includes(`127.0.0.1:${port}`), false)
    assert.equal(JSON.stringify(report).includes(`127.0.0.1:${port}`), false)
  } finally {
    server.closeAllConnections?.()
    await new Promise((resolve) => server.close(resolve))
  }
})

test('access snapshot blocks local LLM triage when endpoint is not local', async () => {
  const binDir = mkdtempSync(path.join(tmpdir(), 'access-snapshot-bin-'))
  writeProviderStubs(binDir)

  const result = await runNode(
    ['scripts/access-snapshot.mjs', '--since', '1h', '--limit', '10', '--analytics=0'],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env.PATH}`,
        ACCESS_SNAPSHOT_N8N_DISPATCH: '0',
        ACCESS_SNAPSHOT_LOCAL_LLM_TRIAGE: '1',
        ACCESS_SNAPSHOT_LOCAL_LLM_ENDPOINT: 'https://example.com/api/generate',
      },
    },
  )

  assert.equal(result.status, 0, result.stderr)
  const report = JSON.parse(result.stdout)
  assert.equal(report.operationsPulse.localLlm.enabled, true)
  assert.equal(report.operationsPulse.localLlm.delivery.status, 'blocked_nonlocal_endpoint')
  assert.equal(JSON.stringify(report).includes('https://example.com'), false)
})

test('access snapshot falls back when local LLM returns empty JSON', async () => {
  const binDir = mkdtempSync(path.join(tmpdir(), 'access-snapshot-bin-'))
  writeProviderStubs(binDir)

  const server = createServer((request, response) => {
    request.resume()
    request.on('end', () => {
      response.writeHead(200, { 'Content-Type': 'application/json', Connection: 'close' })
      response.end(JSON.stringify({ response: '{}' }))
    })
  })
  const port = await listen(server)

  try {
    const result = await runNode(
      ['scripts/access-snapshot.mjs', '--since', '1h', '--limit', '10', '--analytics=0'],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          PATH: `${binDir}:${process.env.PATH}`,
          ACCESS_SNAPSHOT_N8N_DISPATCH: '0',
          ACCESS_SNAPSHOT_LOCAL_LLM_TRIAGE: '1',
          ACCESS_SNAPSHOT_LOCAL_LLM_ENDPOINT: `http://127.0.0.1:${port}/api/generate`,
        },
      },
    )

    assert.equal(result.status, 0, result.stderr)
    const report = JSON.parse(result.stdout)
    const triage = report.operationsPulse.localLlm.delivery.result
    assert.equal(report.operationsPulse.localLlm.delivery.status, 'completed')
    assert.equal(triage.priority, report.operationsPulse.urgency)
    assert.match(triage.summary, /requests/)
    assert.equal(triage.actionItems.length > 0, true)
    assert.equal(report.operationsPulse.localLlm.delivery.actionReport.decision, report.operationsPulse.urgency)
    assert.equal(report.operationsPulse.localLlm.delivery.actionReport.n8n.workflow, 'portfolio-access-geo-monitor-triage')
  } finally {
    server.closeAllConnections?.()
    await new Promise((resolve) => server.close(resolve))
  }
})
