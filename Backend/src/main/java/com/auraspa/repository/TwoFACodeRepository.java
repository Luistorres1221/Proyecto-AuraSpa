package com.auraspa.repository;

import com.auraspa.model.TwoFACode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface TwoFACodeRepository extends JpaRepository<TwoFACode, Long> {
    
    @Query("SELECT tfc FROM TwoFACode tfc WHERE tfc.user.id = ?1 AND tfc.used = false AND tfc.expiresAt > ?2 ORDER BY tfc.createdAt DESC LIMIT 1")
    Optional<TwoFACode> findLatestValidCodeForUser(Long userId, LocalDateTime now);
    
    @Query("SELECT tfc FROM TwoFACode tfc WHERE tfc.code = ?1 AND tfc.user.id = ?2 AND tfc.used = false AND tfc.expiresAt > ?3")
    Optional<TwoFACode> findValidCodeByCodeAndUserId(String code, Long userId, LocalDateTime now);
    
    @Query("DELETE FROM TwoFACode tfc WHERE tfc.expiresAt < ?1")
    void deleteExpiredCodes(LocalDateTime now);
}
