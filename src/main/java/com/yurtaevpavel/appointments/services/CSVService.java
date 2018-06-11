package com.yurtaevpavel.appointments.services;

import com.yurtaevpavel.appointments.model.entities.Appointment;
import com.yurtaevpavel.appointments.model.repositories.AppointmentRepository;
import org.apache.commons.io.FileUtils;
import org.json.CDL;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Service
public class CSVService {

    private static final String FILE_NAME = "appointments.csv";

    private AppointmentRepository appointmentRepository;

    @Autowired
    public CSVService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public void downloadAppointmentsCsv(HttpServletResponse response) {
        List<Appointment> appointmentList = appointmentRepository.findAll();

        try {
            JSONArray jsonArray = new JSONArray(appointmentList);
            String csv = CDL.toString(jsonArray);

            File file = new File(FILE_NAME);
            FileUtils.writeStringToFile(file, csv, "UTF-8");
            Files.copy(file.toPath(), response.getOutputStream());

            response.setContentType("text/csv");
            response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", FILE_NAME));
            response.getOutputStream().flush();
        } catch (JSONException | IOException e) {
            e.printStackTrace();
        }
    }
}
