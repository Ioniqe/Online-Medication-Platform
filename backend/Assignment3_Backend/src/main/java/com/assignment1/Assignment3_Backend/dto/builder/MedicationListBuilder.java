package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationListDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationList;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationPlan;

public class MedicationListBuilder {
    public MedicationListBuilder() {
    }

    public static MedicationListDTO toMedicationListDTO(MedicationList medicationList){
        return new MedicationListDTO(medicationList.getId(), medicationList.getStartInterval(), medicationList.getEndInterval());
    }

    public static MedicationList toEntity(MedicationListDTO medicationListDTO, MedicationPlan medicationPlan){
        return new MedicationList(medicationListDTO.getStartInterval(), medicationListDTO.getEndInterval(), medicationPlan);
    }
}
