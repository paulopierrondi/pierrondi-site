'use client'

import { usePathname } from 'next/navigation'
import { isImmersiveHomeRoute } from '@/components/home-v2/immersive-routes'
import EnterpriseSwarmLoader from './EnterpriseSwarmLoader'

export default function HomeBackground() {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === '/en'
  if (!isHome || isImmersiveHomeRoute(pathname ?? '/')) return null
  return <EnterpriseSwarmLoader />
}
