import styles from './ItauExperience.module.css'

type VerdictKind = 'approved' | 'adjust' | 'reject'

const verdictItems: Array<{
  kind: VerdictKind
  item: string
  meta?: string
  reason: string
}> = [
  {
    kind: 'approved',
    item: 'Ponto de partida para agentes/skills em SaaS ou cloud gerenciada',
    meta: 'cmdb_ci_function_ai · AI Function',
    reason:
      'Use quando o agente, skill ou capacidade de IA é consumido como serviço gerenciado: Now Assist, Azure AI Foundry, AWS Bedrock, Copilot, SaaS ou plataforma hospedada por terceiro.',
  },
  {
    kind: 'adjust',
    item: 'Aplicação ou workload de IA operado pelo Itaú',
    meta: 'cmdb_ci_appl_ai_application · AI & Model Application',
    reason:
      'Use quando existe software de IA rodando em infraestrutura controlada pelo banco: Linux, Windows, containers, Kubernetes, private cloud, on-prem ou runtime gerenciado internamente.',
  },
  {
    kind: 'approved',
    item: 'Governança do ativo de IA antes da CI operacional',
    meta: 'alm_ai_*_digital_asset',
    reason:
      'Crie ativo de IA para declarar uso, dono, risco, modelo, dataset e finalidade. Se não há deployment visível, o ativo existe mesmo sem CI operacional.',
  },
  {
    kind: 'approved',
    item: 'Conexão com CSDM via Service Instance',
    meta: 'cmdb_ci_service_auto · antigo Application Service',
    reason:
      'Cada deployment relevante deve estar ligado ao Service Instance para participar de incidente, mudança, impacto, ownership e health operacional.',
  },
  {
    kind: 'approved',
    item: 'Contexto de negócio não pode ficar inferido',
    meta: 'Business Application / Digital Product / Business Service',
    reason:
      'A CMDB precisa explicar qual produto, jornada ou serviço o agente suporta. A tabela técnica sozinha não responde risco, valor nem accountability.',
  },
  {
    kind: 'reject',
    item: 'Cadastrar caso de uso isolado como CI',
    meta: 'anti-pattern',
    reason:
      'Um caso de uso, demanda ou iniciativa de IA não é automaticamente CI. Primeiro classifique como ativo de IA e conecte ao produto/serviço; só crie CI quando houver runtime/deployment governável.',
  },
  {
    kind: 'approved',
    item: 'Cadastro centralizado com validação',
    meta: 'intake + API + workflow de aprovação',
    reason:
      'Bom caminho para evitar inventário paralelo: o cadastro deve validar classe, owner, risco, dados, ambiente, suporte e ciclo de vida antes de virar registro operacional.',
  },
  {
    kind: 'adjust',
    item: 'Relacionamentos técnicos',
    meta: 'usar OOTB quando existir; validar na release do Itaú',
    reason:
      'Evitar tipos custom como primeiro movimento. Preferir membership/relacionamentos CSDM suportados, e validar nomes reais no CI Class Manager da instância.',
  },
  {
    kind: 'reject',
    item: 'Campos mínimos de banco regulado',
    reason:
      'Não ir para piloto sem risk_tier, data_classification, pii_handling, decision_authority, model_provider, data_residency, owner, support_group e audit cadence.',
  },
  {
    kind: 'reject',
    item: 'Falta chave de correlação com runtime',
    meta: 'correlation_id / external_id / provider_resource_id',
    reason:
      'Sem identificador externo, o inventário da CMDB fica desconectado de execução real, observabilidade, custo, logs, AI Control Tower e auditoria.',
  },
  {
    kind: 'reject',
    item: 'Erro de cadastro como falha de plataforma',
    meta: 'HTTP 400, não 500',
    reason:
      'Validação de campo obrigatório, classe inválida ou owner ausente deve retornar erro de negócio estruturado, não incidente falso de API.',
  },
]

