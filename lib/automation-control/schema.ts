import { z } from 'zod'

const statusSchema = z.enum(['green', 'yellow', 'red', 'unknown'])
const kimiCodeLaneSchema = z.object({
  lane: z.enum(['low', 'mid']),
  title: z.string().min(1).max(120),
  description: z.string().max(500),
  total: z.number().int().nonnegative(),
  loaded: z.number().int().nonnegative(),
  running: z.number().int().nonnegative(),
  dormant: z.number().int().nonnegative(),
  gated: z.number().int().nonnegative(),
  items: z
    .array(
      z.object({
        id: z.string().min(1).max(160),
        label: z.string().min(1).max(200),
        status: z.string().min(1).max(80),
        risk: z.enum(['report_only', 'gated']),
        disabled: z.boolean(),
        runAtLoad: z.boolean(),
        loaded: z.boolean(),
        running: z.boolean(),
        lastExit: z.string().max(80).nullable().optional(),
        plist: z.string().max(800).nullable().optional(),
        action: z.string().max(500),
      }),
    )
    .max(80),
})

export const automationControlSnapshotSchema = z.object({
  schemaVersion: z.literal('1.0'),
  collectedAt: z.string().datetime(),
  machine: z.object({
    hostname: z.string().min(1).max(255),
    user: z.string().max(255).optional(),
    platform: z.string().max(255).optional(),
  }),
  railway: z.object({
    linked: z.boolean(),
    project: z.string().max(255).optional(),
    environment: z.string().max(255).optional(),
    service: z.string().max(255).optional(),
    statusOutput: z.string().max(2000).optional(),
  }),
  summary: z.object({
    overallStatus: statusSchema,
    activeRecent: z.number().int().nonnegative(),
    failed: z.number().int().nonnegative(),
    blocked: z.number().int().nonnegative(),
    silentOrStale: z.number().int().nonnegative(),
    noEvidence: z.number().int().nonnegative(),
    manualOk: z.number().int().nonnegative(),
    logsTracked: z.number().int().nonnegative(),
    launchAgentsTracked: z.number().int().nonnegative(),
    codexAutomations: z.number().int().nonnegative(),
    openHandoffs: z.number().int().nonnegative(),
  }),
  coders: z
    .array(
      z.object({
        name: z.string().min(1).max(80),
        active: z.number().int().nonnegative(),
        failed: z.number().int().nonnegative(),
        blocked: z.number().int().nonnegative(),
        silentOrStale: z.number().int().nonnegative(),
        noEvidence: z.number().int().nonnegative(),
        manualOk: z.number().int().nonnegative(),
        total: z.number().int().nonnegative(),
        recommendation: z.string().max(500),
      }),
    )
    .max(30),
  llms: z
    .array(
      z.object({
        name: z.string().min(1).max(80),
        available: z.boolean(),
        cliPath: z.string().max(500).nullable().optional(),
        activeProcesses: z.number().int().nonnegative(),
        recentJobs: z.number().int().nonnegative(),
        lastSignal: z.string().max(500).nullable().optional(),
        status: statusSchema,
      }),
    )
    .max(30),
  automations: z
    .array(
      z.object({
        id: z.string().min(1).max(160),
        surface: z.string().max(80),
        status: z.string().max(80),
        lastSeen: z.string().datetime().optional(),
        ageLabel: z.string().max(40).optional(),
        signal: z.string().max(500),
        evidence: z.string().max(800).optional(),
        action: z.string().max(500),
      }),
    )
    .max(200),
  kimiCodeLanes: z.array(kimiCodeLaneSchema).max(2).optional(),
  decisions: z
    .array(
      z.object({
        priority: z.enum(['P0', 'P1', 'P2']),
        title: z.string().min(1).max(160),
        type: z.enum(['act', 'monitor', 'ignore', 'investigate']),
        rationale: z.string().max(800),
        nextAction: z.string().max(800),
        evidence: z.string().max(800).optional(),
      }),
    )
    .max(80),
  reports: z
    .array(
      z.object({
        name: z.string().min(1).max(120),
        path: z.string().min(1).max(800),
        generatedAt: z.string().max(120).optional(),
      }),
    )
    .max(40),
})
