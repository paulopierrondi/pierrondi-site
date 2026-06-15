import type { Metadata } from 'next'
import styles from './PrivacyContent.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for pierrondi.dev in compliance with LGPD.',
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
      <h1 className={styles.h1}>Privacy Policy.</h1>
      <p className={styles.lead}>
        Updated April 2026 · LGPD compliant.
      </p>

      <div className={styles.prose}>
        <h2>1. Who we are</h2>
        <p>
          <strong>pierrondi.dev</strong> is a technology agency offering process automation, digital product development (MVPs) and fractional CTO consulting for SMBs, startups and creators in Brazil.
        </p>

        <h2>2. Data we collect</h2>
        <p>We only collect data you voluntarily provide through the contact form:</p>
        <ul>
          <li>Name</li>
          <li>Email</li>
          <li>Company (optional)</li>
          <li>Service of interest</li>
          <li>Message</li>
          <li>OAuth-authorized account data, such as public identifier, integration status and granted permissions, when connecting TikTok or another official provider.</li>
        </ul>
        <p>We do not collect browsing data, tracking cookies or device information without your explicit consent.</p>

        <h2>3. Purpose of processing</h2>
        <p>The collected data is used exclusively to:</p>
        <ul>
          <li>Reply to your contact request</li>
          <li>Send a commercial proposal, if requested</li>
          <li>Schedule a free technical diagnostic</li>
          <li>Operate official publishing or content management integrations, always with explicit consent and configuration</li>
        </ul>
        <p>We do not sell, share or transfer your data to third parties for marketing purposes.</p>

        <h2>4. Legal basis (LGPD Art. 7)</h2>
        <p>
          Data processing is based on your <strong>consent</strong> (when submitting the form) and the <strong>legitimate interest</strong> of pierrondi.dev in responding to commercial requests.
        </p>

        <h2>5. Data processors</h2>
        <p>We use the following services to process data:</p>
        <ul>
          <li><strong>Formspree</strong> — contact form processing (<a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">their policy</a>)</li>
          <li><strong>Railway</strong> — website hosting</li>
          <li><strong>TikTok</strong> — OAuth authentication and official APIs when you connect your account</li>
        </ul>

        <h2>6. Retention period</h2>
        <p>
          Form data is kept for a maximum of <strong>6 months</strong> after the last contact. After that period it is automatically deleted, unless there is an active commercial relationship.
        </p>

        <h2>7. Your rights (LGPD Art. 18)</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Confirm whether we process your data</li>
          <li>Access your personal data</li>
          <li>Correct incomplete or outdated data</li>
          <li>Request deletion of your data</li>
          <li>Revoke consent at any time</li>
        </ul>
        <p>To exercise any right, contact us by email below.</p>

        <h2>8. Security</h2>
        <p>
          We adopt technical and organizational measures to protect your data, including HTTPS on all connections, security headers (CSP, HSTS), and restricted access to collected data.
        </p>

        <h2>9. Contact</h2>
        <p>For questions or requests about privacy:</p>
        <p>
          <strong>pierrondi.dev</strong><br />
          Email: <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>
        </p>
      </div>
    </main>
  )
}
