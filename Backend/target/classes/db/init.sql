-- ========================================
-- AuraSpa Database - Initial Data
-- Datos iniciales para pruebas
-- ========================================

USE auraspa_db;

-- ========================================
-- Servicios
-- ========================================
INSERT INTO servicio (nombre, descripcion, duracion_minutos, precio, categoria, activo) VALUES
('Masaje Relajante', 'Masaje de cuerpo completo para relajación total', 60, 50.00, 'Masaje', true),
('Facial Limpieza Profunda', 'Tratamiento facial con limpieza profunda y extracciones', 45, 45.00, 'Facial', true),
('Manicura Gel', 'Manicura con esmalte gel de larga duración', 60, 35.00, 'Manicura', true),
('Pedicura Completa', 'Pedicura con tratamiento de pies', 60, 40.00, 'Pedicura', true),
('Depilación Láser', 'Depilación permanente con tecnología láser', 30, 80.00, 'Depilación', true),
('Masaje Terapéutico', 'Masaje terapéutico enfocado en zonas de tensión', 60, 60.00, 'Masaje', true),
('Tratamiento Capilar', 'Hidratación y tratamiento para cabello dañado', 45, 40.00, 'Cabello', true),
('Limpieza Facial Light', 'Limpieza facial básica y humectación', 30, 25.00, 'Facial', true);

-- ========================================
-- Profesionales
-- ========================================
INSERT INTO profesional (nombre, especialidad, biografia, telefono, correo, hora_inicio, hora_fin, activo) VALUES
('María García', 'Masaje Terapéutico', 'Terapeuta con 10 años de experiencia en masajes relajantes y terapéuticos', '+1-555-0101', 'maria.garcia@auraspa.com', '09:00', '18:00', true),
('Ana Rodríguez', 'Esteticista Facial', 'Especialista en tratamientos faciales y cuidado de la piel', '+1-555-0102', 'ana.rodriguez@auraspa.com', '09:00', '18:00', true),
('Carlos López', 'Manicurista', 'Profesional en uñas con técnicas de gel y acrílico', '+1-555-0103', 'carlos.lopez@auraspa.com', '09:00', '17:00', true),
('Elena Martínez', 'Pedicurista', 'Especialista en pedicura y cuidado de los pies', '+1-555-0104', 'elena.martinez@auraspa.com', '10:00', '18:00', true),
('Juan Pérez', 'Depilación Láser', 'Técnico certificado en depilación láser y tratamientos dermatológicos', '+1-555-0105', 'juan.perez@auraspa.com', '09:00', '17:00', true),
('Sofía Moreno', 'Esteticista General', 'Profesional polivalente con experiencia en múltiples servicios', '+1-555-0106', 'sofia.moreno@auraspa.com', '08:30', '18:30', true);

-- ========================================
-- Usuario Administrador
-- ========================================
-- Contraseña: Admin@2024 (hasheada con BCrypt)
INSERT INTO usuario (nombre, apellido, correo, contraseña, telefono, rol, activo, correo_verificado, dos_fa_habilitado)
VALUES ('Admin', 'AuraSpa', 'admin@auraspa.com', '$2a$10$SlVZcWeruWe8jk.PEfJ4C.pL8Vwu6oB6JK7n9K5q3Z2Y0L6M0q2Q6', '+1-555-0001', 'ADMIN', true, true, false);

-- ========================================
-- Usuarios de Prueba (Cliente)
-- ========================================
-- Contraseña: Cliente@2024
INSERT INTO usuario (nombre, apellido, correo, contraseña, telefono, rol, activo, correo_verificado, dos_fa_habilitado)
VALUES 
('Juan', 'Pérez', 'juan.perez.cliente@gmail.com', '$2a$10$J/Xt6fKJ0qO1m.NvL8K9P.dK5L6M7N8O9K0J1I2H3G4F5E6D7C8B9', '+1-555-0201', 'CLIENTE', true, true, false),
('María', 'Gómez', 'maria.gomez.cliente@gmail.com', '$2a$10$J/Xt6fKJ0qO1m.NvL8K9P.dK5L6M7N8O9K0J1I2H3G4F5E6D7C8B9', '+1-555-0202', 'CLIENTE', true, true, false),
('Sofia', 'López', 'sofia.lopez.cliente@gmail.com', '$2a$10$J/Xt6fKJ0qO1m.NvL8K9P.dK5L6M7N8O9K0J1I2H3G4F5E6D7C8B9', '+1-555-0203', 'CLIENTE', true, true, false);

-- ========================================
-- Usuario Profesional
-- ========================================
-- Contraseña: Profesional@2024
INSERT INTO usuario (nombre, apellido, correo, contraseña, telefono, rol, activo, correo_verificado, dos_fa_habilitado)
VALUES ('Profesional', 'Demo', 'profesional@auraspa.com', '$2a$10$K9L0M1N2O3P4Q5R6S7T8U.vL8K9J0I1H2G3F4E5D6C7B8A9Z0Y1X', '+1-555-0401', 'PROFESIONAL', true, true, false);

-- ========================================
-- Citas de Ejemplo (próximas semanas)
-- ========================================
INSERT INTO cita (usuario_id, servicio_id, profesional_id, fecha_hora_cita, estado, notas) VALUES
(2, 1, 1, DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'CONFIRMADA', 'Primera cita del cliente'),
(2, 3, 3, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'PENDIENTE', 'Manicura gel para ocasión especial'),
(3, 2, 2, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'CONFIRMADA', 'Revisión de piel'),
(4, 8, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), 'PENDIENTE', 'Limpieza facial ligera');

-- ========================================
-- Órdenes de integridad referencial
-- ========================================
SET FOREIGN_KEY_CHECKS=1;

-- ========================================
-- Fin de datos iniciales
-- ========================================
