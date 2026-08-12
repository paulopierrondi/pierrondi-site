import { APP_STORE_CATALOG, PUBLIC_APP_STORE_APPS } from './portfolio-data'

export { PUBLIC_APP_STORE_APPS } from './portfolio-data'

export type PortfolioLang = 'pt' | 'en'

type Localized = Record<PortfolioLang, string>

const localized = (pt: string, en: string): Localized => ({ pt, en })

export const CATALOG_CATEGORIES = {
  'ai-systems': { label: localized('IA & Multi-LLM', 'AI & Multi-LLM') },
  'products-saas': { label: localized('Produtos & SaaS', 'Products & SaaS') },
  'mobile-apps': { label: localized('Apps & Mobile', 'Apps & Mobile') },
  'commerce-sites': { label: localized('Commerce & Sites', 'Commerce & Sites') },
  'automation-ops': { label: localized('Automação & Ops', 'Automation & Ops') },
  'enterprise-ai': { label: localized('Enterprise & Frameworks', 'Enterprise & Frameworks') },
  'creative-media': { label: localized('Creative & Media', 'Creative & Media') },
  'web-cms': { label: localized('Web, CMS & Growth', 'Web, CMS & Growth') },
} as const

export type PortfolioCatalogCategory = keyof typeof CATALOG_CATEGORIES

export type PortfolioCatalogKind =
  | 'product'
  | 'app'
  | 'system'
  | 'case'
  | 'framework'
  | 'tool'
  | 'lab'
  | 'capability'
  | 'course'
  | 'scaffold'

export type PortfolioCatalogEvidence =
  | 'app-store'
  | 'public-url'
  | 'public-page'
  | 'documented-case'
  | 'local-repository'
  | 'capability-artifact'

export type PortfolioCatalogVisibility = 'public' | 'protected' | 'local' | 'archived'

export const CATALOG_KIND_LABELS: Record<PortfolioCatalogKind, Localized> = {
  product: localized('Produto', 'Product'),
  app: localized('App', 'App'),
  system: localized('Sistema', 'System'),
  case: localized('Case', 'Case'),
  framework: localized('Framework', 'Framework'),
  tool: localized('Ferramenta', 'Tool'),
  lab: localized('Laboratório', 'Lab'),
  capability: localized('Capacidade', 'Capability'),
  course: localized('Base de curso', 'Course foundation'),
  scaffold: localized('Scaffold', 'Scaffold'),
}

export const CATALOG_EVIDENCE_LABELS: Record<PortfolioCatalogEvidence, Localized> = {
  'app-store': localized('Storefront Apple', 'Apple storefront'),
  'public-url': localized('URL pública', 'Public URL'),
  'public-page': localized('Página pública', 'Public page'),
  'documented-case': localized('Case documentado', 'Documented case'),
  'local-repository': localized('Repositório verificado', 'Verified repository'),
  'capability-artifact': localized('Artefato verificável', 'Verifiable artifact'),
}

export interface PortfolioCatalogEntry {
  id: string
  name: string
  shortCode: string
  category: PortfolioCatalogCategory
  kind: PortfolioCatalogKind
  evidence: PortfolioCatalogEvidence
  visibility: PortfolioCatalogVisibility
  publicSafe: true
  summary: Localized
  proof: Localized
  status: Localized
  technologies: string[]
  href?: string
  cta?: Localized
  external?: boolean
  featured?: boolean
  recent?: boolean
}

type CatalogDraft = Omit<PortfolioCatalogEntry, 'kind' | 'evidence' | 'visibility' | 'publicSafe'> &
  Partial<Pick<PortfolioCatalogEntry, 'kind' | 'evidence' | 'visibility'>>

function inferKind(entry: CatalogDraft): PortfolioCatalogKind {
  const status = `${entry.status.pt} ${entry.status.en}`.toLowerCase()
  if (entry.id === 'wordpress-elementor-kit') return 'capability'
  if (entry.id === 'sap-training-studio') return 'course'
  if (status.includes('scaffold')) return 'scaffold'
  if (status.includes('laboratório') || status.includes('lab')) return 'lab'
  if (status.includes('framework')) return 'framework'
  if (status.includes('case')) return 'case'
  if (entry.id.startsWith('app-') || status.includes('app publicado') || status.includes('storefront público')) return 'app'
  if (status.includes('ferramenta') || status.includes('tool') || status.includes('engine')) return 'tool'
  if (['ai-systems', 'automation-ops', 'enterprise-ai'].includes(entry.category)) return 'system'
  return 'product'
}

function inferEvidence(entry: CatalogDraft): PortfolioCatalogEvidence {
  const status = `${entry.status.pt} ${entry.status.en}`.toLowerCase()
  if (entry.id === 'wordpress-elementor-kit' || entry.id === 'sap-training-studio') return 'capability-artifact'
  if (entry.href?.includes('apps.apple.com')) return 'app-store'
  if (entry.external && entry.href) return 'public-url'
  if (entry.href) return 'public-page'
  if (status.includes('case')) return 'documented-case'
  return 'local-repository'
}

function inferVisibility(entry: CatalogDraft): PortfolioCatalogVisibility {
  const status = `${entry.status.pt} ${entry.status.en}`.toLowerCase()
  if (status.includes('arquivado') || status.includes('archived')) return 'archived'
  if (status.includes('protegido') || status.includes('protected') || status.includes('autenticação') || status.includes('authentication')) return 'protected'
  if (entry.href) return 'public'
  return 'local'
}

const item = (entry: CatalogDraft): PortfolioCatalogEntry => ({
  ...entry,
  kind: entry.kind ?? inferKind(entry),
  evidence: entry.evidence ?? inferEvidence(entry),
  visibility: entry.visibility ?? inferVisibility(entry),
  publicSafe: true,
})

export function resolvePortfolioHref(entry: Pick<PortfolioCatalogEntry, 'href'>, lang: PortfolioLang) {
  const href = entry.href
  if (!href || lang === 'pt' || href.startsWith('http')) return href
  if (href === '/') return '/en'
  if (href === '/studio' || href.startsWith('/studio#')) return `/en${href}`
  if (href.startsWith('/portfolio')) return `/en${href}`
  if (href.startsWith('/feitos/')) return '/en/feitos'
  return href
}

export function portfolioCatalogSearchText(entry: PortfolioCatalogEntry) {
  return [
    entry.name,
    entry.summary.pt,
    entry.summary.en,
    entry.proof.pt,
    entry.proof.en,
    entry.status.pt,
    entry.status.en,
    ...entry.technologies,
  ].join(' ')
}

