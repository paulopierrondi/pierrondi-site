export type PublicAnswerLink = {
  href: string
  label: string
}

/** Public answer briefs. PT-only briefs stay on the Portuguese URL from English pages. */
export const publicAnswerLinks: Record<'pt' | 'en', readonly PublicAnswerLink[]> = {
  pt: [
    {
      href: '/answers/fractional-vs-consultoria-vs-agencia',
      label: 'Fractional, consultoria, agência ou interno?',
    },
    {
      href: '/answers/o-que-e-fractional-ai-automation-officer',
      label: 'O que é Fractional AI Automation Officer?',
    },
    {
      href: '/answers/como-medir-resultado-de-ia-operacional',
      label: 'Como medir resultado de IA operacional?',
    },
    { href: '/answers/o-que-e-agentops', label: 'O que é AgentOps?' },
    { href: '/answers/quem-e-paulo-pierrondi', label: 'Quem é Paulo Pierrondi?' },
    { href: '/answers/llm-cost-cut-audit', label: 'O que é o LLM Cost-Cut Audit?' },
  ],
  en: [
    {
      href: '/en/answers/fractional-vs-consultancy-vs-agency',
      label: 'Fractional, consultancy, agency or internal?',
    },
    {
      href: '/answers/o-que-e-fractional-ai-automation-officer',
      label: 'What is a Fractional AI Automation Officer? (pt-BR)',
    },
    {
      href: '/answers/como-medir-resultado-de-ia-operacional',
      label: 'How to measure operational AI results? (pt-BR)',
    },
    { href: '/en/answers/what-is-agentops', label: 'What is AgentOps?' },
    { href: '/en/answers/who-is-paulo-pierrondi', label: 'Who is Paulo Pierrondi?' },
    { href: '/answers/llm-cost-cut-audit', label: 'What is the LLM Cost-Cut Audit? (pt-BR)' },
  ],
}
