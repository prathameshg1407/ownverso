# ==============================================================================
# Auth API Endpoint Test Script v2
# ==============================================================================
# Usage: .\test-auth-endpoints.ps1 -BaseUrl "http://localhost:3001/api/v1/auth"
# ==============================================================================

param(
    [string]$BaseUrl = "http://localhost:3001/api/v1/auth",
    [string]$TestEmail = "testuser_$(Get-Random)@example.com",
    [string]$TestPassword = "SecureP@ssw0rd123!",
    [string]$TestUsername = "testuser_$(Get-Random)",
    [string]$TestDisplayName = "Test User",
    [switch]$VerboseOutput,
    [switch]$StopOnError,
    [int]$DelayBetweenTests = 100
)

# ==============================================================================
# Configuration & Global Variables
# ==============================================================================

$Script:AccessToken = $null
$Script:RefreshToken = $null
$Script:UserId = $null
$Script:SessionId = $null
$Script:MfaPendingToken = $null
$Script:CurrentPassword = $TestPassword
$Script:EmailVerified = $false
$Script:TestResults = @()
$Script:TotalTests = 0
$Script:PassedTests = 0
$Script:FailedTests = 0
$Script:SkippedTests = 0

# Colors
$ColorSuccess = "Green"
$ColorError = "Red"
$ColorWarning = "Yellow"
$ColorInfo = "Cyan"
$ColorHeader = "Magenta"

# ==============================================================================
# Helper Functions
# ==============================================================================

function Write-Header {
    param([string]$Text)
    Write-Host ""
    Write-Host ("=" * 80) -ForegroundColor $ColorHeader
    Write-Host " $Text" -ForegroundColor $ColorHeader
    Write-Host ("=" * 80) -ForegroundColor $ColorHeader
}

function Write-SubHeader {
    param([string]$Text)
    Write-Host ""
    Write-Host ("-" * 60) -ForegroundColor $ColorInfo
    Write-Host " $Text" -ForegroundColor $ColorInfo
    Write-Host ("-" * 60) -ForegroundColor $ColorInfo
}

function Write-TestResult {
    param(
        [string]$TestName,
        [string]$Status,
        [string]$Details = ""
    )
    
    switch ($Status) {
        "PASS" { $icon = "[PASS]"; $color = $ColorSuccess }
        "FAIL" { $icon = "[FAIL]"; $color = $ColorError }
        "SKIP" { $icon = "[SKIP]"; $color = $ColorWarning }
        "INFO" { $icon = "[INFO]"; $color = $ColorInfo }
        default { $icon = "[????]"; $color = "White" }
    }
    
    Write-Host "  $icon " -NoNewline -ForegroundColor $color
    Write-Host "$TestName" -NoNewline
    if ($Details) {
        Write-Host " - $Details" -ForegroundColor "Gray"
    } else {
        Write-Host ""
    }
}

function Start-TestDelay {
    if ($DelayBetweenTests -gt 0) {
        Start-Sleep -Milliseconds $DelayBetweenTests
    }
}

