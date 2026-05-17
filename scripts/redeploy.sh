#!/usr/bin/env bash
# Re-deploy pierrondi-site to Railway.
set -e
cd "$(dirname "$0")/.."

echo "→ build local"
npm run build

echo "→ railway up"
railway up --ci --service pierrondi-site --detach

echo "→ aguardando..."
sleep 30
for i in 1 2 3 4 5 6; do
  code=$(curl -fsS -o /dev/null -w "%{http_code}" --connect-timeout 8 https://www.pierrondi.dev/marketing-os 2>/dev/null || echo "ERR")
  [ "$code" = "200" ] && { echo "✓ live"; exit 0; }
  echo "  $i: $code"
  sleep 30
done
echo "⚠ não respondeu 200 — railway logs --service pierrondi-site"
