package com.yurtaevpavel.appointments.model.entities;

import com.yurtaevpavel.appointments.model.AppointmentStatus;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
public class Appointment implements Serializable {
    private Long id;
    private LocalDateTime date;
    private Company company;
    private String note;
    private AppointmentStatus status;

    public Appointment() {
    }

    public Appointment(LocalDateTime date, Company company, AppointmentStatus status) {
        this.date = date;
        this.company = company;
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @OneToOne
    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Enumerated(EnumType.STRING)
    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }
}
