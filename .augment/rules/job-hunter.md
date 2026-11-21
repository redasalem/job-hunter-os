---
type: always_apply
description: Canonical veycraft rules with Progressive Disclosure and MCP safety guardrails
---

# Veycraft — Augment Code Rules

Read `AGENTS.md` and `skills/REGISTRY.md` first (Progressive Disclosure: load an individual `skills/*.md` playbook only when its trigger matches the current phase of work).

This is a **Markdown-first career operations repository with a zero-dependency Node.js CLI (`bin/cli.mjs`)** and optional Playwright/Notion MCP:
- Setup & readiness gate: `skills/00-interrogate-and-onboard.md`, `skills/01-resume-ingestion.md`
- Daily run & triage: `skills/00-daily-run.md`, `skills/02-discover-and-triage.md`
- Tailoring & verification: `skills/03-tailor-resume-and-verify.md`
- Form fill & `APPROVE` gate: `skills/04-fill-and-apply.md`
- Outreach, logging, personas, follow-ups, negotiation, loop, portfolio & inbox triage: `skills/05-outreach-and-interview-prep.md` through `skills/12-recruiter-inbox-triage.md`

Respect `dry_run: true`, zero fabricated facts, Days 1–3 warm-up caps (`5/day`), and explicit `APPROVE` before Submit/Save/Send.
