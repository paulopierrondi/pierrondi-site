# Portfolio Access And Analytics Monitor

This monitor lives in `scripts/access-snapshot.mjs` and is called by:

```bash
npm run access:snapshot -- --since 1h --limit 500
```

It returns two layers:

- `sources[]`: provider request logs from Railway/Vercel. This is useful for uptime, bots, AI crawlers, 4xx/5xx, and rough traffic movement.
- `analytics.sources[]`: best-effort Plausible, GA4 Data API, and Google Search Console probes. This is the layer needed for users, sessions, pageviews, search clicks, impressions, CTR, and average position.
- `actionBoard`: a consolidated next-action board built from source logs plus analytics blockers. It highlights commercial demand, conversion-path demand, GEO discovery, AI crawler visits, broken URLs, and missing GA4/Search Console/Plausible access.

Each source also includes `intent` and `opportunities`:

- `intent.commercialRequests`: visits to product/sales/authority pages.
- `intent.conversionRequests`: visits to lead, scorecard, checkout, signup, pricing or contact paths.
- `intent.geoRequests`: visits to answer-engine surfaces such as `answers`, `answers.json`, `llms.txt`, `sitemap.xml`, and `robots.txt`.
- `intent.topAiCrawlerPaths`: paths reached by known AI crawlers.
- `intent.topErrorPaths`: recent 4xx/5xx paths to fix or redirect.

## Required Secure Config

Use the secure environment provider, not Markdown, commits, screenshots, Linear comments, or chat.

### Google GA4 and Search Console

The monitor accepts one Google read-only auth path:

- `PORTFOLIO_GOOGLE_APPLICATION_CREDENTIALS`: portfolio-specific path to a service account JSON file.
- `PORTFOLIO_GOOGLE_SERVICE_ACCOUNT_JSON`: portfolio-specific raw service account JSON in a secure env provider.
- `PORTFOLIO_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`: portfolio-specific base64 service account JSON in a secure env provider.
- `GOOGLE_APPLICATION_CREDENTIALS`: path to a service account JSON file.
- `GOOGLE_SERVICE_ACCOUNT_JSON`: raw service account JSON in a secure env provider.
- `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`: base64 service account JSON in a secure env provider.
- `GOOGLE_ACCESS_TOKEN`, `GOOGLE_API_ACCESS_TOKEN`, `GSC_ACCESS_TOKEN`, or `GA4_ACCESS_TOKEN`: short-lived token when intentionally injected by a wrapper.
- `gcloud auth application-default print-access-token`: works after local ADC login with readonly scopes.

Portfolio service-account env vars take priority over generic user access tokens. This avoids stale or Cloud-only user tokens causing GA4/Search Console `insufficient authentication scopes` responses.

Recommended ADC command:

```bash
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters.readonly
```

GA4 needs numeric property IDs, not public `G-...` measurement IDs:

- `PIERRONDI_GA4_PROPERTY_ID`
- `CANTUSTUDIO_GA4_PROPERTY_ID` (default currently known: `543380598`)
- `AGENTICOSCORE_GA4_PROPERTY_ID` or `AGENTCORE_GA4_PROPERTY_ID`
- `FAITHSCHOOL_GA4_PROPERTY_ID` (default currently known: `527930560`)

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

Current discovery status on 2026-07-06:

- Service account created: `portfolio-analytics-monitor@agentcore-499217.iam.gserviceaccount.com`.
- Local secret path: `PORTFOLIO_GOOGLE_APPLICATION_CREDENTIALS=/Users/paulopierrondi/.brain/secrets/portfolio-analytics-monitor-agentcore-499217.json`.
- FaithSchool GA4 UI access works in Chrome for property `527930560`; service account has Viewer access and GA4 Data API readback is `ok`.
- CantuStudio GA4 UI access works in Chrome for property `543380598`; service account has Viewer access and GA4 Data API readback is `ok`.
- pierrondi.dev GA4 property `544419741` was created in the Default Account for Firebase account, web stream `www.pierrondi.dev` uses measurement id `G-1CL8PFYY7T`, and GA4 Data API readback is `ok` with the portfolio service account.
- pierrondi.dev production tagging is gated by `NEXT_PUBLIC_GA_MEASUREMENT_ID`; the site only loads GA4 after `cookie-consent=all`.
- AgenticosCore public GA4 measurement id is `G-C9XNT5S87W`; numeric property id `543366142` is configured in the secure env provider, but GA4 Data API readback is still blocked until the service account has Viewer access on that property. On 2026-07-06 the logged-in Google Analytics account had no access to `p543366142`; the GA UI access request was emailed to the property administrators.
- Search Console UI access works for `sc-domain:agenticoscore.ai`, `sc-domain:pierrondi.dev`, `sc-domain:cantustudio.app`, and `sc-domain:faithschool.app`.
- Search Console DNS verification was completed for `pierrondi.dev` via GoDaddy TXT, `cantustudio.app` via Cloudflare TXT, and `faithschool.app` via Vercel DNS TXT.
- The service account is listed as a Full user on all four Search Console domain properties and API readback is `ok`.
- Current GSC data is still sparse for newly verified properties; use query/page/CTR/position decisions only after data accumulates.
- GA4 Data API readback works for FaithSchool `527930560`, CantuStudio `543380598`, and pierrondi.dev `544419741`; AgenticosCore remains the only GA4 access blocker because the API still returns an access error for `543366142`, and the current browser account cannot manage that property.
- Local ADC with `cloud-platform` exists, but the default `gcloud` ADC client was blocked by Google when requesting `analytics.readonly` and `webmasters.readonly`; keep recurring reads on the service-account path.
- Plausible API remains blocked until a Plausible token is configured in the secure env provider.

Known-noise 4xx policy:

- Commodity probes such as `/api/.env`, `/api/*`, `/api/auth/*`, `/api/common.js`, `/api/config.js`, and random `/curl/<hash>` paths are classified as `known_noise`, not growth/SEO defects.
- Protected AgenticosCore API reads such as `/api/v1/me`, `/api/v1/me/onboarding`, and `/api/v1/market-intelligence` remain classified as expected auth probes when they return 401/403.
- Real public commercial, conversion, or GEO URLs still remain actionable when they return 4xx/5xx.

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
