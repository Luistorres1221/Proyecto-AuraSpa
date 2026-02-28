package com.auraspa.repository;

import com.auraspa.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    @Query("SELECT a FROM Appointment a WHERE a.client.id = ?1 ORDER BY a.appointmentDate DESC")
    List<Appointment> findAppointmentsByClientId(Long clientId);
    
    @Query("SELECT a FROM Appointment a WHERE a.professional.id = ?1 ORDER BY a.appointmentDate DESC")
    List<Appointment> findAppointmentsByProfessionalId(Long professionalId);
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate BETWEEN ?1 AND ?2 AND a.status = 'CONFIRMED' ORDER BY a.appointmentDate ASC")
    List<Appointment> findConfirmedAppointmentsBetweenDates(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.professional.id = ?1 AND a.appointmentDate BETWEEN ?2 AND ?3 ORDER BY a.appointmentDate ASC")
    List<Appointment> findProfessionalAppointmentsByDateRange(Long professionalId, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.status = 'CONFIRMED' AND a.appointmentDate > ?1")
    Long countUpcomingConfirmedAppointments(LocalDateTime from);
}
