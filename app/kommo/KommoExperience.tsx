import Image from 'next/image'
import Reveal, { RevealStagger, RevealStaggerItem } from '@/components/Reveal'
import styles from './Kommo.module.css'

const STATS = [
  { n: '2', l: 'Funis separados' },
  { n: '16', l: 'Campos personalizados' },
  { n: '19', l: 'Tags padronizadas' },
  { n: '4', l: 'Motivos de perda' },
]

const CLINICA_STAGES = [
  'Novo lead',
  'Triagem inicial',
  'Pré-qualificado',
  'Pronto para agendamento',
  'Agendado',
]

const CURSOS_STAGES = [
  'Novo lead',
  'Triagem inicial',
  'Interesse identificado',
  'Pré-qualificado',
  'Pronto p/ atendimento humano',
  'Atendimento comercial',
  'Inscrição / próxima ação',
]

const FIELD_GROUPS = [
  {
    title: 'Gerais',
    tone: 'neutral' as const,
    fields: [
      { n: 'Fluxo principal', o: 'Clínica · Cursos · Indefinido' },
      { n: 'Número de entrada', o: 'Nº Clínica · Nº Cursos · Importado · Manual' },
      { n: 'Origem do lead', o: 'WhatsApp · Importação · Instagram · Indicação · Site · Outro' },
      { n: 'Status de qualificação', o: 'Novo · Em triagem · Pré-qualificado · Humano · Desqualificado' },
      { n: 'Interesse principal', o: 'texto' },
      { n: 'Observação da triagem', o: 'texto longo' },
      { n: 'Consentimento para contato', o: 'Sim · Não · Não informado' },
    ],
  },
  {
    title: 'Clínica',
    tone: 'clinica' as const,
    fields: [
      { n: 'Queixa principal', o: 'texto' },
      { n: 'Tempo do problema', o: 'texto' },
      { n: 'Já fez tratamento antes?', o: 'Sim · Não · Não informado' },
      { n: 'Disponibilidade p/ agendamento', o: 'texto' },
      { n: 'Urgência percebida', o: 'Baixa · Média · Alta' },
    ],
  },
  {
    title: 'Cursos',
    tone: 'cursos' as const,
    fields: [
      { n: 'Curso de interesse', o: 'texto' },
      { n: 'Nível de conhecimento', o: 'Iniciante · Intermediário · Avançado' },
      { n: 'Formato de interesse', o: 'Online · Presencial · Não sabe' },
      { n: 'Já é aluno?', o: 'Sim · Não · Não informado' },
    ],
  },
]

const TAGS = [
  { g: 'Fluxo', items: [['fluxo_clinica', 'clinica'], ['fluxo_cursos', 'cursos'], ['fluxo_indefinido', 'neutral']] },
  { g: 'Origem', items: [['origem_whatsapp', 'neutral'], ['origem_importacao', 'neutral'], ['origem_manual', 'neutral'], ['numero_clinica', 'clinica'], ['numero_cursos', 'cursos']] },
  { g: 'Atendimento', items: [['bot_em_triagem', 'neutral'], ['pre_qualificado', 'primary'], ['humano_necessario', 'primary'], ['pronto_agendamento', 'primary'], ['desqualificado', 'neutral']] },
  { g: 'Interesse', items: [['interesse_tratamento_capilar', 'clinica'], ['interesse_curso', 'cursos'], ['aluno_existente', 'cursos']] },
  { g: 'Importação', items: [['base_importada', 'neutral'], ['base_sem_tag', 'neutral'], ['precisa_higienizar', 'neutral']] },
] as const

const ROADMAP = [
  { t: 'Conectar o WhatsApp Business oficial', d: 'A clínica conecta o número que controla. Passo a passo pronto.', who: 'Cliente' },
  { t: 'Importar a base (~1.100 contatos)', d: 'Só após higienização e uma amostra pequena aprovada.', who: 'Paulo + cliente' },
  { t: 'Ativar o atendimento automático', d: 'Depende do WhatsApp conectado e das mensagens aprovadas.', who: 'Paulo' },
  { t: 'Integrar a agenda', d: 'Só após documentação e ambiente de teste do sistema de agenda.', who: 'Paulo + fornecedor' },
]