export const MULTI_LLM_ROSTER = [
  { name: 'Codex', role: localized('integração e engenharia', 'integration and engineering') },
  { name: 'Claude Code', role: localized('arquitetura e revisão', 'architecture and review') },
  { name: 'Kimi K3', role: localized('pesquisa e varredura', 'research and broad scans') },
  { name: 'DeepSeek V4', role: localized('execução T1/T2 delimitada', 'bounded T1/T2 execution') },
  { name: 'GLM', role: localized('validação independente', 'independent validation') },
  { name: 'Grok', role: localized('protótipo e segunda opinião', 'prototyping and second opinion') },
] as const

const CORE_PORTFOLIO_CATALOG: PortfolioCatalogEntry[] = [
  item({
    id: 'pierrondi-studio', name: 'Pierrondi Studio', shortCode: 'PS', category: 'creative-media', featured: true,
    summary: localized('Marca, conteúdo, CRM e IA operados como um único sistema de crescimento.', 'Brand, content, CRM, and AI operated as one growth system.'),
    proof: localized('Quatro frentes integradas, método em cinco etapas e entregas com escopo e aprovação explícitos.', 'Four integrated capabilities, a five-stage method, and deliveries with explicit scope and approvals.'),
    status: localized('Oferta autoral pública', 'Public author-led practice'), technologies: ['Brand OS', 'CRM', 'AI', 'Content'], href: '/studio', cta: localized('Conhecer o Studio', 'Explore the Studio'),
  }),
  item({
    id: 'cantustudio', name: 'CantuStudio', shortCode: 'SATB', category: 'products-saas', featured: true, recent: true,
    summary: localized('Plataforma de harmonização coral que transforma melodias em arranjos SATB revisáveis.', 'Choir harmonization platform that turns melodies into reviewable SATB arrangements.'),
    proof: localized('Web em produção, app publicado e fluxo de importação, edição e exportação musical.', 'Production web product, published app, and music import, editing, and export workflows.'),
    status: localized('Produto multiplataforma publicado', 'Published multi-platform product'), technologies: ['Next.js', 'Python', 'MusicXML', 'Swift'], href: 'https://cantustudio.app/gerar-arranjo-satb', external: true, cta: localized('Abrir CantuStudio', 'Open CantuStudio'),
  }),
  item({
    id: 'faithschool', name: 'FaithSchool', shortCode: 'FS', category: 'products-saas', featured: true,
    summary: localized('Planejamento homeschool, frequência, horas, materiais, notas e registros familiares.', 'Homeschool planning, attendance, hours, materials, grades, and family records.'),
    proof: localized('Produto web e app publicado para iPhone e iPad, com base compartilhada para mobile.', 'Web product and published iPhone/iPad app with a shared mobile codebase.'),
    status: localized('Produto web e mobile publicado', 'Published web and mobile product'), technologies: ['Next.js', 'Capacitor', 'Firebase', 'Swift'], href: 'https://faithschool.app/homeschool-planner', external: true, cta: localized('Abrir FaithSchool', 'Open FaithSchool'),
  }),
  item({
    id: 'luar-do-campo', name: 'Luar do Campo', shortCode: 'LC', category: 'commerce-sites', featured: true,
    summary: localized('Storefront de moda com catálogo, variantes, busca, favoritos, carrinho e operação conectada.', 'Fashion storefront with catalog, variants, search, wishlists, cart, and connected operations.'),
    proof: localized('Entrega contratada com 50 produtos e identidade pública conceitual para preservar o cliente.', 'Contracted delivery with 50 products and a conceptual public identity that protects the client.'),
    status: localized('Entrega contratada · produto funcional', 'Contracted delivery · functional product'), technologies: ['React', 'TypeScript', 'Commerce UX', 'SEO'], href: 'https://luar-do-campo-demo.vercel.app', external: true, cta: localized('Abrir storefront', 'Open storefront'),
  }),
  item({
    id: 'agenticoscore', name: 'AgenticosCore', shortCode: 'AC', category: 'products-saas', featured: true, recent: true,
    summary: localized('Revenue OS com diagnóstico, scorecard, plano de ação e cockpit de execução.', 'Revenue OS with diagnostics, scorecards, action plans, and an execution cockpit.'),
    proof: localized('Planos assinados, estados explícitos, agentes especializados e aprovação humana.', 'Signed plans, explicit states, specialized agents, and human approval.'),
    status: localized('Plataforma operacional pública', 'Public operational platform'), technologies: ['Node.js', 'Agents', 'Scorecards', 'Human gates'], href: 'https://agenticoscore.ai/diagnostico', external: true, cta: localized('Abrir diagnóstico', 'Open diagnostics'),
  }),
  item({
    id: 'kommo-whatsapp', name: 'Kommo + WhatsApp', shortCode: 'KW', category: 'automation-ops', featured: true,
    summary: localized('Qualificação, roteamento, Salesbot e handoff humano para jornadas comerciais distintas.', 'Qualification, routing, Salesbot, and human handoff for distinct commercial journeys.'),
    proof: localized('Dois funis, 16 campos, 19 tags e cenários sintéticos validados em fluxo controlado.', 'Two pipelines, 16 fields, 19 tags, and synthetic scenarios validated in a controlled flow.'),
    status: localized('Case de CRM validado', 'Validated CRM case'), technologies: ['Kommo', 'WhatsApp', 'Webhooks', 'LGPD'], href: '/portfolio#kommo-whatsapp',
  }),
  item({
    id: 'studio-crm', name: 'Studio CRM', shortCode: 'CRM', category: 'products-saas', featured: true,
    summary: localized('CRM full-stack para clientes, projetos, contratos, pagamentos e atividades.', 'Full-stack CRM for clients, projects, contracts, payments, and activities.'),
    proof: localized('Autenticação, APIs protegidas, persistência estruturada e uma visão operacional única.', 'Authentication, protected APIs, structured persistence, and one operational view.'),
    status: localized('Aplicação protegida', 'Protected application'), technologies: ['Next.js', 'PostgreSQL', 'REST', 'Auth'], href: '/portfolio#studio-crm',
  }),
  item({
    id: 'sada', name: 'SADA', shortCode: 'SADA', category: 'enterprise-ai', featured: true,
    summary: localized('Arquitetura autoral que conecta intento, contexto, controle, ação e evidência de valor.', 'Author-developed architecture connecting intent, context, control, action, and value evidence.'),
    proof: localized('Framework independente para IA enterprise governada e workflows mensuráveis.', 'Independent framework for governed enterprise AI and measurable workflows.'),
    status: localized('Framework autoral', 'Author-developed framework'), technologies: ['Enterprise AI', 'CSDM', 'AgentOps', 'Value'], href: '/feitos/sada-servicenow', cta: localized('Explorar framework', 'Explore framework'),
  }),

  item({
    id: 'fleetflow', name: 'FleetFlow Decision Cockpit', shortCode: 'FF', category: 'products-saas', recent: true,
    summary: localized('Cockpit de decisão de frota com rotas, manutenção, combustível e modo de campo.', 'Fleet decision cockpit with routes, maintenance, fuel, and field mode.'),
    proof: localized('Fluxo navegável com dados determinísticos fictícios, sem backend, GPS ou integração externa real.', 'Navigable flow with fictional deterministic data and no live backend, GPS, or external integration.'),
    status: localized('Produto conceitual funcional', 'Functional concept product'), technologies: ['React', 'TypeScript', 'Operations', 'Offline UX'], href: 'https://fleetflow-super-demo.vercel.app', external: true, cta: localized('Abrir FleetFlow', 'Open FleetFlow'),
  }),
  item({
    id: 'alicerce', name: 'Alicerce Financiamento', shortCode: 'AL', category: 'products-saas', recent: true,
    summary: localized('Simulador que compara SAC, Price, CET estimado e elegibilidade preliminar.', 'Simulator comparing SAC, Price, estimated total cost, and preliminary eligibility.'),
    proof: localized('Instituições e taxas fictícias, cronograma auditável e disclaimer financeiro explícito.', 'Fictional institutions and rates, an auditable schedule, and an explicit financial disclaimer.'),
    status: localized('Simulador funcional público', 'Public functional simulator'), technologies: ['Next.js', 'TypeScript', 'Finance UX', 'QA'], href: 'https://alicerce-financiamento-production.up.railway.app', external: true, cta: localized('Abrir Alicerce', 'Open Alicerce'),
  }),
  item({
    id: 'property-partner-search', name: 'Property Partner Search', shortCode: 'PPS', category: 'products-saas', recent: true,
    summary: localized('Busca de oportunidades imobiliárias com parsing determinístico, filtros e ficha detalhada.', 'Property opportunity search with deterministic parsing, filters, and detailed records.'),
    proof: localized('Doze imóveis sintéticos e nenhuma integração ou dado de parceiro real.', 'Twelve synthetic properties with no live integration or real partner data.'),
    status: localized('Produto funcional público', 'Public functional product'), technologies: ['TypeScript', 'Rules Engine', 'Search', 'Railway'], href: 'https://meta-busca-parceiros-production.up.railway.app', external: true, cta: localized('Abrir produto', 'Open product'),
  }),
  item({
    id: 'cotapulse', name: 'CotaPulse', shortCode: 'CP', category: 'products-saas', recent: true,
    summary: localized('Sistema para coleta incremental, diferenças, saúde de sessão e exportação operacional.', 'System for incremental collection, diffs, session health, and operational exports.'),
    proof: localized('Arquitetura fixture-first com dados sintéticos e jornada documentada; a URL pública direciona para autenticação.', 'Fixture-first architecture with synthetic data and a documented journey; the public URL routes to authentication.'),
    status: localized('Produto funcional · acesso protegido', 'Functional product · protected access'), technologies: ['FastAPI', 'Next.js', 'PostgreSQL', 'Operations'], href: 'https://cotapulse-app.vercel.app', external: true, cta: localized('Abrir acesso protegido', 'Open protected access'),
  }),
  item({
    id: 'navigation-cockpit', name: 'Navigation Cockpit', shortCode: 'NAV', category: 'products-saas', recent: true,
    summary: localized('Navegação turn-by-turn no browser com mapa, rota, voz e cockpit responsivo.', 'Browser turn-by-turn navigation with maps, routing, voice, and a responsive cockpit.'),
    proof: localized('Duas rotas com posição simulada, reroute explícito e serviços públicos sem SLA comercial.', 'Two routes with simulated position, explicit rerouting, and public services without a commercial SLA.'),
    status: localized('Produto geoespacial funcional', 'Functional geospatial product'), technologies: ['MapLibre', 'OpenFreeMap', 'OSRM', 'Web Speech'], href: 'https://nav-demo-production.up.railway.app', external: true, cta: localized('Abrir cockpit', 'Open cockpit'),
  }),
  item({
    id: 'nexo-recebiveis', name: 'Nexo Recebíveis', shortCode: 'NX', category: 'products-saas', recent: true,
    summary: localized('Jornada de recebíveis com conciliação, baixa idempotente e auditoria.', 'Receivables journey with reconciliation, idempotent settlement, and audit.'),
    proof: localized('Eventos bancários e comunicação simulados; nenhuma operação financeira real é executada.', 'Simulated banking events and communication; no real financial operation is executed.'),
    status: localized('Vertical slice funcional', 'Functional vertical slice'), technologies: ['FastAPI', 'Next.js', 'Idempotency', 'Audit'], href: 'https://nexo-recebiveis-demo.vercel.app', external: true, cta: localized('Abrir Nexo', 'Open Nexo'),
  }),
  item({
    id: 'linhagem', name: 'Linhagem', shortCode: 'LIN', category: 'products-saas', recent: true,
    summary: localized('Perfis de cães, pedigree de cinco gerações, QR público e trilha de auditoria.', 'Dog profiles, five-generation pedigrees, public QR codes, and an audit trail.'),
    proof: localized('Fluxo funcional com dados controlados; não representa certificação oficial ou validade legal.', 'Functional flow with controlled data; it does not represent official certification or legal validity.'),
    status: localized('Plataforma funcional', 'Functional platform'), technologies: ['React', 'Supabase', 'QR', 'Audit'],
  }),
  item({
    id: 'chique-commerce', name: 'Chiquê Commerce OS', shortCode: 'CHQ', category: 'commerce-sites', recent: true,
    summary: localized('Operação comercial B2B com pedidos imutáveis, pendências, kanban e auditoria.', 'B2B commerce operations with immutable orders, typed issues, kanban, and audit.'),
    proof: localized('Seed fictício e integrações WooCommerce/Olist explicitamente simuladas.', 'Fictional seed data and explicitly simulated WooCommerce/Olist integrations.'),
    status: localized('Plataforma comercial funcional', 'Functional commerce platform'), technologies: ['React', 'Commerce', 'Kanban', 'WooCommerce'], href: 'https://chique.vercel.app', external: true, cta: localized('Abrir Chiquê', 'Open Chiquê'),
  }),
  item({
    id: 'aetherhold', name: 'Aetherhold', shortCode: 'AE', category: 'products-saas', recent: true,
    summary: localized('FPS de fantasia em WebGL com ilhas procedurais, combate e NPCs.', 'Fantasy WebGL FPS with procedural islands, combat, and NPCs.'),
    proof: localized('Experiência local funcional com assets procedurais e limites de performance documentados.', 'Functional local experience with procedural assets and documented performance boundaries.'),
    status: localized('Jogo web funcional', 'Functional web game'), technologies: ['Three.js', 'WebGL2', 'Game AI', 'Procedural'],
  }),
  item({
    id: 'atlas-ats', name: 'Atlas ATS', shortCode: 'ATS', category: 'products-saas', recent: true,
    summary: localized('ATS multi-tenant com vagas, carreiras, candidatos e feeds estruturados.', 'Multi-tenant ATS with jobs, careers, candidates, and structured feeds.'),
    proof: localized('Landing, login, carreiras e feeds JSON/XML validados com dados sintéticos.', 'Landing, login, careers, and JSON/XML feeds validated with synthetic data.'),
    status: localized('Sistema ATS funcional', 'Functional ATS'), technologies: ['Next.js', 'Multi-tenant', 'ATS', 'Feeds'], href: 'https://atlas-ats-chi.vercel.app', external: true, cta: localized('Abrir Atlas ATS', 'Open Atlas ATS'),
  }),
  item({
    id: 'whatsapp-workspace', name: 'WhatsApp Automation Workspace', shortCode: 'WA', category: 'automation-ops', recent: true,
    summary: localized('Workspace para intake, classificação, filas e automação de conversas comerciais.', 'Workspace for intake, classification, queues, and commercial conversation automation.'),
    proof: localized('Fluxo local funcional sem conexão, credenciais ou mensagens reais.', 'Functional local flow with no live connection, credentials, or real messages.'),
    status: localized('Produto local funcional', 'Functional local product'), technologies: ['Next.js', 'Queues', 'AI', 'CRM'],
  }),
  item({
    id: 'vetforma', name: 'VetForma Academy', shortCode: 'VET', category: 'products-saas',
    summary: localized('Plataforma educacional fictícia com catálogo, páginas SSG e administração protegida.', 'Fictional education platform with a catalog, SSG pages, and protected administration.'),
    proof: localized('Escola, preços, depoimentos e personas são sintéticos; a arquitetura e a jornada são funcionais.', 'School, pricing, testimonials, and personas are synthetic; the architecture and journey are functional.'),
    status: localized('Plataforma educacional funcional', 'Functional education platform'), technologies: ['Next.js', 'SSG', 'Auth', 'Education UX'],
  }),
  item({
    id: 'nexo-comercial', name: 'Nexo Comercial', shortCode: 'NC', category: 'products-saas',
    summary: localized('Cockpit B2B de vendas com contas, oportunidades e próximos passos.', 'B2B sales cockpit with accounts, opportunities, and next steps.'),
    proof: localized('Experiência construída com dados fictícios; nenhuma mensagem ou integração real.', 'Experience built with fictional data; no real messages or live integration.'),
    status: localized('Case de engenharia anonimizado', 'Anonymized engineering case'), technologies: ['React', 'Sales Ops', 'Synthetic data', 'UX'],
  }),
  item({
    id: 'pierrondi-site', name: 'pierrondi.dev', shortCode: 'DEV', category: 'web-cms', featured: true,
    summary: localized('Portfólio, autoridade pública, AI-search hub e catálogo de produtos em uma plataforma.', 'Portfolio, public authority, AI-search hub, and product catalog in one platform.'),
    proof: localized('Next.js com PT/EN, dados estruturados, llms.txt, answers graph, SEO/GEO e QA visual.', 'Next.js with PT/EN, structured data, llms.txt, an answers graph, SEO/GEO, and visual QA.'),
    status: localized('Site público em produção', 'Public production website'), technologies: ['Next.js', 'SEO/GEO', 'i18n', 'Structured data'], href: '/', cta: localized('Ver página inicial', 'View homepage'),
  }),
  item({
    id: 'calmaria-sounds', name: 'Calmaria Sounds', shortCode: 'CAL', category: 'products-saas',
    summary: localized('Paisagens sonoras brasileiras para sono, foco e desaceleração.', 'Brazilian soundscapes for sleep, focus, and winding down.'),
    proof: localized('Produto público com experiência web própria e catálogo de ambientes sonoros.', 'Public product with its own web experience and soundscape catalog.'),
    status: localized('Produto público', 'Public product'), technologies: ['Web audio', 'Product UX', 'Content', 'PWA'], href: 'https://calmaria.app', external: true, cta: localized('Abrir Calmaria', 'Open Calmaria'),
  }),
  item({
    id: 'runledger', name: 'RunLedger', shortCode: 'RL', category: 'automation-ops',
    summary: localized('Controle de processos para operadores, agentes e automações.', 'Process control plane for operators, agents, and automation.'),
    proof: localized('Registra estado, execução, decisão e continuidade em um ledger operacional.', 'Records state, execution, decisions, and continuity in an operational ledger.'),
    status: localized('Plataforma operacional', 'Operational platform'), technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Railway'],
  }),
  item({
    id: 'quoteops', name: 'QuoteOps', shortCode: 'QO', category: 'products-saas',
    summary: localized('Cotações auditáveis para pequenas empresas de construção e reforma.', 'Auditable quoting for small construction and renovation businesses.'),
    proof: localized('Itens, regras, versões e trilha de decisão substituem a planilha opaca.', 'Line items, rules, versions, and a decision trail replace opaque spreadsheets.'),
    status: localized('Produto funcional', 'Functional product'), technologies: ['TypeScript', 'QuoteOps', 'Rules', 'Audit'],
  }),

  item({
    id: 'autoapply-os', name: 'AutoApply OS', shortCode: 'AA', category: 'automation-ops', recent: true,
    summary: localized('Copiloto audit-first para oportunidades, candidaturas e propostas.', 'Audit-first copilot for opportunities, applications, and proposals.'),
    proof: localized('Fixtures, quality gates, autorização do dono e hard stops antes de ações externas.', 'Fixtures, quality gates, owner authorization, and hard stops before external actions.'),
    status: localized('Projeto open source', 'Open-source project'), technologies: ['TypeScript', 'Playwright', 'Quality gates', 'CLI'], href: 'https://github.com/paulopierrondi/autoapply-os', external: true, cta: localized('Ver código público', 'View public code'),
  }),
  item({
    id: 'automation-rescue-desk', name: 'Automation Rescue Desk', shortCode: 'ARD', category: 'automation-ops',
    summary: localized('Diagnóstico e recuperação de fluxos n8n, Make, Zapier, CRM e APIs.', 'Diagnostics and recovery for n8n, Make, Zapier, CRM, and API workflows.'),
    proof: localized('Health checks, classificação de falhas, runbooks e recuperação reproduzível.', 'Health checks, failure classification, runbooks, and reproducible recovery.'),
    status: localized('Produto em desenvolvimento', 'Product in development'), technologies: ['Automation', 'Health', 'Runbooks', 'Observability'],
  }),
  item({
    id: 'freelancer-pro', name: 'Freelancer Pro', shortCode: 'FP', category: 'automation-ops',
    summary: localized('Pipeline discover, analyze, price, propose e track para operações de projetos.', 'Discover, analyze, price, propose, and track pipeline for project operations.'),
    proof: localized('Scoring, faixas de preço, gates de qualidade e catálogo de evidências reutilizáveis.', 'Scoring, pricing bands, quality gates, and a catalog of reusable evidence.'),
    status: localized('Plataforma operacional local', 'Local operational platform'), technologies: ['Node.js', 'TypeScript', 'SQLite', 'Agents'],
  }),
  item({
    id: 'whatsapp-intake-crm', name: 'WhatsApp AI Intake CRM', shortCode: 'WAI', category: 'automation-ops',
    summary: localized('Intake conversacional com qualificação e entrega estruturada ao CRM.', 'Conversational intake with qualification and structured CRM delivery.'),
    proof: localized('Dados fictícios, limites de canal, consentimento e fila humana por padrão.', 'Fictional data, channel boundaries, consent, and human queues by default.'),
    status: localized('Sistema local funcional', 'Functional local system'), technologies: ['WhatsApp', 'AI', 'CRM', 'Privacy'],
  }),
  item({
    id: 'leadbridge', name: 'LeadBridge', shortCode: 'LB', category: 'automation-ops',
    summary: localized('Conversa multicanal, qualificação, decisão humana e entrega ao CRM.', 'Multichannel conversation, qualification, human decision, and CRM delivery.'),
    proof: localized('Contratos de dados, retries, auditoria e handoff explícito entre canais.', 'Data contracts, retries, audit, and explicit handoff across channels.'),
    status: localized('Produto em evolução', 'Evolving product'), technologies: ['TypeScript', 'CRM', 'Webhooks', 'Queues'],
  }),
  item({
    id: 'agentic-ops', name: 'Agentic Operations OS', shortCode: 'AOPS', category: 'ai-systems',
    summary: localized('Router, swarm, RAG e guardrails para operações governadas de agentes.', 'Router, swarm, RAG, and guardrails for governed agent operations.'),
    proof: localized('Separa contexto, execução, revisão e evidência sem publicar infraestrutura interna.', 'Separates context, execution, review, and evidence without exposing internal infrastructure.'),
    status: localized('Plataforma local', 'Local platform'), technologies: ['Python', 'RAG', 'Policies', 'AgentOps'],
  }),
  item({
    id: 'llm-gateway', name: 'Pierrondi LLM Gateway', shortCode: 'LLM', category: 'ai-systems',
    summary: localized('Endpoint único para roteamento entre provedores de modelos.', 'Single endpoint for routing across model providers.'),
    proof: localized('Adapters por provedor, contratos comuns e arquitetura de fallback sem expor configuração.', 'Provider adapters, shared contracts, and fallback architecture without exposing configuration.'),
    status: localized('Infraestrutura multi-LLM', 'Multi-LLM infrastructure'), technologies: ['TypeScript', 'Routing', 'Fallback', 'Telemetry'], href: '/feitos/llm-inferencia', cta: localized('Ver arquitetura LLM', 'View LLM architecture'),
  }),
  item({
    id: 'browser-runtime', name: 'Pierrondi Browser Runtime', shortCode: 'BR', category: 'ai-systems',
    summary: localized('Sessões persistentes read-only para workflows browser autorizados.', 'Persistent read-only sessions for authorized browser workflows.'),
    proof: localized('Validação fixture-first, adapters limitados por política e evidência reproduzível.', 'Fixture-first validation, policy-constrained adapters, and reproducible evidence.'),
    status: localized('Runtime local operacional', 'Operational local runtime'), technologies: ['Python', 'Playwright', 'Fixtures', 'Policy'],
  }),
  item({
    id: 'pierrondi-solver', name: 'Pierrondi Solver', shortCode: 'PSV', category: 'ai-systems',
    summary: localized('Camada local-first de verificação browser com failover e circuit breaker.', 'Local-first browser verification layer with failover and a circuit breaker.'),
    proof: localized('Serviço público para fluxos autorizados, com política explícita e telemetria.', 'Public service for authorized flows with explicit policy and telemetry.'),
    status: localized('Projeto open source', 'Open-source project'), technologies: ['FastAPI', 'Playwright', 'MCP', 'Policy'], href: 'https://github.com/paulopierrondi/pierrondi-solver', external: true, cta: localized('Ver código público', 'View public code'),
  }),
  item({
    id: 'reclaim', name: 'Reclaim', shortCode: 'RCL', category: 'ai-systems',
    summary: localized('Plugin e camada de preparação de corpus para memória local em Obsidian.', 'Plugin and corpus preparation layer for local Obsidian memory.'),
    proof: localized('Indexação local, deduplicação e busca sem publicar conteúdo do vault.', 'Local indexing, deduplication, and search without publishing vault content.'),
    status: localized('Projeto local', 'Local project'), technologies: ['Obsidian', 'Local index', 'RAG', 'Privacy'],
  }),
  item({
    id: 'reclaim-readiness', name: 'Obsidian Reclaim Corpus Readiness', shortCode: 'RAG', category: 'ai-systems',
    summary: localized('Auditoria de prontidão de corpus e RAG para bases Obsidian.', 'Corpus and RAG readiness audit for Obsidian knowledge bases.'),
    proof: localized('Checks locais de estrutura, duplicidade e recuperabilidade sem expor o conteúdo auditado.', 'Local checks for structure, duplication, and retrievability without exposing audited content.'),
    status: localized('Ferramenta local', 'Local tool'), technologies: ['Python', 'Obsidian', 'RAG', 'Audit'],
  }),
  item({
    id: 'qwen-code-lab', name: 'Qwen Code Local Lab', shortCode: 'QW', category: 'ai-systems',
    summary: localized('Laboratório histórico de coding local sem chave ou cloud.', 'Historical local coding lab requiring neither cloud nor API keys.'),
    proof: localized('CLI e avaliação local preservados como experimento técnico; não integra o roster operacional atual.', 'CLI and local evaluation preserved as a technical experiment; it is not part of the current operational roster.'),
    status: localized('Laboratório arquivado', 'Archived lab'), technologies: ['Ollama', 'CLI', 'Local LLM', 'Evaluation'],
  }),
  item({
    id: 'llm-teacher-student', name: 'LLM Teacher / Student Lab', shortCode: 'EVAL', category: 'ai-systems',
    summary: localized('Ambiente professor/aluno local para avaliação antes da execução.', 'Local teacher/student environment for evaluation before execution.'),
    proof: localized('Harness de testes separa resposta gerada, crítica e resultado verificável.', 'Test harness separates generated answers, critique, and verifiable results.'),
    status: localized('Laboratório de avaliação', 'Evaluation lab'), technologies: ['Local LLM', 'Evals', 'Harness', 'Python'],
  }),

  item({
    id: 'creative-forge', name: 'Creative Forge', shortCode: 'CF', category: 'creative-media',
    summary: localized('Briefing para imagem editorial, composição, tipografia e variantes de formato orientadas por uma mesma mensagem.', 'Brief-to-editorial-image workflow for composition, typography, and format variants guided by one message.'),
    proof: localized('Uma entrada organiza superfícies reutilizáveis com arte, tipografia, variantes e revisão antes de qualquer uso externo.', 'One input organizes reusable surfaces with art, typography, variants, and review before any external use.'),
    status: localized('Sistema criativo local', 'Local creative system'), technologies: ['Next.js', 'Image AI', 'Typography', 'QA'], href: '/studio#creative-forge', cta: localized('Ver sistema criativo', 'View creative system'),
  }),
  item({
    id: 'creative-video-factory', name: 'Creative Video Factory', shortCode: 'CVF', category: 'creative-media',
    summary: localized('Pipeline audiovisual para briefing, roteiro, voz, legendas, render, cortes e variantes por canal.', 'Audiovisual pipeline for brief, scripts, voice, captions, renders, edits, and channel-aware variants.'),
    proof: localized('Um master consistente e suas versões passam por gates de formato, mensagem e aprovação humana.', 'A consistent master and its versions pass through format, message, and human-approval gates.'),
    status: localized('Fábrica audiovisual local', 'Local audiovisual factory'), technologies: ['Remotion', 'FFmpeg', 'Voice AI', 'Captions'], href: '/studio#creative-video-factory', cta: localized('Ver pipeline audiovisual', 'View audiovisual pipeline'),
  }),
  item({
    id: 'content-engine', name: 'Pierrondi Content Engine', shortCode: 'PCE', category: 'creative-media',
    summary: localized('Briefing, roteiro, copy, direção visual e QA organizados em uma fila editorial controlada.', 'Brief, script, copy, visual direction, and QA organized in a controlled editorial queue.'),
    proof: localized('Criação, aprovação e publicação permanecem separadas; a ação externa nunca é disparada pela produção.', 'Creation, approval, and publishing remain separate; production never triggers the external action.'),
    status: localized('Engine editorial local', 'Local editorial engine'), technologies: ['Queues', 'LLM', 'Editorial', 'QA'], href: '/studio#content-engine', cta: localized('Ver fluxo editorial', 'View editorial flow'),
  }),
  item({
    id: 'brand-os', name: 'Pierrondi Brand OS', shortCode: 'BOS', category: 'creative-media',
    summary: localized('Sistema de identidade, presença e conteúdo com regras que mantêm a linguagem de marca coesa em cada superfície.', 'Identity, presence, and content system with rules that keep the brand language coherent across every surface.'),
    proof: localized('Tokens, regras, superfícies reutilizáveis e aprovação preservam consistência e controle nas entregas.', 'Tokens, rules, reusable surfaces, and approval preserve consistency and control across deliveries.'),
    status: localized('Sistema de marca testado', 'Tested brand system'), technologies: ['Brand', 'Design tokens', 'Approvals', 'QA'], href: '/studio#brand-os', cta: localized('Ver sistema de marca', 'View brand system'),
  }),
  item({
    id: 'design-system', name: 'Pierrondi Design System', shortCode: 'DS', category: 'creative-media',
    summary: localized('Componentes reutilizáveis para interfaces densas, acessíveis e coerentes.', 'Reusable components for dense, accessible, coherent interfaces.'),
    proof: localized('Tokens, estados, responsividade e critérios de qualidade compartilhados entre produtos.', 'Tokens, states, responsiveness, and quality criteria shared across products.'),
    status: localized('Design system em evolução', 'Evolving design system'), technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'Accessibility'],
  }),
  item({
    id: 'ppt-engine', name: 'PPT Engine', shortCode: 'PPT', category: 'creative-media',
    summary: localized('Geração de decks executivos editáveis por CLI.', 'Editable executive deck generation through a CLI.'),
    proof: localized('Narrativa, layout, diagramas e validação tratados como um sistema.', 'Narrative, layout, diagrams, and validation treated as a system.'),
    status: localized('Engine em desenvolvimento', 'Engine in development'), technologies: ['TypeScript', 'PPTX', 'CLI', 'LLM adapters'],
  }),
  item({
    id: 'slideforge', name: 'SlideForge AI', shortCode: 'SF', category: 'creative-media',
    summary: localized('Scaffold para apresentações assistidas por IA e revisão visual.', 'Scaffold for AI-assisted presentations and visual review.'),
    proof: localized('Pipeline de conteúdo e composição preparado para saída editável consistente.', 'Content and composition pipeline prepared for consistent editable output.'),
    status: localized('Scaffold de produto', 'Product scaffold'), technologies: ['Next.js', 'AI', 'Slides', 'Design'],
  }),
  item({
    id: 'apple-ads-copilot', name: 'Apple Ads Copilot', shortCode: 'ASA', category: 'automation-ops',
    summary: localized('Scaffold para análise e otimização assistida de Apple Ads.', 'Scaffold for assisted Apple Ads analysis and optimization.'),
    proof: localized('Recomendação é separada de qualquer mudança de campanha e permanece human-gated.', 'Recommendations are separated from campaign changes and remain human-gated.'),
    status: localized('Scaffold operacional', 'Operational scaffold'), technologies: ['Next.js', 'Apple Ads', 'Analytics', 'Human gates'],
  }),
  item({
    id: 'telegram-pdf', name: 'Telegram PDF Briefing', shortCode: 'TPA', category: 'automation-ops',
    summary: localized('Telegram estruturado para briefing PDF gerado localmente no macOS.', 'Structured Telegram input to a locally generated PDF briefing on macOS.'),
    proof: localized('Arquitetura, escopo, riscos e estimativa documentados como artefato reutilizável.', 'Architecture, scope, risks, and estimates documented as a reusable artifact.'),
    status: localized('Automação local funcional', 'Functional local automation'), technologies: ['macOS', 'Telegram', 'PDF', 'Automation'], href: 'https://github.com/paulopierrondi/telegram-pdf-macos-automation', external: true, cta: localized('Ver briefing técnico', 'View technical brief'),
  }),
  item({
    id: 'aura-audio', name: 'Aura Audio', shortCode: 'AUD', category: 'creative-media',
    summary: localized('Áudio de afirmações e ambientes para experiências de foco.', 'Affirmation and ambient audio for focus experiences.'),
    proof: localized('Scaffold web com arquitetura de geração e reprodução de áudio.', 'Web scaffold with audio generation and playback architecture.'),
    status: localized('Scaffold de produto', 'Product scaffold'), technologies: ['Next.js', 'Audio', 'TTS', 'Product UX'],
  }),
  item({
    id: 'focusflow', name: 'FocusFlow AI', shortCode: 'FFAI', category: 'mobile-apps',
    summary: localized('Pomodoro com sessões, rotinas e insights assistidos por IA.', 'Pomodoro with sessions, routines, and AI-assisted insights.'),
    proof: localized('Base SwiftUI, API TypeScript e landing integradas como um produto.', 'SwiftUI base, TypeScript API, and landing integrated as one product.'),
    status: localized('Produto em desenvolvimento', 'Product in development'), technologies: ['SwiftUI', 'Express', 'Next.js', 'AI'],
  }),
  item({
    id: 'investcoach', name: 'InvestCoach.AI', shortCode: 'IC', category: 'mobile-apps',
    summary: localized('Coach financeiro educacional com jornadas guiadas e assistência por IA.', 'Educational finance coach with guided journeys and AI assistance.'),
    proof: localized('Produto publicado com limites explícitos: conteúdo educacional, sem promessa de retorno ou aconselhamento financeiro.', 'Published product with explicit boundaries: educational content with no return promise or financial advice.'),
    status: localized('App publicado', 'Published app'), technologies: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'], href: APP_STORE_CATALOG.apps.find((app) => app.slug === 'investcoach')?.url, external: true, cta: localized('Ver na App Store', 'View on the App Store'),
  }),
  item({
    id: 'habitbloom', name: 'HabitBloom', shortCode: 'HB', category: 'mobile-apps',
    summary: localized('Hábitos gamificados com jardim, progressão e coach.', 'Gamified habits with a garden, progression, and coaching.'),
    proof: localized('Conceito de produto mobile com loop de hábito e assistência contextual.', 'Mobile product concept with a habit loop and contextual assistance.'),
    status: localized('Produto em desenvolvimento', 'Product in development'), technologies: ['Mobile', 'Gamification', 'Habits', 'AI'],
  }),
  item({
    id: 'provadoria', name: 'Provadoria', shortCode: 'PROV', category: 'mobile-apps',
    summary: localized('Provador virtual com assistência multimodal de IA.', 'Virtual fitting room with multimodal AI assistance.'),
    proof: localized('Arquitetura iOS para entrada visual, geração e comparação controlada.', 'iOS architecture for visual input, generation, and controlled comparison.'),
    status: localized('Produto em desenvolvimento', 'Product in development'), technologies: ['iOS', 'Multimodal AI', 'Fashion', 'Swift'],
  }),
  item({
    id: 'voudeque', name: 'VouDeQue', shortCode: 'VDQ', category: 'mobile-apps',
    summary: localized('Stylist pessoal com IA e criação de conteúdo social.', 'Personal AI stylist and social content creation.'),
    proof: localized('Produto iOS estruturado para recomendação visual e conteúdo assistido.', 'iOS product structured for visual recommendations and assisted content.'),
    status: localized('Produto em desenvolvimento', 'Product in development'), technologies: ['iOS', 'Multimodal AI', 'Fashion', 'Content'],
  }),
  item({
    id: 'logic-puzzle', name: 'Logic Puzzle', shortCode: 'LOG', category: 'products-saas',
    summary: localized('Puzzle estilo Einstein desenhado para partidas curtas.', 'Einstein-style puzzle designed for short sessions.'),
    proof: localized('PWA local funcional e shell SwiftUI para distribuição mobile.', 'Functional local PWA and SwiftUI shell for mobile distribution.'),
    status: localized('Jogo funcional local', 'Functional local game'), technologies: ['PWA', 'SwiftUI', 'Logic', 'Game UX'],
  }),
  item({
    id: 'mesa-de-guerra', name: 'Mesa de Guerra', shortCode: 'MDG', category: 'products-saas',
    summary: localized('Jogo de cartas tático por turnos com IA.', 'Turn-based tactical card game with AI.'),
    proof: localized('PWA funcional com shell mobile e loop de combate estruturado.', 'Functional PWA with a mobile shell and structured combat loop.'),
    status: localized('Jogo funcional local', 'Functional local game'), technologies: ['PWA', 'Game AI', 'Cards', 'Swift'],
  }),
  item({
    id: 'guia-2026', name: 'Guia 2026', shortCode: 'G26', category: 'mobile-apps',
    summary: localized('Guia informativo mobile para o torneio de 2026.', 'Mobile information guide for the 2026 tournament.'),
    proof: localized('Arquitetura mobile e conteúdo estruturado sem alegar vínculo oficial.', 'Mobile architecture and structured content without claiming official affiliation.'),
    status: localized('Produto em desenvolvimento', 'Product in development'), technologies: ['Mobile', 'Content', 'Sports', 'UX'],
  }),
  item({
    id: 'wordpress-elementor-kit', name: 'WordPress & Elementor Delivery Kit', shortCode: 'WP', category: 'web-cms',
    summary: localized('Pacote de arquitetura para páginas, blogs, formulários, SEO e handoff editorial.', 'Architecture kit for pages, blogs, forms, SEO, and editorial handoff.'),
    proof: localized('Checklists de staging, responsividade, templates, tracking e segurança; não é apresentado como case de cliente.', 'Checklists for staging, responsiveness, templates, tracking, and security; it is not presented as a client case.'),
    status: localized('Capability pack verificado', 'Verified capability pack'), technologies: ['WordPress', 'Elementor', 'SEO', 'Forms'],
  }),
  item({
    id: 'sap-training-studio', name: 'SAP Training Studio', shortCode: 'SAP', category: 'enterprise-ai',
    summary: localized('Estrutura autoral para treinamento, trilhas e materiais SAP.', 'Author-led structure for SAP training, learning paths, and materials.'),
    proof: localized('Escopo e conteúdo organizados como base de curso; sem página pública ou aluno alegado.', 'Scope and content organized as a course foundation with no claimed public page or students.'),
    status: localized('Base de curso', 'Course foundation'), technologies: ['SAP', 'Training', 'Curriculum', 'Content'],
  }),
  item({
    id: 'pawproof', name: 'PawProof', shortCode: 'PP', category: 'mobile-apps',
    summary: localized('Base web para registros, evidências e rotinas de cuidado animal.', 'Web foundation for pet records, evidence, and care routines.'),
    proof: localized('Scaffold Next.js identificado no inventário; sem status público inflado.', 'Next.js scaffold identified in the inventory with no inflated public status.'),
    status: localized('Scaffold catalogado', 'Cataloged scaffold'), technologies: ['Next.js', 'Records', 'Pets', 'Product UX'],
  }),
  item({
    id: 'gado-sindi', name: 'Gado Sindi', shortCode: 'GS', category: 'products-saas',
    summary: localized('Base web para gestão de rebanho, registros e operação de campo.', 'Web foundation for herd management, records, and field operations.'),
    proof: localized('Scaffold Vite/React identificado no inventário; sem implantação pública alegada.', 'Vite/React scaffold identified in the inventory with no claimed public deployment.'),
    status: localized('Scaffold catalogado', 'Cataloged scaffold'), technologies: ['Vite', 'React', 'Records', 'Field ops'],
  }),
]

