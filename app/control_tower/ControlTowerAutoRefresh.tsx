'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const REFRESH_INTERVAL_MS = 60 * 60 * 1000

export default function ControlTowerAutoRefresh() {
  const router = useRouter()

  useEffect(() => {
    const interval = window.setInterval(() => {
      router.refresh()
    }, REFRESH_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [router])

  return null
}
