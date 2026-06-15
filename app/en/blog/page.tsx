import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import BlogContent from '@/app/blog/BlogContent'

export const metadata: Metadata = {
  title: 'Ideas',
  description: 'Notes on enterprise AI, ServiceNow, AgentOps, operating model and governed execution.',
  alternates: {
    canonical: '/en/blog',
    languages: {
      'pt-BR': '/blog',
      'en-US': '/en/blog',
      'x-default': '/blog',
    },
  },
  openGraph: {
    title: 'Ideas | pierrondi.dev',
    description: 'Notes on enterprise AI, ServiceNow, AgentOps and operating model.',
    url: '/en/blog',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Ideas pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideas | pierrondi.dev',
    description: 'Notes on enterprise AI, ServiceNow, AgentOps and operating model.',
    images: ['/og'],
  },
}

export default function BlogEnPage() {
  return (
    <>
      <PageHeader
        eyebrow="IDEAS"
        title={<>Notes on <span className="text-primary">enterprise AI.</span></>}
        lead="Short essays on operating model, agent governance, ServiceNow, value architecture and execution. No hype — only what I learned in the field."
      />
      <BlogContent lang="en" />
    </>
  )
}
