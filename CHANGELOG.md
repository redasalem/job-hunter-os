CHANGELOG.md [182L]
# Changelog
All notable changes to **`job-hunter-os`** will be documented in this file.
... [lean-ctx: omitted 1 lines]
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [Unreleased]
### Changed
- **Anti-Slop Contract Alignment (`bin/cli.mjs`, `evals/fixtures/ground-truth.json`, `skills/03-tailor-resume-and-verify.md`, `config/invariants.txt`):** Unified the banned AI-cliché list across CLI `verify`/`eval`, ground-truth fixtures, and the tailor skill; `pre-submit --draft|--text` now hard-fails on banned clichés and prose em-dashes (matching `verify`); expanded pre-submit invariants with Evidence Map / True Gaps, anti-slop, and untrusted-JD rules.
### Added
- **First-Class OpenAI Codex CLI, Google Gemini CLI & GitHub Copilot / VS Code Sync (`bin/cli.mjs`, `adapters/apps/openai-codex-cli.md`, `adapters/apps/gemini-and-copilot.md`):** Added non-destructive managed instruction injection (`$CODEX_HOME/AGENTS.md`, `~/.gemini/GEMINI.md`, `~/.copilot/copilot-instructions.md`), safe TOML `[mcp_servers.*]` syncing (`.codex/config.toml` / `$CODEX_HOME/config.toml`), Gemini CLI `settings.json`, VS Code `.vscode/mcp.json` (`"servers"`), expanded `--ide` targets (`codex`, `gemini`, `copilot`, `roo`, `kiro`, `junie`, `zed`, `goose`, `aider`), local scaffolding for all repo IDE adapters, and Test 7 in `evals/journeys/run-journeys.test.mjs`.
## [1.5.0] - 2026-11-19 — Universal Guided AI Workflow Engine & Release Hardening
### Added
- **Universal Natural-Language Task Router & Task-Specific Readiness (`AGENTS.md`, `skills/REGISTRY.md`, `bin/cli.mjs route`):** Added a 10-intent task router covering natural-language requests (`route "<request>" [--json]`) and decoupled standalone CV, LinkedIn, JD comparison, interview prep, and record-tracking workflows from mandatory `/setup` onboarding.
- **Built-In Format-Honest CV Reader & Deliverable Verifier (`bin/cli.mjs audit`, `bin/cli.mjs verify`, `skills/01-resume-ingestion.md`):** Added zero-dependency `.docx` ZIP/XML text extraction (`extractDocxText`), sanitized `.html` / Word-compatible `.doc` parsing, strict rejection of scanned PDFs or disguised HTML `.docx`, guided CV creation from scratch, surgical CV editing preserving originals, and post-write placeholder/em-dash/fact verification (`verify <dir|file> [--facts <json|md>]`).
... [lean-ctx: omitted 4 lines]
- **CI Hardening & Automated Security Configuration (`.github/dependabot.yml`, `.github/workflows/*.yml`):** Added weekly Dependabot `github-actions` updates, upgraded workflows to Node 24 actions (`checkout@v7`, `setup-node@v7`, `configure-pages@v6`, `upload-pages-artifact@v5`, `deploy-pages@v5`), enforced the `0/0` npm dependencies invariant, and added cross-OS CI runs for `eval --journeys`, `route`, and `verify`.
### Changed
- **LinkedIn 3-Mode Guard & Multi-Source Discovery (`skills/linkedin-growth.md`, `skills/platforms/linkedin.md`, `skills/02-discover-and-triage.md`):** Enforced strict boundaries separating Read-Only Profile Inspection, `DRAFT_ONLY` improvement preparation, and `APPROVE`-gated live mutations verified post-save via `browser_snapshot`; enabled multi-source JD analysis with source URLs, verification dates, and explicit separation of verified matches vs. unknown requirements.
... [lean-ctx: omitted 3 lines]
- **Unconditional Job-Specific Human `APPROVE` Gate (`skills/04-fill-and-apply.md`, `skills/skills-manifest.json`, `skills/meta-structured-debugging.md`, `skills/13-company-due-diligence.md`, `adapters/apps/hermes-pi-factory-openclaw.md`, `config/guardrails.yaml`):** Removed conflicting `auto_high_confidence` bypass phrasing so every live submission requires explicit job-specific `APPROVE` after a fresh Live DOM Read-Back Table, and any later modification invalidates approval.
- **Honest Enforcement & Audit Terminology (`docs/execution-safety.md`, `bin/cli.mjs`, `CONTRIBUTING.md`, `docs/repository-audit.md`, `roadmap.md`, IDE rules):** Explicitly distinguished **Deterministic CLI Enforcement** (`bin/cli.mjs`) from **Agent Workflow Requirements** (`AGENTS.md`, `skills/*.md`), replaced misleading `"verified numeric metrics"` audit wording with `"Detected Numeric Metrics"` + heuristic disclaimer, and updated `CONTRIBUTING.md` with three concrete contribution paths.
... [lean-ctx: omitted 1 lines]
### Fixed
- **CV Audit Bullet-Count Regex Bug (`bin/cli.mjs`):** Eliminated stateful `/g` regex matching across bullets (`metricSingleRe` vs. `metricGlobalRe`) so bullets containing numeric metrics are counted accurately.
- **Dynamic Proof & CLI Metadata (`bin/cli.mjs`):** Removed hardcoded `v1.4.1` and ATS fixture labels from `eval`/`proof`/`--help`, added `devDependencies` count (`0 / 0`) to `proof`, and flagged detected secret tokens accurately in the `audit` hygiene table.
## [1.4.1] - 2026-11-19 — Instant Local CV Audit CLI, Runtime Clarity & Above-the-Fold Diff
### Added
- **Zero-Setup Offline CV Audit CLI (`node ./bin/cli.mjs audit <file> [--share]`):**
  - Accepts any local `.md` or `.txt` CV path resolved from `process.cwd()` (no `ROOT` restriction) and deterministically scores AI-slop clichés & prose em-dashes, quantified metric density, 1-page A4 fit, and data/URL hygiene (with SSRF & token-leak checks).
  - Supports `--share` to print a clean, PII-stripped terminal scorecard ready for sharing on HN, X, Reddit, or LinkedIn.
