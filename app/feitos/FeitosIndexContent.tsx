import Link from 'next/link'
import { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import { feitos } from './feitos-data'
import styles from './FeitosIndex.module.css'

export type FeitosLang = 'pt' | 'en'

function MiniDiagram({ diagram }: { diagram: { label: string; nodes: Array<{ id: string; label: string; x: number; y: number; accent: string }>; edges: Array<{ from: string; to: string; dashed?: boolean }> } }) {
  const viewBox = '0 0 360 248'
  const nodeById = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))

  return (
    <figure className={styles.diagram} aria-label={diagram.label}>
      <svg viewBox={viewBox} className={styles.svg}>
        {diagram.edges.map((edge) => {
          const a = nodeById[edge.from]
          const b = nodeById[edge.to]
          if (!a || !b) return null
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={`${styles.edge} ${edge.dashed ? styles.dashed : ''}`}
            />
          )
        })}
        {diagram.nodes.map((node) => (
          <foreignObject
            key={node.id}
            x={node.x - 36}
            y={node.y - 14}
            width="72"
            height="28"
          >
            <div
              className={`${styles.node} ${
                node.accent === 'green'
                  ? styles.green
                  : node.accent === 'cyan'
                    ? styles.cyan
                    : styles.brass
              }`}
            >
              {node.label}
            </div>
          </foreignObject>
        ))}
      </svg>
    </figure>
  )
}

export default function FeitosIndexContent({ lang }: { lang: FeitosLang }) {
  return (
    <main className={styles.main}>
      <RevealStagger className={styles.grid} staggerDelay={0.06}>
        {feitos.map((feito) => (
          <RevealStaggerItem key={feito.slug}>
            <Link href={`/feitos/${feito.slug}`} className={styles.card}>
              <span className={styles.label}>{feito.cardLabel}</span>
              <h2>{feito.cardTitle}</h2>
              <p className={styles.headline}>{feito.headline}</p>
              <p className={styles.copy}>{lang === 'en' ? feito.englishAbstract : feito.cardCopy}</p>
              <MiniDiagram diagram={feito.diagram} />
              <div className={styles.methods}>
                {feito.methods.slice(0, 3).map((m) => (
                  <span key={m} className={styles.tag}>
                    {m}
                  </span>
                ))}
              </div>
              <p className={styles.abstract}>{lang === 'en' ? feito.englishAbstract : feito.englishAbstract}</p>
            </Link>
          </RevealStaggerItem>
        ))}
      </RevealStagger>
    </main>
  )
}
