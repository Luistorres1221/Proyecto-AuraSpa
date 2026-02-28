package com.auraspa.controller;

import com.auraspa.service.UserService;
import com.auraspa.service.AuditService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5178", "http://localhost:3000"}, allowCredentials = "true")
public class AdminController {
    
    private static final Logger logger = Logger.getLogger(AdminController.class.getName());
    
    private final UserService userService;
    private final AuditService auditService;
    
    public AdminController(UserService userService, AuditService auditService) {
        this.userService = userService;
        this.auditService = auditService;
    }
    
    /**
     * POST /api/admin/users/{userId}/block
     * Blocks a user account (admin operation)
     */
    @PostMapping("/users/{userId}/block")
    public ResponseEntity<?> blockUser(@PathVariable Long userId) {
        try {
            userService.blockUser(userId);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Usuario bloqueado exitosamente"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Error blocking user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al bloquear el usuario"));
        }
    }
    
    /**
     * POST /api/admin/users/{userId}/unblock
     * Unblocks a user account (admin operation)
     */
    @PostMapping("/users/{userId}/unblock")
    public ResponseEntity<?> unblockUser(@PathVariable Long userId) {
        try {
            userService.unblockUser(userId);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Usuario desbloqueado exitosamente"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Error unblocking user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al desbloquear el usuario"));
        }
    }
    
    /**
     * GET /api/admin/users/{userId}/login-history
     * Retrieves login history for a user (admin view)
     */
    @GetMapping("/users/{userId}/login-history")
    public ResponseEntity<?> getUserLoginHistory(@PathVariable Long userId,
                                                @RequestParam(defaultValue = "50") Integer limit) {
        try {
            var loginHistory = auditService.getUserLoginHistory(userId, limit);
            
            return ResponseEntity.ok(Map.of(
                    "userId", userId,
                    "data", loginHistory,
                    "count", loginHistory.size()
            ));
        } catch (Exception e) {
            logger.severe("Error retrieving login history: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al obtener el historial"));
        }
    }
    
    /**
     * GET /api/admin/users/{userId}/suspicious-activity
     * Checks for suspicious activity on user account
     */
    @GetMapping("/users/{userId}/suspicious-activity")
    public ResponseEntity<?> checkSuspiciousActivity(@PathVariable Long userId) {
        try {
            boolean suspicious = auditService.detectSuspiciousActivity(userId);
            
            return ResponseEntity.ok(Map.of(
                    "userId", userId,
                    "suspicious", suspicious,
                    "message", suspicious ? "Actividad sospechosa detectada" : "No se detectó actividad sospechosa"
            ));
        } catch (Exception e) {
            logger.severe("Error checking suspicious activity: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al verificar actividad sospechosa"));
        }
    }
    
    /**
     * GET /api/admin/users/{userId}/login-statistics
     * Retrieves login statistics for a user
     */
    @GetMapping("/users/{userId}/login-statistics")
    public ResponseEntity<?> getLoginStatistics(@PathVariable Long userId,
                                               @RequestParam(defaultValue = "30") Integer daysAgo) {
        try {
            AuditService.LoginStatistics stats = auditService.getLoginStatistics(userId, daysAgo);
            
            return ResponseEntity.ok(Map.of(
                    "userId", userId,
                    "daysAgo", daysAgo,
                    "statistics", stats
            ));
        } catch (Exception e) {
            logger.severe("Error retrieving login statistics: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al obtaining estadísticas"));
        }
    }
    
    /**
     * POST /api/admin/users/{userId}/permanently-delete
     * Permanently deletes user account (irreversible)
     */
    @PostMapping("/users/{userId}/permanently-delete")
    public ResponseEntity<?> permanentlyDeleteUser(@PathVariable Long userId, 
                                                   @RequestBody Map<String, String> request) {
        try {
            String confirmation = request.get("confirmation");
            if (confirmation == null || !confirmation.equals("PERMANENT_DELETE")) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Confirmación incorrecta de eliminación permanente"));
            }
            
            userService.permanentlyDeleteAccount(userId);
            
            logger.info("Permanently deleted user: " + userId);
            return ResponseEntity.ok(Map.of(
                    "message", "Usuario eliminado permanentemente"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.severe("Error permanently deleting user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar permanentemente el usuario"));
        }
    }
}
