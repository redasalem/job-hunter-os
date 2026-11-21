$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/redasalem/veycraft.git"
$PrimaryHome = Join-Path $HOME ".veycraft"
$LegacyHome = Join-Path $HOME ".job-hunter-os"
if ((Test-Path $PrimaryHome) -or (-not (Test-Path $LegacyHome))) {
  $HomeDir = $PrimaryHome
} else {
  $HomeDir = $LegacyHome
  Write-Host "[veycraft] Detected existing legacy checkout at $HomeDir; preserving it in place."
}

Write-Host "[veycraft] Installing to $HomeDir..."

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git is required."
  exit 1
}

if (Test-Path (Join-Path $HomeDir ".git")) {
  Write-Host "[veycraft] Updating existing checkout (preserving context/, logs/, browser-profile/)..."
  git -C $HomeDir remote set-url origin $RepoUrl 2>$null
  git -C $HomeDir pull --ff-only origin main
} elseif (-not (Test-Path $HomeDir)) {
  git clone --depth 1 $RepoUrl $HomeDir
}

if (Get-Command node -ErrorAction SilentlyContinue) {
  node (Join-Path $HomeDir "bin\cli.mjs") init --global
} else {
  Write-Host "[veycraft] Node.js not found — copying skills directly to global IDE directories..."
  $targets = @(
    (Join-Path $HOME ".agents\skills"),
    (Join-Path $HOME ".claude\skills"),
    (Join-Path $HOME ".claude\commands"),
    (Join-Path $HOME ".gemini\antigravity\global_workflows"),
    (Join-Path $HOME ".antigravity\skills"),
    (Join-Path $HomeDir "logs\runs"),
    (Join-Path $HomeDir "logs\resumes"),
    (Join-Path $HomeDir "logs\screenshots"),
    (Join-Path $HomeDir "assets"),
    (Join-Path $HomeDir "browser-profile")
  )
  foreach ($t in $targets) { New-Item -ItemType Directory -Force -Path $t | Out-Null }

  Copy-Item -Recurse -Force (Join-Path $HomeDir ".agents\skills\*") (Join-Path $HOME ".agents\skills\")
  Copy-Item -Recurse -Force (Join-Path $HomeDir ".agents\skills\*") (Join-Path $HOME ".claude\skills\")
  Copy-Item -Recurse -Force (Join-Path $HomeDir "commands\*") (Join-Path $HOME ".claude\commands\")
  Copy-Item -Recurse -Force (Join-Path $HomeDir ".agent\workflows\*") (Join-Path $HOME ".gemini\antigravity\global_workflows\")
  Copy-Item -Recurse -Force (Join-Path $HomeDir "skills\*") (Join-Path $HOME ".antigravity\skills\")

  Get-ChildItem -Path (Join-Path $HomeDir "context") -Filter "*.example" | ForEach-Object {
    $dest = $_.FullName -replace '\.example$', ''
    if (-not (Test-Path $dest)) { Copy-Item $_.FullName $dest }
  }
  $appsLog = Join-Path $HomeDir "logs\applications-log.json"
  if (-not (Test-Path $appsLog)) { Set-Content -Path $appsLog -Value "[]" -Encoding UTF8 }
  $skipLog = Join-Path $HomeDir "logs\skipped-jobs.json"
  if (-not (Test-Path $skipLog)) { Set-Content -Path $skipLog -Value "[]" -Encoding UTF8 }

  Write-Host "[veycraft] Global skills installed. Start in your AI IDE with /demo (zero personal data) or /quick-tailor (1 CV + 1 JD, no browser login). For full browser-assisted automation later, connect mcp\mcp.template.json and run /setup."
}
