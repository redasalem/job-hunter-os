# Model Tuning Guide — OpenAI (GPT / o-series / Codex CLI)

Optimized for **OpenAI Codex CLI**, **ChatGPT Desktop**, and **GPT / o-series** models running `veycraft`.

## 1. Deterministic JSON & YAML Schema Adherence
- When updating `logs/applications-log.json`, `logs/skipped-jobs.json`, `logs/runs/YYYY-MM-DD.json`, or `logs/runs/current-session-checkpoint.json`, validate every required field before writing:
  - `job_id`: `"<platform>:<id>"` (unique—upsert, never duplicate)
  - `status`: `discovered | skipped | dry_run | applied | needs_review | failed | aborted`
  - `apply_type`: `easy_apply | external | manual_apply`
  - `applied_at`: ISO-8601 UTC timestamp ONLY when `status: "applied"` with a quoted post-submit receipt in `notes` (`null` otherwise)
- Keep `dry_run` counts strictly separate from `applied` counts.

## 2. Sequential Paced Execution (No Parallel Browser Bursts)
- Never fire parallel browser clicks or form inputs in one turn.
- Execute **one Playwright MCP interaction per step**, wait **3–9 seconds**, take a fresh `browser_snapshot`, and inspect the result before the next action.
- For reasoning models (`o-series`), keep `AGENTS.md` Hard Guardrails in system/developer context and let `skills/meta-self-verification.md` gate every final status report.
