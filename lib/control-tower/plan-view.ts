export interface PlanQueueItem {
  planId: string
  project: string
  title: string
  summary: string
  status: string
  risk_class: string
  scope_files: string[]
  created_at_utc: string
}

export type PlanApprovalViewStatus = 'approved' | 'deferred' | 'rejected'

export interface PlanApprovalView {
  status: PlanApprovalViewStatus
  action_at_utc: string
  expires_at_utc: string | null
}

export interface ResolvedPlan {
  plan: PlanQueueItem
  approval: PlanApprovalView
}

export interface PlanQueueSummary {
  pending: PlanQueueItem[]
  visible: PlanQueueItem[]
  resolved: ResolvedPlan[]
  pendingCount: number
  lowRiskCount: number
  mediumRiskCount: number
}

function isPendingPlan(plan: PlanQueueItem) {
  return plan.status === 'pending_approval' || plan.status === 'proposed'
}

export function isActivePlanApproval(
  approval: PlanApprovalView | undefined,
  nowMs = Date.now(),
) {
  if (!approval) return false
  if (approval.status !== 'approved') return true

  if (!approval.expires_at_utc) return false
  const expiresMs = Date.parse(approval.expires_at_utc)
  return Number.isFinite(expiresMs) && nowMs < expiresMs
}

export function summarizePlanQueue(
  plans: PlanQueueItem[],
  approvals: Record<string, PlanApprovalView> = {},
  nowMs = Date.now(),
): PlanQueueSummary {
  const pending = plans.filter(isPendingPlan)
  const visible: PlanQueueItem[] = []
  const resolved: ResolvedPlan[] = []

  for (const plan of pending) {
    const approval = approvals[plan.planId]
    if (isActivePlanApproval(approval, nowMs)) {
      resolved.push({ plan, approval })
    } else {
      visible.push(plan)
    }
  }

  return {
    pending,
    visible,
    resolved,
    pendingCount: visible.length,
    lowRiskCount: visible.filter((plan) => plan.risk_class === 'low').length,
    mediumRiskCount: visible.filter((plan) => plan.risk_class === 'medium').length,
  }
}