... [lean-ctx: omitted 1 lines]
### Changed
- **Runtime Clarity & Real `APPROVE`-Gate Diff Above the Fold (`README.md` & `README.ar.md`):**
  - Added an explicit top-of-page runtime callout stating that `job-hunter-os` runs inside the user's existing AI IDE (Claude Code, Cursor, Windsurf, Cline, Gemini CLI, Codex) using their active subscription with zero external API keys required.
  - Added a 4-line unified `diff` right below the hero showing verified fact grounding and blocked unverified claims before `APPROVE`, and refreshed [`assets/proof-card.svg`](assets/proof-card.svg) to `v1.4.1`.
## [1.4.0] - 2026-11-19 — First-Time User Conversion & Reproducible Proof Edition
### Added
- **Fast-Start `/quick-tailor` Workflow (`.agent/workflows/quick-tailor.md`):**
  - Lets first-time users generate a fact-checked, tailored single-column HTML + TXT resume with an Evidence Map, ATS Keyword Comparison, and excluded True Gaps from one CV and one job description in under 2 minutes — without requiring browser login, Playwright MCP, or full 5-gate platform onboarding.
... [lean-ctx: omitted 1 lines]
  - Added zero-dependency `proof` command reading live `package.json`, `skills/skills-manifest.json`, `eval --baseline`, and `evals/fixtures/forms/*.html` to generate reproducible `logs/exports/proof-card.svg` and `logs/exports/proof-card.md` (with explicit scope disclosure distinguishing deterministic fixture validation from an AI accuracy benchmark). Committed rendered preview at [`assets/proof-card.svg`](assets/proof-card.svg) and added cross-OS CI smoke verification.
... [lean-ctx: omitted 1 lines]
  - Added a 30-second GitHub Issue Form (`interview` / `contract` / `offer`, anonymous welcome, strict PII prohibition) so users can share outcomes without forking or opening a PR.
