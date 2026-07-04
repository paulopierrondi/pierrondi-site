import Link from 'next/link'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import { formatDate as formatDateUtil } from '@/lib/utils/date'
import { posts } from './posts'
import styles from './BlogGrid.module.css'

export type BlogLang = 'pt' | 'en'

const copy: Record<BlogLang, { featQuote: string; readTime: (t: string) => string }> = {
  pt: {
    featQuote: 'A diferença entre piloto e produção não é o modelo. É o operating model.',
    readTime: (t) => `${t} de leitura`,
  },
  en: {
    featQuote: 'The difference between pilot and production is not the model. It is the operating model.',
    readTime: (t) => `${t} read`,
  },
}

function formatDate(dateStr: string, lang: BlogLang) {
  return formatDateUtil(dateStr, { preset: 'blogShort', locale: lang === 'en' ? 'en-US' : 'pt-BR' })
}

export default function BlogContent({ lang }: { lang: BlogLang }) {
  const [featured, ...rest] = posts
  const c = copy[lang]

  return (
    <main className={styles.main}>
      <Reveal>
        <Link href={`/blog/${featured.slug}`} className={styles.feat}>
          <div className={styles.featBody}>
            <span className={styles.cat}>{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className={styles.meta}>
              <span>{formatDate(featured.date, lang)}</span>
              <span>{c.readTime(featured.readTime)}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </div>
          </div>
          <blockquote className={styles.quote}>
            <p>“{c.featQuote}”</p>
          </blockquote>
        </Link>
      </Reveal>

      <RevealStagger className={styles.grid} staggerDelay={0.05}>
        {rest.map((post) => (
          <RevealStaggerItem key={post.slug}>
            <Link href={`/blog/${post.slug}`} className={styles.card}>
              <span className={styles.cat}>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className={styles.meta}>
                <span>{formatDate(post.date, lang)}</span>
                <span>{c.readTime(post.readTime)}</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </div>
            </Link>
          </RevealStaggerItem>
        ))}
      </RevealStagger>
    </main>
  )
}
