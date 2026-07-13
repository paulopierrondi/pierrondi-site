import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, FileText, LockKeyhole, ShieldCheck, Smartphone } from 'lucide-react'
import WhatsApp from '@/components/WhatsApp'
import ProductLogo from '@/components/ProductLogo'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import iconManifest from '@/public/app-icons/manifest.json'
import { APPS, getApp, isAppSlug, type AppEntry } from './_apps'
import styles from './AppLanding.module.css'

const APP_ICONS = iconManifest as Record<string, { file: string; name: string; source: string }>

interface Props {
  params: Promise<{ slug: string }>
}

type ProductSignal = {
  icon: typeof Smartphone
  label: string
  title: string
  body: string
}

function getProductSignals(app: AppEntry): ProductSignal[] {
  if (app.privacyMode === 'aiPhotoTryOn') {
    return [
      {
        icon: Smartphone,
        label: 'EXPERIENCE',
        title: 'AI-assisted preview',
        body: 'A requested try-on is generated from the user photo, clothing photo and optional description.',
      },
      {
        icon: ShieldCheck,
        label: 'CONSENT',
        title: 'Explicit photo processing',
        body: 'The product requires explicit consent before AI photo processing begins.',
      },
      {
        icon: LockKeyhole,
        label: 'DATA POSTURE',
        title: 'Documented boundaries',
        body: 'The product documentation explains how transient photo-processing data is handled and what it is not used for.',
      },
    ]
  }

  if (app.privacyMode === 'localOnly') {
    return [
      {
        icon: Smartphone,
        label: 'EXPERIENCE',
        title: 'On-device by design',
        body: 'This product is presented as an offline, on-device experience for focused use on iPhone.',
      },
      {
        icon: LockKeyhole,
        label: 'ACCESS',
        title: 'No mandatory account',
        body: 'The product description states that its core experience does not require an account or an internet connection.',
      },
      {
        icon: ShieldCheck,
        label: 'PRIVACY',
        title: 'Clear data boundary',
        body: 'Its public documentation describes a local-only posture and no gameplay data collection.',
      },
    ]
  }

  return [
    {
      icon: Smartphone,
      label: 'PRODUCT FOCUS',
      title: 'A defined job to be done',
      body: app.category,
    },
    {
      icon: ShieldCheck,
      label: 'PUBLIC RECORD',
      title: 'Support and privacy in the open',
      body: 'Dedicated support, privacy and terms pages make the operating information easy to find.',
    },
    {
      icon: FileText,
      label: 'AVAILABILITY',
      title: app.appStoreUrl ? 'A direct store path' : 'Documentation-first',
      body: app.appStoreUrl
        ? 'A direct App Store link is published on this product page.'
        : 'Use the support page for the current product and availability information.',
    },
  ]
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
  const description = app.description ?? `${app.name} is a ${app.category}.`
  const iconEntry = APP_ICONS[slug]
  const appNumber = String(Object.keys(APPS).indexOf(slug) + 1).padStart(2, '0')
  const isGame = /game|puzzle|wargame|quiz|mystery|card/i.test(app.category)
  const signals = getProductSignals(app)
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/apps/${slug}#app`,
    name: app.name,
    description,
    url: `${SITE_URL}/apps/${slug}`,
    applicationCategory: isGame ? 'GameApplication' : 'UtilitiesApplication',
    operatingSystem: 'iOS',
    image: iconEntry ? `${SITE_URL}/app-icons/${iconEntry.file}` : `${SITE_URL}/og`,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    // Free to download on the App Store; optional paid features go through Apple IAP.
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(app.appStoreUrl ? { downloadUrl: app.appStoreUrl, installUrl: app.appStoreUrl } : {}),
  }

  return (
    <>
      <JsonLd data={appSchema} />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="app-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>PIERRONDI.DEV / PRODUCT {appNumber}</p>
            <h1 id="app-title">
              {app.name}<span>.</span>
            </h1>
            <p className={styles.tagline}>{heroTagline}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.heroActions}>
              {app.appStoreUrl ? (
                <a className={styles.primaryAction} href={app.appStoreUrl} target="_blank" rel="noreferrer">
                  View on the App Store <ArrowUpRight aria-hidden="true" />
                </a>
              ) : (
                <Link className={styles.primaryAction} href={`/apps/${slug}/support`}>
                  Get product support <ArrowRight aria-hidden="true" />
                </Link>
              )}
              <a className={styles.secondaryAction} href="#product-brief">
                Read the brief <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className={styles.identity} aria-label={`${app.name} product identity`}>
            <div className={styles.iconStage}>
              <span className={styles.orbitOne} aria-hidden="true" />
              <span className={styles.orbitTwo} aria-hidden="true" />
              <ProductLogo slug={slug} name={app.name} size={154} className={styles.productLogo} />
              <span className={styles.stageLabel}>{iconEntry ? 'OFFICIAL ICON' : 'PRODUCT MARK'}</span>
            </div>
            <dl className={styles.identityFacts}>
              <div>
                <dt>PRODUCT SURFACE</dt>
                <dd>iOS application</dd>
              </div>
              <div>
                <dt>ACCESS</dt>
                <dd>{app.appStoreUrl ? 'App Store link available' : 'Support information available'}</dd>
              </div>
              <div>
                <dt>DOCUMENTATION</dt>
                <dd>Support · Privacy · Terms</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section id="product-brief" className={styles.brief} aria-labelledby="brief-title">
          <header className={styles.sectionHeading}>
            <p>PRODUCT BRIEF</p>
            <h2 id="brief-title">A product page built around the work, not placeholder marketing.</h2>
            <span>
              The information here stays grounded in the product&apos;s public scope, availability and documentation.
            </span>
          </header>

          <div className={styles.briefGrid}>
            <article className={styles.productNarrative}>
              <span>01</span>
              <div>
                <p className={styles.narrativeLabel}>THE PRODUCT</p>
                <h3>{app.name}</h3>
                <p>{description}</p>
              </div>
            </article>

            <dl className={styles.productFacts}>
              <div>
                <dt>FOCUS</dt>
                <dd>{app.category}</dd>
              </div>
              <div>
                <dt>PLATFORM</dt>
                <dd>iOS</dd>
              </div>
              <div>
                <dt>CURRENT PATH</dt>
                <dd>{app.appStoreUrl ? 'Public App Store listing' : 'Product support and legal documentation'}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.signals} aria-labelledby="signals-title">
          <header className={styles.sectionHeading}>
            <p>OPERATING PRINCIPLES</p>
            <h2 id="signals-title">The details that make a product usable and accountable.</h2>
          </header>
          <div className={styles.signalGrid}>
            {signals.map((signal, index) => {
              const Icon = signal.icon
              return (
                <article key={signal.title} className={styles.signalCard}>
                  <div className={styles.signalTopline}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <p>{signal.label}</p>
                  <h3>{signal.title}</h3>
                  <span>{signal.body}</span>
                </article>
              )
            })}
          </div>
        </section>

        <section className={styles.documentation} aria-labelledby="documentation-title">
          <div className={styles.documentationCopy}>
            <p>SUPPORT / PRIVACY / TERMS</p>
            <h2 id="documentation-title">The practical information stays public and reachable.</h2>
            <span>
              Each product has a clear place for help, privacy context and terms of use—without sending visitors into a generic support maze.
            </span>
          </div>
          <nav className={styles.docLinks} aria-label={`${app.name} documentation`}>
            <Link href={`/apps/${slug}/support`}>
              <span><FileText aria-hidden="true" /> Support</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href={`/apps/${slug}/privacy`}>
              <span><ShieldCheck aria-hidden="true" /> Privacy Policy</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href={`/apps/${slug}/terms`}>
              <span><LockKeyhole aria-hidden="true" /> Terms of Use</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </nav>
        </section>

        <section className={styles.closing} aria-label="Explore more Pierrondi products">
          <p>PIERRONDI.DEV / PRODUCT SYSTEMS</p>
          <h2>One app in a wider body of product and engineering work.</h2>
          <span>Explore the projects, systems and shipped products behind the public catalog.</span>
          <Link href="/portfolio">Explore the portfolio <ArrowRight aria-hidden="true" /></Link>
        </section>
      </main>
      <WhatsApp lang="en" />
    </>
  )
}
