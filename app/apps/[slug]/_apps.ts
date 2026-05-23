// Shared catalog for /apps/[slug] (canonical landing) and /apps/[slug]/[doc] (legal).
// Add a new app entry here once and both routes pick it up.

export interface AppEntry {
  name: string
  category: string
  contactSubject: string
  tagline?: string
  description?: string
  appStoreUrl?: string
}

export const APPS = {
  faithschool: {
    name: 'FaithSchool',
    category: 'Christian homeschool planning and family records app',
    contactSubject: 'FaithSchool Support',
  },
  provadoria: {
    name: 'ProvadorIA',
    category: 'AI-assisted outfit preview and style planning app',
    contactSubject: 'ProvadorIA Support',
  },
  voudeque: {
    name: 'VouDeQue',
    category: 'AI-assisted outfit challenge and wardrobe idea app',
    contactSubject: 'VouDeQue Support',
  },
  investcoach: {
    name: 'InvestCoach.AI',
    category: 'Financial planning and education app',
    contactSubject: 'InvestCoach Support',
  },
  mytone: {
    name: 'MyTone Studio',
    category: 'AI-assisted ringtone creation app',
    contactSubject: 'MyTone Support',
  },
  'bandle-br': {
    name: 'Bandle BR',
    category: 'Daily Brazilian music quiz app',
    contactSubject: 'Bandle BR Support',
  },
  'parabens-ia-br': {
    name: 'Parabens IA BR',
    category: 'Personalized birthday message and video app',
    contactSubject: 'Parabens IA BR Support',
  },
  adivinha: {
    name: 'Adivinha!',
    category: 'Music quiz app',
    contactSubject: 'Adivinha Support',
  },
  privytext: {
    name: 'PrivyText AI',
    category: '100% on-device private text analysis app',
    contactSubject: 'PrivyText AI Support',
    tagline: 'Private text analysis that never leaves your iPhone.',
    description:
      'PrivyText AI runs entirely on your device. No accounts, no servers, no telemetry on the text you analyze — your notes, chats and snippets stay local by design.',
  },
  scanvault: {
    name: 'ScanVault',
    category: 'Private on-device receipt and document scanner app',
    contactSubject: 'ScanVault Support',
    tagline: 'A private scanner cofre for your receipts and documents.',
    description:
      'ScanVault uses Apple VisionKit to scan receipts and documents directly on your iPhone or iPad. Files stay in your local cofre — no cloud upload, no account required to use the core scanner.',
    appStoreUrl: 'https://apps.apple.com/app/id6772389375',
  },
  habitdot: {
    name: 'HabitDot',
    category: 'Minimalist on-device daily habit tracker app',
    contactSubject: 'HabitDot Support',
    tagline: 'One dot a day. A quieter way to build habits.',
    description:
      'HabitDot is a minimalist daily habit tracker. Tap a dot, see your streak, keep going. Data stays on your device — no account, no sync, no noise.',
    appStoreUrl: 'https://apps.apple.com/app/id6772399435',
  },
} satisfies Record<string, AppEntry>

export type AppSlug = keyof typeof APPS

export function isAppSlug(slug: string): slug is AppSlug {
  return slug in APPS
}

export function getApp(slug: AppSlug): AppEntry {
  return APPS[slug]
}
