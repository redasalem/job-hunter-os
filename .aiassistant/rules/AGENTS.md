# Veycraft — JetBrains AI Assistant Rules

Read `AGENTS.md` and `skills/REGISTRY.md` first; route natural-language requests via `skills/REGISTRY.md` without forcing `/setup` for standalone tasks, and load individual `skills/*.md` playbooks only when triggered.

- `/setup` -> `skills/00-interrogate-and-onboard.md` + `skills/01-resume-ingestion.md`
- `/daily-run` or `/apply-url <url>` -> `skills/00-daily-run.md`
- `/tailor-cv <url>` -> `skills/03-tailor-resume-and-verify.md`
- `/weekly-report` -> `skills/06-log-and-insights.md`
- `/linkedin-growth` -> `skills/linkedin-growth.md` + `skills/05-outreach-and-interview-prep.md` (`DRAFT_ONLY` default; explicit `APPROVE` for live edits)

Respect `dry_run: true`, zero hallucinated CV metrics, Days 1–3 warm-up caps (`5/day`), and explicit `APPROVE` confirmation before any Submit/Save/Send.
