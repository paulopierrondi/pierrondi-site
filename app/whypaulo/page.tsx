import type { Metadata } from 'next'

import WhyPauloExperience from './WhyPauloExperience'

export const metadata: Metadata = {
  title: 'Why Paulo',
  description:
    'Private executive briefing on Paulo Pierrondi, ServiceNow platform value, AI maturity, LLM operating depth and governed agent systems.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/whypaulo' },
  openGraph: {
    title: 'Why Paulo - private executive AI maturity briefing',
    description: 'Private executive briefing on ServiceNow value leadership and governed AI operating maturity.',
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
  return <WhyPauloExperience />
}
