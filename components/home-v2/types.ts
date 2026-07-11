// Shared types for the pierrondi.dev home redesign (home-v2).
// This file is the single contract between copy, sections and the orchestrator.

export type Lang = 'pt' | 'en'

export type SectionId = 'hero' | 'projects' | 'about' | 'skills' | 'contact'

export interface CTA {
  label: string
  href: string
}

export interface SectionMeta {
  id: SectionId
  /** Short label shown bottom-left, lowercase, e.g. 'hero', 'projetos' */
  label: string
  /** Index shown next to dots, e.g. '01' */
  index: string
}

export interface NavCopy {
  /** Logo text with decorative brackets, e.g. '<pierrondi.dev/>' */
  logo: string
  links: { label: string; target: SectionId }[]
}

export interface HeroCopy {
  /** Terminal-style tagline typed above the headline, e.g. '$ whoami' */
  tagline: string
  /** Line 1 of the display headline, e.g. 'Paulo Pierrondi' */
  headlineLine1: string
  /** Line 2, terminal style with cursor, e.g. '$ build_ai_systems()' */
  headlineLine2: string
  /** 1-2 sentence supporting description */
  description: string
  ctaPrimary: CTA
  ctaSecondary: CTA
  /** Small mono badges under the description, max 4, e.g. 'AI Architect' */
  badges: string[]
}

export type MockupKind = 'code' | 'terminal' | 'dashboard'

export type MockupTone =
  | 'keyword'
  | 'string'
  | 'function'
  | 'comment'
  | 'plain'
  | 'prompt'
  | 'output'

export interface MockupLine {
  text: string
  tone?: MockupTone
}

export interface ProjectStat {
  value: string
  label: string
}

export interface ProjectItem {
  id: string
  /** Optional production/status badge, e.g. { label: 'Em produção', live: true } */
  status?: { label: string; live?: boolean }
  /** Index label, e.g. '02.1' */
  number: string
  title: string
  /** Short role/category line, e.g. 'Framework · Multi-agent operations' */
  subtitle: string
  description: string
  tech: string[]
  stats: ProjectStat[]
  mockup: {
    kind: MockupKind
    windowTitle: string
    /** Footer status line inside the mockup, e.g. '~/projects/agents-hub' */
    statusLine: string
    lines: MockupLine[]
  }
  ctaPrimary?: CTA
  ctaSecondary?: CTA
}

export interface AboutStat {
  value: string
  label: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export interface AboutCopy {
  heading: string
  /** Bio paragraphs (2-3), broad positioning: full-stack + AI/automation architect + enterprise account director */
  bio: string[]
  stats: AboutStat[]
  testimonials: Testimonial[]
}

export interface SkillItem {
  name: string
  /** Optional short qualifier, e.g. 'multi-agent' */
  note?: string
}

export interface SkillCategory {
  title: string
  /** Lucide icon name in kebab or Pascal case understood by the section, e.g. 'Bot' */
  icon?: string
  skills: SkillItem[]
}

export interface SkillsCopy {
  heading: string
  intro?: string
  categories: SkillCategory[]
}

export interface ContactCopy {
  heading: string
  intro: string
  email: string
  form: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitLabel: string
    successMessage: string
    errorMessage: string
  }
  /** External links: LinkedIn, GitHub, etc. */
  links: { label: string; href: string }[]
  footer: {
    /** Single footer line, e.g. '© 2026 Paulo Pierrondi — built with Next.js' */
    line: string
    nav: CTA[]
  }
}

export interface SiteCopy {
  nav: NavCopy
  sections: SectionMeta[]
  hero: HeroCopy
  projects: { heading: string; items: ProjectItem[] }
  about: AboutCopy
  skills: SkillsCopy
  contact: ContactCopy
}

export interface SectionProps {
  lang: Lang
}
