import { SITE_URL } from '@/lib/site'
import type { FeitosLang } from './FeitosIndexContent'
import { deliveryCases } from './feitos-proof-data'

export function buildFeitosSchema(lang: FeitosLang) {
  const isPt = lang === 'pt'
  const path = isPt ? '/feitos' : '/en/feitos'
  const name = isPt
    ? 'Paulo Pierrondi — dados, trabalhos e provas de execução'
    : 'Paulo Pierrondi — profile, work, and execution proof'
  const description = isPt
    ? 'Dossiê público com perfil profissional, arquitetura de automação paga com IA, cases anonimizados e produtos navegáveis.'
    : 'Public dossier with a professional profile, paid-AI automation architecture, anonymized cases, and navigable products.'

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}${path}#page`,
      url: `${SITE_URL}${path}`,
      name,
      description,
      inLanguage: isPt ? 'pt-BR' : 'en-US',
      about: { '@id': `${SITE_URL}/#person` },
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntity: {
        '@type': 'ItemList',
        name: isPt ? 'Trabalhos selecionados' : 'Selected work',
        itemListElement: deliveryCases.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: item.headline[lang],
            description: item.detail[lang],
            creator: { '@id': `${SITE_URL}/#person` },
          },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isPt ? 'Início' : 'Home',
          item: isPt ? SITE_URL : `${SITE_URL}/en`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isPt ? 'Feitos' : 'Proof',
          item: `${SITE_URL}${path}`,
        },
      ],
    },
  ]
}