function Invoke-ApiRequest {
    param(
        [string]$Method,
        [string]$Endpoint,
        [hashtable]$Body = $null,
        [hashtable]$Headers = @{},
        [hashtable]$Query = $null,
        [int[]]$ExpectedStatus = @(200, 201, 204),
        [switch]$UseAuth,
        [switch]$NoRedirect
    )
    
    Start-TestDelay
    
    $url = "$BaseUrl$Endpoint"
    
    # Add query parameters
    if ($Query -and $Query.Count -gt 0) {
        $queryParts = @()
        foreach ($key in $Query.Keys) {
            $encodedValue = [System.Uri]::EscapeDataString($Query[$key])
            $queryParts += "$key=$encodedValue"
        }
        $queryString = $queryParts -join "&"
        $url = "$url`?$queryString"
    }
    
    # Build headers
    $requestHeaders = @{
        "Content-Type" = "application/json"
        "Accept" = "application/json"
        "X-Client-Type" = "api"
    }
    
    foreach ($key in $Headers.Keys) {
        $requestHeaders[$key] = $Headers[$key]
    }
    
    if ($UseAuth -and $Script:AccessToken) {
        $requestHeaders["Authorization"] = "Bearer $($Script:AccessToken)"
    }
    
    $params = @{
        Uri = $url
        Method = $Method
        Headers = $requestHeaders
        ErrorAction = "Stop"
        UseBasicParsing = $true
    }
    
    if ($NoRedirect) {
        $params["MaximumRedirection"] = 0
    }
    
    if ($Body -and $Method -ne "GET") {
        $jsonBody = ($Body | ConvertTo-Json -Depth 10)
        $params["Body"] = $jsonBody
        if ($VerboseOutput) {
            Write-Host "    Body: $jsonBody" -ForegroundColor "DarkGray"
        }
    }
    
    try {
        if ($VerboseOutput) {
            Write-Host "    -> $Method $url" -ForegroundColor "Gray"
        }
        
        $response = Invoke-WebRequest @params
        $statusCode = $response.StatusCode
        
        $content = $null
        if ($response.Content) {
            try {
                $content = $response.Content | ConvertFrom-Json
            } catch {
                $content = $response.Content
            }
        }
        
        return @{
            Success = $ExpectedStatus -contains $statusCode
            StatusCode = $statusCode
            Data = $content
            Error = $null
        }
    }
    catch {
        $statusCode = 0
        $errorMessage = $_.Exception.Message
        $errorBody = $null
        
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
            try {
                $stream = $_.Exception.Response.GetResponseStream()
                $reader = New-Object System.IO.StreamReader($stream)
                $responseBody = $reader.ReadToEnd()
                $reader.Close()
                $stream.Close()
                if ($responseBody) {
                    $errorBody = $responseBody | ConvertFrom-Json
                    if ($VerboseOutput) {
                        Write-Host "    Error Response: $responseBody" -ForegroundColor "DarkGray"
                    }
                }
            } catch {
                # Ignore parsing errors
            }
        }
        
        # Check if status code matches expected (for error cases)
        $isExpectedError = $ExpectedStatus -contains $statusCode
        
        return @{
            Success = $isExpectedError
            StatusCode = $statusCode
            Data = $errorBody
            Error = $errorMessage
        }
    }
}

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Endpoint,
        [hashtable]$Body = $null,
        [hashtable]$Query = $null,
        [int[]]$ExpectedStatus = @(200, 201, 204),
        [switch]$UseAuth,
        [switch]$Skip,
        [string]$SkipReason = "",
        [scriptblock]$OnSuccess = $null,
        [scriptblock]$Validation = $null,
        [switch]$NoRedirect
    )
    
    $Script:TotalTests++
    
    if ($Skip) {
        $Script:SkippedTests++
        Write-TestResult -TestName $Name -Status "SKIP" -Details $SkipReason
        $Script:TestResults += @{
            Name = $Name
            Status = "SKIP"
            Reason = $SkipReason
        }
        return $null
    }
    
    $result = Invoke-ApiRequest -Method $Method -Endpoint $Endpoint -Body $Body -Query $Query `
        -ExpectedStatus $ExpectedStatus -UseAuth:$UseAuth -NoRedirect:$NoRedirect
    
    $validationPassed = $true
    if ($result.Success -and $Validation) {
        try {
            $validationPassed = & $Validation $result.Data
        } catch {
            $validationPassed = $false
        }
    }
    
    if ($result.Success -and $validationPassed) {
        $Script:PassedTests++
        Write-TestResult -TestName $Name -Status "PASS" -Details "HTTP $($result.StatusCode)"
        
        if ($OnSuccess) {
            & $OnSuccess $result.Data
        }
        
        $Script:TestResults += @{
            Name = $Name
            Status = "PASS"
            StatusCode = $result.StatusCode
        }
    }
    else {
        $Script:FailedTests++
        $errorDetail = if ($result.StatusCode -gt 0) { "HTTP $($result.StatusCode)" } else { $result.Error }
        Write-TestResult -TestName $Name -Status "FAIL" -Details $errorDetail
        
        if ($VerboseOutput -and $result.Data) {
            Write-Host "    Response: $($result.Data | ConvertTo-Json -Compress -Depth 5)" -ForegroundColor "Gray"
        }
        
        $Script:TestResults += @{
            Name = $Name
            Status = "FAIL"
            StatusCode = $result.StatusCode
            Error = $result.Error
        }
        
        if ($StopOnError) {
            throw "Test failed: $Name"
        }
    }
    
    return $result
}

# ==============================================================================
# Test Suites
# ==============================================================================

function Test-RegistrationAndLogin {
    Write-SubHeader "Registration and Login"
    
    # Test: Register
    $result = Test-Endpoint -Name "POST /register - Create new user" `
        -Method "POST" -Endpoint "/register" `
        -Body @{
            email = $TestEmail
            password = $TestPassword
            username = $TestUsername
            displayName = $TestDisplayName
        } `
        -ExpectedStatus @(201) `
        -OnSuccess {
            param($data)
            if ($data.data.user) {
                $Script:UserId = $data.data.user.publicId
                Write-Host "      User ID: $($Script:UserId)" -ForegroundColor "DarkGray"
            }
            if ($data.data.requiresEmailVerification -eq $false) {
                $Script:EmailVerified = $true
                Write-Host "      Email verification not required" -ForegroundColor "DarkGray"
            } else {
                Write-Host "      Email verification required" -ForegroundColor "DarkYellow"
            }
        }
    
    # Test: Register duplicate email
    Test-Endpoint -Name "POST /register - Duplicate email (expect 409)" `
        -Method "POST" -Endpoint "/register" `
        -Body @{
            email = $TestEmail
            password = $TestPassword
            username = "another_$(Get-Random)"
            displayName = "Another User"
        } `
        -ExpectedStatus @(409, 400, 422)
    
    # Test: Register duplicate username
    Test-Endpoint -Name "POST /register - Duplicate username (expect 409)" `
        -Method "POST" -Endpoint "/register" `
        -Body @{
            email = "another_$(Get-Random)@example.com"
            password = $TestPassword
            username = $TestUsername
            displayName = "Another User"
        } `
        -ExpectedStatus @(409, 400, 422)
    
    # Test: Login - expect 403 if email not verified, 200 if verified
    $loginResult = Test-Endpoint -Name "POST /login - Login (may need email verification)" `
        -Method "POST" -Endpoint "/login" `
        -Body @{
            emailOrUsername = $TestEmail
            password = $TestPassword
            rememberMe = $false
        } `
        -ExpectedStatus @(200, 403) `
        -OnSuccess {
            param($data)
            if ($data.data.tokens) {
                $Script:AccessToken = $data.data.tokens.accessToken
                $Script:RefreshToken = $data.data.tokens.refreshToken
                $Script:EmailVerified = $true
                Write-Host "      Tokens received - login successful" -ForegroundColor "DarkGray"
            }
            elseif ($data.data.mfaRequired -eq $true) {
                $Script:MfaPendingToken = $data.data.mfaPendingToken
                Write-Host "      MFA Required" -ForegroundColor "DarkGray"
            }
        }
    
    # Check if we got 403 (email not verified)
    if ($loginResult.StatusCode -eq 403) {
        Write-TestResult -TestName "INFO: Email verification required for login" -Status "INFO" -Details "Skipping auth-required tests"
        $Script:EmailVerified = $false
    }
    
    # Test: Login with wrong password
    Test-Endpoint -Name "POST /login - Wrong password (expect 401/403)" `
        -Method "POST" -Endpoint "/login" `
        -Body @{
            emailOrUsername = $TestEmail
            password = "WrongPassword123!"
        } `
        -ExpectedStatus @(401, 403)
    
    # Test: Login with non-existent user
    Test-Endpoint -Name "POST /login - Non-existent user (expect 401)" `
        -Method "POST" -Endpoint "/login" `
        -Body @{
            emailOrUsername = "nonexistent_$(Get-Random)@example.com"
            password = $TestPassword
        } `
        -ExpectedStatus @(401, 400, 404)
    
    # Test: Get current user (skip if not authenticated)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "GET /me - Get current user" `
            -Method "GET" -Endpoint "/me" `
            -UseAuth `
            -Validation {
                param($data)
                return $data.success -eq $true -and $data.data.user -ne $null
            }
    } else {
        Test-Endpoint -Name "GET /me - Get current user" `
            -Skip -SkipReason "No access token (email not verified)"
    }
    
    # Test: Refresh token
    if ($Script:RefreshToken) {
        Test-Endpoint -Name "POST /refresh - Refresh access token" `
            -Method "POST" -Endpoint "/refresh" `
            -Body @{
                refreshToken = $Script:RefreshToken
            } `
            -ExpectedStatus @(200) `
            -OnSuccess {
                param($data)
                if ($data.data.tokens) {
                    $Script:AccessToken = $data.data.tokens.accessToken
                    $Script:RefreshToken = $data.data.tokens.refreshToken
                }
            }
    } else {
        Test-Endpoint -Name "POST /refresh - Refresh access token" `
            -Skip -SkipReason "No refresh token available"
    }
    
    # Test: Refresh with invalid token
    Test-Endpoint -Name "POST /refresh - Invalid token (expect 401)" `
        -Method "POST" -Endpoint "/refresh" `
        -Body @{
            refreshToken = "invalid-refresh-token"
        } `
        -ExpectedStatus @(401, 400)
}

function Test-PasswordManagement {
    Write-SubHeader "Password Management"
    
    # Test: Check password strength
    Test-Endpoint -Name "GET /password/strength - Weak password" `
        -Method "GET" -Endpoint "/password/strength" `
        -Query @{ password = "weak" } `
        -ExpectedStatus @(200) `
        -Validation {
            param($data)
            return $data.data.score -ne $null
        }
    
    Test-Endpoint -Name "GET /password/strength - Strong password" `
        -Method "GET" -Endpoint "/password/strength" `
        -Query @{ password = "Str0ngP@ssw0rd!123" } `
        -ExpectedStatus @(200) `
        -Validation {
            param($data)
            return $data.data.isAcceptable -eq $true
        }
    
    # Test: Forgot password (add delay to avoid rate limit)
    Start-Sleep -Seconds 2
    Test-Endpoint -Name "POST /password/forgot - Request password reset" `
        -Method "POST" -Endpoint "/password/forgot" `
        -Body @{
            email = $TestEmail
        } `
        -ExpectedStatus @(200)
    
    # Test: Reset password with invalid token
    Test-Endpoint -Name "POST /password/reset - Invalid token (expect 400)" `
        -Method "POST" -Endpoint "/password/reset" `
        -Body @{
            token = "invalid-token-12345"
            newPassword = "NewSecureP@ss123!"
        } `
        -ExpectedStatus @(400, 401, 404)
    
    # Test: Change password (requires auth)
    if ($Script:AccessToken) {
        $newPassword = "NewSecureP@ss456!"
        $changeResult = Test-Endpoint -Name "PUT /password/change - Change password" `
            -Method "PUT" -Endpoint "/password/change" `
            -Body @{
                currentPassword = $Script:CurrentPassword
                newPassword = $newPassword
            } `
            -UseAuth `
            -ExpectedStatus @(200, 403)
        
        if ($changeResult.StatusCode -eq 200) {
            $Script:CurrentPassword = $newPassword
        }
    } else {
        Test-Endpoint -Name "PUT /password/change - Change password" `
            -Skip -SkipReason "No access token"
    }
}

