# ChatGPT Desktop, Custom GPTs, Claude Projects & Gemini Gems Guide

Use this adapter when running **Veycraft** inside a hosted desktop or web chat client (`ChatGPT`, `Claude Projects`, `Gemini Gems`) where local Playwright MCP or local filesystem tools may not be attached.

## 1. With MCP / Desktop Local Tools Enabled
If your desktop app supports MCP (e.g., Claude Desktop via `mcp/claude_desktop_config.example.json` or ChatGPT Desktop connectors):
1. Point the agent to your local `veycraft/` folder.
2. Instruct it: `"Read AGENTS.md and skills/REGISTRY.md first, then run /setup."`
3. Follow the normal `skills/00-interrogate-and-onboard.md` -> `skills/06-log-and-insights.md` lifecycle.

## 2. Without MCP (Pure Web Chat / Custom GPT / Project / Gem)
1. Upload `AGENTS.md`, `skills/REGISTRY.md`, `skills/03-tailor-resume-and-verify.md`, `skills/fallback-no-mcp.md`, and `templates/ats-resume-template.html` into your Project/Gem knowledge base (never upload real `.env` tokens or passwords).
2. Paste a **redacted** copy of your `context/profile.md` + `context/form-answers.yaml` and the full job description into chat.
3. Ask the model to follow `skills/fallback-no-mcp.md`:
   - Score the job `0–10` honestly against your profile.
   - Output fact-checked, humanized ATS HTML (`templates/ats-resume-template.html` with zero invented metrics or AI slop).
   - Provide grounded answers for any form questions and flag unknowns for you to confirm.
4. Save the HTML locally, open it in Chrome/Edge (`Print -> Save as PDF`, A4, no headers/footers), inspect the PDF (`<= 200 KB`), submit manually, and record the outcome in `logs/applications-log.json`.
