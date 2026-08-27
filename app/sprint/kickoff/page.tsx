import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import SprintKickoffForm from './SprintKickoffForm'
import styles from './Kickoff.module.css'

export const metadata: Metadata = {
  title: 'Kickoff — Uma automação no ar',
  description:
    'Formulário pós-pagamento para kickoff da oferta Sprint. Relógio de 7 dias começa com form completo e acessos confirmados.',
  alternates: {
    canonical: '/sprint/kickoff',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function SprintKickoffPage() {
  return (
    <>
      <PageHeader
        eyebrow="KICKOFF · PÓS-PAGAMENTO"
        title={
          <>
            Formulário de <span className="text-primary">kickoff</span>
          </>
        }
        lead="Você já pagou. Isto não é proposta. Relógio de 7 dias começa quando o form estiver completo e os acessos tiverem chegado."
        chips={['15 campos', 'Escopo fechado', 'Aceite testável']}
      />
      <div className={styles.kickoffMain}>
        <Link href="/sprint" className={styles.backLink}>
          ← Voltar para a oferta
        </Link>
        <p className={styles.kickoffWarning}>
          Preencha com o máximo de concreto possível. Respostas vagas atrasam o início — o relógio
          só corre com form completo + acessos.
        </p>
        <SprintKickoffForm />
      </div>
    </>
  )
}
