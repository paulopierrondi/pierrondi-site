# Project Brain Context

Generated: `2026-05-16 09:07:26`
Tool that refreshed this file: `sync`
Local Obsidian vault: `/Users/paulopierrondi/Documents/Obsidian Vault`
Repository: `/Users/paulopierrondi/Downloads/pierrondi-site`

This is a non-secret snapshot of the local Obsidian second brain for this repository. It exists so local and cloud coders can start from project memory instead of cold-starting.

## Required Agent Workflow

1. Read the repo instruction file for your agent: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or `KIMI.md`.
2. Read this file before planning work.
3. If local vault access exists, prefer the live Obsidian notes over this snapshot.
4. If running in cloud without local vault access, use this file as the project memory source.
5. Read the Paulo profile snapshot before career, executive, ServiceNow, Bradesco, FSI, deck, roadmap, positioning or personal context work.
6. For product, monetization, app ideas, revenue, pricing, growth or side-project prioritization, use the Product Revenue MOC and opportunity backlogs.
7. Select the relevant best-practice notes and checklists: app/web quality, screenshots, marketing creative/video, frontend, backend/API, web, iOS, Android, AI, release and security.
8. For iOS/App Store Connect/TestFlight/signing/IAP/APNS work, use the Apple Developer And App Store Connect Inventory and App Store Connect Upload Runbook before asking for IDs, keys, CI values, provider env vars or running an upload.
9. For roadmap, bug, release or planning work, check the Linear/Git tracking snapshot and matching Linear issue when the connector is available.
10. Never store real API keys or secrets in Markdown. Store only inventory metadata.
11. Capture reusable development lessons in the Learning Inbox or `.brain/SESSION_NOTES.md` when the vault is unavailable.
12. After meaningful work, update the live Obsidian project note or append durable context to `.brain/SESSION_NOTES.md`.

## Required Checklist Snapshot

## 04_Areas/Coding/Best Practices/Development Best Practices Hub.md

---
type: best-practices-hub
tags:
  - best-practices
  - coding
  - learning-loop
---
# Development Best Practices Hub

Este e o hub vivo de melhores praticas de desenvolvimento.

## Como usar

Antes de implementar, revisar ou desenhar arquitetura, escolha os guias relevantes:

- App/Web quality: [[04_Areas/Coding/Best Practices/App Web Quality Best Practices]]
- Web/Next/React: [[04_Areas/Coding/Best Practices/Web Next React Best Practices]]
- Frontend UI/UX: [[04_Areas/Coding/Best Practices/Frontend UI UX Best Practices]]
- Backend/API: [[04_Areas/Coding/Best Practices/Backend API Best Practices]]
- Database/Data: [[04_Areas/Coding/Best Practices/Database Data Best Practices]]
- Mobile/iOS: [[04_Areas/Coding/Best Practices/Mobile iOS Best Practices]]
- Android: [[04_Areas/Coding/Best Practices/Android App Best Practices]]
- Python/Data tools: [[04_Areas/Coding/Best Practices/Python Data Best Practices]]
- AI/LLM apps: [[04_Areas/Coding/Best Practices/AI LLM Best Practices]]
- DevOps/Railway: [[04_Areas/Coding/Best Practices/DevOps Railway Best Practices]]
- Testing/QA: [[04_Areas/Coding/Best Practices/Testing QA Best Practices]]
- Agent workflow: [[04_Areas/Coding/Best Practices/Agent Workflow Best Practices]]
- Security baseline: [[04_Areas/Coding/Checklists/Security Checklist]]
- Platform checklists: [[04_Areas/Coding/Checklists/Project Checklist Hub]]

## Como aprender automaticamente

Todo coder deve registrar aprendizados reutilizaveis em:

- [[04_Areas/Coding/Best Practices/Learning Inbox]]
- [[04_Areas/Coding/Best Practices/Patterns To Promote]]

Aprendizado reutilizavel e algo que deve guiar projetos futuros:

- erro recorrente;
- comando canonico melhor;
- convencao de plataforma;
- decisao de arquitetura que se repetiu;
- checklist que faltava;
- risco de seguranca percebido;
- padrao de deploy ou rollback;
- regra de UX/design que melhorou resultado;
- falha visual detectada por screenshot ou viewport;
- regra de store readiness para App Store ou Google Play.

## Regra para agentes

Quando uma sessao terminar, perguntar internamente:

- "Isto ensina algo reutilizavel?"
- "Algum checklist deve ganhar item novo?"
- "Alguma pratica antiga deve ser corrigida?"
- "Isso vale para uma plataforma especifica ou para todos os projetos?"

Se sim, registrar no Learning Inbox ou em `.brain/SESSION_NOTES.md` quando o vault nao estiver acessivel.

## Promocao

Itens do Learning Inbox viram melhores praticas quando:

- aconteceram em mais de um projeto;
- evitaram bug, retrabalho, custo ou risco;
- melhoraram qualidade visual, seguranca, performance ou deploy;
- foram confirmados por teste, build, deploy ou revisao.

## Links

- [[04_Areas/Coding/AI Coding Operating System]]
- [[04_Areas/Coding/Checklists/Project Checklist Hub]]
- [[04_Areas/Coding/Checklists/App Web Preflight Checklist]]
- [[04_Areas/Coding/Checklists/Screenshots Visual QA Checklist]]
- [[99_System/AI Agent Vault Policy]]
- [[99_System/Security And Secrets Policy]]


## 04_Areas/Coding/Best Practices/App Web Quality Best Practices.md

---
type: best-practices
platform: app-web-quality
tags:
  - best-practices
  - apps
  - web
  - screenshots
  - quality
---
# App Web Quality Best Practices

## Principio

Qualidade de app/web e uma combinacao de produto, design, estado, performance, acessibilidade, privacy, store readiness e evidencia visual.

## O padrao Paulo

- Construir a experiencia real primeiro.
- Evitar landing generica quando o pedido e app/ferramenta.
- Interfaces operacionais devem ser claras, densas e rapidas.
- Apps consumer podem ser mais expressivos, mas ainda precisam de fluxo obvio.
- Screenshot e teste sao evidencia, nao decoracao.
- Toda tela importante precisa lidar com loading, erro, vazio e permissao.

## Screenshots

- Screenshot bom prova um fluxo ou qualidade.
- Screenshot ruim apenas mostra uma tela bonita sem contexto.
- Guardar paths de screenshots relevantes na nota do projeto.
- Nao anexar screenshots com secrets, PII ou tokens.
- Falhas visuais recorrentes viram checklist.
- Ignorar screenshots vindos de `node_modules`, package fixtures e snapshots de dependencias quando estiver avaliando qualidade do produto.
- Classificar evidencia por finalidade: produto real, store review, marketing, deck preview, teste visual ou dependencia.
- Para store/review, separar evidencias por device, idioma e variante visual quando o formato final exigir isso.
- Para store/review, separar evidencia de phone, tablet/large screen, idioma e dark/light quando aplicavel.
- Para marketing/deck/video, validar dimensao e crop do formato final antes de aprovar.

## Store quality

- iOS exige app completo, metadados corretos, backend vivo e acesso para review.
- Android exige qualidade tecnica, privacy policy, Data safety consistente e permissoes justificadas.
- Web exige Core Web Vitals, acessibilidade e estados robustos.

## Anti-padroes

- Hero bonito que esconde que o app nao funciona.
- UI sem estado vazio/erro.
- Mobile tratado depois.
- Secrets no client.
- Store metadata prometendo recurso que nao existe.
- Screenshot sem fluxo.
- "Vou ajustar depois" em privacy, auth, pagamento ou deploy.

## Links

- [[04_Areas/Coding/Checklists/App Web Preflight Checklist]]
- [[04_Areas/Coding/Checklists/Screenshots Visual QA Checklist]]
- [[04_Areas/Coding/Best Practices/Recent App Web Screenshot Learnings]]
- [[04_Areas/Coding/Checklists/iOS App Preflight Checklist]]
- [[04_Areas/Coding/Checklists/Android App Preflight Checklist]]
- [[04_Areas/Coding/Checklists/Web App Preflight Checklist]]


## 04_Areas/Coding/Best Practices/Recent App Web Screenshot Learnings.md

---
type: learning-review
area: app-web-quality
tags:
  - screenshots
  - visual-qa
  - apps
  - web
  - learning-loop
---
# Recent App Web Screenshot Learnings

Consolidado das criacoes e artefatos recentes encontrados no workspace.

## Fontes observadas

- `pierrondi-ia/docs/marketing/campaigns/.../buildinpublic-stats-1080x1350.png`
- `ppt_engine/workspace/.../*.preview.png`
- `fashioncore/apps/ios/fastlane/screenshots/en-US/*_1284x2778.png`
- `fifa2026bolao/artifacts/review/*iphone*.png`
- `fifa2026bolao/artifacts/review/*ipad*.png`
- `servicenow-agent-army/marketing/video-*`
- `pierrondi-ia/test-results`
- `pierrondi-ia/tmp/ui-review`

## Aprendizados promovidos

- Screenshot de review/store precisa provar plataforma e tamanho, nao apenas "parece bonito".
- App Store/Google Play pedem conjuntos diferentes de evidencia: phone, tablet/large screen quando aplicavel, idioma, dark/light e ausencia de dados sensiveis.
- Imagens de marketing precisam nascer no formato de destino: feed, story, deck, landing, preview e video nao devem reaproveitar crop por acidente.
- Screenshots de UI precisam capturar estado real: loading, empty, erro, permissao, auth, pagamento, onboarding e sucesso.
- Render preview de deck/documento/site e uma forma de teste visual; se nao renderizou, nao esta pronto.
- `node_modules`, package fixtures e snapshots de dependencias nao contam como evidencia do produto.
- O vault deve registrar paths e decisao de qualidade, nao copiar imagens sensiveis nem inflar a memoria com dumps.

## Regra operacional

Quando um agente mexer em app/web visual:

- usar [[04_Areas/Coding/Checklists/Screenshots Visual QA Checklist]];
- registrar os paths de evidencia na nota do projeto;
- transformar falhas recorrentes em item de checklist;
- nao anexar screenshot com segredo, PII, token, cookie ou ambiente de producao exposto.

## Destinos

- [[04_Areas/Coding/Best Practices/App Web Quality Best Practices]]
- [[04_Areas/Coding/Checklists/App Web Preflight Checklist]]
- [[04_Areas/Coding/Checklists/Screenshots Visual QA Checklist]]


## 04_Areas/Coding/Best Practices/Android App Best Practices.md

---
type: best-practices
platform: android
tags:
  - best-practices
  - android
  - google-play
---
# Android App Best Practices

## Principios

- Android nao e apenas "iOS portado": respeitar back navigation, intents, permissions, density, large screens e lifecycle.
- Estado do usuario deve sobreviver background, rotacao e navegacao.
- Permissoes perigosas precisam ser minimizadas e pedidas no contexto certo.
- Data safety e privacy policy precisam bater com codigo e SDKs.

## UI

- Usar Material 3 quando estiver no stack.
- Touch targets e fontes precisam escalar.
- Layouts devem funcionar em phone, tablet e foldable quando relevante.
- Dark mode precisa ser intencional, nao acidental.

## Arquitetura

- Segredos nunca entram no APK/AAB.
- Offline e rede ruim precisam de estado explicito.
- Background work deve usar APIs apropriadas e respeitar bateria.
- Analytics/crash SDKs devem estar no inventario de privacy.

## Release

- Version code/name atualizados.
- App Bundle com signing correto.
- Store listing honesta.
- Test track antes de producao.
- Data safety atualizado a cada novo SDK/coleta.

## Links

- [[04_Areas/Coding/Checklists/Android App Preflight Checklist]]
- [[04_Areas/Coding/Best Practices/App Web Quality Best Practices]]


## 04_Areas/Coding/Best Practices/Agent Workflow Best Practices.md

---
type: best-practices
platform: agents
tags:
  - best-practices
  - agents
  - codex
  - claude
  - kimi
  - gemini
---
# Agent Workflow Best Practices

## Principios

- Primeiro ler memoria; depois planejar; depois editar.
- Agente nao deve pedir segredo que pode ser acessado via provider/CLI.
- Mudancas devem ser pequenas, verificaveis e registradas.
- Aprendizado reutilizavel deve voltar para o vault.
- Quando houver subagentes, manter ownership claro e nao duplicar o mesmo escopo de escrita.
- Antes de promover um padrao, diferenciar lição madura de caso puntual com dependencias de plataforma.

## Inicio

- Rodar/usar `brain-preflight`.
- Ler `.brain/PROJECT_CONTEXT.md`.
- Ler nota do projeto e AI history.
- Ler best practices e checklists relevantes.
- Confirmar comandos canonicos.

## Durante

- Preservar mudancas do usuario.
- Evitar refactor fora do escopo.
- Usar ferramentas seguras para secrets: Railway, provider env vars, 1Password/Keychain.
- Nao imprimir env completo.

## Fim

- Atualizar nota do projeto.
- Atualizar `.brain/SESSION_NOTES.md` se sem vault.
- Registrar aprendizado em [[04_Areas/Coding/Best Practices/Learning Inbox]] quando reutilizavel.
- Sugerir promocao para best practice quando padrao aparecer de novo.

## Aprendizados locais

- Adicionar aqui comportamento que melhorou entregas dos coders.


## 04_Areas/Profile/Paulo Pierrondi Profile.md

---
type: profile
owner: Paulo Pierrondi
updated: 2026-05-15
tags:
  - profile
  - operating-context
  - service-now
  - bradesco
  - agent-memory
---
# Paulo Pierrondi Profile

This is required user context for Codex/GPT, Claude Code, Kimi and Gemini.

## Executive Summary

Paulo works across enterprise tech, personal products, family and faith. He is a Technical Account Executive at ServiceNow, focused on the Banco Bradesco account in Brazil, while also building side projects and monetizable frameworks/IP. He prefers direct, structured, information-dense responses with honest analytical pushback. Brazil-facing content defaults to Portuguese.

## Response Style

- Lead with the answer.
- Use executive summary first for complex topics.
- Use bullets and tables when they improve clarity.
- Be direct, dense and copy-paste ready.
- Avoid fluff, motivational tone and vague encouragement.
- Use PT-BR for Brazil-facing material.
- Analogies and frameworks are useful when they sharpen thinking.
- Push back when assumptions are weak, but keep the tone pragmatic.
- Prefer metrics, tradeoffs, explicit risks and next actions.
- Do not end with soft filler such as "se fizer sentido".

## Professional Context

- Role: Technical Account Executive (TAE) at ServiceNow, global team.
- Primary account: Banco Bradesco, FSI Brazil.
- Works with Rodrigo Rezende (Client Director) and Joao Saes (SC).
- Coordinates with Impact and CEG/Services.
- Recurring themes:
  - Bradesco account strategy.
  - CMDB/CSDM transformation.
  - Now Assist and AI Agents.
  - Governance and operating model.
  - FSI positioning.
  - 2026 roadmap.

## Personal Context

- Carioca.
- Lived for a long period in Dublin.
- Currently based in Sao Jose dos Campos, SP.
- Married, family-oriented.
- Faith-oriented worldview.
- Entrepreneurial mindset.
- Active interest in monetizing frameworks and IP.
- US or EMEA relocation is on the radar.

## Top Of Mind

- `pptx-engine`: TypeScript/Node.js CLI for executive deck generation, multi-LLM with Claude and GPT-4, four-phase architecture.
- Claude Code as autonomous long-running agents, including 8-hour runs, across apps such as `exploratorio` and `investcoach_ai`.
- Now Assist Bradesco Operating Model is active.
- Critical open question: direct ServiceNow investment versus Bradesco-authorized budget.

## Bradesco Live Context

- CMDB program organized in four plateaus:
  1. Fundacao.
  2. Fonte Unica.
  3. Conexao Negocio.
  4. Excelencia.
- Accenture is the primary executor, around 800 hours.
- Other partners: NTT, IBM and 4MATT.
- Governance stakeholders:
  - Edson: sponsor.
  - Fabio: strategic forum.
  - Marcena: operational forum.
  - Rodolfo and Rogerio: technical CCB.
- Recurring bottleneck: COI/Sayumi after the January SPM incident.
- Terminology rules:
  - Use `SPM`, not `ITBM`.
  - Use `forum`, not `committee/comite`, unless quoting source material.
  - `Cilmara` is spelled with C.

## Tools And Frameworks

- Claude Code skills:
  - `servicenow-project-pptx`.
  - `bradesco-project-pptx`.
- MCP `servicenow-ai-demo` for `cmdb_ci` queries.
- CMDB context: 61K+ records, with gaps in ownership, serial and IP.
- Framework SADA.
- CSDM Data Quality Analyzer:
  - Python.
  - Bilingual.
  - FSO/regulatory focus.

## Now Assist Editorial Rule

Every Bradesco Now Assist material must explicitly connect:

`operating model -> adoption velocity -> revenue expansion`

## How Agents Should Use This

- Before career, executive, ServiceNow, Bradesco, FSI, Now Assist, CSDM, deck, roadmap or positioning work, read this note.
- When writing for Bradesco or Brazil stakeholders, default to PT-BR and executive density.
- When writing internal or global ServiceNow strategy, keep terminology precise and avoid over-claiming.
- When creating decks, use a consultant-style structure: thesis, evidence, options, recommendation, risks, decision needed.
- For side projects, connect product decisions to monetization, distribution, operational leverage and reusable IP.
- For personal/career questions, balance enterprise credibility, entrepreneurial upside, family constraints, faith-aligned values and relocation optionality.

## Non-Goals

- Do not invent private facts beyond this profile and the project notes.
- Do not over-personalize routine code answers.
- Do not turn faith/family into generic motivational content.
- Do not expose personal or enterprise-sensitive details outside the intended context.


## 04_Areas/Coding/Linear/Linear Git Development Tracking OS.md

# Linear Git Development Tracking OS

Status: active
Owner: Paulo
Updated: 2026-05-15

This is the operating system for keeping Git, Linear and the Obsidian second brain aligned.

## Sources Of Truth

- Code and local state: Git repositories.
- Product/development queue: Linear workspace `Agentcore`.
- Durable memory: Obsidian project notes, AI history and `.brain/PROJECT_CONTEXT.md`.
- Daily machine report: [[04_Areas/Coding/Linear/Linear Git Sync Report]] generated by `brain-linear-sync`.
- Live Linear map: [[04_Areas/Coding/Linear/Linear Project Map]].
- Cleanup queue: [[04_Areas/Coding/Linear/Linear Cleanup Backlog]].

## Required Start Gate

Before planning or coding in any project:

1. Run `brain-linear-sync` or read the latest [[04_Areas/Coding/Linear/Linear Git Sync Report]].
2. Read the matching project note from [[02_Projects/Projects Index]].
3. Read matching AI history under [[03_AI-Chats/AI Chats Index]] when relevant.
4. Read the matching Linear project/issue using the Linear connector when the task is roadmap, bug, status, scope, priority or release related.
5. Check branch, dirty files, ahead/behind state and open Linear status before editing.

## Required Finish Gate

After meaningful work:

- Update the Obsidian project note with decisions, commands, files changed, risks, deploy state and next steps.
- Update Linear only when the work actually changes issue reality.
- Keep Linear issue links in the project note when a task is driven by Linear.
- Store no secrets in Linear or Obsidian. Secret values stay in providers or secret managers.
- If the work creates reusable practice, add it to [[04_Areas/Coding/Best Practices/Learning Inbox]].

## Linear Connector Rules

- Use the Linear connector for live reads: projects, issues, labels, statuses and comments.
- Do not bulk-close, archive, delete, relabel or assign without an explicit cleanup step.
- Automation can generate cleanup proposals, not destructive changes.
- Treat old `Done` issues with missing labels/assignees as cleanup candidates, not coding blockers.
- Treat `In Progress` issues with stale Git repos as daily-priority candidates.

## Daily Sync Output

Daily sync should produce:

- Git repo health: dirty/ahead/behind/stale/unmapped.
- Linear project health: active projects, backlog overload, stale in-progress work, unlabeled/unassigned issues.
- Project note updates for active repos.
- Cleanup proposals in [[04_Areas/Coding/Linear/Linear Cleanup Backlog]].
- Learning candidates for best practices.

## Organic Prompt For Coders

Use this at the start of a new coding session:

```text
Read the Obsidian second brain preflight, run or inspect brain-linear-sync, identify the matching Linear project/issue, inspect Git state, then continue from project memory. Update the project note and Linear reality after meaningful work. Do not store secrets.
```

## Cloud / Other Machine Rule

Cloud coders and other machines will not automatically have the local vault. They must use:

- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` or `KIMI.md`.
- `.brain/PROJECT_CONTEXT.md`.
- `.brain/CLAUDE_CLOUD_CONTEXT.md` when present.
- Live Linear connector if available.

When starting a new repo or machine, run `brain-sync`, `brain-preflight --all`, and `brain-cloud-ready --all` from the Mac that owns the vault.


## 04_Areas/Coding/Linear/Linear Project Map.md

# Linear Project Map

Updated: 2026-05-15

This map links Linear projects to local repos and Obsidian project notes. It is mapping metadata only.

| Linear project | Status | Priority | Repo / path hint | Obsidian note hint | Notes |
| --- | --- | --- | --- | --- | --- |
| nowassistdemo | Planned | High | `nowassistdemo` | search Projects Index | ServiceNow AI demo control plane. Newest project in Linear. |
| Pierrondi.ia - Apple Design Redesign | Backlog | High | `pierrondi-ia` | `pierrondi-ia` | Design-system redesign track for public site and Studio. |
| fifa26bolao - Bolao Express | Backlog | No priority | `fifa2026bolao`, `bolao` | search Projects Index | iOS + Railway backend. Active issues remain in progress/todo. |
| Jarvis Butler Experience | Backlog | No priority | `pierrondi-ia` | `pierrondi-ia` | Butler/chat/voice/dashboard experience inside Marketing OS. |
| ServiceNow Agent Army | In Progress | Urgent | `servicenow-agent-army` | search Projects Index | Community ServiceNow agent product. |
| Pierrondi Marketing OS | In Progress | Urgent | `pierrondi-ia` | `pierrondi-ia` | Core marketing platform and Studio. |
| PPT_Formation | Backlog | High | `ppt_engine`, `ppt` | search Projects Index | Agentic PPTX engine. |
| Fashion Stylist AI | Completed | High | `fashion` | search Projects Index | Completed in Linear, still useful as app pattern source. |
| Faith | Backlog | Urgent | `faith`, `faithschool` | search Projects Index | Homeschool app roadmap and UX track. |
| Design System Consistency | Backlog | High | `csdm-validator` | search Projects Index | CSDM visual consistency project. |
| Privacy & Cookie Compliance | Planned | No priority | `pierrondi-ia`, `agentcore`, `csdm-validator` | search Projects Index | Cross-product compliance queue. |
| Brain Coach - Context-Aware Copilot & AI Architect Workflows | Planned | No priority | `brain`, `servicenow`, `csdm` | search Projects Index | ServiceNow architect/copilot workflows. |
| Investcoach_ai | Backlog | No priority | `investcoach` | search Projects Index | Project exists but needs repo mapping confirmation. |
| Agentcore Website | Backlog | Urgent | `agentcore`, `pierrondi-ia` | `pierrondi-ia` | Institutional/landing website; may overlap with Marketing OS repo. |
| Cantus.ai Harmonizer | In Progress | High | `cantus`, `cantu`, `CantuStudio` | search Projects Index | Harmonizer + iOS review history. |
| csdm_validator | In Progress | Urgent | `csdm-validator`, `csdm_validator` | search Projects Index | ServiceNow CSDM validator web/iOS track. |

## Mapping Maintenance

- If `brain-linear-sync` says `Needs Linear project mapping`, add the repo hint here.
- If a Linear project is archived/completed, keep it here while the project note still has reusable context.
- Use exact Linear project names when creating issues.
- Prefer linking one Linear issue to one repo task. For broad product tracks, link the epic plus the concrete child issue.

## Mapping Candidates From Git Sync - 2026-05-15

These are proposals only. Confirm against live Linear before editing project metadata.

| Repo | Path hint | Candidate mapping / decision needed |
| --- | --- | --- |
| `servicenow-superapp` | `/Users/paulopierrondi/Downloads/servicenow-superapp` | Decide whether this belongs under ServiceNow Agent Army, Brain Coach, or a separate ServiceNow SuperApp project. |
| `specialapp` | `/Users/paulopierrondi/Downloads/specialapp` | Needs product/project identity before Linear mapping. |
| `adivinha-app` | `/Users/paulopierrondi/Downloads/adivinha-app` | Likely app-store product track; create or map to an Adivinha/Brazil game project. |
| `aura-affirmations` | `/Users/paulopierrondi/Downloads/aura-affirmations` | Likely wellness/affirmations app track; confirm if it should sit under a monetizable app portfolio project. |
| `mytone-app` / `mytone-ringtone` | `/Users/paulopierrondi/Downloads/mytone-*` | Likely one MyTone project with app plus ringtone repo split. |
| `parabens-ai-br` | `/Users/paulopierrondi/Downloads/parabens-ai-br` | Likely birthday/AI music app track; create/map before more release work. |
| `exploratorio` | `/Users/paulopierrondi/Downloads/exploratorio` | Existing top-of-mind project; create/map explicit Linear project if absent. |
| `csdm3d` / `csdm3d-public` | `/Users/paulopierrondi/Downloads/csdm3d*` | Likely related to CSDM validator/design-system ecosystem; confirm public/private split. |
| `SADA` | `/Users/paulopierrondi/Downloads/SADA` | Needs project identity and remote-behind review before mapping. |
| `calmaria-sounds` | `/Users/paulopierrondi/Downloads/calmaria-sounds` | Likely wellness/audio app track; confirm portfolio grouping. |
| `bandle-br` / `adivinha-music-quiz` | `/Users/paulopierrondi/Downloads/bandle-br`, `/Users/paulopierrondi/Downloads/adivinha-music-quiz` | Decide whether these merge with Adivinha or separate music quiz project. |
| `New project 2/3/4` | `/Users/paulopierrondi/Documents/New project *` | Rename or archive proposal
...[truncated]

## 04_Areas/Coding/Linear/Linear Daily Sync Checklist.md

# Linear Daily Sync Checklist

Use this in daily automation and when manually deciding what to build next.

## Read

- [ ] Run `brain-linear-sync`.
- [ ] Open [[04_Areas/Coding/Linear/Linear Git Sync Report]].
- [ ] Read live Linear projects for `Agentcore`.
- [ ] Read live Linear issues in `In Progress`, `Todo`, `Backlog`, and assigned to `me`.
- [ ] Read labels and statuses before proposing cleanup.
- [ ] Read active repo project notes in [[02_Projects/Projects Index]].

## Git Triage

- [ ] Identify dirty repos.
- [ ] Identify repos ahead of upstream.
- [ ] Identify repos behind upstream.
- [ ] Identify stale branches with Linear issues still open.
- [ ] Identify repos without Linear mapping.

## Linear Triage

- [ ] Active work should have a project, priority, status and enough labels to filter later.
- [ ] `In Progress` work should map to a repo and next action.
- [ ] `Todo` should be immediately actionable.
- [ ] `Backlog` should not become a dumping ground without priority/context.
- [ ] Completed issues with missing labels or missing assignee are cleanup candidates, not emergencies.

## Update

- [ ] Update [[04_Areas/Coding/Linear/Linear Cleanup Backlog]] with proposed changes only.
- [ ] Update project notes with active Linear links and Git state.
- [ ] Add reusable process improvements to [[04_Areas/Coding/Best Practices/Learning Inbox]].
- [ ] Do not archive/delete/bulk-edit Linear automatically.

## Daily Decision Rule

Pick work in this order:

1. Dirty repo with active Linear issue and deployment/release risk.
2. `In Progress` issue with stale Git state.
3. `Todo` urgent/high issue with clear acceptance criteria.
4. Backlog cleanup only after active delivery risk is controlled.


## 04_Areas/Coding/Linear/Linear Cleanup Backlog.md

# Linear Cleanup Backlog

Updated: 2026-05-15

This note is for cleanup proposals. Do not treat it as permission to bulk-edit Linear.

## Current Observations

- Workspace is centered on the `Agentcore` team with statuses: `Backlog`, `Todo`, `In Progress`, `Done`, `Duplicate`, `Canceled`.
- Labels exist for product areas such as `ai`, `security`, `infra`, `website`, `marketing`, `automation`, `integration`, `ci-cd`, `Feature`, `Bug`, `Improvement`.
- Several recent Apple redesign issues are `Done` but unassigned and unlabeled.
- `fifa26bolao - Bolao Express` has the clearest active issue cluster right now.
- Backlog is broad across nowassistdemo, Pierrondi Marketing OS, Faith, Cantus.ai and PPT_Formation.
- Linear tracking issue created: [AGE-1469](https://linear.app/agentcore/issue/AGE-1469/second-brain-mapear-repos-sem-linear-e-limpar-backloglabels-com).

## Daily Alignment Run - 2026-05-15 13:17 -03

- `brain-linear-sync` completed and refreshed [[04_Areas/Coding/Linear/Linear Git Sync Report]] at `2026-05-15 13:17:00`.
- Live Linear connector inspection was attempted but blocked by MCP startup failure while connecting to ChatGPT apps; no Linear issues, labels, projects or statuses were changed.
- Current local Git report shows `30` repos scanned, `30` with local changes, `10` ahead of upstream, `2` behind upstream and `17` still needing Linear project mapping.
- Highest cleanup priority remains repo mapping plus dirty-workset review before starting new backlog work.

## Non-Destructive Cleanup Proposals - 2026-05-15

- Confirm Linear project mappings for unmapped active repos: `servicenow-superapp`, `specialapp`, `adivinha-app`, `aura-affirmations`, `mytone-app`, `SADA`, `parabens-ai-br`, `exploratorio`, `csdm3d-public`, `csdm3d`, `calmaria-sounds`, `bandle-br`, `adivinha-music-quiz`, `mytone-ringtone`, `New project 2`, `New project 3`, `New project 4`.
- Review dirty repos with large change counts before opening new implementation tasks: `faithschool-web`, `parabens-ai-br`, `fashioncore`, `calmaria-sounds`, `exploratorio`, `investcoach_ai`.
- For repos ahead of upstream, decide per repo whether to push, open PR, or leave local-only; automation should not push or merge.
- For repos behind upstream (`SADA`, `parabens-ai-br`), inspect remote delta before additional local edits.
- Once Linear connector access is healthy, re-run Agentcore review for In Progress, Todo, Backlog, recently updated and assigned-to-me issues, then update this backlog with live issue evidence.

## Active / Open Snapshot

| Issue | Status | Project | Priority | Cleanup note |
| --- | --- | --- | --- | --- |
| AGE-1421 EPIC 1 - Backend Core | In Progress | fifa26bolao - Bolao Express | Urgent | Keep active; maps to backend/Railway work. |
| AGE-1422 EPIC 2 - iOS Core | In Progress | fifa26bolao - Bolao Express | Urgent | Keep active; maps to iOS work. |
| AGE-1423 EPIC 3 - Monetization | In Progress | fifa26bolao - Bolao Express | High | Needs StoreKit/App Store follow-through. |
| AGE-1424 EPIC 4 - Share & Growth | In Progress | fifa26bolao - Bolao Express | High | Needs push/Universal Links follow-through. |
| AGE-1425 EPIC 5 - Deploy | Todo | fifa26bolao - Bolao Express | Urgent | Candidate for next concrete delivery task. |
| AGE-1426 Importar fixtures reais da Copa | Todo | fifa26bolao - Bolao Express | Medium | Depends on official fixtures availability. |
| AGE-1428 Cadastrar IAPs no App Store Connect | Todo | fifa26bolao - Bolao Express | High | Manual App Store work. |
| AGE-1469 Second Brain: mapear repos sem Linear e limpar backlog/labels | Todo | Agentcore team | Medium | Tracks this cleanup safely; no destructive bulk edits. |
| AGE-1464 Epic 1 - Demo Builder operavel end-to-end | Backlog | nowassistdemo | High | Needs repo mapping and next concrete issue. |
| AGE-1465 Epic 2 - Execucao assistida real com guardrails | Backlog | nowassistdemo | High | Security-sensitive; keep guardrails explicit. |
| AGE-1466 Epic 3 - Evidencia, rollback e historico persistente | Backlog | nowassistdemo | High | Storage/audit work. |
| AGE-1467 Epic 4 - ServiceNow readiness real por cenario | Backlog | nowassistdemo | Medium | Needs ServiceNow readiness criteria. |
| AGE-1468 Epic 5 - Artefatos de demo vinculados ao run | Backlog | nowassistdemo | Medium | Artifact pipeline work. |
| AGE-1460 Rebuild all secondary public pages | Backlog | Pierrondi Marketing OS | Medium | May already be partly stale after Apple redesign completion. |
| AGE-1461 New /studio dark shell layout | Backlog | Pierrondi Marketing OS | High | Verify against actual repo before work. |
| AGE-1462 Reskin Jarvis Cockpit | Backlog | Pierrondi Marketing OS | High | Verify against actual repo before work. |

## Proposed Cleanup Rules

- Add labels to new Linear issues at creation: platform, type, area and risk.
- Use labels like `web`, `ios`, `android`, `backend`, `infra`, `security`, `ai`, `marketing`, `UI/UX`, `Bug`, `Feature`, `Improvement`.
- Completed issues without
...[truncated]

## 04_Areas/Coding/Linear/Linear Git Sync Report.md

# Linear Git Sync Report

Generated: `2026-05-16 09:06:30`

This report is safe to keep in Obsidian. It stores Git metadata and Linear mapping hints only, never API keys, env values, cookies or deploy secrets.

## Summary

- Local Git repositories scanned: `31`
- Repositories with local changes: `31`
- Repositories ahead of upstream: `8`
- Repositories behind upstream: `2`
- Repositories needing Linear project mapping: `18`

## Highest Risk Working Sets

| Repo | Branch | Dirty | Ahead/Behind | Last commit | Linear project hint | Dirty sample |
| --- | --- | --- | --- | --- | --- | --- |
| servicenow-superapp | main | 6 | +41/-0 | 28db44d 2026-05-14 docs: update CHANGELOG with PaymentsRepository and MoneyFormatter tests | Needs Linear project mapping | M AGENTS.md; ?? .brain/; ?? .github/workflows/claude.yml; ?? CLAUDE.md; ?? GEMINI.md; ?? KIMI.md |
| faithschool-web | main | 206 | +11/-0 | f6dcaf8 2026-04-17 feat(curriculum): close iOS/web parity + wire BNCC into AI generation | Faith | M .gitignore;  M AGENTS.md;  M CLAUDE.md;  M README.md;  M docs/data-models.md;  M docs/superpowers/plans/2026-03-28-ai-curriculum-planner.md |
| aura-affirmations | main | 38 | +11/-0 | 8d349c3 2026-05-15 docs: session notes — App Store Connect blocked, awaiting user action | Needs Linear project mapping | M .brain/CLAUDE_CLOUD_CONTEXT.md;  M .brain/PROJECT_CONTEXT.md;  M .github/workflows/claude.yml;  M AGENTS.md;  M CLAUDE.md;  M GEMINI.md |
| ppt_engine | main | 7 | +10/-0 | cda1137 2026-05-10 feat(spec-to-png): real Manus style — icons + topology + servicenow brand | PPT_Formation | M AGENTS.md;  M CLAUDE.md; ?? .brain/; ?? .env.local.bak; ?? .github/; ?? GEMINI.md |
| specialapp | main | 20 | +7/-0 | 0a17c63 2026-05-14 feat: build 15 — CRUD tasks/contacts, AI Assistant, market research | Needs Linear project mapping | M README.md;  M docs/app-store-submission.md;  M ios/AppStore/Metadata/app-store-connect.md;  M ios/AppStore/README.md;  M ios/AppStore/generate_assets.py;  M ios/AppStore/submission-checklist.md |
| investcoach_ai | main | 37 | +6/-0 | b0f2329 2026-05-13 chore: add ITSAppUsesNonExemptEncryption=NO + bump build to 11 | Investcoach_ai | M .env.example;  M AGENTS.MD;  M CLAUDE.md;  M InvestCoachSwiftUI/appstore-assets/APP_STORE_CONNECT_READY.md;  D InvestCoachSwiftUI/appstore-assets/iphone-6-5/01-chat-coach.png;  D InvestCoachSwiftUI/appstore-assets/iphone-6-5/02-onboarding-rapido.png |
| mytone-app | main | 21 | +3/-0 | b81eca7 2026-05-15 fix(fastlane): fail-fast ASC app check + create_asc_app lane | Needs Linear project mapping | M .github/workflows/claude.yml;  M AGENTS.md;  M CLAUDE.md;  M GEMINI.md;  M KIMI.md;  M ios/MyTone.xcodeproj/project.pbxproj |
| SADA | main | 7 | +1/-1 | 358efd1 2026-05-07 Refactor duplicated app patterns | Needs Linear project mapping | M CLAUDE.md; ?? .brain/; ?? .github/; ?? AGENTS.md; ?? GEMINI.md; ?? KIMI.md |
| pierrondi-ia | main | 3 | +0/-1 | dc082e1 2026-05-15 chore(cleanup): semana-1 corte — remove infra/, docs/, jarvis-code, jarvis-visual-workspace e rotas mortas | Pierrondi Marketing OS / Pierrondi.ia Apple Design Redesign / Agentcore Website | M .brain/PROJECT_CONTEXT.md; ?? scripts/muse-br-scripts.json; ?? scripts/render-muse-br-video.ts |
| csdm-validator | main | 9 | +0/-0 | fdf40c6 2026-05-13 feat(coach): Snovai-inspired features — Snap Context, zero retention badge, persistent memory | csdm_validator / Design System Consistency | M .claude/settings.json;  M AGENTS.md;  M CLAUDE.md; ?? .agents/skills/ui-ux-pro-max/; ?? .brain/; ?? .claude/worktrees/ |
| exploratorio | main | 30 | +0/-0 | f63e01b 2026-05-11 chore: bump ios build for resubmission | Needs Linear project mapping | M AGENTS.md;  M CLAUDE.md;  M backend/database.py;  M backend/routers/admin_metrics.py;  M backend/routers/mobile.py;  M frontend/src/components/PaymentPage.jsx |
| fashioncore | codex/mobile-ai-gateway-merge | 45 | +0/-0 | b6f0e38 2026-05-12 Make Muse Edit iOS surfaces interactive | Fashion Stylist AI | M apps/ios/FashionStylistAI.xcodeproj/project.pbxproj;  M apps/ios/Sources/App/AppModel.swift;  M apps/ios/Sources/App/FashionStylistAIApp.swift;  M apps/ios/Sources/App/Info.plist;  M apps/ios/Sources/App/RootTabView.swift;  M apps/ios/Sources/Core/Assets/RemoteImage.swift |
| bandle-br | main | 15 | +0/-0 | a8ed129 2026-05-15 docs: update SESSION_NOTES with troubleshooting attempts and conclusions | Needs Linear project mapping | ?? .brain/CLAUDE_CLOUD_CONTEXT.md; ?? .brain/CLAUDE_PROMPTS.md; ?? .brain/PROJECT_CONTEXT.md; ?? .brain/README.md; ?? .github/; ?? AGENTS.md |
| parabens-ai-br | main | 4 | +0/-0 | a8921ea 2026-05-15 merge: integrate App Store submission work | Needs Linear project mapping | M .brain/PROJECT_CONTEXT.md; ?? .claire/; ?? .claude/; ?? parabens.zip |
| csdm3d-public | main | 6 | +0/-0 | a4d1eb1 2026-04-25 feat: upgrade CSDM3D universe visuals | Needs Linear project mapping | ?? .brain/; ?? .github/; ?? AGENTS.md; ?? CLAUDE.md; ?? GEMINI.md; ?? KIMI.md |

## Linea
...[truncated]

## 04_Areas/Product/Product Revenue MOC.md

---
type: moc
area: product-revenue
tags:
  - product
  - revenue
  - automation
  - second-brain
---
# Product Revenue MOC

Centro de operacao para transformar o second brain em ideias de apps, melhorias de produtos existentes, marketing melhor e backlog executavel.

## Core Notes

- [[04_Areas/Product/Nightly Opportunity Engine]]
- [[04_Areas/Product/Nightly Opportunity Report]]
- [[04_Areas/Product/App Ideas Revenue Backlog]]
- [[04_Areas/Product/App Refinement Backlog]]
- [[04_Areas/Product/Repo Data Improvement Backlog]]
- [[04_Areas/Marketing/Marketing Growth Backlog]]

## Inputs

- Perfil e contexto: [[04_Areas/Profile/Paulo Pierrondi Profile]]
- Projetos locais: [[02_Projects/Projects Index]]
- Historico de agentes: [[03_AI-Chats/AI Chats Index]]
- Git/Linear: [[04_Areas/Coding/Linear/Linear Git Development Tracking OS]]
- Marketing: [[04_Areas/Marketing/Marketing MOC]]
- Best practices: [[04_Areas/Coding/Best Practices/Development Best Practices Hub]]
- Checklists: [[04_Areas/Coding/Checklists/Project Checklist Hub]]
- Vault intelligence: [[04_Areas/Second Brain/Second Brain Intelligence Loop]]

## Output esperado

Toda madrugada, a automacao deve produzir ou atualizar:

- ideias de apps com tese de dinheiro, canal, MVP e score;
- melhorias nos apps atuais por impacto/tempo/risco;
- melhorias de marketing com criativo, canal, CTA e prova;
- melhorias em repos e dados, sem fazer mudanca destrutiva;
- uma lista curta de apostas para Paulo revisar no dia seguinte.

## Regra de seguranca

A automacao pode escrever notas e propostas no vault. Ela nao pode deployar, publicar, enviar mensagens, gastar dinheiro, alterar secrets, deletar arquivos, fazer push/merge, fechar Linear em massa ou mexer em producao sem pedido explicito.


## 04_Areas/Product/Nightly Opportunity Engine.md

---
type: operating-system
area: product-revenue
status: active
tags:
  - product
  - revenue
  - automation
  - nightly
---
# Nightly Opportunity Engine

Status: active
Owner: Paulo
Updated: 2026-05-15

## Purpose

Usar o Obsidian second brain como motor noturno de oportunidades: descobrir ideias de apps para fazer dinheiro, refinar apps existentes, melhorar marketing, melhorar repos e transformar aprendizados em backlog executavel.

## Nightly Flow

1. Atualizar telemetria local com `brain-intelligence-pulse`.
2. Atualizar estado Git/Linear com `brain-linear-sync`.
3. Ler os hubs principais: Profile, Projects, AI Chats, Coding, Marketing, Linear, Security e Product Revenue MOC.
4. Revisar notas de projeto, AI histories, learning inbox, screenshots/visual QA, creative workflows e reports recentes.
5. Pesquisar fontes publicas atuais quando disponivel: mercado de apps, indie hackers, app store patterns, SEO/social/video trends, AI products, Obsidian/agent workflows e repos publicos relevantes.
6. Gerar outputs curtos e priorizados nos backlogs certos.
7. Registrar somente propostas e notas. Nenhuma acao destrutiva ou externa.

## Scoring

Cada oportunidade deve receber score simples de 1 a 5:

| Score | Pergunta |
|---|---|
| Fit Paulo | Aproveita ServiceNow/FSI, produtos pessoais, familia/fe, marketing ou IP existente? |
| Velocidade | Da para validar em ate 7 dias? |
| Receita | Tem caminho claro para assinatura, servico, lead, template, curso, API ou B2B? |
| Distribuicao | Existe canal real: LinkedIn, YouTube Shorts, TikTok, Instagram, SEO, comunidades, Bradesco/ServiceNow network ou App Store? |
| Reuso | Reaproveita repos, workflows, assets, dados ou automacoes existentes? |
| Risco | Evita dependencia fragil, policy risk, secrets, compliance ou custo alto? |

## Output Notes

- [[04_Areas/Product/Nightly Opportunity Report]]
- [[04_Areas/Product/App Ideas Revenue Backlog]]
- [[04_Areas/Product/App Refinement Backlog]]
- [[04_Areas/Product/Repo Data Improvement Backlog]]
- [[04_Areas/Marketing/Marketing Growth Backlog]]
- [[04_Areas/Second Brain/Second Brain Improvement Inbox]]

## Decision Rules

- Ideia boa sem canal vira pesquisa, nao prioridade.
- App existente com caminho de receita vence app novo, salvo quando a ideia nova tiver MVP muito barato.
- Produto B2B com IP de Paulo recebe peso maior que app generico.
- Melhorias de marketing devem sempre produzir pacote: hook, roteiro, prova visual, CTA, canal e metrica.
- Melhorias de repo/dados devem virar PR-sized tasks, nao reescrita ampla.
- Qualquer coisa que exija segredo real, compra, deploy, publicacao ou contato externo vira proposta para Paulo, nao execucao automatica.

## Daily Prompt Contract

```text
Read Paulo's Obsidian vault as a product/revenue intelligence system. Generate a nightly opportunity report with app ideas, app refinements, marketing moves, repo/data improvements and second-brain improvements. Prioritize by revenue path, speed to validate, distribution, reuse of existing assets and risk. Update only vault notes/backlogs. Do not deploy, publish, send messages, spend money, alter secrets, push/merge code, delete files or make destructive Linear/Git changes.
```


## 04_Areas/Product/Nightly Opportunity Report.md

---
type: nightly-report
area: product-revenue
status: active
tags:
  - product
  - revenue
  - automation
  - report
---
# Nightly Opportunity Report

Last configured: 2026-05-16

This note is the executive output of the nightly opportunity engine.

## Latest Executive Summary

- Automation configured to run every madrugada and update product/revenue backlogs.
- Current focus: monetize existing apps and IP before adding new builds.
- Strongest reusable assets: ServiceNow/CSDM expertise, `ppt_engine`, pierrondi.ia marketing studio, iOS app pipeline, Railway deploy patterns, AI-agent workflows and creative/video pipeline.
- Guardrail: the automation writes proposals, not production changes.

## 2026-05-16 (03:50 GMT-3)

### Executive Summary

- Three apps now sit in App Store review (Adivinha, Aura Affirmations, FaithSchool build 15) and one paid campaign (InvestCoach.AI TikTok, 30 BRL/day) is awaiting platform review. The next 24-72h is a measurement window, not a build window — anything that does not feed install/IAP/event evidence is lower priority tonight.
- The biggest measurement gap is Apple Ads / ASA: 4 apps are live with no ASA CSV data connected. Without impressions/taps/installs/CR/CPA/spend, no paid-spend decision can be defended. This is now the top repo/data improvement, ahead of Linear mapping.
- The biggest store gap is `APPLE_SHARED_SECRET` for Adivinha. Until it lands in the backend secret manager (not Markdown), RevenueCat cannot validate server-side IAP. This is the one item that should clear the day an Apple approval lands.
- MyTone is still blocked on a manual App Store Connect app record. The fastlane fail-fast lane is already in place; nothing else should move on MyTone until the ASC record exists.
- `pierrondi.ia` split landed: `pierrondi-site` is live at `www.pierrondi.dev` (apex 301 forwarding), and `pierrondi-os` becomes the internal marketing/automation surface. Treat them as two products with different monetization paths going forward — site = lead capture/agency proof, os = internal automation/IP.
- A `PGPASSWORD` plaintext exposure pattern surfaced in the Muse Edit render flow via `railway variables` output. Treat any agent that runs `railway variables` (no flag) as a leaky operation; require `--json` + targeted key extraction or the `brain-railway-run -- <cmd>` wrapper, and never store the output in Markdown. Add to repo readiness checks. Sources: [Railway CLI reference](https://docs.railway.app/reference/cli-api), [GitHub push protection](https://docs.github.com/code-security/secret-scanning/protecting-pushes-with-secret-scanning).
- Firecrawl credits are still exhausted, so web research stays on official direct sources only. App Store/StoreKit/Apple Ads docs, Railway docs and platform-help pages remain reachable; treat anything requiring scraping as blocked until credits are restored or the user funds a top-up.
- Highest-leverage B2B/IP move remains the ServiceNow FSI Operating Model Kit. Today's signal: the agent-alignment audit shows 5/6 skill files aligned and openclaw was fixed — the foundation is stable enough to produce one anonymized 12-slide sample this week without further plumbing.

### Top 5 App Ideas

| Rank | Idea | Why now | Revenue path | MVP in 7 days | Next action |
|---:|---|---|---|---|---|
| 1 | ServiceNow FSI Operating Model Kit | Agent skill alignment is now green; LinkedIn must stay ServiceNow-only; Paulo has live Bradesco/Now Assist/CSDM context | advisory package, template pack, workshop, deck generator | 12-slide anonymized sample + one-page offer (operating model → adoption velocity → revenue expansion) | Draft the 12-slide sample structure (no client data) and reserve `ppt_engine` for the render pass |
| 2 | App Store + Apple Ads Launch Copilot | Four live Apple Ads apps with no CSV connected + multiple submissions in flight = real raw material for a public checklist that doubles as a lead magnet | checklist product, GitHub repo, consulting | one public Markdown checklist + one redacted ASA daily-tuning example | Convert current `App Marketing Daily Tuning Report` shape into a public template (strip account-specific values) |
| 3 | CSDM Data Quality Analyzer SaaS | `csdm-validator` already exists across three working trees, can be a lead-gen audit instead of generic tool | B2B audit, SaaS, partner services | one anonymized sample report + landing section | Produce a fake-data audit report with the existing validator and link from `pierrondi-site` |
| 4 | AI Presentation Factory for Executives | `ppt_engine` is +10 ahead and stable; Manus-style render works; reusable for sellers/consultants | templates, CLI/API, services | one repeatable executive-deck flow + 90s walkthrough | Pick one non-client deck flow and publish a recorded before/after |
| 5 | Short-Form Creative Sprint OS | `pierrondi-site` now has a public surface to host proof; site-only proof avoids LinkedIn non-ServiceNow rule | productized creative sprint | one published case study usi
...[truncated]

## 04_Areas/Product/App Ideas Revenue Backlog.md

---
type: backlog
area: product-revenue
tags:
  - app-ideas
  - revenue
  - backlog
---
# App Ideas Revenue Backlog

Backlog de ideias de apps/produtos criadas a partir do second brain. A automacao noturna deve adicionar ideias aqui com score e proximo experimento.

## Score Legend

1 = fraco, 3 = plausivel, 5 = forte.

| Idea | Source assets | User/buyer | Revenue path | Distribution | Fit | Speed | Revenue | Distribution score | Reuse | Risk | Next experiment | Status |
|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|---|
| ServiceNow FSI Operating Model Kit | Bradesco/Now Assist/CSDM context, deck workflows, `ppt_engine` | TAE/SC/FSI leaders, partners | consulting package, templates, workshop, deck generator | LinkedIn + ServiceNow network | 5 | 3 | 5 | 4 | 5 | 3 | Build one anonymized sample package and landing page section | candidate |
| CSDM Data Quality Analyzer SaaS | `csdm-validator`, CSDM scripts, ServiceNow expertise | ServiceNow platform owners, partners | B2B subscription, audit report, services lead-gen | LinkedIn, partner network, SEO | 5 | 3 | 5 | 4 | 5 | 3 | Create public demo report with fake/sample data | candidate |
| AI Presentation Factory for Executives | `ppt_engine`, deck skills, Bradesco executive workflows | enterprise sellers, consultants, founders | SaaS/CLI, premium templates, services | LinkedIn, YouTube demos, Gumroad-style templates | 5 | 4 | 4 | 4 | 5 | 3 | Turn one internal flow into public demo video | candidate |
| Family Homeschool Copilot | `faithschool-web`, family/faith context | homeschool families | subscription | SEO, parent communities, short video | 4 | 3 | 4 | 3 | 4 | 3 | Define one daily planner workflow and pricing page | candidate |
| Short-Form Creative OS for Founders | pierrondi.ia studio, ElevenLabs/subtitle workflow | founders/consultants | service + productized package | LinkedIn, Shorts, TikTok, Instagram | 4 | 4 | 4 | 5 | 5 | 2 | Publish 3 sample creator packages for pierrondi.dev | candidate |
| App Store + Apple Ads Launch Copilot | iOS history, App Store checklist, TestFlight learnings, 4 live Apple Ads apps with no CSV connected | indie app builders | checklist product, consulting, automation | SEO, GitHub, App Store communities | 4 | 4 | 3 | 3 | 5 | 3 | Convert current `App Marketing Daily Tuning Report` shape into a public template (strip account-specific values); pair with iOS preflight checklist | candidate |
| Music/Ringtone Micro-App Bundle | `mytone-app`, `mytone-ringtone`, music quiz repos | consumers, musicians | freemium + IAP/subscription | App Store, TikTok demos | 3 | 4 | 3 | 4 | 4 | 3 | Validate one viral short format with app demo | candidate |
| Faith + Affirmation Audio App | `aura-affirmations`, ElevenLabs workflow | wellness/faith users | subscription/IAP | App Store + short video | 3 | 4 | 3 | 4 | 4 | 3 | Finish TestFlight/IAP path and create 5 sample audios | candidate |
| App Store Product Page Experiment Kit | App Store launch history, screenshots, creative pipeline, App Store docs | indie iOS builders and Paulo's own app portfolio | checklist/template + consulting + internal launch OS | SEO, GitHub, App Store communities | 4 | 5 | 3 | 3 | 5 | 4 | Turn PPO/CPP/App Analytics workflow into one public checklist and one internal launch table | research |
| AI Agent Memory Hygiene Kit | Obsidian vault, AGENTS/CLAUDE/GEMINI/KIMI patterns, `brain-*` scripts | builders using coding agents | template pack, setup service, content lead magnet | GitHub, blog, YouTube Shorts | 4 | 4 | 3 | 3 | 5 | 4 | Publish a small before/after of concise memory + linked detail; keep private facts out | research |
| Apple Ads / ASA Evidence-First Tuning Kit | `App Marketing Intelligence OS`, `App Marketing Daily Tuning Report`, 4 live ASA apps as testbed | indie iOS builders running paid spend | template pack + private OS service + consulting | GitHub, SEO, ASA community | 4 | 4 | 3 | 3 | 5 | 4 | Pull one redacted ASA daily-tuning example and a "no CSV, no budget change" gate rule into a public template | candidate |
| Provider Secret Leakage Guardrail Pack | `Security And Secrets Policy`, `Railway Secrets Inventory`, `brain-railway-run` wrapper | builders shipping Railway/Vercel/Heroku apps with agents | template pack + setup service | GitHub, blog, agent-builder communities | 4 | 4 | 2 | 2 | 5 | 4 | Document the `railway variables --json` + targeted-key pattern as a reusable agent guardrail (no real secrets in the repo) | research |

## Intake Rules

- Every new idea needs buyer, revenue path, distribution channel and 7-day MVP.
- Ideas without distribution stay in research.
- Prefer products that reuse existing repos, knowledge, automations, marketing assets or ServiceNow/FSI IP.


## 04_Areas/Product/App Refinement Backlog.md

---
type: backlog
area: product-refinement
tags:
  - apps
  - product
  - backlog
---
# App Refinement Backlog

Backlog de melhorias nos apps/produtos existentes. A automacao noturna deve priorizar itens por impacto comercial, esforco, risco e proximidade de release.

| Project | Current thesis | Highest-value refinement | Revenue/impact path | Effort | Risk | Next action | Status |
|---|---|---|---|---|---|---|---|
| pierrondi-ia | Agency/site + marketing OS | Make creative/video workflow visible as productized service | leads + service packages | M | M | Add proof-led landing section and 3 sample creative packages | candidate |
| ppt_engine | Executive deck generation CLI/product | Productize one repeatable executive deck flow | template/API/SaaS/services | M | M | Create public demo deck and pricing hypothesis | candidate |
| aura-affirmations | TTS affirmation app, 3 IAPs ready | Submitted for review 2026-05-15; prep 5 audio-led Reels/TikTok variants + 1 CPP hypothesis for post-approval | subscription | S | M | On approval: ship audio creative set (PT-BR + EN) + first CPP hypothesis (mood-led vs sleep-led) | submitted-review |
| mytone-app | Music/audio app with Railway backend | Make MyTone the first US TikTok/Meta acquisition candidate with IAP, tracking events and demo creatives | IAP/subscription | M | M | Manual ASC app record required before rerunning fastlane submit; then generate 10 TikTok creative scripts | blocked-human |
| adivinha-app | Music quiz, submitted for review 2026-05-15 | On approval: install `APPLE_SHARED_SECRET` in backend secret manager + finish RevenueCat product/entitlement wiring | subscription/IAP | S | M | On approval: set shared secret in provider env (never Markdown), configure RevenueCat app/products/entitlement, redeploy backend, sandbox smoke test | submitted-review |
| faithschool-web | Family homeschool copilot; strongest current US Apple Ads learning candidate | Sharpen weekly planner -> daily copilot flow and prove first-session activation | subscription | M | M | Audit US App Store page and onboarding; define `plan_created` / `lesson_generated`; export ASA install/CR/CPA before budget changes | candidate-first |
| fashioncore | Closet-smart styling companion; Muse Edit has generated creative package and low/zero Apple Ads delivery signals | Push App Store/TestFlight readiness, delivery diagnosis and style proof | subscription/affiliate | M | M | Diagnose US Apple Ads non-delivery; review generated UGC assets; confirm `look_generated` / `edit_saved` / paywall events before paid upload | candidate-review |
| csdm-validator | ServiceNow/CSDM validation tool | Package as audit/report generator | B2B service/SaaS | M | M | Build sample report with anonymized data | candidate |
| servicenow-agent-army | Community ServiceNow agent product | Clarify ICP and first paid workflow | community/product/service | M | M | Define one agent demo tied to measurable ServiceNow value | candidate |
| investcoach_ai | Financial coach app, TikTok campaign live at 30 BRL/day, pending review; active Apple Ads BR spend visible in prior screenshot | Hold budget until TikTok approves AND Test Events fires `purchase`/`trial` from a native build; verify ASA install/CR/CPA before scale | subscription/lead to paid app | M | M | If TikTok approves: verify Test Events from native build and export Apple Ads metrics before any budget delta; do not raise spend on guesswork | active-review |
| pierrondi-site | Public agency/site live at `www.pierrondi.dev` (apex 301 forwarding) | Add proof-led service section using Muse/InvestCoach creative assets; confirm Plausible site | leads/service packages | S | S | Publish a creative-sprint proof page; confirm Plausible site; non-LinkedIn distribution only | candidate |
| pierrondi-os | Internal marketing/automation OS (split from pierrondi.ia) | Propose Railway service rename to reduce confusion with the public site; define monetization thesis (internal IP vs productized) | internal IP / future product | M | M | Confirm project note exists; propose non-destructive Railway service rename; draft a one-line monetization thesis | candidate |

## Prioritization Rules

- First priority: apps within one checklist of TestFlight/revenue.
- Second priority: B2B/IP products that can become service leads.
- Third priority: consumer apps needing retention proof.
- Defer anything without buyer, distribution or next validation step.


## 04_Areas/Product/Repo Data Improvement Backlog.md

---
type: backlog
area: repo-data
tags:
  - repos
  - data
  - backlog
  - quality
---
# Repo Data Improvement Backlog

Backlog noturno para melhorar repos, dados e confiabilidade sem fazer mudancas destrutivas automaticamente.

## Categories

| Category | What to look for | Output |
|---|---|---|
| Dirty repo risk | many modified files, ahead/behind, stale branches | proposal in project note or Linear cleanup backlog |
| Release readiness | missing tests, build commands, App Store/TestFlight gaps | checklist tasks |
| Data quality | missing migrations, seed data, analytics events, ownership fields | repo/data task |
| Security | `.env` drift, missing `.env.example`, secrets inventory gaps | metadata-only inventory update |
| Product analytics | missing event names, conversion funnel, retention metric | measurement task |
| Marketing proof | missing screenshots, demo videos, before/after assets | creative task |
| Database health | schema drift, missing backup notes, untracked production dependencies | non-secret review task |

## Current Nightly Targets

| Target | Why | Next action | Status |
|---|---|---|---|
| Dirty repos from Linear Git Sync Report | Many project notes currently show dirty snapshots | Prioritize by active Linear/project revenue relevance | recurring |
| Railway variables inventory | Production apps depend on provider env vars | Keep metadata fresh; never store values | recurring |
| iOS release pipeline | Multiple apps depend on App Store Connect/TestFlight | Use Apple inventory + iOS preflight before upload work | recurring |
| Creative/video assets | Marketing improves only with proof and iteration | Link generated assets, captions, hooks and metrics | recurring |
| Linear mapping for revenue-active repos | 18 repos still show `Needs Linear project mapping` | Draft mappings for MyTone, Aura, Adivinha, specialapp, servicenow-superapp, parabens-ai-br, bandle-br first | candidate |
| App Store product-page measurement | Paid app growth needs product page optimization/custom product page discipline | Add PPO/CPP/App Analytics fields to launch package before scaling spend | candidate |
| GitHub secret protection readiness | Many repos are public or near-public and use provider env vars | Check push protection/secret scanning status as metadata only; never store secret values | candidate |
| Agent memory note hygiene | Large always-loaded histories reduce retrieval quality | Keep global instructions concise and link to vault detail instead of copying long histories | candidate |
| Apple Ads / ASA CSV connection | 4 live Apple Ads apps with no CSV connected — no impressions/taps/installs/CR/CPA/spend evidence | Add per-app inventory row in `App Marketing Metrics Inventory` (file path + columns, metadata only, no API tokens); use as gate for budget changes | candidate |
| Railway secret hygiene | `railway variables` (no flag) printed `PGPASSWORD` in plaintext during Muse Edit render | Default to `railway variables --json` + targeted-key extraction or `brain-railway-run -- <cmd>`; never paste output in Markdown, logs or screenshots | candidate |
| FaithSchool resubmission risk | Build 15 uploaded after 5+ rejections | Run a rejection-pattern review against past project-note history before next ASC submit; verify against `App Store Connect Upload Runbook` | candidate |
| pierrondi.ia split hygiene | Repo split into `pierrondi-site` (public) and `pierrondi-os` (internal automation) | Confirm both project notes exist; propose non-destructive Railway service rename; isolate analytics surfaces | candidate |

## Guardrails

- No automatic `git push`, merge, deploy or production database mutation.
- No destructive migrations.
- No secret values in notes, logs, screenshots or prompts.
- Any risky repo action becomes a proposed task, not an automatic edit.


## 04_Areas/Coding/Checklists/Project Checklist Hub.md

---
type: checklist-hub
tags:
  - checklist
  - coding
  - security
---
# Project Checklist Hub

Este e o hub obrigatorio de checklists para todos os projetos.

## Uso por agentes

Antes de implementar, revisar ou fazer deploy, o agente deve escolher os checklists relevantes:

- Preflight essencial app/web: [[04_Areas/Coding/Checklists/App Web Preflight Checklist]]
- Visual QA/screenshots: [[04_Areas/Coding/Checklists/Screenshots Visual QA Checklist]]
- Frontend: [[04_Areas/Coding/Checklists/Frontend Checklist]]
- Backend/API: [[04_Areas/Coding/Checklists/Backend API Checklist]]
- Web/Next/Node: [[04_Areas/Coding/Checklists/Platform Web Next Node Checklist]]
- Web app quality: [[04_Areas/Coding/Checklists/Web App Preflight Checklist]]
- Mobile/iOS: [[04_Areas/Coding/Checklists/Platform Mobile iOS Checklist]]
- iOS app quality: [[04_Areas/Coding/Checklists/iOS App Preflight Checklist]]
- App Store Connect upload: [[04_Areas/Coding/Checklists/App Store Connect Upload Runbook]]
- Android app quality: [[04_Areas/Coding/Checklists/Android App Preflight Checklist]]
- Python/Data: [[04_Areas/Coding/Checklists/Platform Python Data Checklist]]
- IA/LLM: [[04_Areas/Coding/Checklists/AI Integrations Checklist]]
- Deploy/Release: [[04_Areas/Coding/Checklists/Release Deploy Checklist]]
- Seguranca: [[04_Areas/Coding/Checklists/Security Checklist]]
- Secrets/API keys: [[04_Areas/Coding/Checklists/Secrets And API Keys Register]]
- Apple/App Store Connect: [[04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory]]
- Railway variables: [[04_Areas/Coding/Checklists/Railway Secrets Inventory]]

## Regra dura

O vault guarda inventario, decisoes e referencias. O vault **nao guarda valores reais** de API keys, tokens, senhas, cookies, private keys, refresh tokens ou credenciais de producao.

## Start gate para qualquer projeto

- [ ] Identificar plataforma: web, mobile, backend, IA, data, infra.
- [ ] Abrir nota do projeto em `02_Projects`.
- [ ] Abrir `.brain/PROJECT_CONTEXT.md` quando existir.
- [ ] Selecionar checklists relevantes deste hub.
- [ ] Para app, site, tela, fluxo visual ou store submission, abrir [[04_Areas/Coding/Checklists/App Web Preflight Checklist]].
- [ ] Para mudanca visual, planejar screenshots com [[04_Areas/Coding/Checklists/Screenshots Visual QA Checklist]].
- [ ] Verificar riscos e decisoes antigas.
- [ ] Confirmar onde secrets reais devem ficar.
- [ ] Para iOS/App Store, abrir o inventario Apple antes de pedir IDs ou chaves.
- [ ] Definir comandos de lint, test e build.

## Finish gate para qualquer projeto

- [ ] Atualizar nota do projeto.
- [ ] Atualizar inventario de env vars/secrets sem valores reais.
- [ ] Atualizar inventario Apple quando houver mudanca de Issuer ID, Team ID, Key ID, APNS, IAP ou signing.
- [ ] Registrar comandos rodados.
- [ ] Registrar paths dos screenshots relevantes ou motivo de nao capturar.
- [ ] Registrar riscos, decisoes e proximos passos.
- [ ] Confirmar que nenhum segredo foi escrito em Markdown, logs, commits ou screenshots.

## Referencias externas

- Apple HIG: https://developer.apple.com/design/human-interface-guidelines
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Android Core App Quality: https://developer.android.com/docs/quality-guidelines/core-app-quality
- Android technical quality: https://developer.android.com/quality/technical
- Google Play Developer Program Policy: https://support.google.com/googleplay/android-developer/answer/16933379
- Web Vitals: https://web.dev/articles/vitals
- WCAG 2.2: https://www.w3.org/TR/wcag/
- OWASP Top 10 2021: https://owasp.org/Top10/2021/
- OWASP API Security Top 10 2023: https://owasp.org/API-Security/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/


## 04_Areas/Coding/Checklists/App Web Preflight Checklist.md

---
type: preflight-checklist
area: app-web-quality
tags:
  - preflight
  - apps
  - web
  - ios
  - android
  - quality
---
# App Web Preflight Checklist

Este e o preflight mais importante antes de criar, alterar ou revisar qualquer app, web app, site, tela, fluxo, release, screenshot ou submission.

## 0. Classificar o trabalho

- [ ] Tipo: web app, site, iOS, Android, cross-platform, backend-for-frontend, landing, dashboard, game, marketing page.
- [ ] Plataforma alvo primaria definida.
- [ ] Plataforma secundaria definida.
- [ ] Usuario alvo e momento de uso definidos.
- [ ] Fluxo principal em uma frase.
- [ ] Risco principal: design, dados, auth, pagamento, store review, performance, privacy, AI, deploy.

## 1. Ler memoria e padroes

- [ ] Nota do projeto em `02_Projects`.
- [ ] `.brain/PROJECT_CONTEXT.md`.
- [ ] AI history do projeto.
- [ ] [[04_Areas/Coding/Best Practices/Development Best Practices Hub]]
- [ ] [[04_Areas/Coding/Best Practices/Frontend UI UX Best Practices]]
- [ ] [[04_Areas/Coding/Checklists/Project Checklist Hub]]
- [ ] [[04_Areas/Coding/Checklists/Screenshots Visual QA Checklist]]
- [ ] [[04_Areas/Coding/Checklists/Security Checklist]]

## 2. Plataforma

- [ ] Web: [[04_Areas/Coding/Checklists/Web App Preflight Checklist]]
- [ ] iOS: [[04_Areas/Coding/Checklists/iOS App Preflight Checklist]]
- [ ] Android: [[04_Areas/Coding/Checklists/Android App Preflight Checklist]]
- [ ] Backend/API: [[04_Areas/Coding/Checklists/Backend API Checklist]]
- [ ] AI/LLM: [[04_Areas/Coding/Checklists/AI Integrations Checklist]]
- [ ] Release/deploy: [[04_Areas/Coding/Checklists/Release Deploy Checklist]]

## 3. Produto e UX

- [ ] Primeira tela mostra valor real, nao placeholder ou marketing vazio.
- [ ] Fluxo principal tem inicio, acao, feedback, erro e conclusao.
- [ ] Estados vazios, loading, erro, offline e permissao negada foram tratados.
- [ ] Usuario consegue recuperar de erro sem perder trabalho.
- [ ] Copy esta em idioma correto e nao promete o que app nao entrega.
- [ ] Nenhum texto explica funcionalidade que a UI deveria tornar obvia.

## 4. Qualidade visual

- [ ] Screenshot desktop e mobile foram capturados quando ha mudanca visual.
- [ ] Nao ha texto cortado, overlap, overflow ou botao com label quebrado.
- [ ] Layout nao pula no hover/loading.
- [ ] Paleta nao parece generica ou monocromatica sem intencao.
- [ ] Densidade visual combina com dominio: operacional, editorial, game, social, SaaS, app mobile.
- [ ] Imagens/assets mostram o produto/estado real quando o usuario precisa inspecionar.

## 5. Acessibilidade

- [ ] Navegacao por teclado/foco visivel.
- [ ] Labels e nomes acessiveis em inputs e icon buttons.
- [ ] Contraste aceitavel.
- [ ] Touch targets suficientes em mobile.
- [ ] Autenticacao nao depende somente de desafio cognitivo dificil.
- [ ] WCAG 2.2 usado como referencia para web.

## 6. Performance

- [ ] Web: LCP, INP e CLS considerados.
- [ ] App: startup, scroll, transicoes e memoria considerados.
- [ ] Imagens otimizadas e dimensionadas.
- [ ] Listas grandes limitadas, paginadas ou virtualizadas.
- [ ] Nenhum bundle/dependencia grande sem justificativa.
- [ ] Offline/network slow tem comportamento aceitavel.

## 7. Privacy, safety e stores

- [ ] iOS: App Store guidelines e privacy details considerados.
- [ ] Android: Play policy, Data safety e permissions considerados.
- [ ] Privacy policy e termos batem com coleta real.
- [ ] SDKs terceiros revisados.
- [ ] UGC, criancas, saude, financeiro, sorteio/jogo, IA ou conteudo sensivel tem regra especifica.
- [ ] Nenhum segredo no client.

## 8. Evidencia antes de concluir

- [ ] Comandos de lint/typecheck/test/build rodados ou motivo registrado.
- [ ] Screenshots anexados ou path registrado.
- [ ] Smoke test do fluxo principal.
- [ ] Riscos residuais registrados.
- [ ] Aprendizado reutilizavel registrado em [[04_Areas/Coding/Best Practices/Learning Inbox]].

## Referencias oficiais

- Apple HIG: https://developer.apple.com/design/human-interface-guidelines
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Android Core App Quality: https://developer.android.com/docs/quality-guidelines/core-app-quality
- Google Play Developer Program Policy: https://support.google.com/googleplay/android-developer/answer/16933379
- Web Vitals: https://web.dev/articles/vitals
- WCAG 2.2: https://www.w3.org/TR/wcag/


## 04_Areas/Coding/Checklists/Screenshots Visual QA Checklist.md

---
type: checklist
area: visual-qa
tags:
  - screenshots
  - visual-qa
  - quality
---
# Screenshots Visual QA Checklist

## Quando capturar

- [ ] Mudanca visual em tela, componente, landing, dashboard ou app.
- [ ] Novo fluxo de onboarding, auth, pagamento, upload, IA ou deploy.
- [ ] Submission App Store/Google Play.
- [ ] Bug visual, overflow ou responsividade.
- [ ] Antes/depois de refactor de UI.

## Viewports

- [ ] Mobile estreito.
- [ ] Mobile alto.
- [ ] Tablet quando aplicavel.
- [ ] Desktop padrao.
- [ ] Desktop largo quando layout for responsivo.
- [ ] Light/dark mode quando suportado.

## O que reprova

- [ ] Texto cortado.
- [ ] Texto ou controles sobrepostos.
- [ ] Botao muda tamanho no hover/loading.
- [ ] Cards dentro de cards sem motivo.
- [ ] Hero generico sem produto/objeto real.
- [ ] Imagem escura, cortada ou decorativa quando deveria explicar produto.
- [ ] Loading/empty/error com layout quebrado.
- [ ] Conteudo principal abaixo da dobra sem sinal visual.
- [ ] Cores muito monocromaticas sem hierarquia.

## Evidencia

- [ ] Paths dos screenshots registrados na nota do projeto.
- [ ] Se screenshot contem dado sensivel, nao anexar ao vault; registrar apenas que foi verificado.
- [ ] Falhas visuais viram item no projeto ou Learning Inbox.

## Aprendizados locais de screenshots

O workspace contem muitos assets e screenshots de verificacao visual, principalmente em:

- `servicenow-agent-army/marketing/video-*`
- `pierrondi-ia/test-results`
- `pierrondi-ia/tmp/ui-review`
- `ppt_engine`
- `fashioncore`
- `fifa2026bolao`
- `faithschool-web`

Padrao aprendido: screenshots precisam validar fluxo e estado, nao apenas beleza estatica.


## 04_Areas/Coding/Checklists/Web App Preflight Checklist.md

---
type: preflight-checklist
platform: web
tags:
  - preflight
  - web
  - quality
---
# Web App Preflight Checklist

## UX

- [ ] O primeiro viewport mostra produto, estado real ou tarefa principal.
- [ ] Navegacao principal e retorno sao claros.
- [ ] Estados empty/loading/error/success existem.
- [ ] Forms preservam dados em erro.
- [ ] Tabelas/listas funcionam em mobile ou tem alternativa.
- [ ] Conteudo real nao depende de lorem ipsum/placeholder.

## Web performance

- [ ] LCP target: ate 2.5s quando medido em experiencia real.
- [ ] INP target: ate 200ms.
- [ ] CLS target: ate 0.1.
- [ ] Imagens com dimensoes, lazy loading quando adequado e formatos corretos.
- [ ] Fontes nao bloqueiam render sem motivo.
- [ ] JS pesado foi evitado ou code-split.

## Accessibility

- [ ] WCAG 2.2 como alvo de referencia.
- [ ] Focus nao fica escondido.
- [ ] Target size/touch target aceitavel.
- [ ] Drag-and-drop tem alternativa.
- [ ] Autenticacao acessivel.
- [ ] Ajuda consistente em fluxos complexos.

## Technical

- [ ] SEO/metadata quando pagina publica.
- [ ] Canonical/robots/sitemap quando relevante.
- [ ] CSP, CORS e security headers considerados.
- [ ] API client nao carrega secrets.
- [ ] Error boundaries/logging sem PII.
- [ ] Analytics respeitam consent/privacy.

## Visual QA

- [ ] Screenshot desktop.
- [ ] Screenshot mobile.
- [ ] Screenshot de estado de erro/loading se mudou fluxo.
- [ ] Sem overflow horizontal.
- [ ] Sem texto sobrepondo UI.

## Referencias

- Web Vitals: https://web.dev/articles/vitals
- WCAG 2.2: https://www.w3.org/TR/wcag/


## 04_Areas/Coding/Checklists/iOS App Preflight Checklist.md

---
type: preflight-checklist
platform: ios
tags:
  - preflight
  - ios
  - app-store
  - quality
---
# iOS App Preflight Checklist

## Produto e UX

- [ ] App segue convencoes iOS/HIG em navegacao, controles, gestos e feedback.
- [ ] Fluxo principal funciona em device/simulador.
- [ ] Safe area, Dynamic Type, dark mode e orientacao foram considerados.
- [ ] Permissoes aparecem no momento certo e explicam valor ao usuario.
- [ ] Offline/network slow nao quebra estado.
- [ ] Nenhum segredo real embutido no app.

## App Store review

- [ ] App nao tem placeholders, telas vazias ou conteudo temporario.
- [ ] Backend esta online para review.
- [ ] Demo account ou demo mode existe quando login e necessario.
- [ ] Se login e necessario, Apple Sign-In e criacao de conta por e-mail foram testados em producao ou build release-like.
- [ ] App Review Information contem usuario demo e senha no App Store Connect; senha nao foi registrada no vault.
- [ ] Metadata, screenshots, descricao e notas de review batem com o app real.
- [ ] Support URL, Privacy URL e Terms URL retornam `200 text/html` antes da submissao.
- [ ] Se o dominio do produto nao estiver pronto, usar `https://www.pierrondi.dev/apps/<app-slug>/support`, `/privacy` e `/terms` como fallback oficial.
- [ ] IAP/subscriptions estao visiveis, funcionais e explicados.
- [ ] Privacy policy e App Privacy Details batem com SDKs e coleta real.
- [ ] Privacy manifest (`PrivacyInfo.xcprivacy`) bate com dominios reais usados em producao.
- [ ] UGC tem report, block, moderation e contato quando aplicavel.
- [ ] Kids, saude, financeiro, sorteios/jogos, IA ou conteudo sensivel foram revisados.

