'use client'

import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'

export default function BlogCta() {
  return (
    <ProductTile
      variant="dark"
      eyebrow="Pronto para aplicar?"
      headline="Diagnóstico gratuito em 30 minutos."
      ctas={
        <PillButton href="/#contact" variant="primary">
          Falar com a equipe
        </PillButton>
      }
    />
  )
}
