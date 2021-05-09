package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PatientDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.PatientBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Caregiver;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Doctor;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.CaregiverRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.DoctorRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class PatientService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PatientService.class);
    public final PatientRepository patientRepository;
    public final CaregiverRepository caregiverRepository;
    public final DoctorRepository doctorRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository, CaregiverRepository caregiverRepository, DoctorRepository doctorRepository) {
        this.patientRepository = patientRepository;
        this.caregiverRepository = caregiverRepository;
        this.doctorRepository = doctorRepository;
    }

    public PatientDTO getPatientDetailsById(UUID id) {
        Patient patient = patientRepository.findPatientById(id);
        return PatientBuilder.toPatientDTO(patient);
    }

    public Patient getPatientById(UUID id){
        return patientRepository.findPatientById(id);
    }

    public Patient getPatientByPersonId(UUID id){
        return patientRepository.findPatientByPerson_Id(id);
    }

    public UUID insertPatient(Person person, Doctor doctor){
        Patient patient = PatientBuilder.toEntity(person, doctor);
        patient = patientRepository.save(patient);
        LOGGER.debug("Patient with id {} was inserted in db", patient.getId());

        Set<Patient> newPatientList = doctor.getListOfPatients();
        newPatientList.add(patient);
        doctor.setListOfPatients(newPatientList);
        doctor = doctorRepository.save(doctor);
        LOGGER.debug("Doctor with id {} has inserted the patient with id {} in its patients list", doctor.getId(), patient.getId());

        return patient.getId();
    }

    public UUID setCaregiverToPatient(Patient patient, Caregiver caregiver){
        patient.setCaregiver(caregiver);
        patient = patientRepository.save(patient);
        LOGGER.debug("Patient with id {} has saved caregiver with id {}", patient.getId(), caregiver.getId());

        Set<Patient> newListOfPatients = caregiver.getListOfPatients();
        newListOfPatients.add(patient);
        caregiver.setListOfPatients(newListOfPatients);
        caregiver = caregiverRepository.save(caregiver);
        LOGGER.debug("Caregiver with id {} has saved patient with id {}", caregiver.getId(), patient.getId());

        return patient.getId();
    }

    public Patient savePatient(Patient patient){
        patient = patientRepository.save(patient);
        return patient;
    }


}
