---
name: skill-authoring-standard
version: "1.0.0"
description: Load whenever creating, refactoring, auditing, or contributing a new skill or job-board playbook to veycraft; combines Anthropic official Skill Creator progressive-disclosure rules, agentskills.io auto-discovery conventions, TDD pressure-testing discipline, and veycraft CI schema verification.
triggers:
  - author a new skill or platform playbook
  - edit or audit an existing skill
  - prepare skill PR for veycraft
requires_mcp:
  - none
preconditions:
  - target workflow capability or regional job board is clearly scoped and does not duplicate an existing skill in skills/REGISTRY.md
  - CONTRIBUTING.md and .github/workflows/validate-repo.yml requirements are readable
requires_skills:
  - meta-self-verification
  - privacy-pii-shield
verification:
  - new or updated skill passes all 8 YAML frontmatter keys, 3 mandatory H2 section headers, and stays concise (< 500 lines)
  - skill is indexed identically in skills/REGISTRY.md, skills/skills-manifest.json, and (for core capabilities) .agents/skills/<name>/SKILL.md
  - local JSON/YAML/Markdown-link/security checks pass with zero broken links and zero tracked personal data before proposing commit
---
# Skill Authoring & Contributor Standard (Adapted from `anthropics/skills` & `obra/superpowers`)

## When to Use & Preconditions

Ensures every community-contributed career skill, ATS playbook, or regional board guide triggers reliably, fits within lean context budgets, and passes CI on the first run.

- **Load when:** `author a new skill or platform playbook`; `edit or audit an existing skill`; `prepare skill PR for veycraft`.
- **Preconditions (stop if any is false):**
  - desired capability does not duplicate an existing entry in `skills/REGISTRY.md`
  - `.github/workflows/validate-repo.yml` checks are readable
- **Requires skills:** `meta-self-verification`, `privacy-pii-shield`. **MCP:** none.

## Deterministic Step-by-Step Execution

1. **Apply the Baseline Failure First (Skill TDD Rule):**
   - Identify the exact real-world failure mode the skill prevents (e.g., an agent hallucinating metrics, skipping an ATS confirmation snapshot, or clicking through a login wall). Do not author vague filler essays.
2. **Design for Progressive Disclosure (`< 500` Lines):**
   - Keep the main skill Markdown concise and actionable (`~40–150` lines ideal; strictly under `500` lines).
   - Write in clear **imperative steps** and explain *why* non-obvious constraints exist.
3. **Follow Exact `veycraft` + `agentskills.io` Contract:**
   - **Location:** core/career skills live at `skills/<NN>-<slug>.md`; job boards live at `skills/platforms/<board>.md` (start from `skills/platforms/_template.md`); employer ATS guides live at `skills/ats/<engine>.md`.
   - **8 Required YAML Frontmatter Keys:** `name`, `version`, `description` (explicitly state *when to trigger* and what contexts activate it — never spoil a shortcut summary of the whole workflow so models still read the body), `triggers`, `requires_mcp` (strictly required MCPs: `playwright`, `notion`, or `none`; add optional `optional_mcp` when an MCP only enhances optional steps such as PDF printing or Notion sync), `preconditions`, `requires_skills` (matching existing `name`s), and `verification`.
   - **3 Mandatory Exact H2 Headings:**
     - `## When to Use & Preconditions`
     - `## Deterministic Step-by-Step Execution`
     - `## Anti-Patterns (What NEVER To Do) & Self-Verification Check`
4. **Wire Discovery & Indexes Atomically:**
   - Add a matching row to `skills/REGISTRY.md` (and update total skill count).
   - Add the matching JSON object to `skills/skills-manifest.json`.
   - Add `.agents/skills/<name>/SKILL.md` with exact `name: <name>` matching the directory name and `description` >= 20 chars so `/skills` auto-discovery works in VS Code, Cursor, Codex, and OpenCode.
   - If adding a job board, add an `enabled: false` entry in `context/targets.yaml.example` and list it in `PLATFORMS.md`.
5. **Run Full Verification Before Commit (`verification-before-completion`):**
   - Verify valid JSON, valid YAML, zero broken relative Markdown links, zero broken `skills/` file references, and `privacy-pii-shield` compliance before claiming the PR is ready.

## Anti-Patterns (What NEVER To Do) & Self-Verification Check

- **NEVER** summarize the entire step-by-step workflow inside the `description` frontmatter field (agents may skip reading the body).
- **NEVER** introduce runtime npm dependencies, `.pdf` resume fixtures, or personal URLs/emails in example templates.
- **NEVER** leave a new skill unindexed in `skills/REGISTRY.md` or `skills/skills-manifest.json`.
- **Self-Verification Check:** Before completing, verify frontmatter keys, all 3 exact H2 headings, `REGISTRY.md` + `skills-manifest.json` + `.agents/skills/` parity, and observed zero-error validation output.
