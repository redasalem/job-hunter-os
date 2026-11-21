# Model Tuning Guide — Mistral (Large / Codestral / Vibe) & Meta Llama 4

Optimized for **Mistral Large / Codestral / Mistral Vibe 3.0** and **Meta Llama 4** models running `veycraft`.

## 1. Strict JSON Extraction & Log Integrity
- When parsing CVs (`skills/01-resume-ingestion.md`) or updating `logs/applications-log.json`, `logs/skipped-jobs.json`, and `logs/runs/YYYY-MM-DD.json`:
  - Emit strictly valid JSON matching the field contracts in `schemas/resume-data.schema.json` and `skills/06-log-and-insights.md`.
  - Never invent missing fields, synthetic timestamps, or `applied_at` values when `status` is `dry_run` or `needs_review`.

## 2. Strict Tool-Call Verification Loop
- Execute **one Playwright MCP call per step**, wait **3–9 seconds**, and take a fresh `browser_snapshot` before the next step.
- Always quote the exact `role`, accessible `name`, and `ref` from the latest snapshot before calling `browser_click`, `browser_type`, or `browser_file_upload` (`skills/meta-dom-recovery.md`).
- After any Submit/Save/Post/Send action, never report success until `skills/meta-self-verification.md` observes an explicit confirmation receipt in a fresh snapshot.
