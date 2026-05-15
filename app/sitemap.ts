import type { MetadataRoute } from 'next'
import { posts } from './blog/posts'
import { SITE_URL as BASE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          'pt-BR': BASE_URL,
          'en-US': `${BASE_URL}/en`,
          'x-default': BASE_URL,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          'pt-BR': BASE_URL,
          'en-US': `${BASE_URL}/en`,
          'x-default': BASE_URL,
        },
      },
    },
    { url: `${BASE_URL}/sobre`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/automacoes`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/produto-digital`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/app-store-connect`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/tech-partner`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/precos`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/calculadora`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/audit`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/marketing-os`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/marketing-os/numeros`, lastModified: now, changeFrequency: 'daily', priority: 0.6 },
    { url: `${BASE_URL}/shorts-autopilot`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/apps/investcoach-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ai-command-center`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          'pt-BR': `${BASE_URL}/privacidade`,
          'en-US': `${BASE_URL}/privacy`,
        },
      },
    },
    {
      url: `${BASE_URL}/termos`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          'pt-BR': `${BASE_URL}/termos`,
          'en-US': `${BASE_URL}/terms`,
        },
      },
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          'pt-BR': `${BASE_URL}/privacidade`,
          'en-US': `${BASE_URL}/privacy`,
        },
      },
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          'pt-BR': `${BASE_URL}/termos`,
          'en-US': `${BASE_URL}/terms`,
        },
      },
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
