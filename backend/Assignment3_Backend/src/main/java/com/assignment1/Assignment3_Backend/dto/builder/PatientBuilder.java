package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PatientDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.*;

import java.util.HashSet;
import java.util.Set;

public class PatientBuilder {

    public PatientBuilder() {
    }

    public static PatientDTO toPatientDTO(Patient patient){
        return new PatientDTO(patient.getId());
    }

    public static PatientDTO toPatientDetailsDTO(Patient patient){
        return new PatientDTO(patient.getId(), patient.getDoctorID(), patient.getCaregiverID());
    }

    public static Patient toEntity(Person person, Doctor doctor){
        Set<MedicationPlan> medicationPlans = new HashSet<>();
        Set<MedicalRecord> medicalRecord = new HashSet<>();
        return new Patient(doctor, person, medicationPlans, medicalRecord);
    }

}
