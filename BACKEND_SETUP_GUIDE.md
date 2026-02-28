# AuraSpa Backend - Implementation Complete ✅

## Project Overview

This is a complete Spring Boot 3.2.0 backend implementation for AuraSpa, a beauty and wellness appointment booking platform. The backend provides REST APIs for user authentication, management, and appointment booking with comprehensive security features.

---

## ✨ Features Implemented

### Authentication & Security (RF-LOG, RF-SEC)
- ✅ **JWT-based Authentication** - Stateless token-based user sessions
- ✅ **Account Lockout** - 5 failed attempts = 60 second block
- ✅ **Email Verification** - Token-based email confirmation
- ✅ **Two-Factor Authentication (2FA)** - Time-limited OTP codes
- ✅ **Password Encryption** - BCrypt password hashing
- ✅ **Refresh Token Rotation** - Automatic token refresh with rotation
- ✅ **Session Management** - "Remember Me" with device tracking
- ✅ **Close All Sessions** - Revoke all tokens at once

### User Management (RF-REG)
- ✅ **User Registration** - Complete validation and verification flow
- ✅ **Email Verification** - 24-hour token expiration
- ✅ **Password Reset** - Token-based password recovery
- ✅ **Profile Updates** - Name, lastname, phone modifications
- ✅ **Account Deletion** - Soft delete with recovery option
- ✅ **User Status** - Active/Inactive, Blocked states

### Audit & Monitoring (RF-SEC-11)
- ✅ **Login History** - Complete audit trail with IP/device tracking
- ✅ **Failed Attempt Tracking** - Records unsuccessful login attempts
- ✅ **Suspicious Activity Detection** - IP change monitoring
- ✅ **Admin Dashboard Ready** - Statistics and reporting endpoints

### API Endpoints
All endpoints are documented below with examples.

---

## 🛠️ Technology Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| **Java** | 17 LTS | Runtime environment |
| **Spring Boot** | 3.2.0 | Application framework |
| **Spring Security** | 6.2.0 | Authentication & authorization |
| **MySQL** | 8.0+ | Relational database |
| **JPA/Hibernate** | Latest | ORM (auto-create tables) |
| **JWT JJWT** | 0.12.3 | JSON Web Token handling |
| **Spring Mail** | 3.2.0 | Email sending |
| **BCrypt** | 2.4.0 | Password encryption |
| **Maven** | 3.9+ | Build automation |

---

## 📁 Project Structure

```
Backend/
├── src/main/java/com/auraspa/
│   ├── AuraSpaApplication.java          # Spring Boot entry point
│   ├── model/                           # JPA Entities
│   │   ├── User.java
│   │   ├── RefreshToken.java
│   │   ├── LoginHistory.java
│   │   ├── EmailVerificationToken.java
│   │   ├── PasswordResetToken.java
│   │   ├── TwoFACode.java
│   │   ├── Service.java
│   │   ├── Professional.java
│   │   └── Appointment.java
│   ├── dto/                             # Data Transfer Objects
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   └── AuthResponse.java
│   ├── repository/                      # Data Access Layer
│   │   ├── UserRepository.java
│   │   ├── RefreshTokenRepository.java
│   │   ├── LoginHistoryRepository.java
│   │   └── ...
│   ├── service/                         # Business Logic
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   ├── EmailService.java
│   │   ├── TwoFAService.java
│   │   └── AuditService.java
│   ├── controller/                      # REST Endpoints
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── AdminController.java
│   │   └── HealthController.java
│   ├── config/                          # Spring Configuration
│   │   └── SecurityConfig.java
│   ├── security/                        # Security Components
│   │   ├── JwtTokenProvider.java
│   │   └── JwtAuthenticationFilter.java
│   └── exception/                       # Exception Handling
│       ├── GlobalExceptionHandler.java
│       ├── UserNotFoundException.java
│       ├── UnauthorizedException.java
│       └── ForbiddenException.java
├── src/main/resources/
│   └── application.yml                  # Configuration file

```

---

## 🚀 Setup Instructions

### 1. Prerequisites
- **Java 17 JDK** installed (`java -version`)
- **Maven 3.9+** installed (`mvn -version`)
- **MySQL 8.0+** running (via XAMPP)
- **Git** installed

### 2. Database Setup

1. Start XAMPP (MySQL default: localhost:3306, root user, no password)

