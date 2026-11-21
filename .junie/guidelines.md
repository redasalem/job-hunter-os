# Veycraft — JetBrains Junie Guidelines

Read `AGENTS.md` and `skills/REGISTRY.md` first at the start of every task (Progressive Disclosure: load only the specific `skills/*.md` file whose trigger matches the active step).

This is a **Markdown-first career operations repository with a zero-dependency Node.js CLI (`bin/cli.mjs`)** and optional Playwright/Notion MCP:
- Setup & CV ingestion: `skills/00-interrogate-and-onboard.md`, `skills/01-resume-ingestion.md`
- Daily run & Mission Control triage: `skills/00-daily-run.md`, `skills/02-discover-and-triage.md`
- Tailoring, fact-check & humanizer: `skills/03-tailor-resume-and-verify.md`
- Form filling & `APPROVE` gate: `skills/04-fill-and-apply.md`
- Outreach, dossier, follow-ups, negotiation & logging: `skills/05-outreach-and-interview-prep.md` through `skills/12-recruiter-inbox-triage.md`

Configure Playwright MCP from `mcp/mcp.template.json` in JetBrains MCP settings. Enforce `dry_run: true`, verified facts only, 3–9 s pacing, and explicit owner `APPROVE` before Submit.
