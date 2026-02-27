# Aura Spa - Sistema Completo de Reserva y Gestión

Una aplicación web moderna y responsive para la gestión de servicios de spa y bienestar, construida con React, Vite y Canvas API. Incluye un panel de administración completo, soporte multiidioma, optimización de imágenes y un sistema seguro de recuperación de contraseña.

## 🌟 Descripción General

**Aura Spa** es una aplicación SPA (Single Page Application) completa diseñada para simplificar la reserva de servicios de spa, gestión de personal y operaciones comerciales. Proporciona una interfaz intuitiva para que los clientes reserven citas y un panel administrativo integral para las operaciones del negocio.


---

## 👥 Cuentas de Usuarios

### 🔐 Usuario Administrador
```
Nombre de Usuario: admin@auraspa.com
Contraseña: admin123
```
**Acceso**: Panel de administración con 12+ pestañas de configuración
- Gestión de servicios
- Gestión de personal
- Gestión de citas
- Análisis y reportes
- Gestión de imágenes
- Configuración del sistema

### 👤 Usuario Cliente
```
Nombre de Usuario: cliente@email.com
Contraseña: cliente123
```
**Acceso**: Sistema de reserva de citas
- Ver servicios disponibles
- Reservar citas
- Seleccionar personal preferido
- Gestionar perfil
- Recuperar contraseña olvidada

---

## ✨ Características

### Para Clientes
- 🔐 **Autenticación Segura**
  - Sistema de inicio de sesión/registro
  - Recuperación de contraseña con validación de token
  - Gestión de sesiones con localStorage

- 📅 **Reserva de Citas**
  - Calendario de disponibilidad en tiempo real
  - Selección de servicios con precios
  - Selección de personal preferido
  - Confirmación y sistema de recordatorios

- 🌐 **Soporte Multiidioma**
  - Español (ES) e Inglés (EN)
  - Cambio dinámico de idioma
  - Traducción completa de la interfaz

- 📱 **Diseño Responsive**
  - Enfoque mobile-first
  - Interfaz amigable con dispositivos táctiles
  - Optimización para escritorio

### Para Administradores
- 📊 **Panel de Control**
  - 12+ pestañas de configuración incluyendo:
    - Gestión de información del negocio
    - Configuración del catálogo de servicios
    - Gestión de personal (agregar/editar/eliminar)
    - Programación y gestión de citas
    - Gestión de clientes
    - Reportes y análisis de ingresos
    - Configuración del sistema y preferencias
    - Gestión de galería de imágenes
    - Plantillas de correo electrónico
    - Preferencias de idioma

- 👥 **Gestión de Personal**
  - Agregar/editar/eliminar miembros del personal
  - Gestión de horarios
  - Seguimiento de desempeño

- 🖼️ **Gestión de Medios**
  - Carga y compresión de imágenes (Canvas API)
  - Configuración de carrusel (galería de 5 imágenes)
  - Gestión de fotos de servicios y personal

- 💰 **Análisis Comercial**
  - Reportes de ingresos
  - Estadísticas de citas
  - Información de clientes

---

## 🛠️ Pila Tecnológica

### Framework Principal
- **React 19.2.0**: Framework moderno de interfaz de usuario con hooks
- **Vite 7.3.1**: Herramienta de compilación ultra rápida con HMR
- **JavaScript (ES6+)**: Lenguaje principal

### Librerías y APIs Principales
- **Canvas API**: Compresión y optimización de imágenes
- **Context API**: Gestión de estado global
- **localStorage**: Almacenamiento persistente del lado del cliente
- **Fetch API**: Solicitudes HTTP para llamadas a API

### Compilación y Desarrollo
- **Node.js**: Entorno de ejecución
- **npm**: Gestión de paquetes
- **ESLint**: Calidad del código (configurado)
- **Vite**: Servidor de desarrollo con HMR

