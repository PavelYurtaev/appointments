package com.yurtaevpavel.appointments.services;

import com.yurtaevpavel.appointments.model.AppointmentStatus;
import com.yurtaevpavel.appointments.model.entities.Appointment;
import com.yurtaevpavel.appointments.model.entities.Company;
import com.yurtaevpavel.appointments.model.repositories.AppointmentRepository;
import com.yurtaevpavel.appointments.model.repositories.CompaniesRepository;
import org.easymock.EasyMock;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.*;

public class AppointmentServiceTest {

    private static final long APPOINTMENTS_LIMIT = 5;

    private AppointmentService appointmentService;
    private AppointmentRepository appointmentRepository;
    private CompaniesRepository companiesRepository;
    private List<Appointment> testAppointments;


    @Before
    public void setUp() {
        appointmentRepository = EasyMock.createMock(AppointmentRepository.class);
        companiesRepository = EasyMock.createMock(CompaniesRepository.class);
        appointmentService = new AppointmentService(appointmentRepository,companiesRepository);

        AtomicLong count = new AtomicLong(0);
        testAppointments = Stream.generate(() ->{
            Appointment appointment = new Appointment();
            appointment.setId(count.getAndIncrement());
            appointment.setDate(LocalDateTime.now().plusHours(count.get()));
            appointment.setStatus(AppointmentStatus.NEW);
            appointment.setCompany(new Company());
            return appointment;
        }).limit(APPOINTMENTS_LIMIT).collect(Collectors.toList());
    }

    @Test
    public void getAllAppointmentsTest() {
        EasyMock.expect(appointmentRepository.findAll()).andStubReturn(testAppointments);
        EasyMock.replay(appointmentRepository);
        appointmentService.getAllAppointments();
        assertEquals(testAppointments, appointmentService.getAllAppointments());
    }

    @Test
    public void deleteAppointmentTest() {
        // TODO improve
        appointmentRepository.deleteById(0L);
        EasyMock.expectLastCall();
        EasyMock.replay();
        appointmentService.deleteAppointment(0L);
    }

    @Test
    public void getAppointmentByIdTest() {
        Long id = 1L;
        Appointment expextedAppointment = testAppointments.get(id.intValue());
        EasyMock.expect(appointmentRepository.findById(id)).andStubReturn(Optional.of(expextedAppointment));
        EasyMock.replay(appointmentRepository);
        assertEquals(expextedAppointment, appointmentService.getAppointmentById(id));
    }
}