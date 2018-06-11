import { initialState } from '../store/InitialState'
import {
    SHOW_APPOINTMENT_MODAL,
    HIDE_APPOINTMENT_MODAL,
    FILL_APPOINTMENTS,
    CHANGE_PAGE,
    SET_ROWS_ON_PAGE
} from '../actions/AppointmentActions';

const AppointmentsReducer = (state = initialState, action) => {
    switch (action.type) {

        case FILL_APPOINTMENTS:
            return Object.assign({}, state, {appointments: action.appointments});

        case SHOW_APPOINTMENT_MODAL:
            return Object.assign({}, state, {
                modalVisible: true,
                appointmentInfo: action.appointment
            });

        case HIDE_APPOINTMENT_MODAL:
            return Object.assign({}, state, {
                modalVisible: false,
                appointmentInfo: null,
            });
        case CHANGE_PAGE:
            return Object.assign({}, state, {
                currentPage: action.page,
            });
        case SET_ROWS_ON_PAGE:
            return Object.assign({}, state, {
                rowsOnPage: action.number,
            });
        default:
            return state;
    }
};

export default AppointmentsReducer;