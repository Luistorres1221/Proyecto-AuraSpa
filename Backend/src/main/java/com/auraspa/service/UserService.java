package com.auraspa.service;

import com.auraspa.model.User;
import com.auraspa.repository.UserRepository;
import com.auraspa.repository.RefreshTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    /**
     * Retrieves user by ID
     */
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
    
    /**
     * Retrieves user by email
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Updates user profile information
     */
    public User updateProfile(Long userId, String name, String lastname, String phone) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOptional.get();
        
        // Check if phone is already used by another user
        if (phone != null && !phone.equals(user.getPhone())) {
            if (userRepository.existsByPhone(phone)) {
                throw new IllegalArgumentException("Phone number already in use");
            }
        }
        
        if (name != null && !name.isBlank()) {
            user.setName(name);
        }
        if (lastname != null && !lastname.isBlank()) {
            user.setLastname(lastname);
        }
        if (phone != null && !phone.isBlank()) {
            user.setPhone(phone);
        }
        
        return userRepository.save(user);
    }
    
    /**
     * Changes user password after validating old password
     */
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOptional.get();
        
        // Verify old password
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        
        // Ensure new password is different from old
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new IllegalArgumentException("New password must be different from current password");
        }
        
        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
    
    /**
     * Initiates password reset by creating reset token
     * (Token creation is handled by AuthService when called from reset endpoint)
     */
    public boolean initiatePasswordReset(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            // Don't reveal if email exists or not
            return true;
        }
        
        // Token and email sending would be handled by AuthService
        return true;
    }
    
    /**
     * Soft deletes user account (sets deletedAt timestamp)
     * Optionally revokes all active sessions
     */
    public void deleteAccount(Long userId, boolean revokeAllSessions) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOptional.get();
        user.setDeletedAt(LocalDateTime.now());
        user.setActive(false);
        userRepository.save(user);
        
        if (revokeAllSessions) {
            revokeUserSessions(userId);
        }
    }
    
    /**
     * Permanently deletes user account and all associated data
     * Should only be called after sufficient time has passed for recovery
     */
    public void permanentlyDeleteAccount(Long userId) {
        userRepository.deleteById(userId);
    }
    
    /**
     * Revokes all active refresh tokens for user (closes all sessions)
     */
    public void revokeUserSessions(Long userId) {
        var tokens = refreshTokenRepository.findValidTokensByUserId(userId);
        tokens.forEach(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }
    
    /**
     * Checks if user account is active and not deleted
     */
    public boolean isUserActive(Long userId) {
        return userRepository.findById(userId)
                .map(user -> user.isActive() && user.getDeletedAt() == null)
                .orElse(false);
    }
    
    /**
     * Retrieves user's active sessions (refresh tokens)
     */
    public Integer getActiveSessionCount(Long userId) {
        var tokens = refreshTokenRepository.findValidTokensByUserId(userId);
        return tokens != null ? tokens.size() : 0;
    }
    
    /**
     * Unblocks a user account (admin operation)
     */
    public void unblockUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOptional.get();
        user.setBlocked(false);
        user.setBlockedUntil(null);
        user.setFailedLoginAttempts(0);
        userRepository.save(user);
    }
    
    /**
     * Blocks a user account (admin operation)
     */
    public void blockUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOptional.get();
        user.setBlocked(true);
        user.setActive(false);
        userRepository.save(user);
    }
}