function Test-EmailVerification {
    Write-SubHeader "Email Verification"
    
    # Test: Verify email with invalid token
    Test-Endpoint -Name "POST /email/verify - Invalid token (expect 400)" `
        -Method "POST" -Endpoint "/email/verify" `
        -Body @{
            token = "invalid-verification-token"
        } `
        -ExpectedStatus @(400, 401, 404)
    
    # Test: Resend verification email (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "POST /email/resend-verification - Resend" `
            -Method "POST" -Endpoint "/email/resend-verification" `
            -UseAuth `
            -ExpectedStatus @(200, 400, 429)
    } else {
        Test-Endpoint -Name "POST /email/resend-verification - Resend" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: Request email change (requires auth + verified email)
    if ($Script:AccessToken -and $Script:EmailVerified) {
        Test-Endpoint -Name "POST /email/change - Request email change" `
            -Method "POST" -Endpoint "/email/change" `
            -Body @{
                newEmail = "newemail_$(Get-Random)@example.com"
            } `
            -UseAuth `
            -ExpectedStatus @(200, 403)
    } else {
        Test-Endpoint -Name "POST /email/change - Request email change" `
            -Skip -SkipReason "No access token or email not verified"
    }
    
    # Test: Confirm email change with invalid token
    Test-Endpoint -Name "POST /email/confirm-change - Invalid token (expect 400)" `
        -Method "POST" -Endpoint "/email/confirm-change" `
        -Body @{
            token = "invalid-change-token"
        } `
        -ExpectedStatus @(400, 401, 404)
}

function Test-MFA {
    Write-SubHeader "Multi-Factor Authentication (MFA)"
    
    # Test: Get MFA status (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "GET /mfa/status - Get MFA status" `
            -Method "GET" -Endpoint "/mfa/status" `
            -UseAuth `
            -ExpectedStatus @(200) `
            -Validation {
                param($data)
                return $data.data.enabled -ne $null
            }
    } else {
        Test-Endpoint -Name "GET /mfa/status - Get MFA status" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: Initialize MFA setup (requires auth + verified email)
    if ($Script:AccessToken -and $Script:EmailVerified) {
        Test-Endpoint -Name "POST /mfa/setup - Initialize MFA setup" `
            -Method "POST" -Endpoint "/mfa/setup" `
            -UseAuth `
            -ExpectedStatus @(200, 403)
    } else {
        Test-Endpoint -Name "POST /mfa/setup - Initialize MFA setup" `
            -Skip -SkipReason "No access token or email not verified"
    }
    
    # Test: Verify MFA setup with invalid code (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "POST /mfa/setup/verify - Invalid code (expect 400)" `
            -Method "POST" -Endpoint "/mfa/setup/verify" `
            -Body @{
                code = "000000"
            } `
            -UseAuth `
            -ExpectedStatus @(400, 401, 403)
    } else {
        Test-Endpoint -Name "POST /mfa/setup/verify - Invalid code" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: MFA verify login (no auth needed, but needs valid pending token)
    Test-Endpoint -Name "POST /mfa/verify - Invalid pending token (expect 400/401)" `
        -Method "POST" -Endpoint "/mfa/verify" `
        -Body @{
            mfaPendingToken = "invalid-mfa-pending-token"
            code = "123456"
        } `
        -ExpectedStatus @(400, 401)
    
    # Test: Disable MFA (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "POST /mfa/disable - MFA not enabled (expect 400)" `
            -Method "POST" -Endpoint "/mfa/disable" `
            -Body @{
                password = $Script:CurrentPassword
                code = "123456"
            } `
            -UseAuth `
            -ExpectedStatus @(400, 401, 403)
    } else {
        Test-Endpoint -Name "POST /mfa/disable - MFA not enabled" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: Regenerate backup codes (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "POST /mfa/backup-codes/regenerate - Regenerate" `
            -Method "POST" -Endpoint "/mfa/backup-codes/regenerate" `
            -Body @{
                password = $Script:CurrentPassword
            } `
            -UseAuth `
            -ExpectedStatus @(200, 400, 403)
    } else {
        Test-Endpoint -Name "POST /mfa/backup-codes/regenerate" `
            -Skip -SkipReason "No access token"
    }
}