### Infraestructura
- **Arquitectura de Una Página**: Todo el contenido en App.jsx para despliegue simplificado
- **CSS3**: Estilos responsive con flexbox/grid
- **Codificación UTF-8**: Soporte de caracteres internacionales

---

## 📦 Instalación

### Requisitos Previos
- **Node.js** ≥ 16.0.0
- **npm** ≥ 8.0.0

### Pasos

1. **Clonar o extraer el proyecto**
   ```bash
   cd Frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   - Aplicación se abre en `http://localhost:5173`
   - HMR habilitado para actualizaciones instantáneas

4. **Compilar para producción**
   ```bash
   npm run build
   ```
   - Compilación optimizada en la carpeta `dist/`

5. **Vista previa de compilación de producción**
   ```bash
   npm run preview
   ```

---

## ⚙️ Configuración

### Configuración del Entorno
No se requieren variables de entorno para la configuración básica. Personalizar en `App.jsx`:

### Objetos de Configuración Clave
- **`TR`** (Objeto de traducciones): Cadenas de interfaz multilingües
- **`adminConfig`**: Configuración predeterminada del panel de administración
- **Catálogo de servicios**: Preconfigurable en el panel de administración
- **Compresión de imágenes**: Configuración de Canvas API en carga de imágenes

### Credenciales de Administrador por Defecto
- **Usuario**: `admin@auraspa.com`
- **Contraseña**: `admin123`

### Credenciales de Cliente por Defecto
- **Usuario**: `cliente@email.com`
- **Contraseña**: `cliente123`

---

## 🚀 Guía de Uso

### Para Usuarios Finales

**Reservar una Cita:**
1. Navegar a la sección "RESERVAR"
2. Seleccionar el servicio deseado y la fecha
3. Elegir el miembro del personal preferido
4. Confirmar la cita
5. Recibir detalles de confirmación

**Recuperar Contraseña Olvidada:**
1. Hacer clic en "¿Olvidaste tu contraseña?" en inicio de sesión
2. Ingresar dirección de correo electrónico
3. Recibir token de recuperación (generado automáticamente)
4. Hacer clic en enlace de recuperación o ingresar token
5. Establecer nueva contraseña (8+ caracteres, letras + números)
6. Iniciar sesión con nuevas credenciales

**Usando el Panel de Administración:**
1. Iniciar sesión con credenciales de administrador (admin/admin123)
2. Hacer clic en el icono de administrador en el encabezado
3. Navegar entre 12+ pestañas de configuración
4. Realizar cambios en tiempo real
5. Los cambios se guardan en localStorage automáticamente

### Para Desarrolladores

**Agregar Nuevos Servicios:**
- Editar panel de administración → pestaña Servicios
- Estructura del servicio: `{ id, nombre, precio, categoría, descripción }`
- Los cambios se guardan en localStorage inmediatamente

**Agregar Miembros del Personal:**
- Panel de administración → pestaña Personal
- Estructura del personal: `{ id, nombre, especialidad, correo, teléfono, avatar }`
- Avatar soporta carga de imagen con compresión Canvas

**Modificar Traducciones:**
- Editar objeto `TR` en App.jsx
- Agregar claves en español e inglés
- Referenciar mediante sintaxis `TR.sección.clave`

---

## 🏗️ Arquitectura y Estructura

### Organización de Componentes (Arquitectura de Archivo Único)

```
App.jsx (~1,800 LOC)
├── Componente Header (Navegación, estado de autenticación)
├── Página de Inicio (Hero, Servicios Destacados, Carrusel)
├── Pantalla de Inicio de Sesión (Hash MD5, gestión de sesiones)
├── Sistema de Recuperación de Contraseña
│   ├── RecoverPasswordScreen (Entrada de correo, generación de token)
│   └── ResetPasswordScreen (Restablecimiento de contraseña, validación)
├── Sistema de Reservas
│   ├── Selección de Servicios
│   ├── Componente de Calendario
│   ├── Selección de Personal
│   └── Pantalla de Confirmación
├── Portal de Administración (12+ pestañas)
│   ├── Información del Negocio
│   ├── Gestión de Servicios
│   ├── Gestión de Personal
│   ├── Gestión de Citas
│   ├── Gestión de Clientes
│   ├── Reportes y Análisis
│   ├── Galería de Imágenes
│   ├── Plantillas de Correo
│   ├── Configuración y Preferencias
│   └── Más...
└── Componente Footer
```