const VALIDATE = [
  'Abrir os dois funis no Kommo e conferir se as etapas fazem sentido para a operação.',
  'Confirmar os dois números de WhatsApp (qual é Clínica, qual é Cursos) e quem responde cada um.',
  'Aprovar as mensagens de triagem/atendimento inicial.',
  'Indicar o responsável por LGPD antes de importar a base — a clínica lida com dado sensível de saúde.',
]

function toneClass(tone: string) {
  if (tone === 'clinica') return styles.clinica
  if (tone === 'cursos') return styles.cursos
  if (tone === 'primary') return styles.tagPrimary
  return ''
}

export default function KommoExperience() {
  return (
    <main className={styles.main}>
      {/* Hero */}
      <header className={styles.hero}>
        <Reveal>
          <p className={styles.eyebrow}>Implantação CRM · Kommo</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className={styles.title}>
            O CRM da Camila Ferraz,{' '}
            <span className="text-primary">pronto para operar.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.lead}>
            Dois funis separados para Clínica e Cursos, campos e tags padronizados, e a
            triagem validada com dados de teste — antes de tocar em qualquer contato real.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className={styles.metaRow}>
            <span>Cliente <b>Camila Ferraz</b></span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Fase 1 — Estrutura de CRM</span>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.status}><span className={styles.pulse} aria-hidden="true" />Pronto para operação</span>
          </div>
        </Reveal>
        <RevealStagger className={styles.stats}>
          {STATS.map((s) => (
            <RevealStaggerItem key={s.l}>
              <div className={styles.stat}>
                <div className={styles.statN}>{s.n}</div>
                <div className={styles.statL}>{s.l}</div>
              </div>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </header>

      {/* Funnels */}
      <section className={styles.section}>
        <Reveal>
          <p className={styles.kicker}>A peça central</p>
          <h2 className={styles.h2}>Dois fluxos, nunca misturados</h2>
          <p className={styles.sub}>
            Cada lead entra em um único funil e caminha por etapas até o repasse para uma
            pessoa. Clínica e Cursos têm jornadas, critérios e responsáveis diferentes.
          </p>
        </Reveal>
        <div className={styles.funnels}>
          <Reveal delay={0.05} className={`${styles.funnel} ${styles.funnelClinica}`}>
            <div className={styles.funnelHead}>
              <h3>Funil Clínica — Tratamento Capilar</h3>
            </div>
            <div className={styles.flow}>
              {CLINICA_STAGES.map((s, i) => (
                <div key={s} className={styles.stageWrap}>
                  <span className={styles.stage}>{s}</span>
                  {i < CLINICA_STAGES.length - 1 && <span className={styles.arrow} aria-hidden="true">›</span>}
                </div>
              ))}
            </div>
            <p className={styles.funnelNote}>Repasse em <b>Pronto para agendamento</b>: a equipe marca a avaliação.</p>
          </Reveal>
          <Reveal delay={0.1} className={`${styles.funnel} ${styles.funnelCursos}`}>
            <div className={styles.funnelHead}>
              <h3>Funil Cursos</h3>
            </div>
            <div className={styles.flow}>
              {CURSOS_STAGES.map((s, i) => (
                <div key={s} className={styles.stageWrap}>
                  <span className={styles.stage}>{s}</span>
                  {i < CURSOS_STAGES.length - 1 && <span className={styles.arrow} aria-hidden="true">›</span>}
                </div>
              ))}
            </div>
            <p className={styles.funnelNote}>Repasse em <b>Pronto p/ atendimento humano</b>: o comercial assume turma, valor e inscrição.</p>
          </Reveal>
        </div>
      </section>

      {/* Screenshots */}
      <section className={styles.section}>
        <Reveal>
          <p className={styles.kicker}>Na conta, hoje</p>
          <h2 className={styles.h2}>Como está no Kommo</h2>
          <p className={styles.sub}>
            Capturas reais dos dois funis, com leads de teste (prefixo <code>TESTE</code>)
            usados para validar a triagem sem tocar em contato real.
          </p>
        </Reveal>
        <div className={styles.shots}>
          <Reveal delay={0.05} className={styles.figure}>
            <Image src="/kommo/funil-clinica.jpg" alt="Board do Funil Clínica no Kommo" width={1280} height={778} className={styles.shotImg} />
            <span className={styles.figcap}><b>Funil Clínica</b> — leads em Triagem, Pré-qualificado e Pronto para agendamento.</span>
          </Reveal>
          <Reveal delay={0.1} className={styles.figure}>
            <Image src="/kommo/funil-cursos.jpg" alt="Board do Funil Cursos no Kommo" width={1280} height={778} className={styles.shotImg} />
            <span className={styles.figcap}><b>Funil Cursos</b> — etapas próprias, com o lead de curso no fluxo comercial.</span>
          </Reveal>
        </div>
      </section>

      {/* Fields */}
      <section className={styles.section}>
        <Reveal>
          <p className={styles.kicker}>O que o time preenche</p>
          <h2 className={styles.h2}>16 campos personalizados</h2>
          <p className={styles.sub}>
            Campos gerais para todo lead, mais campos específicos de cada fluxo. As opções
            são listas fechadas, para manter o dado limpo e comparável.
          </p>
        </Reveal>
        <div className={styles.groups}>
          {FIELD_GROUPS.map((g) => (
            <Reveal key={g.title} delay={0.05} className={styles.group}>
              <p className={`${styles.groupTitle} ${toneClass(g.tone)}`}>{g.title}</p>
              {g.fields.map((f) => (
                <div key={f.n} className={styles.field}>
                  <span className={styles.fieldN}>{f.n}</span>
                  <span className={styles.fieldO}>{f.o}</span>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className={styles.section}>
        <Reveal>
          <p className={styles.kicker}>Rastreabilidade sem bagunça</p>
          <h2 className={styles.h2}>19 tags padronizadas</h2>
          <p className={styles.sub}>
            Um vocabulário fixo para saber, num olhar, de onde o lead veio, em que fluxo
            está e o que precisa acontecer.
          </p>
        </Reveal>
        <div className={styles.tagWrap}>
          {TAGS.map((row) => (
            <Reveal key={row.g} delay={0.04} className={styles.tagRow}>
              <span className={styles.tagLabel}>{row.g}</span>
              <div className={styles.tagList}>
                {row.items.map(([name, tone]) => (
                  <span key={name} className={`${styles.tag} ${toneClass(tone)}`}>{name}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className={styles.section}>
        <Reveal>
          <p className={styles.kicker}>Próximas etapas</p>
          <h2 className={styles.h2}>O que falta — e de quem depende</h2>
          <p className={styles.sub}>
            Nada aqui bloqueia o uso do CRM hoje. São frentes com aprovação, cada uma com
            um dono claro.
          </p>
        </Reveal>
        <div className={styles.road}>
          {ROADMAP.map((r) => (
            <Reveal key={r.t} delay={0.04} className={styles.roadItem}>
              <div>
                <p className={styles.roadT}>{r.t}</p>
                <p className={styles.roadD}>{r.d}</p>
              </div>
              <span className={styles.who}>{r.who}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Validation for Caio */}
      <section className={styles.section}>
        <Reveal className={styles.validate}>
          <p className={styles.kicker}>Para validar com o Caio</p>
          <h2 className={styles.h2}>4 pontos para dar o ok</h2>
          <ol className={styles.checklist}>
            {VALIDATE.map((v, i) => (
              <li key={i}><span className={styles.num}>{i + 1}</span>{v}</li>
            ))}
          </ol>
          <p className={styles.acceptText}>
            Validado esse desenho, seguimos com a conexão do WhatsApp e a importação da base
            com segurança, começando por uma amostra pequena.
          </p>
        </Reveal>
      </section>
    </main>
  )
}
