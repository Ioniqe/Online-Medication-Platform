package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.util.UUID;

public class MedicineDTO {
    private UUID id;
    private String name;
    private String dosage;

    public MedicineDTO() {
    }

    public MedicineDTO(String name, String dosage) {
        this.name = name;
        this.dosage = dosage;
    }

    public MedicineDTO(UUID id, String name, String dosage) {
        this.id = id;
        this.name = name;
        this.dosage = dosage;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }
}
