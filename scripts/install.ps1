param(
  [switch]$DryRun,
  [switch]$Uninstall,
  [switch]$Help
)

$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/redasalem/veycraft.git"

if ($Help) {
  Write-Host @"
Veycraft Installer (Windows PowerShell)
Usage:
  powershell -File scripts\install.ps1             Install or update Veycraft globally
  powershell -File scripts\install.ps1 -DryRun     Preview target directories without making changes
  powershell -File scripts\install.ps1 -Uninstall  Show safe uninstall steps (preserves context/ & logs/)
"@
  exit 0
}

$PrimaryHome = Join-Path $HOME ".veycraft"
$LegacyHome = Join-Path $HOME ".job-hunter-os"
if ($env:VEYCRAFT_HOME) {
  $HomeDir = $env:VEYCRAFT_HOME
} elseif ((Test-Path $PrimaryHome) -or (-not (Test-Path $LegacyHome))) {
  $HomeDir = $PrimaryHome
} else {
  $HomeDir = $LegacyHome
  Write-Host "[veycraft] Detected existing legacy checkout at $HomeDir; preserving it in place."
}

if ($Uninstall) {
  Write-Host "[veycraft] Safe Uninstall Guide (no personal data deleted):"
  Write-Host "  1. If installed globally via npm: npm uninstall -g veycraft"
  Write-Host "  2. Your private career data in $HomeDir (context/, logs/, browser-profile/) is preserved."
  Write-Host "  3. To remove Veycraft files completely later (optional): Remove-Item -Recurse -Force `"$HomeDir`""
  exit 0
}

if ($DryRun) {
  Write-Host "[veycraft] DRY RUN — no files will be created or modified."
  Write-Host "  Repository:  $RepoUrl"
  Write-Host "  Target Home: $HomeDir"
  Write-Host "  Actions:     clone/pull repo -> verify Node >= 18 -> run 'node $HomeDir\bin\cli.mjs init --global'"
  Write-Host "  Preserved:   $HomeDir\context\, $HomeDir\logs\, $HomeDir\browser-profile\, existing custom IDE rules"
  exit 0
}

Write-Host "[veycraft] Installing to $HomeDir..."

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "[veycraft] git is required. Install Git for Windows from https://git-scm.com/ and re-run."
  exit 1
}

if (Get-Command node -ErrorAction SilentlyContinue) {
  $nodeMajor = [int](node -p "Number(process.versions.node.split('.')[0])")
  if ($nodeMajor -lt 18) {
    Write-Error "[veycraft] Node.js >= 18 is required (found $(node -v)). Upgrade from https://nodejs.org/."
    exit 1
  }
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