## Build

- [ ] Bundle ID correto.
- [ ] Version/build number atualizados.
- [ ] Entitlements/capabilities revisados.
- [ ] Signing/provisioning ok.
- [ ] Archive/test build validado.
- [ ] Crash/logs revisados.
- [ ] Para upload/TestFlight/App Store Connect API, [[04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory]] foi conferido.
- [ ] Para upload/TestFlight/App Store Connect API, [[04_Areas/Coding/Checklists/App Store Connect Upload Runbook]] foi seguido.
- [ ] `APP_STORE_CONNECT_ISSUER_ID` usa identificador nao-secreto do inventario; `.p8`, shared secrets e certificados ficam em secret manager/provider env vars.
- [ ] Large app icon 1024px nao tem alpha (`sips -g hasAlpha ...` retorna `no`).
- [ ] Build number foi incrementado antes de novo upload.
- [ ] Upload nao sera considerado concluido ate App Store Connect mostrar build processing/`VALID`.

## Screenshots

- [ ] Screenshots mostram valor real do app.
- [ ] Sem dados sensiveis.
- [ ] Textos localizados corretamente.
- [ ] Dispositivos/tamanhos exigidos foram cobertos.
- [ ] Idiomas suportados tem screenshots separados no `fastlane/screenshots/<locale>`.
- [ ] Dimensoes dos screenshots foram validadas por script.

