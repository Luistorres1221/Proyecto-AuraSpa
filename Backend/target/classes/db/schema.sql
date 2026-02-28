-- ========================================
-- AuraSpa Database Schema
-- MySQL 8.0+
-- ========================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS auraspa_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE auraspa_db;

-- ========================================
-- Usuario (User)
-- ========================================
CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) UNIQUE,
    rol ENUM('ADMIN', 'CLIENTE', 'PROFESIONAL') DEFAULT 'CLIENTE',
    activo BOOLEAN DEFAULT true,
    bloqueado BOOLEAN DEFAULT false,
    bloqueado_hasta DATETIME,
    correo_verificado BOOLEAN DEFAULT false,
    intentos_fallidos INT DEFAULT 0,
    ultimo_inicio_sesion DATETIME,
    ultimo_ip VARCHAR(45),
    dos_fa_habilitado BOOLEAN DEFAULT false,
    dos_fa_secreto VARCHAR(255),
    dos_fa_verificado BOOLEAN DEFAULT false,
    eliminado_en DATETIME,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_correo (correo),
    INDEX idx_activo (activo),
    INDEX idx_bloqueado (bloqueado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Token Refresco (Refresh Token)
-- ========================================
CREATE TABLE IF NOT EXISTS token_refresco (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    token LONGTEXT NOT NULL UNIQUE,
    dispositivo TEXT,
    direccion_ip VARCHAR(45),
    revocado BOOLEAN DEFAULT false,
    caduca_en DATETIME NOT NULL,
    usado_en DATETIME,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_revocado (revocado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Histórico Inicio Sesión (Login History)
-- ========================================
CREATE TABLE IF NOT EXISTS historico_inicio_sesion (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT,
    estado ENUM('EXITOSO', 'FALLIDO', 'BLOQUEADO') NOT NULL,
    direccion_ip VARCHAR(45) NOT NULL,
    agente_usuario TEXT,
    dispositivo TEXT,
    inicio_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    cierre_en DATETIME,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE SET NULL,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_estado (estado),
    INDEX idx_inicio_en (inicio_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Token Verificación Correo (Email Verification Token)
-- ========================================
CREATE TABLE IF NOT EXISTS token_verificacion_correo (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    caduca_en DATETIME NOT NULL,
    verificado_en DATETIME,
    usado BOOLEAN DEFAULT false,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Token Recuperación Contraseña (Password Reset Token)
-- ========================================
CREATE TABLE IF NOT EXISTS token_recuperacion_contraseña (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    caduca_en DATETIME NOT NULL,
    usado_en DATETIME,
    usado BOOLEAN DEFAULT false,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Código Dos Factores (2FA Code)
-- ========================================
CREATE TABLE IF NOT EXISTS codigo_dos_fa (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    codigo VARCHAR(6) NOT NULL,
    caduca_en DATETIME NOT NULL,
    verificado_en DATETIME,
    usado BOOLEAN DEFAULT false,
    intentos INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_codigo (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Servicio (Service)
-- ========================================
CREATE TABLE IF NOT EXISTS servicio (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL UNIQUE,
    descripcion TEXT,
    duracion_minutos INT NOT NULL DEFAULT 60,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100),
    activo BOOLEAN DEFAULT true,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_nombre (nombre),
    INDEX idx_activo (activo),
    INDEX idx_categoria (categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Profesional (Professional)
-- ========================================
CREATE TABLE IF NOT EXISTS profesional (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    especialidad VARCHAR(100),
    biografia TEXT,
    telefono VARCHAR(20),
    correo VARCHAR(255),
    hora_inicio VARCHAR(5),
    hora_fin VARCHAR(5),
    activo BOOLEAN DEFAULT true,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_especialidad (especialidad),
    INDEX idx_activo (activo),
    UNIQUE KEY uq_correo (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Cita (Appointment)
-- ========================================
CREATE TABLE IF NOT EXISTS cita (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    servicio_id BIGINT NOT NULL,
    profesional_id BIGINT NOT NULL,
    fecha_hora_cita DATETIME NOT NULL,
    estado ENUM('PENDIENTE', 'CONFIRMADA', 'ASISTIDA', 'CANCELADA', 'REPROGRAMADA') DEFAULT 'PENDIENTE',
    notas TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cancelado_en DATETIME,
    asistido_en DATETIME,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (servicio_id) REFERENCES servicio(id) ON DELETE RESTRICT,
    FOREIGN KEY (profesional_id) REFERENCES profesional(id) ON DELETE RESTRICT,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_fecha_hora (fecha_hora_cita),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Índices para optimización
-- ========================================
CREATE INDEX idx_usuario_token_valido 
ON token_refresco(usuario_id, revocado, caduca_en);

CREATE INDEX idx_historico_usuario_fechas 
ON historico_inicio_sesion(usuario_id, inicio_en);

-- ========================================
-- Fin del esquema
-- ========================================
