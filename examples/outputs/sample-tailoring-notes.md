# Tailoring Notes (Sample Output — Synthetic)

> Synthetic only. Uses sandbox fixtures (`examples/sandbox-demo/`, `evals/fixtures/`).  
> No real candidate PII. Copy this shape into `logs/resumes/<slug>/tailoring-notes.md`.

- **Company:** CloudScale Payments
- **Role:** Senior Full-Stack & AI Engineer
- **job_id:** `greenhouse:cloudscale-4012`
- **Mode:** `dry_run` (no Submit)
- **Match score:** `9.2 / 10` · **Tier:** A

## JD asked (top requirements)

- TypeScript / Node.js backend services
- PostgreSQL + reliable webhook/event processing
- Playwright (or equivalent) automation + CI ownership
- React developer consoles
- LLM / MCP tool-calling pipelines (nice-to-have)

## What changed on the CV

- Rewrote Summary to foreground TypeScript, Node.js, PostgreSQL, Playwright.
- Reordered NilePay Sandbox bullets: latency cut + webhook idempotency first.
- Surfaced AgentEval MCP under Experience (verified in profile); did **not** invent Kubernetes.

## Evidence Map

| CV claim | Verified source |
|----------|-----------------|
| Cut checkout p95 `420ms -> 165ms` | `evals/fixtures/candidate-profile.md` · NilePay Sandbox |
| PostgreSQL idempotency for high-volume webhooks | same · NilePay Sandbox |
| Playwright suite in GitHub Actions | same · NilePay Sandbox |
| MCP evaluation harness experience | same · AgentEval MCP project |

## ATS Keyword Heatmap (Before → After)

| Bucket | Before | After | Newly surfaced (verified) | True Gaps |
|--------|--------|-------|---------------------------|-----------|
| Hard skills / languages | 3/5 | 5/5 | TypeScript, PostgreSQL | — |
| Tools / infra | 2/4 | 4/4 | Playwright, GitHub Actions | Kubernetes (0 verified years) |
| Domain / method | 2/3 | 3/3 | webhook idempotency | — |
| Seniority / ownership | 1/2 | 2/2 | CI ownership | — |
| **Overall** | **8/14** | **14/14*** | *excluding True Gaps* | Kubernetes |

\*After count only includes verified facts. Kubernetes remains isolated below.

## True Gaps (not claimed)

- Kubernetes / EKS — absent from verified profile; do not list on CV.
- Terraform — not verified; discuss only if owner confirms later.

## Same-family decisions

| JD term | Listed as | Base skill | Interview risk |
|---------|-----------|------------|----------------|
| CI/CD | GitHub Actions | existing GA pipelines | Low — review YAML diffs before interview |

## Poster / hiring-manager DM (`<= 75` words) — DRAFT_ONLY

```text
Hi Tariq, I applied for the Senior Full-Stack & AI Engineer role at CloudScale Payments.
I have spent five years building TypeScript and PostgreSQL payment APIs, including cutting
checkout p95 latency from 420ms to 165ms, and maintaining Playwright CI suites. Happy to
share how our webhook idempotency work maps to your team.
```

Word count: under 75. Status: `DRAFT_ONLY` — requires explicit owner `APPROVE` before Send.
