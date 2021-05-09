package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationPlanDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationPlan;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;

public class MedicationPlanBuilder {
    public MedicationPlanBuilder() {
    }

    public static MedicationPlanDTO toMedicationPlanDTOWithId(MedicationPlan medicationPlan){
        return new MedicationPlanDTO(medicationPlan.getId(), medicationPlan.getTreatmentPeriod(), medicationPlan.getTreatmentName());
    }

    public static MedicationPlan toEntity(MedicationPlanDTO medicationPlanDTO, Patient patient){
        return new MedicationPlan(medicationPlanDTO.getTreatmentPeriod(), medicationPlanDTO.getTreatmentName(), patient);
    }
}
