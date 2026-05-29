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
    item: 'Classe AI Agent na CMDB',
    meta: 'cmdb_ci_appl_ai_application',
    reason:
      'Escolha correta para releases Vancouver–Yokohama. Pattern canônico de IC abaixo de Application Service. Em Yokohama+ pode estar consolidada com sn_aia_agent_definition — confirmar release antes de promover.',
  },
  {
    kind: 'approved',
    item: 'Classe AI Function / Skill',
    meta: 'cmdb_ci_function_ai',
    reason: 'Classe nativa OOTB. Boa escolha. Manter como contained CI do AI Agent.',
  },
  {
    kind: 'approved',
    item: 'Família AI Assets (Model, Prompt, Dataset, Embedding, Fine-tune)',
    meta: 'alm_ai_*_digital_asset',
    reason:
      'Família correta do AI Asset Management nativo. Recomendado: pré-popular Models comuns (GPT-4o, Claude 3.5, Llama 3) no install para evitar duplicidades.',
  },
  {
    kind: 'approved',
    item: 'AI Agent como IC abaixo de Application Service (1:N)',
    reason:
      'Cardinalidade e camada corretas no CSDM 5. App Service como ponto de entrega; AI Agent como componente executável.',
  },
  {
    kind: 'approved',
    item: 'Relacionamento AI Agent CONTAINS AI Function',
    meta: 'type = Contains',
    reason: 'Tipo padrão SN. Correto. Manter.',
  },
  {
    kind: 'approved',
    item: 'Campos obrigatórios mínimos (name, application_service, repository, support_group, sigla)',
    reason:
      'Boa base. Especialmente repository obrigatório — força rastreabilidade de código. Manter.',
  },
  {
    kind: 'approved',
    item: 'Scripted REST como ponto único de cadastro',
    reason:
      'Decisão arquitetural sólida. Centraliza validação, audit log e governança. Pattern comum em bancos brasileiros.',
  },
  {
    kind: 'adjust',
    item: 'Relacionamento "App Service IMPLEMENTS AI Agent"',
    meta: 'type = Implements (custom)',
    reason:
      'Implements não é tipo padrão de cmdb_rel_type para essa direção. Trocar para Runs on::Runs (AI Agent runs on App Service) ou Hosted on::Hosts. Validar tipo exato no CI Class Manager.',
  },
  {
    kind: 'adjust',
    item: 'Relacionamento "AI Agent USA Model / Prompt / Dataset"',
    meta: 'type = USA (custom)',
    reason:
      'USA não existe como tipo padrão SN. Trocar por Depends on::Used by (semântica de lifecycle) ou Consumes::Consumed by (semântica de runtime).',
  },
  {
    kind: 'reject',
    item: 'Faltam 6 campos de governança BACEN / LGPD / EU AI Act analog',
    reason:
      'Adicionar AGORA ao schema: risk_tier, pii_handling, decision_authority, model_provider, data_residency, last_audit_date. Custo zero hoje; refactor depois de 200 agentes cadastrados.',
  },
  {
    kind: 'reject',
    item: 'Falta correlation_id para link CMDB ↔ Now Assist runtime',
    reason:
      'Sem isso, AI Control Tower vê registry desconectado de execuções reais. Incluir como campo opcional v1, obrigatório quando Agent Studio for ligado.',
  },
  {
    kind: 'reject',
    item: 'HTTP 500 em erro de validação',
    reason:
      'Semanticamente errado e fura SLI/SLO de plataforma de API. Trocar por 400 (Bad Request) com payload {error, field, message}. No script: response.setStatus(400); return.',
  },
  {
    kind: 'reject',
    item: 'JSON exemplo com aspas tipográficas em "sigla"',
    reason:
      'Aspas inteligentes invalidam JSON. Usar aspas retas. Vale revisar todo material para parse-safe.',
  },
]

