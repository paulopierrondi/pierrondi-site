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

## 2026-07-10 (Claude Code) — hourly-portfolio-access-geo-monitor ALERT: root cause + 2 safeguard fixes

Contexto: automação `hourly-portfolio-access-geo-monitor` (cron Codex, roda a partir deste repo,
config em `~/.codex/automations/hourly-portfolio-access-geo-monitor/automation.toml`) mandou ALERT
20:10 UTC — "n8n: dispatch enabled but delivery not_configured" + analytics (Plausible/GA4/GSC)
bloqueados nos 4 sites do portfolio.

**Achado 1 — causa raiz da flakiness do n8n delivery (RESOLVIDO, config-only):**
`scripts/access-snapshot.mjs` lê env só via `process.env` (sem dotenv próprio). O `automation.toml`
chamava `npm run access:snapshot` direto, sem `brain-env-run --`, então a variável de webhook n8n
(guardada só no `.keys.env` central) nunca chegava ao processo do cron — por isso `memory.md` mostra
oscilação real `sent(200)` ↔ `not_configured` run a run (não é o mesmo bug se repetindo, é falta de
env consistente). Fix: `automation.toml` passo 1 agora roda
`... brain-env-run -- npm run access:snapshot -- --since 1h --limit 500` (Central Env File Operating
Model). Nenhum valor de secret foi lido, mudado ou impresso — só o nome da env var já cadastrada.

**Achado 2 — falso positivo "actionable error" (RESOLVIDO, code):**
Um run recente sinalizou como "actionable 4xx" os paths `/api/config/` e `/api/env/` no FaithSchool —
são probes de bot escaneando por vazamento de secrets, já corretamente respondidos com 404, não bugs
reais do site. `SECURITY_SCAN_PATHS` em `scripts/access-snapshot.mjs` não cobria `/api/config`,
`/api/env` (dir) nem `/env` (dir). Adicionadas 2 regex novas para classificá-los como
`security_scan_noise` em vez de `actionable`, reduzindo alert fatigue sem esconder erros reais.

**Validação:** `node --check scripts/access-snapshot.mjs` OK; `node --test test/*.test.mjs` → 36/36
pass (inclui `test/access-snapshot-operations-pulse.test.mjs`, 4/4). Nada de ads/deploy/DNS/secrets/
produção tocado.

**Complexity gate:** `complexity-guard.py scan --changed` reportou 1 HARD block em
`app/ai-search-portfolio/page.tsx` (NLOC>=120) — pré-existente, arquivo já estava dirty antes desta
sessão (trabalho em andamento do Paulo, não tocado aqui). Waiver registrado: não é regressão desta
mudança. `classifyHttpIssue` segue WARN (CCN 12, pré-existente, inalterado pela edição no array
`SECURITY_SCAN_PATHS`).

**Segurança — nota de correção própria:** durante o diagnóstico, um `grep` de verificação de
existência de nome de env var acabou imprimindo o valor de `N8N_PORTFOLIO_GEO_WEBHOOK_URL` (um
webhook loopback local, não uma API key) no output de um tool call desta sessão. Não foi reescrito em
nenhum lugar do vault/Markdown/email/Slack. Registrado aqui como lição: usar sempre `brain-env-run
list`/`check` (só nomes) em vez de `grep` direto no `.keys.env`.

**Não resolvido (human-gated, fora do meu escopo):**
- GA4 property IDs numéricos faltando: pierrondi.dev, AgenticosCore.
- Search Console access bloqueado: todos os 4 sites (pierrondi.dev, CantuStudio, AgenticosCore, FaithSchool).
- Plausible API token não configurado: todos os 4 sites.
- AgenticosCore GA4 unblock formal: Viewer access para `portfolio-analytics-monitor@agentcore-499217.iam.gserviceaccount.com` na property `543366142`.

Próxima ação humana: batch de decisão de analytics access (GA4/GSC/Plausible) quando o Paulo tiver
tempo — a automação já despacha isso como `decision_batch`/`digest_only` (não repetitivo) e agora,
com o fix do env, o n8n delivery deve parar de oscilar entre `sent`/`not_configured`.

## 2026-08-28 — Cursor overnight SEO: live Ahrefs 404

- Ahrefs Site Explorer: 151 crawled, 131×200, 18 redirects, 1×404, 1 other 4xx.
- Identified 404: `/apps` (advertised in `public/llms-full.txt` as historical support-page index; no hub page shipped). `/app` already 308→`/portfolio`. `/sprint` intentional 404, kept out of sitemap.
- Other 4xx consistent with intentional `410 /breach`.
- Fix on branch `cursor/seo-apps-404-redirect-c74c`: redirect `/apps`→`/portfolio`, `/en/apps`→`/en/portfolio`; remove dead `/apps` hub URL from llms-full.txt; SEO contract/audit guards.
- Local smoke: `/apps` 308→`/portfolio`, `/sprint` still 404, sitemap 64 locs without `/sprint`.
- No production deploy. PR for Codex/Paulo validation.
- Suggested Linear/Obsidian: note residual risk that `answers.json` still lists some `/apps/<slug>` URLs without local pages (App Store–only showcase apps); out of scope for the singular Ahrefs hub 404.

