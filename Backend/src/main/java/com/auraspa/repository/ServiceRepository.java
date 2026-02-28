package com.auraspa.repository;

import com.auraspa.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    
    @Query("SELECT s FROM Service s WHERE s.active = true ORDER BY s.name ASC")
    List<Service> findAllActiveServices();
    
    @Query("SELECT s FROM Service s WHERE s.category = ?1 AND s.active = true ORDER BY s.name ASC")
    List<Service> findServicesByCategory(String category);
    
    @Query("SELECT s FROM Service s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', ?1, '%')) AND s.active = true")
    List<Service> searchServices(String keyword);
    
    Optional<Service> findByName(String name);
}
