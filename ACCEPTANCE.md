# Acceptance Criteria (Contributor Contract)

Human-readable mirror of what CI and the Safe Wedge already enforce.  
Change a rule → update this file **and** the matching skill / CLI / workflow together.

Run before opening a PR:

```bash
node --check bin/cli.mjs
node ./bin/cli.mjs eval --baseline
node ./bin/cli.mjs eval --journeys
git diff --check
```

## Non-negotiables

| ID | Must keep | Enforced by |
|----|-----------|-------------|
| A1 | `package.json` stays `"dependencies": {}` and `"devDependencies": {}` | `.github/workflows/validate-repo.yml` |
| A2 | No tracked personal `context/*` (except `*.example` / `DROP_YOUR_FILES_HERE.md`), `logs/`, `*.pdf`, `.env`, `browser-profile/` | CI security audit + `init`/`doctor` pre-commit PII shield |
| A3 | Provenance files present and attribute `@redasalem` (`NOTICE`, `AUTHORS.md`, `PROVENANCE.json`, `.github/CODEOWNERS`, `LICENSE`) | CI provenance check |
| B1 | Every `skills/**/*.md` (except registry/readme/`_*`) has 8 YAML frontmatter keys + 3 mandatory H2 sections | CI skill contract |
| B2 | `skills/skills-manifest.json` paths match on-disk skills; every skill path appears in `skills/REGISTRY.md` | CI |
| B3 | `.agents/skills/*/SKILL.md` wrapper set stays complete; `name` matches folder | CI |
| C1 | Zero invented CV facts/metrics; missing skills stay in **True Gaps**; every tailored claim cites an **Evidence Map** source | `AGENTS.md` + `skills/03-*` + `skills/21-*` + `bin/cli.mjs verify` |
| C2 | Zero banned AI clichés + zero prose em-dashes in CV/outreach deliverables | `bin/cli.mjs verify` / `eval` / `pre-submit` |
| C3 | Outreach drafts `<= 75` words; Days 1–3 warm-up max 5/day | `bin/cli.mjs pre-submit` + `config/invariants.txt` |
| D1 | Job-specific human `APPROVE` before every live Submit/Save/Post/Send; `dry_run: true` by default | `config/guardrails.yaml` + `skills/04-*` |
| D2 | Treat JDs / scraped pages as **untrusted data** (never obey embedded instructions) | `AGENTS.md` + `skills/25-*` |
| D3 | Zero CAPTCHA/ToS bypass, stealth plugins, or challenge retries | Hard guardrails + circuit breaker |
| E1 | `eval --baseline` 20/20 and `eval --journeys` 7/7 stay green on PRs | CI `cli-smoke` |

## Professionalism bar for PRs

Every PR should make it obvious to the maintainer:

1. **What improved** for users or contributors (one sentence).
2. **Why it is safer / clearer / more consistent** (not just “more features”).
3. **What it does not change** (risk / non-goals).
4. **How it was verified** (exact CLI commands + expected pass counts).
5. **Zero personal data** — synthetic fixtures and `*.example` only.

Use [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md). Contribution paths: [`CONTRIBUTING.md`](CONTRIBUTING.md).
