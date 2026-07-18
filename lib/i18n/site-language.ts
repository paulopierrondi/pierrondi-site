export type HomeLang = 'pt' | 'en'

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
  '/atuacao': { pt: '/atuacao', en: '/en/atuacao' },
  '/en/atuacao': { pt: '/atuacao', en: '/en/atuacao' },
  '/studio': { pt: '/studio', en: '/en/studio' },
  '/en/studio': { pt: '/studio', en: '/en/studio' },
  '/contato': { pt: '/contato', en: '/en/contato' },
  '/en/contato': { pt: '/contato', en: '/en/contato' },
  '/blog': { pt: '/blog', en: '/en/blog' },
  '/en/blog': { pt: '/blog', en: '/en/blog' },
  '/feitos': { pt: '/feitos', en: '/en/feitos' },
  '/en/feitos': { pt: '/feitos', en: '/en/feitos' },
  '/citations': { pt: '/citations', en: '/citations' },
  '/en/citations': { pt: '/citations', en: '/citations' },
  '/privacidade': { pt: '/privacidade', en: '/privacy' },
  '/privacy': { pt: '/privacidade', en: '/privacy' },
  '/termos': { pt: '/termos', en: '/terms' },
  '/terms': { pt: '/termos', en: '/terms' },
}

const languageSwitcherHiddenPrefixes = [
  '/ai-search',
  '/answers',
  '/apps',
  '/bradesco-26',
  '/citations',
  '/crm',
  '/design',
  '/fso',
  '/itau',
  '/kommo',
  '/obrigado',
  '/paulo',
  '/whypaulo',
  '/control_tower',
  '/automacoes',
]

export function getCurrentLanguage(pathname: string): HomeLang {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (
    pathname === '/ai-search' ||
    pathname === '/answers' ||
    pathname === '/citations'
  ) {
    return 'en'
  }
  if (pathname === '/privacy' || pathname === '/terms') return 'en'
  if (pathname === '/fso' || pathname.startsWith('/fso/')) return 'en'
  if (pathname === '/apps' || pathname.startsWith('/apps/')) return 'en'
  return 'pt'
}

export function shouldHideLanguageSwitcher(pathname: string) {
  const normalizedPath = pathname || '/'
  // Article details are canonical PT only; the /en/blog/:slug shape 308s here.
  // Do not present a language choice that immediately returns the visitor to
  // the same article.
  if (
    normalizedPath.startsWith('/blog/') ||
    normalizedPath.startsWith('/feitos/')
  ) {
    return true
  }

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
