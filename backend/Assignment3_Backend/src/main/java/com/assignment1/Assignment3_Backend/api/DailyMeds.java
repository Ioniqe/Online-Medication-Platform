package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicineDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationPlan;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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
