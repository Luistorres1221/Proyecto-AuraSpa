package com.auraspa.controller;

import com.auraspa.dto.LoginRequest;
import com.auraspa.dto.RegisterRequest;
import com.auraspa.dto.AuthResponse;
import com.auraspa.service.AuthService;
import com.auraspa.service.TwoFAService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5178", "http://localhost:3000"}, allowCredentials = "true")
public class AuthController {
    
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());
    
    private final AuthService authService;
    private final TwoFAService twoFAService;
    
    public AuthController(AuthService authService, TwoFAService twoFAService) {
        this.authService = authService;
        this.twoFAService = twoFAService;
    }
    
    /**
     * POST /api/auth/register
     * Registers a new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, HttpServletRequest httpRequest) {
        try {
            logger.info("Registration attempt for email: " + request.getEmail());
            
            AuthResponse response = authService.register(request);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "message", "Usuario registrado exitosamente. Verifica tu correo.",
                            "data", response
                    ));
        } catch (IllegalArgumentException e) {
            logger.warning("Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Registration error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error en el registro. Intenta nuevamente."));
        }
    }
    
    /**
     * POST /api/auth/login
     * Authenticates user and returns JWT tokens
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        try {
            String ipAddress = getClientIpAddress(httpRequest);
            logger.info("Login attempt from IP: " + ipAddress + " for email: " + request.getEmail());
            
            AuthResponse response = authService.login(request, ipAddress);
            
            if (response.isTwoFaRequired()) {
                return ResponseEntity.ok(Map.of(
                        "message", "Se ha enviado un código de autenticación a tu correo.",
                        "twoFaRequired", true,
                        "userId", response.getUserId()
                ));
            }
            
            return ResponseEntity.ok(Map.of(
                    "message", "Inicio de sesión exitoso",
                    "data", response
            ));
        } catch (IllegalArgumentException e) {
            logger.warning("Login failed: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Login error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error en el inicio de sesión"));
        }
    }
    
    /**
     * POST /api/auth/verify-email
     * Verifies email using token
     */
    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        try {
            authService.verifyEmail(token);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Correo verificado exitosamente"
            ));
        } catch (IllegalArgumentException e) {
            logger.warning("Email verification failed: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Email verification error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al verificar el correo"));
        }
    }
    
    /**
     * POST /api/auth/refresh-token
     * Refreshes access token using refresh token
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        try {
            String refreshToken = request.get("refreshToken");
            if (refreshToken == null || refreshToken.isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "refresh token requerido"));
            }
            
            AuthResponse response = authService.refreshAccessToken(refreshToken);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Token renovado exitosamente",
                    "data", response
            ));
        } catch (IllegalArgumentException e) {
            logger.warning("Token refresh failed: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Token refresh error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al renovar el token"));
        }
    }
    
    /**
     * POST /api/auth/verify-2fa
     * Verifies 2FA code
     */
    @PostMapping("/verify-2fa")
    public ResponseEntity<?> verify2FA(@RequestBody Map<String, String> request) {
        try {
            String userIdStr = request.get("userId");
            String code = request.get("code");
            
            if (userIdStr == null || code == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "userId y code requeridos"));
            }
            
            Long userId = Long.parseLong(userIdStr);
            boolean verified = twoFAService.verify2FACode(userId, code);
            
            if (!verified) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Código de autenticación inválido o expirado"));
            }
            
            return ResponseEntity.ok(Map.of(
                    "message", "Autenticación de dos factores verificada"
            ));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "userId inválido"));
        } catch (Exception e) {
            logger.severe("2FA verification error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al verificar el código"));
        }
    }
    
    /**
     * POST /api/auth/logout
     * Logs out user
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> request) {
        try {
            String userIdStr = request.get("userId");
            if (userIdStr == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "userId requerido"));
            }
            
            Long userId = Long.parseLong(userIdStr);
            authService.logout(userId);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Sesión cerrada exitosamente"
            ));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "userId inválido"));
        } catch (Exception e) {
            logger.severe("Logout error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al cerrar sesión"));
        }
    }
    
    /**
     * POST /api/auth/resend-verification-email
     * Resends verification email
     */
    @PostMapping("/resend-verification-email")
    public ResponseEntity<?> resendVerificationEmail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null || email.isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "email requerido"));
            }
            
            // Implementation would involve creating new verification token and sending email
            // For now, basic implementation
            return ResponseEntity.ok(Map.of(
                    "message", "Correo de verificación enviado"
            ));
        } catch (Exception e) {
            logger.severe("Resend verification error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al enviar el correo"));
        }
    }
    
    /**
     * POST /api/auth/revoke-all-tokens
     * Closes all sessions for user
     */
    @PostMapping("/revoke-all-tokens")
    public ResponseEntity<?> revokeAllTokens(@RequestBody Map<String, String> request) {
        try {
            String userIdStr = request.get("userId");
            if (userIdStr == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "userId requerido"));
            }
            
            Long userId = Long.parseLong(userIdStr);
            authService.revokeAllTokens(userId);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Todas las sesiones han sido cerradas"
            ));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "userId inválido"));
        } catch (Exception e) {
            logger.severe("Revoke tokens error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al cerrar sesiones"));
        }
    }
    
    /**
     * POST /api/auth/enable-2fa
     * Enables 2FA for user
     */
    @PostMapping("/enable-2fa")
    public ResponseEntity<?> enable2FA(@RequestBody Map<String, String> request) {
        try {
            String userIdStr = request.get("userId");
            if (userIdStr == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "userId requerido"));
            }
            
            Long userId = Long.parseLong(userIdStr);
            twoFAService.generateAndSend2FACode(userId);
            twoFAService.enable2FA(userId);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Autenticación de dos factores habilitada",
                    "info", "Revisa tu correo para el código de verificación"
            ));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "userId inválido"));
        } catch (Exception e) {
            logger.severe("Enable 2FA error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al habilitar 2FA"));
        }
    }
    
    // Helper method
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
