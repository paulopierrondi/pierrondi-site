'use client'

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import {
  AnimatePresence,
  motion,
  type MotionStyle,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Brain,
  CircleDot,
  Code2,
  DatabaseZap,
  Gauge,
  GitBranch,
  Headphones,
  LockKeyhole,
  Maximize2,
  MonitorPlay,
  Network,
  Pause,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
  Volume2,
  Workflow,
  X,
} from 'lucide-react'
import styles from './Bradesco26Experience.module.css'

type Lens = 'executivo' | 'tecnico' | 'valor'
type Theme = 'all' | 'ai' | 'data' | 'ops' | 'risk' | 'dev'

type DeepDive = {
  premise: string
  doubleClick: string
  talkTrack: string
  watchouts: string[]
  workshop: string[]
}

const lenses: Array<{ id: Lens; label: string; helper: string }> = [
  { id: 'executivo', label: 'Executivo', helper: 'Por que importa' },
  { id: 'tecnico', label: 'Técnico', helper: 'Como viabilizar' },
  { id: 'valor', label: 'Valor', helper: 'Próximo movimento' },
]

const themes: Array<{ id: Theme; label: string }> = [
  { id: 'all', label: 'Todos' },
  { id: 'ai', label: 'IA e agentes' },
  { id: 'data', label: 'Dados e CMDB' },
  { id: 'ops', label: 'Operações' },
  { id: 'risk', label: 'Risco' },
  { id: 'dev', label: 'Plataforma dev' },
]

const capabilitySet = [
  'ITSM',
  'ITOM / CMDB',
  'SPM',
  'HRSD',
  'App Engine',
  'SecOps',
  'IRM / VRM / TPRM',
  'SAM / HAM',
  'CSM / Ouvidoria',
  'IntegrationHub / WDF',
  'Now Assist',
]

const thesis = [
  {
    icon: ShieldCheck,
    title: 'Governar',
    copy: 'Política, identidade, telemetria e auditoria desde o desenho.',
  },
  {
    icon: DatabaseZap,
    title: 'Contextualizar',
    copy: 'Dados, serviços e conhecimento como base para decisão confiável.',
  },
  {
    icon: Workflow,
    title: 'Executar',
    copy: 'Agentes conectando recomendação, aprovação e ação ponta a ponta.',
  },
]

const motionTicker = [
  'AI governance',
  'Context engine',
  'Workflow data fabric',
  'Action Fabric',
  'CMDB / CSDM',
  'Risk by design',
  'System of action',
]

const chapters = [
  {
    number: '01',
    title: 'AI & Plataforma',
    copy: 'AI Control Tower, Otto e Action Fabric como sistema governado de trabalho.',
    items: ['AI Control Tower', 'Otto', 'Action Fabric'],
    targetId: 'control-tower',
  },
  {
    number: '02',
    title: 'Developers',
    copy: 'Build Agent, App Engine e Project Arc para escala com padrão e revisão.',
    items: ['Build Agent', 'App Engine', 'Project Arc'],
    targetId: 'build-agent',
  },
  {
    number: '03',
    title: 'Autonomous IT',
    copy: 'ITSM, ITOM, CMDB e SPM conectados por contexto operacional.',
    items: ['ITSM', 'ITOM / CMDB', 'SPM'],
    targetId: 'specialists',
  },
  {
    number: '04',
    title: 'FSI & Atendimento',
    copy: 'FSO, CSM e ouvidoria como jornada, evidência e continuidade.',
    items: ['FSO', 'CSM', 'Ouvidoria'],
    targetId: 'otto',
  },
  {
    number: '05',
    title: 'Security & Risk',
    copy: 'Identidade, ativo, risco e resposta no mesmo sistema de ação.',
    items: ['SecOps', 'IRM / VRM', 'Veza / Armis'],
    targetId: 'security-risk',
  },
  {
    number: '06',
    title: 'Arquitetura',
    copy: 'Camadas técnicas para transformar anúncio em plano executável.',
    items: ['WDF', 'Context Engine', 'Guardrails'],
    targetId: 'context-engine',
  },
]

