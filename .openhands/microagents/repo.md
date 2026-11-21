---
name: veycraft
type: repo
agent: CodeActAgent
---

# Veycraft — OpenHands Repository Microagent

Read `AGENTS.md` and `skills/REGISTRY.md` first (Progressive Disclosure: load an individual `skills/*.md` file only when its trigger matches the current phase).

This is a **Markdown-first career operations repository with a zero-dependency Node.js CLI (`bin/cli.mjs`)** and optional Playwright/Notion MCP:
- Setup & CV ingestion: `skills/00-interrogate-and-onboard.md`, `skills/01-resume-ingestion.md`
- Daily run, ghost filter & Mission Control triage: `skills/00-daily-run.md`, `skills/02-discover-and-triage.md`
- Tailoring, fact-check & humanizer: `skills/03-tailor-resume-and-verify.md`
- Upload-first form filling & `APPROVE` gate: `skills/04-fill-and-apply.md`
- Outreach, logging & career skills (`05`–`12`): `skills/05-outreach-and-interview-prep.md` through `skills/12-recruiter-inbox-triage.md`

Enforce `dry_run: true`, verified facts only, 3–9 s pacing, and explicit owner `APPROVE` before any Submit/Save/Send.
