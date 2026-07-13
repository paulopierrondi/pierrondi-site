import type { Metadata } from 'next'
import LegalDocument from '@/components/LegalDocument'

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: "Legal notice for Paulo Pierrondi's personal site.",
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
    <LegalDocument
      eyebrow="Legal"
      title="Legal Notice."
      lead={
        <>
        The essentials about this personal site — direct, without unnecessary
        legalese.
        </>
      }
    >
        <p>Last updated: June 2026.</p>

        <h2>1. About this site</h2>
        <p>
          This is Paulo Pierrondi&apos;s personal site. It does not represent an
          institutional position and does not include confidential information
          from clients, employers, or partners. Mentioned marks belong to their
          respective owners.
        </p>

        <h2>2. Content and opinions</h2>
        <p>
          Essays, frameworks and materials published here are informational and
          reflect personal opinion and experience. They do not constitute formal
          advice or the position of any institution.
        </p>

        <h2>3. Intellectual property</h2>
        <p>
          Original content on this site is authored by Paulo Pierrondi.
          Third-party logos and marks are referenced only for context.
        </p>

        <h2>4. No warranties</h2>
        <p>
          The site is provided as-is for informational purposes. Decisions should
          not be made solely from public content without specific analysis of
          your case.
        </p>

        <h2>5. Contact</h2>
        <p>
          Questions about this notice? Email{' '}
          <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>.
        </p>
    </LegalDocument>
  )
}
