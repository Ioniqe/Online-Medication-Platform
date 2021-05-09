package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicalRecordDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicalRecord;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;

public class MedicalRecordBuilder {
    public MedicalRecordBuilder() {
    }

    public static MedicalRecordDTO toMedicalRecordDTOWithId(MedicalRecord medicalRecord){
        return new MedicalRecordDTO(medicalRecord.getId(), medicalRecord.getMedicalCondition(), medicalRecord.getConditionDescription());
    }

    public static MedicalRecordDTO toMedicalRecordDTO(MedicalRecord medicalRecord){
        return new MedicalRecordDTO(medicalRecord.getMedicalCondition(), medicalRecord.getConditionDescription());
    }

    public static MedicalRecord toEntity(MedicalRecordDTO medicalRecordDTO, Patient patient){
        return new MedicalRecord(medicalRecordDTO.getMedicalCondition(), medicalRecordDTO.getConditionDescription(), patient);
    }
}
