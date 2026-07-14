import type { HomeLang } from '@/lib/i18n/site-language'
import type { SectionId } from '@/components/home-v2/types'

export type PublicNavKey = 'bio' | 'work' | 'studio' | 'portfolio' | 'proof' | 'ideas' | 'contact'

export interface PublicNavLink {
  key: PublicNavKey
  label: string
  href: string
  homeSection?: SectionId
}

interface PublicNavCopy {
  aria: string
  logoAria: string
  homeHref: string
  menuOpen: string
  menuClose: string
  links: PublicNavLink[]
}

export const PUBLIC_NAV_COPY: Record<HomeLang, PublicNavCopy> = {
  pt: {
    aria: 'Navegação principal',
    logoAria: 'Pierrondi.dev — página inicial',
    homeHref: '/',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    links: [
      { key: 'bio', label: 'Bio', href: '/about', homeSection: 'about' },
      { key: 'work', label: 'Atuação', href: '/atuacao', homeSection: 'skills' },
      { key: 'studio', label: 'Studio', href: '/studio' },
      { key: 'portfolio', label: 'Portfólio', href: '/portfolio', homeSection: 'projects' },
      { key: 'proof', label: 'Feitos', href: '/feitos' },
      { key: 'ideas', label: 'Ideias', href: '/blog' },
      { key: 'contact', label: 'Contato', href: '/contato', homeSection: 'contact' },
    ],
  },
  en: {
    aria: 'Main navigation',
    logoAria: 'Pierrondi.dev — home',
    homeHref: '/en',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    links: [
      { key: 'bio', label: 'About', href: '/en/about', homeSection: 'about' },
      { key: 'work', label: 'Work', href: '/en/atuacao', homeSection: 'skills' },
      { key: 'studio', label: 'Studio', href: '/en/studio' },
      { key: 'portfolio', label: 'Portfolio', href: '/en/portfolio', homeSection: 'projects' },
      { key: 'proof', label: 'Proof', href: '/en/feitos' },
      { key: 'ideas', label: 'Ideas', href: '/en/blog' },
      { key: 'contact', label: 'Contact', href: '/en/contato', homeSection: 'contact' },
    ],
  },
}
