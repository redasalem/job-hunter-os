---
mode: agent
description: Run today's authorized veycraft workflow with readiness gates, ghost filtering, CV tailoring, and approval safety
---

Read `AGENTS.md` and `skills/REGISTRY.md` first, then execute `skills/00-daily-run.md` in strict order:
1. Run `skills/00-interrogate-and-onboard.md` (5 readiness gates + Mission Briefing launch confirmation).
2. Verify Playwright MCP auth on enabled `context/targets.yaml` platforms and load `context/` + `config/guardrails.yaml`.
3. Follow `skills/02-discover-and-triage.md` (ghost check -> 0–10 score -> Mission Control table).
4. Tailor with `skills/03-tailor-resume-and-verify.md`, fill/gate with `skills/04-fill-and-apply.md`, save dossier/drafts with `skills/05-outreach-and-interview-prep.md`, and log with `skills/06-log-and-insights.md`.
