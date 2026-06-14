import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BrandSignature from '@/components/BrandSignature'
import SwarmEffectsLoader from '@/components/SwarmEffectsLoader'
import { feitos, getFeito, type Feito } from '../feitos-data'
import styles from './page.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

const accentClass = {
  green: styles.nodeGreen,
  cyan: styles.nodeCyan,
  brass: styles.nodeBrass,
} as const

export function generateStaticParams() {
  return feitos.map((feito) => ({ slug: feito.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const feito = getFeito(slug)
  if (!feito) return {}

  return {
    title: `${feito.title} - Paulo Pierrondi`,
    description: feito.lead,
    alternates: {
      canonical: `/feitos/${feito.slug}`,
    },
    openGraph: {
      title: `${feito.title} - Paulo Pierrondi`,
      description: feito.lead,
      url: `/feitos/${feito.slug}`,
      siteName: 'pierrondi.dev',
      locale: 'pt_BR',
      type: 'website',
      images: [{ url: '/og', width: 1200, height: 630, alt: feito.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${feito.title} - Paulo Pierrondi`,
      description: feito.lead,
      images: ['/og'],
    },
  }
}

function FeitoDiagram({ feito }: { feito: Feito }) {
  const nodeMap = new Map(feito.diagram.nodes.map((node) => [node.id, node]))

  return (
    <div className={styles.diagramShell} aria-label={feito.diagram.label}>
      <svg viewBox="0 0 360 250" className={styles.diagram} role="img" aria-labelledby="diagram-title">
        <title id="diagram-title">{feito.diagram.label}</title>
        <defs>
          <filter id="feito-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className={styles.diagramEdges}>
          {feito.diagram.edges.map((edge, index) => {
            const from = nodeMap.get(edge.from)
            const to = nodeMap.get(edge.to)
            if (!from || !to) return null

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={styles.diagramEdge}
                strokeDasharray={edge.dashed ? '5 5' : undefined}
                style={{ animationDelay: `${index * 110}ms` }}
              />
            )
          })}
        </g>
        <g className={styles.diagramSignals}>
          {feito.diagram.edges.map((edge, index) => {
            const from = nodeMap.get(edge.from)
            const to = nodeMap.get(edge.to)
            if (!from || !to) return null

            return (
              <circle key={`signal-${edge.from}-${edge.to}`} r="4" className={`${styles.diagramSignal} ${accentClass[to.accent]}`}>
                <animateMotion
                  path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                  dur="3.6s"
                  begin={`${index * 0.36}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="3.6s"
                  begin={`${index * 0.36}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )
          })}
        </g>
        <g className={styles.diagramNodes}>
          {feito.diagram.nodes.map((node) => (
            <g key={node.id} className={styles.diagramNode}>
              <circle cx={node.x} cy={node.y} r="13" className={`${styles.nodeHalo} ${accentClass[node.accent]}`} />
              <circle cx={node.x} cy={node.y} r="5" className={`${styles.nodeCore} ${accentClass[node.accent]}`} filter="url(#feito-glow)" />
              <text x={node.x} y={node.y + 31} textAnchor="middle" className={styles.diagramLabel}>
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default async function FeitoPage({ params }: Props) {
  const { slug } = await params
  const feito = getFeito(slug)
  if (!feito) notFound()
  const related = feitos.filter((item) => item.slug !== feito.slug)

  return (
    <main className={styles.page} data-swarm-root>
      <SwarmEffectsLoader />
      <nav className={styles.nav} aria-label="Navegacao de feitos">
        <BrandSignature href="/#top" className={styles.brand} ariaLabel="Voltar para pierrondi.dev" subtitle="Proof System" />
        <div className={styles.navLinks}>
          <Link href="/#themes">Temas</Link>
          <Link href="/#feitos">Feitos</Link>
          <a href="https://br.linkedin.com/in/paulopierrondi" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.neuralField} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.heroCopy} data-swarm-reveal>
          <p className={styles.eyebrow}>{feito.kicker}</p>
          <h1>{feito.headline}</h1>
          <p className={styles.lead}>{feito.lead}</p>
          <div className={styles.heroSignals}>
            <span>{feito.marketLine}</span>
            <span>{feito.englishAbstract}</span>
          </div>
        </div>
        <aside className={styles.heroDiagram} data-swarm-reveal data-swarm-tilt data-reveal-delay="2">
          <p>{feito.title}</p>
          <FeitoDiagram feito={feito} />
        </aside>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-title">
        <div className={styles.sectionHeader} data-swarm-reveal>
          <p className={styles.eyebrow}>O que isso prova</p>
          <h2 id="proof-title">{feito.title}</h2>
          <p>{feito.proof}</p>
        </div>
        <div className={styles.layerGrid}>
          {feito.layers.map((layer, index) => (
            <article key={layer.label} data-swarm-reveal data-swarm-tilt data-reveal-delay={index + 1}>
              <span>{layer.label}</span>
              <h3>{layer.title}</h3>
              <p>{layer.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflowSection} aria-labelledby="workflow-title">
        <div data-swarm-reveal>
          <p className={styles.eyebrow}>Workflow de valor</p>
          <h2 id="workflow-title">Como a arquitetura vira execucao.</h2>
        </div>
        <div className={styles.workflowRail}>
          {feito.workflow.map((step, index) => (
            <article key={step.title} data-swarm-reveal data-reveal-delay={index + 1}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.methodsSection} aria-labelledby="methods-title">
        <div className={styles.methodsPanel} data-swarm-reveal data-swarm-tilt>
          <p className={styles.eyebrow}>Metodo</p>
          <h2 id="methods-title">Rigor tecnico sem perder narrativa executiva.</h2>
          <div className={styles.methodTags}>
            {feito.methods.map((method) => (
              <span key={method}>{method}</span>
            ))}
          </div>
        </div>
        <div className={styles.outcomePanel} data-swarm-reveal data-swarm-tilt data-reveal-delay="2">
          <p className={styles.eyebrow}>Valor</p>
          <ul>
            {feito.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.relatedSection} aria-labelledby="related-title">
        <div className={styles.relatedHeader} data-swarm-reveal>
          <p className={styles.eyebrow}>Arquiteturas relacionadas</p>
          <h2 id="related-title">Outros feitos no mesmo sistema operacional.</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((item, index) => (
            <Link key={item.slug} href={`/feitos/${item.slug}`} data-swarm-reveal data-swarm-tilt data-reveal-delay={index + 1}>
              <span>{item.cardLabel}</span>
              <strong>{item.cardTitle}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
