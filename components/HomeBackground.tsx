'use client'

import { usePathname } from 'next/navigation'
import EnterpriseSwarmLoader from './EnterpriseSwarmLoader'

export default function HomeBackground() {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === '/en'
  if (!isHome) return null
  return <EnterpriseSwarmLoader />
}
