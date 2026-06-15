import type { Metadata } from 'next'
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
      <main>
        <QuizContent />
      </main>
      <WhatsApp />
    </>
  )
}