## Referencias

- Apple HIG: https://developer.apple.com/design/human-interface-guidelines
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- App Privacy Details: https://developer.apple.com/app-store/app-privacy-details/
- Apple/App Store Connect Inventory: [[04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory]]
- App Store Connect Upload Runbook: [[04_Areas/Coding/Checklists/App Store Connect Upload Runbook]]


## 04_Areas/Coding/Checklists/Android App Preflight Checklist.md

---
type: preflight-checklist
platform: android
tags:
  - preflight
  - android
  - google-play
  - quality
---
# Android App Preflight Checklist

## Produto e UX

- [ ] App segue Core App Quality e padroes Android.
- [ ] Material 3/Compose ou sistema visual escolhido foi aplicado consistentemente.
- [ ] Back navigation funciona e nao perde dados.
- [ ] Estado e restaurado ao voltar do background.
- [ ] Layout funciona em diferentes tamanhos, densidades, orientacoes e fontes.
- [ ] Foldables/tablets foram considerados se o app se beneficiar.
- [ ] Permissoes perigosas sao pedidas so quando ligadas ao caso de uso principal.

## Technical quality

- [ ] Startup, scroll, transicoes e memoria aceitaveis.
- [ ] Crash-free e ANR considerados.
- [ ] Offline/network slow tratado.
- [ ] WorkManager/background work usado de forma apropriada.
- [ ] Battery/network usage nao abusivo.
- [ ] Nenhum segredo real embutido no APK/AAB.

## Google Play

- [ ] Privacy policy publica e dentro do app quando necessario.
- [ ] Data safety section consistente com coleta real e SDKs terceiros.
- [ ] Permissions declaration coerente.
- [ ] Content rating completo.
- [ ] Store listing sem claims enganosos.
- [ ] Account deletion e data deletion quando aplicavel.
- [ ] Test track/review notes preparados.

## Build/release

- [ ] Application ID correto.
- [ ] Version code/name atualizados.
- [ ] Release signing configurado.
- [ ] Android App Bundle pronto.
- [ ] ProGuard/R8 rules revisadas.
- [ ] Smoke test em device/emulator.

## Screenshots

- [ ] Phone screenshots.
- [ ] Tablet/large screen screenshots se aplicavel.
- [ ] Sem dados sensiveis.
- [ ] UI legivel em light/dark mode.

## Referencias

- Android Core App Quality: https://developer.android.com/docs/quality-guidelines/core-app-quality
- Android technical quality: https://developer.android.com/quality/technical
- Google Play policies: https://support.google.com/googleplay/android-developer/answer/16933379


## 04_Areas/Coding/Checklists/Security Checklist.md

---
type: checklist
area: security
tags:
  - checklist
  - security
---
# Security Checklist

## Baseline

- [ ] Nenhum segredo real em Markdown, commits, screenshots, logs ou issues.
- [ ] `.env`, private keys, certificates e service account files estao no `.gitignore`.
- [ ] `.env.example` existe quando util, sem valores reais.
- [ ] Dependencias novas foram revisadas.
- [ ] Input externo e validado no servidor.
- [ ] Output sensivel nao e exposto ao cliente.

## OWASP web

- [ ] Broken access control: checar autorizacao por recurso.
- [ ] Cryptographic failures: nao armazenar senha/token em claro.
- [ ] Injection: usar queries parametrizadas e sanitizacao apropriada.
- [ ] Insecure design: revisar abusos obvios do fluxo.
- [ ] Security misconfiguration: headers, CORS, debug e permissao.
- [ ] Vulnerable components: revisar dependencias.
- [ ] Auth failures: sessoes, reset, MFA quando aplicavel.
- [ ] Integrity failures: supply chain, builds, webhooks assinados.
- [ ] Logging/monitoring: eventos criticos sem secrets.
- [ ] SSRF: validar URLs externas e metadata endpoints.

## API

- [ ] BOLA/BFLA: usuario nao acessa objeto/funcoes de outro usuario.
- [ ] Rate limit por user/IP/token.
- [ ] Object properties sensiveis nao aceitam mass assignment.
- [ ] Excessive data exposure evitada.
- [ ] Webhooks e callbacks validam assinatura.
- [ ] Consumo de APIs externas tem timeout, retry e allowlist quando possivel.

## Mobile/client

- [ ] Nenhum segredo real embutido no app.
- [ ] Chaves publicas client-side sao tratadas como publicas.
- [ ] Deep links e callbacks validam destino.
- [ ] Storage local nao guarda token sensivel sem protecao adequada.

