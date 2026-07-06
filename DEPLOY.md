# Deploy — pierrondi-site

Site oficial em produção: **https://www.pierrondi.dev**  
Railway service URL: **https://pierrondi-site-production.up.railway.app**

`pierrondi.dev` / `www.pierrondi.dev` é Railway. Vercel não é produção canônica deste site; qualquer alias Vercel remanescente é legado e não deve orientar operação, QA, SEO ou Linear.

## Infra

| Item | Valor |
|---|---|
| Plataforma | Railway |
| Project | `pierrondi-site` (`9caba826-e5fd-4654-9a0d-1841e6022b11`) |
| Service | `pierrondi-site` (`626d8614-191d-43e4-a7fe-c74702c9e461`) |
| Source repo | https://github.com/paulopierrondi/pierrondi-site |
| Branch | `main` |
| Build | Nixpacks (`nixpacks.toml`) — `npm ci → npm run build` |
| Runtime | Node 22 LTS |
| Start command | `npm run start` (= `next start -p $PORT`) |
| Resposta home | ~0.9s cold, 200 OK |

## Env vars (já setadas via `railway add`)

```
FORMSPREE_URL=https://formspree.io/f/xpqoodnr
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/xpqoodnr
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=pierrondi.dev
NEXT_PUBLIC_SITE_URL=https://pierrondi.dev
```

Sem secrets, sem banco, sem auth. Se mudar o endpoint Formspree, atualize as duas vars (server-side `FORMSPREE_URL` e client-side `NEXT_PUBLIC_FORMSPREE_URL`).

## Custom domain — estado atual (2026-05-15 23:00 UTC)

DNS na GoDaddy, registrar `pierrondi.dev`. Configuração final:

| Domínio | Tipo | DNS | Aponta pra |
|---|---|---|---|
| `pierrondi.dev` (apex) | GoDaddy Forwarding 301 | Auto (GoDaddy DPS) | `https://www.pierrondi.dev` |
| `www.pierrondi.dev` | CNAME | `n4n21jzb.up.railway.app` | Railway service `pierrondi-site` |

**Por que forwarding no apex?** GoDaddy DNS não suporta CNAME no apex (RFC violation), e Railway só aceita CNAME (sem A record estável). Forwarding 301 da GoDaddy resolve isso sem migrar DNS.

**Custom domain claimed no Railway:**
- `www.pierrondi.dev` → service `pierrondi-site` (project `9caba826-e5fd-4654-9a0d-1841e6022b11`, env `d5d16496-0bcb-4214-8016-f704e5e1f495`, customDomainId `4069e4c5-d2a0-475d-961b-b9827bc8c5a1`)

**Cert TLS:** Railway provisiona automático após DNS validar (5-15min).

Para mover www pra outro serviço Railway no futuro, use o GraphQL: `customDomainDelete` no antigo + `customDomainCreate` no novo, pegue o novo CNAME target, atualize na GoDaddy DNS.

## Smoke test pós-deploy

```bash
# Health + home
curl -fsS https://pierrondi-site-production.up.railway.app/api/health
curl -fsS -o /dev/null -w "%{http_code}\n" https://pierrondi-site-production.up.railway.app/

# Todas as rotas públicas
for url in / /automacoes /produto-digital /tech-partner /precos /sobre /faq \
           /portfolio /blog /calculadora /termos /privacidade /obrigado /en \
           /sitemap.xml /feed.xml /og /api/health; do
  code=$(curl -fsS -o /dev/null -w "%{http_code}" \
    "https://pierrondi-site-production.up.railway.app${url}")
  printf "%-25s %s\n" "$url" "$code"
done

# Contact form (honeypot tripped — não envia ao Formspree)
curl -fsS -X POST -H "Content-Type: application/json" \
  -d '{"nome":"Test","email":"test@example.invalid","servico":"automacao","mensagem":"smoke","_gotcha":"bot"}' \
  https://pierrondi-site-production.up.railway.app/api/contact
```

Resultado esperado: todas 200, `/api/contact` retorna `{"ok":true}`.

## Re-deploy

⚠ **Service não está linkado ao GitHub auto-deploy.** Toda mudança no `main` exige `railway up` manual.

```bash
# Tudo-em-um (build + up + smoke poll)
bash scripts/redeploy.sh

# Se 'invalid_grant' / 'Unauthorized'
railway login                 # abre browser → autoriza → continua
bash scripts/redeploy.sh
```

Para habilitar auto-deploy via GitHub: Railway dashboard → service `pierrondi-site` → Settings → Source → Connect GitHub Repo → `paulopierrondi/pierrondi-site` → branch `main`. Uma vez feito, `git push origin main` deploya sozinho.

## Comandos úteis

```bash
# Status / logs
railway status
railway logs --service pierrondi-site                 # runtime logs
railway logs --service pierrondi-site --build         # build logs

# Re-deploy
railway up --ci --service pierrondi-site --detach

# Atualizar env var
railway variables --set "KEY=value" --service pierrondi-site

# Listar env vars
railway variables --service pierrondi-site
```

## Rollback

```bash
# Lista deployments
railway service                                       # interactive picker
# Painel: Service → Deployments → escolha um → "Redeploy" / "Rollback"
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) roda em todo push/PR pra main:
- `npm ci`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

Railway não tem CI integrado próprio — o gate de qualidade é o GitHub Actions. **Atenção: o deploy NÃO é automático.** O service não está linkado ao GitHub (ver seção Re-deploy): merge em `main` não muda produção até alguém rodar `bash scripts/redeploy.sh` (`railway up`) manualmente, com aprovação explícita do Paulo.

## Pendências de rede

- [x] Apontar DNS `www.pierrondi.dev` → CNAME `n4n21jzb.up.railway.app` (GoDaddy) — feito 2026-05-15
- [x] Apex `pierrondi.dev` → Forwarding 301 → `https://www.pierrondi.dev` (GoDaddy Encaminhamento) — feito 2026-05-15
- [x] Custom domain `www.pierrondi.dev` adicionado no Railway service `pierrondi-site` — feito 2026-05-15
- [x] TXT `_railway-verify.www` atualizado pro novo token Railway — feito 2026-05-16
- [x] Cert TLS Let's Encrypt provisionado pra `www.pierrondi.dev` — feito 2026-05-16 (CN=www.pierrondi.dev, issuer Let's Encrypt E7)
- [x] Smoke test pos-cert: apex 301 → www 200, 18/18 rotas 200, contact API 200 — feito 2026-05-16
- [ ] Atualizar Plausible: criar site `pierrondi.dev` no painel Plausible (se ainda não existe). A env `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` já está setada e pierrondi.dev resolvendo via 301 → www.
- [ ] Renomear serviço Railway antigo (linkado ao `pierrondi-ia`/`pierrondi-os`) pra refletir o novo nome — manualmente no painel.
