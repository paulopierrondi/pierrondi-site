'use client'

import { useEffect } from 'react'
import { HTML_LANG, type Lang } from '@/lib/i18n/home-copy'

export default function LangSync({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])
  return null
}
