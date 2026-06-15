'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import styles from './QuizContent.module.css'

interface Answer {
  question: string
  value: string
  score: Record<string, number>
}

const QUESTIONS = [
  {
    id: 'bottleneck',
    question: 'Qual é o maior gargalo do seu negócio hoje?',
    options: [
      { label: 'Processo manual que consome tempo da equipe', value: 'processo', scores: { automacao: 3, audit: 2 } },
      { label: 'Tenho uma ideia de produto/app mas não sai do papel', value: 'produto', scores: { 'produto-digital': 3, audit: 1 } },
      { label: 'Preciso de decisão técnica mas não tenho CTO', value: 'cto', scores: { 'tech-partner': 3, audit: 1 } },
      { label: 'Não sei exatamente — preciso de um diagnóstico', value: 'nao-sei', scores: { audit: 3 } },
    ],
  },
  {
    id: 'team',
    question: 'Qual o tamanho do seu time?',
    options: [
      { label: 'Sou solo', value: 'solo', scores: { automacao: 2, 'produto-digital': 2, audit: 2 } },
      { label: '2–5 pessoas', value: 'pequeno', scores: { automacao: 3, 'produto-digital': 2, audit: 1 } },
      { label: '6–20 pessoas', value: 'medio', scores: { 'tech-partner': 3, automacao: 2, audit: 1 } },
      { label: '20+ pessoas', value: 'grande', scores: { 'tech-partner': 3, automacao: 1, audit: 1 } },
    ],
  },
  {
    id: 'budget',
    question: 'Qual faixa de investimento faz sentido agora?',
    options: [
      { label: 'Até R$1.500', value: 'baixo', scores: { audit: 3, automacao: 1 } },
      { label: 'R$1.500–3.000', value: 'medio-baixo', scores: { automacao: 3, audit: 2 } },
      { label: 'R$3.000–10.000', value: 'medio', scores: { 'produto-digital': 3, automacao: 2, audit: 1 } },
      { label: 'R$10.000+ ou R$2.500/mês', value: 'alto', scores: { 'produto-digital': 2, 'tech-partner': 3 } },
    ],
  },
  {
    id: 'urgency',
    question: 'Qual a urgência?',
    options: [
      { label: 'Preciso resolver esta semana', value: 'agora', scores: { automacao: 3, audit: 2 } },
      { label: 'Este mês', value: 'mes', scores: { automacao: 2, 'produto-digital': 2, audit: 2 } },
      { label: 'Próximo trimestre', value: 'trimestre', scores: { 'produto-digital': 3, 'tech-partner': 3, audit: 1 } },
      { label: 'Sem pressa — só explorando', value: 'depois', scores: { audit: 3 } },
    ],
  },
]

const RESULTS: Record<string, { title: string; description: string; cta: string; href: string; price: string }> = {
  automacao: {
    title: 'Automação Express',
    description: 'Baseado nas suas respostas, o caminho mais rápido e com ROI claro é automatizar o processo que está comendo tempo do seu time. Em 1–2 semanas você já vê resultado.',
    cta: 'Quero automatizar',
    href: '/automacoes',
    price: 'R$1.500–3.000',
  },
  'produto-digital': {
    title: 'Produto Digital (MVP)',
    description: 'Você tem uma ideia clara e orçamento para tirá-la do papel. Um MVP em 4–8 semanas é o caminho mais seguro para validar sem desperdiçar dinheiro.',
    cta: 'Quero lançar meu MVP',
    href: '/produto-digital',
    price: 'R$5.000–12.000',
  },
  'tech-partner': {
    title: 'Tech Partner (CTO Fracionado)',
    description: 'Com um time em crescimento e decisões técnicas complexas, você precisa de alguém com repertório para arquitetar, revisar e direcionar — sem contratar um CTO full-time.',
    cta: 'Quero um Tech Partner',
    href: '/tech-partner',
    price: 'R$2.500/mês',
  },
  audit: {
    title: 'Audit de Automação',
    description: 'Se não tem certeza do melhor caminho, o Audit é o passo mais inteligente. Em 5 dias você recebe um diagnóstico completo com mapa do processo, stack recomendada e ROI projetado — por R$297.',
    cta: 'Fazer o Audit',
    href: '/audit',
    price: 'R$297',
  },
}

