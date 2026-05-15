import { posts } from '@/app/blog/posts'
import { SITE_URL as BASE_URL } from '@/lib/site'

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function GET() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
  const lastBuildDate = sorted[0] ? new Date(sorted[0].date).toUTCString() : new Date().toUTCString()

  const items = sorted
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()
      const description = stripHtml(post.excerpt)
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <author>noreply@pierrondi.com.br (Paulo Pierrondi)</author>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>pierrondi.dev — Blog</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Guias práticos sobre automação com n8n, MVPs, CTO fracionado e IA aplicada para PMEs no Brasil.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
