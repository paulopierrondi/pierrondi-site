import type { Recommendation } from '@/lib/ads-control/types'
import { PLATFORM_LABEL } from './format'
import styles from './AdsDashboard.module.css'

const SEVERITY_LABEL: Record<Recommendation['severity'], string> = {
  critical: 'Crítico',
  high: 'Alto',
  medium: 'Médio',
  low: 'Baixo',
}
const KIND_LABEL: Record<Recommendation['kind'], string> = {
  waste: 'Desperdício',
  fatigue: 'Fadiga',
  scale: 'Escalar',
  tracking: 'Tracking',
  landing: 'Landing',
  budget_shift: 'Realocar verba',
  coverage: 'Cobertura',
  data: 'Dados',
}
const ORDER = { critical: 0, high: 1, medium: 2, low: 3 } as const

function Group({ title, items, tone }: { title: string; items: Recommendation[]; tone: 'fix' | 'opportunity' }) {
  return (
    <div className={styles.recGroup} data-tone={tone}>
      <h3>
        {title} <span>{items.length}</span>
      </h3>
      {items.length === 0 ? (
        <p className={styles.muted}>Nada nesta categoria hoje.</p>
      ) : (
        <ol className={styles.recList}>
          {items.map((r) => (
            <li key={r.id} className={styles.rec} data-severity={r.severity}>
              <div className={styles.recTags}>
                <b data-severity={r.severity}>{SEVERITY_LABEL[r.severity]}</b>
                <span>{r.product}</span>
                <span>{r.platform === 'all' ? 'Todas as plataformas' : PLATFORM_LABEL[r.platform]}</span>
                <span>{KIND_LABEL[r.kind]}</span>
                {r.requiresApproval && <em>Requer aprovação</em>}
              </div>
              <h4>{r.title}</h4>
              <p className={styles.recEntity}>{r.entityName}</p>
              <dl>
                <dt>Evidência</dt>
                <dd>{r.evidence}</dd>
                <dt>Ação</dt>
                <dd>{r.action}</dd>
                <dt>Impacto esperado</dt>
                <dd>{r.expectedImpact}</dd>
              </dl>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default function Recommendations({ items }: { items: Recommendation[] }) {
  const sorted = [...items].sort((a, b) => ORDER[a.severity] - ORDER[b.severity])
  return (
    <div className={styles.recGrid}>
      <Group title="Fixes" tone="fix" items={sorted.filter((r) => r.type === 'fix')} />
      <Group title="Oportunidades" tone="opportunity" items={sorted.filter((r) => r.type === 'opportunity')} />
    </div>
  )
}