export default function QuizContent() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitOk, setSubmitOk] = useState(false)

  function handleAnswer(option: { label: string; value: string; scores: Record<string, number | undefined> }) {
    const q = QUESTIONS[step]
    const filteredScores: Record<string, number> = {}
    for (const [k, v] of Object.entries(option.scores)) {
      if (v !== undefined) filteredScores[k] = v
    }
    const nextAnswers = [...answers, { question: q.id, value: option.value, score: filteredScores }]
    setAnswers(nextAnswers)

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setStep(QUESTIONS.length)
    }
  }

  function calculateResult(): string {
    const totals: Record<string, number> = {}
    for (const ans of answers) {
      for (const [key, val] of Object.entries(ans.score)) {
        totals[key] = (totals[key] ?? 0) + val
      }
    }
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0] ?? 'audit'
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

    setIsSubmitting(true)

    const resultKey = calculateResult()
    const resultData = RESULTS[resultKey]

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          email,
          empresa: company,
          servico: resultKey,
          mensagem: `Quiz result: ${resultData.title}. Answers: ${answers.map((a) => `${a.question}=${a.value}`).join(', ')}`,
          trackingContext: { landingPage: '/quiz', utmSource: 'quiz' },
          _gotcha: '',
        }),
      })

      if (!response.ok) throw new Error('Submit failed')
      setSubmitOk(true)
      setTimeout(() => router.push('/obrigado'), 900)
    } catch {
      setIsSubmitting(false)
    }
  }

  if (step === 0 && answers.length === 0) {
    return (
      <>
        <PageHeader
          eyebrow="QUIZ"
          title={<>Precisa <span className="text-primary">automatizar?</span></>}
          lead="4 perguntas rápidas. Sem cadastro. No final você sai sabendo qual serviço faz sentido para o seu estágio — e por quê."
        />
        <main className={styles.main}>
          <Reveal>
            <button type="button" className={styles.btnPrimary} onClick={() => setStep(1)}>
              Começar quiz →
            </button>
          </Reveal>
        </main>
      </>
    )
  }

  if (step > 0 && step <= QUESTIONS.length) {
    const q = QUESTIONS[step - 1]
    const progress = Math.round(((step - 1) / QUESTIONS.length) * 100)

    return (
      <main className={styles.main}>
        <Reveal>
          <div className={styles.quizCard}>
            <span className={styles.progressLabel}>Pergunta {step} de {QUESTIONS.length}</span>
            <h1 className={styles.question}>{q.question}</h1>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.options}>
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleAnswer(opt)}
                  className={styles.option}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </main>
    )
  }

  const resultKey = calculateResult()
  const result = RESULTS[resultKey]

  if (submitOk) {
    return (
      <main className={styles.main}>
        <div className={styles.quizCard}>
          <h1 className={styles.question}>Obrigado!</h1>
          <p className={styles.redirect}>Redirecionando...</p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Reveal>
        <div className={styles.quizCard}>
          <span className={styles.progressLabel}>Resultado</span>
          <h1 className={styles.question}>{result.title}</h1>
          <p className={styles.resultDesc}>{result.description}</p>

          <div className={styles.priceBox}>
            <p className={styles.price}>{result.price}</p>
            <p className={styles.priceLabel}>Preço estimado</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              <span>Nome</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
            </label>
            <label>
              <span>Empresa (opcional)</span>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nome da empresa" />
            </label>
            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Receber proposta por email'}
              </button>
              <Link href={result.href} className={styles.btnGhost}>
                Saber mais sobre {result.title}
              </Link>
            </div>
          </form>
        </div>
      </Reveal>
    </main>
  )
}
