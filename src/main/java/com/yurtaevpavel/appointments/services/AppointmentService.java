package com.yurtaevpavel.appointments.services;

import com.yurtaevpavel.appointments.model.AppointmentStatus;
import com.yurtaevpavel.appointments.model.dto.AppointmentDto;
import com.yurtaevpavel.appointments.model.dto.NoteDto;
import com.yurtaevpavel.appointments.model.entities.Appointment;
import com.yurtaevpavel.appointments.model.entities.Company;
import com.yurtaevpavel.appointments.model.exceptions.AppointmentServiceException;
import com.yurtaevpavel.appointments.model.repositories.AppointmentRepository;
import com.yurtaevpavel.appointments.model.repositories.CompaniesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private AppointmentRepository appointmentRepository;
    private CompaniesRepository companiesRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, CompaniesRepository companiesRepository) {
        this.appointmentRepository = appointmentRepository;
        this.companiesRepository = companiesRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    } // TODO exception handling

    public Appointment getAppointmentById(Long id) {
        return getAppointmentOrException(id);
    }

    public void saveAppointment(AppointmentDto newAppointment) {
        Long companyId = newAppointment.getCompanyId();
        Company company = companiesRepository.findById(companyId)
                .orElseThrow(() -> new AppointmentServiceException(
                        String.format("Company with id=%s does not exist", companyId)));
        Appointment appointment = new Appointment(newAppointment.getDate(), company, AppointmentStatus.NEW);
        appointmentRepository.save(appointment);
    }

    public void confirmAppointment(Long id) {
        Appointment appointment = getAppointmentOrException(id);
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appointment);
    }

    public void setAppointmentNote(NoteDto note) {
        Appointment appointment = getAppointmentOrException(note.getAppointmentId());
        appointment.setNote(note.getNote());
        appointmentRepository.save(appointment);
    }

    public void cancelAppointment(Long id) {
        Appointment appointment = getAppointmentOrException(id);
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    private Appointment getAppointmentOrException(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentServiceException(
                        String.format("Appointment with id=%s does not exist", id)));
    }

}