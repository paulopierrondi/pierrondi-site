'use client'

import { useState, useEffect } from 'react'
import { ProductTile } from '@/components/ui/ProductTile'
import { PillButton } from '@/components/ui/PillButton'
import styles from './CalculadoraContent.module.css'

/* ── Counter animation ── */

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

/* ── Main component ── */

export default function CalculadoraContent() {
  const [funcionarios, setFuncionarios] = useState(2)
  const [horasPorSemana, setHorasPorSemana] = useState(10)
  const [custoHora, setCustoHora] = useState(100)
  const [custoAutomacao, setCustoAutomacao] = useState(3000)

  /* Calculator logic — preserved exactly */
  const custoMensal = funcionarios * horasPorSemana * 4.3 * custoHora
  const tempoPayback = custoAutomacao / (custoMensal - 200)
  const economiaAnual = (custoMensal - 200) * 12
  const roiPercentual = ((custoMensal * 6 - custoAutomacao) / custoAutomacao) * 100
  const isNegativePayback = tempoPayback < 0
  const economiaPositiva = custoMensal > 200

  return (
    <>
      {/* Hero tile */}
      <ProductTile
        variant="dark"
        eyebrow="Ferramenta"
        headline="Calculadora de ROI de Automação."
        tagline="Veja quanto você economiza automatizando um processo manual."
      />

      {/* Form + results tile */}
      <ProductTile variant="dark" as="div">
        {/* Inputs */}
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="funcionarios" className={styles.label}>
              Funcionários na tarefa
            </label>
            <input
              id="funcionarios"
              type="number"
              min="1"
              max="100"
              value={funcionarios}
              onChange={(e) =>
                setFuncionarios(Math.max(1, parseInt(e.target.value) || 1))
              }
              className={styles.input}
              aria-describedby="funcionarios-hint"
            />
            <span id="funcionarios-hint" className={styles.helperText}>
              Quantas pessoas fazem isto hoje?
            </span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="horasPorSemana" className={styles.label}>
              Horas por semana
            </label>
            <input
              id="horasPorSemana"
              type="number"
              min="0.5"
              max="160"
              step="0.5"
              value={horasPorSemana}
              onChange={(e) =>
                setHorasPorSemana(Math.max(0.5, parseFloat(e.target.value) || 0.5))
              }
              className={styles.input}
              aria-describedby="horas-hint"
            />
            <span id="horas-hint" className={styles.helperText}>
              Por funcionário, por semana
            </span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="custoHora" className={styles.label}>
              Custo/hora em R$
            </label>
            <input
              id="custoHora"
              type="number"
              min="50"
              max="500"
              value={custoHora}
              onChange={(e) =>
                setCustoHora(Math.max(50, parseInt(e.target.value) || 50))
              }
              className={styles.input}
              aria-describedby="custo-hint"
            />
            <span id="custo-hint" className={styles.helperText}>
              Inclua encargos e benefícios
            </span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="custoAutomacao" className={styles.label}>
              Investimento em automação
            </label>
            <input
              id="custoAutomacao"
              type="number"
              min="1500"
              max="50000"
              step="100"
              value={custoAutomacao}
              onChange={(e) =>
                setCustoAutomacao(Math.max(1500, parseInt(e.target.value) || 3000))
              }
              className={styles.input}
              aria-describedby="automacao-hint"
            />
            <span id="automacao-hint" className={styles.helperText}>
              Default: R$3.000 (Automação Express)
            </span>
          </div>
        </div>

        {/* Results */}
        <div className={styles.resultsGrid} aria-live="polite" aria-label="Resultados do cálculo">
          {/* Economia mensal */}
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Economia mensal</span>
            <span className={styles.resultValue}>
              {economiaPositiva ? (
                <>
                  R${' '}
                  <Counter value={Math.round(custoMensal - 200)} duration={0.6} />
                </>
              ) : (
                '—'
              )}
            </span>
            {!economiaPositiva && (
              <span className={styles.resultWarning}>
                Custo maior que economia. Ajuste os parâmetros.
              </span>
            )}
          </div>

          {/* Payback */}
          <div
            className={
              isNegativePayback
                ? `${styles.resultCard} ${styles.resultCardWarning}`
                : styles.resultCard
            }
          >
            <span className={styles.resultLabel}>Payback em meses</span>
            <span className={styles.resultValue}>
              {isNegativePayback ? (
                '—'
              ) : (
                <Counter value={Math.ceil(tempoPayback)} duration={0.6} />
              )}
            </span>
            {isNegativePayback && (
              <span className={styles.resultWarning}>
                Custo de automação muito alto para este cenário.
              </span>
            )}
          </div>

          {/* Economia anual */}
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Economia anual</span>
            <span className={styles.resultValue}>
              {economiaPositiva ? (
                <>
                  R${' '}
                  <Counter value={Math.round(economiaAnual)} duration={0.6} />
                </>
              ) : (
                '—'
              )}
            </span>
          </div>

          {/* ROI 6 meses */}
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>ROI (6 meses)</span>
            <span className={styles.resultValue}>
              <Counter value={Math.round(roiPercentual)} duration={0.6} />
              <span className={styles.resultValueUnit}>%</span>
            </span>
          </div>
        </div>
      </ProductTile>

      {/* CTA tile */}
      <ProductTile
        variant="dark"
        eyebrow="Próximo passo"
        headline="Gostou do resultado?"
        tagline="Vamos converter esta economia em realidade. Diagnóstico gratuito em 30 minutos."
        ctas={
          <PillButton href="/#contato" variant="primary">
            Quero uma proposta
          </PillButton>
        }
      />
    </>
  )
}