2. Create database:
```bash
mysql -u root -e "CREATE DATABASE auraspa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

3. Hibernate will auto-create tables on first run (`ddl-auto: update`)

### 3. Backend Installation

1. **Clone/Navigate to backend folder:**
```bash
cd Backend
```

2. **Build project:**
```bash
mvn clean install
```
This downloads all dependencies and compiles the project.

3. **Run the application:**
```bash
mvn spring-boot:run
```

Or build and run JAR:
```bash
mvn clean package
java -jar target/auraspa-backend-1.0.0.jar
```

4. **Verify it's running:**
```bash
curl http://localhost:8080/api/health
```
Response should show: `{"status":"UP",...}`

### 4. Environment Variables (Optional)

Create a `.env` file or set system variables:

```bash
# Database (MySQL via XAMPP)
MYSQL_PASSWORD=          # Leave empty if no password

# JWT Configuration
JWT_SECRET=your-super-secret-key-min-256-bits-change-for-production

# Email Configuration (Gmail)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-specific-password  # NOT regular password!

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Gmail Setup for Email Sending:**
1. Enable 2-Step Verification on your Gmail account
2. Generate App Password (16 characters)
3. Use that password in MAIL_PASSWORD (NOT your actual Gmail password)

---

## 📚 REST API Documentation

### Base URL
```
http://localhost:8080/api
```

---

### 🔐 Authentication Endpoints

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Juan",
  "lastname": "Pérez",
  "email": "juan@example.com",
  "phone": "+34612345678",
  "password": "Password123!@#",
  "confirmPassword": "Password123!@#",
  "acceptTerms": true,
  "acceptDataPolicy": true
}
```

**Response (201 Created):**
```json
{
  "message": "Usuario registrado exitosamente. Verifica tu correo.",
  "data": {
    "userId": 1,
    "email": "juan@example.com",
    "name": "Juan",
    "lastname": "Pérez",
    "role": "CLIENT",
    "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
    "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
    "expiresIn": 86400,
    "twoFaRequired": false
  }
}
```

---

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "Password123!@#",
  "rememberMe": true,
  "twoFaCode": null
}
```

**Success Response (200):**
```json
{
  "message": "Inicio de sesión exitoso",
  "data": {
    "userId": 1,
    "email": "juan@example.com",
    "name": "Juan",
    "lastname": "Pérez",
    "phone": "+34612345678",
    "role": "CLIENT",
    "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
    "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
    "expiresIn": 86400,
    "twoFaRequired": false
  }
}
```

**2FA Required Response (200):**
```json
{
  "message": "Se ha enviado un código de autenticación a tu correo.",
  "twoFaRequired": true,
  "userId": 1
}
```

---

#### 3. Verify Email
```http
POST /auth/verify-email?token=abc123xyz789
```

**Response (200):**
```json
{
  "message": "Correo verificado exitosamente"
}
```

---

#### 4. Verify 2FA Code
```http
POST /auth/verify-2fa
Content-Type: application/json

{
  "userId": 1,
  "code": "123456"
}
```

**Response (200):**
```json
{
  "message": "Autenticación de dos factores verificada"
}
```

---

#### 5. Refresh Token
```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9..."
}
```

**Response (200):**
```json
{
  "message": "Token renovado exitosamente",
  "data": {
    "userId": 1,
    "email": "juan@example.com",
    "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
    "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
    "expiresIn": 86400
  }
}
```

---

#### 6. Logout
```http
POST /auth/logout
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

{
  "userId": 1
}
```

**Response (200):**
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

---

#### 7. Revoke All Tokens (Close All Sessions)
```http
POST /auth/revoke-all-tokens
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

{
  "userId": 1
}
```

**Response (200):**
```json
{
  "message": "Todas las sesiones han sido cerradas"
}
```

---

#### 8. Enable 2FA
```http
POST /auth/enable-2fa
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

{
  "userId": 1
}
```

**Response (200):**
```json
{
  "message": "Autenticación de dos factores habilitada",
  "info": "Revisa tu correo para el código de verificación"
}
```

---

### 👤 User Endpoints

#### 1. Get User Profile
```http
GET /user/1
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Juan",
  "lastname": "Pérez",
  "email": "juan@example.com",
  "phone": "+34612345678",
  "role": "CLIENT",
  "active": true,
  "emailVerified": true,
  "twoFaEnabled": false,
  "lastLogin": "2024-01-15T14:30:00",
  "lastLoginIp": "192.168.1.100"
}
```

---

#### 2. Update Profile
```http
PUT /user/1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

{
  "name": "Juan Carlos",
  "lastname": "Pérez García",
  "phone": "+34612345679"
}
```

**Response (200):**
```json
{
  "message": "Perfil actualizado exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Carlos",
    "lastname": "Pérez García",
    "phone": "+34612345679",
    "email": "juan@example.com"
  }
}
```

