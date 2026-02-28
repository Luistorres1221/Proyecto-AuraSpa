# 🚀 AuraSpa Backend - Quick Reference Guide

## ⚡ Start Backend in 30 seconds

```bash
# Navigate to backend folder
cd Backend

# Build & run
mvn clean install
mvn spring-boot:run

# Open in browser
http://localhost:8080/api/health
```

✅ Backend running on `http://localhost:8080/api`

---

## 📌 Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/register` | POST | Create new account |
| `/auth/login` | POST | Login (get JWT token) |
| `/auth/verify-email?token=xxx` | POST | Verify email |
| `/user/{id}` | GET | Get profile |
| `/user/{id}` | PUT | Update profile |
| `/user/{id}/change-password` | POST | Change password |
| `/user/{id}/login-history` | GET | View logins |
| `/user/{id}/delete-account` | POST | Delete account |
| `/admin/users/{id}/block` | POST | Block user (admin) |
| `/health` | GET | Check if running |

**Full API docs:** [BACKEND_SETUP_GUIDE.md](../BACKEND_SETUP_GUIDE.md)

---

## 🔑 Authorization Header

All protected endpoints need JWT token with `Authorization: Bearer` prefix:

```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFuQGV4YW1wbGUuY29tIiwiaWF0IjoxNjczNzc3MjAwLCJleHAiOjE2NzM4NjM2MDB9.signature
```

**Get token:** Login → Copy `accessToken` from response → Add to request headers

---

## 🧪 Quick API Test

### 1. Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan",
    "lastname": "Pérez",
    "email": "juan@test.com",
    "phone": "+34612345678",
    "password": "Password123!@#",
    "confirmPassword": "Password123!@#",
    "acceptTerms": true,
    "acceptDataPolicy": true
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@test.com",
    "password": "Password123!@#",
    "rememberMe": true
  }'
```

### 3. Get Profile (replace TOKEN with actual JWT)
```bash
curl http://localhost:8080/api/user/1 \
  -H "Authorization: Bearer TOKEN"
```

---

## ✅ Features at a Glance

| Feature | Status | When Ready |
|---------|--------|-----------|
| User Registration | ✅ | Now |
| Email Verification | ✅ | Now |
| JWT Authentication | ✅ | Now |
| Account Lockout | ✅ | Now |
| 2FA/OTP | ✅ | Now |
| Password Reset | ✅ | Now |
| Session Management | ✅ | Now |
| Login History | ✅ | Now |
| Admin Dashboard | ✅ | Now |
| Role-based Access | ✅ | Now |

---

## 🛠️ Configuration

### MySQL (XAMPP)
- **Host:** localhost:3306
- **Database:** auraspa_db
- **User:** root
- **Password:** (empty)

Start MySQL: Open XAMPP Control Panel → Start MySQL

### JWT
- **Access Token:** Expires in 24 hours
- **Refresh Token:** Expires in 7 days
- **Secret:** Change in production!

### Email
- **Service:** Gmail SMTP
- **Config:** application.yml
- **Setup:** Generate App Password at myaccount.google.com/apppasswords

---

## 📋 User Registration Validation

Password must have:
- ✅ Minimum 8 characters
- ✅ At least 1 uppercase letter (A-Z)
- ✅ At least 1 lowercase letter (a-z)
- ✅ At least 1 digit (0-9)
- ✅ At least 1 special character (!@#$%^&*)

Example valid: `Password123!@#`
Example invalid: `password123` (no uppercase, digit, special)

---

## 🔒 Security Summary

| Feature | Implementation |
|---------|-----------------|
| **Password Storage** | BCrypt hashing (10 rounds) |
| **Tokens** | JWT HS512 signed |
| **Failed Logins** | Max 5 attempts → 60 sec block |
| **Email Verification** | 24-hour token expiration |
| **2FA** | 6-digit email OTP, 5-min expiration |
| **Session Tracking** | IP + Device info logged |
| **CORS** | localhost:5173, 5178, 3000 |

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 8080 in use** | Kill process: `lsof -i :8080 \| grep LISTEN \| awk '{print $2}' \| xargs kill -9` |
| **MySQL connection error** | Start XAMPP MySQL service |
| **Email not sending** | Use Gmail App Password (not regular password) |
| **Build fails** | Run `mvn clean install -DskipTests -U` |
| **401 Unauthorized** | Token missing or expired → Login again |
| **404 Not Found** | Check endpoint URL and HTTP method |

---

## 🔄 Token Refresh Flow

```
1. User logs in → Get accessToken (24h) + refreshToken (7d)
2. After 24 hours → accessToken expires
3. Frontend sends refreshToken to `/auth/refresh-token`
4. Backend returns new accessToken
5. Continue using API with new token
6. Frontend automatically refreshes before expiration
```

