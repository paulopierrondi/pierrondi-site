import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import styles from './NumeroContent.module.css'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Marketing OS — Números reais · pierrondi.dev',
  description:
    'Métricas reais da operação interna do Marketing OS: posts gerados, taxa de aprovação, custo médio por draft. Atualizado de hora em hora.',
  alternates: { canonical: `${SITE_URL}/marketing-os/numeros` },
  robots: { index: true, follow: true },
}

export default function PublicNumbersPage() {
  return (
    <>
      <PageHeader
        eyebrow="OPERAÇÃO REAL"
        title={<>Os números do nosso <span className="text-primary">Marketing OS.</span></>}
        lead="A própria pierrondi.dev opera o marketing nesta plataforma. Estes números vêm direto do Postgres da operação, atualizados a cada hora. Sem dashboards bonitos: é a operação real, agora."
      />

      <main className={styles.main}>
        <Reveal>
          <div className={styles.card}>
            <div className={styles.errorBox}>
              Operação em fase de migração. Os números reais voltam aqui assim que o
              Marketing OS interno reconectar o pipeline de publicação. Enquanto isso,
              veja o sistema na página principal.
            </div>

            <div className={styles.ctaRow}>
              <Link href="/marketing-os" className={styles.btnPrimary}>
                ← Voltar para Marketing OS
              </Link>
              <Link href="/contato" className={styles.btnGhost}>
                Falar com o time
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
    </>
  )
}
