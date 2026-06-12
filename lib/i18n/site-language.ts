import type { HomeLang } from '@/app/home-experience-copy'

export const siteLanguages: Array<{
  code: HomeLang
  label: string
  locale: string
  name: string
}> = [
  { code: 'pt', label: 'PT', locale: 'pt-BR', name: 'Português' },
  { code: 'en', label: 'EN', locale: 'en-US', name: 'English' },
]

const localizedRoutes: Record<string, Record<HomeLang, string>> = {
  '/': { pt: '/', en: '/en' },
  '/en': { pt: '/', en: '/en' },
  '/about': { pt: '/about', en: '/en/about' },
  '/en/about': { pt: '/about', en: '/en/about' },
  '/privacidade': { pt: '/privacidade', en: '/privacy' },
  '/privacy': { pt: '/privacidade', en: '/privacy' },
  '/termos': { pt: '/termos', en: '/terms' },
  '/terms': { pt: '/termos', en: '/terms' },
}

const languageSwitcherHiddenPrefixes = [
  '/bradesco-26',
  '/fso',
  '/itau',
  '/paulo',
  '/whypaulo',
  '/control_tower',
  '/automacoes',
]

export function getCurrentLanguage(pathname: string): HomeLang {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/privacy' || pathname === '/terms') return 'en'
  return 'pt'
}

export function shouldHideLanguageSwitcher(pathname: string) {
  const normalizedPath = pathname || '/'
  return languageSwitcherHiddenPrefixes.some(
    (prefix) =>
      normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  )
}

export function resolveLocalizedPath(
  pathname: string,
  targetLanguage: HomeLang,
  search = '',
  hash = '',
) {
  const normalizedPath = pathname || '/'
  const mappedRoute = localizedRoutes[normalizedPath]
  const normalizedSearch = search ? `?${search.replace(/^\?/, '')}` : ''
  const normalizedHash = hash ? `#${hash.replace(/^#/, '')}` : ''
  const suffix = `${normalizedSearch}${normalizedHash}`

  if (mappedRoute) {
    return `${mappedRoute[targetLanguage]}${suffix}`
  }

  if (targetLanguage === 'pt') {
    const ptPath = normalizedPath === '/en' ? '/' : normalizedPath.startsWith('/en/') ? normalizedPath.slice(3) || '/' : normalizedPath
    return `${ptPath}${suffix}`
  }

  const enPath = normalizedPath === '/' ? '/en' : normalizedPath.startsWith('/en/') ? normalizedPath : `/en${normalizedPath}`
  return `${enPath}${suffix}`
}
