#!/opt/homebrew/bin/python3
from __future__ import annotations

import argparse
import json
import os
import platform
import plistlib
import re
import shutil
import socket
import subprocess
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

try:
    import yaml  # type: ignore
except ImportError:
    yaml = None  # type: ignore


HOME = Path("/Users/paulopierrondi")
REPO = HOME / "Projects" / "pierrondi-site"
VAULT = HOME / "Documents" / "Obsidian Vault"
AGENTS_HUB = HOME / "agents-hub"
LOG_DIR = AGENTS_HUB / "logs" / "agent-jobs"
LAUNCH_AGENTS = HOME / "Library" / "LaunchAgents"
CODEX_AUTOMATIONS = HOME / ".codex" / "automations"
CODER_DASHBOARD = VAULT / "Hub_Agentes" / "04_Dashboards" / "dashboard_coder_activity.md"
CODER_STATE = VAULT / "Hub_Agentes" / "06_Runtime" / "coder_activity_state.yaml"
ORCHESTRATION_HEALTH = VAULT / "Hub_Agentes" / "03_Outputs" / "automation_reviews" / f"{datetime.now():%Y-%m-%d}-orchestration-health.md"
OUTPUT_EVALUATOR = VAULT / "Hub_Agentes" / "03_Outputs" / "automation_reviews" / f"{datetime.now():%Y-%m-%d}-agent-output-evaluator.md"
DEFAULT_URL = "https://www.pierrondi.dev/api/automation-control/snapshot"
LOCAL_OUT = REPO / "tmp" / "automation-control-snapshot.json"

SECRET_RE = re.compile(
    r"(?i)(api[_-]?key|token|secret|password|cookie|authorization|private[_-]?key)\s*[:=]\s*[^,\s]+"
)


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def run(cmd: list[str], cwd: Path | None = None, timeout: int = 45) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        cwd=str(cwd) if cwd else None,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=timeout,
    )


def log(message: str) -> None:
    print(f"[automation-control] {message}", file=sys.stderr)


