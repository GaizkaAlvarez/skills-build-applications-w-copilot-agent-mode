#!/usr/bin/env pwsh
# API Verification Script for OctoFit Tracker
# Tests the /api/users and /api/activities endpoints

$CODESPACE_NAME = $env:CODESPACE_NAME
$PORT = 8000

# Determine API URL
if ($CODESPACE_NAME) {
    $API_URL = "https://${CODESPACE_NAME}-${PORT}.app.github.dev"
    Write-Host "🌐 Using Codespaces URL: $API_URL" -ForegroundColor Cyan
} else {
    $API_URL = "http://localhost:${PORT}"
    Write-Host "🏠 Using localhost URL: $API_URL" -ForegroundColor Cyan
}

Write-Host "`n🧪 Testing OctoFit Tracker API Endpoints`n" -ForegroundColor Green

# Test 1: Health Check
Write-Host "Test 1: Health Check" -ForegroundColor Yellow
try {
    $response = curl.exe -s "$API_URL/health"
    Write-Host "✓ Response: $response" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to reach health endpoint" -ForegroundColor Red
}

Write-Host ""

# Test 2: Root endpoint
Write-Host "Test 2: Root Endpoint" -ForegroundColor Yellow
try {
    $response = curl.exe -s "$API_URL/"
    Write-Host "✓ Response: $response" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to reach root endpoint" -ForegroundColor Red
}

Write-Host ""

# Test 3: Get Users
Write-Host "Test 3: Get Users (/api/users)" -ForegroundColor Yellow
try {
    $response = curl.exe -s "$API_URL/api/users"
    Write-Host "✓ Response: $response" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to reach users endpoint" -ForegroundColor Red
}

Write-Host ""

# Test 4: Get Activities
Write-Host "Test 4: Get Activities (/api/activities)" -ForegroundColor Yellow
try {
    $response = curl.exe -s "$API_URL/api/activities"
    Write-Host "✓ Response: $response" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to reach activities endpoint" -ForegroundColor Red
}

Write-Host ""

Write-Host "✅ API Verification Complete!" -ForegroundColor Green
Write-Host "`nAvailable Endpoints:" -ForegroundColor Cyan
Write-Host "  GET  $API_URL/" -ForegroundColor Gray
Write-Host "  GET  $API_URL/health" -ForegroundColor Gray
Write-Host "  GET  $API_URL/api/users" -ForegroundColor Gray
Write-Host "  GET  $API_URL/api/teams" -ForegroundColor Gray
Write-Host "  GET  $API_URL/api/activities" -ForegroundColor Gray
Write-Host "  GET  $API_URL/api/leaderboard" -ForegroundColor Gray
Write-Host "  GET  $API_URL/api/workouts" -ForegroundColor Gray
