export const CONTACT = {
  email: 'pierrondi@gmail.com',
  linkedin: 'https://br.linkedin.com/in/paulopierrondi',
  github: 'https://github.com/paulopierrondi',
  whatsapp: {
    display: '+55 11 99626-2975',
    phone: '5511996262975',
  },
} as const

/** Official public profiles already published on-site (answers.json / geo.md / footer). Do not invent. */
export const OFFICIAL_SAME_AS = [CONTACT.linkedin, CONTACT.github] as const

export function getWhatsAppHref(message: string) {
  return `https://wa.me/${CONTACT.whatsapp.phone}?text=${encodeURIComponent(message)}`
}
