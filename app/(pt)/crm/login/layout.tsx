import type { Metadata } from 'next'

// Internal tool entry point: must never surface in search results.
export const metadata: Metadata = {
  title: 'CRM Login',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