### Changed
- **Outcome-First `README.md` & `README.ar.md` + Dynamically Synced Visual Assets (`v1.4.0`, `48` Skills):**
  - Rebuilt both landing pages around a 15-second value proposition (*"Your AI Career Operating System. Tailor Every CV. Verify Every Claim. Stay in Control."*), trimmed top badges to 3, added an explicit `Input → Job Hunter OS → Output` overview, clarified zero-dependency core CLI vs. optional Playwright MCP, and moved deep evaluation tables below the product demo.
  - Regenerated [`assets/demo-preview.png`](assets/demo-preview.png) (`1280x720`) and [`assets/social-preview.png`](assets/social-preview.png) (`1280x640`) dynamically from `package.json` (`v1.4.0`) and `skills/skills-manifest.json` (`48` skills).
... [lean-ctx: omitted 1 lines]
  - Updated `/demo` to immediately render one complete synthetic tailored preview for Job #1 (original summary, JD requirements, tailored CV, verified facts used, excluded True Gaps, ATS keyword lift, and `<= 75`-word outreach) directly after the Mission Control table without waiting for a follow-up command.
... [lean-ctx: omitted 2 lines]
## [1.3.0] - 2026-11-19 — Token-Slim LinkedIn Extraction & Grounded Recruiter-SEO Optimizer
### Added
- **Token-Slim Structured Extraction for LinkedIn (`skills/platforms/linkedin.md` & `skills/02-discover-and-triage.md`):**
  - Added a deterministic, read-only Playwright `browser_evaluate` extraction pattern returning compact `<2 KB` JSON (`job_id`, `canonical_url`, `title`, `company`, `location`, `workplace_type`, `jd_text`, `required_skills`, `hiring_team`, `already_applied`, `closed_banner`) instead of dumping raw 25k-token accessibility trees into LLM context.
... [lean-ctx: omitted 3 lines]
  - Generates side-by-side Before/After rewrites strictly grounded in `context/profile.md` & `context/cv.md` (zero invented metrics, zero unverified skills, zero AI-slop clichés/em-dashes), saved as `DRAFT_ONLY` and gated behind explicit human `APPROVE`.
... [lean-ctx: omitted 1 lines]
  - Documented `stickerdaniel/linkedin-mcp-server` as an opt-in external MCP plugin with clear LinkedIn ToS, `li_at` credential hygiene, and rate-limit warnings alongside our zero-dependency native Playwright MCP default.
## [1.2.3] - 2026-11-19 — Security & Cross-Platform Hardening
### Security
- **Stored XSS & `$`-Substitution Fix in `cmdDashboard`:** Replaced raw `String.prototype.replace` injection in [`bin/cli.mjs`](bin/cli.mjs) with a replacer function that Unicode-escapes HTML/script-unsafe characters (`<`, `>`, `&`, `\u2028`, `\u2029`) before embedding `logs/applications-log.json` into `dashboard.html`.
- **Immutable Eval Trust Boundary (`evals/fixtures/ground-truth.json`):** Hardened `cmdEval` to load `ground_truth_metrics`, `forbidden_skills` (including aliases `K8s`, `Rustacean`, `SwiftUI`, `iOS`, `C++`, `.NET`), and `banned_ai_cliches` strictly from immutable [`evals/fixtures/ground-truth.json`](evals/fixtures/ground-truth.json) rather than the untrusted `--file` payload, fixed metric regex extraction & exact-token matching, and escaped regex metacharacters.
- **Cryptographic `cmdUpdate` Verification & Strict Provenance Enforcement:** Embedded the pinned `@redasalem` Ed25519 signing public key inside [`bin/cli.mjs`](bin/cli.mjs) and required `git verify-commit HEAD` to pass before `update` overwrites local `bin/` or `skills/`. Upgraded `doctor` / `doctor --strict` to enforce exact canonical fields in `PROVENANCE.json`, `NOTICE`, and `AUTHORS.md` and fail non-zero on tampering.
... [lean-ctx: omitted 1 lines]
### Added
- **Executable `pre-submit` Gate & Micro-Invariants (`config/invariants.txt`):** Added a `<500`-byte [`config/invariants.txt`](config/invariants.txt) file and `node ./bin/cli.mjs pre-submit [--draft <file> | --text "<msg>"]` to deterministically enforce the `<= 75`-word outreach cap and daily/warm-up application cap against `logs/applications-log.json` so hard rules survive IDE context compaction.
### Fixed
- **Cross-Platform CLI & Windows Hardening (`bin/cli.mjs`):**
... [lean-ctx: omitted 2 lines]
  - Hardened `cmdUnlock` to verify POSIX `SingletonLock` PIDs via `process.kill(pid, 0)` before deleting and report active Windows lock errors cleanly; added Windows `lockfile` detection to `cmdLogin`.
  - Replaced Windows `cmd /c start` in `openFileInBrowser` with shell-metacharacter-safe `powershell.exe` `Start-Process -LiteralPath $env:JHO_OPEN_PATH`.
