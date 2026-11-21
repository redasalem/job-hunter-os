---
name: profile-intelligence-engine
description: Load when optimizing, auditing, syncing, or updating a professional profile across LinkedIn, job boards, ATS portals, or portfolios (/profile-update); defaults to DRAFT_ONLY consolidated plans validated via schemas/profile-update-plan.schema.json with APPROVE-gated batch fill and fresh read-back verification.
---

# Veycraft Profile Intelligence Engine

1. Read `AGENTS.md` and `skills/REGISTRY.md` first.
2. Follow `.agent/workflows/profile-update.md` and `skills/profile-intelligence-engine.md` (orchestrating `skills/linkedin-growth.md`, `skills/01-resume-ingestion.md`, `skills/03-tailor-resume-and-verify.md`, `skills/18-condition-based-browser-waiting.md`, and `skills/meta-self-verification.md`).
3. Validate generated plans against `schemas/profile-update-plan.schema.json` via `node ./bin/cli.mjs verify <plan.json>`. Default strictly to `DRAFT_ONLY` consolidated field review, never delete existing content (`add`/`replace` only), and verify any authorized live save with a fresh read-back.
