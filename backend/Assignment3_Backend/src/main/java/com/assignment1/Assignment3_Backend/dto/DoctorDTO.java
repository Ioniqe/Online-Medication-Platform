package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.util.UUID;

public class DoctorDTO {
    private UUID id;

    public DoctorDTO() {
    }

    public DoctorDTO(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

}
