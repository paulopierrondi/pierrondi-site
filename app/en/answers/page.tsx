import type { Metadata } from 'next'
import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import styles from '@/app/answers/answers.module.css'

const path = '/en/answers'

const enTwins = [
  {
    href: '/en/answers/who-is-paulo-pierrondi',
    title: 'Who is Paulo Pierrondi?',
    description: 'TAE at ServiceNow, AI/automation architect and full-stack builder.',
    ptHref: '/answers/quem-e-paulo-pierrondi',
  },
  {
    href: '/en/answers/what-is-agentops',
    title: 'What is AgentOps?',
    description: 'The discipline of running AI agents in production with governance and human gates.',
    ptHref: '/answers/o-que-e-agentops',
  },
]

export const metadata: Metadata = {
  title: 'English answer briefs',
  description:
    'English answer-page twins on pierrondi.dev: who Paulo Pierrondi is, and what AgentOps is.',
  alternates: {
    canonical: path,
    languages: {
      'pt-BR': '/answers',
      'en-US': path,
      'x-default': '/answers',
    },
  },
  robots: { index: true, follow: true },
}

export default function EnAnswersHubPage() {
  return (
    <>
      <PageHeader
        eyebrow="ANSWER BRIEFS — EN"
        title="English answer briefs"
        lead="Citable English twins for the Paulo Pierrondi and AgentOps briefs. Portuguese originals stay canonical for pt-BR."
        chips={['Answer brief', 'GEO', 'en']}
      />
      <main className={styles.main}>
        <section className={styles.section} aria-labelledby="en-twins-heading">
          <p className={styles.kicker}>English twins</p>
          <h2 id="en-twins-heading">Pages in this language</h2>
          <div className={styles.links}>
            {enTwins.map((twin) => (
              <Link key={twin.href} href={twin.href}>
                <span className={styles.linkLabel}>{twin.title}</span>
                <span className={styles.linkDesc}>{twin.description}</span>
              </Link>
            ))}
          </div>
        </section>
        <section className={styles.section} aria-labelledby="related-heading">
          <p className={styles.kicker}>Also on this site</p>
          <h2 id="related-heading">Related pages</h2>
          <div className={styles.links}>
            <Link href="/ai-search">
              <span className={styles.linkLabel}>AI Search Portfolio</span>
              <span className={styles.linkDesc}>Full citation hub, including Portuguese briefs.</span>
            </Link>
            {enTwins.map((twin) => (
              <Link key={twin.ptHref} href={twin.ptHref}>
                <span className={styles.linkLabel}>{twin.title} (pt-BR)</span>
                <span className={styles.linkDesc}>Portuguese original.</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
