import { writeFile } from 'node:fs/promises'
import { getCurrentLanguage } from '../lib/i18n/site-language.ts'

const base = (process.env.TARGET_URL || 'https://www.pierrondi.dev').replace(/\/$/, '')
const sitemapResponse = await fetch(`${base}/sitemap.xml`)
if (!sitemapResponse.ok) throw new Error(`sitemap: ${sitemapResponse.status}`)
const urls = [...(await sitemapResponse.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const results = []
const failures = []

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] || ''
}

function meta(html, name) {
  return (html.match(/<meta\b[^>]*>/gi) || []).find((tag) => attribute(tag, 'property') === name)
}

async function check(canonicalUrl) {
  const path = new URL(canonicalUrl).pathname
  const response = await fetch(`${base}${path}`, { redirect: 'manual' })
  const html = await response.text()
  const expected = getCurrentLanguage(path) === 'en' ? 'en-US' : 'pt-BR'
  const lang = attribute(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang')
  const canonicalTag = (html.match(/<link\b[^>]*>/gi) || []).find((tag) => attribute(tag, 'rel') === 'canonical')
  const canonical = attribute(canonicalTag || '', 'href')
  const ogUrl = attribute(meta(html, 'og:url') || '', 'content')
  const issues = []
  if (response.status !== 200) issues.push(`HTTP ${response.status}`)
  if (lang !== expected) issues.push(`html lang=${lang}, expected ${expected}`)
  if (response.headers.get('content-language') !== expected) issues.push('Content-Language mismatch')
  if (canonical.replace(/\/$/, '') !== canonicalUrl.replace(/\/$/, '')) issues.push('canonical mismatch')
  if (ogUrl.replace(/\/$/, '') !== canonical.replace(/\/$/, '')) issues.push('og:url mismatch')
  if (/"@type"\s*:\s*"ContactAction"/.test(html)) issues.push('unknown schema ContactAction')
  if (/private|no-store/.test(response.headers.get('cache-control') || '')) issues.push('public route lost shared cache')
  const row = { path, status: response.status, expected, lang, canonical, ogUrl, cacheControl: response.headers.get('cache-control'), issues }
  results.push(row)
  if (issues.length) failures.push(row)
}

for (let start = 0; start < urls.length; start += 4) {
  await Promise.all(urls.slice(start, start + 4).map(check))
}
const report = { base, at: new Date().toISOString(), checked: results.length, failures, results }
if (process.env.SEO_LOCALE_REPORT) await writeFile(process.env.SEO_LOCALE_REPORT, JSON.stringify(report, null, 2))
console.log(JSON.stringify({ checked: results.length, failures: failures.length, details: failures.map(({ path, issues }) => ({ path, issues })) }, null, 2))
process.exitCode = failures.length ? 1 : 0