def compact(value: str, limit: int = 400) -> str:
    value = SECRET_RE.sub(lambda m: f"{m.group(1)}=[REDACTED]", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value if len(value) <= limit else value[: limit - 1].rstrip() + "..."


def safe_read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return ""


def safe_load_yaml(path: Path) -> dict[str, Any]:
    if yaml is None:
        return {}
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8", errors="replace")) or {}
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def refresh_reports(skip: bool) -> None:
    if skip:
        return
    commands = [
        [str(AGENTS_HUB / "scripts" / "coder-activity-dashboard.py")],
        [str(AGENTS_HUB / "scripts" / "orchestration-health-report.py")],
        [str(AGENTS_HUB / "scripts" / "agent-output-evaluator.py"), "--window-hours", "24"],
    ]
    for cmd in commands:
        try:
            result = run(cmd, cwd=REPO, timeout=90)
            log(f"refresh {' '.join(cmd[:1])}: rc={result.returncode}")
        except Exception as exc:
            log(f"refresh failed {cmd[0]}: {exc}")


def preflight(skip: bool) -> None:
    if skip:
        return
    cmd = [
        str(AGENTS_HUB / "scripts" / "agent-preflight.py"),
        "--automation",
        "automation-control-snapshot",
        "--surface",
        "LaunchAgent",
        "--risk",
        "report_only",
        "--cwd",
        str(REPO),
    ]
    result = run(cmd, cwd=REPO, timeout=30)
    if result.returncode != 0:
        raise SystemExit(f"preflight failed: {compact(result.stdout + result.stderr, 1200)}")


def parse_markdown_table(section: str, markdown: str) -> list[dict[str, str]]:
    marker = f"## {section}"
    start = markdown.find(marker)
    if start < 0:
        return []
    rest = markdown[start + len(marker) :]
    end = rest.find("\n## ")
    block = rest[:end] if end >= 0 else rest
    lines = [line.strip() for line in block.splitlines() if line.strip().startswith("|")]
    if len(lines) < 3:
        return []
    headers = [cell.strip() for cell in lines[0].strip("|").split("|")]
    rows: list[dict[str, str]] = []
    for line in lines[2:]:
        cells = [cell.strip().replace("\\|", "|") for cell in line.strip("|").split("|")]
        if len(cells) != len(headers):
            continue
        rows.append(dict(zip(headers, cells)))
    return rows


def status_counts() -> dict[str, int]:
    state = safe_load_yaml(CODER_STATE)
    raw = state.get("status_counts") if isinstance(state, dict) else {}
    return {
        "active_recent": int(raw.get("active_recent", 0)) if isinstance(raw, dict) else 0,
        "failed": int(raw.get("failed", 0)) if isinstance(raw, dict) else 0,
        "blocked": int(raw.get("blocked", 0)) if isinstance(raw, dict) else 0,
        "silent_or_stale": int(raw.get("silent_or_stale", 0)) if isinstance(raw, dict) else 0,
        "no_evidence": int(raw.get("no_evidence", 0)) if isinstance(raw, dict) else 0,
        "manual_ok": int(raw.get("manual_ok", 0)) if isinstance(raw, dict) else 0,
    }


def coder_rows(markdown: str) -> list[dict[str, Any]]:
    rows = parse_markdown_table("Por Coder", markdown)
    out = []
    for row in rows:
        active = int(row.get("Ativo", "0") or 0)
        failed = int(row.get("Falhou", "0") or 0)
        blocked = int(row.get("Bloqueado", "0") or 0)
        silent = int(row.get("Silencioso", "0") or 0)
        no_evidence = int(row.get("Sem evid.", "0") or 0)
        total = int(row.get("Total", "0") or 0)
        if failed + blocked > 0:
            recommendation = "atuar agora"
        elif silent + no_evidence > active:
            recommendation = "cobrar evidencia"
        elif active > 0:
            recommendation = "monitorar sem intervir"
        else:
            recommendation = "sem sinal suficiente"
        out.append(
            {
                "name": row.get("Coder", "unknown"),
                "active": active,
                "failed": failed,
                "blocked": blocked,
                "silentOrStale": silent,
                "noEvidence": no_evidence,
                "manualOk": max(total - active - failed - blocked - silent - no_evidence, 0),
                "total": total,
                "recommendation": recommendation,
            }
        )
    return out


def recent_logs(markdown: str) -> list[dict[str, str]]:
    return parse_markdown_table("Logs Mais Recentes", markdown)


def attention_rows(markdown: str) -> list[dict[str, str]]:
    return parse_markdown_table("Atenção Primeiro", markdown)


def llm_runtime(name: str, patterns: list[str], markdown_logs: list[dict[str, str]]) -> dict[str, Any]:
    cli_path = None
    for pattern in patterns:
        found = shutil.which(pattern)
        if found:
            cli_path = found
            break
        local = HOME / ".local" / "bin" / pattern
        if local.exists():
            cli_path = str(local)
            break

    ps = run(["ps", "-axo", "pid=,comm="], timeout=10)
    process_count = 0
    if ps.returncode == 0:
        for line in ps.stdout.splitlines():
            lower = line.lower()
            if any(pattern.lower() in lower for pattern in patterns):
                process_count += 1

    recent = [row for row in markdown_logs if any(pattern.lower() in row.get("Job", "").lower() for pattern in patterns)]
    failures = [row for row in recent if row.get("Status") == "failed"]
    status = "red" if failures else "green" if recent else "yellow" if cli_path else "unknown"

    return {
        "name": name,
        "available": bool(cli_path),
        "cliPath": cli_path,
        "activeProcesses": process_count,
        "recentJobs": len(recent),
        "lastSignal": compact(recent[0].get("Sinal", "")) if recent else None,
        "status": status,
    }


def launchagent_count() -> int:
    return len(
        [
            path
            for path in LAUNCH_AGENTS.glob("*.plist")
            if path.name.startswith(("com.paulo.", "com.paulopierrondi.", "com.pierrondi."))
        ]
    )


def codex_automation_count() -> int:
    return len(list(CODEX_AUTOMATIONS.glob("*/automation.toml"))) if CODEX_AUTOMATIONS.exists() else 0


def railway_status() -> dict[str, Any]:
    try:
        result = run(["railway", "status"], cwd=REPO, timeout=20)
    except Exception as exc:
        return {"linked": False, "statusOutput": compact(str(exc))}
    text = compact(result.stdout + result.stderr, 2000)
    out: dict[str, Any] = {"linked": result.returncode == 0, "statusOutput": text}
    for line in text.split(" "):
        pass
    for raw_line in (result.stdout + result.stderr).splitlines():
        if raw_line.startswith("Project:"):
            out["project"] = raw_line.split(":", 1)[1].strip()
        elif raw_line.startswith("Environment:"):
            out["environment"] = raw_line.split(":", 1)[1].strip()
        elif raw_line.startswith("Service:"):
            out["service"] = raw_line.split(":", 1)[1].strip()
    return out


def automation_signals(markdown_logs: list[dict[str, str]], attention: list[dict[str, str]]) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    for row in markdown_logs[:80]:
        status = row.get("Status", "unknown")
        if status == "failed":
            action = "atuar: abrir log e corrigir causa raiz"
        elif status == "ok":
            action = "nao atuar: manter monitoramento"
        else:
            action = "investigar: log sem marcador RESULT confiavel"
        items.append(
            {
                "id": row.get("Job", "unknown"),
                "surface": "LaunchAgent",
                "status": status,
                "ageLabel": row.get("Idade", "-"),
                "signal": compact(row.get("Sinal", "")),
                "evidence": row.get("Log"),
                "action": action,
            }
        )
    for row in attention[:40]:
        items.append(
            {
                "id": row.get("Agente", "unknown"),
                "surface": row.get("Coder", "registry"),
                "status": row.get("Status", "attention"),
                "ageLabel": row.get("Idade", "-"),
                "signal": compact(row.get("Sinal", "")),
                "evidence": row.get("Evidencia"),
                "action": "cobrar output ou ajustar schedule se ainda for relevante",
            }
        )
    return items[:120]


def decisions(signals: list[dict[str, Any]], attention: list[dict[str, str]], counts: dict[str, int]) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    failed = [item for item in signals if item["status"] == "failed"][:4]
    for item in failed:
        out.append(
            {
                "priority": "P0",
                "title": f"Corrigir {item['id']}",
                "type": "act",
                "rationale": item["signal"] or "Job recente falhou.",
                "nextAction": "Abrir o log de evidencia, corrigir a falha e reexecutar somente esse job.",
                "evidence": item.get("evidence"),
            }
        )
    if counts["silent_or_stale"] or counts["no_evidence"]:
        out.append(
            {
                "priority": "P1",
                "title": "Reduzir agentes silenciosos ou sem evidencia",
                "type": "investigate",
                "rationale": f"{counts['silent_or_stale']} silenciosos/obsoletos e {counts['no_evidence']} sem evidencia local.",
                "nextAction": "Decidir quais continuam ativos; para os restantes, exigir heartbeat started/checkpoint/finished.",
                "evidence": "dashboard_coder_activity.md",
            }
        )
    for row in attention[:3]:
        out.append(
            {
                "priority": "P1",
                "title": f"Validar {row.get('Agente', 'agente sem nome')}",
                "type": "investigate",
                "rationale": compact(row.get("Sinal", "")) or "Agente aparece em atencao no dashboard.",
                "nextAction": "Confirmar se o agente ainda deve existir; se sim, gerar output rastreavel.",
                "evidence": row.get("Evidencia"),
            }
        )
    out.append(
        {
            "priority": "P2",
            "title": "Nao mexer nos jobs verdes",
            "type": "ignore",
            "rationale": f"{counts['active_recent']} agentes com evidencia recente.",
            "nextAction": "Manter monitoramento; nao gastar tempo manual sem falha, blocker ou decisao pendente.",
            "evidence": "coder_activity_state.yaml",
        }
    )
    return out[:12]


def reports() -> list[dict[str, str]]:
    candidates = [
        ("Coder Activity Dashboard", CODER_DASHBOARD),
        ("Orchestration Health", ORCHESTRATION_HEALTH),
        ("Agent Output Evaluator", OUTPUT_EVALUATOR),
        ("Coder Activity State", CODER_STATE),
    ]
    out = []
    for name, path in candidates:
        if path.exists():
            out.append({"name": name, "path": str(path), "generatedAt": datetime.fromtimestamp(path.stat().st_mtime, timezone.utc).isoformat()})
    return out


def overall_status(counts: dict[str, int], signals: list[dict[str, Any]]) -> str:
    if any(item["status"] == "failed" for item in signals):
        return "red"
    if counts["blocked"] or counts["silent_or_stale"] or counts["no_evidence"]:
        return "yellow"
    return "green"


def build_snapshot(skip_refresh: bool, skip_preflight: bool) -> dict[str, Any]:
    preflight(skip_preflight)
    refresh_reports(skip_refresh)
    dashboard = safe_read(CODER_DASHBOARD)
    counts = status_counts()
    log_rows = recent_logs(dashboard)
    attention = attention_rows(dashboard)
    signals = automation_signals(log_rows, attention)
    railway = railway_status()

    return {
        "schemaVersion": "1.0",
        "collectedAt": utc_now(),
        "machine": {
            "hostname": socket.gethostname(),
            "user": os.environ.get("USER"),
            "platform": platform.platform(),
        },
        "railway": railway,
        "summary": {
            "overallStatus": overall_status(counts, signals),
            "activeRecent": counts["active_recent"],
            "failed": counts["failed"] + sum(1 for item in signals if item["status"] == "failed"),
            "blocked": counts["blocked"],
            "silentOrStale": counts["silent_or_stale"],
            "noEvidence": counts["no_evidence"],
            "manualOk": counts["manual_ok"],
            "logsTracked": len(list(LOG_DIR.glob("*.log"))) if LOG_DIR.exists() else 0,
            "launchAgentsTracked": launchagent_count(),
            "codexAutomations": codex_automation_count(),
            "openHandoffs": int((safe_load_yaml(CODER_STATE).get("open_handoffs") or 0) if yaml else 0),
        },
        "coders": coder_rows(dashboard),
        "llms": [
            llm_runtime("Kimi", ["kimi", "kimi-brain"], log_rows),
            llm_runtime("Claude", ["claude", "claude-brain"], log_rows),
            llm_runtime("Codex", ["codex"], log_rows),
            llm_runtime("Gemini", ["gemini"], log_rows),
            llm_runtime("Antigravity", ["antigravity"], log_rows),
        ],
        "automations": signals,
        "decisions": decisions(signals, attention, counts),
        "reports": reports(),
    }


def post_snapshot(snapshot: dict[str, Any], url: str, token: str) -> None:
    if not token:
        raise SystemExit("AUTOMATION_CONTROL_INGEST_TOKEN missing; refusing to POST without auth")
    data = json.dumps(snapshot).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
            "User-Agent": "pierrondi-automation-control/1.0",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8", errors="replace")
            log(f"posted snapshot: status={response.status} body={compact(body, 500)}")
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise SystemExit(f"POST failed: status={exc.code} body={compact(body, 900)}") from exc


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default=os.environ.get("AUTOMATION_CONTROL_URL", DEFAULT_URL))
    parser.add_argument("--out", default=str(LOCAL_OUT))
    parser.add_argument("--post", action="store_true")
    parser.add_argument("--no-refresh", action="store_true")
    parser.add_argument("--skip-preflight", action="store_true")
    args = parser.parse_args()

    snapshot = build_snapshot(skip_refresh=args.no_refresh, skip_preflight=args.skip_preflight)
    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(out_path)

    if args.post:
      post_snapshot(snapshot, args.url, os.environ.get("AUTOMATION_CONTROL_INGEST_TOKEN", ""))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
