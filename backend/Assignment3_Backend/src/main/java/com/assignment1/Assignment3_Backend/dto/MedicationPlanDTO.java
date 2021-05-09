package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class MedicationPlanDTO {
    private UUID id;
    private Integer treatmentPeriod;
    private String treatmentName;

    private LocalDateTime startInterval;
    private LocalDateTime endInterval;

    public MedicationPlanDTO() {
    }

    public MedicationPlanDTO(Integer treatmentPeriod, String treatmentName) {
        this.treatmentPeriod = treatmentPeriod;
        this.treatmentName = treatmentName;
    }

    public MedicationPlanDTO(UUID id, Integer treatmentPeriod, String treatmentName) {
        this.id = id;
        this.treatmentPeriod = treatmentPeriod;
        this.treatmentName = treatmentName;
    }

    public MedicationPlanDTO(UUID id, Integer treatmentPeriod, String treatmentName, LocalDateTime startInterval, LocalDateTime endInterval) {
        this.id = id;
        this.treatmentPeriod = treatmentPeriod;
        this.treatmentName = treatmentName;
        this.startInterval = startInterval;
        this.endInterval = endInterval;
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

    public LocalDateTime getStartInterval() {
        return startInterval;
    }

    public void setStartInterval(LocalDateTime startInterval) {
        this.startInterval = startInterval;
    }

    public LocalDateTime getEndInterval() {
        return endInterval;
    }

    public void setEndInterval(LocalDateTime endInterval) {
        this.endInterval = endInterval;
    }
}
