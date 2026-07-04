import type { Metadata } from 'next'
import styles from './TermosContent.module.css'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal do site pessoal de Paulo Pierrondi.',
  alternates: {
    canonical: '/termos',
    languages: {
      'pt-BR': '/termos',
      'en-US': '/terms',
    },
  },
  robots: { index: true, follow: true },
}

export default function TermosPage() {
  return (
    <main className={styles.shell}>
      <span className={styles.eyebrow}>Legal</span>
      <h1 className={styles.h1}>Aviso legal.</h1>
      <p className={styles.lead}>
        O essencial sobre este site pessoal — direto, sem juridiquês
        desnecessário.
      </p>

      <div className={styles.prose}>
        <p>Última atualização: junho de 2026.</p>

        <h2>1. Sobre este site</h2>
        <p>
          Este é o site pessoal de Paulo Pierrondi. Não representa posição
          institucional e não inclui informação confidencial de clientes,
          empregadores ou parceiros. Marcas citadas pertencem aos seus
          respectivos titulares.
        </p>

        <h2>2. Conteúdo e opiniões</h2>
        <p>
          Os ensaios, frameworks e materiais publicados têm finalidade
          informativa e refletem opinião e experiência próprias. Não constituem
          aconselhamento formal nem posição de qualquer instituição.
        </p>

        <h2>3. Propriedade intelectual</h2>
        <p>
          O conteúdo original deste site é de autoria própria. Logos e marcas de
          terceiros são citados apenas para referência.
        </p>

        <h2>4. Sem garantias</h2>
        <p>
          O site é fornecido como está, para fins informativos. Não me
          responsabilizo por decisões tomadas exclusivamente com base no conteúdo
          público, sem análise do caso específico.
        </p>

        <h2>5. Contato</h2>
        <p>
          Dúvidas sobre este aviso? Escreva para{' '}
          <a href="mailto:pierrondi@gmail.com">pierrondi@gmail.com</a>.
        </p>
      </div>
    </main>
  )
}
