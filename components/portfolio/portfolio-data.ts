import appStoreCatalog from '@/public/app-icons/app-store-catalog.json'

export type PortfolioLang = 'pt' | 'en'

export type PortfolioVisualKind =
  | 'cantustudio'
  | 'faithschool'
  | 'app-store'
  | 'kommo'
  | 'studio-crm'
  | 'pierrondi-studio'
  | 'agenticoscore'
  | 'sada'

export type PortfolioAccent = 'gold' | 'sand' | 'blue' | 'violet' | 'cyan' | 'green' | 'prism'

export interface AppStoreProduct {
  slug: string
  name: string
  trackId: string
  bundleId: string
  version: string
  category: string
  url: string
  icon: string
}

export interface PortfolioCase {
  id: string
  index: string
  navLabel: string
  title: string
  eyebrow: string
  headline: string
  description: string
  proof: string
  status: string
  accent: PortfolioAccent
  visual: PortfolioVisualKind
  logoSlug?: string
  platforms: string[]
  stack: string[]
  facts: Array<{ value: string; label: string }>
  href: string
  cta: string
  secondaryHref?: string
  secondaryCta?: string
  external?: boolean
}

type AppStoreCatalog = {
  developerId: string
  storefront: string
  count: number
  apps: AppStoreProduct[]
}

export const APP_STORE_CATALOG = appStoreCatalog as AppStoreCatalog

const appStoreUrl = (trackId: string) =>
  APP_STORE_CATALOG.apps.find((app) => app.trackId === trackId)?.url ?? '#app-store'

