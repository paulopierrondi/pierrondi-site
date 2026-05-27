# Cursor Background Agent

This repo has dormant Cursor Background Agent configuration.

Paulo is not opening Cursor for now. Route active background work to Codex, Claude Code, Kimi CLI, Gemini CLI and Google Antigravity.

## Required Prompt

```text
Work on Linear issue AGE-XXXX / task: <description>.

Read AGENTS.md, CODEX_RULES.md, .brain/PROJECT_CONTEXT.md, .brain/HUB_COUNCIL_CONTEXT.md and .brain/CURSOR_BACKGROUND_AGENT_CONTEXT.md before editing.

Create a focused branch named cursor/AGE-XXXX-<slug>.
Keep the change small and reversible.
Do not touch secrets, env files, production deploys, App Store submission, paid campaigns, migrations or unrelated files.
Run the relevant lint/test/build commands from package.json or repo docs.
Update or add tests when production code changes.
Final response must include files changed, commands run, residual risks and the exact Obsidian/Linear update that the local operator should apply.
```

## Registry

- Registry id: `pierrondi-site`
- Linear hint: `pierrondi.dev Public Site (AGE-1486)`
- Obsidian note: `02_Projects/pierrondi-site`

## Local Handoff

Cursor Background Agent does not close the loop and is dormant by default. Codex, Claude Code, Gemini CLI, Google Antigravity or Paulo must review any branch/PR, run local validation when needed and update Obsidian/Linear.
