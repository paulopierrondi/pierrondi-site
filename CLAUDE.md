# CLAUDE.md — pierrondi-site

> Repo split em 2026-05-15: este é o **site público**. Marketing OS interno foi para [pierrondi-os](https://github.com/paulopierrondi/pierrondi-os).

## Escopo

Landing page de conversão + páginas de serviço + blog SEO + calculadora de ROI. **Zero banco, zero auth.** Form posta pra Formspree.

## Stack

| Decisão | Escolha |
|---|---|
| Framework | Next.js 16.2 (App Router, React 19) |
| Linguagem | TypeScript 5 strict |
| CSS | Tailwind v4 + CSS variables em `app/globals.css` |
| Componentes | `@base-ui/react` + shadcn primitives em `components/ui/` |
| Animação | `framer-motion` 12 |
| Ícones | `lucide-react` |
| Fontes | Geist Sans + Geist Mono |
| Form | Formspree via `app/api/contact` (server proxy, sem banco) |
| Analytics | Plausible (opcional, via env) |
| Deploy | Railway (nixpacks) ou Vercel |

## Estrutura

```
app/
├── page.tsx                home
├── layout.tsx              SEO + JSON-LD + Plausible
├── globals.css             design tokens
├── animations.css
├── api/contact/            POST → Formspree
├── api/health/             healthcheck
├── blog/                   posts estáticos em posts.ts
├── automacoes/ produto-digital/ tech-partner/ precos/
├── sobre/ faq/ portfolio/
├── calculadora/            ROI calculator (lead magnet)
├── obrigado/ termos/ privacidade/ terms/ privacy/
├── og/ feed.xml/ sitemap.ts
└── en/                     versão em inglês
components/                 Hero, Nav, Footer, Contact, Marquee, Metrics...
  ui/                       shadcn primitives
  shared/                   SectionHeader
lib/
├── analytics.ts            Plausible helper
├── animations/variants.ts  framer-motion presets
├── i18n/                   pt + en copy + messages JSON
├── site.ts                 SITE_URL
├── utils.ts                cn()
└── utils/date.ts
```

## Env vars

```
FORMSPREE_URL=https://formspree.io/f/xpqoodnr
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/xpqoodnr
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=pierrondi.dev
NEXT_PUBLIC_SITE_URL=https://pierrondi.dev
```

## Design system

Tokens em `app/globals.css`. **Não hardcodar cores** — usar CSS variables.

## Regras pro agente

- Preservar o design system: não trocar cor, fonte ou estilo sem pedido explícito.
- Componentes em `components/`, páginas em `app/`.
- **Não adicionar dependências de DB, auth, queue, AI SDK ou Marketing OS aqui.** Esse repo é landing pure. Se precisar, vai pra `pierrondi-os`.
- Tipagem TypeScript estrita, sem `any` injustificado.
- Performance: LCP < 2s. Testar responsividade em 375 / 768 / 1024 / 1440.
- Acessibilidade: labels, `aria-*`, foco visível, contraste AA.
- Tom de copy: direto, técnico, brasileiro, sem buzzword. Evitar "inovador", "disruptivo", "transformação digital". Preferir números concretos.

## Dev commands

```bash
npm install
npm run dev          # localhost:3000
npm run build
npm run start
npm run lint
npm run test:e2e     # Playwright
```
