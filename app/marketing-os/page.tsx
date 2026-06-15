import type { Metadata } from 'next'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import MarketingOsContent from './MarketingOsContent'

export const metadata: Metadata = {
  title: 'Marketing OS — pierrondi.dev',
  description:
    'Plataforma agentic que opera o marketing da sua empresa com agentes de IA, governança humana e automações controladas. Estamos construindo em público — você vê a operação real.',
  keywords: [
    'marketing agentic',
    'agentes de ia marketing',
    'automação de marketing brasil',
    'ia para marketing pme',
    'plataforma marketing autônomo',
  ],
  alternates: { canonical: '/marketing-os' },
  openGraph: {
    title: 'Marketing OS | pierrondi.dev',
    description:
      'Como a pierrondi.dev opera o próprio marketing com agentes de IA, sandbox e aprovação humana. Construído em público.',
    url: '/marketing-os',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Marketing OS — pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing OS | pierrondi.dev',
    description: 'Plataforma agentic com governança humana. Construído em público.',
    images: ['/og'],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Marketing OS',
  provider: { '@type': 'Organization', name: 'pierrondi.dev' },
  description:
    'Plataforma de marketing operada por agentes de IA com governança humana, approval gates e automações controladas. Studio interno, agentes versionados, integrações sandbox-first.',
  serviceType: 'Agentic Marketing Platform',
  areaServed: { '@type': 'Country', name: 'Brazil' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Camadas do Marketing OS',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marketing Studio (campanhas, conteúdo, calendário, inbox)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Agent Layer (Orchestrator, SEO, LinkedIn, Image, Ads, CRO)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Governance (approval gates, logs, kill switch, sandbox)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automation (n8n, Make, MCP, LinkedIn, Email, Analytics)' } },
    ],
  },
  mainEntityOfPage: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O Marketing OS publica sozinho nas redes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. Tudo que vai para fora passa por approval humano. Por padrão os agentes geram drafts em sandbox; publicação só após aprovação explícita.',
        },
      },
      {
        '@type': 'Question',
        name: 'Posso ver isso funcionando antes de comprar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. A própria pierrondi.dev opera o marketing com essa plataforma — números reais, posts reais, decisões reais e Studio protegido em produção.',
        },
      },
      {
        '@type': 'Question',
        name: 'Preciso ter time técnico?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. A implementação é nossa. Você opera o studio (cliques, aprovações, edição). A camada técnica fica com a pierrondi.dev.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto custa de tokens de IA por mês?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para 4 posts de blog + 12 posts de LinkedIn por mês, fica entre R$15 e R$40 em tokens. Cap diário configurável bloqueia runaway de custo.',
        },
      },
    ],
  },
}

export default function MarketingOsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <MarketingOsContent />
      <WhatsApp />
    </>
  )
}