const criticalItems = [
  {
    title: 'Do cadastro técnico ao controle operacional',
    severity: 'Alta',
    severityClass: styles.severityHigh,
    description:
      'Agentes de IA precisam nascer como CIs governáveis, com owner, finalidade, fonte de dado, risco, dependências e ciclo de vida.',
    action:
      'Criar a classe-alvo em CSDM 5 como extensão controlada, evitando inventário paralelo fora da CMDB.',
  },
  {
    title: 'Risco regulatório não cabe em planilha',
    severity: 'Alta',
    severityClass: styles.severityHigh,
    description:
      'BACEN, LGPD e auditoria exigem trilha de responsabilidade: quem opera, qual dado usa, qual decisão influencia e qual guardrail bloqueia.',
    action:
      'Amarrar AI Agent Governance a policy, risk, data lineage e change control desde o MVP.',
  },
  {
    title: 'Now Assist precisa consumir um modelo limpo',
    severity: 'Média',
    severityClass: styles.severityMed,
    description:
      'AI Control Tower e Now Assist Agent Fabric só escalam com relacionamento claro entre aplicação, capability, serviço, dado e automação.',
    action:
      'Modelar relações mínimas antes de automação: agent to app, app to service, service to owner, owner to risk.',
  },
  {
    title: 'Squad Gaia deve evitar acoplamento prematuro',
    severity: 'Média',
    severityClass: styles.severityMed,
    description:
      'A classe pode ser forward-compatible sem depender de releases futuras para começar a governar agentes reais agora.',
    action:
      'Separar campos estáveis de negócio dos campos experimentais de runtime e telemetria.',
  },
  {
    title: 'MVP precisa provar aderência, não volume',
    severity: 'Baixa',
    severityClass: styles.severityLow,
    description:
      'O primeiro valor é mostrar rastreabilidade ponta a ponta em poucos agentes críticos, não cadastrar centenas de itens sem uso operacional.',
    action:
      'Selecionar 3 a 5 agentes com criticidade real e fechar discovery, modelo, carga, revisão e operação assistida.',
  },
]

const releaseRows = [
  ['Vancouver', 'Sem classe nativa madura para AI Agent Governance', 'Extensão custom controlada', styles.releaseVancouver],
  ['Washington', 'Primeiros padrões de AI governance começam a aparecer', 'Preservar compatibilidade de campos', styles.releaseWashington],
  ['Xanadu', 'Maior maturidade de Now Assist e agent lifecycle', 'Revisar mappings e evitar lock-in', styles.releaseXanadu],
  ['Yokohama', 'Expansão do Agent Fabric e controles operacionais', 'Preparar migração seletiva', styles.releaseYokohama],
  ['Zurich+', 'Consolidação de AI Control Tower como consumo executivo', 'Promover de MVP para operação', styles.releaseZurich],
]

const roadmap = [
  ['Semana 1', 'Classe e dicionário mínimo', 'Definir atributos obrigatórios, ownership, criticidade e relacionamentos CSDM.', 'Gaia + ServiceNow'],
  ['Semana 2', 'Carga piloto', 'Cadastrar agentes críticos com evidência de dados, automações e owners.', 'Gaia'],
  ['Semana 3', 'Governança e auditoria', 'Amarrar risk, change, policy e trilha de aprovação para agentes sensíveis.', 'Governança'],
  ['Semana 4', 'Operação assistida', 'Publicar dashboard executivo e runbook de manutenção do cadastro.', 'Squad + Operação'],
]

const questions = [
  'Qual agente influencia decisão regulada, cliente, crédito, fraude, atendimento ou operação crítica?',
  'Quem é accountable quando o agente erra, para, alucina ou usa dado incorreto?',
  'Qual dado alimenta o agente e qual classificação de sensibilidade se aplica?',
  'A automação tem kill switch, owner de suporte e janela de manutenção?',
  'O relacionamento com serviço de negócio está explícito ou inferido fora da CMDB?',
  'Qual evidência prova que o agente continua aderente depois de mudança de modelo?',
]