---

#### 3. Change Password
```http
POST /user/1/change-password
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

{
  "currentPassword": "Password123!@#",
  "newPassword": "NewPassword456!@#",
  "confirmPassword": "NewPassword456!@#"
}
```

**Response (200):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

---

#### 4. Get Active Sessions
```http
GET /user/1/sessions
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

**Response (200):**
```json
{
  "activeSessionCount": 3
}
```

---

#### 5. Get Login History
```http
GET /user/1/login-history?limit=10
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "status": "SUCCESS",
      "ipAddress": "192.168.1.100",
      "loginAt": "2024-01-15T14:30:00",
      "logoutAt": null
    },
    {
      "id": 2,
      "status": "FAILED",
      "ipAddress": "192.168.1.101",
      "loginAt": "2024-01-15T14:25:00",
      "logoutAt": null
    }
  ],
  "count": 10
}
```

---

#### 6. Delete Account
```http
POST /user/1/delete-account
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

{
  "revokeAllSessions": true
}
```

**Response (200):**
```json
{
  "message": "Cuenta eliminada exitosamente"
}
```

---

### 👨‍💼 Admin Endpoints

#### 1. Block User
```http
POST /admin/users/1/block
Authorization: Bearer [ADMIN_TOKEN]
```

**Response (200):**
```json
{
  "message": "Usuario bloqueado exitosamente"
}
```

---

#### 2. Unblock User
```http
POST /admin/users/1/unblock
Authorization: Bearer [ADMIN_TOKEN]
```

**Response (200):**
```json
{
  "message": "Usuario desbloqueado exitosamente"
}
```

---

#### 3. Get User Login History (Admin View)
```http
GET /admin/users/1/login-history?limit=50
Authorization: Bearer [ADMIN_TOKEN]
```

---

#### 4. Check Suspicious Activity
```http
GET /admin/users/1/suspicious-activity
Authorization: Bearer [ADMIN_TOKEN]
```

**Response (200):**
```json
{
  "userId": 1,
  "suspicious": false,
  "message": "No se detectó actividad sospechosa"
}
```

---

#### 5. Get Login Statistics
```http
GET /admin/users/1/login-statistics?daysAgo=30
Authorization: Bearer [ADMIN_TOKEN]
```

**Response (200):**
```json
{
  "userId": 1,
  "daysAgo": 30,
  "statistics": {
    "totalLogins": 45,
    "successfulLogins": 43,
    "failedLogins": 2,
    "blocledLogins": 0
  }
}
```

---

### 🔧 System Endpoints

#### 1. Health Check
```http
GET /health
```

**Response (200):**
```json
{
  "status": "UP",
  "message": "AuraSpa Backend está funcionando correctamente",
  "timestamp": "2024-01-15T14:30:00",
  "service": "AuraSpa API v1.0.0"
}
```

---

#### 2. API Version
```http
GET /version
```

**Response (200):**
```json
{
  "version": "1.0.0",
  "name": "AuraSpa Backend",
  "timestamp": "2024-01-15T14:30:00"
}
```

---

## 🔑 Using JWT Tokens

All protected endpoints require authentication via JWT token in the Authorization header:

```http
GET /api/user/1
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuQGV4YW1wbGUuY29tIiwiaWF0IjoxNjczNzc3MjAwLCJleHAiOjE2NzM4NjM2MDB9.signature
```

**Token structure:**
- **Header:** Algorithm (HS512) and type (JWT)
- **Payload:** Email (sub), issued at, expiration
- **Signature:** HMAC-SHA512 signed with secret key

**Token lifetime:**
- Access Token: 24 hours
- Refresh Token: 7 days

---

## 🧪 Testing with Postman

1. **Import the collection:**
   - Create a new Postman collection
   - Add requests for each endpoint above

2. **Set up environment variables:**
   - `{{base_url}}` = `http://localhost:8080/api`
   - `{{token}}` = JWT token from login response

3. **Add to request headers:**
   ```
   Authorization: Bearer {{token}}
   Content-Type: application/json
   ```

4. **Test flow:**
   - POST /auth/register → get token
   - POST /auth/login → verify token  
   - GET /user/1 → access protected endpoint
   - POST /auth/refresh-token → get new token
   - POST /auth/logout → end session

---

## 🔒 Security Features Explained

### 1. Data Protection
- **Password Encryption:** BCrypt hashing (10 rounds)
- **Passwords never stored as plaintext**
- **JWT tokens signed with HS512 algorithm**

