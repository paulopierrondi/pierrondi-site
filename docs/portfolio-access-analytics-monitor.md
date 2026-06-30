# Portfolio Access And Analytics Monitor

This monitor lives in `scripts/access-snapshot.mjs` and is called by:

```bash
npm run access:snapshot -- --since 1h --limit 500
```

It returns two layers:

- `sources[]`: provider request logs from Railway/Vercel. This is useful for uptime, bots, AI crawlers, 4xx/5xx, and rough traffic movement.
- `analytics.sources[]`: best-effort Plausible, GA4 Data API, and Google Search Console probes. This is the layer needed for users, sessions, pageviews, search clicks, impressions, CTR, and average position.

## Required Secure Config

Use the secure environment provider, not Markdown, commits, screenshots, Linear comments, or chat.

### Google GA4 and Search Console

The monitor accepts one Google read-only auth path:

- `GOOGLE_APPLICATION_CREDENTIALS`: path to a service account JSON file.
- `GOOGLE_SERVICE_ACCOUNT_JSON`: raw service account JSON in a secure env provider.
- `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`: base64 service account JSON in a secure env provider.
- `GOOGLE_ACCESS_TOKEN`, `GOOGLE_API_ACCESS_TOKEN`, `GSC_ACCESS_TOKEN`, or `GA4_ACCESS_TOKEN`: short-lived token when intentionally injected by a wrapper.
- `gcloud auth application-default print-access-token`: works after local ADC login with readonly scopes.

Recommended ADC command:

```bash
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters.readonly
```

GA4 needs numeric property IDs, not public `G-...` measurement IDs:

- `PIERRONDI_GA4_PROPERTY_ID`
- `CANTUSTUDIO_GA4_PROPERTY_ID`
- `AGENTICOSCORE_GA4_PROPERTY_ID` or `AGENTCORE_GA4_PROPERTY_ID`
- `FAITHSCHOOL_GA4_PROPERTY_ID`

Search Console defaults:

- `sc-domain:pierrondi.dev`
- `sc-domain:cantustudio.app`
- `sc-domain:agenticoscore.ai`
- `sc-domain:faithschool.app`

Override when needed with:

- `PIERRONDI_GSC_SITE_URL`
- `CANTUSTUDIO_GSC_SITE_URL`
- `AGENTICOSCORE_GSC_SITE_URL` or `AGENTCORE_GSC_SITE_URL`
- `FAITHSCHOOL_GSC_SITE_URL`

The service account or ADC user must have access to each GA4 property and Search Console property.

### Plausible

Token:

- `PLAUSIBLE_API_KEY`, `PLAUSIBLE_TOKEN`, or `PLAUSIBLE_AUTH_TOKEN`
- product-specific variants such as `PIERRONDI_PLAUSIBLE_API_KEY`

Site IDs default to:

- `pierrondi.dev`
- `cantustudio.app`
- `agenticoscore.ai`
- `faithschool.app`

Override with:

- `PIERRONDI_PLAUSIBLE_SITE_ID`
- `CANTUSTUDIO_PLAUSIBLE_SITE_ID`
- `AGENTICOSCORE_PLAUSIBLE_SITE_ID`
- `FAITHSCHOOL_PLAUSIBLE_SITE_ID`

## Search Console CSV Fallback

If API access is blocked, the monitor reads the newest CSV from:

- `/Users/paulopierrondi/Documents/Obsidian Vault/98_Attachments/marketing-data/search-console/pierrondi`
- `/Users/paulopierrondi/Documents/Obsidian Vault/98_Attachments/marketing-data/search-console/cantustudio`
- `/Users/paulopierrondi/Documents/Obsidian Vault/98_Attachments/marketing-data/search-console/agentcore`
- `/Users/paulopierrondi/Documents/Obsidian Vault/98_Attachments/marketing-data/search-console/faithschool`

CSV exports should include query/page, clicks, impressions, CTR, and position columns.

## Guardrails

- Read-only only.
- No ads, deploy, DNS, provider env mutation, budget, bid, tags, Git branch mutation, or production config mutation.
- Never print raw tokens, cookies, private keys, provider dumps, raw IPs, raw click IDs, or PII.
