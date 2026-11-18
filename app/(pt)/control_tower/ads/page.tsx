import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { AUTOMATION_CONTROL_COOKIE, verifySessionCookie } from '@/lib/automation-control/auth'
import { readAdsSnapshot } from '@/lib/ads-control/storage'
import AdsDashboard, { AdsLocked } from '@/app/control_tower/ads/AdsDashboard'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Ads Performance · Control Tower',
  description: 'Performance diária de anúncios por produto, plataforma, canal e criativo, com recomendações.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/control_tower/ads' },
}

interface AdsPageProps {
  searchParams: Promise<{ auth?: string }>
}

export default async function AdsControlPage({ searchParams }: AdsPageProps) {
  const [cookieStore, params] = await Promise.all([cookies(), searchParams])
  // Gasto de mídia: exige sessão válida (mais estrito que a visualização do /control_tower).
  if (!verifySessionCookie(cookieStore.get(AUTOMATION_CONTROL_COOKIE)?.value)) {
    return <AdsLocked invalid={params.auth === 'invalid'} />
  }
  return <AdsDashboard snapshot={await readAdsSnapshot()} />
}