const announcements = [
  {
    id: 'control-tower',
    theme: 'ai',
    number: '01',
    icon: Radar,
    title: 'AI Control Tower',
    subtitle:
      'Controle central para agentes, modelos, dados, risco e resultado.',
    executive:
      'Tira IA do modo experimento e coloca a operação sob governança, visibilidade e métricas.',
    technical:
      'Exige inventário de agentes, runtime observável, IAM, CMDB, logs, políticas e critérios de aprovação.',
    value:
      'Usar como trilha-mestra para qualquer piloto de Now Assist ou agente externo.',
    bradescoAngle:
      'Camada comum para governar Now Assist, agentes internos e agentes externos.',
    architecture:
      'Inventário de agentes, runtime observável, IAM, CMDB, logs, políticas e métricas.',
    operatingModel:
      'Fórum único para aprovar exceções, permissões, risco e entrada em produção.',
    nextMove:
      'Escolher um domínio piloto e mapear assistentes/agentes já existentes.',
    proofPoints: ['Discover', 'Observe', 'Govern', 'Secure', 'Measure'],
    discussion: {
      executivo: 'Quem assina o modelo de governança de IA operacional?',
      tecnico: 'Quais logs, IAM e CMDB precisam existir antes de produção?',
      valor: 'Qual piloto precisa de governança antes de escalar?',
    },
  },
  {
    id: 'otto',
    theme: 'ai',
    number: '02',
    icon: Bot,
    title: 'ServiceNow Otto',
    subtitle:
      'Interface conversacional única para transformar intenção em resultado.',
    executive:
      'O colaborador pede o resultado. A plataforma decide fluxo, política, aprovação e handoff.',
    technical:
      'Depende de catálogo, base de conhecimento, elegibilidade, identidade, approvals e integrações.',
    value:
      'Começar por jornadas de alto volume e baixa ambiguidade com escala humana clara.',
    bradescoAngle:
      'Experiência unificada para colaborador, operador e líder sem navegar por silos.',
    architecture:
      'Intenção, catálogo, KB, identidade, approvals, integrações e handoff humano.',
    operatingModel:
      'Curadoria de jornadas, responsáveis por conhecimento e monitoramento de resolução.',
    nextMove:
      'Selecionar duas jornadas internas com volume alto e regra de elegibilidade clara.',
    proofPoints: [
      'Natural language',
      'Enterprise search',
      'Voice',
      'Cross-system work',
    ],
    discussion: {
      executivo:
        'Qual jornada deve desaparecer do portal e virar conversa resolutiva?',
      tecnico:
        'Quais catálogos, bases e approvals precisam estar confiáveis para Otto?',
      valor: 'Onde reduzir navegação manual sem aumentar risco operacional?',
    },
  },
  {
    id: 'specialists',
    theme: 'ops',
    number: '03',
    icon: Brain,
    title: 'AI Specialists',
    subtitle: 'Agentes por função executando processos completos.',
    executive:
      'O K26 desloca a conversa de assistente individual para trabalho autônomo governado.',
    technical:
      'Precisa de taxonomia, conhecimento confiável, critérios de confiança, exceções e métricas.',
    value:
      'O primeiro piloto deve ter alto volume, caminho conhecido e baixo risco operacional.',
    bradescoAngle:
      'Agentes por função para tirar trabalho repetitivo da fila, com controle.',
    architecture:
      'Taxonomia, conhecimento, regras de exceção, confiança, fila e medição de resultado.',
    operatingModel:
      'Cada agente precisa de responsável, escopo permitido e critério de fallback.',
    nextMove:
      'Priorizar um processo repetitivo com dados maduros e caminho de resolução conhecido.',
    proofPoints: [
      'Role-based agents',
      'Exception handling',
      'Knowledge quality',
      'Human fallback',
    ],
    discussion: {
      executivo:
        'Qual operação ganha escala se o agente resolver o repetitivo?',
      tecnico:
        'Quais sinais indicam baixa confiança e retorno imediato para humano?',
      valor:
        'Qual processo tem volume suficiente para provar resultado em semanas?',
    },
  },
  {
    id: 'action-fabric',
    theme: 'ai',
    number: '04',
    icon: Network,
    title: 'Action Fabric e MCP',
    subtitle: 'Agentes externos acionando trabalho governado na ServiceNow.',
    executive:
      'A plataforma vira sistema de ação para agentes corporativos, inclusive fora da ServiceNow.',
    technical:
      'Separar leitura de dados de execução: RBAC, OAuth, approvals, auditoria e rollback.',
    value:
      'Integra agentes Microsoft, modelos internos e apps próprios sem perder governança central.',
    bradescoAngle:
      'Transforma a ServiceNow no sistema de ação para agentes corporativos.',
    architecture:
      'MCP Server, OAuth, tool packages, RBAC, approvals, auditoria e rollback.',
    operatingModel:
      'Catalogar quais ações podem ser executadas por agente e com qual aprovação.',
    nextMove:
      'Publicar primeiro um conjunto pequeno de ações seguras e auditáveis.',
    proofPoints: ['MCP', 'Headless actions', 'Approvals', 'Audit trail'],
    discussion: {
      executivo:
        'Quais agentes externos devem agir pela plataforma, e não fora dela?',
      tecnico:
        'Quais ferramentas MCP podem ser expostas sem abrir risco desnecessário?',
      valor: 'Qual ação simples provaria execução governada ponta a ponta?',
    },
  },
  {
    id: 'context-engine',
    theme: 'data',
    number: '05',
    icon: GitBranch,
    title: 'Context Engine',
    subtitle: 'Contexto operacional para evitar resposta genérica.',
    executive:
      'CMDB e CSDM deixam de ser higiene de TI e viram fundação para IA confiável.',
    technical:
      'Depende de relações, responsáveis, serviços, políticas, SLAs, histórico e conhecimento.',
    value:
      'Conectar o programa de CMDB ao roadmap de IA e automação governada.',
    bradescoAngle:
      'Converte CMDB/CSDM em contexto vivo para decisão automatizada.',
    architecture:
      'Serviços, responsáveis, dependências, SLAs, políticas, conhecimento e histórico.',
    operatingModel:
      'Governança de qualidade de contexto ligada aos domínios de automação.',
    nextMove:
      'Escolher relações críticas para um caso de IA antes de ampliar escopo.',
    proofPoints: ['CMDB', 'CSDM', 'Knowledge Graph', 'Context Engine'],
    discussion: {
      executivo: 'Qual decisão de IA fica insegura sem contexto de serviço?',
      tecnico:
        'Quais relacionamentos da CMDB são obrigatórios para o primeiro agente?',
      valor: 'Qual domínio melhora se a CMDB virar contexto de decisão?',
    },
  },
  {
    id: 'wdf',
    theme: 'data',
    number: '06',
    icon: Boxes,
    title: 'Workflow Data Fabric',
    subtitle: 'Dados em tempo real sem copiar tudo para dentro da instância.',
    executive:
      'A promessa é enriquecer decisões com dados onde eles vivem, reduzindo fricção de integração.',
    technical:
      'Tratar fonte de verdade, autorização, latência, contratos de dados, lineage e observabilidade.',
    value:
      'Escolher poucos dados externos que destravam decisões de IT, risco, atendimento ou portfolio.',
    bradescoAngle:
      'Permite enriquecer workflows com dados externos sem replicar tudo.',
    architecture:
      'Fonte de verdade, autorização, latência, contratos de dados, lineage e observabilidade.',
    operatingModel:
      'Responsáveis por dados conectados aos donos dos workflows consumidores.',
    nextMove:
      'Mapear três dados externos que mudam uma decisão operacional concreta.',
    proofPoints: [
      'Data federation',
      'Authorization',
      'Lineage',
      'Operational context',
    ],
    discussion: {
      executivo: 'Qual dado fora da plataforma muda uma decisão importante?',
      tecnico:
        'Como controlar autorização, latência e linhagem antes de usar em IA?',
      valor:
        'Qual integração evita trabalho manual sem criar cópia desnecessária?',
    },
  },
  {
    id: 'security-risk',
    theme: 'risk',
    number: '07',
    icon: LockKeyhole,
    title: 'Autonomous Security and Risk',
    subtitle:
      'Identidades, ativos e risco conectados ao mesmo sistema de ação.',
    executive:
      'Com agentes crescendo, identidade não humana e autorização viram tema executivo.',
    technical:
      'Cobrir identidade humana e não humana, least privilege, ativos, CMDB vivo e resposta auditável.',
    value:
      'IA confiável exige governar quem ou o que pode agir, sobre qual ativo e com qual evidência.',
    bradescoAngle:
      'Traz agente, identidade, ativo e risco para o mesmo desenho operacional.',
    architecture:
      'Identidade humana e não humana, least privilege, ativo, CMDB e resposta auditável.',
    operatingModel:
      'Risk, security e operação definem permissões e respostas por tipo de agente.',
    nextMove:
      'Mapear identidades não humanas e ações automatizadas de maior risco.',
    proofPoints: [
      'Non-human identity',
      'Least privilege',
      'Asset context',
      'Risk response',
    ],
    discussion: {
      executivo: 'Onde a escala de agentes muda o apetite de risco?',
      tecnico:
        'Como correlacionar API, identidade, agente e ativo em tempo real?',
      valor: 'Qual risco pode ser reduzido conectando identidade e workflow?',
    },
  },
  {
    id: 'spm',
    theme: 'ops',
    number: '08',
    icon: Gauge,
    title: 'SPM com IA',
    subtitle:
      'Portfolio, dependências e priorização conectados ao contexto operacional.',
    executive:
      'Portfolio, demanda, execução e arquitetura deixam de ser silos de decisão.',
    technical:
      'Discutir modelo de dados, integrações, migração, qualidade de épicos e governança de mudança.',
    value:
      'Evoluir de ferramenta de planejamento para sistema de decisão de portfolio.',
    bradescoAngle:
      'Conecta demanda, capacidade, risco e execução em uma visão única de portfolio.',
    architecture:
      'Modelo de dados, integrações, migração, épicos, capacidade e mudanças.',
    operatingModel:
      'Ritual de portfolio decide com dados, dependências e critérios comuns.',
    nextMove:
      'Selecionar um fluxo de decisão de portfolio para redesenhar com SPM.',
    proofPoints: ['Demand', 'Capacity', 'Dependencies', 'Execution metrics'],
    discussion: {
      executivo:
        'Qual decisão de portfolio hoje depende de planilhas paralelas?',
      tecnico:
        'Quais objetos precisam ficar consistentes entre Jira, SPM e execução?',
      valor:
        'Qual decisão mensal poderia virar rotina governada na plataforma?',
    },
  },
  {
    id: 'build-agent',
    theme: 'dev',
    number: '09',
    icon: Code2,
    title: 'Build Agent',
    subtitle: 'Desenvolvimento ServiceNow assistido por IA.',
    executive:
      'Mais capacidade de entrega, mas com padrão, revisão e rastreabilidade.',
    technical:
      'Separar produtividade de controle: ambientes, ACLs, regras, Git, review e App Engine.',
    value: 'Escalar criação de apps sem abrir mão de arquitetura e governança.',
    bradescoAngle:
      'Acelera desenvolvimento ServiceNow com padrão, revisão e governança.',
    architecture:
      'Ambientes, ACLs, regras, Git, review, App Engine e esteira de promoção.',
    operatingModel:
      'Padrões reutilizáveis, guardrails técnicos e revisão antes de produção.',
    nextMove:
      'Escolher um app novo para nascer com esteira e code review desde o primeiro dia.',
    proofPoints: ['App Engine', 'Git', 'Review', 'Reusable patterns'],
    discussion: {
      executivo: 'Onde acelerar app sem aumentar débito técnico?',
      tecnico: 'Quais padrões precisam ser obrigatórios para Build Agent?',
      valor: 'Qual app prova produtividade com governança de entrega?',
    },
  },
  {
    id: 'project-arc',
    theme: 'dev',
    number: '10',
    icon: Sparkles,
    title: 'Project Arc com NVIDIA',
    subtitle: 'Agente desktop governado para trabalho multi-etapa.',
    executive:
      'Explora automação de sistemas e interfaces legadas com sandbox, política e auditoria.',
    technical:
      'Tema exploratório: sandbox, logs, rollback, escopo permitido e limites de produção.',
    value:
      'Mapear processos legados onde API não resolve antes de discutir escala.',
    bradescoAngle:
      'Explora automação governada de sistemas legados e tarefas multi-etapa.',
    architecture:
      'Desktop agent, sandbox, logs, comandos, APIs chamadas, rollback e política.',
    operatingModel:
      'Uso exploratório com escopo restrito, aprovação prévia e trilha auditável.',
    nextMove:
      'Mapear processos sem API onde automação desktop faria sentido controlado.',
    proofPoints: [
      'OpenShell sandbox',
      'AI Control Tower',
      'Action Fabric',
      'CMDB context',
    ],
    discussion: {
      executivo:
        'Qual processo legado justifica testar agente desktop governado?',
      tecnico:
        'Quais limites de sandbox, rollback e auditoria seriam obrigatórios?',
      valor: 'Onde a falta de API ainda trava automação de ponta a ponta?',
    },
  },
]

