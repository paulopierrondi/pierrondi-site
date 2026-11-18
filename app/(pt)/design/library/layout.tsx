import type { ReactNode } from 'react'

import JsonLd from '@/components/JsonLd'
import { buildCollectionPageSchema } from '@/lib/seo/collection-page'

const collectionSchema = buildCollectionPageSchema({
  path: '/design/library',
  name: 'Component Library',
  description:
    'Biblioteca de componentes React do ecossistema Pierrondi: blocos reais com Tailwind, prontos para copiar, remixar e usar em produtos.',
  inLanguage: 'pt-BR',
})

export default function DesignLibraryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={collectionSchema} />
      {children}
    </>
  )
}
