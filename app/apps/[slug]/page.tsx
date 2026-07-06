import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import WhatsApp from '@/components/WhatsApp'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import { APPS, getApp, isAppSlug } from './_apps'
import styles from './AppLanding.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(APPS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!isAppSlug(slug)) return {}
  const app = getApp(slug)
  // Layout template already appends "| pierrondi.dev" — keep the page title
  // brand-free to avoid "FaithSchool · pierrondi.dev | pierrondi.dev".
  const title = app.name
  const socialTitle = `${app.name} · pierrondi.dev`
  const description = app.description ?? `${app.name} — ${app.category}.`
  const canonical = `/apps/${slug}`
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: 'pierrondi.dev',
      type: 'website',
      images: [{ url: '/og', width: 1200, height: 630, alt: `${app.name} — pierrondi.dev` }],
    },
  }
}

export default async function AppLandingPage({ params }: Props) {
  const { slug } = await params
  if (!isAppSlug(slug)) notFound()
  const app = getApp(slug)

  const heroTagline = app.tagline ?? app.category
  const description = app.description ?? `${app.name} — ${app.category}.`
  const highlights =
    app.privacyMode === 'aiPhotoTryOn'
      ? [
          'Uses the ProvadorIA API and Google Gemini to generate the requested try-on from the user photo, clothing photo and description.',
          'Requires explicit AI photo-processing consent before generation.',
          'Version 1.0 is free: no subscription, no external purchase and no paid digital content.',
          'Photo-processing data is not sold, not used for tracking, not used by ProvadorIA to train models and is discarded from transient processing storage within 24 hours.',
        ]
      : [
          'Private by design — core features work on-device.',
          'No mandatory account, no telemetry on personal content.',
          'Optional paid features, when offered, go through Apple In-App Purchase.',
        ]

  const isGame = /game|puzzle|wargame|quiz|mystery|card/i.test(app.category)
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/apps/${slug}#app`,
    name: app.name,
    description,
    url: `${SITE_URL}/apps/${slug}`,
    applicationCategory: isGame ? 'GameApplication' : 'UtilitiesApplication',
    operatingSystem: 'iOS',
    image: `${SITE_URL}/og`,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    // Free to download on the App Store; optional paid features go through Apple IAP.
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(app.appStoreUrl ? { downloadUrl: app.appStoreUrl, installUrl: app.appStoreUrl } : {}),
  }

  return (
    <>
      <JsonLd data={appSchema} />
      <PageHeader
        eyebrow={app.category.toUpperCase()}
        title={<>{app.name}.</>}
        lead={heroTagline}
      />

      <main className={styles.main}>
        <Reveal>
          <div className={styles.card}>
            <p className={styles.lead}>{description}</p>
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                Download on the App Store
              </a>
            )}

            <h2 className={styles.h2}>What you get</h2>
            <ul className={styles.list}>
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <h2 className={styles.h2}>Help & legal</h2>
            <ul className={styles.linkList}>
              <li>
                <Link href={`/apps/${slug}/support`}>Support</Link>
              </li>
              <li>
                <Link href={`/apps/${slug}/privacy`}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={`/apps/${slug}/terms`}>Terms of Use</Link>
              </li>
            </ul>
            <p className={styles.meta}>
              Built by pierrondi.dev. Contact{' '}
              <a href={`mailto:pierrondi@gmail.com?subject=${encodeURIComponent(app.contactSubject)}`}>
                pierrondi@gmail.com
              </a>
              .
            </p>
          </div>
        </Reveal>
      </main>
      <WhatsApp lang="en" />
    </>
  )
}