const deepDives: Record<string, DeepDive> = {
  'control-tower': {
    premise:
      'A pergunta deixa de ser qual agente usar e vira quem enxerga, aprova, monitora e mede o agente em produção.',
    doubleClick:
      'Começar por um inventário vivo de agentes e assistentes, classificando cada um por dado consumido, permissão, criticidade, dependência operacional e indicador de resultado. Sem essa camada, a escala de IA vira uma coleção de pilotos desconectados.',
    talkTrack:
      'Para Bradesco, AI Control Tower pode ser discutido como a sala de comando da IA operacional: não substitui as plataformas existentes, mas cria visibilidade comum para agentes, modelos, dados, risco e resultado antes de escalar.',
    watchouts: [
      'Agente sem responsável claro',
      'Log técnico sem contexto de negócio',
      'Permissão fora do modelo de identidade',
      'Métrica limitada a uso, sem resultado operacional',
    ],
    workshop: [
      'Inventário inicial de agentes e assistentes',
      'Política de aprovação por risco',
      'Telemetria mínima para piloto',
      'Ritual de exceção e revisão executiva',
    ],
  },
  otto: {
    premise:
      'Otto muda a interface: o usuário descreve o resultado, e a plataforma orquestra conhecimento, fluxo, aprovação e handoff.',
    doubleClick:
      'A leitura técnica deve separar experiência conversacional de prontidão operacional. A qualidade depende de catálogo, conhecimento, elegibilidade, identidade e integrações funcionando como uma jornada única.',
    talkTrack:
      'Para Bradesco, Otto faz sentido quando a jornada já tem regra clara e alto volume. O ganho não vem de trocar a tela por chat, mas de reduzir navegação, ambiguidade e transferência manual entre áreas.',
    watchouts: [
      'Base de conhecimento desatualizada',
      'Catálogo com regra implícita',
      'Aprovação fora do fluxo',
      'Handoff humano sem contexto da conversa',
    ],
    workshop: [
      'Selecionar duas jornadas internas de alto volume',
      'Mapear intenções e variações de linguagem',
      'Validar catálogo, KB e approvals',
      'Definir quando Otto resolve e quando transfere',
    ],
  },
  specialists: {
    premise:
      'AI Specialists tiram a conversa de assistente genérico e levam para agentes por função, com escopo, confiança e fallback.',
    doubleClick:
      'O desenho bom começa pela tarefa repetitiva, não pela tecnologia. Cada especialista precisa ter fronteira clara: o que pode decidir, o que pode executar, quando pede aprovação e quando devolve para humano.',
    talkTrack:
      'Para Bradesco, a melhor entrada é uma operação com caminho conhecido, volume relevante e baixo risco de decisão irreversível. Assim o piloto mede escala real sem comprometer controle.',
    watchouts: [
      'Agente treinado em processo mal definido',
      'Critério de confiança invisível',
      'Exceção tratada como caso comum',
      'Fila humana recebendo contexto incompleto',
    ],
    workshop: [
      'Escolher um processo repetitivo por domínio',
      'Desenhar matriz de confiança e exceção',
      'Definir fallback e aprovação',
      'Medir resolução, qualidade e retrabalho',
    ],
  },
  'action-fabric': {
    premise:
      'Action Fabric posiciona a ServiceNow como sistema de ação para agentes corporativos, inclusive agentes fora da plataforma.',
    doubleClick:
      'O ponto técnico é separar leitura de dado de execução de trabalho. Ferramentas expostas via MCP precisam de permissão, aprovação, auditoria, rollback e limite de escopo antes de virar automação real.',
    talkTrack:
      'Para Bradesco, isso permite que agentes Microsoft, modelos internos ou apps próprios acionem trabalho governado na ServiceNow, em vez de criarem automações paralelas sem trilha operacional.',
    watchouts: [
      'Ferramenta MCP ampla demais',
      'Ação sem aprovação contextual',
      'OAuth sem política por tipo de agente',
      'Rollback não desenhado antes do piloto',
    ],
    workshop: [
      'Catalogar ações seguras para primeiro pacote',
      'Separar leitura, recomendação e execução',
      'Definir RBAC e aprovação por ação',
      'Testar auditoria ponta a ponta',
    ],
  },
  'context-engine': {
    premise:
      'Context Engine torna CMDB, CSDM, serviços e conhecimento parte do raciocínio da IA, não apenas inventário técnico.',
    doubleClick:
      'O foco deve ser escolher o menor grafo de contexto que muda uma decisão. Serviço, responsável, dependência, criticidade, SLA e histórico precisam estar conectados ao caso de uso, não tratados como projeto abstrato de dados.',
    talkTrack:
      'Para Bradesco, essa é a ponte entre a maturidade de CMDB e a ambição de IA governada. Quanto melhor o contexto, menor a chance de uma resposta correta no texto e errada na operação.',
    watchouts: [
      'CMDB ampla demais para o primeiro caso',
      'Relacao critica ausente',
      'Conhecimento sem responsável de curadoria',
      'SLA e criticidade fora do contexto do agente',
    ],
    workshop: [
      'Definir uma decisão que a IA precisa tomar',
      'Listar relações mínimas de CMDB/CSDM',
      'Validar qualidade do contexto com operadores',
      'Criar ciclo de melhoria de dados por uso real',
    ],
  },
  wdf: {
    premise:
      'Workflow Data Fabric enriquece workflows com dados onde eles vivem, sem transformar cada decisão em uma nova cópia de dados.',
    doubleClick:
      'A discussão deve ser sobre contrato de dados: fonte de verdade, autorização, latência aceitável, lineage, observabilidade e quem responde quando um dado externo muda o comportamento do workflow.',
    talkTrack:
      'Para Bradesco, WDF é mais forte quando destrava uma decisão operacional concreta em IT, risco, atendimento ou portfolio. A pergunta certa é qual dado externo muda a ação dentro do workflow.',
    watchouts: [
      'Dado externo sem contrato de uso',
      'Latência incompatível com decisão operacional',
      'Autorizacao tratada depois da arquitetura',
      'Lineage invisivel para auditoria',
    ],
    workshop: [
      'Escolher três dados externos de alto impacto',
      'Definir fonte de verdade e consumidor',
      'Mapear autorização e observabilidade',
      'Prototipar uma decisão enriquecida',
    ],
  },
  'security-risk': {
    premise:
      'A escala de agentes muda o desenho de risco: identidade humana, identidade não humana, ativo e workflow precisam estar conectados.',
    doubleClick:
      'O tema não é apenas detectar risco, mas governar quem ou o que pode agir, sobre qual ativo, com qual permissão e com qual evidência. Agentes criam uma nova superfície operacional que precisa nascer auditável.',
    talkTrack:
      'Para Bradesco, Autonomous Security and Risk conecta a pauta de IA com governança de identidade, ativo e resposta. Isso ajuda a tratar agente como participante controlado da operação, não como exceção.',
    watchouts: [
      'Identidade não humana sem ciclo de vida',
      'Permissão sem menor privilégio',
      'Ativo sem contexto operacional',
      'Resposta de risco fora do sistema de ação',
    ],
    workshop: [
      'Inventariar identidades não humanas relevantes',
      'Correlacionar agente, API, ativo e permissão',
      'Definir resposta automatizada por risco',
      'Criar evidência auditável do primeiro fluxo',
    ],
  },
  spm: {
    premise:
      'SPM com IA aproxima demanda, capacidade, dependência, risco e execução para melhorar a decisão de portfolio.',
    doubleClick:
      'A oportunidade é sair de relatório de status e entrar em sistema de decisão. Para isso, o dado de portfolio precisa conversar com execução, arquitetura, mudança e capacidade de times.',
    talkTrack:
      'Para Bradesco, SPM pode ser discutido como a mesa de decisão que reduz planilhas paralelas e conecta prioridade com capacidade real, dependência técnica e risco de mudança.',
    watchouts: [
      'Portfolio decidido fora da plataforma',
      'Épicos com qualidade inconsistente',
      'Dependência técnica invisível',
      'Migração tratada como troca de ferramenta',
    ],
    workshop: [
      'Selecionar uma decisão mensal de portfolio',
      'Mapear objetos de dado obrigatórios',
      'Definir integração com execução atual',
      'Criar painel de decisão com critérios comuns',
    ],
  },
  'build-agent': {
    premise:
      'Build Agent aumenta capacidade de entrega, mas precisa nascer junto com padrão, revisão e esteira de promoção.',
    doubleClick:
      'A leitura não deve ser só produtividade de desenvolvimento. O ponto é criar uma fábrica governada: padrões reutilizáveis, ACLs, revisão, Git, ambientes e critério de promoção antes de produção.',
    talkTrack:
      'Para Bradesco, Build Agent combina bem com App Engine quando a organização quer acelerar apps sem aumentar débito técnico. A IA ajuda a construir, mas a arquitetura continua sendo decisão controlada.',
    watchouts: [
      'Código gerado sem padrão reutilizável',
      'ACL e segurança revisadas tarde demais',
      'Ambiente sem esteira clara',
      'Produtividade medida sem qualidade de entrega',
    ],
    workshop: [
      'Escolher um app novo com escopo controlado',
      'Definir padrões obrigatórios de desenvolvimento',
      'Conectar Git, review e ambientes',
      'Medir tempo, qualidade e retrabalho',
    ],
  },
  'project-arc': {
    premise:
      'Project Arc explora automação desktop governada para processos multi-etapa onde API não resolve tudo.',
    doubleClick:
      'Esse tema deve ser tratado como exploratório e controlado. O desenho precisa explicitar sandbox, comando permitido, logs, rollback, escopo de produção e o que nunca deve ser automatizado por agente desktop.',
    talkTrack:
      'Para Bradesco, Project Arc é uma conversa forte para processos legados, mas a entrada correta é mapear casos onde a falta de API ainda trava automação ponta a ponta. A governança vem antes da escala.',
    watchouts: [
      'Automação desktop sem sandbox',
      'Comando permitido amplo demais',
      'Rollback não testado',
      'Processo legado automatizado sem criticidade definida',
    ],
    workshop: [
      'Mapear processos sem API com alto atrito manual',
      'Classificar risco e escopo permitido',
      'Definir sandbox, logs e rollback',
      'Avaliar se o caso deve virar API, workflow ou agente desktop',
    ],
  },
}

