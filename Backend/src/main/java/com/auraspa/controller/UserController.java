package com.auraspa.controller;

import com.auraspa.model.User;
import com.auraspa.service.UserService;
import com.auraspa.service.AuditService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5178", "http://localhost:3000"}, allowCredentials = "true")
public class UserController {
    
    private static final Logger logger = Logger.getLogger(UserController.class.getName());
    
    private final UserService userService;
    private final AuditService auditService;
    
    public UserController(UserService userService, AuditService auditService) {
        this.userService = userService;
        this.auditService = auditService;
    }
    
    /**
     * GET /api/user/{userId}
     * Retrieves user profile information
     */
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        try {
            Optional<User> userOptional = userService.getUserById(userId);
            
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            User user = userOptional.get();
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("name", user.getName());
            response.put("lastname", user.getLastname());
            response.put("email", user.getEmail());
            response.put("phone", user.getPhone());
            response.put("role", user.getRole());
            response.put("active", user.isActive());
            response.put("emailVerified", user.isEmailVerified());
            response.put("twoFaEnabled", user.isTwoFaEnabled());
            response.put("lastLogin", user.getLastLogin());
            response.put("lastLoginIp", user.getLastLoginIp());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.severe("Error retrieving user profile: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al obtener el perfil"));
        }
    }
    
    /**
     * PUT /api/user/{userId}
     * Updates user profile information
     */
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long userId, @RequestBody Map<String, String> updates) {
        try {
            String name = updates.get("name");
            String lastname = updates.get("lastname");
            String phone = updates.get("phone");
            
            User updatedUser = userService.updateProfile(userId, name, lastname, phone);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedUser.getId());
            response.put("name", updatedUser.getName());
            response.put("lastname", updatedUser.getLastname());
            response.put("phone", updatedUser.getPhone());
            response.put("email", updatedUser.getEmail());
            
            return ResponseEntity.ok(Map.of(
                    "message", "Perfil actualizado exitosamente",
                    "data", response
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Error updating user profile: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al actualizar el perfil"));
        }
    }
    
    /**
     * POST /api/user/{userId}/change-password
     * Changes user password
     */
    @PostMapping("/{userId}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable Long userId, @RequestBody Map<String, String> request) {
        try {
            String oldPassword = request.get("currentPassword");
            String newPassword = request.get("newPassword");
            String confirmPassword = request.get("confirmPassword");
            
            if (!newPassword.equals(confirmPassword)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Las nuevas contraseñas no coinciden"));
            }
            
            userService.changePassword(userId, oldPassword, newPassword);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Contraseña actualizada exitosamente"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Error changing password: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al cambiar la contraseña"));
        }
    }
    
    /**
     * GET /api/user/{userId}/sessions
     * Retrieves active sessions for user
     */
    @GetMapping("/{userId}/sessions")
    public ResponseEntity<?> getActiveSessions(@PathVariable Long userId) {
        try {
            Integer sessionCount = userService.getActiveSessionCount(userId);
            
            return ResponseEntity.ok(Map.of(
                    "activeSessionCount", sessionCount
            ));
        } catch (Exception e) {
            logger.severe("Error retrieving sessions: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al obtener las sesiones"));
        }
    }
    
    /**
     * GET /api/user/{userId}/login-history
     * Retrieves login history for user
     */
    @GetMapping("/{userId}/login-history")
    public ResponseEntity<?> getLoginHistory(@PathVariable Long userId,
                                            @RequestParam(defaultValue = "10") Integer limit) {
        try {
            var loginHistory = auditService.getUserLoginHistory(userId, limit);
            
            return ResponseEntity.ok(Map.of(
                    "data", loginHistory,
                    "count", loginHistory.size()
            ));
        } catch (Exception e) {
            logger.severe("Error retrieving login history: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al obtener el historial de inicio de sesión"));
        }
    }
    
    /**
     * POST /api/user/{userId}/delete-account
     * Soft deletes user account
     */
    @PostMapping("/{userId}/delete-account")
    public ResponseEntity<?> deleteAccount(@PathVariable Long userId,
                                          @RequestBody(required = false) Map<String, Boolean> request) {
        try {
            boolean revokeAllSessions = request != null && request.getOrDefault("revokeAllSessions", true);
            
            userService.deleteAccount(userId, revokeAllSessions);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Cuenta eliminada exitosamente"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Error deleting account: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar la cuenta"));
        }
    }
    
    /**
     * GET /api/user/{userId}/is-active
     * Checks if user account is active
     */
    @GetMapping("/{userId}/is-active")
    public ResponseEntity<?> isUserActive(@PathVariable Long userId) {
        try {
            boolean active = userService.isUserActive(userId);
            
            return ResponseEntity.ok(Map.of(
                    "active", active
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al verificar estado de la cuenta"));
        }
    }
}
