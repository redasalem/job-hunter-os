# Veycraft — Warp Terminal Agent Rules

Read `AGENTS.md` and `skills/REGISTRY.md` at session start. Follow Progressive Disclosure and route natural-language requests via `skills/REGISTRY.md` (without forcing `/setup` for standalone CV/LinkedIn/prep/report tasks): open only the specific `skills/*.md` playbook whose trigger matches the active step.

Quick workflows:
- `/setup` -> `skills/00-interrogate-and-onboard.md` + `skills/01-resume-ingestion.md`
- `/daily-run` or `/apply-url <url>` -> `skills/00-daily-run.md`
- `/tailor-cv <url>` -> `skills/03-tailor-resume-and-verify.md`
- `/weekly-report` -> `skills/06-log-and-insights.md`
- `/linkedin-growth` -> `skills/linkedin-growth.md` + `skills/05-outreach-and-interview-prep.md` (`DRAFT_ONLY` default; explicit `APPROVE` + snapshot verification for live edits)

Use Playwright MCP (`mcp/mcp.template.json`, `--user-data-dir=./browser-profile`) with `browser_snapshot` refs only. Never fabricate CV metrics or submit without explicit owner `APPROVE`.
