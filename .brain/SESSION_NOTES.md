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

## Fase 5 — Enterprise Bio redesign (internas)

- **`/atuacao` redesenhada** — 4 blocos de atuação com sticky aside, itens numerados e CTA para `/feitos`.
- **`/en/atuacao` criada** — versão EN reutilizando `AtuacaoContent`.
- **`/about` alinhado aos tokens globais** — CSS atualizado para usar `--color-*` do `globals.css`.
- **`/feitos` índice redesenhado** — 4 cards com mini-diagramas SVG, tags e abstract; componente `FeitosIndexContent` bilíngue.
- **`/en/feitos` criada**.
- **`/blog` layout handoff aplicado** — destaque + grid de 3 colunas; `BlogContent` bilíngue.
- **`/en/blog` criada**.
- **`/contato` integrado a `/api/contact`** — formulário movido para client component `ContatoForm`; página server component com `ContatoPageContent` bilíngue.
- **`/en/contato` criada**.
- **`/privacidade` e `/termos` redesenhadas** — novo layout tipográfico, sem `ProductTile`.
- **`/privacy` e `/terms` redesenhadas** — equivalentes EN com conteúdo condensado e alinhado.
- **Rotas i18n atualizadas em `lib/i18n/site-language.ts`** — `/atuacao`, `/contato`, `/blog`, `/feitos` e versões `/en/*` mapeadas no `localizedRoutes`.

## Fase 6 — Redesign das páginas legadas

- **`/precos`** — planos em grid 2×2, tabela comparativa e FAQ com `<details>`; sem `ProductTile`/`PillButton`.
- **`/tech-partner`** — hero com preço, grid de entregas, personas e FAQ.
- **`/produto-digital`** — entregas, stack, processo em 4 passos e FAQ.
- **`/portfolio`** — grid de 6 cases com prova, tags e CTA final.
- **`/paulo`** — CSS alinhado aos tokens globais (substituição sistemática de variáveis locais).
- **`/calculadora`** — formulário e resultados em card único, layout limpo.
- **`/faq`** — categorias com `<details>` e CTA final.
- **`/quiz`** — fluxo de 4 perguntas, resultado com captura de lead e integração `/api/contact`.
- **`/marketing-os`** — arquitetura em 4 camadas, princípios, personas, pacotes e CTA.
- **`/marketing-os/numeros`** — página de placeholder com aviso de migração.
- **`/apps/[slug]`** — landing de app com card limpo, highlights e links legais.
- **`/apps/[slug]/[doc]`** — support/privacy/terms com novo layout tipográfico.
- **`/obrigado`** — página de agradecimento redesenhada.
- **`/design/page.module.css`** — cores fixas substituídas por tokens globais.

## Verificação

- `npm run lint` ✅
- `npm test` ✅ (20/20)
- `npm run build` ✅ (174 páginas)

## Deploy

- **Branch:** `codex/enterprise-bio-phase3`
- **Commits:** 2 (`829ae09`, `a80f1b4`)
- **Push:** ✅ enviado para `origin/codex/enterprise-bio-phase3`
- **Railway:** ✅ deploy em produção concluído
- **URL de produção:** https://www.pierrondi.dev
- **Build status:** Online

(Deploy Vercel de preview mencionado anteriormente foi descartado; a hospedagem real é Railway.)

## Decisões pendentes

- Merge do PR e deploy em produção requerem aprovação explícita.
- `/en/blog` e `/en/feitos` reutilizam conteúdo PT nos cards; isso é aceitável por ora, mas pode ser melhorado com dados bilíngues completos no futuro.
- `/sobre` ainda tem arquivo `page.tsx`, mas redirect 301 o torna inacessível.

## Arquivos principais alterados

- `app/atuacao/*`, `app/en/atuacao/page.tsx`
- `app/feitos/*`, `app/en/feitos/page.tsx`
- `app/blog/BlogContent.tsx`, `app/en/blog/page.tsx`
- `app/contato/*`, `app/en/contato/page.tsx`
- `app/privacidade/*`, `app/privacy/*`, `app/termos/*`, `app/terms/*`
- `app/about/AboutAuthorityExperience.module.css`
- `app/precos/*`, `app/tech-partner/*`, `app/produto-digital/*`
- `app/portfolio/*`, `app/paulo/PauloPortfolioExperience.module.css`, `app/paulo/page.tsx`
- `app/calculadora/*`, `app/faq/*`, `app/quiz/*`
- `app/marketing-os/*`, `app/marketing-os/numeros/*`
- `app/apps/[slug]/*`, `app/apps/[slug]/[doc]/*`
- `app/obrigado/*`, `app/design/page.module.css`
- `lib/i18n/site-language.ts`

## Riscos

- Grande superfície de mudança. Recomendado revisar diff antes de merge.
- `/en/blog` e `/en/feitos` reutilizam conteúdo PT nos cards; melhorar no futuro.
- `/sobre` ainda tem arquivo `page.tsx`, mas redirect 301 o torna inacessível.
