## Summary
Describe the Markdown skill, ATS fixture, platform playbook, IDE integration, documentation, or zero-dependency CLI improvement in this PR.

## Professionalism impact
Explain in 2–4 bullets how this PR makes the repository safer, clearer, more consistent, or easier for first-time contributors/users (not only “adds a feature”).

## Risk / non-goals
- What this PR intentionally does **not** change:
- Any behavior that becomes stricter (call it out):

## Checklist
- [ ] **Zero-Dependency Core Standard:** `package.json` preserves `"dependencies": {}` and `"devDependencies": {}`; no backend servers, databases, SaaS wrappers, or npm packages added.
- [ ] **Acceptance contract:** Change matches [`ACCEPTANCE.md`](../ACCEPTANCE.md) (update that file if you change a non-negotiable).
- [ ] **Skill Contract (if adding/editing skills):** Includes all 8 YAML frontmatter keys (`name`, `version`, `description`, `triggers`, `requires_mcp`, `preconditions`, `requires_skills`, `verification`) and the 3 mandatory H2 sections (`When to Use & Preconditions`, `Deterministic Step-by-Step Execution`, `Anti-Patterns (What NEVER To Do) & Self-Verification Check`), with `skills/REGISTRY.md` and `skills/skills-manifest.json` updated.
- [ ] **Accessibility & Safe Wedge:** Platform/ATS playbooks use `browser_snapshot` roles/labels/refs (no brittle CSS selectors), preserve unconditional job-specific `APPROVE`, and include zero CAPTCHA/ToS bypasses.
- [ ] **Safety & Privacy:** No real CVs, personal `context/` files, `logs/`, `*.pdf`, `.env`, cookies, or `browser-profile/` included; new `targets.yaml.example` entries ship with `enabled: false`; examples stay synthetic.
- [ ] **Verified Locally:** `node --check bin/cli.mjs`, `node ./bin/cli.mjs eval --baseline`, `node ./bin/cli.mjs eval --journeys` (when relevant), `git diff --check`, and relevant link/JSON/YAML checks pass.

## Test plan
List the exact commands you ran and the expected results (e.g. `eval --baseline` → 20/20).