type Announcement = (typeof announcements)[number]

const composeAudioBrief = (item: Announcement, dive: DeepDive, lens: Lens) => {
  const lensCopy =
    lens === 'executivo'
      ? item.executive
      : lens === 'tecnico'
        ? item.technical
        : item.value

  return [
    `Briefing K26 sobre ${item.title}.`,
    item.subtitle,
    `Leitura para Bradesco: ${item.bradescoAngle}`,
    `Ponto principal: ${lensCopy}`,
    dive.premise,
    dive.doubleClick,
    `Linha de discussão: ${dive.talkTrack}`,
    `Cuidado principal: ${dive.watchouts[0]}.`,
    `Próximo workshop: ${dive.workshop[0]}, ${dive.workshop[1]} e ${dive.workshop[2]}.`,
  ].join(' ')
}

const architectureLayers = [
  {
    title: 'Experiência e canais',
    copy: 'Otto, Employee Center, portal, chat e atendimento assistido.',
    nodes: ['Otto', 'Employee Center', 'Portal', 'Transição'],
  },
  {
    title: 'IA governada',
    copy: 'AI Control Tower, Now Assist, AI Specialists e orquestração com políticas.',
    nodes: ['AI Control Tower', 'Now Assist', 'Specialists', 'Orquestrador'],
  },
  {
    title: 'Domínios de workflow',
    copy: 'ITSM, ITOM, SPM, HRSD, SecOps, IRM, App Engine, CSM e FSI.',
    nodes: ['Autonomous IT', 'Risco', 'HRSD', 'App Engine'],
  },
  {
    title: 'Dados e contexto',
    copy: 'WDF, Context Engine, Knowledge Graph, CMDB/CSDM e métricas.',
    nodes: ['WDF', 'Context Engine', 'CMDB / CSDM', 'RaptorDB'],
  },
  {
    title: 'Segurança e integração',
    copy: 'IAM, RBAC, Veza, Armis, IntegrationHub, MCP, OAuth e auditoria.',
    nodes: ['IAM / RBAC', 'IntegrationHub', 'MCP', 'Auditoria'],
  },
]

const useCases = [
  {
    title: 'Governança de IA corporativa',
    outcome:
      'Inventariar agentes, responsável, permissão, telemetria e aprovação.',
    stack: 'AI Control Tower + IAM + Action Fabric',
  },
  {
    title: 'Service desk autônomo',
    outcome:
      'Resolver jornadas repetitivas com conhecimento confiável e escala humana.',
    stack: 'Otto + AI Specialists + ITSM + HRSD',
  },
  {
    title: 'CMDB como fundação de IA',
    outcome:
      'Priorizar relações, serviços, responsáveis e atributos que reduzem ambiguidade.',
    stack: 'CMDB/CSDM + Context Engine + WDF',
  },
  {
    title: 'Portfolio conectado',
    outcome: 'Ligar demanda, dependência, capacidade, risco e mudança em SPM.',
    stack: 'SPM + App Engine + métricas',
  },
  {
    title: 'Risco e identidade',
    outcome:
      'Enxergar agentes, APIs, ativos e identidades no mesmo modelo de risco.',
    stack: 'IRM + SecOps + Veza + Armis',
  },
  {
    title: 'Produtividade dev governada',
    outcome: 'Acelerar apps com padrões versionados, revisão e governança.',
    stack: 'Build Agent + App Engine + AEMC',
  },
]

const roadmap = [
  {
    title: 'Abrir pela tese',
    detail:
      'K26 não foi sobre chatbot. Foi sobre IA governada executando trabalho corporativo.',
  },
  {
    title: 'Desenhar a arquitetura',
    detail:
      'Conectar governança, contexto, dados, agentes, execução e medição.',
  },
  {
    title: 'Sair com decisão',
    detail:
      'Escolher dois domínios, responsável de negócio, responsável técnico e pré-requisitos.',
  },
]

const updatedSignals = [
  {
    label: 'K26 oficial',
    value: '05-07 mai',
    detail:
      'Las Vegas. Base atualizada pelos releases oficiais de 05/05 e 06/05.',
  },
  {
    label: 'AI Control Tower',
    value: '5 dimensões',
    detail:
      'Discover, Observe, Govern, Secure e Measure como ciclo de controle.',
  },
  {
    label: 'Sistema de ação',
    value: 'MCP + Action Fabric',
    detail:
      'Agentes externos podem acionar trabalho com permissão, aprovação e auditoria.',
  },
  {
    label: 'Dados vivos',
    value: 'Context Engine + WDF',
    detail:
      'CMDB, grafo, catálogo e dados federados viram contexto operacional da IA.',
  },
]

const sources = [
  {
    label: 'Knowledge 2026 on demand',
    href: 'https://www.servicenow.com/events/knowledge.html',
  },
  {
    label: 'AI Control Tower',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-expands-AI-Control-Tower-to-discover-observe-govern-secure-and-measure-AI-deployed-across-any-system-in-the-enterprise/default.aspx',
  },
  {
    label: 'Autonomous Workforce',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-brings-Autonomous-Workforce-to-every-major-business-function/default.aspx',
  },
  {
    label: 'Action Fabric',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-opens-its-full-system-of-action-to-every-AI-Agent-in-the-enterprise/default.aspx',
  },
  {
    label: 'Project Arc + NVIDIA',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-extends-agentic-AI-governance-from-desktops-to-data-centers-with-NVIDIA/default.aspx',
  },
  {
    label: 'ServiceNow Otto',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-Otto-creates-the-unified-AI-experience-for-the-enterprise/default.aspx',
  },
  {
    label: 'Security and Risk',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-Autonomous-Security--Risk-integrating-Armis-and-Veza-to-govern-every-AI-agent-identity-and-connected-asset/default.aspx',
  },
  {
    label: 'Context Engine e Build Agent',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-moves-beyond-the-sidecar-AI-era-giving-customers-a-complete-AI-native-experience-across-all-products-and-packages/default.aspx',
  },
  {
    label: 'Context Engine e Workflow Data Fabric',
    href: 'https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-the-real-time-data-foundation-that-puts-autonomous-AI-to-work-across-the-enterprise/default.aspx',
  },
]

function applyScrollStyles(root: HTMLElement, latest: number) {
  const progress = Math.min(1, Math.max(0, latest))
  const heroProgress = Math.min(1, progress * 5.2)
  const sectionProgress = Math.min(1, Math.max(0, (progress - 0.14) * 1.5))

  root.style.setProperty('--scroll-progress', progress.toFixed(4))
  root.style.setProperty('--scroll-art-y', `${Math.round(-220 * progress)}px`)
  root.style.setProperty('--scroll-art-x', `${Math.round(90 * progress)}px`)
  root.style.setProperty('--scroll-art-rotate', `${(-7 + progress * 18).toFixed(2)}deg`)
  root.style.setProperty('--scroll-art-scale', `${(1 + progress * 0.1).toFixed(4)}`)
  root.style.setProperty('--scroll-plane-two-x', `${Math.round(-90 * progress)}px`)
  root.style.setProperty('--scroll-plane-two-y', `${Math.round(-158 * progress)}px`)
  root.style.setProperty('--scroll-plane-two-rotate', `${(5.6 - progress * 14.4).toFixed(2)}deg`)
  root.style.setProperty('--scroll-field-x', `${Math.round(49 * progress)}px`)
  root.style.setProperty('--scroll-field-y', `${Math.round(-92 * progress)}px`)
  root.style.setProperty('--scroll-stars-one-x', `${Math.round(36 * progress)}px`)
  root.style.setProperty('--scroll-stars-one-y', `${Math.round(-77 * progress)}px`)
  root.style.setProperty('--scroll-stars-two-x', `${Math.round(-27 * progress)}px`)
  root.style.setProperty('--scroll-stars-two-y', `${Math.round(-121 * progress)}px`)
  root.style.setProperty('--scroll-progress-scale', `${Math.max(0.08, progress).toFixed(4)}`)
  root.style.setProperty('--scroll-scan-y', `${Math.round(8 + progress * 84)}%`)
  root.style.setProperty('--hero-parallax', `${Math.round(heroProgress * -74)}px`)
  root.style.setProperty('--hero-parallax-reverse', `${Math.round(heroProgress * 74)}px`)
  root.style.setProperty('--hero-art-drift', `${Math.round(heroProgress * 128)}px`)
  root.style.setProperty('--hero-art-tilt', `${(heroProgress * -11).toFixed(2)}deg`)
  root.style.setProperty('--section-art-y', `${Math.round(sectionProgress * -96)}px`)
}

