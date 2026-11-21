---
name: apply-url
description: Load when the owner pastes a single HTTPS job URL (/apply-url) to score, tailor, fill, and safely gate one application without broader board discovery (with manual-prep fallback if browser automation is unavailable).
---

# Veycraft Apply Single URL

1. Read `AGENTS.md` and `skills/REGISTRY.md` first.
2. Follow `.agent/workflows/apply-url.md`: audit `skills/00-interrogate-and-onboard.md` (asking concisely for any missing gates), verify auth if browser automation is active, then run `skills/02-discover-and-triage.md`, `skills/03-tailor-resume-and-verify.md`, `skills/04-fill-and-apply.md` (upload-first + Live DOM Read-Back + explicit job-specific `APPROVE`), `skills/05-outreach-and-interview-prep.md`, and `skills/06-log-and-insights.md` on that single URL.
3. If Playwright MCP is disconnected or the portal requires account creation / Workday / Taleo / CAPTCHA, still deliver the tailored `resume.html`/`.txt`/`.doc`, `interview-dossier.md`, and ready-to-paste form answers (`skills/fallback-no-mcp.md`) so the user can finish manually without friction.