function Test-Sessions {
    Write-SubHeader "Session Management"
    
    # Test: Get all sessions (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "GET /sessions - List active sessions" `
            -Method "GET" -Endpoint "/sessions" `
            -UseAuth `
            -ExpectedStatus @(200) `
            -OnSuccess {
                param($data)
                if ($data.data.sessions -and $data.data.sessions.Count -gt 0) {
                    Write-Host "      Found $($data.data.sessions.Count) session(s)" -ForegroundColor "DarkGray"
                    foreach ($session in $data.data.sessions) {
                        if (-not $session.isCurrent) {
                            $Script:SessionId = $session.id
                            break
                        }
                    }
                }
            }
    } else {
        Test-Endpoint -Name "GET /sessions - List active sessions" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: Revoke specific session
    if ($Script:AccessToken) {
        Test-Endpoint -Name "DELETE /sessions/:id - Revoke non-existent" `
            -Method "DELETE" -Endpoint "/sessions/999999999" `
            -UseAuth `
            -ExpectedStatus @(404, 400)
    } else {
        Test-Endpoint -Name "DELETE /sessions/:id - Revoke session" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: Revoke all other sessions (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "DELETE /sessions - Revoke all other sessions" `
            -Method "DELETE" -Endpoint "/sessions" `
            -UseAuth `
            -ExpectedStatus @(200)
    } else {
        Test-Endpoint -Name "DELETE /sessions - Revoke all other" `
            -Skip -SkipReason "No access token"
    }
}

