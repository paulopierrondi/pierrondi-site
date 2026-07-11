import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Portfolio de produtos e sistemas — pierrondi.dev',
  description:
    'Produtos próprios que provam capacidade de construir SaaS, IA, integrações, dados e experiências web e iOS.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio de produtos e sistemas | pierrondi.dev',
    description: 'Cases públicos de SaaS, IA, dados, integrações e produtos digitais.',
    url: '/portfolio',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Portfolio de produtos — pierrondi.dev' }],
  },
}

const projects = [
  {
    name: 'AgenticosCore',
    label: 'RevOps com IA',
    description: 'Diagnóstico comercial, CRM, scoring e execução de follow-up para operações B2B.',
    url: 'https://agenticoscore.ai/diagnostico',
    fit: 'CRM, automação, dados e integrações.',
  },
  {
    name: 'FaithSchool',
    label: 'SaaS educacional',
    description: 'Planejamento homeschool, registros, relatórios, notificações e assistência de IA.',
    url: 'https://faithschool.app/homeschool-planner',
    fit: 'SaaS, dashboards, workflows e relatórios.',
  },
  {
    name: 'CantuStudio',
    label: 'Produto de IA',
    description: 'Aplicação para arranjos SATB com backend, validação, playback e exportação MusicXML.',
    url: 'https://cantustudio.app/gerar-arranjo-satb',
    fit: 'Produto de IA, backend, app e exportação.',
  },
]

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="PORTFOLIO"
        title={<>Produtos próprios que viram <span className="text-primary">prova pública.</span></>}
        lead="Cases clicáveis para avaliar como penso, construo e entrego SaaS, IA, integrações, dados e experiências digitais. Cada card abre o produto ou uma jornada real."
        chips={['SaaS', 'IA', 'APIs', 'Dados', 'Web / iOS']}
      />

      <main className={styles.main}>
        <section className={styles.intro} aria-labelledby="portfolio-cases">
          <div>
            <p className={styles.kicker}>CASES PÚBLICOS</p>
            <h2 id="portfolio-cases">O que você pode abrir agora</h2>
            <p className={styles.copy}>
              Se o briefing pede CRM, automação, dashboard, produto de IA ou backend, comece pelo case mais próximo do problema.
            </p>
          </div>
          <a className={styles.catalogLink} href="/ai-search">
            Ver catálogo técnico e evidências estruturadas →
          </a>
        </section>

        <section className={styles.grid} aria-label="Cases de produtos próprios">
          {projects.map((project) => (
            <article className={styles.card} key={project.name}>
              <p className={styles.label}>{project.label}</p>
              <h2>{project.name}</h2>
              <p className={styles.description}>{project.description}</p>
              <p className={styles.fit}><strong>Mostra:</strong> {project.fit}</p>
              <a className={styles.cta} href={project.url} target="_blank" rel="noreferrer">
                Abrir case público <span aria-hidden="true">↗</span>
              </a>
              <p className={styles.url}>{project.url}</p>
            </article>
          ))}
        </section>

        <section className={styles.proposalNote} aria-label="Uso em propostas">
          <p className={styles.kicker}>PARA CLIENTES E PROPOSTAS</p>
          <p>
            Este é o hub principal. Em uma proposta, use este link e acrescente o case mais relevante para o briefing — sempre com URL pública clicável.
          </p>
        </section>
      </main>
    </>
  )
}
