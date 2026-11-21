---
name: tailor-cv
description: Load when the owner wants to tailor an ATS resume and cover letter for a specific job URL or pasted JD (/tailor-cv) with zero hallucinated metrics or AI-slop clichés (never submits).
---

# Veycraft Tailor CV

1. Read `AGENTS.md` and `skills/REGISTRY.md` first.
2. Follow `.agent/workflows/tailor-cv.md`: inspect the supplied job URL via Playwright MCP if connected, or ask the owner to paste the JD text if MCP is unavailable. If `context/profile.md` / `context/cv.md` are not yet set up, ask for the CV directly in chat (`skills/01-resume-ingestion.md`) instead of blocking.
3. Execute `skills/03-tailor-resume-and-verify.md` + `skills/21-ats-keyword-heatmap.md` (`resume.html`, `resume.doc`, `resume.txt`, `tailoring-notes.md`, plus `resume.pdf` or print-to-PDF instructions) and `skills/05-outreach-and-interview-prep.md` (`interview-dossier.md`). Support owner revisions and never apply or submit.
