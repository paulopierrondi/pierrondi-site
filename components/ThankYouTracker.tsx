'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function ThankYouTracker() {
  useEffect(() => {
    trackEvent('ThankYou_Viewed', { nextStep: 'reply-or-whatsapp' })
  }, [])

  return null
}
