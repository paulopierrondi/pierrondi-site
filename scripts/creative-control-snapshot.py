#!/usr/bin/env python3
"""Collector for the Creative Control Tower snapshot.

Reads local fashioncore looks (closet_items / saved_looks / look_reviews) from
`db.json`, computes deterministic LookScores using a port of
`fashioncore.services.api.app.look_scorer`, then fetches pending devotionals
from the faithschool admin API. The aggregated snapshot is either printed,
saved locally, or POSTed to the pierrondi-site ingest endpoint.

Never prints secrets. Never logs Bearer tokens. Designed to run via
`brain-env-run -- python3 scripts/creative-control-snapshot.py`.
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import hmac
import json
import os
import socket
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

NEUTRAL_TOKENS = (
    "branco", "white", "preto", "black", "cinza", "gray", "grey",
    "bege", "beige", "creme", "cream", "off white", "off-white",
    "nude", "ivory", "marfim", "neutral",
)
WARM_TOKENS = (
    "vermelho", "red", "laranja", "orange", "amarelo", "yellow",
    "marrom", "brown", "terracota", "ferrugem", "burgundy", "wine",
    "caramel", "bordo", "bordô",
)
COOL_TOKENS = (
    "azul", "blue", "navy", "marinho", "verde", "green", "roxo",
    "purple", "lilas", "lilás", "lavender", "teal",
)
PINK_TOKENS = ("rosa", "pink", "blush", "salmao", "salmão")
METAL_TOKENS = ("dourado", "gold", "prata", "silver", "metal", "metalizado")

DRESS_TOKENS = ("dress", "vestido", "macacao", "macacão", "jumpsuit")
OUTER_TOKENS = ("blazer", "jacket", "casaco", "coat", "trench", "cardigan", "sobretudo", "kimono")
ACCESSORY_TOKENS = (
    "accessory", "bag", "bolsa", "clutch", "joia", "jewelry",
    "brinco", "colar", "anel", "oculos", "óculos", "chapeu", "chapéu",
)
SHOE_TOKENS = ("shoe", "sapato", "tenis", "tênis", "sandalia", "sandália", "boot", "bota", "salto")
TOP_TOKENS = ("top", "blouse", "blusa", "shirt", "camisa", "tshirt", "t-shirt", "regata", "camiseta")
BOTTOM_TOKENS = ("bottom", "pants", "calca", "calça", "skirt", "saia", "short", "jeans", "trouser")


def color_family(color: str | None) -> str:
    if not color:
        return "unknown"
    c = color.lower()
    for token in NEUTRAL_TOKENS:
        if token in c:
            return "neutral"
    for token in METAL_TOKENS:
        if token in c:
            return "metallic"
    for token in WARM_TOKENS:
        if token in c:
            return "warm"
    for token in COOL_TOKENS:
        if token in c:
            return "cool"
    for token in PINK_TOKENS:
        if token in c:
            return "pink"
    return "accent"


def category_group(category: str | None) -> str:
    if not category:
        return "unknown"
    c = category.lower()
    for token in DRESS_TOKENS:
        if token in c:
            return "dress"
    for token in OUTER_TOKENS:
        if token in c:
            return "outerwear"
    for token in ACCESSORY_TOKENS:
        if token in c:
            return "accessory"
    for token in SHOE_TOKENS:
        if token in c:
            return "shoe"
    for token in TOP_TOKENS:
        if token in c:
            return "top"
    for token in BOTTOM_TOKENS:
        if token in c:
            return "bottom"
    return "other"


def score_look(
    *,
    items: list[dict[str, Any]],
    accent: str = "",
    notes_text: str = "",
) -> dict[str, int]:
    """Port of the deterministic LookScorer. Returns dict matching breakdown shape (0..100 scale)."""
    has_items = bool(items)

    if has_items:
        families = [color_family(item.get("dominant_color")) for item in items]
        non_neutral = {f for f in families if f not in {"neutral", "metallic", "unknown"}}
        if len(non_neutral) <= 1:
            color = 22
        elif len(non_neutral) == 2:
            color = 18
        else:
            color = 14
    else:
        color = 18
    if notes_text and any(t in notes_text.lower() for t in ("cor", "paleta", "tom", "contraste")):
        color = min(25, color + 1)

    if has_items:
        groups = {category_group(item.get("category")) for item in items}
        if "dress" in groups:
            proportion = 17
        elif "top" in groups and "bottom" in groups:
            proportion = 16
        elif "top" in groups or "bottom" in groups:
            proportion = 13
        else:
            proportion = 12
        if "shoe" in groups:
            proportion += 2
        if "outerwear" in groups:
            proportion += 1
        proportion = min(20, proportion)
    else:
        proportion = 15

    fit = 16
    if notes_text and any(t in notes_text.lower() for t in ("fit", "caimento", "silhueta")):
        fit += 2
    if has_items:
        formalities = {(item.get("formality") or "").lower() for item in items if item.get("formality")}
        if len(formalities) == 1:
            fit += 1
    fit = min(20, fit)

    if has_items:
        formalities_list = [(item.get("formality") or "").lower() for item in items if item.get("formality")]
        unique_f = set(formalities_list)
        if len(unique_f) <= 1:
            coherence = 19
        elif len(unique_f) == 2:
            coherence = 16
        else:
            coherence = 12
    else:
        coherence = 15

    if has_items:
        accessory_count = sum(1 for item in items if category_group(item.get("category")) == "accessory")
        if accessory_count == 0:
            accessories = 5
        elif accessory_count == 1:
            accessories = 8
        else:
            accessories = 10
    else:
        accessories = 7

    details = 3
    if notes_text and notes_text.strip():
        details += 1
    accent_upper = (accent or "").upper()
    if any(t in accent_upper for t in ("CLEAN", "SOFT POWER", "EDITORIAL", "SHARP")):
        details = min(5, details + 1)
    if any(t in accent_upper for t in ("HOT", "BOLD", "DRAMA", "DARK")):
        color = min(25, color + 1)

    breakdown = {
        "color": color,
        "proportion": proportion,
        "fit": fit,
        "coherence": coherence,
        "accessories": accessories,
        "details": details,
    }
    return breakdown


def total_from_breakdown(breakdown: dict[str, int]) -> int:
    return min(100, sum(breakdown.values()))


def tier_for(total: int) -> str:
    if total >= 80:
        return "A"
    if total >= 65:
        return "B"
    if total >= 50:
        return "C"
    return "D"


def load_db(db_path: Path) -> dict[str, Any]:
    if not db_path.exists():
        print(f"[creative-control] db.json not found at {db_path}", file=sys.stderr)
        return {"closet_items": [], "saved_looks": [], "look_reviews": []}
    try:
        return json.loads(db_path.read_text(encoding="utf-8"))
    except Exception as err:
        print(f"[creative-control] failed to read db.json: {err}", file=sys.stderr)
        return {"closet_items": [], "saved_looks": [], "look_reviews": []}


def build_looks_section(db: dict[str, Any], max_looks: int) -> dict[str, Any]:
    closet_items: list[dict[str, Any]] = db.get("closet_items", []) or []
    closet_by_id = {item["id"]: item for item in closet_items if isinstance(item, dict) and "id" in item}

    saved_looks: list[dict[str, Any]] = db.get("saved_looks", []) or []
    look_reviews: list[dict[str, Any]] = db.get("look_reviews", []) or []

    summaries: list[dict[str, Any]] = []

    # Fallback: ingest closet_items as single-item looks when no saved_looks exist
    if not saved_looks and closet_items:
        for item in closet_items:
            if not isinstance(item, dict):
                continue
            breakdown = score_look(items=[item], accent="", notes_text="")
            total = total_from_breakdown(breakdown)
            summaries.append({
                "id": str(item.get("id") or ""),
                "createdAt": str(item.get("created_at") or item.get("added_at") or ""),
                "occasion": item.get("category"),
                "styleGoal": item.get("dominant_color"),
                "totalScore": total,
                "tier": tier_for(total),
                "breakdown": breakdown,
                "itemCount": 1,
                "thumbnailPath": item.get("image_url") or item.get("photo_url") or None,
            })

    for look in saved_looks:
        item_ids = look.get("item_ids") or []
        items = [closet_by_id[i] for i in item_ids if i in closet_by_id]
        notes_text = " ".join(look.get("notes") or []) if isinstance(look.get("notes"), list) else (look.get("notes") or "")
        breakdown = score_look(items=items, accent=look.get("accent") or "", notes_text=notes_text)
        total = total_from_breakdown(breakdown)
        summaries.append({
            "id": str(look.get("id") or ""),
            "createdAt": str(look.get("created_at") or ""),
            "occasion": look.get("vibe"),
            "styleGoal": look.get("accent"),
            "totalScore": total,
            "tier": tier_for(total),
            "breakdown": breakdown,
            "itemCount": len(items),
            "thumbnailPath": look.get("hero_image_url") or None,
        })

    for idx, review in enumerate(look_reviews):
        breakdown = score_look(items=[], accent="", notes_text=review.get("notes") or "")
        total = total_from_breakdown(breakdown)
        summaries.append({
            "id": f"review-{idx}",
            "createdAt": str(review.get("created_at") or ""),
            "occasion": review.get("occasion"),
            "styleGoal": review.get("style_goal"),
            "totalScore": total,
            "tier": tier_for(total),
            "breakdown": breakdown,
            "itemCount": 0,
            "thumbnailPath": review.get("image_filename") or None,
        })

    summaries.sort(key=lambda s: s["createdAt"], reverse=True)

    total = len(summaries)
    scored = [s["totalScore"] for s in summaries]
    avg = round(sum(scored) / total, 1) if scored else 0.0
    p95 = 0.0
    if scored:
        sorted_scores = sorted(scored)
        p95_idx = max(0, int(round(0.95 * (len(sorted_scores) - 1))))
        p95 = float(sorted_scores[p95_idx])
    by_tier = {"A": 0, "B": 0, "C": 0, "D": 0}
    for s in summaries:
        by_tier[s["tier"]] = by_tier.get(s["tier"], 0) + 1

    occasions: dict[str, int] = {}
    for s in summaries:
        occ = s.get("occasion")
        if isinstance(occ, str) and occ.strip():
            occasions[occ.strip()] = occasions.get(occ.strip(), 0) + 1
    by_occasion = sorted(
        [{"occasion": k, "count": v} for k, v in occasions.items()],
        key=lambda x: x["count"],
        reverse=True,
    )[:8]

    last_created = summaries[0]["createdAt"] if summaries else None

    stats = {
        "total": total,
        "totalScored": total,
        "avgScore": avg,
        "p95Score": p95,
        "byTier": by_tier,
        "byOccasion": by_occasion,
    }
    if last_created:
        stats["lastCreatedAt"] = last_created

    return {
        "stats": stats,
        "recent": summaries[:max_looks],
    }


def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def sign_ingest_bearer(scope: str, secret: str) -> str:
    ts = int(time.time())
    payload = f"{scope}.{ts}"
    sig = hmac.new(secret.encode("utf-8"), payload.encode("utf-8"), hashlib.sha256).digest()
    return f"ingest:{payload}.{_b64url(sig)}"


def fetch_devotionals(url: str, magic_secret: str, timeout: int = 15) -> dict[str, Any]:
    if not url or not magic_secret:
        return {"items": []}
    if len(magic_secret) < 32:
        print("[creative-control] MAGIC_LINK_SECRET too short (>=32 required)", file=sys.stderr)
        return {"items": [], "error": "secret_too_short"}
    bearer = sign_ingest_bearer("devotional-pending", magic_secret)
    req = urllib.request.Request(url, method="GET")
    req.add_header("Authorization", f"Bearer {bearer}")
    req.add_header("Accept", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8")
            return json.loads(body)
    except urllib.error.HTTPError as err:
        print(f"[creative-control] devotional fetch HTTP {err.code}", file=sys.stderr)
        return {"items": [], "error": f"http_{err.code}"}
    except Exception as err:
        print(f"[creative-control] devotional fetch failed: {err}", file=sys.stderr)
        return {"items": [], "error": "network"}


def age_label(iso: str | None, now: datetime) -> str | None:
    if not iso:
        return None
    try:
        ts = datetime.fromisoformat(iso.replace("Z", "+00:00"))
    except Exception:
        return None
    # Ensure both datetimes are offset-aware for subtraction
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=timezone.utc)
    if now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)
    delta = now - ts
    minutes = int(delta.total_seconds() // 60)
    if minutes < 60:
        return f"{max(1, minutes)}min"
    hours = minutes // 60
    if hours < 24:
        return f"{hours}h"
    days = hours // 24
    return f"{days}d"


def build_devotionals_section(payload: dict[str, Any], max_pending: int) -> dict[str, Any]:
    now = datetime.now(timezone.utc)
    items_raw = payload.get("items") or []

    # Fallback mock devotional when API returns empty (no credentials or no pending items)
    if not items_raw and os.environ.get("CREATIVE_CONTROL_DEVOTIONAL_MOCK", "1") != "0":
        items_raw = [{
            "id": "mock-devotional-001",
            "date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "language": "pt-BR",
            "scriptureRef": "João 3:16",
            "title": "O amor incondicional de Deus",
            "body": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. Esta é a promessa que nos sustenta em todos os momentos.",
            "source": "youversion-votd",
            "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z"),
        }]

    pending: list[dict[str, Any]] = []

    for item in items_raw:
        if not isinstance(item, dict):
            continue
        body = (
            item.get("body")
            or item.get("content")
            or item.get("reflection")
            or item.get("text")
            or ""
        )
        snippet = body.strip().replace("\n", " ")
        if len(snippet) > 140:
            snippet = snippet[:137].rstrip() + "..."

        generated_at = item.get("generatedAt") or item.get("createdAt") or item.get("date")
        scripture = (
            item.get("scriptureRef")
            or item.get("scripture")
            or item.get("verseRef")
            or "—"
        )
        source = item.get("source")
        if source not in ("youversion-votd", "manual", "other"):
            source = "youversion-votd"

        pending.append({
            "docId": str(item.get("id") or item.get("docId") or ""),
            "date": str(item.get("date") or ""),
            "language": str(item.get("language") or item.get("lang") or "pt-BR"),
            "scriptureRef": str(scripture),
            "title": item.get("title"),
            "snippet": snippet or "(sem conteúdo)",
            "source": source,
            "generatedAt": generated_at,
            "ageLabel": age_label(generated_at, now),
        })

    pending = [p for p in pending if p["docId"]]
    pending.sort(key=lambda p: p["date"])

    by_language: dict[str, int] = {}
    for p in pending:
        by_language[p["language"]] = by_language.get(p["language"], 0) + 1

    oldest = pending[0]["generatedAt"] if pending else None
    newest = max((p["generatedAt"] for p in pending if p.get("generatedAt")), default=None)

    stats: dict[str, Any] = {
        "totalPending": len(pending),
        "byLanguage": by_language,
    }
    if oldest:
        stats["oldestPendingAt"] = oldest
    if newest:
        stats["lastGeneratedAt"] = newest

    return {
        "stats": stats,
        "pending": pending[:max_pending],
    }


def build_snapshot(args: argparse.Namespace) -> dict[str, Any]:
    db_path = Path(args.db_path)
    db = load_db(db_path)
    looks_section = build_looks_section(db, max_looks=args.max_looks)

    devotional_url = args.devotional_url or os.environ.get("FAITHSCHOOL_PENDING_URL", "")
    magic_secret = os.environ.get("FAITHSCHOOL_MAGIC_LINK_SECRET", "")
    devotional_payload = fetch_devotionals(devotional_url, magic_secret) if devotional_url else {"items": []}
    devotionals_section = build_devotionals_section(devotional_payload, max_pending=args.max_devotionals)

    return {
        "schemaVersion": "1.0",
        "collectedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z"),
        "machine": {
            "hostname": socket.gethostname(),
            "user": os.environ.get("USER", ""),
        },
        "looks": looks_section,
        "devotionals": devotionals_section,
    }


def post_snapshot(snapshot: dict[str, Any], site_url: str, ingest_token: str) -> int:
    if not site_url:
        print("[creative-control] PIERRONDI_SITE_URL not set; skipping POST", file=sys.stderr)
        return 2
    if not ingest_token:
        print("[creative-control] CREATIVE_CONTROL_INGEST_TOKEN not set; skipping POST", file=sys.stderr)
        return 2

    url = site_url.rstrip("/") + "/api/creative-control/snapshot"
    data = json.dumps(snapshot).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Authorization", f"Bearer {ingest_token}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode("utf-8")
            print(f"[creative-control] POST {url} -> {resp.status}")
            print(body)
            return 0 if resp.status == 200 else 2
    except urllib.error.HTTPError as err:
        print(f"[creative-control] HTTP {err.code} from ingest", file=sys.stderr)
        try:
            print(err.read().decode("utf-8"), file=sys.stderr)
        except Exception:
            pass
        return 2
    except Exception as err:
        print(f"[creative-control] ingest failed: {err}", file=sys.stderr)
        return 4


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--db-path",
        default=os.environ.get(
            "FASHIONCORE_DB_JSON",
            "/Users/paulopierrondi/Projects/fashioncore/services/api/.data/db.json",
        ),
    )
    parser.add_argument(
        "--devotional-url",
        default=os.environ.get(
            "FAITHSCHOOL_PENDING_URL",
            "https://faithschool.app/api/admin/devotional/pending/",
        ),
    )
    parser.add_argument(
        "--site-url",
        default=os.environ.get("PIERRONDI_SITE_URL", "https://www.pierrondi.dev"),
    )
    parser.add_argument("--max-looks", type=int, default=12)
    parser.add_argument("--max-devotionals", type=int, default=24)
    parser.add_argument("--dry-run", action="store_true", help="Do not POST")
    parser.add_argument("--output", default="", help="Write snapshot JSON to this path (in addition to POST)")
    args = parser.parse_args(list(argv) if argv is not None else None)

    snapshot = build_snapshot(args)

    if args.output:
        out_path = Path(args.output)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(json.dumps(snapshot, indent=2) + "\n", encoding="utf-8")
        print(f"[creative-control] wrote {out_path}")

    if args.dry_run:
        print(json.dumps(snapshot, indent=2))
        return 0

    site_url = args.site_url
    ingest_token = os.environ.get(
        "CREATIVE_CONTROL_INGEST_TOKEN",
        os.environ.get("AUTOMATION_CONTROL_INGEST_TOKEN", ""),
    )
    return post_snapshot(snapshot, site_url, ingest_token)


if __name__ == "__main__":
    raise SystemExit(main())
