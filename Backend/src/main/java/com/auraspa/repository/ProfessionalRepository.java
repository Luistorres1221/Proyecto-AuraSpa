package com.auraspa.repository;

import com.auraspa.model.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessionalRepository extends JpaRepository<Professional, Long> {
    
    @Query("SELECT p FROM Professional p WHERE p.active = true ORDER BY p.name ASC")
    List<Professional> findAllActiveProfessionals();
    
    @Query("SELECT p FROM Professional p WHERE p.specialty = ?1 AND p.active = true ORDER BY p.name ASC")
    List<Professional> findProfessionalsBySpecialty(String specialty);
    
    @Query("SELECT p FROM Professional p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%')) AND p.active = true")
    List<Professional> searchProfessionals(String keyword);
    
    Optional<Professional> findByEmail(String email);
    
    Optional<Professional> findByPhone(String phone);
}
