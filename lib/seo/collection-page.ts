import { SITE_URL } from '@/lib/site'

type CollectionItem = { href: string; title: string }

type CollectionPageInput = {
  path: string
  name: string
  description: string
  inLanguage: 'en-US' | 'pt-BR'
  items?: readonly CollectionItem[]
}

export function buildCollectionPageSchema({
  path,
  name,
  description,
  inLanguage,
  items,
}: CollectionPageInput): Record<string, unknown> {
  const canonicalUrl = `${SITE_URL}${path}`

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#collection`,
    url: canonicalUrl,
    name,
    description,
    inLanguage,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    ...(items?.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: items.length,
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'WebPage',
                '@id': `${SITE_URL}${item.href}`,
                url: `${SITE_URL}${item.href}`,
                name: item.title,
              },
            })),
          },
        }
      : {}),
  }
}
