import type { Metadata } from 'next'
import KommoExperience from './KommoExperience'

export const metadata: Metadata = {
  title: 'Kommo — Implantação CRM · Camila Ferraz',
  description:
    'Entrega da implantação do Kommo CRM para Camila Ferraz: dois funis (Clínica e Cursos), campos, tags e triagem validada. Página de validação.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: {
    canonical: 'https://www.pierrondi.dev/kommo',
  },
  openGraph: {
    title: 'Kommo — Implantação CRM · Camila Ferraz',
    description:
      'Dois funis separados, campos e tags padronizados, triagem validada. Pronto para operação.',
    url: 'https://www.pierrondi.dev/kommo',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Kommo — Camila Ferraz' }],
  },
}

export default function KommoPage() {
  return <KommoExperience />
}
