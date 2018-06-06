package com.yurtaevpavel.appointments.model.repositories;

import com.yurtaevpavel.appointments.model.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
