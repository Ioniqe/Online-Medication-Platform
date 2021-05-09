package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity(name="monitored_data")
@Table(name = "monitored_data")
public class MonitoredData implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    @Column(name = "id")
    private UUID id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="patient_id")
    private Patient patientOfMonitoredData;

    @Column(name="activity")
    private String activity;

    @Column(name="start_time")
    private String startTime;

    @Column(name="end_time")
    private String endTime;

    @Column(name="anomalous")
    private boolean anomalous;

    public MonitoredData() {
    }

    public MonitoredData(Patient patientOfMonitoredData, String activity, String startTime, String endTime, boolean anomalous) {
        this.patientOfMonitoredData = patientOfMonitoredData;
        this.activity = activity;
        this.startTime = startTime;
        this.endTime = endTime;
        this.anomalous = anomalous;
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

    public Patient getPatientOfMonitoredData() {
        return patientOfMonitoredData;
    }

    public void setPatientOfMonitoredData(Patient patientOfMonitoredData) {
        this.patientOfMonitoredData = patientOfMonitoredData;
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
