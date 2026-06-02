'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CONTROL_TOWER_REFRESH_MS = 60 * 60 * 1000

export default function ControlTowerAutoRefresh() {
  const router = useRouter()

  useEffect(() => {
    const timer = window.setInterval(() => {
      router.refresh()
    }, CONTROL_TOWER_REFRESH_MS)

    return () => window.clearInterval(timer)
  }, [router])

  return null
}
