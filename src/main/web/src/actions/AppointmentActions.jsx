export const SHOW_APPOINTMENT_MODAL = 'SHOW_APPOINTMENT_MODAL';
export const HIDE_APPOINTMENT_MODAL = 'HIDE_APPOINTMENT_MODAL';
export const FILL_APPOINTMENTS = 'FILL_APPOINTMENTS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SET_ROWS_ON_PAGE = 'SET_ROWS_ON_PAGE';

export const showAppointmentModal = (appointment) => {
    return {
        type: SHOW_APPOINTMENT_MODAL,
        appointment
    }
};

export const hideAppointmentModal = () => {
    return {
        type: HIDE_APPOINTMENT_MODAL
    }
};

export const fillAppointments = (appointments) => {
    return {
        type: FILL_APPOINTMENTS,
        appointments
    }
};

export const changePage = (event, page) => {
    return {
        type: CHANGE_PAGE,
        event,
        page
    }
};

export const setRowsOnPage = (number) => {
    return {
        type: SET_ROWS_ON_PAGE,
        number
    }
};
