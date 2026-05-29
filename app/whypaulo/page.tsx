import type { Metadata } from 'next'

import WhyPauloExperience from './WhyPauloExperience'

export const metadata: Metadata = {
  title: 'Why Paulo — ServiceNow’s AI person',
  description:
    'The executive case to hire Paulo Pierrondi as ServiceNow’s AI person: real AI and LLM operating depth, enterprise field execution and governed agents that turn AI urgency into adoption and revenue.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/whypaulo' },
  openGraph: {
    title: 'Why Paulo — the case to make me ServiceNow’s AI person',
    description:
      'AI operating depth meets enterprise field execution: install-base defense, governed agents and expansion, measured in revenue.',
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
