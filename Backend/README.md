# AuraSpa Backend - Spring Boot 3.2.0

Complete backend implementation for AuraSpa beauty and wellness platform with JWT authentication, email verification, 2FA, and comprehensive security features.

## 🚀 Quick Start

### Prerequisites
- Java 17 JDK
- Maven 3.9+
- MySQL 8.0+ (via XAMPP)

### 1. Database Setup
```bash
# Create database (MySQL running on localhost:3306)
mysql -u root -e "CREATE DATABASE auraspa_db CHARACTER SET utf8mb4;"
```

### 2. Build & Run
```bash
# Build project
mvn clean install

# Run application
mvn spring-boot:run
```

API will be available at `http://localhost:8080/api`

Health check: `curl http://localhost:8080/api/health`

### 3. Frontend Connection
```javascript
// In React frontend (package.json)
"REACT_APP_API_URL": "http://localhost:8080/api"
```

---

## 📋 Project Structure

```
Backend/
├── src/main/java/com/auraspa/
│   ├── model/           # JPA entities (User, LoginHistory, etc.)
│   ├── repository/      # Data access layer
│   ├── service/         # Business logic (Auth, Email, 2FA, etc.)
│   ├── controller/      # REST API endpoints
│   ├── security/        # JWT token handling
│   ├── config/          # Spring Security configuration
│   └── exception/       # Error handling
├── src/main/resources/
│   └── application.yml  # Configuration (MySQL, JWT, Email)
└── pom.xml             # Maven dependencies
```

---

## 🔑 Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login (JWT) |
| POST | `/auth/verify-email` | Verify email token |
| POST | `/auth/verify-2fa` | Verify 2FA code |
| POST | `/auth/refresh-token` | Refresh access token |
| POST | `/auth/revoke-all-tokens` | Close all sessions |
| GET | `/user/{id}` | Get user profile |
| PUT | `/user/{id}` | Update profile |
| POST | `/user/{id}/change-password` | Change password |
| GET | `/user/{id}/login-history` | View login history |
| POST | `/user/{id}/delete-account` | Delete account |
| GET | `/health` | API health check |

📚 **Full API documentation:** See [BACKEND_SETUP_GUIDE.md](../BACKEND_SETUP_GUIDE.md)

---

## 🔐 Security Features

✅ **JWT Authentication** - Stateless token-based sessions  
✅ **Email Verification** - 24-hour token expiration  
✅ **Account Lockout** - 5 failed attempts = 60 second block  
✅ **Password Encryption** - BCrypt hashing  
✅ **2FA Support** - Email-based OTP codes  
✅ **Refresh Token Rotation** - Automatic token refresh  
✅ **Session Management** - Device tracking & "Remember Me"  
✅ **Login History** - Complete audit trail  
✅ **IP Tracking** - All logins recorded with IP/device info  

---

## 📝 Configuration

### MySQL (XAMPP)
```yaml
Database: auraspa_db
Host: localhost:3306
User: root
Password: (empty)
```

### JWT
```yaml
Secret: your-super-secret-key  (change in production)
Access Token: 24 hours
Refresh Token: 7 days
```

### Email (Gmail SMTP)
```yaml
Host: smtp.gmail.com
Port: 587
Username: your-email@gmail.com
Password: your-app-specific-password  (NOT gmail password!)
```

Set environment variables or update `application.yml`

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:8080/api/health
```

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan",
    "lastname": "Pérez",
    "email": "juan@example.com",
    "phone": "+34612345678",
    "password": "Password123!@#",
    "confirmPassword": "Password123!@#",
    "acceptTerms": true,
    "acceptDataPolicy": true
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Password123!@#",
    "rememberMe": true
  }'
```

