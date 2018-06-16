import { callApi, callApiNoReturn }from "../utils/Request";


export const saveNote = noteObj => {
    return callApiNoReturn('savenote/' + noteObj.appointmentId, 'POST', noteObj)
};

export const getAppointments = () => {
    return callApi('all', "GET");
};

export const getAppointment = (id) => {
    return callApi('appointment' + id, 'GET');
};

export const confirmAppointment = (id) => {
    return callApi('confirm/' + id, 'GET');
};

export const cancelAppointment = (id) => {
    return callApi('cancel/' + id, 'GET');
};

export const deleteAppointment = (id) => {
    return callApi('delete/' + id, 'DELETE');
};

export const saveAppointment = (appointmentRequest) => {
    return callApi('save' , appointmentRequest);
};

export const getAllCompanies = () => {
    return callApi('companies/all', 'GET');
};

export const downloadCSV = () => {
    return callApi('csv', 'GET');
};