const relationships: Array<[string, string, string, string]> = [
  ['cmdb_ci_appl_ai_application', 'Runs on::Runs', 'cmdb_ci_service_auto', 'AI Agent roda sobre Application Service'],
  ['cmdb_ci_appl_ai_application', 'Contains::Contained by', 'cmdb_ci_function_ai', 'AI Agent contém Functions/Skills'],
  ['cmdb_ci_appl_ai_application', 'Depends on::Used by', 'alm_ai_model_digital_asset', 'AI Agent depende de Model'],
  ['cmdb_ci_appl_ai_application', 'Depends on::Used by', 'alm_ai_prompt_digital_asset', 'AI Agent depende de Prompt'],
  ['cmdb_ci_appl_ai_application', 'Depends on::Used by', 'alm_ai_dataset_digital_asset', 'AI Agent depende de Dataset'],
  ['cmdb_ci_appl_ai_application', 'Consumes::Consumed by', 'cmdb_ci_api', 'AI Agent consome APIs'],
  ['cmdb_ci_appl_ai_application', 'Owned by::Owns', 'sys_user_group', 'Support group accountable'],
]

const helpItems: Array<{
  icon: string
  title: string
  desc: string
  effort: string
}> = [
  {
    icon: '01',
    title: 'Pair review do código atual',
    desc: 'Sessão técnica 2h com Mark Bodman (CMDB Product) e Squad Gaia. Revisamos Scripted REST handler, schema da extensão e mapa de relacionamentos, line-by-line. Saída: lista de ajustes priorizada.',
    effort: '2h · esta sprint',
  },
  {
    icon: '02',
    title: 'Provisionar Now Assist Agent Studio Lab em HML',
    desc: 'Habilitar o lab Now Assist Agent Studio na instância HML do Itaú para o piloto. Demonstra link CMDB ↔ runtime real, não diagrama.',
    effort: '1 semana',
  },
  {
    icon: '03',
    title: 'Co-build do schema CSDM extension',
    desc: 'Trazemos baseline de dictionary com os 6 campos de governança já mapeados para BACEN/LGPD. Squad Gaia adapta para o vocabulário interno do Itaú.',
    effort: '4h workshop',
  },
  {
    icon: '04',
    title: 'CMDB Health KPIs + AI Audit dashboard',
    desc: 'Configuramos as métricas de qualidade do registry (completeness, accuracy, freshness) e o dashboard de AI Audit para a equipe de governança usar desde o piloto.',
    effort: '1 sprint',
  },
  {
    icon: '05',
    title: 'Conexão com SN Customer Success — AI Pillar',
    desc: 'Plugamos o Itaú no programa de AI Governance Customer Success da ServiceNow. Acesso a benchmark de FSI global, roadmap antecipado e patches específicos.',
    effort: 'contínuo',
  },
]

const verdictBadgeClass: Record<VerdictKind, string> = {
  approved: styles.verdictBadgeApproved,
  adjust: styles.verdictBadgeAdjust,
  reject: styles.verdictBadgeReject,
}

const verdictBadgeLabel: Record<VerdictKind, string> = {
  approved: '✓ APROVADO',
  adjust: '⚠ AJUSTAR',
  reject: '✕ TROCAR',
}

const correctedPayload = `{
  "agent_name": "Chatbot Atendimento IA",
  "agent_code": "OF-IA-ATEND-001",
  "description": "Agente de IA para atendimento ao cliente",
  "sigla": "FK5",
  "version": "1.0.0",
  "environment": "PROD",
  "criticality": "ALTA",
  "repository": "github.com/itau/chatbot-ia",
  "support_group": "GRP-IA-SUPORTE",
  "application_service": "Chatbot Service - PROD",
  "service_offering": "Chatbot Atendimento IA",

  "correlation_id": "",
  "risk_tier": "HIGH",
  "pii_handling": true,
  "decision_authority": "HUMAN_IN_LOOP",
  "model_provider": "AZURE_OPENAI",
  "data_residency": "BR",
  "last_audit_date": "2026-05-29",
  "audit_cadence_days": 90,

  "functions": [
    { "name": "Consulta FAQ" },
    { "name": "Abertura Ticket" }
  ],
  "models":   ["GPT-4o"],
  "prompts":  ["prompt_atendimento_v1"],
  "datasets": ["Base_Conhecimento"],
  "vector_store": "Pinecone-Prod",
  "monitoring":   "Datadog",
  "tags": ["IA", "Atendimento", "RAG"]
}`