### Arquitectura de Flujo de Datos

```
Componentes React (Hooks)
    ↓
Context API (Estado Global)
    ↓
localStorage (Persistencia)
    ↓
Canvas API (Procesamiento de Imágenes)
    ↓
APIs Externas (Integración con Backend)
```

### Gestión de Estado
- **Estado Local**: Nivel de componente con useState
- **Estado Global**: Context API para datos de toda la aplicación
- **Estado Persistente**: localStorage con prefijos de clave (aura_*, pwd_reset_*)
- **Estado Transitorio**: Datos de sesión en memoria

---

## 🔐 Características de Seguridad

### Seguridad de Contraseña
- **Requisitos**: 8+ caracteres, mezcla de letras y números
- **Almacenamiento**: Los tokens utilizan hash MD5 (para demostración)
- **Recuperación**: Expiración de token de 30 minutos, uso único
- **Validación**: Indicadores de fortaleza en tiempo real, mensajes de error

### Gestión de Sesiones
- **localStorage**: Almacena sesión del usuario con expiración automática
- **Generación de Token**: 64 caracteres hexadecimales para recuperación de contraseña
- **Limitación de Velocidad**: Configurable (requiere integración con backend)

### Protección de Datos
- **Validación de Entrada**: Todas las entradas se sanitizan antes del almacenamiento
- **Prevención de XSS**: Escapado incorporado de React
- **Protección CSRF**: Requiere validación de token del backend

### Accesibilidad
- **HTML Semántico**: Jerarquía adecuada de encabezados (H1, H2, H3)
- **Etiquetas ARIA**: Soporte para lectores de pantalla
- **Navegación por Teclado**: Soporte completo de teclado
- **Contraste de Color**: Conforme a WCAG AA
- **Gestión del Foco**: Orden de tabulación adecuado

---

## 🔄 Características Principales en Profundidad

### 1. Sistema de Recuperación de Contraseña
Recuperación segura completa de contraseña con:
- Validación de correo electrónico y generación de token
- Expiración de token de 30 minutos
- Cumplimiento de uso único
- Requisitos de fortaleza de contraseña (8+ caracteres, letras + números)
- Retroalimentación de validación en tiempo real
- Manejo de tokens expirados con mensajes de error claros

**Documentación Relacionada**: Ver `PASSWORD_RECOVERY_DOCUMENTATION.md`

### 2. Optimización de Imágenes y Canvas API
- Compresión automática de imágenes (50-100KB → 5-10KB)
- Mantiene calidad visual
- Funciona con formatos PNG, JPG
- Vista previa en tiempo real antes de guardar
- Soporte para carga de múltiples imágenes

### 3. Sistema Multiidioma
- Soporte completo en Español/Inglés
- Cambio dinámico de idioma (sin recarga de página)
- Objeto de traducción (TR) con estructura jerárquica
- Soporta 20+ categorías de traducción

### 4. Panel de Administración
- 12+ secciones de configuración
- Persistencia de datos en tiempo real
- Acceso basado en roles (solo administrador)
- Interfaz amigable con validación de formularios
- Categorización de configuraciones:
  - Información del negocio
  - Catálogo de servicios
  - Gestión de personal
  - Gestión de citas
  - Análisis y reportes
  - Gestión de medios
  - Configuración del sistema

