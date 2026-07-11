import { Inter, Space_Grotesk } from 'next/font/google'

export const hv2Body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hv2-body',
  display: 'swap',
})

export const hv2Display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-hv2-display',
  display: 'swap',
})
