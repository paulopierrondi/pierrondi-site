import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'

import type { AdsControlSnapshot, ConnectorStatus } from '@/lib/ads-control/types'
import AdsExplorer from './AdsExplorer'
import Recommendations from './Recommendations'
import TrendChart from './TrendChart'
import { PLATFORM_LABEL, fmtDateTimeSP, freshness } from './format'
import styles from './AdsDashboard.module.css'

const STATUS_LABEL: Record<ConnectorStatus['status'], string> = {
  ok: 'OK',
  missing_credentials: 'Sem credenciais',
  error: 'Erro',
  no_data: 'Sem dados',
}

const WEB_LABEL = { ga4: 'GA4', gsc: 'Search Console', ahrefs: 'Ahrefs DR' } as const

function Header({ snapshot }: { snapshot: AdsControlSnapshot | null }) {
  const fresh = snapshot ? freshness(snapshot.collectedAt) : null
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.kicker}>pierrondi.dev / control_tower / ads</p>
        <h1>Ads Performance</h1>
        <p className={styles.muted}>
          {snapshot
            ? `Coletado em ${fmtDateTimeSP(snapshot.collectedAt)} (America/Sao_Paulo)`
            : 'Aguardando o primeiro snapshot diário.'}
        </p>
        {snapshot && (
          <p className={styles.muted}>
            Câmbio:{' '}
            {snapshot.fx.USD_BRL != null
              ? `USD/BRL ${snapshot.fx.USD_BRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} · ${snapshot.fx.source}${snapshot.fx.date ? ` · ${snapshot.fx.date}` : ''}`
              : 'indisponível'}
            {' · moeda de relatório BRL'}
          </p>
        )}
      </div>
      <div className={styles.headerActions}>
        {fresh && (
          <span className={styles.badge} data-tone={fresh.stale ? 'bad' : 'good'}>
            {fresh.label}
          </span>
        )}
        <Link href="/control_tower" className={styles.back}>
          <ArrowLeft size={14} aria-hidden="true" /> Control Tower
        </Link>
      </div>
    </header>
  )
}

export function AdsLocked({ invalid }: { invalid: boolean }) {
  return (
    <main className={styles.shell}>
      <div className={styles.content}>
        <section className={`${styles.panel} ${styles.lock}`} aria-labelledby="ads-lock-title">
          <LockKeyhole size={22} aria-hidden="true" />
          <p className={styles.kicker}>pierrondi.dev / control_tower / ads</p>
          <h1 id="ads-lock-title">Ads Performance é privado.</h1>
          <p className={styles.muted}>
            Gasto de mídia exige sessão do Control Tower. Use o token de visualização configurado no provider.
          </p>
          <form method="post" action="/api/automation-control/session" className={styles.lockForm}>
            <input type="hidden" name="next" value="/control_tower/ads" />
            <label htmlFor="ads-token">Token de acesso</label>
            <div>
              <input id="ads-token" name="token" type="password" autoComplete="current-password" required />
              <button type="submit">Entrar</button>
            </div>
            {invalid && <span role="alert">Token inválido ou ausente.</span>}
          </form>
        </section>
      </div>
    </main>
  )
}

export default function AdsDashboard({ snapshot }: { snapshot: AdsControlSnapshot | null }) {
  if (!snapshot) {
    return (
      <main className={styles.shell}>
        <div className={styles.content}>
          <Header snapshot={null} />
          <section className={styles.panel} aria-labelledby="ads-empty">
            <h2 id="ads-empty">Nenhum snapshot recebido ainda</h2>
            <p className={styles.muted}>
              O job local de ads envia um snapshot todos os dias às 04:00 e às 06:00 (horário de Brasília) para{' '}
              <code>/api/ads-control/snapshot</code>. Nada chegou até agora: confira se o job rodou e se o token de ingestão
              (<code>ADS_CONTROL_INGEST_TOKEN</code> ou <code>AUTOMATION_CONTROL_INGEST_TOKEN</code>) está igual nos dois lados.
            </p>
            <p className={styles.muted}>Esta página preenche sozinha assim que o primeiro envio for aceito.</p>
          </section>
        </div>
      </main>
    )
  }

  const allDown = snapshot.connectors.length > 0 && snapshot.connectors.every((c) => c.status !== 'ok')
  const noConnectors = snapshot.connectors.length === 0

  return (
    <main className={styles.shell}>
      <div className={styles.content}>
        <Header snapshot={snapshot} />

        <section className={styles.panel} aria-labelledby="ads-connectors">
          <h2 id="ads-connectors" className={styles.srOnly}>
            Status dos conectores
          </h2>
          <ul className={styles.chips}>
            {snapshot.connectors.map((c) => (
              <li key={c.platform} className={styles.chip} data-status={c.status}>
                <strong>{PLATFORM_LABEL[c.platform]}</strong>
                <span>{STATUS_LABEL[c.status]}</span>
                {c.status === 'missing_credentials' && c.missingEnv.length > 0 && (
                  <small>Faltam: {c.missingEnv.join(', ')}</small>
                )}
                {c.status !== 'missing_credentials' && c.status !== 'ok' && c.message && <small>{c.message}</small>}
                {c.status === 'ok' && (
                  <small>
                    {c.accounts} conta(s) · {c.rows} linhas
                  </small>
                )}
              </li>
            ))}
            {(snapshot.web?.connectors ?? []).map((c) => (
              <li key={c.source} className={styles.chip} data-status={c.status} title={c.message || undefined}>
                <strong>{WEB_LABEL[c.source]}</strong>
                <span>{STATUS_LABEL[c.status]}</span>
                {c.status === 'ok' ? <small>{c.properties} propriedade(s)</small> : c.message && <small>{c.message}</small>}
              </li>
            ))}
            {noConnectors && <li className={styles.chip} data-status="no_data">Nenhum conector reportado.</li>}
          </ul>
          {(allDown || noConnectors) && (
            <p className={styles.alert} role="status">
              Nenhum conector está entregando dados. Os números abaixo ficam vazios até as credenciais serem configuradas no job.
            </p>
          )}
        </section>

        <section className={styles.panel} aria-labelledby="ads-recs">
          <div className={styles.panelHeader}>
            <h2 id="ads-recs">Recomendações e oportunidades</h2>
            <span className={styles.pill}>{snapshot.recommendations.length}</span>
          </div>
          <p className={styles.muted}>
            Somente leitura: nenhuma campanha é alterada automaticamente. Toda ação precisa da aprovação do Paulo.
          </p>
          {snapshot.recommendations.length ? (
            <Recommendations items={snapshot.recommendations} />
          ) : (
            <p className={styles.emptyInline}>Nenhuma recomendação gerada neste snapshot.</p>
          )}
        </section>

        <AdsExplorer snapshot={snapshot} />

        <section className={styles.panel} aria-labelledby="ads-trend">
          <div className={styles.panelHeader}>
            <h2 id="ads-trend">Tendência diária · últimos 30 dias</h2>
          </div>
          <TrendChart snapshot={snapshot} />
        </section>
      </div>
    </main>
  )
}
