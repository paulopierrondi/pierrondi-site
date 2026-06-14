import Link from 'next/link'
import type { Metadata } from 'next'

import { PillButton } from '@/components/ui/PillButton'
import { ProductTile } from '@/components/ui/ProductTile'
import ThankYouTracker from '@/components/ThankYouTracker'

import styles from './ObrigadoContent.module.css'

export const metadata: Metadata = {
  title: 'Recebemos',
  description: 'Mensagem recebida. Vamos retornar em breve.',
  robots: { index: false, follow: false },
}

export default function Obrigado() {
  return (
    <main className={styles.main}>
      <ThankYouTracker />
      <ProductTile
        variant="dark"
        headline="Recebemos."
        headlineLevel="h1"
        tagline="Em até 24h a gente entra em contato com próximos passos."
        ctas={
          <PillButton href="/" variant="primary">
            Voltar ao site
          </PillButton>
        }
      >
        <p className={styles.contact}>
          Enquanto isso, se quiser falar direto:{' '}
          <Link href="mailto:pierrondi@gmail.com" className={styles['contact-link']}>
            pierrondi@gmail.com
          </Link>
        </p>
      </ProductTile>
    </main>
  )
}
