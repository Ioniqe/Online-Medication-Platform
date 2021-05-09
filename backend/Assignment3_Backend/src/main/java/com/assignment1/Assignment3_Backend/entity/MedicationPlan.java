package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Entity(name="medication_plan")
@Table(name = "medication_plan")
public class MedicationPlan implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    @Column(name = "id")
    private UUID id;

    @Column(name="treatment_period")
    private Integer treatmentPeriod;

    @Column(name="treatment_name")
    private String treatmentName;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @OneToMany(mappedBy = "medicationPlan", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MedicationList> medicationList;

    public MedicationPlan() {
    }

    public MedicationPlan(Integer treatmentPeriod, String treatmentName, Patient patient) {
        this.treatmentPeriod = treatmentPeriod;
        this.treatmentName = treatmentName;
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

    public Integer getTreatmentPeriod() {
        return treatmentPeriod;
    }

    public void setTreatmentPeriod(Integer treatmentPeriod) {
        this.treatmentPeriod = treatmentPeriod;
    }

    public String getTreatmentName() {
        return treatmentName;
    }

    public void setTreatmentName(String treatmentName) {
        this.treatmentName = treatmentName;
    }

    public Set<MedicationList> getMedicationList() {
        return medicationList;
    }

    public void setMedicationList(Set<MedicationList> medicationList) {
        this.medicationList = medicationList;
    }

    public UUID getPatientId(){
        return patient.getId();
    }
}
