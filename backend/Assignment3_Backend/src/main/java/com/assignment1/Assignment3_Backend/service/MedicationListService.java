package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationListDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.MedicationListBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationList;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationPlan;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MedicationListRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MedicationPlanRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MedicationListService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MedicationListService.class);
    public final MedicationListRepository medicationListRepository;
    public final MedicationPlanRepository medicationPlanRepository;

    @Autowired
    public MedicationListService(MedicationListRepository medicationListRepository,MedicationPlanRepository medicationPlanRepository) {
        this.medicationListRepository = medicationListRepository;
        this.medicationPlanRepository = medicationPlanRepository;
    }

    public MedicationList getMedicationListById(UUID id){
        Optional<MedicationList> medicationListOptional = medicationListRepository.findById(id);
        if (!medicationListOptional.isPresent()) {
            LOGGER.error("MedicationList with id {} was not found in the db", id);
            throw new ResourceNotFoundException(MedicationList.class.getSimpleName() + " with id: " + id);
        }
        return medicationListOptional.get();
    }


    public List<MedicationListDTO> getMedicationListByMedicationPlanId(UUID id){
        List<MedicationList> medicationLists = medicationListRepository.findAllByMedicationPlan_Id(id);
        List<MedicationListDTO> medicationListDTOS = new ArrayList<>();
        medicationLists.stream().forEach(list -> medicationListDTOS.add(MedicationListBuilder.toMedicationListDTO(list)));
        return medicationListDTOS;
    }

    public UUID insertMedicationList(MedicationListDTO medicationListDTO, MedicationPlan medicationPlan){
        MedicationList medicationList = MedicationListBuilder.toEntity(medicationListDTO, medicationPlan);
        medicationList = medicationListRepository.save(medicationList);
        LOGGER.debug("Medication List with id {} was inserted in db", medicationList.getId());

        Set<MedicationList> newMedicationList = new HashSet<>();
        newMedicationList.add(medicationList);
        medicationPlan.setMedicationList(newMedicationList);
        medicationPlanRepository.save(medicationPlan);
        LOGGER.debug("Medication Plan with id {} has saved medication list with id {} in db", medicationPlan.getId(), medicationList.getId());

        return medicationList.getId();
    }

    public UUID addMedicinesToMedicationList(List<Medicine> medicineList, MedicationList medicationList){
        Set<Medicine> newMedicineList = new HashSet<>();
        newMedicineList.addAll(medicineList);

        medicationList.setMedicines(newMedicineList);
        medicationList = medicationListRepository.save(medicationList);

        return medicationList.getId();
    }

    @Transactional
    public void deleteListsFromJoinTable(List<MedicationList> medLists){
        medLists.forEach(list -> medicationListRepository.deleteListFromJoinTable(list.getId()));
    }

}
