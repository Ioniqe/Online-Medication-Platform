package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicalRecordDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicalRecordService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;
    private final PatientService patientService;

    @Autowired
    public MedicalRecordController(MedicalRecordService medicalRecordService, PatientService patientService) {
        this.medicalRecordService = medicalRecordService;
        this.patientService = patientService;
    }


    //------------------------------CREATE----------------------------
    @RequestMapping(value = "/med_rec/new/{patientId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> createMedicalRecordForPatientId(@PathVariable("patientId") UUID patientId,
                                                                @RequestBody MedicalRecordDTO medicalRecordDTO) {
        Patient patient = patientService.getPatientById(patientId);
        UUID medicalRecordID = medicalRecordService.insertMedicalRecord(medicalRecordDTO, patient);
        return new ResponseEntity<>(medicalRecordID, HttpStatus.CREATED);
    }

    //------------------------------READ----------------------------
    @RequestMapping(value = "/medical_rec/patient/{patientId}", method = RequestMethod.GET)
    public ResponseEntity<List<MedicalRecordDTO>> getMedicalRecordByPatientId(@PathVariable("patientId") UUID patientId) {
        List<MedicalRecordDTO> medicalRecords = medicalRecordService.getMedicalRecordsByPatientId(patientId);
        return new ResponseEntity<>(medicalRecords, HttpStatus.OK);
    }

    //------------------------------UPDATE----------------------------
    @RequestMapping(value = "/med_rec/update/{medRecId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> updateMedicalRecordForPatientId(@PathVariable("medRecId") UUID medRecId,
                                                                @RequestBody MedicalRecordDTO medicalRecordDTO) {
        UUID medicalRecordID = medicalRecordService.updateMedicalRecord(medicalRecordDTO, medRecId);
        return new ResponseEntity<>(medicalRecordID, HttpStatus.CREATED);
    }

}