## IA

- [ ] Prompt injection e tool abuse foram considerados.
- [ ] Modelo nao recebe segredo real.
- [ ] Output de IA nao executa acao destrutiva sem validacao.
- [ ] Logs de IA redigem PII e secrets.

## Antes de finalizar

- [ ] Rodar busca por padroes de segredo antes de commit quando houver risco.
- [ ] Atualizar [[04_Areas/Coding/Checklists/Secrets And API Keys Register]] se env vars mudaram.
- [ ] Registrar risco residual na nota do projeto.


## 04_Areas/Coding/Checklists/Secrets And API Keys Register.md

---
type: secrets-register
tags:
  - checklist
  - secrets
  - api-keys
  - security
---
# Secrets And API Keys Register

Este arquivo e inventario. Ele **nao guarda valores reais**.

## Regra

Guardar aqui:

- nome da env var;
- fornecedor;
- projeto;
- ambiente;
- onde o valor real esta guardado;
- data de rotacao;
- dono/responsavel;
- risco e escopo.

Nao guardar aqui:

- API key real;
- token;
- senha;
- cookie;
- private key;
- refresh token;
- service account JSON;
- arquivo `.p8`, `.pem`, `.key`, `.p12`, `.mobileprovision` ou equivalente.

## Locais recomendados para valor real

- Apple Keychain local.
- 1Password ou outro password manager.
- GitHub Actions Secrets.
- Vercel/Railway/Netlify/Fly/Render environment variables.
- AWS/GCP/Azure secret manager.
- `.env.local` apenas local, sem commit.

## Checklist para nova API key

- [ ] Existe env var com nome claro.
- [ ] Valor real esta em secret manager, nao no vault.
- [ ] `.env.example` foi atualizado sem valor real.
- [ ] Escopo/permissao minima.
- [ ] Ambiente separado: dev/staging/prod.
- [ ] Rotacao/revogacao planejada.
- [ ] Quem usa a key esta documentado.
- [ ] Logs nao imprimem a key.
- [ ] Client nao recebe segredo server-side.

## Inventario

| Projeto | Env var | Fornecedor | Ambientes | Onde esta o valor real | Escopo | Rotacao | Dono | Status |
|---|---|---|---|---|---|---|---|---|
| _template_ | `OPENAI_API_KEY` | OpenAI | local/staging/prod | 1Password + provider env vars | server-side model calls | trimestral ou incidente | Paulo | planned |
| global-ios | `APP_STORE_CONNECT_ISSUER_ID` | Apple App Store Connect | local/CI/provider env | [[04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory]] | identificador nao-secreto para ASC API/TestFlight/upload; private key `.p8` fica fora do vault | n/a salvo troca de conta Apple | Paulo | **ativo** — registrado 2026-05-15 |
| global-ios | `ASC_KEY_ID` / `APP_STORE_CONNECT_KEY_ID` | Apple App Store Connect | local/CI/provider env | [[04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory]] | identificador nao-secreto da API key (`95ULBVD2BW`); `.p8` fica fora do vault | n/a salvo rotacao da API key | Paulo | **ativo** — confirmado 2026-05-15 |
| global-ios | `ASC_KEY_PATH` / `APP_STORE_CONNECT_PRIVATE_KEY_PATH` | Apple App Store Connect | local only | `~/.appstoreconnect/private_keys/AuthKey_95ULBVD2BW.p8` | caminho local para private key; o conteudo da `.p8` e segredo real | rotacionar se comprometida | Paulo | **ativo** — path metadata only |
| global-ios | `APPLE_TEAM_ID` | Apple Developer | local/CI/provider env | [[04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory]] | identificador nao-secreto de team/signing (`8ULNGWJZ6B`) | n/a salvo troca de conta/team | Paulo | **ativo** — confirmado 2026-05-15 |
| global-marketing | `APPLE_ADS_CLIENT_ID` | Apple Ads / ASA | local/CI/provider env | Apple Ads API user / secret manager | OAuth client identifier para Campaign Management API; valor pode ser metadata, segredo OAuth fica fora do vault | rotacao se cliente OAuth mudar | Paulo | planned |
| global-marketing | `APPLE_ADS_TEAM_ID` | Apple Ads / ASA | local/CI/provider env | Apple Ads API user / secret manager | team/client metadata para OAuth Apple Ads | n/a salvo troca de conta | Paulo | planned |
| global-marketing | `APPLE_ADS_KEY_ID` | Apple Ads / ASA | local/CI/provider env | Apple Ads API user / secret manager | key identifier para OAuth Apple Ads | rotacao se key mudar | Paulo | planned |
| global-marketing | `APPLE_ADS_PRIVATE_KEY_PATH` | Apple Ads / ASA | local only | local key path or password manager | caminho local para private key; conteudo da private key nunca entra no vault | rotacionar se comprometida | Paulo | planned |
| global-marketing | `APPLE_ADS_ORG_ID` / `APPLE_ADS_ACCOUNT_ID` | Apple Ads / ASA | local/CI/provider env | Apple Ads account settings | account/org metadata para reports; sem token | n/a salvo troca de conta | Paulo | planned |
| adivinha-app | `GEMINI_API_KEY` | Google Gemini | local/.env + Railway prod | `.env` local (nao commitado) + Railway Variables | server-side AI agents (explain, rival, hint) | trimestral ou incidente | Paulo | **ativo** (configurado 2026-05-14) |
| adivinha-app | `ADMIN_KEY` | interno (64-hex) | local/.env + Railway prod | `.env` local (nao commitado) + Railway Variables | rotas admin protegidas | anual ou incidente | Paulo | **ativo** (gerado/configurado 2026-05-14) |
| adivinha-app | `APPLE_SHARED_SECRET` | Apple App Store Connect | Railway prod | Railway Variables | validacao de IAP/subscricoes server-side | rotacao manual no ASC | Paulo | **pendente** — sem IAP em prod ate configurar |
| adivinha-app | `REVENUECAT_SECRET_API_KEY` | RevenueCat | Railway prod | Railway Variables | validacao server-side de receipts RevenueCat | anual ou incidente | Paulo | **pendente** — necessario para subscricoes Pro |
| mytone-app | `GROQ_API_KEY` | Groq | local/.env + Railway pr
...[truncated]

## 04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory.md

---
type: provider-inventory
provider: apple
tags:
  - apple
  - app-store-connect
  - ios
  - secrets
  - checklist
---
# Apple Developer And App Store Connect Inventory

Este arquivo guarda inventario e identificadores nao-secretos para trabalhos Apple/iOS. Ele nao guarda private keys, tokens, senhas, shared secrets, cookies, provisioning profiles ou certificados.

## Identificadores nao-secretos registrados

| Item | Valor | Escopo | Uso | Status |
|---|---|---|---|---|
| App Store Connect Issuer ID | `20a81f12-b22c-4ff8-8b33-c1e5e411a24b` | App Store Connect API | Upload/TestFlight/API automation quando combinado com API Key ID e `.p8` guardados fora do vault | **ativo** — registrado 2026-05-15 |
| App Store Connect API Key ID | `95ULBVD2BW` | App Store Connect API | JWT/Fastlane/Xcode/Transporter auth metadata; private key separada | **ativo** — confirmado por historico 2026-05-15 |
| Apple Team ID | `8ULNGWJZ6B` | Apple Developer signing/App Store Connect | Signing, provisioning, Fastlane, Xcode export/upload | **ativo** — confirmado por historico 2026-05-15 |
| Canonical local `.p8` path | `~/.appstoreconnect/private_keys/AuthKey_95ULBVD2BW.p8` | Local machine only | Path metadata only; never print file content | **ativo** — confirmar existencia com `test -f`, nunca `cat` |

## Pendencias para automacao Apple completa

| Item | Valor | Onde registrar | Regra |
|---|---|---|---|
| App Store Connect API Key ID | `95ULBVD2BW` | Inventario/provider env vars | Identificador de configuracao; pode ser inventariado, mas nao substitui a `.p8`. |
| App Store Connect `.p8` private key | NUNCA em Markdown | Apple Keychain, 1Password, GitHub Actions Secrets ou provider env vars | Segredo real. Nunca colar em chat, nota, commit ou screenshot. |
| Apple Team ID | `8ULNGWJZ6B` | Inventario/provider env vars | Configuracao usada para signing/APNS. |
| APNS Key ID | TBD | Inventario/provider env vars | Identificador de configuracao; a chave `.p8` continua fora do vault. |
| APNS `.p8` / `APNS_KEY_BASE64` | NUNCA em Markdown | Railway/Vercel/GitHub Actions/secret manager | Segredo real. |
| App-specific shared secret / IAP shared secret | NUNCA em Markdown | Railway/Vercel/GitHub Actions/secret manager | Segredo real para validacao de compras/subscricoes. |
| Provisioning profiles / certificates | NUNCA em Markdown | Apple Developer, Keychain, CI signing store | Material sensivel de assinatura. |

## Regra de uso para coders

- Para qualquer trabalho de App Store Connect, TestFlight, upload, IAP, APNS, signing, entitlement ou review notes, ler este arquivo antes de pedir valores ao Paulo.
- Para upload de build, ler tambem [[04_Areas/Coding/Checklists/App Store Connect Upload Runbook]].
- Usar `APP_STORE_CONNECT_ISSUER_ID=20a81f12-b22c-4ff8-8b33-c1e5e411a24b` apenas como identificador nao-secreto.
- Se precisar de API Key ID, Team ID, APNS Key ID ou Bundle ID, registrar como metadado de configuracao quando fornecido.
- Se precisar de `.p8`, shared secret, certificate, password, token ou cookie, usar secret manager/provider env vars. Nao registrar o valor no vault.
- Para CI/cloud, passar o Issuer ID como env var/config e a `.p8` como segredo do provedor.

## Links relacionados

- [[04_Areas/Coding/Checklists/Secrets And API Keys Register]]
- [[04_Areas/Coding/Checklists/App Store Connect Upload Runbook]]
- [[04_Areas/Coding/Checklists/Platform Mobile iOS Checklist]]
- [[04_Areas/Coding/Checklists/iOS App Preflight Checklist]]
- [[04_Areas/Coding/Checklists/Railway Secrets Inventory]]
- [[99_System/Security And Secrets Policy]]


## 04_Areas/Coding/Checklists/App Store Connect Upload Runbook.md

---
type: runbook
platform: ios
provider: apple
tags:
  - ios
  - app-store-connect
  - testflight
  - upload
  - claude-code
  - checklist
---
# App Store Connect Upload Runbook

Updated: 2026-05-15

Este e o caminho pratico para upload de build iOS para App Store Connect/TestFlight. Use este runbook quando Claude Code, Codex, Kimi ou Gemini estiverem fazendo archive/upload.

## Answer First

O caminho mais confiavel para Paulo hoje e:

1. Usar o lane/script existente do repo.
2. Autenticar com App Store Connect API key, nao Apple ID/2FA.
3. Usar signing de distribuicao (`Apple Distribution`) e export/upload `app-store-connect`.
4. Validar build/signing/icon antes do upload.
5. Confirmar que o build apareceu e ficou `VALID` no App Store Connect.

Nao fazer:

- nao escrever JWT custom em Python/Node quando Fastlane/Xcode/Transporter ja resolvem;
- nao pedir `.p8` ao Paulo se o inventario mostra o caminho local/secret manager;
- nao usar development signing/device provisioning para upload App Store;
- nao confundir upload/TestFlight com submit for review;
- nao colar private key, token ou certificado em Markdown/chat.

## Required Context

Antes de agir, ler:

- [[04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory]]
- [[04_Areas/Coding/Checklists/iOS App Preflight Checklist]]
- [[04_Areas/Coding/Checklists/Platform Mobile iOS Checklist]]
- [[04_Areas/Coding/Checklists/Secrets And API Keys Register]]
- [[99_System/Security And Secrets Policy]]
- Nota do projeto em [[02_Projects/Projects Index]]
- Historico do projeto em [[03_AI-Chats/AI Chats Index]]

## Known Apple Config Metadata

| Item | Valor |
|---|---|
| Team ID | `8ULNGWJZ6B` |
| App Store Connect Issuer ID | `20a81f12-b22c-4ff8-8b33-c1e5e411a24b` |
| App Store Connect API Key ID | `95ULBVD2BW` |
| Canonical local private key path | `~/.appstoreconnect/private_keys/AuthKey_95ULBVD2BW.p8` |
| Legacy local key path seen in history | `~/Downloads/AuthKey_95ULBVD2BW.p8` |

The `.p8` value is secret. It must never be printed, copied into Markdown, committed or pasted into an LLM chat.

## Choose The Upload Path

| Repo pattern | Prefer this command | Notes |
|---|---|---|
| Capacitor/Next repo with `script/build_ios.sh` and `package.json` script `ios:upload` | `npm run ios:upload` | Known working pattern from `fifa2026bolao`; uses `xcodebuild -exportArchive` with `ios/UploadOptions.plist`. |
| Native iOS repo with `fastlane/Fastfile` lane `local_beta` | `ASC_ISSUER_ID=20a81f12-b22c-4ff8-8b33-c1e5e411a24b bundle exec fastlane local_beta` | Known working pattern from `fashioncore` and `mytone-app`; uses `app_store_connect_api_key`, `sigh`, `gym/build_app`, `pilot/upload_to_testflight`. |
| Repo with CI/match setup | `bundle exec fastlane beta` | Only when `MATCH_GIT_URL`, `MATCH_PASSWORD`, `APPLE_TEAM_ID`, `ASC_KEY_ID`, `ASC_ISSUER_ID`, and key content/path are configured in secret manager. |
| No lane/script exists | Create a repo-local Fastlane lane first, then upload | Do not run ad hoc commands repeatedly without encoding the known-good lane. |
| Manual fallback | Xcode Organizer or Transporter | Use when automation is blocked by signing/profile/account permissions. |

## Preflight Commands

Run from the repo root unless the project note says otherwise.

```bash
xcodebuild -version
security find-identity -v -p codesigning | rg "Apple Distribution|8ULNGWJZ6B" || true
test -f ~/.appstoreconnect/private_keys/AuthKey_95ULBVD2BW.p8
```

For Capacitor/Next:

```bash
npm run lint
npm run build
npm run ios:sync
plutil -p ios/UploadOptions.plist
```

Expected `ios/UploadOptions.plist` shape:

```text
destination = upload
method = app-store-connect
teamID = 8ULNGWJZ6B
signingStyle = automatic or manual
uploadSymbols = true
```

For native/Fastlane:

```bash
cd ios  # or apps/ios, depending on repo
bundle config set path vendor/bundle
bundle install
bundle exec fastlane lanes
ASC_ISSUER_ID=20a81f12-b22c-4ff8-8b33-c1e5e411a24b bundle exec fastlane local_beta
```

For XcodeGen repos:

```bash
cd apps/ios
xcodegen
xcodebuild -list -project *.xcodeproj
```

## Icon Alpha Gate

ASC rejects 1024px app icons with alpha. Before upload, verify the large icon is opaque.

```bash
sips -g hasAlpha path/to/AppIcon-512@2x.png
sips -g hasAlpha path/to/icon-1024.png
```

Expected: `hasAlpha: no` for the 1024px large app icon. If the answer is `yes`, flatten the icon against an opaque brand background before archiving.

## Known Working Patterns From History

### fifa2026bolao

Working path:

- `npm run ios:upload`
- `script/build_ios.sh upload`
- `xcodebuild -exportArchive`
- `ios/UploadOptions.plist` with `destination=upload`, `method=app-store-connect`, `teamID=8ULNGWJZ6B`

Observed success:

- `xcodebuild -exportArchive` completed with `Uploaded App` and `** EXPORT SUCCEEDED **`.
- Build reached App Store Connect processing and became `VALID` about 90 seconds later.

Observed failures and fixes:

- `No Devices Registered for Provisioning`: agent tried de
...[truncated]

## 04_Areas/Marketing/Marketing MOC.md

---
type: moc
area: marketing
tags:
  - marketing
  - creative-os
  - video
  - pierrondi-dev
---
# Marketing MOC

Este e o centro de operacao para criativos, videos curtos, campanhas, legendas, voz, distribuicao social e aprendizado de marketing.

## Pierrondi.dev

- [[04_Areas/Marketing/Pierrondi.dev Creative Video OS]]
- [[04_Areas/Marketing/ElevenLabs Voice And Subtitle Workflow]]
- [[04_Areas/Marketing/Social Video Platform Specs 2026]]
- [[04_Areas/Marketing/Creative QA Checklist]]
- [[04_Areas/Marketing/Creative Prompt Starters]]
- [[04_Areas/Marketing/Creative Learning Loop]]
- [[04_Areas/Marketing/Marketing Growth Backlog]]
- [[04_Areas/Marketing/Creative Pipeline Secrets Inventory]]

## App Marketing / ASA

- [[04_Areas/Marketing/Ready App Campaign Factory Procedure]]
- [[04_Areas/Marketing/Ready Apps Sales Effectiveness Scorecard]]
- [[04_Areas/Marketing/Apple Connect Ready Apps Campaign Matrix]]
- [[04_Areas/Marketing/App Marketing Intelligence OS]]
- [[04_Areas/Marketing/iOS App Paid Growth Execution OS]]
- [[04_Areas/Marketing/Apple Ads ASA Tuning Runbook]]
- [[04_Areas/Marketing/App Marketing Metrics Inventory]]
- [[04_Areas/Marketing/App Marketing Daily Tuning Report]]
- [[04_Areas/Marketing/App Marketing Tuning Backlog]]

## Product / Revenue

- [[04_Areas/Product/Product Revenue MOC]]
- [[04_Areas/Product/Nightly Opportunity Engine]]
- [[04_Areas/Product/Nightly Opportunity Report]]

## Projeto

- [[02_Projects/pierrondi-ia]]
- Repo: `/Users/paulopierrondi/Downloads/pierrondi-ia`
- Studio: `/studio/videos`, `/studio/creatives`, `/studio/campaigns`, `/studio/topics`, `/studio/approvals`, `/studio/health`

## Regra

### Regra de ouro — LinkedIn

- **Ate Paulo dizer explicitamente o contrario, LinkedIn e canal exclusivo de ServiceNow.**
- Nao criar, agendar, aprovar, publicar ou sugerir LinkedIn sobre temas genericos de IA, n8n, WhatsApp, freelancing, automacao para PMEs, produto digital, apps consumer, lifestyle ou build-in-public.
- Temas permitidos para LinkedIn: ServiceNow, Now Assist, AI Agents na ServiceNow, CSDM, CMDB, ITSM/ITOM/SPM, Workflow Data Fabric, AI Control Tower, K26, arquitetura de plataforma ServiceNow, demos ServiceNow, Bradesco/FSI quando apropriado.
- Qualquer excecao precisa de confirmacao explicita do Paulo no momento da execucao. Silencio, ambiguidade ou backlog antigo nao autoriza excecao.
- Antes de agendar/publicar LinkedIn, verificar fila futura e bloquear conteudo fora de ServiceNow.

Todo pedido de criativo deve gerar um pacote, nao apenas uma peca:

- brief;
- roteiro;
- voz;
- legendas;
- visual/b-roll;
- versoes por canal;
- copy de publicacao;
- QA;
- aprendizado/metricas.

### Regra de ouro — Paid marketing

- Apple Ads / ASA, Meta, TikTok, YouTube, LinkedIn Ads ou qualquer canal pago podem gerar diagnostico e recomendacao diaria.
- Nenhum agente pode pausar, aumentar budget, mudar bid, criar campanha, publicar criativo pago ou alterar target CPA sem aprovacao explicita do Paulo.
- O vault guarda metricas agregadas, decisoes e hipoteses; segredos de API/OAuth ficam fora do vault.

## Templates

- [[06_Templates/Creative Brief]]


## 04_Areas/Marketing/Pierrondi.dev Creative Video OS.md

---
type: operating-system
area: marketing
project: pierrondi-ia
tags:
  - pierrondi-dev
  - creative-os
  - video
  - social
---
# Pierrondi.dev Creative Video OS

## Objetivo

Criar criativos e videos de marketing de alta qualidade para Pierrondi.dev e produtos do portfolio, com um workflow repetivel para LinkedIn, YouTube Shorts, TikTok, Instagram/Reels e campanhas pagas.

O output bom nao e "um video". E um pacote de campanha com roteiro, voz, legendas, assets, variacoes por canal, QA e aprendizado.

## Regra de ouro — LinkedIn

- **LinkedIn fica 100% restrito a ServiceNow ate Paulo dizer explicitamente o contrario.**
- Nao usar LinkedIn para campanhas genericas de IA, n8n, WhatsApp, automacao para PME, freelancing, produto digital, apps consumer ou build-in-public.
- LinkedIn pode usar apenas: ServiceNow, Now Assist, AI Agents na ServiceNow, CSDM, CMDB, ITSM/ITOM/SPM, Workflow Data Fabric, AI Control Tower, K26, arquitetura/demos ServiceNow e Bradesco/FSI quando fizer sentido.
- Se um roteiro/copy/video nao passa nesse filtro, gerar para outro canal ou deixar como rascunho nao agendado; nunca agendar/publicar em LinkedIn.

