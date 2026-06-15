import Link from 'next/link'
import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import ThankYouTracker from '@/components/ThankYouTracker'
import styles from './ObrigadoContent.module.css'

export const metadata: Metadata = {
  title: 'Recebemos',
  description: 'Mensagem recebida. Vamos retornar em breve.',
  robots: { index: false, follow: false },
}

export default function Obrigado() {
  return (
    <>
      <ThankYouTracker />
      <PageHeader
        eyebrow="CONTATO"
        title={<>Recebemos.</>}
        lead="Em até 24h a gente entra em contato com próximos passos."
      />

      <main className={styles.main}>
        <Reveal>
          <div className={styles.card}>
            <p className={styles.contact}>
              Enquanto isso, se quiser falar direto:{' '}
              <Link href="mailto:pierrondi@gmail.com" className={styles.contactLink}>
                pierrondi@gmail.com
              </Link>
            </p>
            <Link href="/" className={styles.btnPrimary}>Voltar ao site</Link>
          </div>
        </Reveal>
      </main>
    </>
  )
}
