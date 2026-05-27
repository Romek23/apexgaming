$ErrorActionPreference = "Stop"

$Root = $PSScriptRoot
$BackendDir = Join-Path $Root "backend"
$FrontendDir = Join-Path $Root "frontend"
$RunDir = Join-Path $Root ".run"

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Ensure-Directory {
    param([string]$Path)
    if (!(Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
    }
}

function Ensure-EnvFile {
    param(
        [string]$Target,
        [string]$Example
    )

    if (!(Test-Path $Target) -and (Test-Path $Example)) {
        Copy-Item $Example $Target
        Write-Host "Created $Target from example."
    }
}

function Test-Port {
    param([int]$Port)
    return [bool](Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
}

function Get-ListeningProcess {
    param([int]$Port)

    $connection = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
    if (!$connection) {
        return $null
    }

    return Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue
}

function Adopt-ProcessIfExpected {
    param(
        [string]$Name,
        [int]$Port,
        [string[]]$ExpectedProcessNames,
        [string]$PidFile
    )

    $process = Get-ListeningProcess $Port
    if (!$process) {
        return
    }

    Write-Host "$Name port $Port is already in use by $($process.ProcessName) (PID: $($process.Id))."
    $isExpected = $ExpectedProcessNames | Where-Object { $process.ProcessName -like $_ } | Select-Object -First 1
    if ($isExpected) {
        Set-Content -Path $PidFile -Value $process.Id
        Write-Host "$Name process adopted for .\stop.ps1."
    } else {
        Write-Host "Leaving it as-is because the process does not look like this project's $Name."
    }
}

function Start-LoggedProcess {
    param(
        [string]$Name,
        [string]$FilePath,
        [string[]]$Arguments,
        [string]$WorkingDirectory,
        [string]$OutFile,
        [string]$ErrFile,
        [string]$PidFile
    )

    Remove-Item $OutFile, $ErrFile -ErrorAction SilentlyContinue

    $process = Start-Process `
        -FilePath $FilePath `
        -ArgumentList $Arguments `
        -WorkingDirectory $WorkingDirectory `
        -RedirectStandardOutput $OutFile `
        -RedirectStandardError $ErrFile `
        -WindowStyle Hidden `
        -PassThru

    Set-Content -Path $PidFile -Value $process.Id
    Write-Host "$Name started. PID: $($process.Id)"
}

function Ensure-BackendDependencies {
    $Python = Join-Path $BackendDir "venv\Scripts\python.exe"

    if (!(Test-Path $Python)) {
        Write-Step "Creating backend virtual environment"
        python -m venv (Join-Path $BackendDir "venv")
    }

    $check = & $Python -c "import fastapi, uvicorn" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Step "Installing backend runtime dependencies"
        & $Python -m pip install fastapi "uvicorn[standard]"
    }
}

function Ensure-FrontendDependencies {
    $NodeModules = Join-Path $FrontendDir "node_modules"
    if (!(Test-Path $NodeModules)) {
        Write-Step "Installing frontend dependencies"
        npm install --prefix $FrontendDir
    }
}

Ensure-Directory $RunDir

Write-Step "Checking env files"
Ensure-EnvFile (Join-Path $BackendDir ".env") (Join-Path $BackendDir ".env.example")
Ensure-EnvFile (Join-Path $FrontendDir ".env") (Join-Path $FrontendDir ".env.example")

Write-Step "Starting database and pgAdmin"
docker compose -f (Join-Path $Root "docker-compose.yml") up -d postgres pgadmin

Ensure-BackendDependencies
Ensure-FrontendDependencies

Write-Step "Starting backend"
if (Test-Port 8000) {
    Adopt-ProcessIfExpected `
        -Name "Backend" `
        -Port 8000 `
        -ExpectedProcessNames @("python*") `
        -PidFile (Join-Path $RunDir "backend.pid")
} else {
    Start-LoggedProcess `
        -Name "Backend" `
        -FilePath (Join-Path $BackendDir "venv\Scripts\python.exe") `
        -Arguments @("main.py") `
        -WorkingDirectory $BackendDir `
        -OutFile (Join-Path $BackendDir "backend-out.log") `
        -ErrFile (Join-Path $BackendDir "backend-err.log") `
        -PidFile (Join-Path $RunDir "backend.pid")
}

Write-Step "Starting frontend"
if (Test-Port 5173) {
    Adopt-ProcessIfExpected `
        -Name "Frontend" `
        -Port 5173 `
        -ExpectedProcessNames @("node") `
        -PidFile (Join-Path $RunDir "frontend.pid")
} else {
    Start-LoggedProcess `
        -Name "Frontend" `
        -FilePath "npm.cmd" `
        -Arguments @("run", "dev", "--", "--host", "0.0.0.0") `
        -WorkingDirectory $FrontendDir `
        -OutFile (Join-Path $FrontendDir "vite-out.log") `
        -ErrFile (Join-Path $FrontendDir "vite-err.log") `
        -PidFile (Join-Path $RunDir "frontend.pid")
}

Write-Step "Verifying"
Start-Sleep -Seconds 3

try {
    $health = Invoke-RestMethod "http://localhost:8000/api/health"
    Write-Host "Backend health: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "Backend did not respond yet. Check backend\backend-err.log" -ForegroundColor Yellow
}

if (Test-Port 5173) {
    Write-Host "Frontend is listening on http://localhost:5173" -ForegroundColor Green
} else {
    Write-Host "Frontend did not start. Check frontend\vite-err.log" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Open frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "Open backend:  http://localhost:8000" -ForegroundColor Green
Write-Host "Open pgAdmin:  http://localhost:5050" -ForegroundColor Green
Write-Host ""
Write-Host "To stop local app processes later, run: .\stop.ps1"
