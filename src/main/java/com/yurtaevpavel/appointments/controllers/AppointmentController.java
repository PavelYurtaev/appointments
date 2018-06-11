package com.yurtaevpavel.appointments.controllers;

import com.yurtaevpavel.appointments.model.dto.AppointmentDto;
import com.yurtaevpavel.appointments.model.dto.NoteDto;
import com.yurtaevpavel.appointments.model.entities.Appointment;
import com.yurtaevpavel.appointments.model.exceptions.AppointmentServiceException;
import com.yurtaevpavel.appointments.services.AppointmentService;
import com.yurtaevpavel.appointments.services.CSVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin
public class AppointmentController {

    private AppointmentService appointmentService;
    private CSVService csvService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, CSVService csvService) {
        this.appointmentService = appointmentService;
        this.csvService = csvService;
    }

    @RequestMapping(value = {"/", "/all"})
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }

    @RequestMapping(value = "/appointment/{id}", method = RequestMethod.GET)
    public ResponseEntity<Appointment> getAppointment(@PathVariable final Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void saveAppointment(@RequestBody AppointmentDto appointmentDto) {
        appointmentService.saveAppointment(appointmentDto);
    }

    @RequestMapping(value = "/confirm/{id}", method = RequestMethod.GET)
    public void confirmAppointment(@PathVariable final Long id) {
        appointmentService.confirmAppointment(id);
    }

    @RequestMapping(value = "/savenote/{id}", method = RequestMethod.POST)
    public void setAppointmentNote(@RequestBody NoteDto note) {
        appointmentService.setAppointmentNote(note);
    }

    @RequestMapping(value = "/cancel/{id}", method = RequestMethod.GET)
    public void cancelAppointment(@PathVariable final Long id) {
        appointmentService.cancelAppointment(id);
    }

    @RequestMapping(value = "/csv", method = RequestMethod.GET)
    public void downloadCSV(HttpServletResponse response) {
        csvService.downloadAppointmentsCsv(response);
    }


    @ExceptionHandler(AppointmentServiceException.class)
    public ResponseEntity<?> serviceException(AppointmentServiceException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