export const PORTFOLIO_CASES: Record<PortfolioLang, PortfolioCase[]> = {
  pt: [
    {
      id: 'pierrondi-studio',
      index: '01',
      navLabel: 'Pierrondi Studio',
      title: 'Pierrondi Studio',
      eyebrow: 'MARCA · CONTEÚDO · CRM · IA',
      headline: 'Marca, conteúdo e operação como um sistema de crescimento.',
      description:
        'Frente autoral que transforma posicionamento, comunicação e operação comercial em sistemas executáveis — da estratégia à implementação.',
      proof:
        'Quatro frentes integradas, três cases de aplicação, método em cinco etapas e parceria white-label com escopo e aprovação explícitos.',
      status: 'Oferta autoral · página pública',
      accent: 'green',
      visual: 'pierrondi-studio',
      platforms: ['Estratégia', 'Conteúdo', 'Automação'],
      stack: ['Posicionamento', 'Branding', 'Multimídia', 'CRM', 'IA'],
      facts: [
        { value: '4', label: 'frentes' },
        { value: '3', label: 'cases' },
        { value: '5', label: 'etapas' },
      ],
      href: '/studio',
      cta: 'Conhecer o Pierrondi Studio',
    },
    {
      id: 'cantustudio',
      index: '02',
      navLabel: 'CantuStudio',
      title: 'CantuStudio',
      eyebrow: 'PRODUTO DE IA · MÚSICA · MULTIPLATAFORMA',
      headline: 'Da melodia ao arranjo SATB revisável.',
      description:
        'Desenvolvimento ponta a ponta de uma plataforma de harmonização coral: entrada por melodia ou arquivo, geração em quatro vozes, revisão, playback e exportação em PDF, MIDI e MusicXML.',
      proof:
        'Aplicação web em produção, app para iPhone e iPad publicado na App Store e pacote Android AAB preparado para distribuição.',
      status: 'Web + App Store + Android build',
      accent: 'gold',
      visual: 'cantustudio',
      logoSlug: 'cantustudio',
      platforms: ['Web', 'iPhone / iPad', 'Android build'],
      stack: ['Next.js', 'Python', 'Kotlin', 'MusicXML', 'IA'],
      facts: [
        { value: '4', label: 'vozes SATB' },
        { value: '3', label: 'plataformas' },
        { value: 'PDF · MIDI · XML', label: 'exports' },
      ],
      href: 'https://cantustudio.app/gerar-arranjo-satb',
      cta: 'Explorar CantuStudio',
      secondaryHref: appStoreUrl('6764287847'),
      secondaryCta: 'Ver na App Store',
      external: true,
    },
    {
      id: 'faithschool',
      index: '03',
      navLabel: 'FaithSchool',
      title: 'FaithSchool',
      eyebrow: 'EDTECH · SAAS · MOBILE',
      headline: 'Homeschool e registros familiares no mesmo sistema.',
      description:
        'Plataforma para planejar aulas, acompanhar frequência e horas, organizar materiais e notas, manter devocionais e consolidar registros familiares.',
      proof:
        'Produto web e app para iPhone e iPad publicados, com builds iOS e Android mantidos na mesma base Capacitor.',
      status: 'Web + App Store + Android build',
      accent: 'sand',
      visual: 'faithschool',
      logoSlug: 'faithschool-web',
      platforms: ['Web', 'iPhone / iPad', 'Android build'],
      stack: ['Next.js', 'Capacitor', 'Swift', 'Kotlin', 'Firebase'],
      facts: [
        { value: '2.5.6', label: 'versão pública' },
        { value: 'IPA + AAB', label: 'pacotes mobile' },
        { value: 'Web · iOS · Android', label: 'arquitetura' },
      ],
      href: 'https://faithschool.app/homeschool-planner',
      cta: 'Conhecer FaithSchool',
      secondaryHref: appStoreUrl('6764325629'),
      secondaryCta: 'Ver na App Store',
      external: true,
    },
    {
      id: 'app-portfolio',
      index: '04',
      navLabel: '21 apps',
      title: 'App portfolio',
      eyebrow: 'APP STORE · PRODUTOS PUBLICADOS',
      headline: 'Apps pequenos, reais e lançados.',
      description:
        'Portfólio público em educação, produtividade, música, finanças, lifestyle, jogos e ferramentas — do conceito à publicação, privacidade, suporte e atualização.',
      proof:
        'Os 21 produtos e seus artworks foram validados diretamente no storefront público da Apple; cada ícone abre sua página oficial.',
      status: '21 apps publicados',
      accent: 'blue',
      visual: 'app-store',
      platforms: ['iPhone', 'iPad', 'App Store'],
      stack: ['Swift', 'SwiftUI', 'StoreKit', 'Vision', 'Core ML'],
      facts: [
        { value: '21', label: 'apps públicos' },
        { value: '7+', label: 'categorias' },
        { value: 'BR + US', label: 'storefronts' },
      ],
      href: '/portfolio#app-store',
      cta: 'Ver todos os apps',
    },
    {
      id: 'kommo-whatsapp',
      index: '05',
      navLabel: 'Kommo + WA',
      title: 'Kommo + WhatsApp',
      eyebrow: 'CRM · AUTOMAÇÃO · HANDOFF HUMANO',
      headline: 'Da primeira mensagem ao funil certo.',
      description:
        'Implantação Kommo com dois funis operacionais, qualificação, Salesbot, roteamento por origem e handoff humano documentado para jornadas distintas.',
      proof:
        'A integração com WhatsApp foi conectada e validada em fluxo controlado, preservando gates de canal, LGPD e aprovação humana antes da ampliação.',
      status: 'Integração validada',
      accent: 'violet',
      visual: 'kommo',
      platforms: ['Kommo', 'WhatsApp', 'Salesbot'],
      stack: ['CRM', 'Webhooks', 'IA', 'LGPD', 'Automation'],
      facts: [
        { value: '2', label: 'funis' },
        { value: '16', label: 'campos' },
        { value: '19', label: 'tags' },
      ],
      href: '/portfolio#kommo-whatsapp',
      cta: 'Ver case de integração',
    },
    {
      id: 'studio-crm',
      index: '06',
      navLabel: 'Studio CRM',
      title: 'Studio CRM',
      eyebrow: 'FULL-STACK · OPERAÇÃO · DADOS',
      headline: 'Um CRM para operar trabalho — não só contatos.',
      description:
        'Aplicação full-stack com autenticação, dashboard e módulos de clientes, projetos, contratos, pagamentos, atividades e discussões.',
      proof:
        'APIs protegidas, persistência estruturada e uma visão operacional única, sem expor dados ou telas internas no portfólio público.',
      status: 'Aplicação protegida',
      accent: 'cyan',
      visual: 'studio-crm',
      platforms: ['Web app', 'API', 'Auth'],
      stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'REST', 'Security'],
      facts: [
        { value: '6', label: 'módulos operacionais' },
        { value: 'Auth', label: 'acesso protegido' },
        { value: 'Full-stack', label: 'entrega' },
      ],
      href: '/portfolio#studio-crm',
      cta: 'Ver módulos e arquitetura',
    },
    {
      id: 'agenticoscore',
      index: '07',
      navLabel: 'AgenticosCore',
      title: 'AgenticosCore',
      eyebrow: 'REVENUE OS · AGENTES · HUMAN GATES',
      headline: 'Gates antes da escala. Evidência antes do investimento.',
      description:
        'Revenue OS com diagnóstico, scorecard, plano de ação, proposta, follow-up e cockpit de execução para operações B2B.',
      proof:
        'Um sistema operacional de RevOps que se instala ao redor do CRM existente; não é uma agência nem um CRM genérico.',
      status: 'Revenue OS ao vivo',
      accent: 'green',
      visual: 'agenticoscore',
      logoSlug: 'agenticoscore',
      platforms: ['Web', 'Railway', 'Automation'],
      stack: ['Node.js', 'Agents', 'Scorecards', 'SEO/GEO', 'Human gates'],
      facts: [
        { value: 'Scorecard', label: 'diagnóstico' },
        { value: 'Signed', label: 'planos de ação' },
        { value: 'Human gates', label: 'governança' },
      ],
      href: 'https://agenticoscore.ai/diagnostico',
      cta: 'Abrir sistema público',
      external: true,
    },
    {
      id: 'sada',
      index: '08',
      navLabel: 'SADA',
      title: 'SADA',
      eyebrow: 'FRAMEWORK DESENVOLVIDO POR PAULO PIERRONDI',
      headline: 'Do intento executivo à evidência de valor.',
      description:
        'SADA — ServiceNow AI-Driven Architecture — conecta visão, contexto, decisões de arquitetura, execução em workflow e valor mensurável.',
      proof:
        'Um método prescritivo e independente para IA enterprise governada; não é uma metodologia oficial da ServiceNow.',
      status: 'Framework autoral',
      accent: 'prism',
      visual: 'sada',
      platforms: ['Enterprise AI', 'ServiceNow', 'Operating model'],
      stack: ['Intent', 'Context', 'Control', 'Action', 'Evidence'],
      facts: [
        { value: '5', label: 'estágios' },
        { value: '4', label: 'camadas' },
        { value: 'Value', label: 'orientação' },
      ],
      href: '/feitos/sada-servicenow',
      cta: 'Explorar o framework',
    },
  ],
  en: [
    {
      id: 'pierrondi-studio',
      index: '01',
      navLabel: 'Pierrondi Studio',
      title: 'Pierrondi Studio',
      eyebrow: 'BRAND · CONTENT · CRM · AI',
      headline: 'Brand, content, and operations designed as one growth system.',
      description:
        'An author-led practice that turns positioning, communication, and commercial operations into executable systems—from strategy through implementation.',
      proof:
        'Four integrated capabilities, three application cases, a five-stage method, and a white-label partnership model with explicit scope and approvals.',
      status: 'Author-led practice · public page',
      accent: 'green',
      visual: 'pierrondi-studio',
      platforms: ['Strategy', 'Content', 'Automation'],
      stack: ['Positioning', 'Branding', 'Multimedia', 'CRM', 'AI'],
      facts: [
        { value: '4', label: 'capabilities' },
        { value: '3', label: 'cases' },
        { value: '5', label: 'stages' },
      ],
      href: '/en/studio',
      cta: 'Explore Pierrondi Studio',
    },
    {
      id: 'cantustudio',
      index: '02',
      navLabel: 'CantuStudio',
      title: 'CantuStudio',
      eyebrow: 'AI PRODUCT · MUSIC · MULTI-PLATFORM',
      headline: 'From melody to a reviewable SATB arrangement.',
      description:
        'End-to-end development of a choir harmonization platform covering melody and file input, four-part generation, review, playback, and PDF, MIDI, and MusicXML export.',
      proof:
        'A production web application, an iPhone and iPad app published on the App Store, and an Android AAB prepared for distribution.',
      status: 'Web + App Store + Android build',
      accent: 'gold',
      visual: 'cantustudio',
      logoSlug: 'cantustudio',
      platforms: ['Web', 'iPhone / iPad', 'Android build'],
      stack: ['Next.js', 'Python', 'Kotlin', 'MusicXML', 'AI'],
      facts: [
        { value: '4', label: 'SATB voices' },
        { value: '3', label: 'platforms' },
        { value: 'PDF · MIDI · XML', label: 'exports' },
      ],
      href: 'https://cantustudio.app/gerar-arranjo-satb',
      cta: 'Explore CantuStudio',
      secondaryHref: appStoreUrl('6764287847'),
      secondaryCta: 'View on the App Store',
      external: true,
    },
    {
      id: 'faithschool',
      index: '03',
      navLabel: 'FaithSchool',
      title: 'FaithSchool',
      eyebrow: 'EDTECH · SAAS · MOBILE',
      headline: 'Homeschool planning and family records in one system.',
      description:
        'A platform for lesson planning, attendance and hours tracking, materials, grades, devotionals, and consolidated family records.',
      proof:
        'A published web product and iPhone/iPad app, with iOS and Android builds maintained through the same Capacitor codebase.',
      status: 'Web + App Store + Android build',
      accent: 'sand',
      visual: 'faithschool',
      logoSlug: 'faithschool-web',
      platforms: ['Web', 'iPhone / iPad', 'Android build'],
      stack: ['Next.js', 'Capacitor', 'Swift', 'Kotlin', 'Firebase'],
      facts: [
        { value: '2.5.6', label: 'public version' },
        { value: 'IPA + AAB', label: 'mobile packages' },
        { value: 'Web · iOS · Android', label: 'architecture' },
      ],
      href: 'https://faithschool.app/homeschool-planner',
      cta: 'Explore FaithSchool',
      secondaryHref: appStoreUrl('6764325629'),
      secondaryCta: 'View on the App Store',
      external: true,
    },
    {
      id: 'app-portfolio',
      index: '04',
      navLabel: '21 apps',
      title: 'App portfolio',
      eyebrow: 'APP STORE · SHIPPED PRODUCTS',
      headline: 'Small, real products — shipped.',
      description:
        'A public portfolio across education, productivity, music, finance, lifestyle, games, and tools — from concept through release, privacy, support, and iteration.',
      proof:
        'All 21 products and artworks were verified directly against Apple’s public storefront; every icon opens its official page.',
      status: '21 published apps',
      accent: 'blue',
      visual: 'app-store',
      platforms: ['iPhone', 'iPad', 'App Store'],
      stack: ['Swift', 'SwiftUI', 'StoreKit', 'Vision', 'Core ML'],
      facts: [
        { value: '21', label: 'public apps' },
        { value: '7+', label: 'categories' },
        { value: 'BR + US', label: 'storefronts' },
      ],
      href: '/en/portfolio#app-store',
      cta: 'Explore all apps',
    },
    {
      id: 'kommo-whatsapp',
      index: '05',
      navLabel: 'Kommo + WA',
      title: 'Kommo + WhatsApp',
      eyebrow: 'CRM · AUTOMATION · HUMAN HANDOFF',
      headline: 'From the first message to the right pipeline.',
      description:
        'A Kommo implementation with two operational pipelines, qualification rules, Salesbot, source routing, and documented human handoff for distinct journeys.',
      proof:
        'The WhatsApp integration was connected and validated through a controlled flow, preserving channel, privacy, and approval gates before wider automation.',
      status: 'Integration validated',
      accent: 'violet',
      visual: 'kommo',
      platforms: ['Kommo', 'WhatsApp', 'Salesbot'],
      stack: ['CRM', 'Webhooks', 'AI', 'Privacy', 'Automation'],
      facts: [
        { value: '2', label: 'pipelines' },
        { value: '16', label: 'fields' },
        { value: '19', label: 'tags' },
      ],
      href: '/en/portfolio#kommo-whatsapp',
      cta: 'See the integration case',
    },
    {
      id: 'studio-crm',
      index: '06',
      navLabel: 'Studio CRM',
      title: 'Studio CRM',
      eyebrow: 'FULL-STACK · OPERATIONS · DATA',
      headline: 'A CRM built to run the work — not just store contacts.',
      description:
        'A full-stack application with authentication, dashboard, and modules for clients, projects, contracts, payments, activities, and discussions.',
      proof:
        'Protected APIs, structured persistence, and a single operational view without exposing private data or internal screens in the public portfolio.',
      status: 'Protected application',
      accent: 'cyan',
      visual: 'studio-crm',
      platforms: ['Web app', 'API', 'Auth'],
      stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'REST', 'Security'],
      facts: [
        { value: '6', label: 'operational modules' },
        { value: 'Auth', label: 'protected access' },
        { value: 'Full-stack', label: 'delivery' },
      ],
      href: '/en/portfolio#studio-crm',
      cta: 'Explore modules and architecture',
    },
    {
      id: 'agenticoscore',
      index: '07',
      navLabel: 'AgenticosCore',
      title: 'AgenticosCore',
      eyebrow: 'REVENUE OS · AGENTS · HUMAN GATES',
      headline: 'Gates before scale. Evidence before investment.',
      description:
        'A Revenue OS combining diagnostics, scorecards, action plans, proposals, follow-up, and an execution cockpit for B2B operations.',
      proof:
        'An operating system installed around an existing CRM; it is neither an agency nor a generic CRM product.',
      status: 'Live Revenue OS',
      accent: 'green',
      visual: 'agenticoscore',
      logoSlug: 'agenticoscore',
      platforms: ['Web', 'Railway', 'Automation'],
      stack: ['Node.js', 'Agents', 'Scorecards', 'SEO/GEO', 'Human gates'],
      facts: [
        { value: 'Scorecard', label: 'diagnostics' },
        { value: 'Signed', label: 'action plans' },
        { value: 'Human gates', label: 'governance' },
      ],
      href: 'https://agenticoscore.ai/diagnostico',
      cta: 'Open the public system',
      external: true,
    },
    {
      id: 'sada',
      index: '08',
      navLabel: 'SADA',
      title: 'SADA',
      eyebrow: 'FRAMEWORK DEVELOPED BY PAULO PIERRONDI',
      headline: 'From executive intent to evidence of value.',
      description:
        'SADA — ServiceNow AI-Driven Architecture — connects vision, context, architecture decisions, workflow execution, and measurable value.',
      proof:
        'An independent prescriptive method for governed enterprise AI; it is not an official ServiceNow methodology.',
      status: 'Author-developed framework',
      accent: 'prism',
      visual: 'sada',
      platforms: ['Enterprise AI', 'ServiceNow', 'Operating model'],
      stack: ['Intent', 'Context', 'Control', 'Action', 'Evidence'],
      facts: [
        { value: '5', label: 'stages' },
        { value: '4', label: 'layers' },
        { value: 'Value', label: 'orientation' },
      ],
      href: '/feitos/sada-servicenow',
      cta: 'Explore the framework',
    },
  ],
}
