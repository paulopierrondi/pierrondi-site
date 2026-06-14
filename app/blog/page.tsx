import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import Link from 'next/link'
import { formatDate as formatDateUtil } from '@/lib/utils/date'
import { posts } from './posts'
import { ProductTile } from '@/components/ui/ProductTile'
import BlogCta from './BlogCta'
import styles from './BlogGrid.module.css'

export const metadata: Metadata = {
  title: 'Blog — guias práticos de automação, IA e produto digital',
  description:
    'Guias práticos sobre automação com n8n, desenvolvimento de MVPs, CTO fracionado e IA para pequenas empresas no Brasil.',
  keywords: [
    'blog automação',
    'blog n8n brasil',
    'blog ia aplicada',
    'guia mvp',
    'blog tech partner',
    'pierrondi.dev blog',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | pierrondi.dev',
    description:
      'Guias práticos sobre automação com n8n, desenvolvimento de MVPs, CTO fracionado e IA para pequenas empresas.',
    url: '/blog',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Blog pierrondi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | pierrondi.dev',
    description: 'Guias práticos sobre automação, IA e produto digital.',
    images: ['/og'],
  },
}

function formatDate(dateStr: string) {
  return formatDateUtil(dateStr, { preset: 'blogShort' })
}

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>
        <ProductTile
          variant="dark"
          eyebrow="Blog"
          headline="Insights."
          headlineLevel="h1"
          tagline="Automação, produto digital e IA aplicados a negócios reais. Sem hype — só o que funciona."
        />

        <ProductTile variant="dark" as="div">
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                <span className={styles.cardCategory}>{post.category}</span>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.cardMeta}>
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime} de leitura</span>
                  <span className={styles.cardArrow} aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </ProductTile>

        <BlogCta />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
