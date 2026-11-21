# OpenCode v2 & Kilo Code Adapter

`veycraft` works out of the box in **OpenCode v2** and **Kilo Code** via its Markdown-first skills and `.agents/skills/*/SKILL.md` standard (paired with the optional zero-dependency CLI in `bin/cli.mjs`).

## OpenCode v2 Setup
1. Root `opencode.json` automatically wires:
   - `instructions`: `["AGENTS.md", "skills/REGISTRY.md"]` (Progressive Disclosure).
   - `mcp.playwright`: `@playwright/mcp@0.0.86 --caps=pdf --user-data-dir=./browser-profile` (needed only for browser workflows like `/setup` and `/daily-run`).
   - `mcp.notion`: disabled by default (`enabled: false`); set `NOTION_TOKEN` in your environment and switch `enabled: true` only when opting into Notion sync.
2. OpenCode natively auto-discovers every skill in `.agents/skills/*/SKILL.md` (and `.opencode/skills/` if you prefer copying/linking them there).
3. Run `/skills` in OpenCode to see all discovered `veycraft` workflows. Start with `/demo` (no personal data or browser login) or `/quick-tailor` (1 real CV + 1 JD, no browser login), then `/setup` when ready for browser-assisted workflows.

## Kilo Code Setup
1. Kilo Code discovers `AGENTS.md` and `.agents/skills/*/SKILL.md` automatically at the repository root.
2. Copy the `playwright` (and optional `notion`) server definitions from `mcp/mcp.template.json` into `.kilocode/mcp.json` (gitignored if storing private tokens) or your global Kilo Code MCP settings.
3. Follow `adapters/models/deepseek-qwen-local.md` if pairing Kilo Code with DeepSeek, Qwen, or local Ollama models.