const criticalItems = [
  {
    title: '1. Começar pelo inventário de ativos de IA',
    severity: 'Alta',
    severityClass: styles.severityHigh,
    description:
      'Antes de escolher tabela CMDB, declarar que a organização usa ou possui aquele agente, modelo, dataset, prompt ou sistema de IA.',
    action:
      'Criar AI Digital Asset com owner, finalidade, risco, dados, modelo/provedor, status e ciclo de vida. Isso governa intenção e accountability.',
  },
  {
    title: '2. Classificar o tipo de deployment',
    severity: 'Alta',
    severityClass: styles.severityHigh,
    description:
      'A escolha entre as duas tabelas do print depende de onde e como o agente roda, não do nome “agente de IA”.',
    action:
      'SaaS/cloud/terceiro: AI Function. Infra controlada pelo Itaú: AI & Model Application. Sem deployment visível: ativo de IA sem CI operacional.',
  },
  {
    title: '3. Conectar ao CSDM operacional',
    severity: 'Média',
    severityClass: styles.severityMed,
    description:
      'O CI de IA precisa aparecer dentro do contexto de serviço, produto e aplicação de negócio que ele suporta.',
    action:
      'Relacionar Business Application/Digital Product → Service Instance → AI CI, com owners e grupo de suporte. Isso habilita incidente, mudança e impacto.',
  },
  {
    title: '4. Governar dados, autonomia e risco',
    severity: 'Média',
    severityClass: styles.severityMed,
    description:
      'Banco regulado precisa saber que dado entra, que decisão sai, qual autonomia existe e quem responde quando o agente erra.',
    action:
      'Exigir classificação de dados, LGPD/PII, nível de autonomia, human-in-the-loop, provider/model, data residency e revisão periódica.',
  },
  {
    title: '5. Operar ciclo de vida, não apenas cadastrar',
    severity: 'Baixa',
    severityClass: styles.severityLow,
    description:
      'O valor não está em ter uma lista; está em manter o agente confiável depois de mudança de prompt, modelo, permissão ou base de dados.',
    action:
      'Amarrar change, incident, revisão de risco, evidência de teste, kill switch, decommission e recertificação de acesso.',
  },
]

const releaseRows = [
  ['Agora', 'Resolver a dúvida de tabela sem criar modelo paralelo.', 'Adotar regra de decisão: AI Function vs AI & Model Application.', styles.releaseVancouver],
  ['Piloto', 'Provar rastreabilidade em poucos agentes críticos.', '3 a 5 agentes reais com ativo, CI quando aplicável, owners e serviço.', styles.releaseWashington],
  ['Operação', 'Transformar cadastro em processo vivo.', 'Workflow de intake, aprovação, mudança, revisão e auditoria.', styles.releaseXanadu],
  ['AICT', 'Preparar visibilidade centralizada de agentes, modelos e workflows.', 'Guardar external_id/correlation_id e link Asset-CI para descoberta/runtime.', styles.releaseYokohama],
  ['Escala', 'Evitar CMDB decorativa e inventário duplicado.', 'Métricas de completude, atualização, risco e cobertura por domínio.', styles.releaseZurich],
]

const roadmap = [
  ['Semana 1', 'Taxonomia e intake mínimo', 'Fechar critérios de classe, campos obrigatórios, owner, risco, dados e ciclo de vida.', 'Gaia + ServiceNow'],
  ['Semana 2', 'Carga piloto', 'Cadastrar 3 a 5 agentes críticos com ativo de IA, CI quando aplicável e relação com Service Instance.', 'Squad Gaia'],
  ['Semana 3', 'Governança e operação', 'Amarrar aprovação, change, incident, revisão de risco, evidência de teste e kill switch.', 'Governança + Operação'],
  ['Semana 4', 'Painel e go/no-go', 'Publicar visão executiva: cobertura, risco, gaps, owners, runtime correlacionado e próximos domínios.', 'Squad + Governança'],
]

const questions = [
  'Esse item é uso/ativo de IA, deployment técnico ou serviço de negócio?',
  'O agente roda em SaaS/cloud/terceiro ou em infraestrutura controlada pelo Itaú?',
  'Existe deployment visível e operacional para justificar CI, ou só governança de ativo?',
  'Qual Business Application, Digital Product ou Service Instance consome esse agente?',
  'Que dados o agente acessa e qual classificação LGPD/risco se aplica?',
  'Quem aprova mudança de modelo, prompt, permissão, ferramenta ou dataset?',
  'Qual external_id/correlation_id liga CMDB ao runtime, logs, custo e AI Control Tower?',
  'Qual evidência prova que o agente continua aderente depois de uma mudança?',
]

