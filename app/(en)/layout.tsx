import SiteRootDocument, { rootMetadata, rootViewport } from '@/components/SiteRootDocument'

export const metadata = { ...rootMetadata, title: { default: 'Paulo Pierrondi — governed AI operations', template: '%s | pierrondi.dev' }, openGraph: { ...rootMetadata.openGraph, locale: 'en_US' } }
export const viewport = rootViewport

export default function LocaleRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteRootDocument lang="en-US">{children}</SiteRootDocument>
}
