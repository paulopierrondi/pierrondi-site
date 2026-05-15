import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Problem from '@/components/Problem'
import About from '@/components/About'
import Metrics from '@/components/Metrics'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import MobileCTA from '@/components/MobileCTA'
import LangSync from '@/components/LangSync'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
  },
}

export default function Home() {
  return (
    <>
      <LangSync lang="pt" />
      <Nav lang="pt" />
      <main>
        <Hero lang="pt" />
        <Marquee lang="pt" />
        <Problem lang="pt" />
        <About lang="pt" />
        <Metrics lang="pt" />
        <Portfolio lang="pt" />
        <Services lang="pt" />
        <Process lang="pt" />
        <Contact lang="pt" />
      </main>
      <Footer lang="pt" />
      <WhatsApp lang="pt" />
      <MobileCTA lang="pt" />
    </>
  )
}
