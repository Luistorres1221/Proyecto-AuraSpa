package com.auraspa.service;

import com.auraspa.dto.LoginRequest;
import com.auraspa.dto.RegisterRequest;
import com.auraspa.dto.AuthResponse;
import com.auraspa.model.User;
import com.auraspa.model.UserRole;
import com.auraspa.model.RefreshToken;
import com.auraspa.model.LoginHistory;
import com.auraspa.model.EmailVerificationToken;
import com.auraspa.repository.UserRepository;
import com.auraspa.repository.RefreshTokenRepository;
import com.auraspa.repository.LoginHistoryRepository;
import com.auraspa.repository.EmailVerificationTokenRepository;
import com.auraspa.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@Service
@Transactional
public class AuthService {
    
    private static final Logger logger = Logger.getLogger(AuthService.class.getName());
    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int ACCOUNT_LOCK_DURATION_MINUTES = 1;
    private static final int EMAIL_VERIFICATION_TOKEN_EXPIRATION_HOURS = 24;
    
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final LoginHistoryRepository loginHistoryRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    
    public AuthService(UserRepository userRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       LoginHistoryRepository loginHistoryRepository,
                       EmailVerificationTokenRepository emailVerificationTokenRepository,
                       JwtTokenProvider jwtTokenProvider,
                       PasswordEncoder passwordEncoder,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.loginHistoryRepository = loginHistoryRepository;
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }
    
