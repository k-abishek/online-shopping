# Spring Boot Backend Startup Script
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Starting Shopify Backend Server   " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Load environment variables from system
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.17.10-hotspot"
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path

Write-Host "✓ Java Version:" -ForegroundColor Green
java -version

Write-Host "`n✓ Starting Spring Boot Application..." -ForegroundColor Green
Write-Host "  Backend will be available at: http://localhost:8080" -ForegroundColor Yellow
Write-Host "  API endpoints at: http://localhost:8080/api" -ForegroundColor Yellow
Write-Host "`n  Press Ctrl+C to stop the server`n" -ForegroundColor Magenta

# Start the application
.\mvnw.cmd spring-boot:run
