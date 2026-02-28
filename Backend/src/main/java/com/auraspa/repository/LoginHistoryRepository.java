package com.auraspa.repository;

import com.auraspa.model.LoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {
    
    @Query("SELECT lh FROM LoginHistory lh WHERE lh.user.id = ?1 ORDER BY lh.loginAt DESC LIMIT 10")
    List<LoginHistory> findLastLoginsByUserId(Long userId);
    
    @Query("SELECT COUNT(lh) FROM LoginHistory lh WHERE lh.user.id = ?1 AND lh.status = 'FAILED' AND lh.loginAt > ?2")
    Integer countFailedLoginAttempts(Long userId, LocalDateTime since);
    
    @Query("SELECT lh FROM LoginHistory lh WHERE lh.user.email = ?1 AND lh.loginAt > ?2 ORDER BY lh.loginAt DESC")
    List<LoginHistory> findLoginHistoryByEmailSince(String email, LocalDateTime since);
}
