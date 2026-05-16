

<!-- OBSIDIAN_SECOND_BRAIN_START -->
# Obsidian Second Brain - Required Preflight

Primary vault: `/Users/paulopierrondi/Documents/Obsidian Vault`
Repository: `/Users/paulopierrondi/Downloads/pierrondi-site`

This repository is part of Paulo's Obsidian second brain. For AI coding agents, this is a required workflow, not optional context.

## User Profile Snapshot

- Paulo is a ServiceNow Technical Account Executive focused on Banco Bradesco / FSI Brazil, with side projects, family and faith as important context.
- Style: direct, executive, dense, structured, copy-paste ready, no fluff or motivational tone; PT-BR for Brazil-facing content; honest analytical pushback is welcome.
- For ServiceNow/Bradesco/Now Assist/CSDM/deck/roadmap work, read the Paulo profile and keep terminology precise.

## Mandatory Start Gate

Before planning, editing, refactoring, reviewing, or debugging:
- Read `/Users/paulopierrondi/Documents/Obsidian Vault/Home.md` when the local vault is accessible.
- Read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Profile/Paulo Pierrondi Profile.md` for Paulo's professional/personal context, response style, ServiceNow/Bradesco context and current priorities.
- Read `/Users/paulopierrondi/Documents/Obsidian Vault/02_Projects/Projects Index.md` and the matching project note under `/Users/paulopierrondi/Documents/Obsidian Vault/02_Projects`.
- Read `/Users/paulopierrondi/Documents/Obsidian Vault/03_AI-Chats/AI Chats Index.md` and any matching project AI history note when relevant.
- Read `/Users/paulopierrondi/Documents/Obsidian Vault/99_System/AI Agent Vault Policy.md`.
- Run `brain-linear-sync` or read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Linear/Linear Git Sync Report.md` before choosing work.
- For roadmap, bug, status, priority, release or planning work, read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Linear/Linear Git Development Tracking OS.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Linear/Linear Project Map.md`, and the matching Linear project/issue through the Linear connector when available.
- Read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Checklists/Project Checklist Hub.md` and the relevant frontend/backend/platform/AI/security checklists.
- Read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Best Practices/Development Best Practices Hub.md` and the relevant platform best-practice notes.
- For product, monetization, app ideas, revenue, pricing, growth or side-project prioritization, read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Product/Product Revenue MOC.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Product/Nightly Opportunity Engine.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Product/App Ideas Revenue Backlog.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Product/App Refinement Backlog.md`, and `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Product/Nightly Opportunity Report.md`.
- For app, site, UI, visual flow, screenshot, iOS, Android or store work, read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Best Practices/App Web Quality Best Practices.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Checklists/App Web Preflight Checklist.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Checklists/Screenshots Visual QA Checklist.md`, and the relevant web/iOS/Android preflight.
- For iOS/App Store Connect/TestFlight/signing/IAP/APNS work, read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Checklists/Apple Developer And App Store Connect Inventory.md` and `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Checklists/App Store Connect Upload Runbook.md` before asking for IDs, keys, CI values, provider env vars or running an upload.
- For marketing creative, social video, ElevenLabs, subtitles, LinkedIn, Shorts, TikTok, Instagram/Reels or pierrondi.dev work, read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/Marketing MOC.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/Pierrondi.dev Creative Video OS.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/ElevenLabs Voice And Subtitle Workflow.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/Social Video Platform Specs 2026.md`, and `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/Creative QA Checklist.md`.
- For Apple Ads / ASA, App Store paid acquisition, ASO, CPP, paid campaigns or app marketing tuning, read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/App Marketing Intelligence OS.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/Apple Ads ASA Tuning Runbook.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/App Marketing Metrics Inventory.md`, `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/App Marketing Daily Tuning Report.md`, and `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Marketing/App Marketing Tuning Backlog.md`.
- Read `/Users/paulopierrondi/Documents/Obsidian Vault/99_System/Security And Secrets Policy.md` before touching auth, APIs, env vars, API keys, tokens, deploy or production config.
- For Railway projects, read `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Checklists/Railway Secrets Inventory.md` and use `brain-railway-run -- <command>` instead of asking Paulo to paste secrets.
- Read `.brain/PROJECT_CONTEXT.md` if present. In cloud environments, treat `.brain/PROJECT_CONTEXT.md` and `.brain/CLAUDE_CLOUD_CONTEXT.md` as the available vault snapshot.

## Mandatory Finish Gate

After meaningful work:
- Update the matching Obsidian project note with decisions, commands, files changed, risks, deploy state, and next steps.
- Update Linear when issue reality changes; do not bulk-close/archive/relabel without a cleanup proposal.
- If the local vault is not accessible, update `.brain/SESSION_NOTES.md` with the durable project knowledge that should later be synced back to Obsidian.
- Never write secrets to Markdown. Redact API keys, tokens, passwords, cookies, OAuth credentials, private keys, and production secrets.
- API keys belong in a secret manager or provider env vars. The vault stores only inventory: env var name, provider, scope, storage location, owner and rotation date.
- If the session reveals a reusable development lesson, append it to `/Users/paulopierrondi/Documents/Obsidian Vault/04_Areas/Coding/Best Practices/Learning Inbox.md` or run `brain-learn`.

## Behavior

Continue from the latest reliable project memory. Do not repeat old work, ignore known decisions, or start implementation without checking the project brain first.
<!-- OBSIDIAN_SECOND_BRAIN_END -->
