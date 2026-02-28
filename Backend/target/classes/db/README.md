# AuraSpa Database Setup

## 📋 Descripción

Scripts SQL para configurar la base de datos MySQL de la aplicación AuraSpa. Incluye esquema completo, datos iniciales y scripts de limpieza.

## 🗂️ Archivos

### `schema.sql`
Define la estructura completa de todas las tablas:
- **usuario** - Gestión de usuarios (clientes, profesionales, administradores)
- **token_refresco** - Tokens JWT para sesiones
- **historico_inicio_sesion** - Auditoría de intentos de login
- **token_verificacion_correo** - Verificación por email
- **token_recuperacion_contraseña** - Recuperación de contraseña
- **codigo_dos_fa** - Códigos OTP para autenticación de dos factores
- **servicio** - Servicios ofrecidos (masajes, faciales, etc.)
- **profesional** - Personal disponible
- **cita** - Reservaciones de clientes

### `init.sql`
Inserta datos iniciales para pruebas:
- 1 Usuario Administrador
- 3 Usuarios Cliente de ejemplo
- 1 Usuario Profesional
- 8 Servicios
- 6 Profesionales
- 4 Citas de ejemplo

### `drop-tables.sql`
Limpia la base de datos eliminando todas las tablas. **⚠️ USAR CON CUIDADO**

## ⚙️ Configuración

### 1. Crear la Base de Datos

Opción A: Mediante MySQL
```bash
# Abrir MySQL CLI
mysql -u root -p

# Crear base de datos
CREATE DATABASE auraspa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Opción B: El yaml de Spring Boot lo hace automáticamente
- Ver `application.yml` - propiedad `spring.jpa.hibernate.ddl-auto: create`

### 2. Ejecutar Schema

```bash
mysql -u root -p auraspa_db < schema.sql
```

### 3. Cargar Datos Iniciales

```bash
mysql -u root -p auraspa_db < init.sql
```

## 🔐 Credenciales de Prueba

### Administrador
- **Email:** admin@auraspa.com
- **Contraseña:** Admin@2024
- **Rol:** ADMIN

### Cliente de Prueba
- **Email:** juan.perez.cliente@gmail.com
- **Contraseña:** Cliente@2024
- **Rol:** CLIENTE

### Profesional de Prueba
- **Email:** profesional@auraspa.com
- **Contraseña:** Profesional@2024
- **Rol:** PROFESIONAL

## 🗄️ Conexión desde Spring Boot

El archivo `application.yml` configura automáticamente la conexión:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/auraspa_db
    username: root
    password: [tu_contraseña_mysql]
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update  # o create-drop para desarrollo
```

## 📊 Características de la BD

### Seguridad
- Todas las contraseñas hasheadas con BCrypt
- Campos `bloqueado` y `bloqueado_hasta` para lockout
- `intentos_fallidos` para rastrear intentos de login
- Índices en campos críticos para auditoría

### Auditoría
- Timestamps automáticos: `creado_en`, `actualizado_en`
- Histórico de login con IP y dispositivo
- Registro de uso de tokens

### Integridad Referencial
- Foreign keys con cascada de eliminación
- Validaciones a nivel base de datos

## 🔧 Mantenimiento

### Verificar estructura
```bash
mysql -u root -p auraspa_db
SHOW TABLES;
DESCRIBE usuario;
```

### Limpiar datos de prueba
```bash
mysql -u root -p auraspa_db < drop-tables.sql
mysql -u root -p auraspa_db < schema.sql
mysql -u root -p auraspa_db < init.sql
```

### Cambiar contraseña
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nueva_contraseña';
FLUSH PRIVILEGES;
```

## 📈 Escalabilidad

Para futuro crecimiento recomienda:
- Agregar índices adicionales según patrones de uso
- Implementar particionamiento de tablas grandes
- Considerar base de datos de auditoría separada
- Backup automático de `historico_inicio_sesion`

## ⚡ Con Docker (Opcional)

```bash
docker run --name mysql-auraspa \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=auraspa_db \
  -p 3306:3306 \
  -v ./db:/docker-entrypoint-initdb.d \
  mysql:8.0
```

## ❓ Troubleshooting

### Error: "Access denied"
Verificar usuarios MySQL: `SELECT User FROM mysql.user;`

### Error: "Table already exists"
Ejecutar `drop-tables.sql` primero para limpiar

### Error: "Foreign key constraint fails"
Asegurar de cargar `schema.sql` completo antes de `init.sql`

---

**Última actualización:** 2024  
**Versión MySQL:** 8.0+  
**Encoding:** UTF-8 (utf8mb4)
