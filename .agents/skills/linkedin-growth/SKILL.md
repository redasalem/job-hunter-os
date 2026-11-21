---
name: linkedin-growth
description: Load when the owner asks to review/audit their LinkedIn profile, improve headline/About/experience, sync LinkedIn with their CV, optimize for target roles, or draft posts/<=75-word outreach (/linkedin-growth); defaults to DRAFT_ONLY with APPROVE-gated live edits when authenticated Playwright exists.
---

# Veycraft LinkedIn Growth

1. Read `AGENTS.md` and `skills/REGISTRY.md` first.
2. Follow `.agent/workflows/linkedin-growth.md` and `skills/linkedin-growth.md` (plus `skills/05-outreach-and-interview-prep.md` and `skills/03-tailor-resume-and-verify.md`).
3. Default strictly to `DRAFT_ONLY` output in chat and `logs/insights/` (working offline from pasted/PDF/screenshot profile data if Playwright or LinkedIn auth is unavailable). Execute live Save/Post/Send only when signed-in Playwright access exists and the owner explicitly replies `APPROVE` on the exact final diff, then verify persisted state via `browser_snapshot`. Verify `<= 75`-word outreach via `node ./bin/cli.mjs pre-submit`.
