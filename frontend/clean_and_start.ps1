Write-Host "Cleaning WageWise Frontend..." -ForegroundColor Green
Write-Host ""

Set-Location frontend

Write-Host "Removing node_modules and package-lock.json..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✓ Removed node_modules" -ForegroundColor Green
}
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json"
    Write-Host "✓ Removed package-lock.json" -ForegroundColor Green
}

Write-Host "Installing dependencies fresh..." -ForegroundColor Yellow
npm install

Write-Host "Starting React development server..." -ForegroundColor Yellow
npm start

Read-Host "Press Enter to continue..." 