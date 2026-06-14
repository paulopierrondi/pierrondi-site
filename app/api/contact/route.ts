import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const contactRateLimit = createRateLimit(5, 15 * 60 * 1000)

const FORMSPREE_URL =
  process.env.FORMSPREE_URL ??
  process.env.NEXT_PUBLIC_FORMSPREE_URL ??
  'https://formspree.io/f/xpqoodnr'

const contactSchema = z.object({
  nome: z.string().min(1).max(256),
  email: z.string().email().max(255),
  empresa: z.string().max(256).optional().nullable(),
  servico: z.string().max(64).optional().nullable(),
  mensagem: z.string().min(1).max(4000),
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

function firstString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value : ''
}

async function readContactPayload(request: Request) {
  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return request.json()
  }

  const formData = await request.formData()

  return {
    nome: firstString(formData.get('nome')),
    email: firstString(formData.get('email')),
    empresa: firstString(formData.get('empresa')),
    servico: firstString(formData.get('servico')),
    mensagem: firstString(formData.get('mensagem')),
    trackingContext: {
      landingPage: firstString(formData.get('landingPage')),
      campaignId: firstString(formData.get('campaignId')),
      thesisId: firstString(formData.get('thesisId')),
      referrer: firstString(formData.get('referrer')),
      utmSource: firstString(formData.get('utmSource')),
    },
    _gotcha: firstString(formData.get('_gotcha')),
  }
}

function wantsJsonResponse(request: Request) {
  const accept = request.headers.get('accept') ?? ''
  const contentType = request.headers.get('content-type') ?? ''
  return accept.includes('application/json') || contentType.includes('application/json')
}

function redirectToContact(request: Request, status: 'ok' | 'invalid' | 'error') {
  return NextResponse.redirect(new URL(`/?contact=${status}#contact`, request.url), 303)
}

export async function POST(request: Request): Promise<Response> {
  const wantsJson = wantsJsonResponse(request)

  const ip = getClientIp(request)
  const rateLimit = contactRateLimit.check(ip)
  if (!rateLimit.allowed) {
    if (!wantsJson) return redirectToContact(request, 'error')
    return NextResponse.json({ error: 'rate_limited', retryAfter: rateLimit.retryAfter }, { status: 429 })
  }

  let payload: z.infer<typeof contactSchema>

  try {
    payload = contactSchema.parse(await readContactPayload(request))
  } catch (error) {
    if (!wantsJson) return redirectToContact(request, 'invalid')

    return NextResponse.json(
      { error: 'invalid_body', detail: error instanceof Error ? error.message : 'parse error' },
      { status: 400 },
    )
  }

  if (payload._gotcha && payload._gotcha.length > 0) {
    return wantsJson ? NextResponse.json({ ok: true }, { status: 200 }) : redirectToContact(request, 'ok')
  }

  const tc = payload.trackingContext ?? {}

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
        empresa: payload.empresa ?? '',
        servico: payload.servico ?? '',
        mensagem: payload.mensagem,
        _subject: `Novo lead pierrondi.dev - ${payload.servico ?? 'sem servico'}`,
        landingPage: tc.landingPage ?? '',
        campaignId: tc.campaignId ?? '',
        thesisId: tc.thesisId ?? '',
        referrer: tc.referrer ?? '',
        utm_source: tc.utmSource ?? '',
      }),
    })
  } catch {
    if (!wantsJson) return redirectToContact(request, 'error')

    return NextResponse.json({ error: 'formspree_unreachable' }, { status: 502 })
  }

  if (!formspreeRes.ok) {
    if (!wantsJson) return redirectToContact(request, 'error')

    return NextResponse.json(
      { error: 'formspree_failed', status: formspreeRes.status },
      { status: 502 },
    )
  }

  return wantsJson ? NextResponse.json({ ok: true }) : redirectToContact(request, 'ok')
}
