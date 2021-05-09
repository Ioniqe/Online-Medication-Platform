package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationListDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationPlanDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicationListService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicationPlanService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
public class MedicationPlanController {
    private final MedicationPlanService medicationPlanService;
    private final PatientService patientService;
    private final MedicationListService medicationListService;

    @Autowired
    public MedicationPlanController(MedicationPlanService medicationPlanService, PatientService patientService, MedicationListService medicationListService) {
        this.medicationPlanService = medicationPlanService;
        this.patientService = patientService;
        this.medicationListService = medicationListService;
    }

    //-------------------------------------READ--------------------------------
    @RequestMapping(value = "/med_plans/{personId}", method = RequestMethod.GET)
    public ResponseEntity<List<MedicationPlanDTO>> getMedPlansByPatientId(@PathVariable("personId") UUID personId) {
        Patient patient = patientService.getPatientByPersonId(personId);
        List<MedicationPlanDTO> medicationPlanDTOS = medicationPlanService.getMedicationPlansByPatientId(patient.getId());

        List<MedicationPlanDTO> finalMedPlans = new ArrayList<>();

        medicationPlanDTOS.forEach(medPlan ->{
            List<MedicationListDTO> medicationListDTO = medicationListService.getMedicationListByMedicationPlanId(medPlan.getId());
            MedicationPlanDTO plan = medPlan;

            plan.setStartInterval(medicationListDTO.get(0).getStartInterval());
            plan.setEndInterval(medicationListDTO.get(0).getEndInterval());

            finalMedPlans.add(plan);
        });


        return new ResponseEntity<>(medicationPlanDTOS, HttpStatus.OK);
    }

    //----------------------------------CREATE-----------------------------
    @RequestMapping(value = "/med_plan/new/{personId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> createSideEffect(@RequestBody MedicationPlanDTO medicationPlanDTO,
                                                 @PathVariable("personId") UUID personId) {
        Patient patient = patientService.getPatientByPersonId(personId);
        UUID medPlanID = medicationPlanService.insertMedicationPlan(medicationPlanDTO, patient);
        return new ResponseEntity<>(medPlanID, HttpStatus.CREATED);
    }

}
