export const CONTACT = {
  email: 'pierrondi@gmail.com',
  linkedin: 'https://br.linkedin.com/in/paulopierrondi',
  github: 'https://github.com/paulopierrondi',
  whatsapp: {
    display: '+55 12 98205-1155',
    phone: '5512982051155',
  },
} as const

export function getWhatsAppHref(message: string) {
  return `https://wa.me/${CONTACT.whatsapp.phone}?text=${encodeURIComponent(message)}`
}
