#!/usr/bin/env node
/**
 * Submit sitemap URLs to IndexNow (https://www.indexnow.org/).
 *
 * Default: dry-run (fetch sitemap, filter, print payload — no POST).
 * Submit:  node scripts/indexnow-submit.mjs --submit
 *
 * Never includes /sprint (or any /sprint/* path).
 */

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HOST = 'www.pierrondi.dev'
const SITE_ORIGIN = `https://${HOST}`
const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const FETCH_TIMEOUT_MS = 30000

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const KEY_POINTER = path.join(ROOT, 'public', 'indexnow-key.txt')

function hasFlag(name) {
  return process.argv.includes(`--${name}`)
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
}

function isSprintUrl(url) {
  try {
    const pathname = new URL(url).pathname
    return pathname === '/sprint' || pathname.startsWith('/sprint/')
  } catch {
    return false
  }
}

function filterUrlList(urls) {
  const seen = new Set()
  const kept = []
  const skippedSprint = []

  for (const url of urls) {
    if (isSprintUrl(url)) {
      skippedSprint.push(url)
      continue
    }
    if (seen.has(url)) continue
    seen.add(url)
    kept.push(url)
  }

  return { kept, skippedSprint }
}

async function loadKey() {
  const key = (await readFile(KEY_POINTER, 'utf8')).trim()
  if (!/^[a-f0-9]{32}$/i.test(key)) {
    throw new Error(`Invalid IndexNow key in ${KEY_POINTER}: expected 32 hex chars`)
  }

  const keyFile = path.join(ROOT, 'public', `${key}.txt`)
  const keyFileBody = (await readFile(keyFile, 'utf8')).trim()
  if (keyFileBody !== key) {
    throw new Error(`Key file ${key}.txt content does not match indexnow-key.txt`)
  }

  return key
}

async function fetchSitemap() {
  const response = await fetch(SITEMAP_URL, {
    headers: { 'user-agent': 'pierrondi.dev IndexNow submitter' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: HTTP ${response.status}`)
  }
  return response.text()
}

async function main() {
  const shouldSubmit = hasFlag('submit')
  const key = await loadKey()
  const keyLocation = `${SITE_ORIGIN}/${key}.txt`
  const xml = await fetchSitemap()
  const rawUrls = extractSitemapUrls(xml)
  const { kept, skippedSprint } = filterUrlList(rawUrls)

  const payload = {
    host: HOST,
    key,
    keyLocation,
    urlList: kept,
  }

  console.log(
    JSON.stringify(
      {
        mode: shouldSubmit ? 'submit' : 'dry-run',
        endpoint: INDEXNOW_ENDPOINT,
        sitemap: SITEMAP_URL,
        keyFile: `/${key}.txt`,
        keyLocation,
        sitemapUrlCount: rawUrls.length,
        skippedSprintCount: skippedSprint.length,
        skippedSprint,
        submitUrlCount: kept.length,
      },
      null,
      2,
    ),
  )

  if (!shouldSubmit) {
    console.log('\nDry-run only. Re-run with --submit to POST to IndexNow.')
    return
  }

  if (kept.length === 0) {
    throw new Error('No URLs to submit after filtering')
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'user-agent': 'pierrondi.dev IndexNow submitter',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })

  const body = await response.text().catch(() => '')
  console.log(
    JSON.stringify(
      {
        submitted: true,
        status: response.status,
        body: body.slice(0, 500),
      },
      null,
      2,
    ),
  )

  // IndexNow: 200 OK, 202 Accepted are success. 204 No Content also accepted by some engines.
  if (![200, 202, 204].includes(response.status)) {
    process.exitCode = 1
    throw new Error(`IndexNow POST failed with HTTP ${response.status}`)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
