-- ========================================
-- AuraSpa Database - Drop All Tables
-- Script para limpiar la base de datos
-- ========================================

USE auraspa_db;

-- Desactivar verificación de claves externas
SET FOREIGN_KEY_CHECKS=0;

-- ========================================
-- Eliminar todas las tablas
-- ========================================
DROP TABLE IF EXISTS cita;
DROP TABLE IF EXISTS codigo_dos_fa;
DROP TABLE IF EXISTS token_recuperacion_contraseña;
DROP TABLE IF EXISTS token_verificacion_correo;
DROP TABLE IF EXISTS historico_inicio_sesion;
DROP TABLE IF EXISTS token_refresco;
DROP TABLE IF EXISTS profesional;
DROP TABLE IF EXISTS servicio;
DROP TABLE IF EXISTS usuario;

-- ========================================
-- Reactivar verificación de claves externas
-- ========================================
SET FOREIGN_KEY_CHECKS=1;

-- ========================================
-- Verificación
-- ========================================
SHOW TABLES;

-- ========================================
-- Fin del script
-- ========================================