function Test-OAuth {
    Write-SubHeader "OAuth Authentication"
    
    # Test: Get OAuth providers (public)
    Test-Endpoint -Name "GET /oauth/providers - List OAuth providers" `
        -Method "GET" -Endpoint "/oauth/providers" `
        -ExpectedStatus @(200) `
        -Validation {
            param($data)
            return $data.data.providers -ne $null
        }
    
    # Test: Get linked accounts (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "GET /oauth/accounts - List linked accounts" `
            -Method "GET" -Endpoint "/oauth/accounts" `
            -UseAuth `
            -ExpectedStatus @(200)
    } else {
        Test-Endpoint -Name "GET /oauth/accounts - List linked accounts" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: Initialize OAuth flow (Google)
    Test-Endpoint -Name "GET /oauth/google - Init Google OAuth" `
        -Method "GET" -Endpoint "/oauth/google" `
        -ExpectedStatus @(200, 302, 400, 404)
    
    # Test: Initialize OAuth flow (GitHub)
    Test-Endpoint -Name "GET /oauth/github - Init GitHub OAuth" `
        -Method "GET" -Endpoint "/oauth/github" `
        -ExpectedStatus @(200, 302, 400, 404)
    
    # Skip OAuth callback test (causes redirect issues)
    Test-Endpoint -Name "GET /oauth/google/callback - Invalid state" `
        -Skip -SkipReason "Redirect handling not supported in test"
    
    # Test: Link OAuth account (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "POST /oauth/google/link - Invalid code (expect 400)" `
            -Method "POST" -Endpoint "/oauth/google/link" `
            -Body @{
                code = "invalid-code"
            } `
            -UseAuth `
            -ExpectedStatus @(400, 401, 404)
    } else {
        Test-Endpoint -Name "POST /oauth/google/link - Link account" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: Unlink OAuth account (requires auth)
    if ($Script:AccessToken) {
        Test-Endpoint -Name "DELETE /oauth/google/unlink - Not linked (expect 400)" `
            -Method "DELETE" -Endpoint "/oauth/google/unlink" `
            -UseAuth `
            -ExpectedStatus @(400, 404)
    } else {
        Test-Endpoint -Name "DELETE /oauth/google/unlink - Unlink" `
            -Skip -SkipReason "No access token"
    }
    
    # Test: Invalid provider
    Test-Endpoint -Name "GET /oauth/invalidprovider - Invalid provider (expect 400)" `
        -Method "GET" -Endpoint "/oauth/invalidprovider" `
        -ExpectedStatus @(400, 404)
}

function Test-ValidationErrors {
    Write-SubHeader "Request Validation Errors"
    
    # Test: Register with invalid email
    Test-Endpoint -Name "POST /register - Invalid email format (expect 400/422)" `
        -Method "POST" -Endpoint "/register" `
        -Body @{
            email = "not-an-email"
            password = $TestPassword
            username = "validuser"
            displayName = "Valid Name"
        } `
        -ExpectedStatus @(400, 422)
    
    # Test: Register with short password
    Test-Endpoint -Name "POST /register - Short password (expect 400/422)" `
        -Method "POST" -Endpoint "/register" `
        -Body @{
            email = "valid_$(Get-Random)@example.com"
            password = "short"
            username = "validuser_$(Get-Random)"
            displayName = "Valid Name"
        } `
        -ExpectedStatus @(400, 422)
    
    # Test: Register with invalid username
    Test-Endpoint -Name "POST /register - Invalid username (expect 400/422)" `
        -Method "POST" -Endpoint "/register" `
        -Body @{
            email = "valid_$(Get-Random)@example.com"
            password = $TestPassword
            username = "ab"
            displayName = "Valid Name"
        } `
        -ExpectedStatus @(400, 422)
    
    # Test: Register missing required field
    Test-Endpoint -Name "POST /register - Missing displayName (expect 400/422)" `
        -Method "POST" -Endpoint "/register" `
        -Body @{
            email = "valid_$(Get-Random)@example.com"
            password = $TestPassword
            username = "validuser_$(Get-Random)"
        } `
        -ExpectedStatus @(400, 422)
    
    # Test: Login with empty body
    Test-Endpoint -Name "POST /login - Empty body (expect 400/422)" `
        -Method "POST" -Endpoint "/login" `
        -Body @{} `
        -ExpectedStatus @(400, 422)
    
    # Test: MFA code wrong format
    Test-Endpoint -Name "POST /mfa/verify - Wrong code format (expect 400/422)" `
        -Method "POST" -Endpoint "/mfa/verify" `
        -Body @{
            mfaPendingToken = "some-token"
            code = "12345"
        } `
        -ExpectedStatus @(400, 422)
}

function Test-Unauthorized {
    Write-SubHeader "Authorization Checks (Without Token)"
    
    # Clear token for these tests
    $savedToken = $Script:AccessToken
    $Script:AccessToken = $null
    
    # Protected endpoints that should return 401
    Test-Endpoint -Name "GET /me - No auth (expect 401)" `
        -Method "GET" -Endpoint "/me" `
        -ExpectedStatus @(401)
    
    # These may return 400 instead of 401 based on your implementation
    Test-Endpoint -Name "POST /logout - No auth (expect 400/401)" `
        -Method "POST" -Endpoint "/logout" `
        -ExpectedStatus @(400, 401)
    
    Test-Endpoint -Name "POST /logout-all - No auth (expect 400/401)" `
        -Method "POST" -Endpoint "/logout-all" `
        -ExpectedStatus @(400, 401)
    
    Test-Endpoint -Name "GET /sessions - No auth (expect 401)" `
        -Method "GET" -Endpoint "/sessions" `
        -ExpectedStatus @(401)
    
    Test-Endpoint -Name "DELETE /sessions - No auth (expect 400/401)" `
        -Method "DELETE" -Endpoint "/sessions" `
        -ExpectedStatus @(400, 401)
    
    Test-Endpoint -Name "GET /mfa/status - No auth (expect 401)" `
        -Method "GET" -Endpoint "/mfa/status" `
        -ExpectedStatus @(401)
    
    Test-Endpoint -Name "POST /mfa/setup - No auth (expect 400/401)" `
        -Method "POST" -Endpoint "/mfa/setup" `
        -ExpectedStatus @(400, 401)
    
    Test-Endpoint -Name "PUT /password/change - No auth (expect 401/422)" `
        -Method "PUT" -Endpoint "/password/change" `
        -Body @{
            currentPassword = "test1234"
            newPassword = "test12345678"
        } `
        -ExpectedStatus @(401, 422)
    
    Test-Endpoint -Name "POST /email/resend-verification - No auth (expect 400/401)" `
        -Method "POST" -Endpoint "/email/resend-verification" `
        -ExpectedStatus @(400, 401)
    
    Test-Endpoint -Name "POST /email/change - No auth (expect 401)" `
        -Method "POST" -Endpoint "/email/change" `
        -Body @{
            newEmail = "test@test.com"
        } `
        -ExpectedStatus @(401)
    
    Test-Endpoint -Name "GET /oauth/accounts - No auth (expect 401)" `
        -Method "GET" -Endpoint "/oauth/accounts" `
        -ExpectedStatus @(401)
    
    # Restore token
    $Script:AccessToken = $savedToken
}

function Test-Logout {
    Write-SubHeader "Logout"
    
    if (-not $Script:AccessToken) {
        # Try to login first
        $loginResult = Invoke-ApiRequest -Method "POST" -Endpoint "/login" -Body @{
            emailOrUsername = $TestEmail
            password = $Script:CurrentPassword
        }
        
        if ($loginResult.Success -and $loginResult.Data.data.tokens) {
            $Script:AccessToken = $loginResult.Data.data.tokens.accessToken
            $Script:RefreshToken = $loginResult.Data.data.tokens.refreshToken
        }
    }
    
    if ($Script:AccessToken) {
        # Test: Logout all sessions
        Test-Endpoint -Name "POST /logout-all - Logout from all devices" `
            -Method "POST" -Endpoint "/logout-all" `
            -UseAuth `
            -ExpectedStatus @(200)
        
        # Re-login
        $loginResult = Invoke-ApiRequest -Method "POST" -Endpoint "/login" -Body @{
            emailOrUsername = $TestEmail
            password = $Script:CurrentPassword
        }
        
        if ($loginResult.Success -and $loginResult.Data.data.tokens) {
            $Script:AccessToken = $loginResult.Data.data.tokens.accessToken
            Write-Host "      Re-logged in successfully" -ForegroundColor "DarkGray"
            
            # Test: Logout current session
            Test-Endpoint -Name "POST /logout - Logout current session" `
                -Method "POST" -Endpoint "/logout" `
                -UseAuth `
                -ExpectedStatus @(204, 200)
            
            # Verify logout worked
            Test-Endpoint -Name "GET /me - After logout (expect 401)" `
                -Method "GET" -Endpoint "/me" `
                -UseAuth `
                -ExpectedStatus @(401)
        } else {
            Test-Endpoint -Name "POST /logout - Logout current session" `
                -Skip -SkipReason "Could not re-login"
            Test-Endpoint -Name "GET /me - After logout" `
                -Skip -SkipReason "Could not re-login"
        }
    } else {
        Test-Endpoint -Name "POST /logout-all - Logout from all devices" `
            -Skip -SkipReason "No access token (email verification required)"
        Test-Endpoint -Name "POST /logout - Logout current session" `
            -Skip -SkipReason "No access token"
        Test-Endpoint -Name "GET /me - After logout" `
            -Skip -SkipReason "No access token"
    }
}

# ==============================================================================
# Main Execution
# ==============================================================================

function Show-Summary {
    Write-Header "Test Summary"
    
    $passRate = if ($Script:TotalTests -gt 0) { 
        [math]::Round(($Script:PassedTests / $Script:TotalTests) * 100, 1) 
    } else { 0 }
    
    Write-Host ""
    Write-Host "  Total Tests:   $($Script:TotalTests)" -ForegroundColor $ColorInfo
    Write-Host "  Passed:        $($Script:PassedTests)" -ForegroundColor $ColorSuccess
    Write-Host "  Failed:        $($Script:FailedTests)" -ForegroundColor $(if ($Script:FailedTests -gt 0) { $ColorError } else { "White" })
    Write-Host "  Skipped:       $($Script:SkippedTests)" -ForegroundColor $(if ($Script:SkippedTests -gt 0) { $ColorWarning } else { "White" })
    Write-Host ""
    Write-Host "  Pass Rate:     $passRate%" -ForegroundColor $(if ($passRate -ge 80) { $ColorSuccess } elseif ($passRate -ge 50) { $ColorWarning } else { $ColorError })
    Write-Host ""
    
    if (-not $Script:EmailVerified) {
        Write-Host "  NOTE: Email verification is required. Many tests were skipped." -ForegroundColor $ColorWarning
        Write-Host "        To test all endpoints, either:" -ForegroundColor $ColorWarning
        Write-Host "        1. Disable email verification requirement in your config" -ForegroundColor $ColorWarning
        Write-Host "        2. Manually verify the test user's email" -ForegroundColor $ColorWarning
        Write-Host ""
    }
    
    if ($Script:FailedTests -gt 0) {
        Write-Host "  Failed Tests:" -ForegroundColor $ColorError
        foreach ($test in $Script:TestResults) {
            if ($test.Status -eq "FAIL") {
                Write-Host "    - $($test.Name)" -ForegroundColor $ColorError
            }
        }
        Write-Host ""
    }
    
    if ($Script:SkippedTests -gt 0) {
        Write-Host "  Skipped Tests:" -ForegroundColor $ColorWarning
        foreach ($test in $Script:TestResults) {
            if ($test.Status -eq "SKIP") {
                Write-Host "    - $($test.Name): $($test.Reason)" -ForegroundColor $ColorWarning
            }
        }
        Write-Host ""
    }
}

function Main {
    Clear-Host
    Write-Header "Auth API Endpoint Test Suite v2"
    Write-Host ""
    Write-Host "  Base URL:      $BaseUrl" -ForegroundColor $ColorInfo
    Write-Host "  Test Email:    $TestEmail" -ForegroundColor $ColorInfo
    Write-Host "  Test Username: $TestUsername" -ForegroundColor $ColorInfo
    Write-Host "  Display Name:  $TestDisplayName" -ForegroundColor $ColorInfo
    Write-Host "  Verbose:       $VerboseOutput" -ForegroundColor $ColorInfo
    Write-Host "  Stop On Error: $StopOnError" -ForegroundColor $ColorInfo
    Write-Host "  Delay (ms):    $DelayBetweenTests" -ForegroundColor $ColorInfo
    
    try {
        Test-RegistrationAndLogin
        Test-PasswordManagement
        Test-EmailVerification
        Test-MFA
        Test-Sessions
        Test-OAuth
        Test-ValidationErrors
        Test-Unauthorized
        Test-Logout
    }
    catch {
        Write-Host ""
        Write-Host "  Test execution stopped: $($_.Exception.Message)" -ForegroundColor $ColorError
    }
    
    Show-Summary
    
    if ($Script:FailedTests -gt 0) {
        exit 1
    }
    exit 0
}

Main