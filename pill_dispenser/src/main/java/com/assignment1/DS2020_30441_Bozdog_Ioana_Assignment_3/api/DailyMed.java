package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

public class DailyMed implements Serializable {
    private UUID id;
    private String name;
    private String dosage;
    private LocalDateTime startInterval;
    private LocalDateTime endInterval;

    public DailyMed(UUID id, String name, String dosage, LocalDateTime startInterval, LocalDateTime endInterval) {
        this.id = id;
        this.name = name;
        this.dosage = dosage;
        this.startInterval = startInterval;
        this.endInterval = endInterval;
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
