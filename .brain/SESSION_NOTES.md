# Sessão 2026-06-13 — Melhoria completa do pierrondi.dev

## Objetivo

Melhorar performance, conversão/SEO e qualidade técnica do `pierrondi-site`, alinhando o site ao posicionamento executivo de Paulo Pierrondi.

## Plano

Plano aprovado pelo usuário em `/Users/paulopierrondi/.kimi/plans/wally-west-venom-signal.md`.
Execução em 4 fases sequenciais.

## Fase 1 — Correções críticas

- **Corrigido erro TypeScript em `components/PortraitHologram.tsx`** — `<line>` substituído por `RibbonLine` + `<primitive object={THREE.Line}>`.
- **Removido `ignoreBuildErrors: true` de `next.config.ts`** — build agora valida tipos.
- **Redirect `/app-store-connect` → `/precos`** adicionado.
- **Link `/automacoes` removido** de `/portfolio` e `/produto-digital`.
- **Corrigido `MobileCTA` em PT** — `contactId` agora é `'contact'` para alinhar com a home.
- **Adicionado `<h1>` em heros** via prop `headlineLevel` em `ProductTile`.
  - Páginas afetadas: `/blog`, `/blog/[slug]`, `/portfolio`, `/precos`, `/produto-digital`, `/tech-partner`, `/faq`, `/calculadora`, `/marketing-os`, `/marketing-os/numeros`, `/sobre`, `/privacy`, `/privacidade`, `/terms`, `/termos`, `/apps/[slug]`, `/apps/[slug]/[doc]`, `/obrigado`, `/quiz`, `/automacoes`.

## Fase 2 — Fundação de qualidade

- **Script `test` adicionado ao `package.json`** — `node --test test/**/*.test.mjs`.
- **CI atualizado** — step `npm test` adicionado ao `.github/workflows/ci.yml`.
- **Pre-commit corrigido** — `npx lint-staged` substituído por `npm run lint && npm test`.
- **`.env.example` sincronizado** — removidas variáveis WHYPAULO mortas; adicionadas variáveis reais usadas no código.
- **Rate-limits adicionados** em `/api/contact` (5/15min por IP) e `/api/automation-control/session` (10/15min por IP).
- **Utilitário `lib/rate-limit.ts`** criado.
- **`LanguageSwitcher.module.css` refatorado** para passar no teste de estilo (`border-radius: 999px`, `safe-area-inset-top`, `--language-active`, `.withTopNav`).

## Fase 3 — Performance e arquitetura

- **`KimiSwarmEffects` lazy-loaded** — removido do layout global; carregado apenas em `/`, `/feitos/[slug]`, `/design`, `/fso` via `SwarmEffectsLoader`.
- **`SiteJsonLd` convertido para Server Component** — wrapper client `SiteJsonLdWrapper` mantém a lógica de exclusão para `/bradesco-26`.
- **Dead code removido** — componentes legados da home antiga e CSS modules órfãos.
- **`app/agentes/page.tsx` removido** — redirect em `next.config.ts` já cobre.
- **`summarizePlanQueue` otimizado** — filtros duplicados substituídos por loop único.
- **`'use client'` removido** de `components/design-system/ui/separator.tsx`.

## Fase 4 — SEO, copy e conversão

- **Redirect `/sobre` → `/about`** — resolve canibalização de perfil.
- **Sitemap ajustado** — `/about` com prioridade alta, `/sobre` removido, legal pages em `0.1`, `/design/library` adicionado.
- **i18n em `/fso` e `/apps`** — `getCurrentLanguage` reconhece essas rotas como EN; `DocumentLangSync` ajusta `html lang` globalmente.
- **Nav/Footer/WhatsApp em EN** para `/apps/[slug]` e `/apps/[slug]/[doc]`.
- **Botão de idioma removido de `/paulo`** — `/en/paulo` não existe.
- **Contraste ajustado** — `--color-muted` de `0.48` para `0.70`; `--color-muted-soft` de `0.30` para `0.55`.

## Verificação

- `npx tsc --noEmit` ✅
- `npm run lint` ✅ (1 warning pré-existente em `FsoExperience.tsx`)
- `npm test` ✅ (20/20)
- `npm run build` ✅

## Decisões pendentes

- Commit/branch: o usuário precisa decidir se faz commit local ou cria branch.
- Lighthouse: rodar para validar contraste e performance após deploy.
- `/whypaulo`: mantido público; variáveis WHYPAULO removidas do `.env.example`.

## Arquivos principais alterados

- `next.config.ts`
- `package.json`
- `.github/workflows/ci.yml`
- `.husky/pre-commit`
- `.env.example`
- `app/layout.tsx`
- `app/page.tsx`
- `app/sitemap.ts`
- `components/PortraitHologram.tsx`
- `components/ui/ProductTile.tsx`
- `components/LanguageSwitcher.module.css`
- `lib/rate-limit.ts`
- `lib/control-tower/plan-view.ts`
- `lib/i18n/site-language.ts`
- `app/api/contact/route.ts`
- `app/api/automation-control/session/route.ts`
- `app/paulo/PauloPortfolioExperience.tsx`
- `app/globals.css`

## Riscos

- Grande superfície de mudança (~60 arquivos). Recomendado revisar diff antes de commit.
- `/sobre` ainda tem arquivo `page.tsx`, mas redirect 301 o torna inacessível.
- `KimiSwarmEffects` agora só carrega em 4 páginas; scroll smooth (Lenis) só ativo nelas.