- **Pinned Playwright MCP & Stdio Noise Suppression:** Pinned `@playwright/mcp@0.0.86` and `@notionhq/notion-mcp-server@2.6.1` with `NPM_CONFIG_UPDATE_NOTIFIER=false`, `NPM_CONFIG_FUND=false`, `NPM_CONFIG_AUDIT=false`, and `NPM_CONFIG_LOGLEVEL=error` across [`mcp/mcp.template.json`](mcp/mcp.template.json), [`mcp/claude_desktop_config.example.json`](mcp/claude_desktop_config.example.json), and [`opencode.json`](opencode.json), and emitted Windows-safe `cmd /c npx` server entries in `sync-mcp`.
## [1.2.2] - 2026-11-18 — Safe Wedge Positioning & Trust Boundaries
### Changed
- **Safe-Wedge Product Positioning & Documentation Consistency (`47` Consolidated Skills):**
  - Refactored [`README.md`](README.md) and [`README.ar.md`](README.ar.md) to lead with the **Safe Wedge** (fact-checked AI CV tailoring, ATS keyword heatmap, and interview dossier co-pilot with explicit "What it will NEVER do" boundaries), placed `/demo` and the live [`GitHub Pages Kanban Dashboard`](https://redasalem.github.io/job-hunter-os/demo-dashboard.html) preview directly under the hero, and synchronized all skill counts consistently (`47` consolidated skills: `29` core + `4` meta + `7` platforms + `7` ATS).
... [lean-ctx: omitted 2 lines]
  - Strengthened [`skills/04-fill-and-apply.md`](skills/04-fill-and-apply.md) and [`docs/execution-safety.md`](docs/execution-safety.md) so the Live DOM Read-Back Table, explicit `APPROVE` gate, and `3–9 s` human pacing jitter are documented as non-negotiable operational trust boundaries.
## [1.2.1] - 2026-11-18 — Pre-Launch DX, Context & Honest Eval Hotfix
### Fixed
- **Quick Start Command & Legacy Header Cleanup:**
  - Replaced un-published `npx job-hunter-os` references across `README.md`, `README.ar.md`, `llms.txt`, and `docs/` with `npx github:redasalem/job-hunter-os` so new users never hit an npm `404` before npm publishing is live.
  - Removed the legacy `<!-- LOVABLE:BEGIN --> ... <!-- LOVABLE:END -->` block (`supabase/migrations/`, `drizzle/`, `LOVABLE_API_KEY`) from `AGENTS.md`.
... [lean-ctx: omitted 2 lines]
  - Added explicit `#grnhse_iframe` embed switching and click-to-mount portal `listbox` instructions to [`skills/04-fill-and-apply.md`](skills/04-fill-and-apply.md) and [`skills/platforms/ats-engines.md`](skills/platforms/ats-engines.md).
... [lean-ctx: omitted 2 lines]
  - Trimmed `.agents/skills/` from 40 wrappers to the 12 primary user-facing entrypoints (`demo`, `setup`, `daily-run`, `apply-url`, `tailor-cv`, `weekly-report`, `linkedin-growth`, `offer-negotiator`, `recruiter-inbox-triage`, `rejection-pattern-analyzer`, `score-calibration`, `contract-and-nda-auditor`), enforced in CI.
... [lean-ctx: omitted 2 lines]
  - Added [`evals/PROMPT.md`](evals/PROMPT.md) and `eval --file <json>` / `--baseline` flags to [`bin/cli.mjs`](bin/cli.mjs), clearly labeling `--baseline` as **"Harness Reference Baseline (CI Self-Test)"**.
... [lean-ctx: omitted 1 lines]
## [1.2.0] - 2026-11-18 — The Verified & Consolidated Edition
### Added
- **Deterministic Skill Evaluation Harness (`evals/` & `npx job-hunter-os eval`):**
  - 20 automated assertions (`EVAL-01`..`EVAL-20`) grading [`evals/results/baseline-verified-run.json`](evals/results/baseline-verified-run.json) against ground-truth [`evals/fixtures/candidate-profile.md`](evals/fixtures/candidate-profile.md), 5 edge-case job descriptions (`01-strong-match.md`, `02-prompt-injection-trap.md`, `03-ghost-expired-job.md`, `04-blacklist-duplicate.md`, `05-stretch-mismatch.md`), and 3 self-contained local HTML ATS form mocks (`greenhouse-mock.html`, `lever-mock.html`, `ashby-mock.html`).
... [lean-ctx: omitted 1 lines]
- **Platform Playbook 60-Day Freshness Audit (`last_verified` & `npx job-hunter-os doctor`):**
  - Added `last_verified: "2026-11-18"` frontmatter to all platform playbooks in `skills/platforms/` and upgraded `doctor` to warn automatically when any playbook exceeds 60 days without verification.
... [lean-ctx: omitted 3 lines]
  - Extracted deep reference tables into [`docs/SKILL_CATALOG.md`](docs/SKILL_CATALOG.md), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), and [`docs/COMPATIBILITY.md`](docs/COMPATIBILITY.md).
