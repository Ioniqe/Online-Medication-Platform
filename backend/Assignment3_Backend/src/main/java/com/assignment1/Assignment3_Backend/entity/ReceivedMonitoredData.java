package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

public class ReceivedMonitoredData {
    private String patient_id;
    private String activity;
    private String start;
    private String end;

    public ReceivedMonitoredData() {
    }

    public ReceivedMonitoredData(String patient_id, String activity, String start, String end) {
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
        return "ReceivedMonitoredData{" +
                "patient_id='" + patient_id + '\'' +
                ", activity='" + activity + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                '}';
    }
}
