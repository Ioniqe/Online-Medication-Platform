package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.util.UUID;

public class MedicalRecordDTO {
    private UUID id;
    private String medicalCondition;
    private String conditionDescription;

    public MedicalRecordDTO() {
    }

    public MedicalRecordDTO(String medicalCondition, String conditionDescription) {
        this.medicalCondition = medicalCondition;
        this.conditionDescription = conditionDescription;
    }

    public MedicalRecordDTO(UUID id, String medicalCondition, String conditionDescription) {
        this.id = id;
        this.medicalCondition = medicalCondition;
        this.conditionDescription = conditionDescription;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMedicalCondition() {
        return medicalCondition;
    }

    public void setMedicalCondition(String medicalCondition) {
        this.medicalCondition = medicalCondition;
    }

    public String getConditionDescription() {
        return conditionDescription;
    }

    public void setConditionDescription(String conditionDescription) {
        this.conditionDescription = conditionDescription;
    }
}
