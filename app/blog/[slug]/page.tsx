import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
    keywords: [post.category.toLowerCase(), 'pierrondi.dev', 'ia enterprise', 'agentops', post.title.toLowerCase()],
    authors: [{ name: 'Paulo Pierrondi', url: `${SITE_URL}/about` }],
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

  const offer = {
    href: '/atuacao',
    label: 'Ver atuação',
    eyebrow: 'Quer transformar tese em execução governada?',
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
      url: `${SITE_URL}/about`,
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
          headline="Do modelo operacional à execução com evidência."
          ctas={
            <>
              <PillButton variant="primary" href={offer.href}>
                {offer.label}
              </PillButton>
              <PillButton variant="ghost" href="/contato">
                Abrir conversa
              </PillButton>
            </>
          }
        >
          <p className={styles.ctaText}>
            O trabalho conecta estratégia, governança, plataforma, agentes e métricas para levar IA
            enterprise além do piloto.
          </p>
        </ProductTile>
      </main>
    </>
  )
}
