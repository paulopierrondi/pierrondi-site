import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { LockKeyhole } from 'lucide-react'

import { WHYPAULO_COOKIE, verifyWhyPauloSessionCookie } from '@/lib/whypaulo/auth'
import WhyPauloExperience from './WhyPauloExperience'
import styles from './WhyPauloExperience.module.css'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Why Paulo',
  description:
    'Private executive briefing on Paulo Pierrondi, ServiceNow platform value, AI maturity, LLM operating depth and governed agent systems.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/whypaulo' },
  openGraph: {
    title: 'Why Paulo - private executive AI maturity briefing',
    description: 'Private executive briefing on ServiceNow value leadership and governed AI operating maturity.',
    url: '/whypaulo',
    siteName: 'pierrondi.dev',
    type: 'website',
    images: [
      {
        url: '/assets/paulo-pierrondi-executive-neural.jpg',
        width: 900,
        height: 900,
        alt: 'Paulo Pierrondi',
      },
    ],
  },
}

interface WhyPauloPageProps {
  searchParams: Promise<{ auth?: string }>
}

function LockedWhyPaulo({ invalid }: { invalid: boolean }) {
  return (
    <main className={styles.lockShell}>
      <section className={styles.lockPanel} aria-labelledby="why-paulo-lock-title">
        <div className={styles.lockIcon} aria-hidden="true">
          <LockKeyhole size={22} />
        </div>
        <p className={styles.kicker}>pierrondi.dev / whypaulo</p>
        <h1 id="why-paulo-lock-title">Private executive briefing.</h1>
        <p>
          This page is intentionally gated. Use the access token configured in
          the provider to view the briefing.
        </p>
        <form className={styles.lockForm} method="post" action="/api/whypaulo/session">
          <input type="hidden" name="next" value="/whypaulo" />
          <label htmlFor="token">Access token</label>
          <div className={styles.lockInputRow}>
            <input
              id="token"
              name="token"
              type="password"
              autoComplete="current-password"
              placeholder="WHYPAULO_ACCESS_TOKEN"
              required
            />
            <button type="submit">Enter</button>
          </div>
          {invalid && <span className={styles.lockError}>Invalid or missing token.</span>}
        </form>
      </section>
    </main>
  )
}

export default async function WhyPauloPage({ searchParams }: WhyPauloPageProps) {
  const [cookieStore, params] = await Promise.all([cookies(), searchParams])
  const session = cookieStore.get(WHYPAULO_COOKIE)?.value
  const authorized = verifyWhyPauloSessionCookie(session)

  if (!authorized) return <LockedWhyPaulo invalid={params.auth === 'invalid'} />

  return <WhyPauloExperience />
}
