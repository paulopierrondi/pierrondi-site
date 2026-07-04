import type { Metadata } from 'next'
import styles from './PrivacyContent.module.css'

export const metadata: Metadata = {
  title: 'Privacy',
  description: "How pierrondi.dev handles contact data on Paulo Pierrondi's personal site.",
  alternates: {
    canonical: '/privacy',
    languages: {
      'pt-BR': '/privacidade',
      'en-US': '/privacy',
    },
  },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.shell}>
      <span className={styles.eyebrow}>Legal</span>
      <h1 className={styles.h1}>Privacy.</h1>
      <p className={styles.lead}>
        How we handle your data when you contact pierrondi.dev. Direct, without
        unnecessary legalese.
      </p>

      <div className={styles.prose}>
        <p>Last updated: June 2026.</p>

        <h2>1. Data we collect</h2>
        <p>
          We collect only what you actively send: name, email, and the message
          written when contacting us through the form, email, LinkedIn, or
          WhatsApp. We do not use invasive advertising tracking.
        </p>

        <h2>2. How we use it</h2>
        <p>
          Your data is used exclusively to reply to your contact and continue
          the conversation. We do not sell, rent, or share your data with third
          parties for marketing purposes.
        </p>

        <h2>3. Retention</h2>
        <p>
          Contact data is kept only as long as needed for the conversation or
          project. Minimal records may be kept for tax, contractual, or security
          obligations. You can request deletion at any time.
        </p>

        <h2>4. Your rights</h2>
        <p>
          You can request access, correction, or deletion of your data by writing
          to <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>. We
          respond within a reasonable timeframe.
        </p>

        <h2>5. Security</h2>
        <p>
          We use reasonable technical and organizational measures to protect
          your data. No system is perfectly immune, but we treat your
          information with the same governance rigor applied to projects.
        </p>

        <h2>6. Contact</h2>
        <p>
          Privacy questions? Email{' '}
          <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>.
        </p>
      </div>
    </main>
  )
}