... [lean-ctx: omitted 1 lines]
### Changed
- **Consolidated & Deduplicated Skill Catalog (57 -> 47 High-Signal Skills, 41 -> 40 `.agents/skills/` Wrappers):**
  - Merged 10 duplicate single-board boilerplate files (`indeed.md`, `glassdoor.md`, `dice.md`, `ziprecruiter.md`, `weworkremotely.md`, `remoteok.md`, `welcometothejungle.md`, `builtin.md`, `wuzzuf.md`, `bayt.md`) into their canonical category playbooks ([`global-boards.md`](skills/platforms/global-boards.md), [`remote-boards.md`](skills/platforms/remote-boards.md), [`mena-boards.md`](skills/platforms/mena-boards.md)) and removed duplicate `.agents/skills/portfolio-auditor` in favor of `.agents/skills/portfolio-and-github-auditor`.
... [lean-ctx: omitted 1 lines]
  - Upgraded `actions/checkout` and `actions/setup-node` to `@v5` across `.github/workflows/validate-repo.yml` and `.github/workflows/publish-npm.yml`.
## [1.1.0] - 2026-11-18 — Resilience, Security & Chaos Shield Edition
### Added
- **3 New Security, Anti-Ban & Chaos-Resilience Skills (`57` Total Skills in `skills/REGISTRY.md` & `skills/skills-manifest.json`):**
  - [`skills/24-circuit-breaker-and-antiban.md`](skills/24-circuit-breaker-and-antiban.md): Defines immediate trip conditions (CAPTCHA, Cloudflare/DataDome/Arkose frames, HTTP 429/403 rate limits, unusual-activity banners, or forced login redirects) and persists a 24-hour platform lock in `logs/circuit-breaker.json`.
  - [`skills/25-prompt-injection-defense.md`](skills/25-prompt-injection-defense.md): Treats all scraped JDs and form labels inside `browser_snapshot` as `UNTRUSTED_EXTERNAL_DATA`, blocks indirect prompt injections and honeypot trap fields, and distinguishes benign recruiter Easter-egg attention checks (`"Include PINEAPPLE in cover letter"`) in the Mission Control Table.
  - [`skills/26-deduplication-and-blacklist-guard.md`](skills/26-deduplication-and-blacklist-guard.md): Enforces `blacklisted_companies` and `blacklisted_domains` in `context/preferences.yaml` plus cross-channel canonical job fingerprinting (`normalize(company)::normalize(role_title)`) against `logs/applications-log.json`.
