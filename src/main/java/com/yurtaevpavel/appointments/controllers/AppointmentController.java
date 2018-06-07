package com.yurtaevpavel.appointments.controllers;

import com.yurtaevpavel.appointments.model.entities.Appointment;
import com.yurtaevpavel.appointments.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AppointmentController {

    private AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @RequestMapping(value = "/all")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

}