const APP_DETAILS: Record<string, { summary: Localized; technologies?: string[] }> = {
  'bandle-br': { summary: localized('Jogo diário de música brasileira.', 'Daily Brazilian music game.'), technologies: ['SwiftUI', 'Music', 'Game'] },
  'muse-edit': { summary: localized('Closet e estilo pessoal assistidos por IA.', 'AI-assisted personal style closet.'), technologies: ['iOS', 'Android', 'Fashion AI'] },
  adivinha: { summary: localized('Quiz musical diário em português e inglês.', 'Daily music quiz in Portuguese and English.'), technologies: ['SwiftUI', 'Express', 'Railway'] },
  'vibecode-kids': { summary: localized('Experiência infantil de aprendizagem.', 'Children’s learning experience.') },
  'caso-relampago-ai': { summary: localized('Jogo de investigação e resolução de casos com IA.', 'AI case-solving investigation game.') },
  'aura-afirmacoes': { summary: localized('Afirmações, áudio e foco em uma rotina diária.', 'Affirmations, audio, and focus in a daily routine.'), technologies: ['iOS', 'TTS', 'AI'] },
  'album-figurinhas-26': { summary: localized('Álbum offline para uma coleção 49 × 20.', 'Offline album for a 49 × 20 collection.'), technologies: ['SwiftUI', 'Offline', 'Collections'] },
  'lifttool-002': { summary: localized('Gestão pessoal de tarefas.', 'Personal task management.') },
  'casa-clara': { summary: localized('Organização doméstica e rotinas da casa.', 'Home organization and household routines.'), technologies: ['SwiftUI', 'FastAPI', 'Railway'] },
  brewmate: { summary: localized('Companion para preparo e registro de café.', 'Coffee brewing and logging companion.') },
  'blockfront-tactics': { summary: localized('Jogo de estratégia tática por blocos.', 'Block-based tactical strategy game.') },
  'chroma-ai': { summary: localized('Paletas de cor assistidas por IA.', 'AI-assisted color palettes.') },
  mytone: { summary: localized('Criação de toques personalizados com IA.', 'AI-powered custom ringtone creation.'), technologies: ['iOS', 'Express', 'Audio AI'] },
  'parabens-ia-br': { summary: localized('Vídeos musicais personalizados de aniversário.', 'Personalized birthday music videos.'), technologies: ['SwiftUI', 'FastAPI', 'StoreKit'] },
  snapread: { summary: localized('Leitura e resumo assistidos por IA.', 'AI-assisted reading and summarization.') },
  linguagil: { summary: localized('Flashcards para aprendizagem de idiomas.', 'Language-learning flashcards.') },
  'supercode-005': { summary: localized('Notas organizadas para desenvolvedores.', 'Organized notes for developers.') },
}

const appCatalogEntries = PUBLIC_APP_STORE_APPS
  .filter((app) => !['faithschool', 'cantustudio-app', 'investcoach'].includes(app.slug))
  .map((app): PortfolioCatalogEntry => {
    const details = APP_DETAILS[app.slug]
    return item({
      id: `app-${app.slug}`,
      name: app.name,
      shortCode: app.name.replace(/[^A-Za-zÀ-ÿ0-9]/g, '').slice(0, 3).toUpperCase(),
      category: 'mobile-apps',
      summary: details?.summary ?? localized(`App ${app.category.toLowerCase()} publicado na App Store.`, `Published ${app.category.toLowerCase()} App Store product.`),
      proof: localized('Página oficial, versão e artwork verificados no storefront público da Apple.', 'Official product page, version, and artwork verified in Apple’s public storefront.'),
      status: localized('Storefront público verificado', 'Public storefront verified'),
      technologies: details?.technologies ?? ['iOS', 'App Store', app.category],
      href: app.url,
      external: true,
      cta: localized('Ver na App Store', 'View on the App Store'),
    })
  })

export const PORTFOLIO_CATALOG: PortfolioCatalogEntry[] = [
  ...CORE_PORTFOLIO_CATALOG,
  ...appCatalogEntries,
]
