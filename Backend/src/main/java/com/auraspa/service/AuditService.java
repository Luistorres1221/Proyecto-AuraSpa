package com.auraspa.service;

import com.auraspa.model.LoginHistory;
import com.auraspa.model.User;
import com.auraspa.repository.LoginHistoryRepository;
import com.auraspa.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
@Transactional
public class AuditService {
    
    private static final Logger logger = Logger.getLogger(AuditService.class.getName());
    
    private final LoginHistoryRepository loginHistoryRepository;
    private final UserRepository userRepository;
    
    public AuditService(LoginHistoryRepository loginHistoryRepository,
                        UserRepository userRepository) {
        this.loginHistoryRepository = loginHistoryRepository;
        this.userRepository = userRepository;
    }
    
    /**
     * Records a successful login in audit trail
     */
    public void recordSuccessfulLogin(Long userId, String ipAddress, String userAgent, String deviceInfo) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return;
        }
        
        User user = userOptional.get();
        LoginHistory history = new LoginHistory();
        history.setUser(user);
        history.setStatus("SUCCESS");
        history.setIpAddress(ipAddress);
        history.setUserAgent(userAgent);
        history.setDeviceInfo(deviceInfo);
        history.setLoginAt(LocalDateTime.now());
        
        loginHistoryRepository.save(history);
        logger.info("Recorded successful login for user: " + user.getEmail() + " from IP: " + ipAddress);
    }
    
    /**
     * Records a failed login attempt
     */
    public void recordFailedLogin(Long userId, String ipAddress, String userAgent, String reason) {
        LoginHistory history = new LoginHistory();
        if (userId != null) {
            userRepository.findById(userId).ifPresent(history::setUser);
        }
        history.setStatus("FAILED");
        history.setIpAddress(ipAddress);
        history.setUserAgent(userAgent);
        history.setLoginAt(LocalDateTime.now());
        
        loginHistoryRepository.save(history);
        logger.info("Recorded failed login. Reason: " + reason);
    }
    
    /**
     * Records a locked/blocked login attempt
     */
    public void recordBlockedLogin(Long userId, String ipAddress, String userAgent, String reason) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        LoginHistory history = new LoginHistory();
        userOptional.ifPresent(history::setUser);
        history.setStatus("BLOCKED");
        history.setIpAddress(ipAddress);
        history.setUserAgent(userAgent);
        history.setLoginAt(LocalDateTime.now());
        
        loginHistoryRepository.save(history);
        logger.info("Recorded blocked login for user: " + userOptional.map(User::getEmail).orElse("unknown") + " from IP: " + ipAddress);
    }
    
    /**
     * Records logout action
     */
    public void recordLogout(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return;
        }
        
        // Update the latest login history with logout time
        List<LoginHistory> histories = loginHistoryRepository.findLastLoginsByUserId(userId);
        if (!histories.isEmpty()) {
            LoginHistory latestLogin = histories.get(0);
            if (latestLogin.getLogoutAt() == null) {
                latestLogin.setLogoutAt(LocalDateTime.now());
                loginHistoryRepository.save(latestLogin);
            }
        }
    }
    
    /**
     * Retrieves login history for a specific user
     */
    public List<LoginHistory> getUserLoginHistory(Long userId, Integer limit) {
        limit = limit != null ? limit : 10;
        return loginHistoryRepository.findLastLoginsByUserId(userId);
    }
    
    /**
     * Retrieves failed login attempts for a user in the last N hours
     */
    public Integer countFailedLoginAttempts(Long userId, Integer hoursAgo) {
        hoursAgo = hoursAgo != null ? hoursAgo : 1;
        LocalDateTime since = LocalDateTime.now().minusHours(hoursAgo);
        return loginHistoryRepository.countFailedLoginAttempts(userId, since);
    }
    
    /**
     * Retrieves login history for an email address
     */
    public List<LoginHistory> getLoginHistoryByEmail(String email, Integer daysAgo) {
        daysAgo = daysAgo != null ? daysAgo : 7;
        LocalDateTime since = LocalDateTime.now().minusDays(daysAgo);
        return loginHistoryRepository.findLoginHistoryByEmailSince(email, since);
    }
    
    /**
     * Identifies suspicious login activity
     */
    public boolean detectSuspiciousActivity(Long userId) {
        // Check for multiple failed attempts in last hour
        Integer failedAttempts = countFailedLoginAttempts(userId, 1);
        if (failedAttempts != null && failedAttempts >= 3) {
            logger.warning("Suspicious activity detected: Multiple failed attempts for user: " + userId);
            return true;
        }
        
        // Check for logins from different IPs in short time
        List<LoginHistory> recentLogins = getUserLoginHistory(userId, 5);
        if (recentLogins.size() >= 2) {
            LoginHistory latest = recentLogins.get(0);
            LoginHistory previous = recentLogins.get(1);
            
            if (!latest.getIpAddress().equals(previous.getIpAddress())) {
                long minutesBetween = ChronoUnit.MINUTES.between(previous.getLoginAt(), latest.getLoginAt());
                if (minutesBetween < 5) {
                    logger.warning("Suspicious activity detected: Different IPs in short time for user: " + userId);
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Gets login statistics for a user
     */
    public LoginStatistics getLoginStatistics(Long userId, Integer daysAgo) {
        daysAgo = daysAgo != null ? daysAgo : 30;
        LocalDateTime since = LocalDateTime.now().minusDays(daysAgo);
        
        List<LoginHistory> history = loginHistoryRepository.findLoginHistoryByEmailSince("", since); // Modified to get user's history
        
        LoginStatistics stats = new LoginStatistics();
        stats.setTotalLogins(0);
        stats.setSuccessfulLogins(0);
        stats.setFailedLogins(0);
        stats.setBlocledLogins(0);
        
        for (LoginHistory record : history) {
            switch (record.getStatus()) {
                case "SUCCESS":
                    stats.setSuccessfulLogins(stats.getSuccessfulLogins() + 1);
                    break;
                case "FAILED":
                    stats.setFailedLogins(stats.getFailedLogins() + 1);
                    break;
                case "BLOCKED":
                    stats.setBlocledLogins(stats.getBlocledLogins() + 1);
                    break;
            }
        }
        
        stats.setTotalLogins(history.size());
        return stats;
    }
    
    /**
     * Inner class for login statistics
     */
    public static class LoginStatistics {
        private Integer totalLogins;
        private Integer successfulLogins;
        private Integer failedLogins;
        private Integer blocledLogins;
        
        // Getters and Setters
        public Integer getTotalLogins() { return totalLogins; }
        public void setTotalLogins(Integer totalLogins) { this.totalLogins = totalLogins; }
        
        public Integer getSuccessfulLogins() { return successfulLogins; }
        public void setSuccessfulLogins(Integer successfulLogins) { this.successfulLogins = successfulLogins; }
        
        public Integer getFailedLogins() { return failedLogins; }
        public void setFailedLogins(Integer failedLogins) { this.failedLogins = failedLogins; }
        
        public Integer getBlocledLogins() { return blocledLogins; }
        public void setBlocledLogins(Integer blocledLogins) { this.blocledLogins = blocledLogins; }
    }
}
