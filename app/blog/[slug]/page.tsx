import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import JsonLd from '@/components/JsonLd'
import Link from 'next/link'
import { formatDate as formatDateUtil } from '@/lib/utils/date'
import { posts, getPostBySlug } from '../posts'
import PostContent from './PostContent'
import { ProductTile } from '@/components/ui/ProductTile'
import PillButton from '@/components/ui/PillButton'
import styles from './PostPage.module.css'
import { SITE_URL } from '@/lib/site'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const url = `/blog/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category.toLowerCase(), 'pierrondi.dev', 'blog', 'guia prático', post.title.toLowerCase()],
    authors: [{ name: 'Paulo Pierrondi', url: `${SITE_URL}/sobre` }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'pierrondi.dev',
      type: 'article',
      locale: 'pt_BR',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['Paulo Pierrondi'],
      section: post.category,
      images: [{ url: '/og', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og'],
    },
  }
}

function formatDate(dateStr: string) {
  return formatDateUtil(dateStr, { preset: 'blogLong' })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug)

  const offerByCategory: Record<string, { href: string; label: string; eyebrow: string }> = {
    Automação: {
      href: '/automacoes',
      label: 'Ver Automação Express',
      eyebrow: 'Quer automatizar isso na sua empresa?',
    },
    'Produto Digital': {
      href: '/produto-digital',
      label: 'Ver Produto Digital (MVP)',
      eyebrow: 'Quer construir um MVP assim?',
    },
    'Tech Partner': {
      href: '/tech-partner',
      label: 'Ver Tech Partner',
      eyebrow: 'Precisa de direção técnica recorrente?',
    },
    IA: {
      href: '/marketing-os',
      label: 'Ver Marketing OS',
      eyebrow: 'Quer IA aplicada com governança real?',
    },
  }
  const offer = offerByCategory[post.category] ?? {
    href: '/#contact',
    label: 'Falar com a equipe',
    eyebrow: 'Quer implementar isso?',
  }

  const articleUrl = `${SITE_URL}/blog/${post.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [`${SITE_URL}/og`],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Paulo Pierrondi',
      url: `${SITE_URL}/sobre`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'pierrondi.dev',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/pierrondi-logo-1024.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    articleSection: post.category,
    inLanguage: 'pt-BR',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  }

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <Nav />

      <main>
        {/* Back navigation — sits above all tiles */}
        <Link href="/blog" className={styles.backLink} aria-label="Voltar para o blog">
          ← Blog
        </Link>

        {/* Hero tile — parchment */}
        <ProductTile
          variant="dark"
          eyebrow={post.category}
          headline={post.title}
          headlineLevel="h1"
          tagline={post.excerpt}
        >
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>{formatDate(post.date)}</span>
            <span className={styles.metaItem} aria-hidden="true">·</span>
            <span className={styles.metaItem}>{post.readTime} de leitura</span>
            <span className={styles.metaItem} aria-hidden="true">·</span>
            <span className={styles.metaItem}>Paulo Pierrondi</span>
          </div>
        </ProductTile>

        {/* Content + sidebar tile — light */}
        <ProductTile variant="dark" as="div">
          <div className={styles.layout}>
            <div className={styles.contentCol}>
              <PostContent content={post.content} />
            </div>

            <aside className={styles.sidebar} aria-label="Artigos relacionados">
              <p className={styles.sidebarLabel}>Mais artigos</p>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className={styles.sidebarCard}>
                  <p className={styles.sidebarCat}>{r.category}</p>
                  <p className={styles.sidebarTitle}>{r.title}</p>
                </Link>
              ))}
            </aside>
          </div>
        </ProductTile>

        {/* CTA tile — dark */}
        <ProductTile
          variant="dark"
          eyebrow={offer.eyebrow}
          headline="Diagnóstico gratuito em 30 minutos — sem compromisso."
          ctas={
            <>
              <PillButton variant="primary" href={offer.href}>
                {offer.label}
              </PillButton>
              <PillButton variant="ghost" href="/#contact">
                Falar com a equipe
              </PillButton>
            </>
          }
        >
          <p className={styles.ctaText}>
            Avaliamos o seu processo, identificamos o ponto de maior retorno e mostramos o que pode
            ser automatizado ou desenvolvido — com prazo e custo reais.
          </p>
        </ProductTile>
      </main>

      <Footer />
      <WhatsApp />
    </>
  )
}
