'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'

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

  // Intro
  if (step === 0 && answers.length === 0) {
    return (
      <ProductTile
        variant="dark"
        eyebrow="Quiz"
        headline="Precisa automatizar?"
        headlineLevel="h1"
        tagline="4 perguntas rápidas. Sem cadastro. No final você sai sabendo qual serviço faz sentido para o seu estágio — e por quê."
        ctas={
          <PillButton variant="primary" size="large" onClick={() => setStep(1)}>
            Começar quiz →
          </PillButton>
        }
      />
    )
  }

  // Questions
  if (step > 0 && step <= QUESTIONS.length) {
    const q = QUESTIONS[step - 1]
    const progress = Math.round(((step - 1) / QUESTIONS.length) * 100)

    return (
      <ProductTile
        variant="dark"
        eyebrow={`Pergunta ${step} de ${QUESTIONS.length}`}
        headline={q.question}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ height: 4, background: 'var(--color-hairline)', borderRadius: 2, marginBottom: 32 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-accent-cyan)', borderRadius: 2, transition: 'width 0.3s ease' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {q.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt)}
                style={{
                  textAlign: 'left',
                  padding: '16px 20px',
                  borderRadius: 8,
                  border: '1px solid var(--color-hairline-strong)',
                  background: 'var(--color-surface-card)',
                  color: 'var(--color-ink)',
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  lineHeight: 1.5,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent-cyan)'
                  e.currentTarget.style.background = 'var(--color-surface-card-elevated)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-hairline-strong)'
                  e.currentTarget.style.background = 'var(--color-surface-card)'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </ProductTile>
    )
  }

  // Result + capture
  const resultKey = calculateResult()
  const result = RESULTS[resultKey]

  if (submitOk) {
    return (
      <ProductTile variant="dark" eyebrow="Quiz" headline="Obrigado!">
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', fontSize: 16 }}>Redirecionando...</p>
      </ProductTile>
    )
  }

  return (
    <ProductTile
      variant="dark"
      eyebrow="Resultado"
      headline={result.title}
      tagline={result.description}
    >
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div
          style={{
            background: 'var(--color-surface-card)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
          }}
        >
          <p style={{ color: 'var(--color-accent-cyan)', fontSize: 32, fontWeight: 700, margin: '0 0 8px 0' }}>
            {result.price}
          </p>
          <p style={{ color: 'var(--color-muted)', fontSize: 14, margin: 0 }}>Preço estimado</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', color: 'var(--color-muted)', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 6,
                border: '1px solid var(--color-hairline-strong)',
                background: 'var(--color-canvas-deep)',
                color: 'var(--color-ink)',
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--color-muted)', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 6,
                border: '1px solid var(--color-hairline-strong)',
                background: 'var(--color-canvas-deep)',
                color: 'var(--color-ink)',
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--color-muted)', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Empresa (opcional)</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nome da empresa"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 6,
                border: '1px solid var(--color-hairline-strong)',
                background: 'var(--color-canvas-deep)',
                color: 'var(--color-ink)',
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            <PillButton variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Receber proposta por email'}
            </PillButton>
            <PillButton variant="ghost" href={result.href}>
              Saber mais sobre {result.title}
            </PillButton>
          </div>
        </form>
      </div>
    </ProductTile>
  )
}