const relationships: Array<[string, string, string, string]> = [
  ['AI Digital Asset', 'declara governança', 'alm_ai_system/model/dataset/prompt_digital_asset', 'Uso, dono, finalidade, risco e ciclo de vida'],
  ['AI Digital Asset', 'Asset-CI linkage', 'cmdb_ci_function_ai ou cmdb_ci_appl_ai_application', 'Liga governança ao deployment quando houver CI'],
  ['Business Application / Digital Product', 'usa / suporta', 'Service Instance', 'Contexto de negócio e ownership'],
  ['Service Instance', 'contém / depende de', 'AI Function', 'Agente SaaS/cloud/terceiro em operação'],
  ['Service Instance', 'contém / depende de', 'AI & Model Application', 'Workload de IA operado pelo Itaú'],
  ['AI CI', 'consome', 'modelo, dataset, prompt, API, vector store', 'Dependências para impacto, mudança e auditoria'],
  ['AI CI', 'owned by / supported by', 'sys_user_group / owner', 'Accountability operacional'],
]

const helpItems: Array<{
  icon: string
  title: string
  desc: string
  effort: string
}> = [
  {
    icon: '01',
    title: 'Sessão de modelagem CSDM',
    desc: 'Fechar com Squad Gaia a regra de decisão entre AI Function, AI & Model Application e AI Digital Asset, usando exemplos reais do Itaú.',
    effort: '2h · antes do piloto',
  },
  {
    icon: '02',
    title: 'Desenhar intake mínimo',
    desc: 'Criar formulário/API com campos obrigatórios de owner, risco, dado, autonomia, provider, ambiente e external_id.',
    effort: '1 workshop',
  },
  {
    icon: '03',
    title: 'Piloto com agentes reais',
    desc: 'Selecionar 3 a 5 agentes que já existam ou estejam próximos de produção, cobrindo SaaS/cloud e infraestrutura controlada.',
    effort: '1 sprint',
  },
  {
    icon: '04',
    title: 'Dashboard de qualidade e risco',
    desc: 'Medir completude, freshness, owner coverage, risk coverage, itens sem Service Instance e itens sem correlation_id.',
    effort: '1 sprint',
  },
  {
    icon: '05',
    title: 'Validação com especialistas ServiceNow',
    desc: 'Usar a sessão para validar a semântica contra CSDM 5, CI Class Manager da instância e roadmap de AI Control Tower.',
    effort: 'pontual',
  },
]

const verdictBadgeClass: Record<VerdictKind, string> = {
  approved: styles.verdictBadgeApproved,
  adjust: styles.verdictBadgeAdjust,
  reject: styles.verdictBadgeReject,
}

const verdictBadgeLabel: Record<VerdictKind, string> = {
  approved: '✓ PADRÃO',
  adjust: '⚠ QUANDO APLICAR',
  reject: '✕ NÃO FAZER',
}

const correctedPayload = `{
  "name": "Agente Atendimento PJ",
  "business_owner": "Area de Atendimento PJ",
  "technical_owner": "Squad Gaia",
  "support_group": "GRP-IA-SUPORTE",
  "business_application": "Atendimento Digital PJ",
  "service_instance": "Atendimento Digital PJ - PROD",

  "ai_asset": {
    "type": "AI system",
    "purpose": "Apoiar respostas e abertura de solicitacoes",
    "risk_tier": "HIGH",
    "data_classification": "CONFIDENTIAL",
    "pii_handling": true,
    "decision_authority": "HUMAN_IN_LOOP"
  },

  "deployment": {
    "hosting_model": "CLOUD_MANAGED",
    "recommended_ci_class": "cmdb_ci_function_ai",
    "provider": "AZURE_OPENAI",
    "environment": "PROD",
    "region_or_residency": "BR",
    "external_id": "azure-ai-foundry-agent-123"
  },

  "dependencies": {
    "models": ["GPT-4o"],
    "prompts": ["prompt_atendimento_v1"],
    "datasets": ["Base_Conhecimento_PJ"],
    "apis": ["ServiceNow Case API"]
  },

  "controls": {
    "audit_cadence_days": 90,
    "kill_switch_owner": "GRP-IA-SUPORTE",
    "last_review_date": "2026-05-29"
  }
}`

