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
import urllib.parse
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

PUBLIC_DEVOTIONAL_TRANSLATIONS = {
    "pt-BR": ("ARA", "NVI"),
    "en": ("KJV",),
}


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


def _mentions(text: str, tokens: tuple[str, ...]) -> bool:
    return bool(text) and any(token in text.lower() for token in tokens)


def _category_groups(items: list[dict[str, Any]]) -> set[str]:
    return {category_group(item.get("category")) for item in items}


def _formalities(items: list[dict[str, Any]]) -> list[str]:
    return [(item.get("formality") or "").lower() for item in items if item.get("formality")]


def score_color(items: list[dict[str, Any]], accent: str, notes_text: str) -> int:
    if not items:
        color = 18
    else:
        families = [color_family(item.get("dominant_color")) for item in items]
        non_neutral = {f for f in families if f not in {"neutral", "metallic", "unknown"}}
        color = 22 if len(non_neutral) <= 1 else 18 if len(non_neutral) == 2 else 14
    if _mentions(notes_text, ("cor", "paleta", "tom", "contraste")):
        color = min(25, color + 1)
    if any(t in (accent or "").upper() for t in ("HOT", "BOLD", "DRAMA", "DARK")):
        color = min(25, color + 1)
    return color


def score_proportion(items: list[dict[str, Any]]) -> int:
    if not items:
        return 15
    groups = _category_groups(items)
    if "dress" in groups:
        proportion = 17
    elif "top" in groups and "bottom" in groups:
        proportion = 16
    elif "top" in groups or "bottom" in groups:
        proportion = 13
    else:
        proportion = 12
    proportion += 2 if "shoe" in groups else 0
    proportion += 1 if "outerwear" in groups else 0
    return min(20, proportion)


def score_fit(items: list[dict[str, Any]], notes_text: str) -> int:
    fit = 16
    if _mentions(notes_text, ("fit", "caimento", "silhueta")):
        fit += 2
    if items and len(set(_formalities(items))) == 1:
        fit += 1
    return min(20, fit)


def score_coherence(items: list[dict[str, Any]]) -> int:
    if not items:
        return 15
    unique_formalities = set(_formalities(items))
    if len(unique_formalities) <= 1:
        return 19
    return 16 if len(unique_formalities) == 2 else 12


def score_accessories(items: list[dict[str, Any]]) -> int:
    if not items:
        return 7
    accessory_count = sum(1 for item in items if category_group(item.get("category")) == "accessory")
    if accessory_count == 0:
        return 5
    return 8 if accessory_count == 1 else 10


def score_details(accent: str, notes_text: str) -> int:
    details = 4 if notes_text and notes_text.strip() else 3
    if any(t in (accent or "").upper() for t in ("CLEAN", "SOFT POWER", "EDITORIAL", "SHARP")):
        details = min(5, details + 1)
    return details


def score_look(
    *,
    items: list[dict[str, Any]],
    accent: str = "",
    notes_text: str = "",
) -> dict[str, int]:
    """Port of the deterministic LookScorer. Returns dict matching breakdown shape (0..100 scale)."""
    return {
        "color": score_color(items, accent, notes_text),
        "proportion": score_proportion(items),
        "fit": score_fit(items, notes_text),
        "coherence": score_coherence(items),
        "accessories": score_accessories(items),
        "details": score_details(accent, notes_text),
    }


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


def _source_counts(
    closet_items: list[dict[str, Any]],
    saved_looks: list[dict[str, Any]],
    look_reviews: list[dict[str, Any]],
) -> dict[str, int]:
    return {
        "closetItems": len(closet_items),
        "savedLooks": len(saved_looks),
        "lookReviews": len(look_reviews),
    }


def _source_mode(
    closet_items: list[dict[str, Any]],
    saved_looks: list[dict[str, Any]],
    look_reviews: list[dict[str, Any]],
) -> str:
    if saved_looks or look_reviews:
        return "looks"
    return "closet_items_fallback" if closet_items else "empty"


def _summary_from_score(
    *,
    breakdown: dict[str, int],
    created_at: str,
    item_count: int,
    look_id: str,
    occasion: Any,
    style_goal: Any,
    thumbnail_path: Any,
) -> dict[str, Any]:
    total = total_from_breakdown(breakdown)
    return {
        "id": look_id,
        "createdAt": created_at,
        "occasion": occasion,
        "styleGoal": style_goal,
        "totalScore": total,
        "tier": tier_for(total),
        "breakdown": breakdown,
        "itemCount": item_count,
        "thumbnailPath": thumbnail_path,
    }