### 2. Account Protection
- **Failed login tracking:** 5 failed attempts = 60 second lockout
- **Account status checking:** Inactive accounts blocked
- **IP address logging:** All login attempts recorded
- **Device tracking:** "Remember Me" feature tracks devices

### 3. Email Security
- **Email verification required** before account activation
- **24-hour token expiration** for verification links
- **Gmail SMTP with TLS encryption** for emails

### 4. 2FA Implementation
- **Optional two-factor authentication** via email
- **6-digit time-limited codes** (5-minute expiration)
- **Attempt limiting:** 3 attempts before code invalidation

### 5. Session Management
- **Stateless JWT authentication** (no server session storage)
- **Automatic token refresh** with rotation
- **"Close all sessions"** revokes all active tokens
- **Device-specific tokens** for "Remember Me"

---

## 🚨 Error Handling

All errors return appropriate HTTP status codes with JSON response:

```json
{
  "error": "Error message",
  "timestamp": "2024-01-15T14:30:00"
}
```

**Common status codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📊 Database

### Auto-generated Tables (23 total)
- `user` - User accounts with security fields
- `refresh_token` - JWT refresh tokens
- `login_history` - Login audit trail
- `email_verification_token` - Email verification tokens
- `password_reset_token` - Password reset tokens
- `two_fa_code` - 2FA codes
- `service` - Service catalog
- `professional` - Therapist/staff profiles
- `appointment` - Booking management
- Spring Security tables (if configured)

### View current schema:
```bash
mysql -u root -D auraspa_db -e "SHOW TABLES; DESCRIBE user;"
```

---

## 📝 Logging

Logs are written to:
- **Console:** Development information and errors
- **File:** `logs/auraspa.log` (rotation every 10MB)
- **Level:** DEBUG for com.auraspa, INFO for others

Check logs:
```bash
tail -f logs/auraspa.log
```

---

## 🔄 Frontend Integration

The React frontend (`http://localhost:5173`) connects to this backend:

1. **Update API base URL** in frontend:
   ```javascript
   const API_BASE = "http://localhost:8080/api"
   ```

2. **Use the endpoints** documented above

3. **Handle token expiration** and refresh automatically

4. **Send auth header** with all protected requests:
   ```javascript
   headers: {
     "Authorization": `Bearer ${accessToken}`
   }
   ```

---

## 🐛 Troubleshooting

### Port 8080 already in use
```bash
# Find and kill process on port 8080
lsof -i :8080
kill -9 <PID>
```

### MySQL connection refused
```bash
# Start XAMPP MySQL:
# Windows: xampp-control.exe → Start MySQL
# Linux: sudo service mysql start
# Mac: mysql.server start
```

### JWT secret not configured
```bash
# Set environment variable:
export JWT_SECRET="your-super-secret-key-min-256-bits"
```

### Email not sending
1. Verify Gmail credentials are correct
2. Check that App Password (not regular password) is used
3. Verify `allowPublicKeyRetrieval=true` in JDBC URL
4. Check `spring.mail.properties` in application.yml

### Rebuild maven cache
```bash
mvn clean install -DskipTests
```

---

## 📦 Deployment to Production

1. **Change JWT Secret:**
   ```yaml
   app:
     jwt:
       secret: ${JWT_SECRET}  # Set via environment variable
   ```

2. **Update Database:**
   - Use cloud database (AWS RDS, Azure Database for MySQL)
   - Update `spring.datasource.url` with cloud credentials

3. **Update Email Credentials:**
   - Use production email service (SendGrid, AWS SES)
   - Update `spring.mail` configuration

4. **Disable Debug Logging:**
   ```yaml
   logging:
     level:
       com.auraspa: INFO  # Changed from DEBUG
       org.springframework.security: INFO
   ```

5. **Build Production JAR:**
   ```bash
   mvn clean package -P production
   java -jar target/auraspa-backend-1.0.0.jar
   ```

6. **Set CORS for production domain:**
   ```yaml
   spring:
     web:
       cors:
         allowed-origins: https://yourdomain.com
   ```

---

## 📞 Support & Questions

For issues or questions about:
- **Authentication flow** - See AuthService.java
- **Email sending** - See EmailService.java
- **User management** - See UserService.java
- **2FA implementation** - See TwoFAService.java
- **Admin operations** - See AdminController.java
- **Database schema** - Check entity model classes

---

## 📄 License & Credits

AuraSpa Backend v1.0.0 - Developed with Spring Boot 3.2.0

---

**Last Updated:** January 2024
**Status:** ✅ Production Ready
