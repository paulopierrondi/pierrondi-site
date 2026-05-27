import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { LockKeyhole } from 'lucide-react'

import {
  AUTOMATION_CONTROL_COOKIE,
  verifySessionCookie,
} from '@/lib/automation-control/auth'
import { readAutomationSnapshot } from '@/lib/automation-control/storage'
import AutomationControlPane from './AutomationControlPane'
import styles from './AutomationControlPane.module.css'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Automation Control Pane',
  description: 'Painel privado de automações, coders e LLMs em uso no ecossistema Paulo Pierrondi.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/automacoes' },
}

interface AutomacoesPageProps {
  searchParams: Promise<{ auth?: string }>
}

function LockedPane({ invalid }: { invalid: boolean }) {
  return (
    <main className={styles.lockShell}>
      <section className={styles.lockPanel} aria-labelledby="automation-lock-title">
        <div className={styles.lockIcon} aria-hidden="true">
          <LockKeyhole size={22} />
        </div>
        <p className={styles.kicker}>pierrondi.dev / automacoes</p>
        <h1 id="automation-lock-title">Control pane privado.</h1>
        <p>
          Esta rota mostra sinais locais de automações, coders, LLMs e Railway.
          Use o token de visualização configurado no provider.
        </p>
        <form className={styles.lockForm} method="post" action="/api/automation-control/session">
          <label htmlFor="token">Token de acesso</label>
          <div className={styles.lockInputRow}>
            <input
              id="token"
              name="token"
              type="password"
              autoComplete="current-password"
              placeholder="AUTOMATION_CONTROL_VIEW_TOKEN"
              required
            />
            <button type="submit">Entrar</button>
          </div>
          {invalid && <span className={styles.lockError}>Token inválido ou ausente.</span>}
        </form>
      </section>
    </main>
  )
}

export default async function AutomacoesPage({ searchParams }: AutomacoesPageProps) {
  const [cookieStore, params] = await Promise.all([cookies(), searchParams])
  const session = cookieStore.get(AUTOMATION_CONTROL_COOKIE)?.value
  const authorized = verifySessionCookie(session)

  if (!authorized) return <LockedPane invalid={params.auth === 'invalid'} />

  const snapshot = await readAutomationSnapshot()

  return <AutomationControlPane snapshot={snapshot} />
}
