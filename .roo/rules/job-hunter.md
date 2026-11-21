# Veycraft — Roo Code Rules

Read `AGENTS.md` and `skills/REGISTRY.md` first; only load a full skill body when its trigger matches the current phase of work.

This is a **Markdown-first career operations repository with a zero-dependency Node.js CLI (`bin/cli.mjs`)** and optional Playwright/Notion MCP:
- Setup & CV ingestion -> `skills/00-interrogate-and-onboard.md`, `skills/01-resume-ingestion.md`
- Daily run / apply URL -> `skills/00-daily-run.md`
- Tailoring & fact-check -> `skills/03-tailor-resume-and-verify.md`
- Form filling & approval gate -> `skills/04-fill-and-apply.md`
- Outreach, dossier, personas, follow-ups, negotiation -> `skills/05-outreach-and-interview-prep.md`, `skills/07-persona-switcher.md`, `skills/08-follow-up-radar.md`, `skills/09-offer-negotiator.md`

Connect Playwright MCP using `mcp/mcp.template.json`. Local JSON under `logs/` is primary. Respect dry run, verified facts, caps, and explicit approval gates.
