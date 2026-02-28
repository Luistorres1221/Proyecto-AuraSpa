package com.auraspa.repository;

import com.auraspa.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    Optional<RefreshToken> findByToken(String token);
    
    @Query("SELECT rt FROM RefreshToken rt WHERE rt.user.id = ?1 AND rt.revoked = false AND rt.expiresAt > CURRENT_TIMESTAMP")
    List<RefreshToken> findValidTokensByUserId(Long userId);
    
    @Query("DELETE FROM RefreshToken rt WHERE rt.user.id = ?1")
    void revokeAllUserTokens(Long userId);
    
    void deleteByToken(String token);
}
