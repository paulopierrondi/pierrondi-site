import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Why Paulo - a pessoa de IA para ServiceNow',
  description:
    'Briefing executivo privado sobre Paulo Pierrondi: ServiceNow, FSI Brasil, maturidade real em IA/LLMs, agentes governados e expansão de receita.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/whypaulo' },
  openGraph: {
    title: 'Why Paulo - a pessoa de IA para ServiceNow',
    description:
      'ServiceNow + IA governada em escala FSI Brasil: defesa de base instalada, agentes governados e expansão medida em receita.',
    url: '/whypaulo',
    siteName: 'pierrondi.dev',
    type: 'website',
    images: [
      {
        url: '/assets/paulo-pierrondi-executive-neural.jpg',
        width: 900,
        height: 900,
        alt: 'Paulo Pierrondi',
      },
    ],
  },
}

export default function WhyPauloPage() {
  redirect('/about')
}
