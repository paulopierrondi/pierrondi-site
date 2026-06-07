import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import {
  AUTOMATION_CONTROL_COOKIE,
  publicControlTowerActionsEnabled,
  verifySessionCookie,
} from '@/lib/automation-control/auth'
import { readAutomationSnapshot } from '@/lib/automation-control/storage'
import { readCreativeSnapshot } from '@/lib/creative-control/storage'
import {
  readPlanApprovals,
  readPlansSnapshot,
} from '@/lib/control-tower/plan-storage'
import type { PlanApprovalView } from '@/lib/control-tower/plan-view'
import ControlTower from './ControlTower'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Agent Ops Control Tower',
  description:
    'Painel operacional para acompanhar agentes, automações, worktrees, handoffs, riscos e próximas ações.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/control_tower' },
}

export default async function ControlTowerPage() {
  const [cookieStore, snapshot, creative, plansSnapshot, approvals] = await Promise.all([
    cookies(),
    readAutomationSnapshot(),
    readCreativeSnapshot(),
    readPlansSnapshot(),
    readPlanApprovals(),
  ])
  const session = cookieStore.get(AUTOMATION_CONTROL_COOKIE)?.value
  const actionsEnabled = verifySessionCookie(session) || publicControlTowerActionsEnabled()
  const planApprovals = Object.fromEntries(
    Object.entries(approvals).map(([planId, record]) => [
      planId,
      {
        status: record.status,
        action_at_utc: record.action_at_utc,
        expires_at_utc: record.expires_at_utc,
      } satisfies PlanApprovalView,
    ]),
  )

  return (
    <ControlTower
      snapshot={snapshot}
      creative={creative}
      plans={plansSnapshot?.plans ?? []}
      planApprovals={planApprovals}
      actionsEnabled={actionsEnabled}
    />
  )
}
