import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
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
      <Nav />
      <main>
        <ProductTile
          variant="dark"
          eyebrow="Operação real · pierrondi.dev"
          headline="Os números do nosso Marketing OS."
          headlineLevel="h1"
          tagline="A própria pierrondi.dev opera o marketing nesta plataforma. Estes números vêm direto do Postgres da operação, atualizados a cada hora. Sem dashboards bonitos: é a operação real, agora."
        />

        <ProductTile variant="dark" as="div">
          <div className={styles.errorBox}>
            Operação em fase de migração. Os números reais voltam aqui assim que o
            Marketing OS interno reconectar o pipeline de publicação. Enquanto isso,
            veja o sistema na página principal.
          </div>

          <div className={styles.ctaRow}>
            <PillButton href="/marketing-os" variant="primary">
              ← Voltar para Marketing OS
            </PillButton>
            <PillButton href="/#contact" variant="ghost">
              Falar com o time
            </PillButton>
          </div>
        </ProductTile>
      </main>
      <Footer />
    </>
  )
}
