$ErrorActionPreference = "Stop"

$Root = $PSScriptRoot
$RunDir = Join-Path $Root ".run"

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Stop-PidFile {
    param(
        [string]$Name,
        [string]$PidFile
    )

    if (!(Test-Path $PidFile)) {
        Write-Host "$Name PID file not found. Skipping."
        return
    }

    $pidValue = Get-Content $PidFile -ErrorAction SilentlyContinue | Select-Object -First 1
    if (!$pidValue) {
        Remove-Item $PidFile -ErrorAction SilentlyContinue
        Write-Host "$Name PID file was empty. Skipping."
        return
    }

    $process = Get-Process -Id ([int]$pidValue) -ErrorAction SilentlyContinue
    if ($process) {
        Stop-Process -Id $process.Id -Force
        Write-Host "$Name stopped. PID: $($process.Id)"
    } else {
        Write-Host "$Name process was not running."
    }

    Remove-Item $PidFile -ErrorAction SilentlyContinue
}

Write-Step "Stopping local app processes"
Stop-PidFile "Backend" (Join-Path $RunDir "backend.pid")
Stop-PidFile "Frontend" (Join-Path $RunDir "frontend.pid")

Write-Step "Stopping Docker services"
docker compose -f (Join-Path $Root "docker-compose.yml") stop postgres pgadmin

Write-Host ""
Write-Host "Stopped. Start again with: .\start.ps1" -ForegroundColor Green
