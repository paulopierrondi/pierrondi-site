// Test-only preload (node --import) for scripts/indexnow-submit.mjs.
// Replaces globalThis.fetch so the dry-run test never touches the network:
// the live sitemap is served from a local fixture, and any other request
// (including the real IndexNow endpoint) fails loudly.
const SITEMAP_URL = 'https://www.pierrondi.dev/sitemap.xml'

const SITEMAP_FIXTURE = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.pierrondi.dev/</loc></url>
  <url><loc>https://www.pierrondi.dev/feitos</loc></url>
  <url><loc>https://www.pierrondi.dev/engajamento</loc></url>
  <url><loc>https://www.pierrondi.dev/en/answers</loc></url>
  <url><loc>https://www.pierrondi.dev/en/answers/what-is-agentops</loc></url>
  <url><loc>https://www.pierrondi.dev/sprint</loc></url>
  <url><loc>https://www.pierrondi.dev/sprint/obrigado</loc></url>
  <url><loc>https://www.pierrondi.dev/feitos</loc></url>
</urlset>
`

globalThis.fetch = async (input) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  if (url === SITEMAP_URL) {
    return new Response(SITEMAP_FIXTURE, {
      status: 200,
      headers: { 'content-type': 'application/xml' },
    })
  }
  throw new Error(`indexnow-mock-fetch: unexpected network request blocked: ${url}`)
}
