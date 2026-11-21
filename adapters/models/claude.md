# Model Tuning Guide — Anthropic Claude (Sonnet / Opus)

Optimized for **Claude Code**, **Claude Desktop**, and **Claude API** agents running `veycraft`.

## 1. Strict YAML Skill Routing
- Read `AGENTS.md` and `skills/REGISTRY.md` once at session start.
- Match the current step against each skill's `triggers` and `preconditions` in YAML frontmatter before loading that single `.md` playbook.
- When transitioning phases (e.g., from `02-discover-and-triage.md` to `03-tailor-resume-and-verify.md`), verify every `verification` checkbox of the outgoing skill first.

## 2. XML Scratchpad Pre-Submit Gate
Before presenting an `APPROVE` summary or clicking any Submit / Save / Send control, run an internal XML check:

```xml
<pre_submit_check>
  <job_id>...</job_id>
  <dry_run>true|false</dry_run>
  <upload_verified>exact filename seen in fresh browser_snapshot</upload_verified>
  <unknown_questions>0</unknown_questions>
  <fact_check>0 unverified metrics, dates, or tools</fact_check>
  <cap_ok>applied_today + uncertain < effective_daily_cap</cap_ok>
</pre_submit_check>
```

If any tag fails, halt and route to `needs_review` or `skills/00-interrogate-and-onboard.md`.

## 3. Playwright MCP Discipline
- Always call `browser_snapshot` after every modal step, file upload (+4 s wait), and Submit click (`skills/meta-self-verification.md`).
- Never infer success from a closed dialog alone.
