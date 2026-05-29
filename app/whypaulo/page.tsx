import type { Metadata } from 'next'

import WhyPauloExperience from './WhyPauloExperience'

export const metadata: Metadata = {
  title: 'Why Paulo — ServiceNow’s AI person',
  description:
    'The executive case to hire Paulo Pierrondi as ServiceNow’s AI person: governed ServiceNow + AI run at top-tier Brazilian FSI scale (BACEN/LGPD), real LLM operating depth and enterprise field execution that turn AI urgency into adoption and revenue.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/whypaulo' },
  openGraph: {
    title: 'Why Paulo — the case to make me ServiceNow’s AI person',
    description:
      'Governed ServiceNow + AI at top-tier Brazilian FSI scale: install-base defense, governed agents and expansion, measured in revenue.',
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
