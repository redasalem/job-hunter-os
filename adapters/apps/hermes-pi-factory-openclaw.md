# Hermes Agent, Pi Coding Agent, Factory Droid & OpenClaw Adapter

`veycraft` follows the open `agentskills.io` `.agents/skills/*/SKILL.md` standard and `AGENTS.md` conventions for autonomous terminal and scheduled agent harnesses.

## 1. Hermes Agent
- Point Hermes at `AGENTS.md` and `skills/REGISTRY.md` as workspace instructions, and attach Playwright MCP from `mcp/mcp.template.json`.
- For scheduled or long-running Hermes sessions, enforce `skills/10-autonomous-scheduler-loop.md` and `skills/meta-context-compaction.md`.

## 2. Pi Coding Agent (`.pi/skills/`)
- Pi discovers skills in `.agents/skills/*/SKILL.md` (or copy `.agents/skills/*` into `.pi/skills/` if using project-scoped Pi overrides):
  ```bash
  mkdir -p .pi/skills && cp -r .agents/skills/* .pi/skills/
  ```

## 3. Factory Droid (`.factory/skills/`)
- Factory Droid reads `AGENTS.md` and `.agents/skills/` (or `.factory/skills/`):
  ```bash
  mkdir -p .factory/skills && cp -r .agents/skills/* .factory/skills/
  ```
- Connect Playwright MCP in Factory settings using `mcp/mcp.template.json`.

## 4. OpenClaw (Recurring / Scheduled Loops)
- OpenClaw runs `skills/10-autonomous-scheduler-loop.md` on a schedule to execute discovery, ghost-job filtering, and Tier A CV preparation inside `active_hours`.
- **Hard Guardrail:** Autonomous loops must **always STOP at `approve_before_submit`** (and keep `dry_run: true` by default). Never bypass per-job `APPROVE` gates or auto-submit in background loops.
