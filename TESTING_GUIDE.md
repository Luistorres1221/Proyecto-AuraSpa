# 🚀 Integration Testing Guide - Step by Step

## ⏱️ Tiempo estimado: 10-15 minutos

---

## PASO 1: Preparar la Base de Datos MySQL

### Opción A: Con XAMPP (Recomendado)
```
1. Abre XAMPP Control Panel
2. Click en "Start" en la fila "MySQL"
3. Verifica que el estado cambie a "Running" (verde)
4. Nota: Se ejecutará en localhost:3306
```

### Opción B: Con MySQL CLI
```bash
# En Terminal (Windows PowerShell / CMD)
# Si MySQL está instalado y agregado a PATH:
mysql -u root -p

# Cuando pida contraseña:
# - Si no tiene contraseña, presiona Enter
# - Si tiene contraseña, escríbela
```

### Verificar Conexión
```bash
# En Terminal
mysql -u root -p -e "SELECT VERSION();"

# Si ves la versión (ej: 8.0.32), MySQL está OK
```

---

## PASO 2: Crear la Base de Datos y Tablas

### Ejecutar Scripts SQL

```bash
# En Terminal, navega a la carpeta Backend
cd "c:\Users\LUIS ALBERTO TORRES\Desktop\ProyectoPrueba\Backend"

# Ejecutar script de creación
mysql -u root -p < db\schema.sql

# Cuando pida contraseña, escribe la contraseña de MySQL
# Si la dejaste en blanco en XAMPP, solo presiona Enter
```

**Si todo OK**: No verás errores, solo aparecerá nueva línea en el terminal

### Cargar Datos de Prueba

```bash
# Mismo directorio Backend
mysql -u root -p < db\init.sql
```

---

## PASO 3: Iniciar Backend (Spring Boot)

```bash
# Terminal 1 - Navega a Backend
cd "c:\Users\LUIS ALBERTO TORRES\Desktop\ProyectoPrueba\Backend"

# Ejecuta el servidor
mvn spring-boot:run

# Esperarás líneas como:
# [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http)
# [main] com.example.AugaApplication               : Started AugaApplication

# ✅ Backend está listo cuando ves: "Started AugaApplication"
# NO cierres esta Terminal
```

**Verificar Backend está vivo**: Abre navegador → http://localhost:8080/api/health/status
- Deberías ver: `{"status":"UP","message":"...API is healthy"}`

---

## PASO 4: Instalar Dependencias Frontend (Solo primera vez)

```bash
# Terminal 2 (Nueva Terminal)
cd "c:\Users\LUIS ALBERTO TORRES\Desktop\ProyectoPrueba\Frontend"

# Instalar paquetes
npm install

# Espera a que termine... (1-2 minutos)
```

---

## PASO 5: Iniciar Frontend (React)

```bash
# Después que npm install termina

# Terminal 2 (Continúa)
npm run dev

# Esperarás:
# VITE v7.3.1  ready in 123 ms
# ➜  Local:   http://localhost:5173/
# 
# ✅ Frontend está listo

# NO cierres esta Terminal
```

---

## PASO 6: Pruebas en Navegador

### Opción más rápida: Usa Credenciales de Prueba

```
Email:    juan.perez.cliente@gmail.com
Password: Cliente@2024
Rol:      Cliente
```

### Test #1: Iniciar Sesión

1. Abre navegador → http://localhost:5173 o http://localhost:5178 (el que aparezca)
2. Click en "Iniciar sesión"
3. Ingresa:
   - Email: `juan.perez.cliente@gmail.com`
   - Contraseña: `Cliente@2024`
4. Click "Entrar"

**Resultado esperado:**
- ✅ Redirige a home/dashboard
- ✅ Muestra nombre del usuario en navbar
- ✅ Puede hacer clic en "Reservar"

**Verificar en DevTools** (F12):
- Abre DevTools (F12)
- Vaya a "Application" → "Local Storage"
- Debe ver:
  - `authToken`: (larga cadena que inicia con "eyJ...")
  - `refreshToken`: (cadena similar)
  - `user`: (JSON con datos de usuario)

---

### Test #2: Registrar Usuario Nuevo

1. Vuelve a home (click "Aura Spa" o "Inicio")
2. Click "Registrarse"
3. Completa el formulario:
   ```
   Nombre:       Tu Nombre
   Apellido:     Tu Apellido
   Email:        tunombre@prueba.com (DEBE SER ÚNICO)
   Teléfono:     3001234567
   Contraseña:   Validar@2024 (mayúscula, minúscula, número, especial)
   Confirmar:    Validar@2024
   ```
4. Marca los checks de términos
5. Click "Crear cuenta"

**Resultado esperado:**
- ✅ Se crea usuario en backend (tabla `usuario`)
- ✅ Auto-login inmediato
- ✅ Redirige a dashboard

**Verificar:**
- DevTools → Local Storage → nuevo `user` con tu email

---

### Test #3: Reservar Cita

1. Click "Reservar" en navbar
2. Selecciona un servicio (ej: "Masaje Relajante")
3. Click "Continuar"
4. Selecciona:
   - Terapeuta: Una disponible (ej: "María García")
   - Fecha: Una fecha futura (ej: mañana)
5. Click en un slot de hora verde (ej: 10:00)
6. Click "Continuar"
7. Revisa resumen
8. Click "Confirmar cita"