### 5. Diseño Responsive
- Enfoque mobile-first
- Media queries CSS para puntos de ruptura
- Botones y formularios optimizados para tacto
- Diseño flexible con Flexbox/Grid
- Optimizado para pantallas: 320px - 1920px+

---

## 📱 Puntos de Ruptura Responsive

```
Móvil:      320px - 640px
Tablet:     641px - 1024px
Escritorio: 1025px - 1920px
Ultra-HD:   1921px+
```

---

## 🌐 Soporte Multiidioma

### Cambio de Idioma
- Alternar en encabezado: "ES" / "EN"
- Toda la interfaz se actualiza en tiempo real
- Preferencia de usuario guardada en localStorage

### Estructura de Traducción
```javascript
TR = {
  header: { titulo: "...", menu: "..." },
  auth: { iniciarSesion: "...", contraseña: "..." },
  reserva: { servicio: "...", fecha: "..." },
  // ... 20+ categorías
}
```

---

## 📲 Compatibilidad de Navegadores

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Navegadores móviles (Safari iOS, Chrome Mobile)

---

## 🐛 Depuración y Solución de Problemas

### Problemas Comunes

**Problema**: El panel de administración no muestra cambios
- **Solución**: Verificar localStorage en DevTools (pestaña Application)
- Revisar consola del navegador para errores

**Problema**: Las imágenes no se comprimen
- **Solución**: Asegurarse de que Canvas API sea compatible (navegadores antiguos pueden tener problemas)
- Verificar tamaño y formato de imagen

**Problema**: El correo de recuperación de contraseña no se envía
- **Solución**: Se requiere integración con backend (ver BACKEND_INTEGRATION_GUIDE.md)
- La demostración utiliza solo localStorage

**Problema**: El idioma no cambia
- **Solución**: Limpiar localStorage y actualizar
- Verificar que el objeto TR contenga todas las claves

### Modo de Depuración
- Abrir consola del navegador (F12)
- Revisar token de prueba de inicio de sesión en mensajes de consola
- Monitorear localStorage en DevTools
- Revisar solicitudes de red para llamadas API

---

## 🔗 Guías de Integración

### Integración con Backend
Guía completa disponible en: **[BACKEND_INTEGRATION_GUIDE.md](../BACKEND_INTEGRATION_GUIDE.md)**

Cubre:
- Puntos finales de API para recuperación de contraseña
- Implementación de envío de correo electrónico
- Diseño de esquema de base de datos
- Consideraciones de seguridad
- Procedimientos de prueba

### Recuperación de Contraseña
Documentación detallada en: **[PASSWORD_RECOVERY_DOCUMENTATION.md](../PASSWORD_RECOVERY_DOCUMENTATION.md)**

Cubre:
- Flujos de trabajo del usuario
- Generación y validación de tokens
- Plantillas de correo electrónico
- Puntos de integración
- Medidas de seguridad

---

## 📊 Estadísticas del Proyecto

- **Tamaño del Archivo Principal**: ~1,800 LOC (App.jsx)
- **Componentes React**: 15+ (Header, Auth, Booking, Admin, etc.)
- **Líneas CSS**: ~500 (en línea y hojas de estilo)
- **Claves de Traducción**: 150+
- **Pestañas de Administración**: 12+
- **Idiomas Soportados**: 2
- **Puntos Finales de API** (listos): 10+

---

## 🤝 Contribuir

### Flujo de Trabajo de Desarrollo
1. Clonar/extraer repositorio
2. Instalar dependencias: `npm install`
3. Iniciar servidor de desarrollo: `npm run dev`
4. Realizar cambios en App.jsx
5. Probar en navegador (HMR aplica actualizaciones instantáneamente)
6. Compilar para producción: `npm run build`

### Convenciones de Código
- Camel case para variables y funciones
- PascalCase para componentes
- Comentarios para lógica compleja
- Validación de props con PropTypes (cuando esté disponible)
- Estructura HTML semántica

