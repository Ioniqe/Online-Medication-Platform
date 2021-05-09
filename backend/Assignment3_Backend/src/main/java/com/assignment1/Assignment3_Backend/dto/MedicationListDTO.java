package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class MedicationListDTO {
    private UUID id;
    private LocalDateTime startInterval;
    private LocalDateTime endInterval;

    public MedicationListDTO() {
    }

    public MedicationListDTO(LocalDateTime startInterval, LocalDateTime endInterval) {
        this.startInterval = startInterval;
        this.endInterval = endInterval;
    }

    public MedicationListDTO(UUID id, LocalDateTime startInterval, LocalDateTime endInterval) {
        this.id = id;
        this.startInterval = startInterval;
        this.endInterval = endInterval;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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
