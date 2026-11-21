---
name: interrogate-and-onboard
version: "2.0.0"
description: Load when the owner starts /setup, /daily-run, /apply-url, or "Check my folder"; inspects context/ files directly (zero scripts) for missing or placeholder data, interviews the user in batches of 3-4 questions, writes verified answers to context/, and obtains fresh launch consent.
triggers:
  - /setup
  - /daily-run (Step 0)
  - /apply-url (Step 0)
  - Check my folder
requires_mcp:
  - none
optional_mcp:
  - playwright
preconditions:
  - repository root or agent home readable with IDE file tools
requires_skills:
  - resume-ingestion
  - portfolio-and-github-auditor
verification:
  - context/profile.md, context/cv.md, context/preferences.yaml, context/form-answers.yaml, and context/targets.yaml exist with zero placeholder strings
  - all URLs in context/profile.md and context/resume-data.json (GitHub, LinkedIn, Portfolio, Live Demos) are well-formed https:// links and verified reachable (no dead 404 links)
  - context/form-answers.yaml has owner_verified true and all core skill years confirmed
  - owner gave fresh explicit launch confirmation after seeing the Mission Briefing
---
# Pure Chat Readiness Gatekeeper & Setup

## When to Use & Preconditions

Run at the start of `/setup`, `/daily-run`, `/apply-url` (live browser mode), or `"Check my folder"`. You perform readiness audits directly using your file-reading and editing tools (optionally complemented by `node ./bin/cli.mjs doctor`).
**Task-Specific Readiness Rule:** Do **not** force `/setup` or block standalone tasks (CV upload/review/edit/create, `/quick-tailor`, `/tailor-cv`, LinkedIn profile review/drafts, standalone JD analysis/ranking, interview prep, offer/contract review, or local tracking/reports) behind the full 5-gate check. Full 5-gate readiness applies only to `/setup`, `/daily-run`, and live automated ATS submission.

- **Load when:** `/setup`; `/daily-run` (Step 0); `/apply-url` (Step 0); `Check my folder`.
- **Preconditions (stop if any is false):**
  - repository root or agent home readable with IDE file tools
- **Requires skills:** `resume-ingestion`, `portfolio-and-github-auditor`. **MCP:** none (optional `playwright` for Gate 5 headed login and PDF export).

## Deterministic Step-by-Step Execution

### 1. Audit the 5 Readiness Gates & Live Profile Links directly in `context/`
Read these files yourself and check for missing files or placeholder tokens (`example.com`, `example.invalid`, `your-handle`, `your-site`, `replace-with`, `Acme Fintech`, `Nile Commerce`, `Jane Doe`, `John Doe`, `reda@example.com`, `owner_verified: false`):

| Gate | Files inspected | Pass condition |
|---|---|---|
| 1 · CV, Profile & Live Links | `context/profile.md`, `context/cv.md`, `context/resume-data.json`, `assets/resume.pdf` (or `context/resume.pdf`) | Real owner facts confirmed, no placeholders, readable base PDF exists, and every GitHub/LinkedIn/Portfolio/Demo URL is well-formed (`https://`) and reachable (zero `404` dead links) |
| 2 · Target Strategy | `context/preferences.yaml` | Confirmed `roles`, `seniority`, `work_modes` (Remote/Hybrid/Onsite), `regions`, `timezones`, and `blacklisted_companies` (empty `[]` is valid if confirmed) |
| 3 · Terms & Legal | `context/form-answers.yaml` | `owner_verified: true`, minimum salary + currency + period, notice period / earliest start date, work authorization countries, visa sponsorship needs, and `eeo_and_compliance_defaults` |
| 4 · Skills Matrix | `context/form-answers.yaml` (`skills_years`) | Exact confirmed hands-on years for every core skill (`0` is allowed; guessing is forbidden) |
| 5 · Platform Access | `context/targets.yaml` + Playwright MCP | At least one target with `enabled: true` and real URL; headed browser session verified within 24 h |

