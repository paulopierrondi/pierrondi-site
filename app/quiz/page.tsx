import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import QuizContent from './QuizContent'

export const metadata: Metadata = {
  title: 'Quiz — Precisa automatizar? | pierrondi.dev',
  description: 'Responda 4 perguntas rápidas e descubra qual serviço faz sentido para o seu negócio agora.',
  alternates: { canonical: '/quiz' },
}

export default function QuizPage() {
  return (
    <>
      <Nav />
      <main>
        <QuizContent />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