## Fonte de verdade no repo

- Repo: `/Users/paulopierrondi/Downloads/pierrondi-ia`
- Current truth: `/Users/paulopierrondi/Downloads/pierrondi-ia/docs/marketing-os/repo-truth.md`
- Video pipeline: `/Users/paulopierrondi/Downloads/pierrondi-ia/docs/marketing-os/video-render-pipeline.md`
- Creative engine runbook: `/Users/paulopierrondi/Downloads/pierrondi-ia/docs/marketing/creative-engine-test-runbook.md`
- Criativos curados: `/Users/paulopierrondi/Downloads/pierrondi-ia/assets/creatives/post-images/`
- Background videos: `/Users/paulopierrondi/Downloads/pierrondi-ia/assets/video-backgrounds/`
- API force video: `/api/marketing-os/force-video`
- Preflight: `/api/marketing-os/video/preflight`

## Pipeline atual

1. Brief do tema, publico, oferta e canal.
2. Script generator cria hook, corpo, CTA, b-roll keywords e UTMs.
3. Agent council revisa clareza, promessa, risco, canal e qualidade.
4. ElevenLabs gera voz com timestamps.
5. Captions convertem timestamps em palavras e ASS karaoke.
6. Visual usa criativos curados primeiro, background videos depois, Pexels como fallback.
7. Render FFmpeg local gera MP4 1080x1920.
8. Creatomate fica como backend premium opcional.
9. QA valida duracao, audio, legenda, safe zone, black frames, CTA, links e formato.
10. Publicacao fica em draft/review/approval antes de ir para canal externo.
11. Metricas entram no aprendizado para remix.

## Regra de qualidade

- Primeiro frame precisa explicar por que parar o scroll.
- Primeiros 2 segundos precisam ter tese, contraste ou prova.
- O roteiro precisa soar falado, nao escrito.
- Legenda precisa ser legivel sem audio e sem cobrir UI do canal.
- Voz precisa combinar com o canal: LinkedIn mais autoridade, TikTok/Reels mais ritmo, YouTube Shorts mais clareza e retenção.
- B-roll precisa reforcar a ideia; se for generico, melhor usar screen/product proof.
- Cada peca precisa ter um unico CTA.
- Nao publicar sem approval quando houver canal externo.

## Formatos canonicos

- Master vertical: MP4 H.264/AAC, 1080x1920, 30fps, 9:16.
- Feed vertical/crop: 1080x1350, 4:5.
- Square fallback: 1080x1080, 1:1.
- LinkedIn professional cut: 9:16 ou 4:5, com SRT sidecar quando possivel.
- Shorts/TikTok/Reels: 9:16, legendas burned-in, safe zones respeitadas.

## Duracao recomendada por intencao

- Prova rapida: 12-20s.
- Hook + tese + CTA: 20-35s.
- Mini tutorial: 35-60s.
- Story/problem-solution: 45-90s.
- YouTube Shorts longo: ate 3 min quando a historia realmente precisa, mas evitar se houver risco de musica/Content ID.

## Assets primeiro, IA depois

O pipeline deve consultar assets curados antes de gerar asset novo:

- imagem/post: `assets/creatives/post-images/`
- video/b-roll: `assets/video-backgrounds/`
- produto real: screenshots, demos, telas do Studio, app ou landing.

So usar imagem/stock/AI quando ela aumenta clareza. Visual bonito que nao prova nada vira ruido.

## Pacote minimo para pedir um criativo

- objetivo;
- produto/oferta;
- publico;
- canal primario e secundarios;
- idioma;
- angulo;
- tom;
- prova;
- CTA;
- duracao alvo;
- asset obrigatorio ou asset proibido;
- restricoes de compliance;
- se pode virar campanha paga.

Use [[04_Areas/Marketing/Creative Prompt Starters]] para pedir isso aos coders.

## Links

- [[04_Areas/Marketing/ElevenLabs Voice And Subtitle Workflow]]
- [[04_Areas/Marketing/Social Video Platform Specs 2026]]
- [[04_Areas/Marketing/Creative QA Checklist]]
- [[04_Areas/Marketing/Creative Learning Loop]]
- [[04_Areas/Marketing/Creative Pipeline Secrets Inventory]]


## 04_Areas/Marketing/ElevenLabs Voice And Subtitle Workflow.md

---
type: workflow
area: marketing
tags:
  - elevenlabs
  - subtitles
  - captions
  - tts
  - video
---
# ElevenLabs Voice And Subtitle Workflow

## Objetivo

Gerar voz natural e legendas sincronizadas para videos de marketing, sem perder qualidade, acessibilidade ou controle de seguranca.

## Fluxo recomendado

1. Escrever roteiro falado, curto e com pausas naturais.
2. Escolher voz por objetivo: founder, autoridade tecnica, energia social, corporate ou analitica.
3. Gerar TTS no ElevenLabs usando endpoint com timestamps.
4. Salvar audio como asset do render, nunca em Markdown.
5. Converter timestamps por caractere para timings por palavra.
6. Gerar dois tipos de legenda:
   - ASS burned-in karaoke para Shorts/TikTok/Reels.
   - SRT sidecar para YouTube e LinkedIn.
7. Renderizar MP4 1080x1920 com FFmpeg local.
8. Rodar QA de sincronia, legibilidade e safe zone.
9. Registrar no projeto: voice slug, roteiro, caminhos de assets, render ID e aprendizados.

## ElevenLabs no repo

- Adapter: `/Users/paulopierrondi/Downloads/pierrondi-ia/lib/marketing-os/voice/elevenlabs.ts`
- Captions: `/Users/paulopierrondi/Downloads/pierrondi-ia/lib/marketing-os/video/captions.ts`
- Env vars:
  - `ELEVENLABS_API_KEY`
  - `ELEVENLABS_PAULO_VOICE_ID`
  - `JARVIS_ELEVENLABS_VOICE_ID`
  - `ELEVENLABS_DEFAULT_VOICE_ID`

## Regras de roteiro para voz

- Escrever como fala: frases curtas, sem paragrafo longo.
- Evitar siglas sem explicar na primeira vez.
- Colocar pausa onde o video precisa respirar.
- Nao pedir "voz viral"; pedir emocao operacional: calmo, urgente, professoral, provocativo, executivo, founder-led.
- Para PT-BR: revisar acentos, nomes proprios, pronuncia de siglas e palavras inglesas.
- Para EN: evitar literalismo do portugues; reescrever a ideia.

## Legendas

### Burned-in

Use em TikTok, Reels e Shorts quando a retencao depende de ler sem audio.

- 1 ou 2 linhas.
- Janela curta de 3 a 5 palavras.
- Contraste forte e outline.
- Nao ocupar topo com hooks longos.
- Evitar rodape baixo: UI do TikTok/Reels/Shorts cobre a area inferior.
- Usar highlights com parcimonia: uma palavra ativa por vez e suficiente.

### Sidecar

Use como arquivo separado quando a plataforma aceita closed captions.

- YouTube: SRT e VTT sao formatos aceitos; SRT UTF-8 e o default simples.
- LinkedIn: usar SRT simples; nao depender de cor, fonte ou markup.
- Manter o SRT master junto do render e registrar o path.

## Conversao de timing

ElevenLabs retorna `alignment` e `normalized_alignment` com timestamps por caractere. O pipeline deve:

1. preferir `normalized_alignment` quando texto foi normalizado;
2. agrupar caracteres nao-espaco em palavras;
3. usar inicio do primeiro caractere e fim do ultimo;
4. snapar cortes para limites de palavra;
5. validar que o ultimo timestamp fica perto da duracao real do audio.

## QA de voz

- [ ] Voz nao parece leitura monotona.
- [ ] Nomes proprios e termos tecnicos corretos.
- [ ] Pacing cabe no tempo alvo.
- [ ] Sem respiracao, riso ou tag textual renderizada por acidente.
- [ ] Audio sem clipping.
- [ ] Legenda bate com a fala.
- [ ] CTA falado e visivel.
- [ ] Sem uso de voz clonada sem consentimento.

## Referencias oficiais

- ElevenLabs timestamps API: https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps
- YouTube caption file formats: https://support.google.com/youtube/answer/2734698
- LinkedIn video captions specs: https://www.linkedin.com/help/linkedin/answer/a424737



## 04_Areas/Marketing/Social Video Platform Specs 2026.md

---
type: reference
area: marketing
tags:
  - platform-specs
  - video
  - linkedin
  - youtube
  - tiktok
  - instagram
---
# Social Video Platform Specs 2026

Verificado em 2026-05-15 com fontes oficiais. Specs mudam; revalidar antes de campanha paga grande.

## Master recomendado

Use este master sempre que possivel:

- MP4
- H.264 video
- AAC audio
- 1080x1920
- 9:16
- 30fps
- legendas burned-in para short-form
- SRT sidecar para canais que aceitam caption upload

## YouTube Shorts

- Square ou vertical ate 3 minutos e classificado como Shorts.
- Upload via YouTube app ou YouTube Studio.
- Se tiver Content ID claim e durar mais de 1 minuto, pode ser bloqueado globalmente.
- Recomendo: 15-60s para performance; usar 60-180s somente quando a historia precisa.
- Caption: SRT simples ou VTT; manter master SRT.

## TikTok

- Recomendado: vertical 9:16.
- Non-Spark ads suportam 9:16, 16:9 e 1:1; vertical recomendado.
- Minimo vertical oficial: >= 540x960.
- Formatos: MP4, MOV e outros aceitos para ads.
- Tamanho: ate 500 MB para in-feed ads.
- Duração de ads Non-Spark: ate 10 minutos; Spark Ads puxa specs do video organico.
- Direct Post API exige consentimento explicito e clients nao auditados ficam restritos a private mode.
- Recomendo criativo organico/pago: 15-45s, key message dentro de safe zone.

## Instagram / Reels / Meta

- Reels aceitam proporcao entre 1.91:1 e 9:16.
- Minimo oficial: 30 FPS e resolucao minima de 720px.
- Para Reels ads, Meta recomenda criativos 9:16 com audio e key elements em safe zone.
- Recomendo: 1080x1920, 9:16, audio claro, legendas burned-in, CTA visual acima da UI inferior.
- Cover Reels: referencia oficial 420x654.

## LinkedIn

- Video ads: MP4.
- File size: 75 KB a 500 MB.
- Codec: H.264 ou VP8.
- Audio: AAC ou MPEG4.
- Frame rate: menor que 30 FPS segundo spec oficial de ads.
- Captions: SRT, somente texto; nao contar com cor, fonte ou markup.
- Videos menores que 30s podem loopar ate completar 30s de playback.
- Video precisa ser upload direto no LinkedIn, nao link do YouTube/Vimeo.
- Recomendo: 20-45s para founder/proof, 45-90s para tutorial executivo.

## Export matrix

| Canal | Export principal | Legenda | Melhor uso |
|---|---|---|---|
| YouTube Shorts | 1080x1920 MP4 | Burned-in + SRT | prova, tutorial, narrativa |
| TikTok | 1080x1920 MP4 | Burned-in | hook agressivo, trend, discovery |
| Instagram Reels | 1080x1920 MP4 | Burned-in | visual proof, social proof, product story |
| LinkedIn | 1080x1920 ou 1080x1350 MP4 | SRT + opcional burned-in leve | autoridade, case, tese B2B |
| LinkedIn feed image/carousel | 1080x1350 PNG/JPG | texto no card | resumo, framework, prova |

## Safe-zone padrao

- Manter textos e rosto/produto entre y=220 e y=1500 no master 1080x1920.
- Evitar CTA no rodape.
- Nao colocar texto essencial perto de bordas laterais.
- Testar primeiro frame como thumbnail.

## Referencias oficiais

- YouTube Shorts 3 minutos: https://support.google.com/youtube/answer/15424877
- YouTube caption formats: https://support.google.com/youtube/answer/2734698
- TikTok In-Feed Ads specs: https://ads.tiktok.com/help/article/tiktok-auction-in-feed-ads
- TikTok Direct Post API: https://developers.tiktok.com/doc/content-posting-api-reference-direct-post
- Instagram Reels size/aspect ratio: https://www.facebook.com/help/1038071743007909
- Meta Reels ads guidance: https://www.facebook.com/business/ads/facebook-instagram-reels-ads
- LinkedIn video ad specs: https://www.linkedin.com/help/linkedin/answer/a424737



## 04_Areas/Marketing/Creative QA Checklist.md

---
type: checklist
area: marketing
tags:
  - qa
  - creative
  - video
  - social
---
# Creative QA Checklist

## Antes de gerar

- [ ] Objetivo claro: awareness, leads, prova, produto, retargeting, authority.
- [ ] Canal primario definido.
- [ ] Produto/oferta e CTA definidos.
- [ ] Publico e dor especificos.
- [ ] Prova ou demo real escolhida.
- [ ] Assets obrigatorios listados.
- [ ] Riscos de marca/compliance revisados.
- [ ] Nenhum segredo ou PII em screenshots/assets.

## Script

- [ ] Hook nos primeiros 2 segundos.
- [ ] Uma tese principal, nao tres.
- [ ] Linguagem falada.
- [ ] CTA unico.
- [ ] Duracao estimada bate com o canal.
- [ ] Sem promessa que produto nao entrega.
- [ ] Sem claims de resultado sem prova.

## Voz

- [ ] Voice slug escolhido.
- [ ] Pacing escolhido: slow, normal ou fast.
- [ ] Pronuncia de nomes e siglas revisada.
- [ ] Audio sem clipping.
- [ ] Voz combina com canal.
- [ ] Voz clonada tem consentimento e uso permitido.

## Legendas

- [ ] Burned-in legivel no celular.
- [ ] SRT gerado quando canal aceita caption upload.
- [ ] Sincronia palavra/fala validada.
- [ ] Texto dentro de safe zone.
- [ ] Sem legenda cobrindo CTA, rosto, produto ou UI importante.

## Visual

- [ ] Usa produto real, screenshot, demo ou b-roll relevante.
- [ ] Criativos curados foram verificados antes de gerar via IA.
- [ ] Background videos locais foram verificados antes de Pexels.
- [ ] Primeiro frame funciona como thumbnail.
- [ ] Nenhum frame todo preto/branco ou quebrado.
- [ ] Sem stock generico quando a peca precisa provar algo.

## Export

- [ ] MP4 H.264/AAC.
- [ ] 1080x1920 para short-form.
- [ ] 1080x1350 ou 1080x1080 gerado se feed precisar.
- [ ] Duracao dentro do alvo.
- [ ] File size dentro do canal.
- [ ] SRT/VTT salvo quando aplicavel.
- [ ] Caminhos de output registrados.

## Publicacao

- [ ] Approval gate criado quando externo.
- [ ] Copy por canal revisada.
- [ ] UTM correto.
- [ ] Thumbnail/capa validada.
- [ ] Canal/conector pronto.
- [ ] Se TikTok Direct Post ainda nao auditado, tratar como draft/private/native completion.

## Aprendizado

- [ ] Hipotese do criativo registrada.
- [ ] Canal e variacao registrados.
- [ ] Metricas de 24h, 72h e 7d planejadas.
- [ ] O que remixar definido.
- [ ] Aprendizado registrado em [[04_Areas/Marketing/Creative Learning Loop]].



## 04_Areas/Marketing/Creative Prompt Starters.md

---
type: prompt-library
area: marketing
tags:
  - prompts
  - creative
  - video
  - social
---
# Creative Prompt Starters

Use estes prompts com Codex, Claude Code, Kimi, Gemini ou dentro do Studio. Sempre peça pacote completo, nao peca "um post".

## Criativo completo

```text
Use o vault e o repo pierrondi-ia. Leia:
- 04_Areas/Marketing/Pierrondi.dev Creative Video OS.md
- 04_Areas/Marketing/ElevenLabs Voice And Subtitle Workflow.md
- 04_Areas/Marketing/Social Video Platform Specs 2026.md
- 04_Areas/Marketing/Creative QA Checklist.md
- 02_Projects/pierrondi-ia.md
- /Users/paulopierrondi/Downloads/pierrondi-ia/docs/marketing-os/video-render-pipeline.md

Crie um pacote de criativo para:
Produto/oferta: <produto>
Canal primario: <linkedin | youtube_shorts | tiktok | instagram_reels>
Canais secundarios: <...>
Publico: <quem>
Dor: <dor>
Prova/demo: <prova>
CTA: <cta>
Idioma: <pt-BR | en>
Duracao alvo: <15s | 30s | 45s | 60s>
Tom: <founder-led, tecnico, provocativo, executivo, tutorial>

Entregue:
1. brief
2. 5 hooks
3. roteiro final falado
4. direcao de voz ElevenLabs
5. legenda/caption plan
6. b-roll/screenshot plan
7. export targets
8. copy por canal
9. checklist de QA
10. aprendizado esperado e metricas para acompanhar

Nao publique. Nao use segredos. Se precisar de API key, cite apenas o nome da env var.
```

## YouTube Shorts

```text
Crie um YouTube Shorts para <tema>. Target 35-60s, 1080x1920, hook em 2s, roteiro falado, CTA unico e SRT sidecar. Use voz founder se fizer sentido. Gere tambem titulo, descricao com UTM, 3 thumbnails textuais e plano de remix caso retenção caia antes de 5s.
```

## TikTok/Reels

```text
Crie uma versao TikTok/Reels para <tema>. Target 15-35s, visual proof antes de explicacao, captions burned-in, safe zone vertical, ritmo mais rapido e linguagem menos corporativa. Entregue 3 aberturas alternativas e uma versao "menos polida, mais nativa".
```

## LinkedIn

Regra obrigatoria: LinkedIn e exclusivo para ServiceNow ate Paulo dizer explicitamente o contrario. Prompts LinkedIn devem tratar de ServiceNow, Now Assist, AI Agents na ServiceNow, CSDM, CMDB, ITSM/ITOM/SPM, Workflow Data Fabric, AI Control Tower, K26, demos/arquitetura ServiceNow ou Bradesco/FSI. Nao gerar LinkedIn para IA generica, n8n, WhatsApp, freelancing, automacao PME, produto digital, apps consumer ou build-in-public.

```text
Crie uma versao LinkedIn para <tema>. Target 30-60s, tom founder/executivo, prova concreta, sem hype. Entregue video script, SRT simples, copy do post, headline, CTA e 3 comentarios de follow-up que Paulo pode postar depois.
```

## Creative remix

```text
Pegue o criativo abaixo e gere 5 remixes mudando apenas um eixo por vez:
1. hook
2. prova
3. visual
4. CTA
5. pacing/voz

Preserve a tese principal. Para cada remix, diga por que pode performar melhor e qual metrica validaria.

Criativo atual:
<colar resumo ou path>
```

## Pedir execucao no repo

```text
No repo /Users/paulopierrondi/Downloads/pierrondi-ia, use o pipeline existente de video factory. Antes de mexer, rode/consulte o preflight do video. Gere apenas draft/review, sem publicar automaticamente. Use RENDER_BACKEND=ffmpeg como default e registre output paths, renderId, scriptId, custos, blockers e proximos passos no vault.
```


## 04_Areas/Marketing/Marketing Growth Backlog.md

---
type: backlog
area: marketing
tags:
  - marketing
  - growth
  - creative
  - backlog
---
# Marketing Growth Backlog

Backlog noturno para transformar projetos, aprendizados e assets em marketing executavel.

## Regra de ouro — LinkedIn

- LinkedIn e exclusivo para ServiceNow ate nova ordem explicita do Paulo.
- Ideias fora de ServiceNow devem ir para X, Shorts, TikTok, Reels, blog, email ou backlog de produto, mas nao para LinkedIn.
- Se uma linha antiga deste backlog sugerir LinkedIn fora de ServiceNow, tratar como obsoleta.

## Growth Moves

