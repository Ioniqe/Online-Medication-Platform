package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.util.UUID;

public class MonitoredDataDTO {
    private UUID id;
    private String activity;
    private String startTime;
    private String endTime;
    private boolean anomalous;

    public MonitoredDataDTO() {
    }

    public MonitoredDataDTO(String activity, String startTime, String endTime, boolean anomalous) {
        this.activity = activity;
        this.startTime = startTime;
        this.endTime = endTime;
        this.anomalous = anomalous;
    }

    public MonitoredDataDTO(UUID id, String activity, String startTime, String endTime, boolean anomalous) {
        this.id = id;
        this.activity = activity;
        this.startTime = startTime;
        this.endTime = endTime;
        this.anomalous = anomalous;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public boolean isAnomalous() {
        return anomalous;
    }

    public void setAnomalous(boolean anomalous) {
        this.anomalous = anomalous;
    }
}
