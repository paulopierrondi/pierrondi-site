import SiteRootDocument, { rootMetadata, rootViewport } from '@/components/SiteRootDocument'

export const metadata = rootMetadata
export const viewport = rootViewport

export default function LocaleRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteRootDocument lang="pt-BR">{children}</SiteRootDocument>
}