def _closet_item_summaries(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    summaries: list[dict[str, Any]] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        summaries.append(_summary_from_score(
            breakdown=score_look(items=[item], accent="", notes_text=""),
            created_at=str(item.get("created_at") or item.get("added_at") or ""),
            item_count=1,
            look_id=str(item.get("id") or ""),
            occasion=item.get("category"),
            style_goal=item.get("dominant_color"),
            thumbnail_path=item.get("image_url") or item.get("photo_url") or None,
        ))
    return summaries


def _saved_look_summaries(
    saved_looks: list[dict[str, Any]],
    closet_by_id: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
    summaries: list[dict[str, Any]] = []
    for look in saved_looks:
        item_ids = look.get("item_ids") or []
        items = [closet_by_id[i] for i in item_ids if i in closet_by_id]
        notes = look.get("notes") or []
        notes_text = " ".join(notes) if isinstance(notes, list) else notes
        summaries.append(_summary_from_score(
            breakdown=score_look(items=items, accent=look.get("accent") or "", notes_text=notes_text),
            created_at=str(look.get("created_at") or ""),
            item_count=len(items),
            look_id=str(look.get("id") or ""),
            occasion=look.get("vibe"),
            style_goal=look.get("accent"),
            thumbnail_path=look.get("hero_image_url") or None,
        ))
    return summaries


def _review_summaries(look_reviews: list[dict[str, Any]]) -> list[dict[str, Any]]:
    summaries: list[dict[str, Any]] = []
    for idx, review in enumerate(look_reviews):
        summaries.append(_summary_from_score(
            breakdown=score_look(items=[], accent="", notes_text=review.get("notes") or ""),
            created_at=str(review.get("created_at") or ""),
            item_count=0,
            look_id=f"review-{idx}",
            occasion=review.get("occasion"),
            style_goal=review.get("style_goal"),
            thumbnail_path=review.get("image_filename") or None,
        ))
    return summaries


def _looks_summaries(
    closet_items: list[dict[str, Any]],
    saved_looks: list[dict[str, Any]],
    look_reviews: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    closet_by_id = {item["id"]: item for item in closet_items if isinstance(item, dict) and "id" in item}
    summaries = _saved_look_summaries(saved_looks, closet_by_id) + _review_summaries(look_reviews)
    if not summaries and closet_items:
        summaries = _closet_item_summaries(closet_items)
    return sorted(summaries, key=lambda s: s["createdAt"], reverse=True)


def _percentile_95(scores: list[int]) -> float:
    if not scores:
        return 0.0
    sorted_scores = sorted(scores)
    p95_idx = max(0, int(round(0.95 * (len(sorted_scores) - 1))))
    return float(sorted_scores[p95_idx])


def _tier_counts(summaries: list[dict[str, Any]]) -> dict[str, int]:
    counts = {"A": 0, "B": 0, "C": 0, "D": 0}
    for summary in summaries:
        counts[summary["tier"]] = counts.get(summary["tier"], 0) + 1
    return counts


def _occasion_counts(summaries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    occasions: dict[str, int] = {}
    for summary in summaries:
        occasion = summary.get("occasion")
        if isinstance(occasion, str) and occasion.strip():
            occasions[occasion.strip()] = occasions.get(occasion.strip(), 0) + 1
    return sorted(
        [{"occasion": key, "count": count} for key, count in occasions.items()],
        key=lambda x: x["count"],
        reverse=True,
    )[:8]


def _looks_stats(
    summaries: list[dict[str, Any]],
    source_counts: dict[str, int],
    source_mode: str,
) -> dict[str, Any]:
    total = len(summaries)
    scores = [summary["totalScore"] for summary in summaries]
    stats = {
        "total": total,
        "totalScored": total,
        "avgScore": round(sum(scores) / total, 1) if scores else 0.0,
        "p95Score": _percentile_95(scores),
        "byTier": _tier_counts(summaries),
        "byOccasion": _occasion_counts(summaries),
        "sourceMode": source_mode,
        "sourceCounts": source_counts,
    }
    if summaries:
        stats["lastCreatedAt"] = summaries[0]["createdAt"]
    return stats


def build_looks_section(db: dict[str, Any], max_looks: int) -> dict[str, Any]:
    closet_items: list[dict[str, Any]] = db.get("closet_items", []) or []
    saved_looks: list[dict[str, Any]] = db.get("saved_looks", []) or []
    look_reviews: list[dict[str, Any]] = db.get("look_reviews", []) or []
    summaries = _looks_summaries(closet_items, saved_looks, look_reviews)
    source_counts = _source_counts(closet_items, saved_looks, look_reviews)
    source_mode = _source_mode(closet_items, saved_looks, look_reviews)
    return {
        "stats": _looks_stats(summaries, source_counts, source_mode),
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


def fetch_published_devotionals(
    base_url: str,
    dates: list[str],
    timeout: int = 15,
) -> dict[str, Any]:
    if not base_url:
        return {"items": []}

    items: list[dict[str, Any]] = []
    seen: set[str] = set()
    base = base_url.rstrip("/")

    for date in dates:
        for locale, translations in PUBLIC_DEVOTIONAL_TRANSLATIONS.items():
            for bible_translation in translations:
                params = urllib.parse.urlencode({
                    "date": date,
                    "locale": locale,
                    "bibleTranslation": bible_translation,
                })
                url = f"{base}/api/devotionals/?{params}"
                req = urllib.request.Request(url, method="GET")
                req.add_header("Accept", "application/json")
                try:
                    with urllib.request.urlopen(req, timeout=timeout) as resp:
                        payload = json.loads(resp.read().decode("utf-8"))
                except urllib.error.HTTPError as err:
                    print(
                        f"[creative-control] published devotional fetch HTTP {err.code} for {date}/{locale}/{bible_translation}",
                        file=sys.stderr,
                    )
                    continue
                except Exception as err:
                    print(
                        f"[creative-control] published devotional fetch failed for {date}/{locale}/{bible_translation}: {err}",
                        file=sys.stderr,
                    )
                    continue

                for item in payload.get("items") or []:
                    if not isinstance(item, dict):
                        continue
                    doc_id = str(item.get("id") or item.get("docId") or "")
                    if not doc_id or doc_id in seen:
                        continue
                    seen.add(doc_id)
                    items.append({
                        **item,
                        "id": doc_id,
                        "locale": item.get("locale") or locale,
                        "bibleTranslation": item.get("bibleTranslation") or bible_translation,
                        "reviewStatus": item.get("reviewStatus") or "approved",
                    })

    return {"items": items}


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


def _mock_devotional_item(now: datetime) -> dict[str, Any]:
    return {
        "id": "mock-devotional-001",
        "date": now.strftime("%Y-%m-%d"),
        "language": "pt-BR",
        "scriptureRef": "João 3:16",
        "title": "O amor incondicional de Deus",
        "body": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. Esta é a promessa que nos sustenta em todos os momentos.",
        "source": "youversion-votd",
        "generatedAt": now.strftime("%Y-%m-%dT%H:%M:%S.000Z"),
    }


def _devotional_items(payload: dict[str, Any], now: datetime) -> list[Any]:
    items = payload.get("items") or []
    # Optional local demo data. Production snapshots must never invent pending
    # review items, because Control Tower approval forwards docIds to
    # FaithSchool and mock ids cannot be confirmed upstream.
    if not items and os.environ.get("CREATIVE_CONTROL_DEVOTIONAL_MOCK", "0") == "1":
        return [_mock_devotional_item(now)]
    return items


def _devotional_snippet(item: dict[str, Any]) -> str:
    body = item.get("body") or item.get("content") or item.get("reflection") or item.get("text") or ""
    snippet = body.strip().replace("\n", " ")
    if len(snippet) > 140:
        return snippet[:137].rstrip() + "..."
    return snippet or "(sem conteúdo)"


def _devotional_source(item: dict[str, Any]) -> str:
    source = item.get("source")
    return source if source in ("youversion-votd", "manual", "other") else "youversion-votd"


def _devotional_scripture(item: dict[str, Any]) -> str:
    return str(item.get("scriptureRef") or item.get("scripture") or item.get("verseRef") or "—")


def _pending_devotional(item: dict[str, Any], now: datetime) -> dict[str, Any]:
    generated_at = item.get("generatedAt") or item.get("createdAt") or item.get("date")
    return {
        "docId": str(item.get("id") or item.get("docId") or ""),
        "date": str(item.get("date") or ""),
        "language": str(item.get("language") or item.get("lang") or item.get("locale") or "pt-BR"),
        **({"bibleTranslation": str(item.get("bibleTranslation"))} if item.get("bibleTranslation") else {}),
        "scriptureRef": _devotional_scripture(item),
        "title": item.get("title"),
        "snippet": _devotional_snippet(item),
        "source": _devotional_source(item),
        **({"reviewStatus": str(item.get("reviewStatus"))} if item.get("reviewStatus") else {}),
        "generatedAt": generated_at,
        "ageLabel": age_label(generated_at, now),
    }


def _pending_devotionals(items: list[Any], now: datetime) -> list[dict[str, Any]]:
    pending = [_pending_devotional(item, now) for item in items if isinstance(item, dict)]
    return sorted([item for item in pending if item["docId"]], key=lambda p: p["date"])


def _published_devotionals(items: list[Any], now: datetime) -> list[dict[str, Any]]:
    published = []
    for item in items:
        if not isinstance(item, dict):
            continue
        devotional = _pending_devotional({**item, "reviewStatus": "approved"}, now)
        if devotional["docId"]:
            published.append(devotional)
    return sorted(published, key=lambda p: (p["date"], p.get("language", ""), p.get("bibleTranslation", "")))


def _language_counts(pending: list[dict[str, Any]]) -> dict[str, int]:
    by_language: dict[str, int] = {}
    for item in pending:
        by_language[item["language"]] = by_language.get(item["language"], 0) + 1
    return by_language


def _devotional_stats(
    pending: list[dict[str, Any]],
    published: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    published = published or []
    stats: dict[str, Any] = {
        "totalPending": len(pending),
        "totalPublished": len(published),
        "byLanguage": _language_counts(pending),
        "byPublishedLanguage": _language_counts(published),
    }
    if pending:
        stats["oldestPendingAt"] = pending[0]["generatedAt"]
    newest = max(
        (item["generatedAt"] for item in [*pending, *published] if item.get("generatedAt")),
        default=None,
    )
    if newest:
        stats["lastGeneratedAt"] = newest
    newest_published = max((item["generatedAt"] for item in published if item.get("generatedAt")), default=None)
    if newest_published:
        stats["lastPublishedAt"] = newest_published
    return stats


def build_devotionals_section(
    payload: dict[str, Any],
    max_pending: int,
    published_payload: dict[str, Any] | None = None,
    max_published: int = 12,
) -> dict[str, Any]:
    now = datetime.now(timezone.utc)
    pending = _pending_devotionals(_devotional_items(payload, now), now)
    published = _published_devotionals((published_payload or {}).get("items") or [], now)
    return {
        "stats": _devotional_stats(pending, published),
        "pending": pending[:max_pending],
        "published": published[:max_published],
    }


def build_snapshot(args: argparse.Namespace) -> dict[str, Any]:
    db_path = Path(args.db_path)
    db = load_db(db_path)
    looks_section = build_looks_section(db, max_looks=args.max_looks)

    devotional_url = args.devotional_url or os.environ.get("FAITHSCHOOL_PENDING_URL", "")
    magic_secret = os.environ.get("FAITHSCHOOL_MAGIC_LINK_SECRET", "")
    devotional_payload = fetch_devotionals(devotional_url, magic_secret) if devotional_url else {"items": []}
    public_dates = [datetime.now(timezone.utc).strftime("%Y-%m-%d")]
    published_payload = fetch_published_devotionals(args.faithschool_public_url, public_dates)
    devotionals_section = build_devotionals_section(
        devotional_payload,
        max_pending=args.max_devotionals,
        published_payload=published_payload,
        max_published=args.max_published_devotionals,
    )

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
    parser.add_argument(
        "--faithschool-public-url",
        default=os.environ.get("FAITHSCHOOL_PUBLIC_URL", "https://faithschool.app"),
    )
    parser.add_argument("--max-looks", type=int, default=12)
    parser.add_argument("--max-devotionals", type=int, default=24)
    parser.add_argument("--max-published-devotionals", type=int, default=12)
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
