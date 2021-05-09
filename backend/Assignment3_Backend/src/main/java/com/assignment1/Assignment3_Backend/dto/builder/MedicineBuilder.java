package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicineDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;

public class MedicineBuilder {
    public MedicineBuilder() {
    }

    public static MedicineDTO toMedicineDTO(Medicine medicine){
        return new MedicineDTO(medicine.getId(), medicine.getName(), medicine.getDosage());
    }

    public static Medicine toEntity(MedicineDTO medicineDTO){
        return new Medicine(medicineDTO.getName(), medicineDTO.getDosage());
    }
}