const scrollProperties = [
  '--scroll-progress',
  '--scroll-art-y',
  '--scroll-art-x',
  '--scroll-art-rotate',
  '--scroll-art-scale',
  '--scroll-plane-two-x',
  '--scroll-plane-two-y',
  '--scroll-plane-two-rotate',
  '--scroll-field-x',
  '--scroll-field-y',
  '--scroll-stars-one-x',
  '--scroll-stars-one-y',
  '--scroll-stars-two-x',
  '--scroll-stars-two-y',
  '--scroll-progress-scale',
  '--scroll-scan-y',
  '--hero-parallax',
  '--hero-parallax-reverse',
  '--hero-art-drift',
  '--hero-art-tilt',
  '--section-art-y',
]

function clearScrollStyles(root: HTMLElement) {
  scrollProperties.forEach((property) => root.style.removeProperty(property))
}

function useBradescoMotion(
  pageRef: RefObject<HTMLElement | null>,
  prefersReducedMotion: boolean | null,
) {
  const { scrollYProgress } = useScroll()
  const pageScrollSpring = useSpring(scrollYProgress, {
    stiffness: 86,
    damping: 24,
    mass: 0.42,
  })
  const scrollArtOpacity = useTransform(
    pageScrollSpring,
    [0, 0.22, 0.82, 1],
    [0.72, 0.98, 0.62, 0.44],
  )
  const flowBeamScale = useTransform(pageScrollSpring, [0.08, 0.34], [0.08, 1])
  const flowOrbitY = useTransform(pageScrollSpring, [0.05, 0.42], [72, -82])
  const flowOrbitRotate = useTransform(pageScrollSpring, [0.05, 0.42], [-10, 12])
  const heroDepthX = useTransform(pageScrollSpring, [0, 0.28], [-18, 22])
  const heroDepthY = useTransform(pageScrollSpring, [0, 0.28], [22, -34])
  const heroRotateX = useTransform(pageScrollSpring, [0, 0.28], [7, -5])
  const heroRotateY = useTransform(pageScrollSpring, [0, 0.28], [-8, 7])

  useMotionValueEvent(pageScrollSpring, 'change', (latest) => {
    const root = pageRef.current
    if (!root || prefersReducedMotion === true) return
    applyScrollStyles(root, latest)
  })

  useEffect(() => {
    if (prefersReducedMotion !== true) return
    const root = pageRef.current
    if (root) clearScrollStyles(root)
  }, [pageRef, prefersReducedMotion])

  return {
    heroStudioStyle:
      prefersReducedMotion === true
        ? undefined
        : ({
            x: heroDepthX,
            y: heroDepthY,
            rotateX: heroRotateX,
            rotateY: heroRotateY,
            transformPerspective: 1280,
          } as MotionStyle),
    flowSectionStyle:
      prefersReducedMotion === true
        ? undefined
        : ({
            '--flow-beam-scale': flowBeamScale,
            '--flow-orbit-y': flowOrbitY,
            '--flow-orbit-rotate': flowOrbitRotate,
          } as MotionStyle),
    scrollArtStyle:
      prefersReducedMotion === true
        ? undefined
        : ({ opacity: scrollArtOpacity } as MotionStyle),
  }
}

function useBriefSpeech(
  activeLens: Lens,
  speakingId: string | null,
  setSpeakingId: (id: string | null) => void,
) {
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [])

  return (item: Announcement) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const synth = window.speechSynthesis
    if (speakingId === item.id) {
      synth.cancel()
      setSpeakingId(null)
      return
    }

    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(
      composeAudioBrief(item, deepDives[item.id], activeLens),
    )
    const voices = synth.getVoices()
    const ptVoice =
      voices.find((voice) => voice.lang.toLowerCase().startsWith('pt-br')) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('pt'))

    if (ptVoice) utterance.voice = ptVoice
    utterance.lang = 'pt-BR'
    utterance.rate = 0.94
    utterance.pitch = 0.88
    utterance.volume = 1
    utterance.onend = () => setSpeakingId(null)
    utterance.onerror = () => setSpeakingId(null)

    speechRef.current = utterance
    setSpeakingId(item.id)
    synth.speak(utterance)
  }
}

function useRadarSelection(
  activeLens: Lens,
  activeTheme: Theme,
  selectedId: string,
  deepDiveId: string | null,
) {
  const filtered = useMemo(
    () =>
      activeTheme === 'all'
        ? announcements
        : announcements.filter((item) => item.theme === activeTheme),
    [activeTheme],
  )
  const lensCopyKey: 'executive' | 'technical' | 'value' =
    activeLens === 'executivo'
      ? 'executive'
      : activeLens === 'tecnico'
        ? 'technical'
        : 'value'
  const activeItem =
    filtered.find((item) => item.id === selectedId) ?? filtered[0]
  const deepDiveItem =
    announcements.find((item) => item.id === deepDiveId) ?? activeItem

  return {
    filtered,
    lensCopyKey,
    activeItem,
    activeLensInfo: lenses.find((lens) => lens.id === activeLens) ?? lenses[0],
    activeThemeInfo:
      themes.find((theme) => theme.id === activeTheme) ?? themes[0],
    activeDiscussion: activeItem.discussion[activeLens],
    activeDeepDive: deepDives[activeItem.id],
    deepDiveItem,
    selectedDeepDive: deepDives[deepDiveItem.id],
  }
}

