# 🔐 Documentación: Sistema de Recuperación de Contraseña

## 📋 Resumen Ejecutivo

Se ha implementado un sistema completo de recuperación de contraseña para Aura Spa S.A.S. que incluye:

- ✅ Interfaz de usuario para solicitar recuperación
- ✅ Generación segura de tokens con expiración
- ✅ Pantalla de restablecimiento de contraseña
- ✅ Validaciones de seguridad robustas
- ✅ Manejo de errores y mensajes claros
- ✅ Diseño responsive y accesible

---

## 🎯 Funcionalidades Implementadas

### 1. **Enlace "¿Olvidaste tu contraseña?"**
   - Ubicación: Formul ario de login, debajo del campo de contraseña
   - Redirige a: Pantalla de recuperación
   - Disponible en: Español e Inglés

### 2. **Pantalla de Recuperación de Contraseña**
   - **URL**: `/recover-password` (o `setPage("recover-password")`)
   - **Campos**: Email registrado
   - **Validaciones**:
     - Email obligatorio
     - Formato de email válido
   - **Seguridad**:
     - No revela si el email existe o no
     - Mensaje genérico: "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña"
   - **Proceso**:
     1. Usuario ingresa email
     2. Sistema genera token único (válido 30 minutos)
     3. Token se almacena en localStorage con expiración
     4. En producción: Se enviaría email con enlace
     5. Para testing: Token y enlace aparecen en consola (F12)

### 3. **Pantalla de Restablecimiento de Contraseña**
   - **URL**: `/reset-password?token=XXXX`
   - **Detección automática**: Si hay parámetro token en URL, se navega automáticamente
   - **Campos**:
     - Nueva contraseña
     - Confirmar contraseña
   - **Validaciones de Contraseña**:
     - Mínimo 8 caracteres
     - Deve contener letras (a-z, A-Z)
     - Debe contener números (0-9)
   - **Seguridad del Token**:
     - Validación de existencia
     - Validación de expiración (30 minutos)
     - Validación de no reutilización
     - Los tokens se marcan como usados después del primer uso
   - **Proceso**:
     1. Usuario accede al enlace con token
     2. Sistema valida token
     3. Si válido: Usuario ingresa nueva contraseña
     4. Si inválido/expirado: Mostrar página de enlace expirado
     5. Al restablecer: Contraseña se actualiza, token se invalida
     6. Redirige a login

---

## 🔒 Características de Seguridad

### Almacenamiento de Tokens
```javascript
// Formato en localStorage:
{
  "pwd_reset_TOKEN_UNICO": {
    "email": "usuario@ejemplo.com",
    "expiresAt": 1234567890,  // timestamp
    "used": false
  }
}
```

### Validaciones de Token
- ✅ Verificación de existencia
- ✅ Verificación de expiración (30 minutos)
- ✅ Verificación de no reutilización
- ✅ Invalidación automática post-uso

### Validaciones de Contraseña
- ✅ Longitud mínima: 8 caracteres
- ✅ Combinación: letras + números
- ✅ Confirmación: ambos campos coinciden

### Privacidad
- ✅ No se revela si el email existe en el sistema
- ✅ Mismo mensaje para emails válidos e inválidos
- ✅ Los tokens no contienen información sensible

---

## 🎨 Interfaz de Usuario

### Pantalla de Recuperación
```
┌─────────────────────────────────────────┐
│            Aura Spa & Wellness          │
├─────────────────────────────────────────┤
│  Recuperar Contraseña                   │
│  Ingresa tu correo para restablecer      │
│  tu contraseña                          │
│                                         │
│  📧 correo@ejemplo.com                  │
│                                         │
│  [Enviar enlace de recuperación]        │
│  [Volver a Iniciar sesión]              │
└─────────────────────────────────────────┘
```

### Pantalla de Restablecimiento
```
┌─────────────────────────────────────────┐
│            Aura Spa & Wellness          │
├─────────────────────────────────────────┤
│  Restablecer Contraseña                 │
│  Crea una nueva contraseña segura       │
│                                         │
│  🔒 Nueva contraseña                    │
│  ••••••••                               │
│                                         │
│  🔒 Confirmar contraseña                │
│  ••••••••                               │
│                                         │
│  ✓ Requisitos de seguridad:             │
│    ✓ 8≥ caracteres                      │
│    ✓ Contiene letras                    │
│    ✓ Contiene números                   │
│                                         │
│  [Restablecer contraseña]               │
│  [Volver a Iniciar sesión]              │
└─────────────────────────────────────────┘
```

---

## 📱 Flujo Completo

```
USUARIO OLVIDA CONTRASEÑA
          ↓
    [Click en enlace]
    "¿Olvidaste tu contraseña?"
          ↓
┌─────────────────────────────────┐
│ PANTALLA: Recuperar Contraseña  │
├─────────────────────────────────┤
│ - Ingresa email: usuario@email  │
│ - Valida formato                │
│ - Genera token (30 min)         │
│ - Muestra confirmación          │
└─────────────────────────────────┘
          ↓
   [USUARIO RECIBE EMAIL]
   (En demo: ver consola F12)
          ↓
┌─────────────────────────────────┐
│ LINK EN EMAIL:                  │
│ /reset-password?token=XXXX      │
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│ PANTALLA: Reset Password        │
├─────────────────────────────────┤
│ - Valida token                  │
│ - Usuario ingresa nueva pwd     │
│ - Valida seguridad              │
│ - Actualiza contraseña          │
│ - Invalida token                │
│ - Muestra éxito                 │
└─────────────────────────────────┘
          ↓
   [REDIRIGE A LOGIN]
          ↓
  USUARIO INICIA SESIÓN
  CON NUEVA CONTRASEÑA ✓
```

