Write-Host "🚀 Starting Expo Dev Environment..." -ForegroundColor Green

# Check if Expo CLI is installed
if (-not (Get-Command expo -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Expo CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g expo
}

# Clear Expo cache
Write-Host "🧹 Clearing Expo cache..." -ForegroundColor Cyan
expo start -c

Write-Host "✅ Expo Dev Server is running!" -ForegroundColor Green
