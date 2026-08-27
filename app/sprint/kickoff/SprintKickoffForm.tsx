'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import styles from '../Sprint.module.css'
import formStyles from './Kickoff.module.css'

const STACK_OPTIONS = [
  'n8n',
  'Make',
  'GoHighLevel',
  'WhatsApp Business oficial',
  'API direta',
  'Sem preferência',
] as const

const AMBIENTE_OPTIONS = ['Conta do cliente', 'Acesso compartilhado / credencial dele'] as const

export default function SprintKickoffForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      nome: formData.get('nome'),
      operacao: formData.get('operacao'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      pagamento_comprovante: formData.get('pagamento_comprovante'),
      processo_hoje: formData.get('processo_hoje'),
      volume: formData.get('volume'),
      ferramentas: formData.get('ferramentas'),
      acessos: formData.get('acessos'),
      criterios_pronto: formData.get('criterios_pronto'),
      nao_pode_quebrar: formData.get('nao_pode_quebrar'),
      stack_preferencia: formData.get('stack_preferencia'),
      ambiente: formData.get('ambiente'),
      exemplo_real: formData.get('exemplo_real'),
      fuso_janela: formData.get('fuso_janela'),
    }

    try {
      const res = await fetch('/api/sprint-kickoff', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        setStatus('ok')
        trackEvent('Sprint_Kickoff_Submitted', { form: 'sprint_kickoff' })
        form.reset()
      } else {
        setStatus('error')
        trackEvent('Sprint_Kickoff_Error', { form: 'sprint_kickoff', status: res.status })
      }
    } catch {
      setStatus('error')
      trackEvent('Sprint_Kickoff_Error', { form: 'sprint_kickoff', status: 'network' })
    }
  }

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <label>
        <span className={formStyles.label}>Nome</span>
        <input type="text" name="nome" required autoComplete="name" />
      </label>

      <label>
        <span className={formStyles.label}>Operação</span>
        <input type="text" name="operacao" required placeholder="Ex.: clínica, e-commerce, operação interna" />
      </label>

      <label>
        <span className={formStyles.label}>WhatsApp com DDI</span>
        <input type="tel" name="whatsapp" required placeholder="+55 11 99999-9999" autoComplete="tel" />
      </label>

      <label>
        <span className={formStyles.label}>Email</span>
        <input type="email" name="email" required autoComplete="email" />
      </label>

      <label>
        <span className={formStyles.label}>Como pagou + comprovante</span>
        <textarea
          name="pagamento_comprovante"
          required
          rows={3}
          placeholder="Pix, Wise, data, valor. Se tiver arquivo, descreva ou avise que enviou no WhatsApp."
        />
      </label>

      <label>
        <span className={formStyles.label}>Processo de hoje passo a passo</span>
        <textarea
          name="processo_hoje"
          required
          rows={5}
          placeholder="Do gatilho manual até onde a informação para hoje."
        />
      </label>

      <label>
        <span className={formStyles.label}>Volume</span>
        <input type="text" name="volume" required placeholder="Ex.: ~200 leads/semana, 30 pedidos/dia" />
      </label>

      <label>
        <span className={formStyles.label}>Ferramentas de hoje</span>
        <textarea
          name="ferramentas"
          required
          rows={3}
          placeholder="WhatsApp, planilha, CRM, ERP, formulário..."
        />
      </label>

      <label>
        <span className={formStyles.label}>Acessos no kickoff</span>
        <textarea
          name="acessos"
          required
          rows={3}
          placeholder="O que você consegue liberar no dia 1: API, login, webhook, número WABA..."
        />
      </label>

      <label>
        <span className={formStyles.label}>O que é pronto (3 frases testáveis)</span>
        <textarea
          name="criterios_pronto"
          required
          rows={4}
          placeholder="Três frases que possam virar teste de aceite."
        />
      </label>

      <label>
        <span className={formStyles.label}>O que não pode quebrar</span>
        <textarea name="nao_pode_quebrar" required rows={3} />
      </label>

      <label>
        <span className={formStyles.label}>Stack preference</span>
        <select name="stack_preferencia" required defaultValue="">
          <option value="" disabled>
            Selecione
          </option>
          {STACK_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className={formStyles.label}>Ambiente</span>
        <select name="ambiente" required defaultValue="">
          <option value="" disabled>
            Selecione
          </option>
          {AMBIENTE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className={formStyles.label}>Um exemplo real</span>
        <textarea
          name="exemplo_real"
          required
          rows={3}
          placeholder="Um caso concreto que representa o fluxo — dados fictícios se precisar."
        />
      </label>

      <label>
        <span className={formStyles.label}>Fuso e janela pra dúvida objetiva</span>
        <input
          type="text"
          name="fuso_janela"
          required
          placeholder="Ex.: America/Sao_Paulo · respondo 9h–18h BRT"
        />
      </label>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className={formStyles.honeypot} />

      <button type="submit" className={styles.ctaPrimary} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Enviando…' : 'Enviar kickoff'}
        <span aria-hidden="true">→</span>
      </button>

      {status === 'ok' && (
        <p className={formStyles.feedbackOk}>
          Kickoff recebido. O relógio de 7 dias começa quando os acessos estiverem confirmados.
        </p>
      )}
      {status === 'error' && (
        <p className={formStyles.feedbackError}>
          Falha no envio. Tente de novo ou chame no WhatsApp com o mesmo email.
        </p>
      )}
    </form>
  )
}
