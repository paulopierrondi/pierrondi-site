import type { Metadata } from 'next'
import { APPS } from '@/app/apps/[slug]/_apps'
import styles from '@/app/apps/directory.module.css'

export const metadata: Metadata = {
  title: 'App information & support',
  description: 'Find product information, support and privacy details for apps by Paulo Pierrondi.',
  alternates: { canonical: '/apps' },
  openGraph: {
    title: 'App information & support',
    description: 'Find product information, support and privacy details for each app.',
    url: '/apps', type: 'website', locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'App information and support — Paulo Pierrondi' }],
  },
}

export default function AppDirectoryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>PIERRONDI / APPS</p>
        <h1>App information &amp; support</h1>
        <p>Find product information, support and privacy details for each app.</p>
        <nav aria-label="App directory"><a href="/en/portfolio">Back to portfolio ↗</a></nav>
      </header>
      <ul className={styles.list} aria-label="Apps">
        {Object.entries(APPS).map(([slug, app]) => (
          <li key={slug}>
            <a href={`/apps/${slug}`}>
              <strong>{app.name}</strong>
              <span>{app.category}</span>
              <b aria-hidden="true">↗</b>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
