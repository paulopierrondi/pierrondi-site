import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ProductTile } from '@/components/ui/ProductTile'
import styles from './TermsContent.module.css'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for pierrondi.dev, Pierrondi Shorts and Pierrondi Marketing OS.',
  alternates: {
    canonical: '/terms',
    languages: {
      'pt-BR': '/termos',
      'en-US': '/terms',
    },
  },
  robots: { index: true, follow: true },
}

export default function TermsOfServicePage() {
  return (
    <>
      <Nav />
      <main>
        <ProductTile
          variant="dark"
          eyebrow="Legal"
          headline="Terms of Service."
          headlineLevel="h1"
          tagline="Updated April 2026"
        />

        <ProductTile variant="dark" as="div">
          <div className={styles.prose}>
            <h2>1. Scope</h2>
            <p>
              These Terms govern the use of pierrondi.dev websites, services, Pierrondi Shorts and Pierrondi Marketing OS.
              pierrondi.dev provides automation, applied AI, MVP development, technical partnership and governed marketing
              automation services.
            </p>
            <p>
              Pierrondi Shorts is an application operated by pierrondi.dev for creating, managing and publishing short-form
              video content through official platform integrations, including TikTok when a user explicitly connects an
              account.
            </p>

            <h2>2. Marketing OS and integrations</h2>
            <p>
              Pierrondi Shorts and Pierrondi Marketing OS may connect to official third-party APIs such as TikTok, LinkedIn,
              Google, X, Meta, email, Telegram, WhatsApp, n8n or Make. These connections require explicit configuration and
              user consent.
            </p>
            <p>
              The platform is approval-first. Agents may create drafts, plans, analyses and internal tasks, but cannot publish
              content, send messages, delete data, alter active campaigns or perform external actions without approval gates.
            </p>

            <h2>3. Acceptable use</h2>
            <p>You agree not to use the services to:</p>
            <ul>
              <li>Send spam, deceptive messages or unsolicited bulk outreach.</li>
              <li>Scrape platforms or bypass provider terms.</li>
              <li>Publish misleading claims, impersonate third parties or violate applicable law.</li>
              <li>Disable safety controls, audit logs, rate limits or approval gates.</li>
            </ul>

            <h2>4. Third-party services</h2>
            <p>
              Third-party APIs and platforms are governed by their own terms. pierrondi.dev is not responsible for outages,
              account restrictions or policy changes made by those providers. We use official APIs and conservative rate limits
              to reduce account risk.
            </p>

            <h2>5. Ownership</h2>
            <p>
              Unless otherwise stated in a written proposal, custom code, documentation and deliverables created for a client
              belong to that client after full payment. pierrondi.dev retains ownership of reusable frameworks, templates and
              internal tooling unless explicitly transferred.
            </p>

            <h2>6. No automated publishing guarantee</h2>
            <p>
              The default product policy is human approval before external action. Automatic publishing, if ever enabled, must
              be explicitly configured with feature flags, account permissions, rate limits and approval policy.
            </p>

            <h2>7. Limitation of liability</h2>
            <p>
              pierrondi.dev is not liable for indirect damages, lost profits, loss of data, provider restrictions or business
              outcomes outside the agreed service scope. Total liability is limited to the amount paid for the specific service
              that caused the claim.
            </p>

            <h2>8. Changes</h2>
            <p>
              We may update these Terms as the product evolves. The latest version will always be available on this page.
            </p>

            <h2>9. Contact</h2>
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
