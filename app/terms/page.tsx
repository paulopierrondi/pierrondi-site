import type { Metadata } from 'next'
import styles from './TermsContent.module.css'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for pierrondi.dev. Closed scope, code is yours, full transparency.',
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
    <main className={styles.shell}>
      <span className={styles.eyebrow}>Legal</span>
      <h1 className={styles.h1}>Terms of Service.</h1>
      <p className={styles.lead}>
        Updated April 2026.
      </p>

      <div className={styles.prose}>
        <h2>1. Service definition</h2>
        <p>
          <strong>pierrondi.dev</strong> offers four service categories:
        </p>
        <ul>
          <li><strong>Automation Express</strong> — automated workflow delivered in up to 2 weeks. Includes mapping, implementation and documentation.</li>
          <li><strong>Digital Product (MVP)</strong> — application or micro-SaaS built from scratch with closed scope and proposal-defined timeline.</li>
          <li><strong>Tech Partner</strong> — recurring technical consulting (fractional CTO) with monthly follow-up, backlog prioritization and architecture decision support.</li>
          <li><strong>App Store Connect / ASO</strong> — one-time metadata, screenshots, privacy and basic ASO setup for ready iOS apps.</li>
        </ul>

        <h2>2. Hiring</h2>
        <p>
          Every engagement starts with a formal proposal from pierrondi.dev detailing scope, timeline, price and deliverables. Work only begins after written approval (email or digital signature). Scope is always closed — what is in the proposal is what will be delivered.
        </p>

        <h2>3. Payment</h2>
        <p>For projects (Automation Express and MVP):</p>
        <ul>
          <li>50% on proposal approval (deposit)</li>
          <li>50% on final delivery</li>
        </ul>
        <p>For the Tech Partner plan:</p>
        <ul>
          <li>Monthly billing, due on the date agreed in the proposal</li>
        </ul>
        <p>
          App Store Connect setup may be free when hired as a one-time scope. Apple annual fee, account costs, tools, ads and any third-party charges are paid directly by the client.
        </p>
        <p>
          Accepted payment methods: Pix, boleto or credit card. Delays over 15 days may result in service suspension until settled.
        </p>

        <h2>4. Scope and changes</h2>
        <p>
          The contracted scope is the one described in the approved proposal. Any change, feature addition or requirement change triggers a new proposal with updated pricing and timeline. No additional charge will be made without prior client approval.
        </p>
        <p>
          Integrations with TikTok and other providers depend on OAuth, official permissions, API availability and each platform&apos;s policies. pierrondi.dev only uses these integrations when the user authorizes and configures the connection.
        </p>

        <h2>5. Deadlines</h2>
        <p>
          Estimated deadlines are in the proposal and start from the approval date and initial payment receipt. If delay risk arises, pierrondi.dev communicates in advance and presents a new schedule. Delays caused by client dependencies (approvals, access, content) are not pierrondi.dev&apos;s responsibility.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          All source code, design, documentation and digital assets produced during the project belong entirely to the client after full payment. Until settlement, deliverables remain pierrondi.dev&apos;s property.
        </p>

        <h2>7. Confidentiality</h2>
        <p>
          All information shared by the client during service delivery is treated as confidential. pierrondi.dev does not disclose client data, documents or strategies to third parties without express authorization. A formal NDA is available on request.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          pierrondi.dev is not liable for indirect losses, lost profits, consequential damages or harm arising from use of deliverables after delivery. Total liability is limited to the amount actually paid by the client for the relevant contract.
        </p>

        <h2>9. Termination</h2>
        <p>
          Either party may terminate the contract with 15 calendar days&apos; prior notice in writing (email). In case of termination:
        </p>
        <ul>
          <li>Work delivered up to the termination date will be billed proportionally</li>
          <li>Partial deliverables will be made available after payment of the proportional amount</li>
          <li>Amounts paid in advance for unperformed work will be refunded</li>
        </ul>

        <h2>10. Jurisdiction</h2>
        <p>
          These terms are governed by Brazilian law. The court of São Paulo/SP is elected to settle any disputes arising from this contract, to the exclusion of any other, however privileged.
        </p>

        <h2>11. Contact</h2>
        <p>For questions about these terms:</p>
        <p>
          <strong>pierrondi.dev</strong><br />
          Email: <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>
        </p>
      </div>
    </main>
  )
}