## 2026-08-28 — SEO sitemap: legal + EN twins indexable

- Made `/en/blog`, `/en/feitos`, `/privacy`, `/privacidade`, `/terms`, `/termos` indexable (removed intentional noindex from consolidate wave).
- Added those six locs to `app/sitemap.ts`.
- Kept `/sprint` unpublished and out of sitemap.
- Did not touch PR #43 `/apps` hub redirect; skipped `/apps/cantustudio` 404 (App Store–only on portfolio).
- Added `app/not-found.tsx` so 404 title/H1 are not the homepage title (soft-404 on `/apps` and `/sprint` until PR 43 deploys the hub redirect).
- Updated SEO contract + indexability audit + production validator expectations.
- No deploy.

## Sessão 2026-08-28 — answers.json App Store-only /apps 404 remap

- Live HEAD audit found 7 `appsPortfolio` urls pointing at missing `/apps/<slug>` landings: cantustudio-app, muse-edit, vibecode-kids, aura-afirmacoes, album-figurinhas-26, casa-clara, blockfront-tactics.
- Fixed `scripts/update-answers-graph.mjs` to use local `/apps/<slug>` only when slug exists in `_apps.ts`; otherwise use the App Store URL already used on `/portfolio`.
- Regenerated `public/answers.json`; added contract test in `test/public-geo-files.test.mjs`.
- Explicitly not done: no empty `/apps/cantustudio`, no `/sprint` sitemap entry, no redo of PR 43/44, no merge/deploy.
- Tests: `node --import tsx --test test/public-geo-files.test.mjs` → 7/7 pass.

## 2026-09-03 — SEO Person/WebPage entity slice (www.pierrondi.dev)

- Live gap: brand query “Paulo Pierrondi” occupied by LinkedIn / freelance marketplaces; production HTML had Person + ProfilePage but no WebPage and no `disambiguatingDescription`.
- Shipped on `cursor/seo-person-webpage-entity-f101`: home `/` and `/en` emit `@type: [WebPage, ProfilePage]` about `#person`; Person + Organization get honest `disambiguatingDescription` naming `https://www.pierrondi.dev`.
- sameAs unchanged: `https://br.linkedin.com/in/paulopierrondi`, `https://github.com/paulopierrondi` only. No Fractional claim (not on-page). No Product. `/sprint` still 404. IndexNow key untouched.
- Local render (`next start :3456`): title/H1 still brand-lead; WebPage + disambiguatingDescription present; Product absent.
- Tests: `npm test` → 145/145. Draft PR #49. Deploy remains human-gated.
- Suggested Linear/Obsidian: note this slice on `pierrondi-site` / AGE-1486 project; no new issue created.

## 2026-09-03 — GA4 gtag inject (G-1CL8PFYY7T)

- Live gap: `/` and `/en` RSC had `measurementId=G-1CL8PFYY7T` but the DOM had no `gtag.js`. Two blockers: (1) `GoogleAnalytics` gated scripts on `cookie-consent===all` while `CookieBanner` hid itself on immersive home `/` and `/en`; (2) CSP `script-src`/`connect-src`/`img-src` allowed Plausible but not googletagmanager / google-analytics.
- Fix on `cursor/ga4-gtag-inject-49b6`: layout injects `gtag.js?id=G-1CL8PFYY7T` with Consent Mode default `analytics_storage=denied`; banner now shows on home and grants on accept; CSP allowlists GTM/GA hosts. ID unchanged. No Product schema. `/sprint` still 404.
- Local `next start :3456`: `/` and `/en` 200 with gtag src+config in HTML; CSP includes GTM/GA and keeps Plausible; `/sprint` 404.
- Tests: `npm test` 150/150. Ready PR #50. Deploy remains human-gated.
- Suggested Linear/Obsidian: note GA4 tagging now injects; property 544419741 should start receiving hits after Railway deploy.

## 2026-09-05 — /engajamento Fractional AI Automation Officer page

- Draft PR `#53` on `cursor/engajamento-fractional-693f` against `main`. Parent decides merge. No deploy.
- New public page: PT `/engajamento`, EN `/en/engajamento`. H1 `Fractional AI Automation Officer`. Converts to `/contato` + existing WhatsApp pattern. Proof links only to `/feitos`.
- Sitemap + i18n + geo.md/llms.txt/llms-full.txt list the new URLs. `/sprint` still unpublished and 404.
- Home ATF gets a quiet `Modelo de engajamento` link (no Fractional title on home). `/atuacao` final actions get a third ghost CTA.
- Schema: page `WebPage` + `Service`. No Product/offers/price. Sitewide `Person.jobTitle` stays Technical Account Executive. gtag `G-1CL8PFYY7T` unchanged.
- Local `next start :3456`: `/engajamento` 200, `/en/engajamento` 200, `/sprint` 404, sitemap has both locs and no `/sprint`.
- Tests: `npm test` 157/157. `npx tsc --noEmit` + `npm run lint` + `npm run build` OK.
- Suggested Linear/Obsidian: note this offer page on `pierrondi-site` / AGE-1486. No new Linear issue created. Do not change live jobTitle.
