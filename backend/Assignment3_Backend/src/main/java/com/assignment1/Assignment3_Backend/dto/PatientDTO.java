package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.util.UUID;

public class PatientDTO {
    private UUID id;
    private UUID doctorId;
    private UUID caregiverId;

    public PatientDTO() {
    }

    public PatientDTO(UUID id) {
        this.id = id;
    }

    public PatientDTO(UUID id, UUID doctorId, UUID caregiverId) {
        this.id = id;
        this.doctorId = doctorId;
        this.caregiverId = caregiverId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(UUID doctorId) {
        this.doctorId = doctorId;
    }

    public UUID getCaregiverId() {
        return caregiverId;
    }

    public void setCaregiverId(UUID caregiverId) {
        this.caregiverId = caregiverId;
    }
}
