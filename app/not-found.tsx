import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'Esta URL não existe em pierrondi.dev.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Página não encontrada',
    description: 'Esta URL não existe em pierrondi.dev.',
  },
  twitter: {
    title: 'Página não encontrada',
    description: 'Esta URL não existe em pierrondi.dev.',
  },
}

export default function NotFound() {
  return (
    <main>
      <PageHeader
        eyebrow="404"
        title={
          <>
            Página <span className="text-primary">não encontrada.</span>
          </>
        }
        lead="Esta URL não existe neste site. Volte para a home ou abra o portfólio público."
      />
      <section style={{ maxWidth: 720, margin: '0 auto 4rem', padding: '0 1.25rem' }}>
        <p style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfólio</Link>
          <Link href="/en">English home</Link>
        </p>
      </section>
    </main>
  )
}
