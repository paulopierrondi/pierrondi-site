import type { HomeLang } from '@/app/home-experience-copy'

export const siteLanguages: Array<{ code: HomeLang; label: string; locale: string }> = [
  { code: 'pt', label: 'PT', locale: 'pt-BR' },
  { code: 'en', label: 'EN', locale: 'en-US' },
]

const localizedRoutes: Record<string, Record<HomeLang, string>> = {
  '/': { pt: '/', en: '/en' },
  '/en': { pt: '/', en: '/en' },
  '/privacidade': { pt: '/privacidade', en: '/privacy' },
  '/privacy': { pt: '/privacidade', en: '/privacy' },
  '/termos': { pt: '/termos', en: '/terms' },
  '/terms': { pt: '/termos', en: '/terms' },
  '/paulo': { pt: '/paulo', en: '/paulo' },
}

export function getCurrentLanguage(pathname: string): HomeLang {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/privacy' || pathname === '/terms') return 'en'
  return 'pt'
}

export function resolveLocalizedPath(pathname: string, targetLanguage: HomeLang) {
  const normalizedPath = pathname || '/'
  const mappedRoute = localizedRoutes[normalizedPath]

  if (mappedRoute) {
    return mappedRoute[targetLanguage]
  }

  if (targetLanguage === 'pt') {
    return normalizedPath === '/en' ? '/' : normalizedPath
  }

  return '/en'
}
