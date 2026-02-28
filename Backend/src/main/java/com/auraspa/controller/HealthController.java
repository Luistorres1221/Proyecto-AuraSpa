package com.auraspa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5178", "http://localhost:3000"}, allowCredentials = "true")
public class HealthController {
    
    /**
     * GET /api/health
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "message", "AuraSpa Backend está funcionando correctamente",
                "timestamp", LocalDateTime.now(),
                "service", "AuraSpa API v1.0.0"
        ));
    }
    
    /**
     * GET /api/version
     * Returns API version
     */
    @GetMapping("/version")
    public ResponseEntity<?> version() {
        return ResponseEntity.ok(Map.of(
                "version", "1.0.0",
                "name", "AuraSpa Backend",
                "timestamp", LocalDateTime.now()
        ));
    }
}
