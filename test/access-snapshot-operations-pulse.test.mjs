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
    { timestamp: '2026-06-30T18:00:02.000Z', host: 'cantustudio.app', method: 'GET', path: '/answers/melodia-para-satb', httpStatus: 200, clientUa: 'GPTBot/1.0', srcIp: '198.51.100.12', totalDuration: 35 }
  ],
  'agentcore-revenue-ops': [
    { timestamp: '2026-06-30T18:00:03.000Z', host: 'agenticoscore.ai', method: 'GET', path: '/diagnostico', httpStatus: 200, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.13', totalDuration: 22 }
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

test('access snapshot emits and optionally delivers the n8n operations pulse', { todo: 'operationsPulse not yet implemented in access-snapshot.mjs' }, async () => {
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
    { timestamp: '2026-06-30T18:00:02.000Z', host: 'cantustudio.app', method: 'GET', path: '/answers/melodia-para-satb', httpStatus: 200, clientUa: 'GPTBot/1.0', srcIp: '198.51.100.12', totalDuration: 35 }
  ],
  'agentcore-revenue-ops': [
    { timestamp: '2026-06-30T18:00:03.000Z', host: 'agenticoscore.ai', method: 'GET', path: '/diagnostico', httpStatus: 200, clientUa: 'Mozilla/5.0', srcIp: '198.51.100.13', totalDuration: 22 }
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
    assert.equal(report.operationsPulse.metrics.requests, 5)
    assert.equal(report.operationsPulse.metrics.aiCrawlerRequests, 1)
    assert.equal(report.operationsPulse.queue.some((item) => item.route === 'incident_or_fix_queue'), true)

    assert.equal(received.length, 1)
    assert.equal(received[0].event, 'portfolio.access_geo_monitor')
    assert.equal(received[0].automationId, report.operationsPulse.automationId)
    assert.equal(received[0].dedupeKey, report.operationsPulse.n8n.dedupeKey)
    assert.equal(received[0].metrics.requests, 5)
    assert.equal(received[0].queue.some((item) => item.owner === 'technical_ops'), true)
    assert.equal(JSON.stringify(received[0]).includes(`127.0.0.1:${port}`), false)
  } finally {
    server.closeAllConnections?.()
    await new Promise((resolve) => server.close(resolve))
  }
})

test('access snapshot can triage operations pulse with a local Ollama-compatible LLM', { todo: 'operationsPulse not yet implemented in access-snapshot.mjs' }, async () => {
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

test('access snapshot blocks local LLM triage when endpoint is not local', { todo: 'operationsPulse not yet implemented in access-snapshot.mjs' }, async () => {
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

test('access snapshot falls back when local LLM returns empty JSON', { todo: 'operationsPulse not yet implemented in access-snapshot.mjs' }, async () => {
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
