---
name: Veycraft
description: Progressive disclosure rules for veycraft Markdown skills and MCP workflows
alwaysApply: true
---

Read `AGENTS.md` and `skills/REGISTRY.md` first; route natural-language requests via `skills/REGISTRY.md` without forcing `/setup` for standalone tasks, and load an individual `skills/*.md` playbook only when triggered.

- `/setup` -> `skills/00-interrogate-and-onboard.md` + `skills/01-resume-ingestion.md`
- `/daily-run` or `/apply-url` -> `skills/00-daily-run.md`
- `/tailor-cv` -> `skills/03-tailor-resume-and-verify.md`
- `/weekly-report` -> `skills/06-log-and-insights.md`
- `/linkedin-growth` -> `skills/linkedin-growth.md` + `skills/05-outreach-and-interview-prep.md` (`DRAFT_ONLY` default; explicit `APPROVE` for live edits)

Enforce `dry_run: true` by default, verified facts only, 3–9 s Playwright pacing, and explicit owner `APPROVE` before Submit/Save/Send.
