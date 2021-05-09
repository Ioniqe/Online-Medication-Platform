package com.producer.activity_producer.entity;

public class MonitoredData {
    private String patient_id;
    private String activity;
    private String start;
    private String end;

    public MonitoredData() {
    }

    public MonitoredData(String patient_id, String activity, String start, String end) {
        this.patient_id = patient_id;
        this.activity = activity;
        this.start = start;
        this.end = end;
    }

    public String getPatient_id() {
        return patient_id;
    }

    public String getActivity() {
        return activity;
    }

    public String getStart() {
        return start;
    }

    public String getEnd() {
        return end;
    }

    @Override
    public String toString() {
        return "MonitoredData{" +
                "patient_id='" + patient_id + '\'' +
                ", activity='" + activity + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                '}';
    }
}
