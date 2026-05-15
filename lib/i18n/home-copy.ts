import ptMessages from './messages/pt.json'
import enMessages from './messages/en.json'

export type Lang = 'pt' | 'en'

export const SUPPORTED_LANGS: Lang[] = ['pt', 'en']

export const LANG_PATHS: Record<Lang, string> = {
  pt: '/',
  en: '/en',
}

export const HTML_LANG: Record<Lang, string> = {
  pt: 'pt-BR',
  en: 'en-US',
}

interface HomeCopy {
  nav: {
    links: { label: string; href: string }[]
    cta: string
    menuOpen: string
    menuClose: string
    langToggleAria: string
  }
  hero: {
    eyebrow: string
    headlineLines: [string, string, string]
    headlineEm: string
    body: string
    ctaPrimary: string
    ctaSecondary: string
    ctaStudio: string
    promise: string[]
    proofStats: { value: string; label: string }[]
    proofBadges: string[]
    proofKicker: string
    proofTitle: string
    proofTag: string
    proofImageAlt: string
    proofCta: string
  }
  marquee: string[]
  problem: {
    eyebrow: string
    titleLines: [string, string, string]
    titleEm: string
    body: string
    pains: { number: string; title: string; text: string }[]
  }
  about: {
    eyebrow: string
    titleLines: [string, string, string]
    titleEm: string
    body: string
    principles: { title: string; desc: string }[]
  }
  metrics: {
    eyebrow: string
    note: string
    items: { value: number; label: string }[]
  }
  portfolio: {
    eyebrow: string
    titleLines: [string, string, string]
    titleEm: string
    body: string
    fullPortfolio: string
    items: {
      title: string
      href: string
      label: string
      image: string
      description: string
      proof: string[]
    }[]
    seeDelivery: string
    supporting: string[]
  }
  services: {
    eyebrow: string
    titleLines: [string, string, string]
    titleEm: string
    body: string
    talk: string
    items: {
      number: string
      title: string
      price: string
      timeline: string
      description: string
      items: string[]
    }[]
  }
  process: {
    eyebrow: string
    titleLines: [string, string, string]
    titleEm: string
    steps: {
      number: string
      label: string
      title: string
      description: string
    }[]
  }
  contact: {
    eyebrow: string
    titleLines: [string, string, string]
    titleEm: string
    body: string
    points: string[]
    fields: {
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      company: string
      companyPlaceholder: string
      service: string
      serviceDefault: string
      serviceOptions: { value: string; label: string }[]
      message: string
      messagePlaceholder: string
      submit: string
      submitting: string
      submitOk: string
      submitError: string
    }
    errors: {
      name: string
      email: string
      service: string
      message: string
    }
  }
  footer: {
    desc: string
    links: { label: string; href: string }[]
    location: string
    copyright: string
  }
  mobileCta: string
  whatsappAria: string
  whatsappMessage: string
}

export const home: Record<Lang, HomeCopy> = {
  pt: ptMessages as HomeCopy,
  en: enMessages as HomeCopy,
}
