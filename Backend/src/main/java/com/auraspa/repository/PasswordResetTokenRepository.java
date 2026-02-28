package com.auraspa.repository;

import com.auraspa.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    
    @Query("SELECT prt FROM PasswordResetToken prt WHERE prt.token = ?1 AND prt.used = false AND prt.expiresAt > ?2")
    Optional<PasswordResetToken> findValidTokenByToken(String token, LocalDateTime now);
    
    @Query("SELECT prt FROM PasswordResetToken prt WHERE prt.user.id = ?1 AND prt.used = false ORDER BY prt.createdAt DESC LIMIT 1")
    Optional<PasswordResetToken> findLatestValidTokenForUser(Long userId);
    
    @Query("DELETE FROM PasswordResetToken prt WHERE prt.expiresAt < ?1")
    void deleteExpiredTokens(LocalDateTime now);
}
