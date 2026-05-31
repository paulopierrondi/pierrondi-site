import { z } from 'zod'

// ---------------------------------------------------------------------------
// PLANS QUEUE JSON (ingest payload pushed up by the hourly Kimi planner).
// Shape intentionally mirrors state/control-tower/code_review.json so that
// control-tower-refresh.py-style consumers stay uniform.
// ---------------------------------------------------------------------------

export const planStatusSchema = z.enum([
  'proposed',
  'pending_approval',
  'approved',
  'in_progress',
  'done',
  'verified',
  'rejected',
  'deferred',
  'expired',
])

export type PlanStatus = z.infer<typeof planStatusSchema>

export const planRiskClassSchema = z.enum(['low', 'medium'])

export type PlanRiskClass = z.infer<typeof planRiskClassSchema>

export const planSummarySchema = z.object({
  planId: z.string().min(1).max(160),
  project: z.string().min(1).max(120),
  title: z.string().min(1).max(200),
  summary: z.string().max(2000),
  status: planStatusSchema,
  risk_class: planRiskClassSchema,
  scope_files: z.array(z.string().min(1).max(400)).max(5),
  created_at_utc: z.string().datetime(),
})

export type PlanSummary = z.infer<typeof planSummarySchema>

export const plansSnapshotSchema = z.object({
  schemaVersion: z.literal('1.0'),
  generated_at_utc: z.string().datetime(),
  date: z.string().min(1).max(40),
  total: z.number().int().nonnegative(),
  pending: z.number().int().nonnegative(),
  approved: z.number().int().nonnegative(),
  in_progress: z.number().int().nonnegative(),
  done: z.number().int().nonnegative(),
  plans: z.array(planSummarySchema).max(500),
})

export type PlansSnapshot = z.infer<typeof plansSnapshotSchema>

// ---------------------------------------------------------------------------
// WEB DURABLE APPROVAL RECORD (persisted under AUTOMATION_CONTROL_DATA_DIR as
// plan-approvals.json). Keyed by planId. This is the down-sync source of truth
// the local cron polls before consuming a plan gate.
// ---------------------------------------------------------------------------

export const planApprovalStatusSchema = z.enum(['approved', 'rejected', 'deferred'])

export type PlanApprovalStatus = z.infer<typeof planApprovalStatusSchema>

export const planApprovalRecordSchema = z.object({
  status: planApprovalStatusSchema,
  action_at_utc: z.string().datetime(),
  sessionHash: z.string().min(1).max(64),
  // expires_at_utc is action_at_utc + 24h for an approve; null for reject/defer.
  expires_at_utc: z.string().datetime().nullable(),
})

export type PlanApprovalRecord = z.infer<typeof planApprovalRecordSchema>

export const planApprovalsSchema = z.record(z.string(), planApprovalRecordSchema)

export type PlanApprovals = z.infer<typeof planApprovalsSchema>

// ---------------------------------------------------------------------------
// PLAN ACTION REQUEST (human Approve/Defer/Reject from the session-gated UI).
// ---------------------------------------------------------------------------

export const planActionSchema = z.enum(['approve', 'defer', 'reject'])

export type PlanAction = z.infer<typeof planActionSchema>

export const planActionPayloadSchema = z.object({
  action: planActionSchema,
  planIds: z.array(z.string().min(1).max(160)).min(1).max(50),
})

export type PlanActionPayload = z.infer<typeof planActionPayloadSchema>
