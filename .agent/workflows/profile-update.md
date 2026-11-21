---
description: Run multi-platform Profile Intelligence Engine audit, generate a schema-validated Profile Update Plan (DRAFT_ONLY default), and execute approved batch edits with fresh read-back verification
---

1. Read `AGENTS.md` and `skills/REGISTRY.md` first.
2. Load `skills/profile-intelligence-engine.md` (plus `skills/linkedin-growth.md` for LinkedIn targets and `skills/03-tailor-resume-and-verify.md` for fact-checking & Anti-AI Slop rules).
3. Load verified facts from `context/` (`resume-facts.json`, `resume-data.json`, `cv.md`, `profile.md`), inspect the target platform via its declared adapter contract, and generate a schema-valid `schemas/profile-update-plan.schema.json` draft (`add`/`replace` only, unchanged fields skipped).
4. Validate with `node ./bin/cli.mjs verify <plan.json>`, present one consolidated field-level review (`DRAFT_ONLY` default), apply only explicitly approved edits via semantic locators and batch-fill, and verify saved values with a fresh read-back.
