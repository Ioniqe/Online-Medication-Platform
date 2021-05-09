package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationListDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationWithSideEffectsList;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicineDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.SideEffectDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.MedicineBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.SideEffect;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicationListService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicationPlanService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicineService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.SideEffectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
public class MedicineController {
    private final MedicineService medicineService;
    private final MedicationListService medicationListService;
    private final MedicationPlanService medicationPlanService;
    private final SideEffectService sideEffectService;

    @Autowired
    public MedicineController(MedicineService medicineService, MedicationListService medicationListService,
                              MedicationPlanService medicationPlanService, SideEffectService sideEffectService) {
        this.medicineService = medicineService;
        this.medicationListService = medicationListService;
        this.medicationPlanService = medicationPlanService;
        this.sideEffectService = sideEffectService;
    }

    @RequestMapping(value = "/medicines/med_list/{medListID}", method = RequestMethod.GET)
    public ResponseEntity<List<MedicineDTO>> getMedicinesOfMedListId(@PathVariable("medListID") UUID id) {
        List<Medicine> medicines = medicineService.getMedicinesByMedicationListId(id);
        List<MedicineDTO> medicineDTOS = new ArrayList<>();
        medicines.stream().forEach(medicine -> medicineDTOS.add(MedicineBuilder.toMedicineDTO(medicine)));
        return new ResponseEntity<>(medicineDTOS, HttpStatus.OK);
    }

    private List<MedicineDTO> getMedicineDTOS(UUID medPlanID){
        medicationPlanService.verifyMedicationPlanExistence(medPlanID);
        List<MedicationListDTO> medicationListDTOS = medicationListService.getMedicationListByMedicationPlanId(medPlanID); //get medication list
        List<Medicine> medicines = medicineService.getMedicinesByMedicationListId(medicationListDTOS.get(0).getId()); //get medicines of medication list
        List<MedicineDTO> medicineDTOS = new ArrayList<>(); //transform the medicines into medicine dtos
        medicines.stream().forEach(medicine -> medicineDTOS.add(MedicineBuilder.toMedicineDTO(medicine))); //add dtos to the new list
        return medicineDTOS;
    }

    @RequestMapping(value = "/medicines/med_plan/{medPlanID}", method = RequestMethod.GET)
    public ResponseEntity<List<MedicineDTO>> getMedicinesByMedPlanId(@PathVariable("medPlanID") UUID medPlanID) {
        List<MedicineDTO> medicineDTOS = getMedicineDTOS(medPlanID);
        return new ResponseEntity<>(medicineDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/medicines_w_sideEffects/med_plan/{medPlanID}", method = RequestMethod.GET)
    public ResponseEntity<List<MedicationWithSideEffectsList>> getMedicinesWithSideEffectsListByMedPlanId(@PathVariable("medPlanID") UUID medPlanID) {
        List<MedicineDTO> medicineDTOS = getMedicineDTOS(medPlanID);
        List<MedicationWithSideEffectsList> finalList = new ArrayList<>();

        medicineDTOS.forEach(dto ->{
            List<SideEffectDTO> sideEffectsDTOS = sideEffectService.getSideEffectOfMedicineById(dto.getId());
            MedicationWithSideEffectsList medicationWithSideEffectsList = new MedicationWithSideEffectsList(
                    dto.getId(), dto.getName(), dto.getDosage(), sideEffectsDTOS);
            finalList.add(medicationWithSideEffectsList);
        });

        return new ResponseEntity<>(finalList, HttpStatus.OK);
    }

    @RequestMapping(value = "/medicines", method = RequestMethod.GET)
    public ResponseEntity<List<MedicineDTO>> getMedicines() {
        return new ResponseEntity<>(medicineService.getMedicines(), HttpStatus.OK);
    }

    //--------------------------------CREATE---------------------------------
    @RequestMapping(value = "/medicine/new", method = RequestMethod.POST)
    public ResponseEntity<UUID> saveMedicine(@RequestBody MedicineDTO medicineDTO) {
        UUID medicineID = medicineService.insertMedicine(medicineDTO);
        return new ResponseEntity<>(medicineID, HttpStatus.CREATED);
    }

    //--------------------------------READ---------------------------------
    @RequestMapping(value = "/medicine/{id}", method = RequestMethod.GET)
    public ResponseEntity<MedicineDTO> getMedicineById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(medicineService.getMedicineDTOById(id), HttpStatus.OK);
    }

    //--------------------------------UPDATE---------------------------------
    @RequestMapping(value = "/medicine/update/{id}", method = RequestMethod.POST)
    public ResponseEntity<UUID> updateMedicine(@RequestBody MedicineDTO medicineDTO, @PathVariable("id") UUID oldMedicineID) {
        UUID medicineID = medicineService.updateMedicine(medicineDTO, oldMedicineID);
        return new ResponseEntity<>(medicineID, HttpStatus.OK);
    }

    //--------------------------------DELETE---------------------------------
    @RequestMapping(value = "/medicine/delete/{medicineID}", method = RequestMethod.DELETE)
    public ResponseEntity deleteMedicine(@PathVariable("medicineID") UUID medicineID) {
        Medicine medicine = medicineService.getMedicineById(medicineID);
        try {
            Set<SideEffect> sideEffects = medicine.getSideEffect();
            sideEffects.forEach(sideEffect -> {
                sideEffect.setMedicine(null);
                sideEffectService.saveSideEffectWithId(sideEffect);
            });
        } catch (Exception e) {
            System.out.println("Medicine has no sideEffects");
        }

        medicineService.deleteMedicine(medicineID);
        return new ResponseEntity(HttpStatus.OK);
    }
}
