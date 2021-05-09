package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationListDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationList;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationPlan;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicationListService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicationPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
public class MedicationListController {
    private final MedicationListService medicationListService;
    private final MedicationPlanService medicationPlanService;

    @Autowired
    public MedicationListController(MedicationListService medicationListService, MedicationPlanService medicationPlanService) {
        this.medicationListService = medicationListService;
        this.medicationPlanService = medicationPlanService;
    }

    //-----------------------------------READ-----------------------------
    @RequestMapping(value = "/med_list/med_plan/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<MedicationListDTO>> getMedicationListByMedicationPlanId(@PathVariable("id") UUID medicationPlanId) {
        List<MedicationListDTO> medicationListDTOS = medicationListService.getMedicationListByMedicationPlanId(medicationPlanId);
        return new ResponseEntity<>(medicationListDTOS, HttpStatus.OK);
    }

    //----------------------------------CREATE-----------------------------
    @RequestMapping(value = "/med_list/new/{medPlanId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> createSideEffect(@RequestBody MedicationListDTO medicationListDTO,
                                                 @PathVariable("medPlanId") UUID medPlanId) {
        MedicationPlan medicationPlan = medicationPlanService.getMedicationPlanById(medPlanId);
        UUID medListID = medicationListService.insertMedicationList(medicationListDTO, medicationPlan);
        return new ResponseEntity<>(medListID, HttpStatus.CREATED);
    }

    //------------------------------ADD MEDICINE LIST---------------------------
    @RequestMapping(value = "/med_list/add_medicine_list/{medListId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> addMedicinesByMedicationListId(@PathVariable("medListId") UUID medListId,
                                                            @RequestBody List<Medicine> medicineList){
        // (am ales Medicine ca poate-mi trebe si id-ul si daca alegeam numai DTO atunci nu faceam legatura in tabelul de many cu many cu tyabelul medicine)
        MedicationList medicationList = medicationListService.getMedicationListById(medListId);
        UUID medicationListId = medicationListService.addMedicinesToMedicationList(medicineList, medicationList);
        return new ResponseEntity<>(medicationListId, HttpStatus.OK);
    }

}
