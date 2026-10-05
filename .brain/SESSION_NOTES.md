# Sessão 2026-10-05 — EN twin of the fractional comparison brief

- Draft PR only. Do not merge. Deploy stays human-gated. Paulo merges.
- Added `/en/answers/fractional-vs-consultancy-vs-agency` as the English mirror of live `/answers/fractional-vs-consultoria-vs-agencia`.
- Axes: ownership after go-live, measurement (baseline → metric → handoff), engagement shape, risks. Primary CTA `/en/engajamento`. No price, client, logo, ROI, Product schema, named competitors, or `/sprint` link.
- Title: `Fractional, consultancy, agency or internal? | pierrondi.dev` (60). Meta description 155 chars. Canonical `https://www.pierrondi.dev/en/answers/fractional-vs-consultancy-vs-agency`.
- hreflang both ways (`pt-BR`, `en-US`, `x-default` → PT). In-page alternate links both ways. Hub `/en/answers` lists the twin. `localizedRoutes` maps both paths. Language switcher stays hidden on `/answers` and `/en/answers`, same as the other briefs.
- Registered on sitemap, `answers.json`, `geo.md`, `llms.txt`, `llms-full.txt`, `/ai-search`. Did not touch `/sprint`, Oferta Sprint, IndexNow (#62), or sameAs/llms crawl policy (#63).
- JSON-LD from shared `AnswerBrief`: Question + FAQPage + Article + BreadcrumbList. Global site graph still emits its existing types; this page does not add Product.
- Verified local: `npm test` 181/181, `npm run lint` clean, `npx tsc --noEmit` clean, `npm run build` prerenders the route as static (`○`). HTML scan of the prerender confirms title, description, canonical, hreflang. `next start` on port 3456: EN page 200, `/sprint` 404. Playwright click: CTA lands on `/en/engajamento`; Portuguese link lands on the PT brief.
- Screenshots: `/opt/cursor/artifacts/en-comparison-hero.png`, `/opt/cursor/artifacts/en-comparison-links.png`.
- Suggested Obsidian/Linear: on `02_Projects/pierrondi-site` / AGE-1486, note draft PR #65. Do not mark shipped until Paulo merges and Railway deploys.

# Sessão 2026-09-19 — Ahrefs meta description too long (23 URLs)

- Ahrefs Site Audit (Pierrondi): **Meta description too long** on 23 indexable URLs.
- Extra email context: project `10292667`, crawl `18-09-2026T033434`, issue `+2` vs prior crawl. Explorer URL Cloudflare-blocked; Ahrefs MCP `needsAuth`.
- Live fallback: crawled `https://www.pierrondi.dev/sitemap.xml` (74 URLs) + 14 extras. **Exactly 23 pages > 160 chars** — same set already fixed on PR #58. Seven more sit at 156–160 (inside the project max). `/fso` and `/itau` are robots Disallow and redirect to `/about`.
- Project max is the existing 120–160 convention (`test/treinamentos-page.test.mjs`, `test/engajamento-page.test.mjs`).
- Shared helper `lib/seo/meta-description.ts` (`clampMetaDescription`, max 160) now wraps `/apps/[slug]` and `/feitos/[slug]` metadata so long body copy is not dumped into `<meta name="description">`.
- **Lesson:** a naive clamp that stops at the first clean break traded one Ahrefs issue for another — 5 pages fell under 110 chars, which is Ahrefs' "meta description too short" threshold. The clamp now biases cuts toward the top of the 120–160 window (whole sentence → clause → word gap), so all 15 clamped snippets land in range.
- **Lesson:** the first contract test read `description:` only as a quoted single-quote literal, so `app/fso/page.tsx` (`description: DESCRIPTION` const, 206 chars) and the double-quoted `/privacy` + `/terms` silently passed. The resolver now handles both quote styles plus module consts, anchors on the first `description:` so it cannot fall through to a shorter og/twitter literal, and asserts a minimum scan count so a regex regression cannot pass vacuously.
- Rewrote the 8 unique static meta descriptions (home PT/EN, layout default, `/paulo`, 5 `/answers/*`) to 120–160 without emptying meaning. Home still names “resultado e automações mensuráveis (não horas soltas)”.
- Body copy (`feito.lead`, `app.description`, JSON-LD) unchanged. No ads. Deploy remains human-gated.
- Verified: `npm test` 176/176, `tsc --noEmit` + `lint` clean, `next build` then HTML scan of 183 rendered pages → 0 over 160, 0 empty, longest exactly 160.
- Suggested Linear/Obsidian: note the Ahrefs meta-description slice on `pierrondi-site` / AGE-1486. Recrawl after deploy.

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

## 2026-09-05 — Home discovery + claim→proof bridge (P0)

- Bug: home nav Atuação/Work used `homeSection: 'skills'`, so `/` and `/en` jumped to Stack instead of `/atuacao` and `/en/atuacao`.
- Fix: Atuação → `/atuacao`, Work → `/en/atuacao`. Stack is its own nav item (`/#skills`, `/en#skills`).
- Added a compact Evidence Ledger module between hero and portfolio. Cards reuse the first two anonymized `/feitos` delivery cases; CTA goes to `/feitos` and `/en/feitos`. Hero pill “Resultado mensurável” / “Measurable outcomes” links to `#proof`.
- Did not invent metrics, change Person jobTitle, add Product schema, publish `/sprint`, or touch GA4 `G-1CL8PFYY7T`.
- Suggested Linear/Obsidian: note the home claim→proof bridge on `pierrondi-site` / AGE-1486. Deploy remains human-gated.

## 2026-09-05 — Hero engagement CTA swap (same PR #52)

- Hero pill “Resultado mensurável” / “Measurable outcomes” already links to `#proof`.
- Primary CTA is now COLABORAR / COLLABORATE (`#contact`) with copper/amber fill. Secondary “sistemas em produção” / “systems in production” stays ghost/outline to `#projects`.
- No /sprint, no invented metrics, no Fractional title, gtag untouched.

## 2026-09-05 — /engajamento Fractional AI Automation Officer page

- PR `#53` on `cursor/engajamento-fractional-693f` against `main`. Paulo approved merge. No deploy from this agent.
- New public page: PT `/engajamento`, EN `/en/engajamento`. H1 `Fractional AI Automation Officer`. Converts to `/contato` + existing WhatsApp pattern. Proof links only to `/feitos`.
- Sitemap + i18n + geo.md/llms.txt/llms-full.txt list the new URLs. `/sprint` still unpublished and 404.
- Home ATF gets a quiet `Modelo de engajamento` link (no Fractional title on home). `/atuacao` final actions get a third ghost CTA.
- Schema: page `WebPage` + `Service`. No Product/offers/price. Sitewide `Person.jobTitle` stays Technical Account Executive. gtag `G-1CL8PFYY7T` unchanged.
- Rebased/merged `origin/main` after `#52` (home discovery + proof bridge + COLABORAR CTA). Conflict only in this file; both notes kept.
- Local `next start :3456`: `/engajamento` 200, `/en/engajamento` 200, `/sprint` 404, sitemap has both locs and no `/sprint`.
- Tests: `npm test` 157/157. `npx tsc --noEmit` + `npm run lint` + `npm run build` OK.
- Suggested Linear/Obsidian: note this offer page on `pierrondi-site` / AGE-1486. No new Linear issue created. Do not change live jobTitle.

## 2026-09-05 — Home motion retune (keep framer-motion, fix jank)

- Paulo rejected stripping framer-motion from `/` and `/en`. Keep movement; repair the broken parallax feel.
- Cause: GSAP ScrollTrigger `snapTo: 1/(n-1)` assumed five equal 100svh slides. The proof bridge sits between hero and projects and is not a snap target, so wheel scroll landed mid-section. Combined with `once: false` 24–40px reverse reveals and Event Horizon pointer tracking during scroll, the sphere/page fought native scroll.
- Fix: drop GSAP snap; observe sections with IntersectionObserver. Add a damped 24px `useScroll`/`useSpring` recede on the Event Horizon layer. Freeze pointer coupling while scrolling. Smaller once-only section travel. No `filter: blur` on the thesis. Particle count 5200/2600.
- Kept: framer-motion on home, gtag, nav → `/atuacao`, proof bridge, `/engajamento` links. `/sprint` unpublished.
- Suggested Linear/Obsidian: note the motion retune on `pierrondi-site` / AGE-1486. Deploy remains human-gated.

## 2026-09-07 — Weekly growth P0: GEO answer + mensurável/CTA

- Do not duplicate `#52` proof bridge/nav, `#53` `/engajamento`, `#54` motion retune.
- New PT answer brief: `/answers/o-que-e-fractional-ai-automation-officer` (FAQPage/Question/Article via shared `AnswerBrief`). No `/en/answers` pattern on this site — PT-first, linked from `/ai-search` and `/engajamento` (not home ATF).
- Sitemap + `answers.json` + `llms.txt` + `llms-full.txt` + `geo.md` list the URL. `/sprint` stays unpublished.
- About + treinamentos (PT/EN) now carry the home claim: resultado e automações mensuráveis, não horas soltas. No new numbers.
- `/en/feitos` case results were PT-only (`2 semanas`, `Governança`, clínicas). Results are now bilingual; method tag is `Governance`.
- After the `/feitos` metrics block: terminal CLI CTA to `/contato` + WhatsApp (PT/EN). Not “Book a demo”.
- Hard gates kept: no Product schema, Person `jobTitle` remains TAE, gtag `G-1CL8PFYY7T` untouched, no invented clients/metrics.
- Suggested Linear/Obsidian: note this GEO/conversion slice on `pierrondi-site` / AGE-1486. Merge and deploy remain human-gated.

## 2026-09-14 — Weekly growth P0: medir resultado de IA operacional

- Do not duplicate `#51`–`#55` (home copy, nav/proof/CTA, `/engajamento`, motion, Fractional brief + mensurável CTAs).
- New PT answer brief: `/answers/como-medir-resultado-de-ia-operacional` via shared `AnswerBrief` (Question/FAQPage/Article). Honest framework: baseline → métrica → evidência / AgentOps. No invented client numbers.
- PT-first: site still has no `/en/answers` pattern. EN `/engajamento` links to the PT measuring brief.
- Funnel (light, not home ATF): `/engajamento` + Fractional brief ↔ measuring brief; CTAs to `/engajamento`, `/feitos`, `/contato` (WhatsApp pattern). Listed on `/ai-search`.
- Sitemap + `answers.json` + `llms.txt` + `llms-full.txt` + `geo.md` list the URL. `/sprint` stays unpublished.
- Hard gates kept: no Product schema, Person `jobTitle` remains TAE, gtag `G-1CL8PFYY7T` untouched, no home/motion edits.
- Suggested Linear/Obsidian: note this measuring-answer slice on `pierrondi-site` / AGE-1486. Merge and deploy remain human-gated.

## 2026-09-16 — Weekday SEO hold: EN twins for who-is-paulo + what-is-agentops

- Live gap (verified 2026-09-16): PT `/answers/quem-e-paulo-pierrondi` and `/answers/o-que-e-agentops` 200; EN `/en/answers/who-is-paulo-pierrondi` and `/en/answers/what-is-agentops` 404; `/en/answers` hub 404.
- Added EN answer twins via shared `AnswerBrief` (Question/FAQPage/Article). Honest copy only. PT pages kept; reciprocal hreflang added.
- `/en/answers` hub lists the two EN twins. Registered in sitemap, `/ai-search`, `answers.json`, `llms.txt`, `llms-full.txt`, `geo.md`.
- Fractional/measuring briefs stay PT-only. No IndexNow, no merge, no deploy. AgenticosCore and CantuStudio untouched.
- Suggested Linear/Obsidian: note EN brand/AgentOps twins on `pierrondi-site` / AGE-1486. CoS weekday hold — no merge/deploy without Paulo.

## 2026-09-21 — Weekly growth P0: /feitos → /engajamento CTA

- Do not duplicate `#51`–`#56` (home copy, nav/proof/CTA, `/engajamento`, motion, Fractional brief, measuring brief). Do not merge or recreate PR `#57` EN twins (CoS hold).
- After the `/feitos` and `/en/feitos` public metrics block, the CLI CTA now opens `/engajamento` / `/en/engajamento` (noir/CLI tone, not “Book a demo”). WhatsApp remains the secondary CLI action. No new metrics.
- About + treinamentos (PT/EN) already carry “resultado e automações mensuráveis, não horas soltas” — no copy rewrite this slice.
- Home COLABORAR already has copper/amber fill vs ghost secondary (`#52`/`#55`). No home redesign this slice.
- `/en/feitos` case-card residue: system-map meta used PT `feito.navLabel` (`Agentes governados`). It now uses localized `activeCopy.navLabel` (`Governed agents`).
- No new public URLs. `/sprint` stays unpublished. No Product schema. No ads.
- Suggested Linear/Obsidian: note this proof→engagement CTA on `pierrondi-site` / AGE-1486. Merge and deploy remain human-gated.

## 2026-09-28 — Follow-up: /feitos closing CTA → /engajamento

- Same draft PR `#59` / `cursor/growth-p0-feitos-cta-2027`. Do not merge `#57`.
- Closing section on `/feitos` and `/en/feitos` now primaries to `/engajamento` / `/en/engajamento` (`abrir /engajamento` / `open /en/engajamento`). `/contato` and WhatsApp stay secondary CLI actions.
- No new metrics, no new URLs, `/sprint` unpublished, no Product schema.

## 2026-09-28 — Growth P2-to-P0: fractional vs consultoria vs agência vs interno

- New PT answer brief: `/answers/fractional-vs-consultoria-vs-agencia` via shared `AnswerBrief` (Question/FAQPage/Article/BreadcrumbList). Compares four formats: Fractional AI Automation Officer, consultoria tradicional, agência de automação, contratação interna. Axes: dono após o go-live, medição (baseline, métrica, handoff), formato do engajamento, riscos. Neutral; no prices, clients, logos or ROI.
- PT only. `app/en/answers` does not exist on main. PR #57 EN twins stays untouched.
- CTA to `/engajamento`. Links to the Fractional and measurement briefs, plus `/feitos` and `/contato`. Listed on `/ai-search` (the `/answers` index redirects there).
- Sitemap + `answers.json` + `llms.txt` + `llms-full.txt` + `geo.md` list the URL. `/sprint` stays unpublished. No Product schema. jobTitle stays Technical Account Executive.
- Suggested Linear/Obsidian: note this comparison brief on `pierrondi-site` / AGE-1486. Merge and deploy remain human-gated.

## 2026-10-04 — Static /og and SEO meta (draft PR #61)

- Branch `cursor/seo-static-og-900f`. Draft PR `#61`. No merge, no deploy.
- `GET /og` is `force-static`. Build route table marks `○ /og`. Production `next start :3456`: `HEAD` and `GET /og` return `200` `image/png`, 1200×630, cache `HIT`, body matches `.next/server/app/og.body`.
- Image copy: `Onde IA vira operação` / `com evidência.` Footer: `Paulo Pierrondi | ServiceNow | AgentOps`.
- `/contato` and `/en/contato` publish `og:image` `/og` with page-specific alt. One document title and one meta description on those pages.
- Apps without a catalog description use `fallbackAppDescription`, clamped to 120–160. All 30 app landings emit one valid `BreadcrumbList` (3 ListItems, absolute https item URLs).
- Legal descriptions updated on `/privacidade`, `/privacy`, `/termos`, `/terms` (137–149 chars). `public/llms.txt` gained Citation and crawl policy, last updated 2026-10-04.
- `/sprint`, prices, secrets, DNS and auth were not touched. Feitos SVG `<title>` labels (diagram names) are pre-existing and are not a second document `<title>`.
- Checks: `npm ci`, `npm run build`, `npx tsc --noEmit`, `npm test` 176/176.
- Suggested Linear/Obsidian: note the static `/og` fix and meta slice on `pierrondi-site` / AGE-1486. Merge and Railway deploy remain human-gated. Production `/og` 502 is not rechecked against Railway from this agent.

## 2026-10-04 — Same PR #61: titles, dead OG file, CSP

- Removed `public/assets/og-image.jpg` (79-byte `NOT_FOUND` text). No references. `GET /assets/og-image.jpg` is 404. Live image stays `/og`.
- Document titles that rendered above 65 characters now render at or under 60, with the layout suffix ` | pierrondi.dev` as the single brand. H1s stay. Four titles at 61–65 were left (`/blog`, `/en/blog`, two posts). `/citations` 308s to `/ai-search`; both titles are short. `/fso` 307s to `/about`; its unused document title is also short.
- Permissions-Policy is `camera=(), microphone=(), geolocation=(self)`. No `getUserMedia` / device camera / microphone in app code. Three.js `camera` is a scene camera.
- `unsafe-eval` removed from CSP. `next start :3457` plus headless Chrome on `/`, `/en`, `/studio`, `/portfolio`, `/feitos/agentes-governados`, `/blog/automacao-com-n8n-brasil`: 200, no CSP/console errors. Client chunks have no `eval(` or `new Function`.
- Draft review, not merged: #57 EN answer twins (conflict on `llms.txt`, `app/ai-search/page.tsx`, session notes; content is sound, rebase before merge). #59 `/feitos` CTA (small overlap on the feitos proof test and session notes; safe to merge after rebase). #60 fractional comparison brief (conflict on `llms.txt`, `ai-search`, `test/seo-meta-description.test.mjs`, session notes; content is sound, rebase before merge). #42 `/sprint` untouched.
- `npm test` 177/177. `npm run build` OK, `/og` still static.

## 2026-10-05 — Merge main into #57

- `origin/main` at `5f8abc8` (#61) merged into `cursor/seo-en-answer-twins-bd6a`.
- Conflict was only `.brain/SESSION_NOTES.md`. Both the 2026-09-16 EN-twin note and the 2026-10-04 #61 notes are kept.
- `public/llms.txt` auto-merged: Citation and crawl policy plus the EN answer URLs. AI Search document title stays `AI Search Portfolio — delivery evidence` (≤60 with the layout suffix).
- EN titles stay short: `Who is Paulo Pierrondi?`, `What is AgentOps?`, `English answer briefs`.
- The two EN meta descriptions were 197 and 173 characters, which the #61 160-char check rejects. They are now 153 and 149. Page body copy is unchanged.

## 2026-10-05 — Merge main into #60

- origin/main at 5f8abc8 (#61) merged into `cursor/fractional-vs-consultoria-agencia-45f2`.
- Conflict was only `.brain/SESSION_NOTES.md`. Both the 2026-09-28 comparison brief note and the 2026-10-04 #61 notes are kept.
- `public/llms.txt`, `app/ai-search/page.tsx` and `test/seo-meta-description.test.mjs` auto-merged. Citation and crawl policy stays. The comparison URL stays. AI Search document title stays `AI Search Portfolio — delivery evidence`.
- Document title `Fractional, consultoria, agência ou interno?` renders at 60 with the layout suffix. Meta description is 148 characters. `/sprint` stays unpublished.

## 2026-10-05 — Merge main into #59

- `origin/main` at `5f8abc8` (#61) merged into `cursor/growth-p0-feitos-cta-2027`.
- Conflict was only `.brain/SESSION_NOTES.md`. Both the 2026-09-21/09-28 `/feitos` CTA notes and the 2026-10-04 #61 notes are kept.
- `/feitos` document title stays `Dados, trabalhos e provas de execução`. Closing and metrics CTAs still open `/engajamento`.

## 2026-10-05 — Merge main e89a1fe into #60

- `origin/main` at `e89a1fe` (#59) merged into `cursor/fractional-vs-consultoria-agencia-45f2`.
- Conflict was only `.brain/SESSION_NOTES.md`. Kept the comparison brief, both `/feitos` CTA notes, both #61 notes, and both earlier merge notes.
- Comparison brief and `/engajamento` CTAs stay. `/sprint` stays unpublished.

## 2026-10-05 — Merge main bb8d5a4 into #57

- `origin/main` at `bb8d5a4` (#60) merged into `cursor/seo-en-answer-twins-bd6a`.
- Conflict was only `.brain/SESSION_NOTES.md`. Kept the EN-twin note, the `/feitos` CTA notes, the comparison brief, the #61 notes, and the earlier merge notes.
- `llms.txt`, sitemap, `answers.json`, `geo.md`, `llms-full.txt` and the answer tests auto-merged. EN twin URLs and the fractional comparison URL both stay. Citation and crawl policy stays.
