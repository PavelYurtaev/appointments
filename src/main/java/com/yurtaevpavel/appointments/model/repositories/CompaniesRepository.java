package com.yurtaevpavel.appointments.model.repositories;

import com.yurtaevpavel.appointments.model.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompaniesRepository extends JpaRepository<Company, Long> {
}
