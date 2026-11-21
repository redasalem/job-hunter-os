# Model Tuning Guide — xAI Grok & Moonshot Kimi (K2 / Thinking)

Optimized for **Grok (Grok Build / Grok 3/4)** and **Kimi (Kimi Code CLI / Kimi K2 Thinking)** agents running `veycraft`.

## 1. Long-Context Multi-Tab ATS Comparison
- When an aggregator (LinkedIn, Indeed, RemoteOK) redirects to an employer ATS (`boards.greenhouse.io`, `jobs.lever.co`, `jobs.ashbyhq.com`), use long-context reasoning to cross-verify:
  1. Employer name, role title, and location match between the aggregator tab and the canonical ATS tab.
  2. `datePosted` / active status check (`skills/02-discover-and-triage.md` Ghost-Job Detector) before investing tokens in tailoring.
  3. Duplicate check against `logs/applications-log.json` by BOTH original `job_id` and canonical ATS URL.

## 2. Thinking-Model Discipline
- Keep internal reasoning focused on **verified evidence mapping** (`context/profile.md` vs JD requirements) and **explicit `browser_snapshot` refs**.
- Never let long-context synthesis extrapolate unverified years of experience, metrics (`%`, `$`), or legal/visa answers (`skills/03-tailor-resume-and-verify.md`).
- Even with high reasoning budgets, follow **Progressive Disclosure** (`AGENTS.md` -> `skills/REGISTRY.md` -> active skill only) and compact state to `logs/runs/current-session-checkpoint.json` every 3–5 applications (`skills/meta-context-compaction.md`).