- **Live Link Verification Pass:** Extract all URLs from `context/profile.md` and `context/resume-data.json`. Verify each link is well-formed `https://` and contains zero placeholder domains. During `/setup` (or via `npx github:redasalem/veycraft doctor`), verify reachability so a broken `404` portfolio or GitHub project URL is never sent to a recruiter (`skills/11-portfolio-and-github-auditor.md`).

- If `.example` templates exist and private `context/` files are absent, copy the structure from `context/*.example` only after replacing placeholders with real owner-confirmed values.
- **Missing Base `assets/resume.pdf` Fallback:** If the owner provides CV text or `.md` during `/setup` and does not yet have a base `assets/resume.pdf`, generate `logs/resumes/base/resume.html` from `templates/ats-resume-template.html` and export `assets/resume.pdf` via Playwright MCP (or give one-step browser `Print -> Save as PDF` instructions) instead of blocking them at Gate 1.
- **No-Browser-Login Alternative:** If the owner only wants to tailor a CV right now without full multi-platform setup, remind them they can run `/quick-tailor` immediately with zero browser login.

### 2. Hard Block & Focused 3–4-Question Interview
If ANY gate fails:
- Show 5 concise status lines (`✅` / `❌`) showing exactly what is missing. Never dump full profiles or secrets.
- **Stop all discovery, tailoring, and applications.**
- Interview the owner in batches of **3–4 questions at a time** in their language:
  - **Batch 1 (CV & Targets):** Ask for their CV (`skills/01-resume-ingestion.md`), target roles/seniority, Remote/Hybrid/Onsite + regions/timezone, and any blacklisted companies.
  - **Batch 2 (Legal, Comp & Skills):** Ask minimum salary (amount + currency + hourly/monthly/annual), notice period / earliest start (`YYYY-MM-DD`), work authorization + sponsorship rules, and exact hands-on years for each extracted core skill.
  - **Batch 3 (Platforms, EEO & Login):** Confirm which boards in `context/targets.yaml` to enable, confirm `eeo_and_compliance_defaults` (`gender`, `ethnicity`, `veteran_status`, `disability_status`, `referral_source`, `gdpr_privacy_consent`), and open Playwright MCP in headed mode so the owner can log in privately (never ask for passwords in chat).
- Wait for each reply, summarize your understanding, write confirmed facts into `context/` using your file tools, and update `context/readiness-state.json` timestamps (`verified_at`, `updated_at`, `overall_ready: true`, `status: "READY_100%"`).

### 3. Mission Briefing & Per-Run Launch Consent
Even when all 5 gates are `✅`, NEVER jump straight into applying:
- Show a short Mission Briefing: confirmed roles/regions, enabled platforms, effective daily cap (max **5/day** on the first 3 distinct run dates, or lower configured cap), minimum match score (`min_match_score`), and `dry_run` status (`ON` or `LIVE`).
- Ask: **"Confirm to launch this run?"** and wait for an explicit affirmative reply in chat before calling `skills/02-discover-and-triage.md`.

## Anti-Patterns (What NEVER To Do) & Self-Verification Check

### Anti-patterns
- ❌ Copying salary, authorization, or skill years from `.example` files → ✅ examples are placeholders; always confirm with the owner.
- ❌ Asking 12 questions in one wall of text → ✅ ask 3–4 focused questions, wait, save, then continue.
- ❌ Treating `READY_100%` or `/daily-run` as permission to submit without a Mission Briefing → ✅ always get explicit launch consent per run.

### Self-verification check (before reporting this step complete)
- [ ] `context/profile.md`, `context/cv.md`, `context/preferences.yaml`, `context/form-answers.yaml`, and `context/targets.yaml` exist with zero placeholder strings
- [ ] `context/form-answers.yaml` has `owner_verified: true` and all core skill years confirmed
- [ ] owner gave fresh explicit launch confirmation after seeing the Mission Briefing

### Chrome Remote Debugging Recovery
If browser automation fails with `DevToolsActivePort` not found:
1. Ask the user to ensure Google Chrome is open and signed in to LinkedIn.
2. Guide them to open `chrome://inspect/#remote-debugging` in Chrome and enable **Remote Debugging**.
3. Immediately offer the no-browser fallback: pasting job URLs or JD text directly in chat for full scoring and CV tailoring.
