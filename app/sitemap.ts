import type { MetadataRoute } from 'next'
import { APPS } from './apps/[slug]/_apps'
import { posts } from './blog/posts'
import { feitos } from './feitos/feitos-data'
import { SITE_URL as BASE_URL } from '@/lib/site'

const staticRoutes: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  lastModified?: string
}> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.96, changeFrequency: 'monthly' },
  { path: '/atuacao', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/studio', priority: 0.92, changeFrequency: 'monthly' },
  { path: '/feitos', priority: 0.86, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.88, changeFrequency: 'weekly' },
  { path: '/contato', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/ai-search', priority: 0.78, changeFrequency: 'weekly', lastModified: '2026-07-18T00:00:00.000Z' },
  { path: '/en', priority: 0.82, changeFrequency: 'monthly' },
  { path: '/en/about', priority: 0.81, changeFrequency: 'monthly' },
  { path: '/en/atuacao', priority: 0.78, changeFrequency: 'monthly' },
  { path: '/en/studio', priority: 0.82, changeFrequency: 'monthly' },
  { path: '/en/contato', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/en/portfolio', priority: 0.84, changeFrequency: 'weekly' },
  { path: '/paulo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/design', priority: 0.72, changeFrequency: 'monthly' },
  { path: '/design/library', priority: 0.7, changeFrequency: 'monthly' },
]

function routeUrl(path: string) {
  if (path === '/') return BASE_URL
  return `${BASE_URL}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: routeUrl(route.path),
      ...(route.lastModified ? { lastModified: new Date(route.lastModified) } : {}),
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
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    })),
    ...Object.keys(APPS).map((slug) => ({
      url: `${BASE_URL}/apps/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.64,
    })),
  ]
}