| Product/asset | Channel | Hook angle | Proof needed | CTA | Metric | Status |
|---|---|---|---|---|---|---|
| pierrondi.ia creative workflow | site/email/Shorts | "I can turn one product idea into a full creative package" | screen recording + output examples | book a productized creative sprint | leads | candidate |
| CSDM/Data Quality Analyzer | LinkedIn | "Your CMDB quality problem is measurable before it is political" | anonymized report screenshot | request sample assessment | qualified conversations | candidate |
| ppt_engine | YouTube Shorts/GitHub/blog | "Executive decks should be generated from structured thinking, not slides first" | before/after deck demo | join waitlist/request template | signups | candidate |
| App Store Launch Copilot | SEO/GitHub/blog | "Every iOS rejection becomes a reusable checklist" | checklist screenshots + examples | download checklist | downloads | candidate |
| FaithSchool/family copilot | Instagram/Reels/SEO | "One parent workflow to reduce weekly homeschool chaos" | product walkthrough | early access | waitlist | candidate |
| MyTone | TikTok/Reels/Meta | "Your iPhone ringtone does not have to sound like 2009" | real screen recording: import -> AI hook -> export | download on App Store | install -> export -> purchase | blocked-asc-record |
| Aura | TikTok/Reels/Meta | "Uma afirmação para ouvir, não para ler" | real app audio + player + practice flow | download on App Store after approval | install -> first listen -> trial/purchase | submitted-review |
| Adivinha | TikTok/Reels/Stories | "Acerte a musica brasileira do dia em 6 trechos" | real gameplay + share card | download after App Store approval | install -> first game -> share | submitted-review |
| InvestCoach.AI | TikTok Ads/Reels | "Seu dinheiro some? Organize pelo chat em minutos" | real app screens + compliant voiceover | App Store BR URL | install -> onboarding -> core action -> trial | active-review (30 BRL/day) |
| pierrondi.dev creative sprint proof | site + Shorts | "One idea -> full creative package in 48h" | Muse/InvestCoach asset walkthrough (site-only, not LinkedIn) | book a creative sprint via pierrondi.dev | site form submissions | candidate |
| Apple Ads / ASA daily tuning | internal report | "Before any budget change, the CSV must be on disk" | per-app CSV pulled into `App Marketing Metrics Inventory` | gate for budget changes | budget-change gate pass rate | candidate |
| FaithSchool US paid learning sprint | Apple Ads + TikTok/Reels proof clips | "Plan the homeschool week without rebuilding it from scratch" | Apple Ads export + US product-page/onboarding audit + screen recording | download/try on App Store after page audit | install -> plan_created -> lesson_generated -> trial | candidate-first |
| Muse Edit creative QA sprint | TikTok/Reels/Meta review package | "Get a real outfit idea from clothes you already own" | existing UGC MP4s + App Store/paywall/tracking check | download on App Store after approval | install -> look_generated -> edit_saved -> purchase | candidate-review |

## Package Rule

Every marketing task should include:

- hook;
- short script;
- proof asset;
- channel;
- CTA;
- metric;
- follow-up experiment.

## Links

- [[04_Areas/Marketing/Marketing MOC]]
- [[04_Areas/Marketing/Pierrondi.dev Creative Video OS]]
- [[04_Areas/Marketing/ElevenLabs Voice And Subtitle Workflow]]
- [[04_Areas/Marketing/Social Video Platform Specs 2026]]
- [[04_Areas/Marketing/Creative QA Checklist]]
- [[04_Areas/Product/Product Revenue MOC]]


## 04_Areas/Marketing/Creative Pipeline Secrets Inventory.md

---
type: secrets-inventory
area: marketing
tags:
  - secrets
  - marketing
  - no-secret-values
---
# Creative Pipeline Secrets Inventory

Esta nota registra apenas nomes e finalidade. Nao registrar valores reais.

## Regra

- Valor real fica em Railway env, GitHub Actions Secrets, provider OAuth ou secret manager.
- Vault registra nome, escopo, ambiente e rotacao.
- Nunca colar API key em prompt, Markdown, screenshot, log ou commit.

## Pierrondi.dev video/creative env vars

| Env var | Uso | Onde o valor real deve ficar | Observacao |
|---|---|---|---|
| `ELEVENLABS_API_KEY` | TTS/voice generation | Railway env + local `.env.local` | Necessaria para voz |
| `ELEVENLABS_PAULO_VOICE_ID` | Voz founder | Railway env + local `.env.local` | Nao e segredo forte, mas tratar como config sensivel |
| `JARVIS_ELEVENLABS_VOICE_ID` | Voz Jarvis | Railway env | Opcional |
| `ELEVENLABS_DEFAULT_VOICE_ID` | Fallback voice | Railway env | Opcional |
| `PEXELS_API_KEY` | B-roll fallback | Railway env | Pode ser dispensada com background local |
| `CREATOMATE_API_KEY` | Render premium opcional | Railway env | Opcional quando `RENDER_BACKEND=ffmpeg` |
| `CREATOMATE_TEMPLATE_DEFAULT_ID` | Template premium | Railway env | Config |
| `VIDEO_STORAGE_ROOT` | Storage de videos | Railway env/volume | Nao e segredo |
| `VIDEO_SIGNING_SECRET` | URLs assinadas de video | Railway env | Segredo |
| `YOUTUBE_CLIENT_ID` | YouTube OAuth | Railway env | Config/OAuth |
| `YOUTUBE_CLIENT_SECRET` | YouTube OAuth | Railway env | Segredo |
| `YOUTUBE_REFRESH_TOKEN` | YouTube upload | Railway env | Segredo critico |
| `TIKTOK_CLIENT_KEY` | TikTok API | Railway env | Config/OAuth |
| `TIKTOK_CLIENT_SECRET` | TikTok API | Railway env | Segredo |
| `TIKTOK_REFRESH_TOKEN` | TikTok API | Railway env | Segredo critico |
| `TIKTOK_ACCESS_TOKEN` | TikTok API | Railway env | Segredo curto |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth | Railway env | Config/OAuth |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth | Railway env | Segredo |
| `LINKEDIN_AUTHOR_URN` | Autor LinkedIn | Railway env | Config |
| `META_APP_ID` | Instagram/Meta OAuth | Railway env | Config/OAuth |
| `META_APP_SECRET` | Instagram/Meta OAuth | Railway env | Segredo |
| `INSTAGRAM_REDIRECT_URI` | Instagram OAuth | Railway env | Config |
| `MARKETING_OS_TOKEN_ENCRYPTION_KEY` | Criptografia de tokens conectados | Railway env | Segredo critico |
| `CRON_SECRET` | Cron/API gated calls | Railway env | Segredo |

## Rotacao

- Rotacionar tokens de OAuth quando houver erro de refresh, troca de app ou suspeita de vazamento.
- Rotacionar `VIDEO_SIGNING_SECRET`, `CRON_SECRET` e encryption key com plano de migracao.
- Sempre atualizar inventario sem escrever o valor real.

## Links

- [[99_System/Security And Secrets Policy]]
- [[04_Areas/Coding/Checklists/Secrets And API Keys Register]]
- [[04_Areas/Coding/Checklists/Railway Secrets Inventory]]



## 04_Areas/Marketing/App Marketing Intelligence OS.md

---
type: operating-system
area: marketing
status: active
tags:
  - marketing
  - apple-ads
  - asa
  - app-store
  - tuning
---
# App Marketing Intelligence OS

Status: active
Owner: Paulo
Updated: 2026-05-15

## Purpose

Manter um loop diario para apps que rodam ou podem rodar Apple Ads / ASA e outros canais de marketing, com foco em tuning, aprendizado e melhoria do vault.

Este sistema coleta sinais, interpreta performance e gera propostas. Ele nao muda budget, bid, campanha, criativo, publicacao ou segmentacao automaticamente.

## Daily Inputs

- [[04_Areas/Marketing/App Marketing Metrics Inventory]]
- [[04_Areas/Marketing/iOS App Paid Growth Execution OS]]
- [[04_Areas/Marketing/Apple Ads ASA Tuning Runbook]]
- [[04_Areas/Marketing/App Marketing Daily Tuning Report]]
- [[04_Areas/Marketing/App Marketing Tuning Backlog]]
- [[04_Areas/Product/App Refinement Backlog]]
- [[04_Areas/Product/Nightly Opportunity Report]]
- [[04_Areas/Marketing/Marketing Growth Backlog]]
- Notas de projeto em [[02_Projects/Projects Index]]
- App Store / TestFlight / ASC state quando existir nas notas de projeto
- Dados exportados para `98_Attachments/marketing-data`

## Daily Flow

1. Rodar `/Users/paulopierrondi/.local/bin/brain-app-marketing-pulse`.
2. Conferir se existe export recente de Apple Ads / ASA, App Store Connect, RevenueCat, web analytics, TikTok, Meta, YouTube ou LinkedIn.
3. Para cada app, atualizar o status de marketing: ativo, pausado, candidato, bloqueado, sem dados.
4. Gerar recomendacoes de tuning separadas por:
   - TikTok Ads / Meta Ads;
   - Apple Ads / ASA;
   - App Store product page / CPP;
   - ASO metadata;
   - criativos sociais;
   - funil de assinatura/IAP;
   - retencao e eventos in-app.
5. Registrar somente propostas seguras em [[04_Areas/Marketing/App Marketing Tuning Backlog]].
6. Se houver aprendizado reutilizavel, atualizar [[04_Areas/Coding/Best Practices/Learning Inbox]] ou [[04_Areas/Marketing/Creative Learning Loop]].

## Tuning Model

| Layer | Question | Output |
|---|---|---|
| Spend | Onde o dinheiro esta indo? | app/campaign/ad group/keyword com spend, taps, installs |
| Efficiency | O CPA/CPT esta aceitavel? | keep / reduce / investigate |
| Conversion | Onde perde usuario? | product page, paywall, onboarding, offer |
| Creative | Qual promessa visual esta convertendo? | screenshot/video/CPP hypotheses |
| Keyword | Quais termos compram usuario certo? | scale, exact, negative, research |
| Revenue | Instala virou trial/purchase/retention? | ROI hypothesis and missing telemetry |
| Risk | Algo pode gastar sem aprendizado? | budget cap / pause proposal / data gap |

## Guardrails

- Nunca armazenar tokens, OAuth secrets, API keys, cookies ou private keys no vault.
- Nunca alterar budget, bid, target CPA, campanha, keyword, criativo ou publicacao automaticamente.
- Nunca publicar em LinkedIn fora da regra ServiceNow-only registrada em [[04_Areas/Marketing/Marketing MOC]].
- Qualquer acao paga vira proposta humana.
- Qualquer dado de usuario deve ficar agregado e sem PII.

## Sources

- Apple Ads Campaign Management API: https://ads.apple.com/app-store/help/campaigns/0022-use-the-campaign-management-api
- Apple Ads dashboard metrics: https://ads.apple.com/app-store/help/reporting/0024-view-campaigns-dashboard-metrics
- Apple Ads attribution / AdServices: https://ads.apple.com/app-store/help/attribution/0028-measuring-ad-performance
- Campaign-level reporting endpoint: https://developer.apple.com/documentation/apple_ads/get-campaign-level-reports


## 04_Areas/Marketing/Apple Ads ASA Tuning Runbook.md

---
type: runbook
area: marketing
status: active
tags:
  - apple-ads
  - asa
  - app-store
  - paid-acquisition
  - tuning
---
# Apple Ads ASA Tuning Runbook

Use este runbook para Apple Ads / Apple Search Ads / ASA.

## Answer First

Para tunar ASA direito, o vault precisa saber diariamente:

- app;
- pais/regiao;
- placement: Search Results, Search tab, Today tab, Product pages;
- campaign;
- ad group;
- keyword/search term;
- spend;
- impressions;
- taps;
- installs;
- TTR;
- CR;
- Avg CPT;
- Avg CPA;
- revenue/trial/purchase quando existir;
- product page / CPP usada;
- mudanca feita e resultado depois.

## Official Metrics To Track

Apple Ads expõe no dashboard metricas como:

| Metric | Use |
|---|---|
| Spend | gasto real |
| Impressions | escala/distribuicao |
| Taps | interesse antes da pagina |
| TTR | qualidade de keyword/ad placement |
| Installs Total / Tap-Through / View-Through | conversao de install |
| New Downloads / Redownloads | aquisicao vs reengajamento |
| CR Total / Tap-Through | eficiencia da pagina/app fit |
| Avg CPT | custo por tap |
| Avg CPA | custo por install/conversao |
| Avg Daily Spend | ritmo de gasto |
| Daily Budget / Target CPA / bid strategy | controle operacional |

## Placement Mapping

Apple Ads aparece em AdAttributionKit como `com.apple.ads`.

| Placement | Campaign ID |
|---|---|
| Search results | `10` |
| Search tab | `20` |
| Today tab | `30` |
| Product pages | `40` |

## Daily Tuning Rules

| Signal | Interpretation | Proposed action |
|---|---|---|
| Spend > 0 and installs = 0 | dinheiro sem conversao | revisar keyword, product page, country, bid, screenshot promise |
| High impressions, low TTR | keyword/ad mismatch | reduzir bid, negativar termo, melhorar metadata/creative |
| High taps, low installs | product page/payoff fraco | testar screenshots, CPP, title/subtitle, reviews, price |
| Low impressions, good CR | falta escala | testar bid maior ou keyword variants |
| High CPA, no revenue signal | risco de gastar no escuro | exigir trial/purchase/retention tracking antes de escalar |
| Generic keyword expensive | pouca intencao | mover para exact/high-intent ou discovery controlado |
| Search Match trazendo lixo | discovery sem limpeza | extrair termos bons e negativar ruins |
| Good keyword, bad paywall | monetizacao bloqueia | ajustar offer, pricing, trial, onboarding |

## Data Collection Paths

Preferred:

1. Apple Ads Campaign Management API reports.
2. Manual CSV export from Apple Ads dashboard into `98_Attachments/marketing-data`.
3. App Store Connect / RevenueCat / backend analytics to connect install -> trial -> purchase -> retention.

Allowed in vault:

- aggregated metrics;
- campaign names;
- keyword/search term names;
- spend/CPA/CPT/CR;
- decisions and tuning proposals.

Blocked in vault:

- OAuth client secret;
- private key;
- access/refresh token;
- user-level attribution payloads;
- raw PII;
- screenshots with credentials.

## Minimum CSV Export Columns

When exporting manually, include as many of these as possible:

```text
App, Campaign Name, Ad Group Name, Keyword, Search Term, Country or Region,
Ad Placement, Spend, Impressions, Taps, TTR, Installs (Total),
Installs (Tap-Through), Installs (View-Through), CR (Total),
Avg CPT, Avg CPA (Total), Date
```

## Decision Template

```md
### YYYY-MM-DD — app / campaign

- Finding:
- Evidence:
- Hypothesis:
- Proposed action:
- Guardrail:
- Check again:
```

## Sources

- Apple Ads Campaign Management API: https://ads.apple.com/app-store/help/campaigns/0022-use-the-campaign-management-api
- Apple Ads dashboard metrics: https://ads.apple.com/app-store/help/reporting/0024-view-campaigns-dashboard-metrics
- Apple Ads attribution / AdServices: https://ads.apple.com/app-store/help/attribution/0028-measuring-ad-performance
- Campaign-level reports endpoint: https://developer.apple.com/documentation/apple_ads/get-campaign-level-reports


## 04_Areas/Marketing/App Marketing Metrics Inventory.md

---
type: inventory
area: marketing
status: active
tags:
  - marketing
  - metrics
  - apple-ads
  - app-store
---
# App Marketing Metrics Inventory

Este inventario diz quais apps devem entrar no loop diario de marketing/ASA.

## Data Sources

| Source | Location | Status | Notes |
|---|---|---|---|
| Apple Ads / ASA API | Apple Ads API user + OAuth client | not connected | Guardar apenas nomes de env vars no vault. |
| Apple Ads CSV exports | `98_Attachments/marketing-data` | ready | Colocar exports de dashboard aqui quando houver. |
| App Store Connect | App/project notes + ASC exports | partial | Usado para status de build, review, screenshots, product page. |
| RevenueCat / IAP | provider exports or backend metrics | pending | Necessario para CPA -> revenue. |
| Backend analytics | Railway/API endpoints por app | partial | Usar somente agregados. |
| Social marketing | pierrondi.dev Marketing OS | active for ServiceNow content | LinkedIn e ServiceNow-only ate nova ordem. |
| Meta Ads | Meta Business Manager / Ads Manager exports | account recovery needed | Prioridade para apps iOS consumer no mercado US depois de Account Quality, billing, verificacao e tracking iOS estarem limpos. |
| TikTok Ads | TikTok Ads Manager / Events Manager exports | candidate | Canal forte para validar criativos de apps iOS consumer no mercado US; exige App Events/MMP, SKAN e leitura cautelosa de atribuicao em baixo volume. |

## Apps To Track

| App / Project | Repo note | ASA status | Other marketing channels | Revenue signal | Current next tuning question |
|---|---|---|---|---|---|
| Adivinha! | [[02_Projects/adivinha-app]] | needs Apple Ads source confirmation | App Store product page, WhatsApp/iMessage/Stories sharing | IAP pending | Depois da aprovacao, testar Search Results para keywords high-intent de musica/quiz BR e medir install -> Pro. |
| Aura Daily Affirmations | [[02_Projects/aura-affirmations]] | ASC build valid; App Privacy pending | TikTok/Reels wellness/audio demos, then Meta/TikTok paid | IAPs ready to submit | Fechar App Privacy na UI ASC, submeter, preparar criativos por ritual diario/audio. |
| MyTone | [[02_Projects/mytone-app]] | pipeline exists; ASC readiness not confirmed in vault | TikTok/Shorts demo loops, App Store | IAP planned / StoreKit native in repo | Tratar como alto potencial US/TikTok, mas nao primeiro launch pago ate ASC/app approval estar claro. |
| Parabens IA BR | [[02_Projects/parabens-ai-br]] | corrected build valid; rejection thread unresolved | App Store, TikTok/Reels, birthday/event SEO | IAP/server payments planned | Resolver rejection/resubmit antes de campanha; depois foco BR/eventos, nao US first. |
| FIFA 2026 Bolao | [[02_Projects/fifa2026bolao]] | candidate near tournament timing | App Store, social/SEO, football communities | ads/IAP/subscription TBD | Nao gastar antes de fixtures/retention loop; preparar keyword research Copa 2026. |
| Bandle BR / Music Quiz | [[02_Projects/bandle-br]] | submitted for review | App Store, TikTok, music communities | subscription/IAP TBD | Aguardar review; validar retencao/share organic antes de paid. |
| pierrondi.dev Marketing OS | [[02_Projects/pierrondi-ia]] | not ASA; social/content engine | LinkedIn ServiceNow-only, X, video, site | leads/services | Medir pipeline ServiceNow content -> approvals -> posts -> replies/leads. |
| InvestCoach.AI | [[02_Projects/investcoach_ai]] | live Apple Ads BR/US campaigns seen in screenshot | Apple Ads + TikTok BR draft; SDK code implemented, build/env pending | unknown | Configure TikTok Events env, ship native build, verify Test Events, then App Promotion can replace Traffic draft. |
| FaithSchool | [[02_Projects/faithschool-web]] | live Apple Ads BR/US campaigns seen in screenshot | Apple Ads + parent-focused TikTok/Meta demos | subscription TBD | US campaign has spend; best initial US learning candidate if onboarding/product page are strong. |
| Muse Edit | [[02_Projects/fashioncore]] | live Apple Ads BR/US campaigns seen in screenshot | Strong TikTok/Meta visual candidate + Apple Ads | subscription/affiliate TBD | US campaign has budget but no spend; diagnose delivery/keywords before scaling. |
| CantuStudio | [[02_Projects/exploratorio]] | live Apple Ads BR/US campaigns seen in screenshot | Apple Ads niche + musician/teacher short-form demos | subscription/TBD | No delivery in screenshot; needs keyword/ASO/product-page audit. |

## Meta Ads Setup Gaps

- [ ] Auditar Meta Business Support Home / Account Quality para identificar se o bloqueio esta no perfil pessoal, Business Portfolio, Page, Instagram, ad account, app ou payment method.
- [ ] Resolver verificacao, 2FA, admins, billing e consistencia de identidade antes de rodar campanhas novas.
- [ ] Nao criar/adquirir conta cinza nem tentar evadir restricao; escalar por review/suporte oficial ou por uma estrutura legitima limpa quando permitido.
- [ ] Conectar app iOS via Meta SDK ou MMP, mapear eventos `install`, `trial_started`, `purchase` e
...[truncated]

## 04_Areas/Marketing/App Marketing Daily Tuning Report.md

---
type: daily-report
area: marketing
status: active
tags:
  - marketing
  - tuning
  - apple-ads
---
# App Marketing Daily Tuning Report

Generated: `2026-05-16 07:44:16`

This report stores aggregate marketing intelligence only. It does not store secrets, tokens, OAuth credentials, cookies or user-level PII.

## Executive Summary

- Tracked apps/projects: `11`
- Marketing data files found: `0` actionable CSV/TSV exports
- Data folder: `98_Attachments/marketing-data`
- Current automation stance: propose tuning; do not mutate paid campaigns automatically.
- Do not change Apple Ads bids/budgets yet unless export-level metrics support the decision.
- Best next learning candidate: FaithSchool US.
- Biggest current risk: spend without install -> trial/purchase linkage.

## App Readiness Snapshot

