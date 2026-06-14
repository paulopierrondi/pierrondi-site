import type { MetadataRoute } from 'next'
import { APPS } from './apps/[slug]/_apps'
import { posts } from './blog/posts'
import { feitos } from './feitos/feitos-data'
import { SITE_URL as BASE_URL } from '@/lib/site'

const staticRoutes: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.96, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.95, changeFrequency: 'monthly' },
  { path: '/precos', priority: 0.94, changeFrequency: 'monthly' },
  { path: '/produto-digital', priority: 0.93, changeFrequency: 'monthly' },
  { path: '/tech-partner', priority: 0.92, changeFrequency: 'monthly' },
  { path: '/marketing-os', priority: 0.91, changeFrequency: 'weekly' },
  { path: '/fso', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/calculadora', priority: 0.89, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.88, changeFrequency: 'weekly' },
  { path: '/marketing-os/numeros', priority: 0.86, changeFrequency: 'daily' },
  { path: '/faq', priority: 0.84, changeFrequency: 'monthly' },
  { path: '/en', priority: 0.82, changeFrequency: 'monthly' },
  { path: '/en/about', priority: 0.81, changeFrequency: 'monthly' },
  { path: '/paulo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/quiz', priority: 0.76, changeFrequency: 'monthly' },
  { path: '/design', priority: 0.72, changeFrequency: 'monthly' },
  { path: '/design/library', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/privacidade', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/termos', priority: 0.1, changeFrequency: 'yearly' },
]

const appDocs = ['support', 'privacy', 'terms'] as const

function routeUrl(path: string) {
  if (path === '/') return BASE_URL
  return `${BASE_URL}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioUpdatedAt = new Date('2026-05-30T00:00:00.000Z')

  return [
    ...staticRoutes.map((route) => ({
      url: routeUrl(route.path),
      lastModified: portfolioUpdatedAt,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00.000Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...feitos.map((feito) => ({
      url: `${BASE_URL}/feitos/${feito.slug}`,
      lastModified: portfolioUpdatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    })),
    ...Object.keys(APPS).map((slug) => ({
      url: `${BASE_URL}/apps/${slug}`,
      lastModified: portfolioUpdatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.64,
    })),
    ...Object.keys(APPS).flatMap((slug) =>
      appDocs.map((doc) => ({
        url: `${BASE_URL}/apps/${slug}/${doc}`,
        lastModified: portfolioUpdatedAt,
        changeFrequency: 'yearly' as const,
        priority: 0.28,
      })),
    ),
  ]
}
