package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicalRecordDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.MedicalRecordBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicalRecord;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MedicalRecordRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MedicalRecordService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MedicalRecordService.class);
    public final MedicalRecordRepository medicalRecordRepository;
    public final PatientRepository patientRepository;

    @Autowired
    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository, PatientRepository patientRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.patientRepository = patientRepository;
    }

    public Optional<MedicalRecord> verifyMedicalRecordExistence(UUID medRecId) {
        Optional<MedicalRecord> medicalRecord = medicalRecordRepository.findById(medRecId);
        if (!medicalRecord.isPresent()) {
            LOGGER.error("Medical record was not found.");
            throw new ResourceNotFoundException("There is no medical record with the given id.");
        }
        return  medicalRecord;
    }

    public List<MedicalRecordDTO> getMedicalRecordsByPatientId(UUID id){
        List<MedicalRecord> medicalRecords = medicalRecordRepository.findAllByPatient_Id(id);
        List<MedicalRecordDTO> medicalRecordDTOS = new ArrayList<>();
        medicalRecords.stream().forEach(record -> medicalRecordDTOS.add(MedicalRecordBuilder.toMedicalRecordDTOWithId(record)));
        return medicalRecordDTOS;
    }

    public UUID insertMedicalRecord(MedicalRecordDTO medicalRecordDTO, Patient patient){
        MedicalRecord medicalRecord = MedicalRecordBuilder.toEntity(medicalRecordDTO, patient);
        medicalRecord = medicalRecordRepository.save(medicalRecord);
        LOGGER.debug("Medical record with id {} was inserted in db", medicalRecord.getId());

        Set<MedicalRecord> medicalRecordSet = new HashSet<>();
        medicalRecordSet.add(medicalRecord);
        patient.setMedicalRecord(medicalRecordSet);
        patient = patientRepository.save(patient);

        return medicalRecord.getId();
    }

    public UUID updateMedicalRecord(MedicalRecordDTO medicalRecordDTO, UUID medRecId){
        MedicalRecord medicalRecord = verifyMedicalRecordExistence(medRecId).get();
        medicalRecord.setMedicalCondition(medicalRecordDTO.getMedicalCondition());
        medicalRecord.setConditionDescription(medicalRecordDTO.getConditionDescription());
        medicalRecord = medicalRecordRepository.save(medicalRecord);

        return medicalRecord.getId();
    }
}
