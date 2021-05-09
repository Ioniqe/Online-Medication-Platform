package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicineDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.MedicineBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.SideEffect;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MedicineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MedicineService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MedicineService.class);
    public final MedicineRepository medicineRepository;

    @Autowired
    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    public List<Medicine> getMedicinesByMedicationListId(UUID id) {
        return medicineRepository.findMedicinesByMedicationListId(id);
    }

    public List<MedicineDTO> getMedicines() {
        List<Medicine> medicines = medicineRepository.getAllMedicines();
        List<MedicineDTO> medicineDTOS = new ArrayList<>();
        medicines.stream().forEach(medicine -> medicineDTOS.add(MedicineBuilder.toMedicineDTO(medicine)));
        return medicineDTOS;
    }

    private Optional<Medicine> verifyMedicineExistence(UUID id) {
        Optional<Medicine> optionalMedicine = medicineRepository.findById(id);
        if (!optionalMedicine.isPresent()) {
            LOGGER.error("Medicine with id {} was not found in the db", id);
            throw new ResourceNotFoundException(Medicine.class.getSimpleName() + " with id: " + id);
        }
        return optionalMedicine;
    }

    public MedicineDTO getMedicineDTOById(UUID id) {
        Optional<Medicine> optionalMedicine = verifyMedicineExistence(id);
        return MedicineBuilder.toMedicineDTO(optionalMedicine.get());
    }

    public Medicine getMedicineById(UUID id) {
        Optional<Medicine> optionalMedicine = verifyMedicineExistence(id);
        return optionalMedicine.get();
    }

    public UUID insertMedicine(MedicineDTO medicineDTO) {
        Medicine medicine = MedicineBuilder.toEntity(medicineDTO);
        medicine = medicineRepository.save(medicine);
        LOGGER.debug("Medicine with id {} was inserted in db", medicine.getId());
        return medicine.getId();
    }

    public UUID updateMedicine(MedicineDTO newMedicineDTO, UUID oldMedicineID){
        Medicine oldMedicine = verifyMedicineExistence(oldMedicineID).get();
        Medicine newMedicine = MedicineBuilder.toEntity(newMedicineDTO);

        newMedicine.setId(oldMedicineID);
        newMedicine.setMedicationLists(oldMedicine.getMedicationLists());
        newMedicine.setSideEffect(oldMedicine.getSideEffect());

        newMedicine = medicineRepository.save(newMedicine);
        return newMedicine.getId();
    }

    public void addSideEffectsListToMedicine(List<SideEffect> sideEffectList, Medicine medicine){
        Set<SideEffect> sideEffects = new HashSet<>();
        sideEffects.addAll(sideEffectList);
        medicine.setSideEffect(sideEffects);
        medicine = medicineRepository.save(medicine);
    }

    @Transactional
    public void deleteMedicine(UUID medicineID){
        Medicine oldMedicine = verifyMedicineExistence(medicineID).get();
        medicineRepository.deleteMedicineFromMedicationLists(medicineID);
        medicineRepository.delete(oldMedicine);
    }
}
