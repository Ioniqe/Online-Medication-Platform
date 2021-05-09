package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity(name="medical_record")
@Table(name = "medical_record")
public class MedicalRecord implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    @Column(name = "id")
    private UUID id;

    @Column(name = "medical_condition", nullable = false)
    private String medicalCondition;

    @Column(name = "condition_description", nullable = false)
    private String conditionDescription;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="patient_id", nullable=false, unique=true)
    private Patient patient;

    public MedicalRecord() {
    }

    public MedicalRecord(String medicalCondition, String conditionDescription, Patient patient) {
        this.medicalCondition = medicalCondition;
        this.conditionDescription = conditionDescription;
        this.patient = patient;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

//    public Patient getPatient() {
//        return patient;
//    }
//
//    public void setPatient(Patient patient_id) {
//        this.patient = patient;
//    }

    public UUID getPatientID(){
        return patient.getId();
    }
}
