import type { Metadata } from 'next'
import SwarmEffectsLoader from '@/components/SwarmEffectsLoader'
import {
  ArrowUpRight,
  Boxes,
  Braces,
  CircuitBoard,
  Code2,
  GalleryHorizontalEnd,
  GitBranch,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'
import {
  designPrinciples,
  installableComponents,
  previewSystems,
  priorityCategories,
  sourceCategories,
  sourceStats,
} from './design-catalog'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Design Vault - componentes, referências e sistemas visuais',
  description:
    'Design vault do pierrondi.dev para catalogar componentes React/Tailwind, referências 21st.dev, padrões de portfólio e sistemas visuais reutilizáveis.',
  alternates: { canonical: '/design' },
  openGraph: {
    title: 'Pierrondi Design Vault',
    description: 'Biblioteca viva de componentes, patterns e referências visuais para produtos e páginas.',
    url: '/design',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Pierrondi Design Vault' }],
  },
}

const fitLabels = {
  portfolio: 'Portfolio',
  product: 'Produto',
  enterprise: 'Enterprise',
  motion: 'Motion',
  utility: 'Utility',
} as const

export default function DesignVaultPage() {
  return (
    <main className={styles.page} data-swarm-root>
      <SwarmEffectsLoader />

      <section className={styles.hero} aria-labelledby="design-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Design Vault / pierrondi.dev</p>
          <h1 id="design-title">Design systems que viram trabalho real.</h1>
          <p className={styles.heroText}>
            Um ponto único para consultar 21st.dev, instalar componentes MIT, remixar no sistema visual Pierrondi e
            acelerar páginas, produtos, propostas e portfólios.
          </p>
          <div className={styles.heroActions} aria-label="Ações principais">
            <a href="#componentes">
              <LayoutGrid aria-hidden="true" />
              Ver componentes
            </a>
            <a href="#operacao">
              <Braces aria-hidden="true" />
              Ver operação
            </a>
          </div>
        </div>

        <div className={styles.heroVisual} aria-label="Preview visual do Design Vault">
          <div className={styles.signalGrid} aria-hidden="true" />
          <div className={styles.previewShell}>
            <div className={styles.previewTop}>
              <span />
              <span />
              <span />
              <strong>design intake</strong>
            </div>
            <div className={styles.previewCanvas}>
              <div className={styles.previewHero}>
                <div>
                  <span>Hero</span>
                  <strong>AI platform narrative</strong>
                </div>
              </div>
              <div className={styles.previewStack}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.previewChat}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.previewOrbit}>
                <i />
                <i />
                <i />
                <b />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stats} aria-label="Estado do catálogo">
        {sourceStats.map((stat) => (
          <article key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.detail}</p>
          </article>
        ))}
      </section>

      <section id="catalogo" className={styles.section} aria-labelledby="catalog-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Mapa fonte</p>
          <h2 id="catalog-title">Categorias que entram no repertório visual.</h2>
          <p>
            O catálogo rastreia a taxonomia pública do 21st.dev e prioriza blocos que viram páginas de portfólio,
            SaaS, apps, control towers e interfaces de agentes.
          </p>
        </div>

        <div className={styles.categoryGrid}>
          {priorityCategories.map((category) => (
            <article key={category.slug} className={styles.categoryCard}>
              <div className={styles.categoryMeta}>
                <span>{fitLabels[category.fit]}</span>
                {category.count ? <strong>{category.count}</strong> : <strong>src</strong>}
              </div>
              <h3>{category.name}</h3>
              <p>{category.note}</p>
              <a href={`https://21st.dev/community/components/s/${category.slug}`} target="_blank" rel="noreferrer">
                Abrir fonte <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.visualSystems} aria-labelledby="systems-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Preview lab</p>
          <h2 id="systems-title">Quatro sistemas de tela que devem nascer daqui.</h2>
        </div>
        <div className={styles.systemGrid}>
          {previewSystems.map((system, index) => (
            <article key={system.category} className={styles.systemCard}>
              <div className={styles.systemPreview} data-system={system.category}>
                <span />
                <span />
                <span />
                <span />
              </div>
              <div>
                <p>0{index + 1} / {system.label}</p>
                <h3>{system.title}</h3>
                <a href={`https://21st.dev/community/components/s/${system.category}`} target="_blank" rel="noreferrer">
                  Ver exemplos <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="componentes" className={styles.section} aria-labelledby="components-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Fila instalável</p>
          <h2 id="components-title">Componentes com rota clara de entrada.</h2>
          <p>
            A fonte completa fica mapeada; estes são os primeiros blocos com comando ou referência direta para virar
            componente local quando houver uso real.
          </p>
        </div>

        <div className={styles.componentList}>
          {installableComponents.map((component) => (
            <article key={`${component.author}-${component.title}`} className={styles.componentRow}>
              <div className={styles.componentIcon}>
                {component.category === 'ai-chat' ? <CircuitBoard aria-hidden="true" /> : <Boxes aria-hidden="true" />}
              </div>
              <div className={styles.componentMain}>
                <div className={styles.componentTitle}>
                  <h3>{component.title}</h3>
                  <span data-status={component.status}>{component.status === 'ready' ? 'install' : 'reference'}</span>
                </div>
                <p>{component.useCase}</p>
                <div className={styles.dependencyList}>
                  {component.dependencies.map((dependency) => (
                    <span key={dependency}>{dependency}</span>
                  ))}
                </div>
              </div>
              <div className={styles.componentActions}>
                {component.installCommand ? (
                  <code>{component.installCommand}</code>
                ) : (
                  <code>usar como referência visual</code>
                )}
                <a href={component.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Abrir ${component.title}`}>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="operacao" className={styles.operating} aria-labelledby="operating-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Como usar</p>
          <h2 id="operating-title">Design vira memória, não pasta solta.</h2>
        </div>
        <div className={styles.principleGrid}>
          {designPrinciples.map((principle, index) => (
            <article key={principle.title}>
              <span>0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
              <small>{principle.evidence}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.commandSection} aria-labelledby="commands-title">
        <div>
          <p className={styles.eyebrow}>Comandos canônicos</p>
          <h2 id="commands-title">Puxar catálogo, instalar seletivamente, validar.</h2>
        </div>
        <div className={styles.commandGrid}>
          <code>
            <TerminalSquare aria-hidden="true" />
            npm run design:sync-21st
          </code>
          <code>
            <Code2 aria-hidden="true" />
            npm run design:install -- author/component
          </code>
          <code>
            <GitBranch aria-hidden="true" />
            npm run build
          </code>
          <code>
            <ShieldCheck aria-hidden="true" />
            npm run lint
          </code>
        </div>
      </section>

      <section className={styles.sourceCloud} aria-label="Categorias fonte completas">
        <div className={styles.sourceCloudHeader}>
          <GalleryHorizontalEnd aria-hidden="true" />
          <h2>Categorias fonte rastreadas</h2>
        </div>
        <div className={styles.tagCloud}>
          {sourceCategories.map((category) => (
            <a key={category} href={`https://21st.dev/community/components/s/${category}`} target="_blank" rel="noreferrer">
              {category}
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <Sparkles aria-hidden="true" />
        <p>
          Fonte primária: 21st.dev Community. Componentes entram com licença MIT, autor preservado e remix visual
          Pierrondi antes de uso comercial.
        </p>
      </footer>
    </main>
  )
}
