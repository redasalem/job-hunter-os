---
name: daily-run
description: Load when the owner starts a full job-hunting run (/daily-run or "Run today's job run"); orchestrates readiness gates, ghost filtering, scoring, Mission Control triage, tailoring, and approval-gated applications.
---

# Veycraft Daily Run

1. Read `AGENTS.md` and `skills/REGISTRY.md` first (Progressive Disclosure).
2. Execute `skills/00-daily-run.md` in strict order (`00-interrogate-and-onboard.md` -> auth check -> `02-discover-and-triage.md` -> `03-tailor-resume-and-verify.md` -> `04-fill-and-apply.md` -> `05-outreach-and-interview-prep.md` -> `06-log-and-insights.md`).
3. Enforce `dry_run: true` default, Days 1–3 warm-up cap (`5/day`), 3–9 s pacing, job-bound `APPROVE`, and `skills/meta-self-verification.md`.
