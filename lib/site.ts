const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

export const SITE_URL =
  configuredSiteUrl === 'https://pierrondi.dev'
    ? 'https://www.pierrondi.dev'
    : configuredSiteUrl ?? 'https://www.pierrondi.dev'
