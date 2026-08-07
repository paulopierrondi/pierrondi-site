import type { HomeLang } from '@/lib/i18n/site-language'

export interface TrainingTrack {
  id: string
  no: string
  category: string
  level: string
  title: string
  outcome: string
  audience: string
  desc: string
  modules: string[]
}

export interface TrainingFormat {
  id: string
  name: string
  duration: string
  desc: string
}

export interface TreinamentosCopy {
  header: {
    eyebrow: string
    lead: string
    chips: string[]
  }
  thesis: {
    eyebrow: string
    title: string
    body: string
  }
  tracks: {
    eyebrow: string
    title: string
    items: TrainingTrack[]
  }
  formats: {
    eyebrow: string
    title: string
    body: string
    delivery: string
    items: TrainingFormat[]
  }
  method: {
    eyebrow: string
    title: string
    items: string[]
  }
  final: {
    h2: string
    p: string
    primary: string
    secondary: string
  }
  disclaimer: string
  trackCta: string
}

export const TREINAMENTOS_COPY: Record<HomeLang, TreinamentosCopy> = {
  pt: {
    header: {
      eyebrow: 'TREINAMENTOS',
      lead: 'Formação prática em IA aplicada, engenharia com agentes, ServiceNow e Vibe Coding. O critério não é conteúdo entregue — é capacidade instalada: no fim, o time executa com contexto, gate e evidência.',
      chips: ['IA & LLM', 'Vibe Coding', 'ServiceNow', 'AgentOps', 'Liderança'],
    },
    thesis: {
      eyebrow: 'Por que treinar agora',
      title: 'Ferramenta nova sem modelo operacional só acelera o retrabalho.',
      body: 'Quase todo time já tem acesso a modelo, copiloto e agente. O que falta é método: onde a IA entra no fluxo, quem aprova exceção, o que conta como evidência de qualidade e onde o custo aparece. Meus treinamentos instalam esse método junto com a ferramenta — no problema real do time, não em estudo de caso genérico.',
    },
    tracks: {
      eyebrow: 'Trilhas',
      title: 'Quatro trilhas, um mesmo critério: sai rodando.',
      items: [
        {
          id: 'ia-llm',
          no: '01',
          category: 'IA & LLM Aplicada',
          level: 'Fundamento → Avançado',
          title: 'Do prompt solto ao sistema que responde com evidência.',
          outcome: 'O time sai construindo RAG, agentes e avaliação — sabendo medir qualidade e custo.',
          audience: 'Devs, arquitetos, analistas e times de produto.',
          desc: 'Cobre o que muda resultado: contexto, recuperação, avaliação, guardrails, roteamento de modelo e custo. Sem culto a ferramenta e sem prometer mágica — o exercício acontece em cima de um caso do próprio time.',
          modules: [
            'Anatomia de um LLM: contexto, limites e onde a alucinação nasce.',
            'RAG na prática: ingestão, recuperação híbrida, rerank e recusa honesta.',
            'Agentes: ferramentas, memória, handoff e quando não usar agente.',
            'Avaliação, custo e observabilidade antes de escalar.',
          ],
        },
        {
          id: 'vibe-coding',
          no: '02',
          category: 'Vibe Coding com Evidência',
          level: 'Intermediário',
          title: 'Codar com agentes sem virar refém de código que ninguém entende.',
          outcome: 'Velocidade de agente com disciplina de engenharia: spec, teste, review e gate.',
          audience: 'Desenvolvedores, tech leads e builders solo.',
          desc: 'Vibe coding funciona quando existe contrato. Ensino o loop que uso todo dia: intenção clara, escopo pequeno, teste antes do verde, revisão adversarial e commit rastreável — com Claude Code, Codex e equivalentes.',
          modules: [
            'Spec antes do prompt: transformar pedido em critério verificável.',
            'Loop TDD com agente: red, green, refactor e o que não delegar.',
            'Revisão adversarial e gates humanos para risco e publicação.',
            'Paralelismo de agentes, worktrees e integração sem colisão.',
          ],
        },
        {
          id: 'servicenow',
          no: '03',
          category: 'ServiceNow & IA Governada',
          level: 'Enterprise',
          title: 'Now Assist e AI Agents apoiados em fundação, não em licença.',
          outcome: 'Arquitetos e times de entrega saem com modelo operacional, não com POC bonita.',
          audience: 'Arquitetos de plataforma, times de entrega e liderança de TI.',
          desc: 'Trabalho com ServiceNow há anos em serviços financeiros. Conecto Now Assist, AI Agents, CSDM, CMDB e Service Graph ao modelo operacional que produz adoção — com governança, permissão, exceção e trilha de auditoria dentro do escopo.',
          modules: [
            'CSDM, CMDB e Service Graph como fundação de contexto para IA.',
            'Casos de uso por domínio e risco: onde o valor aparece primeiro.',
            'Governança: human gates, escopo, fallback e trilha de auditoria.',
            'Métricas de adoção e narrativa executiva para sustentar o programa.',
          ],
        },
        {
          id: 'agentops',
          no: '04',
          category: 'AgentOps & Operação',
          level: 'Avançado',
          title: 'Do protótipo ao sistema que roda sozinho — sob controle.',
          outcome: 'Registry, scheduler, handoff, memória e evidência funcionando dentro do time.',
          audience: 'Times de plataforma, automação e operação.',
          desc: 'A parte que quase ninguém ensina: o que sustenta um agente depois da demo. Registry, agendamento, continuidade entre sessões, aprovação explícita e rastreabilidade — o mesmo sistema que uso para operar meus próprios agentes.',
          modules: [
            'Registry, scheduler e runners: tirar execução do chat solto.',
            'Memória, handoff e continuidade entre sessões e coders.',
            'Human-in-the-loop: aprovação explícita, rollback e blast radius.',
            'Observabilidade, custo e aprendizado contínuo com trilha auditável.',
          ],
        },
      ],
    },
    formats: {
      eyebrow: 'Formatos',
      title: 'Do keynote ao acompanhamento de squad.',
      body: 'Cada trilha é montada no formato que cabe no calendário e no nível do time. A profundidade muda; o critério de saída, não.',
      delivery: 'Remoto ou presencial · PT-BR e inglês · Material e artefatos ficam com o time',
      items: [
        {
          id: 'keynote',
          name: 'Keynote / palestra',
          duration: '45–90 min',
          desc: 'Alinhar liderança e time na mesma tese antes de investir em ferramenta.',
        },
        {
          id: 'workshop',
          name: 'Workshop hands-on',
          duration: '1 dia',
          desc: 'O time constrói junto em cima do caso real. Sai com artefato rodando, não com anotação.',
        },
        {
          id: 'bootcamp',
          name: 'Bootcamp',
          duration: '4–8 semanas',
          desc: 'Trilha completa, prática entre encontros e um projeto avaliado no fim.',
        },
        {
          id: 'coaching',
          name: 'Coaching de squad',
          duration: 'Ciclo recorrente',
          desc: 'Acompanhamento curto e frequente: revisão de código, arquitetura e gates.',
        },
        {
          id: 'executivo',
          name: 'Enablement executivo',
          duration: 'Sessão fechada',
          desc: 'Board e liderança: decisão, risco, custo e velocidade de adoção sem jargão.',
        },
      ],
    },
    method: {
      eyebrow: 'Como eu ensino',
      title: 'Cinco regras que não negocio.',
      items: [
        'O caso é do time. Estudo de caso genérico não instala capacidade.',
        'Toda sessão termina em artefato rodando: repositório, workflow ou avaliação.',
        'Gate humano é conteúdo, não burocracia — risco e publicação exigem decisão explícita.',
        'Prova acima de pose: se não roda, ainda é slide.',
        'PT-BR e inglês, do quadro branco executivo ao pull request.',
      ],
    },
    final: {
      h2: 'Vamos desenhar a trilha do seu time?',
      p: 'Me conte o time, o nível e o problema que precisa sair do papel. Eu volto com uma trilha, um formato e o critério de saída.',
      primary: 'Falar sobre um treinamento',
      secondary: 'Ver os feitos',
    },
    disclaimer:
      'Conteúdo autoral e independente, construído a partir de contexto público e sem dados confidenciais. Não representa a ServiceNow nem substitui treinamento ou certificação oficial do fabricante.',
    trackCta: 'Conversar sobre esta trilha',
  },
  en: {
    header: {
      eyebrow: 'TRAINING',
      lead: 'Hands-on training in applied AI, agent-assisted engineering, ServiceNow and Vibe Coding. The bar is not content delivered — it is capability installed: by the end, the team ships with context, gates and evidence.',
      chips: ['AI & LLM', 'Vibe Coding', 'ServiceNow', 'AgentOps', 'Leadership'],
    },
    thesis: {
      eyebrow: 'Why train now',
      title: 'A new tool without an operating model only speeds up the rework.',
      body: 'Almost every team already has access to a model, a copilot and an agent. What is missing is method: where AI enters the flow, who approves exceptions, what counts as quality evidence and where the cost shows up. My training installs that method alongside the tool — on the team’s real problem, not on a generic case study.',
    },
    tracks: {
      eyebrow: 'Tracks',
      title: 'Four tracks, one standard: it ships running.',
      items: [
        {
          id: 'ia-llm',
          no: '01',
          category: 'Applied AI & LLM',
          level: 'Foundation → Advanced',
          title: 'From a loose prompt to a system that answers with evidence.',
          outcome: 'The team leaves building RAG, agents and evaluation — able to measure quality and cost.',
          audience: 'Developers, architects, analysts and product teams.',
          desc: 'Covers what actually changes the outcome: context, retrieval, evaluation, guardrails, model routing and cost. No tool worship and no magic promised — the exercise runs on one of the team’s own cases.',
          modules: [
            'Anatomy of an LLM: context, limits and where hallucination starts.',
            'RAG in practice: ingestion, hybrid retrieval, rerank and honest refusal.',
            'Agents: tools, memory, handoff and when not to use an agent.',
            'Evaluation, cost and observability before scaling.',
          ],
        },
        {
          id: 'vibe-coding',
          no: '02',
          category: 'Vibe Coding with Evidence',
          level: 'Intermediate',
          title: 'Code with agents without becoming hostage to code nobody understands.',
          outcome: 'Agent speed with engineering discipline: spec, test, review and gate.',
          audience: 'Developers, tech leads and solo builders.',
          desc: 'Vibe coding works when there is a contract. I teach the loop I run daily: clear intent, small scope, test before green, adversarial review and a traceable commit — with Claude Code, Codex and equivalents.',
          modules: [
            'Spec before prompt: turning a request into a verifiable criterion.',
            'TDD loop with an agent: red, green, refactor and what not to delegate.',
            'Adversarial review and human gates for risk and publishing.',
            'Agent parallelism, worktrees and collision-free integration.',
          ],
        },
        {
          id: 'servicenow',
          no: '03',
          category: 'ServiceNow & Governed AI',
          level: 'Enterprise',
          title: 'Now Assist and AI Agents grounded in foundation, not in a license.',
          outcome: 'Architects and delivery teams leave with an operating model, not a pretty POC.',
          audience: 'Platform architects, delivery teams and IT leadership.',
          desc: 'I have worked with ServiceNow for years in financial services. I connect Now Assist, AI Agents, CSDM, CMDB and Service Graph to the operating model that produces adoption — governance, permissioning, exceptions and audit trail included in scope.',
          modules: [
            'CSDM, CMDB and Service Graph as the context foundation for AI.',
            'Use cases by domain and risk: where value appears first.',
            'Governance: human gates, scope, fallback and audit trail.',
            'Adoption metrics and executive narrative to sustain the program.',
          ],
        },
        {
          id: 'agentops',
          no: '04',
          category: 'AgentOps & Operations',
          level: 'Advanced',
          title: 'From prototype to a system that runs on its own — under control.',
          outcome: 'Registry, scheduler, handoff, memory and evidence working inside the team.',
          audience: 'Platform, automation and operations teams.',
          desc: 'The part almost nobody teaches: what keeps an agent alive after the demo. Registry, scheduling, continuity across sessions, explicit approval and traceability — the same system I use to run my own agents.',
          modules: [
            'Registry, scheduler and runners: moving execution out of loose chat.',
            'Memory, handoff and continuity across sessions and coders.',
            'Human-in-the-loop: explicit approval, rollback and blast radius.',
            'Observability, cost and continuous learning with an auditable trail.',
          ],
        },
      ],
    },
    formats: {
      eyebrow: 'Formats',
      title: 'From keynote to squad coaching.',
      body: 'Each track is assembled in the format that fits the calendar and the team’s level. Depth changes; the exit criterion does not.',
      delivery: 'Remote or on-site · English and PT-BR · Material and artifacts stay with the team',
      items: [
        {
          id: 'keynote',
          name: 'Keynote / talk',
          duration: '45–90 min',
          desc: 'Align leadership and team on the same thesis before investing in tooling.',
        },
        {
          id: 'workshop',
          name: 'Hands-on workshop',
          duration: '1 day',
          desc: 'The team builds together on the real case. It leaves with a running artifact, not notes.',
        },
        {
          id: 'bootcamp',
          name: 'Bootcamp',
          duration: '4–8 weeks',
          desc: 'Full track, practice between sessions and one reviewed project at the end.',
        },
        {
          id: 'coaching',
          name: 'Squad coaching',
          duration: 'Recurring cycle',
          desc: 'Short, frequent follow-up: code review, architecture and gates.',
        },
        {
          id: 'executivo',
          name: 'Executive enablement',
          duration: 'Closed session',
          desc: 'Board and leadership: decision, risk, cost and adoption velocity without jargon.',
        },
      ],
    },
    method: {
      eyebrow: 'How I teach',
      title: 'Five rules I do not negotiate.',
      items: [
        'The case belongs to the team. A generic case study installs nothing.',
        'Every session ends with a running artifact: repository, workflow or evaluation.',
        'Human gates are content, not bureaucracy — risk and publishing require an explicit decision.',
        'Proof over pose: if it does not run, it is still a slide.',
        'English and PT-BR, from the executive whiteboard to the pull request.',
      ],
    },
    final: {
      h2: 'Shall we design your team’s track?',
      p: 'Tell me the team, the level and the problem that needs to leave the slide. I come back with a track, a format and the exit criterion.',
      primary: 'Talk about training',
      secondary: 'See the work',
    },
    disclaimer:
      'Independent authored content, built from public context and without confidential data. It does not represent ServiceNow and does not replace official vendor training or certification.',
    trackCta: 'Talk about this track',
  },
}