export default function Bradesco26Experience() {
  const [activeLens, setActiveLens] = useState<Lens>('executivo')
  const [activeTheme, setActiveTheme] = useState<Theme>('all')
  const [selectedId, setSelectedId] = useState('control-tower')
  const [deepDiveId, setDeepDiveId] = useState<string | null>(null)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const pageRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const { heroStudioStyle, flowSectionStyle, scrollArtStyle } =
    useBradescoMotion(pageRef, prefersReducedMotion)
  const speakBrief = useBriefSpeech(
    activeLens,
    speakingId,
    setSpeakingId,
  )
  const radarSelection = useRadarSelection(
    activeLens,
    activeTheme,
    selectedId,
    deepDiveId,
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDeepDiveId(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const selectTheme = (theme: Theme) => {
    setActiveTheme(theme)
    const nextItem =
      theme === 'all'
        ? announcements[0]
        : announcements.find((item) => item.theme === theme)
    if (nextItem) {
      setSelectedId(nextItem.id)
    }
  }

  const openDeepDive = (id: string) => {
    const item = announcements.find((announcement) => announcement.id === id)
    if (!item) {
      return
    }

    setActiveTheme(item.theme as Theme)
    setSelectedId(item.id)
    setDeepDiveId(item.id)
  }

  return (
    <main ref={pageRef} className={styles.page}>
      <ScrollArt style={scrollArtStyle} />
      <MaterialNav />
      <HeroSection heroStudioStyle={heroStudioStyle} />
      <BriefStrip />
      <FlowSection
        flowSectionStyle={flowSectionStyle}
        prefersReducedMotion={prefersReducedMotion}
        openDeepDive={openDeepDive}
      />
      <PlatformSection />
      <RadarSection
        activeLens={activeLens}
        activeTheme={activeTheme}
        selectedId={selectedId}
        speakingId={speakingId}
        filtered={radarSelection.filtered}
        activeItem={radarSelection.activeItem}
        activeLensInfo={radarSelection.activeLensInfo}
        activeThemeInfo={radarSelection.activeThemeInfo}
        activeDiscussion={radarSelection.activeDiscussion}
        activeDeepDive={radarSelection.activeDeepDive}
        lensCopyKey={radarSelection.lensCopyKey}
        setActiveLens={setActiveLens}
        setSelectedId={setSelectedId}
        selectTheme={selectTheme}
        openDeepDive={openDeepDive}
        speakBrief={speakBrief}
      />
      <DeepDiveOverlay
        deepDiveId={deepDiveId}
        deepDiveItem={radarSelection.deepDiveItem}
        selectedDeepDive={radarSelection.selectedDeepDive}
        speakingId={speakingId}
        prefersReducedMotion={prefersReducedMotion}
        setDeepDiveId={setDeepDiveId}
        speakBrief={speakBrief}
      />
      <ArchitectureSection />
      <UseCasesSection />
      <CloseSection />
      <SourcesSection />
      <footer className={styles.footer}>
        <span>Preparado para conversa executiva e técnica com Bradesco.</span>
        <span>Fontes públicas ServiceNow e trilha de discussão orientada a valor.</span>
      </footer>
    </main>
  )
}

function ScrollArt({ style }: { style?: MotionStyle }) {
  return (
    <motion.div className={styles.scrollArt} style={style} aria-hidden="true">
      <span className={`${styles.scrollPlane} ${styles.scrollPlaneOne}`} />
      <span className={`${styles.scrollPlane} ${styles.scrollPlaneTwo}`} />
      <span className={styles.scrollVectorField} />
      <span className={styles.scrollScanBand} />
      <span className={styles.scrollConstellation} />
      <span className={styles.scrollProgressRail} />
    </motion.div>
  )
}

function MaterialNav() {
  return (
    <nav className={styles.nav} aria-label="Navegação do material">
      <a href="#top" className={styles.navBrand}>
        <span>ServiceNow</span>
        <span>Bradesco</span>
      </a>
      <div className={styles.navLinks}>
        <a href="#flow">Roteiro</a>
        <a href="#radar">Radar</a>
        <a href="#architecture">Arquitetura</a>
        <a href="#use-cases">Casos</a>
      </div>
      <a href="#sources" className={styles.navCta}>
        Fontes
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </nav>
  )
}

function HeroSection({ heroStudioStyle }: { heroStudioStyle?: MotionStyle }) {
  return (
    <section id="top" className={styles.hero} aria-labelledby="bradesco-26-title">
      <div className={styles.heroTexture} aria-hidden="true" />
      <HeroMotionFrame />
      <HeroSculpture />
      <div className={styles.heroShell}>
        <div className={styles.heroTopline}>
          <span>Knowledge 2026</span>
          <span>K26 oficial 05-07 mai</span>
          <span>Atualizado em 31 mai 2026</span>
        </div>
        <div className={styles.heroLayout}>
          <HeroCopy />
          <HeroStudio heroStudioStyle={heroStudioStyle} />
        </div>
      </div>
      <div className={styles.scrollCue} aria-hidden="true">
        <span />
        <span />
      </div>
    </section>
  )
}

function HeroMotionFrame() {
  return (
    <div className={styles.motionFrame} aria-hidden="true">
      <span className={styles.frameRailTop} />
      <span className={styles.frameRailRight} />
      <span className={styles.frameRailBottom} />
      <span className={styles.frameRailLeft} />
      <span className={`${styles.frameCorner} ${styles.frameCornerTopLeft}`} />
      <span className={`${styles.frameCorner} ${styles.frameCornerTopRight}`} />
      <span className={`${styles.frameCorner} ${styles.frameCornerBottomLeft}`} />
      <span className={`${styles.frameCorner} ${styles.frameCornerBottomRight}`} />
      <span className={styles.frameScanner} />
      <span className={`${styles.frameSignal} ${styles.frameSignalOne}`} />
      <span className={`${styles.frameSignal} ${styles.frameSignalTwo}`} />
    </div>
  )
}

function HeroSculpture() {
  return (
    <div className={styles.heroSculpture} aria-hidden="true">
      <span className={styles.sculptureGrid} />
      <span className={`${styles.sculptureRing} ${styles.sculptureRingOne}`} />
      <span className={`${styles.sculptureRing} ${styles.sculptureRingTwo}`} />
      <span className={styles.sculpturePlane} />
      <span className={styles.sculptureScan} />
      <span className={styles.sculptureNodeOne} />
      <span className={styles.sculptureNodeTwo} />
      <span className={styles.sculptureNodeThree} />
      <div className={styles.heroBarcode}>
        {Array.from({ length: 14 }).map((_, index) => <span key={index} />)}
      </div>
    </div>
  )
}

function HeroCopy() {
  return (
    <div className={styles.heroCopy}>
      <p className={styles.eyebrow}>De assistente a agente corporativo</p>
      <h1 id="bradesco-26-title">Bradesco no ciclo da IA governada.</h1>
      <p className={styles.heroLead}>
        Material executivo e técnico sobre o que o Knowledge 2026 muda para bancos: governança de IA,
        contexto operacional, agentes, risco, dados e execução ponta a ponta. Atualizado com a trilha
        oficial de anúncios de 05/05 e 06/05.
      </p>
      <div className={styles.heroProofLine} aria-label="Temas principais">
        <span>AI governance</span>
        <span>Contexto operacional</span>
        <span>Execução governada</span>
      </div>
      <div className={styles.heroActions} aria-label="Ações principais">
        <a href="#flow" className={styles.primaryAction}>
          <Play size={16} aria-hidden="true" />
          Abrir roteiro
        </a>
        <a href="#radar" className={styles.secondaryAction}>
          Ver radar K26
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

function HeroStudio({ heroStudioStyle }: { heroStudioStyle?: MotionStyle }) {
  return (
    <motion.aside className={styles.heroStudio} style={heroStudioStyle} aria-label="Mapa executivo da conversa">
      <div className={styles.systemMap} aria-hidden="true">
        <div className={styles.mapChrome}>
          <span>Strategy room</span>
          <span>K26 / Bradesco</span>
        </div>
        <span className={styles.depthFloor} />
        <span className={`${styles.depthStack} ${styles.depthStackOne}`} />
        <span className={`${styles.depthStack} ${styles.depthStackTwo}`} />
        <span className={`${styles.depthStack} ${styles.depthStackThree}`} />
        <span className={styles.depthBeam} />
        <div className={styles.mapTraceOne} />
        <div className={styles.mapTraceTwo} />
        <div className={styles.mapCore}>
          <strong>AI</strong>
          <span>governada</span>
        </div>
        <div className={`${styles.mapNode} ${styles.nodeOne}`}>Govern</div>
        <div className={`${styles.mapNode} ${styles.nodeTwo}`}>Context</div>
        <div className={`${styles.mapNode} ${styles.nodeThree}`}>Act</div>
        <div className={`${styles.mapNode} ${styles.nodeFour}`}>Measure</div>
        <div className={styles.mapPulse} />
      </div>
      <div className={styles.commandPanel}>
        <div className={styles.panelHeader}>
          <CircleDot size={15} aria-hidden="true" />
          <span>Tese central</span>
        </div>
        <p>
          O diferencial não é ter mais IA. É colocar IA para trabalhar com contexto real, permissões
          corretas, trilha auditável e governança operacional.
        </p>
        <div className={styles.signalGrid}>
          {thesis.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className={styles.signalCard}>
                <Icon size={18} aria-hidden="true" />
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
              </div>
            )
          })}
        </div>
        <div className={styles.modelFlow} aria-label="Modelo operacional">
          <span>Papel claro</span>
          <span>Telemetria</span>
          <span>Guardrails</span>
          <span>Indicadores</span>
        </div>
      </div>
    </motion.aside>
  )
}

function BriefStrip() {
  return (
    <section className={styles.briefStrip} aria-label="Resumo do briefing">
      <div className={styles.briefInner}>
        <div className={styles.briefGrid}>
          <article><span>Objetivo</span><strong>Traduzir os anúncios do Knowledge 2026 para prioridades práticas.</strong></article>
          <article><span>Formato</span><strong>Material executivo e técnico, com arquitetura e casos de uso.</strong></article>
          <article><span>Resultado</span><strong>Dois domínios priorizados, responsável claro e próximo workshop técnico.</strong></article>
        </div>
        <div className={styles.kineticMarquee} aria-hidden="true">
          <div>{[...motionTicker, ...motionTicker].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
        </div>
      </div>
    </section>
  )
}

type FlowSectionProps = {
  flowSectionStyle?: MotionStyle
  prefersReducedMotion: boolean | null
  openDeepDive: (id: string) => void
}

function FlowSection({ flowSectionStyle, prefersReducedMotion, openDeepDive }: FlowSectionProps) {
  return (
    <motion.section id="flow" className={styles.flowSection} style={flowSectionStyle} aria-labelledby="flow-title">
      <div className={styles.sectionFrame}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Roteiro de trabalho</p>
          <h2 id="flow-title">Seis blocos para orientar decisão.</h2>
          <p>O material sai de anúncio de produto e entra em arquitetura: plataforma, domínios, risco, desenvolvedores e casos de uso aplicáveis ao Bradesco.</p>
        </div>
        <div className={styles.k26UpdateRail} aria-label="Detalhes atualizados do Knowledge 2026">
          {updatedSignals.map((signal) => <article key={signal.label}><span>{signal.label}</span><strong>{signal.value}</strong><p>{signal.detail}</p></article>)}
        </div>
        <div className={styles.flowGrid}>
          {chapters.map((chapter, index) => (
            <motion.button
              key={chapter.title}
              type="button"
              className={styles.flowCard}
              onClick={() => openDeepDive(chapter.targetId)}
              aria-label={`Abrir detalhes do bloco ${chapter.number}: ${chapter.title}`}
              whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.006, rotateX: -2.4, rotateY: index % 2 === 0 ? 1.4 : -1.4, z: 8 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.34 }}
              transition={{ duration: 0.48, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.flowNumber}>{chapter.number}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.copy}</p>
              <div>{chapter.items.map((item) => <small key={item}>{item}</small>)}</div>
              <span className={styles.flowCta}>Mais detalhes<ArrowUpRight size={15} aria-hidden="true" /></span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function PlatformSection() {
  return (
    <section className={styles.platformSection} aria-labelledby="platform-title">
      <div className={styles.sectionFrame}>
        <div className={styles.platformGrid}>
          <div>
            <p className={styles.eyebrow}>Contexto Bradesco</p>
            <h2 id="platform-title">Conectar capacidades conhecidas a uma arquitetura de IA governada.</h2>
            <p>A leitura organiza o que o K26 trouxe de novo em IA, dados e execução dentro de uma jornada clara de governança, adoção e valor operacional.</p>
          </div>
          <div className={styles.capabilityCloud} aria-label="Capacidades em foco">
            {capabilitySet.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}

type RadarSectionProps = {
  activeLens: Lens
  activeTheme: Theme
  selectedId: string
  speakingId: string | null
  filtered: Announcement[]
  activeItem: Announcement
  activeLensInfo: (typeof lenses)[number]
  activeThemeInfo: (typeof themes)[number]
  activeDiscussion: string
  activeDeepDive: DeepDive
  lensCopyKey: 'executive' | 'technical' | 'value'
  setActiveLens: (lens: Lens) => void
  setSelectedId: (id: string) => void
  selectTheme: (theme: Theme) => void
  openDeepDive: (id: string) => void
  speakBrief: (item: Announcement) => void
}

function RadarSection(props: RadarSectionProps) {
  return (
    <section id="radar" className={styles.radarSection} aria-labelledby="radar-title">
      <div className={styles.sectionFrame}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Radar K26</p>
          <h2 id="radar-title">Selecione a lente de leitura.</h2>
          <p>A mesma novidade pode ser lida pela decisão executiva, pela profundidade técnica ou pelo valor operacional para Bradesco.</p>
        </div>
        <RadarSlidesCallout />
        <RadarControls {...props} />
        <RadarInsightStrip {...props} />
        <RadarBoard {...props} />
      </div>
    </section>
  )
}

function RadarSlidesCallout() {
  return (
    <a href="/bradesco-26/slides" className={styles.radarSlidesCallout}>
      <span><MonitorPlay size={18} aria-hidden="true" />Apresentação executiva</span>
      <strong>Abrir material K26</strong>
      <small>Mesmas informações em uma versão ampla e objetiva para reunião.</small>
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  )
}

function RadarControls({ activeLens, activeTheme, setActiveLens, selectTheme }: RadarSectionProps) {
  return (
    <div className={styles.radarControls} aria-label="Controles de visualização">
      <div className={styles.lensSwitch}>
        {lenses.map((lens) => <button key={lens.id} type="button" className={activeLens === lens.id ? styles.lensActive : styles.lensButton} onClick={() => setActiveLens(lens.id)}><span>{lens.label}</span><small>{lens.helper}</small></button>)}
      </div>
      <div className={styles.themeRail}>
        {themes.map((theme) => <button key={theme.id} type="button" className={activeTheme === theme.id ? styles.themeActive : styles.themeButton} onClick={() => selectTheme(theme.id)}>{theme.label}</button>)}
      </div>
    </div>
  )
}

function RadarInsightStrip({ activeLensInfo, activeItem, lensCopyKey }: RadarSectionProps) {
  return (
    <div className={styles.radarInsightStrip} aria-label="Resumo da leitura selecionada">
      <article><span>Lente ativa</span><strong>{activeLensInfo.label}</strong><p>{activeItem[lensCopyKey]}</p></article>
      <article><span>Aplicação Bradesco</span><strong>{activeItem.bradescoAngle}</strong></article>
      <article><span>Próxima decisão</span><strong>{activeItem.nextMove}</strong></article>
    </div>
  )
}

function RadarBoard(props: RadarSectionProps) {
  return (
    <div className={styles.radarBoard}>
      <RadarList {...props} />
      <RadarDetail {...props} />
    </div>
  )
}

function RadarList({ filtered, activeItem, activeThemeInfo, setSelectedId, openDeepDive }: RadarSectionProps) {
  return (
    <div className={styles.radarList}>
      {filtered.map((item) => {
        const Icon = item.icon
        const selected = activeItem.id === item.id
        return (
          <button key={item.id} type="button" className={selected ? styles.radarItemActive : styles.radarItem} onClick={() => setSelectedId(item.id)} onDoubleClick={() => openDeepDive(item.id)} title="Selecionar tema">
            <span>{item.number}</span><Icon size={18} aria-hidden="true" /><strong>{item.title}</strong><small>Tema</small>
          </button>
        )
      })}
      <div className={styles.radarListMeta}><span>Trilha ativa</span><strong>{activeThemeInfo.label}</strong><small>{filtered.length} temas para explorar</small></div>
    </div>
  )
}

function RadarDetail(props: RadarSectionProps) {
  const { activeItem, activeLens, activeLensInfo, activeDiscussion, activeDeepDive, lensCopyKey, speakingId, openDeepDive, speakBrief } = props

  return (
    <article key={`${activeItem.id}-${activeLens}`} className={styles.radarDetail}>
      <div className={styles.detailSweep} aria-hidden="true" />
      <div className={styles.radarDetailTop}>
        <div className={styles.radarDetailMeta}><span>{activeItem.number}</span><small>Análise completa disponível</small></div>
        <RadarDetailActions activeItem={activeItem} speakingId={speakingId} openDeepDive={openDeepDive} speakBrief={speakBrief} />
      </div>
      <div className={styles.detailHero}>
        <div><small>{activeLensInfo.helper}</small><h3>{activeItem.title}</h3><p className={styles.radarSubtitle}>{activeItem.subtitle}</p></div>
        <div className={styles.detailSignal} aria-label="Sinal da lente ativa"><span>{activeLensInfo.label}</span><strong>{activeItem.number}</strong></div>
      </div>
      <p className={styles.radarCopy}>{activeItem[lensCopyKey]}</p>
      <div className={styles.studioCue}><Headphones size={14} aria-hidden="true" /><p>{activeDeepDive.premise}</p></div>
      <div className={styles.decisionGrid}>
        <article><span>Arquitetura</span><p>{activeItem.architecture}</p></article>
        <article><span>Modelo operacional</span><p>{activeItem.operatingModel}</p></article>
        <article><span>Próximo movimento</span><p>{activeItem.nextMove}</p></article>
      </div>
      <div className={styles.proofRail} aria-label="Elementos de prova">{activeItem.proofPoints.map((point) => <span key={point}>{point}</span>)}</div>
      <div className={styles.discussionBox}><span>{activeLens === 'executivo' ? 'Decisão para a sala' : activeLens === 'tecnico' ? 'Critério técnico' : 'Workshop de valor'}</span><strong>{activeDiscussion}</strong></div>
      <div className={styles.detailActions}>
        <button type="button" onClick={() => openDeepDive(activeItem.id)}><Maximize2 size={14} aria-hidden="true" />Abrir análise</button>
        <button type="button" onClick={() => speakBrief(activeItem)} aria-pressed={speakingId === activeItem.id}>{speakingId === activeItem.id ? <Pause size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}{speakingId === activeItem.id ? 'Pausar áudio' : 'Ouvir resumo'}</button>
      </div>
    </article>
  )
}

type RadarDetailActionsProps = Pick<RadarSectionProps, 'speakingId' | 'openDeepDive' | 'speakBrief'> & {
  activeItem: Announcement
}

function RadarDetailActions({ activeItem, speakingId, openDeepDive, speakBrief }: RadarDetailActionsProps) {
  const ActiveIcon = activeItem.icon
  return (
    <div className={styles.detailTopActions}>
      <button type="button" className={speakingId === activeItem.id ? styles.audioChipActive : styles.audioChip} onClick={() => speakBrief(activeItem)} aria-pressed={speakingId === activeItem.id}>
        {speakingId === activeItem.id ? <Pause size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}<span>{speakingId === activeItem.id ? 'Pausar' : 'Áudio'}</span>
      </button>
      <button type="button" className={styles.iconAction} onClick={() => openDeepDive(activeItem.id)} aria-label={`Abrir deep dive de ${activeItem.title}`}><Maximize2 size={15} aria-hidden="true" /></button>
      <div className={styles.detailIcon}><ActiveIcon size={30} aria-hidden="true" /></div>
    </div>
  )
}

type DeepDiveOverlayProps = {
  deepDiveId: string | null
  deepDiveItem: Announcement
  selectedDeepDive: DeepDive
  speakingId: string | null
  prefersReducedMotion: boolean | null
  setDeepDiveId: (id: string | null) => void
  speakBrief: (item: Announcement) => void
}

function DeepDiveOverlay(props: DeepDiveOverlayProps) {
  if (!props.deepDiveId) return null
  return (
    <AnimatePresence>
      <DeepDiveDialog {...props} />
    </AnimatePresence>
  )
}

function DeepDiveDialog({ deepDiveItem, selectedDeepDive, speakingId, prefersReducedMotion, setDeepDiveId, speakBrief }: DeepDiveOverlayProps) {
  const DeepDiveIcon = deepDiveItem.icon
  return (
    <motion.div className={styles.deepDiveOverlay} role="dialog" aria-modal="true" aria-labelledby="deep-dive-title" initial={prefersReducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={prefersReducedMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}>
      <button type="button" className={styles.deepDiveBackdrop} onClick={() => setDeepDiveId(null)} aria-label="Fechar deep dive" />
      <motion.article className={styles.deepDivePanel} initial={prefersReducedMotion ? false : { opacity: 0, y: 58, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: 28, scale: 0.98 }} transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}>
        <div className={styles.deepDiveScanner} aria-hidden="true" />
        <DeepDiveHeader deepDiveItem={deepDiveItem} speakingId={speakingId} setDeepDiveId={setDeepDiveId} speakBrief={speakBrief} />
        <DeepDiveHero deepDiveItem={deepDiveItem} selectedDeepDive={selectedDeepDive} speakBrief={speakBrief} />
        <DeepDiveBody deepDiveItem={deepDiveItem} selectedDeepDive={selectedDeepDive} />
        <div className={styles.deepDiveColumns}>
          <section><div className={styles.deepDiveSectionTitle}><DeepDiveIcon size={17} aria-hidden="true" /><h3>Pontos de cuidado</h3></div><ul>{selectedDeepDive.watchouts.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><div className={styles.deepDiveSectionTitle}><Workflow size={17} aria-hidden="true" /><h3>Workshop sugerido</h3></div><ol>{selectedDeepDive.workshop.map((item) => <li key={item}>{item}</li>)}</ol></section>
        </div>
        <footer className={styles.deepDiveFooter}>
          <div><span>Próximo movimento</span><strong>{deepDiveItem.nextMove}</strong></div>
          <div className={styles.deepDiveProof}>{deepDiveItem.proofPoints.map((point) => <small key={point}>{point}</small>)}</div>
        </footer>
      </motion.article>
    </motion.div>
  )
}

function DeepDiveHeader({ deepDiveItem, speakingId, setDeepDiveId, speakBrief }: Pick<DeepDiveOverlayProps, 'deepDiveItem' | 'speakingId' | 'setDeepDiveId' | 'speakBrief'>) {
  return (
    <header className={styles.deepDiveHeader}>
      <div><p className={styles.deepDiveKicker}>Análise K26</p><h2 id="deep-dive-title">{deepDiveItem.title}</h2><p>{deepDiveItem.subtitle}</p></div>
      <div className={styles.deepDiveHeaderActions}>
        <button type="button" className={speakingId === deepDiveItem.id ? styles.deepDiveAudioActive : styles.deepDiveAudio} onClick={() => speakBrief(deepDiveItem)} aria-pressed={speakingId === deepDiveItem.id}>{speakingId === deepDiveItem.id ? <Pause size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}{speakingId === deepDiveItem.id ? 'Pausar áudio' : 'Áudio resumo'}</button>
        <button type="button" className={styles.deepDiveClose} onClick={() => setDeepDiveId(null)} aria-label="Fechar"><X size={18} aria-hidden="true" /></button>
      </div>
    </header>
  )
}

function DeepDiveHero({ deepDiveItem, selectedDeepDive, speakBrief }: Pick<DeepDiveOverlayProps, 'deepDiveItem' | 'selectedDeepDive' | 'speakBrief'>) {
  return (
    <div className={styles.deepDiveHero}>
      <div className={styles.deepDiveThesis}><span>Leitura para Bradesco</span><strong>{selectedDeepDive.premise}</strong></div>
      <div className={styles.sonicConsole} aria-label="Controle de áudio">
        <div className={styles.sonicWave} aria-hidden="true">{Array.from({ length: 14 }).map((_, index) => <span key={index} />)}</div>
        <button type="button" onClick={() => speakBrief(deepDiveItem)}><Headphones size={16} aria-hidden="true" />Roteiro narrado</button>
      </div>
    </div>
  )
}

function DeepDiveBody({ deepDiveItem, selectedDeepDive }: Pick<DeepDiveOverlayProps, 'deepDiveItem' | 'selectedDeepDive'>) {
  return (
    <div className={styles.deepDiveBody}>
      <section className={styles.deepDiveStory}><span>O duplo clique</span><p>{selectedDeepDive.doubleClick}</p></section>
      <section className={styles.deepDiveStory}><span>Linha de discussão</span><p>{selectedDeepDive.talkTrack}</p></section>
      <section className={styles.deepDiveStack}><span>Arquitetura</span><p>{deepDiveItem.architecture}</p></section>
      <section className={styles.deepDiveStack}><span>Modelo operacional</span><p>{deepDiveItem.operatingModel}</p></section>
    </div>
  )
}

function ArchitectureSection() {
  return (
    <section id="architecture" className={styles.architectureSection} aria-labelledby="architecture-title">
      <div className={styles.sectionFrame}>
        <div className={styles.architectureHeader}><p className={styles.eyebrow}>Arquitetura Pós-K26</p><h2 id="architecture-title">Agente só gera valor quando sabe onde agir.</h2><p>A ponte entre anúncio e desenho técnico: canais, IA, workflows, dados, segurança e integração operando como sistema de ação.</p></div>
        <div className={styles.architectureMap}>{architectureLayers.map((layer, index) => <article key={layer.title} className={styles.architectureLayer}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{layer.title}</h3><p>{layer.copy}</p></div><div className={styles.layerNodes}>{layer.nodes.map((node) => <small key={node}>{node}</small>)}</div></article>)}</div>
      </div>
    </section>
  )
}

function UseCasesSection() {
  return (
    <section id="use-cases" className={styles.useCaseSection} aria-labelledby="use-cases-title">
      <div className={styles.sectionFrame}>
        <div className={styles.sectionHeader}><p className={styles.eyebrow}>Casos de uso Bradesco</p><h2 id="use-cases-title">Seis frentes para sair da sala com próximo passo.</h2><p>A sessão ajuda a priorizar domínio, responsável de negócio, responsável técnico e pré-requisitos para avançar com segurança.</p></div>
        <div className={styles.useCaseGrid}>{useCases.map((useCase, index) => <article key={useCase.title} className={styles.useCaseCard}><span>{String(index + 1).padStart(2, '0')}</span><h3>{useCase.title}</h3><p>{useCase.outcome}</p><small>{useCase.stack}</small></article>)}</div>
      </div>
    </section>
  )
}

function CloseSection() {
  return (
    <section className={styles.closeSection} aria-labelledby="close-title">
      <div className={styles.sectionFrame}><div className={styles.closeGrid}><div><p className={styles.eyebrow}>Roteiro de 03 de junho</p><h2 id="close-title">Da inspiração à decisão operacional.</h2><p>Primeiro a tese, depois a arquitetura, então os casos de uso. O objetivo é sair com uma decisão clara sobre onde aprofundar valor, dados, governança e execução.</p></div><ol className={styles.roadmapList}>{roadmap.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ol></div></div>
    </section>
  )
}

function SourcesSection() {
  return (
    <section id="sources" className={styles.sources} aria-labelledby="sources-title">
      <div className={styles.sectionFrame}><div className={styles.sourcesGrid}><div><p className={styles.eyebrow}>Fontes verificadas</p><h2 id="sources-title">Baseado em anúncios oficiais do Knowledge 2026.</h2></div><div className={styles.sourceLinks}>{sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div></div></div>
    </section>
  )
}