... [lean-ctx: omitted 5 lines]
  - `npx job-hunter-os backup`: Verifies JSON parse integrity of `logs/applications-log.json`, `logs/skipped-jobs.json`, and `logs/circuit-breaker.json` and snapshots `context/` + `logs/` into timestamped `logs/backups/backup-<timestamp>/` directories.
... [lean-ctx: omitted 1 lines]
## [1.0.0] - 2026-11-18
### Added
- **54-Skill Progressive Disclosure Catalog (`skills/REGISTRY.md` & `skills/skills-manifest.json`):**
  - **25 Core & Career-Ops Playbooks (`00`–`23` + `fallback-no-mcp`):** Readiness Gatekeeper with live URL reachability verification (`00`), Daily Run Orchestrator (`00`), Pure-AI CV Ingestion (`01`), Batch Discovery, Ghost-Job Filter & Mission Control (`02`), Anti-Hallucination HTML/PDF Tailoring & Humanizer (`03`), Upload-First ATS Form Filling & `APPROVE` Gate (`04`), Interview Dossier & `<= 75`-Word Outreach (`05`), Local JSON + Optional Notion Sync & Weekly Reports (`06`), Multi-Persona Career Switcher (`07`), 7-Day Follow-Up Radar (`08`), Salary & B2B Rate Negotiator (`09`), Scheduled `/loop` Runner (`10`), GitHub & Portfolio Auditor (`11`), Recruiter Inbox Triage (`12`), Company Due Diligence & Health Badges (`13`), Privacy & PII Redaction Shield (`14`), Multilingual & RTL Adaptation (`15`), Rejection Pattern Analyzer (`16`), Score Calibration & Weight Tuner (`17`), Condition-Based Browser Waiting (`18`), On-Demand MCP Tool Routing (`19`), Skill Authoring Standard (`20`), ATS Keyword Heatmap (`21`), Technical Assessment Architect (`22`), and Employment Contract & B2B NDA Auditor (`23`).
... [lean-ctx: omitted 1 lines]
  - **18 Job-Board & Regional Playbooks (`skills/platforms/`):** LinkedIn, Wellfound, Indeed, Glassdoor, WeWorkRemotely, RemoteOK, Welcome to the Jungle (Otta), BuiltIn, Dice, ZipRecruiter, Wuzzuf, Bayt, B2B Contract Networks (`Toptal`, `Braintrust`, `Lemon.io`, `Gun.io`, `Contra`, `Arc.dev`, `Turing`), plus regional/category routers (`global-boards`, `remote-boards`, `mena-boards`, `ats-engines`).
... [lean-ctx: omitted 2 lines]
  - Synchronized `SKILL.md` wrappers for all primary workflows (`00`–`23`), meta-skills, and slash-command entrypoints so `/skills` auto-discovers immediately in VS Code Copilot, Cursor, OpenAI Codex CLI, OpenCode, Goose, Amp, and Zed.
- **Zero-Dependency Cross-Platform Node.js CLI (`bin/cli.mjs`) & OS One-Liners (`scripts/install.sh`, `scripts/install.ps1`):**
... [lean-ctx: omitted 1 lines]
  - Commands: `init [--global] [--ide <name>]`, `update`, `doctor` (with live profile/portfolio URL verifier), `status` (gates, warm-up cap & funnel summary), `bundle` (single-file web-chat master prompt exporter to `logs/exports/web-chat-master-prompt.md`), `dashboard` (local Kanban & analytics generator at `logs/exports/dashboard.html`), `login`, and `sync-mcp`.
... [lean-ctx: omitted 1 lines]
  - Single-file HTML/CSS/JS dashboard displaying KPI cards, 5-column lifecycle Kanban board (`Applied`, `Interviewing`, `Technical Assessment`, `Offer`, `Rejected / Ghosted`), platform yield breakdown, instant JSON file loader, and synthetic demo mode.
... [lean-ctx: omitted 6 lines]
  - `PLATFORMS.md` compatibility matrix, `llms.txt` (`llmstxt.org` discovery), `HIRED.md` community success ledger, MIT `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, cross-OS GitHub Actions CI (`.github/workflows/validate-repo.yml`), and automated npm release workflow (`.github/workflows/publish-npm.yml`).

