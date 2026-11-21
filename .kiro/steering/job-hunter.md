---
inclusion: always
---

# Veycraft — AWS Kiro Steering Rules

Read `AGENTS.md` and `skills/REGISTRY.md` first (Progressive Disclosure: load a specific `skills/*.md` playbook only when its trigger matches the current phase).

- Readiness & onboarding: `skills/00-interrogate-and-onboard.md`, `skills/01-resume-ingestion.md`
- Discovery, ghost filter & Mission Control: `skills/02-discover-and-triage.md`
- Tailoring, fact-check & humanizer: `skills/03-tailor-resume-and-verify.md`
- Upload-first form filling & `APPROVE` gate: `skills/04-fill-and-apply.md`
- Outreach, logging, personas, follow-ups, negotiation, loop, portfolio & inbox triage: `skills/05-outreach-and-interview-prep.md` through `skills/12-recruiter-inbox-triage.md`

Connect Playwright MCP using `mcp/mcp.template.json`. Never invent CV metrics, guess unknown legal answers, or submit without explicit owner approval.
