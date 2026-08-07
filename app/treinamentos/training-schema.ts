import { SITE_URL } from '@/lib/site'
import type { HomeLang } from '@/lib/i18n/site-language'
import { TREINAMENTOS_COPY } from './treinamentos-content'

const localeByLang: Record<HomeLang, string> = { pt: 'pt-BR', en: 'en-US' }
const pathByLang: Record<HomeLang, string> = { pt: '/treinamentos', en: '/en/treinamentos' }

/**
 * Courses are published without `offers`: pricing is negotiated per engagement,
 * and the site contract forbids inventing a price (including a fake zero) just
 * to unlock a rich result.
 */
export function buildTrainingSchema(lang: HomeLang) {
  const copy = TREINAMENTOS_COPY[lang]
  const path = pathByLang[lang]

  return {
    '@context': 'https://schema.org',
    '@graph': copy.tracks.items.map((track) => ({
      '@type': 'Course',
      '@id': `${SITE_URL}${path}#${track.id}`,
      name: track.category,
      description: track.desc,
      url: `${SITE_URL}${path}#${track.id}`,
      inLanguage: localeByLang[lang],
      educationalLevel: track.level,
      teaches: track.modules,
      audience: { '@type': 'Audience', audienceType: track.audience },
      provider: { '@id': `${SITE_URL}/#organization` },
      instructor: { '@id': `${SITE_URL}/#person` },
    })),
  }
}
