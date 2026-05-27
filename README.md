# pierrondi-site

Landing page pública de [pierrondi.dev](https://pierrondi.dev) — agência de IA aplicada, automação e produto digital.

Stack enxuto: **Next.js 16 + React 19 + Tailwind v4 + Formspree**. Zero banco, zero auth, CI em segundos.

> Marketing OS interno vive em [pierrondi-os](https://github.com/paulopierrondi/pierrondi-os). Esse split foi feito em 2026-05-15.

## Stack

| | |
|---|---|
| Framework | Next.js 16.2 (App Router, React 19) |
| Linguagem | TypeScript 5 strict |
| CSS | Tailwind v4 + CSS variables em `app/globals.css` |
| Componentes | `@base-ui/react` + shadcn-style primitives em `components/ui/` |
| Animação | `framer-motion` 12 |
| Ícones | `lucide-react` |
| Fontes | Geist Sans + Geist Mono via `next/font` |
| Form | Formspree (`https://formspree.io/f/xpqoodnr`) via `app/api/contact` proxy |
| Analytics | Plausible (opcional, via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) |
| Deploy | Railway (nixpacks) — plataforma canônica de produção |

## Dev

```bash
npm install
npm run dev          # localhost:3000
npm run build
npm run start
npm run test:e2e     # Playwright
```

## Env vars

Copiar `.env.example` → `.env.local`:

```
FORMSPREE_URL=https://formspree.io/f/xpqoodnr
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/xpqoodnr
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=pierrondi.dev
NEXT_PUBLIC_SITE_URL=https://pierrondi.dev
```

## Deploy

**Railway** — `next build` → `next start -p $PORT`. Nixpacks pega `nixpacks.toml`.

`pierrondi.dev` e `www.pierrondi.dev` são produção Railway. Qualquer projeto/alias Vercel remanescente é legado e não deve ser tratado como fonte oficial.

## Princípios

- Site público de conversão. Lean por design.
- Zero stateful complexity — sem banco, sem auth, sem queue.
- Form posta em `/api/contact` que faz forward pra Formspree. Falhou? 502.
- Conteúdo dinâmico (blog, i18n) é estático em TS.
- Tom: direto, técnico, brasileiro, sem buzzword.
