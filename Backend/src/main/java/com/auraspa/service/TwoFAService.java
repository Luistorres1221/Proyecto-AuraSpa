package com.auraspa.service;

import com.auraspa.model.TwoFACode;
import com.auraspa.model.User;
import com.auraspa.repository.TwoFACodeRepository;
import com.auraspa.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.logging.Logger;

@Service
@Transactional
public class TwoFAService {
    
    private static final Logger logger = Logger.getLogger(TwoFAService.class.getName());
    private static final int TWO_FA_CODE_LENGTH = 6;
    private static final int TWO_FA_CODE_EXPIRATION_MINUTES = 5;
    private static final int MAX_2FA_ATTEMPTS = 3;
    
    private final TwoFACodeRepository twoFACodeRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final Random random = new Random();
    
    public TwoFAService(TwoFACodeRepository twoFACodeRepository,
                        UserRepository userRepository,
                        EmailService emailService) {
        this.twoFACodeRepository = twoFACodeRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    /**
     * Generates a 2FA code and sends it to user's email
     */
    public void generateAndSend2FACode(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOptional.get();
        
        // Generate random 6-digit code
        String code = generateCode();
        
        // Create and save 2FA code entity
        TwoFACode twoFACode = new TwoFACode();
        twoFACode.setUser(user);
        twoFACode.setCode(code);
        twoFACode.setExpiresAt(LocalDateTime.now().plusMinutes(TWO_FA_CODE_EXPIRATION_MINUTES));
        twoFACode.setUsed(false);
        twoFACode.setAttempts(0);
        twoFACodeRepository.save(twoFACode);
        
        // Send code via email
        try {
            emailService.send2FAEmail(user, code);
            logger.info("2FA code sent to user: " + user.getEmail());
        } catch (Exception e) {
            logger.warning("Failed to send 2FA code: " + e.getMessage());
            throw new RuntimeException("Failed to send 2FA code", e);
        }
    }
    
    /**
     * Verifies a 2FA code
     */
    public boolean verify2FACode(Long userId, String code) {
        Optional<TwoFACode> tokenOptional = twoFACodeRepository
                .findValidCodeByCodeAndUserId(code, userId, LocalDateTime.now());
        
        if (tokenOptional.isEmpty()) {
            // Try to find any valid code and increment attempts
            Optional<TwoFACode> anyCodeOptional = twoFACodeRepository
                    .findLatestValidCodeForUser(userId, LocalDateTime.now());
            
            if (anyCodeOptional.isPresent()) {
                TwoFACode twoFACode = anyCodeOptional.get();
                twoFACode.setAttempts(twoFACode.getAttempts() + 1);
                
                if (twoFACode.getAttempts() >= MAX_2FA_ATTEMPTS) {
                    twoFACode.setUsed(true);
                    logger.warning("2FA code locked due to max attempts for user: " + userId);
                }
                
                twoFACodeRepository.save(twoFACode);
            }
            
            return false;
        }
        
        TwoFACode twoFACode = tokenOptional.get();
        twoFACode.setUsed(true);
        twoFACode.setVerifiedAt(LocalDateTime.now());
        twoFACodeRepository.save(twoFACode);
        
        return true;
    }
    
    /**
     * Enables 2FA for a user
     */
    public void enable2FA(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOptional.get();
        user.setTwoFaEnabled(true);
        user.setTwoFaVerified(true);
        userRepository.save(user);
    }
    
    /**
     * Disables 2FA for a user
     */
    public void disable2FA(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOptional.get();
        user.setTwoFaEnabled(false);
        user.setTwoFaVerified(false);
        userRepository.save(user);
    }
    
    /**
     * Checks if 2FA is enabled for a user
     */
    public boolean is2FAEnabled(Long userId) {
        return userRepository.findById(userId)
                .map(User::isTwoFaEnabled)
                .orElse(false);
    }
    
    /**
     * Resends 2FA code to user
     */
    public void resend2FACode(Long userId) {
        // Mark any existing unused codes as expired
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        // Generate and send new code
        generateAndSend2FACode(userId);
    }
    
    // Helper methods
    
    /**
     * Generates a random 6-digit code
     */
    private String generateCode() {
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < TWO_FA_CODE_LENGTH; i++) {
            code.append(random.nextInt(10));
        }
        return code.toString();
    }
}
