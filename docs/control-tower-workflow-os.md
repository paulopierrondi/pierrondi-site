# Control Tower Workflow OS

Data: 2026-05-27
Escopo: consolidar automacoes e agentes em workflows escalaveis, previsiveis e com LLM no contexto operacional.

## Tese

LaunchAgents, cron jobs e automacoes soltas devem virar workflows versionados. O LLM nao deve ser o orquestrador central. O LLM deve ser uma etapa controlada dentro de um workflow, com contrato de entrada/saida, contexto rastreavel, custo, modelo, fallback e evidencia.

## Principio arquitetural

```text
Agent Hub = fonte de verdade operacional
Workflow Engine = execucao duravel
LLM Gateway = modelo, custo, fallback e cache
Control Tower = decisao visual e auditoria
Obsidian/Linear/Git = memoria, produto e codigo
```

## Modelo de workflow

Todo workflow deve ter estes campos:

| Campo | Regra |
|---|---|
| `workflow_id` | Estavel, sem espacos. Ex: `repo_hygiene_daily` |
| `owner` | Pessoa/superficie responsavel. Ex: `Codex`, `Ops Health` |
| `trigger` | Manual, cron, webhook, file-watch, Linear, GitHub |
| `risk_tier` | `read_only`, `workspace_write`, `external_write`, `production` |
| `human_gate` | Obrigatorio para producao, ads, App Store, Git push/merge, secrets, bulk Linear |
| `inputs` | Fontes declaradas: Agent Hub, Git, Linear, Obsidian, logs |
| `steps` | Etapas deterministicas + etapas LLM tipadas |
| `outputs` | JSON, Markdown, Linear comment, email, screenshot, report |
| `retry_policy` | Quantidade, backoff e idempotencia |
| `timeout` | Limite por etapa e total |
| `evidence` | Logs, screenshots, diff, testes, links |
| `kill_switch` | Como pausar workflow, familia ou toda a operacao |

## Etapas LLM como objetos tipados

Uma chamada LLM nunca deve ser “texto solto”. Ela deve ser um `llm_task` com contrato.

```json
{
  "type": "llm_task",
  "id": "classify_repo_risk",
  "purpose": "Classificar risco de worktree dirty",
  "model_tier": "cheap",
  "allowed_models": ["kimi", "gpt-5-mini", "claude-haiku"],
  "context_refs": [
    "agent_hub.registry.projects",
    "git.status.summary",
    "obsidian.project_note"
  ],
  "prompt_cache_key": "repo-risk-v1",
  "max_tokens": 1200,
  "temperature": 0.1,
  "output_schema": {
    "repo": "string",
    "risk": "low|medium|high|blocked",
    "recommended_action": "wip_commit|stash|worktree|ask_paulo|ignore",
    "rationale": "string"
  },
  "fallback": "deterministic_rules",
  "human_gate_if": ["recommended_action == ask_paulo", "risk == high"]
}
```

## Contexto LLM no Control Tower

O Control Tower deve mostrar LLM em quatro niveis:

| Nivel | O que mostrar | Decisao que suporta |
|---|---|---|
| Runtime | CLI disponivel, processos ativos, ultimo sinal | O modelo/agente esta funcionando? |
| Custo | tokens, cache hit, custo estimado por workflow | O workflow esta caro demais? |
| Qualidade | schema validado, retries, falhas de parsing | O LLM esta confiavel para esta tarefa? |
| Risco | contexto sensivel, secrets blocked, human gate | Pode executar sozinho ou precisa Paulo? |

## Tipos de workflow recomendados

### 1. `repo_hygiene_daily`

- Trigger: diario ou manual.
- Entrada: Git status de todos os repos, registry, Linear map.
- LLM: classifica risco e sugere acao.
- Saida: Control Tower P0/P1/P2 + Markdown.
- Gate: qualquer push/merge exige comando explicito.

### 2. `automation_health_hourly`

- Trigger: horario.
- Entrada: logs de LaunchAgents, Codex automations, session journals.
- LLM: resume causas provaveis apenas depois de parser deterministico detectar falha.
- Saida: lista de falhas, owner, retry, proxima acao.
- Gate: pausar/alterar LaunchAgent exige aprovacao quando impactar rotina critica.

### 3. `handoff_stale_sweeper`

- Trigger: diario.
- Entrada: handoffs, journals, Linear, Obsidian.
- LLM: transforma handoff stale em decisao: fechar, reativar, converter em backlog.
- Saida: Control Tower + nota de projeto.
- Gate: bulk Linear proibido sem proposta aprovada.

### 4. `agent_activation_gate`

- Trigger: manual quando agente proposto quer virar ativo.
- Entrada: spec do agente, riscos, ferramentas, custos, human gates.
- LLM: calcula scorecard e aponta gaps.
- Saida: `APPROVE`, `REWORK`, `BLOCK`.
- Gate: nenhum agente novo entra ativo com score < 70.

### 5. `llm_cost_quality_daily`

- Trigger: diario.
- Entrada: LiteLLM/Langfuse ou logs locais quando gateway ainda nao existir.
- LLM: recomenda model tiering e prompt caching.
- Saida: custo por workflow, cache strategy, anomalias.
- Gate: trocar modelo de workflow critico exige validação.

## Escalabilidade

Para escalar sem perder previsibilidade:

1. Comecar com 5 workflows criticos, nao migrar 93 LaunchAgents de uma vez.
2. Cada workflow precisa ser idempotente.
3. Cada etapa grava estado antes e depois.
4. LLM so entra depois de parser deterministico preparar contexto.
5. Toda saida LLM passa por schema validation.
6. Falha de LLM nao derruba workflow inteiro se houver fallback.
7. Control Tower mostra estado por workflow, nao apenas por agente.

## Previsibilidade

Um workflow previsivel tem:

- estado persistido;
- retry com backoff;
- timeout;
- input/output schema;
- logs estruturados;
- correlation id;
- human gates executaveis;
- custo estimado;
- evidencia final;
- email final quando for automacao.

## Roadmap recomendado

### V0 - agora

- `/control_tower` mostra baseline + snapshot vivo.
- Adicionar bloco visual `LLM Context`.
- Criar JSON schema de workflow.
- Definir os 5 workflows criticos.

### V1 - 1 a 2 semanas

- Gerador local cria `control_tower_snapshot.json` com:
  - workflows;
  - LLM runtime;
  - automacoes;
  - Git hygiene;
  - handoffs.
- Control Tower passa a renderizar workflow status.

### V2 - 3 a 6 semanas

- Introduzir LiteLLM para tags, custo, fallback e caching.
- Introduzir Langfuse ou tracing equivalente.
- Migrar `automation_health_hourly` e `repo_hygiene_daily` para runner duravel.

### V3 - 8 a 12 semanas

- Consolidar LaunchAgents criticos em Prefect ou Temporal.
- Scorecard de agentes vira gate automatico.
- Kill switch por workflow, familia e operacao.

## Decisao recomendada

Usar o Control Tower como cockpit visual e o Agent Hub como fonte operacional. O workflow engine entra como executor duravel. O LLM entra como etapa auditavel, nunca como dono invisivel do processo.
