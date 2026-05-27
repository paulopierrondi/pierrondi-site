import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { LockKeyhole } from 'lucide-react'

import {
  AUTOMATION_CONTROL_COOKIE,
  verifySessionCookie,
} from '@/lib/automation-control/auth'
import { readAutomationSnapshot } from '@/lib/automation-control/storage'
import ControlTower from './ControlTower'
import styles from './ControlTower.module.css'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Agent Ops Control Tower',
  description:
    'Painel privado para controlar agentes, automações, worktrees, handoffs, riscos e próximas ações operacionais.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/control_tower' },
}

interface ControlTowerPageProps {
  searchParams: Promise<{ auth?: string }>
}

function LockedControlTower({ invalid }: { invalid: boolean }) {
  return (
    <main className={styles.lockShell}>
      <section className={styles.lockPanel} aria-labelledby="control-tower-lock-title">
        <div className={styles.lockIcon} aria-hidden="true">
          <LockKeyhole size={22} />
        </div>
        <p className={styles.kicker}>pierrondi.dev / control_tower</p>
        <h1 id="control-tower-lock-title">Control Tower privado.</h1>
        <p>
          Esta rota consolida agentes, automações, repos, handoffs e gates.
          Use o token operacional configurado no provider.
        </p>
        <form className={styles.lockForm} method="post" action="/api/automation-control/session">
          <input type="hidden" name="next" value="/control_tower" />
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

export default async function ControlTowerPage({ searchParams }: ControlTowerPageProps) {
  const [cookieStore, params] = await Promise.all([cookies(), searchParams])
  const session = cookieStore.get(AUTOMATION_CONTROL_COOKIE)?.value
  const authorized = verifySessionCookie(session)

  if (!authorized) return <LockedControlTower invalid={params.auth === 'invalid'} />

  const snapshot = await readAutomationSnapshot()

  return <ControlTower snapshot={snapshot} />
}
