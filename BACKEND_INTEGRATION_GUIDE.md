# 🔐 Guía de Integración con Backend - Sistema de Recuperación de Contraseña

## 📌 Descripción General

Este documento proporciona ejemplos de código para implementar el backend del sistema de recuperación de contraseña.

---

## 🔧 Tecnologías Recomendadas

- **Runtime**: Node.js
- **Framework**: Express.js
- **BD**: MongoDB o PostgreSQL
- **Seguridad**: bcryptjs, jsonwebtoken, dotenv
- **Email**: nodemailer, SendGrid, Mailgun
- **Validation**: joi, express-validator

---

## 📦 Instalación de Dependencias

```bash
npm install express bcryptjs jsonwebtoken dotenv nodemailer joi cors express-rate-limit
```

---

## 🗄️ Esquema de Base de Datos

### Usuario (Users)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (bcrypted),
  phone: String,
  role: String (admin|client|professional),
  createdAt: Date,
  updatedAt: Date,
  active: Boolean
}
```

### Token de Reset (PasswordResetTokens)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (foreign key),
  token: String (hashed, unique, indexed),
  tokenHash: String (para almacenamiento seguro),
  expiresAt: Date,
  used: Boolean,
  usedAt: Date,
  ipAddress: String,
  userAgent: String,
  createdAt: Date
}
```

### SQL Equivalente (PostgreSQL)
```sql
CREATE TABLE password_reset_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token (token),
  INDEX idx_user_id (user_id)
);

CREATE TABLE password_reset_attempts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  success BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email_ip (email, ip_address),
  INDEX idx_created (created_at)
);
```

---

## 🛠️ Implementación en Backend (Node.js/Express)

### 1. Archivo de Configuración (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auraspa
# o para PostgreSQL
DATABASE_URL=postgresql://user:pass@localhost:5432/auraspa

JWT_SECRET=tu_llave_secreta_super_segura
JWT_RESET_SECRET=otra_llave_secreta_diferente

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
SENDER_EMAIL=noreply@auraspa.com

# Frontend
FRONTEND_URL=https://auraspa.com
RESET_PASSWORD_URL=https://auraspa.com/reset-password

# Security
RESET_TOKEN_EXPIRY=1800000 # 30 minutos en ms
MAX_RESET_ATTEMPTS=5
RESET_ATTEMPT_WINDOW=3600000 # 1 hora en ms
```

### 2. Utilidades de Seguridad (utils/crypto.js)
```javascript
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Generar token único y seguro
function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Hash del token (para almacenamiento en BD)
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// Validar contraseña
function validatePassword(password) {
  const rules = {
    minLength: password.length >= 8,
    hasLetters: /[a-zA-Z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password), // opcional
  };

  const isValid = Object.values(rules).every(rule => rule);
  const errors = [];

  if (!rules.minLength) errors.push('Contraseña debe tener mínimo 8 caracteres');
  if (!rules.hasLetters) errors.push('Debe contener letras');
  if (!rules.hasNumbers) errors.push('Debe contener números');

  return { isValid, errors, rules };
}

// Hashear contraseña
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Comparar contraseña
async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  generateResetToken,
  hashToken,
  validatePassword,
  hashPassword,
  comparePassword,
};
```

### 3. Middleware de Rate Limiting (middleware/rateLimiter.js)
```javascript
const rateLimit = require('express-rate-limit');

// Rate limiter para recuperación de contraseña
const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos máximo
  message: 'Demasiados intentos. Intenta más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.user?.role === 'admin', // Los admins no tienen límite
  keyGenerator: (req) => req.ip, // Limitar por IP
});

// Rate limiter para validación de token
const resetTokenValidationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // 10 intentos
  message: 'Demasiadas solicitudes. Intenta más tarde.',
});

module.exports = {
  resetPasswordLimiter,
  resetTokenValidationLimiter,
};
```

### 4. Controladores de Autenticación (controllers/authController.js)
```javascript
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const {
  generateResetToken,
  hashToken,
  validatePassword,
  hashPassword,
  comparePassword,
} = require('../utils/crypto');
const { sendResetEmail } = require('../utils/mailer');
const { RESET_TOKEN_EXPIRY } = process.env;

