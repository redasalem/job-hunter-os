#!/usr/bin/env bash
set -euo pipefail

# Veycraft inspectable cross-platform installer (macOS / Linux)
# Supports: --dry-run, --uninstall, --help
# Never deletes private user data (context/, logs/, browser-profile/).

REPO_URL="https://github.com/redasalem/veycraft.git"
PINNED_SIGNING_PRINCIPAL="192090175+redasalem@users.noreply.github.com"
PINNED_SIGNING_PUBKEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG7t6GfNExgWOy+djcVZlb62BD9DKRrz81Xk++LTZTSo"

DRY_RUN=0
UNINSTALL=0

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --uninstall) UNINSTALL=1 ;;
    -h|--help)
      cat <<'EOF'
Veycraft Installer (macOS / Linux)
Usage:
  bash scripts/install.sh              Install or update Veycraft globally
  bash scripts/install.sh --dry-run    Preview target directories without making changes
  bash scripts/install.sh --uninstall  Show safe uninstall steps (preserves context/ & logs/)
EOF
      exit 0
      ;;
    *)
      echo "[veycraft] Unknown option: $arg (use --help)" >&2
      exit 1
      ;;
  esac
done

resolve_home_dir() {
  if [ -n "${VEYCRAFT_HOME:-}" ]; then
    printf '%s\n' "${VEYCRAFT_HOME}"
  elif [ -d "${HOME}/.veycraft" ]; then
    printf '%s\n' "${HOME}/.veycraft"
  elif [ -d "${HOME}/.job-hunter-os" ]; then
    printf '%s\n' "${HOME}/.job-hunter-os"
  elif [ "$(uname -s)" = "Linux" ] && [ -n "${XDG_DATA_HOME:-}" ]; then
    printf '%s/veycraft\n' "${XDG_DATA_HOME}"
  else
    printf '%s/.veycraft\n' "${HOME}"
  fi
}

HOME_DIR="$(resolve_home_dir)"

if [ "$UNINSTALL" -eq 1 ]; then
  echo "[veycraft] Safe Uninstall Guide (no personal data deleted):"
  echo "  1. If installed globally via npm: npm uninstall -g veycraft"
  echo "  2. Your private career data in ${HOME_DIR} (context/, logs/, browser-profile/) is preserved."
  echo "  3. To remove Veycraft files completely later (optional): rm -rf \"${HOME_DIR}\""
  exit 0
fi

if [ "$DRY_RUN" -eq 1 ]; then
  echo "[veycraft] DRY RUN — no files will be created or modified."
  echo "  Repository:  ${REPO_URL}"
  echo "  Target Home: ${HOME_DIR}"
  echo "  Actions:     clone/pull repo -> verify Node >= 18 -> run 'node ${HOME_DIR}/bin/cli.mjs init --global'"
  echo "  Preserved:   ${HOME_DIR}/context/, ${HOME_DIR}/logs/, ${HOME_DIR}/browser-profile/, existing custom IDE rules"
  exit 0
fi

echo "[veycraft] Installing to ${HOME_DIR}..."

if ! command -v git >/dev/null 2>&1; then
  echo "[veycraft] Error: git is required. Install Git first and re-run." >&2
  exit 1
fi

if command -v node >/dev/null 2>&1; then
  NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])" 2>/dev/null || echo 0)"
  if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "[veycraft] Error: Node.js >= 18 is required (found $(node -v)). Upgrade Node.js from https://nodejs.org/." >&2
    exit 1
  fi
fi

if [ -d "${HOME_DIR}/.git" ]; then
  echo "[veycraft] Updating existing checkout in ${HOME_DIR} (preserving context/, logs/, browser-profile/)..."
  git -C "${HOME_DIR}" remote set-url origin "${REPO_URL}" 2>/dev/null || true
  git -C "${HOME_DIR}" pull --ff-only origin main || echo "[veycraft] Warning: could not pull; keeping existing checkout."
elif [ -e "${HOME_DIR}" ]; then
  echo "[veycraft] Using existing directory ${HOME_DIR}."
else
  mkdir -p "$(dirname "${HOME_DIR}")"
  git clone --depth 1 "${REPO_URL}" "${HOME_DIR}"
fi

if [ -d "${HOME_DIR}/.git" ]; then
  SIGNERS_FILE="$(mktemp)"
  trap 'rm -f "${SIGNERS_FILE}"' EXIT
  printf '%s namespaces="git" %s\n' "${PINNED_SIGNING_PRINCIPAL}" "${PINNED_SIGNING_PUBKEY}" > "${SIGNERS_FILE}"
  if git -C "${HOME_DIR}" -c gpg.format=ssh -c "gpg.ssh.allowedSignersFile=${SIGNERS_FILE}" verify-commit HEAD >/dev/null 2>&1; then
    echo "[veycraft] Verified upstream commit SSH signature (@redasalem)."
  else
    echo "[veycraft] Note: HEAD commit is signed by GitHub or SSH verify unavailable on this git version; run 'veycraft doctor' to verify provenance files."
  fi
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
