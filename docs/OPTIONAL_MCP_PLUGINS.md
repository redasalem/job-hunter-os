# Optional External MCP Plugins (Opt-In)

`veycraft` ships with a **Zero-Dependency Node.js CLI (`dependencies: {}`)** and uses **Playwright MCP** (`@playwright/mcp@0.0.86`) plus optional **Notion MCP** (`@notionhq/notion-mcp-server@2.6.1`) by default.

Some users also pair `veycraft` with specialized community MCP servers. These are **strictly optional**, never auto-installed by `bin/cli.mjs`, and come with important platform ToS and rate-limit tradeoffs documented below.

---

## 1. `stickerdaniel/linkedin-mcp-server` (Optional Read-Only LinkedIn Data Plugin)

- **Repository:** https://github.com/stickerdaniel/linkedin-mcp-server
- **What it provides:** Structured JSON tools for reading LinkedIn job postings, company pages, and profiles without passing large raw accessibility trees into the LLM context.
- **How `veycraft` compares out of the box:**
  - Starting in **`v1.3.0`**, [`skills/platforms/linkedin.md`](../skills/platforms/linkedin.md) and [`skills/02-discover-and-triage.md`](../skills/02-discover-and-triage.md) include a native **Token-Slim Structured Extraction (`browser_evaluate`)** pattern over Playwright MCP that returns a compact `<2 KB` JSON object (`title`, `company`, `location`, `workplace_type`, `jd_text`, `required_skills`, `hiring_team`) without needing an extra server or separate cookie store.
  - Only add `linkedin-mcp-server` if you specifically prefer its standalone Python/Docker MCP tools for read-only research alongside `veycraft`.

### ⚠️ LinkedIn Terms of Service, Session Cookie & Rate-Limit Warnings

> [!WARNING]
> **Read before enabling any third-party LinkedIn MCP server:**
> 1. **Terms of Service Risk:** Automated data collection on LinkedIn can violate LinkedIn's User Agreement (Section 8.2) and trigger temporary session locks, CAPTCHA challenges, or account restrictions if abused.
> 2. **Rate-Limit & Pacing Discipline:** Never run burst/batch loops against LinkedIn endpoints. Always enforce `veycraft` pacing (**3–9 s randomized delays**, `max_results <= 10` per run, and Days 1–3 warm-up caps) and trip the **24-hour circuit breaker** (`logs/circuit-breaker.json`, [`skills/24-circuit-breaker-and-antiban.md`](../skills/24-circuit-breaker-and-antiban.md)) immediately on any HTTP `429`, `999`, authwall redirect, or `"unusual activity"` notice.
> 3. **Credential Hygiene (`li_at` Cookie):** Never commit `li_at` cookies, session JSON, or `.env` files to Git. Keep secrets strictly in local environment variables or `.env` (guarded by `.gitignore` and `.git/hooks/pre-commit`), and never paste cookies into chat transcripts.
> 4. **Read-Only Scope:** Never allow external MCP plugins to auto-send messages, connection requests, profile edits, or applications. All outbound actions must still pass through `config/invariants.txt`, `node ./bin/cli.mjs pre-submit`, and explicit human `APPROVE`.

### Example Manual Opt-In Configuration (`.mcp.json`)

If you choose to opt in manually (never synced automatically by `sync-mcp`):

```json
{
  "mcpServers": {
    "linkedin": {
      "command": "uvx",
      "args": ["linkedin-mcp-server"],
      "env": {
        "LINKEDIN_COOKIE": "${LINKEDIN_COOKIE}"
      }
    }
  }
}
```

---

## 2. Profile Optimization Inspiration (`Maheidem/linkedin-optimizer-mcp`)

- **Repository:** https://github.com/Maheidem/linkedin-optimizer-mcp
- Rather than requiring an external runtime server or third-party API key for LinkedIn profile auditing, **`veycraft` `v1.3.0`** implements a **100% local, pure-Markdown, anti-hallucination Recruiter-SEO Profile Optimizer** directly inside [`skills/linkedin-growth.md`](../skills/linkedin-growth.md) (`/linkedin-growth`), grounded strictly in `context/profile.md` and `context/cv.md` with a transparent `0–100` rubric and mandatory `DRAFT_ONLY` + `APPROVE` gating.
