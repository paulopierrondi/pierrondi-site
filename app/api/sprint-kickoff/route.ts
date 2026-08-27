import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const kickoffRateLimit = createRateLimit(3, 15 * 60 * 1000)

const FORMSPREE_URL =
  process.env.FORMSPREE_URL ??
  process.env.NEXT_PUBLIC_FORMSPREE_URL ??
  'https://formspree.io/f/xpqoodnr'

const kickoffSchema = z.object({
  nome: z.string().min(1).max(256),
  operacao: z.string().min(1).max(512),
  whatsapp: z.string().min(8).max(32),
  email: z.string().email().max(255),
  pagamento_comprovante: z.string().min(1).max(2000),
  processo_hoje: z.string().min(1).max(4000),
  volume: z.string().min(1).max(512),
  ferramentas: z.string().min(1).max(2000),
  acessos: z.string().min(1).max(2000),
  criterios_pronto: z.string().min(1).max(2000),
  nao_pode_quebrar: z.string().min(1).max(2000),
  stack_preferencia: z.string().min(1).max(128),
  ambiente: z.string().min(1).max(128),
  exemplo_real: z.string().min(1).max(2000),
  fuso_janela: z.string().min(1).max(512),
  _gotcha: z.string().optional().nullable(),
})

function formatKickoffMessage(payload: z.infer<typeof kickoffSchema>) {
  return [
    '=== SPRINT KICKOFF — Uma automação no ar ===',
    '',
    `Nome: ${payload.nome}`,
    `Operação: ${payload.operacao}`,
    `WhatsApp: ${payload.whatsapp}`,
    `Email: ${payload.email}`,
    '',
    '--- Pagamento ---',
    payload.pagamento_comprovante,
    '',
    '--- Processo de hoje ---',
    payload.processo_hoje,
    '',
    `Volume: ${payload.volume}`,
    '',
    '--- Ferramentas ---',
    payload.ferramentas,
    '',
    '--- Acessos no kickoff ---',
    payload.acessos,
    '',
    '--- O que é pronto (3 frases testáveis) ---',
    payload.criterios_pronto,
    '',
    '--- O que não pode quebrar ---',
    payload.nao_pode_quebrar,
    '',
    `Stack: ${payload.stack_preferencia}`,
    `Ambiente: ${payload.ambiente}`,
    '',
    '--- Exemplo real ---',
    payload.exemplo_real,
    '',
    `Fuso / janela: ${payload.fuso_janela}`,
  ].join('\n')
}

export async function POST(request: Request): Promise<Response> {
  const ip = getClientIp(request)
  const rateLimit = kickoffRateLimit.check(ip)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'rate_limited', retryAfter: rateLimit.retryAfter }, { status: 429 })
  }

  let payload: z.infer<typeof kickoffSchema>

  try {
    payload = kickoffSchema.parse(await request.json())
  } catch (error) {
    return NextResponse.json(
      { error: 'invalid_body', detail: error instanceof Error ? error.message : 'parse error' },
      { status: 400 },
    )
  }

  if (payload._gotcha && payload._gotcha.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const mensagem = formatKickoffMessage(payload)

  let formspreeRes: Response
  try {
    formspreeRes = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: payload.nome,
        nome: payload.nome,
        email: payload.email,
        _replyto: payload.email,
        operacao: payload.operacao,
        whatsapp: payload.whatsapp,
        servico: 'sprint-kickoff',
        mensagem,
        _subject: `Sprint Kickoff — ${payload.nome} · ${payload.operacao}`,
      }),
    })
  } catch {
    return NextResponse.json({ error: 'formspree_unreachable' }, { status: 502 })
  }

  if (!formspreeRes.ok) {
    return NextResponse.json(
      { error: 'formspree_failed', status: formspreeRes.status },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
