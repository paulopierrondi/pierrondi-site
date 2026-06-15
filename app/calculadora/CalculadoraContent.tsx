'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import styles from './CalculadoraContent.module.css'

function Counter({ value, duration = 0.6 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      setDisplayValue(Math.floor(value * progress))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [value, duration])

  return <>{displayValue}</>
}

export default function CalculadoraContent() {
  const [funcionarios, setFuncionarios] = useState(2)
  const [horasPorSemana, setHorasPorSemana] = useState(10)
  const [custoHora, setCustoHora] = useState(100)
  const [custoAutomacao, setCustoAutomacao] = useState(3000)

  const custoMensal = funcionarios * horasPorSemana * 4.3 * custoHora
  const tempoPayback = custoAutomacao / (custoMensal - 200)
  const economiaAnual = (custoMensal - 200) * 12
  const roiPercentual = ((custoMensal * 6 - custoAutomacao) / custoAutomacao) * 100
  const isNegativePayback = tempoPayback < 0
  const economiaPositiva = custoMensal > 200

  return (
    <>
      <PageHeader
        eyebrow="FERRAMENTA"
        title={<>Calculadora de ROI de <span className="text-primary">Automação.</span></>}
        lead="Veja quanto você economiza automatizando um processo manual."
      />

      <main className={styles.main}>
        <Reveal>
          <div className={styles.card}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="funcionarios" className={styles.label}>Funcionários na tarefa</label>
                <input
                  id="funcionarios"
                  type="number"
                  min="1"
                  max="100"
                  value={funcionarios}
                  onChange={(e) => setFuncionarios(Math.max(1, parseInt(e.target.value) || 1))}
                  className={styles.input}
                  aria-describedby="funcionarios-hint"
                />
                <span id="funcionarios-hint" className={styles.helperText}>Quantas pessoas fazem isto hoje?</span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="horasPorSemana" className={styles.label}>Horas por semana</label>
                <input
                  id="horasPorSemana"
                  type="number"
                  min="0.5"
                  max="160"
                  step="0.5"
                  value={horasPorSemana}
                  onChange={(e) => setHorasPorSemana(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className={styles.input}
                  aria-describedby="horas-hint"
                />
                <span id="horas-hint" className={styles.helperText}>Por funcionário, por semana</span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="custoHora" className={styles.label}>Custo/hora em R$</label>
                <input
                  id="custoHora"
                  type="number"
                  min="50"
                  max="500"
                  value={custoHora}
                  onChange={(e) => setCustoHora(Math.max(50, parseInt(e.target.value) || 50))}
                  className={styles.input}
                  aria-describedby="custo-hint"
                />
                <span id="custo-hint" className={styles.helperText}>Inclua encargos e benefícios</span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="custoAutomacao" className={styles.label}>Investimento em automação</label>
                <input
                  id="custoAutomacao"
                  type="number"
                  min="1500"
                  max="50000"
                  step="100"
                  value={custoAutomacao}
                  onChange={(e) => setCustoAutomacao(Math.max(1500, parseInt(e.target.value) || 3000))}
                  className={styles.input}
                  aria-describedby="automacao-hint"
                />
                <span id="automacao-hint" className={styles.helperText}>Default: R$3.000 (Automação Express)</span>
              </div>
            </div>

            <div className={styles.resultsGrid} aria-live="polite" aria-label="Resultados do cálculo">
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>Economia mensal</span>
                <span className={styles.resultValue}>
                  {economiaPositiva ? (
                    <>R$ <Counter value={Math.round(custoMensal - 200)} duration={0.6} /></>
                  ) : '—'}
                </span>
                {!economiaPositiva && <span className={styles.resultWarning}>Custo maior que economia. Ajuste os parâmetros.</span>}
              </div>

              <div className={`${styles.resultCard} ${isNegativePayback ? styles.resultCardWarning : ''}`}>
                <span className={styles.resultLabel}>Payback em meses</span>
                <span className={styles.resultValue}>
                  {isNegativePayback ? '—' : <Counter value={Math.ceil(tempoPayback)} duration={0.6} />}
                </span>
                {isNegativePayback && <span className={styles.resultWarning}>Custo de automação muito alto para este cenário.</span>}
              </div>

              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>Economia anual</span>
                <span className={styles.resultValue}>
                  {economiaPositiva ? (
                    <>R$ <Counter value={Math.round(economiaAnual)} duration={0.6} /></>
                  ) : '—'}
                </span>
              </div>

              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>ROI (6 meses)</span>
                <span className={styles.resultValue}>
                  <Counter value={Math.round(roiPercentual)} duration={0.6} />
                  <span className={styles.resultValueUnit}>%</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <section className={styles.ctaSection}>
          <Reveal>
            <h2>Gostou do resultado?</h2>
            <p>Vamos converter esta economia em realidade. Diagnóstico gratuito em 30 minutos.</p>
            <Link href="/contato" className={styles.btnPrimary}>Quero uma proposta</Link>
          </Reveal>
        </section>
      </main>
    </>
  )
}
