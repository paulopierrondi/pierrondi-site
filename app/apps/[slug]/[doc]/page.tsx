import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { ProductTile } from '@/components/ui/ProductTile'
import styles from './AppLegal.module.css'

const APPS = {
  faithschool: {
    name: 'FaithSchool',
    category: 'Christian homeschool planning and family records app',
    contactSubject: 'FaithSchool Support',
  },
  provadoria: {
    name: 'ProvadorIA',
    category: 'AI-assisted outfit preview and style planning app',
    contactSubject: 'ProvadorIA Support',
  },
  voudeque: {
    name: 'VouDeQue',
    category: 'AI-assisted outfit challenge and wardrobe idea app',
    contactSubject: 'VouDeQue Support',
  },
  investcoach: {
    name: 'InvestCoach.AI',
    category: 'Financial planning and education app',
    contactSubject: 'InvestCoach Support',
  },
  mytone: {
    name: 'MyTone Studio',
    category: 'AI-assisted ringtone creation app',
    contactSubject: 'MyTone Support',
  },
  'bandle-br': {
    name: 'Bandle BR',
    category: 'Daily Brazilian music quiz app',
    contactSubject: 'Bandle BR Support',
  },
  'parabens-ia-br': {
    name: 'Parabens IA BR',
    category: 'Personalized birthday message and video app',
    contactSubject: 'Parabens IA BR Support',
  },
  adivinha: {
    name: 'Adivinha!',
    category: 'Music quiz app',
    contactSubject: 'Adivinha Support',
  },
} as const

const DOCS = {
  support: 'Support',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
} as const

type AppSlug = keyof typeof APPS
type DocSlug = keyof typeof DOCS

interface Props {
  params: Promise<{ slug: string; doc: string }>
}

function isAppSlug(slug: string): slug is AppSlug {
  return slug in APPS
}

function isDocSlug(doc: string): doc is DocSlug {
  return doc in DOCS
}

export function generateStaticParams() {
  return Object.keys(APPS).flatMap((slug) => Object.keys(DOCS).map((doc) => ({ slug, doc })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, doc } = await params
  if (!isAppSlug(slug) || !isDocSlug(doc)) return {}
  const app = APPS[slug]
  const title = `${DOCS[doc]} · ${app.name}`
  const description = `${DOCS[doc]} for ${app.name}, a ${app.category}.`
  const canonical = `/apps/${slug}/${doc}`
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

function SupportContent({ app }: { app: (typeof APPS)[AppSlug] }) {
  return (
    <div className={styles.prose}>
      <p className={styles.meta}>Last updated: May 20, 2026</p>
      <section>
        <h2>Contact</h2>
        <p>
          For help with {app.name}, contact{' '}
          <a href={`mailto:pierrondi@gmail.com?subject=${encodeURIComponent(app.contactSubject)}`}>pierrondi@gmail.com</a>.
          Include the app name, device model, iOS version and a short description of the issue.
        </p>
      </section>
      <section>
        <h2>Account and data requests</h2>
        <p>
          You can request account deletion, data correction or support for purchases through the same email address. We may
          ask for enough information to verify the account before acting on account-specific requests.
        </p>
      </section>
      <section>
        <h2>Purchases</h2>
        <p>
          If the app offers subscriptions or in-app purchases, billing is handled by Apple through the App Store. Refunds and
          subscription management are available in the user&apos;s Apple account settings.
        </p>
      </section>
    </div>
  )
}

function PrivacyContent({ app }: { app: (typeof APPS)[AppSlug] }) {
  return (
    <div className={styles.prose}>
      <p className={styles.meta}>Last updated: May 20, 2026</p>
      <section>
        <h2>Information collected</h2>
        <p>
          {app.name} may collect account information, app settings, content you create in the app, purchase entitlement
          status, diagnostics and aggregate product analytics needed to operate and improve the service.
        </p>
      </section>
      <section>
        <h2>How information is used</h2>
        <ul>
          <li>Provide core app features, sync state and restore purchases.</li>
          <li>Protect accounts, troubleshoot errors and respond to support requests.</li>
          <li>Measure aggregate activation, retention and purchase flows without publishing personal data.</li>
        </ul>
      </section>
      <section>
        <h2>Service providers</h2>
        <p>
          The app may use hosting, authentication, storage, analytics, AI model, payment and crash-reporting providers. These
          providers process data only to support app functionality and operations.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          Contact <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a> to request access, correction or deletion of
          app-related account data. Some records may be retained when required for security, legal or transaction integrity.
        </p>
      </section>
    </div>
  )
}

function TermsContent({ app }: { app: (typeof APPS)[AppSlug] }) {
  return (
    <div className={styles.prose}>
      <p className={styles.meta}>Last updated: May 20, 2026</p>
      <section>
        <h2>Use of the app</h2>
        <p>
          {app.name} is provided for personal, educational or productivity use according to its stated app purpose:
          {` ${app.category}.`} You are responsible for using generated content and recommendations with judgment.
        </p>
      </section>
      <section>
        <h2>Subscriptions and purchases</h2>
        <p>
          Paid features, when available, are sold through Apple in-app purchase. Pricing, renewal and cancellation terms are
          shown by Apple before purchase and can be managed in the App Store account settings.
        </p>
      </section>
      <section>
        <h2>AI-generated content</h2>
        <p>
          AI-assisted output can be incomplete or incorrect. Review generated text, images, audio, plans or recommendations
          before relying on them or sharing them.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href={`mailto:pierrondi@gmail.com?subject=${encodeURIComponent(app.contactSubject)}`}>pierrondi@gmail.com</a>.
        </p>
      </section>
    </div>
  )
}

export default async function AppLegalPage({ params }: Props) {
  const { slug, doc } = await params
  if (!isAppSlug(slug) || !isDocSlug(doc)) notFound()

  const app = APPS[slug]
  const docTitle = DOCS[doc]
  const content =
    doc === 'support' ? <SupportContent app={app} /> : doc === 'privacy' ? <PrivacyContent app={app} /> : <TermsContent app={app} />

  return (
    <>
      <Nav />
      <main>
        <ProductTile
          variant="dark"
          eyebrow={app.name}
          headline={`${docTitle}.`}
          tagline={`${app.name} · ${app.category}`}
        />
        <ProductTile variant="dark" as="div">
          {content}
        </ProductTile>
      </main>
      <Footer />
    </>
  )
}
