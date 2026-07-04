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
    detail: 'Componentes React/Tailwind open-source, com atribuição por autor.',
  },
  {
    label: 'Categorias rastreadas',
    value: '60+',
    detail: 'Hero, pricing, AI chat, cards, forms, shaders, loaders e mais.',
  },
  {
    label: '21st.dev pack',
    value: '98',
    detail: 'Coleção oficial citada pelo próprio catálogo 21st.dev.',
  },
  {
    label: 'Intake padrão',
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
    note: 'Ações pequenas, estados de loading, microinteração e conversão.',
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
    note: 'Blocos de valor para landing pages, propostas e portfólio.',
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
    note: 'Tiers, comparação, toggles, add-ons e monetização.',
  },
  {
    slug: 'form',
    name: 'Forms and inputs',
    fit: 'utility',
    note: 'Captura de lead, onboarding, filtros, upload e validação.',
  },
  {
    slug: 'dashboard',
    name: 'Dashboards',
    count: 30,
    fit: 'enterprise',
    note: 'Admin panels, charts, control towers e métricas operacionais.',
  },
  {
    slug: 'footer',
    name: 'Footers',
    fit: 'portfolio',
    note: 'Credibilidade, links legais, contato e navegação final.',
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
    useCase: 'Tabelas de preços para produtos digitais, agências e SaaS pequenos.',
    status: 'ready',
  },
  {
    title: 'Cards Stack',
    author: 'youcefbnm',
    category: 'card',
    sourceUrl: 'https://21st.dev/community/components/youcefbnm/cards-stack/default',
    installCommand: 'npm run design:install -- youcefbnm/cards-stack',
    dependencies: ['react', 'tailwindcss'],
    useCase: 'Stacks de cases, provas, portfólios e listas de entregáveis.',
    status: 'ready',
  },
  {
    title: 'Footer Column',
    author: 'mvp_Subha',
    category: 'footer',
    sourceUrl: 'https://21st.dev/community/components/mvp_Subha/footer-column',
    installCommand: 'npm run design:install -- mvp_Subha/footer-column',
    dependencies: ['next', 'lucide-react'],
    useCase: 'Rodapé multicoluna com contato, social e links institucionais.',
    status: 'ready',
  },
  {
    title: 'Thinking Tool',
    author: '21st.dev',
    category: 'ai-chat',
    sourceUrl: 'https://21st.dev/community/components/21st.dev/thinking-tool/default',
    dependencies: ['clsx', 'tailwind-merge', '@tabler/icons-react'],
    useCase: 'Mostrar raciocínio de assistentes, estados colapsáveis e tool calls.',
    status: 'reference',
  },
  {
    title: 'Search Tool',
    author: '21st.dev',
    category: 'ai-chat',
    sourceUrl: 'https://21st.dev/community/components/21st.dev/search-tool/alt-source-set',
    dependencies: ['clsx', 'tailwind-merge'],
    useCase: 'Padrão de busca para copilots, agents, knowledge bases e MCP.',
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
    copy: 'Usar 21st como fonte MIT e transformar o resultado no sistema Pierrondi: preto profundo, lime, cyan, evidência e narrativa executiva.',
    evidence: 'Fonte, autor e comando ficam registrados antes de entrar em página pública.',
  },
  {
    title: 'Instalar seletivamente',
    copy: 'Não despejar todos os componentes no bundle. O catálogo inteiro fica mapeado; código entra quando existe uso real.',
    evidence: 'Cada install passa por build, visual QA e nota de dependência.',
  },
  {
    title: 'Remixar para portfólio',
    copy: 'Todo bloco importado vira variante própria: copy, tokens, estados, responsividade e acessibilidade revisados.',
    evidence: 'A página /design mostra categorias, comandos e o pipeline de remix.',
  },
  {
    title: 'Virar memória operacional',
    copy: 'Antes de criar páginas novas, consultar este vault, a nota docs/design-vault.md e o snapshot 21st.',
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
