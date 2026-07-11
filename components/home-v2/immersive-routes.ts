// Routes where the home-v2 immersive experience owns the full chrome
// (its own nav, dots, footer/contact). The global SiteNav, SiteFooter,
// LanguageSwitcher and HomeBackground must not render on these routes.
const IMMERSIVE_HOME_ROUTES = new Set(['/', '/en'])

export function isImmersiveHomeRoute(pathname: string): boolean {
  return IMMERSIVE_HOME_ROUTES.has(pathname)
}
