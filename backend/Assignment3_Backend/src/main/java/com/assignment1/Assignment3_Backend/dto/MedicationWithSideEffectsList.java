package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.util.List;
import java.util.UUID;

public class MedicationWithSideEffectsList {
    private UUID id;
    private String name;
    private String dosage;
    private List<SideEffectDTO> sideEffectsList;

    public MedicationWithSideEffectsList(UUID id, String name, String dosage, List<SideEffectDTO> sideEffectsList) {
        this.id = id;
        this.name = name;
        this.dosage = dosage;
        this.sideEffectsList = sideEffectsList;
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

    public List<SideEffectDTO> getSideEffectsListDtos() {
        return sideEffectsList;
    }

    public void setSideEffectsListDtos(List<SideEffectDTO> sideEffectsList) {
        this.sideEffectsList = sideEffectsList;
    }
}
