export const CONTACT = {
  email: 'pierrondi@gmail.com',
  linkedin: 'https://br.linkedin.com/in/paulopierrondi',
  github: 'https://github.com/paulopierrondi',
  x: 'https://x.com/paulopierrondi',
  products: {
    cantu: 'https://cantustudio.app',
    faith: 'https://faithschool.app',
    agenticos: 'https://agenticoscore.ai',
  },
  whatsapp: {
    display: '+55 11 99626-2975',
    phone: '5511996262975',
  },
} as const

/**
 * Employment title stays first. Fractional is the public engagement role on
 * this site, not a ServiceNow title and not a replacement for the employer.
 */
export const PERSON_JOB_TITLES = [
  'Technical Account Executive',
  'Fractional AI Automation Officer',
] as const

/** Confirmed profiles plus owned product homepages already in the site graph. No other social networks. */
export const OFFICIAL_SAME_AS = [
  CONTACT.linkedin,
  CONTACT.github,
  CONTACT.x,
  CONTACT.products.cantu,
  CONTACT.products.faith,
  CONTACT.products.agenticos,
] as const

export function getWhatsAppHref(message: string) {
  return `https://wa.me/${CONTACT.whatsapp.phone}?text=${encodeURIComponent(message)}`
}
