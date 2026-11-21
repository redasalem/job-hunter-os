# Devin Desktop (formerly Windsurf) Adapter

`veycraft` natively supports **Cognition Devin Desktop** (including ACP workflows and `.agents/skills/` auto-discovery) as well as legacy **Windsurf** via `.windsurfrules`.

## Setup in Devin Desktop
1. Open the cloned `veycraft/` folder in Devin Desktop.
2. Devin Desktop automatically loads `.windsurfrules`, `AGENTS.md`, and `.agents/skills/*/SKILL.md`.
3. Optionally add the Playwright MCP and Notion MCP definitions from `mcp/mcp.template.json` into your Devin Desktop / ACP MCP configuration (keeping `--user-data-dir=./browser-profile` pointed to your local repository path) when ready for browser-assisted workflows.
4. Start in chat with `/demo` (no personal data or browser login) or `/quick-tailor` (1 real CV + 1 JD, no browser login). Run `/setup` only when ready for the full multi-platform Career OS.

## Safety Rules
- Keep `dry_run: true` until your first full run is verified.
- Never approve unattended form submissions without reviewing the Mission Control table (`skills/02-discover-and-triage.md`) and `APPROVE` gate (`skills/04-fill-and-apply.md`).
