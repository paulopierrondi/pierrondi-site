'use client'

import { useEffect } from 'react'
import type { HomeLang } from '@/app/home-experience-copy'

const HTML_LANG: Record<HomeLang, string> = {
  pt: 'pt-BR',
  en: 'en-US',
}

export default function LangSync({ lang }: { lang: HomeLang }) {
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])
  return null
}
