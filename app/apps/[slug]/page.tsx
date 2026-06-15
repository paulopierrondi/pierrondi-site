import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import WhatsApp from '@/components/WhatsApp'
import { ProductTile } from '@/components/ui/ProductTile'
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
  const title = `${app.name} · pierrondi.dev`
  const description = app.description ?? `${app.name} — ${app.category}.`
  const canonical = `/apps/${slug}`
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'pierrondi.dev',
      type: 'website',
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

  return (
    <>
      <main>
        <ProductTile
          variant="dark"
          eyebrow={app.name}
          headline={`${app.name}.`}
          headlineLevel="h1"
          tagline={heroTagline}
          ctas={
            app.appStoreUrl ? (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                Download on the App Store
              </a>
            ) : undefined
          }
        />
        <ProductTile variant="dark" as="div">
          <div className={styles.prose}>
            <p>{description}</p>
            <h2>What you get</h2>
            <ul>
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <h2>Help & legal</h2>
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
        </ProductTile>
      </main>
      <WhatsApp lang="en" />
    </>
  )
}