// 1. SOLICITAR RECUPERACIÓN DE CONTRASEÑA
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validar email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido',
      });
    }

    // Buscar usuario (sin revelar si existe)
    const user = await User.findOne({ email: email.toLowerCase() });

    // Por seguridad, responder lo mismo si existe o no
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'Si el email está registrado, recibirás un enlace para restablecer tu contraseña.',
      });
    }

    // Verificar si hay intentos excesivos/recientes
    const existingToken = await PasswordResetToken.findOne({
      userId: user._id,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (existingToken && existingToken.createdAt > new Date(Date.now() - 5 * 60 * 1000)) {
      // Token válido creado hace menos de 5 minutos
      return res.status(200).json({
        success: true,
        message: 'Si el email está registrado, recibirás un enlace para restablecer tu contraseña.',
      });
    }

    // Generar token
    const plainToken = generateResetToken();
    const tokenHash = hashToken(plainToken);

    // Guardar en BD
    const resetToken = await PasswordResetToken.create({
      userId: user._id,
      token: tokenHash,
      expiresAt: new Date(Date.now() + parseInt(RESET_TOKEN_EXPIRY)),
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    // Enviar email con el token
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${plainToken}`;
    
    try {
      await sendResetEmail(user.email, user.name, resetLink);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Log para debugging, pero no revelar error al usuario
    }

    res.status(200).json({
      success: true,
      message: 'Si el email está registrado, recibirás un enlace para restablecer tu contraseña.',
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error procesando la solicitud. Intenta más tarde.',
    });
  }
};

// 2. VALIDAR TOKEN
exports.validateResetToken = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token requerido',
      });
    }

    const tokenHash = hashToken(token);
    const resetToken = await PasswordResetToken.findOne({
      token: tokenHash,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: 'El enlace ha expirado o no es válido',
      });
    }

    const user = await User.findById(resetToken.userId);

    res.status(200).json({
      success: true,
      email: user.email,
      message: 'Token válido',
    });

  } catch (error) {
    console.error('Validate token error:', error);
    res.status(500).json({
      success: false,
      message: 'Error validando token',
    });
  }
};

// 3. RESTABLECER CONTRASEÑA
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    // Validar entrada
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Las contraseñas no coinciden',
      });
    }

    // Validar política de contraseña
    const { isValid, errors } = validatePassword(newPassword);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Contraseña no cumple requisitos',
        errors,
      });
    }

    // Buscar y validar token
    const tokenHash = hashToken(token);
    const resetToken = await PasswordResetToken.findOne({
      token: tokenHash,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: 'El enlace ha expirado o no es válido',
      });
    }

    // Actualizar contraseña del usuario
    const user = await User.findById(resetToken.userId);
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    // Marcar token como usado
    resetToken.used = true;
    resetToken.usedAt = new Date();
    await resetToken.save();

    // Invalidar todos los tokens anteriores del usuario
    await PasswordResetToken.updateMany(
      { userId: user._id, _id: { $ne: resetToken._id } },
      { used: true }
    );

    // Enviar email de confirmación
    try {
      // await sendPasswordChangedEmail(user.email, user.name);
    } catch (emailError) {
      console.error('Error sending confirmation:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Contraseña restablecida exitosamente',
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error restableciendo contraseña',
    });
  }
};

// 4. LIMPIAR TOKENS EXPIRADOS (Cron job)
exports.cleanupExpiredTokens = async () => {
  try {
    const result = await PasswordResetToken.deleteMany({
      expiresAt: { $lt: new Date() },
      used: true,
    });
    console.log(`Deleted ${result.deletedCount} expired tokens`);
  } catch (error) {
    console.error('Cleanup error:', error);
  }
};
```

### 5. Servicio de Email (utils/mailer.js)
```javascript
const nodemailer = require('nodemailer');

// Configurar transporte
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Template de email
function getResetEmailTemplate(name, resetLink) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'DM Sans', sans-serif; color: #3D2B24; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3D2B24; color: #FAF7F2; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; border: 1px solid #E8DDD0; }
          .button { background: #7A8C6E; color: #FAF7F2; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0; }
          .footer { color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E8DDD0; text-align: center; }
          .warning { background: #FDECEA; border-left: 4px solid #9B1C1C; padding: 10px; margin: 20px 0; color: #9B1C1C; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Aura Spa & Wellness</h2>
          </div>
          <div class="content">
            <h1>Hola ${name},</h1>
            
            <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para crear una nueva.</p>
            
            <center>
              <a href="${resetLink}" class="button">Restablecer Contraseña</a>
            </center>
            
            <p>O copia este enlace en tu navegador:</p>
            <p style="word-break: break-all; color: #666; font-size: 12px;">${resetLink}</p>
            
            <div class="warning">
              <strong>⚠️ Importante:</strong>
              <ul>
                <li>Este enlace expira en 30 minutos</li>
                <li>No compartas este enlace con nadie</li>
                <li>Si no solicitaste esto, ignora este email</li>
              </ul>
            </div>
            
            <p>Atentamente,<br>El equipo de Aura Spa</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Aura Spa S.A.S. Todos los derechos reservados.</p>
            <p>Este es un email automático. Por favor no responder.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Enviar email de reset
async function sendResetEmail(email, name, resetLink) {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Restablecer tu contraseña - Aura Spa',
    html: getResetEmailTemplate(name, resetLink),
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendResetEmail };
```

### 6. Rutas de API (routes/auth.js)
```javascript
const express = require('express');
const authController = require('../controllers/authController');
const { resetPasswordLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/auth/forgot-password
router.post('/forgot-password', resetPasswordLimiter, authController.forgotPassword);

// GET /api/auth/validate-reset-token
router.get('/validate-reset-token', authController.validateResetToken);

// POST /api/auth/reset-password
router.post('/reset-password', resetPasswordLimiter, authController.resetPassword);

module.exports = router;
```

### 7. Cron Job para Limpieza (jobs/cleanup.js)
```javascript
const cron = require('node-cron');
const { cleanupExpiredTokens } = require('../controllers/authController');

// Ejecutar cada hora
cron.schedule('0 * * * *', () => {
  console.log('Running cleanup job...');
  cleanupExpiredTokens();
});

module.exports = cron;
```

### 8. Archivo Principal (server.js)
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 📋 Checklist de Seguridad

- [ ] Usar HTTPS en producción
- [ ] Validar y sanitizar todas las entradas
- [ ] Rate limiting en endpoints sensitivos
- [ ] Tokens hasheados en BD
- [ ] Contraseñas hasheadas con bcrypt (salt rounds: 10+)
- [ ] Logs de intentos de reset
- [ ] Alertas de cambios de contraseña
- [ ] Invalidar sesiones antiguas al restablecer
- [ ] Usar variables de entorno para secretos
- [ ] CORS configurado correctamente
- [ ] CSRF tokens si es necesario
- [ ] Headers de seguridad (helmet.js)

---

## 🧪 Testing

```javascript
// Unit tests
describe('Password Reset', () => {
  it('should generate valid reset token', async () => {
    const token = generateResetToken();
    expect(token).toHaveLength(64);
  });

  it('should validate strong password', () => {
    const { isValid } = validatePassword('SecurePass123');
    expect(isValid).toBe(true);
  });

  it('should reject weak password', () => {
    const { isValid } = validatePassword('weak');
    expect(isValid).toBe(false);
  });
});

// Integration tests
describe('Auth API', () => {
  it('POST /api/auth/forgot-password should accept valid email', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'test@example.com' });
    expect(res.status).toBe(200);
  });

  it('Should not reveal if email exists', async () => {
    const res1 = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'exists@example.com' });
    const res2 = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'notexists@example.com' });
    expect(res1.body.message).toBe(res2.body.message);
  });
});
```

---

## 📞 Soporte

Para preguntas sobre la integración backend, contacta al equipo de desarrollo.

---

**Versión**: 1.0  
**Última actualización**: 2026-02-25