### Protected Endpoint (with JWT)
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/user/1
```

Use **Postman** for easier testing. Import the collection from [BACKEND_SETUP_GUIDE.md](../BACKEND_SETUP_GUIDE.md)

---

## 📊 Database

Hibernate auto-creates tables with `ddl-auto: update`

Tables created:
- `user` - User accounts
- `refresh_token` - JWT tokens
- `login_history` - Login audit trail
- `email_verification_token` - Email verification
- `password_reset_token` - Password recovery
- `two_fa_code` - 2FA codes
- `service` - Service catalog
- `professional` - Staff profiles
- `appointment` - Bookings

View schema:
```bash
mysql -u root -D auraspa_db -e "SHOW TABLES; DESCRIBE user;"
```

---

## 🔄 Docker Support (Optional)

### Build Docker Image
```bash
# From Backend directory
docker build -t auraspa-backend:1.0.0 .
```

### Run in Docker
```bash
docker run -p 8080:8080 \
  -e MYSQL_PASSWORD="" \
  -e JWT_SECRET="your-secret" \
  -e MAIL_USERNAME="your-email@gmail.com" \
  -e MAIL_PASSWORD="app-password" \
  auraspa-backend:1.0.0
```

---

## 🐛 Troubleshooting

**Port 8080 in use:**
```bash
# Find process using port 8080
lsof -i :8080
kill -9 <PID>
```

**MySQL connection error:**
- Start XAMPP MySQL service
- Verify database exists: `mysql -u root -e "SHOW DATABASES;"`

**Build fails:**
```bash
# Clear Maven cache
mvn clean install -DskipTests -U
```

**Email not sending:**
1. verify MAIL_USERNAME and MAIL_PASSWORD in environment
2. Use Gmail App Password (not regular password)
3. Enable Less Secure Apps or 2FA with App Password

---

## 📈 Performance & Monitoring

### Logs
Located in `logs/auraspa.log` (auto-rotating every 10MB)

Check logs:
```bash
tail -f logs/auraspa.log
```

### Database Connection Pool
- Max connections: 20
- Min idle: 5
- Connection timeout: 20 seconds

### Enable SQL Logging (debug)
```yaml
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
logging:
  level:
    org.hibernate.SQL: DEBUG
```

---

## 📦 Deployment

### Production Checklist

- [ ] Change JWT_SECRET to long random string
- [ ] Use cloud database (AWS RDS, Azure MySQL)
- [ ] Use production email service (SendGrid, AWS SES)
- [ ] Set CORS allowed origins to production domain
- [ ] Disable DEBUG logging
- [ ] Enable HTTPS/SSL
- [ ] Set secure cookies in auth responses
- [ ] Implement rate limiting
- [ ] Add API versioning

### Build Production JAR
```bash
mvn clean package -DskipTests -P production
java -jar target/auraspa-backend-1.0.0.jar
```

---

## 🔗 Integration with Frontend

React frontend connects via HTTP requests to this backend:

```javascript
// Frontend API client example
const API_URL = "http://localhost:8080/api";

// Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});

const { accessToken, refreshToken } = await response.json();

// Store tokens and use in subsequent requests
localStorage.setItem("accessToken", accessToken);

// Protected request
await fetch(`${API_URL}/user/1`, {
  headers: {
    "Authorization": `Bearer ${accessToken}`
  }
});
```

See [Frontend Integration Guide](../BACKEND_INTEGRATION_GUIDE.md) for detailed instructions

---

## 📚 Documentation

- **Full API Reference:** [BACKEND_SETUP_GUIDE.md](../BACKEND_SETUP_GUIDE.md)
- **Integration with Frontend:** [BACKEND_INTEGRATION_GUIDE.md](../BACKEND_INTEGRATION_GUIDE.md)
- **Password Recovery:** [PASSWORD_RECOVERY_DOCUMENTATION.md](../PASSWORD_RECOVERY_DOCUMENTATION.md)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request

---

## 📄 License

AuraSpa Backend - Spring Boot 3.2.0
Developed for beauty and wellness platform

---

## ✨ Features at a Glance

| Feature | Status | Details |
|---------|--------|---------|
| User Registration | ✅ | Email verification required |
| JWT Tokens | ✅ | 24h access + 7d refresh |
| Account Lockout | ✅ | 5 attempts → 60s block |
| Email Verification | ✅ | 24-hour token expiration |
| Password Reset | ✅ | Token-based recovery |
| 2FA Authentication | ✅ | 6-digit email OTP |
| Session Management | ✅ | Close all sessions |
| Login History | ✅ | IP + device tracking |
| Role-based Access | ✅ | ADMIN, CLIENT, PROFESSIONAL |
| Admin Dashboard | ✅ | User stats & monitoring |

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** January 2024

For questions or support, contact the development team.
