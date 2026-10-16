import SiteRootDocument from '@/components/SiteRootDocument'
import NotFoundContent from '@/components/NotFoundContent'

export { metadata } from '@/components/NotFoundContent'

export default function GlobalNotFound() {
  return <SiteRootDocument lang="pt-BR"><NotFoundContent /></SiteRootDocument>
}
