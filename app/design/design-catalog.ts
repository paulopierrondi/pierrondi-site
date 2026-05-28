export type DesignVaultCategory = {
  slug: string
  name: string
  count?: number
  fit: 'portfolio' | 'product' | 'enterprise' | 'motion' | 'utility'
  note: string
}

export type InstallableComponent = {
  title: string
  author: string
  category: string
  sourceUrl: string
  installCommand?: string
  dependencies: string[]
  useCase: string
  status: 'ready' | 'reference'
}

export type DesignPrinciple = {
  title: string
  copy: string
  evidence: string
}

export const sourceStats = [
  {
    label: '21st Community',
    value: 'MIT',
    detail: 'Componentes React/Tailwind open-source, com atribuicao por autor.',
  },
  {
    label: 'Categorias rastreadas',
    value: '60+',
    detail: 'Hero, pricing, AI chat, cards, forms, shaders, loaders e mais.',
  },
  {
    label: '21st.dev pack',
    value: '98',
    detail: 'Colecao oficial citada pelo proprio catalogo 21st.dev.',
  },
  {
    label: 'Intake padrao',
    value: '3 fases',
    detail: 'Referenciar, instalar seletivamente e remixar no visual Pierrondi.',
  },
] as const

export const priorityCategories: DesignVaultCategory[] = [
  {
    slug: 'hero',
    name: 'Hero systems',
    count: 284,
    fit: 'portfolio',
    note: 'Primeira dobra, autoridade, produto visual e tese de valor.',
  },
  {
    slug: 'button',
    name: 'Buttons and CTAs',
    count: 250,
    fit: 'utility',
    note: 'Acoes pequenas, estados de loading, microinteracao e conversao.',
  },
  {
    slug: 'card',
    name: 'Cards and surfaces',
    count: 422,
    fit: 'product',
    note: 'Cases, tiles, pricing, evidence blocks e listas densas.',
  },
  {
    slug: 'animation',
    name: 'Motion primitives',
    count: 304,
    fit: 'motion',
    note: 'Scroll, reveal, hover, SVG, GSAP e framer-motion.',
  },
  {
    slug: 'ai-chat',
    name: 'AI chat and agents',
    count: 78,
    fit: 'enterprise',
    note: 'Chat, tool calls, reasoning, file attachment, MCP e agent UI.',
  },
  {
    slug: 'features',
    name: 'Feature sections',
    count: 102,
    fit: 'portfolio',
    note: 'Blocos de valor para landing pages, propostas e portfolio.',
  },
  {
    slug: 'shader',
    name: 'Shaders and 3D',
    count: 87,
    fit: 'motion',
    note: 'Fundos vivos, WebGL, gradientes interativos e visual premium.',
  },
  {
    slug: 'pricing-section',
    name: 'Pricing sections',
    fit: 'product',
    note: 'Tiers, comparacao, toggles, add-ons e monetizacao.',
  },
  {
    slug: 'form',
    name: 'Forms and inputs',
    fit: 'utility',
    note: 'Captura de lead, onboarding, filtros, upload e validacao.',
  },
  {
    slug: 'dashboard',
    name: 'Dashboards',
    count: 30,
    fit: 'enterprise',
    note: 'Admin panels, charts, control towers e metricas operacionais.',
  },
  {
    slug: 'footer',
    name: 'Footers',
    fit: 'portfolio',
    note: 'Credibilidade, links legais, contato e navegacao final.',
  },
  {
    slug: 'spinner-loader',
    name: 'Loaders',
    count: 24,
    fit: 'utility',
    note: 'Estados de espera com personalidade e feedback claro.',
  },
] as const

export const sourceCategories = [
  'accordion',
  'ai-chat',
  'alert',
  'announcement',
  'avatar',
  'background',
  'badge',
  'border',
  'button',
  'calendar',
  'call-to-action',
  'card',
  'carousel',
  'checkbox',
  'chip-tag',
  'clients',
  'comparison',
  'date-picker',
  'dock',
  'dropdown',
  'empty-state',
  'features',
  'file-tree',
  'footer',
  'form',
  'hero',
  'hook',
  'icons',
  'image',
  'input',
  'link',
  'map',
  'menu',
  'modal-dialog',
  'navbar-navigation',
  'notification',
  'number',
  'pagination',
  'popover',
  'pricing-section',
  'radio-group',
  'registration-signup',
  'scroll-area',
  'select',
  'shader',
  'sidebar',
  'sign-in',
  'slider',
  'spinner-loader',
  'table',
  'tabs',
  'testimonials',
  'text',
  'textarea',
  'toast',
  'toggle',
  'tooltip',
  'upload-download',
  'video',
] as const

