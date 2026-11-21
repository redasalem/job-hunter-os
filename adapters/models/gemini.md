# Model Tuning Guide — Google Gemini (Pro / Flash & Antigravity)

Optimized for **Antigravity**, **Gemini CLI**, and **Gemini Pro / Flash** agents running `veycraft`.

## 1. Large Context Without Eager Loading
- Even with a 1M+ token window, **still follow Progressive Disclosure** (`AGENTS.md` -> `skills/REGISTRY.md` -> active skill only). Loading all 35+ playbooks upfront dilutes attention across unrelated platform rules.
- During long runs, execute `skills/meta-context-compaction.md` every 3–5 applications so caps and approvals remain crisp in working memory.

## 2. Multimodal Screenshot + Accessibility Snapshot Cross-Check
- Use `browser_snapshot` accessibility refs (`role` + accessible name + `ref`) for every click, type, select, and upload.
- Pair snapshots with visual screenshots (`browser_take_screenshot` when exposed) in two places:
  1. **PDF & CV inspection (`skills/03-tailor-resume-and-verify.md`):** Visually verify the rendered `resume.html` / `resume.pdf` has zero overlapping text, cut-off bullets, or blank second pages.
  2. **Complex ATS forms (`skills/04-fill-and-apply.md`):** Confirm custom dropdowns, location autocompletes, and uploaded filenames visually match the accessibility tree before requesting `APPROVE`.

## 3. Native PDF & Media Ingestion
- When ingesting an owner's CV PDF (`skills/01-resume-ingestion.md`), read the PDF directly or open `file:///...` in Playwright MCP, warn immediately if pages are rasterized/scanned images, and verify every extracted fact with the owner in chat.
