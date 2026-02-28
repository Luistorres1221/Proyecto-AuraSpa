package com.auraspa.repository;

import com.auraspa.model.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {
    
    @Query("SELECT evt FROM EmailVerificationToken evt WHERE evt.token = ?1 AND evt.used = false AND evt.expiresAt > ?2")
    Optional<EmailVerificationToken> findValidTokenByToken(String token, LocalDateTime now);
    
    @Query("SELECT evt FROM EmailVerificationToken evt WHERE evt.user.id = ?1 AND evt.used = false ORDER BY evt.createdAt DESC LIMIT 1")
    Optional<EmailVerificationToken> findLatestValidTokenForUser(Long userId);
    
    @Query("DELETE FROM EmailVerificationToken evt WHERE evt.expiresAt < ?1")
    void deleteExpiredTokens(LocalDateTime now);
}