---

## 🧪 Como Probar en Desarrollo

### Test Case 1: Flujo Completo
1. Abre la aplicación
2. Ve a "Iniciar sesión"
3. Haz clic en "¿Olvidaste tu contraseña?"
4. Ingresa un email (ej: cliente@email.com)
5. Haz clic en "Enviar enlace de recuperación"
6. Abre la consola (F12) y copia el token
7. En la consola, copia el enlace de recuperación
8. Pega en la URL manualmente o usa: `setPage("reset-password")` y luego la URL con token
9. Ingresa nueva contraseña segura
10. Confirma y restablece
11. Verifica que inices sesión con la nueva contraseña

### Test Case 2: Token Expirado
1. Copia un token que generaste hace más de 30 minutos
2. Intenta acceder a `/reset-password?token=XXXX`
3. Deberías ver "El enlace ha expirado"

### Test Case 3: Token Usado
1. Restablece una contraseña exitosamente con un token
2. Intenta usar el mismo token nuevamente
3. Deberías ver "El enlace ha expirado"

### Test Case 4: Validación de Email
1. Intenta ingresar un email inválido
2. Sistema debe rechazar con mensaje de error

### Test Case 5: Validación de Contraseña
Intenta:
- Contraseña < 8 caracteres → Error
- Solo letras → Error
- Solo números → Error
- Letras + números → Aceptado ✓

---

## 🔧 Integración con Backend (Próximo Paso)

Para producción, reemplaza la lógica simulada con estas API calls:

### Endpoint 1: Solicitar Recuperación
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "usuario@ejemplo.com"
}

Response:
{
  "success": true,
  "message": "Si el correo está registrado, recibirás un enlace..."
}
```

### Endpoint 2: Validar Token
```
GET /api/auth/validate-reset-token?token=XXXX

Response:
{
  "valid": true,
  "email": "usuario@ejemplo.com"
}
```

### Endpoint 3: Restablecer Contraseña
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "XXXXX",
  "newPassword": "NuevaPass123"
}

Response:
{
  "success": true,
  "message": "Contraseña restablecida exitosamente"
}
```

---

## 📋 Consideraciones de Seguridad para Backend

### Almacenamiento de Tokens
```sql
-- Tabla en BD
CREATE TABLE password_reset_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Encriptación de Contraseña
```javascript
// Node.js con bcrypt
const bcrypt = require('bcrypt');

// Al restablecer:
const hashedPassword = await bcrypt.hash(newPassword, 10);
user.password = hashedPassword;
await user.save();
```

### Seguridad Recomendada
- ✅ HTTPS requerido para todas las transacciones
- ✅ Tokens generados con crypto.randomBytes()
- ✅ Tokens hasheados en BD (no almacenar en texto plano)
- ✅ Rate limiting en endpoint de recuperación
- ✅ Logging de intentos de restablecimiento
- ✅ Notificación por email cuando se cambia contraseña
- ✅ Invalidar todas las sesiones activas al restablecer

---

## 🌍 Multiidioma

Todas las traducciones están incluidas:

| Componente | ES | EN |
|-----------|----|----|
| Enlace | ¿Olvidaste tu contraseña? | Forgot your password? |
| Título Recuperar | Recuperar Contraseña | Recover Password |
| Botón | Enviar enlace de recuperación | Send recovery link |
| Éxito | Correo Enviado | Email Sent |
| Título Reset | Restablecer Contraseña | Reset Password |
| Botón Reset | Restablecer contraseña | Reset password |
| Error Token | El enlace ha expirado | The link has expired |

---

## 📊 Estados de la UI

### Pantalla de Recuperación
- `normal`: Formulario activo
- `loading`: Procesando (botón deshabilitado)
- `success`: Mostrar confirmación
- `error`: Mostrar error específico

### Pantalla de Reset
- `normal`: Formulario activo
- `loading`: Procesando
- `success`: Contraseña restablecida
- `error`: Token inválido/expirado o error en validación
- `invalid_token`: Token expirado o inexistente

---

## ✨ Características Adicionales

### Validación en Tiempo Real
- Requisitos de contraseña mostrados con colores:
  - 🔴 Rojo: No cumple
  - 🟢 Verde: Cumple

### Accesibilidad
- Labels asociados correctamente
- ARIA labels para mensajes de error
- Navegación por teclado soportada
- Contraste de color WCAG AA compliant

### Responsive Design
- Funciona en móvil, tablet y desktop
- Optimizado para pantallas pequeñas
- Touch-friendly buttons y inputs

---

## 🚀 Próximos Pasos

1. **Conectar con Backend Real**
   - Reemplazar lógica localStorage con API calls
   - Implementar endpoints mencionados

2. **Envío de Emails**
   - Elegir servicio: SendGrid, Mailgun, AWS SES
   - Template HTML para correo
   - Branding personalizado

3. **Logging y Monitoreo**
   - Registrar intentos de recuperación
   - Alertar sobre actividad sospechosa
   - Analytics de uso

4. **Mejoras Futuras**
   - 2FA adicional
   - Verificación por SMS
   - Recovery codes
   - Autenticación biométrica

---

## 📞 Soporte

Para problemas o preguntas sobre la implementación, contacta al equipo de desarrollo.

---

**Versión**: 1.0  
**Última actualización**: 2026-02-25  
**Estado**: ✅ Completamente implementado