| App | Project note | Marketing/store state |
| --- | --- | --- |
| InvestCoach.AI | [[02_Projects/investcoach_ai\|InvestCoach.AI]] | tracked |
| FaithSchool | [[02_Projects/faithschool-web\|FaithSchool]] | tracked |
| Muse Edit | [[02_Projects/fashioncore\|Muse Edit]] | tracked |
| CantuStudio | [[02_Projects/exploratorio\|CantuStudio]] | tracked |
| Adivinha! | [[02_Projects/adivinha-app\|Adivinha!]] | tracked |
| Aura Daily Affirmations | [[02_Projects/aura-affirmations\|Aura]] | tracked |
| MyTone | [[02_Projects/mytone-app\|MyTone]] | tracked |
| Parabens IA BR | [[02_Projects/parabens-ai-br\|Parabens]] | tracked |
| FIFA 2026 Bolao | [[02_Projects/fifa2026bolao\|FIFA]] | tracked |
| Bandle BR / Music Quiz | [[02_Projects/bandle-br\|Bandle]] | tracked |
| pierrondi.dev Marketing OS | [[02_Projects/pierrondi-ia\|pierrondi.dev]] | content engine |

## Active Apple Ads Readiness Queue

| Rank | App | Current signal | Recommendation | Human decision needed |
| --- | --- | --- | --- | --- |
| 1 | FaithSchool US | Visible Apple Ads US spend in prior dashboard screenshot; no export-level install/CR/CPA data yet. | Export Search Results campaign/ad group/keyword metrics; audit US App Store page and onboarding. | Approve data export and product/page audit. |
| 2 | Muse Edit BR/US | BR had minimal delivery; US had budget but no spend in prior screenshot. | Diagnose keyword eligibility, bids, storefront, product-page fit and Search Match before spend changes. | Review generated creative assets before upload/spend. |
| 3 | InvestCoach.AI BR | Highest visible active-app spend among prior Apple Ads screenshot; finance category has trust/compliance risk. | Hold spend; verify TikTok approval/Test Events and Apple Ads install/CR/CPA before scaling. | Approve only after downstream telemetry exists. |
| 4 | CantuStudio BR/US | No delivery in prior dashboard screenshot. | Run keyword/ASO/product-page audit before broad paid social. | Decide target ICP: choir teacher, arranger, church musician or music student. |

## Data Sources Seen

_No recent Apple Ads / marketing CSV exports found in `98_Attachments/marketing-data`._

Minimum next export needed: `App, Campaign Name, Ad Group Name, Keyword, Search Term, Country or Region, Ad Placement, Spend, Impressions, Taps, TTR, Installs (Total), CR (Total), Avg CPT, Avg CPA (Total), Date`.

## Recommended Tuning Queue

1. Export Apple Ads campaign/ad group/keyword report CSV into `98_Attachments/marketing-data`; no bid/budget decision should happen before this.
2. FaithSchool US: inspect product page and first-session activation path; define `plan_created` / `lesson_generated` as activation signals.
3. Muse Edit: diagnose US non-delivery before increasing spend; separately review the prepared BR/US creative assets.
4. InvestCoach.AI: hold budget; verify TikTok App Promotion approval plus native Test Events for `trial_started` / `purchase_completed`.
5. CantuStudio: run keyword/ASO audit; avoid broad paid social until niche intent is proven.
6. Portfolio: connect install -> trial/purchase or at least activation events before scaling any paid channel.

## Human-Review Proposals

| Layer | Proposal | Rationale | Guardrail |
| --- | --- | --- | --- |
| ASA data | Pull one Apple Ads CSV export for active campaigns | Current vault has no export to tune from | Data only; no campaign mutation |
| ASA campaign | Use FaithSchool US as the first daily learning review | Visible spend and clear US parent value proposition | No budget/bid increase until install/CR/CPA is known |
| Keyword/search term | Inspect Muse Edit and CantuStudio delivery blockers before adding spend | Zero/low delivery can mean keyword volume, eligibility, bid or page mismatch | Proposal-only; no keyword or bid edits |
| Product page / CPP | Create one CPP hypothesis per active app only after base page audit | CPP requires coherent ASC/product-page assets | Do not create or publish CPP automatically |
| Creative | Use Muse Edit generated UGC assets for human QA first | Best visual fit, but paid upload/spend still needs approval | No platform upload or paid launch by agent |
| Funnel | Require activation + monetization event map pe
...[truncated]

## 04_Areas/Marketing/App Marketing Tuning Backlog.md

---
type: backlog
area: marketing
status: active
tags:
  - marketing
  - tuning
  - apple-ads
  - app-store
---
# App Marketing Tuning Backlog

Backlog para ajustes de ASA, App Store, ASO, criativos, product page, funil e canais sociais.

| Date | App | Channel | Finding | Proposed tuning | Evidence | Human approval needed | Status |
|---|---|---|---|---|---|---|---|
| 2026-05-15 | all app portfolio | Apple Ads / ASA | Data source not connected yet | Confirm live campaigns and drop/export first Apple Ads report into `98_Attachments/marketing-data` | no recent ASA CSV/API data found | yes | open |
| 2026-05-15 | Adivinha! | App Store / ASA | App submitted, IAP still pending | Do not scale paid acquisition before subscriptions/shared secret/RevenueCat are ready | [[02_Projects/adivinha-app]] | yes | open |
| 2026-05-15 | Aura | App Store Connect | Build `VALID` / `APP_STORE_ELIGIBLE`; IAPs `READY_TO_SUBMIT`; App Privacy labels still need final UI confirmation | Close App Privacy labels, submit for review, then prepare wellness/audio creative tests | [[02_Projects/aura-affirmations]]; [[04_Areas/Marketing/Apple Connect Ready Apps Campaign Matrix]] | yes | open |
| 2026-05-15 | pierrondi.dev | LinkedIn/X | K26 ServiceNow content has approvals workflow | Track 24h/72h/7d metrics per post before generating next sequence | [[02_Projects/pierrondi-ia]] | approval already required in Studio | open |
| 2026-05-15 | all iOS app portfolio | Meta Ads / US | Paulo wants to focus more on Meta than ASA, but current Meta Ads account quality is weak | Run Meta account recovery first, then test one US-ready app with small App Promotion budget and iOS event tracking before scaling | user decision; [[04_Areas/Marketing/App Marketing Metrics Inventory]] | yes | open |
| 2026-05-15 | all iOS app portfolio | TikTok Ads / US | TikTok is also viable for consumer iOS apps, especially as creative validation channel | Prepare TikTok Business/Events setup and run small US creative tests in parallel with or before Meta once one app is US-ready | user decision; [[04_Areas/Marketing/App Marketing Metrics Inventory]] | yes | open |
| 2026-05-15 | Guia 2026 | App Store / Apple Ads / organic short-form | Campaign package created for Copa 2026 schedule/tracker positioning; app should not be marketed as bolao/prediction until approved features support it | Confirm App Store URL/current ASC state, capture iOS screen recordings, add activation/share events, then test BR exact keywords for Copa 2026 schedule intent | `/Users/paulopierrondi/Downloads/fifa2026bolao/docs/marketing/campaigns/guia-2026-paid-growth`; [[02_Projects/fifa2026bolao]] | yes | open |
| 2026-05-15 | Guia 2026 | Creative / tracking | Draft static/video assets generated and no-SDK local event hooks implemented | Use generated assets for review; connect a provider later through `guia2026:analytics` only after App Privacy labels are updated for any SDK/device identifier collection | `/Users/paulopierrondi/Downloads/fifa2026bolao/artifacts/marketing/guia-2026-paid-growth`; `/Users/paulopierrondi/Downloads/fifa2026bolao/docs/marketing/campaigns/guia-2026-paid-growth/tracking-implementation.md` | yes for provider/paid launch | open |
| 2026-05-15 | Guia 2026 | App Store Connect | ASC API confirms version `1.0` is `WAITING_FOR_REVIEW`; `appleId` is null, so no public App Store URL yet | Wait for review result before Apple Ads/public launch; do not cancel/replace build unless explicitly deciding to resubmit | `/Users/paulopierrondi/Downloads/fifa2026bolao/artifacts/marketing/guia-2026-paid-growth/status/app-store-connect-status.json` | yes | open |
| 2026-05-15 | Bandle BR | App Store Connect / TikTok | App submitted for review; game type needs retention/share proof before paid scaling | Wait for Apple decision, then test organic daily challenge creatives before paid spend | [[02_Projects/bandle-br]]; [[04_Areas/Marketing/Apple Connect Ready Apps Campaign Matrix]] | yes | open |
| 2026-05-15 | Parabens IA BR | App Store Connect / Meta / TikTok | Corrected build is `VALID`, but rejection thread remains unresolved | Resolve ASC rejection/resubmit before any campaign; later use BR event-based output creatives | [[02_Projects/parabens-ai-br]]; [[04_Areas/Marketing/Apple Connect Ready Apps Campaign Matrix]] | yes | open |
| 2026-05-15 | FaithSchool / Muse Edit / InvestCoach.AI / CantuStudio | Creative production | Campaign package created for active Apple Ads apps | Capture app screen recordings, export Apple Ads install/CR data, then render first UGC-style videos through existing video pipeline | `/Users/paulopierrondi/Downloads/pierrondi-ia/docs/marketing/campaigns/ios-ready-apps-paid-growth`; [[04_Areas/Marketing/Ready App Campaign Factory Procedure]] | yes | open |
| 2026-05-15 | Muse Edit | TikTok / Meta / Apple Ads | Ready App Campaign Factory package created locally for the app | Capture current iPhone screen recordings, confirm paid-growth events, export Apple Ads delivery/conversio
...[truncated]

## 99_System/Security And Secrets Policy.md

---
type: policy
tags:
  - security
  - secrets
  - second-brain
---
# Security And Secrets Policy

## Regra principal

O vault e o lugar para memoria, inventario e decisoes. O vault nao e cofre de segredo.

## Permitido no vault

- Nome de env var.
- Nome do fornecedor.
- Projeto que usa a chave.
- Ambiente: local, staging, prod.
- Local onde o valor real esta guardado.
- Data de criacao/rotacao.
- Dono/responsavel.
- Escopo/permissao da chave.
- Procedimento de revogacao.

## Proibido no vault

- Valores reais de API keys.
- Tokens de acesso ou refresh tokens.
- Senhas.
- Cookies.
- Private keys.
- Service account JSON.
- Certificados privados.
- Arquivos `.env` completos.
- Screenshots que mostrem credenciais.

## Padrao para projetos

- `.env.local` para desenvolvimento local e fora do Git.
- `.env.example` com nomes e valores falsos.
- Secret manager/provider env vars para producao.
- GitHub Actions Secrets para CI.
- Nunca passar segredo para LLM quando nao for estritamente necessario.

## Quando uma key vaza

1. Revogar imediatamente no fornecedor.
2. Criar nova key com permissao minima.
3. Atualizar secret manager/provider.
4. Rodar testes/deploy necessario.
5. Registrar incidente na nota do projeto sem repetir a key.
6. Procurar e remover vazamento em logs/commits se aplicavel.

## Links

- [[04_Areas/Coding/Checklists/Secrets And API Keys Register]]
- [[04_Areas/Coding/Checklists/Railway Secrets Inventory]]
- [[04_Areas/Coding/Checklists/Security Checklist]]
- [[04_Areas/Coding/Checklists/Project Checklist Hub]]


## Project Note Snapshot

---
type: project
repo_name: "pierrondi-site"
repo_path: "/Users/paulopierrondi/Downloads/pierrondi-site"
repo_kind: "repo"
branch: "main"
dirty_files: 5
remote: "https://github.com/paulopierrondi/pierrondi-site.git"
generated_at: "2026-05-16 09:06:49"
tags:
  - project
  - git
---
# pierrondi-site

## Estado rapido

- Path: `/Users/paulopierrondi/Downloads/pierrondi-site`
- Tipo: `node`
- Repo kind: `repo`
- Branch: `main`
- Arquivos alterados agora: `5`
- Ultimo commit: `58845c0 2026-05-15 docs(deploy): DNS executed — www CNAME live, apex 301 forwarding`
- Remote: `https://github.com/paulopierrondi/pierrondi-site.git`
- Marcadores encontrados: `package.json, README.md, CLAUDE.md, AGENTS.md, GEMINI.md`

## Links do vault

- Indice de projetos: [[02_Projects/Projects Index]]
- Mapa de projetos: [[07_MOCs/Projects MOC]]
- Historico AI deste projeto: [[03_AI-Chats/Projects/pierrondi-site - AI History]]
- Mapa de agentes: [[07_MOCs/AI Agents MOC]]
- Politica dos agentes: [[99_System/AI Agent Vault Policy]]
- Linear/Git tracking: [[04_Areas/Coding/Linear/Linear Git Development Tracking OS]]
- Linear project map: [[04_Areas/Coding/Linear/Linear Project Map]]

## Contexto importado do README

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
| Analytics | Plausible (opcional, via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)
...[truncated]

## Decisoes e estado vivo

- Use esta nota para manter o estado atual do projeto, decisoes abertas, comandos canonicos e riscos.
- As sessoes locais de Codex, Claude Code, Kimi e Gemini foram indexadas no vault quando estavam disponiveis em disco.

## AI History Snapshot

# pierrondi-site - AI History

Projeto: [[02_Projects/pierrondi-site|pierrondi-site]]

- Path: `/Users/paulopierrondi/Downloads/pierrondi-site`
- Codex relacionado: `0`
- Claude Code relacionado: `0`
- Kimi relacionado: `0`
- Claude-Mem observations relacionadas: `31`
- Claude-Mem summaries relacionados: `0`

## Codex

_Nenhuma sessao Codex relacionada encontrada._

## Claude Code

_Nenhuma sessao Claude Code relacionada encontrada._

## Kimi

_Nenhuma sessao Kimi relacionada encontrada._

## Claude-Mem

| Criado | Tipo | Titulo | Resumo |
| --- | --- | --- | --- |
| 2026-05-16T06:37:20.931Z | feature | Pierrondi.ia Split Into pierrondi-site and pierrondi-os — Site Live at www.pierrondi.dev | ["`pierrondi-site` repo created at `github.com/paulopierrondi/pierrondi-site`; local path `/Users/paulopierrondi/Downloads/pierrondi-site`; 29 static + 4 dynamic routes; Railway Project ID `9caba826-e5fd-46 ...[truncated] |
| 2026-05-15T22:53:46.907Z | feature | pierrondi.dev Custom Domain Claimed on Railway pierrondi-site Service via GraphQL | ["customDomainCreate mutation returned id=3ce7ff04-94b5-4b34-8f0d-95adbd997bf9 for domain pierrondi.dev","Railway requires CNAME record: pierrondi.dev → u6uq927c.up.railway.app (new target, different from w ...[truncated] |
| 2026-05-15T22:53:34.353Z | discovery | pierrondi-site Railway Project IDs Extracted for Domain Split GraphQL Mutation | ["pierrondi-site Railway project_id: 9caba826-e5fd-4654-9a0d-1841e6022b11","pierrondi-site Railway env_id: d5d16496-0bcb-4214-8016-f704e5e1f495 (production)","pierrondi-site Railway service_id: 626d8614-191 ...[truncated] |
| 2026-05-15T22:34:14.849Z | decision | pierrondi-ia Monorepo Split — pierrondi-site (public) + pierrondi-os (Marketing OS) | ["pierrondi-ia (570k lines, 54 migrations, Video Factory, Jarvis, 5 social connectors) was split into two independent repos on 2026-05-15","pierrondi-site: public repo at paulopierrondi/pierrondi-site, loca ...[truncated] |
| 2026-05-15T22:33:56.051Z | change | pierrondi-site DEPLOY.md Committed and Pushed — commit 31829e2 | ["Commit 31829e2 pushed to origin/main on github.com/paulopierrondi/pierrondi-site","Smoke test confirmed: 18/18 public routes return 200, /api/contact honeypot working at deploy time","Branch main now trac ...[truncated] |
| 2026-05-15T22:33:45.702Z | feature | pierrondi-site DEPLOY.md Created — Full Infra Runbook for Split Deployment | ["pierrondi-site is live at https://pierrondi-site-production.up.railway.app (~0.9s cold start, 200 OK)","Railway Project ID: 9caba826-e5fd-4654-9a0d-1841e6022b11 — Service ID: 626d8614-191d-43e4-a7fe-c7470 ...[truncated] |
| 2026-05-15T21:48:33.146Z | discovery | CLAUDE.md Still 568 Lines of OS-Era Agent Instructions — Needs Rewrite for pierrondi-site | ["CLAUDE.md is 568 lines total — contains full OS-era agent instructions for Marketing OS, studio, Jarvis, video factory, etc.","CLAUDE.md title is \"# CLAUDE.md — Pierrondi.ia\" — references old branding", ...[truncated] |
| 2026-05-15T21:48:13.727Z | feature | pierrondi-site README.md Rewritten — 218→56 Lines, PT-BR, Split Context Documented | ["README.md rewritten from 218 lines to 56 lines — name changed from \"Pierrondi.ia\" to \"pierrondi-site\"","Added split context: \"Marketing OS interno vive em pierrondi-os. Esse split foi feito em 2026-0 ...[truncated] |
| 2026-05-15T21:48:09.786Z | discovery | README.md Still References Pierrondi.ia and Marketing OS — Must Be Rewritten for pierrondi-site | ["README.md title is \"# Pierrondi.ia\" — should be \"# pierrondi-site\"","README.md references `docs/marketing-os/repo-truth.md` which was deleted from pierrondi-site","README.md is 218 lines total with OS ...[truncated] |
| 2026-05-15T21:47:58.863Z | feature | pierrondi-site package-lock.json Deleted — Public Assets Final State Confirmed Clean | ["package-lock.json deleted — was 703KB from the OS repo; will be regenerated fresh by `npm install` with the cleaned package.json","public/ confirmed final state: file.svg, globe.svg, next.svg, vercel.svg, ...[truncated] |
| 2026-05-15T21:47:47.883Z | feature | pierrondi-site Final Cleanup Complete — 7.3MB, CI-Only Workflows, All Public Routes Confirmed Clean | ["assets/fonts/ (DejaVuSans) deleted — confirmed zero imports in app/components/lib via grep",".github/workflows/ now contains only ci.yml — claude.yml and cron-scheduler-docker.yml deleted","pierrondi-site ...[truncated] |
| 2026-05-15T21:47:24.482Z | feature | pierrondi-site GitHub Workflows Audited — cron-scheduler-docker.yml to Remove; assets Finalized at 1.4MB | [".gitignore cleaned from 31 to 15 lines — removed local-agent/dist/, .claude/*, .superpowers/, /agents/, /plugins/, image*.png, pierrondi-ia-completo.zip, /assets/video-backgrounds/*, .tmp-tiktok/; added o ...[truncated] |
| 2026-05-15T21:47:09.391Z | feature | pierrondi-site .dockerignore Cleaned — Removed infra/openclaw/local-agent Sibling Package References | [".dockerignore removed: docs/, local-agent, infra/dev-agent-bridge, infra/openclaw, infra/evolution-api sibling package entries","Removed the comment warning about assets/creatives and assets/video-backgro ...[truncated] |
| 2026-05-15T21:46:52.838Z | feature | pierrondi-site All Deploy Configs Cleaned — .env.example 218→12 Lines, nixpacks ffmpeg Removed | [".env.example reduced from 218 lines to 12 lines — contains only 3 env vars: FORMSPREE_URL, NEXT_PUBLIC_PLAUSIBLE_DOMAIN, NEXT_PUBLIC_SITE_URL","Removed from .env.example: DATABASE_URL, all AUTH_* vars, ST ...[truncated] |
| 2026-05-15T21:46:38.367Z | feature | pierrondi-site All Config Files Cleaned — eslint, next.config, tsconfig Stripped of OS-Tier References | ["eslint.config.mjs: removed worktree/local-agent/jarvis/scripts ignores — globalIgnores now has only 6 standard Next.js entries","tsconfig.json exclude list reduced from 11 entries to 1: `[\"node_modules\" ...[truncated] |
| 2026-05-15T21:46:18.048Z | feature | next.config.ts Cleaned — ffmpeg Tracing and Sentry CSP Removed from pierrondi-site | ["Removed from next.config.ts: FFMPEG_BINARY_GLOBS array, FFMPEG_TRACED_ROUTES array (16 routes), outputFileTracingIncludes, serverExternalPackages for ffmpeg-static/ffprobe-static","CSP connect-src simplif ...[truncated] |
| 2026-05-15T21:46:00.945Z | feature | pierrondi-site package.json Rewritten — 25 Deps Removed, Build Script Simplified | ["Package name changed from `pierrondi-ia` to `pierrondi-site`","Dependencies removed: @anthropic-ai/sdk, @assistant-ui/react, @auth/drizzle-adapter, @google/genai, @sentry/nextjs, drizzle-orm, ffmpeg-stati ...[truncated] |
| 2026-05-15T21:45:49.389Z | feature | pierrondi-site lib/ Cleaned to 6 Files — Tasks 1-3 Complete, Package.json Cleanup Starting | ["lib/logger.ts, lib/http/, lib/hooks/ deleted — confirmed zero imports in app/ and components/","lib/ now contains only: analytics.ts, animations/, i18n/, site.ts, utils/, utils.ts — all actively used","li ...[truncated] |
| 2026-05-15T21:45:30.873Z | discovery | pierrondi-site Final Lib D
...[truncated]
