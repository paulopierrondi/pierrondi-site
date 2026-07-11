import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import ProductLogo from '@/components/ProductLogo'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import { APPS } from '@/app/apps/[slug]/_apps'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Portfolio de produtos, sistemas e apps',
  description:
    'Produtos próprios que provam capacidade de construir SaaS, IA, integrações, dados, apps iOS e experiências web — com logos oficiais e links públicos.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio de produtos, sistemas e apps | pierrondi.dev',
    description: 'Cases públicos de SaaS, IA, dados, integrações, apps iOS e produtos digitais.',
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
    logoSlug: 'agenticoscore',
    label: 'RevOps com IA',
    description: 'Diagnóstico comercial, CRM, scoring e execução de follow-up para operações B2B.',
    url: 'https://agenticoscore.ai/diagnostico',
    fit: 'CRM, automação, dados e integrações.',
  },
  {
    name: 'FaithSchool',
    logoSlug: 'faithschool-web',
    label: 'SaaS educacional',
    description: 'Planejamento homeschool, registros, relatórios, notificações e assistência de IA.',
    url: 'https://faithschool.app/homeschool-planner',
    fit: 'SaaS, dashboards, workflows e relatórios.',
  },
  {
    name: 'CantuStudio',
    logoSlug: 'cantustudio',
    label: 'Produto de IA',
    description: 'Aplicação para arranjos SATB com backend, validação, playback e exportação MusicXML.',
    url: 'https://cantustudio.app/gerar-arranjo-satb',
    fit: 'Produto de IA, backend, app e exportação.',
  },
]

const appEntries = Object.entries(APPS) as Array<[string, (typeof APPS)[keyof typeof APPS]]>

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/portfolio#collection`,
  url: `${SITE_URL}/portfolio`,
  name: 'Portfolio de produtos, sistemas e apps — Paulo Pierrondi',
  inLanguage: 'pt-BR',
  about: { '@id': `${SITE_URL}/#person` },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      ...projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.name,
        url: project.url,
      })),
      ...appEntries.map(([slug, app], index) => ({
        '@type': 'ListItem',
        position: projects.length + index + 1,
        name: app.name,
        url: `${SITE_URL}/apps/${slug}`,
      })),
    ],
  },
}

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={portfolioSchema} />
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
              <div className={styles.cardHead}>
                <ProductLogo slug={project.logoSlug} name={project.name} size={52} />
                <p className={styles.label}>{project.label}</p>
              </div>
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

        <section className={styles.appsSection} aria-labelledby="portfolio-apps">
          <div className={styles.intro}>
            <div>
              <p className={styles.kicker}>APPS iOS</p>
              <h2 id="portfolio-apps">Apps publicados e em lançamento</h2>
              <p className={styles.copy}>
                Portfólio de apps próprios — utilidades, IA on-device, estudo, jogos e criatividade. Cada app tem página
                própria com suporte, privacidade e link da App Store quando publicado.
              </p>
            </div>
          </div>
          <div className={styles.appsGrid}>
            {appEntries.map(([slug, app]) => (
              <Link key={slug} href={`/apps/${slug}`} className={styles.appTile}>
                <ProductLogo slug={slug} name={app.name} size={48} />
                <span className={styles.appMeta}>
                  <span className={styles.appName}>{app.name}</span>
                  <span className={styles.appCategory}>{app.category}</span>
                </span>
              </Link>
            ))}
          </div>
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
