'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentLanguage } from '@/lib/i18n/site-language'

const HTML_LANG: Record<'pt' | 'en', string> = {
  pt: 'pt-BR',
  en: 'en-US',
}

export default function DocumentLangSync() {
  const pathname = usePathname() || '/'
  const lang = getCurrentLanguage(pathname)

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])

  return null
}
