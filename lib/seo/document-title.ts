/** Rendered `<title>` budget from the technical SEO sweep. The root template is `%s | pierrondi.dev`. */
export const TITLE_BRAND_SUFFIX = ' | pierrondi.dev'
export const RENDERED_TITLE_MIN = 30
export const RENDERED_TITLE_MAX = 60

export function renderedTitleLength(title: string): number {
  return [...`${title}${TITLE_BRAND_SUFFIX}`].length
}

/**
 * App names alone render under 30 characters once the brand suffix is added.
 * Append a product qualifier only when that keeps the rendered title inside 30–60.
 */
export function appDocumentTitle(name: string): string {
  if (renderedTitleLength(name) >= RENDERED_TITLE_MIN) return name
  const withKind = `${name} — iOS app`
  const length = renderedTitleLength(withKind)
  if (length >= RENDERED_TITLE_MIN && length <= RENDERED_TITLE_MAX) return withKind
  return name
}
