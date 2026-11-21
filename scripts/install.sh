#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/redasalem/veycraft.git"
if [ -d "${HOME}/.veycraft" ] || [ ! -d "${HOME}/.job-hunter-os" ]; then
  HOME_DIR="${HOME}/.veycraft"
else
  HOME_DIR="${HOME}/.job-hunter-os"
  echo "[veycraft] Detected existing legacy checkout at ${HOME_DIR}; preserving it in place."
fi

echo "[veycraft] Installing to ${HOME_DIR}..."

if ! command -v git >/dev/null 2>&1; then
  echo "[veycraft] Error: git is required." >&2
  exit 1
fi

if [ -d "${HOME_DIR}/.git" ]; then
  echo "[veycraft] Updating existing checkout in ${HOME_DIR} (preserving context/, logs/, browser-profile/)..."
  git -C "${HOME_DIR}" remote set-url origin "${REPO_URL}" 2>/dev/null || true
  git -C "${HOME_DIR}" pull --ff-only origin main || echo "[veycraft] Warning: could not pull; keeping existing checkout."
elif [ -e "${HOME_DIR}" ]; then
  echo "[veycraft] Using existing directory ${HOME_DIR}."
else
  git clone --depth 1 "${REPO_URL}" "${HOME_DIR}"
fi

if command -v node >/dev/null 2>&1; then
  node "${HOME_DIR}/bin/cli.mjs" init --global
else
  echo "[veycraft] Node.js not found — copying skills directly to global IDE directories..."
  mkdir -p "${HOME}/.agents/skills" "${HOME}/.claude/skills" "${HOME}/.claude/commands" \
           "${HOME}/.gemini/antigravity/global_workflows" "${HOME}/.antigravity/skills" \
           "${HOME_DIR}/logs/runs" "${HOME_DIR}/logs/resumes" "${HOME_DIR}/logs/screenshots" \
           "${HOME_DIR}/assets" "${HOME_DIR}/browser-profile"

  cp -r "${HOME_DIR}/.agents/skills/." "${HOME}/.agents/skills/"
  cp -r "${HOME_DIR}/.agents/skills/." "${HOME}/.claude/skills/"
  cp -r "${HOME_DIR}/commands/." "${HOME}/.claude/commands/"
  cp -r "${HOME_DIR}/.agent/workflows/." "${HOME}/.gemini/antigravity/global_workflows/"
  cp -r "${HOME_DIR}/skills/." "${HOME}/.antigravity/skills/"

  for ex in "${HOME_DIR}"/context/*.example; do
    base="${ex%.example}"
    [ -e "${base}" ] || cp "${ex}" "${base}"
  done
  [ -e "${HOME_DIR}/logs/applications-log.json" ] || printf '[]\n' > "${HOME_DIR}/logs/applications-log.json"
  [ -e "${HOME_DIR}/logs/skipped-jobs.json" ] || printf '[]\n' > "${HOME_DIR}/logs/skipped-jobs.json"

  echo "[veycraft] Global skills installed to ~/.agents/skills, ~/.claude/skills, and ~/.gemini/antigravity/global_workflows."
  echo "[veycraft] Start in your AI IDE with /demo (zero personal data) or /quick-tailor (1 CV + 1 JD, no browser login). For full multi-platform automation later, connect mcp/mcp.template.json and run /setup."
fi
