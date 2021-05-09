package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Entity(name="patient")
@Table(name = "patient")
public class Patient implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    @Column(name = "id")
    private UUID id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="doctor_id", nullable=false)
    private Doctor doctor;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name="caregiver_id")
    private Caregiver caregiver;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="person_id", nullable=false, unique=true)
    private Person person;

    @OneToMany(mappedBy = "patient", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MedicationPlan> medicationPlans;

    @OneToMany(mappedBy = "patientOfMonitoredData", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MonitoredData> monitoredDataList;

    public Patient() {
    }

    public Patient(Doctor doctor, Caregiver caregiver, Person person) {
        this.doctor = doctor;
        this.caregiver = caregiver;
        this.person = person;
    }

    public Patient(Doctor doctor, Person person, Set<MedicationPlan> medicationPlans, Set<MedicalRecord> medicalRecord) {
        this.doctor = doctor;
        this.person = person;
        this.medicationPlans = medicationPlans;
        this.medicalRecord = medicalRecord;
    }

    public Patient(Doctor doctor, Caregiver caregiver, Person person, Set<MedicalRecord> medicalRecord) {
        this.doctor = doctor;
        this.caregiver = caregiver;
        this.person = person;
        this.medicalRecord = medicalRecord;
    }

    public Patient(Doctor doctor, Caregiver caregiver, Person person, Set<MedicationPlan> medicationPlans, Set<MonitoredData> monitoredDataList, Set<MedicalRecord> medicalRecord) {
        this.doctor = doctor;
        this.caregiver = caregiver;
        this.person = person;
        this.medicationPlans = medicationPlans;
        this.monitoredDataList = monitoredDataList;
        this.medicalRecord = medicalRecord;
    }

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MedicalRecord> medicalRecord;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Set<MedicalRecord> getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(Set<MedicalRecord> medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Caregiver getCaregiver() {
        return caregiver;
    }

    public void setCaregiver(Caregiver caregiver) {
        this.caregiver = caregiver;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public UUID getPersonID(){
        return person.getId();
    }

    public UUID getCaregiverID(){
        return caregiver.getId();
    }

    public UUID getDoctorID(){
        return doctor.getId();
    }

    public Set<MedicationPlan> getMedicationPlans() {
        return medicationPlans;
    }

    public void setMedicationPlans(Set<MedicationPlan> medicationPlans) {
        this.medicationPlans = medicationPlans;
    }

    public Set<MonitoredData> getMonitoredDataList() {
        return monitoredDataList;
    }

    public void setMonitoredDataList(Set<MonitoredData> monitoredDataList) {
        this.monitoredDataList = monitoredDataList;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", doctor=" + doctor.getId() +
                ", caregiver=" + caregiver +
                '}';
    }
}