    /**
     * Registers a new user with comprehensive validation
     * Creates user with EMAIL_NOT_VERIFIED status and sends verification email
     */
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        
        // Check if phone already exists
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new IllegalArgumentException("Phone number already registered");
        }
        
        // Create new user with encrypted password
        User user = new User();
        user.setName(request.getName());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.CLIENT);
        user.setActive(true);
        user.setBlocked(false);
        user.setEmailVerified(false);
        user.setFailedLoginAttempts(0);
        user.setTwoFaEnabled(false);
        
        User savedUser = userRepository.save(user);
        
        // Generate and send email verification token
        String verificationToken = UUID.randomUUID().toString();
        EmailVerificationToken token = new EmailVerificationToken();
        token.setUser(savedUser);
        token.setToken(verificationToken);
        token.setExpiresAt(LocalDateTime.now().plusHours(EMAIL_VERIFICATION_TOKEN_EXPIRATION_HOURS));
        token.setUsed(false);
        emailVerificationTokenRepository.save(token);
        
        try {
            emailService.sendVerificationEmail(savedUser, verificationToken);
        } catch (Exception e) {
            logger.warning("Failed to send verification email: " + e.getMessage());
        }
        
        // Generate tokens
        String accessToken = jwtTokenProvider.generateAccessToken(savedUser.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(savedUser.getEmail());
        
        // Save refresh token
        saveRefreshToken(savedUser, refreshToken, "");
        
        // Prepare response
        return buildAuthResponse(savedUser, accessToken, refreshToken, false);
    }
    
    /**
     * Authenticates user and returns JWT tokens
     * Performs account lockout after MAX_FAILED_ATTEMPTS failed attempts
     */
    public AuthResponse login(LoginRequest request, String ipAddress) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        
        if (userOptional.isEmpty()) {
            recordFailedLogin(null, request.getEmail(), "User not found", ipAddress);
            throw new IllegalArgumentException("Invalid email or password");
        }
        
        User user = userOptional.get();
        
        // Check if account is blocked
        if (user.getBlocked() && user.getBlockedUntil() != null) {
            if (LocalDateTime.now().isBefore(user.getBlockedUntil())) {
                recordFailedLogin(user, user.getEmail(), "Account temporarily locked", ipAddress);
                throw new IllegalArgumentException("Account temporarily locked. Please try again later.");
            } else {
                // Unblock account if lock period has expired
                user.setBlocked(false);
                user.setBlockedUntil(null);
                user.setFailedLoginAttempts(0);
                userRepository.save(user);
            }
        }
        
        // Check if account is active
        if (!user.isActive()) {
            recordFailedLogin(user, user.getEmail(), "Account inactive", ipAddress);
            throw new IllegalArgumentException("Account is inactive. Please contact support.");
        }
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            incrementFailedLoginAttempts(user);
            recordFailedLogin(user, user.getEmail(), "Invalid password", ipAddress);
            throw new IllegalArgumentException("Invalid email or password");
        }
        
        // Reset failed attempts on successful password verification
        user.setFailedLoginAttempts(0);
        user.setBlocked(false);
        user.setBlockedUntil(null);
        
        // Check if 2FA is enabled and code not provided
        if (user.isTwoFaEnabled() && (request.getTwoFaCode() == null || request.getTwoFaCode().isEmpty())) {
            // Return response indicating 2FA code required
            user.setLastLogin(LocalDateTime.now());
            user.setLastLoginIp(ipAddress);
            userRepository.save(user);
            
            AuthResponse response = new AuthResponse();
            response.setUserId(user.getId());
            response.setEmail(user.getEmail());
            response.setName(user.getName());
            response.setLastname(user.getLastname());
            response.setRole(user.getRole());
            response.setTwoFaRequired(true);
            return response;
        }
        
        // Update last login
        user.setLastLogin(LocalDateTime.now());
        user.setLastLoginIp(ipAddress);
        userRepository.save(user);
        
        // Record successful login
        recordSuccessfulLogin(user, ipAddress);
        
        // Generate tokens
        String accessToken = jwtTokenProvider.generateAccessToken(user.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());
        
        // Save refresh token with device info
        saveRefreshToken(user, refreshToken, getDeviceInfo(request));
        
        return buildAuthResponse(user, accessToken, refreshToken, false);
    }
    
    /**
     * Verifies email using token
     */
    public void verifyEmail(String token) {
        Optional<EmailVerificationToken> tokenOptional = 
            emailVerificationTokenRepository.findValidTokenByToken(token, LocalDateTime.now());
        
        if (tokenOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid or expired verification token");
        }
        
        EmailVerificationToken verificationToken = tokenOptional.get();
        verificationToken.setVerifiedAt(LocalDateTime.now());
        verificationToken.setUsed(true);
        emailVerificationTokenRepository.save(verificationToken);
        
        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
    }
    
    /**
     * Refreshes access token using refresh token
     */
    public AuthResponse refreshAccessToken(String refreshToken) {
        Optional<RefreshToken> tokenOptional = refreshTokenRepository.findByToken(refreshToken);
        
        if (tokenOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid refresh token");
        }
        
        RefreshToken token = tokenOptional.get();
        
        if (token.isRevoked() || LocalDateTime.now().isAfter(token.getExpiresAt())) {
            throw new IllegalArgumentException("Refresh token expired or revoked");
        }
        
        User user = token.getUser();
        
        // Generate new access token
        String newAccessToken = jwtTokenProvider.generateAccessToken(user.getEmail());
        
        // Optionally rotate refresh token (best practice)
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());
        
        // Revoke old token and save new one
        token.setRevoked(true);
        refreshTokenRepository.save(token);
        
        RefreshToken newTokenEntity = new RefreshToken();
        newTokenEntity.setUser(user);
        newTokenEntity.setToken(newRefreshToken);
        newTokenEntity.setDeviceInfo(token.getDeviceInfo());
        newTokenEntity.setIpAddress(token.getIpAddress());
        newTokenEntity.setExpiresAt(LocalDateTime.now().plusDays(7));
        newTokenEntity.setRevoked(false);
        refreshTokenRepository.save(newTokenEntity);
        
        return buildAuthResponse(user, newAccessToken, newRefreshToken, false);
    }
    
    /**
     * Logs out user by recording logout time in login history
     */
    @Transactional
    public void logout(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setLastLogin(null); // Clear last login (optional)
            userRepository.save(user);
        }
    }
    
    /**
     * Revokes all refresh tokens for a user (closes all sessions)
     */
    @Transactional
    public void revokeAllTokens(Long userId) {
        java.util.List<RefreshToken> tokens = refreshTokenRepository.findValidTokensByUserId(userId);
        tokens.forEach(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }
    
    // Helper methods
    
    private void incrementFailedLoginAttempts(User user) {
        user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
        
        if (user.getFailedLoginAttempts() >= MAX_FAILED_ATTEMPTS) {
            user.setBlocked(true);
            user.setBlockedUntil(LocalDateTime.now().plusMinutes(ACCOUNT_LOCK_DURATION_MINUTES));
        }
        
        userRepository.save(user);
    }
    
    private void recordSuccessfulLogin(User user, String ipAddress) {
        LoginHistory history = new LoginHistory();
        history.setUser(user);
        history.setStatus("SUCCESS");
        history.setIpAddress(ipAddress);
        history.setLoginAt(LocalDateTime.now());
        loginHistoryRepository.save(history);
    }
    
    private void recordFailedLogin(User user, String email, String reason, String ipAddress) {
        LoginHistory history = new LoginHistory();
        if (user != null) {
            history.setUser(user);
        }
        history.setStatus("FAILED");
        history.setIpAddress(ipAddress);
        history.setLoginAt(LocalDateTime.now());
        loginHistoryRepository.save(history);
    }
    
    private void saveRefreshToken(User user, String refreshToken, String deviceInfo) {
        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(refreshToken);
        token.setDeviceInfo(deviceInfo);
        token.setExpiresAt(LocalDateTime.now().plusDays(7));
        token.setRevoked(false);
        refreshTokenRepository.save(token);
    }
    
    private String getDeviceInfo(LoginRequest request) {
        return request.isRememberMe() ? "RememberMe" : "SessionBased";
    }
    
    private AuthResponse buildAuthResponse(User user, String accessToken, String refreshToken, boolean twoFaRequired) {
        AuthResponse response = new AuthResponse();
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        response.setLastname(user.getLastname());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole());
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setExpiresIn(24L * 3600L); // 24 hours in seconds
        response.setTwoFaRequired(twoFaRequired);
        return response;
    }
}