---

## 📧 Email Verification Flow

```
1. User registers → Email verification token sent
2. User clicks link in email (24h valid)
3. Backend marks emailVerified = true
4. User can now fully use the app
5. Token becomes invalid after 1 use
```

---

## 🎯 Login Flow with Security

```
1. User enters email + password
2. Server checks account is ACTIVE
3. Server validates password (BCrypt)
4. If password wrong → failedLoginAttempts++
5. If 5 failed attempts → account BLOCKED for 60 seconds
6. If 2FA enabled → send OTP code via email
7. User enters OTP code → Account unlocked, tokens generated
8. Update lastLogin timestamp + IP address
9. Return JWT accessToken + refreshToken in response
```

---

## 📱 Mobile/App Integration

For mobile apps instead of web:

1. Update CORS allowed origins (remove http://localhost entries)
2. Add your app's custom scheme if needed:
   ```yaml
   # In application.yml
   cors:
     allowed-origins: your-app-scheme://
   ```

3. Store tokens in secure storage:
   - iOS: Keychain
   - Android: EncryptedSharedPreferences

4. Implement token refresh before expiration

---

## 🚀 Deploy to Production

### Minimal Production Setup

1. **Update JWT Secret** (32+ characters)
   ```bash
   export JWT_SECRET="super-secret-key-generated-with-openssl-rand-base64-32"
   ```

2. **Use Cloud Database** (AWS RDS, Azure MySQL)
   ```yaml
   datasource:
     url: jdbc:mysql://your-cloud-db.mysql.database.azure.com:3306/auraspa_db
     username: admin@your-cloud-db
     password: your-secure-password
   ```

3. **Use Production Email** (SendGrid, AWS SES, etc)
   ```yaml
   mail:
     host: api.sendgrid.net
     # Update with your service config
   ```

4. **Build & Deploy**
   ```bash
   mvn clean package -DskipTests
   java -jar target/auraspa-backend-1.0.0.jar
   ```

5. **Enable HTTPS**
   - Get SSL certificate (Let's Encrypt free)
   - Configure in reverse proxy (Nginx, Apache)
   - Update CORS origins to https://yourdomain.com

---

## 📊 Database Tables Created

Automatically created by Hibernate on first run:

```
✓ user                          (User accounts)
✓ refresh_token                 (JWT tokens)
✓ login_history                 (Audit trail)
✓ email_verification_token      (Email verification)
✓ password_reset_token          (Password recovery)
✓ two_fa_code                   (2FA codes)
✓ service                       (Service catalog)
✓ professional                  (Staff profiles)
✓ appointment                   (Bookings)
```

View schema:
```bash
mysql -u root -D auraspa_db -e "SHOW TABLES; DESCRIBE user;"
```

---

## 🔗 Frontend Integration

In React App.jsx or API client:

```javascript
const API_URL = "http://localhost:8080/api";

// Login function
async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  // Store tokens
  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  localStorage.setItem("userId", data.data.userId);
  
  return data;
}

// API call with token
async function apiCall(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("accessToken");
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: body ? JSON.stringify(body) : null
  });
  
  // Handle 401 → refresh token → retry
  if (response.status === 401) {
    // Implement refresh logic here
  }
  
  return await response.json();
}

// Usage
await apiCall("/user/1");  // GET profile
await apiCall("/user/1", "PUT", {name: "New Name"});  // Update
```

---

## 📞 Files to Review

| File | Purpose | Read First? |
|------|---------|-----------|
| [BACKEND_SETUP_GUIDE.md](../BACKEND_SETUP_GUIDE.md) | Complete API reference & setup | ⭐⭐⭐ |
| [Backend README.md](README.md) | Quick start guide | ⭐⭐⭐ |
| [BACKEND_IMPLEMENTATION_SUMMARY.md](../BACKEND_IMPLEMENTATION_SUMMARY.md) | What was built | ⭐⭐ |
| [.env.example](.env.example) | Environment variables | ⭐⭐ |
| This file | Quick reference | ⭐⭐ |

---

## ✨ You're All Set!

The backend is **production-ready**. You can:

1. ✅ Run it locally for testing
2. ✅ Deploy to production
3. ✅ Integrate with React frontend
4. ✅ Add new features on top
5. ✅ Scale to handle thousands of users

**Next Steps:**
1. Test endpoints with Postman or cURL
2. Integrate with React frontend
3. Test email verification (Gmail config)
4. Deploy to cloud (AWS, Azure, etc.)
5. Set up monitoring & backups

**Questions?** Check the detailed guides above or review the code comments.

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** January 2024

Happy coding! 🎉
