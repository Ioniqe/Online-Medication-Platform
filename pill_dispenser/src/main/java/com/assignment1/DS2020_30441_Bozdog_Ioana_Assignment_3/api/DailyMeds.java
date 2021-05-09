package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api;

import java.io.Serializable;
import java.util.List;

public class DailyMeds implements Serializable {
    private List<DailyMed> meds;
    public DailyMeds(List<DailyMed> meds) {
        this.meds = meds;
    }

    public DailyMeds() {
    }

    public List<DailyMed> getMeds() {
        return meds;
    }

    public void setMeds(List<DailyMed> meds) {
        this.meds = meds;
    }
}