import Link from 'next/link'

import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { SITE_URL } from '@/lib/site'
import styles from '../answers.module.css'

export type AnswerFaqItem = {
  question: string
  answer: string
}

export type AnswerInternalLink = {
  href: string
  label: string
  description: string
}

export type AnswerBriefProps = {
  /** Route path, e.g. /answers/o-que-e-agentops */
  path: string
  eyebrow: string
  /** Question-form H1. */
  question: string
  /** Concise, citable direct answer rendered as the first paragraph. */
  directAnswer: string
  sections: Array<{
    heading: string
    paragraphs?: string[]
    bullets?: string[]
  }>
  faq: AnswerFaqItem[]
  internalLinks: AnswerInternalLink[]
  datePublished: string
  dateModified: string
  inLanguage?: 'pt-BR' | 'en'
}

export default function AnswerBrief({
  path,
  eyebrow,
  question,
  directAnswer,
  sections,
  faq,
  internalLinks,
  datePublished,
  dateModified,
  inLanguage = 'pt-BR',
}: AnswerBriefProps) {
  const canonicalUrl = `${SITE_URL}${path}`

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Question',
      '@id': `${canonicalUrl}#question`,
      name: question,
      inLanguage,
      acceptedAnswer: {
        '@type': 'Answer',
        text: directAnswer,
        author: { '@id': `${SITE_URL}/#person` },
      },
      author: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      url: canonicalUrl,
      inLanguage,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: [
        {
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: directAnswer },
        },
        ...faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      headline: question,
      description: directAnswer,
      inLanguage,
      datePublished,
      dateModified,
      mainEntityOfPage: canonicalUrl,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'AI Search Portfolio', item: `${SITE_URL}/ai-search` },
        { '@type': 'ListItem', position: 3, name: question, item: canonicalUrl },
      ],
    },
  ]

  return (
    <>
      <JsonLd data={structuredData} />
      <PageHeader eyebrow={eyebrow} title={question} lead={directAnswer} chips={['Answer brief', 'GEO', inLanguage]} />

      <main className={styles.main}>
        <div className={styles.directAnswer}>
          <p>{directAnswer}</p>
        </div>

        {sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className={styles.section} aria-labelledby="faq-heading">
          <p className={styles.kicker}>FAQ</p>
          <h2 id="faq-heading">Perguntas relacionadas</h2>
          {faq.map((item) => (
            <div key={item.question} className={styles.faqItem}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="related-heading">
          <p className={styles.kicker}>Continue explorando</p>
          <h2 id="related-heading">Páginas relacionadas</h2>
          <div className={styles.links}>
            {internalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkDesc}>{link.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
