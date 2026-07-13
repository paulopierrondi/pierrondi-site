// Routes where the home-v2 immersive experience owns the full chrome
// (its own nav, dots, footer/contact). The global SiteNav, SiteFooter,
// LanguageSwitcher and HomeBackground must not render on these routes.
const IMMERSIVE_HOME_ROUTES = new Set(['/', '/en'])
const HOME_CHROME_ROUTES = new Set(['/', '/en', '/feitos', '/en/feitos'])

export function isImmersiveHomeRoute(pathname: string): boolean {
  return IMMERSIVE_HOME_ROUTES.has(pathname)
}

// /feitos keeps its own scrollable content and footer, but its public header
// is deliberately the exact home-v2 chrome rather than a second site identity.
export function usesHomeChrome(pathname: string): boolean {
  return HOME_CHROME_ROUTES.has(pathname)
}

// Internal tools that render their own complete app shell (nav, chrome,
// footer) — the public marketing SiteNav/SiteFooter must not layer on top
// of these. Not public brand pages, so they don't need to look like one.
const OWN_APP_CHROME_PREFIXES = ['/crm', '/control_tower', '/automacoes']

export function usesOwnAppChrome(pathname: string): boolean {
  return OWN_APP_CHROME_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}
