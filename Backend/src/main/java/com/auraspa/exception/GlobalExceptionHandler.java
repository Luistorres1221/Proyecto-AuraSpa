package com.auraspa.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = Logger.getLogger(GlobalExceptionHandler.class.getName());
    
    /**
     * Handles validation errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        
        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        return ResponseEntity.badRequest()
                .body(Map.of(
                        "error", "Errores de validación",
                        "details", errors,
                        "timestamp", LocalDateTime.now()
                ));
    }
    
    /**
     * Handles illegal argument exceptions
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        logger.warning("Illegal argument: " + e.getMessage());
        
        return ResponseEntity.badRequest()
                .body(Map.of(
                        "error", e.getMessage(),
                        "timestamp", LocalDateTime.now()
                ));
    }
    
    /**
     * Handles user not found exceptions
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException e) {
        logger.warning("User not found: " + e.getMessage());
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "error", "Usuario no encontrado",
                        "detail", e.getMessage(),
                        "timestamp", LocalDateTime.now()
                ));
    }
    
    /**
     * Handles unauthorized access exceptions
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<?> handleUnauthorizedException(UnauthorizedException e) {
        logger.warning("Unauthorized access: " + e.getMessage());
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                        "error", "Acceso no autorizado",
                        "detail", e.getMessage(),
                        "timestamp", LocalDateTime.now()
                ));
    }
    
    /**
     * Handles forbidden access exceptions
     */
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<?> handleForbiddenException(ForbiddenException e) {
        logger.warning("Forbidden access: " + e.getMessage());
        
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of(
                        "error", "Acceso denegado",
                        "detail", e.getMessage(),
                        "timestamp", LocalDateTime.now()
                ));
    }
    
    /**
     * Handles general runtime exceptions
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        logger.severe("Runtime exception: " + e.getMessage());
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "error", "Error interno del servidor",
                        "message", e.getMessage(),
                        "timestamp", LocalDateTime.now()
                ));
    }
    
    /**
     * Handles all other exceptions
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        logger.severe("Unhandled exception: " + e.getMessage());
        e.printStackTrace();
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "error", "Error inesperado",
                        "timestamp", LocalDateTime.now()
                ));
    }
}
