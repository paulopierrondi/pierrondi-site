import type { MetadataRoute } from 'next'
import { feitos } from './feitos/feitos-data'
import { SITE_URL as BASE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioUpdatedAt = new Date('2026-05-24T00:00:00.000Z')

  return [
    {
      url: BASE_URL,
      lastModified: portfolioUpdatedAt,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/paulo`,
      lastModified: portfolioUpdatedAt,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/design`,
      lastModified: portfolioUpdatedAt,
      changeFrequency: 'monthly',
      priority: 0.86,
    },
    ...feitos.map((feito) => ({
      url: `${BASE_URL}/feitos/${feito.slug}`,
      lastModified: portfolioUpdatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    })),
  ]
}
