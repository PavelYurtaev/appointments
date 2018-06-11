package com.yurtaevpavel.appointments.model.exceptions;

public class AppointmentServiceException extends RuntimeException {

    public AppointmentServiceException() {
        super();
    }

    public AppointmentServiceException(String message) {
        super(message);
    }
}
