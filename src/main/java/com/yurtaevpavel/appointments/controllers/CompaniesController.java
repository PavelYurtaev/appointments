package com.yurtaevpavel.appointments.controllers;

import com.yurtaevpavel.appointments.model.entities.Company;
import com.yurtaevpavel.appointments.services.CompaniesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompaniesController {

    private CompaniesService companiesService;

    @Autowired
    public CompaniesController(CompaniesService companiesService) {
        this.companiesService = companiesService;
    }

    @RequestMapping(value = "/allCompanies", method = RequestMethod.GET)
    public List<Company> getAllCompanies() {
        return companiesService.getAllCompanies();
    }
}
