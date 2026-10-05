export const CONTACT = {
  email: 'pierrondi@gmail.com',
  linkedin: 'https://br.linkedin.com/in/paulopierrondi',
  github: 'https://github.com/paulopierrondi',
  x: 'https://x.com/paulopierrondi',
  whatsapp: {
    display: '+55 11 99626-2975',
    phone: '5511996262975',
  },
} as const

/** Official public profiles. X is the confirmed personal account; do not add other networks. */
export const OFFICIAL_SAME_AS = [CONTACT.linkedin, CONTACT.github, CONTACT.x] as const

export function getWhatsAppHref(message: string) {
  return `https://wa.me/${CONTACT.whatsapp.phone}?text=${encodeURIComponent(message)}`
}
