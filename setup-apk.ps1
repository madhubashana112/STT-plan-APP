# STT Plan APK Build Setup Script
# This script initializes the Android project and prepares assets.

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

if (!(Test-Path "android")) {
    Write-Host "Adding Android platform..." -ForegroundColor Cyan
    npx cap add android
}

Write-Host "Syncing web assets to Android..." -ForegroundColor Cyan
npx cap sync

Write-Host "--------------------------------------------------"
Write-Host "DONE! Your Android project is ready." -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "1. Save your uploaded icon as 'app-icon.png' in this folder."
Write-Host "2. Run: npx @capacitor/assets generate --android"
Write-Host "3. Run: npx cap open android"
Write-Host "4. In Android Studio, go to Build > Build Bundle(s) / APK(s) > Build APK(s)"
Write-Host "--------------------------------------------------"
