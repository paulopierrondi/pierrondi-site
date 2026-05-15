# Deploy — pierrondi-site

Site em produção: **https://pierrondi-site-production.up.railway.app**

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

## Custom domain (passo manual — Railway CLI bloqueia, precisa do painel)

1. Abra o painel: https://railway.com/project/9caba826-e5fd-4654-9a0d-1841e6022b11
2. Service `pierrondi-site` → Settings → Networking → Custom Domain
3. Adicione **`pierrondi.dev`** (apex) e **`www.pierrondi.dev`**
4. Railway vai mostrar os registros DNS exatos. Tipicamente:
   - Apex `pierrondi.dev` → A record para IP do Railway OU CNAME se o provedor suporta ALIAS/ANAME
   - `www.pierrondi.dev` → CNAME → `pierrondi-site-production.up.railway.app`
5. Apontar DNS no registrar (Registro.br, Cloudflare, ou onde está). TTL 300s pra testar.
6. Aguardar propagação (5min–1h). Railway emite cert TLS automático após verificar.

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

Railway não tem CI integrado próprio — confia no GitHub Actions e re-deploya automaticamente quando `main` muda.

## Pendências de rede

- [ ] Apontar DNS `pierrondi.dev` apex pro Railway
- [ ] Apontar DNS `www.pierrondi.dev` CNAME pro Railway domain
- [ ] Adicionar ambos no painel Railway → certificado TLS automático
- [ ] Atualizar Plausible: criar site `pierrondi.dev` no painel Plausible (se ainda não existe). A env `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` já está setada, vai funcionar assim que o domínio resolver.
- [ ] Renomear serviço Railway antigo (linkado ao `pierrondi-ia`/`pierrondi-os`) pra refletir o novo nome — manualmente no painel.
