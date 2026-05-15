import { NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FORMSPREE_URL =
  process.env.FORMSPREE_URL ??
  process.env.NEXT_PUBLIC_FORMSPREE_URL ??
  'https://formspree.io/f/xpqoodnr'

const contactSchema = z.object({
  nome: z.string().min(1).max(256),
  email: z.string().email().max(255),
  empresa: z.string().max(256).optional().nullable(),
  servico: z.string().max(64).optional().nullable(),
  mensagem: z.string().max(4000).optional().nullable(),
  trackingContext: z
    .object({
      landingPage: z.string().optional(),
      campaignId: z.string().optional(),
      thesisId: z.string().optional(),
      referrer: z.string().optional(),
      utmSource: z.string().optional(),
    })
    .optional(),
  _gotcha: z.string().optional().nullable(),
})

export async function POST(request: Request): Promise<Response> {
  let payload: z.infer<typeof contactSchema>
  try {
    payload = contactSchema.parse(await request.json())
  } catch (error) {
    return NextResponse.json(
      { error: 'invalid_body', detail: error instanceof Error ? error.message : 'parse error' },
      { status: 400 },
    )
  }

  if (payload._gotcha && payload._gotcha.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const tc = payload.trackingContext ?? {}

  const formspreeRes = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      nome: payload.nome,
      email: payload.email,
      empresa: payload.empresa ?? '',
      servico: payload.servico ?? '',
      mensagem: payload.mensagem ?? '',
      _subject: `Novo lead pierrondi.dev — ${payload.servico ?? 'sem serviço'}`,
      landingPage: tc.landingPage ?? '',
      campaignId: tc.campaignId ?? '',
      thesisId: tc.thesisId ?? '',
      referrer: tc.referrer ?? '',
      utm_source: tc.utmSource ?? '',
    }),
  })

  if (!formspreeRes.ok) {
    return NextResponse.json(
      { error: 'formspree_failed', status: formspreeRes.status },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