### Agregar Características
1. Definir requisitos
2. Crear componentes/hooks según sea necesario
3. Agregar claves de traducción (ES/EN)
4. Probar diseño responsive
5. Actualizar documentación
6. Hacer commit con mensajes claros

---

## 📄 Licencia

Licencia MIT - Siéntete libre de usar este proyecto para propósitos personales o comerciales.

---

## 👤 Contacto y Soporte

**Proyecto**: Sistema de Reservas Aura Spa
**Versión**: 1.0.0
**Última Actualización**: Febrero 2026

Para soporte o preguntas:
- Revisar archivos de documentación
- Revisar consola del navegador para mensajes de error
- Probar con credenciales de demostración
- Revisar guías de integración para configuración de backend

---

## 📚 Recursos Adicionales

### Documentación Interna
1. **[BACKEND_INTEGRATION_GUIDE.md](../BACKEND_INTEGRATION_GUIDE.md)** (800+ líneas)
   - Guía completa de implementación de backend
   - Puntos finales de API, esquemas de base de datos, ejemplos de código
   - Lista de verificación de seguridad y procedimientos de prueba

2. **[PASSWORD_RECOVERY_DOCUMENTATION.md](../PASSWORD_RECOVERY_DOCUMENTATION.md)** (600+ líneas)
   - Flujos de trabajo del usuario y requisitos funcionales
   - Especificaciones técnicas y detalles de tokens
   - Lista de verificación de integración y medidas de seguridad

### Recursos Externos
- [Documentación de React](https://react.dev)
- [Guía de Vite](https://vite.dev)
- [Referencia de Canvas API](https://developer.mozilla.org/es/docs/Web/API/Canvas_API)
- [Estándares de Accesibilidad Web (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## ✅ Lista de Verificación del Proyecto

### Frontend Completado ✅
- [x] Configuración de React + Vite
- [x] Sistema de inicio de sesión con hash MD5
- [x] Recuperación de contraseña (correo, token, restablecimiento)
- [x] Sistema de reserva de citas
- [x] Soporte multiidioma (ES/EN)
- [x] Compresión de imágenes (Canvas API)
- [x] Panel de administración (12+ pestañas)
- [x] Diseño responsive
- [x] Gestión de sesiones
- [x] Manejo de errores

### Listo para Integración con Backend ✅
- [x] Puntos finales de recuperación de contraseña mapeados
- [x] Estructura de solicitud de API documentada
- [x] Reglas de validación de datos definidas
- [x] Requisitos de seguridad especificados
- [x] Ejemplos de plantillas de correo proporcionados
- [x] Ejemplos de esquema de base de datos incluidos

### Documentación Completada ✅
- [x] README.md (completo)
- [x] BACKEND_INTEGRATION_GUIDE.md (800+ líneas)
- [x] PASSWORD_RECOVERY_DOCUMENTATION.md (600+ líneas)
- [x] Documentación de código e comentarios en línea
- [x] Diagramas de arquitectura y flujo de datos

---

## 🔄 Historial de Versiones

### v1.0.0 (Actual)
- ✨ Sistema completo de recuperación de contraseña
- ✨ Panel de administración con 12+ pestañas de configuración
- ✨ Soporte multiidioma (ES/EN)
- ✨ Optimización de imágenes con Canvas API
- ✨ Diseño responsive (móvil a escritorio)
- ✨ Documentación completa
- 🔧 Código listo para producción
- 🔒 Características de seguridad implementadas

---

### Rutas Principales
- `/` → Página de inicio
- `/login` → Inicio de sesión
- `/reservar` → Sistema de reserva de citas
- `/recover-password` → Recuperación de contraseña
- `/reset-password` → Restablecimiento de contraseña
- `/admin` → Panel de administración (requiere login como admin)

### Puertos y URLs
- **Desarrollo**: `http://localhost:5173`
- **Producción**: Configurable según despliegue

---

**¡Listo para desplegar o integrar con tu servidor de backend!** 🚀
