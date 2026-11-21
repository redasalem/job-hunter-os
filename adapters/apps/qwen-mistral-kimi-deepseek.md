# Open-Model Frontier Harnesses (Qwen Code, Mistral Vibe, Kimi, DeepSeek, Grok Build)

`veycraft` supports open-weight and frontier CLI/IDE harnesses out of the box via `AGENTS.md`, `.agents/skills/*/SKILL.md`, and standard MCP JSON/TOML configuration.

## 1. Qwen Code (`.qwen/settings.json`)
Qwen Code reads `AGENTS.md` and `.agents/skills/` natively. Add Playwright MCP to `.qwen/settings.json` (gitignored if storing private env values):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--user-data-dir=./browser-profile"]
    }
  }
}
```

Pair with `adapters/models/deepseek-qwen-local.md` for lean 3-file context loading and explicit `ref` ID quoting.

## 2. Mistral Vibe 3.0 (`.vibe/config.toml`)
Mistral Vibe discovers `AGENTS.md` and `.agents/skills/*/SKILL.md`. Configure Playwright MCP in `.vibe/config.toml`:

```toml
[[mcp_servers]]
name = "playwright"
transport = "stdio"
command = "npx"
args = ["@playwright/mcp@latest", "--user-data-dir=./browser-profile"]
```

Pair with `adapters/models/mistral-and-llama.md`.

## 3. Kimi Code CLI, DeepSeek Harness & xAI Grok Build
- **Kimi Code CLI:** Automatically reads `AGENTS.md`, `skills/REGISTRY.md`, and `.agents/skills/`. Pair with `adapters/models/grok-and-kimi.md`.
- **DeepSeek Harness:** Reads `AGENTS.md` + `skills/REGISTRY.md` with `mcp/mcp.template.json`. Pair with `adapters/models/deepseek-qwen-local.md`.
- **Grok Build:** Reads `AGENTS.md` + `.agents/skills/` and pairs with `adapters/models/grok-and-kimi.md` for multi-tab ATS comparison.
