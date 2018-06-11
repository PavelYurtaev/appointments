package com.yurtaevpavel.appointments.services;

import com.yurtaevpavel.appointments.model.entities.Company;
import com.yurtaevpavel.appointments.model.repositories.CompaniesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompaniesService {

    private CompaniesRepository companiesRepository;

    @Autowired
    public CompaniesService(CompaniesRepository companiesRepository) {
        this.companiesRepository = companiesRepository;
    }

    public List<Company> getAllCompanies() {
        return companiesRepository.findAll();
    }
}