export const installableComponents: InstallableComponent[] = [
  {
    title: 'Pricing Component',
    author: 'jatin-yadav05',
    category: 'pricing-section',
    sourceUrl: 'https://21st.dev/community/components/jatin-yadav05/pricing-component',
    installCommand: 'npm run design:install -- jatin-yadav05/pricing-component',
    dependencies: ['lucide-react'],
    useCase: 'Tabelas de precos para produtos digitais, agencias e SaaS pequenos.',
    status: 'ready',
  },
  {
    title: 'Cards Stack',
    author: 'youcefbnm',
    category: 'card',
    sourceUrl: 'https://21st.dev/community/components/youcefbnm/cards-stack/default',
    installCommand: 'npm run design:install -- youcefbnm/cards-stack',
    dependencies: ['react', 'tailwindcss'],
    useCase: 'Stacks de cases, provas, portfolios e listas de entregaveis.',
    status: 'ready',
  },
  {
    title: 'Footer Column',
    author: 'mvp_Subha',
    category: 'footer',
    sourceUrl: 'https://21st.dev/community/components/mvp_Subha/footer-column',
    installCommand: 'npm run design:install -- mvp_Subha/footer-column',
    dependencies: ['next', 'lucide-react'],
    useCase: 'Rodape multi-coluna com contato, social e links institucionais.',
    status: 'ready',
  },
  {
    title: 'Thinking Tool',
    author: '21st.dev',
    category: 'ai-chat',
    sourceUrl: 'https://21st.dev/community/components/21st.dev/thinking-tool/default',
    dependencies: ['clsx', 'tailwind-merge', '@tabler/icons-react'],
    useCase: 'Mostrar raciocinio de assistentes, estados colapsaveis e tool calls.',
    status: 'reference',
  },
  {
    title: 'Search Tool',
    author: '21st.dev',
    category: 'ai-chat',
    sourceUrl: 'https://21st.dev/community/components/21st.dev/search-tool/alt-source-set',
    dependencies: ['clsx', 'tailwind-merge'],
    useCase: 'Padrao de busca para copilots, agents, knowledge bases e MCP.',
    status: 'reference',
  },
  {
    title: 'Agent Elements Pack',
    author: '21st.dev',
    category: 'ai-chat',
    sourceUrl: 'https://21st.dev/community/21st.dev',
    dependencies: ['react', 'tailwindcss'],
    useCase: 'Biblioteca de tool groups, input bar, file attachment, model picker e MCP tool.',
    status: 'reference',
  },
] as const

export const designPrinciples: DesignPrinciple[] = [
  {
    title: 'Referenciar sem copiar identidade',
    copy: 'Usar 21st como fonte MIT e transformar o resultado no sistema Pierrondi: preto profundo, lime, cyan, evidencia e narrativa executiva.',
    evidence: 'Fonte, autor e comando ficam registrados antes de entrar em pagina publica.',
  },
  {
    title: 'Instalar seletivamente',
    copy: 'Nao despejar todos os componentes no bundle. O catalogo inteiro fica mapeado; codigo entra quando existe uso real.',
    evidence: 'Cada install passa por build, visual QA e nota de dependencia.',
  },
  {
    title: 'Remixar para portfolio',
    copy: 'Todo bloco importado vira variante propria: copy, tokens, estados, responsividade e acessibilidade revisados.',
    evidence: 'A pagina /design mostra categorias, comandos e o pipeline de remix.',
  },
  {
    title: 'Virar memoria operacional',
    copy: 'Antes de criar paginas novas, consultar este vault, a nota docs/design-vault.md e o snapshot 21st.',
    evidence: 'Vault Obsidian atualizado no High Craft Frontend Visual Standard.',
  },
] as const

export const previewSystems = [
  {
    label: 'Hero',
    title: 'Executive first viewport',
    category: 'hero',
  },
  {
    label: 'Pricing',
    title: 'Offer architecture',
    category: 'pricing-section',
  },
  {
    label: 'Agent UI',
    title: 'Tools, reasoning, MCP',
    category: 'ai-chat',
  },
  {
    label: 'Dashboard',
    title: 'Control tower surfaces',
    category: 'dashboard',
  },
] as const
