import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import FaqContent from './FaqContent'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FAQ — perguntas frequentes sobre automação, MVP e CTO fracionado',
  description: 'Perguntas frequentes sobre processo, preço, entrega e fit. Tudo que você precisa saber antes de contratar automação, MVP ou Tech Partner.',
  keywords: ['faq pierrondi ia', 'perguntas frequentes automação', 'dúvidas produto digital', 'preços agência tecnologia'],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | pierrondi.dev',
    description: 'Tudo que você precisa saber antes de contratar automação, MVP ou Tech Partner.',
    url: '/faq',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'FAQ pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | pierrondi.dev',
    description: 'Tudo que você precisa saber antes de contratar.',
    images: ['/og'],
  },
}

const faqItems = [
  { q: 'Como funciona o diagnóstico gratuito?', a: 'Chamada de 30min, analisamos seu problema, propomos solução com prazo e custo reais.' },
  { q: 'Quanto tempo leva um projeto?', a: 'Automação: 1–2 semanas. MVP: 4–8 semanas. Tech Partner: contínuo.' },
  { q: 'Posso acompanhar o progresso?', a: 'Sim. Você recebe atualizações objetivas por e-mail, WhatsApp ou painel combinado no início do projeto.' },
  { q: 'E se eu quiser mudar algo no meio?', a: 'Renegociamos escopo antes de continuar. Sem surpresa.' },
  { q: 'Posso parcelar?', a: 'Sim, até 3x para projetos acima de R$5.000.' },
  { q: 'O que acontece se o escopo mudar?', a: 'Novo escopo = nova proposta. Sem cobrança adicional sem aprovação.' },
  { q: 'Tem fidelidade ou contrato longo?', a: 'Não. Automação e MVP são por projeto. Tech Partner é mensal, sem fidelidade.' },
  { q: 'Por que é mais barato que agência tradicional?', a: 'Operação enxuta com IA. Sem gerente de conta, sem overhead de escritório.' },
  { q: 'Eu fico com o código?', a: '100%. Repositório, credenciais, documentação e acesso completo.' },
  { q: 'Quem faz o deploy?', a: 'Nós. Configuramos produção, domínio e monitoramento.' },
  { q: 'Tem suporte pós-entrega?', a: '30 dias de suporte inclusos em todo projeto. Extensão disponível.' },
  { q: 'Qual stack vocês usam?', a: 'Next.js, TypeScript, Supabase, n8n, Make, Railway. Ajustamos conforme o projeto.' },
  { q: 'Funciona para empresa pequena?', a: 'Feito para isso. PMEs, startups e infoprodutores são nosso foco.' },
  { q: 'Preciso ter desenvolvedor interno?', a: 'Não. Entregamos pronto para usar. Se tiver dev, integramos com o time.' },
  { q: 'Vocês usam IA em tudo?', a: 'Usamos onde faz sentido: automação, geração de código, análise. Sem IA cosmética.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

const faqBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
  ],
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqSchema, faqBreadcrumb]} />
      <Nav />
      <main>
        <FaqContent />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
