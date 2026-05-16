import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ProductTile } from '@/components/ui/ProductTile'
import styles from './PrivacyContent.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for pierrondi.dev, Pierrondi Shorts, Pierrondi Marketing OS and connected marketing integrations.',
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
    <>
      <Nav />
      <main>
        <ProductTile
          variant="dark"
          eyebrow="Legal"
          headline="Privacy Policy."
          tagline="Updated April 2026 · LGPD compliant"
        />

        <ProductTile variant="dark" as="div">
          <div className={styles.prose}>
            <h2>1. Who we are</h2>
            <p>
              pierrondi.dev is a technology, automation and applied AI business operated by Paulo Pierrondi. We build
              automation systems, digital products, MVPs, Pierrondi Shorts and the Pierrondi Marketing OS platform.
            </p>
            <p>
              Pierrondi Shorts is an application operated by pierrondi.dev for creating, managing and publishing short-form
              video content through official platform integrations, including TikTok when a user explicitly connects an
              account.
            </p>

            <h2>2. Data we collect</h2>
            <p>We only collect data needed to operate the website, respond to inbound requests and connect approved integrations:</p>
            <ul>
              <li>Contact form data: name, email, company, service of interest and message.</li>
              <li>Account data from OAuth providers when you explicitly connect an account, such as TikTok, LinkedIn, Google, X or Meta.</li>
              <li>Operational metadata from Pierrondi Marketing OS: approval decisions, agent run logs, integration status and audit events.</li>
              <li>Analytics data when an analytics provider is enabled, such as page visits and conversion events.</li>
            </ul>

            <h2>3. How we use data</h2>
            <p>We use collected data to:</p>
            <ul>
              <li>Reply to commercial inquiries and schedule diagnostics.</li>
              <li>Operate campaigns, content drafts, approvals and marketing automations inside Pierrondi Marketing OS.</li>
              <li>Connect official APIs only after user consent, such as OAuth-based TikTok or LinkedIn account connection.</li>
              <li>Maintain security, audit logs, rate limits and human approval gates.</li>
            </ul>
            <p>
              pierrondi.dev does not sell personal data and does not share personal data with third parties for their own
              marketing purposes.
            </p>

            <h2>4. Social and marketing integrations</h2>
            <p>
              Pierrondi Shorts and Pierrondi Marketing OS integrations with TikTok, LinkedIn, Google, X, Instagram or other providers use official OAuth/API flows. Tokens are
              stored server-side, are never displayed in the UI, and may be revoked by disconnecting the provider or by
              revoking access in the provider account settings.
            </p>
            <p>
              Agents cannot publish, send email, alter landing pages or perform external actions automatically. Human approval
              is required before any high-impact external action.
            </p>

            <h2>5. Legal basis</h2>
            <p>
              We process personal data based on consent, legitimate interest to respond to business requests, execution of
              contracts, and compliance with applicable legal obligations, including Brazilian LGPD principles where applicable.
            </p>

            <h2>6. Processors and hosting</h2>
            <p>We may use trusted processors to run the application and integrations, including:</p>
            <ul>
              <li>Railway for application and database hosting.</li>
              <li>Formspree for contact form processing.</li>
              <li>OAuth providers such as LinkedIn, Google, X and Meta when you connect those accounts.</li>
              <li>AI model providers only for content generation or analysis initiated inside the product.</li>
            </ul>

            <h2>7. Retention</h2>
            <p>
              Contact form data is retained only as long as needed to respond and manage the commercial relationship. Marketing
              OS operational logs and approval records may be retained for audit, security and compliance purposes.
            </p>

            <h2>8. Security</h2>
            <p>
              We use HTTPS, server-side token handling, restricted access, audit logs, feature flags, rate limits, sandbox mode
              and kill switch controls to protect the application and connected accounts.
            </p>

            <h2>9. Your rights</h2>
            <p>
              You may request access, correction, deletion or revocation of consent by contacting us. OAuth access can also be
              revoked directly through the provider account settings.
            </p>

            <h2>10. Contact</h2>
            <p>
              pierrondi.dev
              <br />
              Email: <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>
            </p>
          </div>
        </ProductTile>
      </main>
      <Footer />
    </>
  )
}
