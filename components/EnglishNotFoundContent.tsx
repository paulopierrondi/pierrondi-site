import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This URL does not exist on pierrondi.dev.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Page not found',
    description: 'This URL does not exist on pierrondi.dev.',
  },
  twitter: {
    title: 'Page not found',
    description: 'This URL does not exist on pierrondi.dev.',
  },
}

export default function EnglishNotFoundContent() {
  return (
    <main>
      <PageHeader
        eyebrow="404"
        title={<>Page <span className="text-primary">not found.</span></>}
        lead="This URL does not exist on this site. Return home or open the public portfolio."
      />
      <section style={{ maxWidth: 720, margin: '0 auto 4rem', padding: '0 1.25rem' }}>
        <p style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link href="/en">English home</Link>
          <Link href="/en/portfolio">Portfolio</Link>
          <Link href="/">Portuguese home</Link>
        </p>
      </section>
    </main>
  )
}