const correctedHandler = `(function process(request, response) {

  var body = request.body && request.body.data;
  if (!body) {
    return _bad(response, 'missing_body', null, 'Payload obrigatorio.');
  }

  // ── VALIDACOES (HTTP 400, nao 500) ────────────────────────────
  var required = [
    'agent_name', 'application_service', 'support_group',
    'repository', 'sigla', 'version', 'environment'
  ];
  for (var i = 0; i < required.length; i++) {
    if (!body[required[i]]) {
      return _bad(response, 'missing_field', required[i],
        'Campo obrigatorio: ' + required[i]);
    }
  }

  // governance metadata (BACEN / LGPD)
  var govFields = [
    'risk_tier', 'pii_handling',
    'decision_authority', 'model_provider', 'data_residency'
  ];
  for (var g = 0; g < govFields.length; g++) {
    if (body[govFields[g]] === undefined) {
      return _bad(response, 'missing_governance_field',
        govFields[g], 'Campo de governanca obrigatorio: ' + govFields[g]);
    }
  }

  // ── CRIA AI AGENT ─────────────────────────────────────────────
  var ai = new GlideRecord('cmdb_ci_appl_ai_application');
  ai.initialize();
  ai.name                  = body.agent_name;
  ai.short_description     = body.description || '';
  ai.version               = body.version;
  ai.environment           = body.environment;
  ai.support_group         = body.support_group;
  ai.u_repository          = body.repository;
  ai.u_sigla               = body.sigla;
  ai.u_risk_tier           = body.risk_tier;
  ai.u_pii_handling        = !!body.pii_handling;
  ai.u_decision_authority  = body.decision_authority;
  ai.u_model_provider      = body.model_provider;
  ai.u_data_residency      = body.data_residency;
  ai.u_correlation_id      = body.correlation_id || '';
  ai.u_last_audit_date     = body.last_audit_date || '';
  ai.u_audit_cadence_days  = body.audit_cadence_days || 180;
  ai.category              = 'Artificial Intelligence';
  var aiSysId = ai.insert();

  // ── RELACIONAMENTO Runs on (App Service) ──────────────────────
  _rel(aiSysId, body.application_service, 'Runs on::Runs');

  // ── FUNCTIONS (Contains) ──────────────────────────────────────
  var funcs = body.functions || [];
  for (var f = 0; f < funcs.length; f++) {
    var fn = new GlideRecord('cmdb_ci_function_ai');
    fn.initialize();
    fn.name = funcs[f].name;
    var fnSysId = fn.insert();
    _rel(aiSysId, fnSysId, 'Contains::Contained by');
  }

  // ── ASSETS (Depends on) ───────────────────────────────────────
  _link(aiSysId, 'alm_ai_model_digital_asset',  body.models  || []);
  _link(aiSysId, 'alm_ai_prompt_digital_asset', body.prompts || []);
  _link(aiSysId, 'alm_ai_dataset_digital_asset', body.datasets || []);

  // ── RESPONSE ──────────────────────────────────────────────────
  response.setStatus(201);
  response.setBody({
    status: 'created',
    sys_id: aiSysId,
    correlation_id: body.correlation_id || null,
    risk_tier: body.risk_tier,
    governance_complete: true
  });

  function _bad(r, code, field, msg) {
    r.setStatus(400);
    r.setBody({ error: code, field: field, message: msg });
  }

  function _rel(parent, child, type) {
    var typeId = _getRelType(type);
    if (!typeId || !parent || !child) return;
    var rel = new GlideRecord('cmdb_rel_ci');
    rel.initialize();
    rel.parent = parent;
    rel.child  = child;
    rel.type   = typeId;
    rel.insert();
  }

  function _link(agentSysId, assetTable, names) {
    for (var i = 0; i < names.length; i++) {
      var ga = new GlideRecord(assetTable);
      if (ga.get('name', names[i])) {
        _rel(agentSysId, ga.getUniqueValue(), 'Depends on::Used by');
      }
    }
  }

  function _getRelType(label) {
    var gr = new GlideRecord('cmdb_rel_type');
    if (gr.get('name', label)) return gr.getUniqueValue();
    return null;
  }
})(request, response);`

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
            Proposta executiva para cadastrar, governar e operar agentes de IA como ativos de negócio
            rastreáveis, alinhados ao CSDM 5 e prontos para evoluir com AI Control Tower e Now Assist Agent Fabric.
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
            <span className={styles.sectionKicker}>veredito item-por-item</span>
            <h2 className={styles.sectionTitle}>
              Sua proposta, avaliada sem rodeios.
            </h2>
            <p className={styles.sectionSub}>
              Cada elemento do desenho da Squad Gaia recebe um veredito direto.
              7 itens APROVADOS — vocês acertaram. 2 itens AJUSTAR — refinos pontuais
              nos tipos de relacionamento. 4 itens TROCAR — gaps de governança e bugs
              de implementação que precisam ser endereçados antes do v1.
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
              <p className={styles.commitKicker}>nosso compromisso</p>
              <h3 className={styles.commitTitle}>
                Não vamos apenas apontar gaps — vamos sentar junto e fechar.
              </h3>
              <p className={styles.commitSub}>
                Tudo que está marcado como AJUSTAR ou TROCAR vem com código corrigido
                pronto pra copiar (próxima seção) e proposta de pair-programming
                com Mark Bodman (CMDB Product).
              </p>
            </div>
            <div className={styles.commitPledge}>
              7 APROVADO · 2 AJUSTAR · 4 TROCAR
              <br />
              <span style={{ color: '#FFCC00' }}>→ todos cabem na MESMA sprint da API.</span>
            </div>
          </div>
        </section>

        {/* ─────────── VEREDITO CONCEITUAL ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>veredito conceitual</span>
            <h2 className={styles.sectionTitle}>Não trate agente de IA como aplicação comum.</h2>
            <p className={styles.sectionSub}>
              O cadastro precisa capturar comportamento, dependência de dados, accountability,
              guardrails e evidência operacional. Sem isso, a CMDB registra presença, mas não governa risco.
            </p>
          </div>
          <article className={styles.verdictCard}>
            <span className={styles.verdictStamp}>Recomendação</span>
            <h3 className={styles.verdictHeadline}>
              Criar uma classe controlada para AI Agent como extensão CSDM, com relacionamentos mínimos
              para serviço, aplicação, owner, dado, automação e risco.
            </h3>
            <ul className={styles.verdictList}>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>Governança</p>
                <p className={styles.verdictItemDesc}>Owner, criticidade, política, aprovação e ciclo de vida desde o primeiro registro.</p>
              </li>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>Operação</p>
                <p className={styles.verdictItemDesc}>Relações explícitas com serviço de negócio, aplicação, dados e automações dependentes.</p>
              </li>
              <li className={styles.verdictItem}>
                <p className={styles.verdictItemTitle}>Evolução</p>
                <p className={styles.verdictItemDesc}>Modelo preparado para migrar quando o AI Control Tower amadurecer no roadmap ServiceNow.</p>
              </li>
            </ul>
          </article>
        </section>

        {/* ─────────── 5 RISCOS CRÍTICOS ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>riscos críticos</span>
            <h2 className={styles.sectionTitle}>Cinco pontos que travam escala segura.</h2>
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
            <span className={styles.sectionKicker}>código corrigido — copy/paste-ready</span>
            <h2 className={styles.sectionTitle}>
              Versões prontas para a Squad Gaia trocar 1-para-1.
            </h2>
            <p className={styles.sectionSub}>
              O que vai abaixo é o payload da API e o Scripted REST handler, ajustados com os 6 campos
              de governança, correlation_id, HTTP 400 em vez de 500, e tipos de relacionamento padrão SN.
              Sem inventar nada — só consertar e completar.
            </p>
          </div>

          <div className={styles.codeStack}>
            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>POST /api/x_itau/ai_agent/register</span>
                  <h3 className={styles.codeTitle}>Payload corrigido (JSON)</h3>
                </div>
                <span className={styles.codeStatus}>v1 forward-compat</span>
              </div>
              <pre className={styles.codeBlock}>{correctedPayload}</pre>
              <div className={styles.codeNote}>
                <strong>Mudanças vs. proposta original:</strong>{' '}
                aspas tipográficas corrigidas; adicionados correlation_id, risk_tier, pii_handling,
                decision_authority, model_provider, data_residency, last_audit_date,
                audit_cadence_days. functions virou array de objetos para suportar metadata futura.
              </div>
            </div>

            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>Scripted REST · process(request, response)</span>
                  <h3 className={styles.codeTitle}>Handler corrigido (Server JS)</h3>
                </div>
                <span className={styles.codeStatus}>HTTP 400 · OOTB rels</span>
              </div>
              <pre className={styles.codeBlock}>{correctedHandler}</pre>
              <div className={styles.codeNote}>
                <strong>Mudanças vs. proposta original:</strong>{' '}
                throw &apos;string&apos; substituído por response.setStatus(400) + payload estruturado;
                validação separa governance fields; tipos de rel buscados dinamicamente em cmdb_rel_type
                (sem hardcode); functions/assets criados via helpers reutilizáveis;
                response 201 retorna correlation_id e governance_complete.
              </div>
            </div>

            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.codeHeaderLeft}>
                  <span className={styles.codeKicker}>cmdb_rel_ci</span>
                  <h3 className={styles.codeTitle}>Mapa de relacionamentos (tipos padrão SN)</h3>
                </div>
                <span className={styles.codeStatus}>OOTB only</span>
              </div>
              <div style={{ padding: '0 8px' }}>
                <table className={styles.relTable}>
                  <thead>
                    <tr>
                      <th>Parent</th>
                      <th>Type</th>
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
                <strong>Nota:</strong> nenhum tipo custom. Todos são da cmdb_rel_type padrão.
                Antes de aplicar, validar que existem na release do Itaú (alguns nomes variam
                entre Vancouver e Zurich).
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── RELEASE MAP ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>release map</span>
            <h2 className={styles.sectionTitle}>Como manter o desenho compatível com o roadmap.</h2>
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
            O objetivo é começar com governança acionável agora, sem bloquear a migração para capacidades nativas futuras.
          </p>
        </section>

        {/* ─────────── COMO AJUDAMOS ─────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>como ajudamos a entregar</span>
            <h2 className={styles.sectionTitle}>
              ServiceNow entra na sala — junto com vocês.
            </h2>
            <p className={styles.sectionSub}>
              Esse engagement não é assessment de fora. É co-creation hands-on,
              com pair-programming, lab provisionado e benchmark de FSI global.
              Vocês decidem; nós aceleramos a entrega.
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
              <h2 className={styles.ctaTitle}>Aprovar o piloto com classe mínima, owners e 3 a 5 agentes reais.</h2>
              <p className={styles.ctaSub}>
                O ganho não é cadastrar mais rápido; é transformar agente de IA em ativo governável,
                com rastreabilidade suficiente para adoção segura e expansão de Now Assist.
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