const correctedHandler = `if no approved AI use exists:
  create AI Digital Asset first
  capture owner, purpose, risk, data, provider, review cadence

if deployment is not visible / not operational:
  do not create operational CI yet
  keep governance at AI Digital Asset layer

if hosting_model in [SAAS, CLOUD_MANAGED, THIRD_PARTY, SERVICENOW_HOSTED]:
  create/link CI as cmdb_ci_function_ai

if hosting_model in [ITAU_MANAGED, ON_PREM, PRIVATE_CLOUD, CONTAINER, KUBERNETES]:
  create/link CI as cmdb_ci_appl_ai_application

always:
  link AI Asset to CI when CI exists
  link CI to Service Instance / business context
  require owner, support group, risk, data classification, external_id
  return HTTP 400 for validation errors, never HTTP 500`

export default function ItauExperience() {
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        {/* ─────────── HERO ─────────── */}
        <section className={styles.hero}>
          <div className={styles.heroBadges}>
            <span className={styles.brandChip}>
              <span className={styles.brandDot} /> Itaú Unibanco
            </span>
            <span className={`${styles.brandChip} ${styles.sn}`}>
              <span className={styles.brandDot} /> ServiceNow
            </span>
            <span className={`${styles.brandChip} ${styles.opr}`}>OPR-2025-0162762</span>
          </div>
          <h1 className={styles.heroTitle}>
            AI Agent Governance no <em>CMDB</em>.
          </h1>
          <p className={styles.heroLede}>
            Resposta objetiva para a dúvida do Itaú: em qual tabela cadastrar agentes de IA,
            como relacionar com CSDM 5 e qual racional usar para governança, operação e auditoria.
          </p>
          <div className={styles.heroMeta}>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>Audience</span>
              <span className={styles.heroMetaValue}>Squad Gaia + Governança</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>Scope</span>
              <span className={styles.heroMetaValue}>CSDM 5 forward-compatible</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>Decision</span>
              <span className={styles.heroMetaValue}>Classe mínima + piloto auditável</span>
            </div>
          </div>
        </section>

        {/* ─────────── VEREDITO ITEM-POR-ITEM ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>resposta direta</span>
            <h2 className={styles.sectionTitle}>
              Não escolha a tabela só pelo nome “AI Agent”.
            </h2>
            <p className={styles.sectionSub}>
              O desenho mais seguro é separar três camadas: governança do ativo de IA,
              deployment operacional na CMDB e contexto CSDM de negócio/serviço. A partir
              daí, a escolha entre <code>cmdb_ci_function_ai</code> e{' '}
              <code>cmdb_ci_appl_ai_application</code> fica simples.
            </p>
          </div>

          <div className={styles.verdictTable}>
            {verdictItems.map((v, i) => (
              <div key={i} className={styles.verdictRow}>
                <span className={`${styles.verdictBadge} ${verdictBadgeClass[v.kind]}`}>
                  {verdictBadgeLabel[v.kind]}
                </span>
                <div>
                  <p className={styles.verdictItemLabel}>{v.item}</p>
                  {v.meta && <span className={styles.verdictItemMeta}>{v.meta}</span>}
                </div>
                <p className={styles.verdictItemBody}>{v.reason}</p>
              </div>
            ))}
          </div>

          <div className={styles.commitBanner}>
            <div>
              <p className={styles.commitKicker}>tese para a reunião</p>
              <h3 className={styles.commitTitle}>
                A CMDB descreve o que está rodando. O AI Inventory governa o que o banco usa.
              </h3>
              <p className={styles.commitSub}>
                Um agente pode existir como ativo de IA sem CI operacional. Ele só deve virar CI
                quando há deployment visível e governável. Depois, precisa estar ligado ao Service
                Instance e ao contexto de negócio para impact, change, risco e auditoria.
              </p>
            </div>
            <div className={styles.commitPledge}>
              Regra prática
              <br />
              <span style={{ color: '#FFCC00' }}>→ SaaS/cloud: AI Function · Itaú-managed: AI & Model Application.</span>
            </div>
          </div>
        </section>

        {/* ─────────── VEREDITO CONCEITUAL ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>racional</span>
            <h2 className={styles.sectionTitle}>O agente não substitui aplicação, serviço ou capability.</h2>
            <p className={styles.sectionSub}>
              A mesma iniciativa de IA pode ter um ativo governado, um deployment técnico e um
              serviço impactado. Misturar essas camadas cria CMDB decorativa e distorce APM,
              Change, Incident e governança.
            </p>
          </div>
          <article className={styles.verdictCard}>
            <span className={styles.verdictStamp}>Recomendação</span>
            <h3 className={styles.verdictHeadline}>
              Usar classes nativas sempre que possível: AI Digital Asset para governança,
              AI Function ou AI & Model Application para CI operacional, e Service Instance
              para contexto CSDM.
            </h3>
            <ul className={styles.verdictList}>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>Ativo de IA</p>
                <p className={styles.verdictItemDesc}>Declara uso, dono, propósito, dados, risco, provedor, revisão e ciclo de vida.</p>
              </li>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>CI operacional</p>
                <p className={styles.verdictItemDesc}>Representa o deployment visível: SaaS/cloud como AI Function; stack Itaú como AI & Model Application.</p>
              </li>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>CSDM</p>
                <p className={styles.verdictItemDesc}>Conecta o CI ao Service Instance, aplicação, serviço, owner e impacto operacional.</p>
              </li>
            </ul>
          </article>
        </section>

        {/* ─────────── 5 RISCOS CRÍTICOS ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>como fazer</span>
            <h2 className={styles.sectionTitle}>Cinco passos para sair da dúvida e virar piloto governado.</h2>
          </div>
          <div className={styles.criticalGrid}>
            {criticalItems.map((item, index) => (
              <article key={item.title} className={styles.criticalCard}>
                <span className={styles.criticalNum}>{index + 1}</span>
                <span className={`${styles.criticalSeverity} ${item.severityClass}`}>{item.severity}</span>
                <h3 className={styles.criticalTitle}>{item.title}</h3>
                <p className={styles.criticalDesc}>{item.description}</p>
                <p className={styles.criticalAction}>
                  <span className={styles.criticalActionLabel}>Ação</span>
                  {item.action}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ─────────── CÓDIGO CORRIGIDO ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>modelo mínimo</span>
            <h2 className={styles.sectionTitle}>
              O cadastro precisa carregar a decisão de classe e o racional.
            </h2>
            <p className={styles.sectionSub}>
              O exemplo abaixo não é um contrato final de API. É o shape mínimo para a conversa:
              governança do ativo, deployment, classe recomendada, dependências e controles de banco regulado.
            </p>
          </div>

          <div className={styles.codeStack}>
            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>POST /api/x_itau/ai_agent/register</span>
                  <h3 className={styles.codeTitle}>Shape recomendado para intake</h3>
                </div>
                <span className={styles.codeStatus}>governance-first</span>
              </div>
              <pre className={styles.codeBlock}>{correctedPayload}</pre>
              <div className={styles.codeNote}>
                <strong>Como usar:</strong>{' '}
                se <code>hosting_model</code> for cloud/SaaS/terceiro, a classe recomendada é{' '}
                <code>cmdb_ci_function_ai</code>. Se for runtime controlado pelo Itaú, usar{' '}
                <code>cmdb_ci_appl_ai_application</code>. Sem deployment visível, ficar só no ativo de IA.
              </div>
            </div>

            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>Scripted REST · process(request, response)</span>
                  <h3 className={styles.codeTitle}>Regra de decisão (pseudocódigo)</h3>
                </div>
                <span className={styles.codeStatus}>sem tabela por intuição</span>
              </div>
              <pre className={styles.codeBlock}>{correctedHandler}</pre>
              <div className={styles.codeNote}>
                <strong>Racional:</strong>{' '}
                a classe deriva da visibilidade operacional e do modelo de hospedagem. Isso protege
                CSDM, evita customização prematura e deixa o desenho pronto para AI Control Tower.
              </div>
            </div>

            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>cmdb_rel_ci</span>
                  <h3 className={styles.codeTitle}>Mapa conceitual de relacionamentos</h3>
                </div>
                <span className={styles.codeStatus}>validar na instância</span>
              </div>
              <div className={styles.relTableWrap}>
                <table className={styles.relTable}>
                  <thead>
                    <tr>
                      <th>Parent</th>
                      <th>Mecanismo</th>
                      <th>Child</th>
                      <th>Semântica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relationships.map((r, i) => (
                      <tr key={i}>
                        <td><code>{r[0]}</code></td>
                        <td><span className={styles.relArrow}>{r[1]}</span></td>
                        <td><code>{r[2]}</code></td>
                        <td>{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.codeNote}>
                <strong>Nota:</strong> os nomes exatos de relacionamento devem ser validados no CI Class Manager
                e nos plugins ativos do Itaú. A recomendação é preservar semântica CSDM e evitar tipo custom
                quando houver mecanismo nativo.
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── RELEASE MAP ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>evolução</span>
            <h2 className={styles.sectionTitle}>Como manter o desenho compatível com AI Control Tower.</h2>
          </div>
          <div className={styles.matrixWrap}>
            <table className={styles.matrix}>
              <thead>
                <tr>
                  <th>Release</th>
                  <th>Leitura arquitetural</th>
                  <th>Decisão recomendada</th>
                </tr>
              </thead>
              <tbody>
                {releaseRows.map(([release, reading, decision, releaseClass]) => (
                  <tr key={release}>
                    <td><span className={`${styles.releaseTag} ${releaseClass}`}>{release}</span></td>
                    <td>{reading}</td>
                    <td>{decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.matrixNote}>
            O objetivo é governança acionável agora, sem bloquear descoberta, runtime, AI Control Tower e evolução nativa futura.
          </p>
        </section>

        {/* ─────────── COMO AJUDAMOS ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>como ajudamos a entregar</span>
            <h2 className={styles.sectionTitle}>
              ServiceNow ajuda a fechar a modelagem, não só a apresentar tabela.
            </h2>
            <p className={styles.sectionSub}>
              A melhor reunião amanhã é sair com critério de decisão, exemplos classificados,
              campos mínimos e piloto. Sem debate abstrato de classe.
            </p>
          </div>

          <div className={styles.helpGrid}>
            {helpItems.map((h) => (
              <article key={h.title} className={styles.helpCard}>
                <span className={styles.helpIcon}>{h.icon}</span>
                <h3 className={styles.helpTitle}>{h.title}</h3>
                <p className={styles.helpDesc}>{h.desc}</p>
                <span className={styles.helpEffort}>{h.effort}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ─────────── ROADMAP ─────────── */}
        <section id="roadmap" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>execução</span>
            <h2 className={styles.sectionTitle}>Roadmap de quatro semanas para piloto auditável.</h2>
          </div>
          <div className={styles.roadmap}>
            {roadmap.map(([when, title, desc, owner], index) => (
              <article key={title} className={`${styles.roadmapItem} ${index === 0 ? styles.done : ''}`}>
                <p className={styles.roadmapWhen}>{when}</p>
                <h3 className={styles.roadmapTitle}>{title}</h3>
                <p className={styles.roadmapDesc}>{desc}</p>
                <span className={styles.roadmapOwner}>{owner}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ─────────── PERGUNTAS ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>perguntas de controle</span>
            <h2 className={styles.sectionTitle}>O checklist que evita CMDB decorativa.</h2>
          </div>
          <div className={styles.questionGrid}>
            {questions.map((question, index) => (
              <article key={question} className={styles.questionCard}>
                <span className={styles.questionNum}>{String(index + 1).padStart(2, '0')}</span>
                <p className={styles.questionText}>{question}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ─────────── CTA ─────────── */}
        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <div>
              <p className={styles.ctaKicker}>próxima decisão</p>
              <h2 className={styles.ctaTitle}>Aprovar piloto com regra de decisão, owners e 3 a 5 agentes reais.</h2>
              <p className={styles.ctaSub}>
                O ganho não é escolher uma tabela. É transformar agente de IA em ativo governável,
                com deployment rastreável e contexto CSDM suficiente para adoção segura.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <a className={styles.ctaActionPrimary} href="#roadmap">Ver execução</a>
              <a className={styles.ctaActionSecondary} href="/tech-partner">Contexto ServiceNow</a>
            </div>
          </div>
        </section>

        <footer className={styles.confidential}>
          <span>Material executivo reservado</span>
          <span className={styles.confidentialAuthor}>Preparado por <strong>Paulo Pierrondi</strong></span>
        </footer>
      </div>
    </main>
  )
}