**Resultado esperado:**
- ✅ Pantalla de éxito: "¡Cita Confirmada!"
- ✅ Aparece en "Mis Citas"
- ✅ Se guarda en la base de datos (`cita` table)

**Verificar en DB:**
```bash
# Abre otra Terminal (Terminal 3)
mysql -u root -p aura_spa

# Dentro de MySQL:
SELECT * FROM cita WHERE usuario_id = (SELECT id FROM usuario WHERE email = 'tunombre@prueba.com');
```
Deberías ver tu cita en la tabla.

---

### Test #4: Ver Mis Citas

1. Click "Mis Citas" en navegación
2. Deberías ver todas tus reservas

**Resultado esperado:**
- ✅ La cita que acabas de crear aparece
- ✅ Muestra fecha, hora, servicio, terapeuta
- ✅ Botón "Cancelar" disponible

---

### Test #5: Logout (Cerrar Sesión)

1. Click botón usuario (arriba derecha)
2. Click "Cerrar sesión"

**Resultado esperado:**
- ✅ Redirige a home
- ✅ Navbar muestra "Iniciar sesión" / "Registrarse"
- ✅ Local Storage se limpia (ya no hay `authToken`, etc.)

**Verificar:**
- DevTools → Local Storage → solo deben quedar datos de tema/idioma

---

## TEST #6: Admin Panel (Opcional)

Si quieres ver el panel de administración:

```
Email:    admin@auraspa.com
Password: Admin@2024
```

1. Logout si estás logeado
2. "Iniciar sesión" con credenciales admin
3. Se redirige automáticamente a "Resumen" del admin
4. Puedes ver:
   - Dashboard con gráficos
   - Lista de citas
   - Gestión de servicios y terapeutas
   - Configuraciones

---

## 🐛 Si Algo No Funciona...

### Error: "Connection Refused" al hacer login

**Solución:**
```bash
# Terminal 1: Verifica Backend está corriendo
# (Debe decir "Started AugaApplication")

# Si no está, inicia de nuevo:
cd Backend
mvn spring-boot:run
```

### Error: "Email ya existe" al registrar

**Solución:**
- Usa un email diferente
- O borra el usuario de la BD:
```bash
# Terminal 3 (MySQL)
DELETE FROM usuario WHERE email = 'tuemailerroneounico@test.com';
```

### Error: "Frontend no se conecta"

**Solución:**
```bash
# Verifica URLs correctas
# Backend debe estar en: http://localhost:8080
# Frontend debe estar en: http://localhost:5173 o 5178

# Abre DevTools, pestaña "Network"
# Intenta login
# Busca una request a "http://localhost:8080/api/auth/login"
# Si no ves la request, el frontend no está viendo al backend
#
# Solución: Reinicia ambos servidores
```

### Error: "JWT Token Inválido"

**Solución:**
```bash
# Limpia Local Storage en DevTools:
# Application → Local Storage → Site → Delete All

# Vuelve a hacer login
```

### Error: "MySQL no responde"

**Solución:**
```bash
# Si usas XAMPP:
# Click "Start" en MySQL en XAMPP Control Panel

# Si usas CLI, reinicia:
# En PowerShell (Admin):
# net stop MySQL80
# net start MySQL80
```

---

## ✅ Checklist de Validación

Marca cuando cada uno funciona:

- [ ] Backend inicia sin errores (puerto 8080)
- [ ] Frontend inicia sin errores (puerto 5173/5178)
- [ ] Puedo ver http://localhost:8080/api/health/status en navegador
- [ ] Puedo hacer login con juan.perez.cliente@gmail.com
- [ ] authToken se guarda en Local Storage
- [ ] Mi nombre aparece en el navbar después de login
- [ ] Puedo registrar un usuario nuevo
- [ ] Puedo reservar una cita
- [ ] La cita aparece en "Mis Citas"
- [ ] Puedo hacer logout
- [ ] Logout limpia los tokens

**Si marcaste todo ✅**: ¡La integración funciona perfectamente! 🎉

---

## 📊 Puertos a Recordar

| Servicio | Puerto | URL |
|----------|--------|-----|
| MySQL | 3306 | localhost:3306 |
| Backend | 8080 | http://localhost:8080/api |
| Frontend | 5173/5178 | http://localhost:5178 |

---

## 🔄 Reiniciar Todo (Si algo se daña)

```bash
# Terminal 1: Presiona Ctrl+C en Backend
# Terminal 2: Presiona Ctrl+C en Frontend
# Espera 5 segundos

# Vuelve a ejecutar en orden:
# 1. mvn spring-boot:run en Backend
# 2. npm run dev en Frontend
```

---

## 📝 Notas Importantes

1. **No cierres las Terminales**: Backend y Frontend deben estar corriendo
2. **MySQL permanente**: Funciona en background en XAMPP
3. **Datos persisten**: Lo que crees en una sesión, aparece en la siguiente
4. **Contraseñas seguras**: Todas tiene al menos 8 caracteres con mayúscula, número y especial

---

**¿Problemas?** Verifica:
1. ¿MySQL está ejecutándose?
2. ¿Backend inició correctamente?
3. ¿Frontend inició correctamente?
4. ¿Usas credenciales correctas?

¡Todo debería funcionar! 🚀
