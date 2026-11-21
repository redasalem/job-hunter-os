# Veycraft — Trae Project Rules

Read `AGENTS.md` and `skills/REGISTRY.md` first (progressive disclosure: load a full skill body only when its trigger matches the current phase of work).

This is a **Markdown-first career operations repository with a zero-dependency Node.js CLI (`bin/cli.mjs`)** and optional Playwright/Notion MCP:
- Readiness & onboarding: `skills/00-interrogate-and-onboard.md`, `skills/01-resume-ingestion.md`
- Daily run & single URL: `skills/00-daily-run.md` (`02` -> `03` -> `04` -> `05` -> `06`)
- Persona switching, follow-ups & negotiation: `skills/07-persona-switcher.md`, `skills/08-follow-up-radar.md`, `skills/09-offer-negotiator.md`

Connect MCP from `mcp/mcp.template.json` (`./browser-profile`). Respect `dry_run: true`, verified facts only, caps, and explicit `APPROVE` gates before any Submit/Save/Send.
